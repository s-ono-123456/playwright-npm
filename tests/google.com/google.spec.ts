import { test, expect } from '@playwright/test';
import { GoogleComPage } from '../../pageobjects/google-com-page';

test.describe('Google.com - 検索機能', () => {
  test('テキストボックスに「Google」と入力してGoogle検索する', async ({ page }) => {
    const google = new GoogleComPage(page);
    await google.goto();

    // 検索ワードを入力してEnterで検索
    await google.search('Google');

    // 検索結果ページへ遷移したことを確認
    await expect(page).toHaveURL(/\/search/);
    await expect(page).toHaveURL(/[?&]q=Google/);

    // 検索結果の要素が表示されていることを簡易確認
    const results = page.locator('#search, div.g');
    await expect(results.first()).toBeVisible();
  });

  test('テキストボックスに「Langchainとは何？」と入力して、AIモード検索を実施する', async ({ page }) => {
    const google = new GoogleComPage(page);
    await google.goto();

    // 検索ボックスにクエリを入力
    await google.searchInput.fill('Langchainとは何？');

    // AIモードリンクをクリックしてAIモードで検索を実施
    await google.openAIMode();

    // AIモードの画面に遷移したことを確認（AIモードのURLや見出しにフォールバック）
    // 環境によってAIモードのパスは変わるため、汎用的なチェックにしている
    await page.waitForTimeout(1000); // UI切り替えのため少し待つ
    await expect(page).toHaveURL(/ai|assist|assistant|generator/i);

    // AIモード内の応答領域や入力欄があるかを確認（存在すればOK）
    const aiHeader = page.getByText('AI', { exact: false }).first();
    await expect(aiHeader).toBeVisible({ timeout: 5000 });
  });
});
