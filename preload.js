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
            // Add a placeholder icon or text if needed
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
        
        // Create dirt texture pattern with Canvas
        createAndApplyTexture();
        
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
            
            // Add button texture
            button.style.position = 'relative';
            
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
    
    // Create texture using Canvas and apply it
    function createAndApplyTexture() {
        try {
            // Create a canvas to generate the texture
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Size of the texture cell
            canvas.width = 32;
            canvas.height = 32;
            
            // Base color (dirt)
            ctx.fillStyle = '#866043';
            ctx.fillRect(0, 0, 32, 32);
            
            // Add noise pattern
            for (let i = 0; i < 100; i++) {
                const x = Math.floor(Math.random() * 32);
                const y = Math.floor(Math.random() * 32);
                const size = Math.floor(Math.random() * 3) + 1;
                
                // Random darker/lighter spots
                const shade = Math.random();
                if (shade > 0.5) {
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                } else {
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                }
                
                ctx.fillRect(x, y, size, size);
            }
            
            // Convert canvas to data URL
            const dataURL = canvas.toDataURL();
            
            // Apply to body background
            document.body.style.backgroundImage = `url(${dataURL})`;
            document.body.style.backgroundSize = '32px';
            document.body.style.backgroundRepeat = 'repeat';
            
            // Apply to buttons
            const buttons = document.querySelectorAll('.minecraft-button');
            buttons.forEach(button => {
                // Create a pseudo-element with the texture
                button.style.position = 'relative';
                
                const buttonTexture = document.createElement('div');
                buttonTexture.style.position = 'absolute';
                buttonTexture.style.top = '0';
                buttonTexture.style.left = '0';
                buttonTexture.style.width = '100%';
                buttonTexture.style.height = '100%';
                buttonTexture.style.backgroundImage = `url(${dataURL})`;
                buttonTexture.style.backgroundSize = '32px';
                buttonTexture.style.opacity = '0.3';
                buttonTexture.style.pointerEvents = 'none';
                
                // Insert as first child
                if (button.firstChild) {
                    button.insertBefore(buttonTexture, button.firstChild);
                } else {
                    button.appendChild(buttonTexture);
                }
            });
            
            console.log('Textures created and applied');
        } catch (error) {
            console.error('Error creating textures:', error);
        }
    }
}); 