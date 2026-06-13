/**
 * Ustalar.com Kurumsal Asistanı
 * Modüler Yapı - Tek Dosya Yönetimi
 */

(function() {
    // 1. CSS STİLLERİNİ ENJEKTE ET
    const style = document.createElement('style');
    style.innerHTML = `
        #ai-chat-fab {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 70px;
            height: 70px;
            cursor: pointer;
            z-index: 999;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        #ai-chat-fab:hover {
            transform: scale(1.1) rotate(5deg);
        }

        #ai-chat-window {
            position: fixed;
            bottom: 110px;
            right: 30px;
            width: 380px;
            height: 600px;
            background: white;
            border-radius: 1.5rem;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 1000;
            border: 1px solid #e2e8f0;
            animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chat-header {
            background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
            color: white;
            padding: 1.25rem;
            display: flex;
            justify-content: space-between;
            items-center: center;
        }

        .chat-messages {
            flex: 1;
            padding: 1.25rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background-color: #f8fafc;
            background-image: radial-gradient(#e2e8f0 0.5px, transparent 0.5px);
            background-size: 15px 15px;
        }

        .msg-bubble {
            max-width: 85%;
            padding: 0.85rem 1.1rem;
            border-radius: 1.25rem;
            font-size: 0.95rem;
            line-height: 1.5;
            position: relative;
            animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .msg-ai {
            background: white;
            color: #1e293b;
            align-self: flex-start;
            border-bottom-left-radius: 0.25rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }

        .msg-user {
            background: #f97316;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 0.25rem;
            box-shadow: 0 2px 4px rgba(249, 115, 22, 0.2);
        }

        .chat-input-area {
            padding: 1rem;
            background: white;
            border-top: 1px solid #e2e8f0;
            display: flex;
            gap: 0.5rem;
        }

        .chat-input-area input {
            flex: 1;
            background: #f1f5f9;
            border: 1px solid transparent;
            padding: 0.75rem 1.25rem;
            border-radius: 9999px;
            outline: none;
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        .chat-input-area input:focus {
            background: white;
            border-color: #f97316;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
        }

        .chat-notification {
            position: fixed;
            bottom: 115px;
            right: 65px;
            background: white;
            color: #1e293b;
            padding: 12px 20px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 99;
            opacity: 0;
            transform: translateX(50%) translateY(20px) scale(0.9);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
            border: 1px solid #f1f5f9;
        }

        .chat-notification.show {
            opacity: 1;
            transform: translateX(50%) translateY(0) scale(1);
        }

        .chat-notification::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid white;
        }

        @media (max-width: 480px) {
            #ai-chat-window {
                width: 100vw;
                height: 80vh;
                right: 0;
                bottom: 0;
                border-radius: 2rem 2rem 0 0;
                z-index: 9999;
            }
            .chat-header {
                border-radius: 2rem 2rem 0 0;
            }
        }

        .quick-btn {
            font-size: 11px !important;
            font-weight: 500 !important;
            background: white !important;
            border: 1px solid #e2e8f0 !important;
            color: #475569 !important;
            padding: 6px 12px !important;
            border-radius: 9999px !important;
            cursor: pointer !important;
            transition: all 0.2s !important;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05) !important;
        }

        .quick-btn:hover {
            border-color: #f97316 !important;
            color: #f97316 !important;
            background: #fffaf8 !important;
        }

        .btn-assistant-action {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin-top: 8px !important;
            padding: 8px 16px !important;
            border-radius: 12px !important;
            font-size: 12px !important;
            font-weight: bold !important;
            text-decoration: none !important;
            transition: all 0.2s !important;
            cursor: pointer !important;
            border: none !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
        }

        .btn-assistant-action.orange {
            background: #f97316 !important;
            color: white !important;
        }

        .btn-assistant-action.orange:hover {
            background: #ea580c !important;
            box-shadow: 0 4px 6px rgba(249, 115, 22, 0.2) !important;
        }

        .btn-assistant-action.green {
            background: #22c55e !important;
            color: white !important;
        }

        .btn-assistant-action.green:hover {
            background: #16a34a !important;
            box-shadow: 0 4px 6px rgba(34, 197, 94, 0.2) !important;
        }
    `;
    document.head.appendChild(style);

    // 2. HTML YAPISINI ENJEKTE ET
    const assistantHTML = `
        <div id="ai-chat-notification" class="chat-notification">
            👋 Merhaba!
        </div>

        <div id="ai-chat-fab">
            <div class="w-full h-full bg-white rounded-full shadow-lg flex items-center justify-center p-0.5 border-2 border-brand-orange overflow-hidden">
                <img src="assets/images/ustalar_vector.png" alt="Ustalar AI" class="w-full h-full object-contain transform scale-110">
            </div>
        </div>

        <div id="ai-chat-window">
            <div class="chat-header">
                <div class="flex items-center space-x-3" style="display: flex; align-items: center; gap: 12px;">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm" style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-center; backdrop-filter: blur(4px);">
                        <i class="fas fa-robot text-white text-2xl" style="font-size: 24px; color: white;"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-sm tracking-wide" style="margin: 0; font-size: 14px; font-weight: bold; letter-spacing: 0.025em;">Ustalar.com Asistan</h3>
                        <p class="text-[11px] opacity-90 font-medium" style="margin: 0; font-size: 11px; opacity: 0.9; font-weight: 500;">İşinizi Ustalara Bırakın</p>
                    </div>
                </div>
                <button id="close-chat" style="background: transparent; border: none; cursor: pointer; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background 0.2s;">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div id="chat-messages" class="chat-messages">
                <div class="msg-bubble msg-ai">
                    Merhaba! Ben **Ustalar.com Kurumsal Asistanı**. Size nasıl yardımcı olabilirim? Aşağıdaki hizmetlerimizden bilgi alabilir veya doğrudan bizimle iletişime geçebilirsiniz.
                    <div class="flex flex-wrap gap-2 mt-4" style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px;">
                        <button onclick="quickAction('Ustalık Hizmeti')" class="quick-btn">Ustalık Hizmeti</button>
                        <button onclick="quickAction('Fabrika AI')" class="quick-btn">Fabrika AI</button>
                        <button onclick="quickAction('Ustalar OF AI')" class="quick-btn">Ustalar OF AI</button>
                        <button onclick="quickAction('Kentsel Dönüşüm')" class="quick-btn">Kentsel Dönüşüm</button>
                        <button onclick="quickAction('İş Makinesi Kiralama')" class="quick-btn">İş Makinesi Kiralama</button>
                        <button onclick="quickAction('Ustalar Barter')" class="quick-btn">Ustalar Barter</button>
                        <button onclick="quickAction('Ustalar Brand')" class="quick-btn">Ustalar Brand</button>
                        <button onclick="quickAction('Emlak Değerleme')" class="quick-btn">Emlak Değerleme</button>
                        <button onclick="quickAction('Sanal Fuar')" class="quick-btn">Sanal Fuar</button>
                        <button onclick="quickAction('Tedarik Zinciri')" class="quick-btn">Tedarik Zinciri Yönetimi (Teziyo)</button>
                    </div>
                </div>
            </div>

            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Bana bir şey sorun...">
                <button id="send-msg" style="background: #f97316; color: white; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 50%; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    const container = document.createElement('div');
    container.innerHTML = assistantHTML;
    document.body.appendChild(container);

    // 3. LOGIC (İŞLEYİŞ)
    const FAB = document.getElementById('ai-chat-fab');
    const CHAT_WINDOW = document.getElementById('ai-chat-window');
    const CLOSE_BTN = document.getElementById('close-chat');
    const SEND_BTN = document.getElementById('send-msg');
    const INPUT = document.getElementById('chat-input');
    const MESSAGES_CONTAINER = document.getElementById('chat-messages');
    const NOTIFICATION = document.getElementById('ai-chat-notification');

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;

    const initAudio = () => {
        if (!audioCtx) audioCtx = new AudioContext();
    }

    const playSound = (type) => {
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.gain || audioCtx.createGain();

        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        if (type === 'send') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } else if (type === 'receive') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
            gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.4);
        }
    };

    FAB.onclick = () => {
        initAudio();
        if (NOTIFICATION) NOTIFICATION.classList.remove('show');
        CHAT_WINDOW.style.display = CHAT_WINDOW.style.display === 'flex' ? 'none' : 'flex';
        if (CHAT_WINDOW.style.display === 'flex') {
            INPUT.focus();
            playSound('receive');
        }
    };

    setTimeout(() => {
        if (CHAT_WINDOW.style.display !== 'flex') {
            if (NOTIFICATION) NOTIFICATION.classList.add('show');
            initAudio();
            playSound('receive');
        }
    }, 2500);

    CLOSE_BTN.onclick = () => CHAT_WINDOW.style.display = 'none';

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.className = `msg-bubble ${sender === 'user' ? 'msg-user' : 'msg-ai'}`;
        div.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        MESSAGES_CONTAINER.appendChild(div);
        MESSAGES_CONTAINER.scrollTop = MESSAGES_CONTAINER.scrollHeight;
        playSound(sender === 'user' ? 'send' : 'receive');
    };

    window.quickAction = (action) => {
        initAudio();
        INPUT.value = action;
        sendMessage();
    };

    const sendMessage = () => {
        initAudio();
        const text = INPUT.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        INPUT.value = '';

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'msg-bubble msg-ai italic text-slate-400';
        loadingDiv.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Düşünüyor...';
        MESSAGES_CONTAINER.appendChild(loadingDiv);
        MESSAGES_CONTAINER.scrollTop = MESSAGES_CONTAINER.scrollHeight;

        setTimeout(() => {
            loadingDiv.remove();

            let aiResponse = "";
            const lowerText = text.toLowerCase();

            if (lowerText.includes("ustalık") || lowerText.includes("usta")) {
                aiResponse = "**Ustalık Hizmeti:** Evinizde, ofisinizde veya şantiyenizde ihtiyaç duyduğunuz tüm profesyonel ustalık hizmetleri için uzman kadromuzla yanınızdayız. Boya, elektrik, tesisat, tadilat ve diğer tüm ihtiyaçlarınız için hızlı çözüm üretiyoruz.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='https://docs.google.com/forms/d/e/1FAIpQLSeGqFbP83KHEIJ6LgwijsttmzYJbQoJGZ1U535BEfIdcb8oIg/viewform' target='_blank' class='btn-assistant-action orange'><i class='fas fa-file-alt mr-1.5'></i> Talep Formu</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, Ustalık Hizmeti almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("fabrika") || lowerText.includes("fabrica")) {
                aiResponse = "**Fabrika AI:** Üretim süreçlerini dijitalleştiren, verimliliği artıran ve yapay zeka destekli analizlerle üretim kayıplarını en aza indirmeyi hedefleyen yenilikçi endüstriyel çözümlerimizdir.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='fabrica_ai.html' class='btn-assistant-action orange'><i class='fas fa-info-circle mr-1.5'></i> Sayfayı İncele</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, Fabrika AI çözümleriniz hakkında bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("of ai")) {
                aiResponse = "**Ustalar OF AI:** İnşaat, proje yönetimi, maliyet hesaplama ve teknik konularda 7/24 hizmet veren, inşaat sektörüne özel eğitilmiş akıllı yapay zeka asistanımızdır.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='ustalar_of_ai.html' class='btn-assistant-action orange'><i class='fas fa-robot mr-1.5'></i> Yapay Zekayı Dene</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, Ustalar OF AI hakkında bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("kentsel")) {
                aiResponse = "**Kentsel Dönüşüm:** Binanızın risk analizinden, proje tasarımına, finansman çözümlerinden inşaat sürecine kadar tüm dönüşüm adımlarını dijital olarak şeffaf bir şekilde yönetiyoruz.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='kentsel_donusum.html' class='btn-assistant-action orange'><i class='fas fa-city mr-1.5'></i> Sayfayı İncele</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, kentsel dönüşüm süreci için bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("makine") || lowerText.includes("kiralama")) {
                aiResponse = "**İş Makinesi Kiralama:** Projeleriniz ve şantiyeleriniz için ihtiyaç duyduğunuz iş makinelerini, en uygun fiyatlarla ve güvenilir operasyon desteğiyle kolayca kiralamanızı sağlıyoruz.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='https://docs.google.com/forms/d/e/1FAIpQLSdBR2avN6KACdRzNDDngtkrkif5VYJjvjkOmyoHXweGaoJa8w/viewform' target='_blank' class='btn-assistant-action orange'><i class='fas fa-file-alt mr-1.5'></i> Kiralama Formu</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, iş makinesi kiralama hakkında teklif almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("barter")) {
                aiResponse = "**Ustalar Barter:** Nakit akışı zorluğu yaşamadan, malzeme, hizmet veya iş gücü takası (barter) yoluyla projelerinizi kesintisiz tamamlamanızı sağlayan alternatif ticaret modelimizdir.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='https://docs.google.com/forms/d/e/1FAIpQLScwtWlq77ABB6nEJqurYQ1MIzImbKfRYzWgq9nY7W9eJV6z4A/viewform' target='_blank' class='btn-assistant-action orange'><i class='fas fa-file-alt mr-1.5'></i> Başvuru Formu</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, Ustalar Barter sistemi hakkında bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("brand")) {
                aiResponse = "**Ustalar Brand:** Markanızın, ürünlerinizin veya kurumsal kimliğinizin sektörde daha görünür olması için sunduğumuz özel reklam, marka iş birliği ve pazarlama çözümlerimizdir.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, Ustalar Brand hizmetleriniz hakkında bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("değerleme") || lowerText.includes("emlak")) {
                aiResponse = "**Emlak Değerleme:** Gayrimenkullerinizin güncel piyasa değerini, yapay zeka destekli algoritmalarımız ve alanında uzman analiz ekiplerimizin verileriyle hızlı ve doğru şekilde hesaplıyoruz.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='https://docs.google.com/forms/d/e/1FAIpQLScbmlo1oqkLQuxINH7D2d6iggH5lSaB8etlbocYPWYYWBIKgQ/viewform' target='_blank' class='btn-assistant-action orange'><i class='fas fa-file-alt mr-1.5'></i> Değerleme Formu</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, emlak değerleme hizmetiniz hakkında bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("fuar") || lowerText.includes("sanal")) {
                aiResponse = "**Sanal Fuar:** Yapı ve inşaat sektöründeki üreticileri, tedarikçileri ve alıcıları dijital dünyada bir araya getiren 3D ve interaktif fuar deneyimidir.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='https://docs.google.com/forms/d/e/1FAIpQLSecBhw65VeRy5RYi-HQ7SkDm7nzBKQYNE076uyJEI7WUMIcuQ/viewform' target='_blank' class='btn-assistant-action orange'><i class='fas fa-file-alt mr-1.5'></i> Katılım Formu</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, Sanal Fuar katılımı hakkında bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("tedarik") || lowerText.includes("teziyo")) {
                aiResponse = "**Tedarik Zinciri (Teziyo):** Malzeme tedariğinden şantiye lojistiğine kadar tüm süreçleri optimize eden, maliyet ve zaman tasarrufu sağlayan akıllı lojistik ve tedarik yönetim platformudur.\n\n" +
                    "<div class='flex flex-col sm:flex-row gap-2 mt-3' style='display: flex; flex-direction: column; gap: 8px; margin-top: 12px;'>" +
                    "<a href='tedarik_zinciri.html' class='btn-assistant-action orange'><i class='fas fa-info-circle mr-1.5'></i> Sayfayı İncele</a>" +
                    "<a href='https://wa.me/905324666068?text=Merhaba, Tedarik Zinciri (Teziyo) sistemi hakkında bilgi almak istiyorum.' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>" +
                    "</div>";
            } else if (lowerText.includes("hizmetlerimiz") || lowerText.includes("hizmet")) {
                aiResponse = "**Hizmetlerimiz:** İnşaatın A'dan Z'ye tüm süreçlerinde, yapay zeka destekli çözümler ve kurumsal hizmetlerle yanınızdayız. Bilgi almak istediğiniz hizmeti aşağıdaki butonlardan seçebilirsiniz.";
            } else if (lowerText.includes("merhaba") || lowerText.includes("selam")) {
                aiResponse = "Merhaba! Ben Ustalar.com Kurumsal Asistanı. Size hangi hizmetimiz hakkında bilgi verebilirim?";
            } else {
                aiResponse = "Size daha iyi yardımcı olabilmem için lütfen yukarıdaki butonları kullanın veya doğrudan bizimle iletişime geçin.\n\n" +
                    "<a href='https://wa.me/905324666068' target='_blank' class='btn-assistant-action green'><i class='fab fa-whatsapp mr-1.5'></i> WhatsApp İletişim</a>";
            }

            addMessage(aiResponse, 'ai');
        }, 1200);
    };

    SEND_BTN.onclick = sendMessage;
    INPUT.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
})();
