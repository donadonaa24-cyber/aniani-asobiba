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

    function artElement(card, unlocked = true) {
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
            image.loading = "lazy";
            art.append(image);
        }
        return art;
    }

    function cardElement(card, options = {}) {
        const { compact = false, unlocked = true, count = 0, index = 0 } = options;
        const item = document.createElement(compact ? "button" : "article");
        if (compact) item.type = "button";
        item.className = `trial-card rarity-${card.rarity.toLowerCase()}${compact ? " is-compact" : ""}${unlocked ? "" : " is-locked"}`;
        item.style.setProperty("--reveal-index", index);
        item.dataset.cardId = card.id;
        item.setAttribute("aria-label", unlocked ? `No.${String(card.no).padStart(3, "0")} ${card.title} ${card.rarity}` : `No.${String(card.no).padStart(3, "0")} 未入手`);
        item.append(artElement(card, unlocked));

        const meta = document.createElement("div");
        meta.className = "trial-card-meta";
        meta.innerHTML = `<span class="trial-card-number">No.${String(card.no).padStart(3, "0")}</span><strong>${unlocked ? card.title : "UNKNOWN"}</strong><small>${unlocked ? `${card.work} / ${card.role || card.category}` : "未入手"}</small><b>${card.rarity}</b>${count > 1 ? `<em>×${count}</em>` : ""}`;
        item.append(meta);
        return item;
    }

    function initialize() {
        if (!catalog) return;
        const rootElement = document.getElementById("trial-gacha");
        if (!rootElement) return;

        const drawButton = rootElement.querySelector("#trial-draw-ten");
        const stage = rootElement.querySelector("#trial-summon-stage");
        const resultsElement = rootElement.querySelector("#trial-gacha-results");
        const statusElement = rootElement.querySelector("#trial-gacha-status");
        const bookElement = rootElement.querySelector("#trial-gacha-book");
        const countElement = rootElement.querySelector("#trial-book-count");
        const detailElement = rootElement.querySelector("#trial-card-detail");
        const filterButtons = Array.from(rootElement.querySelectorAll("[data-trial-filter]"));
        const viewButtons = Array.from(rootElement.querySelectorAll("[data-trial-view]"));
        const panes = Array.from(rootElement.querySelectorAll("[data-trial-pane]"));
        const storage = runtime.localStorage;
        let inventory = loadInventory(storage);
        let activeFilter = "all";
        let drawing = false;
        const reduceMotion = runtime.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

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
            viewButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.trialView === view)));
            panes.forEach((pane) => { pane.hidden = pane.dataset.trialPane !== view; });
            if (view === "book") renderBook();
        }

        function finishDraw(results) {
            inventory = addToInventory(inventory, results);
            const saved = saveInventory(storage, inventory);
            resultsElement?.replaceChildren(...results.map((card, index) => cardElement(card, { index })));
            stage?.classList.remove("is-summoning");
            resultsElement?.classList.add("is-revealing");
            if (statusElement) statusElement.textContent = saved
                ? `10枚の星を発見しました。図鑑に保存しました。`
                : `10枚の星を発見しました。ブラウザの保存機能が無効なため、図鑑には保存できませんでした。`;
            const duration = reduceMotion ? 20 : 1450;
            runtime.setTimeout(() => {
                resultsElement?.classList.remove("is-revealing");
                drawing = false;
                if (drawButton) drawButton.disabled = false;
                renderBook();
            }, duration);
        }

        drawButton?.addEventListener("click", () => {
            if (drawing) return;
            drawing = true;
            drawButton.disabled = true;
            resultsElement?.replaceChildren();
            stage?.classList.add("is-summoning");
            if (statusElement) statusElement.textContent = "銀河から10個の記憶を呼び寄せています…";
            const results = drawCards(10);
            runtime.setTimeout(() => finishDraw(results), reduceMotion ? 20 : 1350);
        });

        viewButtons.forEach((button) => button.addEventListener("click", () => setView(button.dataset.trialView)));
        filterButtons.forEach((button) => button.addEventListener("click", () => {
            activeFilter = button.dataset.trialFilter;
            filterButtons.forEach((candidate) => candidate.setAttribute("aria-pressed", String(candidate === button)));
            renderBook();
        }));

        renderBook();
    }

    if (typeof document !== "undefined") {
        if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
        else initialize();
    }

    return Object.freeze({ chooseRarity, drawCards, loadInventory, addToInventory });
});
