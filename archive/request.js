import fetch from 'node-fetch';

async function searchYoutube(query) {
    const url = 'http://localhost:5419/video/search';
    const data = {
        query: query,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    const results = await json;
    return results;
}

const href = (async () => {
    const query = 'happy birthday to you';
    const response = await searchYoutube(query);
    const href = response['href'];
    console.log(href);
    return href;
})();
