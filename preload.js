// Minecraft texture preloader and fallback handler
window.addEventListener('DOMContentLoaded', function() {
    // Force load the profile image
    const profileImg = new Image();
    profileImg.onload = function() {
        console.log('Profile image loaded successfully');
        
        // Update the src with a cache buster once loaded
        const imgElement = document.querySelector('.profile-image img');
        if (imgElement) {
            imgElement.src = profileImg.src + '?v=' + Date.now();
        }
    };
    
    profileImg.onerror = function() {
        console.error('Failed to load profile image');
        // Apply a fallback style to the profile container
        const profileContainer = document.querySelector('.profile-image');
        if (profileContainer) {
            profileContainer.style.backgroundColor = '#555';
            // Create a placeholder icon for profile
            profileContainer.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;color:#fff;text-shadow:2px 2px 0 #000;"><i class="fas fa-user"></i></div>';
        }
    };
    
    // Set the source last
    profileImg.src = './profile.jpg';
    
    // Apply direct Minecraft styling as fallback
    setTimeout(function() {
        applyMinecraftStyles();
    }, 500);
    
    // Function to directly apply Minecraft style in case CSS fails
    function applyMinecraftStyles() {
        // Apply direct styling to body
        document.body.style.backgroundColor = '#1d1c1c';
        document.body.style.fontFamily = "'VT323', monospace";
        document.body.style.color = '#fff';
        
        // Apply CSS grid patterns
        applyGridPatterns();
        
        // Fix button styling
        const buttons = document.querySelectorAll('.minecraft-button');
        buttons.forEach(button => {
            button.style.backgroundColor = '#5f9a55';
            button.style.color = 'white';
            button.style.border = '4px solid #000';
            button.style.padding = '12px 16px';
            button.style.textDecoration = 'none';
            button.style.fontSize = '24px';
            button.style.textTransform = 'uppercase';
            button.style.boxShadow = 'inset 0 4px 0 rgba(255, 255, 255, 0.3), inset -4px -4px 0 rgba(0, 0, 0, 0.3)';
            button.style.marginBottom = '12px';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            
            // Apply grid pattern to buttons
            button.style.backgroundImage = 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)';
            button.style.backgroundSize = '8px 8px';
            
            // Add text shadow to all text within buttons
            const allTextElements = button.querySelectorAll('*');
            allTextElements.forEach(el => {
                el.style.position = 'relative';
                el.style.zIndex = '1';
                el.style.textShadow = '2px 2px 0 #000';
            });
        });
        
        // Fix frame styling
        const frame = document.querySelector('.minecraft-frame');
        if (frame) {
            frame.style.backgroundColor = '#866043';
            frame.style.borderWidth = '8px';
            frame.style.borderStyle = 'solid';
            frame.style.borderTopColor = '#7d5930';
            frame.style.borderLeftColor = '#7d5930';
            frame.style.borderBottomColor = '#3d2911';
            frame.style.borderRightColor = '#3d2911';
            frame.style.padding = '20px';
            frame.style.boxShadow = '0 0 0 4px #000';
            
            // Apply grid pattern
            frame.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)';
            frame.style.backgroundSize = '16px 16px';
        }
        
        // Fix profile card styling
        const profileCard = document.querySelector('.profile-card');
        if (profileCard) {
            profileCard.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            profileCard.style.border = '4px solid #000';
            profileCard.style.padding = '15px';
            profileCard.style.textAlign = 'center';
            profileCard.style.marginBottom = '30px';
            
            // Fix heading styles
            const heading = profileCard.querySelector('h1');
            if (heading) {
                heading.style.fontSize = '42px';
                heading.style.marginBottom = '5px';
                heading.style.textShadow = '2px 2px 0 #000';
            }
            
            // Fix bio styles
            const bio = profileCard.querySelector('.bio');
            if (bio) {
                bio.style.fontSize = '24px';
                bio.style.marginBottom = '15px';
                bio.style.color = '#FFFF55';
                bio.style.textShadow = '2px 2px 0 #000';
            }
        }
    }
    
    // Apply grid patterns to different elements
    function applyGridPatterns() {
        // Apply simplified dark background pattern to body
        document.body.style.backgroundColor = '#121212';
        document.body.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.8) 1px, transparent 1px)';
        document.body.style.backgroundSize = '24px 24px';
    }
}); 