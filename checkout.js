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

// Sử dụng AI Core thay vì hàm riêng
function getAIResponse(message) {
    if (window.stelaAI) {
        return window.stelaAI.processQuestion(message, 'general');
    }
    
    // Fallback nếu AI Core không tồn tại
    return `
        <p>Xin chào! Tôi là STELA AI Support.</p>
        <p>Tôi có thể giúp bạn với:</p>
        <ul>
            <li>Thông tin về các rank và giá</li>
            <li>Cách mua hàng và thanh toán</li>
            <li>Hướng dẫn vào server</li>
            <li>Và nhiều thông tin khác về STELA SMP</li>
        </ul>
    `;
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
