const { expect } = require("@playwright/test")
const Login = (page)=> ({ 

    async enter_userName (userName){
      await page.locator('[id="user-name"]').pressSequentially(userName) //username         
},

async enter_userPassword (userPassword){
    await page.locator('[id="password"]').pressSequentially(userPassword) //password         
},

async successfullogin (){
    await page.locator('[id="login-button"]').click() // login button
    await expect (await page.locator('[id="contents_wrapper"]')).toBeVisible()
},

async invalidCredentials_login(errorMessage){
    await page.locator('[id="login-button"]').click()
  const errorSection = page.locator('[class="error-message-container error"]')
  await expect (await errorSection).toHaveText(errorMessage)
},

async menuButton(){
    await page.locator('[id="react-burger-menu-btn"]').click() //menu button
},

async logout(){
    await page.locator('[id="logout_sidebar_link"]').click() // log out button
  const homePage = page.locator('[class="login_container"]')
  await expect (homePage).toBeVisible()
}

})
module.exports = Login