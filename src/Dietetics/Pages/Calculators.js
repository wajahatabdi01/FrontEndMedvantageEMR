import React from 'react'

import TableContainer from '../../Components/TableContainer';

import sex from '../../assets/images/icons/sex.svg'
import age from '../../assets/images/icons/age.svg'
import weight from '../../assets/images/icons/weight.svg'
import height from '../../assets/images/icons/height.svg'
import Creatinine from '../../assets/images/icons/Creatinine.svg'




export default function Calculators() {
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            
            <div className="col-12 mt-2">  
              <div className='selection'>
                  <div className='selection-in'>
                    <div className='selection-in-sec'>
                       <div className='nameage'>Riya Mishra<span className='ager'>28/M</span></div>
                       <div className='nameage'>UHID<span className='uhid'>2253275</span></div>
                       <div className='dell'><i className='fa fa-times'></i></div>
                    </div>
                    <div className='selection-in-sec'>
                       <div className='nameage'>Riya Mishra<span className='ager'>28/M</span></div>
                       <div className='nameage'>UHID<span className='uhid'>2253275</span></div>
                       <div className='dell'><i className='fa fa-times'></i></div>
                    </div>
                    <div className='selection-in-sec'>
                       <div className='nameage'>Riya Mishra<span className='ager'>28/M</span></div>
                       <div className='nameage'>UHID<span className='uhid'>2253275</span></div>
                       <div className='dell'><i className='fa fa-times'></i></div>
                    </div>
                    <div className='selection-in-sec'>
                       <div className='nameage'>Riya Mishra<span className='ager'>28/M</span></div>
                       <div className='nameage'>UHID<span className='uhid'>2253275</span></div>
                       <div className='dell'><i className='fa fa-times'></i></div>
                    </div>
                    <div className='selection-in-sec'>
                       <div className='nameage'>Riya Mishra<span className='ager'>28/M</span></div>
                       <div className='nameage'>UHID<span className='uhid'>2253275</span></div>
                       <div className='dell'><i className='fa fa-times'></i></div>
                    </div>
                  </div>
              </div>  
            </div>
            </div>
          <div className='row'>
            <div className="col-md-6 col-sm-12 plt_">
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                   <div className='listd-in showing'>Most Used Calculators</div> 
                </div>  
              </div>
              <div className="med-table-section px-2" style={{ "height": "780px" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th>Calculator</th>
                      <th>Result</th>
                      <th style={{ "width": "10%" }} className="text-center">Graph</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex regularCheck column-gap-1 px-2 align-items-center">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="GFR" value="GFR"/>                              
                        </div>
                        <label htmlFor="GFR">GFR</label>
                      </div>                        
                      </td>
                      <td className='bluetext'>67.53</td>
                      <td className="text-center"><span className='graphh pointer'><i className='fa fa-line-chart'></i></span></td>
                    </tr>

                    <tr>
                      <td>
                      <div className="d-flex regularCheck column-gap-1 px-2 align-items-center">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="APACHE" value="APACHE"/>                              
                        </div>
                        <label htmlFor="APACHE">APACHE II Score</label>
                      </div>                      
                    </td>
                      <td className='redtext d-flex align-items-center column-gap-1'>Parameter Missing <span className='red-circle'><i className='fa fa-circle'></i></span></td>
                      <td className="text-center"><span className='graphh pointer'><i className='fa fa-line-chart'></i></span></td>
                    </tr>                    
                  </tbody>
                </TableContainer>
              </div>      
            </div>

            <div className="col-md-6 col-sm-12 prt_" >
              <div className="calRight" style={{height:'818px', backgroundColor:'white'}}>
              <div className='listdetailsct box-shadow-none'>
                <div className='listdetailsct-in'>
                   <div className='listd-in showing'>Select calculator to set score</div> 
                </div>
                <div className="listdetailsct-in">
                  <div className="listd-in">
                    <form className="d-flex ms-auto ser" role="search">
                      <input type="search" className="form-control form-control-sm" placeholder="Creatinine Clearance Estimate..." />
                      {/* <i className="fa fa-search"></i> */}
                    </form>
                  </div>
                </div>
              </div>

              <div className="whitebg1">
                <div className="bluebg">
                  <p><strong>Formula-</strong> ((140-age)*(Weight_kg/(Serum_Creat*72)))*Sex</p>
                </div>
              </div>

              <div className="whitebg1">
                <div className='row'>
                  <div className="col-lg-9 col-md-12 plt_" style={{maxHeight:'681px', overflow:'auto'}}>  
                      <div className='listdetailsct gen box-shadow-none'>
                        <div className='listdetailsct-in pictext'>
                          <img src={sex} className='icnn' alt=''/> Sex  
                        </div>
                        <div className='listdetailsct-in'>
                            <div className="d-flex flex-direction-column gap-2">
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="Male" /><label className="form-check-label" htmlFor="Male">Male</label>
                              </div>
                              <div className="form-check">
                                <input className="form-check-input" type="radio" name="gender" id="Female" /><label className="form-check-label" htmlFor="Female">Female</label>
                              </div>
                            </div>
                        </div>
                      </div> 
                      
                      <div className='listdetailsct box-shadow-none'>
                        <div className='listdetailsct-in pictext'>
                          <img src={age} className='icnn' alt=''/> Age  
                        </div>
                        <div className='listdetailsct-in'>
                            <div className='inputtxt form-group'>
                            <input type='text' placeholder='Enter Age' /> 
                            <div className='inputtxt1'>years</div>
                            </div>
                        </div>
                      </div> 

                      <div className='listdetailsct box-shadow-none'>
                        <div className='listdetailsct-in pictext'>
                          <img src={weight} className='icnn' alt=''/> Age  
                        </div>
                        <div className='listdetailsct-in'>
                            <div className='inputtxt form-group'>
                            <input type='text' placeholder='Enter Weight' /> 
                            <div className='inputtxt1'>kg <i className='fa fa-exchange'></i></div>
                            </div>
                        </div>
                      </div>


                      <div className='listdetailsct box-shadow-none'>
                        <div className='listdetailsct-in pictext'>
                          <img src={height} className='icnn' alt=''/> Height  
                        </div>
                        <div className='listdetailsct-in'>
                            <div className='inputtxt form-group'>
                            <input type='text' placeholder='Enter Height' /> 
                            <div className='inputtxt1'>cm <i className='fa fa-exchange'></i></div>
                            </div>
                        </div>
                      </div>

                      <div className='listdetailsct box-shadow-none'>
                        <div className='listdetailsct-in pictext'>
                          <img src={Creatinine} className='icnn' alt=''/> Creatinine  
                        </div>
                        <div className='listdetailsct-in'>
                            <div className='inputtxt form-group'>
                            <input type='text' placeholder='Enter Creatinine' /> 
                            <div className='inputtxt1'>umol/L <i className='fa fa-exchange'></i></div>
                            </div>
                        </div>
                      </div>
                  </div>
                  <div className="col-lg-3 col-md-12 prt_ wt">  
                    <div className='score'>
                    <div className='score-in'>Score: 0.85</div>
                    <div className='score-in'>All Score: 0.85, 1.00</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='listdetailsct box-shadow-none'>
                <div className='listdetailsct-in'>
                   <div className='listd-in'><p className='res'><strong>Result -</strong> 94 mL/min</p></div> 
                </div>
                <div className="listdetailsct-in">
                  <div className="listd-in">
                     <div className='calculatorbtn'>
                       <i className='fa fa-calculator'></i> Calculate
                     </div>
                  </div>
                </div>
              </div>
              </div>              
            </div>
            </div>
          
        </div>

      </section>
    </>
  )
}
