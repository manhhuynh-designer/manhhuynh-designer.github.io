---
layout: post
title: "9 Bước Thiết Lập Vật Liệu Thuỷ Tinh Trong Blender Cycles (Không Bị Tối Đáy & Nhiễu Hạt)"
date: 2026-10-30
author: Mạnh Huỳnh
categories: [Share, Guide, Blender 3D]
tags: [Blender, Cycles, Glass Material, 3D Packshot, Custom Lights, Shader Nodes, Lighting]
thumbnail: /blog/assets/blender-cycles-glass-guide/thumbnail.webp
excerpt: >
  Hướng dẫn 9 bước chỉnh vật liệu, ánh sáng và thông số Render Properties khi làm sản phẩm thuỷ tinh trong Blender Cycles: làm sáng bóng đổ dưới đáy ly, giảm hạt trắng (Fireflies), tăng số lần nảy sáng qua nhiều lớp kính, ẩn phản xạ đèn phụ, làm mềm vệt sáng bằng tấm Translucent và tạo viền màu tán sắc ở đáy ly dày. / 9-step guide to rendering glass in Blender Cycles: fixing black shadows, removing fireflies, increasing transmission bounces, hiding fill light reflections, diffusing specular highlights, and adding RGB dispersion.
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
  <p class="mb-1"><strong>Trình render áp dụng:</strong> Blender Cycles (Blender 3.6, 4.x, 5.x)</p>
  <p class="mb-1"><strong>Nội dung:</strong> 9 bước thiết lập Shader Editor, Render Properties, Object Visibility và mô hình 3D cho vật liệu thuỷ tinh</p>
  <p class="mb-0"><strong>File thực hành đính kèm:</strong> <a href="/blog/assets/blender-cycles-glass-guide/blender_cycles_glass_demo.blend" download>blender_cycles_glass_demo.blend</a></p>
</div>

Khi tạo node `Glass BSDF` mặc định trong Blender Cycles để render ly nước, chai lọ mỹ phẩm hoặc nước hoa, kết quả thường gặp 4 vấn đề:
1. Vùng bóng đổ dưới đáy ly bị tối đen dù vật liệu trong suốt.
2. Xuất hiện nhiều đốm sáng trắng li ti (**Fireflies**) trên thành và đáy ly.
3. Khi đặt 2 chiếc ly cạnh nhau hoặc làm đáy ly dày, thân ly xuất hiện các mảng đen.
4. Vệt đèn phản chiếu trên bề mặt kính bị gắt hoặc dính hình phản chiếu của các tấm hắt sáng phụ.

Bài viết này tổng hợp 9 bước thiết lập mình thường dùng trong các dự án render packshot sản phẩm, chia thành 3 phần để bạn dễ tra cứu và áp dụng.

<div class="text-center my-8 flex flex-col md:flex-row justify-center items-center gap-4">
  <a href="/blog/assets/blender-cycles-glass-guide/blender_cycles_glass_demo.blend" download class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Tải File Mẫu (.BLEND)
  </a>
  <a href="https://manhdesigns.gumroad.com/l/customlights" target="_blank" rel="noopener noreferrer" class="bg-pink-600 hover:bg-pink-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-lightbulb mr-3"></i> Tải Add-on Custom Lights
  </a>
</div>

---

## Phần 1: Làm sáng bóng đổ dưới đáy ly & Giảm hạt trắng (Fireflies)

Mặc định, Blender Cycles chặn các tia tính bóng đổ (**Shadow Ray**) tại bề mặt vật liệu khúc xạ để giảm thời gian tính toán. Nếu bạn chỉ bật `Reflective / Refractive Caustics`, thời gian render sẽ tăng lên nhưng vùng bóng dưới đáy ly vẫn tối và xuất hiện nhiều hạt nhiễu.

### Bước 1: Kết hợp Transparent BSDF và Is Shadow Ray
Để giữ nguyên độ khúc xạ trên thân ly nhưng cho phép ánh sáng đi xuyên qua đáy ly xuống mặt bàn:
1. Trong **Shader Editor**, giữ node `Glass BSDF` (hoặc `Principled BSDF` bật Transmission) và tạo thêm một node **`Transparent BSDF`**.
2. Nối cả hai node vào **`Mix Shader`** (đặt `Glass BSDF` ở cổng trên, `Transparent BSDF` ở cổng dưới).
3. Bấm `Shift + A` > **Input** > **`Light Path`**, nối cổng **`Is Shadow Ray`** vào cổng **`Factor`** của `Mix Shader`.

