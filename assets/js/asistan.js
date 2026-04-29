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
            bottom: 120px;
            right: 110px;
            background: white;
            color: #1e293b;
            padding: 12px 20px;
            border-radius: 16px 16px 0px 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            font-size: 0.9rem;
            font-weight: 600;
            z-index: 99;
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            pointer-events: none;
            border: 1px solid #f1f5f9;
        }

        .chat-notification.show {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        .chat-notification::after {
            content: '';
            position: absolute;
            bottom: -8px;
            right: 20px;
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
                        <button onclick="quickAction('Hizmetlerimiz')" class="text-[11px] font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-orange hover:text-brand-orange transition shadow-sm" style="font-size: 11px; font-weight: 500; background: white; border: 1px solid #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 9999px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Hizmetlerimiz</button>
                        <button onclick="quickAction('Kentsel Dönüşüm')" class="text-[11px] font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-orange hover:text-brand-orange transition shadow-sm" style="font-size: 11px; font-weight: 500; background: white; border: 1px solid #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 9999px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Kentsel Dönüşüm</button>
                        <button onclick="quickAction('Ustalar TV')" class="text-[11px] font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-orange hover:text-brand-orange transition shadow-sm" style="font-size: 11px; font-weight: 500; background: white; border: 1px solid #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 9999px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Ustalar TV</button>
                        <button onclick="quickAction('Ustalar OF AI')" class="text-[11px] font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-orange hover:text-brand-orange transition shadow-sm" style="font-size: 11px; font-weight: 500; background: white; border: 1px solid #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 9999px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Ustalar OF AI</button>
                        <button onclick="quickAction('Fabrica AI')" class="text-[11px] font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-orange hover:text-brand-orange transition shadow-sm" style="font-size: 11px; font-weight: 500; background: white; border: 1px solid #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 9999px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Fabrica AI</button>
                        <button onclick="quickAction('Usta Çağır')" class="text-[11px] font-medium bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-brand-orange hover:text-brand-orange transition shadow-sm" style="font-size: 11px; font-weight: 500; background: white; border: 1px solid #e2e8f0; color: #475569; padding: 6px 12px; border-radius: 9999px; cursor: pointer; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">Usta Çağır</button>
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
        const gainNode = audioCtx.createGain();

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

            if (lowerText.includes("hizmetlerimiz") || lowerText.includes("hizmet")) {
                aiResponse = "**Hizmetlerimiz:** İnşaatın A'dan Z'ye tüm süreçlerinde, yapay zeka destekli çözümler ve kurumsal hizmetlerle yanınızdayız.\n\n<a href='https://wa.me/905324666068?text=Merhaba, hizmetleriniz hakkında detaylı bilgi almak istiyorum.' target='_blank' class='inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition' style='display: inline-block; margin-top: 8px; background: #22c55e; color: white; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: bold; text-decoration: none;'><i class='fab fa-whatsapp mr-1'></i> Detaylı Bilgi & Teklif Al</a>";
            } else if (lowerText.includes("of ai") || lowerText.includes("yapay zeka")) {
                aiResponse = "**Ustalar OF AI:** İnşaat süreçlerinde akıllı çözümler üreten yapay zeka asistanımızdır.\n\n<a href='https://wa.me/905324666068?text=Merhaba, Ustalar OF AI hakkında bilgi almak istiyorum.' target='_blank' class='inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition' style='display: inline-block; margin-top: 8px; background: #22c55e; color: white; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: bold; text-decoration: none;'><i class='fab fa-whatsapp mr-1'></i> Bilgi Al</a>";
            } else if (lowerText.includes("fabrica")) {
                aiResponse = "**Fabrica AI:** Üretimi dijitalleştiren ve verimliliği artıran yapay zeka destekli üretim çözümlerimizdir.\n\n<a href='https://wa.me/905324666068?text=Merhaba, Fabrica AI çözümleriniz hakkında bilgi almak istiyorum.' target='_blank' class='inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition' style='display: inline-block; margin-top: 8px; background: #22c55e; color: white; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: bold; text-decoration: none;'><i class='fab fa-whatsapp mr-1'></i> Bilgi Al</a>";
            } else if (lowerText.includes("kentsel dönüşüm")) {
                aiResponse = "**Kentsel Dönüşüm:** Risk analizi ve dönüşüm süreçlerinizi dijital ortamda yönetiyoruz.\n\n<a href='https://wa.me/905324666068?text=Merhaba, kentsel dönüşüm süreci için teklif almak istiyorum.' target='_blank' class='inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition' style='display: inline-block; margin-top: 8px; background: #22c55e; color: white; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: bold; text-decoration: none;'><i class='fab fa-whatsapp mr-1'></i> Ücretsiz Teklif Al</a>";
            } else if (lowerText.includes("tv") || lowerText.includes("video")) {
                aiResponse = "**Ustalar TV:** Sektörel eğitimler ve ilham veren projelerin yer aldığı video platformumuzdur.\n\n<a href='https://wa.me/905324666068?text=Merhaba, Ustalar TV içerikleri hakkında bilgi almak istiyorum.' target='_blank' class='inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition' style='display: inline-block; margin-top: 8px; background: #22c55e; color: white; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: bold; text-decoration: none;'><i class='fab fa-whatsapp mr-1'></i> Bilgi Al</a>";
            } else if (lowerText.includes("usta çağır") || lowerText.includes("usta bul")) {
                aiResponse = "**Usta Çağır:** İhtiyacınız olan profesyonel ustalara en hızlı ve güvenilir yoldan ulaşmanızı sağlıyoruz.\n\n<a href='https://wa.me/905324666068?text=Merhaba, acil usta ihtiyacım var.' target='_blank' class='inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition' style='display: inline-block; margin-top: 8px; background: #22c55e; color: white; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: bold; text-decoration: none;'><i class='fab fa-whatsapp mr-1'></i> Hemen Usta Çağır</a>";
            } else if (lowerText.includes("merhaba") || lowerText.includes("selam")) {
                aiResponse = "Merhaba! Ben Ustalar.com Kurumsal Asistanı. Size hangi hizmetimiz hakkında bilgi verebilirim?";
            } else {
                aiResponse = "Size daha iyi yardımcı olabilmem için lütfen yukarıdaki butonları kullanın veya doğrudan bizimle iletişime geçin.\n\n<a href='https://wa.me/905324666068' target='_blank' class='inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-600 transition' style='display: inline-block; margin-top: 8px; background: #22c55e; color: white; padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: bold; text-decoration: none;'><i class='fab fa-whatsapp mr-1'></i> Müşteri Hizmetleri</a>";
            }

            addMessage(aiResponse, 'ai');
        }, 1200);
    };

    SEND_BTN.onclick = sendMessage;
    INPUT.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
})();
