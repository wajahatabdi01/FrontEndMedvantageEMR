import React, { useEffect, useState } from 'react'
import BoxHeading from '../../../../../Component/BoxHeading'
import { HighchartsReact } from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting';
import Highcharts from 'highcharts';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

// import LodingIcon from '../../../../../Components/Loader'


export default function TestGraph(props) {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    HighchartsExporting(Highcharts);

    let [graph, setGraph] = useState()
    // let [sendData, setSendData] = useState([])
    let [bool, setBool] = useState(1)

    let makeData = (data) => {
        let temp = []
        let label = []
       
        data.map((val, ind) => {
            temp.push({
                type: 'spline',
                data: [val.result],
                name: val.subTestName
            })
        })
        data.map((val, ind) => {
            label.push(val.reultDateTime)
        })

        grapConfig(label, temp)


    }

    let grapConfig = (labelData, sendData) => {
        
        setGraph({
            chart: {

                displayErrors: true,
                scrollablePlotArea: {
                    minWidth: labelData.length > 100 && labelData.length <= 150 ? 1000 : labelData.length > 300 ? labelData.length * 10 : 100,
                    opacity: 0.6
                },

                zoomType: "xy",
            },
            title: {
                text: sendData[0].name
            },

            yAxis: {
                title: {
                    text: 'Values'
                }
            },
            xAxis: {
                categories: labelData,
                type: "category",
                min: 0,

                labels: {
                    rotation: -45,
                },
                scrollbar: {
                    enabled: true
                },

            },
            tooltip: {
                enabled: true,
                shared: true
            },


            exporting: {
                enabled: true
            },


            plotOptions: {
                series: {
                    pointWidth: 50,
                    dataLabels: {
                        align: 'top',
                        enabled: true,
                    },
                },
            },

            series: [
                ...sendData
            ],
            credits: {
                enabled: false,
            }

        })



    }

    useEffect(() => {
        makeData(props.subtestGraphData)
    }, [props.subtestGraphData])

    return (
        <div className={`modal d-${props.showGrap === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", }}>


            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={()=>{props.modelCloseFun(0)}}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span>
                    {/* <BoxHeading name={dateTime ? dateTime : props.grapInvestigationData.name} textcolor="#7E7E7E" patientBool={true} patientName={props.grapInvestigationData.patientName} patientUhid={props.grapInvestigationData.UHID} /> */}
                    <BoxHeading title={t("Subtest Graph" )} />
                    <div className='mt-1 ps-5 pe-4 row'>
                        <div className='col-12'>

                            
                            {/* {bool === 0 ? */}
                                <HighchartsReact highcharts={Highcharts} options={graph} />
                                {/* : <LodingIcon val={bool} />} */}

                        </div>
                        {/* <div className='col-2 row wrap pt-3' style={{ maxHeight: '350px' }}>
                            <div className='d-flex flex-row justify-content-center pb-2'><b>Select Date</b></div>
                            {sideDate && sideDate.map((value, index) => {
                                return (
                                    <div className='d-flex gap-1 pb-1'>
                                        <input type="radio" name="dateselect" id={index} value={value.split("T")[0]} onClick={grapByDate} defaultChecked={activeDateIndex === index ? `checked` : ""} />&nbsp;{value.split("T")[0]}
                                    </div>
                                )
                            })}
                        </div> */}

                    </div>

                </div>
            </div>

        </div>
    )
}
