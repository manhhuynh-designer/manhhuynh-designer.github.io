---
layout: post
title: "Cập nhật PromptAgent Flow Bridge v4.2.0: Pose Studio 3D, PromptBook tinh gọn & Ask Gemini Slash Skills"
date: 2026-10-24
author: Mạnh Huỳnh
categories: [Share, Guide, Extension]
tags: [PromptAgent, Google Flow, Gemini, Pose Studio 3D, Extension, Chrome, AI Workflow]
thumbnail: /assets/images/flow-bridge/hero-banner.png
excerpt: >
  Bản cập nhật lớn PromptAgent Flow Bridge v4.2.0 tích hợp Pose Studio 3D trực tiếp trong trang kèm thông số góc máy Camera DNA, tinh gọn hoàn toàn PromptBook phẳng với nút Book 2-trong-1 và kết nối Native Chrome Ask Gemini Slash Skills.
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
  border-radius: 8px;
}
</style>

<!-- ======================================================================= -->
<!-- VIETNAMESE CONTENT                                                      -->
<!-- ======================================================================= -->
<div id="content-vi" class="content-lang active" markdown="1">

# Cập nhật PromptAgent Flow Bridge v4.2.0: Pose Studio 3D, PromptBook tinh gọn & Ask Gemini Slash Skills

Sau một thời gian sử dụng thực tế trong các dự án sản xuất hình ảnh & video AI thương mại trên **Google Flow (`flow.google.com`)**, mình vừa phát hành bản cập nhật lớn **PromptAgent Flow Bridge v4.2.0**.

Phiên bản này tập trung vào 3 mục tiêu cốt lõi: **tối giản hoá thao tác** (loại bỏ các bước phân cấp rườm rà), **kiểm soát góc máy & dáng nhân vật bằng 3D trực quan** ngay trong trang làm việc, và **hoạt động gọn nhẹ trên một cửa sổ duy nhất** cùng thanh bên **Ask Gemini** tích hợp sẵn của trình duyệt Chrome.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 32px 0; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
  <iframe src="https://www.youtube.com/embed/nzP6c8ExFck" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="PromptAgent Flow Bridge v4.2.0 Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://chromewebstore.google.com/detail/promptagent-flow-bridge/bdppjcccndgkidkmfnpdkhggmeaagafg" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-brands fa-chrome mr-3"></i> Cài đặt từ Chrome Web Store
  </a>
  <a href="https://prompt.manhhuynh.work/flow-bridge-extension-v4.2.0.zip" target="_blank" rel="noopener noreferrer" class="bg-gray-700 hover:bg-gray-800 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Tải gói ZIP (v4.2.0)
  </a>
  <a href="https://prompt.manhhuynh.work" target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-wand-magic-sparkles mr-3"></i> Mở Web Portal & Slash Skills
  </a>
</div>

---

## 1. Những điểm mới nổi bật trong phiên bản v4.2.0

### 🧍 Pose Studio 3D tích hợp trực tiếp trong trang & Camera DNA
Thay vì phải mô tả góc máy và tư thế nhân vật bằng chữ một cách cảm tính, giờ đây trên thanh công cụ nổi của tiện ích có sẵn nút **Pose Studio 3D**:
- **Click chuột trái**: Mở ngay cửa sổ dựng hình **Pose Studio 3D** đè lên trang AI đang làm việc (đồng bộ hoàn toàn tông màu tối trung tính `#121212` / `#1A1A1A` / `#10b981` với tiện ích).
- **Click chuột phải**: Mở Pose Studio 3D ở một tab trình duyệt độc lập (`https://prompt.manhhuynh.work/pose/`).
- **Chèn tự động 2-trong-1 (`Insert Pose`)**: Khi bấm nút **Insert Pose**, tiện ích tự động đính kèm **ảnh PNG dáng nhân vật 3D** vào ô upload tham chiếu, đồng thời điền **thông số góc máy chuẩn điện ảnh (Camera & Shooting Angle DNA)** gồm tiêu cự ống kính (`mm`), cỡ cảnh, góc máy cao/thấp (`°` elevation), góc xoay ngang so với hướng mặt nhân vật và độ nghiêng máy (Dutch tilt) thẳng vào khung prompt.

