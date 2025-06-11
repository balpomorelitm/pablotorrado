// Language toggle script

document.addEventListener('DOMContentLoaded', () => {
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    const current = document.documentElement.getAttribute('lang') || 'es';
    langBtn.textContent = current === 'es' ? 'English version' : 'En español';
    langBtn.addEventListener('click', toggleLanguage);
  }

  function toggleLanguage() {
    const html = document.documentElement;
    const current = html.getAttribute('lang') || 'es';
    const newLang = current === 'es' ? 'en' : 'es';
    html.setAttribute('lang', newLang);

    document.querySelectorAll('[data-en]').forEach(el => {
      if (!el.dataset.es) {
        el.dataset.es = el.textContent.trim();
      }
      el.textContent = newLang === 'en' ? el.dataset.en : el.dataset.es;
    });

    if (langBtn) {
      langBtn.textContent = newLang === 'en' ? 'En español' : 'English version';
    }
  }
});
