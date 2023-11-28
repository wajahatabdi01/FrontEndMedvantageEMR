import React from 'react'
import Navbar from '../../Components/Navbar'
import BMSservicesSidebar from '../../Components/BMSservicesSidebar'
import Payment from '../Pages/Payment'

export const LayoutPayment= () => {
  return (
    <>
         <Navbar />
    <Payment/>
    <BMSservicesSidebar/>
    </>
   
  )
}
