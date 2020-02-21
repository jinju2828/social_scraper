import express from 'express';
// import lowdb from 'lowdb';
// import FileSync from 'lowdb/adapters/FileSync';
import cors from 'cors';
import {getInstagramCount, getTwitterCount} from './lib/scraper';
import { uniqueCount } from "./lib/utils";
import db from './lib/db';
import './lib/cron';
import aggregate from "./lib/aggregate";

const app = express();
app.use(cors());

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


app.get('/data', async(req,res,next)=>{
    //get the scrape data
    const { twitter, instagram} = db.value();
    //  const twitter = db.value();
    //  filter for only unique values
    //  const uniqueTwitter = twitter.reduce((accumulator, scrape) => {
    //      //check if this one is already in the acc
    //      //if there is already one in the doc
    //      if(!accumulator.find(element => element.count === scrape.count)){
    //          return [...accumulator, scrape];
    //      }
    //      return accumulator;
    //  },[]);
    //respond with json
    // res.json({ twitter, instagram});
    const uniqueTwitter = uniqueCount(twitter);
    const uniqueInstagram = uniqueCount(instagram);
    res.json({ twitter: uniqueTwitter, instagram: uniqueInstagram});

});

app.get('/aggregate', async(req,res,next)=>{
    //get the scrape data
    const { twitter, instagram} = db.value();
    console.log("aggregate twitter", twitter);
    //need to aggregate these values

    //respond with json
    res.json({twitter: aggregate(twitter), instagram: aggregate(instagram)});

});


var server = app.listen(2093, () => {
    // console.log(deets);
    console.log(`Example app running on port http://localhost:${server.address().port}`)
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
