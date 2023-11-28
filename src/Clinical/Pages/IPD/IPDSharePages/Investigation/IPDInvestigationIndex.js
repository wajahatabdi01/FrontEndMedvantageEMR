import React, { useEffect, useState } from 'react'
import DepartmentNavbar from '../../../OPD/OPDSharePage/OPDInvestigation/DepartmentNavbar'
import OPDInvestigationLeft from '../../../OPD/OPDSharePage/OPDInvestigation/OPDInvestigationLeft'
import OPDInvestigationRight from '../../../OPD/OPDSharePage/OPDInvestigation/OPDInvestigationRight'
import OPDInvestigationRightList from '../../../OPD/OPDSharePage/OPDInvestigation/OPDInvestigationRightList'

export default function IPDInvestigationIndex() {

  let [activeId, setActiveId] = useState("")
  let [activeSubId, setActiveSubId] = useState("")
  let [showTestList, setShowTestList] = useState(1)
  let [activeUHID, setActiveUHID] = useState("")

  useEffect(() => {
    // let uhid = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    try {

        let uhid = "UHID00181"
        setActiveUHID(uhid)
    }
    catch (e) {
        console.log("e", e.message)
    }
}, [])

  return (
    <div className='row p-0 m-0'>
      <div className='col-md-6 col-sm-12 me-0 plt'>
        <div className='row p-0 m-0'>
          <div className='row p-0 m-0 boxcontainer'>
            <DepartmentNavbar getActiveID={setActiveId} callingpage={1} />
          </div>
          <div className='row pt-2 p-0 m-0 boxcontainer'>
            <OPDInvestigationLeft activeId={activeId} getActiveSubID={setActiveSubId} setShowTestList={setShowTestList} callingpage={1} />

          </div>
        </div>
      </div>
      <div className='col-md-6 col-sm-12  me-0 prt'>
        <div className='row pt-2 p-0 m-0 boxcontainer'>
          {
            showTestList === 1 ? <OPDInvestigationRightList /> :
              <OPDInvestigationRight activeSubId={activeSubId} callingpage={0} uhid={activeUHID}/>
          }

        </div>
      </div>
    </div>
  )
}
