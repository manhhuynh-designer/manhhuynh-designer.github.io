---
layout: post
title: "DA2 + PBR Texture Generator v1.0.3 - Tạo Depth Map & PBR 3D trực tiếp trong Blender"
date: 2026-10-26
author: Mạnh Huỳnh
categories: [Share, Guide, Blender Addon]
tags: [Blender, Blender Addon, Depth Anything, PBR Texture, Normal Map, Displacement, Image Sequence, Free Addon]
thumbnail: /blog/assets/da2-pbr-generator/thumbnail.webp
excerpt: >
  Hướng dẫn tải, cài đặt và sử dụng Blender Add-on DA2 + PBR Texture Generator v1.0.3 để trích xuất Depth Map 32-bit EXR, bộ map PBR và dựng lưới 3D nổi khối cho ảnh đơn lẫn chuỗi ảnh (Image Sequence). / Guide to installing and using the DA2 + PBR Texture Generator v1.0.3 Blender Add-on for 32-bit EXR Depth Maps, PBR textures, and displaced 3D planes from single images or image sequences.
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

<div class="alert alert-secondary">
  <p class="mb-1"><strong>Tên Add-on:</strong> DA2 + PBR Texture Generator from Image (v1.0.3)</p>
  <p class="mb-1"><strong>Tương thích:</strong> Blender 4.2, 4.3, 4.4, 4.5, 5.0+ (Windows, hỗ trợ CUDA GPU & CPU)</p>
  <p class="mb-0"><strong>Giấy phép:</strong> Mã nguồn mở (MIT License) / Miễn phí</p>
</div>

## I. Giới thiệu chung

Khi làm cảnh 3D trong Blender, nếu chỉ dán một tấm ảnh 2D lên mặt phẳng (Plane) thông thường thì lúc xoay góc camera hoặc chiếu đèn xiên qua, bề mặt sẽ bị phẳng lì và thiếu chiều sâu. Ngược lại, nếu phải dựng khối (sculpt/model) lại từng chi tiết nhỏ cho các vật thể phụ hoặc chuyển qua phần mềm thứ ba để tách từng kênh map thì lại tốn nhiều thời gian.

**DA2 + PBR Texture Generator** là add-on mã nguồn mở mình phát triển để giải quyết việc này ngay bên trong Blender. Công cụ tích hợp mô hình **Depth Anything V2 (ONNX)** kết hợp bộ nhận diện vật liệu **MINC-23** để tự động tính toán **Depth Map (32-bit Float EXR)** cùng trọn bộ map PBR (**Albedo, Normal, Roughness, Metallic**), đồng thời tự dựng sẵn một **3D Plane nổi khối** (Displacement + Principled BSDF) đúng tỷ lệ ảnh gốc chỉ sau một cú click.

Ngoài ảnh tĩnh (**Single Image**), phiên bản **v1.0.3** còn hỗ trợ xử lý hàng loạt cho **Image Sequence** và **Video File**, tích hợp bộ khử nháy chiều sâu (**Temporal Deflicker**) giữa các frame và giữ nguyên kênh nền trong suốt (**Alpha**) của chuỗi ảnh gốc trên lưới 3D.

<div class="text-center my-8 flex flex-col md:flex-row justify-center items-center gap-4">
  <a href="https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases/download/v1.0.3/da2_pbr_generator_v1.0.3.zip" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Tải bản v1.0.3 (.ZIP)
  </a>
  <a href="https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-gray-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-brands fa-github mr-3"></i> Xem GitHub Releases
  </a>
</div>

### Video hướng dẫn nhanh (1 phút)

<div style="max-width: 380px; margin: 28px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.45); border: 1px solid rgba(255,255,255,0.12); background: #0d1117;">
  <video controls playsinline preload="metadata" poster="/blog/assets/da2-pbr-generator/video-poster-9x16.webp" style="width: 100%; height: auto; display: block;">
    <source src="/blog/assets/da2-pbr-generator/tutorial-9x16.mp4" type="video/mp4">
    Trình duyệt của bạn không hỗ trợ thẻ video.
  </video>
