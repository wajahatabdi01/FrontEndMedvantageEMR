import React from 'react'
import '../../assets/css/highChart.css'
import { useEffect } from 'react'
import { useState } from 'react'
import Highcharts from 'highcharts';
import PatientInvestigationGraph from '../../Clinical/API/RemotePatientMonitorDashboard/PatientInvestigationGraph'

import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

import LodingIcon from '../../Component/Loader'
import BoxHeading from './BoxHeading';
import AlertToster from '../../Component/AlertToster'
import NODataFound from '../../Component/NODataFound';




export default function LineInvestigationGrap(props) {

    // showGrap: 0,
    // vitalIdSearchNew: '',
    // UHID: '',
    // userId: ''
    HighchartsExporting(Highcharts);

    // let [bottomLabel, setBottomLabel] = useState([])
    let [sideDate, setSideDate] = useState([])
    let [showData, setShowData] = useState(1)
    // let [getData, setGetData] = useState()
    // let [bottomPrevLabel, setBottomPrevLabel] = useState([])
    // let [prevShowData, setPrevShowData] = useState([])
    let [bool, setBool] = useState(1)
    let [activeDateIndex, setActiveDateIndex] = useState(null);
    let [dateTime, setDateTime] = useState()
    let [graph, setGraph] = useState()
    let [showAlert, setShowAlert] = useState(0)
    let [showAlertMessage, setShowAlertMessage] = useState("")


    let getdata = async (date) => {
        console.log("subtestId",  props.grapInvestigationData.subTestId)
        let data = await PatientInvestigationGraph(props.grapInvestigationData.userId, props.grapInvestigationData.UHID, props.grapInvestigationData.subTestId, date)
        // setGetData(data.responseValue)
        if (data.status === 1) {
            setBool(0)
            if (data.responseValue.patientInvestigationGraph.length !== 0) {
                setShowData(1)
            }
            else {
                setShowData(0)
                setTimeout(() => {
                    document.getElementById("0").checked = true
                    grapByDate({ target: { value: data.responseValue.patientInvestigationDate[0].subTestDateTime.split("T")[0] } })
                }, 150)
            }
            makeData(data.responseValue)
        }
        else {
            setBool(0)
            setShowAlert(1)
            setShowAlertMessage(data.responseValue)
        }


    }

    // setting HighGrap
    // let graph1 = {
    //     // chart: {
    //     //     type: 'spline'
    //     // },
    //     title: {
    //         text: props.grapInvestigationData.name
    //     },

    //     yAxis: {
    //         title: {
    //             text: 'Values'
    //         }
    //     },
    //     xAxis: {

    //         labels: {
    //             rotation: -45
    //         },
    //         categories: bottomLabel
    //     },
    //     exporting: {
    //         enabled: true
    //     },

    //     plotOptions: {
    //         series: {
    //             dataLabels: {
    //                 align: 'top',
    //                 enabled: true
    //             }
    //         }
    //     },
    //     series: [
    //         ...showData
    //     ]
    // };

    let grapConfig = (labelData, sendData) => {
        // console.log("length", labelData)
        // console.log("value", sendData)
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
                text: props.grapInvestigationData.name
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
                // max:10,
                // tickInterval: sendData,
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

    // setting grap 2

    // let graph2 = {
    //     // chart: {
    //     //     type: 'spline'
    //     // },
    //     title: {
    //         text: props.grapInvestigationData.name
    //     },

    //     yAxis: {
    //         title: {
    //             text: 'Values'
    //         }
    //     },
    //     xAxis: {

    //         labels: {
    //             rotation: -45
    //         },
    //         categories: bottomPrevLabel
    //     },
    //     exporting: {
    //         enabled: true
    //     },

    //     plotOptions: {
    //         series: {
    //             dataLabels: {
    //                 align: 'top',
    //                 enabled: true
    //             }
    //         }
    //     },
    //     series: [
    //         ...prevShowData
    //     ]
    // };



    //  make data for showing
    let makeData = async (getData) => {
        let labelData = []
        let temp = []
        let finalValuedata = []
        let sendData = []

        let i = 0
        while (i != getData.patientInvestigationGraph.length) {
            getData.patientInvestigationGraph.map((subtest, ind) => {
                {
                    if (subtest.subTestName === getData.patientInvestigationGraph[i].subTestName) {
                        temp.push(subtest.subTestValue)
                    }
                }
                let date = subtest.subTestDateTime.split(" ")[0]
                let time = subtest.subTestDateTime.split(" ")[1]
                labelData.push("Time (" + time + ")")

            })

            setDateTime(props.grapInvestigationData.name + "\t Date \t" + getData.patientInvestigationGraph[0].subTestDateTime.split("T")[0])
            finalValuedata.push(temp)
            temp = []
            i = i + 1
        }
        let sideDateTemp = []
        getData.patientInvestigationDate && getData.patientInvestigationDate.map((val, ind) => {
            sideDateTemp.push(val.subTestDateTime)
        })
        setSideDate(sideDateTemp.reverse())
        sideDateTemp = []
        // setBottomLabel(labelData)
        i = 0
        while (i !== getData.patientInvestigationGraph.length) {
            sendData.push({
                type: 'spline',
                data: finalValuedata[i],
                name: getData.patientInvestigationGraph[i].subTestName
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
        grapConfig(labelData, sendData)


    }

    let grapByDate = (e) => {
        setBool(0)

        let value = e.target.value
        getdata(value)
        // setBottomPrevLabel(bottomLabel)
        // setPrevShowData(showData)
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
    // }

    useEffect(() => {
        getdata()
    }, [])



    return (
        <div className={`modal d-${props.grapInvestigationData.showGrap === 0 ? 'none' : 'block'}`}>


            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={props.modelCloseFun}>
                            <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                        </span> */}
                    {/* <BoxHeading name={dateTime ? dateTime : props.grapInvestigationData.name} textcolor="#7E7E7E" patientBool={true} patientName={props.grapInvestigationData.patientName} patientUhid={props.grapInvestigationData.UHID} /> */}
                    {/* <BoxHeading title={props.grapInvestigationData.name} patientName={props.grapInvestigationData.patientName} uhid={props.grapInvestigationData.UHID} /> */}

                    <span className="closee" onClick={props.modelCloseFun}><i className='fa fa-times'></i></span>
                    <div className='p-profile'>
                        <div className='p-profile-h'>{props.grapInvestigationData.name}</div>
                        <div className='p-profile-h'>
                            <div className='pname'><span>{props.grapInvestigationData.patientName} </span></div>
                            <div className='pname'>- {props.grapInvestigationData.UHID}</div>
                        </div>
                    </div>

                    <div className='row m-0 my-1'>
                        <div className='col-10'>

                            {bool === 0 ?
                                showData === 1 ?
                                    <HighchartsReact highcharts={Highcharts} options={graph} />
                                    :
                                    <NODataFound />
                                :
                                <LodingIcon val={bool} />
                            }

                        </div>
                        <div className='col-2'>
                            <div className='mb-4'><b>Select Date</b></div>
                            <div style={{ maxHeight: '350px' }}>
                                {sideDate && sideDate.map((value, index) => {
                                    return (
                                        <div className='d-flex gap-1 mb-3 align-items-center'>
                                            <input type="radio" name="dateselect" id={index} value={value.split("T")[0]} onClick={grapByDate} defaultChecked={activeDateIndex === index ? `checked` : ""} /> <label htmlFor={index} className=' fst-italic' style={{ fontSize: '14px' }}>{value.split("T")[0]}</label>
                                        </div>
                                    )
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
