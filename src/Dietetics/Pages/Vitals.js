import React, { useState } from 'react'
import Heading from '../../Components/Heading';
import BoxContainer from '../../Components/BoxContainer';
import TableContainer from '../../Components/TableContainer';


import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'

import spo2 from '../../assets/images/icons/spo2.svg'
import BP from '../../assets/images/icons/BP.svg'
import PR from '../../assets/images/icons/PR.svg'
import RR from '../../assets/images/icons/RR.svg'
import weight from '../../assets/images/icons/weight.svg'
import height from '../../assets/images/icons/height.svg'
import temperature from '../../assets/images/icons/temperature.svg'
import time from '../../assets/images/icons/time.svg'
import takenby from '../../assets/images/icons/takenby.svg'
import action from '../../assets/images/icons/action.svg'
import save from '../../assets/images/icons/save.svg'
import clear from '../../assets/images/icons/clear.svg'
import GetData from '../../assets/images/icons/GetData.svg'
import microphone from '../../assets/images/icons/microphone.svg'

import BPSystolic from '../../assets/images/vitalsicons/BPSystolic.svg'
import bp from '../../assets/images/vitalsicons/bp.svg'
import temprature from '../../assets/images/vitalsicons/temprature.svg'
import lungs from '../../assets/images/vitalsicons/lungs.svg'
import heart from '../../assets/images/vitalsicons/heart.svg'
import pulse from '../../assets/images/vitalsicons/pulse.svg'
import spo from '../../assets/images/vitalsicons/spo.svg'
import height1 from '../../assets/images/vitalsicons/height1.svg'
import weight1 from '../../assets/images/vitalsicons/weight1.svg'
import rbs from '../../assets/images/vitalsicons/rbs.svg'
import heart2 from '../../assets/images/vitalsicons/heart2.svg'
import plat from '../../assets/images/vitalsicons/plat.svg'
import liver from '../../assets/images/vitalsicons/liver.svg'
import fungus from '../../assets/images/vitalsicons/fungus.svg'

import Pallor from '../../assets/images/vitalsicons/Pallor.svg'
import Icterus from '../../assets/images/vitalsicons/Icterus.svg'
import Cyanosis from '../../assets/images/vitalsicons/Cyanosis.svg'
import Clubbing from '../../assets/images/vitalsicons/Clubbing.svg'
import Lymphadenopathy from '../../assets/images/vitalsicons/Lymphadenopathy.svg'
import Skin from '../../assets/images/vitalsicons/Skin.svg'
import Tongue from '../../assets/images/vitalsicons/Tongue.svg'
import Throat from '../../assets/images/vitalsicons/Throat.svg'
import Conjunctivae from '../../assets/images/vitalsicons/Conjunctivae.svg'
import Pupils from '../../assets/images/vitalsicons/Pupils.svg'
import Nails from '../../assets/images/vitalsicons/Nails.svg'
import IdentificationMarks from '../../assets/images/vitalsicons/IdentificationMarks.svg'

import Lips from '../../assets/images/vitalsicons/Lips.svg'
import Teeth from '../../assets/images/vitalsicons/Teeth.svg'
import Gums from '../../assets/images/vitalsicons/Gums.svg'

import lungs1 from '../../assets/images/vitalsicons/lungs1.svg'
import PeripheralPulses from '../../assets/images/vitalsicons/PeripheralPulses.svg'
import PAP from '../../assets/images/vitalsicons/PAP.svg'
import CI from '../../assets/images/vitalsicons/CI.svg'
import SVR from '../../assets/images/vitalsicons/SVR.svg'
import PVR from '../../assets/images/vitalsicons/PVR.svg'
import SvO2 from '../../assets/images/vitalsicons/SvO2.svg'


import Deformity from '../../assets/images/vitalsicons/Deformity.svg'
import LIMB from '../../assets/images/vitalsicons/LIMB.svg'

import FIO2 from '../../assets/images/vitalsicons/FIO2.svg'
import PEEP from '../../assets/images/vitalsicons/PEEP.svg'


