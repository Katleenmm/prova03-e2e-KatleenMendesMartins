import { Page, expect } from '@playwright/test';
import IestContactElements from '../elements/IestContactElements';

export default class IestContactPage {
  readonly el: IestContactElements;

  constructor(private page: Page) {
    this.el = new IestContactElements(page);
  }

  async navigate() {
    await this.page.goto('https://www.iestgroup.com.br/contato', {
      waitUntil: 'domcontentloaded'
    });

    const acceptCookies = this.page.locator(
      'button:has-text("Aceitar cookies")'
    );
    await acceptCookies
      .waitFor({ state: 'visible', timeout: 8000 })
      .catch(() => {});
    const cookiesVisible = await acceptCookies.isVisible().catch(() => false);
    if (cookiesVisible) {
      await acceptCookies.click();
      await this.page.waitForTimeout(500);
    }
  }

  async waitForContactForm() {
    await this.el.getNameField().waitFor({ state: 'visible', timeout: 20000 });
  }

  async verifyContactSection() {
    await expect(this.el.getNameField()).toBeVisible();
    await expect(this.el.getLastNameField()).toBeVisible();
    await expect(this.el.getEmailField()).toBeVisible();
    await expect(this.el.getPhoneField()).toBeVisible();
    await expect(this.el.getMessageField()).toBeVisible();
    await expect(this.el.getPrivacyCheckbox()).toBeVisible();
    await expect(this.el.getSubmitButton()).toBeVisible();
  }

  async fillContactForm(
    data: {
      name: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
    },
    acceptPrivacy = true
  ) {
    await this.el.getNameField().fill(data.name);
    await this.el.getLastNameField().fill(data.lastName);
    await this.el.getEmailField().fill(data.email);
    await this.el.getPhoneField().fill(data.phone);
    await this.el.getMessageField().fill(data.message);
    if (acceptPrivacy) {
      await this.el.getPrivacyCheckbox().check();
    }
  }

  async submitForm() {
    const submitBtn = this.el.getSubmitButton();
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
    await submitBtn.click();

    await Promise.race([
      this.page.waitForSelector('[role="alert"]', { timeout: 15000 }),
      this.page.waitForSelector('[class*="success"]', { timeout: 15000 }),
      this.page.waitForSelector('[class*="wpcf7"]', { timeout: 15000 }),
      this.page.waitForSelector('text=Obrigado', { timeout: 15000 }),
      this.page.waitForSelector('text=enviado', { timeout: 15000 })
    ]);

    await this.page.waitForTimeout(7000);
  }
}
