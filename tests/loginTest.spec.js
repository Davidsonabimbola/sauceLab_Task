// @ts-check
const { test, expect } = require('@playwright/test');
const { beforeEach } = require('node:test');
const Login = require('../pages/loginFeatures')
const credentials = require('../utils/validLogin_Testdata.json');

// this hook runs before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('TC_001 successful login with valid credentials',{tag:'@smoke'}, async ({ page }) => {
  const login = Login(page)
  await login.enter_userName(credentials.userName)
  await login.enter_userPassword(credentials.userPassword)
  await login.successfullogin()
  
});

test('TC_002 unsuccessful login with invalid credentials',{tag:'@smoke'}, async ({ page }) => {
  const login = Login(page)
  var userName = 'standard_user'
  var userPassword = 'secret_Sauce'
  const errorMessage = 'Epic sadface: Username and password do not match any user in this service'
  await login.enter_userName(userName)
  await login.enter_userPassword(userPassword)
  await login.invalidCredentials_login(errorMessage)
  
});


test('TC_003 missing input password field',{tag:'@smoke'},async ({ page }) => {
  const login = Login(page)
  const errorMessage = 'Epic sadface: Username is required'
  var userPassword = 'secret_sauce'
  await login.enter_userPassword(userPassword)
  await login.invalidCredentials_login(errorMessage)
  
});


test('TC_004 successful logout', {tag:'@smoke'},async ({ page }) => {
  const login = Login(page)
  var userName = 'standard_user'
  var userPassword = 'secret_sauce'
  await login.enter_userName(userName)
  await login.enter_userPassword(userPassword)
  await login.successfullogin()
  await login.menuButton()
  await login.logout()

});


