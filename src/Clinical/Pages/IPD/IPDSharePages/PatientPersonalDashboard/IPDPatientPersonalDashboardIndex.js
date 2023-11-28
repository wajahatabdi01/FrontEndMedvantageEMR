import React, { useEffect, useState } from 'react'
import IPDPPDLeft from './IPDPPDLeft'
import IPDPPDRight from './IPDPPDRight'
import GetPatientPersonalDashboard from '../../../../API/IPD/PersonalDashboard/GetPatientPersonalDashboard'

export default function IPDPatientPersonalDashboardIndex(props) {

  let [patientdata, setPatientData] = useState([])
  let getData = async () => {
    let activeUHID = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid
    let response = await GetPatientPersonalDashboard(activeUHID)
    if (response.status === 1) {
      setPatientData(response.responseValue)
      console.log("csdcsdcs", response.responseValue)
    }
  }
  useEffect(() => {
    // getData()
  }, [])
  return (
    <>
    
    <div className='row' style={{margin:'0 -8px'}}>
      <div className='col-xxl-8 col-md-8 col-sm-12 plt ps-0_'>
        {/* <IPDPPDLeft patientdata={patientdata}/> */}
        <IPDPPDLeft />
      </div>
      <div className='col-xxl-4 col-md-4 col-sm-12 prt'>
        {/* <IPDPPDRight patientdata={patientdata}/> */}
        <IPDPPDRight />
      </div>

    </div>
    
    </>
  )
}

