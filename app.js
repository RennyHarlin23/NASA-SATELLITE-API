const express = require('express');
const fetch = require('node-fetch')

require('dotenv').config();
const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`My server is runnning in ${port}`);
})

let url = 'https://api.nasa.gov/planetary/earth/assets?';



async function main() {
    const fetch_data = await fetch(url);
    const response = await fetch_data.json();
    const image_url = response.url;
    return image_url;
}

async function img_url() {
    const image_url = await main().catch(err => console.log(err));
    return image_url;
}

app.post('/', async (req, res) => {
    const lat = req.body.lat.toFixed(2);
    const lon = req.body.lon.toFixed(2);
    const timestamp = req.body.timestamp;
    const date = new Date(timestamp);
    var date_format_str = date.getFullYear().toString() + "-" + ((date.getMonth() + 1).toString().length == 2 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1).toString()) + "-" + (date.getDate().toString().length == 2 ? date.getDate().toString() : "0" + date.getDate().toString());
    console.log(date_format_str);
    url = url + `lon=${lon}&lat=${lat}&date=2021-06-05&&dim=0.1&api_key=${process.env.API_KEY}`;
    const image_url = await img_url();
    res.jsonp(image_url);

})