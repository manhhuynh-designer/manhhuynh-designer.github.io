// assets/script/featured.js
import { languages } from './data.js';

/**
 * Tải động một tập tin script từ CDN
 * @param {string} url - Đường dẫn CDN của script
 * @returns {Promise<void>}
 */
function loadScript(url) {
    return new Promise((resolve, reject) => {
        // Nếu script đã được load trước đó, resolve ngay lập tức
        if (document.querySelector(`script[src="${url}"]`)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
        document.head.appendChild(script);
    });
}

/**
 * Cập nhật danh sách skills động dựa trên ngôn ngữ hiện tại
 * @param {string} lang - Ngôn ngữ hiện tại ('vi' hoặc 'en')
 */
function updateSkills(lang) {
    const containers = document.querySelectorAll('.pf-skills-container');
    const langData = window.langData || languages;

    if (!langData || !langData[lang]) return;

    containers.forEach(container => {
        const key = container.getAttribute('data-skills-key');
        if (!key || !langData[lang][key]) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';
        const skillsString = langData[lang][key];
        
        // Hỗ trợ cắt chuỗi skill bằng cả dấu phẩy (,) và chấm phẩy (;)
        const skillsList = skillsString.split(/[;,]/);
        
        container.innerHTML = ''; // Clear old skill items

        skillsList.forEach(skill => {
            const trimmedSkill = skill.trim();
            if (trimmedSkill) {
                const span = document.createElement('span');
                span.className = 'px-3.5 py-1 text-xs rounded-full border border-main/20 bg-main/5 text-gray-normal font-medium tracking-wide';
                span.textContent = trimmedSkill;
                container.appendChild(span);
            }
        });
    });
}

/**
 * Khởi tạo logic tương tác cho trang Portfolio Showcase
 */
export async function initializeFeaturedProjectsPage() {
    try {
        // Render skills động theo ngôn ngữ hiện tại
        const currentLang = localStorage.getItem('lang') || 'vi';
        updateSkills(currentLang);

        // Lắng nghe sự kiện chuyển đổi ngôn ngữ để cập nhật lại skill
        document.addEventListener('languageChanged', (e) => {
            updateSkills(e.detail.lang);
        });

        // Tải động thư viện GSAP và ScrollTrigger nếu chưa có
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        }

        // Đăng ký Plugin ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Chạy các tương tác chính
        initVideoAutoplayScroll();
        initLightbox();
        initRevealAnimations();

    } catch (error) {
        console.error('Error initializing featured portfolio page:', error);
    }
}

/**
 * Tự động Phát/Dừng video loop dựa trên trạng thái cuộn của khung nhìn để tối ưu hóa CPU/GPU
 */
function initVideoAutoplayScroll() {
    const videos = document.querySelectorAll('.portfolio-section video');

    videos.forEach((video) => {
        ScrollTrigger.create({
            trigger: video,
            start: "top 90%",
            end: "bottom 10%",
            onEnter: () => {
                video.play().catch(() => {});
            },
            onLeave: () => {
                video.pause();
            },
            onEnterBack: () => {
                video.play().catch(() => {});
            },
            onLeaveBack: () => {
                video.pause();
            }
        });
    });
}

/**
 * Khởi tạo modal phóng to ảnh (Lightbox) khi người dùng click vào ảnh styleframe
 */
function initLightbox() {
    const lightbox = document.getElementById('portfolio-lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const closeBtn = lightbox ? lightbox.querySelector('.close-btn') : null;
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (!lightbox || !lightboxImg || !galleryItems.length) return;

    // Mở lightbox khi click vào styleframe
    galleryItems.forEach((img) => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            const src = img.getAttribute('src');
            if (src) {
                lightboxImg.setAttribute('src', src);
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
                // Hiệu ứng zoom nhẹ cho lightbox
                gsap.fromTo(lightboxImg, 
                    { scale: 0.9, opacity: 0 }, 
                    { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
                );
                document.body.style.overflow = 'hidden'; // Khóa cuộn trang chính
            }
        });
    });

    // Hàm ẩn lightbox
    const hideLightbox = () => {
        gsap.to(lightboxImg, {
            scale: 0.9,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
                lightbox.classList.remove('flex');
                lightbox.classList.add('hidden');
                document.body.style.overflow = ''; // Mở khóa cuộn trang
            }
        });
    };

    // Đóng khi click nút đóng hoặc click ra ngoài ảnh
    if (closeBtn) {
        closeBtn.addEventListener('click', hideLightbox);
    }
    lightbox.addEventListener('click', hideLightbox);
}

/**
 * Hiệu ứng trượt và hiển thị (Reveal) các phần tử khi cuộn vào khung nhìn
 */
function initRevealAnimations() {
    // Reveal tiêu đề và mô tả trang ở đầu
    const header = document.querySelector('#portfolio-summary-page .pf-reveal-header');
    if (header) {
        gsap.set(header, { y: 40, opacity: 0 });
        gsap.to(header, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '#portfolio-summary-page',
                start: "top 80%",
                once: true
            }
        });
    }

    // Reveal từng section dự án
    const sections = document.querySelectorAll('.portfolio-section');
    sections.forEach((section) => {
        const textCol = section.querySelector('.pf-reveal-text');
        const mediaCol = section.querySelector('.pf-reveal-media');

        if (textCol) {
            const isReversed = textCol.parentElement.classList.contains('md:flex-row-reverse');
            gsap.set(textCol, {
                x: isReversed ? 50 : -50,
                opacity: 0
            });
            gsap.to(textCol, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true
                }
            });
        }

        if (mediaCol) {
            const isReversed = textCol && textCol.parentElement.classList.contains('md:flex-row-reverse');
            gsap.set(mediaCol, {
                x: isReversed ? -50 : 50,
                opacity: 0
            });
            gsap.to(mediaCol, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true
                }
            });
        }
    });
}
