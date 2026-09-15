# AGENTS.md

## このプロジェクトについて

- 名称: あにあにの遊び場（ANIANI PLAYGROUND PORTAL）。
- あにあに制作ゲームの紹介、外部ゲームへの導線、8種類のミニゲーム、更新記事、コメント、共通アカウント・コイン・カード図鑑をまとめるWebポータル。
- ポータル本体はUnityゲームではない。HTML/CSS/JavaScriptによる静的サイトで、Scene、Prefab、C#、Unity Packageは存在しない。
- 公開先: `https://donadonaa24-cyber.github.io/aniani-asobiba/`（GitHub Pages）。
- 公開用Git作業ツリーは `.publish-aniani/`。プロジェクトルート自体はGitリポジトリではない。

## 作業開始時に読むもの

1. `AGENTS.md`（本ファイル）
2. `docs/CURRENT_STATE.md`（公開版との差、未完了、既知の問題）
3. 今回の作業に必要な文書とソースコードだけを確認する。

- 仕様変更時: `docs/PROJECT_SPEC.md`
- 技術構成・依存関係の変更時: `docs/ARCHITECTURE.md`
- 過去の変更経緯が必要な時: `docs/CHANGELOG.md`
- 無関係なファイルやプロジェクト全体を、毎回再解析しない。

参照先:

- 正式仕様: `docs/PROJECT_SPEC.md`
- 現在状態: `docs/CURRENT_STATE.md`
- 変更履歴: `docs/CHANGELOG.md`
- 技術構成: `docs/ARCHITECTURE.md`
- 共通アカウントDB: `supabase/README.md`
- ポータル運用メモ: `README.txt`

## ドキュメントのGit管理

- `AGENTS.md`、`docs/PROJECT_SPEC.md`、`docs/CURRENT_STATE.md`、`docs/CHANGELOG.md`、`docs/ARCHITECTURE.md` はソースコードと同じGitHubリポジトリで管理する。
- `docs/ACTIVE_TASKS.md` は複数Codexチャットの並行作業用の一時ファイルであり、原則ローカル専用としてGitへ追加しない。
- ドキュメント内のファイルパスは、原則としてプロジェクトルートからの相対パスを使う。
- 公開用Git作業ツリーへ反映する際は、上記5文書も同期対象に含める。

## 主要技術

- HTML5 / CSS3 / Vanilla JavaScript（ビルド工程なし）
- Canvas 2D、Fullscreen API、Screen Orientation API、Web Audio API（一部の同梱作品）
- ブラウザ `localStorage`
- Supabase Auth / PostgreSQL / PostgREST RPC / RLS
- `@supabase/supabase-js@2.57.4` を `esm.sh` から動的読込
- GitHub Pages
- Node.js標準機能による `.cjs` テスト

## 重要な禁止事項

- Supabaseを有料プランへ変更しない。有料アドオンや課金サービスも、所有者の明示承認なしに契約しない。
- APIキー、アクセストークン、パスワード、秘密鍵、Firebase/Supabase等のSecret、その他の認証情報をドキュメントやGitへ記載・追加しない。
- `supabase.txt` や `.env` 等の認証情報ファイルをGitへ追加しない。必要がない限り内容も読み取らない。
- PCユーザー名などの個人情報や、PC固有の絶対パスをドキュメントへ記載しない。
- 適用済みの `supabase/migrations/001_common.sql` を同じDBへ再実行しない。
- メール確認を安易に無効化しない。一般公開前に無料で使える配信方法またはOAuth方式を所有者と決める。
- クライアントから送られたゲームクリア情報を信用して報酬を付与しない。
- `Battle a la carte`、`架空運輸`のURL、公開状態表記、紹介名を根拠なく変えない。
- 天涯比隣に関するリンク・文章を再追加しない。現時点では実装対象外。
- ポータル内の紹介名は「架空運輸」。リンク先作品内の正式名は変更しない。
- Unity版（3D版）は既存Web版とは別作品。作品順はWeb版、Unity版、架空運輸、推し駒battle、混ぜるな危険。
- Unity版は `battle-a-la-carte-3d` リポジトリのWindows ZIP配布。WebGL未提供のため、ブラウザからexeを起動する導線を作らない。
- 既存機能、スマホ表示、ミニゲームの終了・ホーム復帰導線を壊さない。
- 推測で仕様を追加・変更しない。不明点は「未確認」として所有者に確認する。
- `.publish-aniani/` へコピーまたはpushする前に、ローカル版との差と秘密情報の混入を確認する。

## テスト方針

- 小規模修正では変更箇所に関連するテストだけを実行する。
- 大規模更新またはリリース前だけ、次のフル回帰テストを実行する。
  `node common.test.cjs`
  `node arcade.test.cjs`
  `node arcade-layout.test.cjs`
  `node portal.test.cjs`
- JS変更時は対象ファイルへ `node --check <file>` も実行する。
- UI変更はPC幅とスマホ幅を確認する。実機未確認なら「実機確認済み」と書かない。
- Supabase検証は `supabase/verify.sql` を参照する。これはロールバック前提であり、本番データを作らない。

## 実装上の注意

- `index.html` のIDと `data-*` 属性はJS/CSS/テストから参照されるため、変更時は全参照を検索する。
- ミニゲームは右側タブから開始し、開始後は全画面または全画面相当の固定UIになる。
- ミニゲームの×はゲーム一覧へ戻り、`← ホームへ戻る` はポータルへ戻る。
- 方向入力は矢印キーと `W=上 / D=右 / S=下 / A=左`。仮想パッドは左下、テトリス回転・1段下降は右下。開始操作は共通デッキ内。
- `file://` ではES Modulesと認証が正常動作しないため、共通機能の確認はHTTPサーバー経由で行う。
- 記事・コメント・ゲストブック・ミニゲーム記録は現在ブラウザ端末内保存であり、他ユーザーと共有されない。
- `assets/images/積み込みゲーム/` は別作品の同梱ソース。ポータルの主要ランタイムと混同しない。

## 作業完了時

1. 実装とドキュメントの矛盾を確認する。
2. 開発状態が変わった場合は `docs/CURRENT_STATE.md` を現在状態へ更新する。
3. 記録すべき変更がある場合は `docs/CHANGELOG.md` に実際の変更と日付を追記する。
4. 仕様変更時だけ `docs/PROJECT_SPEC.md` を更新する。
5. 技術構成変更時だけ `docs/ARCHITECTURE.md` を更新する。
6. 参照先・禁止事項・作業規則の変更時だけ `AGENTS.md` を更新する。
7. 変更していない内容を、文書更新のためだけに書き直さない。
8. 公開を依頼された場合だけ、必要なテスト後に `.publish-aniani/` へ反映しGitHubへpushする。
