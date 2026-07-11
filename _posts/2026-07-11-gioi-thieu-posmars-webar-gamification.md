---
layout: post
title: "POSMARS - Dịch vụ WebAR & Gamification không cần cài App"
date: 2026-07-11
author: Mạnh Huỳnh
categories: [Share, Project, WebAR]
tags: [WebAR, Gamification, EventTech, 3D, Blender, AI, coding, MindAR, MediaPipe]
thumbnail: /blog/assets/posmars-salesdeck/1.webp
excerpt: >
  Giới thiệu về POSMARS – giải pháp tương tác WebAR & Gamification chạy trực tiếp trên trình duyệt di động mà không cần cài đặt ứng dụng (Zero-Install), giúp tăng hiệu quả tương tác tại điểm bán và sự kiện.
---

# POSMARS - WebAR & Gamification cho sự kiện và điểm bán

Mình hiện tại đang làm freelancer 3D CGI, chuyên dựng các asset đồ họa hỗ trợ cho các dự án của khách hàng. Dưới đây là chia sẻ về quá trình xây dựng **POSMARS** – một công cụ WebAR & Gamification chạy trên trình duyệt di động mà không cần cài app.

Dưới đây là video demo ngắn giới thiệu về trải nghiệm thực tế của dự án:

<div class="w-full max-w-[340px] aspect-[9/16] my-8 shadow-2xl rounded-2xl overflow-hidden mx-auto border border-slate-300/20 dark:border-slate-700/40 bg-black">
  <iframe src="https://www.youtube.com/embed/_iY1ILcyS7Q" title="POSMARS Introduction Video" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Ý tưởng xuất phát từ khi còn làm ở brand

Hồi mình còn làm thiết kế ở brand, mỗi lần chạy chiến dịch Activation hay Event, nhãn hàng rất ít khi duyệt làm AR hay mini-game công nghệ, lý do thường vì chi phí triển khai đắt đỏ kèm rào cản kỹ thuật khá lớn. Thời điểm đó, giải pháp khả thi nhất là dùng filter của các bên như SparkAR (Facebook) hoặc TikTok. Nhưng làm vậy thì phụ thuộc hoàn toàn vào ứng dụng của họ, duyệt filter rất lâu, chưa kể điện thoại của khách hàng phải có sẵn các app đó và đăng nhập thì mới trải nghiệm được. Việc bắt khách tải một cái app nặng mấy chục MB rồi đăng ký tài khoản chỉ để chơi một cái game 30 giây thì hầu như ai cũng lười và bỏ qua (tới 85% khách hàng từ chối tham gia vì lý do này).

Dù vậy, dưới góc nhìn thiết kế, mình vẫn thấy AR và các hoạt động tương tác là mảng hữu ích để tiếp cận khách hàng trực quan và dễ dàng hơn.

Sau đợt Meta thông báo đóng cửa SparkAR, cộng thêm việc các công cụ AI hỗ trợ code bắt đầu mạnh lên, mình quyết định tự xây dựng giải pháp WebAR riêng dựa trên các mã nguồn mở (open-source) như MindAR, MediaPipe. Mục tiêu là người dùng chỉ cần quét mã QR là tự động mở camera chơi game luôn, không cần thông qua ứng dụng trung gian nào (**Zero-Install**).

Tuy nhiên, quá trình build cũng gặp khá nhiều vấn đề thực tế mà một designer CGI như mình phải tự mò mẫm giải quyết.

---

## Hai vấn đề kỹ thuật thực tế nhất

### 1. Tối ưu hóa file 3D nặng
Vì bình thường mình làm Freelancer 3D CGI quen tay dựng file nặng, khi đưa lên web thì thiết bị di động khó tải nổi, đặc biệt là khi dùng mạng di động ngoài trời không ổn định. Mình đã nhờ AI hướng dẫn build một [công cụ nhỏ](/blog/3d-model-optimizer-tool/) để tự động nén file `.glb` trực tiếp từ Blender. Tool này giúp giảm được khoảng **90% dung lượng file** ban đầu mà chất lượng hiển thị của mô hình 3D trên màn hình điện thoại vẫn ở mức ổn.

