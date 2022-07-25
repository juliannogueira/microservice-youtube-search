import {
    initBrowser,
    loadPage,
    findElement,
    findAttribute
} from './browser.js';

function createYoutubeSearchUrl(query) {
    const encoded = encodeURIComponent(query);
    const url = `https://youtube.com/results?search_query=${encoded}`;
    return url;
}

async function searchYoutube(url) {
    const selector = 'a#video-title';
    const attribute = 'href';
    const root = 'https://youtube.com';
    try {
        const browser = await initBrowser();
        const page = await loadPage(browser, url);
        const handle = await findElement(page, selector);
        const href = await findAttribute(page, handle, attribute);
        browser.close();
        return href ? `${root}${href}` : null;
    } catch (e) {
        return null;
    }
}

export {
    createYoutubeSearchUrl,
    searchYoutube
};
