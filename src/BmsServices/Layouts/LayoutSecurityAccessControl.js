import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import SecurityAccessControl from '../Pages/SecurityAccessControl'

export const LayoutSecurityAccessControl= () => {
  return (
    <>
         <Navbar />
    <SecurityAccessControl/>
    <BMSservicesSidebar/>
    </>
   
  )
}
