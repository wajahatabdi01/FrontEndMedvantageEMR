import React,{ useEffect, useState } from 'react'
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import clearIcon from '../../assets/images/icons/clear.svg';
import calender from '../../assets/images/icons/calender.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import view from '../../assets/images/icons/view.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import doctorprofile from '../../assets/images/dashboard/patientPortalDashboard/doctorprofile.png';
import doctor1 from '../../assets/images/dashboard/patientPortalDashboard/doctor1.png';
import doctor2 from '../../assets/images/dashboard/patientPortalDashboard/doctor2.png';
import Heading from '../../Component/Heading';

export default function MyAppointment() {



  const [showLoder, setShowLoder] = useState(0);
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterValue, setTosterValue] = useState(0);
  const [UHID, setUHID] = useState('');
  const [tosterMessage, setTosterMessage] = useState("");
  const [PolicyList, setpolicyList] = useState([]);
  let [isShowBillModel, setIsShowBillModel] = useState(0);
  let [showClaimModel, setshowClaimModel] = useState(0);
  const [allbills, setallbills] = useState([]);
  let [isShowBillItemsModel, setIsShowBillItemsModel] = useState(0);
  let [itmeDetailByBill, setItmeDetailByBill] = useState([]);
  const [billReport, setbillReport] = useState([]);
  const [billDetails, setbillDetails] = useState([]);
  const [rowUHID, setrowUHID] = useState('');
  const [rowCompany, setrowCompany] = useState('');
  const [rowCompanyID, setrowCompanyID] = useState('');
  const [rowPolicyNo, setrowPolicyNo] = useState('');
  const [rowAmount, setrowAmount] = useState('');
  const [claimDate, setClaimDate] = useState();
  const [claimAmount, setclaimAmount] = useState('');
  const [Remark, setRemark] = useState('');
 

  const handleOnChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'uhid') {
      setUHID(value);
    }
    if (name === 'remark') {
      setRemark(value);
    }
    if (name === 'claimamount') {
      setclaimAmount(value);
    }
  }

 
  return (
   <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="inner-content">
                <div className='fieldsett-in'>
                <div className='fieldsett'>
                  <span className='fieldse'>Appointment</span>
                  <div className='row mt-2 ms-2'>
                 
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                        <div className='mb-1'>
                        <img src={calender} className='me-1' alt="" /><label htmlFor="Code" className="form-label">From Date<span className="starMandatory">*</span></label>
                        </div>
                   
                      <input id="uhid" type="date"  className="form-control form-control-sm custom" placeholder = "Enter Date" name="uhid" style={{borderRadius: '0px',fontStyle: 'italic'}} />
                      <small id="erruhid" className="form-text text-danger" style={{ display: 'none' }}></small>
                      </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">

                        <div className='mb-1'>
                          <img src={calender} className='me-1' alt="" /><label htmlFor="Code" className="form-label">To Date<span className="starMandatory">*</span></label>
                        </div>
                     
                      <input id="uhid" type="date"  className="form-control form-control-sm" placeholder = "Enter UHID" name="uhid" style={{borderRadius: '0px',fontStyle: 'italic'}} />
                      <small id="erruhid" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
 
                    <div className="col-xxl-3 col-xl-4 col-lg-4 col-md-6 mb-3 relative  d-flex align-items-end">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                      
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"  ><i class="bi bi-search me-2"></i>Search</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><img src={clearIcon} className='icnn' alt='' />Clear</button>
        
                          </div>
                      }
                    </div>
                  </div>
                  </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-12 mt-3">
                  <div className='handlser ps-2 pb-2'>
                     <Heading text="Upcoming Appointment" /></div>
                     
              <div className="med-table-section" style={{ minHeight: "17vh", maxHeight: '17vh' ,overflow: 'auto'}}>
                <table className="med-table  striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "1%" }}></th>
                      <th>Name</th>
                      <th>Hospital Details</th>
                      <th>Date/Time</th>
                      <th>Dr. Fees</th>
                      <th>Problem Name </th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td></td>
                        <td colspan={1}>
                            <div className='d-flex flex-wrap doctor-booked-name'>
                                <div className="doctor-image"><img src={doctorprofile} alt=""/></div>
                                <div className='text-center ms-2'>
                                    <div className='doctors-name'>Dr Harshit Mehta</div>
                                    <div className='doctors-eduction'>MBBS, Gastrologist</div>
                                </div>
                            </div>
                        </td>
                        <td>Sarfarazganj,Lucknow</td>
                        <td className="doctor-booked-name">Mon 06, Nov 9:30AM</td>
                        <td>500Rs</td>
                        <td>N/A</td>
                        <td>
                        <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={editBtnIcon}  alt='' />
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt=''  />
                              </div>
                            </div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan={1}>
                            <div className='d-flex flex-wrap doctor-booked-name'>
                                <div className="doctor-image"><img src={doctor2} alt=""/></div>
                                <div className='text-center ms-2'>
                                    <div className='doctors-name'>Dr Arun Gupta</div>
                                    <div className='doctors-eduction'>MBBS, Gastrologist</div>
                                </div>
                            </div>
                        </td>
                        <td>Sarfarazganj,Lucknow</td>
                        <td className="doctor-booked-name">Mon 06, Nov 9:30AM</td>
                        <td>500Rs</td>
                        <td>N/A</td>
                        <td>
                        <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={editBtnIcon}  alt='' />
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt=''  />
                              </div>
                            </div></td>
                    </tr>
                
                      

  
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 mt-3">
                  <div className='handlser ps-2 pb-2'>
                     <Heading text="Past Appointment" /></div>
                     
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table  striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "1%" }}></th>
                      <th>Name</th>
                      <th>Hospital Details</th>
                      <th>Date/Time</th>
                      <th>Dr. Fees</th>
                      <th>Problem Name </th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                        <td></td>
                        <td colspan={1}>
                            <div className='d-flex flex-wrap doctor-booked-name'>
                                <div className="doctor-image"><img src={doctor1} alt=""/></div>
                                <div className='text-center ms-2'>
                                    <div className='doctors-name'>Dr Harshit Mehta</div>
                                    <div className='doctors-eduction'>MBBS, Gastrologist</div>
                                </div>
                            </div>
                        </td>
                        <td>Sarfarazganj,Lucknow</td>
                        <td className="doctor-booked-name">Mon 06, Nov 9:30AM</td>
                        <td>500Rs</td>
                        <td>N/A</td>
                        <td>
                        <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                 <img src={view}  alt='' />
                              </div>
                             
                            </div></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan={1}>
                            <div className='d-flex flex-wrap'>
                                <div className="doctor-image "><img src={doctorprofile} alt=""/></div>
                                <div className='text-center ms-2'>
                                    <div className='doctors-name'>Dr Arun Gupta</div>
                                    <div className='doctors-eduction'>MBBS, Gastrologist</div>
                                </div>
                            </div>
                        </td>
                        <td>Sarfarazganj,Lucknow</td>
                        <td className="doctor-booked-name">Mon 06, Nov 9:30AM</td>
                        <td>500Rs</td>
                        <td>N/A</td>
                        <td>
                        <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={view}  alt='' />
                              </div>
                            
                            </div></td>
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
