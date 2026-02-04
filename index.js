const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pauseRoutes = require('./pauseRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', pauseRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'PAUSE' });
});

app.get('/', (req, res) => {
  res.json({ message: 'PAUSE API is running' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`PAUSE backend running on port ${PORT}`);
});
