function isInLastSixHours(timestamp) {
    const sixHoursAgo = 1000*60*60*6;
    return Date.now() - timestamp < sixHoursAgo ;

}

export default function aggregate(scrapes) {
    // console.log("aggregate scrapes", scrapes);
    const aggregateScrapes = [...scrapes]
        .sort((a,b)=> a.date - b.date)
        .map(scrape =>{
        const date = new Date(scrape.date);
        const optionalHour = isInLastSixHours(scrape.date) ?
            `-${date.getHours()}` : ``;
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}${optionalHour}`;
        return {
            key,
            ...scrape,
        };
    }).reduce((accumulator, currentScrape) => {
        //check and see if this key is already in the acc, so if it's not found, we want to keep it
        if(!accumulator.find(scrape => scrape.key === currentScrape.key)){
            return [...accumulator, currentScrape];
        }
        return accumulator;
    },[])
    ;
    return aggregateScrapes;
}
