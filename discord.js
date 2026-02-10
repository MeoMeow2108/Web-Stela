// Discord page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize Discord page functionality
    initDiscordPage();
    
    // Initialize chat support with Discord responses
    initDiscordChat();
});

// Initialize Discord page
function initDiscordPage() {
    // Update Discord stats with random variations (mock)
    updateDiscordStats();
}

// Update Discord stats
function updateDiscordStats() {
    // Mock function to update stats with slight variations
    setInterval(() => {
        const membersElement = document.getElementById('discord-members');
        const onlineElement = document.getElementById('discord-online');
        
        if (membersElement) {
            const currentMembers = parseInt(membersElement.textContent) || 1250;
            const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
            const newMembers = Math.max(1240, currentMembers + change);
            membersElement.textContent = `${newMembers}+`;
        }
        
        if (onlineElement) {
            const currentOnline = parseInt(onlineElement.textContent) || 850;
            const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
            const newOnline = Math.max(800, currentOnline + change);
            onlineElement.textContent = `${newOnline}+`;
        }
    }, 15000); // Update every 15 seconds
}

// Join Discord function
function joinDiscord() {
    // In a real implementation, this would open the Discord invite link
    // For now, we'll show a mock invite
    
    const inviteUrl = "discord.gg/rnfS9DMC";
    
    // Show modal with Discord invite
    showDiscordInviteModal(inviteUrl);
    
    // In a real implementation, you would redirect to the Discord invite
    // window.open(inviteUrl, '_blank');
}

// Show Discord invite modal
function showDiscordInviteModal(inviteUrl) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'discordInviteModal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2>Tham Gia Discord STELA SMP</h2>
                <button class="modal-close" onclick="closeDiscordInvite()">&times;</button>
            </div>
            <div class="modal-body" style="text-align: center;">
                <div style="font-size: 5rem; color: #5865f2; margin: 20px 0;">
                    <i class="fab fa-discord"></i>
                </div>
                <h3>Mời bạn tham gia Discord server!</h3>
                <p>Nhấn nút bên dưới để tham gia Discord STELA SMP. Sau khi tham gia, hãy giới thiệu bản thân tại kênh #introductions!</p>
                
                <div class="discord-invite-box" style="background-color: var(--dark); padding: 20px; border-radius: var(--border-radius); margin: 25px 0; border: 1px solid var(--medium-gray);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #7b2cbf, #5865f2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                            <i class="fas fa-crown"></i>
                        </div>
                        <div style="text-align: left;">
                            <h4 style="margin: 0;">STELA SMP Official</h4>
                            <p style="margin: 5px 0 0; color: var(--text-secondary);">1,250+ thành viên</p>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Lời mời từ</div>
                            <div style="font-weight: 600;">StelaAdmin</div>
                        </div>
                        <div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">Hết hạn</div>
                            <div style="font-weight: 600;">Không bao giờ</div>
                        </div>
                    </div>
                </div>
                
                <button class="btn-join-discord" onclick="redirectToDiscord('${inviteUrl}')" style="width: 100%;">
                    <i class="fab fa-discord"></i> Chấp nhận lời mời
                </button>
                
                <p style="margin-top: 20px; color: var(--text-secondary); font-size: 0.9rem;">
                    Nếu không tự động chuyển hướng, hãy sao chép link: 
                    <code style="background-color: var(--dark-gray); padding: 5px 10px; border-radius: 5px; display: block; margin-top: 10px;">${inviteUrl}</code>
                </p>
            </div>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add styles for modal
    const style = document.createElement('style');
    style.textContent = `
        .discord-invite-box {
            transition: var(--transition);
        }
        
        .discord-invite-box:hover {
            border-color: #5865f2 !important;
        }
    `;
    
    if (!document.querySelector('#discord-modal-styles')) {
        style.id = 'discord-modal-styles';
        document.head.appendChild(style);
    }
}

