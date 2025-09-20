import { expect, type Locator, type Page } from '@playwright/test';

/**
 * Page Object for the sample Web App served at http://localhost:8082/
 *
 * ページ構造（playwright-mcp のスナップショットに基づく）:
 * - ナビゲーション: Home, About, Services, Portfolio, Contact
 * - メイン見出し: "Web Application EJS + Express"
 * - テキスト入力（textbox）とボタン "投稿"
 * - 投稿一覧（list）
 * - フッターの著作権文
 *
 * 使い方（例）:
 * const pageObj = new WebAppPage(page);
 * await pageObj.goto();
 * await pageObj.assertLoaded();
 * await pageObj.fillInput('テスト投稿');
 * await pageObj.submit();
 */
export class WebAppPage {
  readonly page: Page;

  // Navigation
  readonly nav: Locator;
  readonly homeLink: Locator;
  readonly aboutLink: Locator;
  readonly servicesLink: Locator;
  readonly portfolioLink: Locator;
  readonly contactLink: Locator;

  // Main
  readonly heading: Locator;
  readonly input: Locator;
  readonly submitButton: Locator;
  readonly entriesList: Locator;

  // Footer
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;

    // ナビゲーション周り：nav を起点に各リンクを取得
    this.nav = page.locator('nav, header nav, .banner nav');
    this.homeLink = this.nav.locator('a', { hasText: 'Home' });
    this.aboutLink = this.nav.locator('a', { hasText: 'About' });
    this.servicesLink = this.nav.locator('a', { hasText: 'Services' });
    this.portfolioLink = this.nav.locator('a', { hasText: 'Portfolio' });
    this.contactLink = this.nav.locator('a', { hasText: 'Contact' });

    // メイン領域
    this.heading = page.locator('h1', { hasText: 'Web Application EJS + Express' });
    // スナップショットでは「textbox」とあるため input または textarea を想定
    this.input = page.locator('input[type="text"], textarea, input'); 
    this.submitButton = page.locator('button', { hasText: '投稿' });

    // 投稿一覧（list）: 汎用的に main 内の list を指すセレクタ
    this.entriesList = page.locator('main ul, main .list, article ul, ul');

    // フッターの著作権文
    this.footer = page.locator('footer, [role="contentinfo"], .footer, footer p');
  }

  // ページを開く
  async goto() {
    await this.page.goto('http://localhost:8082/');
    await this.assertLoaded();
  }

  // ページが読み込まれているか確認（見出しを目印にする）
  async assertLoaded(timeout = 5000) {
    await expect(this.heading).toBeVisible({ timeout });
  }

  // ナビゲーション操作（汎用）
  async clickNav(name: 'Home' | 'About' | 'Services' | 'Portfolio' | 'Contact') {
    const locator = this.nav.locator('a', { hasText: name });
    await locator.click();
  }

  // 個別のナビゲーション用ヘルパー
  async gotoHome() {
    await this.clickNav('Home');
  }

  async gotoAbout() {
    await this.clickNav('About');
  }

  async gotoServices() {
    await this.clickNav('Services');
  }

  async gotoPortfolio() {
    await this.clickNav('Portfolio');
  }

  async gotoContact() {
    await this.clickNav('Contact');
  }

  // 入力欄に文字を入力する（既存のテキストをクリアしてから入力）
  async fillInput(text: string) {
    await this.input.first().fill(text);
  }

  // 投稿ボタンを押す。text を渡すと先に入力してから送信する
  async submit(text?: string) {
    if (text !== undefined) {
      await this.fillInput(text);
    }
    await this.submitButton.first().click();
    // サーバサイドで処理されて一覧に追加される想定のため、一覧が表示されることを待つ
    await expect(this.entriesList.first()).toBeVisible();
  }

  // フッターのテキストを取得
  async getFooterText(): Promise<string | null> {
    return await this.footer.first().textContent();
  }

  // 投稿一覧の項目数を返す（テストのアサーションに利用）
  async getEntriesCount(): Promise<number> {
    return await this.entriesList.first().locator('li').count();
  }

  // 現在ページの URL を返す（補助）
  async currentUrl(): Promise<string> {
    return this.page.url();
  }
}
