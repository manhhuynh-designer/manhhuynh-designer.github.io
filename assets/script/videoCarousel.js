// assets/script/videoCarousel.js

const activeCarousels = [];

function getOriginalVideoSrc(iframe) {
	const rawSrc = iframe.getAttribute('src');
	if (!rawSrc) {
		return '';
	}

	try {
		const url = new URL(rawSrc, window.location.href);
		url.searchParams.delete('autoplay');
		url.searchParams.delete('mute');
		url.searchParams.delete('start');
		return url.toString();
	} catch (error) {
		return rawSrc;
	}
}

function applyAutoplay(iframe) {
	const originalSrc = getOriginalVideoSrc(iframe);
	const hasQuery = originalSrc.includes('?');
	iframe.src = `${originalSrc}${hasQuery ? '&' : '?'}autoplay=1&mute=1`;
}

function resetVideo(iframe) {
	const originalSrc = getOriginalVideoSrc(iframe);
	if (iframe.src !== originalSrc) {
		iframe.src = originalSrc;
	}
}

function createIndicatorButton(index) {
	const button = document.createElement('button');
	button.type = 'button';
	button.setAttribute('aria-label', `Chuyển đến video ${index + 1}`);
	return button;
}

function initializeCarousel(root) {
	const viewport = root.querySelector('.video-gallery-viewport');
	const track = root.querySelector('.video-gallery-track');
	if (!viewport || !track) {
		return null;
	}

	const cards = Array.from(track.querySelectorAll('.video-card'));
	if (cards.length === 0) {
		return null;
	}

	const prevButton = root.querySelector('[data-carousel-prev]');
	const nextButton = root.querySelector('[data-carousel-next]');
	const indicatorsHost = root.querySelector('[data-carousel-indicators]');
	const autoplayDelay = null;
	const loop = root.dataset.loop === 'true';

	const indicators = [];
	if (indicatorsHost) {
		indicatorsHost.innerHTML = '';
		cards.forEach((_, idx) => {
			const indicator = createIndicatorButton(idx);
			indicator.addEventListener('click', () => {
				carousel.goTo(idx, { shouldAutoplay: true });
			});
			indicatorsHost.appendChild(indicator);
			indicators.push(indicator);
		});
	}

	const carousel = {
		root,
		viewport,
		cards,
		prevButton,
		nextButton,
		indicators,
		autoplayDelay,
		loop,
		currentIndex: 0,
		autoplayTimer: null,
		isProgrammaticScroll: false,
		scrollRaf: null,
		scrollReleaseTimeout: null,
		clearAutoplay,
		scheduleAutoplay,
		setActiveIndex,
		scrollToIndex,
		goTo,
		refresh,
	};

	function clearAutoplay() {
		if (carousel.autoplayTimer) {
			window.clearTimeout(carousel.autoplayTimer);
			carousel.autoplayTimer = null;
		}
	}

	function scheduleAutoplay() {
		clearAutoplay();
		if (carousel.autoplayDelay === null) {
			return;
		}
		if (!carousel.loop && carousel.currentIndex === carousel.cards.length - 1) {
			return;
		}

		carousel.autoplayTimer = window.setTimeout(() => {
			const nextIndex = carousel.loop
				? carousel.currentIndex + 1
				: Math.min(carousel.cards.length - 1, carousel.currentIndex + 1);
			carousel.goTo(nextIndex, { shouldAutoplay: true });
		}, carousel.autoplayDelay);
	}

	function setActiveIndex(index, options = {}) {
		const { shouldAutoplay = false } = options;
		carousel.currentIndex = index;

		carousel.cards.forEach((card, idx) => {
			const isActive = idx === carousel.currentIndex;
			card.classList.toggle('is-active', isActive);
			card.setAttribute('aria-current', String(isActive));

			const iframe = card.querySelector('iframe');
			if (!iframe) {
				return;
			}

			if (isActive && shouldAutoplay) {
				applyAutoplay(iframe);
			} else {
				resetVideo(iframe);
			}
		});

		carousel.indicators.forEach((indicator, idx) => {
			indicator.classList.toggle('is-active', idx === carousel.currentIndex);
		});

		if (carousel.prevButton) {
			carousel.prevButton.disabled = !carousel.loop && carousel.currentIndex === 0;
		}

		if (carousel.nextButton) {
			carousel.nextButton.disabled = !carousel.loop && carousel.currentIndex === carousel.cards.length - 1;
		}
	}

	function scrollToIndex(index) {
		const target = carousel.cards[index];
		if (!target) {
			return;
		}

		const viewportCenter = carousel.viewport.clientWidth / 2;
		const targetCenter = target.offsetLeft + target.offsetWidth / 2;
		const desiredScrollLeft = targetCenter - viewportCenter;

		carousel.isProgrammaticScroll = true;
		carousel.viewport.scrollTo({ left: desiredScrollLeft, behavior: 'smooth' });

		if (carousel.scrollReleaseTimeout) {
			window.clearTimeout(carousel.scrollReleaseTimeout);
		}

		carousel.scrollReleaseTimeout = window.setTimeout(() => {
			carousel.isProgrammaticScroll = false;
		}, 500);
	}

	function normalizeIndex(index) {
		if (carousel.loop) {
			const total = carousel.cards.length;
			return ((index % total) + total) % total;
		}
		return Math.max(0, Math.min(carousel.cards.length - 1, index));
	}

	function goTo(targetIndex, options = {}) {
		const { shouldAutoplay = false } = options;
		const normalized = normalizeIndex(targetIndex);
		setActiveIndex(normalized, { shouldAutoplay });
		scrollToIndex(normalized);
		scheduleAutoplay();
	}

	function refresh() {
		setActiveIndex(carousel.currentIndex, { shouldAutoplay: false });
		scrollToIndex(carousel.currentIndex);
	}

	if (prevButton) {
		prevButton.addEventListener('click', () => {
			carousel.goTo(carousel.currentIndex - 1, { shouldAutoplay: true });
		});
	}

	if (nextButton) {
		nextButton.addEventListener('click', () => {
			carousel.goTo(carousel.currentIndex + 1, { shouldAutoplay: true });
		});
	}

	carousel.viewport.addEventListener('scroll', () => {
		if (carousel.isProgrammaticScroll) {
			return;
		}

		if (carousel.scrollRaf) {
			window.cancelAnimationFrame(carousel.scrollRaf);
		}

		carousel.scrollRaf = window.requestAnimationFrame(() => {
			const viewportCenter = carousel.viewport.scrollLeft + carousel.viewport.clientWidth / 2;
			let closestIndex = carousel.currentIndex;
			let closestDistance = Number.POSITIVE_INFINITY;

			carousel.cards.forEach((card, idx) => {
				const cardCenter = card.offsetLeft + card.offsetWidth / 2;
				const distance = Math.abs(cardCenter - viewportCenter);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = idx;
				}
			});

			if (closestIndex !== carousel.currentIndex) {
				setActiveIndex(closestIndex, { shouldAutoplay: false });
				scheduleAutoplay();
			}
		});
	});

	carousel.viewport.addEventListener('pointerdown', () => {
		clearAutoplay();
	});

	carousel.viewport.addEventListener('pointerup', () => {
		scheduleAutoplay();
	});

	// Kick-off state
	goTo(0, { shouldAutoplay: false });

	return carousel;
}

function initializeVideoGalleries() {
	const roots = document.querySelectorAll('[data-carousel]');
	roots.forEach(root => {
		const carousel = initializeCarousel(root);
		if (carousel) {
			activeCarousels.push(carousel);
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	initializeVideoGalleries();
});

const debouncedResize = (() => {
	let timer = null;
	return () => {
		if (timer) {
			window.clearTimeout(timer);
		}

		timer = window.setTimeout(() => {
			activeCarousels.forEach(carousel => {
				carousel.refresh();
			});
		}, 150);
	};
})();

window.addEventListener('resize', debouncedResize);

window.addEventListener('visibilitychange', () => {
	if (document.hidden) {
		activeCarousels.forEach(carousel => carousel.clearAutoplay());
	} else {
		activeCarousels.forEach(carousel => carousel.scheduleAutoplay());
	}
});


