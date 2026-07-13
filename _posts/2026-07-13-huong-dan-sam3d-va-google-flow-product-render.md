---
layout: post
title: "Hướng dẫn tạo file 3D bằng SAM3D và Render sản phẩm bằng Google Flow Tools"
date: 2026-07-13
author: Mạnh Huỳnh
categories: [Share, Guide, AI]
tags: [SAM3D, Google Flow, Product Render, 3D, AI, Tutorial, CGI]
thumbnail: /blog/assets/sam3d-flow/thumbnail.webp
excerpt: >
  Hướng dẫn chi tiết từng bước sử dụng công cụ SAM3D để biến ảnh chụp 2D thành mô hình 3D (.glb), sau đó đưa vào Google Flow Tools để tùy chỉnh góc xoay, vẽ minh họa phân vùng và render ảnh sản phẩm chuẩn studio.
---

# Hướng dẫn tạo file 3D bằng SAM3D và Render sản phẩm bằng Google Flow Tools

Đối với một Freelancer 3D CGI hay Designer, việc dựng bối cảnh, sắp đặt ánh sáng và render sản phẩm theo nhiều góc khác nhau thường tốn rất nhiều thời gian. Đôi khi khách hàng chỉ gửi cho bạn một vài tấm ảnh chụp sản phẩm phẳng (2D) và yêu cầu bạn phải đặt nó vào một không gian 3D sang trọng, nghệ thuật với các góc xoay khác nhau. 

Thay vì phải ngồi tỉ mẩn dựng lại model từ đầu bằng Blender hay Cinema 4D, chúng ta có thể tận dụng sức mạnh của AI thông qua sự kết hợp giữa **SAM3D** (tạo file 3D từ ảnh chụp) và **Google Flow Tools** (render sản phẩm 3D bằng AI). Quy trình này giúp bạn tạo ra những bức ảnh render sản phẩm chất lượng studio chỉ trong vài phút với bất kỳ góc xoay nào bạn mong muốn.

Dưới đây là video hướng dẫn nhanh giới thiệu về toàn bộ quy trình thực hiện:

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 32px 0; box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
  <iframe src="https://www.youtube.com/embed/uA0RrVzDJLE" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="SAM3D & Google Flow Product Render Tutorial" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="flex flex-wrap gap-4 my-8 justify-center">
  <a href="https://aidemos.meta.com/segment-anything/editor/convert-image-to-3d" target="_blank" rel="noopener noreferrer" class="bg-primary-button hover:bg-primary-button text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-cube mr-3"></i> Truy cập Meta SAM 3D Editor
  </a>
  <a href="https://labs.google/fx/tools/flow/shared/tool/a7c436cb-8852-456d-96b1-00f4032aeceb" target="_blank" rel="noopener noreferrer" class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-wand-magic-sparkles mr-3"></i> Google Flow Product Render (Remix)
  </a>
</div>

---

## Tổng quan quy trình thực hiện
Quy trình làm việc (workflow) sẽ bao gồm 2 giai đoạn chính:
1. **Giai đoạn 1 (Tạo tài nguyên 3D)**: Dùng **SAM3D** để tách vật thể từ ảnh chụp sản phẩm 2D và dựng thành file mô hình 3D định dạng `.glb`.
2. **Giai đoạn 2 (Render phối cảnh AI)**: Đưa file `.glb` vào **Google Flow Tools (3D Product Render)**, căn góc camera, sử dụng cọ vẽ minh họa định hình bối cảnh, nhập prompt mô tả bối cảnh và tiến hành generate ảnh render sắc nét.

Hãy đi vào chi tiết từng bước thực hiện ngay dưới đây.

---

## Bước 1: Tạo mô hình 3D (.glb) từ ảnh chụp bằng SAM3D