Khi đó, camera nhìn trực tiếp vào ly vẫn thấy vật liệu thuỷ tinh, còn các tia tính bóng đổ trên mặt bàn sẽ đi qua node `Transparent BSDF`.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/01-shadow-ray-setup.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Nối Is Shadow Ray vào Factor của Mix Shader giữa Glass BSDF và Transparent BSDF">
</figure>

### Bước 2: Tạo vùng sáng tập trung dưới đáy ly bằng Layer Weight
Nếu để màu của `Transparent BSDF` là màu trắng đồng nhất, toàn bộ bóng đổ dưới mặt bàn sẽ phẳng và thiếu độ đậm nhạt giữa tâm và viền ly.
1. Bấm `Shift + A` tạo node **`Layer Weight`** và node **`Color Ramp`**.
2. Nối cổng **`Facing`** của `Layer Weight` vào `Color Ramp`, sau đó nối đầu ra **`Color`** vào cổng `Color` của `Transparent BSDF`.
3. Kéo hai con trượt trắng và đen trên `Color Ramp` lại gần nhau để phần tâm bóng đổ dưới đáy ly sáng rõ, còn phần viền ngoài của bóng đậm hơn.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/02-layer-weight-caustics.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Dùng Layer Weight Facing nối qua Color Ramp vào Transparent BSDF">
</figure>

### Bước 3: Giảm đốm sáng trắng (Fireflies) bằng Clamping & Filter Glossy
Khi ánh sáng phản xạ nhiều lần qua các mặt cong của thuỷ tinh, một số điểm ảnh có cường độ sáng vọt lên rất cao, tạo thành các đốm trắng li ti trên thành ly.
1. Mở bảng **Render Properties** > mục **Light Paths** > **Clamping**: đặt **`Indirect Light = 10.0`** (giới hạn cường độ tia sáng phản xạ phụ, không làm giảm độ sáng trực tiếp từ đèn).
2. Ngay phía dưới tại mục **Caustics**, đặt **`Filter Glossy = 1.0`** để làm mượt các điểm hội tụ sáng quá nhỏ trên bề mặt kính.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/03-clamp-filter-glossy.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Chỉnh Indirect Light = 10 và Filter Glossy = 1.0 trong Render Properties">
</figure>

---

## Phần 2: Tăng số lần nảy sáng, Ẩn phản xạ đèn phụ & Chọn bộ khử nhiễu

Khi cảnh có từ 2 vật thể thuỷ tinh đặt chồng lên nhau hoặc chai lọ có phần đáy dày, mỗi lần tia sáng đi vào và đi ra khỏi một lớp thành ly sẽ tiêu tốn 2 lần nảy sáng (**Bounces**). Nếu hết số lần nảy trước khi tia sáng ra tới nguồn đèn, Cycles sẽ trả về màu đen.

### Bước 4: Tăng Max Bounces (Transmission & Total)
1. Mở **Render Properties** > **Light Paths** > **Max Bounces**.
2. Tăng **`Total = 32`**, **`Transmission = 24`**, **`Glossy = 12`**, và **`Transparent = 16`**.
3. Sau khi tăng, tia sáng có đủ số lần đi xuyên qua nhiều lớp thành ly và lớp nước bên trong mà không bị tối đen.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/04-max-bounces-transmission.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Tăng Max Bounces Total = 32 và Transmission = 24 để nhìn xuyên qua nhiều lớp kính">
</figure>

