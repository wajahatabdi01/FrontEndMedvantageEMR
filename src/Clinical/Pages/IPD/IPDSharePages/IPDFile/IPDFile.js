import React, { useEffect, useState } from 'react'
import '../../../../../assets/css/CertificateCard.css'
import logo from '../../../../../assets/images/Navbar/offcanvas-logo.png'
import bar1 from '../../../../../assets/images/icons/bar1.png'
import bar2 from '../../../../../assets/images/icons/bar2.png'
import GetMedvantageIPDFileData from '../../../../API/IPD/IPDFile/GetMedvantageIPDFileData'
import GetLabIPDFileData from '../../../../API/IPD/IPDFile/GetLabIPDFileData';
import GetIntakeIPDFileData from '../../../../API/IPD/IPDFile/GetIntakeIPDFileData';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


export default function IPDFile() {

    const { t } = useTranslation();
    document.body.dir = i18n.dir()

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
            for (var i = 0; i < medIPDFileResp.responseValue.prescription.length; i++) {
                prescriptionData.push(medIPDFileResp.responseValue.prescription[i]);
                prescriptionDate.push(medIPDFileResp.responseValue.prescription[i].medDate);
            }
            setPrescription([...prescriptionData]);
            setPrescriptionMedDate([...prescriptionDate]);
            prescriptionData = [];
            prescriptionDate = [];
        };

        //Get Lab IPD Data
        if (labIPDFileResp.status === 1) {
            for (var i = 0; i < labIPDFileResp.responseValue.labIPDFileData.length; i++) {
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
            for (var i = 0; i < intakeIPDFileResp.responseValue.intakeIPDFileData.length; i++) {
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
    
    //////////
    let arrData = [];
    let tempObj = {};
    for (var i = 0; i < uniqueTestNames.length; i++) {
        for (var j = 0; j < labIPDFileData.length; j++) {
            if (uniqueTestNames[i] === labIPDFileData[j].testname) {

            }
        }
        arrData.push()
    }

    //Find intake unique date
    const uniqueIntakeDates = distinctItem(intakeDate);

    let handleIPDPrint = () => {
        // alert();
        window.print()
    }


    useEffect(() => {
        getData();
    }, []);

    return (

        <>
            <div className="row">
                <div className="col-12 hideOnprint">
                    <div className="med-box d-flex justify-content-between">
                        <div className="title">{t("IPD File")}</div>
                        <div> <i className="bi bi-printer-fill fs-4 pe-3 pointer " onClick={handleIPDPrint}></i> </div>
                    </div>
                </div>

                <div className="col-12 mt-1">
                    <div className='card-wrapper' id='printIpdFile'>
                        {/* <div className='waterMark'>
                            <img src={logo} alt="" />
                        </div> */}

                        {/* Patient Details  */}
                        <div className='pdetailstxt'>
                            <table className='ipdtbl table-certificate'>
                                <tr>
                                    <td align='left'><img src={logo} /></td>
                                    <td align='right'>
                                        <div className='era'>{t("ERA's Lucknow Medical College")} <br />{t("and")}{t("Hospital-Lucknow")}<br />
                                            <span>{t("Sarfarazganj-Hardoi-Road-Lucknow-226003")}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ 'height': '2px', 'background': '#F3F7FF', 'padding': '0px' }} colSpan={2}></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div className="col-12">
                                            <div className='head text-center document-title'>{t("Patient_Details")}</div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <table className='pattbl'>
                                            {patientDetails.length > 0 ?
                                                <>
                                                    <tr>
                                                        <td><strong>{t("Patient Name")} :</strong></td>
                                                        <td>{patientDetails[0].patientName}</td>
                                                        <td><strong>{t("Uhid")} :</strong></td>
                                                        <td align='right'>{patientDetails[0].uhid}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>{t("Guardian_Nm")} :</strong></td>
                                                        <td>{patientDetails[0].guardianName}</td>
                                                        <td><strong>{t("Consultant_Name")} :</strong></td>
                                                        <td align='right'>{patientDetails[0].name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>{t("Age_Gender ")}:</strong></td>
                                                        <td>{patientDetails[0].ageGender}</td>
                                                        <td><strong>{t("IPNo")} :</strong></td>
                                                        <td align='right'>{patientDetails[0].ipNo}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>{t("Mobile_No")} :</strong></td>
                                                        <td>{patientDetails[0].mobileNo}</td>
                                                        <td><strong>{t("Admission_Date")} :</strong></td>
                                                        <td align='right'>{patientDetails[0].admitDateTime}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Address :</strong></td>
                                                        <td>{patientDetails[0].address}</td>
                                                        <td><strong>{t("Department")} :</strong></td>
                                                        <td align='right'>{patientDetails[0].departmentName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>{t("Cr No")}:</strong></td>
                                                        <td>{patientDetails[0].crNo}</td>
                                                        <td><strong>{t("Ward_Nm")} :</strong></td>
                                                        <td align='right'> {patientDetails[0].wardName}</td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <div className="col-12">
                                                                <div className='head1'>{t("Provisional Diagnosis")}</div>
                                                                <p className='subhead'>{patientDetails[0].details}</p>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                </>

                                                : ''}



                                        </table>
                                    </td>
                                </tr>

                            </table>

                            <table className='barfixe'>
                                <tr>
                                    <td align='left'>
                                        <p className='uhidtxt'>{t("Uhid")}</p>
                                        <img src={bar1} />
                                    </td>
                                    <td align='right'>
                                        <p className='uhidtxt'>{t("IPNo")}</p>
                                        <img src={bar2} />
                                    </td>
                                </tr>
                            </table>
                        </div>

                        {/* Complaint & symptoms */}
                        <div>
                            {complaintSign.length > 0 ?
                                <div className='hcomplaintxt mb-3'>


                                    <div className='head head1'>{t("Complain/Sign & Symptoms")}</div>
                                    <table className='pattbl grayth table-certificate'>
                                        <thead>
                                            <tr>
                                                <th>Sn</th>
                                                <th>{t("Date-Time")}</th>
                                                <th>{t("Complain/Sign & Symptoms")}</th>
                                                <th style={{ 'text-align': 'right' }}>{t("Written_By")}</th>
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
                                : <></>}
                        </div>


                        {/* Progress Note */}
                        <div>
                        {progressNote.length > 0 ?
                            <div className='hcomplaintxt mb-3'>
                            <div className='head head1'>{t("Progress Note")}</div>
                            <table className='pattbl grayth table-certificate'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t("Date-Time")}</th>
                                        <th>{t("Progress Note")}</th>
                                        <th>{t("Written_By")}</th>
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
                            : <></>}
                        </div>
                        


                        {/* Patient History */}
                        <div>{patientHistory.length > 0 ?
                            <div className='hcomplaintxt mb-3'>
                            <div className='head head1'>{t("Patient History")}</div>
                            <table className='pattbl grayth table-certificate'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t("Date-Time")}</th>
                                        <th>{t("Patient History")}</th>
                                        <th>{t("Written_By")}</th>
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
                            : <></>}</div>                             


                        {/* Procedure Note */}
                        <div>{procedureNote.length > 0 ?
                            <div className='hcomplaintxt mb-3'>
                            <div className='head head1'>{t("Procedure Note")}</div>
                            <table className='pattbl grayth table-certificate'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t("Date-Time")}</th>
                                        <th>{t("Procedure Note")}</th>
                                        <th>{t("Written_By")}</th>
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
                            : <></>}</div>
                        

                        {/* Physical Examination */}
                        <div>{physicalExamination.length > 0 ? 
                            <div className='hcomplaintxt mb-3'>
                            <div className='head head1'>{t("Physical Examination")}</div>
                            <table className='pattbl grayth table-certificate'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t("Date-Time")}</th>
                                        <th>{t("Physical Examination")}</th>
                                        <th>{t("Written_By")}</th>
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
                            : <></>}</div>
                        

                        {/* Goals */}
                        <div>{goals.length > 0 ? 
                            <div className='hcomplaintxt mb-3'>
                            <div className='head head1'>{t("Goals")}</div>
                            <table className='pattbl grayth table-certificate'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t("Date-Time")}</th>
                                        <th>{t("Goals")}</th>
                                        <th>{t("Written_By")}</th>
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
                        : <></>}</div>
                        

                        {/* Vitals */}
                        <div>{vitals.length > 0 ? 
                            <div className='hcomplaintxt mb-3'>
                            <div className='head1' style={{ marginBottom: '0px' }}>{t("Vitals Reports")}</div>
                            <table className='pattbl grayth table-certificate border border-bottom_ striped'>
                                {uniqueDates && [...uniqueDates].map((dateList, index) => {
                                    return (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th colSpan={25}>
                                                        <div className='listDate'>{t("DATE")}: {dateList}</div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>{t("Vitals")}</th>
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

                                                })}

                                            </tbody>
                                        </>
                                    )
                                })}

                            </table>
                        </div>
                        : <></>}</div>
                        

                        {/* Prescription */}
                        <div>{prescription.length > 0 ? <div className='hcomplaintxt mb-3'>
                            <div className='head1' style={{ marginBottom: '0px' }}>{t("Prescribed Medicine")}</div>
                            <table className='pattbl grayth table-certificate border border-bottom_ striped'>
                                {prescriptionUniqueDates && [...prescriptionUniqueDates].map((medDateList, index) => {
                                    return (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th colSpan={7}>
                                                        <div className='listDate'>{t("DATE")}: {medDateList}</div>
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th>{t("Dosage Form")}</th>
                                                    <th>{t("Medicine")}</th>
                                                    <th>{t("Strength")}</th>
                                                    <th>{t("Frequency")}</th>
                                                    <th>{t("Time")}</th>
                                                    <th>{t("Duration")}</th>
                                                    <th>{t("Remark")}</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {prescription && prescription.map((medList, index) => {
                                                    if (medDateList === medList.medDate) {
                                                        return (
                                                            <tr>
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

                                                })}

                                            </tbody>
                                        </>
                                    )
                                })}

                            </table>
                        </div> : <></>}</div>
                        

                        {/* LAB */}
                        <div>{labIPDFileData.length > 0 ?                                 
                            <div className='hcomplaintxt mb-3'>
                            <div className='head1' style={{ marginBottom: '0px' }}>{t("Investigation Report")}</div>
                            <table className='pattbl grayth table-certificate border border-bottom_ striped'>
                                {uniqueTestNames && [...uniqueTestNames].map((testList, index) => {
                                    return (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th colSpan={20}>
                                                        <div className='listDate'>{testList}</div>
                                                    </th>
                                                </tr>

                                                <tr>
                                                    <th style={{ width: '6%' }}>Date</th>
                                                    {labIPDFileData && labIPDFileData.map((labHeadList, index) => {
                                                        if (labHeadList.testname === testList) {
                                                            return (
                                                                <th>{labHeadList.subTestName}</th>
                                                            )
                                                        }
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
                                                                            {uniqueSubTestNames && [...uniqueSubTestNames].map((subTestName, ind) => {
                                                                                if (subTestName === labBodyList.subTestName && uniqueDate === labBodyList.collectionDateTime && labBodyList.result.length !== 0) {
                                                                                    return (
                                                                                        <td>{labBodyList.result}</td>
                                                                                    )
                                                                                }
                                                                                else if (subTestName !== labBodyList.subTestName && uniqueDate !== labBodyList.collectionDateTime && ind === 1) {
                                                                                    return (
                                                                                        <td>-</td>
                                                                                    )
                                                                                }


                                                                            }

                                                                            )}
                                                                        </>
                                                                    )
                                                                }
                                                            })}
                                                        </tr>
                                                    )
                                                })}
                                                <tr>
                                                </tr>
                                            </tbody>
                                        </>
                                    )
                                })}

                            </table>
                        </div>
                        : <></>}</div>
                        

                        {/* Diet Intake */}
                        <div>{intakeIPDFileData.length > 0 ?
                            <div className='hcomplaintxt mb-3'>
                            <div className='head1' style={{ marginBottom: '0px' }}>{t("Intake")}</div>
                            <table className='pattbl grayth table-certificate border border-bottom_ striped'>
                                {uniqueIntakeDates && [...uniqueIntakeDates].map((intakeDateList, index) => {
                                    return (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th><div className='listDate'>{t("DATE")}: {intakeDateList}</div></th>
                                                </tr>
                                                <tr>
                                                    <th>{t("Time")}</th>
                                                    <th>{t("Input Type")}</th>
                                                    <th>{t("Quantity")} ({t("Unit")})</th>
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

                                                })}

                                            </tbody>
                                        </>
                                    )
                                })}

                            </table>
                        </div>
                            : <></>}</div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
