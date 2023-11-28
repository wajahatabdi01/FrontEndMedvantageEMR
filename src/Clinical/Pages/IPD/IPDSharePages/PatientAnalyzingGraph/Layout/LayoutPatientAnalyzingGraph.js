import React from 'react'
// import Navbar from '../../Components/Navbar'
// import BloodBankSidebar from '../../Components/BloodBankSidebar'
import PatientAnalyzingGraph from '../Pages/PatientAnalyzingGraph'
import IPDSharePageSidebar from '../../IPDSharePageSidebar'

export default function LayoutPatientAnalyzingGraph() {
  return (
    <div>
      {/* <Navbar/> */}
      <IPDSharePageSidebar/>
      <PatientAnalyzingGraph/>
    </div>
  )
}
