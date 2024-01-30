import React, { useEffect, useState } from 'react'
import IPDTopVitals from './IPDTopVitals'
import IPDHistory from './IPDHistory'
import IPDPatientComplaintConsultant from './IPDPatientComplaintConsultant'
import IPDMedication from './IPDMedication'
import IPDMedicationHistory from './IPDMedicationHistory'
import IPDVentilator from './IPDVentilator'
import IPDVentiBottom from './IPDVentiBottom'
import BottomButtons from './BottomButtons'
import GetPatientIPDAllHistory from '../../../../API/IPD/Prescription/GetPatientIPDAllHistory'
import SaveIPDData from '../../../../../Code/SaveIPDData'
import store from '../../../../../Store'
import { getIPDPatientData } from '../../../../../Reduce/IPD/IPDPatientData'
import { useSelector } from 'react-redux'
import Loader from '../../../../../Component/Loader'
import IPDPatientLabData from './IPDPatientLabData'
import Search from '../../../../../Code/Serach'
import { useLocation } from 'react-router-dom'


export default function IPDPrecriptionIndex() {

  let [loader, setLoader] = useState(1)
  let location = useLocation()


  let getOnlySpecificData = async () => {
    setLoader(1)
    let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
    let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let response = await GetPatientIPDAllHistory(activeUHID)
    if (response.status === 1) {
      let val = response.responseValue
      let key = Object.keys(val)
      let flags = 0
      key.map((vals, ind) => {
        if (vals === "runningPrescription") {
          SaveIPDData(val.runningPrescription, "jsonArray")
        }

        else if (vals === "prescriptionHistory") {
          SaveIPDData(val.prescriptionHistory, "prescriptionHistory")
        }

        flags = 1

      })

    }
    setLoader(0)
  }

  let getData = async () => {
    setLoader(1)

    let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
    let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let t = []
    temp.map((values, index) => {
      if (values[0] === activeUHID) {
        values.map((val, ind) => {
          let keys = Object.keys(val)
          t.push(keys[0])
        })
      }
    })
    // if (!t.includes("dataget")) {
    let response = await GetPatientIPDAllHistory(activeUHID)
    if (response.status === 1) {
      let val = response.responseValue
      let key = Object.keys(val)
      let flags = 0
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
        flags = 1

      })
      SaveIPDData(1, "dataget")
      if (flags === 1) {
        store.dispatch(getIPDPatientData(val))
      }
    }
    // }
    else {
      temp.map((values, index) => {
        if (values[0] === activeUHID) {
          store.dispatch(getIPDPatientData(values))
        }
      })
    }
    setLoader(0)

  }

  let IPDUHIDChange = useSelector((state) => state.IPDUHIDChange)



  useEffect(() => {
    let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
    let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let flag = 0
    temp.map((values, index) => {
      if (values[0] === activeUHID) {

        if (values.length > 1) {
          flag = 1
        }

      }
    })
    if (flag === 0) {
      getData()
    }
    else {
      store.dispatch(getIPDPatientData(temp))
      setLoader(0)
    }
  }, [IPDUHIDChange])
  return (
    <>
      <div className=" row">
        <div className='col-md-9 col-sm-12 plt'>
          <IPDTopVitals />
          <IPDHistory />
          <IPDPatientComplaintConsultant />
          <IPDMedication getData={getOnlySpecificData} />
          <IPDMedicationHistory />
        </div>
        <div className='col-md-3 col-sm-12 prt'>
          <IPDVentilator />
          <IPDVentiBottom />
          <IPDPatientLabData />
        </div>
      </div>
      <div className='roww mt-2 ipdbrn'>
        <BottomButtons getData={getData} />
      </div>
      <Loader val={loader} />
    </>
  )
}
