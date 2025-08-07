// Enhanced interactive features for Hello World Pakistan page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeAnimations();
    initializeTimeDisplay();
    initializeInteractiveElements();
    initializeThemeToggle();
    initializeLanguageToggle();
    initializeSoundEffects();
});

// Animation controller
function initializeAnimations() {
    // Animate elements on page load
    const animatedElements = document.querySelectorAll('.animate-on-load');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Floating animation for decorative elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        animateFloat(element);
    });
}

// Floating animation function
function animateFloat(element) {
    const duration = 3000 + Math.random() * 2000;
    const delay = Math.random() * 1000;
    
    element.style.animation = `float ${duration}ms ease-in-out ${delay}ms infinite`;
}

// Real-time clock display
function initializeTimeDisplay() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;

    function updateTime() {
        try {
            const now = new Date();
            const pakistanTime = new Intl.DateTimeFormat('en-PK', {
                timeZone: 'Asia/Karachi',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }).format(now);

            const pakistanDate = new Intl.DateTimeFormat('en-PK', {
                timeZone: 'Asia/Karachi',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(now);

            timeElement.innerHTML = `
                <div class="time-display">
                    <div class="time">${pakistanTime}</div>
                    <div class="date">${pakistanDate}</div>
                    <div class="timezone">Pakistan Standard Time</div>
                </div>
            `;
        } catch (error) {
            console.error('Error updating time:', error);
            timeElement.textContent = 'Time unavailable';
        }
    }

    updateTime();
    setInterval(updateTime, 1000);
}

// Interactive elements
function initializeInteractiveElements() {
    // Flag interaction
    const flag = document.querySelector('.flag-container');
    if (flag) {
        flag.addEventListener('click', function() {
            this.classList.add('flag-wave');
            setTimeout(() => {
                this.classList.remove('flag-wave');
            }, 1000);
        });
    }

    // Greeting interaction
    const greeting = document.querySelector('.greeting');
    if (greeting) {
        greeting.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.textShadow = '0 0 20px rgba(1, 89, 49, 0.5)';
        });

        greeting.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.textShadow = 'none';
        });
    }

    // Interactive particles
    createInteractiveParticles();
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }
}

// Language toggle functionality
function initializeLanguageToggle() {
    const langToggle = document.getElementById('language-toggle');
    if (!langToggle) return;

    const translations = {
        en: {
            greeting: 'Hello World',
            subtitle: 'Greetings from the Land of the Pure',
            welcome: 'Welcome to Pakistan',
            explore: 'Explore the beauty and culture of Pakistan'
        },
        ur: {
            greeting: 'ہیلو ورلڈ',
            subtitle: 'سرزمین پاک سے سلام',
            welcome: 'پاکستان میں خوش آمدید',
            explore: 'پاکستان کی خوبصورتی اور ثقافت کو دیکھیں'
        }
    };

    let currentLang = localStorage.getItem('language') || 'en';
    updateLanguage(currentLang, translations);

    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'en' ? 'ur' : 'en';
        localStorage.setItem('language', currentLang);
        updateLanguage(currentLang, translations);
        
        // Add animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateLanguage(lang, translations) {
    const elements = {
        greeting: document.querySelector('.greeting'),
        subtitle: document.querySelector('.subtitle'),
        welcome: document.querySelector('.welcome-text'),
        explore: document.querySelector('.explore-text')
    };

    Object.keys(elements).forEach(key => {
        const element = elements[key];
        if (element && translations[lang][key]) {
            element.textContent = translations[lang][key];
            
            // Add RTL support for Urdu
            if (lang === 'ur') {
                element.style.direction = 'rtl';
                element.style.fontFamily = 'Noto Nastaliq Urdu, Arial, sans-serif';
            } else {
                element.style.direction = 'ltr';
                element.style.fontFamily = 'inherit';
            }
        }
    });

    // Update language toggle button
    const langToggle = document.getElementById('language-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'en' ? 'اردو' : 'EN';
    }
}

// Sound effects
function initializeSoundEffects() {
    // Create audio context for sound effects
    let audioContext;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
        console.log('Audio context not supported');
        return;
    }

    // Sound effect for interactions
    function playClickSound() {
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }

    // Add sound to interactive elements
    const interactiveElements = document.querySelectorAll('button, .flag-container, .greeting');
    interactiveElements.forEach(element => {
        element.addEventListener('click', playClickSound);
    });
}

// Interactive particles system
function createInteractiveParticles() {
    const particleContainer = document.querySelector('.particle-container');
    if (!particleContainer) return;

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'interactive-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        // Random colors from Pakistan flag
        const colors = ['#01593F', '#FFFFFF', '#FFD700'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        particleContainer.appendChild(particle);

        // Animate particle
        const animation = particle.animate([
            { transform: 'translate(0, 0) scale(0)', opacity: 1 },
            { transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(1)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }

    // Create particles on click
    document.addEventListener('click', function(e) {
        if (Math.random() > 0.7) { // 30% chance
            createParticle(e.clientX, e.clientY);
        }
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Handle resize
            const elements = document.querySelectorAll('.responsive-element');
            elements.forEach(element => {
                element.style.transition = 'none';
                setTimeout(() => {
                    element.style.transition = '';
                }, 100);
            });
        }, 250);
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    const observedElements = document.querySelectorAll('.observe-animation');
    observedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize performance optimizations
optimizePerformance();

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Accessibility enhancements
function enhanceAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Screen reader announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-10000px';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.overflow = 'hidden';
    document.body.appendChild(announcer);

    window.announce = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
}

// Initialize accessibility features
enhanceAccessibility();