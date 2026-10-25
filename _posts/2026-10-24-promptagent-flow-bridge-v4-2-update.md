---
layout: post
title: "PromptAgent Flow Bridge v4.2.0: Pose Studio 3D, PromptBook phẳng & Ask Gemini Slash Skills"
date: 2026-10-24
author: Mạnh Huỳnh
categories: [Share, Guide, Extension]
tags: [PromptAgent, Google Flow, Gemini, Pose Studio 3D, Extension, Chrome, AI Workflow]
thumbnail: /assets/images/flow-bridge/hero-banner.png
excerpt: >
  PromptAgent Flow Bridge v4.2.0 tích hợp Pose Studio 3D ngay trong trang kèm thông số Camera DNA, rút gọn PromptBook thành danh sách phẳng với nút Book 2-trong-1 và bổ sung bộ 6 Slash Skills cho Ask Gemini trên Chrome.
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
.copy-skill-inline-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  margin: 0 4px;
  font-size: 12.5px;
  font-weight: 600;
  font-family: inherit;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(59, 130, 246, 0.38);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.18s ease;
  vertical-align: middle;
}
.copy-skill-inline-btn:hover {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #ffffff;
}
.copy-skill-inline-btn.copied {
  color: #10b981;
  background: rgba(16, 185, 129, 0.15);
  border-color: #10b981;
}
.img-caption {
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: -8px;
  margin-bottom: 20px;
  font-style: italic;
}
.notion-callout {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  margin: 18px 0;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.28);
  font-size: 0.95rem;
  line-height: 1.6;
}
.skill-toggle {
  margin: 10px 0;
  border: 1px solid rgba(156, 163, 175, 0.25);
  border-radius: 10px;
  background: rgba(17, 24, 39, 0.35);
  overflow: hidden;
}
.skill-toggle summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
  user-select: none;
  list-style: none;
}
.skill-toggle summary::-webkit-details-marker {
  display: none;
}
.skill-toggle pre {
  margin: 0;
  padding: 14px;
  max-height: 360px;
  overflow: auto;
  font-size: 12.5px;
  line-height: 1.5;
  background: #0f172a;
  color: #e2e8f0;
  border-top: 1px solid rgba(156, 163, 175, 0.2);
  white-space: pre-wrap;
  word-break: break-word;
}
</style>

<!-- ======================================================================= -->
<!-- VIETNAMESE CONTENT                                                      -->
<!-- ======================================================================= -->
<div id="content-vi" class="content-lang active" markdown="1">

# PromptAgent Flow Bridge v4.2.0: Pose Studio 3D, PromptBook phẳng & Ask Gemini Slash Skills

**PromptAgent Flow Bridge v4.2.0** tập trung giải quyết 3 việc khi làm hình ảnh và video trên **Google Flow (`flow.google.com`)**: dựng dáng nhân vật và góc máy bằng mô hình 3D ngay trong trang, lưu/dán prompt trên một danh sách phẳng không chia thư mục, và gọi trực tiếp 6 Slash Skills trong khung **Ask Gemini** của Chrome.

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

## 1. Các thay đổi trong bản v4.2.0

### Pose Studio 3D trong trang và tự động chèn thông số góc máy
Thay vì mô tả góc máy và tư thế nhân vật bằng chữ, thanh công cụ nổi nay có thêm nút **Pose Studio 3D**:
- **Chuột trái**: Mở cửa sổ **Pose Studio 3D** ngay trên giao diện trang đang làm việc.
- **Chuột phải**: Mở Pose Studio 3D ở tab riêng (`https://prompt.manhhuynh.work/pose/`).
- **Nút `Insert Pose`**: Tự động đính kèm ảnh PNG dáng nhân vật 3D vào ô tham chiếu, đồng thời điền thông số góc máy (**Camera & Shooting Angle DNA**) gồm tiêu cự ống kính (`mm`), cỡ cảnh, góc cao/thấp (`°` elevation), góc xoay ngang so với hướng mặt nhân vật và độ nghiêng máy (Dutch tilt) vào ô nhập prompt.

![Mở Pose Studio 3D trực tiếp trên giao diện Google Flow](/assets/images/flow-bridge/flow-pose-studio-inpage.png)
<p class="img-caption">Mở Pose Studio 3D ngay trên giao diện Google Flow để xoay dáng nhân vật và chọn tiêu cự ống kính.</p>

