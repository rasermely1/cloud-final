const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin');
});

router.post('/add', (req, res) => {
    try {
        const { lot, available, capacity } = req.body;

        if (!lot || !available || !capacity) {
            return res.status(400).send('All fields are required.');
        }

        const parkingData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

        const percentage = ((available / capacity) * 100).toFixed(2) + '%';

        parkingData.push({ 
            lot, 
            available: Number(available), 
            capacity: Number(capacity), 
            percentage 
        });

        fs.writeFileSync('data.json', JSON.stringify(parkingData, null, 2));

        res.redirect('/admin');
    } catch (error) {
        console.error('Error adding parking lot:', error);
        res.status(500).send('An error occurred while adding the parking lot.');
    }
});

router.post('/delete', (req, res) => {
    try {
        const { lot } = req.body;

        if (!lot) {
            return res.status(400).send('Lot name is required for deletion.');
        }

        const parkingData = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

        const updatedData = parkingData.filter(item => item.lot !== lot);

        fs.writeFileSync('data.json', JSON.stringify(updatedData, null, 2));

        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting parking lot:', error);
        res.status(500).send('An error occurred while deleting the parking lot.');
    }
});

module.exports = router;