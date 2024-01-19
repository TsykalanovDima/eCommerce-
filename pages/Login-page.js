const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sign_in_button_home_page = page.locator('[data-test="@web/AccountLink"]');
    this.sign_in_button_home_page_account = page.locator('[data-test="accountNav-signIn"]');
    this.login_input = page.locator('#username');
    this.password_input = page.locator('#password');
    this.login_button = page.locator('#login');
    this.sign_in_button = page.locator(':text("Login")');
    }

  async go_to_url() {
    await this.page.goto('https://www.target.com');
  }

  async login_valid(user,password) {
    await this.sign_in_button_home_page.click();
    expect(await this.page.locator('[data-test="modal-drawer-heading"]').isVisible()).toBe(true);
    await this.sign_in_button_home_page_account.click();
    expect(this.page.locator('//h1/span')).toContainText('Sign into your Target account');
    await this.login_input.fill(user);
    await this.password_input.fill(password);
    await this.login_button.click();
    const menu_selector_wait = '//a[@data-test="@web/AccountLink"]/span';
    await this.page.waitForSelector(menu_selector_wait, { state: 'visible' });
  }
  
  async login_invalid_auth(user,password) {
    await this.sign_in_button_home_page.click();
    expect(await this.page.locator('[data-test="modal-drawer-heading"]').isVisible()).toBe(true);
    await this.sign_in_button_home_page_account.click();
    expect(this.page.locator('//h1/span')).toContainText('Sign into your Target account');
    await this.login_input.fill(user);
    await this.password_input.fill(password);
    await this.login_button.click();
    await this.page.waitForSelector('//div[@data-test="authAlertDisplay"]');
    expect(await this.page.locator('//div[@data-test="authAlertDisplay"]')).toContainText("We can't find your account.");
    }

};