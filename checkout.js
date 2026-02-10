// Checkout and Payment JavaScript

// Current checkout item
let currentCheckoutItem = {
    name: 'STELA++',
    price: 120000,
    type: 'rank'
};

// Current payment method
let currentPaymentMethod = 'momo';

// Open checkout modal
function openCheckout(itemName, itemPrice, itemType) {
    // Set current item
    currentCheckoutItem = {
        name: itemName,
        price: itemPrice,
        type: itemType
    };
    
    // Update modal content
    document.getElementById('checkout-item-name').textContent = itemName;
    document.getElementById('checkout-item-price').textContent = formatPrice(itemPrice);
    document.getElementById('checkout-total').textContent = formatPrice(itemPrice);
    
    // Update payment method details
    updatePaymentDetails();
    
    // Show modal
    document.getElementById('checkoutModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add item to cart
    addToCart(itemName, itemPrice, itemType);
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Format price to VND
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Select payment method
function selectPayment(method) {
    // Update UI
    document.querySelectorAll('.method-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    event.currentTarget.classList.add('selected');
    
    // Update current payment method
    currentPaymentMethod = method;
    
    // Update payment details
    updatePaymentDetails();
}

// Update payment details based on selected method
function updatePaymentDetails() {
    // Hide all payment details
    document.getElementById('momo-details').style.display = 'none';
    document.getElementById('bank-details').style.display = 'none';
    document.getElementById('qr-details').style.display = 'none';
    
    // Show selected payment details
    const selectedElement = document.getElementById(`${currentPaymentMethod}-details`);
    if (selectedElement) {
        selectedElement.style.display = 'block';
    }
    
    // Update amounts in all payment methods
    const formattedPrice = formatPrice(currentCheckoutItem.price);
    const itemCode = currentCheckoutItem.name.toUpperCase().replace(/\s+/g, '_');
    
    // Update MoMo details
    document.getElementById('momo-amount').textContent = formattedPrice;
    document.getElementById('momo-content').textContent = `STELASMP_${itemCode}`;
    
    // Update bank details
    document.getElementById('bank-amount').textContent = formattedPrice;
    document.getElementById('bank-content').textContent = `STELASMP_${itemCode}`;
    
    // Update QR details
    document.getElementById('qr-amount').textContent = formattedPrice;
    document.getElementById('qr-content').textContent = `STELASMP_${itemCode}`;
}

// AI Chat Support Functions
function toggleChat() {
    const chatBody = document.getElementById('chatBody');
    const chatToggleIcon = document.getElementById('chatToggleIcon');
    
    if (chatBody.style.display === 'none' || chatBody.style.display === '') {
        chatBody.style.display = 'flex';
        chatToggleIcon.classList.remove('fa-chevron-down');
        chatToggleIcon.classList.add('fa-chevron-up');
    } else {
        chatBody.style.display = 'none';
        chatToggleIcon.classList.remove('fa-chevron-up');
        chatToggleIcon.classList.add('fa-chevron-down');
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addUserMessage(message);
    
    // Clear input
    input.value = '';
    
    // Get AI response after delay
    setTimeout(() => {
        const response = getAIResponse(message);
        addAiMessage(response);
    }, 1000);
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageElement = document.createElement('div');
    messageElement.className = 'ai-message user-message';
    messageElement.innerHTML = `
        <div class="ai-avatar user">
            <i class="fas fa-user"></i>
        </div>
        <div class="ai-text user">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    
    // Add styles for user message
    const style = document.createElement('style');
    style.textContent = `
        .user-message {
            flex-direction: row-reverse;
        }
        
        .user-message .ai-avatar.user {
            background-color: var(--secondary);
        }
        
        .user-message .ai-text.user {
            background-color: var(--primary);
            border-radius: var(--border-radius) 0 var(--border-radius) var(--border-radius);
        }
    `;
    
    if (!document.querySelector('#user-message-styles')) {
        style.id = 'user-message-styles';
        document.head.appendChild(style);
    }
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAiMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageElement = document.createElement('div');
    messageElement.className = 'ai-message';
    messageElement.innerHTML = `
        <div class="ai-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="ai-text">
            ${message}
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for common questions
    if (lowerMessage.includes('giá') || lowerMessage.includes('bao nhiêu')) {
        return `
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
        `;
    } else if (lowerMessage.includes('thanh toán') || lowerMessage.includes('mua')) {
        return `
            <p>Để mua hàng trên STELA SMP:</p>
            <ol>
                <li>Chọn sản phẩm bạn muốn mua và nhấn "Mua Ngay"</li>
                <li>Chọn phương thức thanh toán (MoMo, chuyển khoản ngân hàng, hoặc QR Code)</li>
                <li>Thực hiện thanh toán theo hướng dẫn</li>
                <li>Sau khi thanh toán, tham gia Discord và gửi ảnh xác nhận cho Admin</li>
                <li>Admin sẽ kích hoạt rank/items cho bạn trong vòng 5-15 phút</li>
            </ol>
            <p>Nếu gặp vấn đề, hãy liên hệ Support qua Discord.</p>
        `;
    } else if (lowerMessage.includes('vào server') || lowerMessage.includes('join') || lowerMessage.includes('ip')) {
        return `
            <p>Để vào STELA SMP server:</p>
            <ol>
                <li>Mở Minecraft Java Edition (phiên bản 1.16-1.20)</li>
                <li>Chọn "Multiplayer" từ menu chính</li>
                <li>Nhấn "Add Server" hoặc "Direct Connect"</li>
                <li>Nhập IP: <strong>Stelasmp.online</strong></li>
                <li>Nhấn "Join Server" và bắt đầu chơi!</li>
            </ol>
            <p>Nếu gặp vấn đề kết nối, hãy đảm bảo bạn đang dùng đúng phiên bản Minecraft và có kết nối internet ổn định.</p>
        `;
    } else if (lowerMessage.includes('discord') || lowerMessage.includes('hỗ trợ')) {
        return `
            <p>Discord của STELA SMP là nơi để:</p>
            <ul>
                <li>Liên hệ Admin để kích hoạt rank sau khi mua</li>
                <li>Nhận hỗ trợ khi gặp vấn đề</li>
                <li>Thảo luận với cộng đồng</li>
                <li>Xem thông báo và sự kiện mới nhất</li>
                <li>Tham gia minigames và các hoạt động cộng đồng</li>
            </ul>
            <p>Tham gia Discord ngay bằng cách nhấn vào nút "Join Discord" trên website!</p>
        `;
    } else if (lowerMessage.includes('chào') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return `
            <p>Xin chào! Tôi là STELA AI Support. Rất vui được gặp bạn!</p>
            <p>Tôi có thể giúp bạn với:</p>
            <ul>
                <li>Thông tin về các rank và giá</li>
                <li>Hướng dẫn thanh toán</li>
                <li>Cách vào server</li>
                <li>Thông tin về Discord server</li>
                <li>Và nhiều câu hỏi khác về STELA SMP</li>
            </ul>
            <p>Hãy hỏi tôi bất cứ điều gì bạn muốn biết!</p>
        `;
    } else {
        return `
            <p>Tôi không chắc chắn về câu hỏi của bạn. Tôi có thể giúp bạn với:</p>
            <ul>
                <li>Thông tin về giá các rank và items</li>
                <li>Hướng dẫn thanh toán và mua hàng</li>
                <li>Cách vào STELA SMP server</li>
                <li>Thông tin về Discord và hỗ trợ</li>
            </ul>
            <p>Hãy thử hỏi cụ thể hơn hoặc sử dụng các nút câu hỏi nhanh bên dưới!</p>
        `;
    }
}

function askQuickQuestion(type) {
    let question = '';
    
    switch(type) {
        case 'rank':
            question = 'Giá các rank trên server là bao nhiêu?';
            break;
        case 'payment':
            question = 'Làm thế nào để thanh toán?';
            break;
        case 'join':
            question = 'Làm sao để vào server?';
            break;
        default:
            question = 'Xin chào!';
    }
    
    // Add user message
    addUserMessage(question);
    
    // Get AI response after delay
    setTimeout(() => {
        const response = getAIResponse(question);
        addAiMessage(response);
    }, 1000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('checkoutModal');
    if (event.target === modal) {
        closeCheckout();
    }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Set default payment method
    selectPayment('momo');
});
