---
layout: post
title: "Hướng dẫn tự động thay Text và Render hàng loạt trong After Effects | Batch Text Replacer Script"
date: 2026-08-19
author: Mạnh Huỳnh
categories: [Share, Guide, After Effects]
tags: [After Effects, ExtendScript, JSX, Automation, Render Queue, Batch Text, Motion Graphics, H.264, MP4]
thumbnail: /blog/assets/batch-text-replacer/thumbnail.png
excerpt: >
  Script After Effects giúp tự động thay thế nội dung text từ file CSV/TXT, nhân bản composition và đưa hàng loạt video vào Render Queue với định dạng MP4/MOV.
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

# Tự động thay Text và Render hàng loạt trong After Effects

Khi làm các dự án video cần cá nhân hóa như thiệp mời sự kiện, video vinh danh, chứng chỉ trao giải hoặc intro cho hàng chục đến hàng trăm người, việc mở từng comp, gõ lại tên thủ công và thêm từng file vào Render Queue thường mất nhiều thời gian và dễ nhầm lẫn.

Bài viết này chia sẻ script **Batch Text Replacer & Auto Render** (`.jsx`) dành cho Adobe After Effects. Script tự động đọc danh sách tên từ file CSV hoặc TXT (hỗ trợ tiếng Việt có dấu UTF-8), nhân bản composition mẫu, thay đổi layer chữ và đưa toàn bộ danh sách vào Render Queue với định dạng MP4 (H.264) hoặc MOV.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 32px 0; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
  <iframe src="https://www.youtube.com/embed/_MJdM0EpOIg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="After Effects Batch Text Replacer & Auto Render Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://drive.google.com/drive/folders/1E7JD7b5A-_GKXUmkJ6s9sWsE11kzYb7W?usp=drive_link" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Tải Script trên Google Drive
  </a>
  <a href="/blog/assets/batch-text-replacer/sample_names.csv" download="sample_names.csv" class="bg-gray-700 hover:bg-gray-800 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-file-csv mr-3"></i> Tải File CSV Mẫu
  </a>
</div>

---

## 1. Các tính năng chính của Script

- **Tự động nhận diện Composition & Text Layer**: Quét toàn bộ layer chữ trong comp đang chọn mà không cần tìm thủ công.
- **Hỗ trợ tiếng Việt Unicode UTF-8**: Đọc dữ liệu từ file CSV hoặc TXT, xử lý dấu tiếng Việt chính xác.
- **Tùy chọn cột dữ liệu**: Cho phép chọn cột bất kỳ trong file CSV (chỉ mục cột bắt đầu từ 0) và bỏ qua dòng tiêu đề.
- **Tổ chức thư mục gọn gàng**: Các composition nhân bản được gom tự động vào một thư mục riêng trong cửa sổ Project (`Batch_CompName_xxxx`).
- **Cấu hình Render Queue tự động**: Tự động áp dụng Output Module Template chuẩn (H.264 MP4 hoặc ProRes/Lossless MOV) và đặt tên file video theo từng người trong danh sách.
- **Xử lý an toàn Keyframes & Expressions**: Tự động tắt expression và gỡ keyframe cũ trên thuộc tính `Source Text` để đảm bảo nội dung mới hiển thị cố định suốt thời lượng comp.

---

## 2. Hướng dẫn cài đặt và sử dụng

### Bước 1: Khởi chạy Script trong After Effects
Có 2 cách để mở script:
- **Cách dùng nhanh**: Mở After Effects, vào menu **`File`** ➔ **`Scripts`** ➔ **`Run Script File...`** và chọn file `batch_text_replacer_and_render.jsx`.
- **Cài đặt cố định vào menu Window**: Copy file `batch_text_replacer_and_render.jsx` vào thư mục:
  - Windows: `C:\Program Files\Adobe\Adobe After Effects <Version>\Support Files\Scripts\ScriptUI Panels\`
  - Sau khi copy, khởi động lại After Effects và mở script từ menu **`Window`** để gắn panel vào không gian làm việc.

### Bước 2: Chọn Composition và Text Layer
1. Tại phần **1. Chọn Composition & Text Layer**, chọn composition mẫu bạn muốn nhân bản.
2. Chọn layer chữ cần thay đổi nội dung từ danh sách dropdown.

### Bước 3: Nạp danh sách tên từ CSV hoặc TXT
1. Bấm **`📁 Chọn File...`** và trỏ đến file danh sách tên của bạn.
2. Nếu file CSV có dòng tiêu đề (Header), tích chọn **Bỏ qua dòng đầu (Header)**.
3. Nếu tên nằm ở cột thứ 2 trong file CSV, nhập số `1` vào ô **Cột lấy dữ liệu (0-index)**. Danh sách xem trước sẽ hiển thị ngay bên dưới.

### Bước 4: Chọn thư mục xuất video và định dạng
1. Nhập hoặc bấm **`📂 Thư mục...`** để chọn nơi lưu video xuất ra.
2. Chọn định dạng đuôi `.mp4` hoặc `.mov`. Script sẽ tự động gán Output Module Template tương ứng trong Render Queue.

### Bước 5: Bắt đầu tạo Batch
Bấm nút **`🚀 TẠO BATCH & THÊM VÀO RENDER QUEUE`**. Script sẽ tự động:
- Nhân bản từng composition tương ứng với từng dòng trong file CSV.
- Thay thế nội dung chữ trên layer đã chọn.
- Đặt tên file xuất theo tên khách và thêm vào Render Queue.
- Sau khi hoàn tất, bạn chỉ cần bấm **`Render`** trong After Effects để xuất video.

---

## 3. Lưu ý kỹ thuật khi chuẩn bị file

- **Định dạng file CSV**: Khi xuất file từ Excel hoặc Google Sheets, hãy chọn định dạng **CSV UTF-8 (Comma delimited)** để tránh lỗi font tiếng Việt.
- **Ký tự đặc biệt trong tên file**: Script tự động lọc bỏ các ký tự không hợp lệ trong tên file của hệ điều hành (`\`, `/`, `:`, `*`, `?`, `"`, `<`, `>`, `|`) để đảm bảo quá trình render không bị ngắt quãng.

