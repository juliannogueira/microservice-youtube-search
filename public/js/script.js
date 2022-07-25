(() => {
    const lyricsInput = document.querySelector('#lyrics');
    const searchButton = document.querySelector('#search');
    const searchIndicator = document.querySelector('#search-indicator');
    const spanResult = document.querySelector('#result');
    const youtubeVideo = document.querySelector('#youtube-video');
    let isFinishedSearching = false;

    function timeout(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, ms)
        });
    }

    async function displaySearchIndicator() {
        let i = 0
        while (true) {
            searchIndicator.textContent = `Searching${'.'.repeat((i % 3) + 1)}`;
            if (isFinishedSearching) break;
            await timeout(500);
            i++;
        }
        searchIndicator.textContent = '';
    }

    function resetPage() {
        spanResult.textContent = '';
        youtubeVideo.setAttribute('src', '');
    }

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

    function createEmbeddedYoutubeSrc(href) {
        const pattern = 'https://youtube.com/watch?v='
        const id = href.replace(pattern, '');
        const src = `https://youtube.com/embed/${id}`;
        return src;
    }

    searchButton.addEventListener('click', async () => {
        isFinishedSearching = false;
        resetPage();
        displaySearchIndicator();
        try {
            const value = lyricsInput.value;
            const response = await searchYoutube(query=value);
            const href = response['href'];
            let src = null;
            href ? spanResult.textContent = `href: ${href}` : spanResult.textContent = `"href": ${href}`;
            href ? src = createEmbeddedYoutubeSrc(href) : src = '';
            youtubeVideo.setAttribute('src', src)
        } catch (e) {
            console.log(e);
        } finally {
            isFinishedSearching = true;
        }
    });
})();
