import { useEffect, useState} from 'react';
import { ScrapeProvider } from "./ScrapeContext";

//custom Hook!
function useScrapes() {
    //initial state inside our hook
    const [scrapes, setScrapes] = useState({
        twitter: [],
        instagram: []
    });
    //fetch function
    async function fetchScrapes(){
        const res = await fetch('http://localhost:2093/aggregate');
        // console.log("res", res);
        const data = await res.json();
        // console.log("data",data);
        setScrapes(data);
    }

    //didMount/DidUpdate
//     useEffect( function () {
//         (async () => {
//             console.log('Mounting or Updating');
//             const res = await fetch('http://localhost:2093/data');
//             console.log("res", res);
//             const data = await res.json();
//             console.log("data",data);
//             setScrapes(data);
//         })();
//     },[]);
//     return scrapes;
// }
    useEffect(()=>{
        fetchScrapes();
    }, []);
    return {scrapes, fetchScrapes};
}

export default function Page({children}){
    // const scrapes = useScrapes();
    const {scrapes, fetchScrapes} = useScrapes();
    // const hookInfo = useScrapes();
    return (
        <ScrapeProvider value={{
            scrapes,
            fetchScrapes
            // hookInfo
        }}>
            <div className="page">
            {children}
            </div>
        </ScrapeProvider>
    );
}
