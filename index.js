import express from 'express';
// import lowdb from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';
import {getInstagramCount, getTwitterCount} from './lib/scraper';
import db from './lib/db';
import './lib/cron';

const app = express();

// console.log(db);

app.get('/scrape', async(req, res, next) =>{
    console.log('scraping!');

    const [iCount, tCount] =
        await Promise.all([getInstagramCount('lauvsongs'), getTwitterCount()]);
    // console.log(iCount, tCount);
    // db.get('twitter').push({
    //    date: Date.now(),
    //     count: tCount
    // }).write();
    // db.get('instagram').push({
    //     date: Date.now(),
    //     count: iCount
    // })
    //     .write();
    res.json({iCount, tCount});
});

var server = app.listen(2093, () => {
    // console.log(deets);
    console.log(`Example app running on port ${server.address().port}`)
});
// console.log(getHTML());

// async function go() {
    // //Getting twitter follower numbers
    // const twhtml = await getHTML('https://twitter.com/lauvsongs');
    // const twCount = await getTwitterFollowers(twhtml);
    // console.log(`This user has ${twCount} followers on Twitter.`);
    // //Getting Instagram follower numbers
    // const igCount = await getInstagramFollowers('lauvsongs');
    // console.log(`This user has ${igCount} followers on Instagram.`);

    // const iPromise = getInstagramCount();
    // const tPromise = getTwitterCount();

    // const [iCount, tCount] = await Promise.all([getInstagramCount('lauvsongs'), getTwitterCount()]);
    // console.log(iCount, tCount);
// }
// go();
