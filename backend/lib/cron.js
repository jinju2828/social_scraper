import cron from 'node-cron';
//corntab.com
import { runCron } from "./scraper";

cron.schedule('0,30 * * * * *', ()=>{
    console.log('RUNNING THE CRON');
    runCron();
});
