document.addEventListener('DOMContentLoaded', function() {
    // --- Language Switcher Logic ---
    const esBtn = document.getElementById('lang-es-btn');
    const enBtn = document.getElementById('lang-en-btn');
    
    if (esBtn && enBtn) {
        esBtn.addEventListener('click', function() {
            document.body.classList.remove('lang-en-active');
            esBtn.classList.add('active');
            enBtn.classList.remove('active');
        });
        
        enBtn.addEventListener('click', function() {
            document.body.classList.add('lang-en-active');
            enBtn.classList.add('active');
            esBtn.classList.remove('active');
        });
    }
});
