import { HighchartsReact } from 'highcharts-react-official'
import Highcharts from 'highcharts';
import React, { useEffect, useState } from 'react'
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";  
export default function PiChart(props) {
    let [graph, setGraph] = useState()
    let grapConfig = () => {
        setGraph({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                backgroundColor: null,
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
            },
            title: {
                text: '',
                align: 'left'
            },
            tooltip: {
                enabled: false,
                pointFormat: ''
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },

            plotOptions: {
                pie: {

                    allowPointSelect: true,
                    cursor: 'pointer',
                    size: '50%',
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,

                    },

                },
            
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
             

                data: [{
                    name: 'Chrome',
                    y: props.patientScore,
                    sliced:false
                },
                {
                    name: 'Chrome',
                    y: 562 - props.patientScore,
                    
                }
                ]
            },
            ],
            credits: {
                enabled: false,
            },


        })
    }

    useEffect(() => {
        grapConfig();
        console.log("props",props.patientScore )
    }, [])
    return (
        <div style={{ width: "29px", height: "30px", margin: "0 0 0 0" }}>
            <HighchartsReact containerProps={{ style: { height: "32px", width: "32px" } }} highcharts={Highcharts} options={graph} />
        </div>
    )
}
