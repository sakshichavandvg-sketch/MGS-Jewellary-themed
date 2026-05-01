/* ===== GLOBAL.JS — Shared Logic Across All Pages ===== */

// ────────────────────────────────────────
// NAV SCROLL BEHAVIOR
// ────────────────────────────────────────
const navbar = document.getElementById('site-navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ────────────────────────────────────────
// MOBILE MENU
// ────────────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');
const menuClose = document.getElementById('menu-close');

function openMenu() {
  mobileMenu?.classList.add('open');
  mobileOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburgerBtn?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);
mobileOverlay?.addEventListener('click', closeMenu);

// ────────────────────────────────────────
// SCROLL ANIMATION OBSERVER
// ────────────────────────────────────────
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.animate-in').forEach(el => animObserver.observe(el));

// ────────────────────────────────────────
// LIVE GOLD RATE TICKER (simulated with slight variation)
// ────────────────────────────────────────
const BASE_RATES = {
  gold22: 68420,  // per 10g in paise * 10 = rupees * 100
  gold24: 74900,
  silver: 89200
};

function formatINR(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}

function updateTicker() {
  const vary = (base, pct = 0.002) => {
    return Math.round(base * (1 + (Math.random() - 0.5) * pct));
  };
  const g22 = vary(BASE_RATES.gold22);
  const g24 = vary(BASE_RATES.gold24);
  const sil = vary(BASE_RATES.silver, 0.004);

  const g22El = document.getElementById('gold22');
  const g24El = document.getElementById('gold24');
  const silvEl = document.getElementById('silver');

  if (g22El) g22El.textContent = formatINR(g22);
  if (g24El) g24El.textContent = formatINR(g24);
  if (silvEl) silvEl.textContent = formatINR(sil);
}

setInterval(updateTicker, 5000);

// ────────────────────────────────────────
// TOAST NOTIFICATION
// ────────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.mgs-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'mgs-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${type === 'success' ? 'rgba(26,26,26,0.95)' : 'rgba(50,0,0,0.95)'};
    border: 1px solid ${type === 'success' ? 'var(--gold)' : '#e74c3c'};
    color: ${type === 'success' ? 'var(--gold-bright)' : '#e74c3c'};
    padding: 1rem 1.5rem;
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    z-index: 9999;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5);
    animation: slideInToast 0.4s ease;
    max-width: 350px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `@keyframes slideInToast { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`;
  document.head.appendChild(style);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
