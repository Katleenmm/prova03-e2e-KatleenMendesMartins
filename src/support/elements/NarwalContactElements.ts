import { Page } from '@playwright/test';

export default class NarwalContactElements {
  constructor(private page: Page) {}

  getNameField() {
    return this.page.locator('input[placeholder="Nome *"]');
  }

  getEmailField() {
    return this.page.locator('input[placeholder="Email corporativo *"]');
  }

  getCargoField() {
    return this.page.locator('input[placeholder="Cargo *"]');
  }

  getPhoneField() {
    return this.page.locator('input[placeholder="Telefone *"]');
  }

  getEmpresaField() {
    return this.page.locator('input[placeholder="Empresa *"]');
  }

  getOperacaoDropdown() {
    return this.page.locator('select').first();
  }

  getSubmitButton() {
    return this.page.locator(
      'input[value="Enviar"], button:has-text("Enviar"), input[type="submit"]'
    );
  }
}
