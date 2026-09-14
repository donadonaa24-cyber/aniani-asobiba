# CHANGELOG

確認できたGit履歴、既存文書、今回の作業記録のみを記載する。Git履歴以前の変更は推測しない。

## 2026-09-14

### 追加

- `AGENTS.md` と `docs/` 配下のプロジェクト仕様、現在状態、変更履歴、技術構成を追加。
- 秘密情報ファイルとローカル作業用 `docs/ACTIVE_TASKS.md` を除外する `.gitignore` を追加。

### 変更

- 新しいCodexチャットでは `AGENTS.md` と `docs/CURRENT_STATE.md` を先に読み、必要な文書とソースだけを確認する運用へ統一。
- 標準の5文書をソースコードと同じGitHubリポジトリで管理するルールを追加。
- APIキー、トークン、パスワード、Secret、PC固有情報・絶対パスを文書やGitへ含めない規則を明文化。
- 作業終了時は、実際に影響を受けた文書だけを更新する運用へ整理。

### テスト

- ドキュメントのみの変更のため、フル回帰テストは再実行していない。
- コード、既存README、Supabase migration、テスト、公開用Git履歴との整合を確認。

### Git記録

- `44c102f` Add project documentation management rules

## 2026-09-12

### 追加

- Supabase `aniani-common` に共通プロフィール、ウォレット、コイン台帳、カード、所持カード、デイリー、ガチャ、実績のDB構造を追加。
- ポータルのローカル作業版へ、プレイヤー登録・ログイン・パスワード再設定、共通コイン、デイリー、1回/10回ガチャ、16枚のコレクション図鑑UIを追加。
- `common/api.js`、`common/config.js`、`common/portal.js`、`common/portal.css`、`common.test.cjs`、Supabase migration・検証SQL・READMEを追加。

### 修正

- Supabaseの公開可能キーに欠けていたハイフンを修正し、公開カードAPIへの接続を復旧。
- ガチャのリクエストIDを送信前に端末へ保存し、応答不明時の二重消費を防止。

### 設定変更

- SupabaseのSite URLとリダイレクト許可先をGitHub Pagesの `index.html` に設定。
- Supabase Freeプランを維持。カスタムSMTPは未設定。

### テスト

- RLS、他人データ遮断、直接書込み禁止、デイリー・ガチャの冪等性、残高不足、10連、匿名制限をロールバック付きSQLで確認。
- 共通API、ポータル、ミニゲーム、画面復帰テストを実行し通過。
- ブラウザで公開カード16枚、排出率、匿名ガチャ無効、カード条件、モーダル終了を確認。

## 2026-09-11

### 変更

- 公開済み作品の状態を「公開中＆追加要素可能性あり」に統一。
- Battle a la carteと架空運輸の導線を「ホームページへ」「ウェブ版で遊ぶ」「スマホ版で遊ぶ」に統一。
- ポータル内の積み込みゲーム紹介名を「架空運輸」に変更し、ホームリンクへ `?view=home` を指定。
- 仮想パッドを右下へ移動。テトリスの回転操作とNEXT 2件表示、宇宙背景を調整。
- 落ちものパズルを、解ける配置を生成する8パズルへ置換。

### 修正

- ミニゲーム中の×で一覧へ戻る処理、明示的なホーム復帰ボタン、Fullscreen/cleanup失敗時の復帰を修正。

### テスト

- ポータルリンクテスト、ミニゲームロジックテスト、画面復帰テストを追加・更新。

### Git記録

- `39f7416` Unify game introductions and fix logistics homepage navigation
- `4ff9023` Improve arcade controls and cosmic Tetris; replace falling puzzle with 8 puzzle
- `8204170` Fix arcade exit controls and add explicit return-home action

## 2026-09-09

### 追加

- もぐら、うさぎ、犬、カウボーイの生成画像と生成メモを追加。
- ミニゲームの全画面処理、ビューポートフィット、神経衰弱の横画面フォールバックを追加。
- ミニゲーム自動テストを追加。

### 変更

- 〇×ゲームを9×9・5目並べへ変更。
- テトリスへ次の2ピース表示を追加。
- ミニゲームを全画面固定UIへ調整。

### 修正

- ブロック崩し等で不足していた料理画像素材を復元。

### Git記録

- `084e564` Fix fullscreen mini games, add arcade art and restore missing recipe assets

## 2026-09-07

### 追加

- 独立リポジトリとしてポータル一式をGitへ初回登録。
- `index.html`、ポータル/銀河/アーケード用CSS・JS、README、Google確認HTMLを追加。

### Git記録

- `89490d8` Add files via upload

## 日付不明

### 追加・変更

- Git初回登録以前の制作経緯は確認できないため未記載。
