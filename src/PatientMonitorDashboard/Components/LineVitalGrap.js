import React from 'react'

import '../../assets/css/highChart.css'
import GetPatientVitalGraph from '../../Clinical/API/RemotePatientMonitorDashboard/GetPatientVitalGraph'
import { useEffect } from 'react'
import { useState } from 'react'
import Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting';

import LodingIcon from '../../Component/Loader'
import BoxHeading from './BoxHeading'
import AlertToster from '../../Component/AlertToster'
import NODataFound from '../../Component/NODataFound'




export default function LineVitalGrap(props) {

    // showGrap: 0,
    // vitalIdSearchNew: '',
    // UHID: '',
    // userId: ''
    HighchartsExporting(Highcharts);
    // let [bottomLabel, setBottomLabel] = useState([])
    let [sideDate, setSideDate] = useState([])
    // let [showData, setShowData] = useState([])
    // let [getData, setGetData] = useState()
    // let [bottomPrevLabel, setBottomPrevLabel] = useState([])
    // let [prevShowData, setPrevShowData] = useState([])
    // let [currentDate, setCurrentdate] = useState()
    let [bool, setBool] = useState(1)
    let [activeDateIndex, setActiveDateIndex] = useState(null);
    let [showGraph, setShowGraph] = useState(1)
    let [dateTime, setDateTime] = useState()
    let [graph, setGraph] = useState()
    let [showAlert, setShowAlert] = useState(0)
    let [showAlertMessage, setShowAlertMessage] = useState("")


    let getdata = async (date) => {
        let data = await GetPatientVitalGraph(props.grapVitalData.userId, props.grapVitalData.UHID, props.grapVitalData.vitalIdSearchNew, date)
        // setGetData(data.responseValue)
        // console.log(data)
        if (data.status === 1) {
            setBool(0)
            if (data.responseValue.patientGraph.length !== 0) {
                setShowGraph(1)
            }
            else {
                setShowGraph(0)
                setTimeout(() => {
                    document.getElementById("0").checked  = true
                    grapByDate({target:{value:data.responseValue.vitalsDate[0].vitalDate.split("T")[0]}})
                }, 150)
            }
            makeData(data.responseValue)
        }
        else {
            setBool(0)
            setShowGraph(0)
            setShowAlert(1)
            setShowGraph(0)

            setShowAlertMessage(data.responseValue)
        }
    }

    // setting HighGrap
    let grapConfig = (labelData, sendData) => {
        console.log("length", labelData)
        console.log("value", sendData)
        try {

            let a = sendData[0].name === "BP_Sys" ? "max" : "max_"
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
                    text: props.grapVitalData.name
                },

                yAxis: {
                    title: {
                        text: 'Values'
                    },
                    [a]: 250,

                    min: 0
                    // width: '95%'
                },
                xAxis: {

                    categories: labelData,
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
        catch (e) {
            setShowAlert(1)
            setShowAlertMessage(e.message)
        }


    }

    // setting grap 2

    // let graph2 = {
    //     chart: {
    //         displayErrors: true,

    //         type: "column",
    //         scrollablePlotArea: {
    //             minWidth: 1000,
    //             // opacity: 1
    //         },


    //     },
    //     credits: {
    //         enabled: null
    //     },

    //     title: {
    //         text: props.grapVitalData.name
    //     },

    //     yAxis: {
    //         title: {
    //             text: 'Values'
    //         }
    //     },
    //     xAxis: {

    //         categories: bottomLabel,
    //         labels: {
    //             rotation: -45,

    //         },


    //     },
    //     exporting: {
    //         enabled: true
    //     },
    //     lang: {
    //         noData: 'no data!'
    //     },
    //     noData: {
    //         position: {
    //             "x": 0,
    //             "y": 0,
    //             "align": "center",
    //             "verticalAlign": "middle"
    //         }
    //     },

    //     plotOptions: {
    //         series: {
    //             dataLabels: {
    //                 align: 'top',
    //                 enabled: true
    //             },

    //         }
    //     },

    //     series: [
    //         ...prevShowData
    //     ],
    //     credits: {
    //         enabled: false,
    //     }

    // };



    //  make data for showing
    let makeData = async (getData) => {

        try {
            let labelData = []
            let temp = []
            let finalValuedata = []
            let sendData = []

            let i = 0
            console.log("timeDate", getData.patientGraph)
            if (getData.patientGraph.length !== 0) {
                while (i !== getData.patientVital.length) {
                    getData.patientGraph.map((val, ind) => {
                        JSON.parse(val.vitalDetails).map((vital, index) => {
                            if (vital.vitalName === getData.patientVital[i].vitalName) {
                                temp.push(vital.vitalValue)

                            }
                        })
                        let date = val.vitalDateTime.split("T")[0]
                        let time = val.vitalDateTime.split("T")[1]
                        labelData.push("Time (" + time + ")")


                    })
                    setDateTime(props.grapVitalData.name + "\t Date \t" + getData.patientGraph[0].vitalDateTime.split("T")[0])
                    // console.log("date", getData.patientGraph[0].vitalDateTime.split("T")[0])
                    finalValuedata.push(temp)
                    temp = []
                    i = i + 1
                }
            }

            let sideDateTemp = []
            getData.vitalsDate && getData.vitalsDate.map((val, ind) => {
                sideDateTemp.push(val.vitalDate)
            })

            setSideDate(sideDateTemp.reverse())
            sideDateTemp = []
            // setBottomLabel(labelData)
            i = 0
            while (i !== getData.patientVital.length) {
                sendData.push({
                    type: 'spline',
                    data: finalValuedata[i],
                    name: getData.patientVital[i].vitalName,

                })
                i = i + 1
            }
            if (sendData.length > 0 && sendData[0].data.length > 0) {
                // setShowData(sendData)
            }
            else {
                // setShowData([])
                sendData = []

            }
            console.log("grapDta", sendData)
            // console.log("Senddata", sendData[0].data.length)
            grapConfig(labelData, sendData)
        }
        catch (e) {
            // setShowAlert(1)
            // setShowAlertMessage(e.message)
        }


    }

    let grapByDate = (e) => {
        setBool(0)

        let value = e.target.value
        // setDateTime(e.target.value)
        getdata(value)
        // setBottomPrevLabel(bottomLabel)
        // setPrevShowData(showData)
        // console.log("e.target.id", e.target.id)
        setActiveDateIndex(parseInt(e.target.id))

    }

    // let prevBtn = () => {
    //     setBool(0)
    //     setBottomPrevLabel(bottomLabel)
    //     setPrevShowData(showData)
    //     if (sideDate.length != 0) {

    //         if (activeDateIndex < (sideDate.length - 1) || activeDateIndex === null) {
    //             if (activeDateIndex != null) {
    //                 getdata((sideDate[activeDateIndex + 1]).split("T")[0])
    //                 setActiveDateIndex(activeDateIndex + 1)
    //             }
    //             else {
    //                 getdata((sideDate[0]).split("T")[0])
    //                 setActiveDateIndex(0)
    //             }

    //         }
    //         else {
    //             getdata((sideDate[activeDateIndex]).split("T")[0])
    //             setActiveDateIndex(activeDateIndex)
    //         }
    //     }
    //     grapConfig()


    // }

    // let nextBtn = () => {
    //     setBool(0)
    //     setBottomPrevLabel(bottomLabel)
    //     setPrevShowData(showData)
    //     if (sideDate.length != 0) {

    //         if (activeDateIndex > 0 || activeDateIndex === null) {
    //             if (activeDateIndex != null) {
    //                 getdata((sideDate[activeDateIndex - 1]).split("T")[0])
    //                 setActiveDateIndex(activeDateIndex - 1)
    //             }
    //             else {
    //                 getdata((sideDate[0]).split("T")[0])
    //                 setActiveDateIndex(0)
    //             }
    //         }
    //         else {
    //             getdata((sideDate[activeDateIndex]).split("T")[0])
    //             setActiveDateIndex(activeDateIndex)
    //         }
    //     }

    //     setShowGraph(graph2)

    // }

    useEffect(() => {
        getdata()
    }, [])



    return (
        <div className={`modal d-${props.grapVitalData.showGrap === 0 ? 'none' : 'block'}`}>


            <div className="modal-dialog modal-dialog-centered_ modal-xl">

                <div className="modal-content">
                    {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span> */}
                    {/* <BoxHeading name={dateTime ? dateTime : props.grapVitalData.name} textcolor="#7E7E7E" patientBool={true} patientName={props.grapVitalData.patientName} patientUhid={props.grapVitalData.UHID} /> */}
                    {/* <BoxHeading title={props.grapVitalData.name} patientName={props.grapVitalData.patientName} uhid={props.grapVitalData.UHID} /> */}



                    <span className="closee" onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>
                    <div className='p-profile'>
                        <div className='p-profile-h'>{props.grapVitalData.name}</div>
                        <div className='p-profile-h'>
                            <div className='pname'><span>{props.grapVitalData.patientName} </span></div>
                            <div className='pname'>- {props.grapVitalData.UHID}</div>
                        </div>
                    </div>

                    <div className='row m-0 my-1'>
                        <div className='col-10'>
                            {bool === 0 ?

                                showGraph === 1 ?
                                    <HighchartsReact highcharts={Highcharts} options={graph} />
                                    : <NODataFound /> :

                                <LodingIcon val={bool} />
                            }

                        </div>
                        <div className='col-2' >
                            <div className='mb-4'><b>Select Date</b></div>
                            <div style={{ maxHeight: '350px', overflow: 'auto' }}>
                                {sideDate && sideDate.map((value, index) => {
                                    if (value !== null) {
                                        return (
                                            <div className='d-flex gap-1 mb-3 align-items-center'>
                                                <input type="radio" name="dateselect" id={index} value={value.split("T")[0]} onClick={grapByDate} defaultChecked={activeDateIndex === index ? `checked` : ""} /> <label htmlFor={index} className=' fst-italic' style={{ fontSize: '14px' }}>{value.split("T")[0]}</label>
                                            </div>
                                        )
                                    }

                                })}

                            </div>
                        </div>

                    </div>


                </div>


            </div>

            {
                showAlert === 1 ?
                    <AlertToster message={showAlertMessage} handle={setShowAlert} /> : ""
            }
        </div>
    )
}