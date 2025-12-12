const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'schedule.json');

app.use(express.static('public'));
app.use(express.json());

// Load schedule
app.get('/api/schedule', (req, res) => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// Update schedule
app.post('/api/schedule', (req, res) => {
    const data = req.body; // Expecting array of rows with cell contents
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
