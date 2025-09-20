# Playwright NPM サンプル

Playwright の基本的な使い方を示すサンプルコードです。

## 事前準備

Node.js と npm がインストールされていることを確認してください。
Node.js のインストール方法については、[公式サイト](https://nodejs.org/)を参照してください。

## インストール
1. このリポジトリをクローンします。

    ```bash
    git clone https://github.com/s-ono-123456/playwright-npm.git
    cd playwright-npm
    ```

2. 依存関係をインストールします。

    ```bash
    npm install
    ```
3. Playwright のブラウザバイナリをインストールします。

    ```bash
    npx playwright install
    ```

## 使い方
1. サンプルコードを実行します。

    ```bash
    npx playwright test
    ```

2. テスト結果のレポートを表示します。
    ```bash
    npx playwright show-report
    ```

## サンプルアプリの起動
1. サンプルアプリは以下コマンドで起動します。

    ```bash
    node sample-app/app.js
    ```

2. 以下URLにアクセスします。

    ```bash
    localhost:8082
    ```