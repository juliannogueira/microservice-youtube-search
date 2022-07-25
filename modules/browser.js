import puppeteer from 'puppeteer';

async function initBrowser() {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--disable-setuid-sandbox"
            ],
            'ignoreHTTPSErrors': true
        });
        return browser;
    } catch (e) {
        return null;
    }
};

async function loadPage(browser, url) {
    try {
        const page = await browser.newPage();
        await page.goto(url);
        return page;
    } catch (e) {
        return null;
    }
};

async function findElement(page, selector) {
    try {
        await page.waitForSelector(selector, {
            timeout: 1000
        });
        const handle = await page.$(selector);
        return handle;
    } catch (e) {
        return null;
    }
};

async function findAttribute(page, handle, attribute) {
    try {
        const value = await page.evaluate((handle, attribute) => {
             return handle.getAttribute(attribute);
        }, handle, attribute);
        return value;
    } catch (e) {
        return null;
    }
}

export {
    initBrowser,
    loadPage,
    findElement,
    findAttribute
};
