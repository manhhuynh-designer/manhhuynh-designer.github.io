---
layout: post
title: "Hướng dẫn tạo PBR Texture trên Google Flow | PBR Texture Generator"
date: 2026-07-28
author: Mạnh Huỳnh
categories: [Share, Guide, AI]
tags: [Google Flow, PBR Texture, 3D, AI, Tutorial, CGI, Nano Banana, Depth Anything, Material Generator]
thumbnail: /blog/assets/google-flow-pbr/thumbnail.webp
excerpt: >
  Hướng dẫn cách sử dụng công cụ tạo PBR Texture trực tiếp trên Google Flow. / Step-by-step guide to generating 5-map PBR Texture sets directly on Google Flow using Nano Banana & Depth Anything.
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
.lang-toggle-btn.text-blue-500 {
  color: #3b82f6 !important;
}
.lang-toggle-btn.text-white {
  color: #ffffff !important;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

<!-- Vietnamese Content -->
<div id="content-vi" class="content-lang active" markdown="1">

# Hướng dẫn tạo PBR Texture trên Google Flow

Trong quy trình làm 3D và CGI, việc tự tạo hoặc chuẩn bị bộ chất liệu **PBR Texture** (Physically Based Rendering) thường tốn nhiều thời gian. Thông thường, người làm 3D cần ảnh chụp thực tế rồi đưa vào các phần mềm như Substance Sampler hoặc Photoshop để trích xuất các bản đồ map (Albedo, Normal, Roughness, Depth, Metallic).

Bài viết này chia sẻ một workflow chạy trực tiếp trên **Google Flow Tools**, cho phép tự tạo bộ 5 map PBR Texture từ mô tả văn bản (Prompt) bằng tài khoản Google.

Dưới đây là video minh họa thao tác thực hiện:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 32px 0; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
  <iframe src="https://www.youtube.com/embed/yd9fCTZmVeg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="Google Flow PBR Texture Generator Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://labs.google/fx/tools/flow/shared/tool/5cd4a604-ddc1-4b98-9c3b-1ce74fe35223" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-wand-magic-sparkles mr-3"></i> Mở Google Flow PBR Texture Tool
  </a>
</div>

## Cơ chế hoạt động

Workflow này sử dụng 2 mô hình AI phối hợp với nhau:

1. **Nano Banana Model**: Tạo hình ảnh bề mặt chất liệu gốc (Base Color / Albedo) dựa trên câu prompt mô tả.
2. **Depth Anything Model**: Tự động phân tích ảnh bề mặt để tính toán bản đồ độ sâu (Depth Map), sau đó suy ra các map phụ trợ gồm: **Displacement Map**, **Normal Map**, **Roughness Map**, và **Metallic Map**.

Quá trình tính toán và trích xuất map được thực hiện trực tiếp trên trình duyệt web thông qua Google Flow.

## Các bước thực hiện

### Bước 1: Khởi tạo Tool trong dự án Google Flow
1. Bấm nút **Mở Google Flow PBR Texture Tool** phía trên để đến liên kết chia sẻ.
2. Chọn **Dùng thử trong một dự án** (Try in a project) và chọn dự án Google Flow muốn tích hợp tool.
3. Đợi vài giây để hệ thống nạp các node chức năng vào giao diện.

### Bước 2: Nhập prompt & dùng tính năng AI Enhance
1. Nhập mô tả chất liệu cần tạo vào ô Prompt (Ví dụ: *"Old weathered wooden plank texture with cracks"*, *"Modern polished marble with gold veins"*).
2. Nhấn nút **AI Enhance** bên cạnh nếu muốn Google Flow tự động mở rộng prompt thành mô tả chi tiết hơn.

### Bước 3: Tạo bộ Texture Pack
1. Nhấn nút **Tạo texture pack** (Generate texture pack).
2. ⏱️ **Thời gian xử lý**:
   * **Lần đầu tiên**: Mất khoảng **4 - 5 phút** do trình duyệt phải tải mô hình **Depth Anything** (dung lượng khoảng 50 - 60MB) vào bộ nhớ đệm cache.
   * **Các lần tiếp theo**: Model đã lưu trên cache nên thời gian tạo bộ map mới giảm xuống còn khoảng **1 - 2 phút**.

### Bước 4: Tải về file ZIP
1. Khi quá trình hoàn tất, giao diện hiển thị bản xem trước của 5 map texture.
2. Bấm nút **Tải Zip** (Download Zip) để tải file nén chứa đầy đủ các file map về máy.
3. Giải nén và gán các file map này vào phần mềm 3D như Blender, Cinema 4D hay Unreal Engine.

## Tổng kết

Quy trình sử dụng Google Flow kết hợp Nano Banana và Depth Anything giúp tự động hóa bước tạo các bản đồ chất liệu PBR trực tiếp trên trình duyệt web. Kết quả thu được phù hợp để làm tài nguyên phác thảo (prototype) hoặc chất liệu nền cho các phần mềm 3D như Blender, Cinema 4D hay Unreal Engine. Với các dự án yêu cầu độ phân giải cao hoặc chi tiết bề mặt phức tạp, bạn nên kiểm tra và tinh chỉnh lại các map bằng phần mềm chuyên dụng.

Nếu có thắc mắc hoặc góp ý trong quá trình thao tác, bạn có thể để lại bình luận ở phía dưới.

</div>

<!-- English Content -->
<div id="content-en" class="content-lang" markdown="1">

# Google Flow PBR Texture Generator Guide

In 3D and CGI workflows, preparing PBR (Physically Based Rendering) texture sets often requires considerable time. Typically, 3D artists extract texture maps (Albedo, Normal, Roughness, Depth, Metallic) from real-world photographs using software like Substance Sampler or Photoshop.

This article shares a workflow running directly on **Google Flow Tools** that generates a 5-map PBR Texture set from a text prompt using a Google account.

Below is a video demonstrating the step-by-step process:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 32px 0; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
  <iframe src="https://www.youtube.com/embed/yd9fCTZmVeg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="Google Flow PBR Texture Generator Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://labs.google/fx/tools/flow/shared/tool/5cd4a604-ddc1-4b98-9c3b-1ce74fe35223" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-wand-magic-sparkles mr-3"></i> Open Google Flow PBR Texture Tool
  </a>
</div>

## How It Works

This workflow combines two AI models:

1. **Nano Banana Model**: Generates the base surface texture image (Base Color / Albedo) from your text prompt.
2. **Depth Anything Model**: Analyzes the surface image to calculate a Depth Map, then derives auxiliary maps including: **Displacement Map**, **Normal Map**, **Roughness Map**, and **Metallic Map**.

All computations and map extractions run directly in your web browser via Google Flow.

## Step-by-Step Guide

### Step 1: Initialize the Tool in Google Flow
1. Click **Open Google Flow PBR Texture Tool** above to navigate to the shared link.
2. Select **Try in a project** and choose the Google Flow project where you want to add the tool.
3. Wait a few seconds for the function nodes to load into the workspace.

### Step 2: Input Prompt & Use AI Enhance
1. Enter your material description into the Prompt field (e.g., *"Old weathered wooden plank texture with cracks"*, *"Modern polished marble with gold veins"*).
2. Click **AI Enhance** if you want Google Flow to automatically expand your prompt with more descriptive detail.

### Step 3: Generate Texture Pack
1. Click **Generate texture pack**.
2. ⏱️ **Processing Time**:
   * **First Run**: Takes about **4–5 minutes** because the browser needs to download the **Depth Anything** model (~50–60MB) into your browser cache.
   * **Subsequent Runs**: Since the model is cached, generating new texture sets takes only **1–2 minutes**.

### Step 4: Download ZIP File
1. Once generation finishes, a preview of all 5 texture maps will be displayed.
2. Click **Download Zip** to download the archive containing all map files.
3. Extract the files and assign them to your 3D materials in Blender, Cinema 4D, or Unreal Engine.

## Summary

Combining Google Flow with Nano Banana and Depth Anything automates PBR material map generation inside the web browser. The output maps serve well as prototyping assets or base textures for 3D software such as Blender, Cinema 4D, or Unreal Engine. For production projects demanding high resolution or complex micro-surface details, inspecting and refining maps in dedicated software is recommended.

If you have questions or feedback regarding this workflow, feel free to leave a comment below.

</div>

<script>
function switchLanguage(lang) {
  document.querySelectorAll('.content-lang').forEach(el => {
    el.classList.remove('active');
  });
  
  const buttons = [document.getElementById('lang-vi'), document.getElementById('lang-en')];
  buttons.forEach(btn => {
    if (!btn) return;
    btn.classList.remove('active', 'bg-blue-500', 'text-white');
    btn.classList.add('bg-transparent', 'text-blue-500');
  });
  
  const targetContent = document.getElementById('content-' + lang);
  if (targetContent) targetContent.classList.add('active');
  
  const activeBtn = document.getElementById('lang-' + lang);
  if (activeBtn) {
    activeBtn.classList.add('active', 'bg-blue-500', 'text-white');
    activeBtn.classList.remove('bg-transparent', 'text-blue-500');
  }
  
  localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferredLanguage') || 'vi';
  switchLanguage(savedLang);
});
</script>
