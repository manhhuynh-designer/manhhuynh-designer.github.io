/**
 * Footer Labs Physics Playground - Optimized OOP V2
 * Tương thích hoàn toàn với cấu trúc HTML/CSS cung cấp.
 */

class FooterPhysicsPlayground {
    constructor(options) {
        // Lấy chính xác ID từ HTML
        this.containerId = options.containerId || 'footer-playground';
        this.physicsContainerId = options.physicsContainerId || 'footer-physics-container';
        this.itemSelector = options.itemSelector || '.physics-item';
        
        if (typeof Matter === 'undefined') {
            console.error("PhysicsPlayground: Matter.js không tồn tại. Vui lòng kiểm tra lại đường dẫn thư viện.");
            return;
        }

        this.container = document.getElementById(this.containerId);
        this.physicsContainer = document.getElementById(this.physicsContainerId);
        
        if (!this.container || !this.physicsContainer) {
            console.error(`PhysicsPlayground: Không tìm thấy container ID (${this.containerId}).`);
            return;
        }

        console.log("PhysicsPlayground: Khởi tạo...");

        // Khởi tạo State
        this.items = [];
        this.boundaries = [];
        this.animationFrameId = null;
        this.isRunning = false;

        // Matter.js Aliases
        this.Engine = Matter.Engine;
        this.Runner = Matter.Runner;
        this.Bodies = Matter.Bodies;
        this.Composite = Matter.Composite;
        this.Mouse = Matter.Mouse;
        this.MouseConstraint = Matter.MouseConstraint;
        this.Body = Matter.Body;

        this.init();
    }

    init() {
        // 1. Cài đặt Engine vật lý
        this.engine = this.Engine.create({
            positionIterations: 10, // Tăng độ chính xác để chống chồng chéo
            velocityIterations: 10
        });
        this.world = this.engine.world;
        this.world.gravity.y = 1.2; // Tăng trọng lực để vật thể cảm giác "nặng" hơn
        
        this.runner = this.Runner.create();

        // 2. Cài đặt tương tác chuột & Xử lý lỗi
        this.setupMouseInteraction();
        this.setupEdgeCasesFix();
        
        // 3. Đăng ký sự kiện Render đồng bộ với Engine
        Matter.Events.on(this.engine, 'afterUpdate', () => {
            this.syncDom();
        });

        // Đợi một khoảng thời gian đủ lâu để Layout, Font và CSS tải xong hoàn toàn
        setTimeout(() => {
            this.createBodies();
            this.setupResizeObserver();
            this.setupIntersectionObserver();
        }, 1000); // Tăng lên 1000ms để an toàn tuyệt đối
    }

    setupMouseInteraction() {
        // Sử dụng document.body để lấy tọa độ chuột chính xác trên trang web dài
        this.mouse = this.Mouse.create(this.container);
        
        this.mouseConstraint = this.MouseConstraint.create(this.engine, {
            mouse: this.mouse,
            constraint: {
                stiffness: 0.5,
                damping: 0.1,
                render: { visible: false }
            }
        });
        
        this.Composite.add(this.world, this.mouseConstraint);

        // Đảm bảo Matter.js cập nhật đúng tọa độ khi scroll
        // Chúng ta không remove listener nữa mà sẽ can thiệp vào cách nó xử lý
        this.mouse.element.removeEventListener('mousewheel', this.mouse.mousewheel);
        this.mouse.element.removeEventListener('DOMMouseScroll', this.mouse.mousewheel);
        
        // Fix lỗi kéo thả trên mobile/desktop khi page có scroll
        const scrollOffsetFix = () => {
            this.Mouse.setOffset(this.mouse, {
                x: 0,
                y: 0
            });
        };
        
        window.addEventListener('scroll', scrollOffsetFix, { passive: true });
        
        // Log để debug (có thể xóa sau)
        Matter.Events.on(this.mouseConstraint, 'mousedown', (event) => {
            if (this.mouseConstraint.body) {
                console.log("Grabbed:", this.mouseConstraint.body.id);
            }
        });
    }

