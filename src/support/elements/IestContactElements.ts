import { Page } from '@playwright/test';

export default class IestContactElements {
  constructor(private page: Page) {}

  getNameField() {
    return this.page.locator('input[placeholder="Seu nome"]');
  }

  getLastNameField() {
    return this.page.locator('input[placeholder="Seu sobrenome"]');
  }

  getEmailField() {
    return this.page.locator('input[placeholder="seuemail@email.com"]');
  }

  getPhoneField() {
    return this.page.locator('input[placeholder="(00) 00000-0000"]');
  }

  getMessageField() {
    return this.page.locator('textarea').first();
  }

  getPrivacyCheckbox() {
    return this.page.locator('input[type="checkbox"]').first();
  }

  getSubmitButton() {
    return this.page.locator(
      'button:has-text("ENVIAR"), input[type="submit"][value*="ENVIAR"]'
    );
  }
}
