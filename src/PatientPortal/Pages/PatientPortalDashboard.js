import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Select from 'react-select';
import Loder from '../../Component/Loader';


export default function PatientPortalDashboard() {



  return (
    <>
     <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">

                <div className="inner-content">
                <div className='fieldsett-in col-md-12'>
                <div className='fieldsett'>
                  <span className='fieldse'>Bill Reports</span>
                  <div className='row'>

                 
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">From<span className="starMandatory">*</span></label>
                      <input id="ddalarmtime" type="date" className="form-control form-control-sm" name="fromdate"  />
                      <small id="errfrom" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">To<span className="starMandatory">*</span></label>
                      <input  id="ddwarningviewtime" type="date" className="form-control form-control-sm" name="todate" />
                      <small id="errtodate" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div class="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" id="paymentModediv">
                    <label for="PaymentMode" class="form-label">
                      <img  alt=''/> Bill Type{" "}
                      
                    </label>
                    <select id="Payment"
                      class="form-control form-control-sm"
                    
                    >
                      <option value="0" selected>All</option>
                      <option value="1">
                        By Cash
                      </option>
                      <option value="2">Credit</option>
                      <option value="3">Advance</option>
               
                      {/* <option value={0}>By Online Payment</option> */}
                    </select>
                  </div>



                  </div>
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
                      <th>Amount Paid</th>
                      {/* <th>Payment Mode</th> */}
                      <th>Date | Time</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                
            
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
        
        }
      </section>

    </>

  )
}