</div>

---

## II. Tính năng chính

<div class="alert alert-primary my-4">
  <ul>
    <li><strong>Trích xuất Depth Map 32-bit EXR:</strong> Sử dụng Depth Anything V2 (hỗ trợ 3 phiên bản model: <code>Small ~98MB</code>, <code>Base ~392MB</code>, và <code>Large ~1.3GB</code>), chạy trực tiếp bằng ONNX Runtime với tăng tốc GPU CUDA hoặc CPU.</li>
    <li><strong>Tạo trọn bộ PBR Map tự động:</strong> Tự động tách <strong>Albedo</strong> (khử bóng đổ ambient occlusion), <strong>Normal Map</strong> (kết hợp độ dốc khối lớn và chi tiết vi bề mặt), <strong>Roughness</strong> và <strong>Metallic</strong>.</li>
    <li><strong>Nhận diện vật liệu bằng AI (MINC-23 ONNX):</strong> Tự phân loại 23 nhóm chất liệu (kim loại vàng/đồng, gỗ, gốm, đá cẩm thạch, nhựa, vải...) để tự động điều chỉnh độ bóng và độ kim loại hợp lý, hạn chế lỗi nhận nhầm vùng đá trắng thành kim loại.</li>
    <li><strong>Dựng sẵn 3D Displaced Plane (1-Click):</strong> Tự tạo Plane đúng tỷ lệ khung hình của ảnh đầu vào, gắn sẵn Subdivision + Displacement Modifier và nối đầy đủ các node trong Shader Editor.</li>
    <li><strong>Hỗ trợ Image Sequence & Video (Temporal Deflicker):</strong> Xử lý chuỗi ảnh hoặc video không gây đơ giao diện Blender, có bộ lọc làm mượt độ sâu liên thời gian để khối 3D chuyển động êm, không bị giật nháy giữa các frame.</li>
    <li><strong>Giữ nguyên kênh Alpha gốc:</strong> Nếu ảnh tĩnh hoặc chuỗi Image Sequence đầu vào đã được tách nền sẵn (có kênh Alpha), add-on sẽ tự động nối kênh Alpha đó vào shader của Plane 3D.</li>
  </ul>
</div>

---

## III. Hướng dẫn tải và cài đặt

### Bước 1: Tải file cài đặt từ GitHub Releases
1. Truy cập trang [GitHub Releases của DA2 + PBR Generator](https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases).
2. Tại phiên bản mới nhất (**v1.0.3**), bấm tải file nén **`da2_pbr_generator_v1.0.3.zip`** về máy (không giải nén file zip này).

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/01-github-release.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Tải file zip DA2 PBR Generator từ GitHub Releases">
</figure>

### Bước 2: Cài đặt vào Blender và tải AI Model
1. Mở Blender, vào menu **Edit > Preferences > Add-ons** (hoặc **Get Extensions** trên Blender 4.2+ / 5.x).
2. Bấm vào biểu tượng mũi tên nhỏ ở góc trên bên phải cửa sổ Preferences, chọn **Install from Disk...** và trỏ tới file `da2_pbr_generator_v1.0.3.zip` vừa tải.
3. Tích chọn bật **DA2 + PBR texture Generator from Image**.
4. Nhấn phím **`N`** ngoài màn hình 3D Viewport để mở thanh công cụ bên phải, chuyển sang tab **DA2 Depth**.
5. Trong lần đầu sử dụng, bấm nút **Download AI Model** ngay trên bảng điều khiển để công cụ tự tải model AI về máy. Sau khi tải xong một lần, các lần sau bạn có thể dùng offline hoàn toàn.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/02-install-download-model.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Cài đặt Add-on và bấm Download AI Model trong tab DA2 Depth">
</figure>

---

## IV. Hướng dẫn sử dụng

### 1. Tạo Depth Map & khối 3D cho ảnh tĩnh (Single Image)

