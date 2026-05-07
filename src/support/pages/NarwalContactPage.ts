import { Page, expect } from '@playwright/test';
import NarwalContactElements from '../elements/NarwalContactElements';
import BasePage from './BasePage';

export default class NarwalContactPage extends BasePage {
  readonly contactElements: NarwalContactElements;

  constructor(readonly page: Page) {
    super(page);
    this.contactElements = new NarwalContactElements(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.narwalsistemas.com.br/#contato');

    await this.page.waitForLoadState('networkidle');

    await expect(
      this.contactElements.getNameField()
    ).toBeVisible({ timeout: 20000 });
  }

  async verifyContactSection(): Promise<void> {
    await expect(
      this.contactElements.getNameField()
    ).toBeVisible();

    await expect(
      this.contactElements.getEmailField()
    ).toBeVisible();
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    job: string;
    phone: string;
    company: string;
    operation: string;
  }): Promise<void> {

    await this.contactElements
      .getNameField()
      .first()
      .fill(data.name);

    await this.contactElements
      .getEmailField()
      .first()
      .fill(data.email);

    const jobField = this.contactElements.getJobField();

    if (await jobField.count()) {
      await jobField.first().fill(data.job);
    }

    await this.contactElements
      .getPhoneField()
      .first()
      .fill(data.phone);

    await this.contactElements
      .getCompanyField()
      .first()
      .fill(data.company);

    const select = this.contactElements.getOperationSelect();

    if (await select.count()) {
      await select.first().selectOption({ index: 1 });
    }
  }

  async submitForm(): Promise<void> {
    const button = this.contactElements.getSendButton().first();

    await button.scrollIntoViewIfNeeded();

    await button.click();
  }
}