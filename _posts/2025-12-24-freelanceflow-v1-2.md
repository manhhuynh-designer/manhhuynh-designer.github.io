---
layout: post
title: "Cập nhật Freelance Flow: Chuyển đổi sang Supabase và Công khai mã nguồn"
date: 2025-12-24
author: Mạnh Huỳnh
categories: [Share, Tool, Update]
tags: [freelance-flow, work managment, tools, project management, supabase, open-source]
thumbnail: /blog/assets/fflowv1.2/LDP.png
excerpt: >
  Freelance Flow v1.2: Chuyển đổi sang Supabase (Cloud) và Công khai mã nguồn (Public Source).
---

<div class="alert alert-secondary">
<p class="mb-1"><strong>Tên ứng dụng:</strong> Freelance Flow</p>
<p class="mb-1"><strong>Phiên bản:</strong> v1.2 - Cloud Edition</p>
<p class="mb-0"><strong>Trải nghiệm:</strong> <a href="https://fflow.manhhuynh.work" target="_blank">fflow.manhhuynh.work</a></p>
</div>

Sau hơn 6 tháng mò mẫm tìm hiểu và quất roi mấy con AI 🤡, mình vừa hoàn thành bản cập nhật mới (v1.2) cho **Freelance Flow** – công cụ quản lý dự án cá nhân. Phiên bản này đánh dấu sự thay đổi lớn về kiến trúc: chuyển từ lưu trữ LocalStorage (Offline) sang sử dụng Supabase (Cloud), đồng thời mình cũng quyết định công khai toàn bộ mã nguồn (Public Source Code) để cộng đồng có thể tham khảo hoặc tự sử dụng.

---

## I. Thay đổi kiến trúc: LocalStorage → Supabase

<div class="row">
  <div class="col-md-6 my-3">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">🔄 Từ Offline sang Cloud</h5>
        <p class="card-text">
          <strong>Phiên bản cũ (v1.0):</strong> Dữ liệu lưu trữ hoàn toàn trên LocalStorage (trình duyệt). Nhanh, đơn giản nhưng gặp vấn đề:
        </p>
        <ul class="text-muted small">
          <li>Khó đồng bộ giữa các thiết bị</li>
          <li>Rủi ro mất dữ liệu khi xóa cache</li>
          <li>Không thể chia sẻ cho khách hàng</li>
        </ul>
        <p class="card-text">
          <strong>Phiên bản mới (v1.2):</strong> Backend sử dụng <strong>Supabase (PostgreSQL)</strong>, mở ra khả năng:
        </p>
        <ul class="text-success small">
          <li>✅ Đồng bộ xuyên suốt mọi thiết bị</li>
          <li>✅ Chia sẻ Timeline, Báo giá qua link</li>
          <li>✅ Backup tự động, an toàn hơn</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="col-md-6 my-3">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">🔗 Tính năng chia sẻ mới</h5>
        <p class="card-text">Giờ đây bạn có thể chia sẻ Timeline dự án và Báo giá trực tiếp cho khách hàng qua đường dẫn web, không cần export file.</p>
        <figure class="figure my-2">
          <img src="/blog/assets/fflowv1.2/sharepage.png" class="figure-img img-fluid rounded shadow-sm" alt="Trang chia sẻ dự án">
          <figcaption class="figure-caption text-center">Trang chia sẻ dự án cho khách hàng</figcaption>
        </figure>
        <figure class="figure my-2">
          <img src="/blog/assets/fflowv1.2/sharedialog.png" class="figure-img img-fluid rounded shadow-sm" alt="Cấu hình chia sẻ">
          <figcaption class="figure-caption text-center">Hộp thoại cấu hình chia sẻ</figcaption>
        </figure>
      </div>
    </div>
  </div>
</div>

---

## II. Demo Online & Khuyến nghị Self-host

<div class="text-center my-4">
  <a href="https://fflow.manhhuynh.work" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
    <i class="fas fa-rocket"></i> Trải nghiệm Demo
  </a>
</div>