1. Tại mục **Input Mode** trong tab **DA2 Depth**, chọn chế độ **Single Image**.
2. Chọn đường dẫn tới file ảnh 2D cần xử lý ở ô **Input Image**.
3. Chọn độ phân giải xuất (**Output Scale**: `100%`, `50%`, `25%` hoặc `Custom`) và tích chọn các kênh PBR muốn tạo (**Albedo**, **Normal**, **Roughness**, **Metallic**). Bạn có thể bấm mũi tên nhỏ cạnh từng map để mở thanh trượt tinh chỉnh độ mạnh Normal hoặc độ nhám bề mặt.
4. Giữ tùy chọn **Create Textured Plane** được bật, sau đó bấm **Generate PBR Maps Now**.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/03-single-image-setup.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Thiết lập thông số Single Image và các kênh PBR Map">
</figure>

Ngay khi xử lý xong, add-on sẽ tạo một mặt phẳng 3D ngay giữa Viewport với đầy đủ Displacement và vật liệu PBR. Khi chuyển sang chế độ **Rendered** và xoay hướng đèn môi trường, bạn sẽ thấy bề mặt phản chiếu ánh sáng và nổi khối rõ rệt theo đúng chi tiết của ảnh.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/04-single-image-3d-relief.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Kết quả mặt phẳng 3D nổi khối khi chiếu đèn trong Blender">
</figure>

---

### 2. Tạo Depth & PBR cho chuỗi ảnh động (Image Sequence / Video)

Nếu bạn cần đưa một đoạn footage hoặc chuỗi ảnh nhân vật/vật thể chuyển động vào không gian 3D để bắt sáng cùng môi trường Blender:

1. Chuyển **Input Mode** sang **Image Sequence** (hoặc **Video File**) và chọn thư mục chứa chuỗi ảnh.
2. Bật tùy chọn **Temporal Deflicker** và điều chỉnh **Smoothing Strength** (mặc định `0.65`) cùng **Motion Sensitivity**. Tính năng này giúp cân bằng độ sâu giữa các frame liên tiếp, ngăn hiện tượng bề mặt 3D bị phập phồng hoặc nhấp nháy khi phát động.
3. Nếu cần xuất thêm bản xem trước dạng video `.mp4`, bạn có thể bật **Package as MP4** và chọn mức chất lượng nén (**Video Quality CRF**).
4. Bấm **Generate PBR Maps Now** để chạy batch cho toàn bộ chuỗi frame.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/05-image-sequence-deflicker.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Thiết lập Image Sequence và bật Temporal Deflicker">
</figure>

**Lưu ý về nền trong suốt (Alpha Channel):** Bản thân add-on không tự tách nền đối tượng, nhưng nếu chuỗi Image Sequence gốc của bạn đã có sẵn kênh nền **Alpha** (ví dụ chuỗi PNG RGBA đã tách nền trước), add-on sẽ tự động giữ nguyên phần nền trong suốt đó trên mặt phẳng 3D và cho phép toàn bộ chuỗi frame chuyển động nổi khối theo đúng timeline của Blender.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/06-image-sequence-alpha-3d.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Chuỗi Image Sequence có sẵn kênh Alpha nổi khối 3D và bắt sáng theo timeline">
</figure>

---

## V. Cấu hình khuyến nghị

| Phiên bản Model | Dung lượng tải | RAM khuyến nghị | GPU VRAM |
| :--- | :--- | :--- | :--- |
| **DA2 Small** *(Mặc định - Nhanh)* | ~98 MB | 4 GB+ | Card tích hợp / Bất kỳ GPU nào |
| **DA2 Base** *(Cân bằng)* | ~392 MB | 8 GB+ | 4 GB+ VRAM |
| **DA2 Large** *(Chi tiết cao nhất)* | ~1.3 GB | 16 GB+ | 6 GB+ VRAM |
| **MINC-23 Material Classifier** | ~84.7 MB | 1 GB+ | Chạy nhẹ trên cả GPU & CPU |

---

## VI. Nhật ký cập nhật (Changelog)

