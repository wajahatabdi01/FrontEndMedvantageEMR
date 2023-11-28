import React, { useState } from 'react'
import OPDCLLeft from '../../../OPD/OPDSharePage/OPDCalculator/OPDCLLeft'
import OPDCALRight from '../../../OPD/OPDSharePage/OPDCalculator/OPDCALRight'

export default function IPDCalculatorIndex() {
    let [selectedCalculatorId, setSelectedCalculatorId] = useState("")

    return (
        <div className='row p-0 m-0'>
            <div className='col-md-6 col-sm-12 ps-0 plt'>
                <OPDCLLeft setId={setSelectedCalculatorId} callingpage={1}/>
            </div>
            <div className='col-md-6 col-sm-12 prt'>
                <OPDCALRight getId={selectedCalculatorId} callingpage={1}/>
            </div>
        </div>
    )
}
