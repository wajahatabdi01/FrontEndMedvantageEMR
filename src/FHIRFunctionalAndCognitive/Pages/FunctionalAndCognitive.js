import React, { useEffect, useState } from 'react';

import plus from '../../assets/images/icons/icons8-plus-30.png';
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png';


export default function FunctionalAndCognitive({setFunctionalAndCog, setShowToster}) {

  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []

  const [carePlanRow, setCarePlanRow] = useState([
    {
      rowID: 1,
      Date: '',
      Code: '',
      Type: 0,
      Description: '',
      reasonCode: '',
      reasonStatus: '',
      reasonRecordingDate: '',
      reasonEndDate: '',
    },
  ]);
  const [getCarePlanTypeList, setCarePlanTypeList] = useState([])

  useEffect(() => {

  },[setFunctionalAndCog])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div class="title mb-1" style={{backgroundColor:'#80808036'}}>Enter Details</div>
              <div className="inner-content">
                {carePlanRow && carePlanRow.map((carePlan, index) => {
                  return (<div className='container-fluid border border-primary mb-2 rounded'>
                    <>
                      <div className="row mb-2">
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Code :<span className="starMandatory">*</span></label>
                          <input type='text' className='form-control form-control-sm' id={'codeInputID' + carePlan.rowID} onClick={''} />
                          {/* <span>{carePlan.rowID}</span> */}
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Date :</label>
                          <input type='date' className='form-control form-control-sm' id={'careDateID' + carePlan.rowID} />
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Type :</label>
                          <select className='form-select form-select-sm' id={'careTypeID' + carePlan.rowID} >
                          <option value='0'>Select Code</option>
                          {/* {getCarePlanTypeList && getCarePlanTypeList.map((list, ind) => (
                            <option key={ind} value={list.id}>{list.typeName}</option>
                  ))} */}
                            
                            
                          </select>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mb-2">
                          <label className='form-label'>Description :</label>
                          <textarea className='form-control form-control-sm' id={'careDescriptionID' + carePlan.rowID} />
                        </div>

                        <div className="col-xl-3 col-lg-6 col-md-6 mb-2">
                          <label className='form-label'>&nbsp;</label>
                          <div className="mb-2 d-flex justify-content-end_ flex-wrap">
                            <div>
                              <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={''}><img src={plus} className='icnn' alt='' />Add</button>
                            </div>
                            <div>
                              <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={''}><img src={deleteIcon} className='icnn' alt='' />Delete</button>
                            </div>
                            {/* <div>
                              <button type="button" className="btn btn-light btn-sm btn-light-fill mb-1 ms-2" style={{ borderColor: 'black' }} onClick={''}><img src={asterik} className='icnn' alt='' />Add Reason</button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      
                    </>
                    
                  </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
