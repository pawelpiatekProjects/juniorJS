import React, {Component} from 'react';
import styled from 'styled-components';
import Chart from "react-apexcharts";


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
