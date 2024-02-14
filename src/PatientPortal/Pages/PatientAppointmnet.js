import React, { useState, useEffect } from 'react';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import doctorIcon from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 137.png'
import locationIcon from '../../assets/images/dashboard/location-pin.svg'
import clockIcon from '../../assets/images/dashboard/Layer 2 (1).svg'
import medAssicon from '../../assets/images/icons/medical-assistance.svg'
import doctorIcon1 from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 136.png'
import doctorIcon2 from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 134.png'
import closeIcon from '../../assets/images/dashboard/Group 8147.svg'
import doctorIcon4 from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 136@2x.png'
import rupeeIcon from '../../assets/images/dashboard/currency-rupee.svg'
import calenIcon from '../../assets/images/dashboard/Layer 93.svg'
import leftArrIcon from '../../assets/images/dashboard/Group 17477.svg'
import rightArrIcon from '../../assets/images/dashboard/Group 17478.svg'

function PatientAppointmnet() {
    let [isShowIssueModel, setIsShowIssueModel] = useState(0);

    return (
        <section className='main-content mt-5 pt-3'>
            <div className='container-fluid'>

                <div className='row'>
                    <div className="col-12">
                        <div className='whitebg' style={{ margin: "0 0 10px 0" }}>

                            <div className="col-md-12 col-sm-12 analuze" >
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='Appoin'>{"Appointment"}</span>
                                        <BoxContainer>




                                            <div className="mb-3">
                                                <div>
                                                    <img src={medAssicon} alt="" /> <label htmlFor="doctorSpecty" className="DoctQualtext">{"Doctor/Speciality"}<span class="starMandatory"></span></label>
                                                    <input type='text' className='textBoxAppoint form-control-sm' id='doctorSpecty' name='doctorSpecty' placeholder={"Enter Doctor & Speciality"} style={{ width: '250px' }} />
                                                </div>

                                            </div>

                                            <div className="mb-2 my-4">
                                                <div className='searchbtnn'>
                                                    <button ><i className='fa fa-search'></i>{"Search"}</button>
                                                </div>
                                            </div>


                                        </BoxContainer>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>

                <div className='row'>
                    {/* <div className="col-12">
                        <div className='tableHead-1'>
                           
                        Recently Searched
                        </div>
                    </div> */}
                    <div className="col-12">
                        <div className='whitebg'>
                            <div className='tableHead-1'>

                                Recently Searched
                            </div>
                            <div className="med-table-section" style={{ "height": "581px", position: 'relative', overflow: 'auto' }}>

                                <TableContainer>


                                    <tbody>



                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="btn btn-Appoint btn-Appoint-fill mb-1 me-1" data-bs-placement="bottom" onClick={() => { setIsShowIssueModel(1) }}>Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>


                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon1} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="btn btn-Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon2} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="btn btn-Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon1} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="btn btn-Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon2} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="btn btn-Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="btn btn-Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>






                                    </tbody>
                                </TableContainer>




                            </div>
                        </div>
                    </div>
                </div>






            </div>

            {isShowIssueModel === 1 ?
                <div className={`modal d-${isShowIssueModel === 1 ? "block" : ""}`} id="BookAppointModal" data-bs-backdrop="static">

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content p-0">

                            <div className="modalBookAppoint-header">

                                <h1 className="modalPopUpTextHeader" id="exampleModalLabel">Book Appointment</h1>

                                <button type="button" className="btnModalAppointClose" title="Close Window" onClick={() => { setIsShowIssueModel(0) }}>

                                    <img src={closeIcon} alt="" />

                                </button>

                            </div>

                            <div className="modal-body p-0">

                                <div className="row">

                                    <div className="col-12">

                                        <div className="med-box">
                                            <div className="inner-content" style={{ "height": "550px", position: 'relative', overflow: 'auto' }}>
                                                <div className="row">

                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div className='d-flex'><img className='modalImagePop' src={doctorIcon4} alt="" />

                                                            <div class='mt-4 mx-2'>
                                                                <div className='DoctNametext mx-2'>Dr. Vijay Kumar Goel</div>
                                                                <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                                <div className='locationtext1 mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                                <div className='d-flex mx-2'>
                                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className='align-items-end'>
                                                            <div className='mt-3'>
                                                                <img src={rupeeIcon} alt="" />500 Rs
                                                            </div>
                                                            <div className='mt-5'>
                                                                <button type="button" className="btn btn-Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="row">

                                                    <div className='horizontal-line custom-line'></div>
                                                </div>

                                                <div className="row">
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div className='chooseText'>Choose Date & Time</div>
                                                        <div className='align-items-end'>
                                                            <img src={calenIcon} alt="" /> Nov 2023  <img src={leftArrIcon} alt="" /> <img src={rightArrIcon} alt="" />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    <div className='d-flex'>
                                                        <button type='button' className='btn btn ddSpace mx-1'>
                                                            <div className="row">
                                                                <div className='dayNtext'>Mon</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='dtText'>30</div>
                                                            </div>
                                                        </button>
                                                        <button type='button' className='btn btn ddSpace mx-1'>
                                                            <div className="row">
                                                                <div className='dayNtext'>Tue</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='dtText'>31</div>
                                                            </div>
                                                        </button>
                                                        <button type='button' className='btn btn ddSpace mx-1'>
                                                            <div className="row">
                                                                <div className='dayNtext'>Wed</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='dtText'>01</div>
                                                            </div>
                                                        </button>
                                                        <button type='button' className='btn btn ddSpace mx-1'>
                                                            <div className="row">
                                                                <div className='dayNtext'>Thu</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='dtText'>02</div>
                                                            </div>
                                                        </button>
                                                        <button type='button' className='btn btn ddSpace mx-1'>
                                                            <div className="row">
                                                                <div className='dayNtext'>Fri</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='dtText'>03</div>
                                                            </div>
                                                        </button>
                                                        <button type='button' className='btn btn ddSpace mx-1'>
                                                            <div className="row">
                                                                <div className='dayNtext'>Sat</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='dtText'>04</div>
                                                            </div>
                                                        </button>
                                                        <button type='button' className='btn btn ddSpace mx-1'>
                                                            <div className="row">
                                                                <div className='dayNtext'>Sun</div>
                                                            </div>
                                                            <div className="row">
                                                                <div className='dtText'>05</div>
                                                            </div>
                                                        </button>


                                                    </div>
                                                </div>
                                                <div className='row mt-2'>
                                                    <div className='mortxt'>Morning</div>
                                                </div>

                                                <div className='row mt-2'>
                                                <div className='d-flex'>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>08:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>08:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>09:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>09:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>10:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>10:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>11:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>08:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>11:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        </div>
                                                </div>
                                                <div className='row mt-2'>
                                                    <div className='mortxt'>Afternoon</div>
                                                </div>
                                                <div className='row mt-2'>
                                                <div className='d-flex'>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>12:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>12:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>01:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>01:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>02:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>02:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>03:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>03:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>04:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        </div>
                                                </div>

                                                <div className='row mt-2'>
                                                <div className='d-flex'>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>04:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>05:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>05:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>06:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>06:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>07:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>07:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>08:00</div>
                                                            </div>
                                                            
                                                        </button>
                                                        <button type='button' className='btn btn dtSpace mx-1'>
                                                            <div className="row">
                                                                <div className='timeText'>08:30</div>
                                                            </div>
                                                            
                                                        </button>
                                                        
                                                        </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>



                        </div>

                    </div>

                </div> : ''
            }

        </section>

    )
}


export default PatientAppointmnet



