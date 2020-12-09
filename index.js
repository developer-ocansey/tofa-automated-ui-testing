require('chromedriver');
const assert = require('assert');

const { Builder, Key, By, until } = require('selenium-webdriver');

describe('Testing Tradersofafrica UI', function () {
    let driver;
    const WEBSITE = 'https://tradersofafrica.com/'

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });  
    
    it('Verify website title', async function () {
        await driver.get(WEBSITE);

        let title = await driver.getTitle();
        assert.equal(title, 'TOFA, B2B Marketplace for goods produced, or manufactured in Africa | Traders of Africa (TofA) | African Trade Harbingers');
    }); 

    it('Search for product', async function () {

        await driver.get(WEBSITE);

        await driver.findElement(By.id('search_term')).click();

        await driver.findElement(By.id('search_term')).sendKeys('cocoa', Key.RETURN);

        await driver.wait(until.elementLocated(By.id('menu_search_btn')), 10000);

        let title = await driver.getTitle();
        assert.equal(title, 'Search results for cocoa | Traders of Africa (TofA) | African Trade Harbingers');

    }); 
    
    after(() => driver && driver.quit());
})