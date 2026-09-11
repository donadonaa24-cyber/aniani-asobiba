(() => {
    const modal = document.getElementById('mini-game');
    const root = document.getElementById('mini-games-tabs');
    if (!modal || !root) return;
    const close = modal.querySelector('[data-modal-close]');
    let playing = false;
    let frame = 0;
    const number = value => parseFloat(value) || 0;
    function fit() {
        frame = 0;
        if (!playing) return;
        const panel = root.querySelector('.mini-tab-panel.is-active');
        const board = panel?.querySelector('#ttt-board, #memory-board, #mole-board, #reaction-target, canvas, #drop-board');
        if (!board) return;
        const style = getComputedStyle(panel);
        let height = panel.clientHeight - number(style.paddingTop) - number(style.paddingBottom);
        const width = panel.clientWidth - number(style.paddingLeft) - number(style.paddingRight);
        for (const child of panel.children) {
            const cs = getComputedStyle(child);
            if (cs.display === 'none') continue;
            height -= number(cs.marginTop) + number(cs.marginBottom);
            if (child !== board) height -= child.offsetHeight;
        }
        height = Math.max(1, height - 4);
        let ratio = board.tagName === 'CANVAS' ? board.width / board.height : board.id === 'reaction-target' ? 16 / 9 : 1;
        let w = Math.min(width, height * ratio), h = w / ratio;
        if (board.id === 'memory-board') {
            const count = board.children.length || 30;
            let best = 0;
            for (let cols = 1; cols <= count; cols++) {
                const rows = Math.ceil(count / cols);
                const cell = Math.min((width - (cols - 1) * 4) / cols, (height - (rows - 1) * 4) / rows * 2 / 3);
                if (cell <= best) continue;
                best = cell;
                w = cell * cols + (cols - 1) * 4;
                h = cell * 1.5 * rows + (rows - 1) * 4;
                board.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
                board.style.gridTemplateRows = `repeat(${rows}, minmax(0, 1fr))`;
            }
        }
        board.style.width = `${Math.max(1, w)}px`;
        board.style.height = `${Math.max(1, h)}px`;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(fit); }
    function menuTabs() { root.querySelectorAll('[data-mini-tab]').forEach(tab => tab.tabIndex = 0); }
    function enter(key) {
        playing = true;
        modal.dataset.game = key;
        modal.classList.add('is-playing');
        close.setAttribute('aria-label', 'ゲーム一覧に戻る');
        close.focus({preventScroll: true});
        schedule();
        const fullscreen = document.fullscreenElement === modal ? Promise.resolve() : modal.requestFullscreen?.();
        Promise.resolve(fullscreen).catch(() => {}).then(() => {
            if (!playing && document.fullscreenElement === modal) {
                document.exitFullscreen().catch(() => {});
                return;
            }
            if (playing && key === 'memory') screen.orientation?.lock?.('landscape').catch(() => {});
            schedule();
        });
    }
    function exit() {
        if (!playing) return false;
        playing = false;
        modal.classList.remove('is-playing');
        document.dispatchEvent(new Event('arcade-exit'));
        try { screen.orientation?.unlock?.(); } catch (_) { /* Unsupported orientation API. */ }
        if (document.fullscreenElement === modal) document.exitFullscreen().catch(() => {});
        close.setAttribute('aria-label', '閉じる');
        menuTabs();
        root.querySelector(`[data-mini-tab="${modal.dataset.game}"]`)?.focus({preventScroll: true});
        return true;
    }
    window.arcadeExitPlay = exit;
    root.addEventListener('click', event => {
        const tab = event.target.closest('[data-mini-tab]');
        if (tab) enter(tab.dataset.miniTab);
    });
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && playing) exit();
        schedule();
    });
    window.addEventListener('resize', schedule);
    new ResizeObserver(schedule).observe(root);
    new MutationObserver(schedule).observe(root, {childList: true, subtree: true});
    menuTabs();
})();