// Close Discord invite modal
function closeDiscordInvite() {
    const modal = document.getElementById('discordInviteModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Redirect to Discord (mock)
function redirectToDiscord(url) {
    showNotification('Đang chuyển hướng đến Discord... (Mock - trong thực tế sẽ mở link Discord)', 'info');
    
    // In a real implementation:
    // window.open(url, '_blank');
    // closeDiscordInvite();
    
    // For demo, just close the modal
    setTimeout(() => {
        closeDiscordInvite();
        showNotification('Đã tham gia Discord STELA SMP thành công!', 'success');
    }, 1500);
}

// Initialize Discord chat
function initDiscordChat() {
    // Override the getAIResponse function for Discord page
    window.getAIResponse = function(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for Discord related questions
        if (lowerMessage.includes('tham gia') || lowerMessage.includes('join') || lowerMessage.includes('vào discord')) {
            return `
                <p>Để tham gia Discord STELA SMP:</p>
                <ol>
                    <li>Nhấn nút "Tham Gia Discord Ngay" trên trang này</li>
                    <li>Chấp nhận lời mời Discord</li>
                    <li>Đọc và đồng ý với quy tắc server</li>
                    <li>Giới thiệu bản thân tại kênh #introductions</li>
                    <li>Bắt đầu trò chuyện và tham gia cộng đồng!</li>
                </ol>
                <p>Nếu gặp vấn đề khi tham gia, hãy liên hệ với Admin qua email hoặc Facebook page của STELA SMP.</p>
            `;
        } else if (lowerMessage.includes('support') || lowerMessage.includes('hỗ trợ') || lowerMessage.includes('admin')) {
            return `
                <p>Liên hệ hỗ trợ trên Discord:</p>
                <ul>
                    <li><strong>Kênh #support-shop:</strong> Cho các vấn đề mua hàng, kích hoạt rank</li>
                    <li><strong>Admin trực tiếp:</strong> 
                        <ul>
                            <li>StelaAdmin (Server Owner)</li>
                            <li>Mod_Thanh (Head Admin)</li>
                            <li>Support_Minh (Support Manager)</li>
                        </ul>
                    </li>
                    <li><strong>Thời gian hỗ trợ:</strong> 24/7 (phản hồi trong vòng 5-30 phút)</li>
                </ul>
                <p><strong>Lưu ý:</strong> Khi cần hỗ trợ mua hàng, vui lòng gửi ảnh xác nhận thanh toán tại kênh #support-shop và chờ Admin phản hồi. Không spam hoặc tag Admin nhiều lần.</p>
            `;
        } else if (lowerMessage.includes('quy tắc') || lowerMessage.includes('rules') || lowerMessage.includes('luật')) {
            return `
                <p>Quy tắc quan trọng trên Discord STELA SMP:</p>
                <ol>
                    <li>Tôn trọng tất cả thành viên</li>
                    <li>Không spam hoặc flood chat</li>
                    <li>Không quảng cáo server khác</li>
                    <li>Không chia sẻ thông tin cá nhân</li>
                    <li>Không hack/cheat trong game</li>
                    <li>Tuân thủ hướng dẫn của Admin</li>
                    <li>Giao dịch Chợ Đen có trách nhiệm</li>
                </ol>
                <p>Vi phạm có thể dẫn đến cảnh cáo, mute, kick hoặc ban. Đọc đầy đủ quy tắc trên trang Discord.</p>
            `;
        } else if (lowerMessage.includes('kênh') || lowerMessage.includes('channel') || lowerMessage.includes('phòng')) {
            return `
                <p>Các kênh quan trọng trên Discord STELA SMP:</p>
                <ul>
                    <li><strong>#announcements:</strong> Thông báo quan trọng từ Admin</li>
                    <li><strong>#general:</strong> Trò chuyện chung về Minecraft</li>
                    <li><strong>#support-shop:</strong> Hỗ trợ mua hàng và kích hoạt rank</li>
                    <li><strong>#black-market:</strong> Trao đổi vật phẩm giữa người chơi</li>
                    <li><strong>#events:</strong> Thông tin sự kiện và tournament</li>
                    <li><strong>#showcase:</strong> Chia sẻ thành tựu trong game</li>
                    <li><strong>#introductions:</strong> Giới thiệu bản thân khi mới tham gia</li>
                </ul>
                <p>Vui lòng sử dụng đúng kênh cho từng mục đích thảo luận.</p>
            `;
        } else {
            // Fall back to general responses
            return `<p>Tôi có thể giúp bạn với thông tin về Discord STELA SMP: cách tham gia, liên hệ support, quy tắc, các kênh quan trọng, v.v. Hãy hỏi tôi cụ thể hơn!</p>`;
        }
    };
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
    // Similar implementation as in script.js
    console.log(`Notification: ${message} (${type})`);
    alert(message); // Simplified for this example
}
