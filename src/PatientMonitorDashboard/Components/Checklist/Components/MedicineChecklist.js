import React, { useEffect, useState } from 'react'
import GetMedicationDetails from '../Api/GetMedicationDetails';
// import BoxHeading from '../../BoxHeading';
import BoxHeading from '../../../../Component/BoxHeading';
import UpcomingFood from '../../../../assets/images/icons/UpcomingFood.svg'
import SOS from "../../../../assets/images/patientmonitordashboard/SOS.svg"
import Late from "../../../../assets/images/icons/late.svg"

export default function MedicineChecklist(props) {
    let [medicationChecklistData, setMedicationChecklistData] = useState([]);
    let [date, setDate] = useState('');
    const getMediccationDetails = async () => {
        const d = new Date();
        const day = d.getDate();
        const month = parseInt(d.getMonth() + 1);
        const formartMonth = month.toString().length === 1 ? '0' + month : month;
        const formartDay = day.toString().length === 1 ? '0' + day : day;
        const year = d.getFullYear();
        let dateFormat = year + '-' + formartMonth + '-' + formartDay;
        setDate(dateFormat);
        const response = await GetMedicationDetails(props.patientdata.UhId);
        if (response.status === 1) {
            const data = response.responseValue.medicationNameAndDate;
            console.log('data111', data)
            let makedata = [];
            for (var i = 0; i < data.length; i++) {

                if (data[i].date === dateFormat) {// '2023-09-25'
                    let parser = JSON.parse(data[i].jsonTime);
                    console.log('parser', parser)
                    if (parser !== null) {
                        if (parser.length === 1) {
                            let senddata = [{ "time": "00:00", "durationType": "Morning", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Afternoon", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Evening", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "SOS", "icon": "icon", "dash": 1 }]
                            parser.map((val, ind) => {
                                if (val.durationType === "Morning") {

                                    senddata[0] = { ...val, "dash": 0 }

                                }
                                else if (val.durationType === "Afternoon") {

                                    senddata[1] = { ...val, "dash": 0 }



                                }
                                else if (val.durationType === "Evening") {
                                    senddata[2] = { ...val, "dash": 0 }

                                }
                                else if (val.durationType === "SOS") {
                                    senddata[3] = { ...val, "dash": 0 }

                                }
                            })

                            makedata.push({
                                date: data[i].date,
                                dosageForm: data[i].dosageForm,
                                drugName: data[i].drugName,
                                medicationDetails: JSON.stringify(senddata)
                            })

                        }
                        else if (parser.length === 2) {
                            let senddata = [{ "time": "00:00", "durationType": "Morning", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Afternoon", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Evening", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "SOS", "icon": "icon", "dash": 1 }]
                            parser.map((val, ind) => {
                                if (val.durationType === "Morning") {
                                    senddata[0] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "Afternoon") {
                                    senddata[1] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "Evening") {
                                    senddata[2] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "SOS") {
                                    senddata[3] = { ...val, "dash": 0 }
                                }
                            })
                            if ("0" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Morning", "icon": "icon", "dash": 1 }
                            }
                            else if ("1" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Afternoon", "icon": "icon", "dash": 1 }
                            }
                            else if ("2" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Evening", "icon": "icon", "dash": 1 }
                            }
                            else if ("3" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "SOS", "icon": "icon", "dash": 1 }
                            }

                            makedata.push({
                                date: data[i].date,
                                dosageForm: data[i].dosageForm,
                                drugName: data[i].drugName,
                                medicationDetails: JSON.stringify(senddata)
                            })




                        }
                        else if (parser.length === 3) {
                            let senddata = [{ "time": "00:00", "durationType": "Morning", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Afternoon", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Evening", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "SOS", "icon": "icon", "dash": 1 }]
                            parser.map((val, ind) => {
                                if (val.durationType === "Morning") {
                                    senddata[0] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "Afternoon") {
                                    senddata[1] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "Evening") {
                                    senddata[2] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "SOS") {
                                    senddata[3] = { ...val, "dash": 0 }
                                }
                            })
                            if ("0" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Morning", "icon": "icon", "dash": 1 }
                            }
                            else if ("1" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Afternoon", "icon": "icon", "dash": 1 }
                            }
                            else if ("2" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Evening", "icon": "icon", "dash": 1 }
                            }
                            else if ("3" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "SOS", "icon": "icon", "dash": 1 }
                            }

                            makedata.push({
                                date: data[i].date,
                                dosageForm: data[i].dosageForm,
                                drugName: data[i].drugName,
                                medicationDetails: JSON.stringify(senddata)
                            })

                        }
                        else if (parser.length === 4) {
                            let senddata = [{ "time": "00:00", "durationType": "Morning", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Afternoon", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "Evening", "icon": "icon", "dash": 1 }, { "time": "00:00", "durationType": "SOS", "icon": "icon", "dash": 1 }]
                            parser.map((val, ind) => {
                                if (val.durationType === "Morning") {

                                    senddata[0] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "Afternoon") {
                                    senddata[1] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "Evening") {
                                    senddata[2] = { ...val, "dash": 0 }
                                }
                                else if (val.durationType === "SOS") {
                                    senddata[3] = { ...val, "dash": 0 }
                                }
                            })
                            if ("0" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Morning", "icon": "icon", "dash": 1 }
                            }
                            else if ("1" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Afternoon", "icon": "icon", "dash": 1 }
                            }
                            else if ("2" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "Evening", "icon": "icon", "dash": 1 }
                            }
                            else if ("3" in senddata === false) {
                                senddata[0] = { "time": "00:00", "durationType": "SOS", "icon": "icon", "dash": 1 }
                            }

                            makedata.push({
                                date: data[i].date,
                                dosageForm: data[i].dosageForm,
                                drugName: data[i].drugName,
                                medicationDetails: JSON.stringify(senddata)
                            })
                        }
                    }

                }


            }
            console.log('makedata', makedata)
            setMedicationChecklistData(makedata)

        }

    }
    useEffect(() => {
        getMediccationDetails();
    }, []);
    return (
        <>
            <div className={`modal d-${props.ShowMedicinePopup === 0 ? 'none' : 'block'} mb-2 modal-xl`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", }}>


                <div className="modal-dialog modal-dialog-centered modal-xl">

                    <div className="modal-content">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                            <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                        </span>
                        {/* <BoxHeading name="" textcolor="#7E7E7E" patientBool={true} patientName={props.patientdata.PntName} patientUhid={props.patientdata.UhId} /> */}
                        <BoxHeading title={"Medicine Checklist"} uhid={props.patientdata.UhId} patientName={props.patientdata.PntName} />
                        <div className='d-flex flex-wrap gap-4 mt-2 me-4 justify-content-end'>

                            <div><i className="bi bi-check-circle-fill text-success fs-6"></i> <i>Given</i></div>
                            <div><i className="bi bi-x-circle-fill text-danger fs-6"></i> <i>Pending</i></div>

                            <div><img src={UpcomingFood} /> <i>Upcoming</i></div>
                            <div><img src={Late} /> <i>Late</i></div>
                            {/* <div><img src={UpcomingFood} /><i class="bi bi-alarm-fill fs-6"></i> <i>Upcoming</i></div> */}


                        </div>
                        <div className='mt-1 ps-5 pe-4 row'>
                            <div className='gridb'>

                                <div className='listdetailsct pac'>

                                    {/* <div className='listdetailsct-in'>

                        <div className='listd-in showing '>Medicine Checklist</div>

                    </div>

                    <div className='listdetailsct-in'>

                        <div className='gridsec-in'>

                            <i className='fa fa-file-text'></i><i className='fa fa-bar-chart'></i>

                        </div>

                    </div> */}

                                </div>



                                <div className="med-table-section histry_view">

                                    <table className='med-table border striped'  >

                                        <thead>

                                            <tr>

                                                <th className='text-center'>Medicine</th>
                                                <th className='text-center' style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>Morning</th>
                                                <th className='text-center' style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>After Noon</th>
                                                <th className='text-center' style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>Evening</th>
                                                {/* <th className='text-center' style={{ color: '#546788', letterSpacing: '1px', fontSize: '14px' }}>SOS</th> */}
                                            </tr>

                                        </thead>



                                        <tbody >
                                            {
                                                medicationChecklistData && medicationChecklistData.map((list, index) => {
                                                    const medicationDetails = list.medicationDetails ? JSON.parse(list.medicationDetails) : [];
                                                    return (
                                                        <tr>
                                                            <td className='text-center' style={{ backgroundColor: 'white' }}>{list.drugName.toUpperCase()}</td>


                                                            {list.medicationDetails !== null ?
                                                                medicationDetails.map((li, ind) => {
                                                                    if (li.durationType === "Morning" && li.durationType !== "Afternoon" && li.durationType !== "Evening" && li.durationType !== "SOS") {
                                                                        if (li.dash !== 1)
                                                                            return (
                                                                                <>

                                                                                    <td className='text-center' style={{ backgroundColor: 'white' }}>
                                                                                        {li.icon === "check" && li.durationType !== "SOS" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                            li.icon === "upcoming" && li.durationType !== "SOS" ? <img src={UpcomingFood} /> :
                                                                                                li.icon === "late" && li.durationType !== "SOS" ? <img src={Late} /> :
                                                                                                    li.icon === "exclamation" && li.durationType !== "SOS" ? <i className="bi bi-x-circle-fill text-danger fs-6"></i> : ''} </td>
                                                                                </>
                                                                            )
                                                                        else {
                                                                            return (
                                                                                <td className='text-center' style={{ backgroundColor: 'white' }}>-</td>
                                                                            )
                                                                        }

                                                                    }
                                                                    else if (li.durationType !== "Morning" && li.durationType === "Afternoon" && li.durationType !== "Evening" && li.durationType !== "SOS") {

                                                                        if (li.dash !== 1) {
                                                                            return (
                                                                                <>
                                                                                    {/* <td>{li.durationType === "Afternoon" ? "Afternoon" : "-"}</td> */}
                                                                                    <td className='text-center' style={{ backgroundColor: 'white' }}>
                                                                                        {li.icon === "check" && li.durationType !== "SOS" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                            li.icon === "upcoming" && li.durationType !== "SOS" ? <img src={UpcomingFood} /> :
                                                                                                li.icon === "late" && li.durationType !== "SOS" ? <img src={Late} /> :
                                                                                                    li.icon === "exclamation" && li.durationType !== "SOS" ? <i className="bi bi-x-circle-fill text-danger fs-6"></i> : ''} </td>


                                                                                </>
                                                                            )
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <td className='text-center' style={{ backgroundColor: 'white' }}>-</td>
                                                                            )
                                                                        }




                                                                    }
                                                                    else if (li.durationType !== "Morning" && li.durationType !== "Afternoon" && li.durationType === "Evening" && li.durationType !== "SOS") {
                                                                        if (li.dash !== 1) {


                                                                            return (
                                                                                <>

                                                                                    <td className='text-center' style={{ backgroundColor: 'white' }}>
                                                                                        {li.icon === "check" && li.durationType !== "SOS" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                                            li.icon === "upcoming" && li.durationType !== "SOS" ? <img src={UpcomingFood} /> :
                                                                                                li.icon === "late" && li.durationType !== "SOS" ? <img src={Late} /> :
                                                                                                    li.icon === "exclamation" && li.durationType !== "SOS" ? <i className="bi bi-x-circle-fill text-danger fs-6"></i> : ''} </td>

                                                                                </>
                                                                            )
                                                                        }
                                                                        else {
                                                                            return (
                                                                                <td className='text-center' style={{ backgroundColor: 'white' }}>-</td>
                                                                            )
                                                                        }


                                                                    }
                                                                    // else if (li.durationType !== "Morning" && li.durationType !== "Afternoon" && li.durationType !== "Evening" && li.durationType === "SOS") {
                                                                    //     if (li.dash !== 1) {
                                                                    //         return (
                                                                    //             <>

                                                                    //                 <td className='text-center' style={{ backgroundColor: 'white' }}>
                                                                    //                     {li.icon === "check" && li.durationType === "SOS" ? <i className="bi bi-check-circle-fill text-success fs-6"></i> :
                                                                    //                         li.icon === "upcoming" && li.durationType === "SOS" ? <img src={UpcomingFood} alt='' /> :
                                                                    //                             li.icon === "late" && li.durationType === "SOS" ? <img src={Late} /> :
                                                                    //                                 li.icon === "exclamation" && li.durationType === "SOS" ? <img src={SOS} height="24px" width="24px" alt='' /> : ''} </td>

                                                                    //             </>
                                                                    //         )
                                                                    //     }
                                                                    //     else {
                                                                    //         return (
                                                                    //             <td className='text-center' style={{ backgroundColor: 'white' }}>-</td>
                                                                    //         )
                                                                    //     }




                                                                    // }




                                                                })

                                                                : ""
                                                            }
                                                        </tr>
                                                    )


                                                })
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
