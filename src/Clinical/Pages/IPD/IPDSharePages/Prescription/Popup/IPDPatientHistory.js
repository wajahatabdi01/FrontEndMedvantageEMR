import React, { useEffect, useState } from 'react'
import GetPatientHistoryByUHID from '../../../../../API/OPD/Prescription/PatientHistoryOnClick/GetPatientHistoryByUHID';
import GetPatientVitalHistoryByPmID from '../../../../../API/OPD/Prescription/PatientHistoryOnClick/GetPatientVitalHistoryByPmID';
import SaveIPDData from '../../../../../../Code/SaveIPDData';
import GetPatientIPDAllHistory from '../../../../../API/IPD/Prescription/GetPatientIPDAllHistory';
import store from '../../../../../../Store';
import { getIPDPatientData } from '../../../../../../Reduce/IPD/IPDPatientData';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function IPDPatientHistory() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir()
    let [patientHistoryList, setPatientHistoryList] = useState([]);
    let [medicationHistoryList, setMedicationHistoryList] = useState([]);
    let [signSymptomsList, setSignSymptomsLists] = useState([]);
    let [vitalsDetails, setVitalsDetails] = useState([])

    let checkPatientHistory = async () => {

        let tstUhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;


        let data = await GetPatientHistoryByUHID(tstUhid);


        if (data.status === 1) {

            setPatientHistoryList(data.responseValue.patientDetails);

        }



        else {
            console.log('not found');
        }
    }
    let getVitalByPmId = async (id) => {
        let data = await GetPatientVitalHistoryByPmID(id)
        if (data.status === 1) {

            setVitalsDetails(data.responseValue.vital);
            setMedicationHistoryList(data.responseValue.prescription);
            setSignSymptomsLists(data.responseValue.signAndSymptoms);
        }
    }

    let handleReFillData = async (pmid) => {

        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        console.log("test ", pmid)
        let response = await GetPatientIPDAllHistory(activeUHID, pmid)
        if (response.status === 1) {
            let val = response.responseValue
            let key = Object.keys(val)
            key.map((vals, ind) => {
                if (vals === "runningPrescription") {
                    SaveIPDData(val.runningPrescription, "jsonArray")
                }
                else if (vals === "patientVitals") {
                    SaveIPDData(val.patientVitals, "jsonVital")
                }
                else if (vals === "patientHistoryCategoryResultExistance") {
                    SaveIPDData(val.patientHistoryCategoryResultExistance, "patientHistoryCategoryResultExistance")
                }
                else if (vals === "patientComplainHistory") {
                    SaveIPDData(val.patientComplainHistory, "jsonDiagnosis")
                }
                else if (vals === "prescriptionHistory") {
                    SaveIPDData(val.prescriptionHistory, "prescriptionHistory")
                }
                else if (vals === "patientCategoryResult") {
                    SaveIPDData(val.patientCategoryResult, "patientCategoryResult")
                }
                else if (vals === "patientExaminationResult") {
                    SaveIPDData(val.patientExaminationResult, "patientExaminationResult")
                }
                else if (vals === "patientHistoryCategoryResult") {
                    SaveIPDData(val.patientHistoryCategoryResult, "patientHistoryCategoryResult")
                }
                else if (vals === "patientInvestigation") {
                    SaveIPDData(val.patientInvestigation, "patientInvestigation")
                }
            })
            store.dispatch(getIPDPatientData(val))
        }

    }

    useEffect(() => {
        checkPatientHistory()
    }, [])

    return (
        <div className="modal fade" id="deleteModal" data-bs-backdrop="static">
            <div className="modal-dialog" style={{ maxWidth: '60vw' }}>
                <div className="modal-content px-1_">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-white " id="exampleModalLabel">{t("Patient History")}</h1>
                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window'><i className="bi bi-x-octagon"></i></button>
                    </div>
                    <div className="modal-body p-0">
                        <div className="row">
                            <div className="col-12">
                                <div className='med-table-section'>
                                    <table className="med-table border striped">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th style={{ width: '8%' }}>{t("Visit Date")}</th>
                                                <th>{t("Dept")}</th>
                                                <th>{t("Consultant")}</th>
                                                <th>{t("Diagnosis")}</th>
                                                <th className='text-center'>{t("Action")}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="accordion accordionPatientRaceSection" id="accordionExample">
                                            {patientHistoryList && patientHistoryList.map((list, index) => {
                                                console.log('list : ', list)
                                                console.log('patient history from database : ', patientHistoryList)
                                                return (<>
                                                    <tr >
                                                        <td>{index + 1}</td>
                                                        <td>{list.visitDate}</td>


                                                        <td>{list.departmentName === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>{t("Not Assigned")}</span> : <span>{list.departmentName}</span>}</td>

                                                        <td>{list.consultantName === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>{t("Not Assigned")}</span> : <span>{list.consultantName}</span>}</td>

                                                        <td>{list.diagnosis === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>{t("No Diagnosis")}</span> : <span>{list.diagnosis}</span>}</td>
                                                        <td value={list.id} className='text-center d-flex justify-content-center gap-2' style={{border:'0px'}}>
                                                          <div class="actt">
                                                            <i className="fa fa-eye a1 accordion-button_ collapsed pointer" data-bs-toggle="collapse" data-bs-target={'#collapseOne' + list.pmID} aria-expanded="false" onClick={() => { getVitalByPmId(list.pmID) }}></i>
                                                            <i className='fa fa-refresh a2 pointer' onClick={() => handleReFillData(list.pmID)}></i>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                    <tr className="accordion-item">
                                                        <td colSpan={7} id={"collapseOne" + list.pmID} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                            <div className="accordion-body detailsbg">

                                                                <div className='vitald'>{t("Vitals")}</div>
                                                                {vitalsDetails.length === 0 ?
                                                                    <div className='vitalBoxContainer'>

                                                                        <div className='vitalBox'><>{t("No Vital Details")}</></div>
                                                                    </div> : <>
                                                                        <div className="d-flex flex-wrap gap-2 text-center ps-2">
                                                                            {vitalsDetails && vitalsDetails.map((listVitals, index) => {

                                                                                return (
                                                                                    <div className='vitalBoxContainer'>
                                                                                        <label htmlFor="">{listVitals.vitalName}</label>
                                                                                        <div className='vitalBox'>{listVitals.vmValue} {listVitals.unit}</div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </div>
                                                                    </>}


                                                                <div className='vitald mt-3'>{t("Patient Complaints Signs & Symptoms")}</div>
                                                                {signSymptomsList.length === 0 ?
                                                                    <div className='vitalBox'><span>{t("No Complaints Signs & Symptoms Found..")}</span></div>
                                                                    :
                                                                    <>
                                                                        {signSymptomsList && signSymptomsList.map((listSign, index) => {

                                                                            return (

                                                                                <div className='vitalBox'>{listSign.symptoms}</div>
                                                                            )
                                                                        })}
                                                                    </>
                                                                }


                                                                <div className='med-table-section mt-2'>
                                                                    <table className='med-table border striped'>
                                                                        <thead>
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>{t("Medication Details")}</th>
                                                                                <th>{t("Frequency")}</th>
                                                                                <th>{t("Unit")}</th>
                                                                                <th>{t("Strength")}</th>
                                                                                <th>{t("Duration")}</th>

                                                                            </tr>
                                                                        </thead>

                                                                        <tbody>
                                                                            {medicationHistoryList.length === 0 ? <tr>
                                                                                <td>{1}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
                                                                            </tr> : <>
                                                                                {medicationHistoryList && medicationHistoryList.map((listMed, index) => {

                                                                                    return (
                                                                                        <tr>
                                                                                            <td>{index + 1}</td>
                                                                                            <td>{listMed.drugName}</td>
                                                                                            <td>{listMed.doseFrequency}</td>
                                                                                            <td>{listMed.doseUnit}</td>
                                                                                            <td>{listMed.dosageStrength}</td>
                                                                                            <td>{listMed.duration}</td>

                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </>}


                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                                )
                                            })}

                                        </tbody>
                                    </table>

                                </div>


                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
