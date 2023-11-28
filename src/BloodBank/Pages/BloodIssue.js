import React from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';

import uhid from '../../BloodBank/images/uhid.svg'
import name from '../../BloodBank/images/name.svg'
import age from '../../BloodBank/images/age.svg'
import genders from '../../BloodBank/images/genders.svg'
import department from '../../BloodBank/images/department.svg'
import bloddgroup from '../../BloodBank/images/bloddgroup.svg'
import product from '../../BloodBank/images/product.svg'
import requestunit from '../../BloodBank/images/requestunit.svg'
import dob from '../../BloodBank/images/dob.svg'
import time from '../../BloodBank/images/time.svg'
import printer from '../../BloodBank/images/printer.svg'
import exportfile from '../../BloodBank/images/exportfile.svg'


export default function BloodIssue() {
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text='Blood Issue' />
              
              <div className="fieldsett-in">
                 <div className="fieldsett">
                   <span className='fieldse'>Blood Issue</span>
                    <BoxContainer>
                  
                      <div className="mb-2 me-2">
                      <img src={uhid} className='icnn'/> <label htmlFor="UHID" className="form-label">UHID<span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="UHID" name="UHID" placeholder="Enter UHID" />
                      </div>
                      <div className="mb-2 me-2">
                      <img src={name} className='icnn'/> <label htmlFor="PatientName" className="form-label">Patient Name<span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="PatientName" name="PatientName" placeholder="Enter Patient Name" />
                      </div>
                      <div className="mb-2 me-2">
                      <img src={age} className='icnn'/> <label htmlFor="Age" className="form-label">Age<span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="Age" name="Age" placeholder="Enter Age" />
                      </div>
                      <div className="mb-2 me-2">
                      <img src={genders} className='icnn'/> <label htmlFor="departmentName" className="form-label">Gender <span className="starMandatory">*</span></label>
                         <div className='d-flex flex-direction-column gap-2'>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" id="gender" />
                          <label className="form-check-label" for="gender">
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gender" id="gender"  />
                          <label className="form-check-label" for="gender">
                            Female
                          </label>
                        </div>
                    </div>
                      </div>
                      <div className="mb-2 me-2">
                      <img src={department} className='icnn'/> <label htmlFor="Department" className="form-label">Department</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          <option selected>Select Department</option>
                        </select>
                      </div>
                      <div className="mb-2 me-2">
                      <img src={bloddgroup} className='icnn'/> <label htmlFor="BloodGroup" className="form-label">Blood Group</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          <option selected>Select Blood Group</option>
                        </select>
                      </div>
                      <div className="mb-2 me-2">
                      <img src={product} className='icnn'/> <label htmlFor="Product" className="form-label">Product</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          <option selected>Select Product</option>
                        </select>
                      </div>
                      <div className="mb-2 me-2">
                      <img src={requestunit} className='icnn'/> <label htmlFor="RequestUnit" className="form-label">Request Unit<span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="RequestUnit" name="RequestUnit" placeholder="Enter Request Unit" />
                      </div>
                      <div className="mb-2 me-2">
                      <img src={requestunit} className='icnn'/> <label htmlFor="IssuedUnit" className="form-label">Issued Unit<span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="IssuedUnit" name="IssuedUnit" placeholder="Enter Issued Unit" />
                      </div>
                      <div className="mb-2 me-2">
                      <img src={dob} className='icnn'/> <label htmlFor="RequestDate" className="form-label">Request Date<span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="RequestDate" name="RequestDate" placeholder="Enter Request Date" />
                      </div>
                      <div className="mb-2 me-2">
                      <img src={time} className='icnn'/> <label htmlFor="RequestTime" className="form-label">Request Time<span className="starMandatory">*</span></label>
                        <input type="text" className="form-control form-control-sm" id="RequestTime" name="RequestTime" placeholder="Enter Request Time" />
                      </div>
                         
                    </BoxContainer>
                 </div>
              </div>
              
              <div className="rt-btns">
              <BoxContainer>             
                <div className="mb-2">
                  <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div>
                    <button type="button" className="btn btn-save btn-sm mb-1 me-1">Save</button>
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1">Clear</button>
                  </div>
                </div>          
              </BoxContainer>
              </div>             
            </div>

            <div className="col-12 mt-2">
              {/* <Heading text='Donor List' /> */}
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                  <div className='listd-in'><img src={dob} className='icnn'/> <span>Select Date</span></div>
                  <div className='listd-in'>
                      <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          <option selected>May 10, 2023 - May 16, 2023</option>
                      </select>
                  </div>
                </div>
                <div className='listdetailsct-in'>
                  <div className='listd-in'>
                    <form className="d-flex ms-auto ser" role="search">
                       <input type="search" className="form-control form-control-sm"   placeholder="Search.." />
                        <i className="fa fa-search"></i>
                    </form>
                  </div>
                  <div className='listd-in'><img src={exportfile} className='icnn'/></div>
                  <div className='listd-in'><img src={printer} className='icnn'/></div>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>UHID</th>
                      <th>Patient Name</th>
                      <th>Age/Gender</th>
                      <th>Department</th>
                      <th>BG</th>
                      <th>Product</th>
                      <th>Req Unit</th>
                      <th>Issued Unit</th>
                      <th>Req Date/Time</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td>784561</td>
                      <td>Rahad Hussain</td>
                      <td>34 Years/ Male</td>
                      <td>Cardiology</td>
                      <td>A+</td>
                      <td>PRVC</td>
                      <td>2</td>
                      <td>2</td>
                      <td>05/25/2023 04:02 PM</td>
                      <td>
                        <div className="action-button">
                        <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-thermometer-full actiontem"></i></div>
                        <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-camera-retro actioncam"></i></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit"></i></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><i className="fa fa-trash actiondel"></i>
                          </div>
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
    </>
  )
}
