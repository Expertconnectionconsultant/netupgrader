// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stats')) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observe elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.network-3d');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 3D tilt effect for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #FF6600, #FF8C00);
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 500;
            ">
                Thank you for your message! We'll get back to you soon.
            </div>
        `;
        
        // Replace form with success message temporarily
        const formContainer = contactForm.parentNode;
        formContainer.appendChild(successMessage);
        contactForm.style.display = 'none';
        
        // Reset form and show it again after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.remove();
        }, 3000);
    });
}

// Loading animation for page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, index * 100);
        });
    }, 500);
});

// Interactive network nodes
document.querySelectorAll('.network-node').forEach((node, index) => {
    node.addEventListener('mouseenter', () => {
        node.style.transform = 'scale(1.5)';
        node.style.boxShadow = '0 0 30px rgba(255, 102, 0, 0.8)';
        
        // Highlight connected lines
        document.querySelectorAll('.connection-line').forEach(line => {
            line.style.opacity = '0.3';
        });
        
        // Show specific connections for this node
        const connections = getNodeConnections(index);
        connections.forEach(lineIndex => {
            document.querySelector(`.line-${lineIndex + 1}`).style.opacity = '1';
        });
    });
    
    node.addEventListener('mouseleave', () => {
        node.style.transform = 'scale(1)';
        node.style.boxShadow = '0 0 20px rgba(255, 102, 0, 0.6)';
        
        // Reset all lines
        document.querySelectorAll('.connection-line').forEach(line => {
            line.style.opacity = '1';
        });
    });
});

function getNodeConnections(nodeIndex) {
    const connections = {
        0: [0, 1], // node-1 connects to line-1 and line-2
        1: [1, 3], // node-2 connects to line-2 and line-4
        2: [2], // node-3 connects to line-3
        3: [2, 3], // node-4 connects to line-3 and line-4
        4: [0] // node-5 connects to line-1
    };
    return connections[nodeIndex] || [];
}

// Dynamic background particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -3;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 102, 0, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 10}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Initialize particles
createParticles();

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    const icon = card.querySelector('.icon-3d');
    
    card.addEventListener('mouseenter', () => {
        icon.style.animationPlayState = 'paused';
        icon.style.transform = 'rotateY(180deg) scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        icon.style.animationPlayState = 'running';
        icon.style.transform = '';
    });
});

// Keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
let ticking = false;

function updateOnScroll() {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.network-3d');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Add loading states for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to page elements
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});