![Ảnh tham chiếu 3D và thông số Camera DNA được chèn tự động vào Google Flow](/assets/images/flow-bridge/flow-camera-dna-injected.png)
<p class="img-caption">Khi bấm Insert Pose, ảnh tham chiếu PNG và khối thông số Camera DNA được điền thẳng vào ô prompt của Google Flow.</p>

### PromptBook phẳng và nút Book 2-trong-1
Ở các bản trước, người dùng phải tạo Project rồi tạo Scene trước khi lưu một câu prompt. Bản **v4.2.0** bỏ toàn bộ cấp thư mục này:
- **Danh sách phẳng PromptBook**: Mở popup tiện ích hoặc menu nổi là vào thẳng danh sách prompt (mỗi thẻ hiển thị 2 dòng kèm nút **Paste**). Các prompt đã lưu trước đây trên máy hoặc trên Cloud Firestore vẫn được giữ nguyên và gộp tự động.
- **Gộp thao tác vào một nút Book trên thanh công cụ nổi**:
  - **Chuột trái vào icon Book**: Lưu ngay câu prompt đang gõ trên trang vào PromptBook, tự đặt tiêu đề theo nội dung.
  - **Chuột phải vào icon Book**: Mở danh sách **PromptBook** nổi để tìm và dán prompt đã lưu.

![Thanh công cụ nổi 3 nút và cửa sổ PromptBook phẳng trên Google Flow](/assets/images/flow-bridge/flow-promptbook-v42.png)
<p class="img-caption">Chuột phải vào nút Book trên thanh công cụ nổi để mở nhanh PromptBook phẳng ngay trên Google Flow.</p>

### Dùng chung với Ask Gemini trên Chrome và 6 Slash Skills
Bạn không cần chia đôi 2 cửa sổ trình duyệt hay tạo Gem riêng. Chỉ cần mở thanh bên **Ask Gemini** ở góc trên bên phải Chrome (có khả năng đọc hình ảnh/video trên tab đang mở) và gọi 6 Slash Skills, trong đó có skill mới **`/feedback`** để lọc phản hồi của khách hàng thành checklist chỉnh sửa.

![Kết quả hình ảnh tạo trên Google Flow giữ đúng dáng và góc máy từ Pose Studio 3D](/assets/images/flow-bridge/flow-generated-result.png)
<p class="img-caption">Kết quả tạo ảnh trên Google Flow sau khi kết hợp Pose Studio 3D và prompt từ Ask Gemini.</p>

### Mặc định chỉ hiển thị trên Google Flow
Để thanh công cụ nổi không tự xuất hiện trên các trang web thông thường:
- **Mặc định**: Thanh công cụ nổi chỉ tự bật khi bạn vào **Google Flow (`flow.google.com`)**.
- **Bật thủ công trên trang AI khác**: Khi dùng Adobe Firefly, Magnific / Freepik Spaces, Higgsfield AI hoặc Midjourney, mở popup tiện ích và bấm **`Paste: OFF` → `Paste: ON`** (hoặc bật *Auto-detect AI sites* trong phần cài đặt).

---

## 2. Hướng dẫn sử dụng AI Skill Book với Gemini trong Chrome

### 2.1. Thêm skill vào Chrome

1. Mở trình duyệt **Google Chrome**.
2. Nhập `chrome://skills/yourSkills` <button type="button" class="copy-skill-inline-btn" onclick="copyTextInline(this, 'chrome://skills/yourSkills')">📋 Copy Link</button> vào thanh địa chỉ rồi nhấn **Enter**.
3. Trong **Your skills**, bấm **+ Add** để thêm skill.
4. Quay về mục **Copy nhanh** bên dưới, mở skill cần dùng và bấm **📋 Copy Skill** để sao chép toàn bộ nội dung.
5. Dán nội dung vào phần hướng dẫn của skill trong Chrome, đặt tên dễ nhớ rồi lưu. Lặp lại cho các skill còn lại.

![Màn hình Your skills và nút + Add trong Chrome](/assets/images/flow-bridge/chrome-your-skills-add.png)
<p class="img-caption">Màn hình Your skills và nút + Add trong Chrome.</p>

**Gợi ý tên ngắn để gọi nhanh** — đặt tên này khi thêm skill vào Chrome:

