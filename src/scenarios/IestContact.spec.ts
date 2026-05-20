import { expect, test } from '@playwright/test';
import IestContactPage from '../support/pages/IestContactPage';

test.describe('Contato IEST', () => {
  test('Preencher e enviar formulário de contato', async ({ page }) => {
    const iest = new IestContactPage(page);

    await iest.navigate();
    await iest.waitForContactForm();
    await iest.verifyContactSection();

    await iest.fillContactForm({
      name: 'Teste',
      lastName: 'Automático',
      email: 'teste@example.com',
      phone: '(11) 99999-9999',
      message: 'Mensagem enviada via Playwright E2E.'
    });

    await iest.submitForm();
  });

  test('Não deve enviar formulário com campos vazios', async ({ page }) => {
    const iest = new IestContactPage(page);

    await iest.navigate();
    await iest.waitForContactForm();

    await iest.el.getSubmitButton().scrollIntoViewIfNeeded();
    await iest.el.getSubmitButton().click();
    await page.waitForTimeout(3000);

    await expect(iest.el.getNameField()).toBeVisible();
    await expect(iest.el.getEmailField()).toBeVisible();
  });

  test('Não deve enviar formulário sem aceitar a política de privacidade', async ({
    page
  }) => {
    const iest = new IestContactPage(page);

    await iest.navigate();
    await iest.waitForContactForm();

    await iest.fillContactForm(
      {
        name: 'Teste',
        lastName: 'Automático',
        email: 'teste@example.com',
        phone: '(11) 99999-9999',
        message: 'Mensagem enviada via Playwright E2E.'
      },
      false
    );

    await iest.el.getSubmitButton().scrollIntoViewIfNeeded();
    await iest.el.getSubmitButton().click();
    await page.waitForTimeout(3000);

    await expect(iest.el.getPrivacyCheckbox()).toBeVisible();
  });
});
