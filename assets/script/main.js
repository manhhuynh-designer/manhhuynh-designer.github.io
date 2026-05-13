// assets/script/main.js

import { updateContent, setupLanguageToggle, currentLanguage } from './language.js';
import { setupSmoothScrolling, setupScrollReveal, setupHeroParallax, setupSmartHeader } from './scroll-effects.js';
import { initializePortfolioInteractions } from './portfolio.js'; // Đảm bảo import hàm này
import { setupMobileNavigation } from './mobile-nav.js';

// Hàm để ẩn preloader và hiển thị nội dung chính
function hidePreloaderAndShowContent() {
    // Đã loại bỏ điều kiện 'if (window.innerWidth < 768) return;'
    // để preloader ẩn trên mọi thiết bị.
    const preloaderWrapper = document.querySelector('.preloader-wrapper');
    const body = document.body;

    // Thêm lớp 'preloader-hidden' vào preloader để kích hoạt hiệu ứng ẩn dần
    if (preloaderWrapper) {
        preloaderWrapper.classList.add('preloader-hidden');
    }

    // Loại bỏ lớp 'is-loading' khỏi thẻ body.
    if (body.classList.contains('is-loading')) {
        body.classList.remove('is-loading');
    }

    // Tùy chọn: Sau khi hiệu ứng chuyển đổi của preloader hoàn tất,
    // xóa preloader khỏi DOM để giải phóng tài nguyên.
    setTimeout(() => {
        if (preloaderWrapper && preloaderWrapper.parentNode) {
            preloaderWrapper.parentNode.removeChild(preloaderWrapper);
        }
        // Sau khi preloader bị remove mới thực hiện scroll tới hash (nếu có)
        let hashTargetId = null;
        if (window.location.hash && window.location.hash.length > 1) {
            hashTargetId = window.location.hash.substring(1);
        }
        // Fallback từ sessionStorage nếu được set bởi mobile nav khi chuyển trang
        if (!hashTargetId) {
            const stored = sessionStorage.getItem('scrollTarget');
            if (stored) {
                hashTargetId = stored;
                sessionStorage.removeItem('scrollTarget');
            }
        }
        if (hashTargetId) {
            let target = document.getElementById(hashTargetId);
            // Thử thêm biến thể nếu không tìm thấy
            if (!target) {
                const variants = [hashTargetId.replace(/-section$/, ''), hashTargetId + '-section'];
                for (const v of variants) {
                    if (v !== hashTargetId) {
                        const candidate = document.getElementById(v);
                        if (candidate) { target = candidate; break; }
                    }
                }
            }
            if (target) {
                requestAnimationFrame(() => {
                    try { target.scrollIntoView({ behavior: 'smooth' }); } catch(e) {}
                });
            }
        }
    }, 900);
}

// Hàm thiết lập chiều cao ứng dụng cho các thiết bị di động
function setAppHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
}

// DOMContentLoaded là nơi tốt nhất để khởi tạo các chức năng yêu cầu DOM đã sẵn sàng.
document.addEventListener('DOMContentLoaded', () => {
    // Thiết lập điều hướng di động (nếu cần)
    setupMobileNavigation();

    // Điều chỉnh margin-top cho main content để tránh bị che bởi header cố định trên mobile
    const header = document.querySelector('.fixed-header'); // Giả sử header của bạn có class này
    const main = document.querySelector('#main-content'); // Giả sử main content của bạn có id này

    if (header && main) {
        const headerHeight = header.offsetHeight;
        if (window.innerWidth < 768) { // mobile breakpoint
            main.style.marginTop = headerHeight + 'px';
        } else {
            main.style.marginTop = ''; // Xóa margin-top trên desktop
        }
    }

    // Các chức năng chung khác
    setupSmartHeader();
    setupHeroParallax();
    initializePortfolioInteractions(); // Gọi hàm khởi tạo tương tác portfolio tại đây
    setupLanguageToggle();
    setupSmoothScrolling();
    setupScrollReveal();
    updateContent(currentLanguage);

    // Gọi hàm để ẩn preloader và hiển thị nội dung chính
    hidePreloaderAndShowContent();

    // Hash scroll now handled inside hidePreloaderAndShowContent after removal.
});

// Khởi tạo chiều cao ứng dụng khi tải trang và khi thay đổi kích thước cửa sổ
window.addEventListener('resize', setAppHeight);
setAppHeight();

// `window.onload` chỉ nên chứa những gì cần thiết sau khi TẤT CẢ tài nguyên (bao gồm hình ảnh, video) đã tải.
// Hầu hết các khởi tạo DOM có thể được chuyển sang DOMContentLoaded.
window.onload = function() {
    // Hiện tại không có gì cần thiết ở đây, có thể để trống hoặc thêm các logic tải tài nguyên nặng.
};