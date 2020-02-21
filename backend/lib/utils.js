// export function uniqueCount(scrapes) {
//     return scrapes.reduce((accumulator, scrape) => {
//         //check if this one is already in the acc
//         //if there is already one in the doc
//         if(!accumulator.find(element => element.count === scrape.count)){
//             return [...accumulator, scrape];
//         }
//         return accumulator;
//     },[]);
// }

export function uniqueCount(scrapes) {
    return scrapes.filter((item, i, arr) => {
        if(i===0) return true;
        const lastItem = arr[i-1];
        return !(item.count === lastItem.count);
        // if(!lastItem) return true; // keep it, it's the first one

    });
}
