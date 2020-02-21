import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import {formatDistance} from "date-fns";

export default class Example extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    render() {
        const scrapesWithDates = this.props.scrapes.map(
            scrape => {
                return {...scrape, date: formatDistance(
                        new Date(scrape.date), new Date())}
            }
        );
        return (
            <LineChart
                width={1000}
                height={600}
                data={scrapesWithDates}
                // data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin', 'dataMax']}/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
            </LineChart>
        );
    }
}
