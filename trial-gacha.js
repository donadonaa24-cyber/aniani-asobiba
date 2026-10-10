(function (root, factory) {
    const api = factory(root, root.AnianiTrialGachaData);
    root.AnianiTrialGacha = api;
    if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (runtime, catalog) {
    "use strict";

    const RARITY_ORDER = ["C", "SR", "SSR", "UR"];

    function chooseRarity(random = Math.random) {
        if (!catalog) return "C";
        const value = Math.min(0.999999, Math.max(0, Number(random()) || 0)) * 100;
        let cursor = 0;
        for (const rarity of RARITY_ORDER) {
            cursor += catalog.rates[rarity];
            if (value < cursor) return rarity;
        }
        return "UR";
    }

    function drawCards(count = 10, random = Math.random) {
        if (!catalog) return [];
        return Array.from({ length: count }, () => {
            const rarity = chooseRarity(random);
            const pool = catalog.cards.filter((card) => card.rarity === rarity);
            const index = Math.min(pool.length - 1, Math.floor(Math.max(0, Number(random()) || 0) * pool.length));
            return pool[Math.max(0, index)];
        });
    }

    function buildRevealPlan(cards) {
        return cards.flatMap((card, index) => {
            const steps = [];
            if (card.rarity === "UR") steps.push({ type: "omen", index, card });
            if (card.rarity === "UR" && card.quote) steps.push({ type: "quote", index, card });
            steps.push({ type: "card", index, card });
            return steps;
        });
    }

    // 10連にURが1枚でも含まれる時だけ、開始時に「星が輝く」確定演出を出す。
    function hasBlessing(cards) {
        return cards.some((card) => card?.rarity === "UR");
    }

    function loadInventory(storage) {
        if (!catalog || !storage) return {};
        try {
            const value = JSON.parse(storage.getItem(catalog.storageKey) || "{}");
            if (!value || typeof value !== "object" || Array.isArray(value)) return {};
            return Object.fromEntries(Object.entries(value).filter(([id, count]) =>
                catalog.cards.some((card) => card.id === id) && Number.isInteger(count) && count > 0
            ));
        } catch (_error) {
            return {};
        }
    }

    function addToInventory(inventory, results) {
        const next = { ...inventory };
        results.forEach((card) => {
            next[card.id] = (next[card.id] || 0) + 1;
        });
        return next;
    }

    function saveInventory(storage, inventory) {
        if (!catalog || !storage) return false;
        try {
            storage.setItem(catalog.storageKey, JSON.stringify(inventory));
            return true;
        } catch (_error) {
            return false;
        }
    }

    function artElement(card, unlocked = true, featured = false) {
        const art = document.createElement("div");
        art.className = "trial-card-art";
        if (!unlocked) {
            art.innerHTML = '<span aria-hidden="true">?</span>';
            return art;
        }
        if (card.sprite) {
            const { columns, rows, column, row } = card.sprite;
            art.classList.add("is-sprite");
            // 社員スプライトの正方形を、カード枠に合わせて引き伸ばさず表示する。
            const svgNamespace = "http://www.w3.org/2000/svg";
            const frame = document.createElementNS(svgNamespace, "svg");
            frame.setAttribute("viewBox", "0 0 100 100");
            frame.setAttribute("aria-hidden", "true");
            const sheet = document.createElementNS(svgNamespace, "image");
            sheet.setAttribute("href", card.image);
            sheet.setAttribute("x", String(-column * 100));
            sheet.setAttribute("y", String(-row * 100));
            sheet.setAttribute("width", String(columns * 100));
            sheet.setAttribute("height", String(rows * 100));
            frame.append(sheet);
            art.append(frame);
        } else {
            const image = document.createElement("img");
            image.src = card.image;
            image.alt = card.title;
            image.loading = featured ? "eager" : "lazy";
            art.append(image);
        }
        return art;
    }

    // 豪華枠の内側の線・角の宝石、常時キラ、指やマウスに追従する光の3層。
    function holoLayers() {
        return ["trial-card-frame", "trial-card-holo", "trial-card-glare"].map((className) => {
            const layer = document.createElement("span");
            layer.className = className;
            layer.setAttribute("aria-hidden", "true");
            return layer;
        });
    }

    function cardElement(card, options = {}) {
        const { compact = false, featured = false, result = false, unlocked = true, count = 0, index = 0, onZoom } = options;
        const item = document.createElement(compact || result ? "button" : "article");
        if (compact || result) item.type = "button";
        item.className = `trial-card rarity-${card.rarity.toLowerCase()}${compact ? " is-compact" : ""}${result ? " is-result" : ""}${featured ? " is-featured" : ""}${card.portrait ? " is-portrait" : ""}${unlocked ? "" : " is-locked"}`;
        item.style.setProperty("--reveal-index", index);
        item.dataset.cardId = card.id;
        item.setAttribute("aria-label", unlocked ? `No.${String(card.no).padStart(3, "0")} ${card.title} ${card.rarity}` : `No.${String(card.no).padStart(3, "0")} 未入手`);
        item.append(artElement(card, unlocked, featured));

        const meta = document.createElement("div");
        meta.className = "trial-card-meta";
        meta.innerHTML = `<span class="trial-card-number">No.${String(card.no).padStart(3, "0")}</span><strong>${unlocked ? card.title : "UNKNOWN"}</strong><small>${unlocked ? `${card.work} / ${card.role || card.category}` : "未入手"}</small><b>${card.rarity}</b>${count > 1 ? `<em>×${count}</em>` : ""}`;
        item.append(meta);
        if (unlocked) item.append(...holoLayers());
        if (result && unlocked && onZoom) {
            item.addEventListener("click", () => onZoom(card));
        } else if (!compact && unlocked && onZoom) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "trial-art-open";
            button.textContent = "画像を大きく見る";
            button.setAttribute("aria-label", `${card.title}の画像を大きく見る`);
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                onZoom(card);
            });
            item.append(button);
        }
        return item;
    }

    function createAudioDirector() {
        let context = null;

        function ensureContext() {
            const AudioContext = runtime.AudioContext || runtime.webkitAudioContext;
            if (!AudioContext) return null;
            try {
                context ||= new AudioContext();
                if (context.state === "suspended") context.resume().catch(() => {});
                return context;
            } catch (_error) {
                return null;
            }
        }

        function tones(frequencies, duration = 0.18, wave = "sine", volume = 0.045) {
            const audio = ensureContext();
            if (!audio) return;
            const start = audio.currentTime;
            frequencies.forEach((frequency, index) => {
                const oscillator = audio.createOscillator();
                const gain = audio.createGain();
                oscillator.type = wave;
                oscillator.frequency.setValueAtTime(frequency, start + index * 0.045);
                gain.gain.setValueAtTime(0.0001, start);
                gain.gain.exponentialRampToValueAtTime(volume, start + 0.025 + index * 0.045);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + duration + index * 0.045);
                oscillator.connect(gain).connect(audio.destination);
                oscillator.start(start + index * 0.045);
                oscillator.stop(start + duration + index * 0.045 + 0.03);
            });
        }

        // 水しぶき・流れ星用のノイズ。周波数を動かして音色を変える。
        function noise(duration, from, to, volume = 0.05, type = "lowpass") {
            const audio = ensureContext();
            if (!audio) return;
            const start = audio.currentTime;
            const buffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * duration), audio.sampleRate);
            const data = buffer.getChannelData(0);
            for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
            const source = audio.createBufferSource();
            const filter = audio.createBiquadFilter();
            const gain = audio.createGain();
            source.buffer = buffer;
            filter.type = type;
            filter.frequency.setValueAtTime(from, start);
            filter.frequency.exponentialRampToValueAtTime(to, start + duration);
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
            source.connect(filter).connect(gain).connect(audio.destination);
            source.start(start);
            source.stop(start + duration + 0.02);
        }

        function plop(pitch = 1) {
            const audio = ensureContext();
            if (!audio) return;
            const start = audio.currentTime;
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();
            oscillator.type = "sine";
            oscillator.frequency.setValueAtTime(420 * pitch, start);
            oscillator.frequency.exponentialRampToValueAtTime(90 * pitch, start + 0.22);
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(0.05, start + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);
            oscillator.connect(gain).connect(audio.destination);
            oscillator.start(start);
            oscillator.stop(start + 0.32);
        }

        // 低い音の立ち上がり（海の底から光が湧く、流れ星の着水）。
        function swell(from, to, duration, volume, wave = "sine") {
            const audio = ensureContext();
            if (!audio) return;
            const start = audio.currentTime;
            const oscillator = audio.createOscillator();
            const gain = audio.createGain();
            oscillator.type = wave;
            oscillator.frequency.setValueAtTime(from, start);
            oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
            gain.gain.setValueAtTime(0.0001, start);
            gain.gain.exponentialRampToValueAtTime(volume, start + duration * 0.35);
            gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
            oscillator.connect(gain).connect(audio.destination);
            oscillator.start(start);
            oscillator.stop(start + duration + 0.05);
        }

        return {
            coin: () => tones([1568, 2093, 2637, 3136], 0.24, "triangle", 0.03),
            plop: (pitch = 1) => { plop(pitch); noise(0.32, 2400 * pitch, 420, 0.02); },
            blessing: () => { swell(46, 98, 2.2, 0.16); swell(92, 196, 2.2, 0.05, "triangle"); noise(1.8, 300, 2600, 0.035, "bandpass"); tones([1319, 1976, 2637], 1.1, "sine", 0.014); },
            lift: () => noise(0.45, 500, 5200, 0.05, "bandpass"),
            meteor: () => { noise(1.3, 7000, 900, 0.045, "bandpass"); tones([2637, 3520], 0.5, "sine", 0.012); },
            impact: () => { swell(110, 32, 1.1, 0.24); noise(0.9, 3200, 160, 0.09); },
            dive: () => tones([262, 392, 523, 784], 0.32, "square", 0.018),
            decode: () => tones([1760, 2217], 0.07, "square", 0.012),
            reveal: (rarity) => tones(rarity === "SSR" ? [523, 659, 784] : rarity === "SR" ? [440, 554] : [392], 0.2, "sine", 0.035),
            ur: () => tones([392, 523, 659, 784, 1047], 0.42, "triangle", 0.055)
        };
    }

    const COIN_FRONT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><radialGradient id="tg-coin-face" cx="36%" cy="30%" r="78%"><stop offset="0" stop-color="#fffbe0"/><stop offset=".3" stop-color="#ffe187"/><stop offset=".68" stop-color="#e3a52a"/><stop offset="1" stop-color="#8f5a07"/></radialGradient><linearGradient id="tg-coin-rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6c6"/><stop offset=".35" stop-color="#c88a17"/><stop offset=".6" stop-color="#ffe9a0"/><stop offset="1" stop-color="#7a4a02"/></linearGradient><linearGradient id="tg-coin-star" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffef2"/><stop offset=".55" stop-color="#ffd35c"/><stop offset="1" stop-color="#b87508"/></linearGradient><path id="tg-coin-ring" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1-82 0"/></defs><circle cx="60" cy="60" r="59" fill="url(#tg-coin-rim)"/><circle cx="60" cy="60" r="51" fill="url(#tg-coin-face)" stroke="#7a4a02" stroke-opacity=".55" stroke-width="1.5"/><circle cx="60" cy="60" r="46.5" fill="none" stroke="#fff4c2" stroke-opacity=".75" stroke-width=".9" stroke-dasharray="1.2 2.4"/><text font-size="8" font-weight="700" fill="#734502" fill-opacity=".85" font-family="Georgia, serif" textLength="246" lengthAdjust="spacingAndGlyphs"><textPath href="#tg-coin-ring">ANIANI ✦ PLAYGROUND ✦ STAR COIN ✦</textPath></text><circle cx="60" cy="60" r="32" fill="none" stroke="#8f5a07" stroke-opacity=".5"/><path d="M61.5 37.5C63.5 53.5 69.5 59.5 85.5 61.5C69.5 63.5 63.5 69.5 61.5 85.5C59.5 69.5 53.5 63.5 37.5 61.5C53.5 59.5 59.5 53.5 61.5 37.5Z" fill="#6b3f00" fill-opacity=".55"/><path d="M60 36C62 52 68 58 84 60C68 62 62 68 60 84C58 68 52 62 36 60C52 58 58 52 60 36Z" fill="url(#tg-coin-star)"/><path d="M60 41C61 53 64 56 70 58" fill="none" stroke="#fff" stroke-opacity=".85" stroke-width="1.2" stroke-linecap="round"/></svg>`;
    const COIN_BACK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><radialGradient id="tg-coin-back" cx="62%" cy="30%" r="80%"><stop offset="0" stop-color="#fff7d2"/><stop offset=".32" stop-color="#ffd877"/><stop offset=".7" stop-color="#d79621"/><stop offset="1" stop-color="#875204"/></radialGradient><path id="tg-coin-ring-b" d="M60 60m-41 0a41 41 0 1 1 82 0a41 41 0 1 1-82 0"/></defs><circle cx="60" cy="60" r="59" fill="#c88a17"/><circle cx="60" cy="60" r="51" fill="url(#tg-coin-back)" stroke="#7a4a02" stroke-opacity=".55" stroke-width="1.5"/><circle cx="60" cy="60" r="46.5" fill="none" stroke="#fff4c2" stroke-opacity=".75" stroke-width=".9" stroke-dasharray="1.2 2.4"/><text font-size="8" font-weight="700" fill="#734502" fill-opacity=".85" font-family="Georgia, serif" textLength="246" lengthAdjust="spacingAndGlyphs"><textPath href="#tg-coin-ring-b">FREE TRIAL ✦ MEMORY OF STARS ✦</textPath></text><text x="61.5" y="75.5" text-anchor="middle" font-size="44" font-weight="700" fill="#6b3f00" fill-opacity=".55" font-family="Georgia, serif">A</text><text x="60" y="74" text-anchor="middle" font-size="44" font-weight="700" fill="#fff1b8" font-family="Georgia, serif">A</text></svg>`;

    // 投げ入れる10枚の着水点（ステージに対する割合）。重なりすぎないよう散らす。
    const COIN_TARGETS = [[0.3, 0.36], [0.52, 0.28], [0.71, 0.4], [0.41, 0.53], [0.62, 0.58], [0.22, 0.6], [0.8, 0.63], [0.48, 0.74], [0.32, 0.82], [0.67, 0.8]];

    // コイン1枚：縁の層を重ねて厚みを出したCSS 3D。表裏の刻印は画像として共有する。
    function buildCoin(coin, layers) {
        if (!coin || coin.childElementCount) return;
        for (let index = 0; index < layers; index += 1) {
            const edge = document.createElement("span");
            edge.className = "trial-coin-edge";
            edge.style.setProperty("--z", (index / (layers - 1) - 0.5).toFixed(3));
            coin.append(edge);
        }
        for (const side of ["front", "back"]) {
            const face = document.createElement("span");
            face.className = `trial-coin-face is-${side}`;
            coin.append(face);
        }
    }

    // 演出の繰り返し部品（待機中のコイン、投げ入れる10枚、データの雨）を組み立てる。
    function buildScene(stage) {
        const make = (parent, count, setup) => {
            const host = stage.querySelector(parent);
            if (!host || host.childElementCount) return;
            for (let index = 0; index < count; index += 1) {
                const element = document.createElement("i");
                setup(element, index);
                host.append(element);
            }
        };
        stage.style.setProperty("--coin-front", `url("data:image/svg+xml,${encodeURIComponent(COIN_FRONT)}")`);
        stage.style.setProperty("--coin-back", `url("data:image/svg+xml,${encodeURIComponent(COIN_BACK)}")`);
        buildCoin(stage.querySelector(".trial-coin-stage .trial-coin"), 12);
        const thrown = stage.querySelector(".trial-coins");
        if (thrown && !thrown.childElementCount) {
            COIN_TARGETS.forEach(() => {
                const wrap = document.createElement("span");
                wrap.className = "trial-coin-throw";
                const coin = document.createElement("span");
                coin.className = "trial-coin";
                buildCoin(coin, 8);
                wrap.append(coin);
                thrown.append(wrap);
            });
        }
        make(".trial-digital-rain", 16, (column, index) => {
            column.textContent = Array.from({ length: 22 }, (_, offset) => "01ANI✦7F3C"[(index * 7 + offset * 3) % 10]).join("");
            column.style.left = `${3 + index * 6.1}%`;
            column.style.setProperty("--d", `${-((index * 0.83) % 3.4).toFixed(2)}s`);
            column.style.setProperty("--t", `${3.2 + (index % 4) * 0.8}s`);
        });
        make(".trial-digital-rings", 3, (ring, index) => ring.style.setProperty("--i", index));
    }

    // キラカードのグリッター。規則的な点の並びに見えないよう、不規則な星屑を1枚の画像にする。
    function glitterImage(colors, seed) {
        const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
        const sparkles = Array.from({ length: 34 }, () => {
            const x = (random() * 200).toFixed(1);
            const y = (random() * 300).toFixed(1);
            const color = colors[Math.floor(random() * colors.length)];
            if (random() < 0.3) {
                const size = 2.5 + random() * 3.5;
                return `<path d="M${x} ${y - size}L${+x + size * 0.22} ${y - size * 0.22}L${+x + size} ${y}L${+x + size * 0.22} ${+y + size * 0.22}L${x} ${+y + size}L${x - size * 0.22} ${+y + size * 0.22}L${x - size} ${y}L${x - size * 0.22} ${y - size * 0.22}Z" fill="${color}"/>`;
            }
            return `<circle cx="${x}" cy="${y}" r="${(0.6 + random() * 0.9).toFixed(2)}" fill="${color}"/>`;
        }).join("");
        return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300">${sparkles}</svg>`)}")`;
    }

    function initialize() {
        if (!catalog) return;
        const rootElement = document.getElementById("trial-gacha");
        if (!rootElement) return;
        rootElement.style.setProperty("--glitter-gold", glitterImage(["#ffffff", "#fff3c4", "#ffd76a"], 7));
        rootElement.style.setProperty("--glitter-gold-b", glitterImage(["#ffffff", "#ffe9a0"], 29));
        rootElement.style.setProperty("--glitter-rainbow", glitterImage(["#ffffff", "#ffd6f4", "#c9f6ff", "#fff3b0", "#d9c8ff"], 13));
        rootElement.style.setProperty("--glitter-rainbow-b", glitterImage(["#ffffff", "#bff6ff", "#ffc8ee"], 41));

        const drawButton = rootElement.querySelector("#trial-draw-ten");
        const nextButton = rootElement.querySelector("#trial-reveal-next");
        const skipButton = rootElement.querySelector("#trial-reveal-skip");
        const againButton = rootElement.querySelector("#trial-results-again");
        const stage = rootElement.querySelector("#trial-summon-stage");
        const singleReveal = rootElement.querySelector("#trial-single-reveal");
        const revealCount = rootElement.querySelector("#trial-reveal-count");
        const currentCard = rootElement.querySelector("#trial-current-card");
        const quoteElement = rootElement.querySelector("#trial-ur-quote");
        const quoteText = rootElement.querySelector("#trial-ur-quote-text");
        const quoteLabel = rootElement.querySelector("#trial-ur-quote-label");
        const resultsWrap = rootElement.querySelector("#trial-results-wrap");
        const resultsElement = rootElement.querySelector("#trial-gacha-results");
        const resultsStatus = rootElement.querySelector("#trial-results-status");
        const statusElement = rootElement.querySelector("#trial-gacha-status");
        const bookElement = rootElement.querySelector("#trial-gacha-book");
        const countElement = rootElement.querySelector("#trial-book-count");
        const detailElement = rootElement.querySelector("#trial-card-detail");
        const artDialog = rootElement.querySelector("#trial-art-dialog");
        const artTitle = rootElement.querySelector("#trial-art-title");
        const artImage = rootElement.querySelector("#trial-art-image");
        const artDescription = rootElement.querySelector("#trial-art-description");
        const artCredit = rootElement.querySelector("#trial-art-credit");
        const artBookLink = rootElement.querySelector("#trial-art-book-link");
        const filterButtons = Array.from(rootElement.querySelectorAll("[data-trial-filter]"));
        const viewButtons = Array.from(rootElement.querySelectorAll("[data-trial-view]"));
        const panes = Array.from(rootElement.querySelectorAll("[data-trial-pane]"));
        let storage = null;
        try { storage = runtime.localStorage; } catch (_error) { storage = null; }
        let inventory = loadInventory(storage);
        let activeFilter = "all";
        let drawing = false;
        let runId = 0;
        let currentIndex = -1;
        let activeResults = [];
        let resultsSettled = false;
        const timers = new Set();
        const reduceMotion = runtime.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        const audio = createAudioDirector();
        if (stage) buildScene(stage);
        const coinThrows = stage ? Array.from(stage.querySelectorAll(".trial-coin-throw")) : [];
        const seaCanvas = stage?.querySelector(".trial-sea-canvas");
        const sea = seaCanvas && runtime.AnianiTrialSea ? runtime.AnianiTrialSea.create(seaCanvas, { reducedMotion: reduceMotion }) : null;
        const WATER_PHASES = ["idle", "coin", "ripple", "blessing", "sky", "meteor", "plunge"];
        // 海の描画は、ガチャ画面が開いていて水面が見えている間だけ動かす。
        function syncSea() {
            if (!sea || !stage) return;
            const open = rootElement.getAttribute("aria-hidden") === "false";
            const visible = open && rootElement.dataset.trialView !== "book" && WATER_PHASES.includes(stage.dataset.phase || "idle");
            sea.setActive(visible && !document.hidden);
        }
        if (seaCanvas && runtime.ResizeObserver) new runtime.ResizeObserver(() => sea?.resize()).observe(seaCanvas);
        document.addEventListener("visibilitychange", syncSea);

        // キラカードは指・マウスの位置に合わせて傾き、光の帯が動く。
        const TILT_TARGET = ".trial-card:not(.is-locked), .trial-art-image";
        let tilted = null;
        function resetTilt() {
            if (!tilted) return;
            tilted.classList.remove("is-tilting");
            ["--mx", "--my", "--rx", "--ry"].forEach((name) => tilted.style.removeProperty(name));
            tilted = null;
        }
        function tilt(event) {
            const target = event.target instanceof Element ? event.target.closest(TILT_TARGET) : null;
            if (target !== tilted) resetTilt();
            if (!target || reduceMotion) return;
            const rect = target.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
            const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
            tilted = target;
            target.classList.add("is-tilting");
            target.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
            target.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
            target.style.setProperty("--rx", `${((0.5 - y) * 16).toFixed(2)}deg`);
            target.style.setProperty("--ry", `${((x - 0.5) * 18).toFixed(2)}deg`);
        }
        rootElement.addEventListener("pointermove", tilt);
        rootElement.addEventListener("pointerdown", tilt);
        ["pointerleave", "pointerup", "pointercancel"].forEach((type) => rootElement.addEventListener(type, (event) => {
            if (type === "pointerleave" || event.pointerType !== "mouse") resetTilt();
        }));

        function showArtwork(card) {
            if (!artDialog) return;
            artTitle.textContent = `${card.title} / ${card.rarity}`;
            artImage.replaceChildren(artElement(card, true, true), ...holoLayers());
            artImage.classList.toggle("is-portrait", !!card.portrait);
            artImage.dataset.rarity = card.rarity.toLowerCase();
            artDescription.textContent = card.description || `${card.work} / ${card.role || card.category}`;
            artCredit.hidden = !card.generatedWithAI;
            artBookLink.hidden = !card.bookUrl;
            if (card.bookUrl) artBookLink.href = card.bookUrl;
            if (!artDialog.open) artDialog.showModal();
        }

        rootElement.querySelector("#trial-art-close")?.addEventListener("click", () => artDialog.close());
        // Escape は画像だけを閉じ、背後のガチャ画面へ伝えない。
        artDialog?.addEventListener("keydown", (event) => { event.stopPropagation(); });

        function delay(normal) {
            return reduceMotion ? 20 : normal;
        }

        function schedule(callback, milliseconds, expectedRun = runId) {
            const timer = runtime.setTimeout(() => {
                timers.delete(timer);
                if (expectedRun === runId) callback();
            }, delay(milliseconds));
            timers.add(timer);
        }

        function cancelTimers() {
            timers.forEach((timer) => runtime.clearTimeout(timer));
            timers.clear();
            runId += 1;
        }

        function setStagePhase(phase, rarity = "") {
            if (!stage) return;
            stage.dataset.phase = phase;
            stage.dataset.rarity = rarity.toLowerCase();
            stage.dataset.space = ["portal", "omen", "quote", "card"].includes(phase) ? "digital" : "water";
            syncSea();
            rootElement.classList.toggle("is-results-view", phase === "results" && rootElement.dataset.trialView !== "book");
        }

        function setTabsDisabled(disabled) {
            viewButtons.forEach((button) => { button.disabled = disabled; });
        }

        function showDetail(card, unlocked) {
            if (!detailElement) return;
            const count = inventory[card.id] || 0;
            detailElement.hidden = false;
            detailElement.innerHTML = unlocked
                ? `<strong>No.${String(card.no).padStart(3, "0")} ${card.title}</strong><span>${card.rarity} / ${card.work} / ${card.role || card.category}</span><small>所持 ${count}枚</small>`
                : `<strong>No.${String(card.no).padStart(3, "0")} 未入手</strong><span>入手条件: 無料お試し10連ガチャから入手</span><small>レアリティ ${card.rarity}</small>`;
            if (unlocked) {
                if (card.description) {
                    const description = document.createElement("p");
                    description.textContent = card.description;
                    detailElement.append(description);
                }
                const button = document.createElement("button");
                button.type = "button";
                button.className = "trial-art-open";
                button.textContent = "画像を大きく見る";
                button.addEventListener("click", () => showArtwork(card));
                detailElement.append(button);
                if (card.bookUrl) {
                    const link = document.createElement("a");
                    link.href = card.bookUrl;
                    link.textContent = "小説のキャラ紹介を見る ↗";
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    detailElement.append(link);
                }
            }
        }

        function renderBook() {
            if (!bookElement) return;
            const filtered = catalog.cards.filter((card) => activeFilter === "all" || card.work === activeFilter);
            bookElement.replaceChildren();
            filtered.forEach((card) => {
                const count = inventory[card.id] || 0;
                const element = cardElement(card, { compact: true, unlocked: count > 0, count });
                element.addEventListener("click", () => {
                    showDetail(card, count > 0);
                    if (count > 0) showArtwork(card);
                });
                bookElement.append(element);
            });
            const unlocked = catalog.cards.filter((card) => inventory[card.id]).length;
            if (countElement) countElement.textContent = `${unlocked} / ${catalog.cards.length}`;
        }

        function setView(view) {
            if (drawing) return;
            rootElement.dataset.trialView = view;
            rootElement.classList.toggle("is-results-view", view === "summon" && stage?.dataset.phase === "results");
            viewButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.trialView === view)));
            panes.forEach((pane) => { pane.hidden = pane.dataset.trialPane !== view; });
            if (view === "book") renderBook();
            syncSea();
        }

        function resetPresentation(message = "ガチャタブから、作品カードを呼び出せます。") {
            cancelTimers();
            drawing = false;
            activeResults = [];
            resultsSettled = false;
            currentIndex = -1;
            if (stage) stage.dataset.blessed = "false";
            sea?.reset();
            setStagePhase("idle");
            if (singleReveal) singleReveal.hidden = true;
            if (currentCard) currentCard.replaceChildren();
            if (quoteElement) quoteElement.hidden = true;
            if (resultsWrap) resultsWrap.hidden = true;
            if (resultsElement) resultsElement.replaceChildren();
            if (drawButton) { drawButton.hidden = false; drawButton.disabled = false; }
            if (nextButton) nextButton.hidden = true;
            if (skipButton) skipButton.hidden = true;
            if (statusElement) statusElement.textContent = message;
            setTabsDisabled(false);
        }

        function settleResults() {
            if (resultsSettled || !activeResults.length) return true;
            inventory = addToInventory(inventory, activeResults);
            resultsSettled = true;
            return saveInventory(storage, inventory);
        }

        function finishDraw() {
            if (!activeResults.length) return;
            cancelTimers();
            const saved = settleResults();
            drawing = false;
            setTabsDisabled(false);
            setStagePhase("results");
            if (singleReveal) singleReveal.hidden = true;
            if (nextButton) nextButton.hidden = true;
            if (skipButton) skipButton.hidden = true;
            if (drawButton) { drawButton.hidden = true; drawButton.disabled = false; }
            if (resultsElement) {
                resultsElement.replaceChildren(...activeResults.map((card, index) => cardElement(card, { result: true, index, onZoom: showArtwork })));
                resultsElement.classList.remove("is-revealing");
                void resultsElement.offsetWidth;
                resultsElement.classList.add("is-revealing");
            }
            if (resultsWrap) resultsWrap.hidden = false;
            const message = saved
                ? "10枚の星を発見しました。図鑑に保存しました。"
                : "10枚の星を発見しました。ブラウザの保存機能が無効なため、図鑑には保存できませんでした。";
            if (statusElement) statusElement.textContent = message;
            if (resultsStatus) resultsStatus.textContent = `${message} カードを押すと拡大できます。`;
            rootElement.querySelector(".trial-gacha-body")?.scrollTo(0, 0);
            renderBook();
        }

        function showCard(index) {
            if (!drawing || !activeResults[index]) return;
            const card = activeResults[index];
            currentIndex = index;
            setStagePhase("card", card.rarity);
            if (singleReveal) singleReveal.hidden = false;
            if (quoteElement) quoteElement.hidden = true;
            if (revealCount) revealCount.textContent = `${index + 1} / ${activeResults.length}`;
            if (currentCard) {
                currentCard.hidden = false;
                const featured = cardElement(card, { featured: true, index, onZoom: showArtwork });
                const decode = document.createElement("span");
                decode.className = "trial-decode";
                decode.setAttribute("aria-hidden", "true");
                featured.append(decode);
                currentCard.replaceChildren(featured);
            }
            if (nextButton) {
                nextButton.hidden = false;
                nextButton.textContent = index === activeResults.length - 1 ? "10枚の結果を見る" : "次のカードへ";
            }
            if (statusElement) statusElement.textContent = `${index + 1}枚目: ${card.rarity} ${card.title}`;
            if (card.rarity === "UR") audio.ur();
            else audio.reveal(card.rarity);
        }

        function revealCard(index) {
            if (!drawing || !activeResults[index]) return;
            const card = activeResults[index];
            currentIndex = index;
            if (nextButton) nextButton.hidden = true;
            if (singleReveal) singleReveal.hidden = true;
            if (currentCard) { currentCard.hidden = true; currentCard.replaceChildren(); }
            if (revealCount) revealCount.textContent = `${index + 1} / ${activeResults.length}`;

            if (card.rarity !== "UR") {
                setStagePhase("portal", card.rarity);
                audio.decode();
                if (statusElement) statusElement.textContent = `${index + 1}枚目の記憶をデータ化中…`;
                schedule(() => showCard(index), 520);
                return;
            }

            setStagePhase("omen", "UR");
            audio.decode();
            if (statusElement) statusElement.textContent = "特別なシグナルを検出。虹色の記憶が近づいています…";
            schedule(() => {
                setStagePhase("quote", "UR");
                if (singleReveal) singleReveal.hidden = false;
                if (quoteElement) quoteElement.hidden = false;
                if (quoteText) quoteText.textContent = card.quote || "星の記憶が、いま目を覚ます。";
                if (quoteLabel) quoteLabel.textContent = card.quoteLabel ? `UR / ${card.quoteLabel}` : "UR / CHARACTER SIGNAL";
                if (currentCard) currentCard.hidden = true;
                if (statusElement) statusElement.textContent = "UR SIGNAL DETECTED";
                schedule(() => showCard(index), 1900);
            }, 1400);
        }

        function beginDraw() {
            if (drawing) return;
            cancelTimers();
            drawing = true;
            resultsSettled = false;
            activeResults = drawCards(10);
            currentIndex = -1;
            setTabsDisabled(true);
            if (resultsWrap) resultsWrap.hidden = true;
            if (resultsElement) { resultsElement.replaceChildren(); resultsElement.classList.remove("is-revealing"); }
            if (singleReveal) singleReveal.hidden = true;
            if (quoteElement) quoteElement.hidden = true;
            if (drawButton) { drawButton.hidden = true; drawButton.disabled = true; }
            if (nextButton) nextButton.hidden = true;
            if (skipButton) skipButton.hidden = false;
            const blessed = hasBlessing(activeResults);
            if (stage) stage.dataset.blessed = "false";
            sea?.reset();
            const thisRun = runId;
            // 10枚のコインを夜の海へ。着水点は毎回少しずらす。
            const landings = COIN_TARGETS.map(([x, y], index) => {
                const target = { x: x + (Math.random() - 0.5) * 0.06, y: y + (Math.random() - 0.5) * 0.05 };
                const delay = index * 55 + Math.random() * 40;
                const duration = 820 + Math.random() * 180;
                const coin = coinThrows[index];
                if (coin) {
                    coin.style.setProperty("--tx", `${(target.x * 100).toFixed(1)}%`);
                    coin.style.setProperty("--ty", `${(target.y * 100).toFixed(1)}%`);
                    coin.style.setProperty("--sx", `${(38 + Math.random() * 24).toFixed(1)}%`);
                    coin.style.setProperty("--delay", `${delay.toFixed(0)}ms`);
                    coin.style.setProperty("--dur", `${duration.toFixed(0)}ms`);
                }
                return { ...target, at: delay + duration };
            });
            setStagePhase("coin");
            audio.coin();
            if (statusElement) statusElement.textContent = "無料お試しコイン10枚を、夜の海へ投げ入れました…";
            landings.forEach((landing) => schedule(() => {
                sea?.drop(landing.x, landing.y, 1);
                audio.plop(0.8 + Math.random() * 0.5);
            }, landing.at, thisRun));
            // 着水 → 波紋で星が揺らぐ →（UR確定なら海の底から光）→ 夜空へ見上げる → 流れ星が海へ落ちる → デジタル空間
            const steps = [
                { phase: "ripple", wait: 1450, text: "重なる波紋に、水面の星が揺らいでいます…", run: () => sea?.setWobble(1.2) },
                ...(blessed ? [{ phase: "blessing", wait: 1000, text: "海の底から光が湧き上がる――UR確定！", run: () => {
                    if (stage) stage.dataset.blessed = "true";
                    sea?.setBlessing(true);
                    audio.blessing();
                } }] : []),
                { phase: "sky", wait: blessed ? 1600 : 1000, text: "見上げると、満天の星空…", run: () => { sea?.lift(420); audio.lift(); } },
                { phase: "meteor", wait: 820, text: "流れ星が、海へ落ちていきます…", run: () => { sea?.meteor(1350); audio.meteor(); } },
                { phase: "plunge", wait: 1350, text: "星の記憶のデジタル空間へ接続…", run: () => { audio.impact(); audio.dive(); } }
            ];
            let elapsed = 0;
            steps.forEach((step) => {
                elapsed += step.wait;
                schedule(() => {
                    setStagePhase(step.phase);
                    step.run();
                    if (statusElement) statusElement.textContent = step.text;
                }, elapsed, thisRun);
            });
            schedule(() => revealCard(0), elapsed + 650, thisRun);
        }

        drawButton?.addEventListener("click", beginDraw);
        againButton?.addEventListener("click", beginDraw);
        nextButton?.addEventListener("click", () => {
            if (!drawing) return;
            if (currentIndex >= activeResults.length - 1) finishDraw();
            else revealCard(currentIndex + 1);
        });
        skipButton?.addEventListener("click", finishDraw);
        stage?.addEventListener("click", () => {
            if (drawing && nextButton && !nextButton.hidden) nextButton.click();
        });

        viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.trialView)));
        filterButtons.forEach((button) => button.addEventListener("click", () => {
            activeFilter = button.dataset.trialFilter;
            filterButtons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
            renderBook();
        }));

        new MutationObserver(() => {
            syncSea();
            if (rootElement.getAttribute("aria-hidden") === "true") {
                if (artDialog?.open) artDialog.close();
                if (drawing) resetPresentation("召喚を中断しました。もう一度10連を開始できます。");
            }
        }).observe(rootElement, { attributes: true, attributeFilter: ["aria-hidden"] });

        renderBook();
    }

    if (typeof document !== "undefined") {
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
        else initialize();
    }

    return Object.freeze({ chooseRarity, drawCards, buildRevealPlan, hasBlessing, loadInventory, addToInventory, saveInventory });
});
