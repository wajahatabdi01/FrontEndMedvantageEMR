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

function PatientAppointmnet() {


    return (
        <section className='main-content mt-5 pt-3'>
            <div className='container-fluid'>

                <div className='row'>
                    <div className="col-12">
                        <div className='whitebg' style={{ margin: "0 0 10px 0" }}>
                            <div className="row">
                                <div className="col-md-12 col-sm-12 analuze" >
                                    <div className="fieldsett-in">
                                        <div className="fieldsett">
                                            <span className='fieldse'>{"Appointment"}</span>
                                            <BoxContainer>




                                                <div className="mb-2 me-2">
                                                    <div>
                                                    <img src={medAssicon} alt="" /> <label htmlFor="doctorSpecty" className="form-label">{"Doctor/Speciality"}<span class="starMandatory"></span></label>
                                                        <input type='text' className='form-control form-control-sm' id='doctorSpecty' name='doctorSpecty' placeholder={"Enter Doctor & Speciality"} style={{ width: '250px' }} />
                                                    </div>

                                                </div>

                                                <div className="mb-2 my-4 mx-2">
                                                    <div className='searchbtnn'>
                                                        <button ><i className='fa fa-search'></i>{"Search_Result"}</button>
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
            </div>

            <div className='container-fluid'>

                <div className='row'>
                    <div className="col-12">
                        <div className='handlser'>
                            <Heading text={"Recently Searched"} id='top' />
                            <div style={{ position: 'relative' }}>


                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="med-table-section" style={{ "height": "581px", position: 'relative', overflow: 'auto' }}>

                            <TableContainer>


                                <tbody>



                                    <tr>
                                        <td>
                                            <div className="d-flex mx-2">
                                                <div><img src={doctorIcon} alt="" /></div>


                                                <div class=''>
                                                    <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                    <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                    <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar1 bi bi-star-fill"/></i> (10 Feedback)</div>
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
                                            <div className="d-flex mx-2">
                                                <div><img src={doctorIcon} alt="" /></div>


                                                <div class=''>
                                                    <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                    <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                    <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar1 bi bi-star-fill"/></i> (10 Feedback)</div>
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
                                            <div className="d-flex mx-2">
                                                <div><img src={doctorIcon} alt="" /></div>


                                                <div class=''>
                                                    <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                    <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                    <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar1 bi bi-star-fill"/></i> (10 Feedback)</div>
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
                                            <div className="d-flex mx-2">
                                                <div><img src={doctorIcon} alt="" /></div>


                                                <div class=''>
                                                    <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                    <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                    <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar1 bi bi-star-fill"/></i> (10 Feedback)</div>
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
                                            <div className="d-flex mx-2">
                                                <div><img src={doctorIcon} alt="" /></div>


                                                <div class=''>
                                                    <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                    <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                    <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar1 bi bi-star-fill"/></i> (10 Feedback)</div>
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
                                            <div className="d-flex mx-2">
                                                <div><img src={doctorIcon} alt="" /></div>


                                                <div class=''>
                                                    <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                    <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                    <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar bi bi-star-fill"/> <i class="ratingStar1 bi bi-star-fill"/></i> (10 Feedback)</div>
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

        </section>

    )
}


export default PatientAppointmnet



