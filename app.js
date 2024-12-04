const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout');

const availabilityController = require('./controllers/availabilityController');
const adminController = require('./controllers/adminController');

app.use('/availability', availabilityController);
app.use('/admin', adminController);

app.get('/', (req, res) => {
    res.redirect('/availability');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));