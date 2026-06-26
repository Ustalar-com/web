/**
 * Ustalar.com - Merkezi Dil Yönetim Sistemi (Google Translate) - Yerel ve Sunucu Uyumlu
 */

window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'tr',
        includedLanguages: 'tr,en,ru,fr,de',
        autoDisplay: false
    }, 'google_translate_element');
};

(function() {
    // Google Banner'ını ve üst boşluğu gizlemek için CSS ekle
    const style = document.createElement('style');
    style.innerHTML = `
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        .goog-te-balloon-frame { display: none !important; }
        #goog-gt-tt { display: none !important; visibility: hidden !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);

    // Gerekli Div'i oluştur ama fiziksel olarak var ama görünmez yap
    if (!document.getElementById('google_translate_element')) {
        const translateDiv = document.createElement('div');
        translateDiv.id = 'google_translate_element';
        translateDiv.style.position = 'absolute';
        translateDiv.style.top = '-9999px';
        translateDiv.style.left = '-9999px';
        translateDiv.style.height = '0';
        translateDiv.style.width = '0';
        translateDiv.style.overflow = 'hidden';
        document.body.appendChild(translateDiv);
    }

    // Script yükleme
    if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    }
})();

const langMap = {
    tr: { name: 'TR', flag: 'tr' },
    en: { name: 'EN', flag: 'gb' },
    ru: { name: 'RU', flag: 'ru' },
    de: { name: 'DE', flag: 'de' },
    fr: { name: 'FR', flag: 'fr' }
};

function updateLanguageUI(langCode) {
    const lang = langMap[langCode] || langMap['tr'];
    
    // Update active dropdown buttons
    document.querySelectorAll('.active-lang-flag').forEach(el => {
        el.className = `active-lang-flag fi fi-${lang.flag} mr-2 rounded-sm text-lg`;
    });
    document.querySelectorAll('.active-lang-name').forEach(el => {
        el.textContent = lang.name;
    });

    // Sync select input if it exists
    const mobileSelect = document.getElementById('mobile-lang-select');
    if (mobileSelect) {
        mobileSelect.value = langCode;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

window.changeLang = function(langCode) {
    const attemptToggle = (retryCount) => {
        const selectEl = document.querySelector('.goog-te-combo');
        
        if (!selectEl) {
            if (retryCount < 25) {
                setTimeout(() => attemptToggle(retryCount + 1), 200);
            } else {
                console.warn("Çeviri sistemi yerel dosya sisteminde engellenmiş olabilir veya henüz yüklenmedi.");
            }
            return;
        }

        selectEl.value = langCode;
        selectEl.dispatchEvent(new Event('change'));
        updateLanguageUI(langCode);
    };

    attemptToggle(0);
};

// Fallback for older toggle usage
window.toggleLang = function() {
    const selectEl = document.querySelector('.goog-te-combo');
    if (!selectEl) return;
    const currentLang = selectEl.value || 'tr';
    const nextLang = (currentLang === 'tr') ? 'en' : 'tr';
    window.changeLang(nextLang);
};

// Initial run
document.addEventListener('DOMContentLoaded', () => {
    const googTransValue = getCookie('googtrans');
    let activeLang = 'tr';
    if (googTransValue) {
        const split = googTransValue.split('/');
        if (split.length >= 3) {
            activeLang = split[2];
        }
    }
    setTimeout(() => {
        updateLanguageUI(activeLang);
    }, 500);
});
