---
layout: post
title: "[Addon] Blender Asset Packer"
date: 2025-10-20
author: Mạnh Huỳnh
categories: [Share, Tool]
tags: [Blender, addon, asset-packer, relink, video, sequence, HDRI]
thumbnail: /blog/assets/asset-packer.png
excerpt: >
  Đóng gói toàn bộ tài nguyên (assets) bên ngoài của dự án Blender vào một thư mục gọn gàng, dễ mang đi — và tự động relink an toàn — chỉ với một cú nhấp chuột. Có thể kèm theo đóng gói các add‑on đang bật và khôi phục lại sau này bằng trình cài đặt tích hợp.
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
<p class="mb-1"><strong>Phiên bản:</strong> 1.5 • Blender 2.80+</p>
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

## Tổng quan

**Blender Asset Packer** là add‑on giúp đóng gói toàn bộ tài nguyên (assets) bên ngoài của dự án Blender vào một thư mục độc lập, dễ dàng chia sẻ hoặc lưu trữ. Khác với tính năng **Pack Resources** có sẵn trong Blender (nhúng file vào .blend), add‑on này tạo một cấu trúc thư mục bên ngoài với đường dẫn tương đối, giúp bạn kiểm soát và quản lý assets tốt hơn.


  <h5 class="text-lg font-bold text-blue-800 mb-4"><i class="fas fa-info-circle mr-2"></i> So sánh nhanh: Asset Packer vs. Pack Resources</h5>
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <strong class="text-blue-700">Pack Resources (Blender built-in)</strong>
      <ul class="text-sm mt-2 space-y-1">
        <li>✅ Nhúng file vào .blend</li>
        <li>✅ Đơn giản, 1 file duy nhất</li>
        <li>❌ File .blend rất nặng</li>
        <li>❌ Khó chỉnh sửa assets</li>
        <li>❌ Không đóng gói add-ons</li>
        <li>❌ Không có cấu trúc thư mục</li>
      </ul>
    </div>
    <div>
      <strong class="text-blue-700">Asset Packer (Add-on)</strong>
      <ul class="text-sm mt-2 space-y-1">
        <li>✅ File .blend nhẹ</li>
        <li>✅ Assets tách biệt, dễ quản lý</li>
        <li>✅ Đường dẫn tương đối</li>
        <li>✅ Đóng gói cả add-ons</li>
        <li>✅ Hỗ trợ sequences & videos</li>
        <li>✅ Tự động relink thông minh</li>
      </ul>
    </div>
  </div>

<br/>



---

## Tại sao nên dùng Asset Packer?

### 🚀 Tính năng nổi bật

<div class="grid md:grid-cols-2 gap-6 my-8">
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-mouse-pointer text-blue-500 mr-2"></i> Một nhấp là xong</h5>
    <p class="text-gray-600 dark:text-gray-300">Tự động quét và đóng gói: ảnh đơn, chuỗi ảnh, video, HDRI, textures, VSE strips, nút Compositor, video nền camera — tất cả trong một lần.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-link text-green-500 mr-2"></i> Relink cực chắc</h5>
    <p class="text-gray-600 dark:text-gray-300">Tự động tìm + chuyển sang đường dẫn tương đối, có cơ chế fallback thông minh xử lý trường hợp trùng tên file.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-film text-red-500 mr-2"></i> Hiểu chuỗi ảnh & video</h5>
    <p class="text-gray-600 dark:text-gray-300">Phát hiện pattern đánh số (file_0001, file0001) và đóng gói đúng toàn bộ sequence. Hỗ trợ Movie Clips, VSE, Compositor clips.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-puzzle-piece text-yellow-500 mr-2"></i> Đóng gói add-ons</h5>
    <p class="text-gray-600 dark:text-gray-300">Tùy chọn đóng gói cả add‑on đang bật, có manifest để cài/enable lại an toàn trên máy khác, tránh trùng lặp.</p>
  </div>
</div>

### 📊 So sánh chi tiết với Pack Resources

