const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

cron.schedule('* * * * *', () => {
    console.log('Running a task in each and every task');
    
})

app.listen(port, () => { 
    console.log(`Example app listening at http://localhost:3000`)
})