import React, {Component} from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";
import groupArray from 'group-array';


const ChartWrapper = styled.div`

`;


class Charts extends Component {

    state = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ],
        data: [
            {value: "8652", date: new Date("2019-07-01").getMonth},
            {value: "543", date: new Date("2019-06-01").getMonth},
            {value: "8653452", date: new Date("2015-07-01").getMonth},
            {value: "2313", date: new Date("2019-04-01").getMonth},
        ]
    };



    render() {
        return (
            <ChartWrapper>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="bar"
                    width="500"
                />
        
            </ChartWrapper>
        )
    }


}


export default Charts;
