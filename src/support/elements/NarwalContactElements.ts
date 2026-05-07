import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class NarwalContactElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
  }

  getFormTitle(): Locator {
    return this.page.getByText('Receba um atendimento comercial');
  }

  getNameField(): Locator {
    return this.page.locator('input[placeholder*="Nome"]');
  }

  getEmailField(): Locator {
    return this.page.locator('input[placeholder*="E-mail"]');
  }

  getJobField(): Locator {
    return this.page.locator(
      'input[placeholder*="Cargo"], input[name*="cargo"]'
    );
  }

  getPhoneField(): Locator {
    return this.page.locator(
      'input[placeholder*="Telefone"], input[type="tel"]'
    );
  }

  getCompanyField(): Locator {
    return this.page.locator(
      'input[placeholder*="Empresa"]'
    );
  }

  getOperationSelect(): Locator {
    return this.page.locator('select');
  }

  getSendButton(): Locator {
    return this.page.getByRole('button', { name: /enviar|continuar/i });
  }
}