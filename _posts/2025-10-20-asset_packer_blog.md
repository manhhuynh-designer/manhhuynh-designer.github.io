---
layout: post
title: "[Addon] Blender Asset Packer"
date: 2025-10-20
author: Mạnh Huỳnh
categories: [Share, Tool, Blender Addon]
tags: [Blender, addon, asset-packer, relink, video, sequence, HDRI, Blender addon, pack assets, backup blender, linked-libraries, simulation-cache, extensions]
thumbnail: /blog/assets/asset-packer.png
excerpt: >
  Đóng gói toàn bộ tài nguyên (assets) bên ngoài của dự án Blender vào một thư mục gọn gàng, dễ mang đi — và tự động relink an toàn — chỉ với một cú nhấp chuột. Hỗ trợ Linked Libraries, Simulation Caches, Fonts 3D, Âm thanh, UDIM, và đóng gói add‑on.
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
<div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4 text-sm text-gray-700 dark:text-gray-300">
<p class="mb-1"><strong>Tên Add‑on:</strong> Blender Asset Packer</p>
<p class="mb-1"><strong>Phiên bản:</strong> 1.9.0 • Blender 2.80+ & 4.2+ (Extensions)</p>
<p class="mb-0"><strong>Vị trí:</strong> View 3D → Sidebar (phím N) → tab "Asset Packer"</p>
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
    <a href="https://manhdesigns.gumroad.com/l/assetpacker" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fas fa-shopping-cart mr-3"></i> Tải miễn phí từ Gumroad
    </a>
    <a href="https://github.com/Manh-Huynh-PP/Blender-assets-packer/releases/tag/v1.9.0" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gray-800 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fab fa-github mr-3"></i> Tải bản v1.9.0 từ GitHub
    </a>
  </div>
<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-6">
  <p class="m-0 text-blue-800 dark:text-blue-200">
    🚀 <strong>Cập nhật v1.9.0:</strong> Bổ sung hỗ trợ đầy đủ <strong>Linked Libraries (.blend) & Library Overrides</strong>, đóng gói <strong>Font chữ 3D (.ttf, .otf) & Âm thanh (Audio/Sounds)</strong>, bộ lọc phạm vi <strong>Scene Scope</strong> (All / Active / Selected Scene), nhận diện texture <strong>UDIM Tiles</strong>, gom trọn bộ các thư mục <strong>Simulation Cache (Fluid, Cloth, Particles, Geo Nodes, Alembic, VDB)</strong> và chuẩn hóa định dạng <strong>Blender 4.2+ Extensions</strong>!
  </p>
</div>

## Tổng quan

**Blender Asset Packer** là add‑on giúp đóng gói toàn bộ tài nguyên (assets) bên ngoài của dự án Blender vào một thư mục độc lập, dễ dàng chia sẻ, gửi render farm hoặc lưu trữ dự án dài hạn. Khác với tính năng **Pack Resources** có sẵn trong Blender (nhúng file vào .blend), add‑on này tạo một cấu trúc thư mục bên ngoài với đường dẫn tương đối an toàn, giúp bạn kiểm soát và quản lý assets tối ưu hơn.

<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg">
  <h5 class="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4"><i class="fas fa-info-circle mr-2"></i> So sánh nhanh: Asset Packer vs. Pack Resources</h5>
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <strong class="text-blue-700 dark:text-blue-400">Pack Resources (Blender built-in)</strong>
      <ul class="text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
        <li>✅ Nhúng file vào .blend</li>
        <li>✅ Đơn giản, 1 file duy nhất</li>
        <li>❌ File .blend rất nặng (GBs)</li>
        <li>❌ Khó chỉnh sửa assets bên ngoài</li>
        <li>❌ Không đóng gói add-ons</li>
        <li>❌ Không hỗ trợ Linked Libraries & Overrides</li>
        <li>❌ Không hỗ trợ thư mục Cache/Simulations ngoài</li>
      </ul>
    </div>
    <div>
      <strong class="text-blue-700 dark:text-blue-400">Asset Packer (Add-on)</strong>
      <ul class="text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
        <li>✅ File .blend nhẹ, độc lập</li>
        <li>✅ Assets tách biệt, dễ quản lý</li>
        <li>✅ Đường dẫn tương đối chuẩn xác 100%</li>
        <li>✅ Hỗ trợ Linked Libraries & Library Overrides</li>
        <li>✅ Hỗ trợ trọn vẹn Caches (VDB, Fluid, Geo Nodes)</li>
        <li>✅ Hỗ trợ Fonts 3D, Âm thanh & UDIM tiles</li>
        <li>✅ Đóng gói cả add-ons kèm installer</li>
      </ul>
    </div>
  </div>
