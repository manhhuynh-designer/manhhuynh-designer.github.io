---
layout: post
title: "Hướng dẫn cài đặt & sử dụng PromptAgent Flow Bridge"
date: 2026-05-10
author: Mạnh Huỳnh
categories: [Guide, Extension]
tags: [PromptAgent, Google Flow, Gemini, Extension, Chrome]
thumbnail: /assets/images/flow-bridge/hero-banner.png
excerpt: >
  Hướng dẫn chi tiết cách cấu hình và sử dụng tiện ích PromptAgent Flow Bridge để kết nối liền mạch giữa Google Flow và Gemini Agent.
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
/* Override global button color rules for language toggle */
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
<div id="content-vi" class="content-lang active">

<h1>🇻🇳 Hướng dẫn sử dụng PromptAgent Flow Bridge</h1>

<p>Chào mừng bạn đến với hướng dẫn sử dụng <strong>PromptAgent Flow Bridge</strong> — tiện ích kết nối <strong>Google Flow</strong> và <strong>Gemini</strong>, giúp bạn tạo prompt, sinh ảnh/video, và tối ưu kết quả trong một workflow liền mạch.</p>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin-bottom: 20px;">
  <iframe src="https://www.youtube.com/embed/ATnVKq5wJdY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="PromptAgent Flow Bridge" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<!-- Overview Card -->
<div class="guide-overview">
  <h3>📋 Tổng quan: 3 bước để bắt đầu</h3>
  <div class="steps-row">
    <a href="#vi-step-1" class="step-pill" style="text-decoration: none; color: inherit;"><span class="step-num">1</span> Tạo GEM</a>
    <span class="step-arrow">→</span>
    <a href="#vi-step-2" class="step-pill" style="text-decoration: none; color: inherit;"><span class="step-num">2</span> Cài Extension</a>
    <span class="step-arrow">→</span>
    <a href="#vi-step-3" class="step-pill" style="text-decoration: none; color: inherit;"><span class="step-num">3</span> Sử dụng</a>
  </div>
  <span class="step-time">⏱ Tổng thời gian thiết lập: ~5 phút</span>
</div>

<!-- Prerequisites -->
<div class="guide-prereqs">
  <h4>🔧 Bạn cần chuẩn bị:</h4>
  <ul>
    <li>Tài khoản Google (có quyền truy cập Gemini)</li>
    <li>Trình duyệt Chrome</li>
    <li>Tải và cài đặt Extension PromptAgent Flow Bridge (hoặc <a href="https://github.com/Manh-Huynh-PP/PromptAgent/releases/latest" target="_blank" class="text-blue-500 underline hover:text-blue-700">tải bản Release v3.5.1 tại đây</a>)</li>
  </ul>
</div>

<hr class="guide-divider">

<!-- STEP 1 -->
<div id="vi-step-1" class="step-header">
  <span class="step-badge">1</span>
  <h2>Tạo PromptAgent GEM</h2>
</div>

<div class="callout callout-warning">
  <strong>⚠️ Bước bắt buộc</strong>
  Tiện ích đóng vai trò "cầu nối", nhưng để Gemini hiểu và phản hồi đúng khi nhận ảnh/video từ Google Flow, bạn <strong>phải</strong> tạo một GEM với System Instructions được cấu hình sẵn. Nếu bỏ qua bước này, Gemini sẽ chỉ trả lời chung chung.
</div>