| Skill trong thư viện | Tên gợi ý | Lệnh gọi | Copy nhanh |
| :--- | :--- | :--- | :--- |
| **00 All-in-One Flow Director** | `flow` | `/flow` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '00_all_in_one_flow_director.md')">📋 Copy Skill</button> <a href="/assets/skills/00_all_in_one_flow_director.md" download="00_all_in_one_flow_director.md"><code>⬇ .md</code></a> |
| **01 Still Image Craft** | `still` | `/still` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '01_still_image_craft.md')">📋 Copy Skill</button> <a href="/assets/skills/01_still_image_craft.md" download="01_still_image_craft.md"><code>⬇ .md</code></a> |
| **02 Video Shot Craft** | `shot` | `/shot` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '02_video_shot_craft.md')">📋 Copy Skill</button> <a href="/assets/skills/02_video_shot_craft.md" download="02_video_shot_craft.md"><code>⬇ .md</code></a> |
| **03 Edit Composite Relight** | `edit` | `/edit` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '03_edit_composite_relight.md')">📋 Copy Skill</button> <a href="/assets/skills/03_edit_composite_relight.md" download="03_edit_composite_relight.md"><code>⬇ .md</code></a> |
| **04 Creative Thinking** | `Thinking` | `/Thinking` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '04_creative_thinking.md')">📋 Copy Skill</button> <a href="/assets/skills/04_creative_thinking.md" download="04_creative_thinking.md"><code>⬇ .md</code></a> |
| **05 Client Feedback Filter** | `feedback` | `/feedback` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '05_client_feedback_filter.md')">📋 Copy Skill</button> <a href="/assets/skills/05_client_feedback_filter.md" download="05_client_feedback_filter.md"><code>⬇ .md</code></a> |

---

### 2.2. Mở Ask Gemini và gọi skill

1. Mở trang web bạn muốn làm việc (ví dụ: `flow.google.com`).
2. Bấm **Ask Gemini** trên thanh cửa sổ Chrome để mở hộp thoại Gemini.

<img src="/assets/images/flow-bridge/chrome-ask-gemini-button.png" alt="Nút Ask Gemini trên thanh cửa sổ" style="max-width: 240px;" />
<p class="img-caption">Nút Ask Gemini trên thanh cửa sổ.</p>

3. Trong ô chat, gõ `/` rồi chọn skill, hoặc nhập `/tên skill` theo tên bạn đã lưu. Không cần gõ dấu ngoặc kép.
4. Nhập yêu cầu cụ thể rồi gửi. Ví dụ: chọn `/still`, sau đó nhập *“Viết prompt ảnh sản phẩm dựa trên hình đang mở, giữ nguyên bao bì và nhãn.”*
5. Khi Gemini được cấp quyền truy cập ngữ cảnh trang đang mở, Gemini có thể dùng nội dung đó làm tham chiếu và trả về prompt theo hướng dẫn của skill. Với các skill viết prompt ảnh/video trong bộ này, đầu ra là văn bản prompt tiếng Anh để sao chép, không phải ảnh/video được tạo trực tiếp.

<img src="/assets/images/flow-bridge/ask-gemini-slash-menu.png" alt="Gõ / trong hộp thoại Gemini để mở danh sách skill" style="max-width: 240px;" />
<p class="img-caption">Gõ / trong hộp thoại Gemini để mở danh sách skill.</p>

<div class="notion-callout">
  <span>💡</span>
  <div>Bạn có thể gọi skill khi đang ở trang web cần làm việc, không cần quay lại Skill Book. Khả năng đọc nội dung trang phụ thuộc vào quyền truy cập và tính năng Gemini trong Chrome đang được bật trên tài khoản. Chỉ chia sẻ nội dung bạn được phép cung cấp cho Gemini.</div>
</div>

---

### 2.3. Lọc feedback khách hàng bằng skill Feedback (`/feedback`)

1. Thêm skill **05 Client Feedback Filter** theo hướng dẫn trên; đặt tên gợi ý **feedback** để gọi bằng `/feedback`.
2. Mở **Ask Gemini**, chọn skill rồi dán nguyên văn feedback khách hàng. Nếu phản hồi nói về một vị trí cụ thể, gửi kèm ảnh/video hoặc timestamp để có đủ ngữ cảnh.
3. Nhận checklist dưới **150 từ**, gồm mức độ chỉnh sửa (`MINOR / MAJOR / CONFLICT`), việc cần làm, điểm mâu thuẫn/thiếu tư liệu và tối đa **3 câu hỏi A/B hoặc có/không**. Kết quả dùng cùng ngôn ngữ với feedback.
4. Kiểm tra các diễn giải có dấu **(?)** trước khi giao chỉnh sửa; đây là cách cụ thể hóa góp ý mơ hồ, chưa phải yêu cầu đã được khách hàng xác nhận.

