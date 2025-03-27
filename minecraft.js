// Minecraft Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check for WebGL support
    let isWebGLAvailable = false;
    try {
        const canvas = document.createElement('canvas');
        isWebGLAvailable = !!(window.WebGLRenderingContext && 
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch(e) {
        isWebGLAvailable = false;
    }
    
    // Three.js Background Animation
    if (isWebGLAvailable && typeof THREE !== 'undefined') {
        try {
            const canvas = document.getElementById('bg-canvas');
            if (!canvas) throw new Error('Canvas element not found');
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            
            // Create cube particles (like Minecraft blocks)
            const cubeGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
            const cubes = [];
            const cubeCount = 100; // More cubes for better visibility
            
            // Different Minecraft-like colors
            const colors = [
                0x5f9a55, // Green (grass)
                0x825432, // Brown (wood)
                0x7a7a7a, // Stone
                0x866043, // Dirt
                0x5989d8, // Blue (water)
                0xb5a76c, // Sand
                0xff0000, // Red (redstone)
                0xd5d5d5, // Light gray (iron)
                0xdbc148, // Gold
                0x4a80ff  // Diamond
            ];
            
            // Create and add cubes to scene
            for (let i = 0; i < cubeCount; i++) {
                const material = new THREE.MeshBasicMaterial({ 
                    color: colors[Math.floor(Math.random() * colors.length)],
                    wireframe: Math.random() > 0.8 // Fewer wireframes for better visibility
                });
                
                const cube = new THREE.Mesh(cubeGeometry, material);
                
                // Position cubes randomly in space
                cube.position.x = (Math.random() - 0.5) * 25;
                cube.position.y = (Math.random() - 0.5) * 25;
                cube.position.z = (Math.random() - 0.5) * 25;
                
                // Random rotation
                cube.rotation.x = Math.random() * Math.PI;
                cube.rotation.y = Math.random() * Math.PI;
                
                // Random speed properties
                cube.speed = {
                    rotation: (Math.random() * 0.01) + 0.002,
                    position: (Math.random() * 0.01) + 0.002
                };
                
                scene.add(cube);
                cubes.push(cube);
            }
            
            camera.position.z = 8; // Move camera back for better view
            
            // Mouse interaction
            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;
            
            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            });
            
            // Animation loop
            function animate() {
                requestAnimationFrame(animate);
                
                // Smooth camera movement towards mouse position
                targetX = mouseX * 0.5;
                targetY = mouseY * 0.5;
                camera.position.x += (targetX - camera.position.x) * 0.05;
                camera.position.y += (targetY - camera.position.y) * 0.05;
                camera.lookAt(0, 0, 0);
                
                // Animate cubes
                cubes.forEach(cube => {
                    cube.rotation.x += cube.speed.rotation;
                    cube.rotation.y += cube.speed.rotation;
                    
                    // Slight bobbing motion
                    cube.position.y += Math.sin(Date.now() * cube.speed.position) * 0.002;
                });
                
                renderer.render(scene, camera);
            }
            
            animate();
            
            // Handle resize
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        } catch (error) {
            console.error('Three.js initialization failed:', error);
            // Fallback to static background - hide canvas
            const canvas = document.getElementById('bg-canvas');
            if (canvas) canvas.style.display = 'none';
        }
    } else {
        console.warn('WebGL or Three.js is not available, using fallback background');
        // Hide canvas since we won't be using it
        const canvas = document.getElementById('bg-canvas');
        if (canvas) canvas.style.display = 'none';
    }

    // Loading screen animation
    const progressFill = document.querySelector('.progress-fill');
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    
    // Simulate loading progress
    let width = 0;
    const loadingInterval = setInterval(function() {
        if (width >= 100) {
            clearInterval(loadingInterval);
            
            // Fade out loading screen
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    content.style.display = 'block';
                    
                    // Animate elements appearing
                    animateElements();
                    
                    // Apply additional styles via JavaScript as a fallback
                    const styleLoaded = document.querySelector('body').classList.contains('minecraft-theme');
                    if (!styleLoaded) {
                        applyFallbackStyles();
                    }
                }, 300);
            }, 300);
        } else {
            width += Math.random() * 10;
            if (width > 100) width = 100;
            progressFill.style.width = width + '%';
        }
    }, 100);
    
    // Function to apply fallback styles directly via JavaScript
    function applyFallbackStyles() {
        // Set basic styling
        document.body.style.backgroundColor = '#1d1c1c';
        document.body.style.fontFamily = "'VT323', monospace";
        document.body.style.color = '#fff';
        
        // Add Minecraft theme class
        document.body.classList.add('minecraft-theme');
        
        // Make sure profile image is visible
        const profileImg = document.querySelector('.profile-image img');
        if (profileImg) {
            // Force reload the image with a cache buster
            const originalSrc = profileImg.src;
            if (originalSrc && !originalSrc.includes('?v=')) {
                profileImg.src = originalSrc + '?v=' + Date.now();
            }
        }
    }
    
    // Block-by-block animation
    function animateElements() {
        const profile = document.querySelector('.profile-card');
        profile.style.animation = 'blockAppear 0.5s forwards';
        
        // Animate links with delay
        const links = document.querySelectorAll('.minecraft-button');
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.animation = 'blockAppear 0.3s forwards';
                
                // Add pixelated breaking animation on hover
                link.addEventListener('mouseenter', function() {
                    this.classList.add('breaking');
                });
                
                link.addEventListener('mouseleave', function() {
                    this.classList.remove('breaking');
                });
                
                // Add click sound
                link.addEventListener('click', playClickSound);
            }, 150 * (index + 1));
        });
        
        // Minecraft dig sound on button click
        function playClickSound() {
            const clickSound = new Audio('https://www.myinstants.com/media/sounds/minecraft-click.mp3');
            clickSound.volume = 0.3;
            clickSound.play();
        }
    }
    
    // Create ambient Minecraft sounds
    function playAmbientSounds() {
        // Random ambient sounds
        const ambientSounds = [
            'https://www.myinstants.com/media/sounds/minecraft-ambient-cave-sound-1.mp3',
            'https://www.myinstants.com/media/sounds/minecrafthorsesound.mp3'
        ];
        
        // Play a random ambient sound occasionally
        setInterval(() => {
            if (Math.random() > 0.7) {
                const sound = new Audio(ambientSounds[Math.floor(Math.random() * ambientSounds.length)]);
                sound.volume = 0.1;
                sound.play();
            }
        }, 15000);
    }
    
    // Uncomment to enable ambient sounds
    // playAmbientSounds();
}); 