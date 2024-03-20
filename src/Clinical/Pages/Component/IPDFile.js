import React, { useEffect, useState } from 'react'
import '../../../assets/css/CertificateCard.css'
import GetMedvantageIPDFileData from '../../Api/IPD/IPD File/GetMedvantageIPDFileData'
import GetLabIPDFileData from '../../Api/IPD/IPD File/GetLabIPDFileData';
import GetIntakeIPDFileData from '../../Api/IPD/IPD File/GetIntakeIPDFileData';

export default function IPDFile() {
    let UHID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let [patientDetails, setPatientDetails] = useState([]);
    let [progressNote, setProgressNote] = useState([]);
    let [complaintSign, setComplaintSign] = useState([]);
    let [patientHistory, setPatientHistory] = useState([]);
    let [procedureNote, setProcedureNote] = useState([]);
    let [physicalExamination, setPhysicalExamination] = useState([]);
    let [goals, setGoals] = useState([]);
    let [vitals, setVitals] = useState([]);
    let [vitalsDate, setVitalsDate] = useState([]);
    let [prescription, setPrescription] = useState([]);
    let [prescriptionMedDate, setPrescriptionMedDate] = useState([]);
    let [labIPDFileData, setLabIPDFileData] = useState([]);
    let [testName, setTestName] = useState([]);
    let [subTestName, setSubTestName] = useState([]);
    let [labUniqueDate, setLabUniqueDate] = useState([]);
    let [intakeIPDFileData, setIntakeIPDFileData] = useState([]);
    let [intakeDate, setIntakeDate] = useState([]);


    let getData = async () => {
        //Vitals
        let vitalData = [];
        let vitalDate = [];
        //Prescription
        let prescriptionData = [];
        let prescriptionDate = [];
        //Lab
        let labData = [];
        let labTest = [];
        let labSubtest = [];
        let labDate = [];
        //intake
        let intakeData = [];
        let intakeDate = [];
        let medIPDFileResp = await GetMedvantageIPDFileData(UHID);
        let labIPDFileResp = await GetLabIPDFileData(UHID);
        let intakeIPDFileResp = await GetIntakeIPDFileData(UHID);


        //Get med IPD File Data
        if (medIPDFileResp.status === 1) {
            setPatientDetails(medIPDFileResp.responseValue.patientDetails);
            setProgressNote(medIPDFileResp.responseValue.progressNote);
            setComplaintSign(medIPDFileResp.responseValue.complaintSign);
            setPatientHistory(medIPDFileResp.responseValue.patientHistory);
            setProcedureNote(medIPDFileResp.responseValue.procedureNote);
            setPhysicalExamination(medIPDFileResp.responseValue.physicalExamination);
            setGoals(medIPDFileResp.responseValue.goals);
            //Get Vitals Data & Date
            for (var i = 0; i < medIPDFileResp.responseValue.vitals.length; i++) {
                vitalData.push(medIPDFileResp.responseValue.vitals[i]);
                vitalDate.push(medIPDFileResp.responseValue.vitals[i].datee);
            }
            setVitals([...vitalData]);
            setVitalsDate([...vitalDate]);
            vitalData = [];
            vitalDate = [];

            //Get Prescription Data & Date
            for (var j = 0; j < medIPDFileResp.responseValue.prescription.length; j++) {
                prescriptionData.push(medIPDFileResp.responseValue.prescription[j]);
                prescriptionDate.push(medIPDFileResp.responseValue.prescription[j].medDate);
            }
            setPrescription([...prescriptionData]);
            setPrescriptionMedDate([...prescriptionDate]);
            prescriptionData = [];
            prescriptionDate = [];
        };

        //Get Lab IPD Data
        if (labIPDFileResp.status === 1) {
            for (let i = 0; i < labIPDFileResp.responseValue.labIPDFileData.length; i++) {
                labData.push(labIPDFileResp.responseValue.labIPDFileData[i]);
                labTest.push(labIPDFileResp.responseValue.labIPDFileData[i].testname);
                labSubtest.push(labIPDFileResp.responseValue.labIPDFileData[i].subTestName);
                labDate.push(labIPDFileResp.responseValue.labIPDFileData[i].collectionDateTime);
            }
            setLabIPDFileData([...labData]);
            setTestName([...labTest]);
            setSubTestName([...labSubtest]);
            setLabUniqueDate([...labDate]);
            labSubtest = [];
            labData = [];
            labTest = [];
            labDate = [];
        };

        //Get Intake IPD data
        if (intakeIPDFileResp.status === 1) {
            for (let i = 0; i < intakeIPDFileResp.responseValue.intakeIPDFileData.length; i++) {
                intakeData.push(intakeIPDFileResp.responseValue.intakeIPDFileData[i]);
                intakeDate.push(intakeIPDFileResp.responseValue.intakeIPDFileData[i].datee);
            }
            setIntakeIPDFileData([...intakeData]);
            setIntakeDate([...intakeDate]);
            intakeData = [];
            intakeDate = [];
        };
    };

    const distinctItem = (Array) => {
        const uniqueItems = new Set();
        Array.forEach((item) => {
            uniqueItems.add(item);
        });
        return uniqueItems;
    };

    //Find Unique Date for Vitals
    const uniqueDates = distinctItem(vitalsDate);

    //Find Unique Date for prescription
    const prescriptionUniqueDates = distinctItem(prescriptionMedDate);

    //Find Unique testName and SubtestName
    const uniqueTestNames = distinctItem(testName);
    const uniqueSubTestNames = distinctItem(subTestName);
    const uniqueLabDates = distinctItem(labUniqueDate);

    //Find intake unique date
    const uniqueIntakeDates = distinctItem(intakeDate);

let handleIPDPrint = ()=> {
    // alert();
    window.print()
}


    useEffect(() => {
        getData();
    }, []);

    return (

        <>
            <div className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 mb-2 hideOnprint">
                            <div className="med-box d-flex justify-content-between">
                                <div className="title">IPD File</div>
                                <div> <i className="bi bi-printer-fill fs-4 pe-3 pointer " onClick={handleIPDPrint}></i> </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className='card-wrapper' id='printIpdFile'>
                                {/* Patient Details */}
                                <div>
                                    <label>Patient Details</label>
                                    {/* <div className='quater-border right-top'></div>
                                <div className='quater-border left-bottom'></div> */}

                                    <table className='table-certificate border border-bottom_'>
                                        <tbody>
                                            {patientDetails.length > 0 ?
                                                <>
                                                    <tr>
                                                        <td className='key'>UHID</td>
                                                        <td>{patientDetails[0].uhID}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Patient Name</td>
                                                        <td>{patientDetails[0].patientName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Guardian Name</td>
                                                        <td>{patientDetails[0].guardianName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Consultant Name</td>
                                                        <td>{patientDetails[0].name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Date of Admission</td>
                                                        <td>{patientDetails[0].admitDateTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Department</td>
                                                        <td>{patientDetails[0].departmentName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Age/ Gender</td>
                                                        <td>{patientDetails[0].ageGender}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Ward Name</td>
                                                        <td>{patientDetails[0].wardName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Mobile Number</td>
                                                        <td>{patientDetails[0].mobileNo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>CRNo</td>
                                                        <td>{patientDetails[0].crNo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>IPNo</td>
                                                        <td>{patientDetails[0].ipNo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Address</td>
                                                        <td>{patientDetails[0].address}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='key'>Provisional Diagnosis</td>
                                                        <td>{patientDetails[0].details}</td>
                                                    </tr>
                                                </>
                                                : ''}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Complaint Sign */}
                                <div>
                                    <label>Complaint Sign</label>
                                    {/* <div className='quater-border right-top'></div>
                                <div className='quater-border left-bottom'></div> */}
                                    {/* Patient Details */}
                                    <table className='table-certificate border border-bottom_'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date & Time</th>
                                                <th>Complaint Sign</th>
                                                <th>Written By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {complaintSign && complaintSign.map((comList, index) => {
                                                return (
                                                    <tr>
                                                        <td className='key'>{index + 1}</td>
                                                        <td>{comList.datee}</td>
                                                        <td>{comList.details}</td>
                                                        <td>-</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                {/* Progress Note */}
                                <div>
                                    <label>Progress Note</label>
                                    {/* <div className='quater-border right-top'></div>
                                <div className='quater-border left-bottom'></div> */}
                                    {/* Patient Details */}
                                    <table className='table-certificate border border-bottom_'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date & Time</th>
                                                <th>Progress Note</th>
                                                <th>Written By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {progressNote && progressNote.map((progList, index) => {
                                                return (
                                                    <tr>
                                                        <td className='key'>{index + 1}</td>
                                                        <td>{progList.datee}</td>
                                                        <td>{progList.details}</td>
                                                        <td>-</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                {/* Patient History */}
                                <div>
                                    <label>Patient History</label>
                                    {/* <div className='quater-border right-top'></div>
                                <div className='quater-border left-bottom'></div> */}
                                    {/* Patient Details */}
                                    <table className='table-certificate border border-bottom_'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date & Time</th>
                                                <th>Patient History</th>
                                                <th>Written By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {patientHistory && patientHistory.map((PatHisList, index) => {
                                                return (
                                                    <tr>
                                                        <td className='key'>{index + 1}</td>
                                                        <td>{PatHisList.datee}</td>
                                                        <td>{PatHisList.details}</td>
                                                        <td>-</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                {/* Procedure Note */}
                                <div>
                                    <label>Procedure Note</label>
                                    {/* <div className='quater-border right-top'></div>
                                <div className='quater-border left-bottom'></div> */}
                                    {/* Patient Details */}
                                    <table className='table-certificate border border-bottom_'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date & Time</th>
                                                <th>Procedure Note</th>
                                                <th>Written By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {procedureNote && procedureNote.map((procList, index) => {
                                                return (
                                                    <tr>
                                                        <td className='key'>{index + 1}</td>
                                                        <td>{procList.datee}</td>
                                                        <td>{procList.details}</td>
                                                        <td>-</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                {/* Physical Examination */}
                                <div>
                                    <label>Physical Examination</label>
                                    {/* <div className='quater-border right-top'></div>
                                <div className='quater-border left-bottom'></div> */}
                                    {/* Patient Details */}
                                    <table className='table-certificate border border-bottom_'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date & Time</th>
                                                <th>Physical Examination</th>
                                                <th>Written By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {physicalExamination && physicalExamination.map((phyList, index) => {
                                                return (
                                                    <tr>
                                                        <td className='key'>{index + 1}</td>
                                                        <td>{phyList.datee}</td>
                                                        <td>{phyList.details}</td>
                                                        <td>-</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                {/* Goals */}
                                <div>
                                    <label>Goals</label>
                                    {/* <div className='quater-border right-top'></div>
                                <div className='quater-border left-bottom'></div> */}
                                    {/* Patient Details */}
                                    <table className='table-certificate border border-bottom_'>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Date & Time</th>
                                                <th>Goals</th>
                                                <th>Written By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {goals && goals.map((GoalsList, index) => {
                                                return (
                                                    <tr>
                                                        <td className='key'>{index + 1}</td>
                                                        <td>{GoalsList.datee}</td>
                                                        <td>{GoalsList.details}</td>
                                                        <td>-</td>
                                                    </tr>
                                                )
                                            })
                                            }

                                        </tbody>
                                    </table>
                                </div>

                                {/* Vitals */}
                                <div>
                                    <label>Vitals Reports</label>
                                    <table className='table-certificate border border-bottom_'>
                                        {uniqueDates && [...uniqueDates].map((dateList, index) => {
                                            return (
                                                <>
                                                    <thead>
                                                        <div>Date: {dateList}</div>
                                                        <tr>

                                                            <th>Vitals</th>
                                                            <th>12 AM</th>
                                                            <th>01 AM</th>
                                                            <th>02 AM</th>
                                                            <th>03 AM</th>
                                                            <th>04 AM</th>
                                                            <th>05 AM</th>
                                                            <th>06 AM</th>
                                                            <th>07 AM</th>
                                                            <th>08 AM</th>
                                                            <th>09 AM</th>
                                                            <th>10 AM</th>
                                                            <th>11 AM</th>
                                                            <th>12 PM</th>
                                                            <th>01 PM</th>
                                                            <th>02 PM</th>
                                                            <th>03 PM</th>
                                                            <th>04 PM</th>
                                                            <th>05 PM</th>
                                                            <th>06 PM</th>
                                                            <th>07 PM</th>
                                                            <th>08 PM</th>
                                                            <th>09 PM</th>
                                                            <th>10 PM</th>
                                                            <th>11 PM</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {vitals && vitals.map((vitalsList, index) => {
                                                            if (dateList === vitalsList.datee) {
                                                                return (
                                                                    <tr>
                                                                        <td>{vitalsList.vitalName}</td>
                                                                        <td>{vitalsList.aM12}</td>
                                                                        <td>{vitalsList.aM01}</td>
                                                                        <td>{vitalsList.aM02}</td>
                                                                        <td>{vitalsList.aM03}</td>
                                                                        <td>{vitalsList.aM04}</td>
                                                                        <td>{vitalsList.aM05}</td>
                                                                        <td>{vitalsList.aM06}</td>
                                                                        <td>{vitalsList.aM07}</td>
                                                                        <td>{vitalsList.aM08}</td>
                                                                        <td>{vitalsList.aM09}</td>
                                                                        <td>{vitalsList.aM10}</td>
                                                                        <td>{vitalsList.aM11}</td>
                                                                        <td>{vitalsList.pM12}</td>
                                                                        <td>{vitalsList.pM01}</td>
                                                                        <td>{vitalsList.pM02}</td>
                                                                        <td>{vitalsList.pM03}</td>
                                                                        <td>{vitalsList.pM04}</td>
                                                                        <td>{vitalsList.pM05}</td>
                                                                        <td>{vitalsList.pM06}</td>
                                                                        <td>{vitalsList.pM07}</td>
                                                                        <td>{vitalsList.pM08}</td>
                                                                        <td>{vitalsList.pM09}</td>
                                                                        <td>{vitalsList.pM10}</td>
                                                                        <td>{vitalsList.pM11}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                            else{ return null;}
                                                        })}

                                                    </tbody>
                                                </>
                                            )
                                        })}

                                    </table>
                                </div>

                                {/* Prescription */}
                                <div>
                                    <label>Prescribed Medicine</label>
                                    <table className='table-certificate border border-bottom_'>
                                        {prescriptionUniqueDates && [...prescriptionUniqueDates].map((medDateList, index) => {
                                            return (
                                                <>
                                                    <thead>
                                                        <div>Date: {medDateList}</div>
                                                        <tr>
                                                            <th>Dosage Form</th>
                                                            <th>Medicine</th>
                                                            <th>Strength</th>
                                                            <th>Frequency</th>
                                                            <th>Time</th>
                                                            <th>Duration</th>
                                                            <th>Remark</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                    {prescription && prescription.map((medList, index) => {
                                                        if (medDateList === medList.medDate) {
                                                            return (
                                                                <tr key={index}>
                                                                    <td>{medList.dosageForm}</td>
                                                                    <td>{medList.drugName}</td>
                                                                    <td>{medList.dosageStrength}</td>
                                                                    <td>{medList.doseFrequency}</td>
                                                                    <td>{medList.medTime}</td>
                                                                    <td>{medList.duration}</td>
                                                                    <td>{medList.remark}</td>
                                                                </tr>
                                                            )
                                                        }
                                                        // Add a default return value
                                                        else{ return null;}
                                                    })}


                                                    </tbody>
                                                </>
                                            )
                                        })}

                                    </table>
                                </div>

                                {/* LAB */}
                                <div>
                                    <label>Investigation Report</label>
                                    <table className='table-certificate border border-bottom_'>
                                        {uniqueTestNames && [...uniqueTestNames].map((testList, index) => {
                                            return (
                                                <>
                                                    <thead>
                                                        <div>Test: {testList}</div>
                                                        <tr>
                                                            <th>Date</th>
                                                            {labIPDFileData && labIPDFileData.map((labHeadList, index) => {
                                                                if (labHeadList.testname === testList) {
                                                                    return (
                                                                        <th>{labHeadList.subTestName}</th>
                                                                    )
                                                                }
                                                                else{ return null;}
                                                            })

                                                            }
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {uniqueLabDates && [...uniqueLabDates].map((uniqueDate, i) => {
                                                            return (
                                                                <tr>
                                                                    <td>{uniqueDate}</td>
                                                                    {labIPDFileData && labIPDFileData.map((labBodyList, index) => {

                                                                        if (testList === labBodyList.testname) {
                                                                            return (

                                                                                <>

                                                                                    {uniqueSubTestNames && [...uniqueSubTestNames].map((subTestName, index) => {
                                                                                        if (subTestName === labBodyList.subTestName && uniqueDate === labBodyList.collectionDateTime){
                                                                                            return (


                                                                                        <td>{labBodyList.result}</td>

                                                                                                            )
                                                                                        }
                                                                                        else{ return null;}

                                                                                    }
                                                                                    )}
                                                                                </>

                                                                            )
                                                                        }
                                                                        else{ return null;}

                                                                    })}
                                                                </tr>
                                                            )
                                                        })}
                                                        <tr>
                                                            {/* <td>{labBodyList.collectionDateTime}</td> */}
                                                            {/* <td>
                                                                "31"
                                                            </td> */}


                                                        </tr>
                                                    </tbody>
                                                </>
                                            )
                                        })}

                                    </table>
                                </div>

                                {/* Diet Intake */}
                                <div>
                                    <label>Intake</label>
                                    <table className='table-certificate border border-bottom_'>
                                        {uniqueIntakeDates && [...uniqueIntakeDates].map((intakeDateList, index) => {
                                            return (
                                                <>
                                                    <thead>
                                                        <div>Date: {intakeDateList}</div>
                                                        <tr>

                                                            <th>Time</th>
                                                            <th>Input Type</th>
                                                            <th>Quantity (unit)</th>

                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {intakeIPDFileData && intakeIPDFileData.map((intakeList, index) => {
                                                            if (intakeDateList === intakeList.datee) {
                                                                return (
                                                                    <tr>
                                                                        <td>{intakeList.timee}</td>
                                                                        <td>{intakeList.foodName}</td>
                                                                        <td>{intakeList.givenFoodQuantity} ({intakeList.unitName})</td>

                                                                    </tr>
                                                                )
                                                            }
                                                            else{ return null;}

                                                        })}

                                                    </tbody>
                                                </>
                                            )
                                        })}

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
