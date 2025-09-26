import { test, expect } from '@playwright/test';
import { WebAppPage } from '../../pageobjects/webapp-page';

test.describe('Localhost:8082 - Web App (EJS + Express)', () => {

  let app: WebAppPage;
  let consoleErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    app = new WebAppPage(page);
    consoleErrors = [];
    // ページの console.error を収集
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    await app.goto();
  });

  test('TC-001 ページの表示確認', async ({ page }) => {
    // タイトル確認
    await expect(page).toHaveTitle('Web App with EJS + Express');

    // 見出しとフッター確認
    await app.assertLoaded();
    const footerText = await app.getFooterText();
    expect(footerText).toBeTruthy();
    expect(footerText?.toLowerCase()).toContain('copyright');
  });

  test('TC-002 ナビゲーションリンクの存在と遷移先確認_Home', async ({ page }) => {
    await app.gotoHome();
    await expect(page).toHaveURL(/\/$/);
    await expect(page).toHaveScreenshot('GoToHome.png',
      { maxDiffPixelRatio: 0.05 , mask: [app.entriesList] } // ナビゲーション部分はマスクする
    );
  });

  test('TC-002 ナビゲーションリンクの存在と遷移先確認_About', async ({ page }) => {
    await app.gotoAbout();
    await expect(page).toHaveURL(/\/about$/);
  });

  test('TC-002 ナビゲーションリンクの存在と遷移先確認_Services', async ({ page }) => {
    await app.gotoServices();
    await expect(page).toHaveURL(/\/services$/);
  });

  test('TC-002 ナビゲーションリンクの存在と遷移先確認_Portfolio', async ({ page }) => {
    await app.gotoPortfolio();
    await expect(page).toHaveURL(/\/portfolio$/);
  });

  test('TC-002 ナビゲーションリンクの存在と遷移先確認_Contact', async ({ page }) => {
    await app.gotoContact();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test('TC-003 投稿（新規エントリ）機能 — 正常系', async ({ page }) => {
    // 投稿前の項目数
    const before = await app.getEntriesCount();

    // 投稿実行
    const content = 'テスト投稿';
    await app.fillInput(content);
    await app.submit();

    // 投稿されたテキストが存在すること
    const posted = page.getByText(content).first();
    await expect(posted).toBeVisible();

    // 項目数が増えていること（実装によってはサーバ側永続化の影響で数え方が変わる点に注意）
    const after = await app.getEntriesCount();
    await expect(after).toBeGreaterThanOrEqual(before + 1);
  });

  test('TC-004 投稿ボタンの非破壊性（空入力）', async ({ page }) => {
    // 空入力で投稿を試みる（実装依存のため、UIが壊れないことを確認）
    const before = await app.getEntriesCount();
    await app.submit(); // 空文字を送る
    // ページがクラッシュしていないこと、見出しが見えることを確認
    await app.assertLoaded();
    const after = await app.getEntriesCount();
    // 空入力が追加される仕様でない限り、件数は増えないことを期待（実装依存）
    await expect(after).toBeGreaterThanOrEqual(before);
  });

  test('TC-005 見出しのセマンティック確認', async ({ page }) => {
    // h1 が正しいテキストで存在すること
    const h1 = page.locator('h1', { hasText: 'Web Application EJS + Express' }).first();
    await expect(h1).toBeVisible();
  });

  test('TC-006 リソース読み込みエラーの検出', async ({ page }) => {
    // 少し待ってリソース読み込みが落ち着くのを待つ
    await page.waitForTimeout(500);

    // "Failed to load resource" や 404 を含むエラーメッセージがないこと
    const problematic = consoleErrors.filter(e => /Failed to load resource|404/i.test(e));
    expect(problematic.length).toBe(0);
  });
});
