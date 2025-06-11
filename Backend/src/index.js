const express = require('express');
const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30, 
  message: { error: 'Too many requests, please try again later.' }
});


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', limiter);
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
});