    setupEdgeCasesFix() {
        // Fix lỗi "dính chuột" (Sticky mouse) khi rời khỏi màn hình
        const releaseMouse = () => {
            if (this.mouseConstraint?.body) {
                this.mouseConstraint.body = null;
                if (this.mouseConstraint.constraint) {
                    this.mouseConstraint.constraint.bodyB = null;
                }
            }
            if (this.mouse) this.mouse.button = -1;
        };

        ['mouseup', 'touchend', 'mouseleave', 'blur'].forEach(evt => 
            window.addEventListener(evt, releaseMouse, { passive: true })
        );
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) releaseMouse();
        });
    }

    setupResizeObserver() {
        // Cập nhật lại các bức tường khi resize trình duyệt
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                this.updateBoundaries(entry.contentRect.width, entry.contentRect.height);
            }
        });
        resizeObserver.observe(this.physicsContainer);
    }

    setupIntersectionObserver() {
        // Dừng tính toán vật lý khi footer không nằm trong màn hình
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.start();
                } else {
                    this.pause();
                }
            });
        }, { threshold: 0.05 });

        observer.observe(this.container);
    }

    updateBoundaries(width, height) {
        if (this.boundaries.length > 0) {
            this.Composite.remove(this.world, this.boundaries);
        }

        const thickness = 200; // Làm tường dày hơn để tránh vật thể bị lọt ra ngoài khi kéo mạnh
        const options = { isStatic: true, friction: 0.5, restitution: 0.4 };

        this.boundaries = [
            this.Bodies.rectangle(width / 2, height + thickness / 2, width + 100, thickness, options), // Sàn
            this.Bodies.rectangle(width / 2, -thickness / 2, width + 100, thickness, options),         // Trần
            this.Bodies.rectangle(-thickness / 2, height / 2, thickness, height * 2, options),       // Tường trái
            this.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height * 2, options) // Tường phải
        ];

        this.Composite.add(this.world, this.boundaries);
    }

    createBodies() {
        const domItems = this.physicsContainer.querySelectorAll(this.itemSelector);
        const rect = this.physicsContainer.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || 600;

        if (width === 0) {
            setTimeout(() => this.createBodies(), 200);
            return;
        }

        domItems.forEach((el, i) => {
            const shapeType = el.getAttribute('data-shape') || 'rectangle';
            
            // ÉP KIỂU STYLE TRỰC TIẾP VÀ ẨN TẠM THỜI ĐỂ TRÁNH CHỚP
            el.style.position = 'absolute';
            el.style.display = 'flex';
            el.style.visibility = 'visible';
            el.style.opacity = '0'; // Ẩn lúc đầu
            el.style.transition = 'opacity 0.8s ease-in';
            el.style.zIndex = '100';
            
            const isPill = el.classList.contains('labs-pill');
            
            // TẠO SỰ KHÁC BIỆT VỀ KÍCH THƯỚC (Offset scale)
            const scaleFactor = !isPill ? (0.8 + Math.random() * 0.7) : (0.9 + Math.random() * 0.2);
            
            if (!isPill) {
                el.style.width = `${288 * scaleFactor}px`;
                el.style.height = `${288 * scaleFactor}px`;
            } else {
                el.style.padding = '12px 80px';
                el.style.minWidth = '200px';
            }

            const elRect = el.getBoundingClientRect();
            const w = elRect.width || (isPill ? 120 : 288);
            const h = elRect.height || (isPill ? 45 : 288);

            // SPAWN NGẪU NHIÊN TRONG VÙNG NHÌN THẤY ĐỂ TRÁNH CHỒNG LẤN TẠI 0,0
            const x = Math.random() * (width - w) + w / 2;
            const y = Math.random() * (height - h) + h / 2;

            const commonOptions = {
                restitution: 0.3,
                friction: 0.5,
                frictionAir: 0.02,
                density: 0.001
            };

            const tightness = isPill ? 1.0 : 1.0; 
            const shapeTightness = (shapeType === 'rectangle' && !isPill) ? 0.8 : 1.0; // Thu nhỏ thêm xuống 80% so với DOM
            const bodyW = w * tightness * shapeTightness;
            const bodyH = h * tightness * shapeTightness;

            let body;
            let angleOffset = 0; 
            let posOffset = { x: 0, y: 0 }; 

            if (shapeType === 'circle') {
                body = this.Bodies.circle(x, y, Math.max(bodyW, bodyH) / 2, commonOptions);
            } else if (shapeType === 'polygon') {
                const sides = parseInt(el.getAttribute('data-sides')) || 3;
                const radius = Math.max(bodyW, bodyH) / 2;
                body = this.Bodies.polygon(x, y, sides, radius, commonOptions);
                
                if (sides === 5) angleOffset = -Math.PI / 2;
                if (sides === 6) angleOffset = 0; 
            } else {
                // Rectangle / Capsule
                const isPill = el.classList.contains('labs-pill');
                body = this.Bodies.rectangle(x, y, bodyW, bodyH, {
                    ...commonOptions,
                    chamfer: { radius: isPill ? h / 2 : 60 } // Trả về 60 để khớp với rx="60"
                });
            }

            this.Body.setAngle(body, (Math.random() * Math.PI));
            this.items.push({ body, el, w, h, angleOffset, posOffset });
            this.Composite.add(this.world, body);

            // Hiện dần lên sau một khoảng delay nhỏ
            setTimeout(() => {
                el.style.opacity = '1';
            }, 100 + (i * 50));
        });

        this.start();
    }

    syncDom() {
        this.items.forEach(({ body, el, w, h, angleOffset, posOffset }) => {
            const { x, y } = body.position;
            const finalAngle = body.angle + (angleOffset || 0);
            const ox = posOffset ? posOffset.x : 0;
            const oy = posOffset ? posOffset.y : 0;
            // Áp dụng transform với giá trị pixel chuẩn và bù đắp vị trí
            el.style.transform = `translate3d(${Math.round(x - w / 2 + ox)}px, ${Math.round(y - h / 2 + oy)}px, 0) rotate(${finalAngle}rad)`;
            
            const isDragging = this.mouseConstraint.body === body;
            if (isDragging !== el.classList.contains('is-dragging')) {
                el.classList.toggle('is-dragging', isDragging);
            }
        });
    }

    renderLoop = () => {
        // Runner của Matter.js đã xử lý loop vật lý, 
        // syncDom được gọi từ sự kiện 'afterUpdate' của engine.
        // requestAnimationFrame này chỉ giữ cho vòng lặp start/pause hoạt động nếu cần.
        if (this.isRunning) {
            this.animationFrameId = requestAnimationFrame(this.renderLoop);
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.Runner.start(this.runner, this.engine);
        this.renderLoop();
    }

    pause() {
        if (!this.isRunning) return;
        this.isRunning = false;
        this.Runner.stop(this.runner);
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}

// Khởi chạy an toàn
function initFooterPhysics() {
    console.log("PhysicsPlayground: Đang thử khởi tạo...");
    new FooterPhysicsPlayground({
        containerId: 'footer-playground',
        physicsContainerId: 'footer-physics-container',
        itemSelector: '.physics-item'
    });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initFooterPhysics();
} else {
    window.addEventListener('load', initFooterPhysics);
}