</div>

---

## Tại sao nên dùng Asset Packer?

### 🚀 Tính năng nổi bật trong bản v1.9.0

<div class="grid md:grid-cols-2 gap-6 my-8">
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-mouse-pointer text-blue-500 mr-2"></i> Một nhấp là xong</h5>
    <p class="text-gray-600 dark:text-gray-300">Tự động quét và đóng gói: ảnh đơn, chuỗi ảnh, UDIM, video, HDRI, textures, font 3D, âm thanh, VSE strips, nút Compositor, video nền camera — tất cả trong một lần.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-cubes text-purple-500 mr-2"></i> Hỗ trợ Linked Libraries</h5>
    <p class="text-gray-600 dark:text-gray-300">Tự động quét và sao chép các file <code>.blend</code> liên kết ngoài (<code>bpy.data.libraries</code>), cập nhật lại datablock giúp Library Overrides hoạt động liền mạch trên máy mới.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-fire text-amber-500 mr-2"></i> Gom bộ đệm Mô phỏng & Cache</h5>
    <p class="text-gray-600 dark:text-gray-300">Định vị và sao chép toàn bộ thư mục point cache cho Fluid Domains, Cloth/Physics, Alembic (.abc), OpenVDB (.vdb) và bakes Geometry Nodes.</p>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-filter text-indigo-500 mr-2"></i> Lọc theo Scene Scope</h5>
    <p class="text-gray-600 dark:text-gray-300">Linh hoạt chọn đóng gói toàn bộ file (All Scenes), chỉ scene đang mở (Active Scene) hoặc một scene bất kỳ được chỉ định (Selected Scene).</p>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-link text-green-500 mr-2"></i> Relink cực chắc</h5>
    <p class="text-gray-600 dark:text-gray-300">Tự động chuyển sang đường dẫn tương đối (<code>//...</code>), có cơ chế fallback thông minh xử lý trường hợp trùng tên file ở các thư mục khác nhau.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-puzzle-piece text-yellow-500 mr-2"></i> Đóng gói Add-ons</h5>
    <p class="text-gray-600 dark:text-gray-300">Tùy chọn đóng gói các add‑on đang bật vào thư mục <code>_addons/</code> kèm manifest và bảng installer khôi phục dễ dàng.</p>
  </div>
</div>

### 📊 So sánh chi tiết với Pack Resources

<div class="overflow-x-auto my-8">
  <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Tính năng</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Pack Resources<br/><small>(Blender built-in)</small></th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Asset Packer<br/><small>(v1.9.0)</small></th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Cách lưu trữ</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">Nhúng vào file .blend</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">Thư mục riêng, cấu trúc rõ ràng</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Kích thước file .blend</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Rất nặng (GBs)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Nhẹ (chỉ references)</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Linked Libraries (.blend)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Không hỗ trợ</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Copy & relink datablocks</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Caches (VDB, Fluid, Geo Nodes)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Không hỗ trợ</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Sao chép trọn vẹn folder cache</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Fonts 3D & Âm thanh</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Hạn chế</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Nhận diện & đóng gói tự động</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Chuỗi ảnh & UDIM tiles</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Nhúng từng frame</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Nhận diện pattern & pack tự động</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Đóng gói Add-ons</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Không hỗ trợ</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Đóng gói kèm installer panel</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Relink tự động</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Thủ công sau unpack</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Tự động với fallback thông minh</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Những gì được đóng gói trong v1.9.0

- **Thư viện liên kết ngoài (Linked Libraries):** Các file `.blend` được link (`bpy.data.libraries`), library overrides và linked collections/objects.
- **Hình ảnh đơn lẻ:** Textures vật liệu, World HDRI, Camera background images, Compositor images.
- **Chuỗi ảnh & UDIM Tiles:** Image sequences (phát hiện pattern đánh số), UDIM multi-tiles (1001, 1002...).
- **Video & Movie Clips:** Movie clips, Camera background videos, VSE video strips, Compositor clips, Movie texture nodes.
- **Mô phỏng & Caches:** Thư mục Fluid domains, Cloth & Softbody point caches, Alembic (.abc), OpenVDB volumes (.vdb), Geometry Nodes bakes.
- **Font chữ 3D & Âm thanh:** File font 3D Text (`.ttf`, `.otf`) và file âm thanh (sound clips / VSE audio).
- **Đèn IES:** Các file cấu hình quang phổ đèn IES photometric.
- **Tùy chọn Add-ons:** Sao lưu toàn bộ add-on người dùng đang bật vào `_addons/` kèm manifest cài đặt lại.

---

## Cài đặt Add-on

### Dành cho Blender 4.2+ (Định dạng Extensions)
1. Tải file **`asset_packer.zip`** từ [Releases GitHub](https://github.com/Manh-Huynh-PP/Blender-assets-packer/releases/tag/v1.9.0).
2. Mở Blender → Vào menu **Edit > Preferences > Get Extensions**.
3. Bấm vào icon mũi tên trỏ xuống góc phải trên (hoặc chọn **Install from Disk...**).
4. Chọn file `asset_packer.zip` và kích hoạt add-on.

### Dành cho Blender 2.80+ tới 4.1 (Add-on truyền thống)
1. Tải file **`asset_packer.zip`**.
2. Mở Blender → Vào **Edit > Preferences > Add-ons**.
3. Bấm nút **Install...**, chọn file `asset_packer.zip`.
4. Đánh dấu tick vào ô **Import-Export: Asset Packer** để bật.

- **Vị trí thanh công cụ:** Mở vùng làm việc 3D (3D Viewport) → Bấm phím **`N`** để mở thanh Sidebar → Chọn thẻ **Asset Packer**.

---

## Bắt đầu nhanh

1. Mở file Blender của bạn.
2. Mở N‑panel → chọn thẻ **Asset Packer**.
3. Bấm **📁 Select Output Directory** để chọn thư mục lưu trữ gói xuất ra.
4. Tùy chỉnh các cài đặt theo nhu cầu:
   - **Include .blend File:** Sao chép file `.blend` hiện tại vào thư mục Output.
   - **Auto Save Before Pack:** Tự động lưu file hiện tại trước khi pack.
   - **Relink Assets:** Mở file `.blend` đã sao chép và cập nhật toàn bộ đường dẫn thành tương đối (`//...`).
   - **Include Linked Libraries:** Sao chép và relink các file `.blend` liên kết ngoài.
   - **Include Fonts & Sounds:** Sao chép font 3D và file âm thanh.
   - **Include Enabled Add‑ons:** Gom các add-on đang bật vào `_addons/`.
   - **Scene Scope:** Chọn phạm vi quét (`All Scenes`, `Active Scene Only`, hoặc `Selected Scene`).
5. Bấm **🚀 Scan & Pack Assets**.
6. Xem hộp thoại tổng kết và file log chi tiết (`asset_pack_log_YYYY-MM-DD_HH-MM-SS.txt`) sinh ra trong thư mục Output.

---

## Trình cài đặt Add‑on (Add-on Installer)

Khi gửi thư mục đã pack cho đối tác hoặc render farm, họ có thể dễ dàng khôi phục các add-on cần thiết:
1. Mở N‑panel → Thẻ **Asset Packer** → Mục **Asset Packer: Add-on Installer**.
2. Bấm **Install from folder...** và chọn thư mục Output (chứa `_addons/`).
3. Trình cài đặt sẽ tự động đọc `addons_manifest.json` và kích hoạt đầy đủ các add-on tương thích mà không làm trùng lặp cấu hình.

---

## Nhật ký thay đổi (Changelog)

- **v1.9.0** *(Mới nhất)*
  - Hỗ trợ đóng gói và relink trọn vẹn **Linked Libraries (`.blend`)** và Library Overrides.
  - Hỗ trợ đóng gói **Font chữ 3D (`.ttf`, `.otf`)** và **File âm thanh (Audio/Sounds)**.
  - Thêm bộ lọc phạm vi **Scene Scope** (`ALL`, `ACTIVE`, `SELECTED`).
  - Hỗ trợ nhận diện texture **UDIM multi-tiles**.
  - Gom toàn bộ thư mục **Simulation Cache** (Fluid, Cloth, Particles, Geo Nodes, Alembic, VDB).
  - Đóng gói chuẩn tương thích hoàn toàn định dạng **Blender 4.2+ Extensions (`blender_manifest.toml`)**.
- **v1.8.0**
  - Bổ sung khả năng quét và đóng gói cache simulation cơ bản.
  - Tương thích với Blender 5.0 alpha.
- **v1.5.0**
  - Hỗ trợ video formats mở rộng (Movie clips, VSE, camera backgrounds, compositor).
  - Thêm tính năng đóng gói add-on kèm manifest và bảng cài đặt Add-on Installer.

---

## Giấy phép (License)

Add-on được phát hành mã nguồn mở theo giấy phép [GPL-3.0 License](https://github.com/Manh-Huynh-PP/Blender-assets-packer/blob/master/LICENSE). Bạn có toàn quyền sử dụng, đóng gói và chia sẻ dự án của mình.

</div>
<!-- End Vietnamese Content -->

<!-- English Content -->
<div id="content-en" class="content-lang" markdown="1">

  <div class="flex flex-wrap justify-center gap-4 my-6">
    <a href="https://manhdesigns.gumroad.com/l/assetpacker" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-blue-600 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fas fa-shopping-cart mr-3"></i> Free download from Gumroad
    </a>
    <a href="https://github.com/Manh-Huynh-PP/Blender-assets-packer/releases/tag/v1.9.0" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center bg-gray-800 text-white font-bold px-8 py-4 rounded-xl text-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg">
      <i class="fab fa-github mr-3"></i> Download v1.9.0 from GitHub
    </a>
  </div>

<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-6">
  <p class="m-0 text-blue-800 dark:text-blue-200">
    🚀 <strong>Update v1.9.0:</strong> Added full support for packing & relinking <strong>Linked Libraries (.blend) & Library Overrides</strong>, bundling <strong>3D Text Fonts (.ttf, .otf) & Audio/Sounds</strong>, <strong>Scene Scope</strong> filtering (All / Active / Selected Scene), <strong>UDIM Tiles</strong> recognition, complete <strong>Simulation & Physics Cache folders</strong> bundling (Fluid, Cloth, Particles, Geo Nodes bakes, Alembic, VDB Volumes), and standard <strong>Blender 4.2+ Extensions</strong> format!
  </p>
</div>

## Overview

**Blender Asset Packer** is an add-on that collects and packages all external assets from your Blender project into a clean, standalone directory, making it easy to share, archive, or send to render farms. Unlike Blender's native **Pack Resources** feature (which embeds files directly into the .blend), this tool creates a structured external folder with safe relative paths for maximum flexibility.

<div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg">
  <h5 class="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4"><i class="fas fa-info-circle mr-2"></i> Quick Comparison: Asset Packer vs. Pack Resources</h5>
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <strong class="text-blue-700 dark:text-blue-400">Pack Resources (Blender built-in)</strong>
      <ul class="text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
        <li>✅ Embeds files into .blend</li>
        <li>✅ Simple single file</li>
        <li>❌ Huge .blend file size (GBs)</li>
        <li>❌ Difficult to modify assets externally</li>
        <li>❌ Cannot pack add-ons</li>
        <li>❌ No Linked Libraries or Library Overrides support</li>
        <li>❌ Cannot handle external simulation cache directories</li>
      </ul>
    </div>
    <div>
      <strong class="text-blue-700 dark:text-blue-400">Asset Packer (Add-on)</strong>
      <ul class="text-sm mt-2 space-y-1 text-gray-700 dark:text-gray-300">
        <li>✅ Lightweight, independent .blend file</li>
        <li>✅ External assets neatly structured</li>
        <li>✅ 100% reliable relative path relinking</li>
        <li>✅ Full Linked Libraries & Overrides support</li>
        <li>✅ Full Simulation Caches support (VDB, Fluid, Geo Nodes)</li>
        <li>✅ 3D Text Fonts, Audio & UDIM Tiles support</li>
        <li>✅ Bundles active add-ons with installer panel</li>
      </ul>
    </div>
  </div>
</div>

---

## Why Use Asset Packer?

### 🚀 Key Features in v1.9.0

<div class="grid md:grid-cols-2 gap-6 my-8">
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-mouse-pointer text-blue-500 mr-2"></i> One-Click Solution</h5>
    <p class="text-gray-600 dark:text-gray-300">Automatically scans and packages images, sequences, UDIM tiles, videos, HDRIs, textures, 3D fonts, sounds, VSE strips, and compositor nodes in one pass.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-cubes text-purple-500 mr-2"></i> Linked Libraries Support</h5>
    <p class="text-gray-600 dark:text-gray-300">Discovers external linked <code>.blend</code> files (<code>bpy.data.libraries</code>), copies them, and remaps library datablocks so Library Overrides function without broken links.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-fire text-amber-500 mr-2"></i> Simulation & Cache Bundling</h5>
    <p class="text-gray-600 dark:text-gray-300">Locates and copies entire cache directories for Fluid domains, Cloth/Physics point caches, Alembic (.abc), OpenVDB (.vdb), and Geometry Nodes bakes.</p>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-filter text-indigo-500 mr-2"></i> Scene Scope Filtering</h5>
    <p class="text-gray-600 dark:text-gray-300">Choose between scanning the entire file (All Scenes), only the current active scene (Active Scene Only), or a designated scene (Selected Scene).</p>
  </div>

  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-link text-green-500 mr-2"></i> Rock-Solid Relinking</h5>
    <p class="text-gray-600 dark:text-gray-300">Relinks paths inside the copied .blend to relative paths (<code>//...</code>) with smart fallback resolution for identical filenames in different folders.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-puzzle-piece text-yellow-500 mr-2"></i> Add-ons Backup & Installer</h5>
    <p class="text-gray-600 dark:text-gray-300">Optionally backs up active user add-ons into <code>_addons/</code> with a manifest and a dedicated installer panel for target machines.</p>
  </div>
</div>

---

## What Gets Packed in v1.9.0

- **Linked Libraries:** External linked `.blend` files (`bpy.data.libraries`), library overrides, and linked collections/objects.
- **Single Images:** Material textures, World HDRIs, Camera background plates, Compositor image nodes.
- **Image Sequences & UDIMs:** Sequential frames (automatic pattern detection) and multi-tile UDIM textures (1001, 1002...).
- **Videos & Clips:** Movie clips, Camera background clips, VSE video strips, Compositor movie clips, Material video textures.
- **Simulations & Caches:** Fluid domain caches, Cloth and particle point caches, Alembic files (.abc), OpenVDB volumes (.vdb), Geometry Nodes bakes.
- **3D Fonts & Audio:** 3D text font files (`.ttf`, `.otf`) and audio/sound strips.
- **Photometric Profiles:** Light IES profiles.
- **Add-on Bundles (Optional):** Active user add-ons exported to `_addons/` with manifest.

---

## Installation

### For Blender 4.2+ (Extension Support)
1. Download **`asset_packer.zip`** from [GitHub Releases](https://github.com/Manh-Huynh-PP/Blender-assets-packer/releases/tag/v1.9.0).
2. Open Blender → Go to **Edit > Preferences > Get Extensions**.
3. Click the menu/arrow in the top-right and select **Install from Disk...**.
4. Select `asset_packer.zip` and enable the extension.

### For Blender 2.80 - 4.1 (Legacy Add-on)
1. Download **`asset_packer.zip`**.
2. Open Blender → Go to **Edit > Preferences > Add-ons**.
3. Click **Install...** and choose `asset_packer.zip`.
4. Enable **Import-Export: Asset Packer**.

- **Sidebar Panel:** Open 3D Viewport → Press **`N`** → Navigate to the **Asset Packer** tab.

---

## Quick Start

1. Open your project in Blender.
2. Open the N-panel → go to the **Asset Packer** tab.
3. Click **📁 Select Output Directory** to choose your destination folder.
4. Configure options:
   - **Include .blend File:** Copies the project `.blend` file into the output directory.
   - **Auto Save Before Pack:** Saves current file before packing.
   - **Relink Assets:** Remaps asset paths in the copied `.blend` to relative paths (`//...`).
   - **Include Linked Libraries:** Copies and relinks external `.blend` libraries.
   - **Include Fonts & Sounds:** Copies and relinks 3D text fonts and audio files.
   - **Include Enabled Add-ons:** Bundles active add-ons to `_addons/`.
   - **Scene Scope:** Choose `All Scenes`, `Active Scene Only`, or `Selected Scene`.
5. Click **🚀 Scan & Pack Assets**.
6. Check the popup summary and the generated timestamped log file (`asset_pack_log_YYYY-MM-DD_HH-MM-SS.txt`) in the output folder.

---

## Changelog (Highlights)

- **v1.9.0** *(Latest)*
  - Full support for **Linked Libraries (`.blend`)** and Library Overrides packing & relinking.
  - Full support for **3D Text Fonts (`.ttf`, `.otf`)** and **Audio/Sound files**.
  - Added **Scene Scope** filtering (`ALL`, `ACTIVE`, `SELECTED`).
  - Added detection and packing for **UDIM multi-tile textures**.
  - Bundles complete **Simulation & Physics Cache folders** (Fluid, Cloth, Particles, Geo Nodes, Alembic, VDB).
  - Fully compliant with **Blender 4.2+ Extensions format (`blender_manifest.toml`)**.
- **v1.8.0**
  - Added basic simulation cache packing.
  - Compatibility updates for Blender 5.0 alpha.
- **v1.5.0**
  - Video format support (Movie clips, VSE, compositor, camera backgrounds).
  - Add-on packaging with manifest and built-in Add-on Installer panel.

---

## License

Open source under the [GPL-3.0 License](https://github.com/Manh-Huynh-PP/Blender-assets-packer/blob/master/LICENSE). You are free to use, package, and distribute your packed project folders.

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
