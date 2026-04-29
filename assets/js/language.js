/**
 * Ustalar.com - Merkezi Dil Yönetim Sistemi (Google Translate) - Yerel ve Sunucu Uyumlu
 */

window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
        pageLanguage: 'tr',
        includedLanguages: 'en,tr',
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

let isEnglish = false;
window.toggleLang = function() {
    const attemptToggle = (retryCount) => {
        const selectEl = document.querySelector('.goog-te-combo');
        
        if (!selectEl) {
            // Google Translate'in yerel dosyalarda bazen geç tepki vermesine karşı deneme süresini artırıyoruz
            if (retryCount < 25) { // 5 saniye boyunca dene
                setTimeout(() => attemptToggle(retryCount + 1), 200);
            } else {
                alert("Çeviri sistemi yerel dosya sisteminde engellenmiş olabilir. Lütfen bir web sunucusu (Live Server vb.) üzerinden deneyin veya internet bağlantınızı kontrol edin.");
            }
            return;
        }

        isEnglish = !isEnglish;
        
        if (isEnglish) {
            selectEl.value = 'en';
        } else {
            selectEl.value = 'tr';
            if (selectEl.options && selectEl.options.length > 0) {
                selectEl.selectedIndex = 0;
            }
        }

        selectEl.dispatchEvent(new Event('change'));

        document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
            btn.innerHTML = isEnglish
                ? '<span class="fi fi-tr mr-2 rounded-sm text-lg"></span> TR'
                : '<span class="fi fi-gb mr-2 rounded-sm text-lg"></span> EN';
        });
    };

    attemptToggle(0);
};
