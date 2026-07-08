// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach(el => observer.observe(el));

// Nav scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Mobile nav hamburger
const hamburger = document.querySelector('.nav-hamburger');
const mobileLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  // Handle dropdown toggles (mobile only) — Services + Portfolio
const dropdownToggles = document.querySelectorAll('.nav-dropdown > a');

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const parentLi = toggle.parentElement;
      parentLi.classList.toggle('dropdown-open');
      // Force synchronous layout recalculation so text nodes paint
      // before the max-height animation begins (iOS/Android compositing fix)
      void parentLi.offsetHeight;
    }
  });
});

// Handle all other links (close menu)
mobileLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    // Ignore dropdown triggers
    if (link.matches('.nav-dropdown > a')) return;
    // Dropdown sub-links: delay nav collapse so the tap registers before
    // layout shifts — prevents "slides away from finger" on slow devices
    if (link.closest('.nav-dropdown-menu')) {
      setTimeout(() => {
        mobileLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }, 150);
      return;
    }
    mobileLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});
}

// Featured work carousel
const featuredTrack = document.getElementById('featured-track');
if (featuredTrack) {
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const scrollAmount = () => featuredTrack.querySelector('.carousel-card').offsetWidth + 14;
  prevBtn.addEventListener('click', () => featuredTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => featuredTrack.scrollBy({ left:  scrollAmount(), behavior: 'smooth' }));
}

// Before/after comparison slider (homepage hero)
document.querySelectorAll('.ba-slider').forEach(slider => {
  const range = slider.querySelector('.ba-range');
  if (!range) return;
  const update = () => slider.style.setProperty('--ba-pos', range.value + '%');
  range.addEventListener('input', update);
  update();
});

// Interest form
const form = document.getElementById('interestForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const btnLabel = btn.innerHTML;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      // fetch() resolves even on 4xx/5xx — check res.ok so a failed
      // submission never shows the success message.
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!res.ok) throw new Error('Submit failed: ' + res.status);
      form.reset();
      btn.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    } catch {
      btn.innerHTML = btnLabel;
      btn.disabled = false;
      let err = document.getElementById('formError');
      if (!err) {
        err = document.createElement('p');
        err.id = 'formError';
        err.style.cssText = 'margin-top:12px;font-size:0.8rem;color:#c0392b;';
        err.textContent = "Something went wrong sending that. Try again, or DM us on Instagram — we'll take it from there.";
        btn.parentElement.appendChild(err);
      }
    }
  });
}

// EN/ES toggle for bilingual ad sets (cards carry .lang-en / .lang-es)
document.querySelectorAll('.lang-toggle').forEach(toggle => {
  const scope = toggle.closest('section') || document;
  const apply = (lang) => {
    toggle.querySelectorAll('.lt-btn').forEach(b => {
      const on = b.dataset.lang === lang;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    scope.querySelectorAll('.ad-card.lang-en, .ad-card.lang-es').forEach(card => {
      card.classList.toggle('lang-hidden', !card.classList.contains('lang-' + lang));
    });
  };
  toggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.lt-btn');
    if (btn && btn.dataset.lang) apply(btn.dataset.lang);
  });
  apply('en');
});
