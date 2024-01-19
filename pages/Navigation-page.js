const { expect } = require('@playwright/test');

exports.NavigationPage = class NavigationPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.link_navigation_categories = page.locator('//a[@data-test="@web/Header/MainMenuLink"]');
    this.link_menu_electronics = page.locator('//div[@data-test="@web/MainMenu/CategoryMenuDesktop"]//a[@data-url="/c/electronics/-/N-5xtg6"]');
    this.menu_hover = page.locator('//div[@data-test="@web/CategoryMenu"]');
    this.category_headphones_span = page.locator('//span[text()="Headphones"]');
    this.headphone_wired_span = page.locator('//span[text()="Wired & Wireless Earbuds"]');
    this.headpone_wired_select = page.locator('//div[@data-test="@web/ProductCard/body"]//a').nth(5);
    }

  async ex() {
    await this.link_navigation_categories.first().click();
    await this.menu_hover.hover();
    expect(await this.page.locator('//div[@data-test="@web/CategoryMenu"]/div/div/span')).toContainText("All Categories");
    await this.link_menu_electronics.click();
    await this.category_headphones_span.click();
    await this.headphone_wired_span.click();
    await this.page.waitForTimeout(2000)
    const expected_words = ['Target', 'Electronics', 'Headphones', 'Wired & Wireless Earbuds'];
    const links_text = await this.page.locator('[data-test="@web/Breadcrumbs/BreadcrumbLink"]');
    const links_count = await links_text.count();
    expect(links_count).toBe(4);
    for (let i = 0; i < 4; i++) {
        const link = links_text.nth(i);
        const text = await link.innerText();
        expect(text).toContain(expected_words[i]);
    }
    await this.headpone_wired_select.click();
    const headpone_wired_select_text = await this.headpone_wired_select.innerText();
    expect(await this.headpone_wired_select.innerText()).toBe(headpone_wired_select_text);
    }
  
};