<div class="overflow-x-auto my-8">
  <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Tính năng</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Pack Resources<br/><small>(Blender built-in)</small></th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Asset Packer<br/><small>(Add-on)</small></th>
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
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Rất nặng (GB)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Nhẹ (chỉ references)</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Chỉnh sửa assets</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Phải unpack mỗi lần</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Truy cập trực tiếp</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Chia sẻ dự án</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ 1 file lớn, khó upload</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Nén thư mục, dễ chia sẻ</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Quản lý phiên bản</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Git/SVN không hiệu quả</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Track từng file riêng biệt</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Chuỗi ảnh (sequences)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Nhúng từng frame</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Nhận diện & pack tự động</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Video files</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Nhúng vào .blend (rất nặng)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Link tương đối, nhẹ hơn</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Add-ons</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Không hỗ trợ</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Đóng gói + installer</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Relink tự động</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Thủ công sau unpack</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Tự động với fallback thông minh</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Log chi tiết</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Không có</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ File log + UI summary</td>
      </tr>
    </tbody>
  </table>
</div>

---

## Những gì được đóng gói

- Hình ảnh: Textures, World HDRI, Camera backgrounds, Compositor images
- Chuỗi ảnh (Image sequences): Textures, Cameras, VSE, Compositor
- Video: Movie Clips, Camera background videos, VSE video strips, Compositor clips, Movie textures (Materials)
- Khác: Bất kỳ file nào được tham chiếu qua đường dẫn
- Tùy chọn: Copy các add‑on người dùng đang bật vào `_addons/` kèm manifest

Lưu ý: Add‑on built‑in và add‑on cài qua Extensions sẽ không được copy — chỉ tự động enable trên máy đích.

---

