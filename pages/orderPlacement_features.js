const { expect } = require("@playwright/test")
const PlaceOrder = (page)=>({

    async placeSingle_order(item){
        let Price_total = []
        const productName = await page.locator('[class="inventory_item_name "]').getByText(item)
    const selectedProduct = await page.locator('[class="inventory_item"]').filter({has:productName})
    const priceSection = await selectedProduct.locator('[class="inventory_item_price"]')
    const Price = await priceSection.textContent()
    
    const amount_noCurrency = await Price.split('$')[1]
    Price_total.push(await amount_noCurrency)
    console.log(`The price of the product is: $${Price_total} `) // print the price of item

    // click on the add to cart button
    await selectedProduct.getByRole('button',{name: 'Add to cart'}).click()
    },

    async checkCart(){
        const cartButton = page.locator('[id="shopping_cart_container"]')
        const cartLink = await cartButton.locator('a')
        const cartDetail =await cartLink.locator('[class="shopping_cart_badge"]')
        const orderNumber = await cartDetail.textContent()
        console.log(`The number of order(s) placed is: ${orderNumber} `)
        await cartLink.click()
    
        //assertion
        await expect(page.locator('[class="cart_item_label"]')).toBeTruthy()

    },

    async checkOut(){
        await page.getByRole('button', {name: 'Checkout'}).click()
    },

    async shippingDetails(packageReceiver_firstName,packageReceiver_lastName,packageReceiver_postalCode){
        await page.locator('[id="first-name"]').pressSequentially(packageReceiver_firstName)
    await page.locator('[id="last-name"]').pressSequentially(packageReceiver_lastName)
    await page.locator('[id="postal-code"]').pressSequentially(packageReceiver_postalCode)

    // click on continue button
     await page.locator('[data-test="continue"]').click() 
    },

    async completeOrder(toastMessage1,toastMessage2){
        const summaryPrice_Details = await page.locator('[class="summary_total_label"]')
const totalPrice = await summaryPrice_Details.textContent()
const checkoutPrice =totalPrice.split('$')[1]
console.log(`The customer is paying $${checkoutPrice} in total`)


 //finish order
 await page.locator('[data-test="finish"]').click()

 // assertion Toast message
  const orderCompleted1 = await page.locator('[class="complete-header"]').textContent()
  const orderCompleted2 = await page.locator('[class="complete-text"]').textContent()
 await expect(orderCompleted1).toContain(toastMessage1)
 await expect(orderCompleted2).toContain(toastMessage2)

    },

    async multipleOrders(items){
        let Price_total = []
        for (const item of items) {
            
            // Locate product by its name
            const productNameLocator = await page.locator('.inventory_item_name').getByText(item);
            const productCount = await productNameLocator.count();
    
            for (let i = 0; i < productCount; i++) {
                const selectedProduct = await page.locator('.inventory_item').filter({ has: productNameLocator }).nth(i);
                
                // Checks if this is the right product
                const productName = await selectedProduct.locator('.inventory_item_name').textContent();
                if (productName.trim() === item) {
                    // Get the price for the selected product
                    const priceLocator = selectedProduct.locator('.inventory_item_price');
                    const priceText = await priceLocator.textContent();
    
                    //updates the Array Price_Total
         const amount_noCurrency = await priceText.split('$')[1]
         Price_total.push(await amount_noCurrency)
         Price_total = Price_total.map(value=>parseFloat(value))
                   
    
          //using Array.reduce()
       const sumOf_items =  Price_total.reduce((accumulator,currentValue)=>{
            return accumulator + currentValue;
        }, 0)
        console.log(`The sum of the items is: $${sumOf_items}`) // print the price of the items
        
    
                    // Click "Add to cart" button
                    const addToCartButton = selectedProduct.locator('button');
                    await addToCartButton.click();
                    
                }
            }
        }

    }

})
module.exports = PlaceOrder