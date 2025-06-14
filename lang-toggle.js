document.addEventListener('DOMContentLoaded', function() {
    const esBtn = document.getElementById('lang-es-btn');
    const enBtn = document.getElementById('lang-en-btn');
    const htmlEl = document.documentElement;
    const translatableEls = document.querySelectorAll('[data-en]');

    // Store the original Spanish text so we can switch back later
    translatableEls.forEach(el => {
        if (!el.dataset.es) {
            el.dataset.es = el.innerHTML.trim();
        }
    });

    function switchLanguage(lang, save = true) {
        htmlEl.setAttribute('lang', lang);
        if (save) {
            try {
                localStorage.setItem('preferredLang', lang);
            } catch (e) {
                // Ignore write errors
            }
        }

        if (lang === 'en') {
            document.body.classList.add('lang-en-active');
            enBtn && enBtn.classList.add('active');
            esBtn && esBtn.classList.remove('active');
        } else {
            document.body.classList.remove('lang-en-active');
            esBtn && esBtn.classList.add('active');
            enBtn && enBtn.classList.remove('active');
        }

        translatableEls.forEach(el => {
            el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.es;
        });
    }

    if (esBtn) {
        esBtn.addEventListener('click', function () { switchLanguage('es'); });
    }

    if (enBtn) {
        enBtn.addEventListener('click', function () { switchLanguage('en'); });
    }

    // Apply saved language preference on load
    let savedLang;
    try {
        savedLang = localStorage.getItem('preferredLang');
    } catch (e) {
        savedLang = null;
    }

    switchLanguage(savedLang || htmlEl.getAttribute('lang'), false);
});
