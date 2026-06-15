---
layout: post
title: "Custom Light v2.02 - Tính năng mới và hỗ trợ Blender 5.0"
date: 2025-12-21
author: Mạnh Huỳnh
categories: [Share, Update, Blender Addon]
tags: [Blender, addon, lighting, Blender addon, free addon, setup lighting, blenderkit]
thumbnail: /blog/assets/customlightv2/Cover.png
excerpt: >
  Sau một thời gian tinh chỉnh, mình muốn chia sẻ với mọi người bản cập nhật v2.02 của Custom Light với một vài tính năng mới và hỗ trợ hoàn toàn cho Blender 5.0.
---

# Custom Lights v2.02

Chào mọi người, sau một thời gian vọc vạch và tối ưu thêm, mình đã hoàn thiện bản cập nhật v2.02 cho Custom Light. Đây là một công cụ nho nhỏ mình viết ra để giúp việc setup ánh sáng trong Blender trở nên gọn lẹ và bớt thao tác thừa hơn. Hy vọng những chia sẻ này sẽ giúp ích cho quy trình làm việc của anh em 3D.

<div class="alert alert-secondary">
<p class="mb-1"><strong>Tên Addon:</strong> Custom Light v2.02</p>
<p class="mb-1"><strong>Mục đích:</strong> Công cụ hỗ trợ tạo và quản lý ánh sáng tập trung.</p>
<p class="mb-0"><strong>Vị trí:</strong> <code>View3D</code> > <code>Sidebar</code> (Phím <code>N</code>) > Tab "Custom Lights"</p>
</div>

## File cài đặt

Các bạn có thể tải bản v2.02 này hoàn toàn **miễn phí** qua Gumroad hoặc GitHub, hoặc chọn **mua ủng hộ tác giả trên BlenderKit** với giá 5$ nhé:

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
Dưới đây là video mình quay nhanh các thao tác mới trong bản v2.02 để mọi người dễ hình dung:

<div class="ratio ratio-16x9 my-4 shadow-sm rounded w-full md:w-3/4 mx-auto">
  <iframe src="https://www.youtube.com/embed/s9AEGNVPpMQ" title="Custom Light v2.02 Demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## Những điểm mới trong bản 2.02

### 🚀 Tương thích Blender 5.0
Mình đã kiểm tra kỹ trên bản Blender 5.0 mới nhất để đảm bảo mọi thứ vẫn chạy mượt mà, không gặp lỗi tương thích.

### 🌍 Điều khiển World Brightness
Tiện hơn một chút khi bạn có thể chỉnh độ sáng môi trường trực tiếp từ bảng Manage Lights mà không cần phải chuyển sang tab World Properties.

### 🎚️ Collection Brightness Multiplier
Mình có thêm một thanh trượt ở đầu mỗi Collection. Nếu bạn muốn tăng hay giảm sáng cho toàn bộ đèn trong bộ sưu tập đó thì chỉ cần kéo thanh này và nhấn ✓ là xong.

### 🎨 Tối ưu Plane Gradient Light
Phần này mình tách ra thành hai lựa chọn rõ rệt hơn:
- **Linear Gradient** - Cho các mặt phẳng tỏa sáng dạng tuyến tính.
- **Sphere Gradient** - Cho các mặt phẳng tỏa sáng dạng hình cầu.

Đặc biệt, mình có thêm tùy chọn **"Transparent Black Gradient"**. Những vùng màu đen trong gradient giờ sẽ được xử lý trong suốt, giúp việc hòa trộn ánh sáng trông tự nhiên hơn.

### ✨ Plane Gobo Lights
Thêm 3 kiểu tạo vân sáng nhanh (gobo) dựa trên noise:
- **P.Noise** - Vân noise cơ bản.
- **P.Voronoise** - Kiểu vân Voronoi.
- **P.Wave** - Vân dạng sóng.

### 🌡️ Màu sắc Black Body
Các giá trị màu Black Body đã được mình tinh chỉnh lại để sát với cách tính toán ánh sáng vật lý trong Blender hơn.

### ⚡ Phím tắt nhanh "L"
Khi đang chọn một đèn, bạn chỉ cần nhấn phím **"L"** là menu các thông số quan trọng sẽ hiện ra ngay tại vị trí con trỏ chuột, đỡ phải di chuột qua lại bảng bên phải.

### 🌐 Một vài cải tiến khác
- Tính năng **Light Dome** được tinh chỉnh để chiếu sáng môi trường tốt hơn.
- Thêm các tùy chọn nhiễu (**Noise**) và chiếu ảnh (**Image**) cho Gobo Light để tạo ra các hiệu ứng ánh sáng phức tạp.
- Giao diện **Manage Light** cũng được mình sắp xếp lại cho sạch sẽ và dễ bao quát hơn.

---

### Tìm hiểu thêm
Để biết về những phiên bản đầu tiên và cách sử dụng cơ bản, các bạn có thể xem lại bài viết cũ tại đây:
[Addon Custom Light v1.52](https://manhhuynh.work/blog/add-on-custom-light/)

Hy vọng bản cập nhật này sẽ giúp việc làm đèn của mọi người thú vị hơn một chút!
