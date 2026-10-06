(() => {
    const STORAGE = {
        articleComments: "aniani_article_comments_v1",
        guestbook: "aniani_guestbook_comments_v1",
        memoryRanking: "aniani_memory_rankings_v1",
        reactionBest: "aniani_reaction_best_v1"
    };

    // 公式記事: ここに書いた記事が全員に同じ内容で表示されます（端末内保存ではありません）。
    // 新しい記事は先頭に追加してください。id は記事コメントの保存キーなので、公開後は変えないでください。
    const officialArticles = [
        {
            id: "2026-10-06-aniani-bunko",
            title: "あにあに文庫オープン：小説3作品・全6冊を公開",
            category: "新作",
            body: [
                "あにあにの小説を、本物の本のようにページをめくって読める「あにあに文庫」を公開しました。ブラウザで無料で読めます。",
                "・EchoShion：記憶と声をめぐる近未来の物語。",
                "・花散るさきの、幸せのかたち（上巻・下巻・別巻）：姉妹と家族の物語。下巻と別巻で、ふたつの結末を読めます。",
                "・星の終わりに君は生きる（本編・特別編）：管理AIの時代を生きる兄弟と、火星へ渡った少女の物語。",
                "縦書き・挿絵入りで、場面に合わせたBGMが流れます。BGMは読書画面の「♪ BGM」からオン／オフと音量を変えられます。読んだ位置は自動で保存されるので、続きからすぐ読めます。",
                "下の画像は実際の画面です。画像を押すと、別タブで原寸表示できます。"
            ].join("\n\n"),
            screenshots: [
                {
                    src: "images/bunko/shelf-20261006.webp",
                    alt: "あにあに文庫の本棚。6冊の小説の表紙が並ぶ",
                    title: "選ぶ：本棚から読みたい本を",
                    caption: "3作品・全6冊。本を手に取ると表紙とあらすじが表示されます。"
                },
                {
                    src: "images/bunko/cover-20261006.webp",
                    alt: "『星の終わりに君は生きる』の表紙とあらすじ",
                    title: "開く：表紙をタップして",
                    caption: "表紙をタップすると本が開き、物語が始まります。"
                },
                {
                    src: "images/bunko/illust-20261006.webp",
                    alt: "縦書きの本文と挿絵の見開きページ",
                    title: "読む：縦書きと挿絵",
                    caption: "ページをめくる感覚で読めます。場面に合わせてBGMも切り替わります。"
                }
            ],
            links: [
                { href: "https://donadonaa24-cyber.github.io/book/", label: "本棚で読む" }
            ],
            createdAt: "2026-10-06T12:00:00+09:00"
        },
        {
            id: "2026-10-02-oshikoma-trial2",
            title: "推し駒battle 試験版2：画面刷新＆スコア・コンボ追加",
            category: "アップデート",
            body: [
                "無料試験版 v1.0-trial.2（Windows 10・11 / 64bit）を公開しました。推しと進む全10階の盤上ローグライクが、新しい画面と演出でさらににぎやかに！",
                "6×6の盤面で「鍵」の番人を倒し、主人公を出口へ。主人公が倒れたら冒険終了、という一発勝負の基本ルールはそのままです。",
                "・画面を一新：上部にスコアとコンボ、右側に手番キャラと実況ログ、下部に制限時間バーを配置。カットインや撃破・突破の演出も強化しました。",
                "・自分の手番は標準15秒。設定で「なし / 30秒 / 15秒 / 8秒」を選べます。時間切れになると、その駒は待機します。",
                "・スコアとコンボ：連続攻撃で得点倍率が上がり、最大×3.0に。即断ボーナス、階層ランク、ハイスコアの記録も追加しました。",
                "・タイトル、戦闘、ボス戦のBGMと効果音を追加・拡充。設定からそれぞれON / OFFを切り替えられます。",
                "マウスで操作し、途中で「中断」して続きから再開できます。下の画像は試験版2の実画面です。画像を押すと、別タブで原寸表示できます。"
            ].join("\n\n"),
            screenshots: [
                {
                    src: "images/oshikoma/board-20261002.jpg",
                    alt: "推し駒battle試験版2の対戦画面。上部にスコアとコンボ、右側に手番キャラ、下部に制限時間バー",
                    title: "戦う：推しと挑む6×6の盤面",
                    caption: "青いマスへ移動、赤い敵はクリックで攻撃。「鍵」の番人を倒して出口を開こう。"
                },
                {
                    src: "images/oshikoma/select-20261002.jpg",
                    alt: "推し駒battle試験版2の主人公選択画面。推し駒の立ち絵と能力・固有スキルを表示",
                    title: "選ぶ：主人公になる推し駒",
                    caption: "能力・移動・攻撃範囲・固有スキルを確認して、冒険の主人公を選択。"
                },
                {
                    src: "images/oshikoma/inspect-20261002.jpg",
                    alt: "推し駒battle試験版2の敵情報画面。駒の横に能力説明、盤面に次の手番の攻撃範囲を表示",
                    title: "読む：敵の情報と危険範囲",
                    caption: "駒にマウスを乗せると能力と攻撃範囲が見える。敵の次の一手を読んで動こう。"
                },
                {
                    src: "images/oshikoma/blessing-20261002.jpg",
                    alt: "推し駒battle試験版2の祝福選択画面。次の階へ持ち越す祝福を3つの候補から選ぶ",
                    title: "強化する：次の階へ持ち越す祝福",
                    caption: "階を突破したら、3つの候補から祝福を1つ選択。仲間の回復や能力強化を次の攻略に。"
                }
            ],
            links: [
                { href: "https://donadonaa24-cyber.github.io/oshikoma/", label: "ホームページ・遊び方へ" },
                { href: "https://github.com/donadonaa24-cyber/oshikoma/releases/download/v1.0-trial.2/OshigomaBattle-trial2-win64.zip", label: "Windows試験版2をダウンロード（約103MB）" }
            ],
            createdAt: "2026-10-02T09:27:25+09:00"
        },
        {
            id: "2026-10-01-oshikoma-trial",
            title: "推し駒battle 無料試験版を公開",
            category: "お知らせ",
            body: [
                "推し駒battleの無料試験版 v1.0-trial.1（Windows 10・11 64bit）を公開しました。",
                "動物コスプレの「推し駒」1人を主人公に、ランダム生成の全10階を攻略する盤上ローグライク戦略ゲームです。将棋風の動きで番人を倒し、仲間を救い、十階の黒獅子王を目指そう。",
                "ダウンロードと遊び方は、ゲーム一覧の推し駒battle、または推し駒battleのホームページから。感想・不具合報告はGitHubのIssuesへお寄せください。"
            ].join("\n"),
            createdAt: "2026-10-01T08:59:00+09:00"
        },
        {
            id: "2026-10-01-tumikomi-career",
            title: "架空運輸 大型アップデート：役職制度と配車便",
            category: "アップデート",
            body: [
                "架空運輸を更新しました。",
                "・役職制度：便をクリアするごとに、研修生から営業所長まで昇進",
                "・配車便：12件の依頼から受注を選んで運ぶ新しい便（積み残しは違約金）",
                "・会話パート：出発前のブリーフィングと帰社後の評価、昇格セレモニー",
                "・夜間配送を一新：3車線、毎回変わるコース、追い越しコンボ"
            ].join("\n"),
            createdAt: "2026-10-01T08:40:00+09:00"
        },
        {
            id: "2026-09-30-battle-3d-v050",
            title: "Battle à la carte Unity版（3D版）v0.5.0 公開",
            category: "アップデート",
            body: [
                "Windows / Android（試験版）向けのUnity版 v0.5.0 を公開しました。",
                "・ミッション（全6種）とカードスリーブを追加。ログイン中は記録がアカウントに保存され、Web版と共有されます",
                "・ゲームバランスを見直し（ロマン仕込み、まな板の逆転効果、先攻1ターン目はイベント不可 など）",
                "・お気に入りキャラ・スキル、盤面の加工アイテム表示、料理履歴・ログ、BGM選択など遊びやすさを改善",
                "・料理完成や10点料理、スキル、Battle à la carte Modeの演出を強化",
                "ダウンロードは Unity版ホームページ または GitHub のリリースページから。"
            ].join("\n"),
            createdAt: "2026-09-30T12:00:00+09:00"
        },
        {
            id: "2026-09-29-battle-missions",
            title: "Battle à la carte Web版にミッションとカードスリーブを追加",
            category: "アップデート",
            body: [
                "メニューの「ストーリー・ミッション」から、縛りつきの対戦「ミッション」に挑戦できるようになりました（ストーリー第1話クリアで解放）。",
                "・全6種：素材で勝負／爆弾おにぎりで勝利／満腹カレーで勝利／スキル封印／イベント禁止／大逆転",
                "・条件を守って勝つと、カードの裏面デザイン「カードスリーブ」がもらえます",
                "クリア記録は遊んでいるブラウザに保存され、あにあにアカウントでログイン中はアカウントにも保存されます（9/30対応）。くわしくは Battle à la carte 公式サイトのシェフ通信へ。"
            ].join("\n"),
            createdAt: "2026-09-29T22:30:00+09:00"
        },
        {
            id: "2026-09-29-battle-update",
            title: "Battle à la carte Web版 大型アップデート＆公式サイトリニューアル",
            category: "アップデート",
            body: [
                "9/28・9/29にWeb版 Battle à la carte を更新しました。",
                "・先攻は1ターン目にイベントカードを使えなくなりました",
                "・スキル「ロマン仕込み」で10点料理を狙いやすく",
                "・まな板に逆転効果：負けているとき、対戦中1回だけ手札のイベント1枚を捨てて1枚引けます",
                "・モバイル版の画面を見やすく再配置し、スキル選択におすすめ度（★）を表示",
                "あわせて公式サイトをメニュー表風にリニューアルし、お知らせ欄「シェフ通信」と遊び方デモを追加しました。"
            ].join("\n"),
            createdAt: "2026-09-29T12:00:00+09:00"
        },
        {
            id: "2026-09-27-battle-3d-v040",
            title: "Battle à la carte Unity版（3D版）v0.4.0 公開",
            category: "お知らせ",
            body: "Windows / Android（試験版）向けのUnity版 v0.4.0 を公開しました。Web版で作った通信対戦の部屋に参加できます。v0.5.0 は準備中です。",
            createdAt: "2026-09-27T12:00:00+09:00"
        },
        {
            id: "seed-1",
            title: "ポータル公開",
            category: "お知らせ",
            body: "ゲームリンクと更新記事をまとめるポータルを公開しました。",
            createdAt: "2026-04-20T00:00:00+09:00"
        },
        {
            id: "seed-2",
            title: "今後の更新予定",
            category: "配信予定",
            body: "ミニゲームやポータル内機能の調整を予定しています。",
            createdAt: "2026-04-20T00:01:00+09:00"
        }
    ];

    const list = document.getElementById("article-list");

    const guestbookList = document.getElementById("guestbook-list");
    const guestbookForm = document.getElementById("guestbook-form");

    const tttBoardEl = document.getElementById("ttt-board");
    const tttStatusEl = document.getElementById("ttt-status");
    const tttResetButton = document.getElementById("ttt-reset");
    const memoryNicknameInput = document.getElementById("memory-nickname");
    const memoryStartButton = document.getElementById("memory-start");
    const memoryResetButton = document.getElementById("memory-reset");
    const memoryBoardEl = document.getElementById("memory-board");
    const memoryStatusEl = document.getElementById("memory-status");
    const memoryTimerEl = document.getElementById("memory-timer");
    const memoryRankingListEl = document.getElementById("memory-ranking-list");
    const moleBoardEl = document.getElementById("mole-board");
    const moleStatusEl = document.getElementById("mole-status");
    const moleTimeEl = document.getElementById("mole-time");
    const moleScoreEl = document.getElementById("mole-score");
    const moleStartButton = document.getElementById("mole-start");
    const moleResetButton = document.getElementById("mole-reset");
    const reactionTargetButton = document.getElementById("reaction-target");
    const reactionImageEl = document.getElementById("reaction-image");
    const reactionSignalEl = document.getElementById("reaction-signal");
    const reactionStatusEl = document.getElementById("reaction-status");
    const reactionBestEl = document.getElementById("reaction-best");
    const reactionStartButton = document.getElementById("reaction-start");
    const reactionResetButton = document.getElementById("reaction-reset");
    const breakoutCanvasEl = document.getElementById("breakout-canvas");
    const breakoutStatusEl = document.getElementById("breakout-status");
    const breakoutScoreEl = document.getElementById("breakout-score");
    const breakoutLivesEl = document.getElementById("breakout-lives");
    const breakoutStartButton = document.getElementById("breakout-start");
    const breakoutResetButton = document.getElementById("breakout-reset");
    const dropBoardEl = document.getElementById("drop-board");
    const dropStatusEl = document.getElementById("drop-status");
    const dropScoreEl = document.getElementById("drop-score");
    const dropStartButton = document.getElementById("drop-start");
    const dropResetButton = document.getElementById("drop-reset");
    const dropLeftButton = document.getElementById("drop-left");
    const dropRightButton = document.getElementById("drop-right");
    const dropDownButton = document.getElementById("drop-down");
    const snakeCanvasEl = document.getElementById("snake-canvas");
    const snakeStatusEl = document.getElementById("snake-status");
    const snakeScoreEl = document.getElementById("snake-score");
    const snakeStartButton = document.getElementById("snake-start");
    const snakeResetButton = document.getElementById("snake-reset");
    const snakeUpButton = document.getElementById("snake-up");
    const snakeLeftButton = document.getElementById("snake-left");
    const snakeDownButton = document.getElementById("snake-down");
    const snakeRightButton = document.getElementById("snake-right");
    const tetrisCanvasEl = document.getElementById("tetris-canvas");
    const tetrisStatusEl = document.getElementById("tetris-status");
    const tetrisScoreEl = document.getElementById("tetris-score");
    const tetrisLinesEl = document.getElementById("tetris-lines");
    const tetrisStartButton = document.getElementById("tetris-start");
    const tetrisResetButton = document.getElementById("tetris-reset");
    const tetrisLeftButton = document.getElementById("tetris-left");
    const tetrisRightButton = document.getElementById("tetris-right");
    const tetrisRotateButton = document.getElementById("tetris-rotate");
    const tetrisDownButton = document.getElementById("tetris-down");
    const miniTabsRoot = document.getElementById("mini-games-tabs");
    const miniTabButtons = miniTabsRoot
        ? Array.from(miniTabsRoot.querySelectorAll("[data-mini-tab]"))
        : [];
    const miniTabPanels = miniTabsRoot
        ? Array.from(miniTabsRoot.querySelectorAll("[data-mini-panel]"))
        : [];
    const virtualPadButtons = Array.from(document.querySelectorAll("[data-pad-dir]"));
    const miniGameSection = document.getElementById("mini-game");
    const modalTriggers = Array.from(document.querySelectorAll("[data-modal-target]"));
    const modalSections = Array.from(document.querySelectorAll(".modal-section"));
    let lastModalTrigger = null;

    function loadArray(key, fallback) {
        const raw = localStorage.getItem(key);
        if (!raw) {
            localStorage.setItem(key, JSON.stringify(fallback));
            return [...fallback];
        }

        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [...fallback];
        } catch {
            return [...fallback];
        }
    }

    function loadObject(key, fallback) {
        const raw = localStorage.getItem(key);
        if (!raw) {
            localStorage.setItem(key, JSON.stringify(fallback));
            return { ...fallback };
        }

        try {
            const parsed = JSON.parse(raw);
            if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
                return { ...fallback };
            }
            return parsed;
        } catch {
            return { ...fallback };
        }
    }

    function save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function loadNumber(key, fallback) {
        const raw = localStorage.getItem(key);
        if (raw === null) {
            return fallback;
        }
        const parsed = Number(raw);
        return Number.isFinite(parsed) ? parsed : fallback;
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return "日時不明";
        }

        return date.toLocaleString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    function formatDuration(ms) {
        const safe = Number.isFinite(ms) ? Math.max(0, Math.floor(ms)) : 0;
        const min = Math.floor(safe / 60000);
        const sec = Math.floor((safe % 60000) / 1000);
        const milli = safe % 1000;
        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(milli).padStart(3, "0")}`;
    }

    function normalizeName(value) {
        const name = String(value || "").trim();
        if (!name) {
            return "ゲスト";
        }
        return name.slice(0, 24);
    }

    function setActiveMiniGame(tabKey) {
        if (!miniTabsRoot || !tabKey) {
            return;
        }

        miniTabsRoot.dataset.activeMini = tabKey;

        miniTabButtons.forEach((button) => {
            const active = button.dataset.miniTab === tabKey;
            button.classList.toggle("is-active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
            button.setAttribute("tabindex", active ? "0" : "-1");
        });

        miniTabPanels.forEach((panel) => {
            const active = panel.dataset.miniPanel === tabKey;
            panel.classList.toggle("is-active", active);
            panel.setAttribute("aria-hidden", active ? "false" : "true");
        });

        if (tabKey === "breakout") {
            window.setTimeout(() => {
                drawBreakout();
            }, 0);
            return;
        }
        if (tabKey === "snake") {
            window.setTimeout(() => {
                drawSnake();
            }, 0);
            return;
        }
        if (tabKey === "tetris") {
            window.setTimeout(() => {
                drawTetris();
            }, 0);
        }
    }

    function getActiveMiniGameKey() {
        const active = miniTabButtons.find((button) => button.classList.contains("is-active"));
        return String(active?.dataset.miniTab || "");
    }

    function closeOpenModal() {
        if (window.arcadeExitPlay?.()) return;
        const openModal = modalSections.find((section) => section.classList.contains("is-open"));
        if (!openModal) {
            return;
        }

        openModal.classList.remove("is-open");
        openModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        if (lastModalTrigger) {
            lastModalTrigger.focus();
        }
    }

    function openModalById(id, trigger = null) {
        const target = document.getElementById(id);
        if (!(target instanceof HTMLElement) || !target.classList.contains("modal-section")) {
            return;
        }

        modalSections.forEach((section) => {
            const active = section === target;
            section.classList.toggle("is-open", active);
            section.setAttribute("aria-hidden", active ? "false" : "true");
        });

        lastModalTrigger = trigger;
        document.body.classList.add("modal-open");

        const closeButton = target.querySelector("[data-modal-close]");
        if (closeButton instanceof HTMLElement) {
            closeButton.focus();
        }

        if (id === "mini-game") {
            const activeKey = getActiveMiniGameKey() || "ttt";
            window.setTimeout(() => {
                setActiveMiniGame(activeKey);
            }, 0);
        }
    }

    let articleComments = loadObject(STORAGE.articleComments, {});
    let guestbookComments = loadArray(STORAGE.guestbook, []);
    let memoryRankings = loadArray(STORAGE.memoryRanking, []);
    let reactionBestMs = loadNumber(STORAGE.reactionBest, 0);

    function saveArticleComments() {
        save(STORAGE.articleComments, articleComments);
    }

    function saveGuestbook() {
        save(STORAGE.guestbook, guestbookComments);
    }

    function saveMemoryRankings() {
        save(STORAGE.memoryRanking, memoryRankings);
    }

    function addReaction(articleId, name, message) {
        if (!articleComments[articleId]) {
            articleComments[articleId] = [];
        }

        articleComments[articleId].push({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: normalizeName(name),
            message: String(message).trim().slice(0, 400),
            createdAt: new Date().toISOString()
        });

        if (articleComments[articleId].length > 60) {
            articleComments[articleId] = articleComments[articleId].slice(-60);
        }

        saveArticleComments();
    }

    function renderArticles() {
        if (!list) {
            return;
        }

        const sorted = [...officialArticles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        list.innerHTML = sorted.map((item) => {
            const id = escapeHtml(item.id);
            const title = escapeHtml(item.title || "");
            const category = escapeHtml(item.category || "");
            const body = escapeHtml(item.body || "");
            const createdAt = escapeHtml(formatDate(item.createdAt));
            const comments = Array.isArray(articleComments[item.id]) ? articleComments[item.id] : [];
            const screenshotsHtml = Array.isArray(item.screenshots) && item.screenshots.length
                ? `<div class="article-gallery" aria-label="${title}のスクリーンショット">${item.screenshots.map((shot) => `
                    <figure class="article-screenshot">
                        <a class="article-screenshot-link" href="${escapeHtml(shot.src)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(shot.title)}の画像を原寸表示（別タブ）">
                            <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" width="1280" height="720" loading="lazy">
                            <span class="article-image-hint" aria-hidden="true">原寸で見る</span>
                        </a>
                        <figcaption><strong>${escapeHtml(shot.title)}</strong><p>${escapeHtml(shot.caption)}</p></figcaption>
                    </figure>
                `).join("")}</div>`
                : "";
            const linksHtml = Array.isArray(item.links) && item.links.length
                ? `<div class="article-actions">${item.links.map((link) => `<a class="btn btn-ghost btn-mini" href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`).join("")}</div>`
                : "";

            const commentsHtml = comments.length
                ? comments.slice().reverse().map((comment) => {
                    const cName = escapeHtml(normalizeName(comment.name));
                    const cText = escapeHtml(comment.message || "");
                    const cDate = escapeHtml(formatDate(comment.createdAt));
                    return `
                        <article class="reaction-item">
                            <div class="reaction-meta">${cName} / ${cDate}</div>
                            <p class="reaction-text">${cText}</p>
                        </article>
                    `;
                }).join("")
                : "<p class=\"comment-empty\">まだコメントはありません。</p>";

            return `
                <article class="article-item" data-id="${id}">
                    <div class="article-item-head">
                        <h5>${title}</h5>
                    </div>
                    <div class="article-meta">
                        <span class="tag">${category}</span>
                        <span>${createdAt}</span>
                    </div>
                    <p class="article-body">${body}</p>
                    ${screenshotsHtml}
                    ${linksHtml}

                    <div class="article-reactions">
                        <h6>この記事へのコメント</h6>
                        <div class="reaction-list">${commentsHtml}</div>
                        <form class="reaction-form" data-article-id="${id}">
                            <input type="text" name="commenter" maxlength="24" placeholder="名前（任意）">
                            <textarea name="comment" rows="3" maxlength="400" required placeholder="記事への感想を入力"></textarea>
                            <button class="btn btn-ghost btn-mini" type="submit">コメント送信</button>
                        </form>
                    </div>
                </article>
            `;
        }).join("");
    }

    function renderGuestbook() {
        if (!guestbookList) {
            return;
        }

        if (!guestbookComments.length) {
            guestbookList.innerHTML = "<p class=\"article-empty\">まだコメントはありません。</p>";
            return;
        }

        const sorted = [...guestbookComments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        guestbookList.innerHTML = sorted.map((item) => {
            const name = escapeHtml(normalizeName(item.name));
            const message = escapeHtml(item.message || "");
            const createdAt = escapeHtml(formatDate(item.createdAt));
            return `
                <article class="guestbook-item">
                    <div class="guestbook-meta">${name} / ${createdAt}</div>
                    <p class="guestbook-text">${message}</p>
                </article>
            `;
        }).join("");
    }

    if (list) {
        list.addEventListener("submit", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLFormElement)) {
                return;
            }

            if (!target.classList.contains("reaction-form")) {
                return;
            }

            event.preventDefault();
            const articleId = target.dataset.articleId;
            if (!articleId) {
                return;
            }

            const formData = new FormData(target);
            const commenter = formData.get("commenter");
            const comment = String(formData.get("comment") || "").trim();

            if (!comment) {
                return;
            }

            addReaction(articleId, commenter, comment);
            renderArticles();
        });
    }

    if (guestbookForm) {
        guestbookForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(guestbookForm);
            const name = normalizeName(formData.get("guestName"));
            const message = String(formData.get("guestMessage") || "").trim();

            if (!message) {
                return;
            }

            guestbookComments.push({
                id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                name,
                message: message.slice(0, 400),
                createdAt: new Date().toISOString()
            });

            if (guestbookComments.length > 120) {
                guestbookComments = guestbookComments.slice(-120);
            }

            saveGuestbook();
            renderGuestbook();
            guestbookForm.reset();
        });
    }

    const TTT_SIZE = 9;
    const TTT_GOAL = 5;
    let tttBoard = Array(TTT_SIZE * TTT_SIZE).fill("");
    let tttTurn = "○";
    let tttFinished = false;
    let tttWinLine = [];
    function findWinLine(board) {
        for (let row = 0; row < TTT_SIZE; row++) {
            for (let col = 0; col < TTT_SIZE; col++) {
                const mark = board[row * TTT_SIZE + col];
                if (!mark) continue;
                for (const [dx, dy] of [[1,0],[0,1],[1,1],[-1,1]]) {
                    const line = [];
                    for (let n = 0; n < TTT_GOAL; n++) {
                        const x = col + dx * n, y = row + dy * n;
                        if (x < 0 || x >= TTT_SIZE || y >= TTT_SIZE || board[y * TTT_SIZE + x] !== mark) break;
                        line.push(y * TTT_SIZE + x);
                    }
                    if (line.length === TTT_GOAL) return line;
                }
            }
        }
        return [];
    }
    function updateTttStatus(text) {
        if (tttStatusEl) {
            tttStatusEl.textContent = text;
        }
    }

    function renderTtt() {
        if (!tttBoardEl) {
            return;
        }

        tttBoardEl.innerHTML = tttBoard.map((value, index) => {
            const mark = escapeHtml(value || "");
            const winClass = tttWinLine.includes(index) ? " is-win" : "";
            return `<button class="ttt-cell${winClass}" type="button" data-ttt-index="${index}" aria-label="${index + 1}マス">${mark}</button>`;
        }).join("");
    }

    function resetTtt() {
        tttBoard = Array(TTT_SIZE * TTT_SIZE).fill("");
        tttTurn = "○";
        tttFinished = false;
        tttWinLine = [];
        updateTttStatus("○ の番です");
        renderTtt();
    }

    if (tttBoardEl) {
        tttBoardEl.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            const button = target.closest("[data-ttt-index]");
            if (!(button instanceof HTMLElement)) {
                return;
            }

            const index = Number(button.dataset.tttIndex);
            if (Number.isNaN(index) || index < 0 || index >= TTT_SIZE * TTT_SIZE) {
                return;
            }

            if (tttFinished || tttBoard[index]) {
                return;
            }

            tttBoard[index] = tttTurn;
            tttWinLine = findWinLine(tttBoard);

            if (tttWinLine.length) {
                tttFinished = true;
                updateTttStatus(`${tttTurn} の勝ちです`);
                renderTtt();
                return;
            }

            if (tttBoard.every(Boolean)) {
                tttFinished = true;
                updateTttStatus("引き分けです");
                renderTtt();
                return;
            }

            tttTurn = tttTurn === "○" ? "×" : "○";
            updateTttStatus(`${tttTurn} の番です`);
            renderTtt();
        });
    }

    if (tttResetButton) {
        tttResetButton.addEventListener("click", resetTtt);
    }

    const MEMORY_CARD_BACK_PATH = "assets/images/card-back.png";
    const MEMORY_INGREDIENTS = [
        { name: "ごはん", imagePath: "assets/images/cards/rice.png" },
        { name: "のり", imagePath: "assets/images/cards/nori.png" },
        { name: "バナナ", imagePath: "assets/images/cards/banana.png" },
        { name: "カレー粉", imagePath: "assets/images/cards/curry.png" },
        { name: "鶏肉", imagePath: "assets/images/cards/chicken.png" },
        { name: "豚肉", imagePath: "assets/images/cards/pork.png" },
        { name: "牛肉", imagePath: "assets/images/cards/beef.png" },
        { name: "魚", imagePath: "assets/images/cards/fish.png" },
        { name: "牛乳", imagePath: "assets/images/cards/milk.png" },
        { name: "卵", imagePath: "assets/images/cards/egg.png" },
        { name: "キャベツ", imagePath: "assets/images/cards/cabbage.png" },
        { name: "にんじん", imagePath: "assets/images/cards/carrot.png" },
        { name: "じゃがいも", imagePath: "assets/images/cards/potato.png" },
        { name: "たまねぎ", imagePath: "assets/images/cards/onion.png" },
        { name: "大根", imagePath: "assets/images/cards/daikon.png" }
    ];
    const MEMORY_TOTAL_PAIRS = MEMORY_INGREDIENTS.length;

    const memoryState = {
        cards: [],
        running: false,
        finished: false,
        playerName: "",
        startAt: 0,
        elapsedMs: 0,
        firstId: null,
        lock: false,
        matchedPairs: 0,
        timerRafId: 0
    };

    function shuffleInPlace(array) {
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function buildMemoryCards() {
        const cards = [];
        MEMORY_INGREDIENTS.forEach((item) => {
            cards.push({
                id: `${item.name}-a`,
                pairKey: item.name,
                name: item.name,
                imagePath: item.imagePath,
                flipped: false,
                matched: false
            });
            cards.push({
                id: `${item.name}-b`,
                pairKey: item.name,
                name: item.name,
                imagePath: item.imagePath,
                flipped: false,
                matched: false
            });
        });
        return shuffleInPlace(cards);
    }

    function renderMemoryRanking() {
        if (!memoryRankingListEl) {
            return;
        }

        if (!memoryRankings.length) {
            memoryRankingListEl.innerHTML = "<li class=\"memory-ranking-empty\">まだスコアがありません。</li>";
            return;
        }

        const top = [...memoryRankings]
            .sort((a, b) => Number(a.timeMs) - Number(b.timeMs))
            .slice(0, 20);

        memoryRankingListEl.innerHTML = top.map((entry, index) => {
            const rank = index + 1;
            const name = escapeHtml(normalizeName(entry.name));
            const timeText = escapeHtml(formatDuration(Number(entry.timeMs)));
            const dateText = escapeHtml(formatDate(entry.finishedAt));
            return `<li>${rank}位 ${name} - ${timeText} <span class="reaction-meta">(${dateText})</span></li>`;
        }).join("");
    }

    function setMemoryStatus(text) {
        if (memoryStatusEl) {
            memoryStatusEl.textContent = text;
        }
    }

    function updateMemoryTimer() {
        if (memoryTimerEl) {
            memoryTimerEl.textContent = formatDuration(memoryState.elapsedMs);
        }
    }

    function stopMemoryTimerLoop() {
        if (memoryState.timerRafId) {
            window.cancelAnimationFrame(memoryState.timerRafId);
            memoryState.timerRafId = 0;
        }
    }

    function memoryTimerTick() {
        if (!memoryState.running) {
            return;
        }

        memoryState.elapsedMs = performance.now() - memoryState.startAt;
        updateMemoryTimer();
        memoryState.timerRafId = window.requestAnimationFrame(memoryTimerTick);
    }

    function renderMemoryBoard() {
        if (!memoryBoardEl) {
            return;
        }

        if (!memoryState.cards.length) {
            memoryBoardEl.innerHTML = "";
            return;
        }

        memoryBoardEl.innerHTML = memoryState.cards.map((card) => {
            const flippedClass = card.flipped ? " is-flipped" : "";
            const matchedClass = card.matched ? " is-matched" : "";
            const disabled = !memoryState.running || card.flipped || card.matched ? "disabled" : "";
            const safeName = escapeHtml(card.name);
            const safePath = escapeHtml(card.imagePath);
            const safeBack = escapeHtml(MEMORY_CARD_BACK_PATH);
            const safeId = escapeHtml(card.id);

            return `
                <button class="memory-card${flippedClass}${matchedClass}" type="button" data-memory-id="${safeId}" ${disabled} aria-label="${safeName}">
                    <span class="memory-card-inner">
                        <span class="memory-face back"><img src="${safeBack}" alt="カード裏面" loading="lazy"></span>
                        <span class="memory-face front"><img src="${safePath}" alt="${safeName}" loading="lazy"><span class="memory-card-name">${safeName}</span></span>
                    </span>
                </button>
            `;
        }).join("");
    }

    function resetMemoryGameToIdle() {
        stopMemoryTimerLoop();
        memoryState.cards = [];
        memoryState.running = false;
        memoryState.finished = false;
        memoryState.playerName = "";
        memoryState.startAt = 0;
        memoryState.elapsedMs = 0;
        memoryState.firstId = null;
        memoryState.lock = false;
        memoryState.matchedPairs = 0;
        updateMemoryTimer();
        renderMemoryBoard();
        setMemoryStatus("スタートを押すと開始します。");
    }

    function startMemoryGame() {
        const rawName = String(memoryNicknameInput?.value || "").trim();
        if (!rawName) {
            window.alert("ニックネームを入力してからスタートしてください。");
            return;
        }

        const nickname = normalizeName(rawName);
        stopMemoryTimerLoop();
        memoryState.cards = buildMemoryCards();
        memoryState.running = true;
        memoryState.finished = false;
        memoryState.playerName = nickname;
        memoryState.startAt = performance.now();
        memoryState.elapsedMs = 0;
        memoryState.firstId = null;
        memoryState.lock = false;
        memoryState.matchedPairs = 0;

        updateMemoryTimer();
        setMemoryStatus(`${nickname} さん、神経衰弱スタート！`);
        renderMemoryBoard();
        memoryState.timerRafId = window.requestAnimationFrame(memoryTimerTick);
    }

    function finishMemoryGame() {
        memoryState.running = false;
        memoryState.finished = true;
        stopMemoryTimerLoop();
        memoryState.elapsedMs = Math.max(0, Math.floor(memoryState.elapsedMs));
        updateMemoryTimer();

        setMemoryStatus(`クリア！ ${memoryState.playerName} さんのスコア: ${formatDuration(memoryState.elapsedMs)}`);

        memoryRankings.push({
            name: memoryState.playerName,
            timeMs: memoryState.elapsedMs,
            finishedAt: new Date().toISOString()
        });
        memoryRankings = memoryRankings
            .sort((a, b) => Number(a.timeMs) - Number(b.timeMs))
            .slice(0, 20);
        saveMemoryRankings();
        renderMemoryRanking();
    }

    function handleMemoryCardClick(cardId) {
        if (!memoryState.running || memoryState.lock) {
            return;
        }

        const card = memoryState.cards.find((item) => item.id === cardId);
        if (!card || card.flipped || card.matched) {
            return;
        }

        card.flipped = true;
        renderMemoryBoard();

        if (!memoryState.firstId) {
            memoryState.firstId = cardId;
            return;
        }

        const firstCard = memoryState.cards.find((item) => item.id === memoryState.firstId);
        const secondCard = card;
        memoryState.firstId = null;

        if (!firstCard || !secondCard) {
            return;
        }

        if (firstCard.pairKey === secondCard.pairKey) {
            firstCard.matched = true;
            secondCard.matched = true;
            memoryState.matchedPairs += 1;
            setMemoryStatus(`ナイス！ ${memoryState.matchedPairs}/${MEMORY_TOTAL_PAIRS} ペア成立`);
            renderMemoryBoard();

            if (memoryState.matchedPairs >= MEMORY_TOTAL_PAIRS) {
                finishMemoryGame();
            }
            return;
        }

        memoryState.lock = true;
        setMemoryStatus("不一致。次のペアを探そう。");
        window.setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            memoryState.lock = false;
            renderMemoryBoard();
        }, 700);
    }

    if (memoryBoardEl) {
        memoryBoardEl.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            const button = target.closest("[data-memory-id]");
            if (!(button instanceof HTMLElement)) {
                return;
            }

            const cardId = button.dataset.memoryId;
            if (!cardId) {
                return;
            }

            handleMemoryCardClick(cardId);
        });
    }

    if (memoryStartButton) {
        memoryStartButton.addEventListener("click", startMemoryGame);
    }

    if (memoryResetButton) {
        memoryResetButton.addEventListener("click", resetMemoryGameToIdle);
    }

    const MOLE_IMAGE_PATHS = ["images/arcade-mole.png", "images/arcade-rabbit.png", "images/arcade-dog.png"];

    const moleState = {
        running: false,
        score: 0,
        remainingMs: 20000,
        activeIndex: -1,
        activeImagePath: MOLE_IMAGE_PATHS[0],
        countdownTimerId: 0,
        spawnTimerId: 0
    };

    function setMoleStatus(text) {
        if (moleStatusEl) {
            moleStatusEl.textContent = text;
        }
    }

    function updateMoleHud() {
        if (moleTimeEl) {
            moleTimeEl.textContent = (Math.max(0, moleState.remainingMs) / 1000).toFixed(1);
        }
        if (moleScoreEl) {
            moleScoreEl.textContent = String(moleState.score);
        }
    }

    function stopMoleTimers() {
        if (moleState.countdownTimerId) {
            window.clearInterval(moleState.countdownTimerId);
            moleState.countdownTimerId = 0;
        }
        if (moleState.spawnTimerId) {
            window.clearInterval(moleState.spawnTimerId);
            moleState.spawnTimerId = 0;
        }
    }

    function renderMoleBoard() {
        if (!moleBoardEl) {
            return;
        }

        const disabled = moleState.running ? "" : "disabled";
        moleBoardEl.innerHTML = Array.from({ length: 9 }, (_, index) => {
            const isActive = moleState.activeIndex === index;
            const activeClass = isActive ? " is-active" : "";
            const imagePath = isActive
                ? moleState.activeImagePath
                : MOLE_IMAGE_PATHS[index % MOLE_IMAGE_PATHS.length];
            const safePath = escapeHtml(imagePath);
            return `
                <button class="mole-hole${activeClass}" type="button" data-mole-index="${index}" ${disabled} aria-label="もぐら穴${index + 1}">
                    <img src="${safePath}" alt="もぐら・うさぎ・犬" loading="eager">
                </button>
            `;
        }).join("");
    }

    function spawnMole() {
        if (!moleState.running) {
            return;
        }
        let next = Math.floor(Math.random() * 9);
        if (next === moleState.activeIndex) {
            next = (next + 1) % 9;
        }
        moleState.activeIndex = next;
        moleState.activeImagePath = MOLE_IMAGE_PATHS[Math.random() < 0.75 ? 0 : (Math.random() < 0.5 ? 1 : 2)];
        renderMoleBoard();
    }

    function finishMoleGame() {
        moleState.running = false;
        moleState.remainingMs = 0;
        moleState.activeIndex = -1;
        stopMoleTimers();
        updateMoleHud();
        renderMoleBoard();
        setMoleStatus(`終了！ スコア ${moleState.score}`);
    }

    let moleLoadVersion = 0;
    async function startMoleGame() {
        const version = ++moleLoadVersion;
        stopMoleTimers();
        moleState.running = false;
        moleStartButton.disabled = true;
        setMoleStatus("動物の画像を準備しています…");
        try {
            await Promise.all(MOLE_IMAGE_PATHS.map(preloadReactionImage));
        } catch (_) {
            if (version === moleLoadVersion) {
                moleStartButton.disabled = false;
                setMoleStatus("画像を読み込めませんでした。もう一度スタートしてください。");
            }
            return;
        }
        if (version !== moleLoadVersion) return;
        moleStartButton.disabled = false;
        moleState.running = true;
        moleState.score = 0;
        moleState.remainingMs = 20000;
        moleState.activeIndex = -1;
        stopMoleTimers();
        updateMoleHud();
        setMoleStatus("20秒スタート！");
        spawnMole();

        moleState.countdownTimerId = window.setInterval(() => {
            moleState.remainingMs -= 100;
            if (moleState.remainingMs <= 0) {
                finishMoleGame();
                return;
            }
            updateMoleHud();
        }, 100);

        moleState.spawnTimerId = window.setInterval(() => {
            spawnMole();
        }, 650);
    }

    function resetMoleGame() {
        moleLoadVersion += 1;
        if (moleStartButton) moleStartButton.disabled = false;
        moleState.running = false;
        moleState.score = 0;
        moleState.remainingMs = 20000;
        moleState.activeIndex = -1;
        stopMoleTimers();
        updateMoleHud();
        renderMoleBoard();
        setMoleStatus("スタートで開始します。");
    }

    if (moleBoardEl) {
        moleBoardEl.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }
            const button = target.closest("[data-mole-index]");
            if (!(button instanceof HTMLElement) || !moleState.running) {
                return;
            }

            const index = Number(button.dataset.moleIndex);
            if (Number.isNaN(index)) {
                return;
            }

            if (index === moleState.activeIndex) {
                const friendly = moleState.activeImagePath !== MOLE_IMAGE_PATHS[0];
                moleState.score += friendly ? -2 : 1;
                updateMoleHud();
                setMoleStatus(friendly ? "うさぎ・犬は叩かないで！ −2点" : "もぐらヒット！ ＋1点");
                spawnMole();
            }
        });
    }

    if (moleStartButton) {
        moleStartButton.addEventListener("click", startMoleGame);
    }

    if (moleResetButton) {
        moleResetButton.addEventListener("click", resetMoleGame);
    }

    const REACTION_WAIT_IMAGES = ["images/arcade-cowboy.png"];
    const REACTION_READY_IMAGES = ["images/arcade-cowboy.png"];

    const reactionState = {
        running: false,
        ready: false,
        readyAt: 0,
        timerId: 0,
        loadVersion: 0,
        waitImage: REACTION_WAIT_IMAGES[0],
        readyImage: REACTION_READY_IMAGES[0]
    };

    const reactionImageCache = new Map();
    function preloadReactionImage(path) {
        if (!reactionImageCache.has(path)) {
            const image = new Image();
            const loaded = new Promise((resolve, reject) => {
                image.onload = async () => {
                    try {
                        if (image.decode) await image.decode();
                        resolve(image);
                    } catch (error) { reject(error); }
                };
                image.onerror = () => reject(new Error(`Image unavailable: ${path}`));
                image.src = path;
            }).catch(error => { reactionImageCache.delete(path); throw error; });
            reactionImageCache.set(path, loaded);
        }
        return reactionImageCache.get(path);
    }

    function setReactionStatus(text) {
        if (reactionStatusEl) {
            reactionStatusEl.textContent = text;
        }
    }

    function renderReactionBest() {
        if (!reactionBestEl) {
            return;
        }
        reactionBestEl.textContent = reactionBestMs > 0 ? `${reactionBestMs} ms` : "-- ms";
    }

    function setReactionVisual(mode) {
        if (!reactionTargetButton || !reactionImageEl || !reactionSignalEl) {
            return;
        }

        reactionTargetButton.classList.remove("is-wait", "is-ready", "is-defeated");
        if (mode === "wait") {
            reactionTargetButton.classList.add("is-wait");
            reactionSignalEl.textContent = "合図を待て…";
            reactionImageEl.src = reactionState.waitImage;
            return;
        }
        if (mode === "ready") {
            reactionTargetButton.classList.add("is-ready");
            reactionSignalEl.textContent = "！";
            reactionImageEl.src = reactionState.readyImage;
            return;
        }

        reactionSignalEl.textContent = "決闘スタート";
        reactionImageEl.src = REACTION_WAIT_IMAGES[0];
    }

    function clearReactionTimer() {
        if (reactionState.timerId) {
            window.clearTimeout(reactionState.timerId);
            reactionState.timerId = 0;
        }
    }

    async function startReactionTest() {
        clearReactionTimer();
        const version = ++reactionState.loadVersion;
        reactionState.running = false;
        reactionState.waitImage = REACTION_WAIT_IMAGES[Math.floor(Math.random() * REACTION_WAIT_IMAGES.length)];
        reactionState.readyImage = REACTION_READY_IMAGES[Math.floor(Math.random() * REACTION_READY_IMAGES.length)];
        reactionStartButton.disabled = true;
        reactionTargetButton.disabled = true;
        setReactionStatus("画像を読み込み中です…");
        try {
            await Promise.all([
                preloadReactionImage(reactionState.waitImage),
                preloadReactionImage(reactionState.readyImage)
            ]);
        } catch {
            if (version !== reactionState.loadVersion) return;
            reactionStartButton.disabled = false;
            reactionTargetButton.disabled = false;
            setReactionStatus("画像を読み込めませんでした。通信状態を確認してスタートで再試行してください。");
            return;
        }
        if (version !== reactionState.loadVersion) return;
        reactionStartButton.disabled = false;
        reactionTargetButton.disabled = false;
        reactionState.running = true;
        reactionState.ready = false;
        reactionState.readyAt = 0;
        setReactionVisual("wait");
        setReactionStatus("合図が出るまで待ってください。");

        const delay = 1400 + Math.floor(Math.random() * 2600);
        reactionState.timerId = window.setTimeout(() => {
            reactionState.ready = true;
            reactionState.readyAt = performance.now();
            setReactionVisual("ready");
            setReactionStatus("撃て！ タップ / クリック！");
            reactionState.timerId = 0;
        }, delay);
    }

    function resetReactionTest() {
        clearReactionTimer();
        reactionState.loadVersion += 1;
        if (reactionStartButton) reactionStartButton.disabled = false;
        if (reactionTargetButton) reactionTargetButton.disabled = false;
        reactionState.running = false;
        reactionState.ready = false;
        reactionState.readyAt = 0;
        setReactionVisual("idle");
        setReactionStatus("スタートで準備開始。");
        renderReactionBest();
    }

    function handleReactionTap() {
        if (!reactionState.running) {
            setReactionStatus("スタートを押してから挑戦してください。");
            return;
        }

        if (!reactionState.ready) {
            clearReactionTimer();
            reactionState.running = false;
            setReactionVisual("idle");
            setReactionStatus("フライング！ もう一度スタート。");
            return;
        }

        const elapsed = Math.max(0, Math.floor(performance.now() - reactionState.readyAt));
        reactionState.running = false;
        reactionState.ready = false;
        setReactionVisual("idle");
        reactionTargetButton.classList.add("is-defeated");
        reactionSignalEl.textContent = "WIN!";
        setReactionStatus(`相手を倒した！ 反応速度: ${elapsed} ms`);

        if (!reactionBestMs || elapsed < reactionBestMs) {
            reactionBestMs = elapsed;
            localStorage.setItem(STORAGE.reactionBest, String(reactionBestMs));
            setReactionStatus(`新記録！ 反応速度: ${elapsed} ms`);
        }
        renderReactionBest();
    }

    if (reactionStartButton) {
        reactionStartButton.addEventListener("click", startReactionTest);
    }

    if (reactionResetButton) {
        reactionResetButton.addEventListener("click", resetReactionTest);
    }

    if (reactionTargetButton) {
        reactionTargetButton.addEventListener("click", handleReactionTap);
    }

    const breakoutCtx = breakoutCanvasEl ? breakoutCanvasEl.getContext("2d") : null;
    const BREAKOUT_COLS = 7;
    const BREAKOUT_ROWS = 4;
    const BREAKOUT_PADDLE_WIDTH = 86;
    const BREAKOUT_PADDLE_HEIGHT = 12;
    const BREAKOUT_BALL_RADIUS = 7;
    const BREAKOUT_BRICK_IMAGES = [
        "assets/images/recipes/chahan.png",
        "assets/images/recipes/curry-rice.png",
        "assets/images/recipes/omurice.png",
        "assets/images/recipes/nikujaga.png",
        "assets/images/recipes/yasai-itame.png",
        "assets/images/recipes/hamburg-steak.png",
        "assets/images/recipes/cream-stew.png",
        "assets/images/recipes/onigiri.png"
    ].map((path) => {
        const image = new Image();
        image.addEventListener("load", () => drawBreakout());
        image.addEventListener("error", () => {
            setBreakoutStatus("一部の料理画像を読み込めません。色付きブロックでプレイできます。");
            drawBreakout();
        });
        image.src = path;
        return image;
    });

    const breakoutState = {
        running: false,
        rafId: 0,
        score: 0,
        lives: 3,
        paddleX: 0,
        ballX: 0,
        ballY: 0,
        ballVx: 2.8,
        ballVy: -2.8,
        bricks: []
    };

    function setBreakoutStatus(text) {
        if (breakoutStatusEl) {
            breakoutStatusEl.textContent = text;
        }
    }

    function updateBreakoutHud() {
        if (breakoutScoreEl) {
            breakoutScoreEl.textContent = String(breakoutState.score);
        }
        if (breakoutLivesEl) {
            breakoutLivesEl.textContent = String(breakoutState.lives);
        }
    }

    function stopBreakoutLoop() {
        if (breakoutState.rafId) {
            window.cancelAnimationFrame(breakoutState.rafId);
            breakoutState.rafId = 0;
        }
    }

    function createBreakoutBricks() {
        if (!breakoutCanvasEl) {
            return [];
        }
        const gap = 6;
        const top = 28;
        const left = 18;
        const width = (breakoutCanvasEl.width - left * 2 - gap * (BREAKOUT_COLS - 1)) / BREAKOUT_COLS;
        const height = 24;
        const bricks = [];
        let imageIndex = 0;

        for (let row = 0; row < BREAKOUT_ROWS; row += 1) {
            for (let col = 0; col < BREAKOUT_COLS; col += 1) {
                bricks.push({
                    x: left + col * (width + gap),
                    y: top + row * (height + gap),
                    width,
                    height,
                    alive: true,
                    image: BREAKOUT_BRICK_IMAGES[imageIndex % BREAKOUT_BRICK_IMAGES.length]
                });
                imageIndex += 1;
            }
        }

        return bricks;
    }

    function resetBreakoutBall() {
        if (!breakoutCanvasEl) {
            return;
        }
        breakoutState.ballX = breakoutCanvasEl.width / 2;
        breakoutState.ballY = breakoutCanvasEl.height - 42;
        breakoutState.ballVx = (Math.random() > 0.5 ? 1 : -1) * (2.1 + Math.random() * 1.2);
        breakoutState.ballVy = -2.8;
    }

    function drawBreakout() {
        if (!breakoutCtx || !breakoutCanvasEl) {
            return;
        }

        breakoutCtx.clearRect(0, 0, breakoutCanvasEl.width, breakoutCanvasEl.height);

        breakoutState.bricks.forEach((brick) => {
            if (!brick.alive) {
                return;
            }

            breakoutCtx.save();
            breakoutCtx.beginPath();
            breakoutCtx.rect(brick.x, brick.y, brick.width, brick.height);
            breakoutCtx.clip();
            if (brick.image && brick.image.complete && brick.image.naturalWidth > 0) {
                breakoutCtx.drawImage(brick.image, brick.x, brick.y, brick.width, brick.height);
            } else {
                breakoutCtx.fillStyle = "rgba(255, 194, 74, 0.45)";
                breakoutCtx.fillRect(brick.x, brick.y, brick.width, brick.height);
            }
            breakoutCtx.restore();
            breakoutCtx.strokeStyle = "rgba(168, 210, 255, 0.45)";
            breakoutCtx.lineWidth = 1;
            breakoutCtx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        });

        const paddleY = breakoutCanvasEl.height - 20;
        breakoutCtx.fillStyle = "#f4c36f";
        breakoutCtx.fillRect(
            breakoutState.paddleX,
            paddleY,
            BREAKOUT_PADDLE_WIDTH,
            BREAKOUT_PADDLE_HEIGHT
        );

        breakoutCtx.beginPath();
        breakoutCtx.arc(
            breakoutState.ballX,
            breakoutState.ballY,
            BREAKOUT_BALL_RADIUS,
            0,
            Math.PI * 2
        );
        breakoutCtx.fillStyle = "#f3f9ff";
        breakoutCtx.fill();
        breakoutCtx.closePath();
    }

    function resetBreakoutGame() {
        stopBreakoutLoop();
        breakoutState.running = false;
        breakoutState.score = 0;
        breakoutState.lives = 3;
        breakoutState.bricks = createBreakoutBricks();
        if (breakoutCanvasEl) {
            breakoutState.paddleX = (breakoutCanvasEl.width - BREAKOUT_PADDLE_WIDTH) / 2;
        }
        resetBreakoutBall();
        updateBreakoutHud();
        setBreakoutStatus("スタートで開始。");
        drawBreakout();
    }

    function finishBreakout(resultText) {
        breakoutState.running = false;
        stopBreakoutLoop();
        setBreakoutStatus(resultText);
        drawBreakout();
    }

    function breakoutFrame() {
        if (!breakoutState.running || !breakoutCanvasEl) {
            return;
        }

        const width = breakoutCanvasEl.width;
        const height = breakoutCanvasEl.height;
        const paddleY = height - 20;

        breakoutState.ballX += breakoutState.ballVx;
        breakoutState.ballY += breakoutState.ballVy;

        if (breakoutState.ballX - BREAKOUT_BALL_RADIUS <= 0 || breakoutState.ballX + BREAKOUT_BALL_RADIUS >= width) {
            breakoutState.ballVx *= -1;
            breakoutState.ballX = Math.min(
                width - BREAKOUT_BALL_RADIUS,
                Math.max(BREAKOUT_BALL_RADIUS, breakoutState.ballX)
            );
        }

        if (breakoutState.ballY - BREAKOUT_BALL_RADIUS <= 0) {
            breakoutState.ballVy = Math.abs(breakoutState.ballVy);
            breakoutState.ballY = BREAKOUT_BALL_RADIUS;
        }

        if (
            breakoutState.ballVy > 0 &&
            breakoutState.ballY + BREAKOUT_BALL_RADIUS >= paddleY &&
            breakoutState.ballY - BREAKOUT_BALL_RADIUS <= paddleY + BREAKOUT_PADDLE_HEIGHT &&
            breakoutState.ballX >= breakoutState.paddleX &&
            breakoutState.ballX <= breakoutState.paddleX + BREAKOUT_PADDLE_WIDTH
        ) {
            breakoutState.ballY = paddleY - BREAKOUT_BALL_RADIUS;
            breakoutState.ballVy = -Math.abs(breakoutState.ballVy);
            const offset = (breakoutState.ballX - (breakoutState.paddleX + BREAKOUT_PADDLE_WIDTH / 2)) / (BREAKOUT_PADDLE_WIDTH / 2);
            breakoutState.ballVx = offset * 4.4;
        }

        for (const brick of breakoutState.bricks) {
            if (!brick.alive) {
                continue;
            }

            const hitX = breakoutState.ballX + BREAKOUT_BALL_RADIUS >= brick.x &&
                breakoutState.ballX - BREAKOUT_BALL_RADIUS <= brick.x + brick.width;
            const hitY = breakoutState.ballY + BREAKOUT_BALL_RADIUS >= brick.y &&
                breakoutState.ballY - BREAKOUT_BALL_RADIUS <= brick.y + brick.height;

            if (hitX && hitY) {
                brick.alive = false;
                breakoutState.ballVy *= -1;
                breakoutState.score += 10;
                updateBreakoutHud();
                break;
            }
        }

        if (!breakoutState.bricks.some((brick) => brick.alive)) {
            finishBreakout("クリア！ 全ブロック破壊！");
            return;
        }

        if (breakoutState.ballY - BREAKOUT_BALL_RADIUS > height) {
            breakoutState.lives -= 1;
            updateBreakoutHud();
            if (breakoutState.lives <= 0) {
                finishBreakout("ゲームオーバー。リセットで再挑戦。");
                return;
            }
            resetBreakoutBall();
            setBreakoutStatus("ミス！ 続行します。");
        }

        drawBreakout();
        breakoutState.rafId = window.requestAnimationFrame(breakoutFrame);
    }

    function startBreakoutGame() {
        if (breakoutState.running) {
            return;
        }
        if (!breakoutState.bricks.length || !breakoutState.bricks.some((brick) => brick.alive)) {
            breakoutState.bricks = createBreakoutBricks();
            breakoutState.score = 0;
            breakoutState.lives = 3;
            updateBreakoutHud();
            resetBreakoutBall();
        }
        breakoutState.running = true;
        setBreakoutStatus("プレイ中");
        breakoutState.rafId = window.requestAnimationFrame(breakoutFrame);
    }

    function setBreakoutPaddleByClientX(clientX) {
        if (!breakoutCanvasEl) {
            return;
        }
        const rect = breakoutCanvasEl.getBoundingClientRect();
        if (!rect.width) {
            return;
        }
        const localX = (clientX - rect.left) * (breakoutCanvasEl.width / rect.width);
        const next = localX - BREAKOUT_PADDLE_WIDTH / 2;
        breakoutState.paddleX = Math.max(
            0,
            Math.min(breakoutCanvasEl.width - BREAKOUT_PADDLE_WIDTH, next)
        );
        if (!breakoutState.running) {
            drawBreakout();
        }
    }

    if (breakoutStartButton) {
        breakoutStartButton.addEventListener("click", startBreakoutGame);
    }

    if (breakoutResetButton) {
        breakoutResetButton.addEventListener("click", resetBreakoutGame);
    }

    if (breakoutCanvasEl) {
        breakoutCanvasEl.addEventListener("mousemove", (event) => {
            setBreakoutPaddleByClientX(event.clientX);
        });

        breakoutCanvasEl.addEventListener("touchmove", (event) => {
            if (!event.touches[0]) {
                return;
            }
            setBreakoutPaddleByClientX(event.touches[0].clientX);
            event.preventDefault();
        }, { passive: false });
    }

    const snakeCtx = snakeCanvasEl ? snakeCanvasEl.getContext("2d") : null;
    const SNAKE_COLS = 15;
    const SNAKE_ROWS = 15;
    const snakeState = {
        running: false,
        timerId: 0,
        snake: [],
        dir: { x: 1, y: 0 },
        nextDir: { x: 1, y: 0 },
        food: { x: 10, y: 7 },
        score: 0
    };

    function setSnakeStatus(text) {
        if (snakeStatusEl) {
            snakeStatusEl.textContent = text;
        }
    }

    function updateSnakeHud() {
        if (snakeScoreEl) {
            snakeScoreEl.textContent = String(snakeState.score);
        }
    }

    function stopSnakeLoop() {
        if (snakeState.timerId) {
            window.clearInterval(snakeState.timerId);
            snakeState.timerId = 0;
        }
    }

    function spawnSnakeFood() {
        if (!snakeState.snake.length) {
            snakeState.food = { x: 7, y: 7 };
            return;
        }

        let next = { x: 0, y: 0 };
        let guard = 0;
        do {
            next = {
                x: Math.floor(Math.random() * SNAKE_COLS),
                y: Math.floor(Math.random() * SNAKE_ROWS)
            };
            guard += 1;
            if (guard > 300) {
                break;
            }
        } while (snakeState.snake.some((part) => part.x === next.x && part.y === next.y));

        snakeState.food = next;
    }

    function drawSnake() {
        if (!snakeCtx || !snakeCanvasEl) {
            return;
        }

        const cellW = snakeCanvasEl.width / SNAKE_COLS;
        const cellH = snakeCanvasEl.height / SNAKE_ROWS;
        snakeCtx.clearRect(0, 0, snakeCanvasEl.width, snakeCanvasEl.height);

        snakeCtx.fillStyle = "rgba(6, 18, 38, 0.95)";
        snakeCtx.fillRect(0, 0, snakeCanvasEl.width, snakeCanvasEl.height);

        snakeCtx.strokeStyle = "rgba(136, 178, 242, 0.16)";
        snakeCtx.lineWidth = 1;
        for (let x = 1; x < SNAKE_COLS; x += 1) {
            snakeCtx.beginPath();
            snakeCtx.moveTo(x * cellW, 0);
            snakeCtx.lineTo(x * cellW, snakeCanvasEl.height);
            snakeCtx.stroke();
        }
        for (let y = 1; y < SNAKE_ROWS; y += 1) {
            snakeCtx.beginPath();
            snakeCtx.moveTo(0, y * cellH);
            snakeCtx.lineTo(snakeCanvasEl.width, y * cellH);
            snakeCtx.stroke();
        }

        snakeCtx.fillStyle = "#ffd975";
        snakeCtx.fillRect(
            snakeState.food.x * cellW + 2,
            snakeState.food.y * cellH + 2,
            cellW - 4,
            cellH - 4
        );

        snakeState.snake.forEach((part, index) => {
            snakeCtx.fillStyle = index === 0 ? "#9de6ff" : "#57b6ff";
            snakeCtx.fillRect(part.x * cellW + 2, part.y * cellH + 2, cellW - 4, cellH - 4);
        });
    }

    function resetSnakeGame() {
        stopSnakeLoop();
        snakeState.running = false;
        snakeState.snake = [
            { x: 7, y: 7 },
            { x: 6, y: 7 },
            { x: 5, y: 7 }
        ];
        snakeState.dir = { x: 1, y: 0 };
        snakeState.nextDir = { x: 1, y: 0 };
        snakeState.score = 0;
        spawnSnakeFood();
        updateSnakeHud();
        setSnakeStatus("スタートで開始。");
        drawSnake();
    }

    function setSnakeDirection(dx, dy) {
        if (!snakeState.running) {
            return;
        }
        const oppositeX = snakeState.dir.x * -1;
        const oppositeY = snakeState.dir.y * -1;
        if (dx === oppositeX && dy === oppositeY) {
            return;
        }
        snakeState.nextDir = { x: dx, y: dy };
    }

    function endSnakeGame() {
        snakeState.running = false;
        stopSnakeLoop();
        setSnakeStatus(`ゲームオーバー。スコア ${snakeState.score}`);
        drawSnake();
    }

    function snakeTick() {
        if (!snakeState.running || !snakeState.snake.length) {
            return;
        }

        snakeState.dir = { ...snakeState.nextDir };
        const head = snakeState.snake[0];
        const nextHead = {
            x: head.x + snakeState.dir.x,
            y: head.y + snakeState.dir.y
        };

        if (nextHead.x < 0 || nextHead.x >= SNAKE_COLS || nextHead.y < 0 || nextHead.y >= SNAKE_ROWS) {
            endSnakeGame();
            return;
        }

        const hitSelf = snakeState.snake.some((part) => part.x === nextHead.x && part.y === nextHead.y);
        if (hitSelf) {
            endSnakeGame();
            return;
        }

        snakeState.snake.unshift(nextHead);

        if (nextHead.x === snakeState.food.x && nextHead.y === snakeState.food.y) {
            snakeState.score += 10;
            spawnSnakeFood();
            setSnakeStatus("ナイス！ 食べた！");
        } else {
            snakeState.snake.pop();
            setSnakeStatus("プレイ中");
        }

        updateSnakeHud();
        drawSnake();
    }

    function startSnakeGame() {
        resetSnakeGame();
        snakeState.running = true;
        setSnakeStatus("プレイ中");
        snakeState.timerId = window.setInterval(snakeTick, 125);
    }

    if (snakeStartButton) {
        snakeStartButton.addEventListener("click", startSnakeGame);
    }

    if (snakeResetButton) {
        snakeResetButton.addEventListener("click", resetSnakeGame);
    }

    if (snakeUpButton) {
        snakeUpButton.addEventListener("click", () => setSnakeDirection(0, -1));
    }
    if (snakeLeftButton) {
        snakeLeftButton.addEventListener("click", () => setSnakeDirection(-1, 0));
    }
    if (snakeDownButton) {
        snakeDownButton.addEventListener("click", () => setSnakeDirection(0, 1));
    }
    if (snakeRightButton) {
        snakeRightButton.addEventListener("click", () => setSnakeDirection(1, 0));
    }

    const tetrisCtx = tetrisCanvasEl ? tetrisCanvasEl.getContext("2d") : null;
    const TETRIS_COLS = 10;
    const TETRIS_ROWS = 18;
    const TETRIS_COLORS = [
        "",
        "#6bd4ff",
        "#ffd26f",
        "#c18aff",
        "#ff8a8a",
        "#79f0b6",
        "#8fb2ff",
        "#ffb47f"
    ];
    const TETRIS_SHAPES = [
        [[1, 1, 1, 1]],
        [[1, 1], [1, 1]],
        [[0, 1, 0], [1, 1, 1]],
        [[1, 0, 0], [1, 1, 1]],
        [[0, 0, 1], [1, 1, 1]],
        [[0, 1, 1], [1, 1, 0]],
        [[1, 1, 0], [0, 1, 1]]
    ];

    const tetrisState = {
        running: false,
        timerId: 0,
        board: [],
        piece: null,
        score: 0,
        lines: 0
    };

    function setTetrisStatus(text) {
        if (tetrisStatusEl) {
            tetrisStatusEl.textContent = text;
        }
    }

    function updateTetrisHud() {
        if (tetrisScoreEl) {
            tetrisScoreEl.textContent = String(tetrisState.score);
        }
        if (tetrisLinesEl) {
            tetrisLinesEl.textContent = String(tetrisState.lines);
        }
    }

    function stopTetrisLoop() {
        if (tetrisState.timerId) {
            window.clearInterval(tetrisState.timerId);
            tetrisState.timerId = 0;
        }
    }

    function createTetrisBoard() {
        return Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLS).fill(0));
    }

    function cloneMatrix(matrix) {
        return matrix.map((row) => [...row]);
    }

    function rotateMatrixCW(matrix) {
        const h = matrix.length;
        const w = matrix[0].length;
        const rotated = Array.from({ length: w }, () => Array(h).fill(0));
        for (let y = 0; y < h; y += 1) {
            for (let x = 0; x < w; x += 1) {
                rotated[x][h - 1 - y] = matrix[y][x];
            }
        }
        return rotated;
    }

    function randomTetrisPiece() {
        const index = Math.floor(Math.random() * TETRIS_SHAPES.length);
        const shape = cloneMatrix(TETRIS_SHAPES[index]);
        return {
            shape,
            x: Math.floor((TETRIS_COLS - shape[0].length) / 2),
            y: 0,
            color: index + 1
        };
    }

    function canPlaceTetris(shape, x, y) {
        for (let row = 0; row < shape.length; row += 1) {
            for (let col = 0; col < shape[row].length; col += 1) {
                if (!shape[row][col]) {
                    continue;
                }
                const nx = x + col;
                const ny = y + row;
                if (nx < 0 || nx >= TETRIS_COLS || ny < 0 || ny >= TETRIS_ROWS) {
                    return false;
                }
                if (tetrisState.board[ny][nx]) {
                    return false;
                }
            }
        }
        return true;
    }

    function drawTetrisCell(x, y, colorIndex) {
        if (!tetrisCtx || !tetrisCanvasEl) {
            return;
        }
        const cellW = tetrisCanvasEl.width / TETRIS_COLS;
        const cellH = tetrisCanvasEl.height / TETRIS_ROWS;
        const color = TETRIS_COLORS[colorIndex] || "#6bd4ff";
        tetrisCtx.fillStyle = color;
        tetrisCtx.fillRect(x * cellW + 1, y * cellH + 1, cellW - 2, cellH - 2);
        tetrisCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        tetrisCtx.lineWidth = 1;
        tetrisCtx.strokeRect(x * cellW + 1, y * cellH + 1, cellW - 2, cellH - 2);
    }

    function drawTetris() {
        if (!tetrisCtx || !tetrisCanvasEl) {
            return;
        }
        tetrisCtx.clearRect(0, 0, tetrisCanvasEl.width, tetrisCanvasEl.height);
        tetrisCtx.fillStyle = "rgba(3, 9, 24, 0.35)";
        tetrisCtx.fillRect(0, 0, tetrisCanvasEl.width, tetrisCanvasEl.height);

        for (let y = 0; y < TETRIS_ROWS; y += 1) {
            for (let x = 0; x < TETRIS_COLS; x += 1) {
                const color = tetrisState.board[y][x];
                if (color) {
                    drawTetrisCell(x, y, color);
                }
            }
        }

        if (tetrisState.piece) {
            const { shape, x, y, color } = tetrisState.piece;
            for (let row = 0; row < shape.length; row += 1) {
                for (let col = 0; col < shape[row].length; col += 1) {
                    if (!shape[row][col]) {
                        continue;
                    }
                    drawTetrisCell(x + col, y + row, color);
                }
            }
        }
    }

    function mergeTetrisPiece() {
        if (!tetrisState.piece) {
            return;
        }
        const { shape, x, y, color } = tetrisState.piece;
        for (let row = 0; row < shape.length; row += 1) {
            for (let col = 0; col < shape[row].length; col += 1) {
                if (!shape[row][col]) {
                    continue;
                }
                const ny = y + row;
                const nx = x + col;
                if (ny >= 0 && ny < TETRIS_ROWS && nx >= 0 && nx < TETRIS_COLS) {
                    tetrisState.board[ny][nx] = color;
                }
            }
        }
    }

    function clearTetrisLines() {
        let cleared = 0;
        for (let y = TETRIS_ROWS - 1; y >= 0; y -= 1) {
            if (tetrisState.board[y].every(Boolean)) {
                tetrisState.board.splice(y, 1);
                tetrisState.board.unshift(Array(TETRIS_COLS).fill(0));
                cleared += 1;
                y += 1;
            }
        }
        if (cleared > 0) {
            tetrisState.lines += cleared;
            tetrisState.score += cleared * cleared * 100;
            updateTetrisHud();
            setTetrisStatus(`${cleared} ライン消去！`);
        }
    }

    function renderTetrisQueue() {
        const root = document.getElementById("tetris-next");
        if (!root) return;
        root.innerHTML = tetrisState.queue.map((piece, index) => {
            let cells = "";
            for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) {
                cells += '<i style="background:' + (piece.shape[y]?.[x] ? TETRIS_COLORS[piece.color] : "transparent") + '"></i>';
            }
            return '<div><small>' + (index ? "2番目 / NEXT 2" : "次 / NEXT 1") + '</small><div class="next-shape">' + cells + '</div></div>';
        }).join("");
    }
    function spawnTetrisPiece() { tetrisState.piece = tetrisState.queue.shift(); tetrisState.queue.push(randomTetrisPiece()); renderTetrisQueue();
        if (!canPlaceTetris(tetrisState.piece.shape, tetrisState.piece.x, tetrisState.piece.y)) {
            tetrisState.running = false;
            stopTetrisLoop();
            setTetrisStatus(`ゲームオーバー。スコア ${tetrisState.score}`);
            drawTetris();
            return false;
        }
        return true;
    }

    function moveTetris(dx, dy) {
        if (!tetrisState.piece) {
            return false;
        }
        const nextX = tetrisState.piece.x + dx;
        const nextY = tetrisState.piece.y + dy;
        if (!canPlaceTetris(tetrisState.piece.shape, nextX, nextY)) {
            return false;
        }
        tetrisState.piece.x = nextX;
        tetrisState.piece.y = nextY;
        return true;
    }

    function rotateTetris() {
        if (!tetrisState.piece) {
            return;
        }
        const rotated = rotateMatrixCW(tetrisState.piece.shape);
        const tryOffsets = [0, -1, 1, -2, 2];
        for (const offset of tryOffsets) {
            const nx = tetrisState.piece.x + offset;
            if (canPlaceTetris(rotated, nx, tetrisState.piece.y)) {
                tetrisState.piece.shape = rotated;
                tetrisState.piece.x = nx;
                break;
            }
        }
        drawTetris();
    }

    function tetrisTick() {
        if (!tetrisState.running) {
            return;
        }
        if (moveTetris(0, 1)) {
            drawTetris();
            return;
        }
        mergeTetrisPiece();
        clearTetrisLines();
        if (!spawnTetrisPiece()) {
            return;
        }
        setTetrisStatus("プレイ中");
        drawTetris();
    }

    function resetTetrisGame() {
        stopTetrisLoop();
        tetrisState.running = false;
        tetrisState.board = createTetrisBoard();
        tetrisState.queue = [randomTetrisPiece(), randomTetrisPiece()];
        renderTetrisQueue();
        tetrisState.piece = randomTetrisPiece();
        tetrisState.score = 0;
        tetrisState.lines = 0;
        updateTetrisHud();
        setTetrisStatus("スタートで開始。");
        drawTetris();
    }

    function startTetrisGame() {
        resetTetrisGame();
        tetrisState.running = true;
        setTetrisStatus("プレイ中");
        tetrisState.timerId = window.setInterval(tetrisTick, 450);
    }

    if (tetrisStartButton) {
        tetrisStartButton.addEventListener("click", startTetrisGame);
    }
    if (tetrisResetButton) {
        tetrisResetButton.addEventListener("click", resetTetrisGame);
    }
    if (tetrisLeftButton) {
        tetrisLeftButton.addEventListener("click", () => {
            if (!tetrisState.running) {
                return;
            }
            moveTetris(-1, 0);
            drawTetris();
        });
    }
    if (tetrisRightButton) {
        tetrisRightButton.addEventListener("click", () => {
            if (!tetrisState.running) {
                return;
            }
            moveTetris(1, 0);
            drawTetris();
        });
    }
    if (tetrisRotateButton) {
        tetrisRotateButton.addEventListener("click", () => {
            if (!tetrisState.running) {
                return;
            }
            rotateTetris();
        });
    }
    if (tetrisDownButton) {
        tetrisDownButton.addEventListener("click", () => {
            if (!tetrisState.running) {
                return;
            }
            tetrisTick();
        });
    }

    // Keep the existing tab ID so saved links and modal navigation remain valid.
    const slideState = { board: [1,2,3,4,5,6,7,8,0], initial: null, moves: 0, running: false };
    function slideNeighbors(empty) {
        return [empty - 3, empty + 3, empty - 1, empty + 1].filter(index =>
            index >= 0 && index < 9 && Math.abs(Math.floor(index / 3) - Math.floor(empty / 3)) + Math.abs(index % 3 - empty % 3) === 1);
    }
    function slideSolved(board) {
        return board.every((value, index) => value === (index + 1) % 9);
    }
    function shuffledSlideBoard() {
        const board = [1,2,3,4,5,6,7,8,0];
        let empty = 8, previous = -1;
        // Legal moves from the goal guarantee a solvable puzzle.
        for (let i = 0; i < 24; i++) {
            const options = slideNeighbors(empty).filter(index => index !== previous);
            const next = options[Math.floor(Math.random() * options.length)];
            [board[empty], board[next]] = [board[next], board[empty]];
            previous = empty;
            empty = next;
        }
        if (slideSolved(board)) [board[7], board[8]] = [board[8], board[7]];
        return board;
    }
    function renderSlideBoard() {
        if (!dropBoardEl) return;
        const movable = slideNeighbors(slideState.board.indexOf(0));
        dropBoardEl.innerHTML = slideState.board.map((value, index) => value
            ? `<button class="slide-tile" type="button" data-slide-index="${index}" ${!slideState.running || !movable.includes(index) ? 'disabled' : ''} aria-label="${value}を空きマスへ移動">${value}</button>`
            : '<div class="slide-empty" aria-label="空きマス"></div>').join('');
        if (dropScoreEl) dropScoreEl.textContent = String(slideState.moves);
    }
    function moveSlideTile(index) {
        const empty = slideState.board.indexOf(0);
        if (!slideState.running || !slideNeighbors(empty).includes(index)) return false;
        [slideState.board[empty], slideState.board[index]] = [slideState.board[index], slideState.board[empty]];
        slideState.moves++;
        if (slideSolved(slideState.board)) {
            slideState.running = false;
            dropStatusEl.textContent = `クリア！ ${slideState.moves}手で完成しました。`;
        }
        renderSlideBoard();
        return true;
    }
    function resetDropGame() {
        slideState.board = [1,2,3,4,5,6,7,8,0];
        slideState.initial = null;
        slideState.moves = 0;
        slideState.running = false;
        if (dropStatusEl) dropStatusEl.textContent = 'シャッフルを押して開始。目標は1〜8を順番に並べること！';
        renderSlideBoard();
    }
    if (dropStartButton) dropStartButton.addEventListener('click', () => {
        slideState.initial = shuffledSlideBoard();
        slideState.board = [...slideState.initial];
        slideState.moves = 0;
        slideState.running = true;
        dropStatusEl.textContent = '空きマスの隣をタップ。矢印キー・WASDでも空きマスを動かせます。';
        renderSlideBoard();
    });
    if (dropResetButton) dropResetButton.addEventListener('click', () => {
        if (!slideState.initial) return;
        slideState.board = [...slideState.initial];
        slideState.moves = 0;
        slideState.running = true;
        dropStatusEl.textContent = '同じ配置でもう一度！';
        renderSlideBoard();
    });
    if (dropBoardEl) dropBoardEl.addEventListener('click', event => {
        const tile = event.target.closest('[data-slide-index]');
        if (tile) moveSlideTile(Number(tile.dataset.slideIndex));
    });

    function getDirectionFromKey(eventKey) {
        if (eventKey === "ArrowUp") {
            return "up";
        }
        if (eventKey === "ArrowRight") {
            return "right";
        }
        if (eventKey === "ArrowLeft") {
            return "left";
        }
        if (eventKey === "ArrowDown") {
            return "down";
        }

        const normalized = eventKey.toLowerCase();
        if (normalized === "w") {
            return "up";
        }
        if (normalized === "d") {
            return "right";
        }
        if (normalized === "s") {
            return "down";
        }
        if (normalized === "a") {
            return "left";
        }

        return "";
    }

    function moveBreakoutByDirection(direction) {
        if (!breakoutCanvasEl || (direction !== "left" && direction !== "right")) {
            return false;
        }

        const step = 30;
        const next = breakoutState.paddleX + (direction === "left" ? -step : step);
        breakoutState.paddleX = Math.max(
            0,
            Math.min(breakoutCanvasEl.width - BREAKOUT_PADDLE_WIDTH, next)
        );
        drawBreakout();
        return true;
    }

    function handleDirectionalInput(direction) {
        const activeKey = getActiveMiniGameKey();

        if (activeKey === "snake" && snakeState.running) {
            if (direction === "up") {
                setSnakeDirection(0, -1);
                return true;
            }
            if (direction === "left") {
                setSnakeDirection(-1, 0);
                return true;
            }
            if (direction === "down") {
                setSnakeDirection(0, 1);
                return true;
            }
            if (direction === "right") {
                setSnakeDirection(1, 0);
                return true;
            }
        }

        if (activeKey === "breakout") {
            return moveBreakoutByDirection(direction);
        }

        if (activeKey === "tetris" && tetrisState.running) {
            if (direction === "left") {
                moveTetris(-1, 0);
                drawTetris();
                return true;
            }
            if (direction === "right") {
                moveTetris(1, 0);
                drawTetris();
                return true;
            }
            if (direction === "up") {
                rotateTetris();
                return true;
            }
            if (direction === "down") {
                tetrisTick();
                return true;
            }
        }

        if (activeKey === "drop" && slideState.running) {
            const empty = slideState.board.indexOf(0);
            const offsets = { up: -3, down: 3, left: -1, right: 1 };
            if (Object.hasOwn(offsets, direction)) {
                moveSlideTile(empty + offsets[direction]);
                return true;
            }
        }
        return false;
    }
    virtualPadButtons.forEach((button) => {
        button.addEventListener("click", () => {
            handleDirectionalInput(button.dataset.padDir || "");
        });
    });

    window.addEventListener("keydown", (event) => {
        const target = event.target;
        const isEditingText = target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement;
        if (isEditingText || !miniGameSection?.classList.contains("is-open")) {
            return;
        }

        const direction = getDirectionFromKey(event.key);
        if (direction && handleDirectionalInput(direction)) {
            event.preventDefault();
        }
    });

    if (miniTabsRoot) {
        miniTabsRoot.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }

            const tab = target.closest("[data-mini-tab]");
            if (!(tab instanceof HTMLButtonElement)) {
                return;
            }

            const key = tab.dataset.miniTab;
            if (!key) {
                return;
            }

            setActiveMiniGame(key);
        });
    }

    modalTriggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const id = trigger.dataset.modalTarget;
            if (!id) {
                return;
            }
            openModalById(id, trigger);
        });
    });

    modalSections.forEach((section) => {
        section.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) {
                return;
            }
            if (target === section || target.closest("[data-modal-close]")) {
                closeOpenModal();
            }
        });
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeOpenModal();
        }
    });

    document.addEventListener("arcade-exit", () => {
        for (const reset of [resetTtt, resetMemoryGameToIdle, resetMoleGame, resetReactionTest,
            resetBreakoutGame, resetSnakeGame, resetTetrisGame, resetDropGame]) {
            try { reset(); } catch (error) { console.error("Arcade cleanup failed", error); }
        }
    });
    renderArticles();
    renderGuestbook();
    resetTtt();
    resetMemoryGameToIdle();
    renderMemoryRanking();
    resetMoleGame();
    resetReactionTest();
    renderReactionBest();
    resetBreakoutGame();
    resetSnakeGame();
    resetTetrisGame();
    resetDropGame();
    if (miniTabButtons.length) {
        const initialKey = miniTabButtons.find((button) => button.classList.contains("is-active"))?.dataset.miniTab
            || miniTabButtons[0].dataset.miniTab;
        if (initialKey) {
            setActiveMiniGame(initialKey);
        }
    }
})();