<div class="alert alert-info my-4">
  <strong>Phiên bản v1.0.3 (Mới nhất)</strong>
  <ul>
    <li>Bổ sung tùy chọn <strong>Output Resolution Scaling</strong> (<code>100%</code>, <code>50%</code>, <code>25%</code> hoặc kích thước tùy chỉnh) giúp tăng tốc độ xử lý khi làm việc với chuỗi ảnh 4K/8K.</li>
    <li>Thêm bộ điều khiển chất lượng nén <strong>Video Quality (CRF)</strong> khi đóng gói chuỗi Depth/PBR thành file <code>.mp4</code>.</li>
  </ul>
  <strong>Phiên bản v1.0.2</strong>
  <ul>
    <li>Hỗ trợ trích xuất frame từ Video, đóng gói MP4 tự động và tích hợp nút tải nhanh FFmpeg 1-Click ngay trong Add-on Preferences.</li>
    <li>Bổ sung thuật toán <strong>Temporal Deflicker</strong> khử nháy độ sâu cho Image Sequence & Video.</li>
  </ul>
  <strong>Phiên bản v1.0.1</strong>
  <ul>
    <li>Tích hợp mô hình <strong>MINC-23 ONNX</strong> từ Hugging Face giúp nhận diện 23 nhóm chất liệu tự động.</li>
    <li>Cải thiện nhận diện kim loại màu (Vàng, Đồng, Đồng thau) và loại bỏ hiện tượng nhận nhầm bề mặt đá trắng thành kim loại.</li>
  </ul>
</div>

---

## VII. Tải về & Mã nguồn

Bạn có thể tải miễn phí bản cài đặt `.zip` mới nhất hoặc xem toàn bộ mã nguồn tại GitHub:

* **Tải trực tiếp bản v1.0.3 (.zip):** [da2_pbr_generator_v1.0.3.zip](https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases/download/v1.0.3/da2_pbr_generator_v1.0.3.zip)
* **Trang GitHub Releases:** [https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases](https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases)
* **Mã nguồn GitHub Repository:** [https://github.com/Manh-Huynh-PP/da2_pbr_generator](https://github.com/Manh-Huynh-PP/da2_pbr_generator)
* **Hugging Face ONNX Models:** [manhhuynhsd/Minc-Materials-23-ONNX](https://huggingface.co/manhhuynhsd/Minc-Materials-23-ONNX)

Nếu gặp lỗi trong quá trình cài đặt hoặc có ý tưởng bổ sung tính năng mới, bạn có thể mở Issue trên GitHub hoặc nhắn trực tiếp cho mình.

</div>

<!-- English Content -->
<div id="content-en" class="content-lang" markdown="1">

<div class="alert alert-secondary">
  <p class="mb-1"><strong>Add-on Name:</strong> DA2 + PBR Texture Generator from Image (v1.0.3)</p>
  <p class="mb-1"><strong>Compatibility:</strong> Blender 4.2, 4.3, 4.4, 4.5, 5.0+ (Windows, CUDA GPU & CPU fallback)</p>
  <p class="mb-0"><strong>License:</strong> Open Source (MIT License) / Free</p>
</div>

## I. Overview

When building 3D scenes in Blender, placing a 2D image onto a standard flat plane quickly reveals its limitations once the camera moves or raking light hits the surface. At the same time, manually sculpting background props or switching to external tools just to generate depth and PBR texture maps slows down scene assembly.

**DA2 + PBR Texture Generator** is an open-source Blender add-on built to run this entire process directly inside the 3D Viewport. Powered by **Depth Anything V2 (ONNX)** and the **MINC-23** material recognition model, it generates **32-bit Float EXR Depth Maps** and a full **PBR texture suite (Albedo, Normal, Roughness, Metallic)** from a single image, then automatically builds a displaced **3D Plane** matching your input aspect ratio in one click.

In addition to **Single Image** mode, version **v1.0.3** supports batch processing for **Image Sequences** and **Video Files**, complete with **Temporal Deflicker** to keep animated depth smooth across frames while preserving the original sequence's **Alpha** transparency channel on the 3D mesh.

<div class="text-center my-8 flex flex-col md:flex-row justify-center items-center gap-4">
  <a href="https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases/download/v1.0.3/da2_pbr_generator_v1.0.3.zip" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Download v1.0.3 (.ZIP)
  </a>
  <a href="https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-gray-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-brands fa-github mr-3"></i> View GitHub Releases
  </a>
</div>

### Quick Video Walkthrough (1 Minute)

<div style="max-width: 380px; margin: 28px auto; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.45); border: 1px solid rgba(255,255,255,0.12); background: #0d1117;">
  <video controls playsinline preload="metadata" poster="/blog/assets/da2-pbr-generator/video-poster-9x16.webp" style="width: 100%; height: auto; display: block;">
    <source src="/blog/assets/da2-pbr-generator/tutorial-9x16.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>

---

## II. Key Features

<div class="alert alert-primary my-4">
  <ul>
    <li><strong>32-bit EXR AI Depth Estimation:</strong> Uses Depth Anything V2 (supporting <code>Small ~98MB</code>, <code>Base ~392MB</code>, and <code>Large ~1.3GB</code> models) via ONNX Runtime with CUDA GPU acceleration and CPU fallback.</li>
    <li><strong>Complete PBR Map Extraction:</strong> Generates de-lighted <strong>Albedo</strong>, hybrid macro/micro <strong>Tangent Normal</strong>, physically-coupled <strong>Roughness</strong>, and <strong>Metallic</strong> maps.</li>
    <li><strong>AI Material Classification (MINC-23 ONNX):</strong> Recognizes 23 surface categories (gold/metals, wood, ceramic, marble, plastic, fabric, etc.) to set physically plausible metallic and roughness responses while avoiding false metallic highlights on white marble or plaster.</li>
    <li><strong>One-Click 3D Displaced Plane:</strong> Creates an aspect-ratio-matched 3D plane pre-wired with a Principled BSDF shader, Subdivision Surface, and Displacement modifier.</li>
    <li><strong>Image Sequence & Video Batching with Temporal Deflicker:</strong> Processes frame sequences asynchronously in the background with temporal smoothing to eliminate depth flickering between frames.</li>
    <li><strong>Native Alpha Channel Preservation:</strong> If your input image or image sequence already contains an Alpha transparency channel, the add-on automatically wires that Alpha mask into the generated 3D plane shader.</li>
  </ul>
</div>

---

## III. Download & Installation

### Step 1: Download the Release ZIP from GitHub
1. Visit the [DA2 + PBR Generator GitHub Releases page](https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases).
2. Under the latest release (**v1.0.3**), download **`da2_pbr_generator_v1.0.3.zip`** (keep it as a `.zip` file without extracting).

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/01-github-release.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Download DA2 PBR Generator zip from GitHub Releases">
</figure>

### Step 2: Install in Blender & Download AI Model Weights
1. Open Blender and go to **Edit > Preferences > Add-ons** (or **Get Extensions** in Blender 4.2+ / 5.x).
2. Click the top-right dropdown arrow in the Preferences window, select **Install from Disk...**, and pick `da2_pbr_generator_v1.0.3.zip`.
3. Enable **DA2 + PBR texture Generator from Image**.
4. Press **`N`** in the 3D Viewport to open the Sidebar and select the **DA2 Depth** tab.
5. On first use, click **Download AI Model** inside the panel to download the ONNX model weights to your machine. Once downloaded, the add-on works completely offline.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/02-install-download-model.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Install Add-on and click Download AI Model in the DA2 Depth tab">
</figure>

---

## IV. How to Use

### 1. Single Image to 3D Displaced Plane

1. Set **Input Mode** in the **DA2 Depth** sidebar tab to **Single Image**.
2. Browse and select your 2D image in the **Input Image** field.
3. Choose your desired **Output Scale** (`100%`, `50%`, `25%`, or `Custom`) and check the PBR maps you want to generate (**Albedo**, **Normal**, **Roughness**, **Metallic**). You can expand the arrow next to any map to fine-tune sliders such as Normal strength or surface roughness.
4. Keep **Create Textured Plane** enabled and click **Generate PBR Maps Now**.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/03-single-image-setup.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Single Image setup and PBR map selection">
</figure>

Once complete, the add-on places a displaced 3D mesh in the center of your scene. Switching the viewport to **Rendered** mode and rotating your scene lighting immediately shows the 3D surface relief and specular response across the plane.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/04-single-image-3d-relief.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Displaced 3D plane reacting to directional scene lighting in Blender">
</figure>

---

### 2. Image Sequence / Video Batch Processing

To bring animated 2D footage or an image sequence into a 3D scene so it catches lighting and shadows:

1. Switch **Input Mode** to **Image Sequence** (or **Video File**) and select your sequence folder.
2. Enable **Temporal Deflicker** and adjust **Smoothing Strength** (default `0.65`) and **Motion Sensitivity**. This stabilizes depth values across consecutive frames so the displaced mesh does not flicker during playback.
3. Optionally enable **Package as MP4** and pick a **Video Quality (CRF)** preset if you also want `.mp4` video previews of your generated maps.
4. Click **Generate PBR Maps Now** to process the entire sequence.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/05-image-sequence-deflicker.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Image Sequence setup with Temporal Deflicker enabled">
</figure>

**Note on Alpha Transparency:** The add-on does not perform background removal on its own, but if your source Image Sequence already contains an **Alpha** channel (such as pre-keyed RGBA PNG frames), the add-on automatically preserves that transparency on the 3D displaced plane and syncs the animated depth sequence directly to Blender's timeline.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/da2-pbr-generator/06-image-sequence-alpha-3d.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-2/3 border border-white/10" alt="Pre-keyed Alpha Image Sequence displaced in 3D along the Blender timeline">
</figure>

---

## V. System Requirements

| Model Variant | Download Size | Recommended RAM | GPU VRAM |
| :--- | :--- | :--- | :--- |
| **DA2 Small** *(Default - Fast)* | ~98 MB | 4 GB+ | Integrated / Any GPU |
| **DA2 Base** *(Balanced)* | ~392 MB | 8 GB+ | 4 GB+ VRAM |
| **DA2 Large** *(Highest Detail)* | ~1.3 GB | 16 GB+ | 6 GB+ VRAM |
| **MINC-23 Material Classifier** | ~84.7 MB | 1 GB+ | Fast on both GPU & CPU |

---

## VI. Changelog

<div class="alert alert-info my-4">
  <strong>Version v1.0.3 (Latest)</strong>
  <ul>
    <li>Added <strong>Output Resolution Scaling</strong> (<code>100%</code>, <code>50%</code>, <code>25%</code>, or custom dimensions) for faster batch processing on high-resolution inputs.</li>
    <li>Added <strong>Video Quality (CRF)</strong> controls when packaging Depth and PBR sequences into <code>.mp4</code> files.</li>
  </ul>
  <strong>Version v1.0.2</strong>
  <ul>
    <li>Added video frame extraction, automatic MP4 packaging, and a 1-click FFmpeg downloader in Add-on Preferences.</li>
    <li>Added <strong>Temporal Deflicker</strong> smoothing for Image Sequence and Video modes.</li>
  </ul>
  <strong>Version v1.0.1</strong>
  <ul>
    <li>Integrated the <strong>MINC-23 ONNX</strong> material classifier hosted on Hugging Face.</li>
    <li>Improved Gold/Brass/Copper metallic detection and suppressed false-positive metallic reflections on diffuse white marble.</li>
  </ul>
</div>

---

## VII. Downloads & Source Code

* **Direct Download v1.0.3 (.zip):** [da2_pbr_generator_v1.0.3.zip](https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases/download/v1.0.3/da2_pbr_generator_v1.0.3.zip)
* **GitHub Releases:** [https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases](https://github.com/Manh-Huynh-PP/da2_pbr_generator/releases)
* **GitHub Repository:** [https://github.com/Manh-Huynh-PP/da2_pbr_generator](https://github.com/Manh-Huynh-PP/da2_pbr_generator)
* **Hugging Face ONNX Models:** [manhhuynhsd/Minc-Materials-23-ONNX](https://huggingface.co/manhhuynhsd/Minc-Materials-23-ONNX)

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