**Ví dụ yêu cầu sau khi chọn `/feedback`:** *“Lọc feedback sau thành checklist chỉnh sửa; giữ timestamp nếu có: [dán feedback khách hàng]”.*

---

## 3. Chức năng và cách dùng chi tiết các skill

| Skill | Chức năng được thiết kế | Khi nào dùng / cách dùng |
| :--- | :--- | :--- |
| **00 All-in-One Flow Director** · `/flow` | Bộ điều phối tổng hợp: tự chọn cách viết prompt ảnh tĩnh, video, storyboard hoặc chỉnh sửa theo yêu cầu. Kiểm soát ánh sáng, chuyển động và tính nhất quán giữa các cảnh. | Dùng khi chưa biết chọn skill nào hoặc brief gồm nhiều loại đầu ra. Nêu mục tiêu, đầu ra cần có và cung cấp ảnh/video tham chiếu nếu có. |
| **01 Still Image Craft** · `/still` | Viết prompt ảnh tĩnh cho người/bối cảnh, packshot sản phẩm và bộ thiết kế nhân vật nhất quán. Chọn ống kính, chất liệu, ánh sáng và chi tiết bề mặt để giảm cảm giác ảnh AI. | Dùng cho ảnh quảng cáo, chân dung, ảnh sản phẩm hoặc character sheet. Nêu chủ thể, bối cảnh, tỉ lệ ảnh và vùng chừa chữ; gửi ảnh tham chiếu để giữ đúng sản phẩm. |
| **02 Video Shot Craft** · `/shot` | Viết prompt từng cảnh video từ mô tả (T2V), từ ảnh có sẵn (I2V), nối dài clip hoặc storyboard nhiều cảnh. Ưu tiên một hành động liên tục, một chuyển động máy có mục đích và tính nhất quán giữa các shot. | Nêu rõ chế độ và hành động muốn thấy. Với I2V, cung cấp ảnh rồi mô tả chuyển động; với storyboard, nêu thời lượng và thông điệp chính. |
| **03 Edit Composite Relight** · `/edit` | Viết prompt chỉnh sửa có giới hạn: sửa một ảnh, ghép nhiều ảnh hoặc đổi ánh sáng video sản phẩm. Tách rõ phần cần đổi và phần phải giữ, bảo toàn nhận diện, bao bì, chữ và chuyển động gốc. | Gửi tư liệu, chỉ rõ “đổi gì / giữ gì”. Nếu ghép nhiều ảnh, gán vai trò từng ảnh; nếu relight video, cung cấp video gốc và ảnh sản phẩm tham chiếu. |
| **04 Creative Thinking** · `/Thinking` | Phát triển hook, biến tấu asset, đánh giá concept, tìm rủi ro, so sánh phương án và tháo gỡ bài toán từ gốc. Tự chọn hoặc kết hợp các phương pháp tư duy theo yêu cầu. | Nêu bài toán, mục tiêu, đối tượng, tư liệu hiện có và giới hạn sản xuất. Yêu cầu đầu ra cụ thể như 3 hook, review kịch bản, bảng so sánh hoặc kế hoạch thử nghiệm. |
| **05 Client Feedback Filter** · `/feedback` | Lọc feedback ảnh/video dài thành checklist chỉnh sửa dưới 150 từ; gắn từng việc với timestamp hoặc vùng ảnh, đánh dấu diễn giải chưa chắc bằng `(?)`, nêu mâu thuẫn và tối đa 3 câu hỏi ngắn. | Dán nguyên văn feedback, kèm ảnh/video hoặc timestamp nếu có. Nhận `TL;DR` (`MINOR / MAJOR / CONFLICT`), `Do`, `Flags` khi có và `Ask client`; trả lời cùng ngôn ngữ với feedback. |

