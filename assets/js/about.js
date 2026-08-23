function setActive(section, navigate = true) {
  const activeClass = 'active';

  // Remove the active class from all nav-toggles
  document.querySelectorAll('.nav-toggle').forEach(el => el.classList.remove(activeClass));

  // Add the active class to the clicked nav-toggle
  const activeToggle = document.querySelector(`.nav-toggle.${section}`);
  const navPill = document.querySelector('.nav-pill');
  if (activeToggle) {
    activeToggle.classList.add(activeClass);
  }

  // Show and position the nav-indicator-pill
  const indicatorPill = document.querySelector('.nav-indicator-pill');
  if (indicatorPill && activeToggle && navPill) {
    indicatorPill.style.display = 'block';
    const toggleRect = activeToggle.getBoundingClientRect();
    const parentRect = navPill.getBoundingClientRect();

    indicatorPill.style.width = `${toggleRect.width}px`;
    indicatorPill.style.left = `${toggleRect.left - parentRect.left}px`;
    indicatorPill.style.top = `${toggleRect.top - parentRect.top}px`;
  }

  // Show and position the nav-indicator-glow
  const indicatorGlow = document.querySelector('.nav-indicator-glow');
  if (indicatorGlow && activeToggle && navPill) {
    indicatorGlow.style.display = 'block';
    const toggleRect = activeToggle.getBoundingClientRect();
    const parentRect = navPill.getBoundingClientRect();

    indicatorGlow.style.left = `${toggleRect.left - parentRect.left + toggleRect.width / 2 - indicatorGlow.offsetWidth / 2}px`;
    indicatorGlow.style.top = `${toggleRect.top - parentRect.top - 6}px`;
  }

  if (navigate) {
    if (section === 'project') {
      window.location.href = 'projects.html';
    } else if (section === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'resume') {
      window.open('assets/docs/Pallavi_s_Resume.pdf', '_blank');
    }
  }
}

// Mobile navigation handler
const menuButton = document.querySelector('.nav-menu-button');
const mobileMenu = document.querySelector('.mobile-popup-menu');
const contactIcon = document.querySelector('.icon-contact');
const contactCloseIcon = document.querySelector('.icon-contact-close');

function closeMobileMenu() {
  if (!mobileMenu) return;
  mobileMenu.classList.remove('show');
  if (menuButton) menuButton.classList.remove('active');
  if (contactIcon) {
    contactIcon.style.opacity = '1';
    contactIcon.style.transform = 'rotate(0deg)';
  }
  if (contactCloseIcon) {
    contactCloseIcon.style.opacity = '0';
    contactCloseIcon.style.transform = 'rotate(90deg)';
  }
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    menuButton.classList.toggle('active');

    if (contactIcon && contactCloseIcon) {
      if (contactIcon.style.opacity === '0') {
        contactIcon.style.opacity = '1';
        contactIcon.style.transform = 'rotate(0deg)';
        contactCloseIcon.style.opacity = '0';
        contactCloseIcon.style.transform = 'rotate(90deg)';
      } else {
        contactIcon.style.opacity = '0';
        contactIcon.style.transform = 'rotate(90deg)';
        contactCloseIcon.style.opacity = '1';
        contactCloseIcon.style.transform = 'rotate(0deg)';
      }
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
      closeMobileMenu();
    }
  });

  // Close menu on ESC key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

// Safe smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#' && targetId.length > 1) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        closeMobileMenu();
      }
    }
  });
});

const logoEl = document.getElementById('logo');
if (logoEl) {
  logoEl.addEventListener('click', function() {
    window.location.href = 'home.html';
  });
}

// Helper to check element in viewport
function isElementInView(el) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
}

// Footer elements reveal on scroll
function revealOnScroll() {
  const footerCols = document.querySelectorAll('.footer-col');
  const footerHeadings = document.querySelectorAll('.footer-heading');
  const footerTop = document.querySelector('.footer-top');
  const footerBottom = document.querySelector('.footer-bottom');
  const nameBanner = document.querySelector('.footer-name-banner');

  footerCols.forEach(col => {
    if (isElementInView(col)) col.classList.add('visible');
  });

  footerHeadings.forEach(heading => {
    if (isElementInView(heading)) heading.classList.add('visible');
  });

  if (isElementInView(footerTop) && footerTop) footerTop.classList.add('visible');
  if (isElementInView(footerBottom) && footerBottom) footerBottom.classList.add('visible');
  if (isElementInView(nameBanner) && nameBanner) nameBanner.classList.add('visible');
}

window.addEventListener('scroll', revealOnScroll, { passive: true });

// Initialize active state on About page load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    setActive('about', false);
  }, 100);
  revealOnScroll();
});
window.addEventListener('load', () => {
  setActive('about', false);
  revealOnScroll();
});
window.addEventListener('resize', () => {
  setActive('about', false);
});
