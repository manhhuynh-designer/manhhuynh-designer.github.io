---
layout: post
title: "[Tool] Insta360 HDRI Maker"
date: 2026-02-28
author: Mạnh Huỳnh
categories: [Share, Tool]
tags: [Python, app, HDRI, Insta360, "360", HDR, panorama, de-ghosting]
thumbnail: /blog/assets/app.webp
excerpt: >
  Một ứng dụng Python với giao diện đồ họa giúp kết hợp các ảnh DNG Raw từ Insta360 thành ảnh panorama EXR 32-bit HDR. Tích hợp tự động căn chỉnh, xóa bóng nhờn, và xem trước 3D tương tác.
---
<!-- Language Toggle -->
<div class="flex gap-3 my-6 justify-end">
  <button id="lang-vi" class="lang-toggle-btn px-6 py-3 rounded-lg border-2 border-blue-500 bg-blue-500 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg active" onclick="switchLanguage('vi')">
    VI
  </button>
  <button id="lang-en" class="lang-toggle-btn px-6 py-3 rounded-lg border-2 border-blue-500 bg-transparent text-blue-500 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg" onclick="switchLanguage('en')">
   EN
  </button>
</div>

<style>
.content-lang {
  display: none;
}
.content-lang.active {
  display: block;
}
/* Override global button color rules for language toggle */
.lang-toggle-btn.text-blue-500 {
  color: #3b82f6 !important;
}
.lang-toggle-btn.text-white {
  color: #ffffff !important;
}
</style>

<!-- Vietnamese Content -->
<div id="content-vi" class="content-lang active" markdown="1">

  <div class="flex flex-wrap justify-center gap-4 my-6">
    <a href="https://manhdesigns.gumroad.com/l/insta360-HDRI-maker" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fas fa-shopping-cart mr-3"></i> Tải miễn phí từ Gumroad
    </a>
    <a href="https://github.com/Manh-Huynh-PP/insta360-hdri-maker/releases/tag/v1.9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gray-800 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fab fa-github mr-3"></i> Tải bản v1.9 từ GitHub
    </a>
  </div>

## Tổng quan

**Insta360 HDR Maker** là một ứng dụng Python với giao diện đồ họa giúp kết hợp các ảnh DNG Raw từ Insta360 (hoặc các loại máy ảnh chụp ảnh 360 độ khác) thành ảnh panorama EXR 32-bit sắc nét định dạng High Dynamic Range (HDR). 

Ứng dụng tích hợp nhiều tính năng mạnh mẽ như tự động căn chỉnh, xóa bóng nhờn (de-ghosting), điều chỉnh phơi sáng, làm mượt bầu trời và có hẳn quả cầu kim loại 3D xem trước tương tác. File xuất ra cuối cùng có thể dùng làm HDRi cho môi trường 3D.

---

## Tính năng nổi bật

- **Kết Hợp Ảnh DNG ra EXR HDR**: Tải các ảnh DNG (phơi sáng khác nhau) và ghép chúng thành một ảnh EXR 32-bit duy nhất bằng thuật toán Debevec. 
- **Tự Động Căn Chỉnh (Auto-Alignment)**: Tự động căn chỉnh hình ảnh giúp sửa lỗi rung máy nhẹ trong quá trình chụp các mức sáng khác nhau. 
- **Xóa Bóng Nhờn (De-ghosting)**: Loại bỏ hiệu ứng bóng ma ("ghosts") từ các vật thể hay người chuyển động ngang qua cảnh. 
- **Công Cụ Xem Trước Tương Tác**: Sử dụng quả cầu kim loại 3D hiển thị thời gian thực để bạn dễ dàng đánh giá môi trường ánh sáng HDRI của mình. 
- **Tùy Chỉnh Phơi Sáng & Bầu Trời**: Chỉnh chỉ số EV, tăng cường vùng bóng sáng (Shadow Booster) của mặt trời và làm mượt bầu trời để khắc phục tình trạng bị loang lổ sọc màu ở phần trần. 
- **Xuất Hình Ảnh Nhiều Độ Phân Giải**: Chọn xuất file HDRI EXR gốc, hay thu về kích cỡ 8K, 4K, 2K cho nhẹ. 
- **Giao Diện Thân Thiện Người Dùng**: Thiết kế chuẩn Dark-mode, trực quan với CustomTkinter. 

