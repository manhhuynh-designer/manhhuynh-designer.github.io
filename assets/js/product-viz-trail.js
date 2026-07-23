/**
 * Product Viz — Expanded Sweeping Arc 3D Gallery (3-Row Staggered)
 * Features an expanded, sweeping 3D arc trajectory (SPACING_X = 195px, wide diagonal arc curve),
 * scaled up container size (780px height, 1500px max-width), CARD_WIDTH = 120px, CARD_HEIGHT = 155px,
 * clean #080809 dark styling with a scaled bottom-left blue ambient blur glow.
 */
document.addEventListener('DOMContentLoaded', () => {
    const zone = document.getElementById('packshot-spawn-zone');
    if (!zone) return;

    // ─── Image Assets ─────────────────────────────────────
    const fileNames = [
        'BB cushion_rep.png',
        'Color Sensational_rep.png',
        'Colossal Mascara_rep.png',
        'FM compact_rep.png',
        'Falsies Lashlift_rep.png',
        'Firework Mascara_rep.png',
        'Fit Me Primer_rep.png',
        'Fit Me Setting Spray_rep.png',
        'Fm cushion_rep.png',
        'Hypersharp Liner_rep.png',
        'Lifter Gel_rep.png',
        'Loosepowder_rep.png',
        'Matte max_rep.png',
        'Sky High Mascara_rep.png',
        'cloudtopia_rep.png',
        'Build a Brow_shades.gif',
        'City Mini Eyeshadow_shades.gif',
        'Color Rivals_shades.gif',
        'Fit Me Blush_shades.gif',
        'Fit Me Concealer_shades.gif',
        'Fit Me Foundation_shades.gif',
        'Fit Me Tint_shades.gif',
        'Fit Me Tube_shades.gif',
        'Instant Age Rewind_shades.gif',
        'Lifter Glaze_shades.gif',
        'Lifter Gloss_shades.gif',
        'Lifter Plump_shades.gif',
        'Lumi Matte_shades.gif',
        'Makeup Remover_shades.gif',
        'Sunkisser_shades.gif',
        'Super Stay Flex Powder_shades.gif',
        'Super Stay Matte Ink_shades.gif',
        'Tattoo Brow 36H_shades.gif',
        'Tattoo Brow 48H Gel_shades.gif',
        'Teddy Tint_shades.gif',
        'Ultimatte_shades.gif',
        'Vinyl Ink Sauce_shades.gif',
        'Vinyl Ink_shades.gif'
    ];

    const CDN = 'https://img.manhhuynh.work/maybelline/assets/categories/';
    const totalItems = fileNames.length;

    // Clean product display titles
    const formatTitle = (name) => {
        return name
            .replace(/(_rep\.png|_shades\.gif)$/i, '')
            .replace(/_/g, ' ');
    };

    // Deterministic shuffle helper for distinct row randomization
    const shuffleWithSeed = (arr, seed) => {
        const list = [...arr];
        let m = list.length, t, i;
        let s = seed;
        const pseudoRandom = () => {
            s = (s * 9301 + 49297) % 233280;
            return s / 233280;
        };
        while (m) {
            i = Math.floor(pseudoRandom() * m--);
            t = list[m];
            list[m] = list[i];
            list[i] = t;
        }
        return list;
    };

    // ─── Configuration ────────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const CARD_WIDTH = isMobile ? 90 : 120;     // px card width
    const CARD_HEIGHT = isMobile ? 115 : 155;   // px card height
    const SPACING_X = isMobile ? 135 : 195;      // Horizontal spacing along arc
    const ROW_SPACING_Y = isMobile ? 130 : 220;  // Vertical spacing between rows
    const SPEED_DRAG = 0.0035;
    const SPEED_WHEEL = 0.0018;
    const LERP_FACTOR = 0.08;

    // Row definitions: 3 rows with vertical Y offsets, progress phase shifts, and distinct randomized image orders
    const ROWS = [
        { row: 0, yOffset: -ROW_SPACING_Y, progressShift: 1.8,  zShift: -30, items: shuffleWithSeed(fileNames, 101) }, // Top line
        { row: 1, yOffset: 0,              progressShift: 0.0,  zShift: 0,   items: shuffleWithSeed(fileNames, 202) }, // Middle line
        { row: 2, yOffset: ROW_SPACING_Y,  progressShift: -1.8, zShift: -30, items: shuffleWithSeed(fileNames, 303) }  // Bottom line
    ];

    // ─── Inject Styles ────────────────────────────────────
    const style = document.createElement('style');
    style.textContent = `
        #packshot-spawn-zone {
            perspective: 1200px;
            overflow: hidden;
            user-select: none;
            -webkit-user-select: none;
            touch-action: pan-y;
            cursor: grab;
            position: relative;
            background: #080809 !important;
        }

        #packshot-spawn-zone.is-dragging {
            cursor: grabbing;
        }

        .ambient-glow-left {
            position: absolute;
            bottom: -25%;
            left: -15%;
            width: 680px;
            height: 680px;
            border-radius: 50%;
            background: radial-gradient(circle at 40% 60%, rgba(30, 100, 255, 0.3) 0%, rgba(10, 50, 180, 0.12) 45%, transparent 70%);
            filter: blur(100px);
            pointer-events: none;
            z-index: 0;
        }

        .carousel-3d-stage {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            transform-style: preserve-3d;
            will-change: transform;
            z-index: 1;
        }

        .carousel-card {
            position: absolute;
            width: ${CARD_WIDTH}px;
            height: ${CARD_HEIGHT}px;
            left: -${CARD_WIDTH / 2}px;
            top: -${CARD_HEIGHT / 2}px;
            background: #080809;
            border: 1px solid rgba(255, 255, 255, 0.06);
            border-radius: 8px !important;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            box-sizing: border-box;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            will-change: transform, opacity;
            box-shadow: none;
            overflow: hidden;
        }

        .carousel-card.is-active {
            border-color: rgba(255, 255, 255, 0.12);
            background: #080809;
            box-shadow: none;
        }

        .card-img-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
        }

        .card-img-wrapper img {
            max-width: 88%;
            max-height: 88%;
            object-fit: contain;
            filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.7));
            transition: transform 0.3s ease;
        }

        .carousel-card.is-active .card-img-wrapper img {
            transform: scale(1.08);
        }
    `;
    document.head.appendChild(style);

    // ─── Ambient Glow Element ─────────────────────────────
    const ambientGlow = document.createElement('div');
    ambientGlow.className = 'ambient-glow-left';
    zone.appendChild(ambientGlow);

    // ─── Build Carousel Stage ──────────────────────────────
    const stage = document.createElement('div');
    stage.className = 'carousel-3d-stage';

    const cards = [];

    // Create cards for all 3 rows with randomized item sets
    ROWS.forEach((rowConfig) => {
        rowConfig.items.forEach((name, index) => {
            const card = document.createElement('div');
            card.className = 'carousel-card';
            card.dataset.index = index;
            card.dataset.row = rowConfig.row;

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'card-img-wrapper';

            const img = document.createElement('img');
            img.src = `${CDN}${encodeURIComponent(name)}`;
            img.alt = formatTitle(name);
            img.loading = index < 10 ? 'eager' : 'lazy';

            imgWrapper.appendChild(img);
            card.appendChild(imgWrapper);
            stage.appendChild(card);

            cards.push({
                el: card,
                index,
                rowConfig,
                name: formatTitle(name)
            });
        });
    });

    zone.appendChild(stage);

    // ─── Physics & State ──────────────────────────────────
    let progress = 0;
    let targetProgress = 0;
    let isDragging = false;
    let startX = 0;
    let dragStartProgress = 0;

    // Normalize progress into wrapping [-totalItems/2, totalItems/2]
    const getWrappedOffset = (index, currentProgress) => {
        let diff = (index - currentProgress) % totalItems;
        if (diff > totalItems / 2) diff -= totalItems;
        if (diff < -totalItems / 2) diff += totalItems;
        return diff;
    };

    // ─── Render Loop ──────────────────────────────────────
    let rafId = null;

    const render = () => {
        // Lerp position
        progress += (targetProgress - progress) * LERP_FACTOR;

        cards.forEach(({ el, index, rowConfig }) => {
            // Apply row progress shift so lines are staggered horizontally
            const rowProgress = progress + rowConfig.progressShift;
            const offset = getWrappedOffset(index, rowProgress);
            const absOffset = Math.abs(offset);

            // Only render items within visible range
            if (absOffset > 7) {
                el.style.display = 'none';
                return;
            }
            el.style.display = 'flex';

            // Expanded Sweeping Arc Path:
            const posX = offset * SPACING_X;
            const posY = rowConfig.yOffset + (isMobile ? offset * 16 + Math.pow(offset, 2) * 1.5 : offset * 26 + Math.pow(offset, 2) * 3);

            // Tangent Arc Rotation: rotateZ strictly aligns with the slope of the sweeping arc
            const rotateZ = Math.max(-36, Math.min(36, offset * 10.5));

            // 3D Yaw Rotation: facing toward center
            const rotateY = Math.max(-50, Math.min(50, offset * -14));

            // 3D Pitch: zero at center, slight backward tilt away from center
            const rotateX = -absOffset * 2.5;

            const translateZ = rowConfig.zShift - absOffset * 75;
            const scale = Math.max(0.6, 1.15 - absOffset * 0.1);
            const opacity = Math.max(0, 0.95 - absOffset * 0.16);

            el.style.transform = `
                translateX(${posX.toFixed(1)}px)
                translateY(${posY.toFixed(1)}px)
                translateZ(${translateZ.toFixed(1)}px)
                rotateZ(${rotateZ.toFixed(2)}deg)
                rotateY(${rotateY.toFixed(2)}deg)
                rotateX(${rotateX.toFixed(2)}deg)
                scale(${scale.toFixed(3)})
            `;
            el.style.opacity = opacity.toFixed(3);
            el.style.zIndex = Math.round(100 - absOffset * 10 + (rowConfig.row === 1 ? 20 : 0));

            if (absOffset < 0.5 && rowConfig.row === 1) {
                el.classList.add('is-active');
            } else {
                el.classList.remove('is-active');
            }
        });

        rafId = requestAnimationFrame(render);
    };

    // ─── Interaction Handlers ─────────────────────────────

    // Helper to check if container center is aligned near viewport center
    const isContainerCentered = () => {
        const rect = zone.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const containerCenter = rect.top + rect.height / 2;
        const viewportCenter = vh / 2;
        // Allow carousel wheel scroll only when container center is within 35% of viewport center
        return Math.abs(containerCenter - viewportCenter) < vh * 0.35;
    };

    // Mouse Wheel (locked until container is centered in viewport)
    const handleWheel = (e) => {
        if (!isContainerCentered()) {
            // Allow page to scroll naturally until container is centered in viewport
            return;
        }
        e.preventDefault();
        targetProgress += e.deltaY * SPEED_WHEEL;
    };

    // Pointer Drag (Mouse + Touch)
    const handlePointerDown = (e) => {
        isDragging = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        dragStartProgress = targetProgress;
        zone.classList.add('is-dragging');
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const deltaX = startX - currentX;
        targetProgress = dragStartProgress + deltaX * SPEED_DRAG;
    };

    const handlePointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        zone.classList.remove('is-dragging');
        // Snap target to nearest integer position
        targetProgress = Math.round(targetProgress);
    };

    // Card Click to Focus
    cards.forEach(({ el, index, rowConfig }) => {
        el.addEventListener('click', (e) => {
            if (Math.abs(startX - e.clientX) > 5) return; // ignore if was dragging
            const offset = getWrappedOffset(index, progress + rowConfig.progressShift);
            targetProgress += offset;
        });
    });

    // Register Event Listeners
    zone.addEventListener('wheel', handleWheel, { passive: false });
    zone.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    zone.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // ─── Intersection Observer for Optimization ──────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!rafId) {
                    rafId = requestAnimationFrame(render);
                }
            } else {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
            }
        });
    }, { threshold: 0.1 });

    observer.observe(zone);
});
