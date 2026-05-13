import { Page, expect } from '@playwright/test';
import NarwalContactElements from '../elements/NarwalContactElements';

export default class NarwalContactPage {
  readonly el: NarwalContactElements;

  constructor(private page: Page) {
    this.el = new NarwalContactElements(page);
  }

  async navigate() {
    await this.page.goto('https://www.narwalsistemas.com.br/contato/', {
      waitUntil: 'domcontentloaded'
    });
  }

  async waitForContactForm() {
    await this.el.getNameField().waitFor({ state: 'visible', timeout: 20000 });
  }

  async verifyContactSection() {
    await expect(this.el.getNameField()).toBeVisible();
    await expect(this.el.getEmailField()).toBeVisible();
    await expect(this.el.getCargoField()).toBeVisible();
    await expect(this.el.getPhoneField()).toBeVisible();
    await expect(this.el.getEmpresaField()).toBeVisible();
    await expect(this.el.getOperacaoDropdown()).toBeVisible();
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    cargo: string;
    phone: string;
    empresa: string;
    operacao?: string;
  }) {
    await this.el.getNameField().fill(data.name);
    await this.el.getEmailField().fill(data.email);
    await this.el.getCargoField().fill(data.cargo);
    await this.el.getPhoneField().fill(data.phone);
    await this.el.getEmpresaField().fill(data.empresa);

    if (data.operacao) {
      await this.el
        .getOperacaoDropdown()
        .selectOption({ label: data.operacao });
    }
  }

  async submitForm() {
    // Fechar o chat do Leadster se estiver aberto
    const chatCloseButton = this.page
      .locator(
        '[class*="close"], [aria-label*="fechar"], [aria-label*="close"]'
      )
      .first();
    const chatVisible = await chatCloseButton.isVisible().catch(() => false);
    if (chatVisible) {
      await chatCloseButton.click();
      await this.page.waitForTimeout(500);
    }

    // Scroll até o botão e clicar
    const submitBtn = this.el.getSubmitButton();
    await submitBtn.scrollIntoViewIfNeeded();
    await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
    await submitBtn.click();

    await this.page.waitForTimeout(3000);
  }
}
