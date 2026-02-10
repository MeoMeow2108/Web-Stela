// Black Market JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize black market functionality
    initBlackMarket();
    
    // Initialize chat support with black market responses
    initBlackMarketChat();
});

// Initialize black market
function initBlackMarket() {
    // Load existing listings
    loadListings();
    
    // Setup form submission
    const listingForm = document.getElementById('listingForm');
    if (listingForm) {
        listingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            postListing();
        });
    }
}

// Load listings from localStorage
function loadListings() {
    const listings = JSON.parse(localStorage.getItem('stelaBlackMarket')) || [];
    const container = document.getElementById('listingsContainer');
    const noListingsMsg = document.getElementById('noListingsMessage');
    
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Show message if no listings
    if (listings.length === 0) {
        if (noListingsMsg) noListingsMsg.style.display = 'block';
        return;
    }
    
    if (noListingsMsg) noListingsMsg.style.display = 'none';
    
    // Add each listing to container
    listings.forEach(listing => {
        const listingElement = createListingElement(listing);
        container.appendChild(listingElement);
    });
}

// Create listing element
function createListingElement(listing) {
    const element = document.createElement('div');
    element.className = 'listing-card';
    element.innerHTML = `
        <div class="listing-header">
            <h3 class="listing-name">${escapeHtml(listing.itemName)}</h3>
            <div class="listing-price">${formatPrice(listing.itemPrice)}</div>
        </div>
        <div class="listing-body">
            <p class="listing-desc">${escapeHtml(listing.itemDescription)}</p>
        </div>
        <div class="listing-footer">
            <div class="seller-info">
                <div class="seller-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div>
                    <div class="seller-name">${escapeHtml(listing.sellerName)}</div>
                    <small>Đăng ${formatTimeAgo(listing.timestamp)}</small>
                </div>
            </div>
            <button class="btn-contact" onclick="contactSeller('${escapeHtml(listing.discordContact)}')">
                <i class="fab fa-discord"></i> Liên hệ
            </button>
        </div>
    `;
    
    return element;
}

// Post new listing
function postListing() {
    const itemName = document.getElementById('itemName').value.trim();
    const itemPrice = document.getElementById('itemPrice').value.trim();
    const itemDescription = document.getElementById('itemDescription').value.trim();
    const sellerName = document.getElementById('sellerName').value.trim();
    const discordContact = document.getElementById('discordContact').value.trim();
    
    // Validate
    if (!itemName || !itemPrice || !itemDescription || !sellerName || !discordContact) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
    }
    
    // Get existing listings
    const listings = JSON.parse(localStorage.getItem('stelaBlackMarket')) || [];
    
    // Create new listing
    const newListing = {
        id: Date.now().toString(),
        itemName,
        itemPrice: parseInt(itemPrice),
        itemDescription,
        sellerName,
        discordContact,
        timestamp: Date.now()
    };
    
    // Add to beginning of array (most recent first)
    listings.unshift(newListing);
    
    // Save to localStorage
    localStorage.setItem('stelaBlackMarket', JSON.stringify(listings));
    
    // Reload listings
    loadListings();
    
    // Reset form
    document.getElementById('listingForm').reset();
    
    // Show success message
    showNotification('Đã đăng bán vật phẩm thành công!', 'success');
}

// Contact seller
function contactSeller(discordContact) {
    showNotification(`Liên hệ với người bán qua Discord: ${discordContact}`, 'info');
    
    // In a real implementation, this might open Discord or copy to clipboard
    navigator.clipboard.writeText(discordContact).then(() => {
        setTimeout(() => {
            showNotification('Đã sao chép Discord ID vào clipboard!', 'success');
        }, 1000);
    });
}

// Format price to VND
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Format time ago
function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) {
        return 'vài giây trước';
    } else if (minutes < 60) {
        return `${minutes} phút trước`;
    } else if (hours < 24) {
        return `${hours} giờ trước`;
    } else {
        return `${days} ngày trước`;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize black market chat
function initBlackMarketChat() {
    // Override the getAIResponse function for black market page
    window.getAIResponse = function(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for black market related questions
        if (lowerMessage.includes('đăng bán') || lowerMessage.includes('bán đồ') || lowerMessage.includes('post')) {
            return `
                <p>Để đăng bán vật phẩm trên Chợ Đen:</p>
                <ol>
                    <li>Điền đầy đủ thông tin vào form "Đăng bán vật phẩm"</li>
                    <li>Nhấn "Đăng bán ngay"</li>
                    <li>Vật phẩm của bạn sẽ xuất hiện trong danh sách</li>
                    <li>Người mua sẽ liên hệ với bạn qua Discord</li>
                </ol>
                <p><strong>Lưu ý:</strong> STELA SMP không chịu trách nhiệm cho các giao dịch giữa người chơi. Hãy cẩn thận và chỉ giao dịch với người đáng tin cậy.</p>
            `;
        } else if (lowerMessage.includes('an toàn') || lowerMessage.includes('lừa đảo') || lowerMessage.includes('scam')) {
            return `
                <p>Để giao dịch an toàn trên Chợ Đen:</p>
                <ul>
                    <li>Chỉ giao dịch với người chơi có uy tín</li>
                    <li>Kiểm tra vật phẩm trước khi thanh toán</li>
                    <li>Sử dụng hệ thống escrow nếu giá trị lớn</li>
                    <li>Luôn giữ lại bằng chứng giao dịch (chat log, ảnh chụp)</li>
                    <li>Báo cáo ngay cho Admin nếu bị lừa đảo</li>
                </ul>
                <p><strong>Quan trọng:</strong> Admin có thể ban người chơi lừa đảo nhưng không thể hoàn lại vật phẩm/tài sản đã mất.</p>
            `;
        } else if (lowerMessage.includes('báo cáo') || lowerMessage.includes('report') || lowerMessage.includes('lừa')) {
            return `
                <p>Nếu bạn bị lừa đảo trên Chợ Đen:</p>
                <ol>
                    <li>Chụp ảnh toàn bộ quá trình giao dịch (chat, thỏa thuận)</li>
                    <li>Vào Discord server và liên hệ với Admin</li>
                    <li>Cung cấp đầy đủ bằng chứng</li>
                    <li>Admin sẽ xử lý người chơi lừa đảo (ban khỏi server)</li>
                </ol>
                <p><strong>Lưu ý:</strong> Admin không thể hoàn lại vật phẩm/tài sản đã mất. Mục đích chính là trừng phạt người lừa đảo để bảo vệ cộng đồng.</p>
            `;
        } else if (lowerMessage.includes('mua') || lowerMessage.includes('tìm đồ')) {
            return `
                <p>Để mua vật phẩm trên Chợ Đen:</p>
                <ol>
                    <li>Duyệt danh sách vật phẩm đang bán</li>
                    <li>Chọn vật phẩm bạn muốn mua</li>
                    <li>Nhấn "Liên hệ" để lấy Discord của người bán</li>
                    <li>Thương lượng giá và phương thức giao dịch</li>
                    <li>Hoàn tất giao dịch trong game</li>
                </ol>
                <p>Nếu không tìm thấy vật phẩm bạn cần, hãy đăng yêu cầu mua trên kênh #black-market trong Discord server.</p>
            `;
        } else {
            // Fall back to general responses
            return `<p>Tôi có thể giúp bạn với thông tin về Chợ Đen: cách đăng bán, mua an toàn, báo cáo lừa đảo, v.v. Hãy hỏi tôi cụ thể hơn!</p>`;
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
