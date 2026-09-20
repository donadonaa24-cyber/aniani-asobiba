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
            art.style.backgroundImage = `url("${card.image}")`;
            art.style.backgroundSize = `${columns * 100}% ${rows * 100}%`;
            art.style.backgroundPosition = `${columns === 1 ? 50 : (column / (columns - 1)) * 100}% ${rows === 1 ? 50 : (row / (rows - 1)) * 100}%`;
        } else {
            const image = document.createElement("img");
            image.src = card.image;
            image.alt = "";
            image.loading = featured ? "eager" : "lazy";
            art.append(image);
        }
        return art;
    }

    function cardElement(card, options = {}) {
        const { compact = false, featured = false, unlocked = true, count = 0, index = 0 } = options;
        const item = document.createElement(compact ? "button" : "article");
        if (compact) item.type = "button";
        item.className = `trial-card rarity-${card.rarity.toLowerCase()}${compact ? " is-compact" : ""}${featured ? " is-featured" : ""}${unlocked ? "" : " is-locked"}`;
        item.style.setProperty("--reveal-index", index);
        item.dataset.cardId = card.id;
        item.setAttribute("aria-label", unlocked ? `No.${String(card.no).padStart(3, "0")} ${card.title} ${card.rarity}` : `No.${String(card.no).padStart(3, "0")} 未入手`);
        item.append(artElement(card, unlocked, featured));

        const meta = document.createElement("div");
        meta.className = "trial-card-meta";
        meta.innerHTML = `<span class="trial-card-number">No.${String(card.no).padStart(3, "0")}</span><strong>${unlocked ? card.title : "UNKNOWN"}</strong><small>${unlocked ? `${card.work} / ${card.role || card.category}` : "未入手"}</small><b>${card.rarity}</b>${count > 1 ? `<em>×${count}</em>` : ""}`;
        item.append(meta);
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

        return {
            coin: () => tones([880, 1320], 0.16, "triangle", 0.04),
            reveal: (rarity) => tones(rarity === "SSR" ? [523, 659, 784] : rarity === "SR" ? [440, 554] : [392], 0.2, "sine", 0.035),
            ur: () => tones([392, 523, 659, 784, 1047], 0.42, "triangle", 0.055)
        };
    }

    function initialize() {
        if (!catalog) return;
        const rootElement = document.getElementById("trial-gacha");
        if (!rootElement) return;

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
        const resultsWrap = rootElement.querySelector("#trial-results-wrap");
        const resultsElement = rootElement.querySelector("#trial-gacha-results");
        const statusElement = rootElement.querySelector("#trial-gacha-status");
        const bookElement = rootElement.querySelector("#trial-gacha-book");
        const countElement = rootElement.querySelector("#trial-book-count");
        const detailElement = rootElement.querySelector("#trial-card-detail");
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
        }

        function renderBook() {
            if (!bookElement) return;
            const filtered = catalog.cards.filter((card) => activeFilter === "all" || card.work === activeFilter);
            bookElement.replaceChildren();
            filtered.forEach((card) => {
                const count = inventory[card.id] || 0;
                const element = cardElement(card, { compact: true, unlocked: count > 0, count });
                element.addEventListener("click", () => showDetail(card, count > 0));
                bookElement.append(element);
            });
            const unlocked = catalog.cards.filter((card) => inventory[card.id]).length;
            if (countElement) countElement.textContent = `${unlocked} / ${catalog.cards.length}`;
        }

        function setView(view) {
            if (drawing) return;
            viewButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.trialView === view)));
            panes.forEach((pane) => { pane.hidden = pane.dataset.trialPane !== view; });
            if (view === "book") renderBook();
        }

        function resetPresentation(message = "ガチャタブから、作品カードを呼び出せます。") {
            cancelTimers();
            drawing = false;
            activeResults = [];
            resultsSettled = false;
            currentIndex = -1;
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
                resultsElement.replaceChildren(...activeResults.map((card, index) => cardElement(card, { index })));
                resultsElement.classList.remove("is-revealing");
                void resultsElement.offsetWidth;
                resultsElement.classList.add("is-revealing");
            }
            if (resultsWrap) resultsWrap.hidden = false;
            if (statusElement) statusElement.textContent = saved
                ? "10枚の星を発見しました。図鑑に保存しました。"
                : "10枚の星を発見しました。ブラウザの保存機能が無効なため、図鑑には保存できませんでした。";
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
                currentCard.replaceChildren(cardElement(card, { featured: true, index }));
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
                if (statusElement) statusElement.textContent = `${index + 1}枚目の星を観測中…`;
                schedule(() => showCard(index), 360);
                return;
            }

            setStagePhase("omen", "UR");
            if (statusElement) statusElement.textContent = "流れ星を観測。特別な記憶が近づいています…";
            schedule(() => {
                setStagePhase("quote", "UR");
                if (singleReveal) singleReveal.hidden = false;
                if (quoteElement) quoteElement.hidden = false;
                if (quoteText) quoteText.textContent = card.quote || "星の記憶が、いま目を覚ます。";
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
            setStagePhase("coin");
            audio.coin();
            if (statusElement) statusElement.textContent = "無料お試しコインを宇宙へ投げています…";
            const thisRun = runId;
            schedule(() => {
                setStagePhase("vortex");
                if (statusElement) statusElement.textContent = "銀河が回転し、10個の記憶を選んでいます…";
                schedule(() => {
                    setStagePhase("whiteout");
                    if (statusElement) statusElement.textContent = "召喚ゲートを開放…";
                    schedule(() => revealCard(0), 720, thisRun);
                }, 1050, thisRun);
            }, 900, thisRun);
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
            if (rootElement.getAttribute("aria-hidden") === "true" && drawing) {
                resetPresentation("召喚を中断しました。もう一度10連を開始できます。");
            }
        }).observe(rootElement, { attributes: true, attributeFilter: ["aria-hidden"] });

        renderBook();
    }

    if (typeof document !== "undefined") {
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
        else initialize();
    }

    return Object.freeze({ chooseRarity, drawCards, buildRevealPlan, loadInventory, addToInventory });
});
