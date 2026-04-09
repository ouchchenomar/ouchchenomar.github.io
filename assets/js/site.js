(function () {
  'use strict';

  function $(selector, context) {
    return (context || document).querySelector(selector);
  }

  function $all(selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  }

  var navToggle = $('.nav-toggle');
  var siteNav = $('#siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', function (event) {
      if (!siteNav.classList.contains('is-open')) {
        return;
      }

      if (siteNav.contains(event.target) || navToggle.contains(event.target)) {
        return;
      }

      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var revealItems = $all('.reveal');

  if ('IntersectionObserver' in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  $all('.js-year').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  var form = $('#contactForm');
  var status = $('#formStatus');
  var isFrench = (document.documentElement.getAttribute('lang') || 'fr').toLowerCase().indexOf('fr') === 0;

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = $('#name', form);
      var email = $('#email', form);
      var subject = $('#subject', form);
      var message = $('#message', form);

      if (!name || !email || !subject || !message) {
        return;
      }

      var values = [name.value.trim(), email.value.trim(), subject.value.trim(), message.value.trim()];

      if (values.some(function (value) { return !value; })) {
        if (status) {
          status.textContent = isFrench
            ? 'Merci de remplir tous les champs avant de preparer le message.'
            : 'Please complete every field before preparing the email.';
        }
        return;
      }

      var mailtoSubject = encodeURIComponent('[Portfolio] ' + subject.value.trim());
      var mailtoBody = encodeURIComponent(
        'Nom: ' + name.value.trim() + '\n' +
        'Email: ' + email.value.trim() + '\n\n' +
        message.value.trim()
      );

      if (status) {
        status.textContent = isFrench
          ? 'Votre client mail va s ouvrir avec le message pre-rempli.'
          : 'Your email client will open with a pre-filled message.';
      }

      window.location.href = 'mailto:ouchcheno@gmail.com?subject=' + mailtoSubject + '&body=' + mailtoBody;
    });
  }
})();
