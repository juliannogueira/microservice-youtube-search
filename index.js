import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { 
    fileURLToPath 
} from 'url';

import {
    createYoutubeSearchUrl,
    searchYoutube
} from './modules/youtube.js';

const app = express();
const port = 5419;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname + '/public'));
app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.post('/video/search', async (req, res) => {
    const query = req.body['query'];
    console.log(`/video/search received: "${query}"`);
    const url = createYoutubeSearchUrl(query);
    const href = await searchYoutube(url);
    console.log(`/video/search returning: ${href}`);
    res.send({
        href: href
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
