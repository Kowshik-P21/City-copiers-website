/**
 * CITY COPIERS - Main JavaScript Controller
 * - Theme Switcher (Light / Dark with localStorage)
 * - Mobile Drawer Menu
 * - WhatsApp Quick Message & Form Handler
 * - Smooth UX Enhancements
 */

(function () {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    primaryWhatsApp: '917401401740',
    secondaryWhatsApp: '919150566155',
    primaryPhone: '+91 7401401740',
    shopEmail: 'CITYCOPIERS105@GMAIL.COM'
  };

  // --- Theme Controller (Light / Dark Mode) ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('cc-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcons(currentTheme);

    // Attach listeners to all theme toggle buttons
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('cc-theme', newTheme);
        updateToggleIcons(newTheme);
      });
    });
  };

  const updateToggleIcons = (theme) => {
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      if (theme === 'dark') {
        // Show Sun icon (switch to light)
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        `;
        btn.setAttribute('title', 'Switch to Light Theme');
        btn.setAttribute('aria-label', 'Switch to Light Theme');
      } else {
        // Show Moon icon (switch to dark)
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        `;
        btn.setAttribute('title', 'Switch to Dark Theme');
        btn.setAttribute('aria-label', 'Switch to Dark Theme');
      }
    });
  };

  // --- Mobile Drawer Navigation ---
  const initMobileNav = () => {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    const overlay = document.querySelector('.drawer-overlay');
    const closeBtn = document.querySelector('.drawer-close');

    if (!toggleBtn || !drawer || !overlay) return;

    const openDrawer = () => {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // Close on link click inside drawer
    const drawerLinks = drawer.querySelectorAll('a');
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  };

  // --- WhatsApp Inquiry Action ---
  window.openWhatsAppInquiry = (serviceName, customNote = '') => {
    let message = `Hello City Copiers,\nI am visiting your website and would like to inquire about: *${serviceName}*.`;
    if (customNote) {
      message += `\n\nDetails: ${customNote}`;
    }
    message += `\nPlease let me know pricing and turnaround time. Thank you!`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${CONFIG.primaryWhatsApp}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  // --- Interactive Form to WhatsApp Submission ---
  const initForms = () => {
    const quoteForms = document.querySelectorAll('.js-quote-form');
    quoteForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('[name="name"]')?.value.trim() || 'Valued Customer';
        const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
        const service = form.querySelector('[name="service"]')?.value || 'General Inquiry';
        const quantity = form.querySelector('[name="quantity"]')?.value.trim() || 'Not specified';
        const message = form.querySelector('[name="message"]')?.value.trim() || '';

        let formattedMsg = `*--- NEW INQUIRY: CITY COPIERS ---*\n`;
        formattedMsg += `👤 *Customer:* ${name}\n`;
        if (phone) formattedMsg += `📞 *Phone:* ${phone}\n`;
        formattedMsg += `📄 *Service Required:* ${service}\n`;
        formattedMsg += `🔢 *Approx. Quantity / Pages:* ${quantity}\n`;
        if (message) formattedMsg += `📝 *Notes / Specs:* ${message}\n`;
        formattedMsg += `\nLooking forward to your quick quote!`;

        const waUrl = `https://wa.me/${CONFIG.primaryWhatsApp}?text=${encodeURIComponent(formattedMsg)}`;
        window.open(waUrl, '_blank');
      });
    });
  };

  // --- Active Nav Link Highlighting ---
  const highlightActiveLink = () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Initialize on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initForms();
    highlightActiveLink();
  });
})();
