(() => {
    const STORAGE = {
        articleComments: "aniani_article_comments_v1",
        guestbook: "aniani_guestbook_comments_v1",
        memoryRanking: "aniani_memory_rankings_v1",
        reactionBest: "aniani_reaction_best_v1",
        breakoutBest: "aniani_breakout_best_v1"
    };

    // 公式記事: ここに書いた記事が全員に同じ内容で表示されます（端末内保存ではありません）。
    // 新しい記事は先頭に追加してください。id は記事コメントの保存キーなので、公開後は変えないでください。
    const officialArticles = [
{
    "id": "2026-10-24-battle-unity-size",
    "title": "Battle à la carte Unity版：Windowsを約412MBに軽量化",
    "category": "アップデート",
    "body": "Unity版v0.6.0のWindows軽量化版を公開しました。ZIPは約499MBから約412MBへ、約87MB（17.36%）削減。展開後も約1,063MBから約759MBへ、約303MB（28.54%）小さくなっています。\n\n全15話のストーリー、キャラクターの表情差分・着せ替え、BGMとテーマ曲、CPU対戦などの収録内容を維持。画像を小さくせず、確認済み72画像の圧縮設定を調整しました。顔・Modeアイコン・カットインは非圧縮のままです。画像の原寸比較とWindowsの自動動作検証を完了しています。\n\nAndroid公開版は約498MBのままです。ETC2・ASTC 4×4・背景6×6／8×8のAPKを比較しましたが、Android実機の画質・動作・更新時のセーブ引継ぎが未確認のため、軽量化候補は未公開です。今回の実通信・実アカウントログイン・実聴も未検証です。\n\n軽量化版は従来と同じv0.6.0です。以前の配布物はそのまま残しています。Windows ZIPはすべて展開し、同梱ファイル一式を保ったまま起動してください。MBは1,000,000 bytesです。",
    "links": [
        {
            "href": "https://github.com/donadonaa24-cyber/battle-a-la-carte-3d/releases/download/v0.6.0/BattleALaCarte-3D-Windows-v0.6.0-optimized.zip",
            "label": "Windows軽量化版（約412MB）"
        },
        {
            "href": "https://donadonaa24-cyber.github.io/battle-a-la-carte-3d/#optimization",
            "label": "詳しい容量比較・検証結果"
        }
    ],
    "createdAt": "2026-10-24T08:58:00+09:00"
},
{
    "id": "2026-10-23-anibato-touch-controls",
"screenshots": [{"src":"images/anibato/touch-20261023.webp","alt":"紙の舞台で千鶴と蓮が対戦し、左右下に半透明のタッチ操作ボタンがある画面","title":"横持ちのタッチ操作","caption":"中央を空けた配置で移動・通常・特殊・ジャンプなどを操作。実ブラウザの844×390px表示枠で撮影。スマホ実機は未確認。"}],
    "title": "あにバト！！ 半透明のタッチ操作を追加",
    "category": "アップデート",
    "body": "ブラウザ試作版に、スマホの横持ち向けタッチ操作を追加しました。左下で移動、右下で通常・特殊・ジャンプ。防御・回避・反撃・超必殺も操作できます。通常や溜め技は長押しして、離すと発動します。\n\n中央を空ける半透明の配置で、メニュー中は決定・戻るへ切り替わります。上の「タッチ操作」で表示を切り替えられます。キーボードとゲームパッドも引き続き使えます。\n\nスマホ実機での操作感・メモリの確認は調整中です。端末やブラウザによって起動・動作に差が出る場合があります。無料オンラインは直接通信の招待対戦で、回線によって接続できない場合があります。",
    "links": [
        {
            "href": "games/anibato/",
            "label": "ブラウザで開演！"
        },
        {
            "href": "anibato/#controls",
            "label": "操作方法を見る"
        }
    ],
    "createdAt": "2026-10-23T02:45:00+09:00"
},
        {
    "id": "2026-10-22-anibato-paper-release",
    "title": "あにあにバトル！！ 無料ブラウザ試作版と紙の舞台ガチャ",
    "category": "アップデート",
    "body": "9人・3作品のペープサート風チームバトルを、PCブラウザで遊べる無料試作版として公開しました。3人ずつ選び、先に2勝したチームの勝ちです。\n\n崖つかまりとスタミナの駆け引き、8種類のサポート、専用の動作原画、紙の舞台を実装。オンラインは無料の直接通信による招待対戦の試験版です。回線によって接続できない場合があります。\n\n無料試験ガチャにも紙キャラ9枚（SSR）とサポート8組（SR）を追加。既存159枚の所持データとレアリティ排出率を維持しています。同じレアリティ内の1枚あたりの確率は枚数の増加に応じて変わります。ガチャは観賞用で、ゲーム内のキャラやサポートを解放するものではありません。",
    "screenshots": [
        {
            "src": "images/anibato/battle-20261022.webp",
            "alt": "紙の舞台で透真と蓮が戦い、サポート効果の説明が表示されている画面",
            "title": "小さな紙HUDとサポート",
            "caption": "9人の専用原画・紙の舞台・スタミナ管理で戦う無料試作版。"
        }
    ],
    "links": [
        {
            "href": "anibato/",
            "label": "あにバトのホームページへ"
        },
        {
            "href": "games/anibato/",
            "label": "PCブラウザで遊ぶ"
        }
    ],
    "createdAt": "2026-10-22T23:00:00+09:00"
},
        {
            id: "2026-10-12-anibato-preview",
            title: "あにあにバトル！！ 試作版を開発中",
            category: "開発便り",
            body: [
                "あにあに作品のキャラクターたちが戦う2D対戦アクション（プラットフォームファイター）『あにあにバトル！！』（略称：あにバト！！）の試作版を、UnityでWindows向けに開発しています。",
                "初期の参加キャラは透真（『星の終わりに君は生きる』）、蓮（『推し駒battle』）、千鶴（『Battle à la carte』）。今後作品が増えれば参加キャラも増える予定です。",
                "試作版は1試合70秒、ハート3つ。通常攻撃は3回当たるとハート1つ、特殊攻撃はハート1つ、超必殺技はハート2つを失います。ステージ外に落ちたら即敗北し、最後の10秒でステージが縮みます。ガード・回避・カウンターの読み合いが特徴です。",
                "試作版・開発中。プレイ版・ダウンロードは現在未公開です。下の画像は開発中の画面で、画像を押すと別タブで原寸表示できます。"
            ].join("\n\n"),
            screenshots: [
                {
                    src: "images/anibato/battle-20261012.jpg",
                    alt: "あにあにバトル！！試作版で千鶴と透真が対戦する画面",
                    title: "作品を越えたバトル",
                    caption: "千鶴 vs 透真。Windows向けに開発中の2D対戦アクション。"
                },
                {
                    src: "images/anibato/select-20261012.jpg",
                    alt: "あにあにバトル！！試作版のキャラクター選択画面",
                    title: "初期の参加キャラ",
                    caption: "透真・蓮・千鶴が参加。今後作品が増えれば参加キャラも増える予定です。"
                },
                {
                    src: "images/anibato/special-20261012.jpg",
                    alt: "あにあにバトル！！試作版で爆弾おにぎりが命中した場面",
                    title: "必殺技の一場面",
                    caption: "爆弾おにぎりが命中した場面。プレイ版は未公開です。"
                }
            ],
            createdAt: "2026-10-12T12:00:00+09:00"
        },
        {
            id: "2026-10-11-battle-story-v060",
            title: "Battle à la carte：ストーリー特別編と新キャラクター4人／Unity版 v0.6.0 公開",
            category: "アップデート",
            body: [
                "Web版とUnity版（3D版）の Battle à la carte を更新しました。",
                "・ストーリーに特別編（夏休み編・ハロウィン編・弓道編・幼馴染編 前編／後編）を追加",
                "・特別編をクリアすると、新しいキャラクター（剛・栞那・結月・龍太）が使えます",
                "・着せ替え、アチーブメント（称号）、キャラクターごとのテーマ曲を追加",
                "・新しい4人は通信対戦でも使えます（古いUnity版 v0.5.0以前は、新しい4人がいる部屋に入れません）",
                "・Unity版 v0.6.0：ストーリーが全15話に。Windows / Android（試験版）を Unity版ホームページからダウンロードできます",
                "本作のキャラクターは、フェニチルさんの創作作品『天涯比隣』のキャラクターデザインと名前をお借りした二次創作です。性格・関係性・ストーリー・設定はすべて本作独自のもので、原作とは関係ありません。"
            ].join("\n"),
            createdAt: "2026-10-11T00:30:00+09:00"
        },
        {
            id: "2026-10-03-oshikoma-android",
            title: "推し駒battle Android版（APK）を追加",
            category: "お知らせ",
            body: [
                "推し駒battleの試験版2（v1.0-trial.2）に、Android版を追加しました。Android 8.0以上の64bit端末で、横画面で遊べます。",
                "Android端末のブラウザでAPKをダウンロードし、「提供元不明のアプリ」を聞かれたら、そのブラウザ（またはファイルアプリ）を許可してインストールしてください。",
                "Google Play外の試験配布で、実機での動作は確認中です。感想・不具合はGitHubのIssuesへお寄せください。"
            ].join("\n\n"),
            links: [
                { href: "https://donadonaa24-cyber.github.io/oshikoma/", label: "ホームページ・遊び方へ" },
                { href: "https://github.com/donadonaa24-cyber/oshikoma/releases/download/v1.0-trial.2/OshigomaBattle-trial2-android.apk", label: "Android版をダウンロード（APK・約87MB）" },
                { href: "https://github.com/donadonaa24-cyber/oshikoma/releases/download/v1.0-trial.2/OshigomaBattle-trial2-win64.zip", label: "Windows版をダウンロード（zip・約103MB）" }
            ],
            createdAt: "2026-10-03T02:35:00+09:00"
        },
        {
            id: "2026-10-06-aniani-bunko",
            title: "あにあに文庫オープン：小説3作品・全6冊を公開",
            category: "新作",
            body: [
                "あにあにの小説を、本物の本のようにページをめくって読める「あにあに文庫」を公開しました。ブラウザで無料で読めます。",
                "・EchoShion：記憶と声をめぐる近未来の物語。",
                "・花散るさきの、幸せのかたち（上巻・下巻・別巻）：姉妹と家族の物語。下巻と別巻で、ふたつの結末を読めます。",
                "・星の終わりに君は生きる（本編・特別編）：管理AIの時代に引き裂かれた兄弟と、ひとり火星へ渡った弟の物語。",
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
    const tttModeButton = document.getElementById("ttt-mode");
    const tttSetupEl = document.getElementById("ttt-setup");
    const tttResultEl = document.getElementById("ttt-result");
    const memoryNicknameInput = document.getElementById("memory-nickname");
    const memoryStartButton = document.getElementById("memory-start");
    const memoryResetButton = document.getElementById("memory-reset");
    const memoryBoardEl = document.getElementById("memory-board");
    const memoryStatusEl = document.getElementById("memory-status");
    const memoryTimerEl = document.getElementById("memory-timer");
    const memoryRankingListEl = document.getElementById("memory-ranking-list");
    const memoryModeButton = document.getElementById("memory-mode");
    const memorySetupEl = document.getElementById("memory-setup");
    const memoryResultEl = document.getElementById("memory-result");
    const memoryScoreEl = document.getElementById("memory-score");
    const memoryControlsEl = document.querySelector(".memory-controls");
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
    const breakoutStageEl = document.getElementById("breakout-stage");
    const breakoutBestEl = document.getElementById("breakout-best");
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
    const dropArtEl = document.getElementById("drop-art");
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
        if (tabKey === "drop" && !slideState.art) {
            pickSlideArt();
            renderSlideBoard();
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

    // 作品詳細だけはURL末尾（例: #battle-detail）で直接開けるようにし、共有できるURLにする。
    const DEEP_LINK_MODAL_IDS = ["battle-detail", "battle-3d-detail", "tumikomi", "oshi-detail", "bunko-detail", "anibato-detail", "trial-gacha"];

    function getDeepLinkModalId() {
        const id = window.location.hash.slice(1);
        return DEEP_LINK_MODAL_IDS.includes(id) ? id : "";
    }

    function syncDeepLinkHash(id) {
        const nextId = DEEP_LINK_MODAL_IDS.includes(id) ? id : "";
        if (getDeepLinkModalId() === nextId) {
            return;
        }
        const base = `${window.location.pathname}${window.location.search}`;
        try {
            history.replaceState(history.state, "", nextId ? `${base}#${nextId}` : base);
        } catch {
            // 履歴APIが使えない環境ではURLを変えずにモーダルだけ動かす。
        }
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
        syncDeepLinkHash("");

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
        syncDeepLinkHash(id);

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
    const MINI_AI = window.AnianiMiniGameAI;
    const LEVEL_LABELS = { easy: "やさしい", normal: "ふつう", hard: "つよい" };
    let tttBoard = Array(TTT_SIZE * TTT_SIZE).fill("");
    let tttTurn = "○";
    let tttFinished = false;
    let tttWinLine = [];
    let tttLastMove = -1;
    let tttMode = { players: 2, cpu: false, level: "normal" };
    let tttHuman = "○";
    let tttCpuMark = "×";
    let tttCpuTimer = 0;

    // 盤面の上に重ねる「遊び方の選択」：人数 → CPUの有無 → 強さ。
    function createModeSetup(element, onComplete) {
        if (!element) return { open() {}, close() {} };
        const steps = Array.from(element.querySelectorAll("[data-setup-step]"));
        const back = element.querySelector("[data-setup-back]");
        const title = element.querySelector("[data-setup-title]");
        const titles = { players: "遊び方を選んでください", opponent: "1人で遊ぶ：CPUと対戦しますか？", level: "CPUの強さを選んでください" };
        let current = "players";
        function show(step) {
            current = step;
            steps.forEach((item) => { item.hidden = item.dataset.setupStep !== step; });
            if (back) back.hidden = step === "players";
            if (title) title.textContent = titles[step];
            element.querySelector(`[data-setup-step="${step}"] button`)?.focus({ preventScroll: true });
        }
        element.addEventListener("click", (event) => {
            const target = event.target instanceof Element ? event.target : null;
            if (target?.closest("[data-setup-back]")) {
                show(current === "level" ? "opponent" : "players");
                return;
            }
            const choice = target?.closest("[data-setup-choice]")?.dataset.setupChoice;
            if (!choice) return;
            if (current === "players") {
                if (choice === "2") { element.hidden = true; onComplete({ players: 2, cpu: false, level: "normal" }); }
                else show("opponent");
            } else if (current === "opponent") {
                if (choice === "none") { element.hidden = true; onComplete({ players: 1, cpu: false, level: "normal" }); }
                else show("level");
            } else {
                element.hidden = true;
                onComplete({ players: 1, cpu: true, level: choice });
            }
        });
        return {
            open() { element.hidden = false; show("players"); },
            close() { element.hidden = true; }
        };
    }

    function showMiniResult(element, title, detail) {
        if (!element) return;
        element.querySelector("[data-result-title]").textContent = title;
        element.querySelector("[data-result-detail]").textContent = detail;
        element.hidden = false;
    }

    function findWinLine(board) {
        return MINI_AI ? MINI_AI.findWinLine(board, TTT_SIZE, TTT_GOAL) : [];
    }

    function tttLabel(mark) {
        if (tttMode.cpu) return mark === tttHuman ? `あなた（${mark}）` : `CPU（${mark}）`;
        if (tttMode.players === 2) return `${mark === "○" ? "プレイヤー1" : "プレイヤー2"}（${mark}）`;
        return mark;
    }

    function updateTttStatus(text) {
        if (tttStatusEl) {
            tttStatusEl.textContent = text;
        }
    }

    function tttTurnText() {
        if (tttMode.cpu && tttTurn === tttCpuMark) return `${tttLabel(tttTurn)} が考えています…`;
        return `${tttLabel(tttTurn)} の番です`;
    }

    function renderTtt() {
        if (!tttBoardEl) {
            return;
        }

        tttBoardEl.innerHTML = tttBoard.map((value, index) => {
            const mark = escapeHtml(value || "");
            const winClass = tttWinLine.includes(index) ? " is-win" : "";
            const lastClass = index === tttLastMove ? " is-last" : "";
            return `<button class="ttt-cell${winClass}${lastClass}" type="button" data-ttt-index="${index}" aria-label="${index + 1}マス">${mark}</button>`;
        }).join("");
    }

    function clearTttCpu() {
        if (tttCpuTimer) window.clearTimeout(tttCpuTimer);
        tttCpuTimer = 0;
    }

    function resetTtt() {
        clearTttCpu();
        tttBoard = Array(TTT_SIZE * TTT_SIZE).fill("");
        tttTurn = "○";
        tttFinished = false;
        tttWinLine = [];
        tttLastMove = -1;
        if (tttResultEl) tttResultEl.hidden = true;
        // CPU対戦の先攻（○）はランダム。
        tttHuman = tttMode.cpu && Math.random() < 0.5 ? "×" : "○";
        tttCpuMark = tttHuman === "○" ? "×" : "○";
        updateTttStatus(tttTurnText());
        renderTtt();
        if (tttMode.cpu && tttTurn === tttCpuMark) scheduleTttCpu();
    }

    function finishTtt(winner) {
        tttFinished = true;
        clearTttCpu();
        let title = "引き分け";
        if (winner) {
            if (tttMode.cpu) title = winner === tttHuman ? "あなたの勝ち！" : "CPUの勝ち…";
            else if (tttMode.players === 2) title = `${winner === "○" ? "プレイヤー1" : "プレイヤー2"}（${winner}）の勝ち！`;
            else title = `${winner} の勝ち！`;
        }
        const detail = tttMode.cpu ? `CPU：${LEVEL_LABELS[tttMode.level]}　あなたは${tttHuman === "○" ? "先攻" : "後攻"}（${tttHuman}）` : (winner ? "5つそろいました" : "盤面がすべて埋まりました");
        updateTttStatus(winner ? `${tttLabel(winner)} の勝ちです` : "引き分けです");
        renderTtt();
        // 勝った並びが見えるよう、少し待ってから結果を出す。
        window.setTimeout(() => {
            if (tttFinished) showMiniResult(tttResultEl, title, detail);
        }, 900);
    }

    function placeTtt(index, mark) {
        if (tttFinished || tttBoard[index]) return;
        tttBoard[index] = mark;
        tttLastMove = index;
        tttWinLine = findWinLine(tttBoard);
        if (tttWinLine.length) {
            finishTtt(mark);
            return;
        }
        if (tttBoard.every(Boolean)) {
            finishTtt("");
            return;
        }
        tttTurn = tttTurn === "○" ? "×" : "○";
        updateTttStatus(tttTurnText());
        renderTtt();
        if (tttMode.cpu && tttTurn === tttCpuMark) scheduleTttCpu();
    }

    function scheduleTttCpu() {
        clearTttCpu();
        tttCpuTimer = window.setTimeout(() => {
            tttCpuTimer = 0;
            if (tttFinished || !MINI_AI) return;
            const index = MINI_AI.chooseGomokuMove(tttBoard, TTT_SIZE, TTT_GOAL, tttCpuMark, tttHuman, tttMode.level);
            placeTtt(index, tttCpuMark);
        }, 450);
    }

    const tttSetup = createModeSetup(tttSetupEl, (mode) => {
        tttMode = mode;
        resetTtt();
    });

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

            if (tttFinished || tttBoard[index] || (tttMode.cpu && tttTurn === tttCpuMark)) {
                return;
            }

            placeTtt(index, tttTurn);
        });
    }

    if (tttResetButton) {
        tttResetButton.addEventListener("click", resetTtt);
    }
    tttModeButton?.addEventListener("click", () => { clearTttCpu(); tttSetup.open(); });
    tttResultEl?.querySelector("[data-result-again]")?.addEventListener("click", resetTtt);
    tttResultEl?.querySelector("[data-result-mode]")?.addEventListener("click", () => {
        tttResultEl.hidden = true;
        tttSetup.open();
    });

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

    // 対戦（CPU・2人）の状態。1人・CPUなしは従来どおりタイムアタック。
    const memoryVersus = {
        mode: { players: 1, cpu: false, level: "normal" },
        scores: [0, 0],
        turn: 0,
        known: new Map(),
        timers: []
    };

    function isMemoryVersus() {
        return memoryVersus.mode.players === 2 || memoryVersus.mode.cpu;
    }

    function memoryPlayerNames() {
        return memoryVersus.mode.cpu ? ["あなた", "CPU"] : ["プレイヤー1", "プレイヤー2"];
    }

    function isMemoryCpuTurn() {
        return memoryVersus.mode.cpu && memoryVersus.turn === 1;
    }

    function clearMemoryCpu() {
        memoryVersus.timers.forEach((timer) => window.clearTimeout(timer));
        memoryVersus.timers = [];
    }

    function updateMemoryScoreboard() {
        if (!memoryScoreEl) return;
        const names = memoryPlayerNames();
        memoryScoreEl.querySelectorAll("[data-score-player]").forEach((item) => {
            const player = Number(item.dataset.scorePlayer);
            item.querySelector("em").textContent = names[player];
            item.querySelector("b").textContent = String(memoryVersus.scores[player]);
            item.classList.toggle("is-turn", memoryState.running && memoryVersus.turn === player);
        });
    }

    // 遊び方に合わせて、タイム・ニックネーム・得点表示を切り替える。
    function applyMemoryModeUi() {
        const versus = isMemoryVersus();
        if (memoryTimerEl) memoryTimerEl.hidden = versus;
        if (memoryScoreEl) memoryScoreEl.hidden = !versus;
        memoryControlsEl?.classList.toggle("is-versus", versus);
        updateMemoryScoreboard();
    }

    function memoryTurnText() {
        const name = memoryPlayerNames()[memoryVersus.turn];
        return isMemoryCpuTurn() ? "CPUの番です…" : `${name}の番です。カードを2枚めくってください。`;
    }

    function resetMemoryGameToIdle() {
        stopMemoryTimerLoop();
        clearMemoryCpu();
        memoryState.cards = [];
        memoryState.running = false;
        memoryState.finished = false;
        memoryState.playerName = "";
        memoryState.startAt = 0;
        memoryState.elapsedMs = 0;
        memoryState.firstId = null;
        memoryState.lock = false;
        memoryState.matchedPairs = 0;
        memoryVersus.scores = [0, 0];
        memoryVersus.turn = 0;
        memoryVersus.known = new Map();
        if (memoryResultEl) memoryResultEl.hidden = true;
        updateMemoryTimer();
        renderMemoryBoard();
        applyMemoryModeUi();
        setMemoryStatus(isMemoryVersus() ? "スタートを押すと対戦を開始します。" : "ニックネームを入力してスタートを押すと開始します。");
    }

    function startMemoryVersus() {
        resetMemoryGameToIdle();
        memoryState.cards = buildMemoryCards();
        memoryState.running = true;
        updateMemoryScoreboard();
        setMemoryStatus(memoryTurnText());
        renderMemoryBoard();
    }

    function startMemoryGame() {
        memorySetup.close();
        if (isMemoryVersus()) {
            startMemoryVersus();
            return;
        }
        const rawName = String(memoryNicknameInput?.value || "").trim();
        if (!rawName) {
            window.alert("ニックネームを入力してからスタートしてください。");
            return;
        }

        const nickname = normalizeName(rawName);
        stopMemoryTimerLoop();
        if (memoryResultEl) memoryResultEl.hidden = true;
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
        showMiniResult(memoryResultEl, "クリア！", `${memoryState.playerName} さんのタイム：${formatDuration(memoryState.elapsedMs)}`);
    }

    function finishMemoryVersus() {
        memoryState.running = false;
        memoryState.finished = true;
        clearMemoryCpu();
        const names = memoryPlayerNames();
        const [first, second] = memoryVersus.scores;
        let title = "引き分け！";
        if (first !== second) {
            const winner = first > second ? 0 : 1;
            title = memoryVersus.mode.cpu ? (winner === 0 ? "あなたの勝ち！" : "CPUの勝ち…") : `${names[winner]}の勝ち！`;
        }
        const level = memoryVersus.mode.cpu ? `（CPU：${LEVEL_LABELS[memoryVersus.mode.level]}）` : "";
        const detail = `${names[0]} ${first}ペア 対 ${second}ペア ${names[1]}${level}`;
        updateMemoryScoreboard();
        setMemoryStatus(`${title} ${detail}`);
        window.setTimeout(() => {
            if (memoryState.finished) showMiniResult(memoryResultEl, title, detail);
        }, 600);
    }

    // CPUは、覚えているカードからペアを探し、なければまだ見ていないカードをめくる。
    function scheduleMemoryCpu() {
        if (!MINI_AI || !isMemoryCpuTurn() || !memoryState.running) return;
        const level = memoryVersus.mode.level;
        const pick = (delay) => {
            const timer = window.setTimeout(() => {
                if (!memoryState.running || !isMemoryCpuTurn() || memoryState.lock) return;
                const id = MINI_AI.chooseMemoryPick(memoryState.cards, memoryVersus.known, level, memoryState.firstId);
                if (id) handleMemoryCardClick(id, true);
                if (memoryState.firstId && memoryState.running && isMemoryCpuTurn()) pick(750);
            }, delay);
            memoryVersus.timers.push(timer);
        };
        pick(800);
    }

    function handleMemoryCardClick(cardId, byCpu = false) {
        if (!memoryState.running || memoryState.lock) {
            return;
        }
        const versus = isMemoryVersus();
        if (versus && isMemoryCpuTurn() && !byCpu) {
            return;
        }

        const card = memoryState.cards.find((item) => item.id === cardId);
        if (!card || card.flipped || card.matched) {
            return;
        }

        card.flipped = true;
        if (memoryVersus.mode.cpu && MINI_AI) MINI_AI.rememberCard(memoryVersus.known, card, memoryVersus.mode.level);
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
            renderMemoryBoard();
            if (versus) {
                memoryVersus.scores[memoryVersus.turn] += 1;
                updateMemoryScoreboard();
                if (memoryState.matchedPairs >= MEMORY_TOTAL_PAIRS) {
                    finishMemoryVersus();
                    return;
                }
                // ペアがそろったら、同じ人がもう一度めくる。
                setMemoryStatus(`${memoryPlayerNames()[memoryVersus.turn]}がペアをゲット！ もう一度めくれます。`);
                if (isMemoryCpuTurn()) scheduleMemoryCpu();
                return;
            }
            setMemoryStatus(`ナイス！ ${memoryState.matchedPairs}/${MEMORY_TOTAL_PAIRS} ペア成立`);
            if (memoryState.matchedPairs >= MEMORY_TOTAL_PAIRS) {
                finishMemoryGame();
            }
            return;
        }

        memoryState.lock = true;
        setMemoryStatus(versus ? "そろいませんでした。交代です。" : "不一致。次のペアを探そう。");
        const timer = window.setTimeout(() => {
            firstCard.flipped = false;
            secondCard.flipped = false;
            memoryState.lock = false;
            if (versus && memoryState.running) {
                memoryVersus.turn = 1 - memoryVersus.turn;
                updateMemoryScoreboard();
                setMemoryStatus(memoryTurnText());
            }
            renderMemoryBoard();
            if (versus && isMemoryCpuTurn()) scheduleMemoryCpu();
        }, versus ? 900 : 700);
        if (versus) memoryVersus.timers.push(timer);
    }

    const memorySetup = createModeSetup(memorySetupEl, (mode) => {
        memoryVersus.mode = mode;
        if (isMemoryVersus()) startMemoryVersus();
        else resetMemoryGameToIdle();
    });

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
    memoryModeButton?.addEventListener("click", () => { resetMemoryGameToIdle(); memorySetup.open(); });
    memoryResultEl?.querySelector("[data-result-again]")?.addEventListener("click", () => {
        if (isMemoryVersus()) startMemoryVersus();
        else resetMemoryGameToIdle();
    });
    memoryResultEl?.querySelector("[data-result-mode]")?.addEventListener("click", () => {
        resetMemoryGameToIdle();
        memorySetup.open();
    });

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
                    <img src="${safePath}" alt="もぐら・うさぎ・犬" loading="lazy">
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

    // ブロック崩し（全5ステージ）。進行と描画は minigame-breakout.js、ここはボタン・入力・HUDを担当する。
    const BREAKOUT = window.AnianiBreakout;
    const breakoutCtx = breakoutCanvasEl && BREAKOUT ? breakoutCanvasEl.getContext("2d") : null;
    const breakoutGame = BREAKOUT ? BREAKOUT.createGame() : null;
    const breakoutLoop = { rafId: 0, last: 0 };
    let breakoutBest = loadObject(STORAGE.breakoutBest, { score: 0, stage: 0 });

    function setBreakoutStatus(text) {
        if (breakoutStatusEl) {
            breakoutStatusEl.textContent = text;
        }
    }

    function updateBreakoutHud() {
        if (!breakoutGame) return;
        if (breakoutScoreEl) breakoutScoreEl.textContent = String(breakoutGame.score);
        if (breakoutLivesEl) breakoutLivesEl.textContent = String(breakoutGame.lives);
        if (breakoutStageEl) breakoutStageEl.textContent = String(breakoutGame.stageIndex + 1);
        if (breakoutBestEl) breakoutBestEl.textContent = `${breakoutBest.score || 0}点（ステージ${breakoutBest.stage || 1}）`;
    }

    function recordBreakoutBest() {
        const stage = breakoutGame.stageIndex + 1;
        if (breakoutGame.score <= (breakoutBest.score || 0)) return false;
        breakoutBest = { score: breakoutGame.score, stage: Math.min(stage, BREAKOUT.STAGES.length) };
        try { save(STORAGE.breakoutBest, breakoutBest); } catch { /* 保存できなくても遊べる */ }
        return true;
    }

    function stopBreakoutLoop() {
        if (breakoutLoop.rafId) {
            window.cancelAnimationFrame(breakoutLoop.rafId);
            breakoutLoop.rafId = 0;
        }
    }

    function drawBreakout() {
        if (breakoutCtx && breakoutGame) {
            BREAKOUT.draw(breakoutCtx, breakoutGame, performance.now());
        }
    }

    function handleBreakoutEvents() {
        for (const event of breakoutGame.events) {
            if (event.type === "item") {
                setBreakoutStatus(`アイテム：${BREAKOUT.ITEMS[event.kind].name}！`);
            } else if (event.type === "clear") {
                setBreakoutStatus(`ステージ${breakoutGame.stageIndex + 1}クリア！ 次のステージへ。`);
            } else if (event.type === "complete") {
                const best = recordBreakoutBest();
                setBreakoutStatus(`全ステージクリア！ ${breakoutGame.score}点${best ? "（ベスト更新！）" : ""}`);
            } else if (event.type === "over") {
                const best = recordBreakoutBest();
                setBreakoutStatus(`ゲームオーバー。${breakoutGame.score}点${best ? "（ベスト更新！）" : ""} スタートで再挑戦。`);
            } else if (event.type === "miss") {
                setBreakoutStatus("ミス！ タップ・スペースで発射。");
            }
        }
    }

    function breakoutFrame(now) {
        breakoutLoop.rafId = 0;
        if (!breakoutGame) return;
        const ms = Math.min(50, Math.max(0, now - (breakoutLoop.last || now)));
        breakoutLoop.last = now;
        const stageBefore = breakoutGame.stageIndex;
        BREAKOUT.step(breakoutGame, ms / (1000 / 60), ms);
        handleBreakoutEvents();
        if (breakoutGame.stageIndex !== stageBefore) {
            setBreakoutStatus(`ステージ${breakoutGame.stageIndex + 1}「${BREAKOUT.STAGES[breakoutGame.stageIndex].name}」 タップ・スペースで発射。`);
        }
        updateBreakoutHud();
        drawBreakout();
        if (!["over", "complete", "idle"].includes(breakoutGame.phase)) {
            breakoutLoop.rafId = window.requestAnimationFrame(breakoutFrame);
        }
    }

    function runBreakoutLoop() {
        if (breakoutLoop.rafId) return;
        breakoutLoop.last = performance.now();
        breakoutLoop.rafId = window.requestAnimationFrame(breakoutFrame);
    }

    function resetBreakoutGame() {
        stopBreakoutLoop();
        if (!breakoutGame) return;
        Object.assign(breakoutGame, BREAKOUT.createGame());
        updateBreakoutHud();
        setBreakoutStatus("スタートで開始。全5ステージ。");
        drawBreakout();
    }

    function startBreakoutGame() {
        if (!breakoutGame) return;
        if (["ready", "playing", "clear"].includes(breakoutGame.phase)) {
            BREAKOUT.launch(breakoutGame);
            return;
        }
        BREAKOUT.newGame(breakoutGame);
        updateBreakoutHud();
        setBreakoutStatus("ステージ1「" + BREAKOUT.STAGES[0].name + "」 タップ・スペースで発射。");
        runBreakoutLoop();
    }

    function launchBreakoutBall() {
        return Boolean(breakoutGame && BREAKOUT.launch(breakoutGame));
    }

    function setBreakoutHold(direction, active) {
        if (!breakoutGame || (direction !== "left" && direction !== "right")) return false;
        breakoutGame.hold[direction] = active;
        return true;
    }

    function setBreakoutPaddleByClientX(clientX) {
        if (!breakoutCanvasEl || !breakoutGame) {
            return;
        }
        const rect = breakoutCanvasEl.getBoundingClientRect();
        if (!rect.width) {
            return;
        }
        BREAKOUT.setPaddleCenter(breakoutGame, (clientX - rect.left) * (breakoutCanvasEl.width / rect.width));
        if (!breakoutLoop.rafId) {
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
        breakoutCanvasEl.addEventListener("pointermove", (event) => {
            setBreakoutPaddleByClientX(event.clientX);
        });

        breakoutCanvasEl.addEventListener("pointerdown", (event) => {
            setBreakoutPaddleByClientX(event.clientX);
            if (breakoutGame?.phase === "idle" || breakoutGame?.phase === "over" || breakoutGame?.phase === "complete") {
                startBreakoutGame();
            } else {
                launchBreakoutBall();
            }
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
    const slideState = { board: [1,2,3,4,5,6,7,8,0], initial: null, moves: 0, running: false, art: null };
    // 8パズルの透かしイラスト（推し駒battle・生成AIを使用）。シャッフルごとにランダムで選ぶ。
    const SLIDE_ARTS = [
        ["蓮", "ren"], ["結衣", "yui"], ["美桜", "mio"], ["歩太", "honoka"], ["伊吹", "ibuki"], ["蛙瑠", "kaeru"],
        ["乃音", "non"], ["莉胡", "riko"], ["豹妬レイラ", "shade1"], ["銀狼シオン", "shade2"], ["鹿角ノア", "shade3"], ["黒獅子王", "king"]
    ].map(([name, file]) => ({ name, src: `images/gacha/oshikoma/${file}.webp` }));
    function pickSlideArt() {
        const options = SLIDE_ARTS.filter(art => art !== slideState.art);
        slideState.art = options[Math.floor(Math.random() * options.length)];
        if (dropArtEl) dropArtEl.textContent = `イラスト：${slideState.art.name}（推し駒battle／生成AIを使用）`;
    }
    function slideArtStyle(value) {
        if (!slideState.art) return '';
        const piece = (value || 9) - 1;
        return ` style="--slide-art:url('${slideState.art.src}');--slide-x:${(piece % 3) * 50}%;--slide-y:${Math.floor(piece / 3) * 50}%"`;
    }
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
        const complete = !slideState.running && slideSolved(slideState.board);
        dropBoardEl.classList.toggle('is-complete', complete);
        dropBoardEl.innerHTML = slideState.board.map((value, index) => value
            ? `<button class="slide-tile${movable.includes(index) && slideState.running ? ' is-movable' : ''}" type="button" data-slide-index="${index}"${slideArtStyle(value)} ${!slideState.running || !movable.includes(index) ? 'disabled' : ''} aria-label="${value}を空きマスへ移動"><span>${value}</span></button>`
            : complete && slideState.art
                ? `<div class="slide-empty is-filled"${slideArtStyle(0)} aria-hidden="true"></div>`
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
        pickSlideArt();
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
        if (!breakoutGame) {
            return false;
        }
        if (direction === "up") {
            return launchBreakoutBall();
        }
        if (direction !== "left" && direction !== "right") {
            return false;
        }
        BREAKOUT.nudgePaddle(breakoutGame, direction);
        if (!breakoutLoop.rafId) {
            drawBreakout();
        }
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
        const direction = button.dataset.padDir || "";
        button.addEventListener("click", () => {
            // ブロック崩しの左右は押している間だけ動かす（pointerdown/up）。
            if (getActiveMiniGameKey() === "breakout" && (direction === "left" || direction === "right")) {
                return;
            }
            handleDirectionalInput(direction);
        });
        button.addEventListener("pointerdown", () => {
            if (getActiveMiniGameKey() === "breakout") setBreakoutHold(direction, true);
        });
        for (const type of ["pointerup", "pointercancel", "pointerleave"]) {
            button.addEventListener(type, () => setBreakoutHold(direction, false));
        }
    });

    // スペース：テトリスは回転、ブロック崩しは発射（停止中はスタート）。
    function handleSpaceKey() {
        const activeKey = getActiveMiniGameKey();
        if (activeKey === "tetris" && tetrisState.running) {
            rotateTetris();
            return true;
        }
        if (activeKey === "breakout" && breakoutGame) {
            if (["idle", "over", "complete"].includes(breakoutGame.phase)) startBreakoutGame();
            else launchBreakoutBall();
            return true;
        }
        return false;
    }
    function isSpaceKey(event) {
        return event.key === " " || event.code === "Space";
    }

    window.addEventListener("keydown", (event) => {
        const target = event.target;
        const isEditingText = target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target instanceof HTMLSelectElement;
        if (isEditingText || !miniGameSection?.classList.contains("is-open")) {
            return;
        }

        if (isSpaceKey(event)) {
            // フォーカス中のボタン（×など）がスペースで押されないようにする。
            if (["tetris", "breakout"].includes(getActiveMiniGameKey()) && miniGameSection.classList.contains("is-playing")) {
                event.preventDefault();
                if (!event.repeat) handleSpaceKey();
            }
            return;
        }

        const direction = getDirectionFromKey(event.key);
        if (direction && getActiveMiniGameKey() === "breakout" && (direction === "left" || direction === "right")) {
            setBreakoutHold(direction, true);
            event.preventDefault();
            return;
        }
        if (direction && handleDirectionalInput(direction)) {
            event.preventDefault();
        }
    });

    window.addEventListener("blur", () => {
        setBreakoutHold("left", false);
        setBreakoutHold("right", false);
    });

    window.addEventListener("keyup", (event) => {
        if (isSpaceKey(event) && miniGameSection?.classList.contains("is-playing") &&
            ["tetris", "breakout"].includes(getActiveMiniGameKey())) {
            event.preventDefault();
            return;
        }
        const direction = getDirectionFromKey(event.key);
        if (direction === "left" || direction === "right") setBreakoutHold(direction, false);
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
            resetBreakoutGame, resetSnakeGame, resetTetrisGame, resetDropGame, tttSetup.open, memorySetup.open]) {
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

    function openDeepLinkedModal() {
        const id = getDeepLinkModalId();
        if (id && !document.getElementById(id)?.classList.contains("is-open")) {
            openModalById(id);
        }
    }

    window.addEventListener("hashchange", openDeepLinkedModal);
    openDeepLinkedModal();
})();
