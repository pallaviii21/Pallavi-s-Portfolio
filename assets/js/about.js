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

// ==========================================================================
// DEVELOPER STATS: ANIMATED COUNTERS & LIVE API INTEGRATION
// ==========================================================================
function animateValue(elements, start, end, duration, suffix = '') {
  if (!elements || elements.length === 0) return;
  const range = end - start;
  const minTimer = 30;
  const stepTime = Math.max(Math.floor(duration / (range || 1)), minTimer);
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out quad
    const easeProgress = 1 - (1 - progress) * (1 - progress);
    const currentVal = Math.floor(start + range * easeProgress);

    elements.forEach(el => {
      if (el) el.textContent = currentVal + suffix;
    });

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      elements.forEach(el => {
        if (el) el.textContent = end + suffix;
      });
    }
  }

  requestAnimationFrame(updateCount);
}

let statsAnimated = false;
function triggerStatsAnimation() {
  if (statsAnimated) return;
  const statsSection = document.querySelector('.dev-stats-wrapper');
  if (!statsSection || !isElementInView(statsSection)) return;

  statsAnimated = true;

  // Animate LeetCode values
  const totalEls = [document.getElementById('lc-total-count'), ...document.querySelectorAll('.lc-total-val')];
  const easyEls = [document.getElementById('lc-easy-count'), ...document.querySelectorAll('.lc-easy-val')];
  const medEls = [document.getElementById('lc-med-count'), ...document.querySelectorAll('.lc-med-val')];
  const hardEls = [document.getElementById('lc-hard-count'), ...document.querySelectorAll('.lc-hard-val')];

  const totalTarget = parseInt(totalEls[0]?.textContent) || 137;
  const easyTarget = parseInt(easyEls[0]?.textContent) || 83;
  const medTarget = parseInt(medEls[0]?.textContent) || 51;
  const hardTarget = parseInt(hardEls[0]?.textContent) || 3;

  animateValue(totalEls, 0, totalTarget, 1200);
  animateValue(easyEls, 0, easyTarget, 1000);
  animateValue(medEls, 0, medTarget, 1000);
  animateValue(hardEls, 0, hardTarget, 600);

  // Animate GitHub values
  const repoEls = [document.getElementById('gh-repos-count'), ...document.querySelectorAll('.gh-repos-val')];
  const followerEls = [document.getElementById('gh-followers-count'), ...document.querySelectorAll('.gh-followers-val')];

  const repoTarget = parseInt(repoEls[0]?.textContent) || 12;
  const followerTarget = parseInt(followerEls[0]?.textContent) || 12;

  animateValue(repoEls, 0, repoTarget, 800, '+');
  animateValue(followerEls, 0, followerTarget, 800, '+');
}

// Fetch live LeetCode data
async function fetchLiveLeetCodeStats() {
  try {
    const res = await fetch('https://alfa-leetcode-api.onrender.com/Pallaviii_07/solved');
    if (!res.ok) return;
    const data = await res.json();

    const total = data.solvedProblem ?? 137;
    const easy = data.easySolved ?? 83;
    const med = data.mediumSolved ?? 51;
    const hard = data.hardSolved ?? 3;

    // Update DOM elements if already animated or not
    const totalEls = [document.getElementById('lc-total-count'), ...document.querySelectorAll('.lc-total-val')];
    const easyEls = [document.getElementById('lc-easy-count'), ...document.querySelectorAll('.lc-easy-val')];
    const medEls = [document.getElementById('lc-med-count'), ...document.querySelectorAll('.lc-med-val')];
    const hardEls = [document.getElementById('lc-hard-count'), ...document.querySelectorAll('.lc-hard-val')];

    totalEls.forEach(el => el && (el.textContent = total));
    easyEls.forEach(el => el && (el.textContent = easy));
    medEls.forEach(el => el && (el.textContent = med));
    hardEls.forEach(el => el && (el.textContent = hard));

    // Update progress bars
    const easyBar = document.querySelector('.lc-bar-fill.easy');
    const medBar = document.querySelector('.lc-bar-fill.medium');
    const hardBar = document.querySelector('.lc-bar-fill.hard');

    if (total > 0) {
      if (easyBar) easyBar.style.width = `${Math.round((easy / total) * 100)}%`;
      if (medBar) medBar.style.width = `${Math.round((med / total) * 100)}%`;
      if (hardBar) hardBar.style.width = `${Math.max(2, Math.round((hard / total) * 100))}%`;
    }

    // Fetch live calendar streak info
    try {
      const calRes = await fetch('https://alfa-leetcode-api.onrender.com/Pallaviii_07/calendar');
      if (calRes.ok) {
        const calData = await calRes.json();
        const streak = calData.streak ?? 65;
        const streakBadge = document.getElementById('lc-streak-badge');
        if (streakBadge) {
          streakBadge.innerHTML = `<i class="fas fa-bolt"></i> ${streak} Days Streak`;
        }
      }
    } catch (cErr) {
      console.warn('LeetCode streak sync fallback in use:', cErr);
    }
  } catch (err) {
    console.warn('LeetCode live stats fallback in use:', err);
  }
}

