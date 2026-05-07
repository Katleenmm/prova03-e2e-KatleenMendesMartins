import { test, expect } from '@playwright/test';
import NarwalContactPage from '../support/pages/NarwalContactPage';

test.describe('Contato Narwal', () => {

  let narwalContactPage: NarwalContactPage;

  test.beforeEach(async ({ page }) => {

    narwalContactPage = new NarwalContactPage(page);

    await narwalContactPage.goto();
  });

  test('Enviar formulário de contato na página Narwal', async ({ page }) => {

    await narwalContactPage.verifyContactSection();

    await narwalContactPage.fillContactForm({
      name: 'Teste Narwal',
      email: 'teste.narwal@example.com',
      job: 'Analista de Comércio Exterior',
      phone: '48999999999',
      company: 'Empresa de Teste',
      operation: 'Importação',
    });

    await narwalContactPage.submitForm();

    await page.waitForTimeout(5000);

    await expect(page).toHaveURL(/narwalsistemas/i);
  });
});