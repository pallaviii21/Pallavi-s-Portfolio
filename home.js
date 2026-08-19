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
  
   
//   JS FOR INFOPAGE

// Function to animate elements when they come into the viewport using IntersectionObserver
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animation is applied
            }
        });
    });

    // Select elements to animate
    const elementsToAnimate = document.querySelectorAll('.container-hero-image-landing.info-hero-landing, .homepage-text-section-landing');
    elementsToAnimate.forEach((element) => {
        observer.observe(element);
    });
}

// Add the animation class on page load or scroll
window.addEventListener('load', setupScrollAnimations);




// =========================================
// Image Reveal On Hover — cursor-following
// =========================================
(function() {
    const reveal = document.querySelector('.proj-reveal');
    const revealImg = document.querySelector('.proj-reveal__img');
    const items = document.querySelectorAll('.proj-item');
    if (!reveal || !revealImg || !items.length) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let rafId = null;
    const ease = 0.12;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
        currentX = lerp(currentX, mouseX, ease);
        currentY = lerp(currentY, mouseY, ease);
        reveal.style.left = currentX + 'px';
        reveal.style.top = currentY + 'px';
        rafId = requestAnimationFrame(animate);
    }

    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imgSrc = item.getAttribute('data-img');
            if (imgSrc) {
                revealImg.src = imgSrc;
                reveal.classList.add('is-visible');
                if (!rafId) animate();
            }
        });

        item.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        item.addEventListener('mouseleave', () => {
            reveal.classList.remove('is-visible');
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        });
    });
})();

document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Check if the target is within the same page (starts with '#')
        if (targetId.startsWith('#')) {
            e.preventDefault();
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Staggered Animation Delays for Cards
const cards = document.querySelectorAll('.project-card.modern');
cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Intersection Observer for View More Button
const viewMoreButton = document.querySelector('.btn-container.modern');
if (viewMoreButton) {
    const buttonObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                viewMoreButton.classList.add('visible');
            } else {
                viewMoreButton.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });
    buttonObserver.observe(viewMoreButton);
}

// Select the button and the transition overlay
const button = document.querySelector('.btn.btn-normal.modern');
const overlay = document.querySelector('.transition-overlay');

// Trigger transition effect on button click
button.addEventListener('click', (e) => {
    e.preventDefault();  // Prevent the default anchor behavior
    
    // Activate the overlay transition
    overlay.classList.add('active');
    
    // Add body transition for smooth upward effect
    document.body.classList.add('transitioning');
    
    // Redirect after the transition effect completes
    setTimeout(() => {
        window.location.href = '/projects.html';
    }, 800); // Match CSS transition time (0.8s)
});


// JS FOR TECHSTACK

document.addEventListener("DOMContentLoaded", () => {
    const techStackWrapper = document.querySelector('.tech-stack-wrapper-language');

    const onScroll = () => {
        const wrapperPosition = techStackWrapper.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        // Check if the element is in the viewport
        if (wrapperPosition < screenHeight * 0.8) { // Adjust threshold as needed
            techStackWrapper.classList.add('scroll-visible');
        }
    };

    // Listen for scroll events
    window.addEventListener("scroll", onScroll);

    // Trigger on page load
    onScroll();
});



// Function to check if an element is in the viewport
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}



// Event listener to trigger on scroll
window.addEventListener('scroll', revealOnScroll);

// Initial check in case elements are already in view on page load
window.addEventListener('load', revealOnScroll);


// JS FOR FOOTER SECTION

// Function to check if an element is in the viewport
function isElementInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Function to apply the 'visible' class to elements in the viewport
function revealOnScroll() {
    const footerCols = document.querySelectorAll('.footer-col');
    const footerHeadings = document.querySelectorAll('.footer-heading');
    const footerTop = document.querySelector('.footer-top');
    const footerBottom = document.querySelector('.footer-bottom');
    const nameBanner = document.querySelector('.footer-name-banner');

    footerCols.forEach((col) => {
        if (isElementInView(col)) {
            col.classList.add('visible');
        }
    });

    footerHeadings.forEach((heading) => {
        if (isElementInView(heading)) {
            heading.classList.add('visible');
        }
    });

    // Check visibility for footer-top, footer-bottom, and name-banner
    if (isElementInView(footerTop)) {
        footerTop.classList.add('visible');
    }

    if (isElementInView(footerBottom)) {
        footerBottom.classList.add('visible');
    }

    if (isElementInView(nameBanner)) {
        nameBanner.classList.add('visible');
    }
}

// Event listener to trigger on scroll
window.addEventListener('scroll', revealOnScroll);

// Initial check in case elements are already in view on page load
window.addEventListener('load', revealOnScroll);
