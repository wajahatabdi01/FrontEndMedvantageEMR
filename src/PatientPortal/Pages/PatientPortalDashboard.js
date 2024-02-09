import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Select from 'react-select';
import Loder from '../../Component/Loader';
import exampleUser from '../../assets/images/dashboard/patientPortalDashboard/exampleUser.png'
import user from '../../assets/images/dashboard/patientPortalDashboard/portalusericon.png'
import dob from '../../assets/images/dashboard/patientPortalDashboard/dob.png'


export default function PatientPortalDashboard() {



  return (
    <>
     <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">

                <div className="inner-content">
                <div className='fieldsett-in col-md-6 d-flex flex-wrap portal-user-details-box'>
                <div>
                  <img src={exampleUser} alt=""/>
                </div>

                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 ps-2 ms-2">
                  <div className="portal-user-name">Shiv Mishra</div>
                  <div className="d-flex justify-content-between">
                    <div><img src={user} />Male</div>
                    <div><img src={dob} />10-feb-2000(24yr)</div>
                    <div><img src={user} />Male</div>
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