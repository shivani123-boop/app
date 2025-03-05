const express = require('express');
const app = express();
const bodyParser=require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
require('./Models/db');
const EventRouter=require('./routes/EventRoutes');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('employeemgm server is running');
});

app.use('/api/employee',EventRouter)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