- **Nguyên tắc đầu ra:** Các skill `00`–`03` được thiết kế để **viết prompt bằng văn bản, không trực tiếp tạo hoặc chỉnh sửa ảnh/video**. Phần giải thích ngắn bằng tiếng Việt; prompt tiếng Anh nằm trong khối mã riêng để dễ sao chép. Skill `04` chủ yếu trả lời bằng tiếng Việt; khi có prompt ảnh/video dùng ngay, prompt đó được đặt bằng tiếng Anh trong khối mã. Các lệnh `/...` ở trên dùng theo tên gợi ý nếu bạn đã đặt đúng tên đó trong Chrome.
- **Skill 05:** Lọc feedback thành checklist chỉnh sửa, không viết prompt tạo ảnh/video; đầu ra cùng ngôn ngữ với feedback và dưới 150 từ.

---

## 4. Copy nhanh nội dung các Skill

Bấm nút **📋 Copy Skill** để sao chép ngay hoặc bấm vào từng dòng để xem toàn bộ nội dung Markdown nguyên văn của skill:

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '00_all_in_one_flow_director.md')">
  <summary>
    <span>▸ 00 All-in-One Flow Director (<code>/flow</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '00_all_in_one_flow_director.md')">📋 Copy Skill</button>
      <a href="/assets/skills/00_all_in_one_flow_director.md" download="00_all_in_one_flow_director.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Đang tải nội dung skill...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '01_still_image_craft.md')">
  <summary>
    <span>▸ 01 Still Image Craft (<code>/still</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '01_still_image_craft.md')">📋 Copy Skill</button>
      <a href="/assets/skills/01_still_image_craft.md" download="01_still_image_craft.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Đang tải nội dung skill...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '02_video_shot_craft.md')">
  <summary>
    <span>▸ 02 Video Shot Craft (<code>/shot</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '02_video_shot_craft.md')">📋 Copy Skill</button>
      <a href="/assets/skills/02_video_shot_craft.md" download="02_video_shot_craft.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Đang tải nội dung skill...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '03_edit_composite_relight.md')">
  <summary>
    <span>▸ 03 Edit Composite Relight (<code>/edit</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '03_edit_composite_relight.md')">📋 Copy Skill</button>
      <a href="/assets/skills/03_edit_composite_relight.md" download="03_edit_composite_relight.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Đang tải nội dung skill...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '04_creative_thinking.md')">
  <summary>
    <span>▸ 04 Creative Thinking (<code>/Thinking</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '04_creative_thinking.md')">📋 Copy Skill</button>
      <a href="/assets/skills/04_creative_thinking.md" download="04_creative_thinking.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Đang tải nội dung skill...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '05_client_feedback_filter.md')">
  <summary>
    <span>▸ 05 Client Feedback Filter (<code>/feedback</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '05_client_feedback_filter.md')">📋 Copy Skill</button>
      <a href="/assets/skills/05_client_feedback_filter.md" download="05_client_feedback_filter.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Đang tải nội dung skill...</pre>
</details>

---

## 5. Tóm tắt thao tác sử dụng trên thanh công cụ nổi (3 nút)

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

# PromptAgent Flow Bridge v4.2.0: In-Page Pose Studio 3D, Flat PromptBook & Ask Gemini Slash Skills

**PromptAgent Flow Bridge v4.2.0** focuses on three changes for image and video production on **Google Flow (`flow.google.com`)**: staging 3D character poses and camera angles directly inside the page, saving and pasting prompts from a flat list without folder hierarchies, and running 6 Slash Skills inside Chrome's built-in **Ask Gemini** side panel.

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

## 1. Changes in v4.2.0

### In-Page Pose Studio 3D and Camera DNA Injection
Instead of describing camera angles and character posture by hand, the floating dock now includes a **Pose Studio 3D** button:
- **Left-click**: Opens the **Pose Studio 3D** modal directly over your workspace.
- **Right-click**: Opens Pose Studio 3D in a separate tab (`https://prompt.manhhuynh.work/pose/`).
- **`Insert Pose`**: Attaches the rendered 3D pose reference PNG to the upload slot and inserts **Camera & Shooting Angle DNA** (focal length in `mm`, shot framing, vertical elevation in degrees, horizontal azimuth relative to character orientation, and Dutch tilt) into the prompt box.

![Opening Pose Studio 3D directly over Google Flow](/assets/images/flow-bridge/flow-pose-studio-inpage.png)
<p class="img-caption">Opening Pose Studio 3D directly over Google Flow to set character posture and lens focal length.</p>

![3D pose PNG and Camera DNA injected into Google Flow](/assets/images/flow-bridge/flow-camera-dna-injected.png)
<p class="img-caption">Clicking Insert Pose attaches the PNG reference and fills the Camera DNA block into Google Flow's prompt input.</p>

