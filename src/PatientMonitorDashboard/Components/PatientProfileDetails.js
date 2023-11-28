import React from 'react'
import PatientProfilePost from '../../Clinical/API/RemotePatientMonitorDashboard/PatientProfilePost'
import { useEffect } from 'react'
import { useState } from 'react'
import LodingIcon from '../../Component/Loader'
import BoxHeading from '../../Component/BoxHeading'
import SaveModality from '../../Clinical/API/RemotePatientMonitorDashboard/SaveModality'

export default function PatientProfileDetails(props) {


    let [patientPersonalData, setPatientPersonalData] = useState()
    let [loader, setLoader] = useState(1)
    let [vitalsdata, setVitalsdata] = useState();

    let [daignosis, setDaignosis] = useState()
    let [labtestndata, setLabtestndata] = useState()
    let [showModalityEdit, setShowModalityEdit] = useState(0)
    let [modalityValue, setModalityValue] = useState("")
    let [medalityMessage, setMedalityMessage] = useState("")
    let [medalityMessageFirst, setMedalityMessageFirst] = useState("")

    let getdata = async () => {
        let sendData = {
            "uhid": props.patientdata.UhId,
            "userId": JSON.parse(window.sessionStorage.getItem("LoginData")).userId
        }

        let getresponse = await PatientProfilePost(sendData)
        if (getresponse.status === 1) {
            setLoader(0)
            setPatientPersonalData(getresponse.responseValue.patientPersonalInfo[0])
            setModalityValue(getresponse.responseValue.patientPersonalInfo[0].modality)
            setMedalityMessageFirst(getresponse.responseValue.patientPersonalInfo[0].modality)
            setVitalsdata(getresponse.responseValue.patientVitals)
            setDaignosis(getresponse.responseValue.patientDaignosis)

            // makeLabTest(getresponse.responseValue.patientInvestigationResult)

        }
    }

    let makeLabTest = (data) => {
        let temp = []
        let senddata = []
        let aa = data.filter(
            (obj, index) =>
                data.findIndex((item) => item.testDateTime.split("T")[0] === obj.testDateTime.split("T")[0]) === index
        );

        for (var i = 0; i < aa.length; i++) {
            let serachResult = data.filter((patientData) => {
                let isFiltered = false;
                Object.entries(patientData).forEach(([key, val]) => {

                    if (val.toString().toLowerCase().includes(aa[i].testDateTime.split("T")[0])) {
                        isFiltered = true
                    }
                })
                return isFiltered;
            })
            senddata.push(serachResult)

        }
        setLabtestndata(senddata)
        // console.log("vvvvvvvvd", senddata)
    }
    let handleSHowModalityEdit = async (val) => {
        if (val === 1) {
            setModalityValue(modalityValue)
            setShowModalityEdit(val)
           


        }
        else if (val === 2) {
            setModalityValue(medalityMessageFirst)
            setShowModalityEdit(0)
        }
        else if (val === 0) {
            let obj = {
                "uhid": props.patientdata.UhId,
                "userId": window.userId,
                "modality": modalityValue
            }
            let resp = await SaveModality(obj)
            if (resp.status === 1) {
                setModalityValue(resp.responseValue[0].modality)
                setMedalityMessageFirst(resp.responseValue[0].modality)
                setMedalityMessage("Saved Successfully!!")
                setTimeout(() => {
                    setMedalityMessage("")
                }, 2000)
            }
            else {
                setMedalityMessage(resp.responseValue)
                setTimeout(() => {
                    setMedalityMessage("")
                }, 2000)
            }
            setShowModalityEdit(val)

        }
       
    }

    let handleOnChange = (e) => {
        setModalityValue(e.target.value)
    }
    useEffect(() => {
        getdata()
    }, [])

    return (
        <div className={`modal d-${props.patientProfilepopup === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className="modal-dialog modal-lg modal-dialog-scrollable pprofile mt-3">
                <div className="modal-content">
                    <span className="closee" onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>
                    {/* <BoxHeading title="Patient Profile" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId} /> */}
                    <div className='p-profile'>
                      <div className='p-profile-h'>Patient Profile</div>
                      <div className='p-profile-h'>
                        <div className='pname'><span>{props.patientdata.PntName} </span></div>
                        <div className='pname'>- {props.patientdata.UhId}</div>
                      </div>
                    </div>
                    <div className='modal-body cnt'>
                        <div className="grid-container">
                            {/* patient Info */}
                            <div className="grid-item">
                                <div className='heading-box'>Patient Personal Details</div>
                                {patientPersonalData &&

                                        <div className='patientsd'>
                                            <div className='patientdetails'>
                                                <label>Name:</label>
                                                <span>{patientPersonalData.patientName}</span>
                                            </div>

                                            <div className='patientdetails'>
                                                <label>Age/Gender :</label>
                                                <span>{patientPersonalData.age} / {patientPersonalData.gender}</span>
                                            </div>

                                            <div className='patientdetails'>
                                                <label>Height/Weight :</label>
                                                <span>{patientPersonalData.height} / {patientPersonalData.weight}</span>
                                            </div>

                                            <div className='patientdetails'>
                                                <label>Mobile No :</label>
                                                <span>{patientPersonalData.mobileNo}</span>
                                            </div>
                                            <div className='patientdetails'>
                                                <label>Alternate Mobile No :</label>
                                                <span>{patientPersonalData.alternateMobileNo}</span>
                                            </div>

                                            <div className='patientdetails'>
                                                <label>Email ID :</label>
                                                <span>{patientPersonalData.emailID}</span>
                                            </div>

                                            <div className='patientdetails'>
                                                <label>Address :</label>
                                                <span>{patientPersonalData.address}</span>
                                            </div> 

                                            <div className='patientdetails'>
                                                <label>Modality :</label>
                                                <div className='modality'>
                                                    {showModalityEdit === 0 ?
                                                        <>
                                                            <div className='d-flex flex-row gap-3'>
                                                                <span>{modalityValue}</span><span className='pointer' onClick={() => handleSHowModalityEdit(1)} title='Edit'><i className="bi bi-pencil-square"></i></span>
                                                                <span>{medalityMessage}</span>
                                                            </div>

                                                        </>
                                                        :
                                                        <>
                                                            <div className='d-flex flex-row gap-2'>
                                                                <div>
                                                                    <textarea name="modality" id="modality" cols="15" rows="3" value={modalityValue} onChange={handleOnChange}></textarea>
                                                                </div>
                                                                <div>
                                                                    <button className='btn btn-save btn-save-fill btn-sm' onClick={() => handleSHowModalityEdit(0)}>Save</button>
                                                                </div>
                                                                <div>
                                                                    <button onClick={() => handleSHowModalityEdit(2)} className='btn btn-save btn-save-fill btn-sm'>Cancel</button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                }

                            </div>

                            {/* clinical condition */}
                            <div className="grid-item">
                                <div className='heading-box'>Clinical Condition</div>
                                <div className='pdtable'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td  style={{'width':'100px'}}><strong>Daignosis :</strong></td>
                                                <td style={{'textAlign':'left'}}>{daignosis && daignosis.map((val, ind) => {
                                                    return (
                                                        (ind + 1) + " .  " + val.problemName
                                                    )
                                                    })}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><strong>Progress :</strong></td>
                                                <td  style={{'textAlign':'left'}}>123</td>
                                            </tr>

                                            <tr>
                                                <td><strong>History :</strong></td>
                                                <td  style={{'textAlign':'left'}}>1234</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Life Support */}
                            <div className="grid-item">
                                <div className='heading-box'>Life Support Details</div>
                                <div className='datanotfound'>Data Not Found</div>
                            </div>

                            {/* Medication */}
                            <div className="grid-item">
                                <div className='heading-box'>Medication</div>
                                <div className='datanotfound'>Data Not Found</div>
                            </div>

                            {/* vital  */}
                            <div className="grid-item">
                                <div className='heading-box'>Vitals</div>
                                <div className='pdtable' style={{ maxHeight: "500px", overflowY: "auto" }}>
                                    <table>
                                        <thead>
                                            <th>S No.</th>
                                            <th>Vitals</th>
                                            <th>Value</th>
                                            <th>Date & Time</th>
                                        </thead>
                                        <tbody>
                                            {vitalsdata && vitalsdata.map((val, ind) => {
                                                return (
                                                    <tr>
                                                        <td>{ind + 1}</td>
                                                        <td>{val.vitalName}</td>
                                                        <td>{val.vitalValue}</td>
                                                        <td>{val.vitalDateTime}</td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="grid-item">
                                <div className='heading-box'>Nutritional Result</div>
                                <div className='datanotfound'>Data Not Found</div>
                            </div>
                            <div className="grid-item">
                                <div className='heading-box'>Problem Management</div>
                                <div className='datanotfound'>Data Not Found</div>
                            </div>
                            <div className="grid-item">
                                <div className='heading-box'>Lab Test</div>
                                <div className='pdtable' style={{ maxHeight: "500px", overflowY: "auto" }}> 
                                    <table>
                                        <thead>
                                            <th className=''> S. No.</th>
                                            <th className=''>Test Name</th>
                                            <th className=''>Result</th>
                                            <th className=''>Test Time</th>
                                            <th className=''>Normal Ranges</th>
                                        </thead>
                                        <tbody>
                                            {labtestndata && labtestndata.map((val, index) => {
                                                return (
                                                    <>
                                                        <tr className='date-tb'>
                                                            <td colSpan="5" className='text-white' style={{ backgroundColor: "#7E7E7E", }}>
                                                                <span style={{ color: 'white' }}> Date: {val[0].testDateTime.split("T")[0]}</span>
                                                            </td>
                                                        </tr>
                                                        {val.map((subd, ind) => {

                                                            return (
                                                                <tr >
                                                                    <td className='ms-3'>{ind + 1}</td>
                                                                    <td>{subd.subTestName}</td>
                                                                    <td>{subd.result} &nbsp; {subd.unitName}</td>
                                                                    <td>{subd.testDateTime.split("T")[0] + " " + subd.testDateTime.split("T")[1]}</td>
                                                                    <td>{subd.isNormalResult}</td>
                                                                </tr>
                                                            )
                                                        })}

                                                    </>
                                                )

                                            })}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="grid-item">
                                <div className='heading-box'>Patient Activity Input</div>
                                <div className='datanotfound'>Data Not Found</div>
                            </div>
                            <LodingIcon val={loader} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
