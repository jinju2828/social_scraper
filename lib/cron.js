import cron from 'node-cron';
//corntab.com
import { runCron } from "./scraper";

cron.schedule('* * * * *', ()=>{
    console.log('RUNNING THE CRON');
    runCron();
});
