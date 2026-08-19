function setActive(section) {
  const activeClass = 'active';

  // Remove the active class from all nav-toggles
  document.querySelectorAll('.nav-toggle').forEach(el => el.classList.remove(activeClass));

  // Add the active class to the clicked nav-toggle
  const activeToggle = document.querySelector(`.nav-toggle.${section}`);
  if (activeToggle) {
    activeToggle.classList.add(activeClass);
  }

  // Show and position the nav-indicator-pill
  const indicatorPill = document.querySelector('.nav-indicator-pill');
  if (indicatorPill && activeToggle) {
    indicatorPill.style.display = 'block';
    const toggleRect = activeToggle.getBoundingClientRect();
    const parentRect = activeToggle.parentElement.getBoundingClientRect();

    indicatorPill.style.width = `${toggleRect.width}px`;
    indicatorPill.style.left = `${toggleRect.left - parentRect.left}px`;
    indicatorPill.style.top = `${toggleRect.top - parentRect.top}px`;
  }

  // Show and position the nav-indicator-glow
  const indicatorGlow = document.querySelector('.nav-indicator-glow');
  if (indicatorGlow && activeToggle) {
    indicatorGlow.style.display = 'block';
    const toggleRect = activeToggle.getBoundingClientRect();
    const parentRect = activeToggle.parentElement.getBoundingClientRect();

    indicatorGlow.style.left = `${toggleRect.left - parentRect.left + toggleRect.width / 2 - indicatorGlow.offsetWidth / 2}px`;
    indicatorGlow.style.top = `${toggleRect.top - parentRect.top - 6}px`; // Adjust glow position
  }

  if (section === 'project') {
    window.location.href = '/projects.html';
  } else if (section === 'about') {
    window.location.href = '/about.html';
  } else if (section === 'resume') {
     window.open('/Pallavi_s_Resume.pdf', '_blank');
  }
}

// Mobile navigation — single consolidated handler
const menuButton = document.querySelector('.nav-menu-button');
const mobileMenu = document.querySelector('.mobile-popup-menu');
const contactIcon = document.querySelector('.icon-contact');
const contactCloseIcon = document.querySelector('.icon-contact-close');

function closeMobileMenu() {
  mobileMenu.classList.remove('show');
  menuButton.classList.remove('active');
  contactIcon.style.opacity = '1';
  contactIcon.style.transform = 'rotate(0deg)';
  contactCloseIcon.style.opacity = '0';
  contactCloseIcon.style.transform = 'rotate(90deg)';
}

menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
  menuButton.classList.toggle('active');

  // Toggle icon swap
  if (contactIcon.style.opacity === '1') {
    contactIcon.style.opacity = '0';
    contactIcon.style.transform = 'rotate(90deg)';
    contactCloseIcon.style.opacity = '1';
    contactCloseIcon.style.transform = 'rotate(0deg)';
  } else {
    contactIcon.style.opacity = '1';
    contactIcon.style.transform = 'rotate(0deg)';
    contactCloseIcon.style.opacity = '0';
    contactCloseIcon.style.transform = 'rotate(90deg)';
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.getElementById('logo').addEventListener('click', function() {
  window.location.href = "/index.html"; // Redirect to greet.html
});

 
