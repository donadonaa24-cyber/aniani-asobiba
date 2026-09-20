# ARCHITECTURE

最終確認日: 2026-09-16

## 全体構成

このプロジェクトは、ビルド工程を持たない静的Webアプリケーションである。`index.html` を入口に、通常のscript、ES Module、CSS、画像をブラウザが直接読み込む。共通アカウント部分だけSupabaseへ通信する。

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
| `trial-gacha-data.js` | 81枚の公開用カードカタログ、排出率、生成スプライト位置 |
| `trial-gacha.js` | 無料10連抽選、1枚ずつの状態遷移、スキップ、Web Audio効果音、端末内所持数、図鑑表示 |
| `common/portal.css` | 共通アカウント、ウォレット、ガチャ、カード図鑑 |
| `aniani.js` | モーダル、localStorage、記事/コメント、8ミニゲームのロジック |
| `galaxy.js` | 登録作品数に応じた円軌道と総件数表示、選択、スワイプ、キーボード、モーション軽減 |
| `arcade-layout.js` | ミニゲーム開始/終了、Fullscreen、画面向き、盤面サイズ調整、ホーム復帰 |
| `common/portal.js` | Supabase Auth、デイリー、ガチャ、図鑑、セッションUI、通信中ガード |
| `common/api.js` | 公開/認証REST・RPCクライアント、20秒タイムアウト |
| `common/config.js` | Supabase URLと公開可能キーのみ |
| `supabase/migrations/001_common.sql` | 共通DBの初期schema、RLS、RPC、初期カード・実績 |
| `supabase/verify.sql` | ロールバック前提のRLS・報酬・ガチャ統合検証 |

## 主要フォルダ

- `assets/images/`: Battle a la carte由来のカード、料理、イベント、キャラクター等の画像。
- `images/`: 銀河背景、架空運輸紹介画像、推し駒battle画像、ミニゲーム生成画像。
- `images/gacha/`: 画像生成した架空運輸の車両5種スプライトと新規社員30名スプライト。
- `common/`: 共通アカウント・コイン・ガチャ・図鑑のフロントエンド。
- `supabase/`: DB migration、検証SQL、運用記録。
- `docs/`: Codex向け正式仕様、現在状態、変更履歴、技術構成。
- `.publish-aniani/`: GitHub Pagesへpushする独立Git作業ツリー。ローカル開発ルートとは別管理。
- `.publish-battle-3d/`: Unity版専用の紹介・配布リポジトリ作業ツリー。Unityソース一式は含まない。
- `release-artifacts/`: ローカル配布ZIP。ポータルのGit管理対象外。
- `images/battle-3d.png`: Unity版の実際の対戦画面を紹介する画像。
- `assets/images/積み込みゲーム/`: 別作品「翠路ロジスティクス」の同梱ソース。独自のHTML/CSS/JS/Nodeサーバー/テスト/データを持つが、ポータルはこのコピーを起動せず、公開済み `tumikomi` へ外部リンクする。

## システム間の役割

### ポータル・モーダル

- `[data-modal-target]` と `.modal-section` を `aniani.js` が結び付ける。
- 開いているモーダルは `.is-open` と `aria-hidden` で管理する。
- `galaxy.js` は作品ケースの `data-orbit`、`data-title`、`data-status`、`data-description` を表示へ反映する。

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

- `trial-gacha-data.js` の配列がカード追加の単一入口。Battle a la carteと架空運輸のカードを作品・カテゴリ・レアリティで管理する。
- 抽選はクライアント完結。先にレアリティをC 60% / SR 25% / SSR 10% / UR 5%で選び、同レアリティのカードから1枚を選ぶ。
- 下部コンソールドックの `[data-modal-target="trial-gacha"]` だけを入口にし、ゲームケースが回る軌道中央にはDOM要素を置かない。
- コイン投入、銀河回転、ホワイトアウト、通常カード公開、UR流れ星、UR台詞、UR公開、結果一覧を `data-phase` で切り替える。途中スキップは未公開分を含む10枚を一度だけ端末内所持へ加算する。
- URキャラクター画像は `assets/images/battle-mode-cutins/` の4画像を使用する。URカードはすべて決め台詞データを持つ。
- 共通アカウント、Supabase、あにあにコインを使用しない。公開前の演出・コレクション試験として独立させる。

## データ保存方式

### localStorage

- 記事: `aniani_articles_v2`
- 記事コメント: `aniani_article_comments_v1`
- 来訪者コメント: `aniani_guestbook_comments_v1`
- 簡易管理者状態: `aniani_admin_session_v1`
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

- package.json / npm依存: なし。
- Supabase JS `2.57.4`: CDN動的読込。
- UIフレームワーク、ゲームエンジン、テストフレームワーク: なし。
- テストはNode.jsの標準 `assert`、`vm`、`fs` 等を使用する。

## ビルド・公開方式

- ビルド工程: なし。静的ファイルをそのまま配信する。
- ローカル確認: HTTPサーバーを起動して `index.html` を開く。共通機能は `file://` 不可。
- 公開: 必要ファイルを `.publish-aniani/` に反映し、同Gitリポジトリの `main` をGitHubへpushする。
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
- 公開版 ↔ `.publish-aniani/`。ルート編集だけではGitHub Pagesへ反映されない。
