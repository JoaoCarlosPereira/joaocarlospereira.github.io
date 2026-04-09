/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('pacman-background');

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let lanes = [];
    let pellets = [];
    let ghosts = [];
    let sparks = [];
    let pacman = null;
    let animationId = 0;
    let lastFrame = 0;

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildScene();
    }

    function buildScene() {
        const laneCount = Math.max(5, Math.min(8, Math.round(height / 150)));
        const spacing = height / (laneCount + 1);
        lanes = [];
        pellets = [];
        ghosts = [];
        sparks = [];

        for (let i = 0; i < laneCount; i++) {
            const y = spacing * (i + 1);
            const amplitude = 10 + (i % 3) * 5;
            const speed = 34 + i * 4;
            const phase = i * 0.8;
            lanes.push({ y, amplitude, speed, phase });

            const pelletGap = 54 + (i % 2) * 12;
            const pelletCount = Math.ceil((width + 280) / pelletGap);

            for (let j = 0; j < pelletCount; j++) {
                pellets.push({
                    lane: i,
                    x: j * pelletGap - 140,
                    baseY: y,
                    radius: j % 9 === 0 ? 4.8 : 3.1,
                    alpha: j % 9 === 0 ? 0.95 : 0.75,
                    offset: (j % 4) * 0.9
                });
            }
        }

        const activeLane = Math.floor(laneCount * 0.5);
        pacman = {
            lane: activeLane,
            x: -60,
            y: lanes[activeLane].y,
            radius: 18,
            speed: Math.max(82, width * 0.082),
            mouth: 0,
            mouthSpeed: 7.5
        };

        const ghostPalette = [
            { body: '#ff4d6d', eye: '#d9f6ff' },
            { body: '#34d3ff', eye: '#ffffff' },
            { body: '#ffb703', eye: '#ffffff' }
        ];

        for (let i = 0; i < 3; i++) {
            const laneIndex = (activeLane + i + 1) % lanes.length;
            ghosts.push({
                lane: laneIndex,
                x: width + 180 + i * 160,
                y: lanes[laneIndex].y,
                width: 28,
                height: 28,
                speed: 62 + i * 8,
                bob: i * 1.5,
                color: ghostPalette[i]
            });
        }
    }

    function laneY(laneIndex, x, time) {
        const lane = lanes[laneIndex];
        return lane.y + Math.sin((x * 0.0055) + time * 0.0012 + lane.phase) * lane.amplitude;
    }

    function drawGrid(time) {
        ctx.save();
        ctx.strokeStyle = 'rgba(75, 140, 255, 0.08)';
        ctx.lineWidth = 1;

        for (let x = -40; x < width + 40; x += 48) {
            ctx.beginPath();
            ctx.moveTo(x + Math.sin(time * 0.0003 + x * 0.01) * 6, 0);
            ctx.lineTo(x + Math.sin(time * 0.0003 + x * 0.01) * 6, height);
            ctx.stroke();
        }

        for (let y = -40; y < height + 40; y += 48) {
            ctx.beginPath();
            ctx.moveTo(0, y + Math.cos(time * 0.00025 + y * 0.01) * 6);
            ctx.lineTo(width, y + Math.cos(time * 0.00025 + y * 0.01) * 6);
            ctx.stroke();
        }

        ctx.restore();
    }

    function drawLanes(time) {
        lanes.forEach(function (lane, index) {
            ctx.beginPath();
            ctx.lineWidth = index === pacman.lane ? 2.4 : 1.2;
            ctx.strokeStyle = index === pacman.lane ? 'rgba(52, 211, 255, 0.22)' : 'rgba(52, 211, 255, 0.1)';

            for (let x = -80; x <= width + 80; x += 8) {
                const y = laneY(index, x, time);
                if (x === -80) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            ctx.stroke();
        });
    }

    function drawPellets(time, delta) {
        pellets.forEach(function (pellet) {
            pellet.x -= lanes[pellet.lane].speed * delta;

            if (pellet.x < -160) {
                pellet.x = width + 160 + Math.random() * 40;
            }

            const y = laneY(pellet.lane, pellet.x, time) + Math.sin(time * 0.003 + pellet.offset) * 1.5;
            const glow = pellet.radius > 4 ? 14 : 8;

            ctx.beginPath();
            ctx.fillStyle = pellet.radius > 4 ? 'rgba(255, 190, 92, ' + pellet.alpha + ')' : 'rgba(139, 239, 255, ' + pellet.alpha + ')';
            ctx.shadowColor = pellet.radius > 4 ? 'rgba(255, 190, 92, 0.5)' : 'rgba(139, 239, 255, 0.4)';
            ctx.shadowBlur = glow;
            ctx.arc(pellet.x, y, pellet.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function spawnSpark(x, y) {
        sparks.push({
            x,
            y,
            life: 1,
            radius: 2 + Math.random() * 2,
            vx: -0.8 - Math.random() * 1.2,
            vy: (Math.random() - 0.5) * 1.2
        });
    }

    function drawPacman(time, delta) {
        pacman.x += pacman.speed * delta;

        if (pacman.x - pacman.radius > width + 80) {
            pacman.x = -80;
            pacman.lane = (pacman.lane + 1) % lanes.length;
        }

        pacman.y = laneY(pacman.lane, pacman.x, time);
        pacman.mouth = 0.22 + (Math.sin(time * 0.02 * pacman.mouthSpeed) + 1) * 0.17;

        if (Math.random() > 0.72) {
            spawnSpark(pacman.x - pacman.radius * 0.5, pacman.y);
        }

        ctx.save();
        ctx.translate(pacman.x, pacman.y);
        ctx.fillStyle = '#ffd166';
        ctx.shadowColor = 'rgba(255, 209, 102, 0.55)';
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, pacman.radius, pacman.mouth, Math.PI * 2 - pacman.mouth);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#0b1020';
        ctx.beginPath();
        ctx.arc(4, -8, 2.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawGhost(ghost, time, delta) {
        ghost.x -= ghost.speed * delta;

        if (ghost.x < -120) {
            ghost.x = width + 120 + Math.random() * 220;
            ghost.lane = (ghost.lane + 2) % lanes.length;
        }

        ghost.y = laneY(ghost.lane, ghost.x, time) + Math.sin(time * 0.004 + ghost.bob) * 4;

        ctx.save();
        ctx.translate(ghost.x, ghost.y);
        ctx.fillStyle = ghost.color.body;
        ctx.shadowColor = ghost.color.body;
        ctx.shadowBlur = 18;

        ctx.beginPath();
        ctx.moveTo(-ghost.width / 2, ghost.height / 2);
        ctx.lineTo(-ghost.width / 2, 0);
        ctx.arc(0, 0, ghost.width / 2, Math.PI, 0);
        ctx.lineTo(ghost.width / 2, ghost.height / 2);

        for (let i = 0; i < 4; i++) {
            const waveX = ghost.width / 2 - i * (ghost.width / 3);
            const waveY = ghost.height / 2 + (i % 2 === 0 ? 4 : -2);
            ctx.quadraticCurveTo(waveX - 4, waveY, waveX - 8, ghost.height / 2);
        }

        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;
        ctx.fillStyle = ghost.color.eye;
        ctx.beginPath();
        ctx.arc(-6, -2, 4.5, 0, Math.PI * 2);
        ctx.arc(6, -2, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#14213d';
        ctx.beginPath();
        ctx.arc(-5 + Math.sin(time * 0.003) * 1.2, -1, 2.1, 0, Math.PI * 2);
        ctx.arc(7 + Math.sin(time * 0.003) * 1.2, -1, 2.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    function drawSparks(delta) {
        sparks = sparks.filter(function (spark) {
            spark.x += spark.vx * 60 * delta;
            spark.y += spark.vy * 60 * delta;
            spark.life -= 0.03;

            if (spark.life <= 0) {
                return false;
            }

            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 209, 102, ' + spark.life + ')';
            ctx.arc(spark.x, spark.y, spark.radius * spark.life, 0, Math.PI * 2);
            ctx.fill();
            return true;
        });
    }

    function render(time) {
        if (!lastFrame) {
            lastFrame = time;
        }

        const delta = Math.min((time - lastFrame) / 1000, 0.033);
        lastFrame = time;

        ctx.clearRect(0, 0, width, height);
        drawGrid(time);
        drawLanes(time);
        drawPellets(time, delta);
        drawPacman(time, delta);
        ghosts.forEach(function (ghost) {
            drawGhost(ghost, time, delta);
        });
        drawSparks(delta);

        if (!motionQuery.matches) {
            animationId = window.requestAnimationFrame(render);
        }
    }

    function renderStatic(time) {
        ctx.clearRect(0, 0, width, height);
        drawGrid(time);
        drawLanes(time);
        drawPellets(time, 0.016);
        drawPacman(time, 0.016);
        ghosts.forEach(function (ghost) {
            drawGhost(ghost, time, 0.016);
        });
    }

    function handleMotionChange() {
        window.cancelAnimationFrame(animationId);
        lastFrame = 0;

        if (motionQuery.matches) {
            renderStatic(performance.now());
        } else {
            animationId = window.requestAnimationFrame(render);
        }
    }

    resizeCanvas();
    handleMotionChange();
    window.addEventListener('resize', resizeCanvas);

    if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', handleMotionChange);
    } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(handleMotionChange);
    }
});
