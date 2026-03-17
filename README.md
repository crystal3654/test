# 電卓アプリ（GitHub Pages対応）

ブラウザ上で動作する、シンプルな電卓です。HTML / CSS / JavaScript のみで構成しているため、GitHub Pages にそのまま公開できます。

## 機能

- 数字入力（0〜9）
- 小数点入力（重複防止）
- 四則演算（`+ - × ÷`）
- `=` で計算
- `AC` で全消去
- `←` で1文字削除
- 連続計算（例: `2 + 3 + 4 =`）
- 0除算時は `Error` 表示
- キーボード対応（数字、`Enter`、`Backspace`、`Delete`、`+ - * / .`）

## ファイル構成

- `index.html` : 画面構造
- `style.css` : レイアウトとデザイン
- `script.js` : 電卓ロジックとイベント処理

## ローカルでの開き方

最も簡単なのは、リポジトリ直下で静的サーバーを起動する方法です。

```bash
python -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いて確認してください。

## GitHub Pagesでの公開方法

1. このリポジトリの `Settings` → `Pages` を開く
2. `Build and deployment` の `Source` を `Deploy from a branch` に設定
3. 公開ブランチ（例: `main`）とフォルダ（`/(root)`）を選択して保存
4. 数分後、表示されたURLにアクセスして公開状態を確認
