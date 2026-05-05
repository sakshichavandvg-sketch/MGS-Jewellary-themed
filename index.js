/* ===== INDEX.JS — Homepage Logic ===== */

// Dynamic product list: will be loaded from server API at runtime
let products = [];

async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    // Normalize to fields expected by the UI (provide sensible fallbacks)
    products = data.map(p => ({
      id: p._id || p.id,
      name: p.name || 'Untitled',
      category: p.category || 'uncategorized',
      tag: p.tag || '',
      image: (p.images && p.images[0]) || p.image || 'assets/placeholder.png',
      images: p.images || (p.image ? [p.image] : []),
      hallmark: p.hallmark || 'HUID',
      purity: p.purity || '',
      weight: p.weight || '',
      priceLabel: (p.price ? '₹' + p.price.toLocaleString('en-IN') : (p.priceLabel || 'Inquire for Price')),
      desc: p.description || p.desc || ''
    }));
    renderProducts(activeFilter);
  } catch (e) {
    console.error('Error loading products', e);
  }
}

let activeFilter = 'all';

function getWhatsAppMsg(productName) {
  return `https://wa.me/919876543210?text=Hello%20MGS%20Jewellery!%20I%27m%20interested%20in%20the%20*${encodeURIComponent(productName)}*.%20Please%20share%20the%20current%20price%20and%20availability.`;
}

function renderProducts(filter = 'all') {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter || p.tag === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card animate-in" data-id="${p.id}">
      <div class="product-card-img image-frame">
        <img src="${p.image}" alt="${p.name} — ${p.hallmark} Hallmark, MGS Jewellery Davanagere" loading="lazy">
        <div class="product-card-overlay">
          <a href="${getWhatsAppMsg(p.name)}" target="_blank" class="btn btn-whatsapp" style="font-size:0.65rem;padding:0.5rem 0.8rem">
            ✦ Inquire on WhatsApp
          </a>
        </div>
      </div>
      <div class="product-card-info">
        <div class="pc-hallmark-row">
          <span class="hallmark-badge">${p.hallmark} Hallmark</span>
          <span class="hallmark-badge">${p.purity}</span>
        </div>
        <h3>${p.name}</h3>
        <div class="pc-meta">${p.weight} · ${p.desc.substring(0, 42)}…</div>
        <div class="product-card-actions">
          <span class="pc-price">${p.priceLabel}</span>
          <a href="${getWhatsAppMsg(p.name)}" target="_blank" class="btn btn-whatsapp" id="wa-${p.id}">✦ WhatsApp</a>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe new elements
  grid.querySelectorAll('.animate-in').forEach(el => animObserver.observe(el));
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter);
  });
});

// Initial load
loadProducts();

// ────────────────────────────────────────
// HERO THUMBNAIL SWITCHER
// ────────────────────────────────────────
const heroImg = document.getElementById('hero-product-img');
const floatTagName = document.querySelector('.tag-name');
const floatTagPurity = document.querySelector('.tag-purity');

document.querySelectorAll('.hero-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    document.querySelectorAll('.hero-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    if (heroImg) {
      heroImg.style.opacity = '0';
      heroImg.style.transform = 'scale(1.05)';
      setTimeout(() => {
        heroImg.src = thumb.dataset.img;
        heroImg.alt = thumb.dataset.name + ' — HUID/BIS Hallmark, MGS Jewellery';
        heroImg.style.opacity = '1';
        heroImg.style.transform = 'scale(1)';
      }, 300);
    }
    if (floatTagName) floatTagName.textContent = thumb.dataset.name;
    if (floatTagPurity) floatTagPurity.textContent = thumb.dataset.purity;
  });
});

if (heroImg) {
  heroImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// ────────────────────────────────────────
// OFFER COUNTDOWN TIMER
// ────────────────────────────────────────
const offerEndDate = new Date();
offerEndDate.setDate(offerEndDate.getDate() + 12);
offerEndDate.setHours(23, 59, 59);

function updateCountdown() {
  const now = new Date();
  const diff = offerEndDate - now;
  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2, '0');

  const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = pad(val); };
  el('cd-days', days);
  el('cd-hours', hours);
  el('cd-mins', mins);
  el('cd-secs', secs);
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ────────────────────────────────────────
// MINI GOLD CALCULATOR
// ────────────────────────────────────────
const goldRates = { 22: 6842, 24: 7490, 18: 5620 }; // per gram

function calcMiniGold() {
  const weight = parseFloat(document.getElementById('mini-weight')?.value) || 0;
  const purity = parseInt(document.getElementById('mini-purity')?.value) || 22;
  const rate = goldRates[purity] || goldRates[22];
  const wastage = 0.0799;
  const total = weight * rate * (1 + wastage);
  const resultEl = document.getElementById('mini-result');
  if (resultEl) {
    resultEl.textContent = '₹' + Math.round(total).toLocaleString('en-IN');
  }
}

document.getElementById('mini-weight')?.addEventListener('input', calcMiniGold);
document.getElementById('mini-purity')?.addEventListener('change', calcMiniGold);
calcMiniGold();

// ────────────────────────────────────────
// WHATSAPP LIST BUILDER FORM
// ────────────────────────────────────────
function handleListBuilderSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('lb-name')?.value;
  const phone = document.getElementById('lb-phone')?.value;
  if (!name || !phone) return false;
  const msg = `Hello MGS Jewellery! I'm ${name} and I'd like to join your exclusive offers WhatsApp list. My number is ${phone}.`;
  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('✦ Redirecting to WhatsApp — you\'re joining the VIP list!');
  document.getElementById('lb-form')?.reset();
  return false;
}

// ────────────────────────────────────────
// BESPOKE FORM SUBMIT
// ────────────────────────────────────────
function handleBespokeSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('bespoke-name')?.value;
  const phone = document.getElementById('bespoke-phone')?.value;
  const type = document.getElementById('bespoke-type')?.value;
  const budget = document.getElementById('bespoke-budget')?.value;
  const desc = document.getElementById('bespoke-desc')?.value;

  const msg = `Hello MGS Jewellery! I'd like to request a custom design.\n\n*Name:* ${name}\n*Jewelry Type:* ${type}\n*Budget:* ${budget || 'Not specified'}\n*Design Vision:* ${desc}`;
  window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
  showToast('✦ Custom design request sent! Our Goldsmith will contact you shortly.');
  document.getElementById('bespoke-form')?.reset();
  return false;
}