### Flat PromptBook and 2-in-1 Book Button
Version **v4.2.0** removes the Project/Scene folder hierarchy:
- **Flat PromptBook List**: Opening the extension popup or floating menu goes straight to a flat, searchable list of prompts with 1-click **Paste** buttons. All previously saved local and Firestore prompts are preserved and merged automatically.
- **Single Book Button on the Floating Dock**:
  - **Left-click on the Book icon**: Saves the active prompt from the page editor into PromptBook with an auto-generated title.
  - **Right-click on the Book icon**: Opens the floating **PromptBook** menu to search and paste saved prompts.

![3-button floating dock and flat PromptBook popover on Google Flow](/assets/images/flow-bridge/flow-promptbook-v42.png)
<p class="img-caption">Right-clicking the Book button on the floating dock opens the flat PromptBook popover directly over Google Flow.</p>

### Chrome "Ask Gemini" Side Panel and 6 Slash Skills
Open Chrome's built-in **Ask Gemini** side panel on the same window (which reads images and videos on your active tab) and invoke the 6 Slash Skills, including the new **`/feedback`** skill for converting raw client notes into a short revision checklist.

![Generated result on Google Flow matching the 3D pose and camera angle](/assets/images/flow-bridge/flow-generated-result.png)
<p class="img-caption">Result generated on Google Flow combining Pose Studio 3D and an Ask Gemini prompt.</p>

### Shown on Google Flow Only by Default
To keep the floating dock from appearing on regular websites:
- **Default**: The floating dock appears automatically **only on Google Flow (`flow.google.com`)**.
- **Manual Toggle on Other AI Sites**: On Adobe Firefly, Magnific / Freepik Spaces, Higgsfield AI, or Midjourney, open the extension popup and switch **`Paste: OFF` → `Paste: ON`** (or enable *Auto-detect AI sites* in Settings).

---

## 2. How to Use the AI Skill Book with Gemini in Chrome

### 2.1. Add Skills to Chrome

1. Open **Google Chrome**.
2. Enter `chrome://skills/yourSkills` <button type="button" class="copy-skill-inline-btn" onclick="copyTextInline(this, 'chrome://skills/yourSkills')">📋 Copy Link</button> into the address bar and press **Enter**.
3. Under **Your skills**, click **+ Add** to create a new skill.
4. Go to the **Quick Copy** section below, pick a skill, and click **📋 Copy Skill** to copy its full instructions.
5. Paste the instructions into Chrome's skill editor, give it a short memorable name, and save. Repeat for the remaining skills.

![Your skills screen and + Add button in Chrome](/assets/images/flow-bridge/chrome-your-skills-add.png)
<p class="img-caption">The Your skills screen and + Add button in Chrome.</p>

**Recommended Short Names for Quick Invocation** — use these names when adding skills to Chrome:

| Skill in Library | Suggested Name | Slash Command | Quick Copy |
| :--- | :--- | :--- | :--- |
| **00 All-in-One Flow Director** | `flow` | `/flow` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '00_all_in_one_flow_director.md')">📋 Copy Skill</button> <a href="/assets/skills/00_all_in_one_flow_director.md" download="00_all_in_one_flow_director.md"><code>⬇ .md</code></a> |
| **01 Still Image Craft** | `still` | `/still` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '01_still_image_craft.md')">📋 Copy Skill</button> <a href="/assets/skills/01_still_image_craft.md" download="01_still_image_craft.md"><code>⬇ .md</code></a> |
| **02 Video Shot Craft** | `shot` | `/shot` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '02_video_shot_craft.md')">📋 Copy Skill</button> <a href="/assets/skills/02_video_shot_craft.md" download="02_video_shot_craft.md"><code>⬇ .md</code></a> |
| **03 Edit Composite Relight** | `edit` | `/edit` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '03_edit_composite_relight.md')">📋 Copy Skill</button> <a href="/assets/skills/03_edit_composite_relight.md" download="03_edit_composite_relight.md"><code>⬇ .md</code></a> |
| **04 Creative Thinking** | `Thinking` | `/Thinking` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '04_creative_thinking.md')">📋 Copy Skill</button> <a href="/assets/skills/04_creative_thinking.md" download="04_creative_thinking.md"><code>⬇ .md</code></a> |
| **05 Client Feedback Filter** | `feedback` | `/feedback` | <button type="button" class="copy-skill-inline-btn" onclick="copySkillMd(this, '05_client_feedback_filter.md')">📋 Copy Skill</button> <a href="/assets/skills/05_client_feedback_filter.md" download="05_client_feedback_filter.md"><code>⬇ .md</code></a> |

