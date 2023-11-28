import React, { useState } from 'react'
import OPDVLeft from './OPDVLeft'
import OPDVRight from './OPDVRight'

export default function OPDVitalIndex() {
  let [getData, setGetData] = useState(1)

    return (
        <div className='row p-0 m-0'>
            <div className='col-md-6 col-sm-12 plt'>
                <OPDVLeft callingpage={0} setGetData={setGetData}/>
            </div>
            <div className='col-6'>
                
                <OPDVRight callingpage={0} setGetData={setGetData} getData={getData}/>
            </div>
        </div>
    )
}
