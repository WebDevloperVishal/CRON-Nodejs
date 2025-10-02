const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');

const app = express();

const port = 3000

app.use(express.json())

const sourceDir = path.join(__dirname, "data");
const backupDir = path.join(__dirname, "backups");

app.get('/', (req, res) => res.send('Hello World!'))

cron.schedule('* * * * *', async () => {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
        const destination = path.join(backupDir, `backup-${timestamp}`) 


        await fs.cp(sourceDir, destination, { recursive: true},( err)=>{
            if (err) {
                console.log('Backup failed :',err);
            } else {
                console.log(`Bacckup created at ${destination}`);   
            }
        })

        
    } catch (error) {
        console.log('Backup failed :', err);
        
    }
    
})

app.listen(port, () => { 
    console.log(`Example app listening at http://localhost:3000`)
})