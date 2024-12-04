const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchParkingData() {
    const url = 'https://www.lsu.edu/parking/availability.php';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const parkingData = [];
    $('table tbody tr').each((i, row) => {
        const cells = $(row).find('td');
        parkingData.push({
            lot: $(cells[0]).text().trim(),
            available: parseInt($(cells[1]).text().trim()),
            capacity: parseInt($(cells[2]).text().trim()),
            percentage: $(cells[3]).text().trim(),
        });
    });

    fs.writeFileSync('data.json', JSON.stringify(parkingData, null, 2));
    console.log('Parking data saved to data.json');
}

fetchParkingData().catch(err => console.error(err));