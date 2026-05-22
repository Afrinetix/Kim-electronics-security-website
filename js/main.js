/* =================================================================
   KIM ELECTRONICS & SECURITY SOLUTIONS — Main JavaScript
   ================================================================= */

'use strict';

/* ── Navbar scroll behaviour ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
const handleScroll = () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ── Mobile navigation ─────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');
if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.style.display === 'flex';
    navMobile.style.display = isOpen ? 'none' : 'flex';
    navToggle.classList.toggle('open', !isOpen);
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMobile.setAttribute('aria-hidden', String(isOpen));
  });
  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navMobile.style.display = 'none';
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Hero canvas — circuit grid animation ──────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [], animFrame;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createNodes() {
    nodes = [];
    const cols = Math.ceil(W / 80);
    const rows = Math.ceil(H / 80);
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        nodes.push({
          x: c * 80 + (Math.random() - .5) * 40,
          y: r * 80 + (Math.random() - .5) * 40,
          ox: c * 80, oy: r * 80,
          vx: (Math.random() - .5) * .3,
          vy: (Math.random() - .5) * .3,
          pulse: Math.random() * Math.PI * 2,
          bright: Math.random() > .85
        });
      }
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);

    // Update node positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += .02;
      if (Math.abs(n.x - n.ox) > 30) n.vx *= -1;
      if (Math.abs(n.y - n.oy) > 30) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * .12;
          ctx.strokeStyle = `rgba(0, 102, 255, ${alpha})`;
          ctx.lineWidth = .8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const glow = n.bright ? (.5 + .5 * Math.sin(n.pulse)) * .8 : .2;
      const color = n.bright ? `rgba(57,255,20,${glow})` : `rgba(0,102,255,0.25)`;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.bright ? 2 : 1.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (n.bright) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57,255,20,${glow * .15})`;
        ctx.fill();
      }
    });

    animFrame = requestAnimationFrame(draw);
  }

  const ro = new ResizeObserver(() => { resize(); createNodes(); });
  ro.observe(canvas.parentElement);
  resize(); createNodes(); draw(0);
})();

/* ── Scroll-triggered animations (AOS-like) ────────────────────── */
(function () {
  const elements = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.aosDelay || 0;
        setTimeout(() => e.target.classList.add('aos-animate'), parseInt(delay));
        observer.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
})();

/* ── Counter animation ─────────────────────────────────────────── */
(function () {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(c => observer.observe(c));
})();

/* ── FAQ accordion ─────────────────────────────────────────────── */
(function () {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    const toggle = () => {
      const isOpen = item.classList.contains('open');
      // Close all others
      items.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        const ans = i.querySelector('.faq-answer');
        if (ans) ans.setAttribute('aria-hidden', 'true');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.setAttribute('aria-hidden', 'false');
      }
    };
    question.addEventListener('click', toggle);
    question.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
})();

/* ── Gallery filter ────────────────────────────────────────────── */
(function () {
  const buttons = document.querySelectorAll('.filter-btn');
  const items   = document.querySelectorAll('.gallery-item');
  if (!buttons.length || !items.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
        item.style.animation = show ? 'fadeIn .4s ease' : 'none';
      });
    });
  });
})();

/* ── Contact form submission ───────────────────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = document.getElementById('cf-name')?.value.trim();
    const phone   = document.getElementById('cf-phone')?.value.trim();
    const service = document.getElementById('cf-service')?.value;
    const message = document.getElementById('cf-message')?.value.trim();
    if (!name || !phone || !service || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    const btn = form.querySelector('[type=submit]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      const success = document.getElementById('contact-success');
      if (success) {
        success.style.display = 'block';
        setTimeout(() => { success.style.display = 'none'; }, 8000);
      }
      const waMsg = encodeURIComponent(`Hi Kim Electronics!\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${message}`);
      window.open(`https://wa.me/254794013107?text=${waMsg}`, '_blank');
      const emailSubject = encodeURIComponent(`New Inquiry: ${service} from ${name}`);
      const emailBody = encodeURIComponent(`New inquiry from Kim Electronics website:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\n\nMessage:\n${message}`);
      const mailto = document.createElement('a');
      mailto.href = `mailto:afrinetixsolutions@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      mailto.click();
    }, 1400);
  });
})();

/* ── Quote Modal ───────────────────────────────────────────────── */
let selectedServices = [];
let currentStep = 1;