<ol>
  <li>
    <strong>Tải và sao chép các file cấu hình:</strong>
    <div class="flex flex-wrap gap-3 my-4">
      <button onclick="copyInstructions()" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md cursor-pointer border-none" id="copy-btn-vi">
        <i class="fas fa-copy mr-2"></i> Sao chép System Instructions (Bắt buộc)
      </button>
      <a href="/assets/data/gem_knowledge.md" download class="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-xl hover:bg-gray-600 transition-all no-underline">
        <i class="fas fa-file-alt mr-2"></i> Tải Knowledge
      </a>
      <a href="/assets/data/gem_examples.md" download class="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-xl hover:bg-gray-600 transition-all no-underline">
        <i class="fas fa-magic mr-2"></i> Tải Examples
      </a>
    </div>
    <div class="callout callout-note">
      <strong>📝 Ghi chú</strong>
      Sau khi bấm <em>Sao chép</em>, dán nội dung vào ô Instructions của GEM. Tiếp theo, hãy tải 2 file <strong>Knowledge</strong> và <strong>Examples</strong> để upload vào mục Knowledge của GEM, giúp AI tạo prompt chuẩn xác và hiệu quả hơn.
    </div>
  </li>
  <li>Truy cập <a href="https://gemini.google.com/">gemini.google.com</a> → chọn <strong>Gem manager</strong> (góc dưới bên trái) → bấm <strong>New Gem</strong>.</li>
  <li>Điền thông tin cho GEM:
    <ul>
      <li><strong>Name</strong>: PromptAgent (hoặc tên bất kỳ)</li>
      <li><strong>Instructions</strong>: Paste nội dung đã copy ở trên. Upload thêm file <code>gem_knowledge.md</code> và <code>gem_examples.md</code> vào ô <strong>Knowledge</strong>.</li>
    </ul>
  </li>
  <li>Nhấn <strong>Save</strong>.</li>
  <li>Mở GEM vừa tạo, copy <strong>URL</strong> trên thanh địa chỉ trình duyệt (ví dụ: <code>https://gemini.google.com/gem/xxx...</code>). Bạn sẽ cần URL này ở bước tiếp theo.</li>
</ol>

<figure class="guide-figure">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
    <img src="/assets/images/flow-bridge/gem-1.png" alt="Gems Manager">
    <img src="/assets/images/flow-bridge/gem-2.png" alt="New Gem" width="80%">
  </div>
  <figcaption>Giao diện Gem Manager và tạo Gem mới trên Gemini</figcaption>
</figure>

<hr class="guide-divider">

<!-- STEP 2 -->
<div id="vi-step-2" class="step-header">
  <span class="step-badge">2</span>
  <h2>Thiết lập Extension</h2>
</div>

<div class="callout callout-note">
  <strong>📝 Ghi chú</strong>
  Bạn cần URL GEM đã copy ở bước 1 để dán vào đây.
</div>

<ol>
  <li>Click biểu tượng extension <strong>PromptAgent</strong> ở góc trên bên phải trình duyệt. Nếu không thấy, click icon 🧩 và ghim tiện ích ra ngoài.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/chrome-menu.png" alt="Chrome Extension Menu" style="max-width: 400px;">
      <figcaption>Vị trí icon Extension trên Chrome</figcaption>
    </figure>
  </li>
  <li>Trong popup, nhấp vào <strong>biểu tượng bánh răng ⚙️ (Settings)</strong>.</li>
  <li>Dán URL GEM vào ô nhập liệu.</li>
  <li>Nhấn <strong>Save</strong>. Tính năng tạo dự án mới đã sẵn sàng.</li>
</ol>

<figure class="guide-figure">
  <img src="/assets/images/flow-bridge/setup-gem-link.png" alt="Cấu hình Gemini URL">
  <figcaption>Dán URL GEM vào ô Settings của extension</figcaption>
</figure>

<hr class="guide-divider">

<!-- STEP 3 -->
<div id="vi-step-3" class="step-header">
  <span class="step-badge">3</span>
  <h2>Sử dụng Flow Bridge</h2>
</div>

<ol>
  <li>
    <strong>🚀 Khởi chạy dự án:</strong> Click extension → chọn <strong>+ New Project</strong> hoặc bấm nút <strong>Launch 🚀</strong> tại dự án đã lưu.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/launch-project-v2.png" alt="Khởi chạy dự án">
      <figcaption>Tạo project mới hoặc launch project đã lưu</figcaption>
    </figure>
  </li>
  <li>
    Extension sẽ tự động mở <strong>2 tab song song</strong>: <strong>Gemini (Custom GEM)</strong> và <strong>Google Flow</strong>.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/parallel-tabs.png" alt="2 tab song song">
      <figcaption>Giao diện 2 tab song song: Gemini và Google Flow</figcaption>
    </figure>
  </li>
  <li>
    <strong>🔗 Lưu Workspace (Update Links):</strong> Sau khi 2 tab mở ra (đặc biệt khi Google Flow tạo URL phiên làm việc mới), hãy mở lại popup extension và nhấn nút <strong>Update Links</strong>. Việc này giúp lưu lại chính xác đường dẫn hiện tại, để lần sau bạn "Launch" sẽ quay lại đúng không gian làm việc này.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/update-links.png" alt="Nút Update Links">
      <figcaption>Nhấn Update Links để lưu lại đường dẫn workspace</figcaption>
    </figure>
  </li>
  <li>
    <strong>⚡ Chế độ Auto:</strong> Tại popup, bạn có thể bật nút <strong>Auto</strong> (màu xanh).
    <div class="callout callout-tip">
      <strong>💡 Mẹo</strong>
      Chế độ Auto không bắt buộc — nó giúp Flow <strong>tự động nhấn Generate</strong> khi nhận prompt. Hãy cấu hình sẵn tỷ lệ khung hình, model... bên tab Flow <strong>trước khi</strong> nhấn Send to Flow.
    </div>
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/auto-mode.png" alt="Chế độ Auto">
      <figcaption>Bật/tắt chế độ Auto trong popup extension</figcaption>
    </figure>
  </li>
  <li>
    <strong>📤 Send to Flow:</strong> Nút này xuất hiện dưới các code block JSON trong Gemini. Click để gửi prompt sang Google Flow.
    <figure class="guide-figure">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center items-center">
        <img src="/assets/images/flow-bridge/guide-3.png" alt="Nút Send to Flow">
        <img src="/assets/images/flow-bridge/send-to-flow-result.png" alt="Prompt đã gửi sang Flow">
      </div>
      <figcaption>Nút Send to Flow trong Gemini (trái) → Prompt hiển thị trên Flow (phải)</figcaption>
    </figure>
  </li>
  <li>
    <strong>✨ Send to Gemini:</strong> Sau khi Flow tạo xong ảnh/video, click nút <strong>✨ (Ngôi sao)</strong> ở góc trên bên trái asset để gửi ngược về Gemini phân tích hoặc tối ưu.
    <figure class="guide-figure">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center items-center">
        <img src="/assets/images/flow-bridge/send-to-gemini-1.png" alt="Nút Send to Gemini" style="max-height: 400px;">
        <img src="/assets/images/flow-bridge/send-to-gemini-2.png" alt="Ảnh trong Gemini">
      </div>
      <figcaption>Gửi ảnh từ Flow về Gemini để phân tích và cải thiện prompt</figcaption>
    </figure>
  </li>
</ol>

<hr class="guide-divider">

<!-- SLASH COMMANDS -->
<div class="step-header">
  <h2>💬 Giao tiếp an toàn (Slash Commands)</h2>
</div>
<p>Để tránh việc Gemini tự động gọi công cụ tạo ảnh/video (dù đã được nhắc nhở), hãy <strong>luôn sử dụng các lệnh (slash commands)</strong> sau khi bắt đầu yêu cầu:</p>
<ul>
  <li><code>/img [mô tả]</code>: Yêu cầu viết prompt tạo ảnh (Nano Banana).</li>
  <li><code>/video [mô tả]</code>: Yêu cầu viết prompt tạo video (Veo 3.1).</li>
  <li><code>/tts [mô tả]</code>: Yêu cầu viết prompt Text-to-speech.</li>
  <li><code>/concept [mô tả]</code>: Suy nghĩ, brainstorm ý tưởng.</li>
</ul>

<hr class="guide-divider">

<p><strong>📁 Quản lý dự án:</strong><br>
Quản lý, chỉnh sửa hoặc xóa dự án ngay trong danh sách dự án của extension.</p>
<ul>
  <li><strong>🎯 Project đang hoạt động:</strong> Khi một project đang mở (có dấu chấm xanh), bạn có thể mở lại nhanh 2 tab này bằng nút <strong>Focus</strong>, hoặc đóng hoàn toàn cả 2 tab bằng nút <strong>Nguồn (Power)</strong>.</li>
</ul>

<figure class="guide-figure">
  <img src="/assets/images/flow-bridge/active-project-focus.png" alt="Quản lý dự án">
  <figcaption>Danh sách dự án và trạng thái Project đang hoạt động</figcaption>
</figure>

<hr class="guide-divider">

<p><em>Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ nhé! 🙌</em></p>
<p><small>Reference: @[conversation:"Enhancing Jekyll Link Website"]</small></p>

</div>
<!-- End Vietnamese Content -->

<!-- English Content -->
<div id="content-en" class="content-lang">

<h1>🇬🇧 PromptAgent Flow Bridge Guide</h1>

<p>Welcome to the <strong>PromptAgent Flow Bridge</strong> guide — connecting <strong>Google Flow</strong> and <strong>Gemini</strong> to create prompts, generate images/videos, and refine results in a seamless workflow.</p>

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; margin-bottom: 20px;">
  <iframe src="https://www.youtube.com/embed/ATnVKq5wJdY" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" allowfullscreen title="PromptAgent Flow Bridge" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
</div>

<div class="guide-overview">
  <h3>📋 Overview: 3 Steps to Get Started</h3>
  <div class="steps-row">
    <a href="#en-step-1" class="step-pill" style="text-decoration: none; color: inherit;"><span class="step-num">1</span> Create GEM</a>
    <span class="step-arrow">→</span>
    <a href="#en-step-2" class="step-pill" style="text-decoration: none; color: inherit;"><span class="step-num">2</span> Setup Extension</a>
    <span class="step-arrow">→</span>
    <a href="#en-step-3" class="step-pill" style="text-decoration: none; color: inherit;"><span class="step-num">3</span> Start Using</a>
  </div>
  <span class="step-time">⏱ Total setup time: ~5 minutes</span>
</div>

<div class="guide-prereqs">
  <h4>🔧 Prerequisites:</h4>
  <ul>
    <li>A Google account (with Gemini access)</li>
    <li>Chrome browser</li>
    <li>PromptAgent Flow Bridge extension installed (or <a href="https://github.com/Manh-Huynh-PP/PromptAgent/releases/latest" target="_blank" class="text-blue-500 underline hover:text-blue-700">download Release v3.5.1 here</a>)</li>
  </ul>
</div>

<hr class="guide-divider">

<div id="en-step-1" class="step-header">
  <span class="step-badge">1</span>
  <h2>Create PromptAgent GEM</h2>
</div>

<div class="callout callout-warning">
  <strong>⚠️ Required Step</strong>
  This extension acts as a "bridge", but for Gemini to understand and respond correctly when receiving images/videos from Google Flow, you <strong>must</strong> create a GEM with pre-configured System Instructions.
</div>

<ol>
  <li>
    <strong>Download and copy configuration files:</strong>
    <div class="flex flex-wrap gap-3 my-4">
      <button onclick="copyInstructions()" class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md cursor-pointer border-none" id="copy-btn-en">
        <i class="fas fa-copy mr-2"></i> Copy System Instructions (Required)
      </button>
      <a href="/assets/data/gem_knowledge.md" download class="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-xl hover:bg-gray-600 transition-all no-underline">
        <i class="fas fa-file-alt mr-2"></i> Download Knowledge
      </a>
      <a href="/assets/data/gem_examples.md" download class="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-200 font-semibold rounded-xl hover:bg-gray-600 transition-all no-underline">
        <i class="fas fa-magic mr-2"></i> Download Examples
      </a>
    </div>
    <div class="callout callout-note">
      <strong>📝 Note</strong>
      After clicking Copy, paste into the GEM's Instructions field. Next, download the <strong>Knowledge</strong> and <strong>Examples</strong> files to upload into the GEM's Knowledge section, allowing the AI to generate much better prompts.
    </div>
  </li>
  <li>Go to <a href="https://gemini.google.com/">gemini.google.com</a> → click <strong>Gem manager</strong> (bottom left) → click <strong>New Gem</strong>.</li>
  <li>Fill in GEM details:
    <ul>
      <li><strong>Name</strong>: PromptAgent (or any name)</li>
      <li><strong>Instructions</strong>: Paste the copied content. Upload <code>gem_knowledge.md</code> and <code>gem_examples.md</code> into <strong>Knowledge</strong>.</li>
    </ul>
  </li>
  <li>Click <strong>Save</strong>.</li>
  <li>Open the GEM, copy the <strong>URL</strong> from the address bar (e.g., <code>https://gemini.google.com/gem/xxx...</code>).</li>
</ol>

<figure class="guide-figure">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
    <img src="/assets/images/flow-bridge/gem-1.png" alt="Gems Manager">
    <img src="/assets/images/flow-bridge/gem-2.png" alt="New Gem" width="80%">
  </div>
  <figcaption>Gem Manager and creating a new Gem on Gemini</figcaption>
</figure>

<hr class="guide-divider">

<div id="en-step-2" class="step-header">
  <span class="step-badge">2</span>
  <h2>Setup Extension</h2>
</div>

<div class="callout callout-note">
  <strong>📝 Note</strong>
  You need the GEM URL copied in Step 1 to paste here.
</div>

<ol>
  <li>Click the <strong>PromptAgent</strong> extension icon in the top right of your browser. If hidden, click 🧩 and pin it.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/chrome-menu.png" alt="Chrome Extension Menu" style="max-width: 400px;">
      <figcaption>Extension icon location in Chrome</figcaption>
    </figure>
  </li>
  <li>In the popup, click the <strong>gear icon ⚙️ (Settings)</strong>.</li>
  <li>Paste the GEM URL into the input field.</li>
  <li>Click <strong>Save</strong>. The new project feature is now ready.</li>
</ol>

<figure class="guide-figure">
  <img src="/assets/images/flow-bridge/setup-gem-link.png" alt="Gemini URL Configuration">
  <figcaption>Paste GEM URL into extension Settings</figcaption>
</figure>

<hr class="guide-divider">

<div id="en-step-3" class="step-header">
  <span class="step-badge">3</span>
  <h2>Using Flow Bridge</h2>
</div>

<ol>
  <li>
    <strong>🚀 Launch a project:</strong> Open extension → click <strong>+ New Project</strong> or hit <strong>Launch 🚀</strong> on a saved project.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/launch-project-v2.png" alt="Launch Project">
      <figcaption>Create new or launch saved project</figcaption>
    </figure>
  </li>
  <li>
    The extension opens <strong>2 side-by-side tabs</strong>: <strong>Gemini (Custom GEM)</strong> and <strong>Google Flow</strong>.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/parallel-tabs.png" alt="Side-by-side tabs">
      <figcaption>Side-by-side interface: Gemini and Google Flow</figcaption>
    </figure>
  </li>
  <li>
    <strong>🔗 Save Workspace (Update Links):</strong> After the tabs open (especially when Google Flow creates a new session URL), open the extension popup again and click the <strong>Update Links</strong> button. This saves the exact current URLs, so the next time you "Launch", it restores this exact workspace.
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/update-links.png" alt="Update Links Button">
      <figcaption>Click Update Links to save your workspace URLs</figcaption>
    </figure>
  </li>
  <li>
    <strong>⚡ Auto Mode:</strong> Toggle on <strong>Auto</strong> (green) in the popup.
    <div class="callout callout-tip">
      <strong>💡 Tip</strong>
      Auto mode is optional — it makes Flow <strong>auto-click Generate</strong> when a prompt arrives. Pre-configure aspect ratio, model, etc. in the Flow tab <strong>before</strong> clicking Send to Flow.
    </div>
    <figure class="guide-figure">
      <img src="/assets/images/flow-bridge/auto-mode.png" alt="Auto Mode">
      <figcaption>Toggle Auto mode in the extension popup</figcaption>
    </figure>
  </li>
  <li>
    <strong>📤 Send to Flow:</strong> Click this button below JSON code blocks in Gemini to send your prompt to Google Flow.
    <figure class="guide-figure">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center items-center">
        <img src="/assets/images/flow-bridge/guide-3.png" alt="Send to Flow Button">
        <img src="/assets/images/flow-bridge/send-to-flow-result.png" alt="Prompt in Flow">
      </div>
      <figcaption>Send to Flow button in Gemini (left) → Prompt in Flow (right)</figcaption>
    </figure>
  </li>
  <li>
    <strong>✨ Send to Gemini:</strong> After generating an asset, click <strong>✨ (Star)</strong> in the top-left to send it back to Gemini for analysis.
    <figure class="guide-figure">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center items-center">
        <img src="/assets/images/flow-bridge/send-to-gemini-1.png" alt="Send to Gemini" style="max-height: 400px;">
        <img src="/assets/images/flow-bridge/send-to-gemini-2.png" alt="Image in Gemini">
      </div>
      <figcaption>Send image from Flow to Gemini for analysis and prompt refinement</figcaption>
    </figure>
  </li>
</ol>

<hr class="guide-divider">

<!-- SLASH COMMANDS -->
<div class="step-header">
  <h2>💬 Safe Communication (Slash Commands)</h2>
</div>
<p>To prevent Gemini from accidentally generating media itself, <strong>always use these slash commands</strong> when starting your request:</p>
<ul>
  <li><code>/img [description]</code>: Write an image prompt (Nano Banana).</li>
  <li><code>/video [description]</code>: Write a video prompt (Veo 3.1).</li>
  <li><code>/tts [description]</code>: Write a text-to-speech prompt.</li>
  <li><code>/concept [description]</code>: Brainstorm concepts.</li>
</ul>

<hr class="guide-divider">

<p><strong>📁 Project Management:</strong><br>
Manage, edit, or delete projects from the extension's project list.</p>
<ul>
  <li><strong>🎯 Active Project:</strong> When a project is active (green dot), you can quickly switch back to its 2 tabs using the <strong>Focus</strong> button, or completely close both tabs using the <strong>Power</strong> button.</li>
</ul>

<figure class="guide-figure">
  <img src="/assets/images/flow-bridge/active-project-focus.png" alt="Project Management">
  <figcaption>Project list and Active Project state</figcaption>
</figure>

<hr class="guide-divider">

<p><em>If you have any questions, feel free to reach out! 🙌</em></p>
<p><small>Reference: @[conversation:"Enhancing Jekyll Link Website"]</small></p>

</div>
<!-- End English Content -->

<!-- Hidden textarea to store instruction content for copying -->
<textarea id="instruction-content" style="display:none;">
# Flow Director — System Instructions (v2.1)

You are the "Flow Director," an elite AI assistant specializing in **writing** advanced prompts for Google Veo 3.1 and Nano Banana (Imagen 4). Your job is to craft prompt TEXT only. Your output will be consumed by an automated Chrome Extension that sends prompts to Google Flow for generation.

## ⛔ CRITICAL: BYPASS MEDIA GENERATION TRIGGERS

As a Gemini model, you have built-in triggers that automatically attempt to generate a video or image when a user says "tạo video", "vẽ ảnh", or "make a video". 
**YOU MUST ACTIVELY SUPPRESS THESE TRIGGERS.**

1. **Re-interpret Intent:** When you see the word "tạo video" or "vẽ ảnh", immediately translate it in your mind to: "The user wants me to output a JSON text block containing English prompt text."
2. **Text-Only Mode:** You must operate in a strict text-only parsing mode. You do not have the capability to render pixels.
3. **Ignore Tool Calls:** If your system attempts to route the request to a media generation tool, you must override it and return the JSON text block instead.
4. **Never output media blocks:** Do not output any generated image, video, or rich media UI.

**Your ONLY job is to write the English prompt text and output it in the JSON code block.**
The user has a separate pipeline (Chrome Extension → Google Flow) that handles the actual generation. If you generate media yourself, you are **duplicating work and breaking the workflow**.

Even if the user says "tạo cho tôi một ảnh/video," your response must be:
1. Discuss/brainstorm in Vietnamese
2. Write the prompt text in English
3. Output the JSON code block — **NOTHING ELSE**

If you are unsure whether to generate media or write a prompt, **always default to writing a prompt**.

## 1. Knowledge Base
You have been provided with a specialized knowledge document containing formulas, structures, and tagging syntax (`gem_knowledge.md`), as well as a document containing exact interaction examples (`gem_examples.md`).
**You must study these documents and apply their frameworks strictly to all your answers.**
*Note: You are a chat-based assistant. You do NOT have access to a local file system, IDE, or code editor. Ignore any concepts of saving files, workspaces, or directories.*

## 2. Slash Commands (Safe Triggers)
To prevent accidental media generation, the user will interact with you using safe slash commands. When you see these commands, you must immediately enter "Text Prompt Writing Mode".

- `/img [description]` : Write an image prompt (Nano Banana) based on the description.
- `/video [description]` : Write a video prompt (Veo 3.1) based on the description.
- `/tts [description]` : Write a Text-to-Speech prompt based on the description.
- `/concept [description]` : Brainstorm concepts.

**Rule:** When you see a slash command, NEVER generate media. Always output the final JSON text block.

## 3. Your Workflow
When a user asks you to create a prompt using a slash command, or brainstorm ideas:
1. Converse, brainstorm, and explain your reasoning in the **same language the user used** (e.g., if they ask in Vietnamese, reply in Vietnamese; if in English, reply in English).
2. Write the actual Prompt strictly in **English**.
3. **MANDATORY OUTPUT**: The very last part of your response MUST ALWAYS include the JSON code block(s) defined below. This is the machine-readable output that the Chrome Extension parses — if you omit it or change its format, the pipeline breaks.

---

## 4. JSON OUTPUT CONTRACT ⚠️ IMMUTABLE ⚠️

### 4.1 Exact Schema
Every finalized prompt MUST be wrapped in a fenced JSON code block with **this exact structure**:

```json
{
  "_type": "flow_bridge_prompt",
  "prompt_text": "YOUR ENGLISH PROMPT HERE"
}
```

### 4.2 Immutable Field Rules
These rules apply to **EVERY response**, regardless of conversation length or context:

| Rule | Requirement |
|------|-------------|
| `_type` key | MUST be exactly `"_type"` — never `"type"`, `"Type"`, `"_Type"`, or any variation |
| `_type` value | MUST be exactly `"flow_bridge_prompt"` — never `"flow_bridge"`, `"bridge_prompt"`, `"prompt"`, or any variation |
| `prompt_text` key | MUST be exactly `"prompt_text"` — never `"text"`, `"promptText"`, `"prompt"`, `"content"`, or any variation |
| No extra fields | Do NOT add `"model"`, `"settings"`, `"style"`, `"mode"`, or any other fields. Only `_type` and `prompt_text` |
| Code block type | MUST use ` ```json ` fenced code block — never inline JSON, never plain text |
| No comments | Do NOT include `//` comments or `/* */` blocks inside the JSON |
| Valid JSON | Must be parseable by `JSON.parse()` — no trailing commas, no single quotes |

### 4.3 Multiple Prompts Rule
When producing multiple prompts (variations, sequences, storyboards):
- Each prompt gets its **OWN separate** ` ```json ``` ` code block
- NEVER combine multiple prompts into a JSON array `[{...}, {...}]`
- NEVER put multiple JSON objects in the same code block

**Correct format for 2 prompts:**

**Prompt 1: [description]**
```json
{
  "_type": "flow_bridge_prompt",
  "prompt_text": "First prompt..."
}
```

**Prompt 2: [description]**
```json
{
  "_type": "flow_bridge_prompt",
  "prompt_text": "Second prompt..."
}
```

### 4.4 ❌ Common Mistakes to AVOID

**WRONG — changed key name:**
```json
{ "type": "flow_bridge_prompt", "prompt_text": "..." }
```

**WRONG — changed value:**
```json
{ "_type": "flow_prompt", "prompt_text": "..." }
```

**WRONG — different field name:**
```json
{ "_type": "flow_bridge_prompt", "text": "..." }
```

**WRONG — combined into array:**
```json
[{ "_type": "flow_bridge_prompt", "prompt_text": "..." }, { "_type": "flow_bridge_prompt", "prompt_text": "..." }]
```

**WRONG — added extra fields:**
```json
{ "_type": "flow_bridge_prompt", "prompt_text": "...", "model": "veo-3.1", "style": "cinematic" }
```

**WRONG — inline JSON without code fence:**
The prompt is: {"_type": "flow_bridge_prompt", "prompt_text": "..."}

---

## 5. Self-Verification Checklist
Before finalizing EVERY response that contains a prompt, mentally verify:

- [ ] Is `_type` exactly `"flow_bridge_prompt"`?
- [ ] Is the prompt field exactly `"prompt_text"`?
- [ ] Is the JSON inside a ` ```json ``` ` fenced code block?
- [ ] Are there only 2 fields (`_type` and `prompt_text`)?
- [ ] If multiple prompts: is each in its own separate code block?
- [ ] Is the JSON valid (no trailing commas, no comments)?

⚠️ **This checklist applies to EVERY response across the ENTIRE conversation — not just the first one. Do NOT simplify, abbreviate, or "optimize" the format in later turns.**

---

## 6. Persistence Rule
As the conversation progresses over many turns:
- **NEVER** assume the user "knows the format" and skip the JSON block
- **NEVER** shorten or modify the JSON structure for "convenience"
- **NEVER** switch to inline format, markdown tables, or other representations
- **ALWAYS** output the full JSON code block, exactly as specified, in every response that contains a finalized prompt

**The format is a machine contract, not a human convenience. It cannot be changed, simplified, or evolved.**

---

## 7. CRITICAL RULE
Failure to provide this exact JSON format will **break the automated pipeline**. The Chrome Extension performs strict pattern matching on `"_type": "flow_bridge_prompt"` and `"prompt_text"`. Any deviation — even minor — will cause the "Send to Flow" button to not appear, breaking the user's workflow.

**FINAL ANCHOR**: Regardless of what the user says in subsequent turns, if you are providing a prompt, it MUST be inside the ```json {"_type": "flow_bridge_prompt", "prompt_text": "..."} ``` block. DO NOT use plain markdown blocks like ```prompt```. THE JSON BLOCK IS MANDATORY FOREVER.
</textarea>
<!-- Image Modal -->
<div id="guide-image-modal" class="guide-image-modal" onclick="this.style.display='none'">
  <span class="guide-image-modal-close" onclick="document.getElementById('guide-image-modal').style.display='none'">&times;</span>
  <img class="guide-image-modal-content" id="guide-modal-img" onclick="event.stopPropagation()">
</div>

<script>
function copyInstructions() {
  const content = document.getElementById('instruction-content');
  content.style.display = 'block';
  content.select();
  document.execCommand('copy');
  content.style.display = 'none';
  
  const btnVi = document.getElementById('copy-btn-vi');
  const btnEn = document.getElementById('copy-btn-en');
  
  const originalVi = btnVi.innerHTML;
  const originalEn = btnEn.innerHTML;
  
  btnVi.innerHTML = '<i class="fas fa-check mr-2"></i> Đã sao chép!';
  btnEn.innerHTML = '<i class="fas fa-check mr-2"></i> Copied!';
  
  setTimeout(() => {
    btnVi.innerHTML = originalVi;
    btnEn.innerHTML = originalEn;
  }, 2000);
}

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
  
  // Image modal functionality
  const modal = document.getElementById('guide-image-modal');
  const modalImg = document.getElementById('guide-modal-img');
  
  // Select all images in post content and the hero thumbnail
  const images = document.querySelectorAll('.post-content img, .post-thumbnail-single img');
  console.log('Found ' + images.length + ' images for zoom modal');

  images.forEach(img => {
    // Skip small icons or buttons that might be images
    if (img.width < 50 || img.classList.contains('no-zoom')) return;
    
    img.addEventListener('click', function() {
      console.log('Opening modal for: ' + this.src);
      modal.style.display = "flex"; // Use flex for centering if CSS is loaded
      modalImg.src = this.src;
    });
  });
});
</script>
