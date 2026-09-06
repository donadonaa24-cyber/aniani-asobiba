(() => {
    const stage = document.getElementById('orbit-stage');
    const cases = [...document.querySelectorAll('[data-orbit]')];
    if (!stage || !cases.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pause = document.getElementById('orbit-pause');
    let angle = 0;
    let selected = 0;
    let paused = reduced.matches;
    let hovering = false;
    let last = 0;
    let width = stage.clientWidth;
    let height = stage.clientHeight;
    const step = Math.PI * 2 / cases.length;

    function updateSelection(index) {
        selected = index;
        cases.forEach((item, i) => {
            item.classList.toggle('is-selected', i === index);
            item.setAttribute('aria-label', `${item.dataset.title}・${item.dataset.status}の詳細を開く`);
        });
        const item = cases[index];
        document.getElementById('orbit-title').textContent = item.dataset.title;
        document.getElementById('orbit-description').textContent = item.dataset.description;
        document.getElementById('orbit-status').textContent = `${String(index + 1).padStart(2, '0')} / 04 · ${item.dataset.status}`;
    }
    function render() {
        let front = 0;
        let depth = -2;
        cases.forEach((item, i) => {
            const theta = angle + i * step;
            const z = Math.cos(theta);
            const x = Math.sin(theta) * width * .35;
            const y = z * height * .23;
            const scale = .76 + (z + 1) * .15;
            item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotateY(${-Math.sin(theta) * 16}deg)`;
            item.style.zIndex = String(Math.round((z + 1) * 20) + 2);
            item.style.filter = `brightness(${.65 + (z + 1) * .175})`;
            if (z > depth) { depth = z; front = i; }
        });
        if (front !== selected) updateSelection(front);
    }
    function updatePause() {
        pause.textContent = paused ? '周回を再開' : '周回を停止';
        pause.setAttribute('aria-pressed', String(paused));
    }
    function select(offset) {
        paused = true;
        updatePause();
        selected = (selected + offset + cases.length) % cases.length;
        angle = -selected * step;
        updateSelection(selected);
        render();
    }
    document.getElementById('orbit-prev').addEventListener('click', () => select(-1));
    document.getElementById('orbit-next').addEventListener('click', () => select(1));
    document.getElementById('orbit-open').addEventListener('click', () => cases[selected].click());
    pause.addEventListener('click', () => { paused = !paused; updatePause(); });
    stage.addEventListener('pointerenter', () => { hovering = true; });
    stage.addEventListener('pointerleave', () => { hovering = false; });
    stage.addEventListener('focusin', () => { paused = true; updatePause(); });
    let startX = null;
    let swiped = false;
    stage.addEventListener('pointerdown', event => { startX = event.clientX; swiped = false; });
    stage.addEventListener('pointerup', event => {
        if (startX !== null && Math.abs(event.clientX - startX) > 35) {
            swiped = true;
            select(event.clientX < startX ? 1 : -1);
        }
        startX = null;
    });
    stage.addEventListener('pointercancel', () => { startX = null; });
    stage.addEventListener('click', event => {
        if (swiped) { event.preventDefault(); event.stopPropagation(); swiped = false; }
    }, true);
    document.addEventListener('keydown', event => {
        if (document.querySelector('.modal-section.is-open') || event.altKey || event.ctrlKey || event.metaKey || event.target.matches('input,textarea,select,[contenteditable]')) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault(); select(event.key === 'ArrowLeft' ? -1 : 1);
        } else if (event.key === 'Enter' && !event.target.closest('button,a')) {
            event.preventDefault(); cases[selected].click();
        }
    });
    new ResizeObserver(() => { width = stage.clientWidth; height = stage.clientHeight; render(); }).observe(stage);
    reduced.addEventListener('change', () => { paused = reduced.matches; updatePause(); });
    function frame(time) {
        const delta = Math.min(time - last, 50);
        last = time;
        if (!paused && !hovering && !document.hidden && !document.querySelector('.modal-section.is-open')) {
            angle -= delta * .000045;
            render();
        }
        requestAnimationFrame(frame);
    }
    updateSelection(0);
    updatePause();
    render();
    requestAnimationFrame(frame);
})();