### 2. Lỗi chặn quyền truy cập Camera từ Trình duyệt tích hợp (In-App Browser)
Ở Việt Nam, khách tham gia sự kiện hầu hết đều quét mã QR từ camera mặc định của Zalo hoặc Facebook. Trình duyệt tích hợp (In-app browser) của các ứng dụng này thường tự động chặn quyền truy cập camera hoặc WebGL của điện thoại để đảm bảo bảo mật. Kết quả là trang WebAR bị lỗi, camera đen xì hoặc vỡ giao diện.

Để xử lý, mình dùng script detect User-Agent của thiết bị. Nếu phát hiện người dùng đang truy cập từ in-app browser của Facebook/Zalo/TikTok, trang web sẽ hiển thị một tooltip hướng dẫn trực quan: *"Vui lòng bấm vào dấu 3 chấm (...) và chọn 'Mở bằng trình duyệt hệ thống' (Safari đối với iOS hoặc Chrome đối với Android)"*. Giải pháp này giúp người dùng tự chuyển hướng ra trình duyệt ngoài và camera hoạt động bình thường trở lại.

---

## Bảo mật dữ liệu & Tuân thủ pháp lý

Dù là dự án do mình tự code bằng AI, bảo mật thông tin khách hàng vẫn là ưu tiên hàng đầu:
* **AR Data Privacy**: Luồng camera của WebAR chạy local 100% trên thiết bị, hoàn toàn không gửi hình ảnh về server.
* **AI Data Privacy**: Với các tính năng như AI Photo Booth, ảnh chụp selfie của người dùng sẽ tự động xóa sạch vĩnh viễn trên đám mây sau 24 giờ.
* **Form Đăng Ký**: Tích hợp hộp kiểm đồng ý (Consent Checkbox) tuân thủ nghiêm ngặt **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân tại Việt Nam.

---

## Dự án thực tế đầu tiên: Chiến dịch Tarot cùng Colorkey

Dự án đầu tiên mình áp dụng thử nghiệm là cho một khách hàng cũ làm chiến dịch chạy cho các dòng sản phẩm mặt nạ của Colorkey. Mình đề xuất giải pháp WebAR nhận diện cử chỉ tay (Hand Gesture AR bằng MediaPipe) để người dùng quét QR, giơ tay trước camera điện thoại để vuốt và rút bài Tarot ảo nhận quà dùng thử.

Kết quả thu về thực tế:
* Thu hút hơn **1,200** lượt quét tham gia tương tác.
* Thu về hơn **1,000 lead** thông tin (Họ tên, SĐT) đăng ký nhận quà dùng thử.
* Tỷ lệ chuyển đổi hoàn thành đăng ký (Conversion Rate) đạt **83%**.

---

## Trải nghiệm các bản demo của POSMARS

Mọi người quan tâm có thể quét QR hoặc truy cập trực tiếp các đường link Showcase chạy thực tế của POSMARS để trải nghiệm thử nhé:

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://posmars.com/client/worldtracking" target="_blank" rel="noopener noreferrer" class="bg-primary-button hover:bg-primary-button text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-cube mr-3"></i> Trải nghiệm World Tracking
  </a>
  <a href="https://posmars.com/client/facefilter" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-smile mr-3"></i> Trải nghiệm Face Filter
  </a>
  <a href="https://posmars.com/client/aiphotoboothtest" target="_blank" rel="noopener noreferrer" class="bg-purple-600 hover:bg-purple-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-camera mr-3"></i> Trải nghiệm AI Photo Booth
  </a>
</div>

---

## POSMARS Sales Deck

<style>
  @media (min-width: 1024px) {
    .carousel-slide-img {
      cursor: zoom-in;
      transition: opacity 0.3s ease;
    }
    .carousel-slide-img:hover {
      opacity: 0.95;
    }
  }
</style>

