const { test, expect } = require('@playwright/test');
const Login = require('../pages/loginFeatures')
const PlaceOrder = require ('../pages/orderPlacement_features')
const dataset = require('../utils/singleOrder_Testdata.json');
const credentials = require('../utils/validLogin_Testdata.json');
const multiDataset = require('../utils/multiOrders_Testdata.json')


// this hook runs before each test
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    const login = Login(page)
    await login.enter_userName(credentials.userName)
    await login.enter_userPassword(credentials.userPassword)
    await login.successfullogin()
  });

test('TC_005 successful single order ', {tag:'@smoke'}, async ({ page }) => {
    test.setTimeout(200000)
    // place order
    const placeOrder = PlaceOrder(page)
    await placeOrder.placeSingle_order(dataset.item)
     await placeOrder.checkCart()
     await placeOrder.checkOut()
     await placeOrder.shippingDetails
     (dataset.packageReceiver_firstName,
      dataset.packageReceiver_lastName,
      dataset.packageReceiver_postalCode
      )
     await placeOrder.completeOrder
     (dataset.toastMessage1,
      dataset.toastMessage2)
  })


  test('TC_006 successful multiple orders ', {tag:'@smoke'}, async ({ page }) => {
    test.setTimeout(200000)
    const items = [multiDataset.item1, multiDataset.item2, multiDataset.item3]
    // place order
    const placeOrder = PlaceOrder(page)
    await placeOrder.multipleOrders(items)
    await placeOrder.checkCart()
    await placeOrder.checkOut()
    await placeOrder.shippingDetails
    (multiDataset.packageReceiver_firstName,
      multiDataset.packageReceiver_lastName,
      multiDataset.packageReceiver_postalCode)
    await placeOrder.completeOrder
    (multiDataset.toastMessage1,
      multiDataset.toastMessage2)
  })