---

### 2.2. Open Ask Gemini & Invoke a Skill

1. Open the webpage you want to work on (e.g., `flow.google.com`).
2. Click **Ask Gemini** on Chrome's window bar to open the Gemini panel.

<img src="/assets/images/flow-bridge/chrome-ask-gemini-button.png" alt="Ask Gemini button on the Chrome window bar" style="max-width: 240px;" />
<p class="img-caption">The Ask Gemini button on the Chrome window bar.</p>

3. In the chat box, type `/` and select a skill, or type `/skill-name` matching the name you saved.
4. Enter your specific request and send. For example: select `/still`, then type *“Write a product photo prompt based on the open image, preserving packaging and label details.”*
5. When Gemini has permission to read your active tab context, it uses the page content as reference and returns a clean English prompt inside a code block ready to copy and paste.

<img src="/assets/images/flow-bridge/ask-gemini-slash-menu.png" alt="Type / in the Gemini dialog to open the skill list" style="max-width: 240px;" />
<p class="img-caption">Type / in the Gemini dialog to open the skill list.</p>

<div class="notion-callout">
  <span>💡</span>
  <div>You can invoke skills directly on the webpage you are working on without returning to the Skill Book. Page context reading depends on your Chrome Gemini permissions and account settings. Only share content you are authorized to provide to Gemini.</div>
</div>

---

### 2.3. Filter Client Feedback with `/feedback`

1. Add **05 Client Feedback Filter** using the steps above and name it **feedback** to invoke via `/feedback`.
2. Open **Ask Gemini**, select `/feedback`, and paste raw client feedback. Attach reference images/videos or timestamps if the feedback refers to specific moments.
3. Receive an actionable checklist under **150 words**, including revision severity (`MINOR / MAJOR / CONFLICT`), anchored tasks, conflicts/missing assets, and up to **3 short A/B or Yes/No questions** in the same language as the feedback.
4. Review items marked with **(?)** before handing off edits—these turn vague subjective notes into concrete suggestions awaiting client confirmation.

---

## 3. Skill Functions & Usage Guide

| Skill | Designed Function | When & How to Use |
| :--- | :--- | :--- |
| **00 All-in-One Flow Director** · `/flow` | Master orchestrator: automatically routes between still image prompts, video shots, storyboards, or surgical edits while maintaining lighting and visual continuity. | Use when unsure which skill to pick or when a brief spans multiple deliverables. State your goal, desired outputs, and provide references. |
| **01 Still Image Craft** · `/still` | Writes photorealistic still prompts for people/environments, material-driven product packshots, and consistent Character Sheets with lens, lighting, and surface micro-imperfections. | Use for ad key visuals, portraits, product shots, or character sheets. Specify subject, setting, aspect ratio, and copy safe zones. |
| **02 Video Shot Craft** · `/shot` | Writes single-shot T2V prompts, concise I2V motion-only prompts, clip extensions, or multi-shot storyboards focusing on one continuous action and purposeful camera move. | Specify mode and desired motion. For I2V, provide the still image and describe motion; for storyboards, state duration and core message. |
| **03 Edit Composite Relight** · `/edit` | Writes constrained edit prompts: single-image edits, multi-image composites, or V2V product relighting (`Change / Preserve / Integration`). | Provide source assets and clearly state what to change vs. preserve. Assign image roles (`Image 1`, `Image 2`) for composites. |
| **04 Creative Thinking** · `/Thinking` | Develops viral hooks, SCAMPER variations, Six Thinking Hats reviews, pre-mortem risk checks, Tree of Thoughts comparisons, and First Principles deconstructions. | State the problem, goal, target audience, existing assets, and production constraints. Ask for specific outputs (e.g., 3 hooks, script review). |
| **05 Client Feedback Filter** · `/feedback` | Condenses long image/video feedback into an actionable checklist under 150 words, anchored to timestamps or image regions, flagging `(?)` interpretations and conflicts. | Paste raw client feedback with optional timestamps or media. Outputs `TL;DR` (`MINOR / MAJOR / CONFLICT`), `Do`, `Flags`, and `Ask client`. |

