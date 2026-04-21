document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('snake-game-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('snake-score');
    const levelEl = document.getElementById('snake-level');
    const messageEl = document.getElementById('snake-message');
    const startButton = document.getElementById('snake-start');
    const pauseButton = document.getElementById('snake-pause');
    const resetButton = document.getElementById('snake-reset');

    const gridSize = 20;
    const tileCountX = Math.floor(canvas.width / gridSize);
    const tileCountY = Math.floor(canvas.height / gridSize);

    let snake = [];
    let food = { x: 5, y: 5 };
    let dx = 0;
    let dy = 0;
    let nextDx = 1;
    let nextDy = 0;
    let score = 0;
    let level = 1;
    let gameSpeed = 100;
    let running = false;
    let paused = false;
    let gameTimeout = null;
    
    let mouthOpen = 0;
    let mouthSpeed = 0.2;
    
    // Sistema de ondas neon
    let activeWaves = []; // Armazena o índice do segmento onde a onda está

    function initGame() {
        snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        nextDx = 1;
        nextDy = 0;
        dx = 1;
        dy = 0;
        score = 0;
        level = 1;
        gameSpeed = 100;
        activeWaves = [];
        spawnFood();
        updateHud();
    }

    function spawnFood() {
        food.x = Math.floor(Math.random() * tileCountX);
        food.y = Math.floor(Math.random() * tileCountY);
        for (let part of snake) {
            if (part.x === food.x && part.y === food.y) {
                spawnFood();
                return;
            }
        }
    }

    function updateHud() {
        if (scoreEl) scoreEl.textContent = score;
        if (levelEl) levelEl.textContent = level;
    }

    function setMessage(text, visible, interactive) {
        if (!messageEl) return;
        messageEl.textContent = text;
        messageEl.classList.toggle('is-hidden', !visible);
        messageEl.classList.toggle('is-interactive', !!interactive);
    }

    function draw() {
        ctx.fillStyle = '#050b14';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grade sutil
        ctx.strokeStyle = 'rgba(124, 231, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= canvas.width; i += gridSize) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        }
        for (let i = 0; i <= canvas.height; i += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
        }

        // Comida
        ctx.fillStyle = '#ff4d6d';
        ctx.shadowColor = '#ff4d6d';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2.5, 0, Math.PI * 2);
        ctx.fill();

        // Cobra
        snake.forEach((part, index) => {
            const isHead = index === 0;
            
            // Verifica se há uma onda passando por este segmento
            // Aumentamos o brilho se a onda estiver aqui ou nos vizinhos próximos para um efeito suave
            let hasWave = activeWaves.some(w => Math.abs(w - index) < 2);
            
            if (isHead) {
                const centerX = part.x * gridSize + gridSize / 2;
                const centerY = part.y * gridSize + gridSize / 2;
                const radius = gridSize / 2 - 1;
                
                let angle = 0;
                if (dx === 1) angle = 0;
                if (dx === -1) angle = Math.PI;
                if (dy === -1) angle = -Math.PI / 2;
                if (dy === 1) angle = Math.PI / 2;

                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(angle);
                
                // Cabeça brilha mais se estiver iniciando uma onda
                ctx.fillStyle = hasWave ? '#fff' : '#ffd166';
                ctx.shadowColor = hasWave ? '#fff' : '#ffd166';
                ctx.shadowBlur = hasWave ? 25 : 15;
                
                const mouthSize = Math.abs(Math.sin(mouthOpen)) * 0.25 + 0.1;
                
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.arc(0, 0, radius, mouthSize, Math.PI * 2 - mouthSize);
                ctx.closePath();
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#06111f';
                ctx.beginPath();
                ctx.arc(radius * 0.2, -radius * 0.5, radius * 0.15, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            } else {
                // Segmento do corpo
                ctx.save();
                ctx.fillStyle = hasWave ? '#7ce7ff' : '#34d3ff';
                ctx.shadowColor = hasWave ? '#fff' : '#34d3ff';
                ctx.shadowBlur = hasWave ? 20 : 5;
                
                ctx.beginPath();
                const margin = hasWave ? 2 : 3;
                if (ctx.roundRect) {
                    ctx.roundRect(part.x * gridSize + margin, part.y * gridSize + margin, gridSize - margin*2, gridSize - margin*2, 4);
                } else {
                    ctx.rect(part.x * gridSize + margin, part.y * gridSize + margin, gridSize - margin*2, gridSize - margin*2);
                }
                ctx.fill();
                ctx.restore();
            }
        });
        
        ctx.shadowBlur = 0;
    }

    function move() {
        if (!running || paused) return;

        dx = nextDx;
        dy = nextDy;
        mouthOpen += mouthSpeed;

        // Atualiza as ondas: cada onda avança um segmento
        activeWaves = activeWaves.map(w => w + 1).filter(w => w < snake.length);

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (head.x < 0) head.x = tileCountX - 1;
        if (head.x >= tileCountX) head.x = 0;
        if (head.y < 0) head.y = tileCountY - 1;
        if (head.y >= tileCountY) head.y = 0;

        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                gameOver();
                return;
            }
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            activeWaves.push(0); // Inicia uma nova onda na cabeça
            
            if (score % 50 === 0) {
                level++;
                gameSpeed = Math.max(50, 100 - (level * 5));
            }
            updateHud();
            spawnFood();
        } else {
            snake.pop();
        }
    }

    function gameOver() {
        running = false;
        activeWaves = [];
        setMessage('Fim de Jogo', true, true);
    }

    function gameLoop() {
        move();
        draw();
        gameTimeout = setTimeout(gameLoop, gameSpeed);
    }

    function handleInput(dir) {
        if (!running && messageEl.classList.contains('is-interactive')) {
            start();
        }
        switch (dir) {
            case 'up': if (dy !== 1) { nextDx = 0; nextDy = -1; } break;
            case 'down': if (dy !== -1) { nextDx = 0; nextDy = 1; } break;
            case 'left': if (dx !== 1) { nextDx = -1; nextDy = 0; } break;
            case 'right': if (dx !== -1) { nextDx = 1; nextDy = 0; } break;
        }
    }

    function start() {
        if (!running) {
            if (snake.length === 0 || messageEl.textContent === 'Fim de Jogo') {
                initGame();
            }
            running = true;
            paused = false;
            setMessage('', false, false);
        }
    }

    function pause() {
        if (!running) return;
        paused = !paused;
        setMessage(paused ? 'Pausado' : '', paused, paused);
    }

    function reset() {
        clearTimeout(gameTimeout);
        initGame();
        running = false;
        paused = false;
        setMessage('Pressione iniciar', true, true);
        draw();
        gameLoop();
    }

    document.addEventListener('keydown', (e) => {
        const keys = {
            ArrowUp: 'up', w: 'up', W: 'up',
            ArrowDown: 'down', s: 'down', S: 'down',
            ArrowLeft: 'left', a: 'left', A: 'left',
            ArrowRight: 'right', d: 'right', D: 'right'
        };
        if (keys[e.key]) {
            e.preventDefault();
            handleInput(keys[e.key]);
        }
        if (e.key === ' ') {
            e.preventDefault();
            if (!running) start();
            else pause();
        }
    });

    startButton.addEventListener('click', start);
    pauseButton.addEventListener('click', pause);
    resetButton.addEventListener('click', reset);
    
    document.querySelectorAll('#snake-game .arcade-dpad button').forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.dataset.dir);
        });
    });

    messageEl.addEventListener('click', () => {
        if (messageEl.classList.contains('is-interactive')) start();
    });

    initGame();
    draw();
    gameLoop();
});
