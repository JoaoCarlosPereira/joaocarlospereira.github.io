(function() {
    // Estilos do Widget
    const style = document.createElement('style');
    style.textContent = `
        .miriam-widget-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            font-family: "Plus Jakarta Sans", sans-serif;
        }

        .miriam-toggle-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0d6efd, #6f42c1);
            border: none;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .miriam-toggle-btn:hover {
            transform: scale(1.1) rotate(5deg);
        }

        .miriam-chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 350px;
            height: 500px;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            border: 1px solid rgba(124, 231, 255, 0.2);
            transition: all 0.3s ease;
        }

        .miriam-chat-window.active {
            display: flex;
            animation: miriam-fade-in 0.3s ease;
        }

        @keyframes miriam-fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .miriam-chat-header {
            background: #0b1020;
            color: white;
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .miriam-chat-header h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #7ce7ff;
        }

        .miriam-close-btn {
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 20px;
        }

        .miriam-chat-body {
            flex: 1;
            position: relative;
            background: #f8f9fa;
        }

        .miriam-widget-iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        .miriam-widget-loading {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
            z-index: 2;
        }

        .miriam-widget-fallback {
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
            background: #fff;
            z-index: 3;
        }

        .miriam-widget-fallback h4 {
            font-size: 16px;
            color: #0b1020;
            margin-top: 15px;
        }

        .miriam-widget-fallback p {
            font-size: 13px;
            color: #666;
            margin-bottom: 20px;
            line-height: 1.4;
        }

        .miriam-whatsapp-btn {
            display: inline-flex;
            align-items: center;
            background: #25d366;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            transition: background 0.3s;
        }

        .miriam-whatsapp-btn:hover {
            background: #128c7e;
            color: white;
        }

        /* Animação do sono refinada para o widget */
        .miriam-widget-snooze-scene {
            position: relative;
            width: 80px;
            height: 60px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .miriam-widget-pacman-sleep {
            width: 50px;
            height: 50px;
            background: #ffd166;
            border-radius: 50%;
            position: relative;
            animation: miriam-widget-pulse 2s infinite ease-in-out;
        }

        .miriam-widget-pacman-eye {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 10px;
            height: 2px;
            background: #0b1020;
            transform: rotate(10deg);
        }

        .miriam-widget-z {
            position: absolute;
            color: #6f42c1;
            font-weight: bold;
            font-size: 14px;
            opacity: 0;
            animation: miriam-widget-z-anim 3s infinite;
        }

        .miriam-widget-z1 { right: 10px; top: 0px; animation-delay: 0s; }
        .miriam-widget-z2 { right: 0px; top: -15px; animation-delay: 1s; font-size: 18px; }
        .miriam-widget-z3 { right: -10px; top: -30px; animation-delay: 2s; font-size: 22px; }

        @keyframes miriam-widget-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(0.95); opacity: 0.9; }
        }

        @keyframes miriam-widget-z-anim {
            0% { transform: translate(0, 0); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 0; }
            100% { transform: translate(15px, -40px); opacity: 0; }
        }

        @media (max-width: 450px) {
            .miriam-chat-window {
                width: calc(100vw - 40px);
                height: 70vh;
            }
        }
    `;
    document.head.appendChild(style);

    // Estrutura HTML
    const container = document.createElement('div');
    container.className = 'miriam-widget-container';
    container.innerHTML = `
        <button class="miriam-toggle-btn" title="Conversar com Miriam AI">
            <i class="bi bi-chat-dots-fill"></i>
        </button>
        <div class="miriam-chat-window">
            <div class="miriam-chat-header">
                <h3><i class="bi bi-robot me-2"></i>Miriam AI</h3>
                <button class="miriam-close-btn">&times;</button>
            </div>
            <div class="miriam-chat-body">
                <div class="miriam-widget-loading">
                    <div class="spinner-border text-primary" role="status"></div>
                </div>
                <div class="miriam-widget-fallback">
                    <div class="miriam-widget-snooze-scene">
                        <div class="miriam-widget-pacman-sleep">
                            <div class="miriam-widget-pacman-eye"></div>
                        </div>
                        <div class="miriam-widget-z miriam-widget-z1">Z</div>
                        <div class="miriam-widget-z miriam-widget-z2">Z</div>
                        <div class="miriam-widget-z miriam-widget-z3">Z</div>
                    </div>
                    <h4>Miriam está dormindo</h4>
                    <p>Manter uma IA acordada consome muita energia. Por isso, a Miriam dorme quando não há ninguém conversando.</p>
                    <a href="https://wa.me/5549991912722?text=Oi%20João%2C%20pode%20acordar%20a%20Miriam%3F%20Gostaria%20de%20conversar%20com%20ela." 
                       target="_blank" 
                       class="miriam-whatsapp-btn">
                        <i class="bi bi-whatsapp me-2"></i>Acordar Miriam
                    </a>
                </div>
                <iframe class="miriam-widget-iframe" src="about:blank" title="Miriam AI Chat"></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    const toggleBtn = container.querySelector('.miriam-toggle-btn');
    const chatWindow = container.querySelector('.miriam-chat-window');
    const closeBtn = container.querySelector('.miriam-close-btn');
    const iframe = container.querySelector('.miriam-widget-iframe');
    const loading = container.querySelector('.miriam-widget-loading');
    const fallback = container.querySelector('.miriam-widget-fallback');

    const remoteUrl = 'https://joaocarlos.servehttp.com/';
    let isLoaded = false;
    let isChecking = false;

    function checkAvailability() {
        if (isChecking || isLoaded) return;
        isChecking = true;

        fetch(remoteUrl, { method: 'GET', mode: 'cors', cache: 'no-store' })
            .then(response => {
                if (response.ok) {
                    iframe.src = remoteUrl;
                    loading.style.display = 'none';
                    fallback.style.display = 'none';
                    isLoaded = true;
                } else {
                    showFallback();
                }
            })
            .catch(() => showFallback())
            .finally(() => { isChecking = false; });
    }

    function showFallback() {
        loading.style.display = 'none';
        fallback.style.display = 'flex';
        iframe.style.display = 'none';
    }

    toggleBtn.addEventListener('click', () => {
        const isActive = chatWindow.classList.toggle('active');
        if (isActive) {
            checkAvailability();
            toggleBtn.innerHTML = '<i class="bi bi-chevron-down"></i>';
        } else {
            toggleBtn.innerHTML = '<i class="bi bi-chat-dots-fill"></i>';
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        toggleBtn.innerHTML = '<i class="bi bi-chat-dots-fill"></i>';
    });

})();