<div class="relative w-full max-w-4xl mx-auto my-8 overflow-hidden rounded-xl shadow-lg border border-slate-300/20 dark:border-slate-700/40 bg-card">
  <!-- Carousel Track -->
  <div id="salesdeck-carousel" class="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none" style="scrollbar-width: none; -ms-overflow-style: none;">
    <!-- Slide 1 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/1.webp" alt="Salesdeck Slide 1" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(0)">
    </div>
    <!-- Slide 2 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/2.webp" alt="Salesdeck Slide 2" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(1)">
    </div>
    <!-- Slide 3 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/3.webp" alt="Salesdeck Slide 3" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(2)">
    </div>
    <!-- Slide 4 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/4.webp" alt="Salesdeck Slide 4" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(3)">
    </div>
    <!-- Slide 5 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/5.webp" alt="Salesdeck Slide 5" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(4)">
    </div>
    <!-- Slide 6 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/6.webp" alt="Salesdeck Slide 6" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(5)">
    </div>
    <!-- Slide 7 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/7.webp" alt="Salesdeck Slide 7" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(6)">
    </div>
    <!-- Slide 8 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/8.webp" alt="Salesdeck Slide 8" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(7)">
    </div>
    <!-- Slide 9 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/9.webp" alt="Salesdeck Slide 9" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(8)">
    </div>
    <!-- Slide 10 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/10.webp" alt="Salesdeck Slide 10" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(9)">
    </div>
    <!-- Slide 11 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/11.webp" alt="Salesdeck Slide 11" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(10)">
    </div>
    <!-- Slide 12 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/12.webp" alt="Salesdeck Slide 12" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(11)">
    </div>
    <!-- Slide 13 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/13.webp" alt="Salesdeck Slide 13" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(12)">
    </div>
    <!-- Slide 14 -->
    <div class="w-full flex-shrink-0 snap-center">
      <img src="/blog/assets/posmars-salesdeck/14.webp" alt="Salesdeck Slide 14" class="w-full h-auto object-contain carousel-slide-img" onclick="openLightbox(13)">
    </div>
  </div>

  <!-- Left/Right Controls -->
  <button onclick="prevSlide()" class="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none z-10 transition-colors duration-300" aria-label="Previous Slide">
    <i class="fa-solid fa-chevron-left text-xl"></i>
  </button>
  <button onclick="nextSlide()" class="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none z-10 transition-colors duration-300" aria-label="Next Slide">
    <i class="fa-solid fa-chevron-right text-xl"></i>
  </button>

  <!-- Slide indicators -->
  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10 max-w-[90%] overflow-x-auto py-1 scrollbar-none" style="scrollbar-width: none; -ms-overflow-style: none;">
    <button onclick="goToSlide(0)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 1"></button>
    <button onclick="goToSlide(1)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 2"></button>
    <button onclick="goToSlide(2)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 3"></button>
    <button onclick="goToSlide(3)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 4"></button>
    <button onclick="goToSlide(4)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 5"></button>
    <button onclick="goToSlide(5)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 6"></button>
    <button onclick="goToSlide(6)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 7"></button>
    <button onclick="goToSlide(7)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 8"></button>
    <button onclick="goToSlide(8)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 9"></button>
    <button onclick="goToSlide(9)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 10"></button>
    <button onclick="goToSlide(10)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 11"></button>
    <button onclick="goToSlide(11)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 12"></button>
    <button onclick="goToSlide(12)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 13"></button>
    <button onclick="goToSlide(13)" class="w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white flex-shrink-0 transition-colors duration-300" aria-label="Slide 14"></button>
  </div>
</div>

<!-- Fullscreen Lightbox Modal -->
<div id="lightbox-modal" class="fixed inset-0 bg-black/95 backdrop-blur-md hidden items-center justify-center z-[9999] opacity-0 transition-opacity duration-300 pointer-events-none">
  <!-- Close Button -->
  <button onclick="closeLightbox()" class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors duration-300 text-3xl focus:outline-none z-20" aria-label="Close Fullscreen">
    <i class="fa-solid fa-xmark"></i>
  </button>
  <!-- Prev Button -->
  <button onclick="prevLightbox(event)" class="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none z-20 transition-colors duration-300" aria-label="Previous Slide">
    <i class="fa-solid fa-chevron-left text-xl"></i>
  </button>
  <!-- Next Button -->
  <button onclick="nextLightbox(event)" class="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg focus:outline-none z-20 transition-colors duration-300" aria-label="Next Slide">
    <i class="fa-solid fa-chevron-right text-xl"></i>
  </button>
  <!-- Image Wrapper for Zoom -->
  <div id="lightbox-img-container" class="w-full h-full flex items-center justify-center overflow-hidden">
    <img id="lightbox-image" src="" alt="Fullscreen view" class="max-w-[90%] max-h-[85%] object-contain rounded-lg shadow-2xl transition-all duration-300 transform scale-95 cursor-zoom-in" onclick="toggleZoom(event)">
  </div>