### Bước 5: Tắt Glossy Ray Visibility để ẩn hình phản chiếu của đèn phụ
Khi chiếu sáng sản phẩm có chất lỏng màu (như trà, rượu hoặc serum), bạn thường phải đặt thêm đèn phụ hoặc tấm hắt sáng để làm sáng phần nước bên trong. Tuy nhiên, tấm hắt sáng này dễ bị in hình phản chiếu trực tiếp lên mặt ngoài của ly, gây rối mắt.
1. Chọn đèn phụ hoặc tấm Plane hắt sáng trong Viewport.
2. Mở bảng **Object Properties** (biểu tượng hình vuông màu cam) > **Visibility** > **Ray Visibility**.
3. Bỏ tích ô **`Glossy`** (và bỏ tích `Camera` nếu tấm hắt sáng nằm trong khung hình). Lúc này tấm hắt sáng vẫn làm sáng phần nước bên trong và môi trường xung quanh, nhưng không còn in vệt phản chiếu lên bề mặt kính.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/05-ray-visibility-glossy.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Bỏ tích ô Glossy trong Object Properties > Ray Visibility">
</figure>

### Bước 6: Chọn OpenImageDenoise thay cho OptiX khi xuất ảnh cuối
Bộ khử nhiễu **OptiX** thích hợp để xem trước trong Viewport vì tốc độ nhanh, nhưng khi khử nhiễu bên trong vật liệu khúc xạ, OptiX thường làm nhòe các đường vân khúc xạ ở đáy ly.
1. Mở **Render Properties** > **Sampling** > **Denoise**.
2. Tại mục **Denoiser**, chuyển từ `OptiX` sang **`OpenImageDenoise`**.
3. Đặt **Passes** là **`Albedo and Normal`** và **Prefilter** là **`Accurate`** để giữ rõ các đường khúc xạ bên trong thuỷ tinh.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/06-openimagedenoise-compare.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="So sánh bộ khử nhiễu OptiX và OpenImageDenoise (Accurate) trên vật liệu thuỷ tinh">
</figure>

---

## Phần 3: Làm mềm vệt đèn phản chiếu, Độ dày thành ly & Tách màu cầu vồng

### Bước 7: Đặt tấm Plane Translucent chắn trước đèn chiếu
Nếu dùng Area Light chiếu trực tiếp vào ly, vệt sáng trắng trên thân ly sẽ có viền vuông sắc cạnh. Để vệt sáng chuyển mềm từ tâm ra rìa giống như chụp qua tản sáng trong studio:
1. Đặt một tấm **Plane** nằm giữa đèn Area Light và chiếc ly.
2. Gán cho tấm Plane này vật liệu **`Translucent BSDF`** (hoặc kết hợp `Translucent BSDF` + `Transparent BSDF`) để ánh sáng từ đèn đi xuyên qua tấm Plane và tản đều trước khi chạm vào mặt kính.
3. Nếu bạn đang dùng add-on [**Custom Lights v2.1.5**](/blog/custom-light-v2-1-5-update/) của mình, bạn chỉ cần chọn đèn rồi bấm nút **`Translucent Light Plane`** trong thanh công cụ bên phải (`N-Panel`) để tạo tự động tấm tản sáng gắn theo đèn.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/07-translucent-light-plane.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Đặt tấm Plane Translucent chắn trước đèn hoặc dùng nút Translucent Light Plane trong Custom Lights">
</figure>

### Bước 8: Tạo độ dày thành ly (Solidify) và cho khối nước giao nhẹ 0.2mm
1. **Độ dày thành ly:** Không dựng ly bằng một lớp mặt phẳng mỏng (single-sided mesh). Nếu chỉ có 1 lớp mặt, Cycles hiểu toàn bộ không gian bên trong ly là một khối thuỷ tinh đặc, làm hình ảnh phía sau bị biến dạng. Hãy thêm **`Solidify Modifier`** để tạo đầy đủ mặt ngoài và mặt trong cho thành ly.
2. **Tiếp xúc giữa nước và thành ly:** Khi có chất lỏng bên trong, nếu đặt khối nước nhỏ hơn mặt trong của ly (có khe hở không khí ở giữa), mặt nước sẽ bị phản xạ đen. Hãy phóng to khối chất lỏng giao nhẹ (**overlap**) vào giữa lớp thành ly khoảng **`0.2mm`** và bật `Auto Smooth` / `Weighted Normal` để chỉ số khúc xạ chuyển tiếp đúng từ Kính sang Nước.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/08-solidify-liquid-overlap.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="So sánh mô hình 1 lớp mỏng với mô hình có độ dày Solidify và nước giao nhẹ 0.2mm vào thành ly">
</figure>

