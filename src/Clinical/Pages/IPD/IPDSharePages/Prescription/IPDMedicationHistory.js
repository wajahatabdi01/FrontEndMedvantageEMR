import React, { useEffect, useState } from 'react'
import TableContainer from '../../../../../Component/TableContainer'
import Heading from '../../../../../Component/Heading'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function IPDMedicationHistory() {
    const { t } = useTranslation();

    let [patientPrecriptionHistory, setPatientPrecriptionHistory] = useState([])
    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)


    let setData = () => {
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "prescriptionHistory") {
                        if (val.prescriptionHistory.length != 0) {
                            setPatientPrecriptionHistory(val.prescriptionHistory)
                        }
                        else {
                            setPatientPrecriptionHistory([])
                        }

                    }
                }
            })
        })
    }

    useEffect(() => {
        setData()
    }, [patientsendDataChange]);

    document.body.dir = i18n.dir();

    return (
        <div className='roww mt-2'>
            <Heading text={t("MEDICATION_HISTORY")} />
            <div className={` boxcontainer med-table-section `} style={{ height: "265px", overflowX: "auto" }}>
                <TableContainer>
                    <thead>
                        <th>{t("MEDICINE")}</th>
                        {/* <th>{t("DOSAGE_FORM")}</th> */}
                        {/* <th>{t("STRENGTH")}</th> */}
                        {/* <th>{t("UNIT")}</th> */}
                        <th>{t("FREQUENCY")}</th>
                        <th>{t("DURATION")}</th>
                        <th>{t("Remark")}</th>
                        <th>{t("PRESCRIBE_BY")}</th>
                        {/* <th>{t("WRITTEN_BY")}</th> */}
                        {/* <th>{t("STOPPED_DELETED_BY")}</th> */}
                        <th>{t("STARTED_AT")}</th>
                        <th>{t("STOPPED_AT")}</th>
                        <th>{t("STATUS")}</th>


                    </thead>
                    <tbody>
                        {patientPrecriptionHistory && patientPrecriptionHistory.map((val, ind) => {
                            return (
                                <tr>
                                    <td>{val.drugName.toUpperCase()}</td>
                                    {/* <td>Dosage Form</td> */}
                                    {/* <td>Strength</td> */}
                                    {/* <td>{val.doseUnit}</td> */}
                                    <td>{val.doseFrequency.length !== 0 ? val.doseFrequency : "-"}</td>
                                    <td>{val.duration.length !== 0 ? val.duration : "-"}</td>
                                    <td>{val.remark.length !== 0 ? val.remark.length : "-"}</td>
                                    <td>{val.consultedByName.length ? val.consultedByName : "-"}</td>
                                    {/* <td>Written By</td> */}
                                    {/* <td>{val.stopByName}</td> */}
                                    {/* <td>{val.stopDate}</td> */}
                                    <td>-</td>
                                    <td>{val.stopDate}</td>
                                    <td>{val.medicineStatus.length ? val.medicineStatus : "-"}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </TableContainer>
            </div>
        </div>
    )
}
