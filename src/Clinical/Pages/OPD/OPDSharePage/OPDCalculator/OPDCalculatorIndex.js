import React, { useState } from 'react'
import OPDCLLeft from './OPDCLLeft'
import OPDCALRight from './OPDCALRight'

export default function OPDCalculatorIndex() {

  let [selectedCalculatorId, setSelectedCalculatorId] = useState("")

  return (
    <div className='row p-0 m-0'>
      <div className='col-6'>
        <OPDCLLeft setId={setSelectedCalculatorId} callingpage={0}/>
      </div>
      <div className='col-6'>
        <OPDCALRight getId={selectedCalculatorId} callingpage={0}/>
      </div>
    </div>
  )
}

