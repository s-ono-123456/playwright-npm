import { expect, type Locator, type Page } from '@playwright/test';

export class GoogleComPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly voiceSearchButton: Locator;
  readonly imageSearchButton: Locator;
  readonly googleSearchButton: Locator;
  readonly luckyButton: Locator;
  readonly gmailLink: Locator;
  readonly imagesLink: Locator;
  readonly aiModeLink: Locator;
  readonly appsButton: Locator;
  readonly signInLink: Locator;
  readonly aboutLink: Locator;
  readonly settingsButton: Locator;
  readonly privacyLink: Locator;
  readonly termsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // Header / brand
    this.logo = page.locator('img[alt="Google"]');

    // Main search input (Google uses name="q")
    this.searchInput = page.locator('[name="q"]');

    // Search related buttons
    this.voiceSearchButton = page.locator('button', { hasText: '音声で検索' });
    this.imageSearchButton = page.locator('button', { hasText: '画像で検索' });
    this.googleSearchButton = page.locator('button', { hasText: 'Google 検索' });
    this.luckyButton = page.locator('button', { hasText: "I'm Feeling Lucky" });

    // Top links
    this.gmailLink = page.locator('a', { hasText: 'Gmail' });
    this.imagesLink = page.locator('a', { hasText: '画像' });
    this.aiModeLink = page.locator('a', { hasText: 'AI モード' });

    // Other header/footer controls
    this.appsButton = page.locator('button', { hasText: 'Google アプリ' });
    this.signInLink = page.locator('a', { hasText: 'ログイン' });
    this.aboutLink = page.locator('a', { hasText: 'Googleについて' });
    this.settingsButton = page.locator('button', { hasText: '設定' });

    // Footer links
    this.privacyLink = page.locator('a', { hasText: 'プライバシー' });
    this.termsLink = page.locator('a', { hasText: '規約' });
  }

  async goto() {
    await this.page.goto('https://google.com');
  }

  /**
   * Perform a search by typing the query and pressing Enter.
   * Awaits navigation to a results page (URL containing '/search').
   */
  async search(query: string) {
    await this.searchInput.fill(query);
    // Press Enter to submit the search reliably
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/\/search/);
  }

  /**
   * Click the "Google 検索" button. Some Google variants hide the button
   * until input interaction; this method clicks and waits for results.
   */
  async clickGoogleSearch() {
    await this.googleSearchButton.first().click();
    await this.page.waitForURL(/\/search/);
  }

  /**
   * Click the "I'm Feeling Lucky" button.
   * This often navigates directly to the top result.
   */
  async clickImFeelingLucky() {
    await this.luckyButton.first().click();
  }

  async openGmail() {
    await this.gmailLink.first().click();
  }

  async openImages() {
    await this.imagesLink.first().click();
  }

  async openAIMode() {
    await this.aiModeLink.first().click();
  }

  async openApps() {
    await this.appsButton.first().click();
  }

  async signIn() {
    await this.signInLink.first().click();
  }

  async openAbout() {
    await this.aboutLink.first().click();
  }

  async openSettings() {
    await this.settingsButton.first().click();
  }

  async openPrivacy() {
    await this.privacyLink.first().click();
  }

  async openTerms() {
    await this.termsLink.first().click();
  }
}
