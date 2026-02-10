// Stats page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize chat support with stats-specific responses
    initStatsChat();
    
    // Initialize activity chart
    initActivityChart();
    
    // Update online count randomly (mock)
    updateOnlineCount();
});

// Initialize activity chart
function initActivityChart() {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;
    
    const canvasCtx = ctx.getContext('2d');
    
    // Mock data for the last 7 days
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const onlineData = [65, 72, 68, 80, 75, 85, 84];
    const transactionData = [12, 15, 10, 18, 16, 20, 18];
    
    // Create chart
    new Chart(canvasCtx, {
        type: 'line',
        data: {
            labels: days,
            datasets: [
                {
                    label: 'Người chơi online',
                    data: onlineData,
                    borderColor: '#7b2cbf',
                    backgroundColor: 'rgba(123, 44, 191, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Giao dịch thành công',
                    data: transactionData,
                    borderColor: '#06d6a0',
                    backgroundColor: 'rgba(6, 214, 160, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#adb5bd'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#adb5bd'
                    }
                }
            }
        }
    });
}

// Update online count randomly
function updateOnlineCount() {
    const onlineElement = document.getElementById('online-now');
    if (!onlineElement) return;
    
    // Simulate changing online count
    setInterval(() => {
        const current = parseInt(onlineElement.textContent) || 84;
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newCount = Math.max(70, Math.min(95, current + change));
        onlineElement.textContent = newCount;
    }, 10000); // Update every 10 seconds
}

// Initialize stats-specific chat
function initStatsChat() {
    // Thêm extension cho trang Stats
    const statsResponses = {
        'top': `
            <p>Top người chơi trên STELA SMP:</p>
            <ol>
                <li><strong>Notch_Pro</strong> - 420 giờ chơi, 5.2M coins</li>
                <li><strong>DiamondGamer</strong> - 380 giờ chơi, 4.8M coins</li>
                <li><strong>RedstoneMaster</strong> - 350 giờ chơi, 4.5M coins</li>
                <li><strong>BuilderPro</strong> - 320 giờ chơi, 4.2M coins</li>
                <li><strong>NetherExplorer</strong> - 310 giờ chơi, 4.0M coins</li>
            </ol>
            <p>Xem đầy đủ top 10 trên trang Stats!</p>
        `,
        
        'online': `
            <p>Hiện tại có <strong>84 người</strong> đang online trên STELA SMP.</p>
            <p>Tổng số người chơi đã đăng ký: <strong>1,247 người</strong>.</p>
            <p>Server thường có từ 70-95 người online vào giờ cao điểm và 30-50 người vào giờ thấp điểm.</p>
        `,
        
        'phổ biến': `
            <p>Top sản phẩm được mua nhiều nhất:</p>
            <ol>
                <li><strong>STELA++</strong> - 128 lượt mua</li>
                <li><strong>STELA+</strong> - 95 lượt mua</li>
                <li><strong>Quyền FLY</strong> - 87 lượt mua</li>
                <li><strong>Key Amethyst</strong> - 76 lượt mua</li>
                <li><strong>SUPERSTELA+</strong> - 64 lượt mua</li>
            </ol>
            <p>Rank STELA++ là phổ biến nhất vì nó cung cấp sự cân bằng tốt giữa giá cả và tính năng.</p>
        `,
        
        'doanh thu': `
            <p>Doanh thu của STELA SMP:</p>
            <ul>
                <li><strong>30 ngày qua:</strong> 24.5 triệu VNĐ</li>
                <li><strong>Tháng trước:</strong> 21.3 triệu VNĐ (tăng 15%)</li>
                <li><strong>Tổng doanh thu:</strong> 189.7 triệu VNĐ</li>
            </ul>
            <p>Server có xu hướng tăng trưởng ổn định với mức tăng trung bình 10-15% mỗi tháng.</p>
        `,
        
        'thống kê': `
            <p>Thống kê STELA SMP:</p>
            <ul>
                <li><strong>Tổng người chơi:</strong> 1,247</li>
                <li><strong>Đang online:</strong> 84</li>
                <li><strong>Tổng giao dịch:</strong> 892</li>
                <li><strong>Doanh thu (30 ngày):</strong> 24.5 triệu VNĐ</li>
                <li><strong>Top 1:</strong> Notch_Pro với 420 giờ chơi</li>
            </ul>
            <p>Xem chi tiết trên trang Stats!</p>
        `
    };
    
    // Đăng ký extension với AI Core
    if (window.stelaAI) {
        window.stelaAI.addExtension('stats', statsResponses);
    }
}

// Sử dụng AI Core cho trang stats
function getAIResponse(message) {
    if (window.stelaAI) {
        return window.stelaAI.processQuestion(message, 'stats');
    }
    
    // Fallback
    return `<p>Tôi có thể giúp bạn với thông tin về thống kê server, top người chơi, sản phẩm phổ biến và doanh thu. Hãy hỏi tôi cụ thể hơn!</p>`;
}

// Copy IP function
function copyIP() {
    const ip = document.getElementById('server-ip').textContent;
    navigator.clipboard.writeText(ip).then(() => {
        showNotification('Đã sao chép IP vào clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Không thể sao chép IP', 'error');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            background-color: var(--dark-gray);
            border: 1px solid var(--medium-gray);
            box-shadow: var(--box-shadow);
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        }
        
        .notification.success {
            border-left: 4px solid var(--success);
        }
        
        .notification.error {
            border-left: 4px solid var(--danger);
        }
        
        .notification.info {
            border-left: 4px solid var(--secondary);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 15px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// AI Chat functions (sử dụng chung với checkout.js)
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

function askQuickQuestion(type) {
    let question = '';
    
    switch(type) {
        case 'top':
            question = 'Ai là top 1?';
            break;
        case 'online':
            question = 'Bao nhiêu người online?';
            break;
        case 'popular':
            question = 'Rank nào phổ biến nhất?';
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
