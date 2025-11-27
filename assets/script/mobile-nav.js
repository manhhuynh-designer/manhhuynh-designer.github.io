// js/mobile-nav.js

export function setupMobileNavigation() {
    const mobileToggle = document.getElementById('mobile-toggle');
    if (!mobileToggle) return;

    const toggleIcon = mobileToggle.querySelector('i.fa-solid');
    const navMenuLinks = mobileToggle.querySelectorAll('.menu-item a');

    function setToggleState(isExpanded) {
        if (isExpanded) {
            mobileToggle.classList.remove('collapsed');
            mobileToggle.classList.add('expanded');
        } else {
            mobileToggle.classList.remove('expanded');
            mobileToggle.classList.add('collapsed');
        }
    }

    // Initialize mobile toggle to collapsed state on page load for mobile screens
    if (window.innerWidth <= 767) {
        setToggleState(false); // Start collapsed
    } else {
        mobileToggle.classList.remove('collapsed', 'expanded'); // Ensure no mobile classes on desktop
    }

    toggleIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        setToggleState(!mobileToggle.classList.contains('expanded'));
    });

    mobileToggle.addEventListener('click', (e) => {
        if (e.target === mobileToggle) {
            setToggleState(!mobileToggle.classList.contains('expanded'));
        }
    });

    navMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            console.log('[Mobile Nav] Clicked link:', href, 'Current path:', location.pathname);
            if (!href) return;

            // Consider any URL containing a hash as an anchor (handles baseurl like /site/#blog)
            const isHash = href.includes('#');
            if (isHash) {
                const raw = href.split('#').pop();
                const samePage = location.pathname === '/' || /index\.html$/.test(location.pathname);
                console.log('[Mobile Nav] Hash detected:', raw, 'Same page:', samePage);
                
                // Cuộn ngay trong trang hiện tại - case insensitive matching
                const targetElement = document.getElementById(raw) || 
                                    document.getElementById(raw.toLowerCase()) ||
                                    document.getElementById(raw + '-section') || 
                                    document.getElementById(raw.replace(/-section$/, ''));
                
                if (samePage && targetElement) {
                    console.log('[Mobile Nav] Found target, scrolling to:', raw);
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                } else if (!samePage) {
                    // Chuyển trang: lưu mục tiêu để scroll sau khi trang đích load
                    console.log('[Mobile Nav] Cross-page anchor, redirecting to homepage with hash:', raw);
                    sessionStorage.setItem('scrollTarget', raw.toLowerCase());
                    const base = (window.SITE_BASEURL || '').replace(/\/$/, '');
                    const targetUrl = base + '/#' + raw.toLowerCase();
                    e.preventDefault();
                    window.location.href = targetUrl;
                    return; // Exit early, don't collapse menu yet
                } else {
                    console.log('[Mobile Nav] Target not found:', raw);
                }
            }

            if (mobileToggle.classList.contains('expanded')) {
                console.log('[Mobile Nav] Collapsing menu');
                setToggleState(false);
            }
        });
    });

    // Adjust header padding for logo visibility on mobile when toggle is collapsed
    const headerNav = document.querySelector('header nav');
    function adjustHeaderPadding() {
        if (window.innerWidth <= 767) {
            headerNav.style.paddingLeft = '0';
        } else {
            headerNav.style.paddingLeft = '0';
        }
    }
    adjustHeaderPadding();
    window.addEventListener('resize', adjustHeaderPadding);
}