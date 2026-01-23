---
layout: post
title: "Giới thiệu 3D Model Optimizer Tool - Nén và tối ưu file GLB/GLTF tự động"
date: 2026-01-23
author: Mạnh Huỳnh
categories: [Share, Tool]
tags: [3D, Optimization, Draco, WebP, GLB, glTF]
thumbnail: /blog/assets/3D-optimizers/03-tool_terminal.png
excerpt: >
  Công cụ giúp nén và tối ưu hóa file 3D (.glb/.gltf) một cách tự động, giúp giảm dung lượng file đáng kể (thường >90%) để chạy mượt trên web/mobile.
---

<div class="alert alert-secondary">
<p class="mb-1"><strong>Tên Tool:</strong> 3D Model Optimizer Tool</p>
<p class="mb-1"><strong>Mô tả:</strong> Công cụ giúp nén và tối ưu hóa file 3D (.glb/.gltf) một cách tự động, giúp giảm dung lượng file đáng kể (thường >90%) để chạy mượt trên web/mobile.</p>
<p class="mb-0"><strong>Yêu cầu:</strong> Windows (Không cần cài đặt Python/Node.js)</p>
</div>

## I. Tổng quan
Chào mọi người! Đây là công cụ mình phát triển để giúp việc tối ưu hóa file 3D trở nên đơn giản và tự động hơn. Thay vì phải cấu hình thủ công phức tạp, công cụ này cho phép bạn tối ưu file chỉ với một cú click chuột hoặc kéo thả.

<div class="text-center my-8 flex flex-col md:flex-row justify-center items-center gap-4">
  <a href="https://manhdesigns.gumroad.com/l/GLB-optimizer-tool" target="_blank" rel="noopener noreferrer" class="bg-primary-button hover:bg-primary-button text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Tải Tool tại Gumroad
  </a>
  <a href="https://github.com/Manh-Huynh-PP/GLB-optimizer-tool" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-gray-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-brands fa-github mr-3"></i> Xem Code trên Github
  </a>
</div>

## II. Tính năng nổi bật
<div class="alert alert-primary my-4">
  <ul>
    <li><strong>Tối ưu hóa hình học (Draco Compression):</strong> Giảm lưới nhưng giữ nguyên chất lượng hiển thị.</li>
    <li><strong>Nén Texture (WebP):</strong> Chuyển đổi và nén ảnh texture giúp giảm dung lượng cực lớn.</li>
    <li><strong>Thay đổi kích thước ảnh (Texture Resize):</strong> Tùy chọn resize ảnh texture để tối ưu bộ nhớ.</li>
    <li><strong>Dễ sử dụng:</strong> Chỉ cần kéo thả hoặc chạy file exe, không cần cài đặt môi trường phức tạp.</li>
    <li><strong>Portable:</strong> Chạy ngay trên Windows mà không cần cài Python hay Node.js.</li>
  </ul>
</div>

## III. Hướng dẫn cài đặt

1.  Tải file `.zip` từ Gumroad hoặc Release Github về máy.
2.  Giải nén ra một thư mục.
3.  Chạy file `install.bat` để tích hợp vào menu chuột phải (chọn "Yes" nếu được hỏi quyền Admin).
    *   *Lưu ý: Bạn cũng có thể dùng ngay mà không cần install bằng cách chạy file .exe trực tiếp.*

<figure class="figure my-4 justify-center items-center mx-auto">
  <img src="/blog/assets/3D-optimizers/01-install.png" class="figure-img img-fluid rounded shadow-sm w-full md:w-3/4" alt="Cài đặt tool">
</figure>

## IV. Cách sử dụng

### Cách 1: Menu chuột phải (Khuyên dùng)
Sau khi chạy `install.bat`, bạn chỉ cần:
1.  Click chuột phải vào file `.glb` hoặc `.gltf` bất kỳ.
2.  Chọn **Optimize 3D Model**.
3.  File đã tối ưu sẽ được tạo ngay tại thư mục đó (có đuôi `_optimized.glb`).

<figure class="figure my-4 justify-center items-center mx-auto">
  <img src="/blog/assets/3D-optimizers/02-Context menu.png" class="figure-img img-fluid rounded shadow-sm w-full md:w-3/4" alt="Sử dụng Menu chuột phải">
</figure>

### Cách 2: Kéo thả
1.  Mở file `3D_Optimizer_Tool.exe`.
2.  Kéo thả file 3D vào cửa sổ chương trình.

### Giao diện Terminal
Khi chạy, tool sẽ hiển thị quá trình xử lý chi tiết:

<figure class="figure my-4 justify-center items-center mx-auto">
  <img src="/blog/assets/3D-optimizers/03-tool_terminal.png" class="figure-img img-fluid rounded shadow-sm w-full md:w-3/4" alt="Giao diện Terminal">
</figure>

---
## V. Credits & Open Source

Công cụ này được xây dựng dựa trên sức mạnh của thư viện mã nguồn mở **glTF-Transform**.
Xin gửi lời cảm ơn chân thành đến **Don McCurdy** và cộng đồng đã phát triển công cụ tuyệt vời này.

*   **Official Documentation:** [https://gltf-transform.donmccurdy.com/](https://gltf-transform.donmccurdy.com/)
*   **GitHub Repository:** [https://github.com/donmccurdy/glTF-Transform](https://github.com/donmccurdy/glTF-Transform)

---
*Developed by Manh Huynh.*