### Bước 9: Kết hợp 3 node Glass BSDF (Đỏ - Lục - Lam) lệch chỉ số IOR
Ở phần đáy ly dày hoặc lọ nước hoa vát cạnh, ánh sáng thực tế đi qua kính sẽ tách nhẹ thành các dải màu cầu vồng (**Chromatic Dispersion**). Do Cycles mặc định chỉ tính 1 giá trị IOR đơn sắc trên một node `Glass BSDF`, bạn có thể tạo hiệu ứng này bằng cách cộng 3 kênh màu gốc:
1. Tạo 3 node **`Glass BSDF`** riêng biệt:
   * Node 1 (Đỏ): đặt `Color = (1, 0, 0)`, **`IOR = 1.485`**
   * Node 2 (Lục): đặt `Color = (0, 1, 0)`, **`IOR = 1.500`**
   * Node 3 (Lam): đặt `Color = (0, 0, 1)`, **`IOR = 1.515`**
2. Dùng 2 node **`Add Shader`** để cộng cả 3 node này lại. Ở phần thành ly mỏng, 3 màu vẫn nhập làm một tạo ra kính trong suốt; còn ở phần gờ đáy ly dày, góc khúc xạ lệch nhau sẽ tách ra viền màu cầu vồng tự nhiên.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/09-rgb-dispersion-shader.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Cộng 3 node Glass BSDF Đỏ Lục Lam lệch IOR bằng Add Shader để tạo viền màu ở đáy ly dày">
</figure>

---

## Bảng tóm tắt thông số thiết lập nhanh

| Hạng mục cần xử lý | Vị trí thiết lập | Thông số khuyến nghị |
| :--- | :--- | :--- |
| **Làm sáng bóng đổ dưới đáy ly** | `Shader Editor` | `Glass BSDF` + `Transparent BSDF` nối qua `Mix Shader` (`Factor` = `Light Path > Is Shadow Ray`) |
| **Tạo tâm sáng dưới bóng đổ** | `Shader Editor` | `Layer Weight (Facing)` &rarr; `Color Ramp` &rarr; cổng `Color` của `Transparent BSDF` |
| **Xoá hạt trắng (Fireflies)** | `Render Properties > Light Paths` | `Clamp Indirect = 10.0`, `Filter Glossy = 1.0` |
| **Nhìn xuyên qua nhiều lớp kính** | `Render Properties > Max Bounces` | `Total = 32`, `Transmission = 24`, `Glossy = 12`, `Transparent = 16` |
| **Ẩn vệt phản chiếu đèn phụ** | `Object Properties > Visibility` | Bỏ tích ô `Ray Visibility > Glossy` trên tấm hắt sáng / đèn phụ |
| **Giữ chi tiết khúc xạ khi khử nhiễu** | `Render Properties > Sampling` | `Denoiser = OpenImageDenoise`, `Passes = Albedo and Normal`, `Prefilter = Accurate` |
| **Làm mềm vệt sáng phản chiếu** | `3D Viewport / Custom Lights` | Đặt tấm `Plane` gắn `Translucent BSDF` chắn giữa đèn và vật thể thuỷ tinh |
| **Độ dày thành ly & chất lỏng** | `Modifier / Edit Mode` | Dùng `Solidify Modifier` cho ly; phóng to khối nước giao nhẹ `0.2mm` vào mặt trong thành ly |
| **Tán sắc cầu vồng ở đáy ly dày** | `Shader Editor` | Cộng 3 node `Glass BSDF` Đỏ (`IOR 1.485`), Lục (`1.500`), Lam (`1.515`) bằng `Add Shader` |

---

## Tải file thực hành & Công cụ hỗ trợ

