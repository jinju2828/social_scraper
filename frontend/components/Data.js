import { useContext } from 'react';
import { ScrapeContext} from "./ScrapeContext";
import Table from './Table';
import Chart from './Chart';

export default function Data() {
    // const { scrapes } = useContext(ScrapeContext);
    const { scrapes, fetchScrapes } = useContext(ScrapeContext);
    // const scrapeData = useContext(ScrapeContext);
    // console.log(scrapeData);
    return (
        <div>
            <button type="button" onClick={fetchScrapes}>
                Refresh Data
            </button>
            <h2> Scraping Twitter:</h2>
            <Chart scrapes = {scrapes.twitter}/>
            {/*<Table scrapes = {scrapes.twitter} />*/}
            <h2> Scraping Instagram:</h2>
            <Chart scrapes = {scrapes.instagram}/>
            {/*<Table scrapes = {scrapes.instagram} />*/}

            <ul>
            </ul>
            {/*{scrapes.twitter.length}*/}
            {/*{scrapeData.twitter.length}*/}
        </div>
    );

}