Nếu bạn có câu hỏi hoặc cần tùy biến thêm tính năng cho quy trình làm việc của mình, hãy để lại bình luận ở bên dưới.

</div>

<!-- ======================================================================= -->
<!-- ENGLISH CONTENT                                                         -->
<!-- ======================================================================= -->
<div id="content-en" class="content-lang" markdown="1">

# Automated Batch Text Replacer & Render Script for After Effects

When working on video projects requiring high personalization—such as event invitations, employee recognition reels, graduation certificates, or customized intro cards for dozens or hundreds of recipients—manually editing text layers and adding each composition to the Render Queue is repetitive and time-consuming.

This post shares the **Batch Text Replacer & Auto Render** ExtendScript (`.jsx`) for Adobe After Effects. It reads guest or name lists from a CSV or TXT file (with full UTF-8 Unicode support), duplicates the master composition, updates the target text layer, and queues all outputs as MP4 (H.264) or MOV files.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 32px 0; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
  <iframe src="https://www.youtube.com/embed/_MJdM0EpOIg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="After Effects Batch Text Replacer & Auto Render Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://drive.google.com/drive/folders/1E7JD7b5A-_GKXUmkJ6s9sWsE11kzYb7W?usp=drive_link" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Download Script on Google Drive
  </a>
  <a href="/blog/assets/batch-text-replacer/sample_names.csv" download="sample_names.csv" class="bg-gray-700 hover:bg-gray-800 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-file-csv mr-3"></i> Download Sample CSV
  </a>
</div>

---

## 1. Key Features

- **Automatic Composition & Text Layer Detection**: Scans and lists all editable text layers in the selected composition without manual layer ID lookup.
- **UTF-8 Unicode Support**: Seamlessly handles international accents and Vietnamese characters from CSV/TXT data files.
- **Custom Column Indexing**: Allows selecting any column index (0-indexed) with an option to skip header rows.
- **Organized Project Structure**: Duplicated compositions are grouped into dedicated project folders (`Batch_CompName_xxxx`).
- **Automated Render Queue Configuration**: Applies H.264 (MP4) or ProRes/Lossless (MOV) output module templates and sets clean, sanitized file names.
- **Safe Keyframe & Expression Handling**: Disables active expressions and removes old keyframes on `Source Text` to guarantee consistent text display throughout the duration.

---

## 2. Step-by-Step Guide

### Step 1: Launch the Script in After Effects
You can run the script in two ways:
- **Direct Run**: In After Effects, navigate to **`File`** ➔ **`Scripts`** ➔ **`Run Script File...`** and select `batch_text_replacer_and_render.jsx`.
- **Dockable Panel Installation**: Place `batch_text_replacer_and_render.jsx` inside:
  - Windows: `C:\Program Files\Adobe\Adobe After Effects <Version>\Support Files\Scripts\ScriptUI Panels\`
  - Restart After Effects, then access it from the **`Window`** menu to dock it alongside your standard workspace panels.

### Step 2: Select Composition and Text Layer
1. In section **1. Choose Composition & Text Layer**, select your template composition.
2. Pick the text layer you wish to customize from the dropdown.

### Step 3: Load CSV or TXT Data
1. Click **`📁 Browse File...`** and select your data file.
2. Check **Skip First Line (Header)** if your CSV includes column titles.
3. Set the column index in **Column Index (0-index)**. A live preview of the parsed entries will appear in the box below.

### Step 4: Choose Output Folder & Format
1. Enter or browse for the export directory.
2. Select `.mp4` or `.mov`. The script automatically maps matching Output Module templates.

### Step 5: Execute Batch Duplication
Click **`🚀 CREATE BATCH & ADD TO RENDER QUEUE`**. The script will:
- Duplicate the composition for every name in the dataset.
- Update the target text layer with exact character encoding.
- Add all items to the Render Queue with sanitized filenames.
- Click **`Render`** inside After Effects to export the entire batch.

---

## 3. Best Practices

- **CSV Encoding**: When exporting from Excel or Google Sheets, ensure the file is saved as **CSV UTF-8 (Comma delimited)**.
- **Filename Sanitization**: The script automatically removes invalid file path characters (`\`, `/`, `:`, `*`, `?`, `"`, `<`, `>`, `|`) to prevent rendering errors.

Feel free to leave a comment below if you have any questions or workflow customization requests.

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
