# ARCHITECTURE

最終確認日: 2026-10-09

## 全体構成

このプロジェクトは、ビルド工程を持たない静的Webアプリケーションである。`index.html` を入口に、script、CSS、画像をブラウザが直接読み込む。この公開用リポジトリには共通アカウントの `common/` と `supabase/` は含まれず、HTMLからも参照しない。以下のSupabase・共通アカウントの構成は未公開ローカル版を説明している。

```text
Browser
  ├─ Portal / mini games (local HTML, CSS, JS, Canvas, localStorage)
  ├─ External game links (GitHub Pages)
  └─ Common account UI
       ├─ supabase-js (esm.sh)
       └─ Supabase Auth + PostgREST RPC + PostgreSQL/RLS
```

## Unity関連

- Unityバージョン: 該当なし。
- Scene: 該当なし。画面は `index.html` 内のsection/modalで構成。
- Prefab: 該当なし。
- C#スクリプト: 該当なし。
- Unity Package Manager: 該当なし。

## 主要ファイル

| パス | 役割 |
|---|---|
| `index.html` | 全画面構造、作品カード、各モーダル、ミニゲームDOM、共通アカウントDOM |
| `aniani.css` | ポータル従来UI、モーダル、記事、コメント、ミニゲーム基礎スタイル |
| `galaxy.css` | 宇宙ライブラリ、回転ゲームケース、コンソールドック、流れ星 |
| `arcade.css` | ミニゲーム全画面、固定レイアウト、仮想パッド、レスポンシブ調整 |
| `trial-gacha.css` | 無料試験ガチャのコイン投入・銀河回転・白転・UR予兆・カード公開、図鑑、レスポンシブ表示 |
| `trial-gacha-data.js` | 135枚の公開用カードカタログ、排出率、社員スプライト位置 |
| `trial-gacha.js` | 無料10連抽選、1枚ずつの状態遷移、スキップ、Web Audio効果音、端末内所持数、図鑑表示 |
| `common/portal.css` | 共通アカウント、ウォレット、ガチャ、カード図鑑 |
| `aniani.js` | モーダル、localStorage、記事/コメント、8ミニゲームのロジック |
| `galaxy.js` | 登録作品数に応じた円軌道と総件数表示、選択、スワイプ、キーボード、モーション軽減 |
| `arcade-layout.js` | ミニゲーム開始/終了、Fullscreen、画面向き、盤面サイズ調整、ホーム復帰 |
| `scripts/serve.cjs` | Node標準機能による開発用HTTPサーバー（既定127.0.0.1:3000） |
| `scripts/serve.test.cjs` | 配信内容、MIME、HEAD、非公開ファイル・ルート外配信の拒否検査 |
| `package.json` / `package-lock.json` / `.nvmrc` | 開発コマンドとNode.jsバージョン管理。外部npm依存なし |
| `.github/workflows/test.yml` | PR/mainで構文・回帰・開発サーバー検査を実行 |
| `common/portal.js` | Supabase Auth、デイリー、ガチャ、図鑑、セッションUI、通信中ガード |
| `common/api.js` | 公開/認証REST・RPCクライアント、20秒タイムアウト |
| `common/config.js` | Supabase URLと公開可能キーのみ |
| `supabase/migrations/001_common.sql` | 共通DBの初期schema、RLS、RPC、初期カード・実績 |
| `supabase/verify.sql` | ロールバック前提のRLS・報酬・ガチャ統合検証 |

## 主要フォルダ