### 📖 Tối giản hoá hoàn toàn PromptBook & Nút Book 2-trong-1
Trong các phiên bản trước, việc phải tạo Project rồi tạo Scene trước khi lưu một câu prompt gây mất thời gian khi đang làm việc nhanh. Ở bản **v4.2.0**:
- **Loại bỏ hoàn toàn tab Projects & bộ đếm Credit thừa**: Mở popup tiện ích hoặc menu nổi trên web là vào thẳng **danh sách phẳng PromptBook** (2 dòng gọn gàng cho mỗi thẻ prompt, có nút **Paste** trực tiếp). Toàn bộ dữ liệu prompt đã lưu trước đây trên máy hoặc trên Cloud Firestore vẫn được giữ nguyên và gộp tự động.
- **Nút Book hợp nhất trên thanh công cụ nổi**:
  - **Click chuột trái vào icon Quyển sách (Book)**: Lưu nhanh (1-click) câu prompt đang gõ trên trang vào thẳng PromptBook mà không cần nhập tiêu đề hay chọn thư mục.
  - **Click chuột phải vào icon Quyển sách (Book)**: Mở ngay menu **PromptBook** nổi để tìm kiếm và **Paste** prompt đã lưu vào khung nhập.
- **Viền modal siêu trong suốt**: Toàn bộ thanh công cụ nổi và hộp thoại được tinh chỉnh viền mờ tinh tế, không gây vướng mắt trên giao diện sáng tạo.

### ⚡ Kết nối Native Chrome "Ask Gemini" & Bộ 5 Slash Skills
Không cần chia đôi 2 cửa sổ hay tạo Gem thủ công như trước. Bạn chỉ cần mở thanh bên **Ask Gemini** tích hợp sẵn ở góc trên bên phải trình duyệt Chrome (tự động đọc được hình ảnh/video trên tab Google Flow hiện tại) và cài bộ **Slash Skills** tại `chrome://skills/yourSkills`:
- `/still` — Tạo **Ảnh tĩnh Photoreal**, **Packshot sản phẩm** theo vật liệu và **Character Sheet**.
- `/shot` — Tạo **Video T2V**, **I2V Motion-Only** (20–35 từ, chỉ tả chuyển động) & **Storyboard TVC nhiều cảnh**.
- `/edit` — **Chỉnh sửa ảnh** (`Change / Preserve / Integration`), **Ghép nhiều ảnh** & **V2V Product Relight**.
- `/think` — **Tư duy Sáng tạo 6-in-1** (Viral Hook 3s đầu, SCAMPER, Six Thinking Hats, Reverse Brainstorming, Tree of Thoughts & First Principles).
- `/flow` — Bản **All-in-One Flow Director** tự động phân luồng cả 4 chế độ.

