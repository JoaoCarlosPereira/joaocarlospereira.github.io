document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pacman-game-canvas');

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('pacman-score');
    const livesEl = document.getElementById('pacman-lives');
    const levelEl = document.getElementById('pacman-level');
    const messageEl = document.getElementById('pacman-message');
    const startButton = document.getElementById('pacman-start');
    const pauseButton = document.getElementById('pacman-pause');
    const resetButton = document.getElementById('pacman-reset');

    const board = [
        '###################',
        '#........#........#',
        '#.##.###.#.###.##.#',
        '#o##.###.#.###.##o#',
        '#.................#',
        '#.##.#.#####.#.##.#',
        '#....#...#...#....#',
        '####.### # ###.####',
        '####.#       #.####',
        '####.# ## ## #.####',
        '     . #GGG# .     ',
        '####.# ##### #.####',
        '####.#       #.####',
        '####.# ##### #.####',
        '#........#........#',
        '#.##.###.#.###.##.#',
        '#o.#.....P.....#.o#',
        '##.#.#.#####.#.#.##',
        '#....#...#...#....#',
        '#.######.#.######.#',
        '#.................#',
        '###################'
    ];

    const rows = board.length;
    const cols = board[0].length;
    const tile = 32;
    const directions = {
        left: { x: -1, y: 0, angle: Math.PI },
        right: { x: 1, y: 0, angle: 0 },
        up: { x: 0, y: -1, angle: -Math.PI / 2 },
        down: { x: 0, y: 1, angle: Math.PI / 2 }
    };
    const ghostColors = ['#ff4d6d', '#34d3ff', '#ffb703'];

    let pellets = [];
    let powers = [];
    let pacman = null;
    let ghosts = [];
    let score = 0;
    let lives = 3;
    let level = 1;
    let running = false;
    let paused = false;
    let won = false;
    let lastTime = 0;
    let animationId = 0;
    let powerTimer = 0;

    function tileCenter(col, row) {
        return {
            x: col * tile + tile / 2,
            y: row * tile + tile / 2
        };
    }

    function gridAt(x, y) {
        return {
            col: Math.floor(x / tile),
            row: Math.floor(y / tile)
        };
    }

    function nearestGridAt(x, y) {
        return {
            col: Math.max(0, Math.min(cols - 1, Math.round((x - tile / 2) / tile))),
            row: Math.max(0, Math.min(rows - 1, Math.round((y - tile / 2) / tile)))
        };
    }

    function isWall(col, row) {
        if (row < 0 || row >= rows) {
            return true;
        }

        if (col < 0 || col >= cols) {
            return false;
        }

        return board[row][col] === '#';
    }

    function isWalkable(col, row) {
        return row >= 0 && row < rows && col >= 0 && col < cols && !isWall(col, row);
    }

    function canMove(entity, dir) {
        const nextX = entity.x + dir.x * entity.speed * 0.018;
        const nextY = entity.y + dir.y * entity.speed * 0.018;
        const margin = tile * 0.35;
        const checks = [
            gridAt(nextX - margin, nextY - margin),
            gridAt(nextX + margin, nextY - margin),
            gridAt(nextX - margin, nextY + margin),
            gridAt(nextX + margin, nextY + margin)
        ];

        return checks.every(function (check) {
            return !isWall(check.col, check.row);
        });
    }

    function wrap(entity) {
        if (entity.x < -tile / 2) {
            entity.x = cols * tile + tile / 2;
        } else if (entity.x > cols * tile + tile / 2) {
            entity.x = -tile / 2;
        }
    }

    function setMessage(text, visible, interactive) {
        messageEl.textContent = text;
        messageEl.classList.toggle('is-hidden', !visible);
        messageEl.classList.toggle('is-interactive', !!interactive);
    }

    function syncHud() {
        scoreEl.textContent = score;
        livesEl.textContent = lives;
        levelEl.textContent = level;
    }

    function roundedRectPath(x, y, width, height, radius) {
        const safeRadius = Math.min(radius, width / 2, height / 2);

        ctx.moveTo(x + safeRadius, y);
        ctx.lineTo(x + width - safeRadius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
        ctx.lineTo(x + width, y + height - safeRadius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
        ctx.lineTo(x + safeRadius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
        ctx.lineTo(x, y + safeRadius);
        ctx.quadraticCurveTo(x, y, x + safeRadius, y);
    }

    function buildLevel(keepScore) {
        pellets = [];
        powers = [];
        ghosts = [];
        won = false;
        powerTimer = 0;

        if (!keepScore) {
            score = 0;
            lives = 3;
            level = 1;
        }

        board.forEach(function (line, row) {
            line.split('').forEach(function (cell, col) {
                const center = tileCenter(col, row);

                if (cell === '.' || cell === 'P') {
                    pellets.push({ x: center.x, y: center.y, eaten: false });
                }

                if (cell === 'o') {
                    powers.push({ x: center.x, y: center.y, eaten: false });
                }

                if (cell === 'P') {
                    pacman = {
                        x: center.x,
                        y: center.y,
                        dir: directions.left,
                        nextDir: directions.left,
                        speed: 132 + level * 4,
                        mouth: 0,
                        radius: 12
                    };
                }

            });
        });

        [
            { col: 8, row: 8, dir: directions.up },
            { col: 9, row: 8, dir: directions.left },
            { col: 10, row: 8, dir: directions.up }
        ].forEach(function (spawn, index) {
            const center = tileCenter(spawn.col, spawn.row);

            ghosts.push({
                x: center.x,
                y: center.y,
                startX: center.x,
                startY: center.y,
                dir: spawn.dir,
                nextDir: spawn.dir,
                speed: 96 + level * 5,
                color: ghostColors[index % ghostColors.length],
                frightened: false
            });
        });

        syncHud();
    }

    function resetPositions() {
        const start = tileCenter(9, 16);
        pacman.x = start.x;
        pacman.y = start.y;
        pacman.dir = directions.left;
        pacman.nextDir = directions.left;
        ghosts.forEach(function (ghost) {
            ghost.x = ghost.startX;
            ghost.y = ghost.startY;
            ghost.dir = directions.up;
            ghost.nextDir = directions.up;
            ghost.frightened = false;
        });
        powerTimer = 0;
    }

    function eatPellets() {
        pellets.forEach(function (pellet) {
            if (!pellet.eaten && Math.hypot(pellet.x - pacman.x, pellet.y - pacman.y) < 16) {
                pellet.eaten = true;
                score += 10;
            }
        });

        powers.forEach(function (power) {
            if (!power.eaten && Math.hypot(power.x - pacman.x, power.y - pacman.y) < 18) {
                power.eaten = true;
                score += 50;
                powerTimer = 7;
                ghosts.forEach(function (ghost) {
                    ghost.frightened = true;
                });
            }
        });

        if (pellets.every(function (pellet) { return pellet.eaten; }) && powers.every(function (power) { return power.eaten; })) {
            won = true;
            level += 1;
            setMessage('Nivel concluido', true, false);
            window.setTimeout(function () {
                buildLevel(true);
                setMessage('', false, false);
            }, 1100);
        }

        syncHud();
    }

    function centered(entity) {
        return Math.abs((entity.x % tile) - tile / 2) < 5 && Math.abs((entity.y % tile) - tile / 2) < 5;
    }

    function snapToTileCenter(entity) {
        const cell = nearestGridAt(entity.x, entity.y);
        entity.x = cell.col * tile + tile / 2;
        entity.y = cell.row * tile + tile / 2;
    }

    function moveEntity(entity, delta) {
        if (entity.nextDir && canMove(entity, entity.nextDir)) {
            entity.dir = entity.nextDir;
        }

        if (canMove(entity, entity.dir)) {
            entity.x += entity.dir.x * entity.speed * delta;
            entity.y += entity.dir.y * entity.speed * delta;
        }

        wrap(entity);
    }

    function directionFromCells(from, to) {
        const dx = to.col - from.col;
        const dy = to.row - from.row;

        if (dx < 0) {
            return directions.left;
        }

        if (dx > 0) {
            return directions.right;
        }

        if (dy < 0) {
            return directions.up;
        }

        return directions.down;
    }

    function findNextStep(start, target, avoidReverse, scatter) {
        const queue = [{ cell: start, first: null, distance: 0 }];
        const visited = new Set([start.col + ',' + start.row]);
        let best = null;

        while (queue.length) {
            const current = queue.shift();

            if (current.cell.col === target.col && current.cell.row === target.row) {
                return current.first || current.cell;
            }

            if (!best || current.distance > best.distance) {
                best = current;
            }

            Object.keys(directions).forEach(function (key) {
                const dir = directions[key];
                const next = {
                    col: current.cell.col + dir.x,
                    row: current.cell.row + dir.y
                };
                const id = next.col + ',' + next.row;
                const reversing = avoidReverse && next.col === avoidReverse.col && next.row === avoidReverse.row;

                if (visited.has(id) || reversing || !isWalkable(next.col, next.row)) {
                    return;
                }

                visited.add(id);
                queue.push({
                    cell: next,
                    first: current.first || next,
                    distance: current.distance + 1
                });
            });
        }

        return scatter && best ? best.first : null;
    }

    function chooseGhostDirection(ghost) {
        const blocked = !canMove(ghost, ghost.dir);

        if (!centered(ghost) && !blocked) {
            return;
        }

        if (blocked) {
            snapToTileCenter(ghost);
        }

        const current = nearestGridAt(ghost.x, ghost.y);
        const target = nearestGridAt(pacman.x, pacman.y);
        const reverseCell = ghost.dir ? {
            col: current.col - ghost.dir.x,
            row: current.row - ghost.dir.y
        } : null;
        let next = findNextStep(current, target, reverseCell, ghost.frightened);

        if (!next) {
            next = findNextStep(current, target, null, ghost.frightened);
        }

        if (next && (next.col !== current.col || next.row !== current.row)) {
            ghost.nextDir = directionFromCells(current, next);
        }
    }

    function checkGhostCollisions() {
        ghosts.some(function (ghost) {
            if (Math.hypot(ghost.x - pacman.x, ghost.y - pacman.y) > 20) {
                return false;
            }

            if (ghost.frightened) {
                score += 200;
                ghost.x = ghost.startX;
                ghost.y = ghost.startY;
                ghost.frightened = false;
                syncHud();
                return true;
            }

            lives -= 1;
            syncHud();

            if (lives <= 0) {
                running = false;
                setMessage('Fim de jogo', true, true);
            } else {
                setMessage('Tente de novo', true, false);
                paused = true;
                window.setTimeout(function () {
                    resetPositions();
                    paused = false;
                    setMessage('', false, false);
                    lastTime = performance.now();
                }, 900);
            }

            return true;
        });
    }

    function drawMaze() {
        ctx.fillStyle = '#050b14';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (board[row][col] !== '#') {
                    continue;
                }

                const x = col * tile;
                const y = row * tile;
                ctx.fillStyle = 'rgba(18, 50, 83, 0.98)';
                ctx.strokeStyle = 'rgba(124, 231, 255, 0.82)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                roundedRectPath(x + 3, y + 3, tile - 6, tile - 6, 8);
                ctx.fill();
                ctx.stroke();
            }
        }
    }

    function drawPellets() {
        pellets.forEach(function (pellet) {
            if (pellet.eaten) {
                return;
            }

            ctx.fillStyle = '#7ce7ff';
            ctx.shadowColor = 'rgba(124, 231, 255, 0.5)';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(pellet.x, pellet.y, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        powers.forEach(function (power) {
            if (power.eaten) {
                return;
            }

            const pulse = 7 + Math.sin(performance.now() * 0.008) * 2;
            ctx.fillStyle = '#ffd166';
            ctx.shadowColor = 'rgba(255, 209, 102, 0.7)';
            ctx.shadowBlur = 16;
            ctx.beginPath();
            ctx.arc(power.x, power.y, pulse, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.shadowBlur = 0;
    }

    function drawPacman() {
        const open = 0.26 + Math.abs(Math.sin(pacman.mouth)) * 0.28;

        ctx.save();
        ctx.translate(pacman.x, pacman.y);
        ctx.rotate(pacman.dir.angle);
        ctx.fillStyle = '#ffd166';
        ctx.shadowColor = 'rgba(255, 209, 102, 0.62)';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, pacman.radius, open, Math.PI * 2 - open);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#06111f';
        ctx.beginPath();
        ctx.arc(2, -6, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawGhost(ghost) {
        ctx.save();
        ctx.translate(ghost.x, ghost.y);
        ctx.fillStyle = ghost.frightened ? '#4f8cff' : ghost.color;
        ctx.shadowColor = ghost.frightened ? 'rgba(79, 140, 255, 0.5)' : ghost.color;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(-13, 13);
        ctx.lineTo(-13, 0);
        ctx.arc(0, 0, 13, Math.PI, 0);
        ctx.lineTo(13, 13);
        ctx.lineTo(7, 9);
        ctx.lineTo(2, 13);
        ctx.lineTo(-3, 9);
        ctx.lineTo(-8, 13);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f4fbff';
        ctx.beginPath();
        ctx.arc(-5, -2, 4, 0, Math.PI * 2);
        ctx.arc(6, -2, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#06111f';
        ctx.beginPath();
        ctx.arc(-4, -1, 1.7, 0, Math.PI * 2);
        ctx.arc(7, -1, 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function draw() {
        drawMaze();
        drawPellets();
        ghosts.forEach(drawGhost);
        drawPacman();
    }

    function update(delta) {
        if (!running || paused || won) {
            return;
        }

        pacman.mouth += delta * 13;
        moveEntity(pacman, delta);

        ghosts.forEach(function (ghost) {
            chooseGhostDirection(ghost);
            moveEntity(ghost, delta);
        });

        if (powerTimer > 0) {
            powerTimer -= delta;
            if (powerTimer <= 0) {
                ghosts.forEach(function (ghost) {
                    ghost.frightened = false;
                });
            }
        }

        eatPellets();
        checkGhostCollisions();
    }

    function loop(time) {
        const delta = Math.min((time - lastTime) / 1000 || 0, 0.035);
        lastTime = time;
        update(delta);
        draw();
        animationId = window.requestAnimationFrame(loop);
    }

    function startGame() {
        if (lives <= 0) {
            resetGame();
        }

        if (!running) {
            running = true;
        }

        paused = false;
        setMessage('', false, false);
        lastTime = performance.now();
    }

    function resetGame() {
        running = false;
        paused = false;
        buildLevel(false);
        setMessage('Pressione iniciar', true, true);
        draw();
    }

    function setDirection(name) {
        if (directions[name]) {
            pacman.nextDir = directions[name];
        }
    }

    document.addEventListener('keydown', function (event) {
        const keys = {
            ArrowLeft: 'left',
            a: 'left',
            A: 'left',
            ArrowRight: 'right',
            d: 'right',
            D: 'right',
            ArrowUp: 'up',
            w: 'up',
            W: 'up',
            ArrowDown: 'down',
            s: 'down',
            S: 'down'
        };

        if (keys[event.key]) {
            event.preventDefault();
            setDirection(keys[event.key]);
        }

        if (event.key === ' ') {
            event.preventDefault();
            if (!running) {
                startGame();
                return;
            }

            paused = !paused;
            setMessage(paused ? 'Pausado' : '', paused, paused);
        }
    });

    messageEl.addEventListener('click', function () {
        if (messageEl.classList.contains('is-interactive')) {
            startGame();
        }
    });

    document.querySelectorAll('.arcade-dpad button').forEach(function (button) {
        button.addEventListener('click', function () {
            setDirection(button.dataset.dir);
            startGame();
        });
    });

    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', function () {
        if (!running) {
            return;
        }

        paused = !paused;
        setMessage(paused ? 'Pausado' : '', paused, paused);
    });
    resetButton.addEventListener('click', resetGame);

    buildLevel(false);
    setMessage('Pressione iniciar', true, true);
    draw();
    animationId = window.requestAnimationFrame(loop);

    window.addEventListener('beforeunload', function () {
        window.cancelAnimationFrame(animationId);
    });
});