function openQuote(e) {
  if (e) e.preventDefault();
  const modal = document.getElementById('quote-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    resetQuoteForm();
  }
}

function closeQuote() {
  const modal = document.getElementById('quote-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function resetQuoteForm() {
  selectedServices = [];
  quoteGoToStep(1);
  document.querySelectorAll('.service-select-item').forEach(i => i.classList.remove('selected'));
  document.getElementById('quote-success').style.display = 'none';
  ['q-location','q-property','q-details','q-name','q-phone','q-email','q-timing'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = el.tagName === 'SELECT' ? '' : '';
  });
}

function quoteGoToStep(step) {
  currentStep = step;
  document.querySelectorAll('.quote-step').forEach((el, i) => {
    el.classList.toggle('active', i + 1 === step);
  });
  // Update indicators
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`step-dot-${i}`);
    const line = document.getElementById(`step-line-${i}`);
    if (dot) {
      dot.classList.toggle('active', i === step);
      dot.classList.toggle('done',   i < step);
    }
    if (line) line.classList.toggle('done', i < step);
  }
}

function quoteNext(step) {
  if (step === 2 && selectedServices.length === 0) {
    alert('Please select at least one service.');
    return;
  }
  if (step === 3) {
    const location = document.getElementById('q-location')?.value.trim();
    const property = document.getElementById('q-property')?.value;
    if (!location || !property) { alert('Please fill in your location and property type.'); return; }
  }
  quoteGoToStep(step);
}

function quoteBack(step) { quoteGoToStep(step); }

function submitQuote() {
  const name  = document.getElementById('q-name')?.value.trim();
  const phone = document.getElementById('q-phone')?.value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const btn = document.getElementById('quote-submit-btn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';

  const location = document.getElementById('q-location')?.value || '';
  const property = document.getElementById('q-property')?.value || '';
  const details  = document.getElementById('q-details')?.value || '';
  const timing   = document.getElementById('q-timing')?.value || '';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Quote Request';
    document.getElementById('quote-success').style.display = 'block';

    const waMsg = encodeURIComponent(
      `Hello Kim Electronics,\nI'd like a quote.\n\nServices: ${selectedServices.join(', ')}\nLocation: ${location}\nProperty: ${property}\nDetails: ${details}\nTimeline: ${timing}\nName: ${name}\nPhone: ${phone}`
    );
    window.open(`https://wa.me/254794013107?text=${waMsg}`, '_blank');
    const emailSubject = encodeURIComponent(`Quote Request: ${selectedServices.join(', ')} from ${name}`);
    const emailBody = encodeURIComponent(`Quote request from Kim Electronics website:\n\nServices: ${selectedServices.join(', ')}\nLocation: ${location}\nProperty: ${property}\nDetails: ${details}\nTimeline: ${timing}\nName: ${name}\nPhone: ${phone}`);
    const mailto = document.createElement('a');
    mailto.href = `mailto:afrinetixsolutions@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    mailto.click();
  }, 1200);
}

// Service selection toggle
document.querySelectorAll('.service-select-item').forEach(item => {
  item.addEventListener('click', () => {
    const svc = item.dataset.service;
    item.classList.toggle('selected');
    if (item.classList.contains('selected')) {
      if (!selectedServices.includes(svc)) selectedServices.push(svc);
    } else {
      selectedServices = selectedServices.filter(s => s !== svc);
    }
  });
});

// Modal close
document.getElementById('modal-close')?.addEventListener('click', closeQuote);
document.getElementById('modal-backdrop')?.addEventListener('click', closeQuote);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeQuote(); });

// Make openQuote globally accessible (used in href onclick)
window.openQuote = openQuote;
window.quoteNext = quoteNext;
window.quoteBack = quoteBack;
window.submitQuote = submitQuote;

/* ── Smooth scroll for anchor links ───────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Active nav link on scroll ─────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;
  const map = {
    hero: 'index.html', about: 'about.html', services: 'services.html',
    contact: 'contact.html'
  };
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
  }, { passive: true });
})();
