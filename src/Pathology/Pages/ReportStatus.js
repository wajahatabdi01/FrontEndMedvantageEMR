import React from 'react'
import Heading from '../../Components/Heading';
import BoxContainer from '../../Components/BoxContainer';
import TableContainer from '../../Components/TableContainer';

 
import bill from '../../assets/images/icons/bill.svg'
import patient from '../../assets/images/icons/patient.svg'
import Remark from '../../assets/images/icons/Remark.svg'
import sample from '../../assets/images/icons/sample.svg'
import UHID1 from '../../assets/images/icons/UHID1.svg'
import ward from '../../assets/images/icons/ward.svg'
import age from '../../assets/images/icons/age.svg'
import center from '../../assets/images/icons/center.svg'
import gender from '../../assets/images/icons/gender.svg'
import chat from '../../assets/images/icons/chat.svg'
import lab from '../../assets/images/icons/lab.svg'





export default function ReportStatus() {
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
                <div className='whitebg'>
                    <div className="row">
                        <div className="col-md-4 col-sm-12 analuze">
                              <div className="fieldsett-in">
                                <div className="fieldsett">
                                        <span className='fieldse'>Report Status</span>
                                        <BoxContainer>  
                                        <div className="mt-2 me-2" >
                                        <div className="col-12" >
                                         <img src={bill} className='icnn'/> <label htmlFor="Bill" className="form-label">Bill No.</label>                             
                                       </div>
                                       <div className='sert'> 
                                          <div className='sertin'>
                                            <input type="text" className="form-control form-control-sm" id="Bill" name="Bill" placeholder="Enter Bill No./Lab No."  style={{ width: "150px" }} />
                                          </div>
                                          <div className='searchbtnn'>
                                            <button><i className='fa fa-search'></i>Search</button>
                                          </div>
                                        </div>
                                        <div className="col-12" >
                                          <div className='billd mt-2'>Bill Date : <span>01/06/2023</span></div>
                                        </div>
                                       </div>
                                       </BoxContainer>
                                    
                                </div>
                              </div>
                        </div>   
                        <div className="col-md-8 col-sm-12">
                              <div className="fieldsett-in">
                                <div className="fieldsett">
                                  <span className='fieldse'>Patient Details</span>
                                    <BoxContainer>
                                        <div className="mb-2 me-2">
                                          <img src={patient} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Patient Name</label>
                                          <label className='form-control form-control-sm'>Riya Mishra</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={gender} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Gender</label>
                                          <label className='form-control form-control-sm'>Female</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={age} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Age</label>
                                          <label className='form-control form-control-sm'>32 Year</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={UHID1} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">UHID</label>
                                          <label className='form-control form-control-sm'>1000000</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={UHID1} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Visit No.</label>
                                          <label className='form-control form-control-sm'>166245/23</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={UHID1} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">IP No.</label>
                                          <label className='form-control form-control-sm'>015334/23</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={center} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Center</label>
                                          <label className='form-control form-control-sm'>IPD</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={sample} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Sample</label>
                                          <label className='form-control form-control-sm'>Blood</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={ward} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Ward</label>
                                          <label className='form-control form-control-sm'>PAED-3</label>
                                        </div>
                                        <div className="mb-2 me-2">
                                          <img src={lab} className='icnn'/> 
                                          <label htmlFor="FoodSupplementDrug" className="form-label">Lab No.</label>
                                          <label className='form-control form-control-sm'>A-1-113</label>
                                        </div>
                                        
                                    </BoxContainer>
                                </div>
                              </div>
                        </div> 
                    </div>
                </div>
            </div>

          
            <div className="col-12 mt-2">
              <div className='whitebg1'>
                <div className='row'> 
                  <div className="col-12">
                  <div className='whitebg'>
                  <div className='title-h'>
                      <Heading text='Showing 1-10 of 250 entries' />
                      </div>
                      <div className="med-table-section" style={{ "height": "50vh" }}>
                        <TableContainer>
                          <thead>
                            <tr>
                              <th className="text-center" style={{ "width": "5%" }}>#</th>
                              <th>Sub Category</th>
                              <th>Test Name</th>
                              <th>Subtest Name</th>
                              <th>@Technician's End</th>
                              <th>@Doctor's End</th>
                              <th>Printed/Not Printed</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="text-center">1</td>
                              <td>Biochemistry</td>
                              <td>KFT Profile</td>
                              <td>Blood Urea</td>
                              <td className='notdonee'>Not Done</td>
                              <td className='notdonee'>Not Done</td>
                              <td>Not Printed</td>
                            </tr>
                            <tr>
                              <td className="text-center">2</td>
                              <td>Biochemistry</td>
                              <td>KFT Profile</td>
                              <td>Blood Urea</td>
                              <td className='donee'>Done</td>
                              <td className='notdonee'>Not Done</td>
                              <td>Not Printed</td>
                            </tr>
                          </tbody>
                        </TableContainer>
                      </div>
                      </div>
                  </div>

                 
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <div className='chatcnt'><img src={chat} className='icnn'/> </div>
    </>
  )
}