export default function Vitals() {


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
            <div className="col-md-6 col-sm-12 plt">
              <div className="whitebackground">

                <div className='tblheading'>Vital Input</div>
                <div className='mainsubheading'>General</div>
                <div className='vitals-cnt'>

                  <div className='vitals-cnt-in'>
                    <img src={BPSystolic} className='icnn1' />
                    <input type='text' placeholder='BP Systolic(mm Hg)' style={{ width: "110px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={bp} className='icnn1' />
                    <input type='text' placeholder='BP Diastolic(mm Hg)' style={{ width: "110px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={bp} className='icnn1' />
                    <input type='text' placeholder='BP_S-BP_D' style={{ width: "65px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={temprature} className='icnn1' />
                    <input type='text' placeholder='Temp(P)' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={temprature} className='icnn1' />
                    <input type='text' placeholder='Temp(C)' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={lungs} className='icnn1' />
                    <input type='text' placeholder='Respiratory Rate/min' style={{ width: "120px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={heart} className='icnn1' />
                    <input type='text' placeholder='Heart Rate' style={{ width: "65px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={pulse} className='icnn1' />
                    <input type='text' placeholder='Pulse(Beats)' style={{ width: "70px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={spo} className='icnn1' />
                    <input type='text' placeholder='SPO2' style={{ width: "32px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={height1} className='icnn1' />
                    <input type='text' placeholder='Height' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={weight1} className='icnn1' />
                    <input type='text' placeholder='Weight' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={rbs} className='icnn1' />
                    <input type='text' placeholder='RBS' style={{ width: "30px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={heart2} className='icnn1' />
                    <input type='text' placeholder='Iabp Ratio' style={{ width: "60px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={plat} className='icnn1' />
                    <input type='text' placeholder='P(Plat)' style={{ width: "40px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={liver} className='icnn1' />
                    <input type='text' placeholder='Trigger' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={temprature} className='icnn1' />
                    <input type='text' placeholder='Peripheral Temp.' style={{ width: "95px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={fungus} className='icnn1' />
                    <input type='text' placeholder='Fungus' style={{ width: "50px" }} />
                  </div>

                </div>

                <div className='mainsubheading'>Head To Toe</div>
                <div className='vitals-cnt'>

                  <div className='vitals-cnt-in'>
                    <img src={Pallor} className='icnn1' />
                    <input type='text' placeholder='Pallor' style={{ width: "40px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Icterus} className='icnn1' />
                    <input type='text' placeholder='Icterus' style={{ width: "40px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Cyanosis} className='icnn1' />
                    <input type='text' placeholder='Cyanosis' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Clubbing} className='icnn1' />
                    <input type='text' placeholder='Clubbing' style={{ width: "55px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Lymphadenopathy} className='icnn1' />
                    <input type='text' placeholder='Lymphadenopathy' style={{ width: "105px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Skin} className='icnn1' />
                    <input type='text' placeholder='Skin' style={{ width: "30px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Tongue} className='icnn1' />
                    <input type='text' placeholder='Tongue' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Throat} className='icnn1' />
                    <input type='text' placeholder='Throat' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Conjunctivae} className='icnn1' />
                    <input type='text' placeholder='Conjunctivae' style={{ width: "75px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Pupils} className='icnn1' />
                    <input type='text' placeholder='Pupils' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Nails} className='icnn1' />
                    <input type='text' placeholder='Nails' style={{ width: "35px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={IdentificationMarks} className='icnn1' />
                    <input type='text' placeholder='Identification Marks' style={{ width: "110px" }} />
                  </div>
                </div>

                <div className='mainsubheading'>Oral</div>
                <div className='vitals-cnt'>

                  <div className='vitals-cnt-in'>
                    <img src={Lips} className='icnn1' />
                    <input type='text' placeholder='Lips' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Teeth} className='icnn1' />
                    <input type='text' placeholder='Teeth' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={Gums} className='icnn1' />
                    <input type='text' placeholder='Gums' style={{ width: "50px" }} />
                  </div>

                </div>

                <div className='mainsubheading'>CVS</div>
                <div className='vitals-cnt'>

                  <div className='vitals-cnt-in'>
                    <img src={lungs1} className='icnn1' />
                    <input type='text' placeholder='CV P(my)' style={{ width: "60px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={lungs1} className='icnn1' />
                    <input type='text' placeholder='SV V' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={lungs1} className='icnn1' />
                    <input type='text' placeholder='PAW P(my)' style={{ width: "70px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={PeripheralPulses} className='icnn1' />
                    <input type='text' placeholder='Peripheral Pulses_R' style={{ width: "115px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={PeripheralPulses} className='icnn1' />
                    <input type='text' placeholder='Peripheral Pulses_L' style={{ width: "115px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={PAP} className='icnn1' />
                    <input type='text' placeholder='PAP' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={CI} className='icnn1' />
                    <input type='text' placeholder='CI' style={{ width: "30px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={SVR} className='icnn1' />
                    <input type='text' placeholder='SVR' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={PVR} className='icnn1' />
                    <input type='text' placeholder='PVR' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={SvO2} className='icnn1' />
                    <input type='text' placeholder='SvO2' style={{ width: "50px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={lungs} className='icnn1' />
                    <input type='text' placeholder='CO' style={{ width: "30px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={heart2} className='icnn1' />
                    <input type='text' placeholder='Pedal Edema' style={{ width: "75px" }} />
                  </div>

                </div>


                <div className='mainsubheading'>Ortho</div>
                <div className='vitals-cnt'>

                  <div className='vitals-cnt-in'>
                    <img src={Deformity} className='icnn1' />
                    <input type='text' placeholder='Deformity Types & Deg' style={{ width: "135px" }} />
                  </div>
                  <div className='vitals-cnt-in'>
                    <img src={LIMB} className='icnn1' />
                    <input type='text' placeholder='LIMB Length Discrepan' style={{ width: "127px" }} />
                  </div>

                </div>

                <BoxContainer>
                  <div className="mb-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                    <div className='diet-btn vital-btn'>
                      <input type='date' />
                      <input type='time' />
                      <button type="button" className="btn btn-save btn-save-fill btn-sm"><img src={GetData} className='icnn' /> Get Data</button>
                      <button type="button" className="btn btn-save btn-save-fill btn-sm"><img src={microphone} className='icnn' /> Voice Data</button>
                      <button type="button" className="btn btn-save btn-save-fill btn-sm"><img src={save} className='icnn' /> Save</button>
                      <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={clear} className='icnn' /> Clear</button>
                    </div>
                  </div>
                </BoxContainer>

              </div>

              <div className="whitebackground">
                <div className='tblheading'>Ventilator Details</div>
                <p className='note'><strong>Note :</strong> Keep the PEEP value as 5 when you assign the ventilator first time.</p>
                <BoxContainer>
                  <div className="mb-2 me-2">
                    <img src={FIO2} className='icnn' /> <label htmlFor="FIO2" className="form-label">FIO2</label>
                    <label className="form-control form-control-sm mt-2">40</label>
                  </div>
                  <div className="mb-2 me-2">
                    <img src={PEEP} className='icnn' /> <label htmlFor="PEEP" className="form-label">PEEP</label>
                    <label className="form-control form-control-sm mt-2">10</label>
                  </div>
                  <div className="mb-2 me-2">
                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                    <div className='diet-btn'>
                      <button type="button" className="btn btn-save btn-save-fill btn-sm mt-2"><img src={save} className='icnn' /> Save</button>
                    </div>
                  </div>
                </BoxContainer>
              </div>

            </div>

            <div className="col-md-6 col-sm-12 prt">
              <div className="whitebackground">
                <div className='tblheading'>Vital Chart History</div>
                <div className='wb'>
                  <div className="med-table-section" style={{ "height": "30vh" }}>
                    <TableContainer>
                      <thead>
                        <tr>
                          <th valign='bottom' className="text-center" style={{ "width": "5%" }}>#</th>
                          <th className="text-center"><img src={spo2} className='icnn' /> <span className='picivon'>SPO2</span></th>
                          <th className="text-center"><img src={BP} className='icnn' /> <span className='picivon'>BP</span></th>
                          <th className="text-center"><img src={PR} className='icnn' /> <span className='picivon'>PR</span></th>
                          <th className="text-center"><img src={RR} className='icnn' /> <span className='picivon'>RR</span></th>
                          <th className="text-center"><img src={temperature} className='icnn' /> <span className='picivon'>Temp</span></th>
                          <th className="text-center"><img src={weight} className='icnn' /> <span className='picivon'>Weight</span></th>
                          <th className="text-center"><img src={height} className='icnn' /> <span className='picivon'>Height</span></th>
                          <th className="text-center"><img src={time} className='icnn' /> <span className='picivon'>Date Time</span></th>
                          <th className="text-center"><img src={takenby} className='icnn' /> <span className='picivon'>Taken By</span></th>
                          <th style={{ "width": "10%" }} className="text-center"><img src={action} className='icnn' /><span className='picivon'> Action</span></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>100</td>
                          <td>125/74</td>
                          <td>-</td>
                          <td>21</td>
                          <td>-</td>
                          <td>60</td>
                          <td>152</td>
                          <td>01/05/23 01:36PM</td>
                          <td>Dr Sabiha Mukhtar</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg' style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn' /></span></div>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </TableContainer>
                  </div>
                </div>
              </div>
              <div className="whitebackground">
                <div className='tblheading'>Ventilator Details List</div>
                <div className='wb'>
                  <div className="med-table-section" style={{ "height": "30vh" }}>
                    <TableContainer>
                      <thead>
                        <tr>
                          <th className="text-center" style={{ "width": "5%" }}>#</th>
                          <th>FIO2</th>
                          <th>PEEP</th>
                          <th>Date Time</th>
                          <th>Taken By</th>
                          <th style={{ "width": "10%" }} className="text-center"> <span className='picivon'> Action</span></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>35</td>
                          <td>8</td>
                          <td>01/05/23 01:36PM</td>
                          <td>Dr Sabiha Mukhtar</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg' style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn' /></span></div>
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

        </div>

      </section>
    </>
  )
}
