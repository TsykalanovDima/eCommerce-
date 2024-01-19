const { LoginPage } = require('../pages/Login-page');
const { NavigationPage } = require('../pages/Navigation-page');
const { OrderPage } = require('../pages/Order-page');

const { test, expect } = require('@playwright/test');

test('valid email and password login', async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.go_to_url();
  await loginpage.login_valid('l_umos_maxima@yahoo.com','Lumos321321');
});

test('invalid email, valid password login ', async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.go_to_url();
  await loginpage.login_invalid_auth('lumosmaxima@yahoo.com','Lumos123321');
});

test('Order from guest', async ({ page }) => {
  const loginpage = new LoginPage(page);
  const navigationpage = new NavigationPage(page); 
  const orderpage = new OrderPage(page); 
  await loginpage.go_to_url();
  await navigationpage.ex();
  await orderpage.order_from_categories();
});

test('Order from exist custumer', async ({ page }) => {
  const loginpage = new LoginPage(page);
  const orderpage = new OrderPage(page);   
  await loginpage.go_to_url();
  await loginpage.login_valid('l_umos_maxima@yahoo.com','Lumos321321');
  await orderpage.order_from_auth_user('cap');
});



