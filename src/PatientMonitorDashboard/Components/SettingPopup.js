import React, { useEffect } from 'react'
import BoxHeading from './BoxHeading'
import SettingAPI from '../../Clinical/API/RemotePatientMonitorDashboard/SettingAPI'
// import BoxHeading from '../../../../Components/BoxHeading'
export default function SettingPopup(props) {

   let getdata = async () => {
      let response = await SettingAPI();
      if (response.status === 1) {
         
      }
   }

   useEffect(() => {
      getdata()
   }, [])
   return (
      <div className={`modal d-${props.showSetting === 0 ? 'none' : 'block'}`}>
         <div className="modal-dialog modal-dialog-top_ modal-lg">
            <div className="modal-content">
               {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={props.close}>
                  <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
               </span> */}
               {/* <BoxHeading name="Dashboard Setting" textcolor="#7E7E7E" /> */}
               {/* <BoxHeading title="Vital Chart History" /> */}

            <span className="closee" title='Close Window' onClick={props.close}><i className='fa fa-times'></i></span>                        
            <div className='p-profile'>
              <div className='p-profile-h'>Vital Chart History</div>
                {/* <div className='p-profile-h'>
                  <div className='pname'><span>{props.patientdata.UhId}</span></div>
                <div className='pname'>- {props.patientdata.PntName}</div> 
              </div> */}
            </div>

            <div className="row">
               <div className="col-12">
               <div className='mt-1 p-2'>
               <div className='med-table-section histry_view_ pdtable'  style={{height: "calc(100vh - 180px)"}}>
               <table className='table_'>
                     <thead>
                        <tr>
                           <th>Columns Names</th>
                           <th>Set Values</th>
                        </tr>
                     </thead>
                     <tbody className='tableRow_'>
                        {/* 1 */}
                        <tr>
                           <td>Life Support</td>
                           <td>
                              <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.lifeSupporVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[0](props.visibilityData.lifeSupporVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 2 */}
                        <tr>
                           <td>Diagnosis</td>
                           <td>
                              <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.diagnosisVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[1](props.visibilityData.diagnosisVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                              
                           </td>
                        </tr>
                        {/* 3 */}
                        <tr>
                           <td>Ward</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.wardVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[2](props.visibilityData.wardVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                           </td>
                        </tr>
                        {/* 4 */}
                        <tr>
                           <td>Infusion Detail</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.infusionVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[3](props.visibilityData.infusionVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                              
                           </td>
                        </tr>
                        {/* 5 */}
                        <tr>
                           <td>Consultant</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.consultantVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[4](props.visibilityData.consultantVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>

                        {/* 6 */}
                        <tr>
                           <td>NS Detail</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.nSVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[5](props.visibilityData.nSVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 7 */}
                        <tr>
                           <td>BP-R</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.bPRVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[6](props.visibilityData.bPRVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 8 */}
                        <tr>
                           <td>SPO2-R</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.sPO2RVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[7](props.visibilityData.sPO2RVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 9 */}
                        <tr>
                           <td>Pulse-R</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.pulseRRVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[8](props.visibilityData.pulseRRVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 10 */}
                        <tr>
                           <td>Temp-R</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.tempRRVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[9](props.visibilityData.tempRRVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 11 */}
                        <tr>
                           <td>BP</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.bpVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[10](props.visibilityData.bpVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 12 */}
                        <tr>
                           <td>SPO2</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.spo2Visibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[11](props.visibilityData.spo2Visibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 13 */}
                        <tr>
                           <td>RR</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.rrVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[12](props.visibilityData.rrVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 14 */}
                        <tr>
                           <td>HR</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.hrVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[13](props.visibilityData.hrVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 15 */}
                        <tr>
                           <td>PR</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.prVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[14](props.visibilityData.prVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                           </td>
                        </tr>
                        {/* 16 */}
                        <tr>
                           <td>Temp</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.tempVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[15](props.visibilityData.tempVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                           </td>
                        </tr>
                        {/* 17 */}
                        <tr>
                           <td>RBS</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.rbsVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[16](props.visibilityData.rbsVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 18 */}
                        <tr>
                           <td>ALB</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.albVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[17](props.visibilityData.albVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 19 */}
                        <tr>
                           <td>Ca++</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.caplusVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[18](props.visibilityData.caplusVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 20 */}
                        <tr>
                           <td>K+</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.kplusVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[19](props.visibilityData.kplusVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 21 */}
                        <tr>
                           <td>Na+</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.naplusVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[20](props.visibilityData.naplusVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 22 */}
                        <tr>
                           <td>Mg</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.mgVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[21](props.visibilityData.mgVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 23 */}
                        <tr>
                           <td>PH</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.phVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[22](props.visibilityData.phVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 24 */}
                        <tr>
                           <td>PCO2</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.pco2Visibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[23](props.visibilityData.pco2Visibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 25 */}
                        <tr>
                           <td>EtCO2</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.etco2Visibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[24](props.visibilityData.etco2Visibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 26 */}
                        <tr>
                           <td>PO2</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.po2Visibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[25](props.visibilityData.po2Visibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 27 */}
                        <tr>
                           <td>LACTATE</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.lactateVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[26](props.visibilityData.lactateVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 28 */}
                        <tr>
                           <td>HCO3</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.hco3Visibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[27](props.visibilityData.hco3Visibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                              </div>
                           </td>
                        </tr>
                        {/* 29 */}
                        <tr>
                           <td>Creatinine</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.creatinineVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[28](props.visibilityData.creatinineVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                           </td>
                        </tr>
                        {/* 30 */}
                        <tr>
                           <td>B Urea</td>
                           <td>
                           <div className='form-check form-switch'>                          
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.bureaVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[29](props.visibilityData.bureaVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div> 
                           </td>
                        </tr>
                        {/* 31 */}
                        <tr>
                           <td>I/O</td>
                           <td>
                           <div className='form-check form-switch'>
                              <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.ioVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[30](props.visibilityData.ioVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                           </td>
                        </tr>
                        {/* 32 */}
                        <tr>
                           <td>SGOT</td>
                           <td>
                           <div className='form-check form-switch'>
                           <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.sgotVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[31](props.visibilityData.sgotVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                              
                           </td>
                        </tr>
                        {/* 33 */}
                        <tr>
                           <td>SGPT</td>
                           <td>
                           <div className='form-check form-switch'>
                           <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked={props.visibilityData.sgptVisibility ? "checked" : ""} onClick={() => { props.setvisibilitprops[32](props.visibilityData.sgptVisibility ? false : true) }} />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                              
                           </td>
                        </tr>
                        {/* 34 */}
                        <tr>
                           <td>Name</td>
                           <td>
                           <div className='form-check form-switch'>
                           <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" />
                              <label className="form-check-label" for="flexSwitchCheckChecked"></label>
                           </div>
                              
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>

                  



               </div>
                  
               </div>
            </div>

               
            </div>

         </div>
      </div>
   )
}
