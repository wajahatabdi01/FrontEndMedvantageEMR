//import {React}from 'react'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import "./css/bodysection.css"
import Navbar from '../../../../../../Component/Navbar'
import IPDSharePageSidebar from '../../IPDSharePageSidebar'


//import GetPatientPersonalDashboard from '../../../../../Api/IPD/PersonalDashboard/GetPatientPersonalDashboard'
//import BodyPart from '../../../../../Api/Bodypart/BodyPart'

import OffcanvasLogo from "../../../../../../assets/images/Navbar/offcanvas-logo.png"
import fullbody from './images/fullbody.png'
import fullbodyFemale from './images/fullbodyFemale.png'
import logo from './images/logo.png'
import avtar from './images/avtar.png'
import icu from './images/icu.png'
import bed from './images/bed.png'
import days from './images/days.png'
import monitor from './images/monitor.png'
import maximize from './images/maximize.png'
import g1 from './images/g1.png'
import bloodPressure from './images/blood-pressure.png'
import g2 from './images/g2.png'
import rr from './images/rr.png'
import g3 from './images/g3.png'
import pulse1 from './images/pulse1.png'
import g4 from './images/g4.png'
import co2 from './images/co2.png'
import g5 from './images/g5.png'
import investigation from './images/investigation.png'
import report from './images/report.png'
import red from './images/red.png'
import notes from './images/notes.png'
import ventilator from './images/ventilator.png'
import mask from './images/mask.png'
import glucose from './images/glucose.png'
import plaster from './images/plaster.png'
import p1 from './images/p1.png'
import bp from './images/bp.png'
import pulse from './images/pulse.png'
import yellow from './images/yellow.png'
import Ammonia from './images/Ammonia.png'
import rtfeed from './images/rtfeed.png'
import graph from './images/graph.png'
import exclamationMark1 from './images/exclamation-mark1.png'
import N from './images/N.png'
import F from './images/F.png'
import temperature from './images/temperature.png'
import Sugar from './images/Sugar.png'
import Lipid from './images/Lipid.png'
import Liver from './images/Liver.png'
import Thyroid from './images/Thyroid.png'
import xray from './images/xray.png'
import expand from './images/expand.png'
import kidney from './images/kidney.png'



import pulseVitalIcon from '../../../../../../../src/assets/images/icons/pulseVitalIcon.svg'
import bpSysDysVitalIcon from '../../../../../../../src/assets/images/icons/bpSysDysVitalIcon.svg'
import bloodPressureVitalIcon from '../../../../../../../src/assets/images/icons/bloodPressureVitalIcon.svg'
import tempratureVitalIcon from '../../../../../../../src/assets/images/icons/tempratureVitalIcon.svg'
import sketchVitalIcon from '../../../../../../../src/assets/images/icons/sketchVitalIcon.svg'
import ventilationVmIcon from '../../../../../../../src/assets/images/icons/ventilationVmIcon.svg'
import ventilationPeepIcon from '../../../../../../../src/assets/images/icons/ventilationPeepIcon.svg'
import ventilationFio2Icon from '../../../../../../../src/assets/images/icons/ventilationFio2Icon.svg'
import bloodPressureVantilationPAPIcon from '../../../../../../../src/assets/images/icons/bloodPressureVantilationPAPIcon.svg'
import GetTestResultListByUhid from '../../../../../API/IPD/personalDashboardIndexSecond/GetTestResultListByUhid'
import GetPatientIPDAllHistoryById from '../../../../../API/IPD/personalDashboardIndexSecond/GetPatientIPDAllHistoryById'
import GetPatientDetailsByUHID from '../../../../../API/IPD/personalDashboardIndexSecond/GetPatientDetailsByUHID'
import GetPatientLifeSupportAssign from '../../../../../API/IPD/personalDashboardIndexSecond/GetPatientLifeSupportAssign'