</div>

<script>
  const carousel = document.getElementById('salesdeck-carousel');
  const indicators = document.querySelectorAll('[aria-label^="Slide"]');
  
  function updateIndicators() {
    const slideWidth = carousel.getBoundingClientRect().width;
    if (slideWidth <= 0) return;
    const activeIndex = Math.round(carousel.scrollLeft / slideWidth);
    indicators.forEach((ind, idx) => {
      if (idx === activeIndex) {
        ind.classList.remove('bg-white/50');
        ind.classList.add('bg-white');
      } else {
        ind.classList.remove('bg-white');
        ind.classList.add('bg-white/50');
      }
    });
  }

  carousel.addEventListener('scroll', updateIndicators);

  function prevSlide() {
    const slideWidth = carousel.getBoundingClientRect().width;
    carousel.scrollLeft -= slideWidth;
  }

  function nextSlide() {
    const slideWidth = carousel.getBoundingClientRect().width;
    if (carousel.scrollLeft + slideWidth >= carousel.scrollWidth - 10) {
      carousel.scrollLeft = 0;
    } else {
      carousel.scrollLeft += slideWidth;
    }
  }

  function goToSlide(index) {
    const slideWidth = carousel.getBoundingClientRect().width;
    carousel.scrollLeft = index * slideWidth;
  }

  // Adjust layout resize
  window.addEventListener('resize', updateIndicators);

  // Initialize after content load
  setTimeout(updateIndicators, 500);

  // Lightbox Modal Logic
  let currentLightboxIndex = 0;
  let isZoomed = false;
  const slideImages = Array.from(document.querySelectorAll('.carousel-slide-img')).map(img => img.src);

  function openLightbox(index) {
    if (window.innerWidth < 1024) return; // Only enable on desktop
    
    currentLightboxIndex = index;
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    
    lightboxImg.src = slideImages[currentLightboxIndex];
    resetZoom();
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    setTimeout(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      lightboxImg.classList.remove('scale-95');
      lightboxImg.classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
  }

  function resetZoom() {
    isZoomed = false;
    const lightboxImg = document.getElementById('lightbox-image');
    const container = document.getElementById('lightbox-img-container');
    
    lightboxImg.className = "max-w-[90%] max-h-[85%] object-contain rounded-lg shadow-2xl transition-all duration-300 transform scale-100 cursor-zoom-in";
    container.className = "w-full h-full flex items-center justify-center overflow-hidden";
  }

  function toggleZoom(e) {
    if (e) e.stopPropagation();
    isZoomed = !isZoomed;
    
    const lightboxImg = document.getElementById('lightbox-image');
    const container = document.getElementById('lightbox-img-container');
    
    if (isZoomed) {
      lightboxImg.className = "max-w-none max-h-none w-full h-auto rounded-lg shadow-2xl transition-all duration-300 cursor-zoom-out";
      container.className = "w-full h-full overflow-auto block";
      
      // Center scroll initially
      setTimeout(() => {
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
        container.scrollTop = (container.scrollHeight - container.clientHeight) / 2;
      }, 50);
    } else {
      resetZoom();
    }
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    lightboxImg.classList.remove('scale-100');
    lightboxImg.classList.add('scale-95');
    
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }, 300);
    
    document.body.style.overflow = '';
  }

  function prevLightbox(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex - 1 + slideImages.length) % slideImages.length;
    document.getElementById('lightbox-image').src = slideImages[currentLightboxIndex];
    resetZoom();
  }

  function nextLightbox(e) {
    if (e) e.stopPropagation();
    currentLightboxIndex = (currentLightboxIndex + 1) % slideImages.length;
    document.getElementById('lightbox-image').src = slideImages[currentLightboxIndex];
  }

  // Close on clicking backdrop
  document.getElementById('lightbox-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (modal && !modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightbox();
      }
    }
  });
</script>

---

Bạn có thể liên hệ với mình qua email **contact@manhhuynh.work** nếu cần trao đổi thêm về các kịch bản tương tác hoặc thiết kế demo cho dự án.
