# GitHub Pages Calculator

HTML / CSS / JavaScript だけで作成した、GitHub Pages でそのまま公開できるシンプルな電卓です。

## 概要

- 四則演算（`+ - × ÷`）
- 小数計算
- `AC` で全消去、`C` で入力クリア、`←` で1文字削除
- 連続計算に対応
- 0除算時は `Error` 表示
- 通貨換算（JPY / USD / EUR / **TWD**）
- キーボード入力対応（数字、`Enter`、`Backspace`、`Delete`、`+ - * / .`）
- スマホ・PC 両対応のレスポンシブUI

## ローカルでの開き方

1. このリポジトリをクローン
2. `index.html` をブラウザで直接開く

```bash
# 例
open index.html
```

## GitHub Pages での公開方法

1. GitHub に push
2. リポジトリの **Settings** > **Pages** を開く
3. **Build and deployment** の **Source** で `Deploy from a branch` を選択
4. Branch は公開したいブランチ（例: `main`）、フォルダは `/ (root)` を選択
5. Save 後、表示されたURLで公開確認

## ファイル構成

- `index.html` : 画面構造、電卓ボタン、通貨換算UI
- `style.css` : レイアウトと見た目（レスポンシブ対応）
- `script.js` : 電卓ロジック、通貨換算ロジック、キーボード操作
