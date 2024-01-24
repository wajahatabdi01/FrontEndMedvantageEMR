import React from 'react'
import { useEffect } from 'react'
import GetCategoryWisePatientInvestigation from '../../../../API/OPD/Investigation/GetCategoryWisePatientInvestigation'
import { useState } from 'react'
import GetCategoryWisePatientRadiology from '../../../../API/OPD/Investigation/GetCategoryWisePatientRadiology'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function OPDInvestigationLeft(props) {
  document.body.dir = i18n.dir();
  const {t} = useTranslation()

  let [investigationData, setInvestigationData] = useState()
  let getdata = async () => {

    try {
      let response = ""
      let activeUHID = ""
      if (props.callingpage === 0) {
        activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : ""
      }
      else if (props.callingpage === 1) {
        activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : ""

      }
      if (props.activeId === 3) {
        response = await GetCategoryWisePatientRadiology({ "uhid": activeUHID, "category": 3 })
      }
      else {

        response = await GetCategoryWisePatientInvestigation({ "uhid": activeUHID, "category": props.activeId })
      }

      if (response.status === 1) {
        setInvestigationData(response.responseValue)
      }
    }
    catch(e){console.log("mesage", e.message)}
  }

  useEffect(() => {
    getdata()
  }, [props])
  return (
    <div className='investigation_h'>
    <table className='med-table border_ striped'>
      <thead>
        <th>#</th>
        <th align='center'>{t("Coll. Date")}
          <span className='ar-cnt'>
            <div className='ar-top'><i className='fa fa-caret-up'></i></div>
            <div className='ar-top1'><i className='fa fa-caret-down'></i></div>
          </span>
        </th>
        <th>
          {t("Test Type")}
          <span className='ar-cnt'>
            <div className='ar-top'><i className='fa fa-caret-up'></i></div>
            <div className='ar-top1'><i className='fa fa-caret-down'></i></div>
          </span>
        </th>
        <th>{t("Action")}</th>
      </thead>
      <tbody>
        {investigationData && investigationData.map((value, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{value.collectionDateTime.split("T")[0]}</td>
              <td style={{ 'color': '#2D8AF5' }}>{value.subCategoryName} ({value.testName})</td>
              <td align='center' className='viewtd'>
                <i className="fa-solid fa-eye pointer" onClick={() => { props.getActiveSubID(value.sampleCollectionMainID); props.setShowTestList(0);}}></i>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
  
  )
}
