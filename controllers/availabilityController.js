const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');
const router = express.Router();

router.post('/update', (req, res) => {
    exec('node scraper.js', (error, stdout, stderr) => {
        if (error) {
            console.error('Error running scraper.js:', error);
            return res.status(500).json({ message: 'Failed to update parking data.' });
        }
        if (stderr) {
            console.error('Scraper stderr:', stderr);
        }

        console.log('Scraper stdout:', stdout);

        try {
            const parkingData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
            res.status(200).json({ message: 'Parking data updated successfully.', data: parkingData });
        } catch (readError) {
            console.error('Error reading data.json:', readError);
            res.status(500).json({ message: 'Failed to read updated parking data.' });
        }
    });
});

router.get('/', (req, res) => {
    try {
        const parkingData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
        res.render('availability', { parkingData });
    } catch (error) {
        console.error('Error reading data.json:', error);
        res.status(500).send('Failed to load parking data.');
    }
});

module.exports = router;