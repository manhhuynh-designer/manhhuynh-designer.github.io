export function initializePortfolioInteractions() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const horizontal = document.getElementById('portfolio-horizontal');
  const wrapper = document.getElementById('portfolio-wrapper');

  if (!horizontal || !wrapper) return;

  // --- GSAP Auto-Scroll & Infinite Loop Logic ---
  let infiniteTween;
  let portfolioPinTrigger; // Giữ nguyên trigger vĩnh viễn để tránh sập layout
  let isPaused = false;
  let loopDistance = 0;

  function initScrollLogic() {
    const progressEl = document.getElementById('portfolio-progress');

    // 1. Dọn dẹp GSAP Tween ngang cũ (KHÔNG kill ScrollTrigger pin)
    if (infiniteTween) {
      infiniteTween.kill();
      infiniteTween = null;
    }
    
    gsap.set(horizontal, { clearProps: "x" });
    wrapper.scrollLeft = 0;

    // 2. Xóa các phần tử clone cũ
    document.querySelectorAll('.portfolio-clone').forEach(el => el.remove());

    // 3. Kiểm tra item hiển thị
    const visibleItems = Array.from(portfolioItems).filter(item => getComputedStyle(item).display !== 'none');
    if (visibleItems.length === 0) {
      if (portfolioPinTrigger) {
        portfolioPinTrigger.kill();
        portfolioPinTrigger = null;
      }
      return;
    }

    // 4. Tạo Clones mới ngay lập tức
    visibleItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.classList.add('portfolio-clone');
      clone.removeAttribute('id');
      horizontal.appendChild(clone);
      
      const video = clone.querySelector('video');
      if (video) {
        clone.addEventListener('mouseenter', () => video.play().catch(() => {}));
        clone.addEventListener('mouseleave', () => video.pause());
      }
    });

    // 5. Tính toán và khởi chạy đồng bộ (Không dùng setTimeout gây chớp màn hình)
    const firstClone = horizontal.querySelector('.portfolio-clone');
    loopDistance = (firstClone && visibleItems.length > 0) 
                       ? (firstClone.offsetLeft - visibleItems[0].offsetLeft) 
                       : 0;

    if (loopDistance > 0) {
      const speed = 60;
      const duration = loopDistance / speed;

      infiniteTween = gsap.fromTo(wrapper, 
        { scrollLeft: 0 },
        {
          scrollLeft: loopDistance,
          ease: "none",
          duration: duration,
          repeat: -1
        }
      );

      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (isDesktop) {
        if (progressEl && progressEl.parentElement) progressEl.parentElement.style.display = 'block';
        
        // Tái sử dụng Pin Trigger thay vì tạo mới để duy trì pin-spacer padding
        if (!portfolioPinTrigger) {
          portfolioPinTrigger = ScrollTrigger.create({
            id: "portfolio-pin",
            trigger: "#portfolio",
            start: () => "top " + (document.querySelector('header')?.offsetHeight || 80) + "px",
            end: () => "+=" + (loopDistance * 1.5),
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressEl) gsap.set(progressEl, { width: `${self.progress * 100}%` });
              if (infiniteTween && loopDistance > 0 && Math.abs(self.getVelocity()) > 10) {
                wrapper.scrollLeft = (self.progress * loopDistance) % loopDistance;
                infiniteTween.progress((wrapper.scrollLeft % loopDistance) / loopDistance);
              }
            }
          });
        }
      } else {
        if (progressEl && progressEl.parentElement) progressEl.parentElement.style.display = 'none';
        if (portfolioPinTrigger) {
          portfolioPinTrigger.kill();
          portfolioPinTrigger = null;
        }
      }
    }

    // Refresh lại ScrollTrigger để cập nhật end point một cách tự nhiên
    ScrollTrigger.refresh();
  }

  // Khởi tạo sau khi trang đã load
  window.addEventListener('load', () => {
    initScrollLogic();
  });
  
  initScrollLogic();

  // Resize window -> Tính lại quãng đường GSAP
  window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(initScrollLogic, 200);
  });

  // --- Các sự kiện tương tác UX (Tạm dừng & Kéo thả) ---
  wrapper.addEventListener('mouseenter', () => {
    isPaused = true;
    if (infiniteTween) infiniteTween.pause();
  });
  
  wrapper.addEventListener('mouseleave', () => {
    isPaused = false;
    if (infiniteTween) infiniteTween.play();
  });
  
  wrapper.addEventListener('touchstart', () => {
    isPaused = true;
    if (infiniteTween) infiniteTween.pause();
  }, {passive: true});
  
  wrapper.addEventListener('touchend', () => {
    setTimeout(() => {
      isPaused = false;
      if (infiniteTween) infiniteTween.play();
    }, 1500); // Đợi 1.5s sau khi buông tay mới tiếp tục cuộn auto
  }, {passive: true});

  // Đồng bộ vị trí GSAP với thao tác lướt ngang bằng trackpad của người dùng
  wrapper.addEventListener('scroll', () => {
    if (isPaused && infiniteTween && loopDistance > 0) {
      if (wrapper.scrollLeft <= 0) {
        wrapper.scrollLeft = loopDistance;
      }
      let currentProgress = (wrapper.scrollLeft % loopDistance) / loopDistance;
      infiniteTween.progress(currentProgress);
    }
  }, {passive: true});


  // --- Category Filter Logic ---
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const filter = btn.getAttribute('data-filter');
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const currentScrollY = window.scrollY; // Lưu vị trí cuộn hiện tại

      // Update active button state
      filterButtons.forEach(b => {
        b.classList.remove('active', 'bg-accent-strong', 'text-white');
        b.classList.add('border-main', 'text-gray-normal');
      });
      
      btn.classList.add('active', 'bg-accent-strong', 'text-white');
      btn.classList.remove('border-main', 'text-gray-normal');

      // Tạm dừng hiệu ứng chạy tự động
      isPaused = true;
      if (infiniteTween) infiniteTween.pause();

      gsap.to(horizontal, { 
        opacity: 0, 
        duration: 0.2, 
        onComplete: () => {
          // 1. Dọn dẹp các bản sao cũ
          document.querySelectorAll('.portfolio-clone').forEach(clone => clone.remove());

          // 2. Lọc các items gốc ngay lập tức
          portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
              let targetWidth = isMobile ? '90vw' : (isTablet ? '70vw' : '60vw');
              gsap.set(item, { 
                display: 'flex', 
                opacity: 1, 
                scale: 1, 
                width: targetWidth,
                marginRight: 0 
              });
            } else {
              gsap.set(item, { 
                display: 'none', 
                opacity: 0, 
                scale: 0.8, 
                width: 0,
                marginRight: 0 
              });
            }
          });

          // 3. Đưa scroll về 0
          wrapper.scrollLeft = 0;

          // 4. Khởi tạo lại toàn bộ logic (Giờ đây nó chạy đồng bộ hoàn toàn)
          initScrollLogic();
          
          // Ép trình duyệt giữ vị trí cuộn không bị nhảy sau khi refresh layout
          window.scrollTo(0, currentScrollY);
          
          // 5. Hiện lại nội dung mượt mà
          gsap.to(horizontal, { 
            opacity: 1, 
            duration: 0.4, 
            delay: 0.1, 
            onComplete: () => {
              isPaused = false;
              if (infiniteTween) infiniteTween.play();
              window.scrollTo(0, currentScrollY); // Double check để chắc chắn
            }
          });
        }
      });
    });
  });

  // --- Video Hover Logic ---
  portfolioItems.forEach(item => {
    const video = item.querySelector('video');
    if (!video) return;

    item.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    item.addEventListener('mouseleave', () => {
      video.pause();
    });
  });
}

// Global initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePortfolioInteractions);
} else {
  initializePortfolioInteractions();
}
