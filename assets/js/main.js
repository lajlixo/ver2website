  // Fade out content transition between Main and About
  document.addEventListener('DOMContentLoaded', function() {
    var content = document.querySelector('.site-content');
    if (content) {
      content.classList.add('fade-in');
      setTimeout(function() {
        content.classList.remove('fade-in');
      }, 320);
    }
    var navLinks = document.querySelectorAll('.top__link[href]');
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      // Only handle Main/About links
      if (href && (href.indexOf('index.html') !== -1 || href.indexOf('about.html') !== -1)) {
        link.addEventListener('click', function(e) {
          // If already on this page or link is active, do nothing
          if (link.classList.contains('active') || window.location.pathname.endsWith(href)) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          // Save theme to sessionStorage for instant restore on next page
          var theme = localStorage.getItem('site-theme');
          if (theme) sessionStorage.setItem('pending-theme', theme);
          if (content) {
            content.classList.add('fade-out');
            setTimeout(function() {
              window.location.href = href;
            }, 320);
          } else {
            window.location.href = href;
          }
        });
      }
    });
  });
  // Scroll to contact form from modal
  const gotoContact = document.getElementById('gotoContact');
  if (gotoContact && contactModal) {
    gotoContact.addEventListener('click', function() {
      contactModal.classList.remove('show');
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
// Theme toggle logic
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  // Set initial icon and theme from localStorage
  function setThemeIcon() {
    if (body.classList.contains('scheme-midnight')) {
      themeToggle.textContent = '🌙';
    } else {
      themeToggle.textContent = '☀️';
    }
  }
  function applySavedTheme() {
    const saved = localStorage.getItem('site-theme');
    if (saved === 'scheme-midnight') {
      body.classList.remove('scheme-daylight');
      body.classList.add('scheme-midnight');
    } else if (saved === 'scheme-daylight') {
      body.classList.remove('scheme-midnight');
      body.classList.add('scheme-daylight');
    }
    setThemeIcon();
  }
  applySavedTheme();
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (body.classList.contains('scheme-midnight')) {
        body.classList.remove('scheme-midnight');
        body.classList.add('scheme-daylight');
        localStorage.setItem('site-theme', 'scheme-daylight');
      } else {
        body.classList.remove('scheme-daylight');
        body.classList.add('scheme-midnight');
        localStorage.setItem('site-theme', 'scheme-midnight');
      }
      setThemeIcon();
    });
  }
});
// Modern JS for contact form notification and AJAX submit
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const notification = document.getElementById('contactNotification');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (notification) {
          if (response.ok) {
            form.reset();
            notification.textContent = 'Message sent successfully!';
          } else {
            notification.textContent = 'There was a problem sending your message.';
          }
          notification.classList.add('show');
          setTimeout(() => {
            notification.classList.remove('show');
          }, 3000);
        }
      })
      .catch(() => {
        if (notification) {
          notification.textContent = 'There was a problem sending your message.';
          notification.classList.add('show');
          setTimeout(() => {
            notification.classList.remove('show');
          }, 3000);
        }
      });
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const sliderGroups = document.querySelectorAll('.slider-group');

  sliderGroups.forEach((group) => {
    const sliderEl = group.querySelector('.siema');

    const siema = new Siema({
      selector: sliderEl,
      duration: 400,
      easing: 'ease-out',
      perPage: 1,
      loop: true
    });

    // No autoplay 🎉

    // Buttons scoped to this group
    const prevBtn = group.querySelector('.prev');
    const nextBtn = group.querySelector('.next');

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => siema.prev());
      nextBtn.addEventListener('click', () => siema.next());
    }
  });

  // Modal logic with smooth transition and theme
  const contactBtn = document.getElementById('contactBtn');
  const contactModal = document.getElementById('contactModal');
  const closeModal = document.getElementById('closeModal');

  if (contactBtn && contactModal && closeModal) {
    contactModal.classList.remove('show'); // Ensure hidden on load
    contactBtn.addEventListener('click', () => {
      contactModal.classList.add('show');
    });
    closeModal.addEventListener('click', () => {
      contactModal.classList.remove('show');
    });
    window.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('show');
      }
    });
  }
});