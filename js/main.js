/**
 * Bajoria Consultancy - Main JavaScript
 * Handles: Dark mode, mobile menu, contact form, scroll animations
 */

// =======================
// Tailwind Script Configuration
// (Also configured inline in HTML for immediate styles)
// =======================
function initTailwind() {
  if (typeof tailwind === 'undefined') return;

  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
        }
      }
    }
  };
}

// =======================
// Dark / Light Mode Toggle
// =======================
function initDarkMode() {
  const toggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Set initial theme from localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Toggle handler
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = html.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      // Optional: Update icon immediately
      updateThemeIcon(toggleBtn, isDark);
    });

    // Set initial icon
    updateThemeIcon(toggleBtn, html.classList.contains('dark'));
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  });
}

function updateThemeIcon(button, isDark) {
  const sunIcon = button.querySelector('.sun-icon');
  const moonIcon = button.querySelector('.moon-icon');

  if (!sunIcon || !moonIcon) return;

  if (isDark) {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
}

// =======================
// Mobile Navigation Menu
// =======================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu?.querySelectorAll('a');

  if (!mobileMenuBtn || !mobileMenu) return;

  let isOpen = false;

  const toggleMenu = () => {
    isOpen = !isOpen;

    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      // Change icon to X
      mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;
    } else {
      mobileMenu.style.maxHeight = '0px';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.maxHeight = '';
      }, 300);
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      // Reset to hamburger
      mobileMenuBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      `;
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) toggleMenu();
    });
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu();
    }
  });
}

// =======================
// Smooth Scroll Enhancement (for better UX)
// =======================
function initSmoothScroll() {
  // Already using scroll-smooth on html, but add offset for fixed navbar
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (!targetElement) return;

      e.preventDefault();

      const navbarHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// =======================
// Section Scroll Animations (Fade in on scroll)
// =======================
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');

  if (!('IntersectionObserver' in window)) {
    sections.forEach(section => section.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Only animate once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-50px 0px -50px 0px'
  });

  sections.forEach(section => {
    // Add base animation class if not already present
    if (!section.classList.contains('section-fade')) {
      section.classList.add('section-fade');
    }
    observer.observe(section);
  });
}

// =======================
// Contact Form Handling
// =======================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || 'Not provided',
      service: formData.get('service'),
      message: formData.get('message'),
      consent: formData.get('consent') === 'on',
      timestamp: new Date().toISOString()
    };

    // Log to console (great for development)
    console.log('%c[Bajoria Consultancy] New inquiry received:', 'color:#0ea5e9; font-weight:600', data);

    // Hide form temporarily and show success
    form.style.display = 'none';

    if (successMessage) {
      successMessage.classList.remove('hidden');
      successMessage.classList.add('success-message');
    }

    // Optional: You can integrate real email sending here later
    // Example: Send to Formspree or your backend

    // Reset form after 5 seconds and show it again (for demo purposes)
    setTimeout(() => {
      form.reset();
      if (successMessage) {
        successMessage.classList.add('hidden');
        successMessage.classList.remove('success-message');
      }
      form.style.display = 'block';
    }, 5500);
  });
}

// =======================
// Navbar scroll effect
// =======================
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');

  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    lastScrollY = window.scrollY;
  }, { passive: true });
}

// =======================
// Initialize Everything
// =======================
function init() {
  initTailwind();
  initDarkMode();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initContactForm();
  initNavbarScroll();

  // Optional: Welcome log
  console.log('%c[Bajoria Consultancy] Website initialized successfully.', 'color: #64748b');
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
