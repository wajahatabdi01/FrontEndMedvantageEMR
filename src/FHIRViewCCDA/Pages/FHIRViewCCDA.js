import React, { useEffect, useState } from 'react'
import GetViewCCDAData from '../API/GetViewCCDAData';
import GetPidFromUhid from '../API/GetPidFromUhid';

export default function FHIRViewCCDA() {

  const [getPID, setPID] = useState('');

  let activeUHID = window.sessionStorage.getItem("activePatient")
  ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
  : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []

  const getUHIDFromPID = async () => {
    const resUHID = await GetPidFromUhid(1);
   
    setPID(resUHID.responseValue[0].pid)
  }

  const navigateToPage = async () => {
    var ddd= '{"status":0,"message":"failure","responseValue":"The given key userID was not present in the dictionary....}';
   

    const resView = await GetViewCCDAData(getPID);
    
    if(ddd.length === resView.length){
    
        const jsonResponse = JSON.parse(resView);
        const status = jsonResponse.status;
        if (status === 0) {
          alert('Data not available.');
          // You can choose to show an alert or handle this case in another way
          return;
      }
    }    
      else{
        let newWindow = window.open('', '_blank');
        newWindow.document.write(resView);
      }

    // try {
    //     const resView = await GetViewCCDAData(1);
    //     const jsonResponse = JSON.parse(resView);
    //     const status = jsonResponse.status;

    //     // Check the status and handle accordingly
    //     if (status === 0) {
    //         alert('Data not available.')
  
    //         // You can choose to show an alert or handle this case in another way
    //         return;
    //     }

    //     let newWindow = window.open('', '_blank');
    //     newWindow.document.write(resView);
    // } catch (error) {
   
    //     // Handle the error accordingly, such as showing an error message to the user
    // }
};


  useEffect(() => {
    getUHIDFromPID();
  },[])

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
