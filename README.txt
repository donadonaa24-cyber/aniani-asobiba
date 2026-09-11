# あにあにの遊び場（独立リポジトリ版）

このフォルダは、`Battle a la carte` リポジトリと分離して
単独リポジトリで公開できるように調整済みです。

## 使い方
1. 新しいGitHubリポジトリを作成
2. この `aniani-standalone` フォルダの中身を、そのリポジトリ直下へ配置
3. GitHub Pages を有効化して公開

## 調整済み内容
- 画像パスを単独運用向けに修正
- 神経衰弱で使うカード画像・裏面画像を同梱
- Battle a la carte への導線は絶対URLで外部リンク化

## 同梱ファイル
- `index.html`
- `aniani.css`
- `aniani.js`
- `arcade.css`（スマホのミニゲーム一覧・カードサイズ・スクロール調整）
- `galaxy.css`（宇宙ライブラリの表示）
- `galaxy.js`（ゲームソフトの周回・選択操作）
- `images/galaxy-library.png`（生成した銀河背景）
- `images/tumikomi-loading.png`（翠路ロジスティクスの紹介画像）
- `assets/images/card-back.png`
- `assets/images/events/monomono-kokan.png`
- `assets/images/cards/*.png`（材料カード15種）
- `images/*.png`（推し駒battle用画像）

## 2026-09-09 arcade update
- arcade-layout.js: viewport fitting, fullscreen entry/exit and memory landscape fallback.
- arcade.css: fixed game UI and upper-right directional pad; no game scrolling.
- images/arcade-{mole,rabbit,dog,cowboy}.png: generated game artwork.
- 9x9 board uses five-in-a-row rules; Tetris shows two queued pieces.
- Fullscreen/orientation APIs depend on the browser. Unsupported browsers use a viewport layout.
- Publish index.html, aniani.js, arcade.css, arcade-layout.js and the four arcade images together.

## 作品紹介の統一ルール
- このポータルでの積み込みゲームの紹介名は「架空運輸」。リンク先の作品名は変更しない。
- 公開済み作品の状態は「公開中＆追加要素可能性あり」に統一する。未公開作品は公開予定の表記を維持する。
- 公開済み作品には短いゲーム説明を付け、ボタンを「ホームページへ」「ウェブ版で遊ぶ」「スマホ版で遊ぶ」の順にそろえる。
- 今後追加する公開済み作品にも同じルールを適用する。
- 架空運輸のホームページは index.html?view=home。viewを指定しないとスマホでゲームが自動表示されるため、ホーム用の指定を維持する。

## ミニゲーム操作の更新
- 仮想パッドを右下へ配置。閉じるボタンは右上を維持。
- テトリスの回転は右側の大きな専用ボタン。NEXTは上が次、下が2番目。
- テトリスの背景・盤面には既存の銀河画像を使用。
- 落ちものパズルを8パズルに置換。タップ、矢印/WASD、仮想パッドに対応。矢印は空きマスの移動方向。
- シャッフルは必ず解ける配置を生成。やり直すと同じ初期配置に戻る。
