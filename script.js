// Main JavaScript for STELA SMP Store

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips for copy buttons
    initTooltips();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize chat support
    initChatSupport();
    
    // Check server status (mock)
    checkServerStatus();
    
    // Load cart from localStorage
    loadCart();
});

// Copy IP to clipboard
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

// Initialize tooltips
function initTooltips() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = 'Click để sao chép';
            this.appendChild(tooltip);
        });
        
        btn.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Initialize mobile navigation
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    if (!navToggle) return;
    
    navToggle.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-menu');
        const navActions = document.querySelector('.nav-actions');
        
        navMenu.classList.toggle('active');
        navActions.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            document.querySelector('.nav-actions').classList.remove('active');
            
            // Reset icon
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Check server status (mock)
function checkServerStatus() {
    // In a real implementation, this would fetch from an API
    // For now, we'll mock it with 90% chance of online
    const isOnline = Math.random() > 0.1;
    
    const statusElement = document.querySelector('.server-status');
    const dotElement = document.querySelector('.status-dot');
    
    if (statusElement && dotElement) {
        if (isOnline) {
            statusElement.classList.remove('offline');
            statusElement.classList.add('online');
            statusElement.innerHTML = '<span class="status-dot"></span> Online';
        } else {
            statusElement.classList.remove('online');
            statusElement.classList.add('offline');
            statusElement.innerHTML = '<span class="status-dot"></span> Offline';
            
            // Add offline styles
            const style = document.createElement('style');
            style.textContent = `
                .server-status.offline .status-dot {
                    background-color: var(--danger);
                    box-shadow: 0 0 10px var(--danger);
                }
            `;
            
            if (!document.querySelector('#offline-styles')) {
                style.id = 'offline-styles';
                document.head.appendChild(style);
            }
        }
    }
}

// Initialize chat support
function initChatSupport() {
    // Chat toggle functionality is in checkout.js
    // This function is a placeholder for future expansion
}

// Load cart from localStorage
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('stelaCart')) || [];
    updateCartCount(cart.length);
}

// Update cart count in UI
function updateCartCount(count) {
    // Check if cart indicator exists
    let cartIndicator = document.getElementById('cartIndicator');
    
    if (!cartIndicator && count > 0) {
        // Create cart indicator
        cartIndicator = document.createElement('div');
        cartIndicator.id = 'cartIndicator';
        cartIndicator.className = 'cart-indicator';
        
        // Add to navbar
        const storeLink = document.querySelector('a[href="index.html"]');
        if (storeLink) {
            storeLink.appendChild(cartIndicator);
        }
    }
    
    if (cartIndicator) {
        cartIndicator.textContent = count;
        cartIndicator.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Add item to cart
function addToCart(itemName, itemPrice, itemType) {
    const cart = JSON.parse(localStorage.getItem('stelaCart')) || [];
    
    // Check if item already in cart
    const existingItem = cart.find(item => item.name === itemName && item.type === itemType);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            type: itemType,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('stelaCart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount(cart.length);
    
    // Show notification
    showNotification(`Đã thêm ${itemName} vào giỏ hàng!`, 'success');
}

// Open support chat
function openSupportChat() {
    const chatContainer = document.getElementById('aiChatContainer');
    const chatBody = document.getElementById('chatBody');
    const chatToggleIcon = document.getElementById('chatToggleIcon');
    
    if (chatContainer && chatBody && chatToggleIcon) {
        chatBody.style.display = 'flex';
        chatToggleIcon.classList.remove('fa-chevron-down');
        chatToggleIcon.classList.add('fa-chevron-up');
        
        // Scroll to chat
        chatContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