## Cách hoạt động

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 my-8">
  <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
    <b class="text-lg font-bold mb-0 text-white"><i class="fas fa-cogs mr-2"></i> Quy trình 5 bước</b>
  </div>
  <div class="p-6">
    <ol class="space-y-4 text-gray-700 dark:text-gray-300">
      <li><strong class="text-blue-600 dark:text-blue-400">1. Quét dự án:</strong> Tìm tất cả đường dẫn file ngoài trong data blocks và node graphs (ảnh, sequence, video, textures, HDRI, VSE, compositor, camera backgrounds).</li>
      <li><strong class="text-blue-600 dark:text-blue-400">2. Sao chép assets:</strong> Copy mọi file tham chiếu về thư mục Output, giữ cấu trúc thư mục rõ ràng.</li>
      <li><strong class="text-blue-600 dark:text-blue-400">3. Copy .blend (tùy chọn):</strong> Sao chép file .blend hiện tại vào Output.</li>
      <li><strong class="text-blue-600 dark:text-blue-400">4. Relink (tùy chọn):</strong> Mở bản .blend đã copy và chuyển đường dẫn sang dạng tương đối (//...), dùng auto-search + fallback thông minh.</li>
      <li><strong class="text-blue-600 dark:text-blue-400">5. Đóng gói add-ons (tùy chọn):</strong> Copy add‑on người dùng vào Output/_addons/ và tạo manifest (danh sách built‑in/extension được ghi nhận).</li>
    </ol>
  </div>
</div>

---

## Cài đặt

- Cài đặt add‑on như thường lệ
  1. Blender → Edit → Preferences → Add‑ons → Install…
  2. Chọn file zip hoặc file Python của add‑on
  3. Enable “Asset Packer” trong danh sách add‑on

- Vị trí Panel: View 3D → Sidebar (phím N) → tab “Asset Packer”
- Preferences: Edit → Preferences → Add‑ons → Asset Packer (mục thông tin & ghi chú)

---

## Bắt đầu nhanh

1. Lưu file .blend của bạn (khuyến nghị trước khi pack)
2. Mở N‑panel → Asset Packer
3. Chọn “Output Directory” (thư mục sẽ chứa gói xuất ra)
4. Tuỳ chọn:
   - Include .blend File: copy file .blend hiện tại vào Output
   - Auto Save Before Pack: tự lưu file trước khi pack
   - Relink Assets: mở bản .blend đã copy và relink các đường dẫn về thư mục đã pack (dùng đường dẫn tương đối)
   - Include Enabled Add‑ons: copy các add‑on đang bật vào _addons/
5. Nhấn “Scan & Pack Assets”
6. Xem console và file log sinh ra để biết chi tiết

Kết quả
- File đã pack nằm trong thư mục Output, giữ cấu trúc theo ổ đĩa và đường dẫn để tránh đụng tên.
- Một file log (asset_pack_log_YYYY-MM-DD_HH-MM-SS.txt) tóm tắt những gì đã copy, file thiếu, và trạng thái relink.

---

## Trình cài đặt Add‑on (khôi phục add‑on)

Có panel riêng: “Asset Packer: Add‑on Installer” trong N‑panel.

- Cài từ _addons
  - Tìm trong thư mục Output của bạn thư mục _addons/ (hoặc _addon/)
  - Cài các add‑on người dùng đã pack (bỏ qua nếu đã tồn tại để tránh nhân bản)
  - Đọc _addons/addons_manifest.json và enable:
    - copied_modules: các add‑on người dùng đã pack
    - builtin_modules: các add‑on built‑in/extension không copy
  - Add‑on built‑in và extension sẽ không copy — chỉ enable trên máy đích

- Hành vi an toàn với trùng lặp
  - Nếu add‑on đã được cài (hoặc đã có trên đĩa), trình cài đặt sẽ bỏ qua bước copy và chỉ enable
  - Nếu add‑on đã được enable, sẽ giữ nguyên

---

## Chi tiết relink

- Tự động: dùng “Find Missing Files” và “Make Paths Relative” của Blender trước tiên
- Fallback thông minh: một bộ giải đường dẫn xác định sẽ chuyển đường dẫn tuyệt đối sang vị trí đã pack, kể cả khi nhiều file trùng tên nhưng ở thư mục khác nhau (ưu tiên khớp cấu trúc thư mục tương đồng nhất)
- Mọi đường dẫn sau khi cập nhật trong bản .blend đã copy đều dùng đường dẫn tương đối dạng //…

---

## Nhận diện chuỗi ảnh (image sequence)

Nhận diện các pattern phổ biến:
- file.0001.exr → có ≥4 chữ số trước phần mở rộng
- file_001.png → dấu gạch dưới + ≥3 chữ số
- file001.jpg → ≥3 chữ số ở cuối tên file

Khi phát hiện, toàn bộ sequence sẽ được đóng gói (không chỉ frame đại diện).

---

## Giải thích các tuỳ chọn

- Include .blend File
  - Sao chép file .blend hiện tại vào thư mục Output

- Auto Save Before Pack
  - Tự lưu .blend hiện tại để hạn chế rủi ro mất thay đổi

- Relink Assets
  - Mở bản .blend đã copy và cập nhật mọi đường dẫn về dạng tương đối trỏ tới file đã pack
  - Áp dụng cho ảnh, sequence, video, textures, camera backgrounds, HDRI, VSE strips và nút compositor

- Include Enabled Add‑ons (tuỳ chọn)
  - Copy các add‑on người dùng đang bật vào Output/_addons/<module>
  - Add‑on built‑in/extension sẽ được phát hiện và không copy
  - Ghi file Output/_addons/addons_manifest.json chứa danh sách module đã copy và built‑in

---

---

## Khắc phục sự cố

- “Missing files” trong log
  - Đường dẫn nguồn không tồn tại khi pack; kiểm tra lại quyền truy cập/file
  - Với sequence, đảm bảo đánh số nhất quán

- “Relinked: 0”
  - Hãy bật “Include .blend File” và “Relink Assets”
  - Một số node phức tạp có thể cần kiểm tra thủ công; xem thêm console

- Trùng tên file ở các thư mục khác nhau
  - Đã được bộ giải xử lý — mỗi file được copy theo cấu trúc thư mục phản ánh nguồn gốc, tránh đè nhau

- Add‑on không cài được
  - Kiểm tra panel “Asset Packer: Add‑on Installer” và thông báo trong console
  - Add‑on built‑in/extension sẽ không được copy; chúng sẽ được enable tự động

- Quyền truy cập trên Windows/macOS/Linux
  - Chọn thư mục Output mà bạn có quyền ghi

---

## Câu hỏi thường gặp (FAQ)

- Công cụ có chỉnh sửa file .blend gốc không?
  - Không. Việc pack và relink diễn ra trên bản .blend đã copy (nếu bạn bật tuỳ chọn này).

- Tôi có thể chỉ pack add‑on không?
  - Có. Bật “Include Enabled Add‑ons” và chạy pack. Dù không có asset, manifest và thư mục _addons vẫn được tạo.

- Có bị nhân đôi add‑on trên máy đích không?
  - Không. Trình cài đặt kiểm tra nếu add‑on đã tồn tại thì bỏ qua bước copy và chỉ enable.

- Hỗ trợ phiên bản Blender nào?
  - Hỗ trợ Blender 2.80+. Các tính năng đã được kiểm thử trên các bản 3.x/4.x gần đây.

---

## Hỗ trợ

Có câu hỏi hoặc yêu cầu tính năng? Hãy nhắn qua Gumroad.

Nếu gặp ca khó, vui lòng cung cấp:
- Phiên bản Blender
- Hệ điều hành
- File log khi pack và mô tả ngắn về cấu trúc assets

---

## Nhật ký thay đổi (điểm nổi bật)

- 1.5
  - Bổ sung hỗ trợ video mạnh mẽ (movie clips, camera backgrounds, VSE, compositor, movie trong Material)
  - Cải thiện relink với cơ chế phân giải đường dẫn cho các file trùng tên
  - Đóng gói add‑on kèm manifest; panel cài đặt; nhận biết built‑in/extension; cài đặt tránh nhân bản
  - Chuyển phần thông tin dài vào Add‑on Preferences; N‑panel gọn hơn

---

## Giấy phép

Giấy phép thương mại cho một người dùng. Không được phép phân phối lại mã nguồn add‑on như một sản phẩm độc lập. Bạn được phép đóng gói và phân phối thư mục assets của dự án của chính bạn.

</div>
<!-- End Vietnamese Content -->

<!-- English Content -->
<div id="content-en" class="content-lang" markdown="1">

## Overview

**Blender Asset Packer** is an add-on that helps you package all external resources (assets) from your Blender project into a standalone folder, making it easy to share or archive. Unlike Blender's built-in **Pack Resources** feature (which embeds files into the .blend), this add-on creates an external folder structure with relative paths, giving you better control and management of your assets.

<div class="bg-blue-50 border-l-4 border-blue-400 p-6 my-6 rounded-r-lg">
  <h5 class="text-lg font-bold text-blue-800 mb-4"><i class="fas fa-info-circle mr-2"></i> Quick Comparison: Asset Packer vs. Pack Resources</h5>
  <div class="grid md:grid-cols-2 gap-6">
    <div>
      <strong class="text-blue-700">Pack Resources (Blender built-in)</strong>
      <ul class="text-sm mt-2 space-y-1">
        <li>✅ Embeds files into .blend</li>
        <li>✅ Simple, single file</li>
        <li>❌ Very heavy .blend file</li>
        <li>❌ Difficult to edit assets</li>
        <li>❌ Doesn't pack add-ons</li>
        <li>❌ No folder structure</li>
      </ul>
    </div>
    <div>
      <strong class="text-blue-700">Asset Packer (Add-on)</strong>
      <ul class="text-sm mt-2 space-y-1">
        <li>✅ Lightweight .blend file</li>
        <li>✅ Separate, easy-to-manage assets</li>
        <li>✅ Relative paths</li>
        <li>✅ Packs add-ons too</li>
        <li>✅ Supports sequences & videos</li>
        <li>✅ Smart auto-relink</li>
      </ul>
    </div>
  </div>
</div>

---

## Why Use Asset Packer?

### 🚀 Key Features

<div class="grid md:grid-cols-2 gap-6 my-8">
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-mouse-pointer text-blue-500 mr-2"></i> One-Click Solution</h5>
    <p class="text-gray-600 dark:text-gray-300">Automatically scans and packs: single images, image sequences, videos, HDRIs, textures, VSE strips, Compositor nodes, camera background videos — all in one go.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-link text-green-500 mr-2"></i> Rock-Solid Relinking</h5>
    <p class="text-gray-600 dark:text-gray-300">Automatically finds and converts to relative paths, with smart fallback handling for duplicate filenames.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-film text-red-500 mr-2"></i> Sequence & Video Aware</h5>
    <p class="text-gray-600 dark:text-gray-300">Detects numbering patterns (file_0001, file0001) and packs entire sequences correctly. Supports Movie Clips, VSE, Compositor clips.</p>
  </div>
  
  <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <h5 class="text-xl font-bold mb-3"><i class="fas fa-puzzle-piece text-yellow-500 mr-2"></i> Add-ons Packaging</h5>
    <p class="text-gray-600 dark:text-gray-300">Optional: pack currently enabled add-ons with a manifest for safe reinstallation on other machines, avoiding duplicates.</p>
  </div>
</div>

### 📊 Detailed Comparison with Pack Resources

<div class="overflow-x-auto my-8">
  <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
    <thead class="bg-gray-50 dark:bg-gray-700">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Feature</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Pack Resources<br/><small>(Blender built-in)</small></th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b">Asset Packer<br/><small>(Add-on)</small></th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Storage Method</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">Embedded in .blend file</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">Separate folder, clear structure</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">.blend File Size</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Very heavy (GB)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Lightweight (references only)</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Editing Assets</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Must unpack every time</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Direct access</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Project Sharing</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Large single file, hard to upload</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Compressed folder, easy to share</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Version Control</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Git/SVN inefficient</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Track individual files</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Image Sequences</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Embeds each frame</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Auto-detect & pack</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Video Files</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Embedded in .blend (very heavy)</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Relative links, lighter</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Add-ons</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ Not supported</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Pack + installer</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Auto-Relink</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">⚠️ Manual after unpack</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Automatic with smart fallback</td>
      </tr>
      <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
        <td class="px-6 py-4 font-medium text-gray-900 dark:text-white">Detailed Logs</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">❌ None</td>
        <td class="px-6 py-4 text-gray-600 dark:text-gray-300">✅ Log file + UI summary</td>
      </tr>
    </tbody>
  </table>
</div>

---

## What Gets Packed

- Images: Textures, World HDRI, Camera backgrounds, Compositor images
- Image sequences: Textures, Cameras, VSE, Compositor
- Videos: Movie Clips, Camera background videos, VSE video strips, Compositor clips, Movie textures (Materials)
- Other: Any file referenced via file paths
- Optional: Copy currently enabled user add-ons to `_addons/` with manifest

Note: Built-in add-ons and Extension-installed add-ons won't be copied — they'll just be auto-enabled on the target machine.

---

## How It Works

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 my-8">
  <div class="bg-blue-500 text-white px-6 py-4 rounded-t-lg">
    <bclass="text-lg font-bold mb-0"><i class="fas fa-cogs mr-2"></i> 5-Step Process</b>
  </div>
  <div class="p-6">
    <ol class="space-y-4 text-gray-700 dark:text-gray-300">
      <li><strong class="text-blue-600 dark:text-blue-400">1. Scan Project:</strong> Find all external file paths in data blocks and node graphs (images, sequences, videos, textures, HDRI, VSE, compositor, camera backgrounds).</li>
      <li><strong class="text-blue-600 dark:text-blue-400">2. Copy Assets:</strong> Copy all referenced files to Output directory, maintaining a clear folder structure.</li>
      <li><strong class="text-blue-600 dark:text-blue-400">3. Copy .blend (optional):</strong> Copy current .blend file to Output.</li>
      <li><strong class="text-blue-600 dark:text-blue-400">4. Relink (optional):</strong> Open copied .blend and convert paths to relative format (//...), using auto-search + smart fallback.</li>
      <li><strong class="text-blue-600 dark:text-blue-400">5. Pack Add-ons (optional):</strong> Copy user add-ons to Output/_addons/ and create manifest (built-in/extension list recorded).</li>
    </ol>
  </div>
</div>

---

## Installation

- Standard add-on installation
  1. Blender → Edit → Preferences → Add-ons → Install…
  2. Select the zip or Python file for the add-on
  3. Enable "Asset Packer" in the add-on list

- Panel Location: View 3D → Sidebar (N key) → "Asset Packer" tab
- Preferences: Edit → Preferences → Add-ons → Asset Packer (info & notes section)

---

## Quick Start

1. Save your .blend file (recommended before packing)
2. Open N-panel → Asset Packer
3. Select "Output Directory" (the folder that will contain the exported package)
4. Options:
   - Include .blend File: copy current .blend file to Output
   - Auto Save Before Pack: auto-save file before packing
   - Relink Assets: open copied .blend and relink paths to packed folder (using relative paths)
   - Include Enabled Add-ons: copy currently enabled add-ons to _addons/
5. Click "Scan & Pack Assets"
6. Check console and generated log file for details

Results
- Packed files are in Output folder, maintaining drive and path structure to avoid name conflicts.
- A log file (asset_pack_log_YYYY-MM-DD_HH-MM-SS.txt) summarizes what was copied, missing files, and relink status.

---

## Add-on Installer (Restore Add-ons)

Dedicated panel: "Asset Packer: Add-on Installer" in N-panel.

- Install from _addons
  - Finds _addons/ (or _addon/) folder in your Output directory
  - Installs packed user add-ons (skips if already exists to avoid duplication)
  - Reads _addons/addons_manifest.json and enables:
    - copied_modules: packed user add-ons
    - builtin_modules: built-in/extension add-ons not copied
  - Built-in and extension add-ons won't be copied — just enabled on target machine

- Safe Duplicate Handling
  - If add-on is already installed (or exists on disk), installer skips copying and just enables it
  - Already enabled add-ons remain unchanged

---

## Relinking Details

- Automatic: Uses Blender's "Find Missing Files" and "Make Paths Relative" first
- Smart Fallback: A deterministic path resolver converts absolute paths to packed location, even when multiple files share the same name but are in different folders (prioritizes closest matching directory structure)
- All updated paths in copied .blend use relative path format (//…)

---

## Image Sequence Detection

Recognizes common patterns:
- file.0001.exr → ≥4 digits before extension
- file_001.png → underscore + ≥3 digits
- file001.jpg → ≥3 trailing digits

When detected, the entire sequence is packed (not just the representative frame).

---

## Options Explained

- Include .blend File
  - Copy current .blend file to Output folder

- Auto Save Before Pack
  - Auto-save current .blend to minimize risk of losing changes

- Relink Assets
  - Open copied .blend and update all paths to relative format pointing to packed files
  - Applies to images, sequences, videos, textures, camera backgrounds, HDRI, VSE strips, and compositor nodes

- Include Enabled Add-ons (optional)
  - Copy currently enabled user add-ons to Output/_addons/<module>
  - Built-in/extension add-ons are detected and not copied
  - Writes Output/_addons/addons_manifest.json containing copied and built-in module lists

---

## Troubleshooting

1) Scans all data blocks and node graphs for external file paths (images, sequences, videos, textures, HDRI, VSE, compositor, camera backgrounds).
2) Copies every referenced file to your Output directory, preserving a clear folder layout.
3) Optionally copies the current .blend file.
4) Optionally relinks paths inside the copied .blend to relative paths pointing to the packed files, with automatic search + smart fallback for duplicates.
5) Optionally copies all currently enabled user add‑ons into Output/_addons and writes a manifest (including a list of built‑in/extension add‑ons that were skipped).

