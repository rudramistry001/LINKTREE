// Preload all external images and apply Minecraft theming
window.addEventListener('DOMContentLoaded', function() {
    const imagesToPreload = [
        'https://i.imgur.com/mq2cWTO.png', // Background texture
        'https://i.imgur.com/dTGC4Af.png', // Loader image
        'https://i.imgur.com/8SLdbz4.png', // Border image
        'https://i.imgur.com/I5c6Dhn.png'  // Button texture
    ];
    
    // Create image objects to preload
    imagesToPreload.forEach(function(src) {
        const img = new Image();
        img.src = src;
        img.onload = function() {
            console.log('Image loaded: ' + src);
        };
        img.onerror = function() {
            console.error('Failed to load image: ' + src);
        };
    });
    
    // Apply additional Minecraft styling
    setTimeout(function() {
        applyMinecraftStyling();
    }, 1000);
    
    function applyMinecraftStyling() {
        // Make borders more pixelated and Minecraft-like
        const frame = document.querySelector('.minecraft-frame');
        if (frame) {
            frame.style.borderWidth = '8px';
            frame.style.borderStyle = 'solid';
            frame.style.borderColor = '#5b4121';
            frame.style.boxShadow = '0 0 0 2px #2d2010, 0 0 20px rgba(0, 0, 0, 0.7)';
        }
        
        // Add dirt texture overlay to enhance Minecraft feel
        const container = document.querySelector('.container');
        if (container) {
            container.style.backgroundImage = 'url("https://i.imgur.com/mq2cWTO.png")';
            container.style.backgroundSize = '100px';
            container.style.imageRendering = 'pixelated';
        }
        
        // Enhance buttons to look more like Minecraft buttons
        const buttons = document.querySelectorAll('.minecraft-button');
        buttons.forEach(button => {
            button.style.borderColor = '#000';
            button.style.boxShadow = 'inset -4px -4px 0 rgba(0, 0, 0, 0.4), 0 2px 0 #000';
        });
        
        console.log('Minecraft styling applied');
    }
}); 