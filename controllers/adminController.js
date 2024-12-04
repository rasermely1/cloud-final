const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin');
});

router.post('/add', (req, res) => {
    const parkingData = JSON.parse(fs.readFileSync('data.json'));
    const { lot, available, capacity } = req.body;
    const percentage = ((available / capacity) * 100).toFixed(2) + '%';

    parkingData.push({ lot, available: Number(available), capacity: Number(capacity), percentage });
    fs.writeFileSync('data.json', JSON.stringify(parkingData, null, 2));
    res.redirect('/admin');
});


router.post('/delete', (req, res) => {
    const parkingData = JSON.parse(fs.readFileSync('data.json'));
    const updatedData = parkingData.filter(lot => lot.lot !== req.body.lot);

    fs.writeFileSync('data.json', JSON.stringify(updatedData, null, 2));
    res.redirect('/admin');
});

module.exports = router;