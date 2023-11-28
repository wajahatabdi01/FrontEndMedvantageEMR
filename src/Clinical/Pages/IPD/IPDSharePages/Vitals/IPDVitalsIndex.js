import React from 'react'
import OPDVLeft from '../../../OPD/OPDSharePage/OPDVital/OPDVLeft'
import OPDVRight from '../../../OPD/OPDSharePage/OPDVital/OPDVRight'
import { useState } from 'react'
import DisplayVitalsHistory from './DisplayVitalsHistory'

export default function IPDVitalsIndex() {
  let [getData, setGetData] = useState(1)
  return (
    <div className='vital-cn132 '>
      <div className='row'>
        <div className='col-md-6 col-sm-6 plt1  vital-1'>
          <div className='whitebackgroundnopad1'>
            <OPDVLeft callingpage={1} setGetData={setGetData} />
          </div>
        </div>
        <div className='col-md-6 col-sm-6 prt1 vital-1'>
          <div className='whitebackgroundnopad1'>
            <OPDVRight callingpage={1} setGetData={setGetData} getData={getData} />
          </div>
        </div>
      </div>
      <div className='row'>
        <DisplayVitalsHistory />
      </div>
    </div>
  )
}
