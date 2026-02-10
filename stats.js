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
    const ctx = document.getElementById('activityChart').getContext('2d');
    
    // Mock data for the last 7 days
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    const onlineData = [65, 72, 68, 80, 75, 85, 84];
    const transactionData = [12, 15, 10, 18, 16, 20, 18];
    
    // Create chart
    new Chart(ctx, {
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
        const current = parseInt(onlineElement.textContent);
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const newCount = Math.max(70, Math.min(95, current + change));
        onlineElement.textContent = newCount;
    }, 10000); // Update every 10 seconds
}

// Initialize stats-specific chat
function initStatsChat() {
    // Override the getAIResponse function for stats page
    window.getAIResponse = function(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for stats-related questions
        if (lowerMessage.includes('top') || lowerMessage.includes('ai là số 1') || lowerMessage.includes('xếp hạng')) {
            return `
                <p>Top người chơi trên STELA SMP:</p>
                <ol>
                    <li><strong>Notch_Pro</strong> - 420 giờ chơi, 5.2M coins</li>
                    <li><strong>DiamondGamer</strong> - 380 giờ chơi, 4.8M coins</li>
                    <li><strong>RedstoneMaster</strong> - 350 giờ chơi, 4.5M coins</li>
                    <li><strong>BuilderPro</strong> - 320 giờ chơi, 4.2M coins</li>
                    <li><strong>NetherExplorer</strong> - 310 giờ chơi, 4.0M coins</li>
                </ol>
                <p>Xem đầy đủ top 10 trên trang Stats!</p>
            `;
        } else if (lowerMessage.includes('online') || lowerMessage.includes('bao nhiêu người')) {
            const onlineCount = document.getElementById('online-now').textContent;
            return `
                <p>Hiện tại có <strong>${onlineCount} người</strong> đang online trên STELA SMP.</p>
                <p>Tổng số người chơi đã đăng ký: <strong>1,247 người</strong>.</p>
                <p>Server thường có từ 70-95 người online vào giờ cao điểm và 30-50 người vào giờ thấp điểm.</p>
            `;
        } else if (lowerMessage.includes('phổ biến') || lowerMessage.includes('bán chạy') || lowerMessage.includes('nhiều người mua')) {
            return `
                <p>Top sản phẩm được mua nhiều nhất:</p>
                <ol>
                    <li><strong>STELA++</strong> - 128 lượt mua</li>
                    <li><strong>STELA+</strong> - 95 lượt mua</li>
                    <li><strong>Quyền FLY</strong> - 87 lượt mua</li>
                    <li><strong>Key Amethyst</strong> - 76 lượt mua</li>
                    <li><strong>SUPERSTELA+</strong> - 64 lượt mua</li>
                </ol>
                <p>Rank STELA++ là phổ biến nhất vì nó cung cấp sự cân bằng tốt giữa giá cả và tính năng.</p>
            `;
        } else if (lowerMessage.includes('doanh thu') || lowerMessage.includes('thu nhập')) {
            return `
                <p>Doanh thu của STELA SMP:</p>
                <ul>
                    <li><strong>30 ngày qua:</strong> 24.5 triệu VNĐ</li>
                    <li><strong>Tháng trước:</strong> 21.3 triệu VNĐ (tăng 15%)</li>
                    <li><strong>Tổng doanh thu:</strong> 189.7 triệu VNĐ</li>
                </ul>
                <p>Server có xu hướng tăng trưởng ổn định với mức tăng trung bình 10-15% mỗi tháng.</p>
            `;
        } else {
            // Fall back to general responses from main script
            return window.getAIResponseFallback ? window.getAIResponseFallback(message) : 
                `<p>Tôi có thể giúp bạn với thông tin về thống kê server, top người chơi, sản phẩm phổ biến và doanh thu. Hãy hỏi tôi cụ thể hơn!</p>`;
        }
    };
}