---

## Cài Đặt & Sử Dụng Ngay

Nếu bạn không biết về lập trình, bạn chỉ cần tải file Release về, giải nén và chạy là dùng được ngay, không cần cài đặt Python! 
1. Tải về file .zip mới nhất (ví dụ: `Insta360_HDR_Maker_v19.zip`). 
2. Giải nén thư mục ra máy tính của bạn. 
3. Chạy file `Insta360_HDR_Maker.exe` (hoặc tên tương tự) bên trong thư mục vừa giải nén để bắt đầu sử dụng. 

</div>
<!-- End Vietnamese Content -->

<!-- English Content -->
<div id="content-en" class="content-lang" markdown="1">

  <div class="flex flex-wrap justify-center gap-4 my-6">
    <a href="https://manhdesigns.gumroad.com/l/insta360-HDRI-maker" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fas fa-shopping-cart mr-3"></i> Free download from Gumroad
    </a>
    <a href="https://github.com/Manh-Huynh-PP/insta360-hdri-maker/releases/tag/v1.9" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gray-800 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fab fa-github mr-3"></i> Download v1.9 from GitHub
    </a>
  </div>

## Overview

**Insta360 HDR Maker** is a Python application with a graphical user interface to merge Insta360 DNG raw images into 32-bit EXR High Dynamic Range (HDR) panoramas. It includes features like auto-alignment, de-ghosting, exposure adjustment, sky smoothing, and an interactive 3D metal sphere preview.

---

## Features 

- **DNG to EXR HDR Merging**: Load multiple DNG exposures and merge them into a single 32-bit EXR file using the Debevec algorithm. 
- **Auto-Alignment**: Automatically align images to compensate for slight camera movement between shots. 
- **De-ghosting**: Remove motion artifacts (ghosts) from moving subjects in the scene. 
- **Interactive Preview**: Real-time 3D metal sphere rendering to preview the HDR lighting environment interactively. 
- **Exposure & Sky Adjustments**: Tweak EV values, boost sun shadows, and apply smooth gradients to the sky zenith to fix color patchiness. 
- **Multi-Resolution Export**: Export the final EXR panorama in Original, 8K, 4K, or 2K resolutions. 
- **User-Friendly GUI**: Clean and modern dark-mode interface built with CustomTkinter. 

---

## Requirements 

- Python 3.8+ 
- Requirements listed in `requirements.txt` 

---

## Installation & Quick Start (For normal users)

If you just want to use the app without installing Python, you can download the standalone executable: 
1. Download the latest .zip file (e.g., `Insta360_HDR_Maker_v19.zip`). 
2. Extract the folder to your computer. 
3. Run the `Insta360_HDR_Maker.exe` application inside the extracted folder. No installation required! 

</div>
<!-- End English Content -->

<script>
function switchLanguage(lang) {
  // Hide all content
  document.querySelectorAll('.content-lang').forEach(el => {
    el.classList.remove('active');
  });
  
  // Toggle button styles (Tailwind) for both buttons
  const buttons = [document.getElementById('lang-vi'), document.getElementById('lang-en')];
  buttons.forEach(btn => {
    if (!btn) return;
    btn.classList.remove('active');
    btn.classList.remove('bg-blue-500','text-white');
    btn.classList.add('bg-transparent','text-blue-500');
  });
  
  // Show selected content
  document.getElementById('content-' + lang).classList.add('active');
  
  // Activate selected button
  const activeBtn = document.getElementById('lang-' + lang);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.classList.add('bg-blue-500','text-white');
    activeBtn.classList.remove('bg-transparent','text-blue-500');
  }
  
  // Save preference
  localStorage.setItem('preferredLanguage', lang);
}

// Load saved preference on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferredLanguage') || 'vi';
  switchLanguage(savedLang);
});
</script>
