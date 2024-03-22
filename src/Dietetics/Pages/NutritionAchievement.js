import React from 'react'

import BoxContainer from '../../Components/BoxContainer';
import TableContainer from '../../Components/TableContainer';

import printer from '../../assets/images/icons/printer.svg'
import exportfile from '../../assets/images/icons/exportfile.svg'

import calender from '../../assets/images/icons/calender.svg'
import nutrient from '../../assets/images/icons/nutrient.svg'
import rda from '../../assets/images/icons/rda.svg'
import diet from '../../assets/images/icons/diet.svg'
import combination from '../../assets/images/icons/combination.svg'


export default function NutritionAchievement() {
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

            <div className="col-12">
              <div className="fieldsett-in">
                 <div className="fieldsett">
                   <span className='fieldse'>Food Intake</span>
                   <BoxContainer>
                   <div className="mb-2 me-2">
                     <img src={calender} className='icnn' alt=''/> <label htmlFor="Date" className="form-label">Date</label>
                     <input type="date" className="form-control form-control-sm" id="RDA" name="RDA" placeholder="Select Date" />
                  </div> 
                   
                  <div className="mb-2 me-2">
                    <img src={combination} className='icnn' alt=''/> <label htmlFor="Nutrient" className="form-label">Combination</label>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>Combination</option>
                    </select>
                  </div>
                 
                  <div className="mb-2 me-2">
                    <img src={rda} className='icnn' alt=''/> <label htmlFor="Nutrient" className="form-label">RDA Required</label>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>Select RDA Required</option>
                    </select>
                  </div>

                  <div className="mb-2 me-2">
                    <img src={diet} className='icnn' alt=''/> <label htmlFor="Nutrient" className="form-label">Diet Type</label>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option selected>Diet Type</option>
                    </select>
                  </div>  

                  <div className="mb-2 me-2">
                  <img src={nutrient} className='icnn' alt=''/> <label htmlFor="RDA" className="form-label">Nutrient</label>
                    <input type="text" className="form-control form-control-sm" id="RDA" name="RDA" placeholder="Enter Nutrient" />
                  </div>  

                  
                <div className="mb-2">
                <label for="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div className='diet-btn'>

                    <button type="button" className="btn btn-save btn-save-fill btn-sm"><i className='fa fa-search'></i> Search Result</button>
                  </div>
                </div>   
                </BoxContainer>
                 </div>
              </div>        
            </div>

            <div className="col-12 mt-2">
              <div className='listdetailsct border-b'>
                <div className='listdetailsct-in'>
                   <div className='listd-in showing'>Showing 1-8 of 250 entries</div> 
                </div>
                <div className='listdetailsct-in'>
                  <div className='listd-in'><img src={printer} className='btl-icnn' alt=''/></div>
                  <div className='listd-in'><img src={exportfile} className='btl-icnn' alt=''/></div>
                </div>
              </div>

              <div className='whit'>
                <div className='row'>
                  <div className='col-md-6 col-sm-12 plt_ brrt'>
                    <div className='listdetailsct bxsh'>
                      <div className='listdetailsct-in'>
                        <div className='listd-in showing'>Dish/Food</div> 
                      </div>
                      <div className='listdetailsct-in'>
                        <form className="d-flex ms-auto ser" role="search">
                          <input type="search" className="form-control form-control-sm" placeholder="Search.." /><i className="fa fa-search"></i>
                        </form>
                      </div>
                    </div>
                    <div className="med-table-section bxsh" style={{ "height": "42vh" }}>
                      <TableContainer>
                        <thead>
                          <tr>
                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                            <th>Dish/Food</th>
                            <th>Quantity/Unit</th>
                            <th>Food Timing</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className="text-center">1</td>
                            <td>Ginger</td>
                            <td>1 gm</td>
                            <td>10:00 AM</td>
                          </tr>
                          <tr>
                            <td className="text-center">2</td>
                            <td className='redtxt'>Ginger</td>
                            <td className='redtxt'>1 gm</td>
                            <td className='redtxt'>10:00 AM</td>
                          </tr>
                          <tr>
                            <td className="text-center">3</td>
                            <td className='greentxt'>Ginger</td>
                            <td className='greentxt'>1 gm</td>
                            <td className='greentxt'>10:00 AM</td>
                          </tr>
                          
                        </tbody>
                      </TableContainer>
                    </div>
                  </div>

                  <div className='col-md-6 col-sm-12 prt_'>
                    <div className='listdetailsct border-b calcnt'>
                      <div className='listdetailsct-in'>
                        <div className='listd-in showing'>Calorie Achievement</div> 
                      </div>
                      <div className='listdetailsct-in'>
                        <div className='non'>
                          <span>Non Protein Calorie</span>
                          <span className='caltxt'>21550.74 KCAL</span>
                        </div>
                      </div>
                      <div className='listdetailsct-in'>
                        <div className='non'>
                          <span>Non Protein Calorie</span>
                          <span className='caltxt'>343.02 KCAL</span>
                        </div>
                      </div>
                    </div>
                    <div className='listdetailsct' style={{ padding: "10px 10px 0" }}>
                      <div className='listdetailsct-in'>
                        <div className='listd-in showing'>Achievement-RDA</div> 
                      </div>
                      <div className='listdetailsct-in'>
                        <form className="d-flex ms-auto ser" role="search">
                          <input type="search" className="form-control form-control-sm" placeholder="Search.." /><i className="fa fa-search"></i>
                        </form>
                      </div>
                    </div>
                    <div className='nut'>
                      <h3>Carbohydrate</h3>
                      <div className='nut-cnt'>
                        <div className='row'>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'> Carbohydrates 135.000/135.000 gm</div>
                              <div className='nut-cnt2'>0%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'> Carbohydrates 135.000/135.000 gm</div>
                              <div className='nut-cnt2'> 100.000%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar greenbar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'> Extra:98.724 gm</div>
                              <div className='nut-cnt2'> 100.000%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar bluebar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'>Extra:98.724 gm</div>
                              <div className='nut-cnt2'> 100.000%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar greenbar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>

                      <h3>Protein</h3>
                      <div className='nut-cnt'>
                        <div className='row'>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'> Carbohydrates 135.000/135.000 gm</div>
                              <div className='nut-cnt2'>0%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'> Carbohydrates 135.000/135.000 gm</div>
                              <div className='nut-cnt2'> 100.000%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar greenbar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'> Extra:98.724 gm</div>
                              <div className='nut-cnt2'> 100.000%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar bluebar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-6 nut-cnt-in'>
                            <div className='nut-cnt1'>
                              <div className='nut-cnt2'>Extra:98.724 gm</div>
                              <div className='nut-cnt2'> 100.000%</div>
                            </div>
                            <div className='nut-cntpr'>
                            <div className="progress">
                                    <div className="progress-bar greenbar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                          </div>
                        </div> 
                      </div>
                      
                    </div>
                  </div>
                </div> 
              </div>
            </div>

            <div className='graphbg'> 
                <div className='graphbg-in'> 
                 <div className='chartbg'><p className='graphh'>Vitamins (mg)</p></div>
                </div>
                <div className='graphbg-in'> 
                <div className='chartbg'><p className='graphh'>Vitamins (mg)</p></div>
                </div>
                <div className='graphbg-in'> 
                <div className='chartbg'><p className='graphh'>Vitamins (mg)</p></div>
                </div>  
            </div> 


          </div>
        </div>

      </section>
    </>
  )
}
