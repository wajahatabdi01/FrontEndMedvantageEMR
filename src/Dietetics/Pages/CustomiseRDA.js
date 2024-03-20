import React from 'react'

import BoxContainer from '../../Components/BoxContainer';
import TableContainer from '../../Components/TableContainer';

import save from '../../assets/images/icons/save.svg'
import clear from '../../assets/images/icons/clear.svg'
import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'

import calender from '../../assets/images/icons/calender.svg'
import rda from '../../assets/images/icons/rda.svg'
import nutrient from '../../assets/images/icons/nutrient.svg'




export default function CustomiseRDA() {
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
                   <span className='fieldse'>Customise RDA</span>
                    <BoxContainer>
                  
                      <div className="mb-2 me-2">
                        <img src={nutrient} className='icnn' alt=''/> <label htmlFor="Nutrient" className="form-label">Nutrient</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          <option selected>Calcium</option>
                        </select>
                      </div>
                      <div className="mb-2 me-2">
                      <img src={rda} className='icnn' alt=''/> <label htmlFor="RDA" className="form-label">RDA</label>
                        <input type="text" className="form-control form-control-sm" id="RDA" name="RDA" placeholder="Enter 1200 mg" />
                      </div>
                      <div className="mb-2 me-2">
                      <img src={rda} className='icnn' alt=''/> <label htmlFor="RDA1" className="form-label">RDA %</label>
                        <input type="text" className="form-control form-control-sm" id="RDA1" name="RDA1" placeholder="Enter 40" />
                      </div>                 
                      <div className="mb-2 me-2">
                      <img src={calender} className='icnn' alt=''/> <label htmlFor="Date" className="form-label">Date</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                          <option selected>Select Date</option>
                        </select>
                      </div> 
                    <div className="mb-2">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                      <div className='diet-btn'>
                        <button type="button" className="btn btn-save btn-save-fill btn-sm"><img src={save} className='icnn' alt=''/> Save</button>
                        <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={clear} className='icnn' alt=''/> Clear</button>
                      </div>
                    </div>   
                    </BoxContainer>
                    <div className='progress-1'>
                    <div className='progress-cnt'>
                        <div className="progress">
                          <div className="progress-bar greenpb" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                          </div>
                          <div className='pbar'>40%</div>
                        </div>
                      </div>  
                      </div>
                 </div>
              </div> 
                
            </div>

            <div className="col-12 mt-2">
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                   <div className='listd-in showing'>Showing 1-10 of 250 entries</div> 
                </div>
              </div>
              
              <div className="med-table-section" style={{ "height": "50vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Nutrient Name</th>
                      <th>RDA</th>
                      <th>Changed RDA Value</th>
                      <th>Changed RDA Value</th>
                      <th>Date</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td>Calcium</td>
                      <td>1200 mg</td>
                      <td>120%</td>
                      <td>1440.00 mg</td>
                      <td>06/09/2022 - 07/09/2022</td>
                      <td>
                        <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className='' alt=''/></span></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn' alt=''/></span></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">2</td>
                      <td>Ginger</td>
                      <td>1 gm</td>
                      <td>00:00</td>
                      <td>Rinika</td>
                      <td>06/09/2022 06:36 PM</td>
                      <td>
                      <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className='' alt=''/></span></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn' alt=''/></span></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">3</td>
                      <td>Ginger</td>
                      <td>1 gm</td>
                      <td>00:00</td>
                      <td>Rinika</td>
                      <td>06/09/2022 06:36 PM</td>
                      <td>
                      <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className='' alt=''/></span></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn' alt=''/></span></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">4</td>
                      <td>Ginger</td>
                      <td>1 gm</td>
                      <td>00:00</td>
                      <td>Rinika</td>
                      <td>06/09/2022 06:36 PM</td>
                      <td>
                      <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className='' alt=''/></span></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn' alt=''/></span></div>
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