export default function PersonalDashboardIndexSecond(props) {
    let [IPDHistoryList, setIPDHistoryList] = useState()
    let [vitalList, setVitalList] = useState()
   
    let [patientDetailsList, setPatientDetailsList] = useState()
    let [patientLifeSupportList, setPatientLifeSupportList] = useState()

    let uhID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;    
    let pmID = JSON.parse(window.sessionStorage.getItem("IPDpatientList")).pmId;

    //Get data
    let getTestResultData = async () => {
        let getTestResult = await GetTestResultListByUhid(uhID);
        if (getTestResult.status === 1) {
            setIPDHistoryList(getTestResult.responseValue)
        }
    }
    //Get Patient IPD History
    let getPatientIPDHistory = async () => {
        let getPatienVital = await GetPatientIPDAllHistoryById(uhID);
        if (getPatienVital.status === 1) {
            setVitalList(getPatienVital.responseValue.patientVitals)
        }
    }
    //Get Patient Details
    let getPatientDetails = async () => {
        let getPatienDetails = await GetPatientDetailsByUHID(uhID);
        if (getPatienDetails.status === 1) {
            setPatientDetailsList(getPatienDetails.responseValue)
        }
    }
    //Get Patient lifeSupport Information

    let getPatientLifeSupport = async () => {

        let getPatientLifeSupport = await GetPatientLifeSupportAssign(uhID);

        if (getPatientLifeSupport.status === 1) {

            setPatientLifeSupportList(getPatientLifeSupport.responseValue.ventiList)

        }

    }




   


    useEffect(() => {
        getTestResultData();
        getPatientIPDHistory();
        getPatientDetails();
        getPatientLifeSupport(uhID);
    }, []);
    return (
        <>
            {/* <Navbar />
            <IPDSharePageSidebar /> */}
            <div className="">
                {/* <div className="container-fluid px-1">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Health Checker</div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="right-cont">
                    <div className="cont">

                        <div className="col1_ flex1_">
                            <div className="left-sec">
                                <div className="left-sec-n">
                                    <div className="left-sec-in"><img src={monitor} /><span> ICU Monitor</span></div>
                                    <div className="left-sec-in"><img className="resizebtn" src={maximize} /> </div>
                                </div>
                                <div className="left-sec-details">
                                    <div className="left-sec-details-in">



                                        <div className="left-sec-graph">
                                            <div className="left-sec-graph1">
                                                <img src={g1} className="resizebtn" />
                                            </div>
                                            <div className="left-sec-graph2 flexror">
                                                <div className="left-sec-gdetail5"><img src={bloodPressure} className="che" />BP</div>
                                                <div className="left-sec-gdetail5">
                     
                                                <span className="co2txt" style={{ color: '#4C62C3' }}>80 </span> / <span className="co2txt" style={{ color: '#FF8289' }}>45 mmHg</span>

                                                    {/* {vitalList && vitalList.map((val, index) => {
                                                        return (
                                                            <span className="co2txt" style={{ color: '#4C62C3' }}>{val.vmId === 4 ? val.vmValue : ''} </span>
                                                        )
                                                    }
                                                    )}
                                                    /
                                                    {vitalList && vitalList.map((val, index) => {
                                                        return (
                                                            <span className="co2txt" style={{ color: '#FF8289' }}>{val.vmId === 6 ? val.vmValue : ''}</span>
                                                        )
                                                    }
                                                    )} */}
                                                    {/* &nbsp;mmHg */}
                                                    
                                                    </div>
                                            </div>
                                        </div>

                                        <div className="left-sec-graph">
                                            <div className="left-sec-graph1">
                                                <img src={g2} className="resizebtn" />
                                            </div>
                                            <div className="left-sec-graph2 flexror">
                                                <div className="left-sec-gdetail5"><img src={rr} className="che" />RR</div>
                                                <div className="left-sec-gdetail5"><span className="co2txt" style={{ color: '#4294FF' }}>30 RPM</span></div>
                                                {/* {vitalList && vitalList.map((val, index) => {
                                                    return (
                                                        <div className="left-sec-gdetail5"><span className="co2txt" style={{ color: '#4294FF' }}>{val.vmId === 7 ? val.vmValue : ''} </span></div>
                                                    )
                                                })
                                                } */}

                                            </div>
                                        </div>

                                        <div className="left-sec-graph">
                                            <div className="left-sec-graph1">
                                                <img src={g3} className="resizebtn" />
                                            </div>
                                            <div className="left-sec-graph2 flexror">
                                                <div className="left-sec-gdetail5"><img src={pulse1} className="che" />Spo2</div>
                                                <div className="left-sec-gdetail5">
                                                <span className="co2txt" style={{ color: '#EA1D98' }}>92 SPO2 </span>

                                                    {/* {vitalList && vitalList.map((val, index) => {
                                                        return (
                                                            <span className="co2txt" style={{ color: '#EA1D98' }}>{val.vmId === 56 ? val.vmValue : ''} </span>
                                                        )
                                                    })
                                                    } */}
                                                   
                                                </div>
                                            </div>
                                        </div>

                                        <div className="left-sec-graph">
                                            <div className="left-sec-graph1">
                                                <img src={g4} className="resizebtn" />
                                            </div>
                                            <div className="left-sec-graph2 flexror">
                                                <div className="left-sec-gdetail5"><img src={co2} className="che" />HR</div>
                                                <div className="left-sec-gdetail5">
                                                <span className="co2txt">350  bmp</span>

                                                    {/* {vitalList && vitalList.map((val, index) => {
                                                        return (
                                                            <span className="co2txt">{val.vmId === 74 ? val.vmValue : ''}  </span>
                                                        )
                                                    })
                                                    }
                                                    <span className="grmtxt">bmp</span> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="left-sec-graph">
                                            <div className="left-sec-graph1">
                                                <img src={g4} className="resizebtn" />
                                            </div>
                                            <div className="left-sec-graph2 flexror">
                                                <div className="left-sec-gdetail5"><img src={pulse1} className="che" />Pulse</div>
                                                <div className="left-sec-gdetail5">
                                                <span className="bluetxt">350  bmp</span>

                                                    {/* {vitalList && vitalList.map((val, index) => {
                                                        return (
                                                            <span className="bluetxt">{val.vmId === 3 ? val.vmValue : ''}  </span>
                                                        )
                                                    })
                                                    } */}
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="left-sec-graph">
                                            <div className="left-sec-graph1">
                                                <img src={g5} className="resizebtn" />
                                            </div>
                                            <div className="left-sec-graph2">
                                                <div className="left-sec-gdetail">Pulse
                                                    {vitalList && vitalList.map((val, index) => {
                                                        return (
                                                            <span className="bluetxt">{val.vmId === 3 ? val.vmValue : ''}  </span>
                                                        )
                                                    })
                                                    }
                                                </div>                                                
                                            </div>
                                        </div> */}

                                    </div>
                                    <div className="left-sec-details-in2">
                                        <div className="left-sec-details-in3">
                                            {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d1">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        <span>{v.subtestID === 206 ? v.subTestName : ''}</span>
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })} */}

                                            <div className="d1">Alb</div>
                                            <div className="d2">
                                            {/* <span className="greenn">1.4 </span>  */}
                                            <span className="redd">10.0 </span>
                                            </div>

                                            {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 447 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 447 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })} */}

                                            {/* <span className="oran"><i className="fa fa-star"></i></span> */}
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">Hb</div>
                                            <span className="greenn">30 </span>
                                            {/* <span className="redd">50</span> */}

                                            {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 271 ? v.result : ''} </span>
                                                                            : <span className="redd">{v.subtestID === 271 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })} */}


                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">HCO3</div>
                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 617 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 617 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">Etco2</div>
                                            {vitalList && vitalList.map((val, index) => {
                                                return (

                                                    <div className="d2"> <span className="redd">{val.vmId === 225 ? val.vmValue : ''} </span></div>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">WBC</div>

                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {/* <span className="greenn">{v.subtestID === 272 ? v.result : ''} </span> */}
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 272 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 272 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}


                                        </div>

                                        <div className="left-sec-details-in3">
                                            <div className="d1">K+</div>

                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {/* <span className="redd">{v.subtestID === 499 ? v.result : ''} </span> */}

                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 499 ? v.result : ''} </span>
                                                                            : <span className="redd">{v.subtestID === 499 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}


                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">PH</div>

                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 373 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 373 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}


                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">TMP</div>
                                            {vitalList && vitalList.map((val, index) => {
                                                return (
                                                    <div className="d2"> <span className="redd">{val.vmId === 5 ? val.vmValue : ''} </span></div>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">LACTATE</div>
                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {/* <span className="greenn">{v.subtestID === 1398 ? v.result : ''} </span> */}
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 1398 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 1398 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">SGPT</div>
                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {/* <span className="greenn">{v.subtestID === 238 ? v.result : ''} </span> */}
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 238 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 238 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <div className="left-sec-details-in3">
                                            <div className="d1">Ca++</div>
                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {/* <span className="greenn">{v.subtestID === 612 ? v.result : ''} </span> */}
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 612 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 612 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">PCO2</div>
                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        {/* <span className="greenn">{v.subtestID === 608 ? v.result : ''} </span> */}
                                                                        {v.isNormalResult === 1 ?
                                                                            <span className="greenn">{v.subtestID === 608 ? v.result : ''} </span> :
                                                                            <span className="redd">{v.subtestID === 608 ? v.result : ''} </span>
                                                                        }
                                                                    </>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">B Urea</div>
                                            {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                return (
                                                    <div className="d2">
                                                        {
                                                            JSON.parse(val.jsonResult).map((v, ind) => {
                                                                return (
                                                                    <>
                                                                        <span className="greenn">{v.subtestID === 496 ? v.result : ''} </span>
                                                                    </>

                                                                )
                                                            })
                                                        }
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">RBS</div>
                                            {vitalList && vitalList.map((val, index) => {
                                                return (
                                                    <div className="d2"> <span className="redd">{val.vmId === 10 ? val.vmValue : ''} </span></div>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className="left-sec-details-in3">
                                            <div className="d1">-</div><div className="d2"></div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                            {/* ----------------------------------Start Test Report Section-------------------------------------------------- */}
                            <div className="prol">


                                {/* ---------------------------Arterial Blood Gas(ABG)----------------------- */}
                                <div className="profile-sym maxx">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={Thyroid} /></div>
                                        {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                            return (
                                                <div className="prof">{val.testID === 869 ? val.testname : ''}</div>
                                            )
                                        })

                                        } */}
                                        <div className="prof">Arterial Blood Gas (ABG)</div>
                                    </div>

                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        {/* <div className="test-cnt1 extr">
                                           
                                            
                                        </div> */}

                                        <div className="test-cnt1">
                                            <table className='tableBodyPartsResult'>
                                                <tr>
                                                    <td> <div className="test-cnt res1">Test Name</div></td>
                                                    <td><div className="test-cnt res res1">Result</div></td>
                                                </tr>
                                                {IPDHistoryList && IPDHistoryList.map((val, ind) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, i) => {
                                                                    return (
                                                                        <>
                                                                            {val.testID === 869 ?

                                                                                <tr>
                                                                                    <td><div className="test-cnt">{v.subTestName}</div></td>
                                                                                    <td><div className="test-cnt res">{v.result}</div></td>
                                                                                </tr>

                                                                                : ""}

                                                                        </>

                                                                    )
                                                                }

                                                                )
                                                            }
                                                        </>
                                                    )
                                                })
                                                }

                                            </table>
                                        </div>


                                    </div>





                                    {/* <div className="watchout-cnt ">
                                        <div className="watchout-head">Please Watchout</div>
                                        <div className="test-cnt1 extr">
                                            <div className="test-cnt res1">Test Name</div>
                                            <div className="test-cnt res res1">Result</div>
                                        </div>
                                        <div className="test-cnt1">
                                            <div className="test-cnt">Hemoglobin</div>

                                            <div className="test-cnt res">
                                                {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, ind) => {
                                                                    return (
                                                                        <>
                                                                            <span>{v.subtestID === 271 ? v.result : ''}</span>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    );
                                                })}
                                            </div>

                                        </div>

                                        <div className="test-cnt1">
                                            <div className="test-cnt">Haematocrit</div>
                                            <div className="test-cnt res">35.2</div>
                                        </div>
                                        <div className="test-cnt1">

                                            <div className="test-cnt">
                                                {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, ind) => {
                                                                    return (
                                                                        <>
                                                                            <span>{v.subtestID === 279 ? v.subTestName : ''}</span>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    );
                                                })}
                                            </div>


                                            <div className="test-cnt res">
                                                {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, ind) => {
                                                                    return (
                                                                        <>
                                                                            <span>{v.subtestID === 279 ? v.result : ''}</span>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    );
                                                })}
                                            </div>

                                        </div>
                                    </div> */}
                                </div>
                                {/* ---------------------------KFT Profile----------------------- */}
                                <div className="profile-sym maxx">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={Lipid} /></div>
                                        {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                            return (
                                                <div className="prof">{val.testID === 1451 ? val.testname : ''}</div>
                                            )
                                        })

                                        } */}
                                        <div className="prof">KFT Profile</div>
                                    </div>

                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        {/* <div className="test-cnt1 extr">
                                           
                                            
                                        </div> */}

                                        <div className="test-cnt1">
                                            <table className='tableBodyPartsResult'>
                                                <tr>
                                                    <td> <div className="test-cnt res1">Test Name</div></td>
                                                    <td><div className="test-cnt res res1">Result</div></td>
                                                </tr>
                                                {IPDHistoryList && IPDHistoryList.map((val, ind) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, i) => {
                                                                    return (
                                                                        <>
                                                                            {val.testID === 1451 ?

                                                                                <tr>
                                                                                    <td><div className="test-cnt">{v.subTestName}</div></td>
                                                                                    <td><div className="test-cnt res">{v.result}</div></td>
                                                                                </tr>

                                                                                : ""}

                                                                        </>

                                                                    )
                                                                }

                                                                )
                                                            }
                                                        </>
                                                    )
                                                })
                                                }

                                            </table>
                                        </div>


                                    </div>


                                </div>

                                {/* ---------------------------ALB----------------------- */}
                                <div className="profile-sym maxx">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={Liver} /></div>
                                        {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                            return (
                                                <div className="prof">{val.testID === 2058 ? val.testname : ''}</div>
                                            )
                                        })

                                        } */}
                                        <div className="prof">ALB</div>
                                    </div>

                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        {/* <div className="test-cnt1 extr">
                                           
                                            
                                        </div> */}

                                        <div className="test-cnt1">
                                            <table className='tableBodyPartsResult'>
                                                <tr>
                                                    <td> <div className="test-cnt res1">Test Name</div></td>
                                                    <td><div className="test-cnt res res1">Result</div></td>
                                                </tr>
                                                {IPDHistoryList && IPDHistoryList.map((val, ind) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, i) => {
                                                                    return (
                                                                        <>
                                                                            {val.testID === 2058 ?

                                                                                <tr>
                                                                                    <td><div className="test-cnt">{v.subTestName}</div></td>
                                                                                    <td><div className="test-cnt res">{v.result}</div></td>
                                                                                </tr>

                                                                                : ""}

                                                                        </>

                                                                    )
                                                                }

                                                                )
                                                            }
                                                        </>
                                                    )
                                                })
                                                }

                                            </table>
                                        </div>


                                    </div>


                                </div>

                                {/* ---------------------------COMPLETE BLOOD COUNT (CBC)----------------------- */}
                                <div className="profile-sym maxx">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={Sugar} /></div>
                                        {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                            return (
                                                <div className="prof">{val.testID === 1084 ? val.testname : ''}</div>
                                            )
                                        })

                                        } */}
                                        <div className="prof">COMPLETE BLOOD COUNT (CBC)</div>
                                    </div>

                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        {/* <div className="test-cnt1 extr">
                                           
                                            
                                        </div> */}

                                        <div className="test-cnt1">
                                            <table className='tableBodyPartsResult'>
                                                <tr>
                                                    <td> <div className="test-cnt res1">Test Name</div></td>
                                                    <td><div className="test-cnt res res1">Result</div></td>
                                                </tr>
                                                {IPDHistoryList && IPDHistoryList.map((val, ind) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, i) => {
                                                                    return (
                                                                        <>
                                                                            {val.testID === 1084 ?

                                                                                <tr>
                                                                                    <td><div className="test-cnt">{v.subTestName}</div></td>
                                                                                    <td><div className="test-cnt res">{v.result}</div></td>
                                                                                </tr>

                                                                                : ""}

                                                                        </>

                                                                    )
                                                                }

                                                                )
                                                            }
                                                        </>
                                                    )
                                                })
                                                }

                                            </table>
                                        </div>


                                    </div>


                                </div>

                                {/* ---------------------------(K+)----------------------- */}
                                <div className="profile-sym maxx">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={kidney} /></div>
                                        {/* {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                            return (
                                                <div className="prof">{val.testID === 1450 ? val.testname : ''}</div>
                                            )
                                        })

                                        } */}
                                        <div className="prof">K+</div>
                                    </div>

                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        {/* <div className="test-cnt1 extr">
                                           
                                            
                                        </div> */}

                                        <div className="test-cnt1">
                                            <table className='tableBodyPartsResult'>
                                                <tr>
                                                    <td> <div className="test-cnt res1">Test Name</div></td>
                                                    <td><div className="test-cnt res res1">Result</div></td>
                                                </tr>
                                                {IPDHistoryList && IPDHistoryList.map((val, ind) => {
                                                    return (
                                                        <>
                                                            {
                                                                JSON.parse(val.jsonResult).map((v, i) => {
                                                                    return (
                                                                        <>
                                                                            {val.testID === 1450 ?

                                                                                <tr>
                                                                                    <td><div className="test-cnt">{v.subTestName}</div></td>
                                                                                    <td><div className="test-cnt res">{v.result}</div></td>
                                                                                </tr>

                                                                                : ""}

                                                                        </>

                                                                    )
                                                                }

                                                                )
                                                            }
                                                        </>
                                                    )
                                                })
                                                }

                                            </table>
                                        </div>


                                    </div>


                                </div>





                                {/* <div className="profile-sym maxx">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={Lipid} /></div>
                                        <div className="prof">Lipid Profile</div>
                                    </div>
                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        <div className="test-cnt1 extr">
                                            <div className="test-cnt res1">Test Name</div>
                                            <div className="test-cnt res res1">Result</div>
                                        </div>
                                        <div className="test-cnt1">
                                            <div className="test-cnt">HDL : LDL ratio </div>
                                            <div className="test-cnt res">0.60</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-sym maxx">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={Liver} /></div>
                                        <div className="prof">Liver Profile</div>
                                    </div>
                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        <div className="test-cnt1 extr">
                                            <div className="test-cnt res1">Test Name</div>
                                            <div className="test-cnt res res1">Result</div>
                                        </div>
                                        <div className="test-cnt1">
                                            <div className="test-cnt">ALP</div>
                                            <div className="test-cnt res">14.4</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-sym maxx1">
                                    <div className="profile-sym-in">
                                        <div className="prof"><img src={Sugar} /></div>
                                        <div className="prof">Diabetes Monitoring</div>
                                    </div>
                                    <div className="watchout-cnt">
                                        <div className="watchout-head">Please Watchout</div>
                                        <div className="test-cnt1 extr">
                                            <div className="test-cnt res1">Test Name</div>
                                            <div className="test-cnt res res1">Result</div>
                                        </div>
                                        <div className="test-cnt1">
                                            <div className="test-cnt">Blood Sugar (Fasting)</div>
                                            <div className="test-cnt res">11.3</div>
                                        </div>
                                        <div className="test-cnt1">
                                            <div className="test-cnt">HbA1c (Glycosylated Haemologbin)</div>
                                            <div className="test-cnt res">212</div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* ----------------------------------End Test Report Section-------------------------------------------------- */}

                        </div>

                        <div className="col2_ flex1_">
                            <div className="left-sec" style={{ position: 'relative' }}>
                                <div className="left-sec-n">
                                    <div className="left-sec-in"><img src={monitor} /><span>Diagnosis</span></div>
                                    <div className="left-sec-in"><img src={maximize} className="resizebtn" /> </div>
                                </div>
                            </div>

                            <div className="sec-diagd-cnt">
                                <div className="sec-diagd diaff">
                                    <div className="sec-diagd-in"><span className="bluecircle"></span>Liver Abscess</div>
                                    <div className="sec-diagd-in wtt"><span className="wtcircle"></span>T2DM</div>
                                </div>
                            </div>

                            <div className="bodypart-cnt-in">
                                <div className="bodypart">

                                <img src={fullbody} className="bdy" />

                                {/* <img src={fullbodyFemale} className="bdy" /> */}


                                    {/* {patientDetailsList && patientDetailsList.map((val, index) => {
                                        return (
                                            <>
                                                {val.gender === 'Male' || val.gender==='M' ?
                                                    <img src={fullbody} className="bdy" />

                                                    : <img src={fullbodyFemale} className="bdy" />}

                                            </>

                                        )
                                    })} */}

                                    {/* -------------------------Ventilator---------------------------------- */}
                                    <div id="ventilator" className="ventilatorpart-in">                                       

                                        <div className="ventilatorpart1"></div>

                                        <div className="ventilatorpart"><img src={ventilator} alt="Ventilator" /></div>


                                          {/* {patientLifeSupportList && patientLifeSupportList.map((val, index) => {
                                            if (val.uhid === uhID) {
                                                return (
                                                    <>                                                        
                                                        {val.isIntubateBtn === 1 && val.uhid === uhID ?

                                                            (<div className="ventilatorpart1"></div>)
                                                            :
                                                            (<div className="ventilatorpart1" style={{ display: 'none' }}></div>)
                                                        }
                                                        <div className="ventilatorpart">
                                                            {val.isIntubateBtn === 1 && val.uhid === uhID ?

                                                                (<img src={ventilator} alt="Ventilator" />)
                                                                :
                                                                (<img src={ventilator} alt="Ventilator" style={{ display: 'none' }} />)
                                                            }
                                                        </div>

                                                    </>

                                                );
                                            }
                                            return null;
                                        })} */}

                                        <div className="maskpart">
                                            <img src={mask} alt='mask' />
                                        </div>


                                        {patientLifeSupportList && patientLifeSupportList.map((val, index) => {
                                            if (val.uhid === uhID) {
                                                return (
                                                    <div className="fio2" key={index}>
                                                        FiO2 <span>{val.fio2}</span>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>

                                    {/* <div id="ventilator" className="ventilatorpart-in">
                                        <div className="ventilatorpart1"></div>

                                        {patientLifeSupportList &&
                                            patientLifeSupportList.map((val, index) => {
                                                if (val.uhid === uhID) {
                                                    const shouldDisplayVentilator = val.isIntubateBtn === 1;
                                                    return (
                                                        <div key={index}>
                                                            <div className="ventilatorpart">
                                                                {shouldDisplayVentilator ? (
                                                                    <img src={ventilator} alt="Ventilator" />
                                                                ) : (
                                                                    <img src={ventilator} alt="Ventilator" style={{ display: 'none' }} />
                                                                )}
                                                            </div>
                                                            <div className="maskpart">
                                                                <img src={mask} alt="Mask" />
                                                            </div>
                                                            <div className="fio2">
                                                                FiO2 <span>{val.fio2}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                    </div> */}





                                    <div id="glucose">
                                        <div className="glucosepart"><img src={glucose} /></div>
                                    </div>

                                    <div id="plaster">
                                        <div className="plasterpart"><img src={plaster} /></div>
                                        <div className="p1part"><img src={p1} /></div>
                                        <div className="dvp">DVT Pump<br />21/06/2023 02:30AM</div>
                                    </div>

                                    <div id="pulserate" className="pulse-in">
                                        <div className="pulse1"></div>
                                        <div className="pulse2"></div>
                                        <div className="pulsepart"><img src={pulse} /></div>
                                    </div>

                                    <div id="bloodpressure" className="bp-in">
                                        <div className="bp1"></div>
                                        <div className="bp2"></div>
                                        <div className="bppart"><img src={bp} /></div>
                                    </div>

                                    <div id="ECGpart" className="ecg-in">
                                        <div className="ecg1"></div>
                                        <div className="ecg2"></div>
                                    </div>

                                    <div className="kidneyprofile-in">
                                        <div className="kidneyprofile1"></div>
                                        <div className="kidneyprofile2"></div>
                                    </div>

                                    <div className="Diabetes-in">
                                        <div className="Diabetes1"></div>
                                        <div className="Diabetes2"></div>
                                    </div>

                                    <div className="liver-in">
                                        <div className="liver1"></div>
                                        <div className="liver2"></div>
                                    </div>

                                    <div className="lipid-in">
                                        <div className="lipid1"></div>
                                        <div className="lipid2"></div>
                                    </div>

                                    <div className="redcircle3">
                                        <i className="fa fa-circle text-danger-glow blink"></i>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="organs">
                                <span id="venti">Ventilator</span>
                                <span id="glu">Glucose</span>
                                <span id="plas">Plaster</span>
                                <span id="bp">BP</span>
                                <span id="pulse">Pulse</span>
                                <span id="ECG">ECG</span>
                            </div> */}
                        </div>

                        <div className="col3_ flex1_">
                            <div className="right-sec">
                                <div className="left-sec">
                                    <div className="left-sec-n">
                                        <div className="left-sec-in"><img src={monitor} /><span> ECG Monitor</span></div>
                                        <div className="left-sec-in"><img src={maximize} className="resizebtn" /> </div>
                                    </div>
                                    <div className="left-sec-Monitor">
                                        <div className="left-sec-Monitor-in1">
                                            <div className="gr">
                                                <img src={graph} style={{ width: '100%' }} />
                                            </div>
                                            <div className="gr-in">
                                                <div className="gr-in1">HEART RATE(BPM): <span style={{ color: '#43A047' }}>67</span></div>
                                                <div className="gr-in1">VARIABILITY(std): <span style={{ color: '#43A047' }}>67</span></div>
                                            </div>
                                        </div>
                                        <div className="left-sec-Monitor-in2">
                                            <div className="left-sec-Monitor-in2-1">
                                                <p>T PEAK(MAG%) <span className="redtxt">-322%</span></p>
                                            </div>
                                            <div className="left-sec-Monitor-in2-1">
                                                <p>ST DEVIATE(%) <span className="greentxt">1%</span></p>
                                            </div>
                                            <div className="left-sec-Monitor-in2-1">
                                                <p>STATUS <span className="redtxt">T Inverted</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile-sym-cnt">
                                    <div className="profile-sym">
                                        <div className="profile-sym-in">
                                            <div className="prof"><img src={kidney} /></div>
                                            <div className="prof">Kidney and Electrolyte Profile</div>
                                        </div>
                                        <div className="watchout-cnt">
                                            <div className="watchout-head">Please Watchout</div>
                                            <div className="test-cnt1 extr">
                                                <div className="test-cnt res1">Test Name</div>
                                                <div className="test-cnt res res1">Result</div>
                                            </div>
                                            <div className="test-cnt1">
                                                {/* <div className="test-cnt">Blood Urea</div> */}

                                                <div className="test-cnt">
                                                    {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    JSON.parse(val.jsonResult).map((v, ind) => {
                                                                        return (
                                                                            <>
                                                                                <span>{v.subtestID === 496 ? v.subTestName : ''}</span>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        );
                                                    })}
                                                </div>

                                                <div className="test-cnt res">
                                                    {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    JSON.parse(val.jsonResult).map((v, ind) => {
                                                                        return (
                                                                            <>
                                                                                <span>{v.subtestID === 496 ? v.result : ''}</span>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        );
                                                    })}
                                                </div>

                                            </div>



                                            <div class="test-cnt1">
                                                <div class="test-cnt">Blood Urea Nitrogen</div>
                                                <div class="test-cnt res">72.57</div>
                                            </div>
                                            <div className="test-cnt1">
                                                {/* <div className="test-cnt">Creatinine</div> */}

                                                <div className="test-cnt">
                                                    {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    JSON.parse(val.jsonResult).map((v, ind) => {
                                                                        return (
                                                                            <>
                                                                                <span>{v.subtestID === 497 ? v.subTestName : ''}</span>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        );
                                                    })}
                                                </div>

                                                <div className="test-cnt res">
                                                    {IPDHistoryList && IPDHistoryList.map((val, index) => {
                                                        return (
                                                            <>
                                                                {
                                                                    JSON.parse(val.jsonResult).map((v, ind) => {
                                                                        return (
                                                                            <>
                                                                                <span>{v.subtestID === 497 ? v.result : ''}</span>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </>
                                                        );
                                                    })}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-sym">
                                        <div className="profile-sym-in">
                                            <div className="prof"><img src={Thyroid} /></div>
                                            <div className="prof">Mineral Profile</div>
                                        </div>
                                        <div className="profile-sym-in descrip">Everything looks good</div>
                                        <div className="profile-sym-in mtt">
                                            <div className="prof"><img src={Thyroid} /></div>
                                            <div className="prof">Thyroid Profile</div>
                                        </div>
                                        <div className="profile-sym-in descrip">All parameters within normal limit</div>
                                    </div>
                                </div>

                                <div className="left-sec1">
                                    <div className="reprtbt"><img src={report} /> Investigation Report</div>
                                    <div className="reprtbt"><img src={report} /> ADR Report <img src={red} /></div>
                                </div>

                                <div className="rt-sec">
                                    <div className="rt-Ammonia"><img src={Ammonia} style={{ width: '25px' }} /></div>
                                    <div className="rt-Ammonia"><span className="a0">Ammonia Result</span><span className="a1">48</span> <span className="a2">performed on 14-06-2023 02:16AM</span></div>
                                </div>

                                <div className="rt-sec" style={{ borderLeft: '2px solid #2C50EE' }}>
                                    <div className="rt-Ammonia"><img src={rtfeed} style={{ width: '30px' }} />
                                        <span style={{ color: '#FC0F0F', fontSize: '11px', padding: '0 5px', }}>RT Feed on hold</span>
                                        <span style={{ color: '#041D4A', 'font-size': '11px' }}>Hold From : 26/06/2023 10:39 AM</span>
                                        <p className="rema"><strong>Remark :</strong> POST OP, RT HOLD Type : Post opt, before every feed  cinnamon fine
                                            crushed 5gm to be given in 10ml water along with Diadzine (soflavone) and ECG</p>
                                    </div>
                                </div>

                                <div className="rt-sec">
                                    <div className="rt-Ammonia"><img src={exclamationMark1} style={{ width: '15px' }} /></div>
                                    <div className="rt-Ammonia"><span>ABG is not performed with in 6 hours</span></div>
                                </div>

                                <div className="rt-sec" style={{ borderLeft: '2px solid #FC0F0F' }}>
                                    <div className="rt-Ammonia"><img src={N} style={{ width: '8px', marginRight: '5px' }} /></div>
                                    <div className="rt-Ammonia"><span>Infusion NORAD running at Flow Rate : 5.40ml/hr</span></div>
                                </div>

                                <div className="rt-sec" style={{ borderLeft: '2px solid #FC0F0F' }}>
                                    <div className="rt-Ammonia"><img src={F} style={{ width: '8px', marginRight: '5px' }} /></div>
                                    <div className="rt-Ammonia"><span>Infusion FENTA running at Flow Rate : 2ml/hr</span></div>
                                </div>

                                <div className="rt-sec">
                                    <div className="rt-Ammonia"><img src={temperature} style={{ width: '15px' }} /></div>
                                    <div className="rt-Ammonia"><span>Normal or Low grade fever, Value : <strong style={{ color: '#008806' }}>98.8F</strong></span></div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