- `assets/images/`: Battle a la carte由来のカード、料理、イベント、キャラクター等の画像。
- `images/`: 銀河背景、架空運輸紹介画像、推し駒battle画像、ミニゲーム生成画像。
- `images/gacha/`: 架空運輸の社員30名スプライト。車両の旧スプライトは保管し、現在は `vehicles/` の個別生成PNG5枚を使う。
- `images/gacha/battle/`: 公開ゲームの追加4人のカットインと衣装7枚。`source.json` にコピー元リポジトリ・コミット・パス・Git blob SHAを記録し、テストで原ファイルとの一致を確認する。
- `common/`: 共通アカウント・コイン・ガチャ・図鑑のフロントエンド。
- `supabase/`: DB migration、検証SQL、運用記録。
- `docs/`: Codex向け正式仕様、現在状態、変更履歴、技術構成。
- `.publish-aniani/`: 従来のPC作業フォルダでGitHub Pagesへpushする独立Git作業ツリー。cloneしたリポジトリではルート自体がGit作業ツリーで、このフォルダを作る必要はない。
- `.publish-battle-3d/`: Unity版専用の紹介・配布リポジトリ作業ツリー。Unityソース一式は含まない。
- `release-artifacts/`: ローカル配布ZIP。ポータルのGit管理対象外。
- `images/battle-3d-20261001.webp`: Unity版の現在の対戦画面（1600×900、ロスレスWebP）。旧 `images/battle-3d.png` は保持。
- `.publish-battle-3d/images/`: Unity紹介ページ用の対戦・メニュー・ミッション・スリーブ画像。Unityの検証PNGから作成した静的画像で、ゲームランタイムは含まない。
- `assets/images/積み込みゲーム/`: 別作品「翠路ロジスティクス」の同梱ソース。独自のHTML/CSS/JS/Nodeサーバー/テスト/データを持つが、ポータルはこのコピーを起動せず、公開済み `tumikomi` へ外部リンクする。

## システム間の役割

### ポータル・モーダル

- `[data-modal-target]` と `.modal-section` を `aniani.js` が結び付ける。
- 開いているモーダルは `.is-open` と `aria-hidden` で管理する。
- `galaxy.js` は作品ケースの `data-orbit`、`data-title`、`data-status`、`data-description` を表示へ反映する。

### 公式記事の画像とリンク（2026-10-02追加）

- `aniani.js` の `officialArticles` は既存の `id` / `title` / `category` / `body` / `createdAt` に、任意の `screenshots` / `links` を持てる。`screenshots` は `src` / `alt` / `title` / `caption`、`links` は `href` / `label`。
- `renderArticles()` が各値をHTMLエスケープしてfigure/リンクを生成し、`aniani.css` の `.article-gallery` がレスポンシブ表示を担当する。記事IDと `aniani_article_comments_v1` はそのまま。追加のパッケージ、DB、通信APIは不要。
- 試験版2の画像は `images/oshikoma/*-20261002.jpg`。コピー元は `../推し駒battle/Site/assets/screen-*.jpg`。公開用 `.publish-aniani/images/oshikoma/` も同じ画像を持つ。画像生成ではなく実画面をそのまま使用する。
- `#oshi-detail .game-visual` は高さ自動・16:9・`object-fit: contain`。他作品の画像やミニゲームへ影響しないよう、対象を限定している。

### ミニゲーム

- `aniani.js` がゲーム状態、入力、Canvas描画、得点、タイマーを所有する。
- `arcade-layout.js` がゲームロジックから独立して、全画面・向き・サイズ・終了導線を管理する。
- 終了時は `arcade-exit` DOMイベントを発火し、`aniani.js` が各ゲームをリセットする。
- `data-mini-tab` と `data-mini-panel` の値がゲーム識別子。既存識別子 `drop` は、表示ゲームが8パズルへ変わった後も互換性のため維持している。
- `arcade-layout.js` は既存の開始・リセット・神経衰弱入力DOMを `#arcade-controls` へ一度だけ移設する。複製しないためIDと登録済みイベント処理は維持される。
- `.arcade-control-deck`、`.arcade-session-actions`、`.arcade-action-pad` を `arcade.css` の共通Gridで配置する。縦画面は下部、横画面/PCは左右に操作域を確保する。
- CSS変数 `--pad-key`、`--thumb-zone` と `env(safe-area-inset-*)`、`dvh/dvw` を利用。神経衰弱のCSS回転時は余白の向きも読み替える。
- プレイ中の `data-directional` により、方向操作不要ゲームのパッド空間を除外する。

### 共通アカウント

- `common/portal.js` がSupabaseセッションを監視し、`common/api.js` へ現在のアクセストークンを供給する。
- 匿名時に読めるのはカードカタログとルール。個人データとRPCは認証必須。
- ガチャ前に `crypto.randomUUID()` でリクエストIDを生成し、localStorageへ保存する。
- `navigator.locks` で同一ユーザーの同時抽選を抑止し、サーバー側の一意制約とRPCで最終的な二重消費を防ぐ。

### 無料試験ガチャ

