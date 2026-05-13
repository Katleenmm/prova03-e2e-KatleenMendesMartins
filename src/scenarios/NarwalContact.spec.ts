import { test } from '@playwright/test';
import NarwalContactPage from '../support/pages/NarwalContactPage';

test.describe('Contato Narwal', () => {
  test('Preencher e enviar formulário de contato', async ({ page }) => {
    const narwal = new NarwalContactPage(page);

    await narwal.navigate();
    await narwal.waitForContactForm();
    await narwal.verifyContactSection();

    await narwal.fillContactForm({
      name: 'Teste Automático',
      email: 'teste@example.com',
      cargo: 'Analista',
      phone: '(48) 99999-9999',
      empresa: 'Empresa Teste',
      operacao: 'Importação'
    });

    await narwal.submitForm();
  });
});