Bạn có thể sao chép nhanh nội dung từng Skill chỉ với 1 cú click tại [Trang chủ PromptAgent Portal](https://prompt.manhhuynh.work) hoặc [Trang Hướng dẫn](https://prompt.manhhuynh.work/guide).

### 🛡️ Mặc định chỉ hiển thị trên Google Flow — Không làm phiền khi lướt web
Để tránh việc thanh công cụ nổi xuất hiện ngoài ý muốn trên các trang web thông thường:
- **Mặc định**: Thanh công cụ nổi chỉ tự động hiển thị khi bạn truy cập **Google Flow (`flow.google.com`)**.
- **Bật thủ công cho các trang AI khác**: Khi làm việc trên Adobe Firefly, Magnific / Freepik Spaces, Higgsfield AI, Midjourney hay bất kỳ công cụ AI nào khác, bạn chỉ cần mở popup tiện ích và bấm nút **`Paste: OFF` → `Paste: ON`** trên thanh trạng thái (hoặc bật *Auto-detect AI sites* trong phần cài đặt).

---

## 2. Tóm tắt thao tác sử dụng trên thanh công cụ nổi (3 nút)

1. **Nút Paste (Trên cùng / Bên trái)**:
   - **Chuột trái**: Đọc prompt từ Clipboard (tự động nhận diện khối ` ```text ` từ Ask Gemini hoặc tách nhiều cảnh Storyboard) và điền thẳng vào ô nhập.
   - **Chuột phải**: Mở danh sách **10 Prompt vừa dán gần đây** để dùng lại nhanh.
2. **Nút Book — PromptBook (Ở giữa)**:
   - **Chuột trái**: Lưu tức thì prompt đang có trong ô nhập vào PromptBook.
   - **Chuột phải**: Mở menu chọn và dán prompt đã lưu trong PromptBook.
3. **Nút Pose Studio 3D (Dưới cùng / Bên phải)**:
   - **Chuột trái**: Mở cửa sổ Pose Studio 3D ngay trong trang.
   - **Chuột phải**: Mở Pose Studio 3D trong tab mới.

Nếu bạn có góp ý hoặc cần bổ sung tính năng cho workflow làm phim/hình ảnh AI, hãy nhắn cho mình nhé!

</div>

<!-- ======================================================================= -->
<!-- ENGLISH CONTENT                                                         -->
<!-- ======================================================================= -->
<div id="content-en" class="content-lang" markdown="1">

# PromptAgent Flow Bridge v4.2.0 Update: In-Page Pose Studio 3D, Flat PromptBook & Ask Gemini Slash Skills

Following extensive real-world production use on **Google Flow (`flow.google.com`)**, **PromptAgent Flow Bridge v4.2.0** is now live.

This release focuses on three pillars: **zero-friction prompt management**, **interactive 3D character & camera angle control directly inside your AI workspace**, and **single-window synergy** with Chrome's built-in **Ask Gemini** side panel.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 32px 0; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
  <iframe src="https://www.youtube.com/embed/nzP6c8ExFck" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="PromptAgent Flow Bridge v4.2.0 Demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://chromewebstore.google.com/detail/promptagent-flow-bridge/bdppjcccndgkidkmfnpdkhggmeaagafg" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-brands fa-chrome mr-3"></i> Install from Chrome Web Store
  </a>
  <a href="https://prompt.manhhuynh.work/flow-bridge-extension-v4.2.0.zip" target="_blank" rel="noopener noreferrer" class="bg-gray-700 hover:bg-gray-800 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Download Extension ZIP (v4.2.0)
  </a>
  <a href="https://prompt.manhhuynh.work" target="_blank" rel="noopener noreferrer" class="bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-wand-magic-sparkles mr-3"></i> Open Web Portal & Slash Skills
  </a>
</div>

---

## 1. What's New in v4.2.0

### 🧍 In-Page Pose Studio 3D & Camera DNA Injection
Instead of guessing camera angles and body posture descriptions in text, the floating dock now includes a dedicated **Pose Studio 3D** button:
- **Left-click**: Opens the **Pose Studio 3D** modal directly over your active workspace, styled in a unified neutral dark palette (`#121212` / `#1A1A1A` / `#10b981`).
- **Right-click**: Opens Pose Studio 3D in a standalone browser tab (`https://prompt.manhhuynh.work/pose/`).
- **1-Click `Insert Pose` (Image + Camera DNA)**: Automatically attaches the rendered 3D pose reference PNG and injects structured **Camera & Shooting Angle DNA** (focal length in `mm`, shot framing, vertical elevation in degrees, horizontal azimuth relative to character orientation, and Dutch tilt) into your prompt input.

### 📖 Flat PromptBook & Unified 2-in-1 Book Button
We removed the multi-level Project/Scene folder hierarchy and legacy web credit counter so you can save and reuse prompts with zero friction:
- **Flat PromptBook List**: Opening the extension popup or floating menu goes straight into a clean, searchable list of saved prompts with 1-click **Paste** buttons (all previously saved local and Firestore prompts are automatically preserved and merged).
- **Unified Book Button on the Floating Dock**:
  - **Left-click on the Book icon**: Instantly saves the current prompt from the page editor into PromptBook with an auto-generated title.
  - **Right-click on the Book icon**: Opens the floating **PromptBook** menu to browse and paste saved prompts.
- **High-Transparency Borders**: Subtle, ultra-transparent borders keep the floating dock and modals unobtrusive over your canvas.

### ⚡ Native Chrome "Ask Gemini" & 5 Modular Slash Skills
Work in a single browser window alongside Chrome's built-in **Ask Gemini** side panel and set up 1-click **Slash Skills** at `chrome://skills/yourSkills`:
- `/still` — Photoreal Still Images, material-driven Packshots, and Character Sheets.
- `/shot` — Video T2V, concise I2V Motion-Only prompts (20–35 words), and multi-shot TVC storyboards.
- `/edit` — Surgical Image Edits (`Change / Preserve / Integration`), multi-image compositing, and V2V Product Relight.
- `/think` — 6-in-1 Creative Thinking orchestrator (Lateral Thinking, SCAMPER, Six Thinking Hats, Reverse Brainstorming, Tree of Thoughts, First Principles).
- `/flow` — All-in-One Flow Director routing across all modes.

Copy any skill in one click from the [PromptAgent Portal](https://prompt.manhhuynh.work) or the [User Guide](https://prompt.manhhuynh.work/guide).

### 🛡️ Non-Intrusive Default: Google Flow Only by Default
To prevent the floating dock from appearing unexpectedly while browsing other websites:
- **Default**: The floating dock appears automatically **only on Google Flow (`flow.google.com`)**.
- **Manual Per-Site Toggle**: To enable the dock on Adobe Firefly, Magnific / Freepik Spaces, Higgsfield AI, Midjourney, or any other AI tool, simply open the extension popup and click **`Paste: OFF` → `Paste: ON`** (or enable *Auto-detect AI sites* in Settings).

</div>

<!-- ======================================================================= -->
<!-- SCRIPT: LANGUAGE TOGGLE LOGIC                                           -->
<!-- ======================================================================= -->
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