- `trial-gacha-data.js` の配列がカード追加の単一入口。Battle a la carte、架空運輸、小説3作品のカードを作品・カテゴリ・レアリティで管理する。HOS / HAN / ECHは既存81枚の末尾、今回のBAL-125〜135は公開済み124枚の末尾に追加し、既存IDと番号を変えない。
- 抽選はクライアント完結。先にレアリティをC 60% / SR 25% / SSR 10% / UR 5%で選び、同レアリティのカードから1枚を選ぶ。
- 下部コンソールドックの `[data-modal-target="trial-gacha"]` だけを入口にし、ゲームケースが回る軌道中央にはDOM要素を置かない。
- コイン投入、銀河回転、ホワイトアウト、通常カード公開、UR流れ星、UR台詞、UR公開、結果一覧を `data-phase` で切り替える。途中スキップは未公開分を含む10枚を一度だけ端末内所持へ加算する。
- 既存Battle UR画像は `assets/images/battle-mode-cutins/` の4画像、追加4人は `images/gacha/battle/` を使用する。既存URの決め台詞は維持する。小説URと追加4人は `quoteLabel` で「登場人物紹介」と明記し、紹介文を表示する。
- 小説の画像43枚は `images/gacha/bunko/` に配置。別リポジトリ `book` の `public/assets/novels/<作品ID>/characters/` に同じPNGを配置し、キャラ紹介と共有する。本文・本棚アプリは複製しない。
- 小説43枚と再生成した車両5枚は `generatedWithAI: true` を持ち、ガチャの説明・画像拡大でAI使用を明記する。小説の人物紹介にも表記する。Battle画像の制作方法は推定せず、公開ゲームの原画像をコピーする。
- 全カード共通の2:3枠内に、画像を `object-fit: contain` で表示する。社員の正方形スプライトはSVGのviewBoxで対象セルを表示し、枠に合わせて引き伸ばさない。SSRの通常キラとURの虹色キラ・光点はCSS疑似要素で重ね、入力を遮らず動き低減設定で停止する。
- 入手済みカードを1回クリック・タップすると、ネイティブ `dialog` で拡大する。Escapeは画像だけを閉じる。未入手画像は開かない。小説サイトへのリンクは作品別 `#characters=` を用いる。
- 志遠の姉の右腕修正版は両サイトで `shion-sister-corrected.png` に変更し、旧キャッシュと区別する。ガチャの読込識別子は `20261011d1`。
- 共通アカウント、Supabase、あにあにコインを使用しない。公開前の演出・コレクション試験として独立させる。

## データ保存方式

### localStorage

- 記事: 2026-09-29以降は使用しない（旧データは削除せず放置）。公式記事は `aniani.js` の `officialArticles`
- 記事コメント: `aniani_article_comments_v1`
- 来訪者コメント: `aniani_guestbook_comments_v1`
- 簡易管理者状態: 2026-09-29に廃止（`aniani_admin_session_v1` は読み書きしない）
- 神経衰弱ランキング: `aniani_memory_rankings_v1`
- 反射神経ベスト: `aniani_reaction_best_v1`
- 無料試験ガチャ所持数: `aniani.trial-gacha.v1.inventory`
- 未確認ガチャ: `aniani.pending-draw.<Supabase user id>`

### Supabase PostgreSQL

- `aniani_profiles`: プロフィール。
- `aniani_wallets`: コイン残高。
- `aniani_ledger`: コイン増減台帳と操作キー。
- `aniani_cards`: カードカタログ。
- `aniani_inventory`: 所持カードと枚数。
- `aniani_daily_claims`: 日本時間日付単位のデイリー受取。
- `aniani_draws`: UUID単位のガチャ結果レシート。
- `aniani_achievements`: 実績定義。
- `aniani_achievement_claims`: 実績受取。
- `aniani_rules`: 報酬額、消費額、レアリティ確率。
- `aniani_private` schema: 認証ユーザー初期化と暗号学的乱数の内部関数。

公開RPC:

- `aniani_bootstrap()`: ユーザー行を初期化し、プロフィール・残高・日本時間日付を返す。
- `aniani_claim_daily(text)`: ログインまたはガチャ1回デイリーを冪等に受け取る。
- `aniani_draw(uuid, integer)`: 1回/10回ガチャを原子的に処理する。
- `aniani_award_achievement(uuid, text)`: service_role専用。現在は全実績が無効。

