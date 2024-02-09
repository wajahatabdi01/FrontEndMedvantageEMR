import React, { useState, useEffect } from 'react';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';




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
                                                        <label htmlFor="doctorSpecty" className="form-label">{"Doctor/Speciality"}<span class="starMandatory">*</span></label>
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
                                            <div className="d-flex">
                                                <div><img src="" alt="Doctor" /></div>


                                                <div class='textinfo'>
                                                    <div>Doctor Name</div>
                                                    <div>Doctor Qualifications</div>
                                                    <div>Doctor Rating</div>
                                                </div>
                                            </div>

                                        </td>
                                        <td>
                                            <div className='d-flex'>
                                                <div className="action-button">
                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1">View Profile</button>
                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1">Book Appointment</button>
                                                </div>
                                                </div>

                                                <div className='d-flex'>
                                                    <div>kkkjjkh</div> <div>kkkjjkh</div>
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