<div class="alert alert-danger shadow-sm border-danger">
  <p class="mb-2"><strong>⚠️ QUAN TRỌNG:</strong> Đây là dự án thực hiện hoàn toàn phần code bằng AI (vibe code) nên các vấn đề về bảo mật có thể chưa được đảm bảo tốt.</p>
  <p class="mb-0"><strong>Lưu ý:</strong> Bản Demo này chạy trên tài nguyên giới hạn (Free Tier, dùng chung API Key), nên mục đích chính là để test tính năng. Mình <strong>KHÔNG</strong> khuyến khích dùng nó cho dữ liệu công việc quan trọng hoặc nhạy cảm.</p>
</div>

### 🏠 Khuyến nghị: Tự triển khai (Self-host)

Mình khuyến khích các bạn tải mã nguồn về và tự deploy. Chỉ mất khoảng **15-30 phút** setup, bạn sẽ có hệ thống private hoàn toàn:

<div class="row">
  <div class="col-md-4 my-2">
    <div class="card text-center h-100">
      <div class="card-body">
        <h5 class="card-title">🌐 Tên miền riêng</h5>
        <p class="card-text small">Chuyên nghiệp với subdomain của bạn (vd: <code>work.ten-cua-ban.com</code>)</p>
      </div>
    </div>
  </div>
  <div class="col-md-4 my-2">
    <div class="card text-center h-100">
      <div class="card-body">
        <h5 class="card-title">🔒 Dữ liệu riêng tư</h5>
        <p class="card-text small">Data nằm trên tài khoản Supabase chính chủ của bạn</p>
      </div>
    </div>
  </div>
  <div class="col-md-4 my-2">
    <div class="card text-center h-100">
      <div class="card-body">
        <h5 class="card-title">⚙️ Chủ động tài nguyên</h5>
        <p class="card-text small">Tự quản lý API Key (Gemini, Database) không lo bị ảnh hưởng</p>
      </div>
    </div>
  </div>
</div>

<figure class="figure my-4">
  <img src="/blog/assets/fflowv1.2/dashboard.png" class="figure-img img-fluid rounded shadow-sm w-3/4 mx-auto d-block" alt="Dashboard v1.2">
  <figcaption class="figure-caption text-center">Giao diện Dashboard v1.2</figcaption>
</figure>

---

## III. Tài liệu & Mã nguồn

Mã nguồn hiện đã được public trên GitHub (giấy phép phi thương mại). Mình cũng đã soạn tài liệu hướng dẫn chi tiết từng bước, từ việc lấy API Key đến deploy lên Vercel để ngay cả các bạn không chuyên kỹ thuật (non-tech) cũng có thể làm được.

> **💡 Mẹo cho người không chuyên kỹ thuật:** Bạn có thể sử dụng các AI Agent như **Antigravity**, **Cursor**, **Windsurf**, hoặc **VS Code** (thường cung cấp gói miễn phí cho tính năng agentic coding). Các agent này có thể tự động chạy lệnh terminal, cài đặt dependencies và cấu hình biến môi trường giúp bạn, làm cho quá trình cài đặt nhanh và chính xác hơn nhiều.

<div class="row my-3">
  <div class="col-md-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">� Tài liệu hướng dẫn</h5>
        <p class="card-text">Hướng dẫn chi tiết từng bước cài đặt và triển khai</p>
        <a href="https://fflow.manhhuynh.work/docs" target="_blank" class="btn btn-outline-primary btn-sm">
          Xem tài liệu <i class="fas fa-external-link-alt ml-1"></i>
        </a>
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">� GitHub Repository</h5>
        <p class="card-text">Mã nguồn mở, giấy phép phi thương mại</p>
        <a href="https://github.com/Manh-Huynh-PP/Freelance-Flow" target="_blank" class="btn btn-outline-dark btn-sm">
          Xem mã nguồn <i class="fab fa-github ml-1"></i>
        </a>
      </div>
    </div>
  </div>
</div>

<figure class="figure my-4">
  <img src="/blog/assets/fflowv1.2/docs.png" class="figure-img img-fluid rounded shadow-sm w-3/4 mx-auto d-block" alt="Tài liệu cài đặt">
  <figcaption class="figure-caption text-center">Giao diện tài liệu hướng dẫn cài đặt</figcaption>
</figure>

---

Hy vọng công cụ nhỏ này sẽ giúp ích cho quy trình quản lý công việc của anh em Freelancer. Rất mong nhận được feedback và báo lỗi từ cộng đồng!

— Mạnh Huỳnh
