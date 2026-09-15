/* ============================================================
   XPRESS POWDER COATING — Main JavaScript
   No jQuery dependency — Vanilla JS
   ============================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------
     MOBILE NAVIGATION
  -------------------------------------------------------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');

  if (navToggle && navMain) {
    navToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      navMain.classList.toggle('open');
      document.body.style.overflow = navMain.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navMain.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMain.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (navMain.classList.contains('open') && !navMain.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMain.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* --------------------------------------------------------
     STICKY HEADER
  -------------------------------------------------------- */
  const header = document.querySelector('.site-header');

  function handleStickyHeader() {
    if (!header) return;
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleStickyHeader, { passive: true });
  handleStickyHeader();

  /* --------------------------------------------------------
     ACTIVE NAV LINK
  -------------------------------------------------------- */
  function setActiveNavLink() {
    var current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-main__link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === current || (current === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  setActiveNavLink();

  /* --------------------------------------------------------
     SCROLL ANIMATIONS
  -------------------------------------------------------- */
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      elements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      elements.forEach(function (el) {
        el.classList.add('animated');
      });
    }
  }

  initScrollAnimations();

  /* --------------------------------------------------------
     TIMELINE & STAT CARD ANIMATIONS
  -------------------------------------------------------- */
  function initAboutAnimations() {
    var timelineItems = document.querySelectorAll('.timeline-item');
    var statCards = document.querySelectorAll('.stat-card--animated');
    
    if (!timelineItems.length && !statCards.length) return;
    
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
            setTimeout(function () {
              entry.target.classList.add('animate-in');
            }, delay * 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
      
      timelineItems.forEach(function (el) { observer.observe(el); });
      statCards.forEach(function (el) { observer.observe(el); });
    } else {
      timelineItems.forEach(function (el) { el.classList.add('animate-in'); });
      statCards.forEach(function (el) { el.classList.add('animate-in'); });
    }
  }
  
  initAboutAnimations();

  /* --------------------------------------------------------
     DYNAMIC FOOTER YEAR
  -------------------------------------------------------- */
  function setFooterYear() {
    var yearSpans = document.querySelectorAll('.footer-year');
    var currentYear = new Date().getFullYear();
    yearSpans.forEach(function (span) {
      span.textContent = currentYear;
    });
  }
  
  setFooterYear();

  /* --------------------------------------------------------
     FAQ ACCORDION
  -------------------------------------------------------- */
  document.querySelectorAll('.faq-item__question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = this.closest('.faq-item');
      var isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (faq) {
        faq.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------
     BACK TO TOP
  -------------------------------------------------------- */
  var backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------
     CONTACT FORM
  -------------------------------------------------------- */
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var form = this;
      var status = form.querySelector('.form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      var formData = new FormData(form);

      // Simple validation
      var name = formData.get('name');
      var email = formData.get('email');
      var phone = formData.get('phone');
      var message = formData.get('message');

      if (!name || !email || !phone || !message) {
        status.className = 'form-status form-status--error';
        status.textContent = 'Please fill in all required fields.';
        return;
      }

      // Email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        status.className = 'form-status form-status--error';
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      // Disable button
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Send via mail.php (existing backend)
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'mail.php', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      var params = 'name=' + encodeURIComponent(name) +
        '&email=' + encodeURIComponent(email) +
        '&phone=' + encodeURIComponent(phone) +
        '&message=' + encodeURIComponent(message) +
        '&select=' + encodeURIComponent(formData.get('select') || '');

      xhr.onload = function () {
        if (xhr.status === 200) {
          status.className = 'form-status form-status--success';
          status.textContent = 'Thank you for your enquiry. We will respond shortly.';
          form.reset();
        } else {
          status.className = 'form-status form-status--error';
          status.textContent = 'An error occurred. Please try again or call us directly.';
        }
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Enquiry';
      };

      xhr.onerror = function () {
        status.className = 'form-status form-status--error';
        status.textContent = 'An error occurred. Please try again or call us directly.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Enquiry';
      };

      xhr.send(params);
    });
  }

  /* --------------------------------------------------------
     SMOOTH SCROLL FOR ANCHOR LINKS
  -------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
