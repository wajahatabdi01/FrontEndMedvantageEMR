import React, { useEffect, useState } from 'react';
import plus from '../../assets/images/icons/icons8-plus-30.png';
import editIcon from '../../assets/images/icons/icons8-pencil-30.png';
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png'
import FHIRGetAllPrescriptionListByUHID from '../API/GET/FHIRGetAllPrescriptionListByUHID';

export default function FHIRPrescreptionList() {

  const [prescreptionList, setPrescreptionList] = useState([]);
const funGetAllList = async () => {
  const listRes = await FHIRGetAllPrescriptionListByUHID(JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid);
  if(listRes.status === 1){

    setPrescreptionList(listRes.responseValue)
  }
}
useEffect(() => {
  funGetAllList();
}, [])
  return (
    
      <>
        <div className='container-fluid'>
        <div className="row">
          <div className='col-12'>
             <div className='med-box'>
                <div className='inner-content'>
                  <div className="row">
                    <div className='fieldsett-in col-md-12'>
                      <div className='fieldsett'>
                        <div className='fieldse'>
                        <span className='fieldse'>Prescription List</span>
                        <div className='col-12 mt-2'>
                          <div className='med-table-section' style={{ maxHeight: "80vh" }}>
                            <table className='med-table striped' style={{ borderBottom: '1px solid #dddddd' }}>
                              <thead style={{ zIndex: '0' }}>
                                <tr>
                                  <th style={{ "width": "5%" }}>#</th>
                                  <th>Drug</th>
                                  <th>RxNorm</th>
                                  <th>Created Date</th>
                                  <th>Changed Date</th>
                                  <th>Dosage</th>
                                  <th>Qty.</th>
                                  <th>Unit</th>
                                  <th>Refills </th>
                                  <th>Provider</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                              {prescreptionList && prescreptionList.map((list, ind) => {
                                return(
                                  <tr>
                                  <td>{ind + 1}</td>
                                    <td>{list.drug}</td>
                                    <td>{list.rxnorm_drugcode}</td>
                                    <td>{list.start_date}</td>
                                    <td>{list.start_date}</td>
                                    <td>{list.dosage}</td>
                                    <td>{list.quantity}</td>
                                    <td>{list.unit}</td>
                                    <td>{list.refills}</td>
                                    <td>{list.provider_id}</td>
                                    <td>
                                  <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1" >
                            <img src={deleteIcon} className='icnn' alt='' /> Delete
                          </button>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}>
                                      <img src={editIcon} className='icnn' alt='' /> Edit
                                    </button>
                                  </td>
                                  </tr>
                                )
                              })}
                              </tbody>
                            </table>                            
                          </div>
                        </div>

                        <div className="col-12">
                        <div className='d-flex justify-content-end'>                                
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 mt-2" data-bs-toggle="modal" data-bs-target="#PrescriptionPop">
                                  <img src={plus} className='icnn' alt="" />Add</button>
                              </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ////////////////////////////////////////// MODAL /////////////////////////////////////// */}
        <div className="modal fade" id="PrescriptionPop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content ">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">Problem</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close"><i className="fa fa-times"></i></button>
                        </div>
                        <div className="modal-body">
                            <div class="tab-content" id="myTabContent">
                                {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                <div class="tab-pane fade show active" id="problem" role="tabpanel" value='1' aria-labelledby="home-tab" tabindex="0">
                                    HElloooooooooooooooooooooooooo
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
    
  )
}