## 外部サービス

- GitHub Pages: 静的公開。リポジトリ `donadonaa24-cyber/aniani-asobiba`。
- Unity版: `donadonaa24-cyber/battle-a-la-carte-3d` のPages（main/ルート）で紹介、Release `v0.1.0` でWindows ZIPを配布。ポータルへUnityランタイムを埋め込まない。
- Supabase: Auth、PostgreSQL、PostgREST/RPC、RLS。プロジェクト `aniani-common`、Freeプラン。
- Google Fonts: `M PLUS Rounded 1c`、`Shippori Mincho`。
- esm.sh: Supabase JSのES Module配信。
- Google Search Console: meta検証と公開リポジトリ内の確認HTML。
- X、note、Battle a la carte、tumikomi: 外部リンク。Battle公式ホームとtumikomi企業ホームからも本ポータルへ戻れる。
- Firebase: 使用なし。
- SMTP: 未設定。

## MCP利用状況

- アプリ実行時のMCP依存: なし。
- MCPサーバー設定ファイル: プロジェクトルートでは確認できない。
- 開発時にCodexのブラウザ操作を使った記録はあるが、配布コードの依存関係ではない。

## 主要Package・ライブラリ

- package.json / package-lock.json: 開発コマンド管理のみ。外部npm依存なし。
- Node.js `24.19.0`: `.nvmrc` に固定し、CIも同じバージョンを使用。
- Supabase JS `2.57.4`: 未公開ローカル版でCDN動的読込。公開用リポジトリからの読込はなし。
- UIフレームワーク、ゲームエンジン、外部テストフレームワーク: なし。
- テストはNode.jsの標準 `assert`、`vm`、`fs`、`node:test` 等を使用する。

## ビルド・公開方式

- ビルド工程: なし。静的ファイルをそのまま配信する。
- ローカル確認: `npm run dev` でHTTPサーバーを起動する。クラウドのポート公開時は `-- --host 0.0.0.0 --port 3000` を指定。手順は `docs/DEVELOPMENT.md`。
- テスト: `npm test` で構文、既存4テスト、開発サーバー検査。GitHub Actionsも同じコマンドを実行する。
- 公開: cloneしたリポジトリでは作業ブランチをPRでmainへ反映する。従来のPC作業フォルダを使う場合にのみ `.publish-aniani/` へ同期する。mainへの反映と公開は所有者の指示に従う。
- GitHub Pagesの設定詳細（branch/folder）はリポジトリ設定画面で未確認。
- `supabase.txt` は公開対象外。
- Unity版ZIPは既存Windows成果物から作成し、デバッグバックアップ、PDB/MDB、ログを除外。exeとData/DLL等の195ファイル一式をReleasesへ保存する。Unityの再ビルドはこのポータル作業では実施しない。

## 対応状況

- Web/Windowsデスクトップブラウザ: 実装対象。
- Web/Android・iOSブラウザ: レスポンシブ、タッチ、仮想パッド、神経衰弱横向き対応を実装。
- Windowsネイティブ: なし。
- Android APK/AAB: なし。
- iOSアプリ: なし。
- オフライン: ポータル/ミニゲームのローカル素材部分は動作可能性があるが、Service Workerはなく、Supabase、Google Fonts、SDK CDN、外部リンクはオンライン必須。正式なオフライン対応は未確認。

## 重要な依存関係

- `index.html` のID・`data-*` ↔ `aniani.js` / `galaxy.js` / `arcade-layout.js` / `common/portal.js`。
- ミニゲームDOM寸法 ↔ `arcade.css` ↔ `arcade-layout.js` の盤面フィット計算。
- カード/料理画像パス ↔ `aniani.js`、Supabase `aniani_cards.image_path`、`common/portal.js`。
- Supabase RLS・RPC引数 ↔ `common/api.js`。片側だけ変更しない。
- Auth redirect URL ↔ GitHub Pagesの正確な公開URL。
- 架空運輸home導線 ↔ `?view=home`。省略するとスマホ環境でゲーム画面へ直接入る仕様がある。
- 従来のPCローカル版 ↔ `.publish-aniani/`。cloneしたリポジトリではrootがGit作業ツリー。どちらも作業ファイルの編集だけではGitHub Pagesへ反映されない。
