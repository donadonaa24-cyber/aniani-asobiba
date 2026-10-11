(function (root, factory) {
    const api = factory();
    root.AnianiBreakout = api;
    if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    // ブロック崩し（全5ステージ）。ゲームの進行（step）と描画（draw）だけを持ち、
    // ボタン・キー入力・HUDの更新は aniani.js が行う。
    const WIDTH = 360;
    const HEIGHT = 480;
    const COLS = 10;
    const BRICK_W = 30;
    const BRICK_H = 14;
    const BRICK_GAP = 4;
    const BRICK_LEFT = 12;
    const BRICK_TOP = 56;
    const PADDLE_W = 64;
    const PADDLE_WIDE = 100;
    const PADDLE_H = 9;
    const PADDLE_Y = HEIGHT - 30;
    const BALL_R = 5;
    const MAX_BALLS = 6;
    const START_LIVES = 3;

    // 文字1つがブロック1個。c/b/g/y=1回、r=2回、s=3回、p=爆発、i=アイテム確定、x=壊れない。
    const BRICKS = Object.freeze({
        c: { hp: 1, score: 10, top: "#7ef0ff", bottom: "#1590b8" },
        b: { hp: 1, score: 10, top: "#8fb6ff", bottom: "#2e4fc4" },
        g: { hp: 1, score: 10, top: "#9cf5a8", bottom: "#1f9a52" },
        y: { hp: 1, score: 10, top: "#fff2a0", bottom: "#d69b14" },
        r: { hp: 2, score: 30, top: "#ff9a8c", bottom: "#c4202c" },
        s: { hp: 3, score: 50, top: "#f4f8ff", bottom: "#7d8ca6" },
        p: { hp: 1, score: 20, top: "#e3a6ff", bottom: "#7a2bc4", bomb: true },
        i: { hp: 1, score: 20, top: "#fff6c8", bottom: "#e0a100", item: true },
        x: { hp: Infinity, score: 0, top: "#5b6b82", bottom: "#222c3c", solid: true }
    });

    const ITEMS = Object.freeze({
        pierce: { label: "貫", name: "貫通ボール", color: "#ff8a3d", weight: 3 },
        multi: { label: "増", name: "ボール増加", color: "#4fe3ff", weight: 3 },
        wide: { label: "広", name: "ワイドパドル", color: "#7dff9a", weight: 3 },
        slow: { label: "遅", name: "スロー", color: "#9fb4ff", weight: 2 },
        life: { label: "♥", name: "残機+1", color: "#ff7ac8", weight: 1 }
    });
    const EFFECT_MS = { pierce: 8000, wide: 12000, slow: 8000 };

    const STAGES = Object.freeze([
        {
            name: "はじまりの星",
            speed: 3.6,
            rows: [
                "cccccccccc",
                "bbbibbibbb",
                "gggggggggg",
                "yyyyyyyyyy"
            ]
        },
        {
            name: "赤いレンガ",
            speed: 4.0,
            rows: [
                "rrrrrrrrrr",
                "ccicccccic",
                "bbbbbbbbbb",
                ".gggppggg.",
                "..yyyyyy.."
            ]
        },
        {
            name: "銀の城門",
            speed: 4.4,
            rows: [
                "srrrrrrrrs",
                "rccciicccr",
                "rbbbppbbbr",
                "gg.gggg.gg",
                "yyyyyyyyyy",
                "s........s"
            ]
        },
        {
            name: "鋼鉄の迷路",
            speed: 4.8,
            rows: [
                "xx.ssss.xx",
                "rrrrrrrrrr",
                "bbpbiibpbb",
                "x.cccccc.x",
                "ggggxxgggg",
                "yyiyyyyiyy"
            ]
        },
        {
            name: "星の王座",
            speed: 5.2,
            rows: [
                "ssssssssss",
                "srrrpprrrs",
                "xriccccirx",
                "rbbbppbbbr",
                "x.gggggg.x",
                "ssyyiiyyss",
                "rrrr..rrrr"
            ]
        }
    ]);

    function brickTypes() { return BRICKS; }

    function buildBricks(stage) {
        const bricks = [];
        stage.rows.forEach((line, row) => {
            [...line].forEach((kind, col) => {
                const type = BRICKS[kind];
                if (!type) return;
                bricks.push({
                    kind,
                    row,
                    col,
                    x: BRICK_LEFT + col * (BRICK_W + BRICK_GAP),
                    y: BRICK_TOP + row * (BRICK_H + BRICK_GAP),
                    w: BRICK_W,
                    h: BRICK_H,
                    hp: type.hp,
                    maxHp: type.hp,
                    flash: 0,
                    alive: true
                });
            });
        });
        return bricks;
    }

    function createGame() {
        return {
            phase: "idle", // idle → ready（ボールがパドル上）→ playing → clear / over / complete
            stageIndex: 0,
            score: 0,
            lives: START_LIVES,
            paddleX: (WIDTH - PADDLE_W) / 2,
            paddleW: PADDLE_W,
            hold: { left: false, right: false },
            balls: [],
            bricks: buildBricks(STAGES[0]),
            items: [],
            particles: [],
            effects: { pierce: 0, wide: 0, slow: 0 },
            banner: null,
            shake: 0,
            readyTimer: 0,
            phaseTimer: 0,
            events: []
        };
    }

    function stageSpeed(game) {
        const base = STAGES[game.stageIndex].speed;
        return game.effects.slow > 0 ? base * 0.68 : base;
    }

    function attachBall(game) {
        game.balls = [{ x: game.paddleX + game.paddleW / 2, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0, stuck: true, trail: [] }];
        game.phase = "ready";
        game.readyTimer = 1800;
    }

    function loadStage(game, index) {
        game.stageIndex = index;
        game.bricks = buildBricks(STAGES[index]);
        game.items = [];
        game.particles = [];
        game.effects = { pierce: 0, wide: 0, slow: 0 };
        game.paddleW = PADDLE_W;
        game.paddleX = (WIDTH - PADDLE_W) / 2;
        game.banner = { title: `STAGE ${index + 1}`, sub: STAGES[index].name, ms: 1800 };
        attachBall(game);
    }

    function newGame(game) {
        Object.assign(game, createGame());
        loadStage(game, 0);
        game.events.push({ type: "start" });
    }

    function launch(game, random = Math.random) {
        if (game.phase !== "ready") return false;
        const speed = stageSpeed(game);
        for (const ball of game.balls) {
            if (!ball.stuck) continue;
            const angle = (random() - 0.5) * 0.9;
            ball.vx = Math.sin(angle) * speed;
            ball.vy = -Math.cos(angle) * speed;
            ball.stuck = false;
        }
        game.phase = "playing";
        game.banner = null;
        return true;
    }

    function setPaddleCenter(game, x) {
        game.paddleX = Math.max(0, Math.min(WIDTH - game.paddleW, x - game.paddleW / 2));
        for (const ball of game.balls) if (ball.stuck) ball.x = game.paddleX + game.paddleW / 2;
    }

    function nudgePaddle(game, direction, amount = 26) {
        setPaddleCenter(game, game.paddleX + game.paddleW / 2 + (direction === "left" ? -amount : amount));
    }

    function burst(game, x, y, color, count) {
        for (let i = 0; i < count; i += 1) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.6 + Math.random() * 2.4;
            game.particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 0.6, life: 1, color });
        }
        if (game.particles.length > 260) game.particles.splice(0, game.particles.length - 260);
    }

    function pickItem(random) {
        const entries = Object.entries(ITEMS);
        let roll = random() * entries.reduce((sum, [, item]) => sum + item.weight, 0);
        for (const [key, item] of entries) {
            roll -= item.weight;
            if (roll < 0) return key;
        }
        return entries[0][0];
    }

    function destroyBrick(game, brick, random) {
        const type = BRICKS[brick.kind];
        brick.alive = false;
        brick.hp = 0;
        game.score += type.score;
        burst(game, brick.x + brick.w / 2, brick.y + brick.h / 2, type.top, type.bomb ? 26 : 12);
        if (type.item || random() < 0.12) {
            game.items.push({ kind: pickItem(random), x: brick.x + brick.w / 2, y: brick.y + brick.h / 2, vy: 1.5 });
        }
        if (type.bomb) {
            game.shake = 8;
            game.events.push({ type: "bomb" });
            for (const other of game.bricks) {
                if (!other.alive || BRICKS[other.kind].solid) continue;
                if (Math.abs(other.row - brick.row) <= 1 && Math.abs(other.col - brick.col) <= 1) destroyBrick(game, other, random);
            }
        }
    }

    function hitBrick(game, brick, pierce, random) {
        const type = BRICKS[brick.kind];
        if (type.solid) {
            brick.flash = 1;
            return;
        }
        brick.hp -= pierce ? brick.hp : 1;
        brick.flash = 1;
        if (brick.hp <= 0) destroyBrick(game, brick, random);
        else game.score += 5;
    }

    function applyItem(game, kind) {
        game.events.push({ type: "item", kind });
        if (kind === "life") game.lives += 1;
        else if (kind === "multi") {
            const source = game.balls.find((ball) => !ball.stuck) || game.balls[0];
            if (!source) return;
            const speed = Math.hypot(source.vx, source.vy) || stageSpeed(game);
            for (const turn of [-0.45, 0.45]) {
                if (game.balls.length >= MAX_BALLS) break;
                const angle = Math.atan2(source.vx, -source.vy) + turn;
                game.balls.push({ x: source.x, y: source.y, vx: Math.sin(angle) * speed, vy: -Math.abs(Math.cos(angle) * speed), stuck: source.stuck, trail: [] });
            }
        } else {
            const wasSlow = game.effects.slow > 0;
            game.effects[kind] = EFFECT_MS[kind];
            if (kind === "wide") {
                const center = game.paddleX + game.paddleW / 2;
                game.paddleW = PADDLE_WIDE;
                setPaddleCenter(game, center);
            }
            if (kind === "slow" && !wasSlow) {
                for (const ball of game.balls) { ball.vx *= 0.68; ball.vy *= 0.68; }
            }
        }
    }

    function moveBall(game, ball, dt, random) {
        const pierce = game.effects.pierce > 0;
        const distance = Math.hypot(ball.vx, ball.vy) * dt;
        const steps = Math.max(1, Math.ceil(distance / (BALL_R * 0.8)));
        for (let s = 0; s < steps; s += 1) {
            ball.x += (ball.vx * dt) / steps;
            ball.y += (ball.vy * dt) / steps;
            if (ball.x < BALL_R) { ball.x = BALL_R; ball.vx = Math.abs(ball.vx); }
            if (ball.x > WIDTH - BALL_R) { ball.x = WIDTH - BALL_R; ball.vx = -Math.abs(ball.vx); }
            if (ball.y < BALL_R) { ball.y = BALL_R; ball.vy = Math.abs(ball.vy); }

            // パドル：当たった位置で反射角を変える（端ほど斜め）。
            if (ball.vy > 0 && ball.y + BALL_R >= PADDLE_Y && ball.y - BALL_R <= PADDLE_Y + PADDLE_H &&
                ball.x >= game.paddleX - BALL_R && ball.x <= game.paddleX + game.paddleW + BALL_R) {
                const offset = Math.max(-1, Math.min(1, (ball.x - (game.paddleX + game.paddleW / 2)) / (game.paddleW / 2)));
                const speed = Math.min(Math.hypot(ball.vx, ball.vy) * 1.012, stageSpeed(game) * 1.35);
                const angle = offset * 1.05;
                ball.vx = Math.sin(angle) * speed;
                ball.vy = -Math.cos(angle) * speed;
                ball.y = PADDLE_Y - BALL_R;
                game.paddleFlash = 1;
                game.events.push({ type: "paddle" });
            }

            for (const brick of game.bricks) {
                if (!brick.alive) continue;
                const nearX = Math.max(brick.x, Math.min(ball.x, brick.x + brick.w));
                const nearY = Math.max(brick.y, Math.min(ball.y, brick.y + brick.h));
                const dx = ball.x - nearX;
                const dy = ball.y - nearY;
                if (dx * dx + dy * dy > BALL_R * BALL_R) continue;
                const solid = BRICKS[brick.kind].solid;
                hitBrick(game, brick, pierce, random);
                game.events.push({ type: solid ? "steel" : "brick" });
                if (pierce && !solid) continue; // 貫通中は壊しながら突き抜ける
                const overlapX = Math.min(ball.x + BALL_R - brick.x, brick.x + brick.w - (ball.x - BALL_R));
                const overlapY = Math.min(ball.y + BALL_R - brick.y, brick.y + brick.h - (ball.y - BALL_R));
                if (overlapX < overlapY) {
                    ball.vx = ball.x < brick.x + brick.w / 2 ? -Math.abs(ball.vx) : Math.abs(ball.vx);
                    ball.x += ball.vx > 0 ? overlapX : -overlapX;
                } else {
                    ball.vy = ball.y < brick.y + brick.h / 2 ? -Math.abs(ball.vy) : Math.abs(ball.vy);
                    ball.y += ball.vy > 0 ? overlapY : -overlapY;
                }
                break;
            }
            // 真横に近い往復で止まらないよう、縦の速さに下限を付ける。
            const speed = Math.hypot(ball.vx, ball.vy);
            if (Math.abs(ball.vy) < speed * 0.28) {
                ball.vy = Math.sign(ball.vy || -1) * speed * 0.28;
                ball.vx = Math.sign(ball.vx || 1) * Math.sqrt(speed * speed - ball.vy * ball.vy);
            }
        }
    }

    // dt は 60fps の1フレームを1とした経過量。ms は実時間（効果時間・演出用）。
    function step(game, dt, ms, random = Math.random) {
        game.events = [];
        game.shake = Math.max(0, game.shake - dt);
        game.paddleFlash = Math.max(0, (game.paddleFlash || 0) - 0.08 * dt);
        for (const brick of game.bricks) brick.flash = Math.max(0, brick.flash - 0.1 * dt);
        for (const particle of game.particles) {
            particle.x += particle.vx * dt;
            particle.y += particle.vy * dt;
            particle.vy += 0.08 * dt;
            particle.life -= 0.03 * dt;
        }
        game.particles = game.particles.filter((particle) => particle.life > 0);
        if (game.banner) {
            game.banner.ms -= ms;
            if (game.banner.ms <= 0 && game.phase !== "ready") game.banner = null;
        }

        if (game.phase === "clear" || game.phase === "complete" || game.phase === "over" || game.phase === "idle") {
            if (game.phase === "clear") {
                game.phaseTimer -= ms;
                if (game.phaseTimer <= 0) loadStage(game, game.stageIndex + 1);
            }
            return game;
        }

        const holdSpeed = 6.2 * dt;
        if (game.hold.left) setPaddleCenter(game, game.paddleX + game.paddleW / 2 - holdSpeed);
        if (game.hold.right) setPaddleCenter(game, game.paddleX + game.paddleW / 2 + holdSpeed);

        if (game.phase === "ready") {
            game.readyTimer -= ms;
            if (game.readyTimer <= 0) launch(game, random);
            return game;
        }

        for (const key of Object.keys(game.effects)) {
            if (game.effects[key] <= 0) continue;
            game.effects[key] = Math.max(0, game.effects[key] - ms);
            if (game.effects[key] > 0) continue;
            if (key === "wide") {
                const center = game.paddleX + game.paddleW / 2;
                game.paddleW = PADDLE_W;
                setPaddleCenter(game, center);
            }
            if (key === "slow") {
                for (const ball of game.balls) { ball.vx /= 0.68; ball.vy /= 0.68; }
            }
        }

        for (const ball of game.balls) {
            ball.trail.push({ x: ball.x, y: ball.y });
            if (ball.trail.length > 14) ball.trail.shift();
            moveBall(game, ball, dt, random);
        }
        game.balls = game.balls.filter((ball) => ball.y - BALL_R <= HEIGHT);

        for (const item of game.items) {
            item.y += item.vy * dt;
            if (item.y + 7 >= PADDLE_Y && item.y - 7 <= PADDLE_Y + PADDLE_H &&
                item.x >= game.paddleX - 10 && item.x <= game.paddleX + game.paddleW + 10) {
                item.taken = true;
                applyItem(game, item.kind);
            }
        }
        game.items = game.items.filter((item) => !item.taken && item.y < HEIGHT + 12);

        if (!game.bricks.some((brick) => brick.alive && !BRICKS[brick.kind].solid)) {
            const bonus = game.lives * 100;
            game.score += bonus;
            game.items = [];
            game.balls = [];
            if (game.stageIndex + 1 >= STAGES.length) {
                game.phase = "complete";
                game.banner = { title: "ALL CLEAR!", sub: `全ステージ制覇！ 残機ボーナス +${bonus}`, ms: Infinity };
                game.events.push({ type: "complete" });
            } else {
                game.phase = "clear";
                game.phaseTimer = 2200;
                game.banner = { title: "STAGE CLEAR!", sub: `残機ボーナス +${bonus}`, ms: 2200 };
                game.events.push({ type: "clear" });
            }
            return game;
        }

        if (!game.balls.length) {
            game.lives -= 1;
            game.items = [];
            game.effects = { pierce: 0, wide: 0, slow: 0 };
            game.paddleW = PADDLE_W;
            setPaddleCenter(game, game.paddleX + game.paddleW / 2);
            if (game.lives <= 0) {
                game.phase = "over";
                game.banner = { title: "GAME OVER", sub: "スタートでステージ1から再挑戦", ms: Infinity };
                game.events.push({ type: "over" });
            } else {
                attachBall(game);
                game.banner = { title: "MISS!", sub: `残機 ${game.lives}`, ms: 1400 };
                game.events.push({ type: "miss" });
            }
        }
        return game;
    }

    // ---- 描画 ----
    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function drawBrick(ctx, brick) {
        const type = BRICKS[brick.kind];
        const { x, y, w, h } = brick;
        const gradient = ctx.createLinearGradient(0, y, 0, y + h);
        gradient.addColorStop(0, type.top);
        gradient.addColorStop(1, type.bottom);
        roundRect(ctx, x, y, w, h, 3);
        ctx.fillStyle = gradient;
        ctx.fill();
        // 上面のつやと下側の影で、ブロックに厚みを出す。
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.fillRect(x + 3, y + 2, w - 6, 2);
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(x + 1, y + h - 3, w - 2, 2);
        if (brick.kind === "r" && brick.hp < brick.maxHp) {
            ctx.strokeStyle = "rgba(60,0,0,0.75)";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x + 8, y + 1);
            ctx.lineTo(x + 13, y + 7);
            ctx.lineTo(x + 10, y + 13);
            ctx.moveTo(x + 13, y + 7);
            ctx.lineTo(x + 21, y + 9);
            ctx.stroke();
        }
        if (brick.kind === "s") {
            ctx.fillStyle = "#2a3550";
            for (let i = 0; i < brick.hp; i += 1) {
                ctx.beginPath();
                ctx.arc(x + w / 2 + (i - (brick.hp - 1) / 2) * 6, y + h / 2 + 1, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        if (brick.kind === "x") {
            ctx.fillStyle = "#9aa9c0";
            for (const [px, py] of [[4, 4], [w - 4, 4], [4, h - 4], [w - 4, h - 4]]) {
                ctx.beginPath();
                ctx.arc(x + px, y + py, 1.3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        if (brick.kind === "p" || brick.kind === "i") {
            ctx.fillStyle = brick.kind === "p" ? "#fff0ff" : "#7a4a00";
            ctx.font = "bold 10px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(brick.kind === "p" ? "✸" : "★", x + w / 2, y + h / 2 + 1);
        }
        if (brick.flash > 0) {
            roundRect(ctx, x, y, w, h, 3);
            ctx.fillStyle = `rgba(255,255,255,${brick.flash * 0.6})`;
            ctx.fill();
        }
    }

    function draw(ctx, game, time = 0) {
        ctx.save();
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        const background = ctx.createLinearGradient(0, 0, 0, HEIGHT);
        background.addColorStop(0, "#0a1630");
        background.addColorStop(1, "#030812");
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.strokeStyle = "rgba(120,180,255,0.06)";
        ctx.lineWidth = 1;
        for (let gx = 0; gx <= WIDTH; gx += 24) { ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, HEIGHT); ctx.stroke(); }
        for (let gy = 0; gy <= HEIGHT; gy += 24) { ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(WIDTH, gy); ctx.stroke(); }

        if (game.shake > 0) ctx.translate((Math.random() - 0.5) * game.shake, (Math.random() - 0.5) * game.shake);

        for (const brick of game.bricks) if (brick.alive) drawBrick(ctx, brick);

        for (const particle of game.particles) {
            ctx.globalAlpha = Math.max(0, particle.life);
            ctx.fillStyle = particle.color;
            ctx.fillRect(particle.x - 1.5, particle.y - 1.5, 3, 3);
        }
        ctx.globalAlpha = 1;

        for (const item of game.items) {
            const info = ITEMS[item.kind];
            ctx.shadowColor = info.color;
            ctx.shadowBlur = 10;
            roundRect(ctx, item.x - 13, item.y - 7, 26, 14, 7);
            ctx.fillStyle = info.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#06101f";
            ctx.font = "bold 10px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(info.label, item.x, item.y + 1);
        }

        // パドル
        const paddleGradient = ctx.createLinearGradient(0, PADDLE_Y, 0, PADDLE_Y + PADDLE_H);
        paddleGradient.addColorStop(0, game.effects.wide > 0 ? "#c8ffd2" : "#ffe7a8");
        paddleGradient.addColorStop(1, game.effects.wide > 0 ? "#2fae5a" : "#d98a1c");
        ctx.shadowColor = game.effects.wide > 0 ? "#7dff9a" : "#ffc35a";
        ctx.shadowBlur = 8 + (game.paddleFlash || 0) * 14;
        roundRect(ctx, game.paddleX, PADDLE_Y, game.paddleW, PADDLE_H, 4.5);
        ctx.fillStyle = paddleGradient;
        ctx.fill();
        ctx.shadowBlur = 0;

        // ボール：残像と光。貫通中は炎のような色。
        const pierce = game.effects.pierce > 0;
        for (const ball of game.balls) {
            ball.trail.forEach((point, index) => {
                const alpha = (index + 1) / ball.trail.length;
                ctx.globalAlpha = alpha * (pierce ? 0.65 : 0.42);
                ctx.fillStyle = pierce ? (index % 2 ? "#ffcf4a" : "#ff6a2a") : "#8fe6ff";
                ctx.beginPath();
                ctx.arc(point.x, point.y, BALL_R * (0.35 + alpha * (pierce ? 0.85 : 0.55)), 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            const glowR = BALL_R * (pierce ? 4.4 : 3.4);
            const glow = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, glowR);
            glow.addColorStop(0, pierce ? "rgba(255,140,60,0.7)" : "rgba(150,230,255,0.55)");
            glow.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, glowR, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = pierce ? "#fff1c4" : "#ffffff";
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, BALL_R, 0, Math.PI * 2);
            ctx.fill();
        }

        // 効果の残り時間
        let badgeX = 8;
        for (const key of ["pierce", "wide", "slow"]) {
            if (game.effects[key] <= 0) continue;
            const info = ITEMS[key];
            ctx.fillStyle = "rgba(4,10,24,0.75)";
            roundRect(ctx, badgeX, HEIGHT - 16, 74, 12, 6);
            ctx.fill();
            ctx.fillStyle = info.color;
            roundRect(ctx, badgeX, HEIGHT - 16, 74 * (game.effects[key] / EFFECT_MS[key]), 12, 6);
            ctx.fill();
            ctx.fillStyle = "#06101f";
            ctx.font = "bold 9px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(info.name, badgeX + 37, HEIGHT - 9.5);
            badgeX += 80;
        }

        ctx.fillStyle = "rgba(220,236,255,0.75)";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText(`STAGE ${game.stageIndex + 1}/${STAGES.length}`, 8, 8);
        ctx.textAlign = "right";
        ctx.fillText(`${"♥".repeat(Math.max(0, Math.min(game.lives, 6)))}`, WIDTH - 8, 8);

        if (game.banner) {
            ctx.fillStyle = "rgba(2,6,18,0.55)";
            ctx.fillRect(0, HEIGHT / 2 - 46, WIDTH, 92);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowColor = "#5fd0ff";
            ctx.shadowBlur = 16;
            ctx.fillStyle = "#fff4cf";
            ctx.font = "800 30px sans-serif";
            ctx.fillText(game.banner.title, WIDTH / 2, HEIGHT / 2 - 12);
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#cfe6ff";
            ctx.font = "bold 13px sans-serif";
            ctx.fillText(game.banner.sub, WIDTH / 2, HEIGHT / 2 + 18);
            if (game.phase === "ready") {
                ctx.globalAlpha = 0.6 + Math.sin(time / 180) * 0.4;
                ctx.font = "bold 11px sans-serif";
                ctx.fillText("タップ・スペースで発射", WIDTH / 2, HEIGHT / 2 + 36);
                ctx.globalAlpha = 1;
            }
        }
        ctx.restore();
    }

    return Object.freeze({
        WIDTH, HEIGHT, COLS, STAGES, BRICKS, ITEMS, PADDLE_W, PADDLE_WIDE, PADDLE_Y, BALL_R,
        brickTypes, buildBricks, createGame, newGame, loadStage, launch, setPaddleCenter, nudgePaddle, applyItem, step, draw
    });
});
