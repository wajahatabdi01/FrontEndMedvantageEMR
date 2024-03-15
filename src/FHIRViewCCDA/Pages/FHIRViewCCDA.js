import React from 'react'
import GetViewCCDAData from '../API/GetViewCCDAData';

export default function FHIRViewCCDA() {

  let activeUHID = window.sessionStorage.getItem("activePatient")
  ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
  : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []

  const navigateToPage = async() => {
    // navigate('/fhirviewccdadata/')
    const resView = await GetViewCCDAData(1);
    if(resView) {
      let newwindow = window.open('', '_blank');
    newwindow.document.write(resView);
    }
    // window.open('/fhirviewccdadata/')
  }

  return (
    <>
    <section className="main-content mt-5 pt-3">
      <div className="container-fluid">
        <div className="row ">
            <div class="col-12">
                <div class="med-box commong">
                    <div className="title">Please click on view button to view patient data.&nbsp;<span>
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={navigateToPage}>View</button></span></div>
                </div>
                
            </div>
          </div>
        </div>
      </section>
      
    </>
    
  )
}
