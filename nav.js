/* ===================================================
   Eyal TTS — photo: click to expand to full card
   (Nav is CSS-only — no JS.)
   =================================================== */
(function () {
  var photos = document.querySelectorAll('.t-photo');
  if (!photos.length) return;

  function collapseAll(except) {
    document.querySelectorAll('.t-photo.is-expanded').forEach(function (p) {
      if (p !== except) p.classList.remove('is-expanded');
    });
  }

  photos.forEach(function (photo) {
    photo.setAttribute('role', 'button');
    photo.setAttribute('tabindex', '0');
    photo.setAttribute('aria-label', 'הגדלת התמונה');

    function loadHiRes() {
      if (photo.dataset.hires) return;
      photo.dataset.hires = '1';
      // wixstatic thumbnails are 128px — request a sharp full-size render
      var hi = photo.src.replace(/w_128,h_128/g, 'w_760,h_760').replace(/h_128,w_128/g, 'h_760,w_760');
      if (hi !== photo.src) photo.src = hi;
    }

    function toggle(e) {
      e.preventDefault();
      var willExpand = !photo.classList.contains('is-expanded');
      collapseAll(photo);
      if (willExpand) loadHiRes();
      photo.classList.toggle('is-expanded', willExpand);
    }

    photo.addEventListener('click', toggle);
    photo.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') toggle(e);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') collapseAll(null);
  });
})();

/* ===================================================
   Eyal TTS — contact form lead delivery (no backend)
   Works for every visitor via email — WhatsApp not required.
   1. Primary: POST to Web3Forms (free, server emails Eyal).
      → paste your key in ACCESS_KEY (get it free at web3forms.com).
   2. Fallback (and until a key is set): open a prefilled
      mailto: so a lead is never silently lost.
   On Wix, replace this with native Wix Forms.
   =================================================== */
(function () {
  var ACCESS_KEY = ''; // ← paste Web3Forms access key here
  var TO_EMAIL   = 'eyal@eyaltts.com';

  var forms = document.querySelectorAll('form.contact-form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn  = form.querySelector('button[type=submit]');
      var data = new FormData(form);

      function showSuccess() {
        form.classList.add('sent');
        if (btn) btn.disabled = true;
        // Move focus to the (now visible) confirmation so screen readers announce it
        var note = form.querySelector('.form-success');
        if (note) {
          note.setAttribute('tabindex', '-1');
          note.focus();
        }
      }
      function mailtoFallback() {
        var name  = (data.get('name')    || '').trim();
        var phone = (data.get('phone')   || '').trim();
        var msg   = (data.get('message') || '').trim();
        var body  = 'שם: ' + name + '\nטלפון: ' + phone + '\n\n' + msg;
        window.location.href = 'mailto:' + TO_EMAIL +
          '?subject=' + encodeURIComponent('פנייה מהאתר — ' + name) +
          '&body='    + encodeURIComponent(body);
        showSuccess();
      }

      if (!ACCESS_KEY) { mailtoFallback(); return; }

      data.append('access_key', ACCESS_KEY);
      data.append('subject', 'פנייה חדשה מאתר Eyal TTS');
      data.append('from_name', 'Eyal TTS');
      if (btn) btn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.success) showSuccess();
          else { if (btn) btn.disabled = false; mailtoFallback(); }
        })
        .catch(function () { if (btn) btn.disabled = false; mailtoFallback(); });
    });
  });
})();