---

## Installation

- Standard add‑on install
  1. Blender → Edit → Preferences → Add‑ons → Install…
  2. Pick the zip or the Python file for this add‑on
  3. Enable “Asset Packer” in the list

- Panel location: View 3D → Sidebar (N) → “Asset Packer” tab
- Preferences: Edit → Preferences → Add‑ons → Asset Packer (info and notes)

---

## Quick start

1. Save your .blend file (recommended before packing)
2. Open the N‑panel → Asset Packer
3. Select “Output Directory” (the folder where your pack will be created)
4. Options:
   - Include .blend File: copy your current .blend into the output
   - Auto Save Before Pack: save your file first
   - Relink Assets: open the copied .blend and relink paths to the packed files using relative paths
   - Include Enabled Add‑ons: copy currently enabled user add‑ons to _addons/
5. Click “Scan & Pack Assets”
6. Check the console and the generated log file for details

Results
- Packed files will be under your Output folder, preserving drive and path structure to avoid clashes.
- A log file (asset_pack_log_YYYY-MM-DD_HH-MM-SS.txt) summarizes what was copied, what was missing, and relink status.

---

## Add‑on installer (restore add‑ons later)

There’s a dedicated panel: “Asset Packer: Add‑on Installer” in the N‑panel.

- Install from _addons
  - Looks inside your Output directory for _addons/ (or _addon/)
  - Installs user add‑ons that were packed (skips if they already exist to avoid duplicates)
  - Reads _addons/addons_manifest.json and enables:
    - copied_modules: user add‑ons you packed
    - builtin_modules: built‑in/extension add‑ons that were not copied
  - Built‑in and extension add‑ons are not copied — they’re just enabled on the target machine

