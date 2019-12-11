import axios from 'axios';
import cheerio from 'cheerio';
import db from "./db";

export async function getHTML(url) {
    const {data: html} = await axios.get(url);
    // console.log(data);
    return html;
}

export async function getTwitterFollowers(html) {
    //load up cheerio
    // console.log("html result", html);
    const $ = cheerio.load(html);
    // console.log($);
    const span = $('[data-nav="followers"] .ProfileNav-value');
    return span.data('count');
}

export async function getInstagramFollowers(username) {
    const { data } = await axios.get(`https://instagram.com/${username}/?__a=1`);
    return data.graphql.user.edge_followed_by.count;
}

export async function getInstagramCount(username){
    const { data } = await axios.get(`https://instagram.com/${username}/?__a=1`);
    const igCount = data.graphql.user.edge_followed_by.count;
    return igCount;
}

export async function getTwitterCount(){
    const html = await getHTML('https://twitter.com/lauvsongs');
    const twCount = await getTwitterFollowers(html);
    return twCount;
}

export async function runCron() {
    const [iCount, tCount] =
        await Promise.all([getInstagramCount('lauvsongs'), getTwitterCount()]);
    db.get('twitter').push({
        date: Date.now(),
        count: tCount
    }).write();
    db.get('instagram').push({
        date: Date.now(),
        count: iCount
    })
        .write();
    console.log("Done!");
}

// export { getHTML, getTwitterFollowers, getInstagramFollowers};
