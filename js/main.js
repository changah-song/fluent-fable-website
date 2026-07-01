/* Noeul — minimal vanilla JS: mobile nav, scroll state, lightbox, reveal.
   No dependencies. Everything degrades gracefully if JS is disabled. */
(function () {
  'use strict';

  /* ---------- sticky header hairline on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    var closeMenu = function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    var openMenu = function () {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) { closeMenu(); } else { openMenu(); }
    });

    // close when a link inside the menu is tapped
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeMenu(); }
    });

    // ESC closes the menu and returns focus to the toggle
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---------- screenshot lightbox (optional, accessible) ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lbImg = lightbox.querySelector('img');
    var lbClose = lightbox.querySelector('.lightbox__close');
    var lastFocused = null;

    var openLightbox = function (src, alt) {
      lastFocused = document.activeElement;
      lbImg.setAttribute('src', src);
      lbImg.setAttribute('alt', alt || '');
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      lbClose.focus();
    };
    var closeLightbox = function () {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      lbImg.setAttribute('src', '');
      if (lastFocused) { lastFocused.focus(); }
    };

    document.querySelectorAll('[data-lightbox]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var img = trigger.querySelector('img');
        if (img) { openLightbox(img.getAttribute('src'), img.getAttribute('alt')); }
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) { closeLightbox(); } // backdrop click
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) { closeLightbox(); }
    });
  }

  /* ---------- gentle scroll reveal (respects reduced motion) ---------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealables = document.querySelectorAll('.reveal');
  if (!reduce && 'IntersectionObserver' in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
