import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'

import AlarmWarningLog from '../Pages/AlarmWarningLog'

export const LayoutAlarmWarningLog= () => {
  return (
    <>
         <Navbar />
    <AlarmWarningLog/>
    <BMSservicesSidebar/>
    </>
   
  )
}
