import JsBarcode from 'jsbarcode'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function PrintBarCode() {
  let [barCodeData, setBarCodeData] = useState([])
  useEffect(() => {
    let response = JSON.parse(window.sessionStorage.getItem("printPatientBarCode"))
    setBarCodeData(response)
    setTimeout(() => {
      response.responseValue.map((val, ind) => {
        JsBarcode(`#barcode` + ind, val.billNo, {
          displayValue: false,
          height: 25,
        });
      })
    }, 500)

  }, [])
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      {barCodeData.responseValue && barCodeData.responseValue.map((val, ind) => {
        return (
          <>
            <div className='text-center'>
              <h6 style={{ margin: "0" }}>{barCodeData.patientName} {barCodeData.patientAge}Y {barCodeData.genderType} <span>{val.isCritical === 1 ? "*" : barCodeData.checked === true?"*":""}</span></h6>
              <h6 style={{ margin: "0" }}>{val.labNumber}</h6>
              <svg style={{ margin: "0" }} id={`barcode${ind}`}></svg>
              <h6 style={{ margin: "0" }}>{val.billNo}</h6>
            </div>

            <br />
          </>
        )
      })}


    </div>
  )
}

