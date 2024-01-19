const { expect } = require('@playwright/test');

exports.OrderPage = class OrderPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.button_add_to_cart = page.locator('//button[@data-test="shippingButton"]').first();
    this.button_close_added_cart_menu = page.locator('[aria-label="close"]');
    this.category_headphones_span = page.locator('//span[text()="Headphones"]');
    this.backet_button = page.locator('[data-test="@web/CartIcon"]');
    this.first_headpone_wired_select = page.locator('//div[@data-test="@web/ProductCard/body"]//a').first();
    this.check_out_button = page.locator('[data-test="checkout-button"]')
    this.search_input = page.locator('[placeholder="What can we help you find?"]').first();
    this.product_select = page.locator('//div[@data-test="@web/ProductCard/body"]//a').nth(3);
    }

  async order_from_categories() {
    await this.button_add_to_cart.click();
    const wait_selector = '[data-test="@web/OverlayModal"]';
    await this.page.waitForSelector(wait_selector, { state: 'attached' });
    expect(await this.page.locator('//h2[@data-test="modal-drawer-heading"]/span[2]')).toContainText('Added to cart');
    this.button_close_added_cart_menu.click();
    expect(await this.page.locator('//button[@data-test="custom-quantity-picker"]/span').first()).toContainText(' in cart');
    expect(await this.page.locator('//div[@data-test="@web/CartIcon"]/span')).toContainText('1')
    this.backet_button.click();
    this.check_out_button.click();
    await this.page.waitForSelector('//div[@data-test="content-wrapper"]/h1/span', { state: 'visible' });
    expect(await this.page.locator('//div[@data-test="content-wrapper"]/h1/span')).toContainText('Sign into your Target account');
  }

async order_from_auth_user(product) {
    await this.search_input.fill(product)
    await this.page.keyboard.press('Enter');
    await this.product_select.click();
    const product_select_text = await this.product_select.innerText();
    expect(await this.product_select.innerText()).toBe(product_select_text);
    await this.button_add_to_cart.click();
    const wait_selector = '[data-test="@web/OverlayModal"]';
    await this.page.waitForSelector(wait_selector, { state: 'attached' });
    expect(await this.page.locator('//h2[@data-test="modal-drawer-heading"]/span[2]')).toContainText('Added to cart');
    this.button_close_added_cart_menu.click();
    expect(await this.page.locator('//button[@data-test="custom-quantity-picker"]/span').first()).toContainText(' in cart');
    expect(await this.page.locator('//div[@data-test="@web/CartIcon"]/span')).toContainText('1')
    this.backet_button.click();
    await this.page.locator('button:has-text("Continue to checkout")').waitFor({ state: 'visible' });
    await this.page.locator('button:has-text("Continue to checkout")').click();
    //click place your order and got payment
    }
};