(() => {
    // キャラクターのイラストを押すと、待機の姿と攻撃中の姿を切り替える。
    document.querySelectorAll('button.char-art').forEach((button) => {
        const img = button.querySelector('img[data-action]');
        if (!img) return;
        const idle = img.getAttribute('src');
        const action = img.dataset.action;
        button.addEventListener('click', () => {
            const showAction = button.getAttribute('aria-pressed') !== 'true';
            img.src = showAction ? action : idle;
            button.setAttribute('aria-pressed', String(showAction));
        });
    });

    // 上部の目次で、今見ている項目を強調する。
    const links = [...document.querySelectorAll('.bar-nav a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
    if (!('IntersectionObserver' in window) || !sections.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((section) => observer.observe(section));
})();
