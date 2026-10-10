(function (root, factory) {
    const api = factory(root);
    root.AnianiTrialSea = api;
    if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (runtime) {
    "use strict";

    // ガチャ開始演出の「夜の海」と「夜空」をCanvasで描く。
    // 海面は波紋の物理シミュレーション（高さ場）で、水面に映る星を揺らし・ぼかす。
    // 世界座標は、海が y=0〜H、その真上の夜空が y=-H〜0。カメラ cam=0 で海、cam=1 で夜空を映す。
    const TAU = Math.PI * 2;
    const MAX_CELLS = 52000;

    function seededRandom(seed) {
        return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    }

    function clamp(value, min, max) {
        return value < min ? min : value > max ? max : value;
    }

    function easeInOut(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // 天の川の帯：左下から右上へ斜めに横切る。
    function bandY(x) {
        return 0.86 - 0.72 * x;
    }

    function makeStars(count, seed) {
        const random = seededRandom(seed);
        const stars = [];
        for (let index = 0; index < count; index += 1) {
            let x = random();
            let y = random();
            if (random() < 0.5) {
                x = random();
                y = bandY(x) + (random() + random() + random() - 1.5) * 0.11;
            }
            y = ((y % 1) + 1) % 1;
            const magnitude = random();
            const radius = magnitude > 0.988 ? 1.9 : magnitude > 0.94 ? 1.2 : 0.35 + random() * 0.55;
            const tint = random();
            const color = tint < 0.14 ? "196,218,255" : tint < 0.22 ? "255,228,196" : tint < 0.25 ? "255,204,178" : "255,255,255";
            stars.push({ x, y, r: radius, a: 0.3 + random() * 0.7, color, phase: random() * TAU, speed: 0.7 + random() * 2.4 });
        }
        return stars;
    }

    const STARS = makeStars(620, 20261012);
    const BRIGHT = STARS.filter((star) => star.r > 1.1);

    function create(canvas, options = {}) {
        const reduced = !!options.reducedMotion;
        const context = canvas.getContext("2d");
        if (!context) return null;
        const doc = canvas.ownerDocument;
        const now = () => (runtime.performance ? runtime.performance.now() : Date.now());

        let width = 0;
        let height = 0;
        let dpr = 1;
        let cell = 2;
        let gw = 0;
        let gh = 0;
        let current = null;
        let previous = null;
        let field = null;
        let smooth = null;
        let reflection = null;
        let glowMap = null;
        let seaCanvas = null;
        let seaContext = null;
        let seaImage = null;
        let skyCanvas = null;
        let vignette = null;
        let swellX = null;
        let swellY = null;

        let active = false;
        let frameId = 0;
        let lastTime = 0;
        let cam = 0;
        let camTween = null;
        let wobble = 0.35;
        let wobbleTarget = 0.35;
        let blessing = 0;
        let blessingTarget = 0;
        let meteor = null;
        let flashes = [];
        let splashes = [];
        let motes = [];
        const sparks = [];

        function buildSky() {
            skyCanvas = doc.createElement("canvas");
            skyCanvas.width = width;
            skyCanvas.height = height;
            const sky = skyCanvas.getContext("2d");
            const gradient = sky.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, "#010208");
            gradient.addColorStop(0.55, "#030a1c");
            gradient.addColorStop(1, "#08142c");
            sky.fillStyle = gradient;
            sky.fillRect(0, 0, width, height);
            const random = seededRandom(77);
            const span = Math.max(width, height);
            sky.globalCompositeOperation = "lighter";
            for (let index = 0; index < 34; index += 1) {
                const t = index / 33;
                const x = t * width;
                const y = bandY(t) * height + (random() - 0.5) * height * 0.09;
                const radius = (0.07 + random() * 0.11) * span;
                const tint = random() < 0.3 ? "126,112,196" : random() < 0.55 ? "88,138,214" : "176,152,138";
                const glow = sky.createRadialGradient(x, y, 0, x, y, radius);
                glow.addColorStop(0, `rgba(${tint},0.075)`);
                glow.addColorStop(1, `rgba(${tint},0)`);
                sky.fillStyle = glow;
                sky.fillRect(x - radius, y - radius, radius * 2, radius * 2);
            }
            sky.globalCompositeOperation = "source-over";
            for (let index = 0; index < 16; index += 1) {
                const t = random();
                const x = t * width;
                const y = (bandY(t) + (random() - 0.4) * 0.05) * height;
                const radius = (0.03 + random() * 0.05) * span;
                const dust = sky.createRadialGradient(x, y, 0, x, y, radius);
                dust.addColorStop(0, "rgba(1,3,9,0.32)");
                dust.addColorStop(1, "rgba(1,3,9,0)");
                sky.fillStyle = dust;
                sky.fillRect(x - radius, y - radius, radius * 2, radius * 2);
            }
            STARS.forEach((star) => {
                const x = star.x * width;
                const y = star.y * height;
                const radius = star.r * dpr;
                if (star.r > 1.1) {
                    const halo = sky.createRadialGradient(x, y, 0, x, y, radius * 6);
                    halo.addColorStop(0, `rgba(${star.color},0.32)`);
                    halo.addColorStop(1, `rgba(${star.color},0)`);
                    sky.fillStyle = halo;
                    sky.fillRect(x - radius * 6, y - radius * 6, radius * 12, radius * 12);
                }
                sky.fillStyle = `rgba(${star.color},${star.a})`;
                sky.beginPath();
                sky.arc(x, y, radius, 0, TAU);
                sky.fill();
            });
        }

        // 水面に映る星空（波紋で揺らす元の像）。格子解像度で、星を周囲のセルへにじませて置く。
        function buildReflection() {
            reflection = new Float32Array(gw * gh * 3);
            for (let y = 0; y < gh; y += 1) {
                for (let x = 0; x < gw; x += 1) {
                    const distance = Math.abs(y / gh - bandY(x / gw));
                    const band = Math.exp(-(distance * distance) / 0.012) * 0.045;
                    const index = (y * gw + x) * 3;
                    reflection[index] = band * 0.55;
                    reflection[index + 1] = band * 0.7;
                    reflection[index + 2] = band;
                }
            }
            STARS.forEach((star) => {
                const sx = star.x * gw;
                const sy = star.y * gh;
                const spread = star.r > 1.1 ? 1.6 : 0.85;
                const strength = star.a * (star.r > 1.1 ? 1.25 : 0.42);
                const [r, g, b] = star.color.split(",").map((value) => Number(value) / 255);
                for (let oy = -2; oy <= 2; oy += 1) {
                    for (let ox = -2; ox <= 2; ox += 1) {
                        const cx = Math.floor(sx) + ox;
                        const cy = Math.floor(sy) + oy;
                        if (cx < 0 || cy < 0 || cx >= gw || cy >= gh) continue;
                        const dx = cx + 0.5 - sx;
                        const dy = cy + 0.5 - sy;
                        const weight = Math.exp(-(dx * dx + dy * dy) / (spread * spread)) * strength;
                        const index = (cy * gw + cx) * 3;
                        reflection[index] += r * weight;
                        reflection[index + 1] += g * weight;
                        reflection[index + 2] += b * weight;
                    }
                }
            });
            glowMap = new Float32Array(gw * gh);
            for (let y = 0; y < gh; y += 1) {
                for (let x = 0; x < gw; x += 1) {
                    const dx = (x / gw - 0.5) / 0.4;
                    const dy = (y / gh - 0.62) / 0.5;
                    glowMap[y * gw + x] = Math.exp(-(dx * dx + dy * dy));
                }
            }
        }

        function buildVignette() {
            vignette = doc.createElement("canvas");
            vignette.width = width;
            vignette.height = height;
            const shade = vignette.getContext("2d");
            const gradient = shade.createRadialGradient(width / 2, height * 0.5, Math.min(width, height) * 0.25, width / 2, height * 0.5, Math.max(width, height) * 0.78);
            gradient.addColorStop(0, "rgba(0,0,0,0)");
            gradient.addColorStop(1, "rgba(0,1,5,0.78)");
            shade.fillStyle = gradient;
            shade.fillRect(0, 0, width, height);
        }

        function resize() {
            const rect = canvas.getBoundingClientRect();
            if (!rect.width || !rect.height) return false;
            dpr = Math.min(runtime.devicePixelRatio || 1, 2);
            const nextWidth = Math.round(rect.width * dpr);
            const nextHeight = Math.round(rect.height * dpr);
            if (nextWidth === width && nextHeight === height && current) return true;
            width = nextWidth;
            height = nextHeight;
            canvas.width = width;
            canvas.height = height;
            cell = 2;
            while (Math.ceil(rect.width / cell) * Math.ceil(rect.height / cell) > MAX_CELLS) cell += 1;
            gw = Math.max(8, Math.ceil(rect.width / cell));
            gh = Math.max(8, Math.ceil(rect.height / cell));
            current = new Float32Array(gw * gh);
            previous = new Float32Array(gw * gh);
            field = new Float32Array(gw * gh);
            smooth = new Float32Array(gw * gh);
            swellX = new Float32Array(gw * 2);
            swellY = new Float32Array(gh * 2);
            seaCanvas = doc.createElement("canvas");
            seaCanvas.width = gw;
            seaCanvas.height = gh;
            seaContext = seaCanvas.getContext("2d");
            seaImage = seaContext.createImageData(gw, gh);
            buildSky();
            buildReflection();
            buildVignette();
            return true;
        }

        function simulate() {
            const damping = 0.989;
            for (let y = 1; y < gh - 1; y += 1) {
                const row = y * gw;
                for (let x = 1; x < gw - 1; x += 1) {
                    const index = row + x;
                    const around = (current[index - 1] + current[index + 1] + current[index - gw] + current[index + gw]) * 0.5;
                    const next = (around - previous[index]) * damping;
                    // わずかな粘性で、格子の細かいノイズを抑える。
                    previous[index] = next + (around * 0.5 - next) * 0.025;
                }
            }
            const swap = current;
            current = previous;
            previous = swap;
        }

        function renderSea(time) {
            const seconds = time / 1000;
            const scale = cell / 2;
            for (let x = 0; x < gw; x += 1) {
                swellX[x] = Math.sin(x * 0.075 * scale + seconds * 0.9);
                swellX[gw + x] = Math.sin(x * 0.029 * scale - seconds * 0.55);
            }
            for (let y = 0; y < gh; y += 1) {
                swellY[y] = Math.cos(y * 0.064 * scale - seconds * 0.7);
                swellY[gh + y] = Math.sin(y * 0.025 * scale + seconds * 0.42);
            }
            const amplitude = 2.2 + wobble * 7;
            for (let y = 0; y < gh; y += 1) {
                const row = y * gw;
                const a = swellY[y];
                const b = swellY[gh + y];
                for (let x = 0; x < gw; x += 1) {
                    field[row + x] = current[row + x] + amplitude * (swellX[x] * a + 0.65 * swellX[gw + x] * b);
                }
            }
            // 3タップのぼかしを縦横にかけ、波の面をなめらかにする。
            for (let y = 0; y < gh; y += 1) {
                const row = y * gw;
                smooth[row] = field[row];
                smooth[row + gw - 1] = field[row + gw - 1];
                for (let x = 1; x < gw - 1; x += 1) smooth[row + x] = field[row + x - 1] * 0.25 + field[row + x] * 0.5 + field[row + x + 1] * 0.25;
            }
            for (let x = 0; x < gw; x += 1) {
                field[x] = smooth[x];
                field[(gh - 1) * gw + x] = smooth[(gh - 1) * gw + x];
            }
            for (let y = 1; y < gh - 1; y += 1) {
                const row = y * gw;
                for (let x = 0; x < gw; x += 1) field[row + x] = smooth[row + x - gw] * 0.25 + smooth[row + x] * 0.5 + smooth[row + x + gw] * 0.25;
            }
            const data = seaImage.data;
            const refract = 0.32;
            const reflectance = 0.5 * (1 - blessing * 0.35);
            const glowStrength = blessing * (0.86 + 0.14 * Math.sin(seconds * 2.6));
            for (let y = 0; y < gh; y += 1) {
                const row = y * gw;
                const up = y > 0 ? -gw : 0;
                const down = y < gh - 1 ? gw : 0;
                const depth = 0.75 + 0.25 * (y / gh);
                for (let x = 0; x < gw; x += 1) {
                    const index = row + x;
                    const left = x > 0 ? -1 : 0;
                    const right = x < gw - 1 ? 1 : 0;
                    const dx = field[index + right] - field[index + left];
                    const dy = field[index + down] - field[index + up];
                    let sx = x + dx * refract;
                    let sy = y + dy * refract;
                    sx = sx < 0 ? 0 : sx > gw - 1.001 ? gw - 1.001 : sx;
                    sy = sy < 0 ? 0 : sy > gh - 1.001 ? gh - 1.001 : sy;
                    const ix = sx | 0;
                    const iy = sy | 0;
                    const fx = sx - ix;
                    const fy = sy - iy;
                    const p00 = (iy * gw + ix) * 3;
                    const p10 = p00 + 3;
                    const p01 = p00 + gw * 3;
                    const p11 = p01 + 3;
                    const w00 = (1 - fx) * (1 - fy);
                    const w10 = fx * (1 - fy);
                    const w01 = (1 - fx) * fy;
                    const w11 = fx * fy;
                    const rr = reflection[p00] * w00 + reflection[p10] * w10 + reflection[p01] * w01 + reflection[p11] * w11;
                    const rg = reflection[p00 + 1] * w00 + reflection[p10 + 1] * w10 + reflection[p01 + 1] * w01 + reflection[p11 + 1] * w11;
                    const rb = reflection[p00 + 2] * w00 + reflection[p10 + 2] * w10 + reflection[p01 + 2] * w01 + reflection[p11 + 2] * w11;
                    // 波の斜面が夜空の光を返すつやと、谷の陰。
                    const slope = dx * 0.55 - dy * 0.8;
                    const specular = slope > 0 ? Math.min(1.3, slope * 0.045 + slope * slope * 0.0035) : 0;
                    const shadow = slope < 0 ? Math.max(0.45, 1 + slope * 0.02) : 1;
                    let red = (3 + rr * 255 * reflectance) * depth * shadow + specular * 105;
                    let green = (8 + rg * 255 * reflectance) * depth * shadow + specular * 145;
                    let blue = (19 + rb * 255 * reflectance) * depth * shadow + specular * 195;
                    if (glowStrength > 0.001) {
                        const laplacian = field[index + left] + field[index + right] + field[index + up] + field[index + down] - 4 * field[index];
                        const caustic = clamp(0.45 + laplacian * 0.09 + slope * 0.012, 0, 1.7);
                        const glow = glowMap[index] * glowStrength;
                        const core = glow * glow;
                        const light = glow * (0.15 + caustic * 0.85);
                        red += light * (40 + core * 215) + core * core * 60;
                        green += light * (120 + core * 125) + core * core * 50;
                        blue += light * (190 - core * 10) + core * core * 30;
                    }
                    const pixel = index * 4;
                    data[pixel] = red;
                    data[pixel + 1] = green;
                    data[pixel + 2] = blue;
                    data[pixel + 3] = 255;
                }
            }
            seaContext.putImageData(seaImage, 0, 0);
        }

        // 海の底から湧き上がる光（UR確定）。光の柱と、浮かび上がる光の粒。
        function drawBlessing(top, seconds) {
            if (blessing < 0.01) return;
            context.save();
            context.globalCompositeOperation = "lighter";
            const originX = width * 0.5;
            const originY = top + height * 1.18;
            for (let index = 0; index < 15; index += 1) {
                const angle = -0.66 + index * 0.094 + Math.sin(seconds * 0.7 + index * 1.7) * 0.04;
                const length = height * 1.5;
                const spread = 0.012 + (index % 4) * 0.009;
                const alpha = (0.11 + 0.09 * Math.sin(seconds * 3.1 + index * 2.3)) * blessing;
                const tx = originX + Math.sin(angle) * length;
                const ty = originY - Math.cos(angle) * length;
                const gradient = context.createLinearGradient(originX, originY, tx, ty);
                gradient.addColorStop(0, `rgba(255,236,190,${alpha * 1.6})`);
                gradient.addColorStop(0.45, `rgba(130,226,255,${alpha})`);
                gradient.addColorStop(1, "rgba(130,200,255,0)");
                context.fillStyle = gradient;
                context.beginPath();
                context.moveTo(originX, originY);
                context.lineTo(originX + Math.sin(angle - spread) * length, originY - Math.cos(angle - spread) * length);
                context.lineTo(originX + Math.sin(angle + spread) * length, originY - Math.cos(angle + spread) * length);
                context.closePath();
                context.fill();
            }
            const core = context.createRadialGradient(width * 0.5, top + height * 0.62, 0, width * 0.5, top + height * 0.62, Math.max(width, height) * 0.3);
            core.addColorStop(0, `rgba(255,248,222,${0.42 * blessing})`);
            core.addColorStop(0.35, `rgba(120,220,255,${0.12 * blessing})`);
            core.addColorStop(1, "rgba(80,160,255,0)");
            context.fillStyle = core;
            context.fillRect(0, top, width, height);
            motes.forEach((mote) => {
                const life = (seconds * mote.speed + mote.offset) % 1;
                const x = (mote.x + Math.sin(seconds * mote.sway + mote.offset * TAU) * 0.02) * width;
                const y = top + (1.05 - life * 0.95) * height;
                const alpha = Math.sin(life * Math.PI) * blessing * mote.alpha;
                const radius = mote.size * dpr * (0.6 + life);
                const glow = context.createRadialGradient(x, y, 0, x, y, radius * 4);
                glow.addColorStop(0, `rgba(${mote.color},${alpha})`);
                glow.addColorStop(1, `rgba(${mote.color},0)`);
                context.fillStyle = glow;
                context.fillRect(x - radius * 4, y - radius * 4, radius * 8, radius * 8);
            });
            context.restore();
        }

        function drawSplashes(top, time) {
            if (!splashes.length) return;
            context.save();
            context.globalCompositeOperation = "lighter";
            splashes = splashes.filter((splash) => time - splash.start < 700);
            splashes.forEach((splash) => {
                const t = (time - splash.start) / 700;
                const x = splash.x * width;
                const y = top + splash.y * height;
                const radius = (6 + t * 26) * dpr * splash.size;
                context.strokeStyle = `rgba(210,240,255,${(1 - t) * 0.55})`;
                context.lineWidth = 1.4 * dpr;
                context.beginPath();
                context.ellipse(x, y, radius, radius * 0.92, 0, 0, TAU);
                context.stroke();
                const glow = context.createRadialGradient(x, y, 0, x, y, 16 * dpr * splash.size);
                glow.addColorStop(0, `rgba(255,236,170,${(1 - t) * 0.7})`);
                glow.addColorStop(1, "rgba(255,236,170,0)");
                context.fillStyle = glow;
                context.fillRect(x - 16 * dpr * splash.size, y - 16 * dpr * splash.size, 32 * dpr * splash.size, 32 * dpr * splash.size);
            });
            context.restore();
        }

        // 明るい星だけが大気の揺らぎで瞬く。光芒は最も明るい星に短く付ける。
        function drawTwinkle(top, seconds) {
            context.save();
            context.globalCompositeOperation = "lighter";
            BRIGHT.forEach((star) => {
                const pulse = 0.5 + 0.5 * Math.sin(seconds * star.speed + star.phase);
                const x = star.x * width;
                const y = top + star.y * height;
                const radius = star.r * dpr * (2 + pulse * 2);
                const glow = context.createRadialGradient(x, y, 0, x, y, radius);
                glow.addColorStop(0, `rgba(${star.color},${0.25 + pulse * 0.35})`);
                glow.addColorStop(1, `rgba(${star.color},0)`);
                context.fillStyle = glow;
                context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
                if (star.r > 1.8) {
                    const spike = radius * 2.2;
                    context.strokeStyle = `rgba(${star.color},${0.12 + pulse * 0.2})`;
                    context.lineWidth = 0.6 * dpr;
                    context.beginPath();
                    context.moveTo(x - spike, y);
                    context.lineTo(x + spike, y);
                    context.moveTo(x, y - spike);
                    context.lineTo(x, y + spike);
                    context.stroke();
                }
            });
            context.restore();
        }

        function meteorPosition(progress) {
            const eased = Math.pow(progress, 1.55);
            return {
                x: meteor.from.x + (meteor.to.x - meteor.from.x) * eased,
                y: meteor.from.y + (meteor.to.y - meteor.from.y) * eased
            };
        }

        function updateMeteor(time) {
            if (!meteor) return;
            const progress = clamp((time - meteor.start) / meteor.duration, 0, 1);
            const position = meteorPosition(progress);
            meteor.head = position;
            meteor.trail.push({ x: position.x, y: position.y, time });
            while (meteor.trail.length && time - meteor.trail[0].time > 420) meteor.trail.shift();
            cam = clamp(0.42 - position.y / height, 0, 1);
            if (progress < 1 && Math.random() < 0.75) {
                const direction = Math.atan2(meteor.to.y - meteor.from.y, meteor.to.x - meteor.from.x);
                const angle = direction + Math.PI + (Math.random() - 0.5) * 0.9;
                const speed = (40 + Math.random() * 120) * dpr;
                sparks.push({ x: position.x, y: position.y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed + 30 * dpr, born: time, life: 260 + Math.random() * 260 });
            }
            if (progress >= 1 && !meteor.landed) {
                meteor.landed = true;
                const fx = position.x / width;
                const fy = position.y / height;
                drop(fx, fy, 3.2);
                flashes.push({ x: position.x, y: position.y, start: time, duration: 900 });
                wobbleTarget = 1;
                meteor.endAt = time + 120;
            }
            if (meteor.endAt && time > meteor.endAt) meteor = null;
        }

        function drawMeteor(viewTop, time) {
            context.save();
            context.globalCompositeOperation = "lighter";
            for (let index = sparks.length - 1; index >= 0; index -= 1) {
                const spark = sparks[index];
                const age = time - spark.born;
                if (age > spark.life) { sparks.splice(index, 1); continue; }
                const t = age / 1000;
                const x = spark.x + spark.vx * t;
                const y = spark.y + spark.vy * t - viewTop;
                context.fillStyle = `rgba(255,236,190,${1 - age / spark.life})`;
                context.fillRect(x - dpr * 0.8, y - dpr * 0.8, dpr * 1.6, dpr * 1.6);
            }
            if (meteor && meteor.trail.length > 1 && !meteor.landed) {
                const points = meteor.trail;
                const count = points.length;
                context.lineCap = "round";
                for (let pass = 0; pass < 2; pass += 1) {
                    for (let index = 1; index < count; index += 1) {
                        const t = index / (count - 1);
                        const from = points[index - 1];
                        const to = points[index];
                        context.lineWidth = (pass === 0 ? 20 : 4.6) * dpr * Math.pow(t, 1.3) + 0.4 * dpr;
                        const alpha = Math.pow(t, 1.6) * (pass === 0 ? 0.16 : 1);
                        context.strokeStyle = t > 0.82 ? `rgba(236,255,246,${alpha})` : t > 0.45 ? `rgba(150,255,214,${alpha})` : `rgba(96,170,255,${alpha})`;
                        context.beginPath();
                        context.moveTo(from.x, from.y - viewTop);
                        context.lineTo(to.x, to.y - viewTop);
                        context.stroke();
                    }
                }
                const head = meteor.head;
                const flicker = 0.85 + Math.random() * 0.3;
                const radius = 30 * dpr * flicker;
                const glow = context.createRadialGradient(head.x, head.y - viewTop, 0, head.x, head.y - viewTop, radius);
                glow.addColorStop(0, "rgba(255,255,255,1)");
                glow.addColorStop(0.18, "rgba(220,255,240,0.85)");
                glow.addColorStop(0.5, "rgba(120,240,200,0.28)");
                glow.addColorStop(1, "rgba(80,180,255,0)");
                context.fillStyle = glow;
                context.fillRect(head.x - radius, head.y - viewTop - radius, radius * 2, radius * 2);
                const bloom = radius * 3.2;
                const halo = context.createRadialGradient(head.x, head.y - viewTop, 0, head.x, head.y - viewTop, bloom);
                halo.addColorStop(0, "rgba(160,255,220,0.22)");
                halo.addColorStop(1, "rgba(80,160,255,0)");
                context.fillStyle = halo;
                context.fillRect(head.x - bloom, head.y - viewTop - bloom, bloom * 2, bloom * 2);
                if (head.y > 0) {
                    // 海へ迫る流れ星の光が、水面を照らす。
                    const near = clamp(head.y / meteor.to.y, 0, 1);
                    const pool = 120 * dpr * (0.4 + near);
                    const light = context.createRadialGradient(head.x, head.y - viewTop, 0, head.x, head.y - viewTop, pool);
                    light.addColorStop(0, `rgba(170,255,226,${0.22 * near})`);
                    light.addColorStop(1, "rgba(120,200,255,0)");
                    context.fillStyle = light;
                    context.fillRect(head.x - pool, head.y - viewTop - pool, pool * 2, pool * 2);
                }
            }
            flashes = flashes.filter((flash) => time - flash.start < flash.duration);
            flashes.forEach((flash) => {
                const t = (time - flash.start) / flash.duration;
                const radius = Math.max(width, height) * (0.08 + t * 0.9);
                const glow = context.createRadialGradient(flash.x, flash.y - viewTop, 0, flash.x, flash.y - viewTop, radius);
                glow.addColorStop(0, `rgba(255,255,255,${(1 - t) * 0.95})`);
                glow.addColorStop(0.25, `rgba(${flash.tint || "190,255,240"},${(1 - t) * 0.6})`);
                glow.addColorStop(1, "rgba(90,180,255,0)");
                context.fillStyle = glow;
                context.fillRect(0, 0, width, height);
            });
            context.restore();
        }

        function frame(time) {
            if (!current && !resize()) return;
            const delta = lastTime ? Math.min(64, time - lastTime) : 16;
            lastTime = time;
            const seconds = time / 1000;
            simulate();
            if (!reduced) simulate();
            wobble += (wobbleTarget - wobble) * Math.min(1, delta / 600);
            wobbleTarget += (0.35 - wobbleTarget) * Math.min(1, delta / 4200);
            blessing += (blessingTarget - blessing) * Math.min(1, delta / 700);
            if (camTween) {
                const t = clamp((time - camTween.start) / camTween.duration, 0, 1);
                cam = camTween.from + (camTween.to - camTween.from) * easeInOut(t);
                canvas.style.filter = t > 0.08 && t < 0.92 ? "blur(2.5px)" : "";
                if (t >= 1) camTween = null;
            }
            updateMeteor(time);
            const viewTop = -cam * height;
            context.globalCompositeOperation = "source-over";
            context.fillStyle = "#01030b";
            context.fillRect(0, 0, width, height);
            if (cam < 0.999) {
                renderSea(time);
                const top = -viewTop;
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";
                context.drawImage(seaCanvas, 0, top, width, height);
                drawBlessing(top, seconds);
                drawSplashes(top, time);
            }
            if (cam > 0.001) {
                const top = -height - viewTop;
                context.drawImage(skyCanvas, 0, top);
                drawTwinkle(top, seconds);
            }
            if (cam > 0.001 && cam < 0.999) {
                // 海と空の継ぎ目は、夜の靄でなじませる。
                const seam = -viewTop;
                const band = height * 0.26;
                const mist = context.createLinearGradient(0, seam - band, 0, seam + band);
                mist.addColorStop(0, "rgba(4,10,26,0)");
                mist.addColorStop(0.5, "rgba(4,10,26,0.96)");
                mist.addColorStop(1, "rgba(2,6,16,0)");
                context.fillStyle = mist;
                context.fillRect(0, seam - band, width, band * 2);
            }
            drawMeteor(viewTop, time);
            context.drawImage(vignette, 0, 0);
        }

        function loop(time) {
            frameId = 0;
            if (!active) return;
            frame(time);
            frameId = runtime.requestAnimationFrame(loop);
        }

        function paintOnce() {
            if (!resize()) return;
            frame(now());
        }

        function drop(fx, fy, strength = 1) {
            if (!current && !resize()) return;
            const cx = Math.round(clamp(fx, 0, 1) * (gw - 1));
            const cy = Math.round(clamp(fy, 0, 1) * (gh - 1));
            const radius = Math.max(2, Math.round((2.2 + strength) * (2 / cell)));
            for (let y = -radius; y <= radius; y += 1) {
                for (let x = -radius; x <= radius; x += 1) {
                    const px = cx + x;
                    const py = cy + y;
                    if (px < 1 || py < 1 || px >= gw - 1 || py >= gh - 1) continue;
                    const distance = Math.sqrt(x * x + y * y) / radius;
                    if (distance > 1) continue;
                    current[py * gw + px] -= 95 * strength * (0.5 + 0.5 * Math.cos(distance * Math.PI));
                }
            }
            splashes.push({ x: fx, y: fy, start: now(), size: Math.min(2.4, 0.8 + strength * 0.25) });
            wobbleTarget = Math.min(1.25, wobbleTarget + 0.12 * strength);
            if (reduced) paintOnce();
        }

        const api = {
            resize() {
                const ok = resize();
                if (ok && !active) paintOnce();
                return ok;
            },
            setActive(next) {
                next = !!next;
                if (next === active) return;
                active = next;
                if (!active) {
                    if (frameId) runtime.cancelAnimationFrame(frameId);
                    frameId = 0;
                    canvas.style.filter = "";
                    return;
                }
                lastTime = 0;
                if (reduced) paintOnce();
                else frameId = runtime.requestAnimationFrame(loop);
            },
            reset() {
                if (current) { current.fill(0); previous.fill(0); }
                cam = 0;
                camTween = null;
                meteor = null;
                flashes = [];
                splashes = [];
                sparks.length = 0;
                wobble = wobbleTarget = 0.35;
                blessing = blessingTarget = 0;
                canvas.style.filter = "";
                if (reduced || !active) paintOnce();
            },
            drop,
            setWobble(level) {
                wobbleTarget = Math.max(wobbleTarget, level);
            },
            setBlessing(on) {
                blessingTarget = on ? 1 : 0;
                if (on && current) {
                    flashes.push({ x: width * 0.5, y: height * 0.62, start: now(), duration: 1300, tint: "255,232,170" });
                    drop(0.5, 0.62, 2.6);
                }
                if (on && !motes.length) {
                    const random = seededRandom(5);
                    const colors = ["255,240,200", "160,236,255", "255,200,240", "255,255,255"];
                    motes = Array.from({ length: 70 }, () => ({
                        x: 0.12 + random() * 0.76, speed: 0.12 + random() * 0.22, offset: random(), sway: 0.6 + random(),
                        size: 0.8 + random() * 1.8, alpha: 0.35 + random() * 0.6, color: colors[Math.floor(random() * colors.length)]
                    }));
                }
                if (reduced) { blessing = blessingTarget; paintOnce(); }
            },
            lift(duration = 450) {
                if (reduced) { cam = 1; paintOnce(); return; }
                camTween = { from: cam, to: 1, start: now(), duration };
            },
            meteor(duration = 1300) {
                if (!current && !resize()) return;
                if (reduced) { cam = 0; drop(0.62, 0.58, 3.2); return; }
                camTween = null;
                meteor = {
                    from: { x: width * 0.06, y: -height * 0.94 },
                    to: { x: width * 0.62, y: height * 0.58 },
                    start: now(),
                    duration,
                    trail: [],
                    head: null,
                    landed: false,
                    endAt: 0
                };
            }
        };
        return api;
    }

    return Object.freeze({ create });
});