---

## 4. Quick Copy Skills

Click **📋 Copy Skill** to copy immediately, or click any row to expand and inspect the full Markdown source:

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '00_all_in_one_flow_director.md')">
  <summary>
    <span>▸ 00 All-in-One Flow Director (<code>/flow</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '00_all_in_one_flow_director.md')">📋 Copy Skill</button>
      <a href="/assets/skills/00_all_in_one_flow_director.md" download="00_all_in_one_flow_director.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Loading skill content...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '01_still_image_craft.md')">
  <summary>
    <span>▸ 01 Still Image Craft (<code>/still</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '01_still_image_craft.md')">📋 Copy Skill</button>
      <a href="/assets/skills/01_still_image_craft.md" download="01_still_image_craft.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Loading skill content...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '02_video_shot_craft.md')">
  <summary>
    <span>▸ 02 Video Shot Craft (<code>/shot</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '02_video_shot_craft.md')">📋 Copy Skill</button>
      <a href="/assets/skills/02_video_shot_craft.md" download="02_video_shot_craft.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Loading skill content...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '03_edit_composite_relight.md')">
  <summary>
    <span>▸ 03 Edit Composite Relight (<code>/edit</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '03_edit_composite_relight.md')">📋 Copy Skill</button>
      <a href="/assets/skills/03_edit_composite_relight.md" download="03_edit_composite_relight.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Loading skill content...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '04_creative_thinking.md')">
  <summary>
    <span>▸ 04 Creative Thinking (<code>/Thinking</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '04_creative_thinking.md')">📋 Copy Skill</button>
      <a href="/assets/skills/04_creative_thinking.md" download="04_creative_thinking.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Loading skill content...</pre>
</details>

<details class="skill-toggle" ontoggle="loadSkillPreview(this, '05_client_feedback_filter.md')">
  <summary>
    <span>▸ 05 Client Feedback Filter (<code>/feedback</code>)</span>
    <span>
      <button type="button" class="copy-skill-inline-btn" onclick="event.stopPropagation(); copySkillMd(this, '05_client_feedback_filter.md')">📋 Copy Skill</button>
      <a href="/assets/skills/05_client_feedback_filter.md" download="05_client_feedback_filter.md" onclick="event.stopPropagation()"><code>⬇ .md</code></a>
    </span>
  </summary>
  <pre>Loading skill content...</pre>
</details>

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

async function copyTextInline(btn, text) {
  const origText = btn.textContent;
  try {
    await navigator.clipboard.writeText(text);
    const lang = localStorage.getItem('preferredLanguage') || 'vi';
    btn.textContent = lang === 'vi' ? '✓ Đã copy Link!' : '✓ Copied Link!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = origText;
      btn.classList.remove('copied');
    }, 1800);
  } catch (err) {
    console.error(err);
  }
}

async function copySkillMd(btn, fileName) {
  const origText = btn.textContent;
  try {
    let res = await fetch('/assets/skills/' + fileName);
    if (!res.ok) {
      res = await fetch('https://prompt.manhhuynh.work/skills/' + fileName);
    }
    if (!res.ok) throw new Error('Failed to fetch skill');
    const text = await res.text();
    await navigator.clipboard.writeText(text);
    const lang = localStorage.getItem('preferredLanguage') || 'vi';
    btn.textContent = lang === 'vi' ? '✓ Đã copy Skill!' : '✓ Copied Skill!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = origText;
      btn.classList.remove('copied');
    }, 1800);
  } catch (err) {
    console.error(err);
    btn.textContent = '⚠ Error';
    setTimeout(() => { btn.textContent = origText; }, 1500);
  }
}

async function loadSkillPreview(detailsEl, fileName) {
  if (!detailsEl.open || detailsEl.dataset.loaded === '1') return;
  const pre = detailsEl.querySelector('pre');
  if (!pre) return;
  try {
    let res = await fetch('/assets/skills/' + fileName);
    if (!res.ok) {
      res = await fetch('https://prompt.manhhuynh.work/skills/' + fileName);
    }
    if (!res.ok) throw new Error('Failed to load skill');
    const text = await res.text();
    pre.textContent = text;
    detailsEl.dataset.loaded = '1';
  } catch (err) {
    pre.textContent = 'Không thể tải nội dung skill / Could not load skill content.';
  }
}
</script>
