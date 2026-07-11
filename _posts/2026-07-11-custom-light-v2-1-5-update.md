---
layout: post
title: "Custom Light v2.1.5 - Multi-Light Control, Solo Mode và đồng bộ Outliner thông minh"
date: 2026-07-11
author: Mạnh Huỳnh
categories: [Share, Update, Blender Addon]
tags: [Blender, addon, lighting, Blender addon, free addon, setup lighting, blenderkit]
thumbnail: /blog/assets/customlightv2/Cover.png
excerpt: >
  Bản cập nhật Custom Light v2.1.5 mang lại khả năng điều chỉnh đồng thời nhiều đèn, chế độ Solo cô lập nguồn sáng, đồng bộ trạng thái hiển thị Viewport với Outliner, và hàng loạt công cụ dọn dẹp tối ưu hóa khác.
---

# Custom Lights v2.1.5

Chào mọi người, sau một thời gian phát triển và nhận được nhiều phản hồi từ anh em, mình xin giới thiệu bản cập nhật **v2.1.5** của Custom Light. Đây là bản cập nhật tích lũy nhiều cải tiến quan trọng giúp tối ưu hóa hơn nữa quy trình làm việc với ánh sáng trong Blender, đặc biệt là khả năng kiểm soát nhiều đèn cùng lúc và giữ scene của bạn gọn gàng, sạch sẽ.

<div class="alert alert-secondary">
<p class="mb-1"><strong>Tên Addon:</strong> Custom Light v2.1.5</p>
<p class="mb-1"><strong>Mục đích:</strong> Công cụ hỗ trợ tạo và quản lý ánh sáng tập trung.</p>
<p class="mb-0"><strong>Vị trí:</strong> <code>View3D</code> > <code>Sidebar</code> (Phím <code>N</code>) > Tab "Custom Lights"</p>
</div>

## File cài đặt

Các bạn có thể tải bản v2.1.5 này hoàn toàn **miễn phí** qua Gumroad hoặc GitHub, hoặc chọn **mua ủng hộ tác giả trên BlenderKit** với giá 5$ nhé:

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://manhdesigns.gumroad.com/l/customlights" target="_blank" rel="noopener noreferrer" class="bg-primary-button hover:bg-primary-button text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-link mr-3"></i> Tải miễn phí qua Gumroad
  </a>
  <a href="https://www.blenderkit.com/asset-gallery-detail/8ee2c9f9-4f18-49d7-b5d0-f7b70e8c4e22/" target="_blank" rel="noopener noreferrer" class="bg-green-600 hover:bg-green-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-cube mr-3"></i> Mua qua BlenderKit ($5)
  </a>
  <a href="https://github.com/Manh-Huynh-PP/Custom-lights" target="_blank" rel="noopener noreferrer" class="bg-gray-800 hover:bg-gray-900 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-brands fa-github mr-3"></i> Tải miễn phí qua GitHub
  </a>
</div>

### 🎥 Video Demo
Dưới đây là video demo nhanh cho bản cập nhật mới để mọi người tiện tham khảo:

<div class="ratio ratio-16x9 my-4 shadow-sm rounded w-full md:w-3/4 mx-auto">
  <iframe src="https://www.youtube.com/embed/JHpQJ2Ut6-8" title="Custom Light v2.1.5 Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Những điểm mới trong bản 2.1.5 (Tính năng tích lũy từ bản 2.0.2)

### 🎛️ Điều khiển nhiều đèn cùng lúc (Multi-Light Control)
Giờ đây bạn có thể tùy chỉnh các thông số (độ sáng - brightness, kích thước - size, góc đèn - spot angle,...) cho tất cả các đèn đang chọn cùng một lúc. Có 2 chế độ điều khiển:
- **Relative Mode**: Giữ nguyên tỷ lệ giá trị giữa các đèn khi bạn tăng/giảm thông số.
- **Absolute Mode**: Áp đặt một giá trị tuyệt đối giống nhau cho tất cả đèn được chọn.

### 👁️ Kiểm tra trạng thái hiển thị (Interactive Visibility Check)
Một bảng điều khiển pop-up trực quan cho phép bạn nhanh chóng phát hiện và sửa lỗi mismatch hiển thị: chẳng hạn đèn đang bật ở viewport nhưng lại bị tắt khi render (hoặc ngược lại). Giờ đây, chỉ cần mở pop-up và đồng bộ lại mọi thứ trong một nốt nhạc.

### 🔄 Đồng bộ Viewport & Outliner thông minh
Việc ẩn/hiện đèn trong addon giờ đây sẽ đồng bộ hóa chuẩn xác 1:1 với icon mắt (eye icon) trong Outliner của Blender. Không còn hiện tượng lệch trạng thái hiển thị gây khó chịu.

### 🎯 Chế độ Solo / Cô lập nguồn sáng (Solo/Isolate Mode)
Thêm biểu tượng nút Solo ngay bên cạnh tên đèn ở bảng Sidebar. Chỉ với một cú click, bạn có thể tắt tạm thời tất cả các đèn khác để chỉ tập trung vào một nguồn sáng duy nhất, giúp việc căn chỉnh hướng sáng và bóng đổ cực kỳ trực quan.

### 🎨 Tinh chỉnh Gobo & Noise trực tiếp
Bạn không cần phải mở Shader Editor phức tạp nữa. Mọi thông số điều khiển Gobo texture, cài đặt noise, và dải màu (color ramp) giờ đã được đưa trực tiếp lên thanh Sidebar để bạn kéo chỉnh trực quan ngay lập tức.

### ⌨️ Phím tắt "L" thông minh hơn
Phím tắt **"L"** được tối ưu hóa:
- Nếu đang chọn một đèn: mở nhanh bảng thiết lập thông số mini ngay tại vị trí chuột.
- Nếu không chọn đèn: bật một Pie Menu tiện lợi ngay trong 3D Viewport để thực hiện các thao tác nhanh.

### 🌍 Xoay HDRI theo trục Z (HDRI Z-Rotation)
Dễ dàng xoay bản đồ môi trường nền (HDRI) trực tiếp từ World panel trong addon mà không cần chuyển tab hay vào shader nodes.

### 📂 Tự động quản lý Collection
Các đèn mới tạo ra sẽ được addon tự động định tuyến và gom nhóm vào các parent collection có cấu trúc rõ ràng, giữ cho bảng Outliner của bạn luôn sạch đẹp và dễ quản lý.

### 🧹 Công cụ dọn dẹp Scene nhanh (Cleanup Utilities)
Addon cung cấp thêm các nút xóa nhanh đèn cũng như một công cụ dọn dẹp (cleanup) để tự động xóa sạch các collection rỗng chỉ trong 1 click.

---

### Tìm hiểu thêm
Để biết về các phiên bản trước đó, các bạn có thể đọc lại các bài viết tại đây:
- [Addon Custom Light v2.02](https://manhhuynh.work/blog/custom-light-v2-update/)
- [Addon Custom Light v1.52](https://manhhuynh.work/blog/add-on-custom-light/)

Hy vọng bản cập nhật v2.1.5 này sẽ giúp việc setup ánh sáng của mọi người trở nên nhanh chóng và chuyên nghiệp hơn nữa!
