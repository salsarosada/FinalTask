const credentials = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
  { username: 'error_user', password: 'secret_sauce' },
  { username: 'visual_user', password: 'secret_sauce' }
];

describe('Swag Labs Login Tests', () => {
  beforeEach(async () => {
    await browser.url('https://www.saucedemo.com/');
  });

  it('UC-1: Login with empty credentials', async () => {
    await $('#user-name').setValue('someUser');
    await $('#password').setValue('somePass');
    await $('#user-name').clearValue();
    await $('#password').clearValue();
    await $('#login-button').click();
    const error = await $('.error-message-container').getText();
    expect(error).toContain('Username is required');
  });

  it('UC-2: Login with missing password', async () => {
    await $('#user-name').setValue('someUser');
    await $('#password').setValue('somePass');
    await $('#password').clearValue();
    await $('#login-button').click();
    const error = await $('.error-message-container').getText();
    expect(error).toContain('Password is required');
  });

  credentials.forEach(({ username, password }) => {
    it(`UC-3: Login with valid credentials - ${username}`, async () => {
      await $('#user-name').setValue(username);
      await $('#password').setValue(password);
      await $('#login-button').click();
      const title = await $('.app_logo').getText();
      expect(title).toBe('Swag Labs');
    });
  });
});
