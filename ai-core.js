// AI Core System - Hệ thống AI chung cho tất cả trang
class AICore {
    constructor() {
        this.responses = {
            // Câu trả lời chung
            'default': `
                <p>Xin chào! Tôi là STELA AI Support.</p>
                <p>Tôi có thể giúp bạn với:</p>
                <ul>
                    <li>Thông tin về STELA SMP</li>
                    <li>Hướng dẫn mua hàng và thanh toán</li>
                    <li>Cách vào server</li>
                    <li>Thông tin Discord và hỗ trợ</li>
                </ul>
                <p>Hãy hỏi tôi cụ thể hơn!</p>
            `,
            
            // Câu hỏi thường gặp
            'greeting': `
                <p>Xin chào! Tôi là STELA AI Support. Rất vui được gặp bạn!</p>
                <p>Tôi có thể giúp bạn với:</p>
                <ul>
                    <li>Thông tin về các rank và giá</li>
                    <li>Hướng dẫn thanh toán</li>
                    <li>Cách vào server</li>
                    <li>Thông tin về Discord server</li>
                </ul>
                <p>Hãy hỏi tôi bất cứ điều gì bạn muốn biết!</p>
            `,
            
            'price': `
                <p>Giá các rank trên STELA SMP:</p>
                <ul>
                    <li><strong>STELA</strong>: 50.000₫</li>
                    <li><strong>STELA+</strong>: 70.000₫</li>
                    <li><strong>STELA++</strong>: 120.000₫</li>
                    <li><strong>SUPERSTELA+</strong>: 150.000₫</li>
                    <li><strong>SUPERSTELA++</strong>: 200.000₫</li>
                    <li><strong>KINGSTELA++</strong>: 250.000₫</li>
                    <li><strong>Custom Rank</strong>: 500.000₫</li>
                </ul>
                <p>Ngoài ra còn có các items và keys với giá từ 10.000₫ đến 100.000₫.</p>
            `,
            
            'payment': `
                <p>Để mua hàng trên STELA SMP:</p>
                <ol>
                    <li>Chọn sản phẩm bạn muốn mua và nhấn "Mua Ngay"</li>
                    <li>Chọn phương thức thanh toán (MoMo, chuyển khoản ngân hàng, hoặc QR Code)</li>
                    <li>Thực hiện thanh toán theo hướng dẫn</li>
                    <li>Sau khi thanh toán, tham gia Discord và gửi ảnh xác nhận cho Admin</li>
                    <li>Admin sẽ kích hoạt rank/items cho bạn trong vòng 5-15 phút</li>
                </ol>
                <p>Nếu gặp vấn đề, hãy liên hệ Support qua Discord.</p>
            `,
            
            'join': `
                <p>Để vào STELA SMP server:</p>
                <ol>
                    <li>Mở Minecraft Java Edition (phiên bản 1.16-1.20)</li>
                    <li>Chọn "Multiplayer" từ menu chính</li>
                    <li>Nhấn "Add Server" hoặc "Direct Connect"</li>
                    <li>Nhập IP: <strong>Stelasmp.online</strong></li>
                    <li>Nhấn "Join Server" và bắt đầu chơi!</li>
                </ol>
                <p>Nếu gặp vấn đề kết nối, hãy đảm bảo bạn đang dùng đúng phiên bản Minecraft và có kết nối internet ổn định.</p>
            `,
            
            'discord': `
                <p>Discord của STELA SMP là nơi để:</p>
                <ul>
                    <li>Liên hệ Admin để kích hoạt rank sau khi mua</li>
                    <li>Nhận hỗ trợ khi gặp vấn đề</li>
                    <li>Thảo luận với cộng đồng</li>
                    <li>Xem thông báo và sự kiện mới nhất</li>
                    <li>Tham gia minigames và các hoạt động cộng đồng</li>
                </ul>
                <p>Tham gia Discord ngay bằng cách nhấn vào nút "Join Discord" trên website!</p>
            `
        };
        
        // Extensions từ các trang khác
        this.extensions = {};
    }
    
    // Thêm extension từ trang khác
    addExtension(pageName, responses) {
        this.extensions[pageName] = responses;
    }
    
    // Xử lý câu hỏi
    processQuestion(message, pageName = 'general') {
        const lowerMessage = message.toLowerCase();
        
        // Kiểm tra extension trước
        if (this.extensions[pageName]) {
            for (const [key, response] of Object.entries(this.extensions[pageName])) {
                if (lowerMessage.includes(key)) {
                    return response;
                }
            }
        }
        
        // Kiểm tra responses chung
        if (lowerMessage.includes('chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return this.responses['greeting'];
        } else if (lowerMessage.includes('giá') || lowerMessage.includes('bao nhiêu')) {
            return this.responses['price'];
        } else if (lowerMessage.includes('thanh toán') || lowerMessage.includes('mua')) {
            return this.responses['payment'];
        } else if (lowerMessage.includes('vào server') || lowerMessage.includes('join') || lowerMessage.includes('ip')) {
            return this.responses['join'];
        } else if (lowerMessage.includes('discord')) {
            return this.responses['discord'];
        } else {
            return this.responses['default'];
        }
    }
}

// Khởi tạo AI Core toàn cục
window.stelaAI = new AICore();