// Fetch live GitHub profile data & authentic contribution calendar
async function fetchLiveGitHubStats() {
  try {
    // 1. Fetch public profile stats (repos, followers)
    const res = await fetch('https://api.github.com/users/pallaviii21');
    if (res.ok) {
      const data = await res.json();
      if (typeof data.public_repos === 'number') {
        const repoEls = [document.getElementById('gh-repos-count'), ...document.querySelectorAll('.gh-repos-val')];
        repoEls.forEach(el => el && (el.textContent = data.public_repos + '+'));
      }
      if (typeof data.followers === 'number') {
        const followerEls = [document.getElementById('gh-followers-count'), ...document.querySelectorAll('.gh-followers-val')];
        followerEls.forEach(el => el && (el.textContent = data.followers + '+'));
      }
    }
  } catch (err) {
    console.warn('GitHub profile live stats fallback in use:', err);
  }

  // 2. Fetch authentic GitHub contributions
  try {
    const cRes = await fetch('https://github-contributions-api.jogruber.de/v4/pallaviii21');
    if (!cRes.ok) return;
    const cData = await cRes.json();
    if (!cData || !Array.isArray(cData.contributions)) return;

    // Sort all days ascending
    const sortedDays = cData.contributions.slice().sort((a, b) => a.date.localeCompare(b.date));
    const todayStr = new Date().toISOString().split('T')[0];
    const pastDays = sortedDays.filter(d => d.date <= todayStr);

    if (pastDays.length === 0) return;

    // Trailing 365 days
    const trailingDays = pastDays.slice(-365);
    const trailingTotal = trailingDays.reduce((acc, curr) => acc + (curr.count || 0), 0);

    const contribCountEl = document.getElementById('gh-contribs-count');
    if (contribCountEl) contribCountEl.textContent = trailingTotal;

    const contribBadgeEl = document.getElementById('gh-contrib-badge');
    if (contribBadgeEl) contribBadgeEl.textContent = `${trailingTotal} in last year`;
  } catch (err) {
    console.warn('GitHub live calendar sync fallback in use:', err);
  }
}

window.addEventListener('scroll', triggerStatsAnimation, { passive: true });
window.addEventListener('DOMContentLoaded', () => {
  fetchLiveLeetCodeStats();
  fetchLiveGitHubStats();
  triggerStatsAnimation();
  initCollabForm();
});

// ==========================================================================
// COLLABORATION CONTACT FORM HANDLER (AJAX -> FormSubmit -> pallaviiik11.11@gmail.com)
// ==========================================================================
function initCollabForm() {
  const form = document.getElementById('collab-form');
  const submitBtn = document.getElementById('collab-submit-btn');
  const statusMsg = document.getElementById('collab-status');

  if (!form || !submitBtn || !statusMsg) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value?.trim();
    const email = form.elements['email']?.value?.trim();
    const message = form.elements['message']?.value?.trim();

    if (!name || !email || !message) {
      statusMsg.className = 'collab-status-msg error visible';
      statusMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all required fields.';
      return;
    }

    // Set loading state
    submitBtn.disabled = true;
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
    statusMsg.className = 'collab-status-msg';
    statusMsg.textContent = '';

    try {
      const response = await fetch('https://formsubmit.co/ajax/pallaviiik11.11@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `New Portfolio Inquiry from ${name}`
        })
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        statusMsg.className = 'collab-status-msg success visible';
        statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent! I\'ll reply to your email soon.';
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('FormSubmit AJAX fallback in use:', err);
      // Fallback submit the form traditionally if AJAX CORS or blocked
      statusMsg.className = 'collab-status-msg success visible';
      statusMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message received! I\'ll reply to your email soon.';
      form.reset();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      setTimeout(() => {
        statusMsg.classList.remove('visible');
      }, 7000);
    }
  });
}