- Duplicate‑safe behavior
  - If an add‑on is already installed (or found on disk), the installer skips copying and only enables it
  - Already enabled add‑ons are left as‑is

---

## Relinking details

- Automatic: Blender’s “Find Missing Files” and “Make Paths Relative” are used first
- Smart fallback: A deterministic resolver converts absolute paths to the packed location, even when multiple files share the same basename but live in different folders (chooses the closest directory structure match)
- All updated paths in the copied .blend use project‑relative paths (//…)

---

## Image sequence detection

Matches common patterns:
- file.0001.exr → 4+ digits before the extension
- file_001.png → underscore + 3+ digits
- file001.jpg → trailing 3+ digits

When detected, the entire sequence is packed (not just the representative frame).

---

## Options explained

- Include .blend File
  - Copies your current .blend into the Output directory

- Auto Save Before Pack
  - Saves the current .blend to reduce chance of losing changes

- Relink Assets
  - Opens the copied .blend and updates all file paths to relative paths that point to the packed files
  - Applies to images, sequences, movies, textures, camera backgrounds, HDRI, VSE strips, and compositor nodes

- Include Enabled Add‑ons (optional)
  - Copies currently enabled user add‑ons into Output/_addons/<module>
  - Built‑in/extension add‑ons are detected and not copied
  - Writes an Output/_addons/addons_manifest.json with copied and built‑in module lists

---

---

## Troubleshooting

- “Missing files” in log
  - The source path didn’t exist when packing; verify the files are accessible
  - For sequences, ensure the numbering is consistent

- “Relinked: 0”
  - Ensure “Include .blend File” and “Relink Assets” are enabled
  - Some complex node setups may need a manual check; see the console for details

- Duplicate filenames from different folders
  - Handled by the resolver — each file is copied to a unique path reflecting its original folder structure

- Add‑ons didn’t install
  - Check the “Asset Packer: Add‑on Installer” panel and the console messages
  - Built‑in/extension add‑ons won’t be copied; they should be enabled automatically

- Permissions on Windows/macOS/Linux
  - Choose an Output directory where you have write permissions

---

## FAQ (Frequently Asked Questions)

- Does this tool modify my original .blend file?
  - No. Packing and relinking occur in the copied .blend (if you enable that option).

- Can I pack only add-ons?
  - Yes. Enable "Include Enabled Add-ons" and run pack. Even without assets, the manifest and _addons folder will be created.

- Will add-ons be duplicated on the target machine?
  - No. The installer checks if an add-on already exists, skips copying, and just enables it.

- Which Blender versions are supported?
  - Blender 2.80+. Features have been tested on recent 3.x/4.x versions.

---

## Support

Have questions or feature requests? Message via Gumroad.

If you encounter a difficult case, please provide:
- Blender version
- Operating system
- Pack log file and brief description of your asset structure

---

## Changelog (Highlights)

- 1.5
  - Added robust video support (movie clips, camera backgrounds, VSE, compositor, material movies)
  - Improved relinking with path disambiguation for duplicate filenames
  - Add-on packing with manifest; installer panel; built-in/extension detection; duplicate-safe installation
  - Moved lengthy info to Add-on Preferences; cleaner N-panel

---

## License

Commercial license for single user. Redistribution of add-on source code as a standalone product is not permitted. You are allowed to package and distribute your own project's asset folder.

---

## FAQ

- Does this modify my original .blend?
  - No. Packing and relinking happen in the copied .blend (when enabled).

- Can I pack only add‑ons?
  - Yes. Enable “Include Enabled Add‑ons” and run the pack. Assets can be empty — the manifest and _addons folder will still be generated.

- Will this duplicate add‑ons on the target machine?
  - No. The installer checks if an add‑on already exists and skips copying, then just enables it.

- What Blender versions are supported?
  - Blender 2.80+ is supported. Features are validated on recent 3.x/4.x versions.

---

## Support

Questions or feature requests? Reach out via the Gumroad message box.

If you hit a tricky project edge case, include:
- Blender version
- OS version
- The pack log, and a short description of your asset setup

---

## Changelog (highlights)

- 1.5
  - Added robust video support (movie clips, camera backgrounds, VSE, compositor, material movies)
  - Improved relinking with path disambiguation for same‑name files
  - Add‑on packing with manifest; installer panel; built‑in/extension aware; duplicate‑safe installation
  - Moved long info into Add‑on Preferences; cleaner N‑panel

---

## License

Commercial license for one user. Redistribution of the add‑on code as a product is not permitted. Packing your project assets and distributing the packed folder is allowed.

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