* **File Blender mẫu (`.blend` đầy đủ cả 3 phần):** [blender_cycles_glass_demo.blend](/blog/assets/blender-cycles-glass-guide/blender_cycles_glass_demo.blend)
* **Add-on Custom Lights v2.1.5 (Tạo nhanh đèn studio & Translucent Light Plane):**
  * [Xem bài hướng dẫn chi tiết trên Blog](/blog/custom-light-v2-1-5-update/)
  * [Tải miễn phí trên Gumroad](https://manhdesigns.gumroad.com/l/customlights)
  * [Mã nguồn trên GitHub](https://github.com/Manh-Huynh-PP/Custom-lights)

</div>

<!-- English Content -->
<div id="content-en" class="content-lang" markdown="1">

<div class="alert alert-secondary">
  <p class="mb-1"><strong>Render Engine:</strong> Blender Cycles (Blender 3.6, 4.x, 5.x)</p>
  <p class="mb-1"><strong>Topics Covered:</strong> 9-step setup across Shader Editor, Render Properties, Object Visibility, and 3D mesh modeling for glass</p>
  <p class="mb-0"><strong>Sample Scene File:</strong> <a href="/blog/assets/blender-cycles-glass-guide/blender_cycles_glass_demo.blend" download>blender_cycles_glass_demo.blend</a></p>
</div>

When using a default `Glass BSDF` node in Blender Cycles to render drinkware, cosmetic bottles, or perfume flacons, four common issues usually appear:
1. The shadow cast underneath the glass base looks solid black despite the material being transparent.
2. Bright white noise speckles (**Fireflies**) appear along the glass walls and heavy base.
3. Overlapping multiple glass objects or modeling a thick base produces dark black patches.
4. Studio light reflections look overly sharp on the glass surface, or secondary fill cards leave distracting colored reflections on the outer rim.

This guide covers the 9 practical adjustments I use in commercial packshot projects, grouped into three parts for quick reference.

<div class="text-center my-8 flex flex-col md:flex-row justify-center items-center gap-4">
  <a href="/blog/assets/blender-cycles-glass-guide/blender_cycles_glass_demo.blend" download class="bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-download mr-3"></i> Download Sample Scene (.BLEND)
  </a>
  <a href="https://manhdesigns.gumroad.com/l/customlights" target="_blank" rel="noopener noreferrer" class="bg-pink-600 hover:bg-pink-700 text-white hover:text-white px-8 py-4 rounded-lg inline-flex items-center text-lg font-bold shadow-lg transform hover:scale-105 transition-transform duration-300">
    <i class="fa-solid fa-lightbulb mr-3"></i> Get Custom Lights Add-on
  </a>
</div>

---

## Part 1: Fixing Black Shadows & Removing Fireflies

By default, Blender Cycles blocks shadow rays at refractive surfaces to keep render times low. Simply enabling `Reflective / Refractive Caustics` increases render time significantly while still leaving noisy, under-lit shadows beneath the glass.

### Step 1: Combine Transparent BSDF with Is Shadow Ray
To keep full refraction on the glass body while allowing light rays to pass through to the tabletop shadow:
1. In the **Shader Editor**, keep your `Glass BSDF` node (or `Principled BSDF` with Transmission enabled) and add a **`Transparent BSDF`** node.
2. Connect both into a **`Mix Shader`** (`Glass BSDF` in the top socket, `Transparent BSDF` in the bottom socket).
3. Press `Shift + A` > **Input** > **`Light Path`**, and connect **`Is Shadow Ray`** into the **`Factor`** input of the `Mix Shader`.

Camera rays still evaluate the refractive glass shader, while shadow rays evaluate the `Transparent BSDF` node.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/01-shadow-ray-setup.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Connecting Is Shadow Ray to Mix Shader Factor between Glass BSDF and Transparent BSDF">
</figure>

### Step 2: Shape the Shadow Center with Layer Weight (Facing)
Using a flat white color on the `Transparent BSDF` makes the entire cast shadow uniformly bright, losing the contrast between the brighter center and darker outer rim of the shadow.
1. Press `Shift + A` and add a **`Layer Weight`** node and a **`Color Ramp`** node.
2. Connect the **`Facing`** output of `Layer Weight` into the `Color Ramp`, then plug its **`Color`** output into the `Color` socket of the `Transparent BSDF`.
3. Pull the black and white stops closer together on the `Color Ramp` so the center of the cast shadow stays bright while the outer edge remains darker.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/02-layer-weight-caustics.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Using Layer Weight Facing and Color Ramp into Transparent BSDF">
</figure>

### Step 3: Remove Fireflies with Clamp Indirect & Filter Glossy
Multiple internal reflections across curved glass surfaces often produce isolated high-energy pixels (**Fireflies**) along the rim and base.
1. Go to **Render Properties** > **Light Paths** > **Clamping** and set **`Indirect Light = 10.0`** (this caps extreme secondary bounce spikes without dimming direct studio highlights).
2. Right below under **Caustics**, set **`Filter Glossy = 1.0`** to soften sub-pixel caustic spikes on the glass surface.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/03-clamp-filter-glossy.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Setting Indirect Light = 10 and Filter Glossy = 1.0 in Render Properties">
</figure>

---

## Part 2: Increasing Light Bounces, Hiding Fill Light Reflections & Denoising

When rendering two overlapping glasses or a bottle with a thick crystal base, every entry and exit through a glass wall consumes two transmission bounces. If the ray hits the bounce limit before reaching a light source, Cycles returns black.

### Step 4: Increase Max Bounces (Transmission & Total)
1. Open **Render Properties** > **Light Paths** > **Max Bounces**.
2. Set **`Total = 32`**, **`Transmission = 24`**, **`Glossy = 12`**, and **`Transparent = 16`**.
3. With higher transmission bounces, rays pass cleanly through multiple overlapping glass walls and liquid volumes without turning black.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/04-max-bounces-transmission.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Increasing Max Bounces Total = 32 and Transmission = 24 for overlapping glass">
</figure>

### Step 5: Uncheck Glossy Ray Visibility on Fill Lights
When lighting colored liquids (whiskey, tea, or cosmetic serums), you often place a secondary fill light or reflector card near the glass to illuminate the liquid core. However, that fill card can leave an unwanted reflection strip on the outer glass wall.
1. Select the secondary fill light or reflector plane in the 3D Viewport.
2. Open **Object Properties** (orange square icon) > **Visibility** > **Ray Visibility**.
3. Uncheck **`Glossy`** (and `Camera` if the card is inside the camera frame). The fill light continues illuminating the liquid and environment without appearing as a specular reflection on the glass surface.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/05-ray-visibility-glossy.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Unchecking Glossy under Object Properties > Visibility > Ray Visibility">
</figure>

### Step 6: Switch Final Render Denoiser to OpenImageDenoise
While **OptiX** is fast for interactive viewport previews, it frequently blurs fine internal refraction patterns inside thick glass bases.
1. Go to **Render Properties** > **Sampling** > **Denoise**.
2. Change **Denoiser** from `OptiX` to **`OpenImageDenoise`**.
3. Set **Passes** to **`Albedo and Normal`** and **Prefilter** to **`Accurate`** to preserve crisp internal refractions.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/06-openimagedenoise-compare.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Comparing OptiX vs OpenImageDenoise (Accurate) on internal glass refraction details">
</figure>

---

## Part 3: Diffusing Specular Highlights, Wall Thickness & RGB Dispersion

### Step 7: Place a Translucent Diffuser Plane in Front of Key Lights
Pointing a raw Area Light directly at a glass cylinder produces a hard-edged rectangular reflection strip. To create a smooth gradient highlight like a studio scrim:
1. Place a **Plane** between your Area Light and the glass object.
2. Assign a **`Translucent BSDF`** shader to the plane so the light scatters smoothly across the diffuser surface before reflecting on the glass.
3. If you use my [**Custom Lights v2.1.5**](/blog/custom-light-v2-1-5-update/) add-on, select any light and click **`Translucent Light Plane`** in the `N-Panel` sidebar to automatically generate a parented diffuser plane in one click.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/07-translucent-light-plane.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Using a Translucent diffuser plane in front of the studio light via Custom Lights add-on">
</figure>

### Step 8: Add Wall Thickness (Solidify) & Overlap Liquid Mesh by 0.2mm
1. **Glass Wall Thickness:** Avoid modeling drinkware or bottles as a single-sided surface. With only one surface layer, Cycles treats the entire interior volume as solid glass and distorts background refraction. Always add a **`Solidify Modifier`** so the glass has both an outer and inner wall.
2. **Liquid-to-Glass Interface:** If the inner liquid mesh is slightly smaller than the inner glass wall (leaving a tiny air gap), total internal reflection will turn the liquid surface dark. Scale the liquid mesh so it overlaps slightly (**`~0.2mm`**) into the inner glass wall, and enable `Auto Smooth` / `Weighted Normal`.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/08-solidify-liquid-overlap.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Comparing a single-sided mesh with a Solidify glass wall and 0.2mm overlapping liquid mesh">
</figure>

### Step 9: Combine 3 Glass BSDF Nodes (R-G-B) with Shifted IOR for Dispersion
In thick glass bases or faceted perfume bottles, light splits slightly into spectral colors (**Chromatic Dispersion**). Because a single `Glass BSDF` node evaluates only one IOR value, you can build true RGB dispersion by summing three primary color channels:
1. Create three **`Glass BSDF`** nodes:
   * Node 1 (Red): `Color = (1, 0, 0)`, **`IOR = 1.485`**
   * Node 2 (Green): `Color = (0, 1, 0)`, **`IOR = 1.500`**
   * Node 3 (Blue): `Color = (0, 0, 1)`, **`IOR = 1.515`**
2. Combine all three using two **`Add Shader`** nodes. Along thin glass walls, the three channels overlap into clean white glass; inside thick bases and beveled edges, the shifted IOR angles separate into subtle rainbow fringes.

<figure class="figure my-6 justify-center items-center mx-auto">
  <img src="/blog/assets/blender-cycles-glass-guide/09-rgb-dispersion-shader.webp" class="figure-img img-fluid rounded-xl shadow-md w-full md:w-3/4 border border-white/10" alt="Combining 3 Red Green Blue Glass BSDF nodes with shifted IOR using Add Shader">
</figure>

---

## Quick Reference Summary Table

| Goal | Location | Recommended Setting |
| :--- | :--- | :--- |
| **Brighten cast shadows under glass** | `Shader Editor` | Mix `Glass BSDF` + `Transparent BSDF` (`Factor` = `Light Path > Is Shadow Ray`) |
| **Create focused bright center in shadow** | `Shader Editor` | `Layer Weight (Facing)` &rarr; `Color Ramp` &rarr; `Transparent BSDF (Color)` |
| **Remove white noise speckles (Fireflies)** | `Render Properties > Light Paths` | `Clamp Indirect = 10.0`, `Filter Glossy = 1.0` |
| **See clearly through overlapping glass** | `Render Properties > Max Bounces` | `Total = 32`, `Transmission = 24`, `Glossy = 12`, `Transparent = 16` |
| **Hide fill light / reflector card reflection** | `Object Properties > Visibility` | Uncheck `Ray Visibility > Glossy` on secondary fill lights |
| **Preserve internal refraction when denoising** | `Render Properties > Sampling` | `Denoiser = OpenImageDenoise`, `Passes = Albedo and Normal`, `Prefilter = Accurate` |
| **Soften studio light highlight edges** | `3D Viewport / Custom Lights` | Place a `Translucent BSDF` diffuser plane between the light and glass |
| **Correct refraction & liquid interface** | `Modifier / Edit Mode` | Add `Solidify Modifier` to glass; overlap liquid mesh `0.2mm` into inner glass wall |
| **Add rainbow dispersion at thick base** | `Shader Editor` | Sum 3 `Glass BSDF` nodes: Red (`1.485`), Green (`1.500`), Blue (`1.515`) via `Add Shader` |

---

## Downloads & Related Tools

* **Sample Blender Scene (`.blend` with all 3 parts):** [blender_cycles_glass_demo.blend](/blog/assets/blender-cycles-glass-guide/blender_cycles_glass_demo.blend)
* **Custom Lights v2.1.5 Add-on (1-Click Studio Lights & Translucent Light Plane):**
  * [Read the Custom Lights v2.1.5 Guide](/blog/custom-light-v2-1-5-update/)
  * [Free Download on Gumroad](https://manhdesigns.gumroad.com/l/customlights)
  * [Source Code on GitHub](https://github.com/Manh-Huynh-PP/Custom-lights)

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
