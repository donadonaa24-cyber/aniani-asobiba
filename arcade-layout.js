(() => {
    const modal = document.getElementById('mini-game');
    const root = document.getElementById('mini-games-tabs');
    if (!modal || !root) return;
    const close = modal.querySelector('[data-modal-close]');
    const controls = document.getElementById('arcade-controls');
    const sessions = [];
    let tetrisActions = null;
    if (controls) {
        // Move existing buttons, not copies, so game handlers and IDs stay intact.
        root.querySelectorAll('[data-mini-panel]').forEach(panel => {
            const actions = panel.querySelector('.memory-controls, .form-actions:not(.mini-pad-controls)');
            if (!actions) return;
            actions.classList.add('arcade-session-actions');
            actions.dataset.controlGame = panel.dataset.miniPanel;
            actions.hidden = true;
            if (panel.dataset.miniPanel === 'tetris') tetrisActions = actions;
            controls.append(actions);
            sessions.push(actions);
        });
    }
    let playing = false;
    let session = 0;
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
            // 盤面に重ねる遊び方の選択・結果表示は、盤面の大きさの計算に含めない。
            if (cs.display === 'none' || cs.position === 'absolute') continue;
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
    // テトリスのスタート・リセットは、十字キーや回転から離す。PC・横画面は左上の余白、
    // スマホ縦画面は右側のNEXTの下（同じ列に積むので重ならない）。
    function placeTetrisActions() {
        if (!tetrisActions?.parentNode) return;
        const tools = document.querySelector?.('.tetris-tools');
        const portrait = window.matchMedia?.('(orientation: portrait) and (max-width: 700px), (max-width: 540px)')?.matches;
        const target = portrait && typeof tools?.append === 'function' ? tools : controls;
        if (target && tetrisActions.parentNode !== target) target.append(tetrisActions);
    }
    function schedule() { placeTetrisActions(); if (!frame) frame = requestAnimationFrame(fit); }
    function menuTabs() { root.querySelectorAll('[data-mini-tab]').forEach(tab => tab.tabIndex = 0); }
    function safely(action) {
        try { return Promise.resolve(action()).catch(() => {}); }
        catch (_) { return Promise.resolve(); }
    }
    function fullscreenElement() { return document.fullscreenElement || document.webkitFullscreenElement; }
    function leaveFullscreen() {
        if (fullscreenElement() !== modal) return Promise.resolve();
        return safely(() => (document.exitFullscreen || document.webkitExitFullscreen)?.call(document));
    }
    function enter(key) {
        const currentSession = ++session;
        playing = true;
        modal.dataset.game = key;
        modal.dataset.directional = String(['breakout', 'snake', 'tetris', 'drop'].includes(key));
        sessions.forEach(actions => { actions.hidden = actions.dataset.controlGame !== key; });
        controls?.querySelectorAll('[data-pad-dir]').forEach(button => {
            button.disabled = (key === 'tetris' && button.dataset.padDir === 'up') ||
                (key === 'breakout' && ['up', 'down'].includes(button.dataset.padDir));
        });
        modal.classList.add('is-playing');
        close.setAttribute('aria-label', 'ゲーム一覧に戻る');
        close.focus({preventScroll: true});
        schedule();
        const fullscreen = fullscreenElement() === modal ? Promise.resolve()
            : safely(() => modal.requestFullscreen?.());
        fullscreen.then(() => {
            if (!playing) {
                leaveFullscreen();
                return;
            }
            if (currentSession !== session) return;
            if (key === 'memory') safely(() => screen.orientation?.lock?.('landscape'));
            schedule();
        });
    }
    function exit() {
        if (!playing && !modal.classList.contains('is-playing')) return false;
        playing = false;
        session++;
        modal.classList.remove('is-playing');
        close.setAttribute('aria-label', '閉じる');
        menuTabs();
        root.querySelector(`[data-mini-tab="${modal.dataset.game}"]`)?.focus({preventScroll: true});
        // Restore navigation before calling any browser APIs or game cleanup.
        safely(() => document.dispatchEvent(new Event('arcade-exit')));
        safely(() => screen.orientation?.unlock?.());
        leaveFullscreen();
        return true;
    }
    window.arcadeExitPlay = exit;
    function returnHome() {
        exit();
        modal.classList.remove('is-open', 'is-playing');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        leaveFullscreen();
        document.querySelector('.console-dock [data-modal-target="mini-game"]')?.focus({preventScroll: true});
    }
    close.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (exit()) return;
        returnHome();
    });
    document.getElementById('arcade-home')?.addEventListener('click', event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        returnHome();
    });
    root.addEventListener('click', event => {
        const tab = event.target.closest('[data-mini-tab]');
        if (tab) enter(tab.dataset.miniTab);
    });
    function fullscreenChanged() {
        if (!fullscreenElement() && playing) exit();
        schedule();
    }
    document.addEventListener('fullscreenchange', fullscreenChanged);
    document.addEventListener('webkitfullscreenchange', fullscreenChanged);
    window.addEventListener('resize', schedule);
    new ResizeObserver(schedule).observe(root);
    new MutationObserver(schedule).observe(root, {childList: true, subtree: true});
    menuTabs();
})();