**SAM3D** (Segment Anything Model 3D) là một công cụ AI vô cùng mạnh mẽ được phát triển bởi Meta AI, cho phép tách biệt vật thể từ ảnh chụp 2D tĩnh và nội suy để tạo dựng lại hình dáng hình học 3D của vật thể đó. Bạn có thể tìm hiểu thêm về công nghệ này tại bài viết giới thiệu [SAM 3D của Meta AI](https://ai.meta.com/blog/sam-3d/).

1. **Truy cập công cụ**: Đầu tiên, bạn hãy truy cập trực tiếp vào công cụ [SAM 3D Editor](https://aidemos.meta.com/segment-anything/editor/convert-image-to-3d) trên cổng AI Demos của Meta. Lưu ý là công cụ này yêu cầu bạn đăng nhập bằng tài khoản để có thể bắt đầu sử dụng.
2. **Khởi tạo scene**: Tại giao diện chính, chọn mục **Try Playground** và nhấn nút **Create 3D Scenes**.
3. **Tách vật thể & Tạo 3D**: 
   * Tải ảnh sản phẩm gốc của bạn lên hệ thống (nên sử dụng ảnh có độ phân giải tốt và góc chụp trực diện để AI nhận dạng dễ dàng hơn).
   * Dùng chuột click chọn sản phẩm để AI nhận dạng vùng biên.
   * Bấm nút **Generate 3D** để AI bắt đầu tính toán và tái tạo mô hình 3D.
   * Nếu muốn thêm các vật thể phụ hay đạo cụ trang trí khác vào không gian, bạn có thể bấm **Add Object** để tải thêm ảnh khác và dựng song song.
4. **Tải file**: Khi mô hình 3D đã được tạo xong và hiển thị trên viewport 3D, hãy nhấn nút tải file và chọn định dạng `.glb` (GLTF Binary) về máy tính của bạn.

---

## Bước 2: Truy cập và phối lại (Remix) công cụ 3D Product Render trên Google Flow

**Google Flow Tools** là một nền tảng tạo ảnh và video bằng AI thông qua các nút thắt quy trình (workflow). Để render sản phẩm 3D, chúng ta sẽ sử dụng một workflow được tối ưu riêng.

1. Mở đường link công cụ [3D Product Render trên Google Flow](https://labs.google/fx/tools/flow/shared/tool/a7c436cb-8852-456d-96b1-00f4032aeceb). Đây là phiên bản custom đã được mình phối lại (remix) và chia sẻ sẵn cho mọi người tiện sử dụng.
2. Để tùy chỉnh và lưu quy trình này về tài khoản cá nhân, hãy nhấn chọn nút **Công cụ phối lại** (Remix Tool). Điều này giúp bạn có toàn quyền chỉnh sửa và chạy render mà không ảnh hưởng đến bản gốc của người khác.
3. Trên giao diện làm việc, tìm nút **Add GLB** và tải file `.glb` của sản phẩm mà bạn vừa download từ SAM3D ở Bước 1 lên.

---

## Bước 3: Căn chỉnh sản phẩm trong Viewport 3D

Sau khi mô hình sản phẩm của bạn được import thành công, nó sẽ xuất hiện trong không gian 3D của Flow. Lúc này bạn cần điều hướng camera để tìm góc chụp đẹp nhất:

* **Xoay camera (Rotate)**: Giữ và kéo **chuột trái** để xoay camera xung quanh sản phẩm.
* **Thu phóng (Zoom)**: Dùng **con lăn chuột** để phóng to hoặc thu nhỏ sản phẩm.
* **Di chuyển camera (Pan)**: Giữ và kéo **chuột phải** để di chuyển góc nhìn lên, xuống, sang trái hoặc sang phải.
* **Transform vật thể**: Nếu không gian render của bạn có nhiều file GLB (nhiều sản phẩm hoặc có thêm đạo cụ trang trí), bạn hãy click chọn sản phẩm tương ứng trong danh sách tài sản (asset list), sau đó bật chế độ **Transform mode** để di chuyển vị trí, xoay hướng, hoặc thay đổi kích thước (scale) của từng vật thể một cách linh hoạt.

---

## Bước 4: Thiết lập Prompt & Tải ảnh tham khảo (Reference Image)

Đây là bước cực kỳ quan trọng quyết định bức ảnh render có chân thực và giữ đúng chi tiết nhãn mác của sản phẩm hay không. Vì AI tạo ảnh thường có xu hướng tự động vẽ lại hoặc "bịa" ra các chữ viết trên nhãn chai, dẫn đến chữ bị méo mó hoặc sai chính tả.

1. **Chuẩn bị ảnh Reference**: Tải lên một bức ảnh chụp nhãn chai hoặc ảnh mặt trước sản phẩm có độ phân giải cao và rõ nét nhất ở mục Reference Image. AI sẽ dựa vào đây để tái tạo lại chính xác bề mặt chất liệu và toàn bộ thông tin văn bản trên bao bì sản phẩm.
2. **Viết Prompt mô tả**: Nhập prompt bằng tiếng Anh mô tả bối cảnh xung quanh sản phẩm. Hãy tập trung mô tả chi tiết chất liệu bục đỡ, các chi tiết trang trí, ánh sáng và màu sắc chủ đạo.
   * *Ví dụ prompt mẫu*: `A skincare cosmetic bottle standing on a smooth white stone podium, surrounded by elegant green leaves and delicate white flowers, soft studio lighting, water splashes, photorealistic, 8k resolution.`

---

## Bước 5: Định hướng bố cục bằng cọ vẽ màu (Control Paint)

Tính năng **Control Paint** của Google Flow Tools cho phép bạn tự do vẽ nháp phác thảo ngay trong không gian 3D để định hướng bố cục trực quan cho AI. Bạn có thể sử dụng cọ vẽ với các màu sắc quy ước sau:

* <span style="color: #ef4444; font-weight: bold;">Cọ màu Đỏ (Red)</span>: Dùng để phác thảo định hình cấu trúc không gian và các vật thể nền cứng (ví dụ: bục đá, các hình khối, tường, bậc thềm...).
* <span style="color: #22c55e; font-weight: bold;">Cọ màu Xanh Lá (Green)</span>: Dùng để chỉ định vị trí mà bạn muốn AI sinh ra cây cối, lá cây, hoặc hoa cỏ trang trí xung quanh.
* <span style="color: #3b82f6; font-weight: bold;">Cọ màu Xanh Dương (Blue)</span>: Dùng để mô tả nguồn sáng, hướng chiếu sáng hoặc các hiệu ứng ánh sáng đặc biệt trong bối cảnh.

Sự kết hợp giữa mô hình 3D thực tế và các nét vẽ phân màu này giúp AI hiểu chính xác bố cục bạn mong muốn mà không cần viết prompt quá dài dòng.

---

## Bước 6: Render hình ảnh & Upscale chất lượng cao

Sau khi đã căn chỉnh góc máy, thiết lập prompt, ảnh tham khảo và vẽ định hướng xong, chúng ta tiến hành xuất ảnh:

1. Bấm nút **Generate** trên thanh công cụ và chờ vài giây để AI thực hiện quá trình render ảnh.
2. **Kiểm tra kỹ lưỡng**: Sau khi ảnh render xong, hãy phóng to để kiểm tra kỹ các chi tiết, đặc biệt là phần chữ viết trên bao bì sản phẩm xem có bị méo hay sai chi tiết thương hiệu nào không. Nếu chưa ưng ý, bạn có thể tinh chỉnh lại prompt hoặc ảnh reference và bấm generate lại.
3. **Upscale hình ảnh**: Khi đã chọn được bức ảnh ưng ý nhất, hãy điều hướng đến mục **Gallery** của project để tải xuống file ảnh phiên bản đã được **Upscale** (nâng cao độ phân giải). Việc upscale sẽ giúp làm mịn các chi tiết, tăng cường độ sắc nét của chất liệu bao bì để bạn sẵn sàng đưa vào các ấn phẩm thiết kế đồ họa chuyên nghiệp.

---

## Tổng kết

Quy trình kết hợp giữa SAM3D và Google Flow Tools giúp tinh giản các bước dựng hình và thiết lập ánh sáng trong việc render sản phẩm. Bằng cách kết hợp mô hình 3D thô với cọ vẽ định hướng (Control Paint), AI có thể tự động hoàn thiện bối cảnh theo mô tả văn bản, tiết kiệm đáng kể thời gian so với quy trình thiết lập môi trường 3D truyền thống.

Tuy nhiên, do giới hạn hiện tại của các mô hình generative AI, kết quả render đôi khi vẫn gặp lỗi biến dạng ở các chi tiết nhỏ hoặc văn bản trên bao bì. Do đó, việc kiểm tra kỹ kết quả render, sử dụng tính năng Upscale và kết hợp các bước hậu kỳ (như Photoshop) vẫn là quy trình cần thiết để đạt độ chính xác tối đa trước khi đưa hình ảnh sản phẩm vào sử dụng thực tế.