// Copy IP function (same as main script)
function copyIP() {
    const ip = document.getElementById('server-ip').textContent;
    navigator.clipboard.writeText(ip).then(() => {
        showNotification('Đã sao chép IP vào clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        showNotification('Không thể sao chép IP', 'error');
    });
}

// Show notification (same as main script)
function showNotification(message, type = 'info') {
    // Similar implementation as in script.js
    console.log(`Notification: ${message} (${type})`);
    alert(message); // Simplified for this example
}
// Initialize stats-specific chat
function initStatsChat() {
    // Override the getAIResponse function for stats page
    window.getAIResponse = function(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for stats-related questions
        if (lowerMessage.includes('top') || lowerMessage.includes('ai là số 1') || lowerMessage.includes('xếp hạng')) {
            return `
                <p>Top người chơi trên STELA SMP:</p>
                <ol>
                    <li><strong>Notch_Pro</strong> - 420 giờ chơi, 5.2M coins</li>
                    <li><strong>DiamondGamer</strong> - 380 giờ chơi, 4.8M coins</li>
                    <li><strong>RedstoneMaster</strong> - 350 giờ chơi, 4.5M coins</li>
                    <li><strong>BuilderPro</strong> - 320 giờ chơi, 4.2M coins</li>
                    <li><strong>NetherExplorer</strong> - 310 giờ chơi, 4.0M coins</li>
                </ol>
                <p>Xem đầy đủ top 10 trên trang Stats!</p>
            `;
        } else if (lowerMessage.includes('online') || lowerMessage.includes('bao nhiêu người')) {
            const onlineCount = document.getElementById('online-now').textContent;
            return `
                <p>Hiện tại có <strong>${onlineCount} người</strong> đang online trên STELA SMP.</p>
                <p>Tổng số người chơi đã đăng ký: <strong>1,247 người</strong>.</p>
                <p>Server thường có từ 70-95 người online vào giờ cao điểm và 30-50 người vào giờ thấp điểm.</p>
            `;
        } else if (lowerMessage.includes('phổ biến') || lowerMessage.includes('bán chạy') || lowerMessage.includes('nhiều người mua')) {
            return `
                <p>Top sản phẩm được mua nhiều nhất:</p>
                <ol>
                    <li><strong>STELA++</strong> - 128 lượt mua</li>
                    <li><strong>STELA+</strong> - 95 lượt mua</li>
                    <li><strong>Quyền FLY</strong> - 87 lượt mua</li>
                    <li><strong>Key Amethyst</strong> - 76 lượt mua</li>
                    <li><strong>SUPERSTELA+</strong> - 64 lượt mua</li>
                </ol>
                <p>Rank STELA++ là phổ biến nhất vì nó cung cấp sự cân bằng tốt giữa giá cả và tính năng.</p>
            `;
        } else if (lowerMessage.includes('doanh thu') || lowerMessage.includes('thu nhập')) {
            return `
                <p>Doanh thu của STELA SMP:</p>
                <ul>
                    <li><strong>30 ngày qua:</strong> 24.5 triệu VNĐ</li>
                    <li><strong>Tháng trước:</strong> 21.3 triệu VNĐ (tăng 15%)</li>
                    <li><strong>Tổng doanh thu:</strong> 189.7 triệu VNĐ</li>
                </ul>
                <p>Server có xu hướng tăng trưởng ổn định với mức tăng trung bình 10-15% mỗi tháng.</p>
            `;
        } else if (lowerMessage.includes('thống kê') || lowerMessage.includes('stats')) {
            return `
                <p>Thống kê STELA SMP:</p>
                <ul>
                    <li><strong>Tổng người chơi:</strong> 1,247</li>
                    <li><strong>Đang online:</strong> 84</li>
                    <li><strong>Tổng giao dịch:</strong> 892</li>
                    <li><strong>Doanh thu (30 ngày):</strong> 24.5 triệu VNĐ</li>
                    <li><strong>Top 1:</strong> Notch_Pro với 420 giờ chơi</li>
                </ul>
                <p>Xem chi tiết trên trang Stats!</p>
            `;
        } else {
            // Fall back to general responses
            return `<p>Tôi có thể giúp bạn với thông tin về thống kê server, top người chơi, sản phẩm phổ biến và doanh thu. Hãy hỏi tôi cụ thể hơn!</p>`;
        }
    };
}
