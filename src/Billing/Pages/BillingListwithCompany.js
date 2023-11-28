import React,{ useEffect, useState } from 'react'
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import imgPrint from '../../assets/images/icons/imgPrint.svg'
export default function BillingLists() {

  const [showLoder, setShowLoder] = useState(0);
  
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterValue, setTosterValue] = useState(0);
  const [UHID, setUHID] = useState('');
  const [tosterMessage, setTosterMessage] = useState("");
  return (
   <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">Bill Reports with Companies</div>
                <div className="inner-content">
                  <div className='row'>

                 
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">UHID<span className="starMandatory">*</span></label>
                      <input value={UHID} id="ddalarmtime" type="date" className="form-control form-control-sm" placeholder = "Enter UHID" name="uhid"  />
                      <small id="erruhid" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
 



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" ><img src={saveButtonIcon} className='icnn' />Search</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><img src={clearIcon} className='icnn' />Clear</button>
                   
                     
                       
                            
                          </div>
                      }
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Bill Number</th>
                      <th>Patient Name</th>
                      <th>Department Name</th>
                      <th>Amount Paid</th>
                      <th>Payment Mode</th>
  

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                
             
                        <tr >
                          <td className="text-center"></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
       
                         

                          <td>
                            <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                              <i class="bi bi-card-list"></i>
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={imgPrint} style={{width: '20px'}} className='' alt='' />
                              </div>
                            </div>
                          </td>
                        </tr>

  
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------Start Delete Modal Popup-------------------    */}

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalDelete">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'> Delete?</div>
                <div className='popDeleteContent'> Are you sure you want to delete?</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }
      </section>
   </>
  )
}
