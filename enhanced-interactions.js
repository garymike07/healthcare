// Enhanced Interactions and Animations for HealthKenya
// This file adds advanced interactive features and animations

class HealthKenyaAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
    this.setupRippleEffects();
    this.setupParticleEffects();
    this.setupSmoothScrolling();
    this.setupAdvancedHoverEffects();
    this.setupLoadingAnimations();
    this.setupFormAnimations();
    this.setupNotificationAnimations();
    this.setupCounterAnimations();
  }

  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add stagger effect for multiple items
          if (entry.target.classList.contains('stagger-container')) {
            this.animateStaggeredItems(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe elements that should animate on scroll
    document.querySelectorAll('.fade-in-on-scroll, .stagger-container').forEach(el => {
      observer.observe(el);
    });
  }

  // Staggered animation for multiple items
  animateStaggeredItems(container) {
    const items = container.querySelectorAll('.stagger-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('slide-in-up');
      }, index * 100);
    });
  }

  // Parallax effects
  setupParallaxEffects() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
      
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Ripple effects for buttons
  setupRippleEffects() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        this.createRipple(e, button);
      }
    });
  }

  createRipple(event, element) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-effect');

    const ripple = element.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
      ripple.remove();
    }

    element.appendChild(circle);

    // Remove ripple after animation
    setTimeout(() => {
      circle.remove();
    }, 600);
  }

  // Particle effects
  setupParticleEffects() {
    this.createParticleSystem();
  }

  createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        this.createParticle(particleContainer);
      }, i * 200);
    }

    // Continuously create new particles
    setInterval(() => {
      if (Math.random() > 0.7) {
        this.createParticle(particleContainer);
      }
    }, 2000);
  }

  createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.3 + 0.1;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(0, 102, 204, ${opacity});
      border-radius: 50%;
      left: ${left}%;
      bottom: -10px;
      animation: floatUp ${animationDuration}s linear infinite;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, animationDuration * 1000);
  }

  // Smooth scrolling for anchor links
  setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }

  // Advanced hover effects
  setupAdvancedHoverEffects() {
    // Magnetic effect for buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });

    // Tilt effect for cards
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Loading animations
  setupLoadingAnimations() {
    this.showPageLoadAnimation();
  }

  showPageLoadAnimation() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    `;

    const loadingContent = document.createElement('div');
    loadingContent.innerHTML = `
      <div style="text-align: center; color: white;">
        <div class="loading-spinner" style="
          width: 60px;
          height: 60px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        "></div>
        <h2 style="margin: 0; font-family: var(--font-heading);">HealthKenya</h2>
        <p style="margin: 10px 0 0; opacity: 0.9;">Loading your healthcare dashboard...</p>
      </div>
    `;

    loadingOverlay.appendChild(loadingContent);
    document.body.appendChild(loadingOverlay);

    // Remove loading overlay after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
          if (loadingOverlay.parentNode) {
            loadingOverlay.parentNode.removeChild(loadingOverlay);
          }
        }, 500);
      }, 1000);
    });
  }

  // Form animations
  setupFormAnimations() {
    // Floating label effect
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
      const wrapper = document.createElement('div');
      wrapper.className = 'form-field-wrapper';
      input.parentNode.insertBefore(wrapper, input);
      wrapper.appendChild(input);

      // Add focus animations
      input.addEventListener('focus', () => {
        wrapper.classList.add('focused');
        input.classList.add('glow');
      });

      input.addEventListener('blur', () => {
        wrapper.classList.remove('focused');
        input.classList.remove('glow');
        
        if (input.value) {
          wrapper.classList.add('has-value');
        } else {
          wrapper.classList.remove('has-value');
        }
      });

      // Check initial value
      if (input.value) {
        wrapper.classList.add('has-value');
      }
    });

    // Form validation animations
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        const invalidInputs = form.querySelectorAll(':invalid');
        invalidInputs.forEach(input => {
          input.classList.add('shake');
          setTimeout(() => {
            input.classList.remove('shake');
          }, 500);
        });
      }
    });
  }

  // Enhanced notification animations
  setupNotificationAnimations() {
    // Override the original showToast function
    window.originalShowToast = window.showToast;
    window.showToast = (msg, type = 'info', ms = 4000) => {
      this.showEnhancedToast(msg, type, ms);
    };
  }

  showEnhancedToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `enhanced-toast ${type}`;
    
    const icon = this.getToastIcon(type);
    
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
      <div class="toast-progress"></div>
    `;

    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      min-width: 300px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      border-left: 4px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'primary'});
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 10);

    // Progress bar animation
    const progressBar = toast.querySelector('.toast-progress');
    progressBar.style.cssText = `
      height: 3px;
      background: var(--${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'primary'});
      width: 100%;
      animation: progressBar ${duration}ms linear;
    `;

    // Auto remove
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  getToastIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };
    return icons[type] || icons.info;
  }

  // Counter animations for KPIs
  setupCounterAnimations() {
    const animateCounter = (element, target, duration = 2000) => {
      const start = parseInt(element.textContent) || 0;
      const increment = (target - start) / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current);
      }, 16);
    };

    // Observe KPI elements
    const kpiObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const target = parseInt(entry.target.dataset.target) || parseInt(entry.target.textContent);
          animateCounter(entry.target, target);
          entry.target.dataset.animated = 'true';
        }
      });
    });

    document.querySelectorAll('.kpi-value').forEach(el => {
      kpiObserver.observe(el);
    });
  }

  // Utility method to add CSS animations dynamically
  addAnimation(element, animationClass, duration = 500) {
    element.classList.add(animationClass);
    setTimeout(() => {
      element.classList.remove(animationClass);
    }, duration);
  }

  // Method to create custom animations
  createCustomAnimation(element, keyframes, options = {}) {
    const animation = element.animate(keyframes, {
      duration: options.duration || 500,
      easing: options.easing || 'ease-in-out',
      fill: options.fill || 'forwards',
      ...options
    });

    return animation;
  }
}

// CSS for floating particles
const particleCSS = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .form-field-wrapper {
    position: relative;
  }

  .form-field-wrapper.focused .form-input,
  .form-field-wrapper.focused .form-select,
  .form-field-wrapper.focused .form-textarea {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
  }

  .enhanced-toast .toast-content {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 12px;
  }

  .enhanced-toast .toast-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
  }

  .enhanced-toast .toast-message {
    flex: 1;
    font-weight: 500;
  }

  .enhanced-toast .toast-close {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .enhanced-toast .toast-close:hover {
    opacity: 1;
  }

  .enhanced-toast .toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 0 0 12px 12px;
  }
`;

// Add the CSS to the document
const style = document.createElement('style');
style.textContent = particleCSS;
document.head.appendChild(style);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HealthKenyaAnimations();
});

// Export for use in other scripts
window.HealthKenyaAnimations = HealthKenyaAnimations;

