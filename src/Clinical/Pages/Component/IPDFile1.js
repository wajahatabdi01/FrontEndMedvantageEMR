import React from 'react'
import '../../../assets/css/CertificateCard.css'
import logo from '../../../assets/images/Navbar/offcanvas-logo.png'
import bar1 from '../../../assets/images/icons/bar1.png'
import bar2 from '../../../assets/images/icons/bar2.png'
export default function IPDFile1() {
     
 
    return (

        <>
            <div className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        {/* <div className="col-12 mb-2">
                            <div className="med-box d-flex justify-content-between">
                                <div className="title">IPD File</div>
                                <div> <i className="bi bi-printer-fill fs-4 pe-3 pointer"></i> </div>
                            </div>
                        </div> */}
                        <div className="col-12 mb-2">
                          <div class="card-wrapper">
                            <div className='waterMark'>
                                <img src={logo} alt="" />
                            </div>
                               <div className='pdetailstxt' style={{'display':'none1'}}>
                                    <table className='ipdtbl table-certificate'>
                                        <tr>
                                            <td align='left'><img src={logo} alt=''/></td>
                                            <td align='right'>
                                                <div className='era'>ERA's Lucknow Medical College <br/>& Hospital,Lucknow<br/>
                                                <span>Sarfarazganj, Hardoi Road, Lucknow-226003</span>
                                            </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{'height':'2px', 'background':'#F3F7FF','padding':'0px'}} colSpan={2}></td>
                                        </tr>
                                        <tr> 
                                        <td colSpan={2}>
                                        <div className="col-12">
                                            <div className='head text-center'>Patient Details</div>
                                        </div>
                                        </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">
                                                <table className='pattbl'>
                                                    <tr>
                                                        <td><strong>Patient Name :</strong></td>
                                                        <td>Mubeen Khan</td>
                                                        <td><strong>UHID :</strong></td>
                                                        <td align='right'>2579270</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Guardian name :</strong></td>
                                                        <td>S/O Sirtaj khan</td>
                                                        <td><strong>Consultant Name :</strong></td>
                                                        <td align='right'>Dr. Mustahsin malik</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Age/Gender :</strong></td>
                                                        <td>55 Year/Male</td>
                                                        <td><strong>IPNo :</strong></td>
                                                        <td align='right'>014655/23</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Mobile No. :</strong></td>
                                                        <td>91- 8081323904</td>
                                                        <td><strong>Admission Date :</strong></td>
                                                        <td align='right'>13/05/2023</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong>Address :</strong></td>
                                                        <td>Raja ji Puram Lucknow, Uttar Pradesh</td>
                                                        <td><strong>Department :</strong></td>
                                                        <td align='right'>CC Medicine</td>
                                                    </tr>
                                                    <tr>
                                                        <td><strong></strong></td>
                                                        <td></td>
                                                        <td><strong>Ward Name :</strong></td>
                                                        <td align='right'>ICU CC</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr> 
                                        <td colSpan={2}>
                                        <div className="col-12">
                                        <div className='head1'>Provisional Diagnosis</div>
                                            <p className='subhead'>Altered Sensorium U/E with CVA</p>
                                        </div>
                                        </td>
                                        </tr>
                                    </table> 
                                    <br/><br/><br/><br/><br/>
                                    <table className='barfixe'>
                                        <tr>
                                            <td align='left'>
                                                <p className='uhidtxt'>UHID</p>
                                                <img src={bar1} alt=''/>
                                            </td>
                                            <td align='right'>
                                                <p className='uhidtxt'>IPNO</p>
                                                <img src={bar2} alt=''/>
                                            </td>
                                        </tr>
                                    </table>                                    
                               </div>

                                <div className='hcomplaintxt' style={{'display':'none1'}}>
                                    <div className='head text-center'>Complain/Sign & Symptoms</div> 
                                    <table className='ipdtbl table-certificate'>
                                        <tr>
                                            <td colspan="3">
                                                <table className='pattbl grayth'>
                                                    <thead>
                                                        <tr>
                                                            <th>Date/Time</th>
                                                            <th>Complain/Sign & Symptoms</th>
                                                            <th  style={{'text-align':'right'}}>Written By</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>07/08/2023 12:47 PM</td>
                                                            <td>Altered Sensorium</td>
                                                            <td align='right'>Dr. Nazrul Hasan</td>
                                                        </tr>
                                                        <tr>
                                                            <td>07/08/2023 12:47 PM</td>
                                                            <td>Seizure</td>
                                                            <td align='right'>Dr. Nazrul Hasan</td>
                                                        </tr>
                                                        <tr>
                                                            <td>07/08/2023 12:47 PM</td>
                                                            <td>Unable to Talk Unable to Eat</td>
                                                            <td align='right'>Dr. Nazrul Hasan</td>
                                                        </tr>
                                                        <tr>
                                                            <td>19/08/2023 12:47 PM</td>
                                                            <td>Altered Sensorium with H/O Seizure</td>
                                                            <td align='right'>Dr. Mohd Ashhar Khan</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </table> 
                                    <div className='head2'>Prescribed Medication <span>Date : 20-07-23</span></div>
                                    <table className='Prescribed table-certificate'>
                                      <thead>
                                        <tr>
                                            <th>Medication</th>
                                            <th>Frequency</th>
                                            <th>Duration</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <label className='tblsubh'>Drugs</label>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>OD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>TDS</td>
                                            <td>Stop From 25-07-23</td>
                                        </tr>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>BD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>BD</td>
                                            <td>Stop From 25-07-23</td>
                                        </tr>
                                        <label className='tblsubh'>Stat</label>
                                        <tr>
                                            <td>Inj - Respule Duolin - 500mg</td>
                                            <td>OD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <label className='tblsubh'>Fluids</label>
                                        <tr>
                                            <td>Fld - Dopamine 200 mg in 200 ml</td>
                                            <td>OD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <tr>
                                            <td>Fld - Dopamine 200 mg in 200 ml</td>
                                            <td>OD</td>
                                            <td>Stop From 25-07-23</td>
                                        </tr>
                                      </tbody>
                                    </table>

                                    <div className='head2'><span>Date : 20-07-23</span></div>
                                    <table className='Prescribed table-certificate'>
                                      <thead>
                                        <tr>
                                            <th>Medication</th>
                                            <th>Frequency</th>
                                            <th>Duration</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <label className='tblsubh'>Drugs</label>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>OD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>TDS</td>
                                            <td>Stop From 25-07-23</td>
                                        </tr>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>BD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <tr>
                                            <td>Cap - Amisulpride - 50mg</td>
                                            <td>BD</td>
                                            <td>Stop From 25-07-23</td>
                                        </tr>
                                        <label className='tblsubh'>Stat</label>
                                        <tr>
                                            <td>Inj - Respule Duolin - 500mg</td>
                                            <td>OD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <label className='tblsubh'>Fluids</label>
                                        <tr>
                                            <td>Fld - Dopamine 200 mg in 200 ml</td>
                                            <td>OD</td>
                                            <td>1 Week</td>
                                        </tr>
                                        <tr>
                                            <td>Fld - Dopamine 200 mg in 200 ml</td>
                                            <td>OD</td>
                                            <td>Stop From 25-07-23</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                </div>

                                <div className='InvestigationReportstxt' style={{'display':'none1'}}>
                                   <div className='head'>Investigation Reports</div> 
                                   <div className="head1">ABG</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>PH</th>
                                            <th>Hct</th>
                                            <th>SO2c</th>
                                            <th>FCOHb</th>
                                            <th>FHHb</th>
                                            <th>FMetHB</th>
                                            <th>FO2Hb</th>
                                            <th>THbc</th>
                                            <th>Creatinine</th>
                                            <th>Glucose</th>
                                            <th>PCO2</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>21-07-23</td>
                                            <td>7.433</td>
                                            <td>38.1</td>
                                            <td className='redtext1'>96.3</td>
                                            <td>0.4</td>
                                            <td>NA</td>
                                            <td>0.4</td>
                                            <td>95.5</td>
                                            <td>NA</td>
                                            <td>?....</td>
                                            <td>314</td>
                                            <td>314</td>
                                        </tr>
                                        <tr>
                                            <td>22-07-23</td>
                                            <td>7.433</td>
                                            <td>38.1</td>
                                            <td>96.3</td>
                                            <td>0.4</td>
                                            <td>NA</td>
                                            <td>0.4</td>
                                            <td className='redtext1'>95.5</td>
                                            <td>NA</td>
                                            <td>?....</td>
                                            <td>-</td>
                                            <td>314</td>
                                        </tr>
                                        <tr>
                                            <td>23-07-23</td>
                                            <td>7.433</td>
                                            <td>38.1</td>
                                            <td>96.3</td>
                                            <td className='redtext1'>0.4</td>
                                            <td>NA</td>
                                            <td>0.4</td>
                                            <td>95.5</td>
                                            <td>NA</td>
                                            <td>?....</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                     </tbody>
                                   </table>

                                   <div className="head1">Alkaline Phoshphate</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Serum Alkaline Phoshphate</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>21-07-23</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>22-07-23</td>
                                            <td>72</td>
                                        </tr>
                                     </tbody>
                                   </table>

                                   <div className="head1">Bilirubin(TDI)</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Serum Bilirubin (Total)</th>
                                            <th>Direct Bilirubin</th>
                                            <th>Indirect Bilirubin</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>21-07-23</td>
                                            <td>1.1</td>
                                            <td>-</td>
                                            <td>0.9</td>
                                        </tr>
                                        <tr>
                                            <td>22-07-23</td>
                                            <td>1.1</td>
                                            <td className='redtext1'>0.2</td>
                                            <td>0.9</td>
                                        </tr>
                                     </tbody>
                                   </table>

                                   <div className="head1">Blood Sugar - Random</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Blood Sugar - Random</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>21-07-23</td>
                                            <td>297</td>
                                        </tr>
                                        <tr>
                                            <td>22-07-23</td>
                                            <td>-</td>
                                        </tr>
                                     </tbody>
                                   </table>


                                   <div className="head1">Calcium(Total)</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Serum Calcium</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>21-07-23</td>
                                            <td>9.1</td>
                                        </tr>
                                        <tr>
                                            <td>21-07-23</td>
                                            <td>-</td>
                                        </tr>
                                     </tbody>
                                   </table>


                                   <div className="head1">CBC</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Neutrophils</th>
                                            <th>Lymphocyte</th>
                                            <th>Eosinophils</th>
                                            <th>Monocytes</th>
                                            <th>Hct</th>
                                            <th>Total Leucocyte Count</th>
                                            <th>M.C.H.C</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>21-07-23</td>
                                            <td>52</td>
                                            <td>39</td>
                                            <td className='redtext1'>0.6</td>
                                            <td>0.3</td>
                                            <td>36.2</td>
                                            <td>9800</td>
                                            <td>32.9</td>
                                        </tr>
                                        <tr>
                                        <td>21-07-23</td>
                                            <td>52</td>
                                            <td>39</td>
                                            <td>0.6</td>
                                            <td>0.3</td>
                                            <td className='redtext1'>36.2</td>
                                            <td>9800</td>
                                            <td>32.9</td>
                                        </tr>
                                        <tr>
                                            <td>52</td>
                                            <td className='redtext1'>39</td>
                                            <td>0.6</td>
                                            <td>0.3</td>
                                            <td>36.2</td>
                                            <td>9800</td>
                                            <td>32.9</td>
                                            <td>32.9</td>
                                        </tr>
                                        <tr>
                                            <td>24-07-23</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                        </tr>
                                     </tbody>
                                   </table>
                                </div>

                                <div className='InvestigationReportstxt' style={{'display':'none1'}}>
                                   <div className='head'>Intake/Output Reports</div> 
                                   <div className="head2"><span>Date : 20-07-23</span></div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th  colspan="5">
                                                <table className='totalintakke'>
                                                    <tr>
                                                        <th colspan="2"><strong>Intake</strong> (Total Intake: 320ml)</th>
                                                        <th style={{'text-align':'right'}} colspan="3"><strong>Output</strong> (Total Output: 500ml)</th>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Time</th>
                                            <th>Input Type</th>
                                            <th>Qty(ml)</th>
                                            <th>Input Type</th>
                                            <th>Qty(ml)</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td className='greentext1'>Water(20.00ml)</td>
                                            <td>20</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>8:00Am</td>
                                            <td className='greentext1'>Tea(100.00ml), Water(100.00ml)</td>
                                            <td>200</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td className='redtext1'>Insuline(2.00ml)</td>
                                            <td>20</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>8:00Am</td>
                                            <td className='greentext1'>Tea(100.00ml), Water(100.00ml)</td>
                                            <td>200</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                     </tbody>
                                   </table>

                                   <div className="head2"><span>Date : 20-07-23</span></div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th  colspan="5">
                                                <table className='totalintakke'>
                                                    <tr>
                                                        <th colspan="2"><strong>Intake</strong> (Total Intake: 320ml)</th>
                                                        <th style={{'text-align':'right'}} colspan="3"><strong>Output</strong> (Total Output: 500ml)</th>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Time</th>
                                            <th style={{'max-width':'100px'}}>Input Type</th>
                                            <th>Qty(ml)</th>
                                            <th>Input Type</th>
                                            <th>Qty(ml)</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td style={{'max-width':'100px'}} className='greentext1'>water(20.00ml),Urine (100.00ML) 100 7:00PMTea(100.00ml), water (100.00ml),200 Urine(200.00ML), 11:00PM water(100.00ml), Kathal ki sabji(100.00gm), Roti(2.00piece)</td>
                                            <td>20</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>8:00Am</td>
                                            <td className='greentext1'>Tea(100.00ml), Water(100.00ml)</td>
                                            <td>200</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td className='greentext1'>Water(20.00ml)</td>
                                            <td>20</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>8:00Am</td>
                                            <td className='greentext1'>Tea(100.00ml), Water(100.00ml)</td>
                                            <td>200</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                     </tbody>
                                   </table>

                                   <div className="head2"><span>Date : 20-07-23</span></div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th  colspan="5">
                                                <table className='totalintakke'>
                                                    <tr>
                                                        <th colspan="2"><strong>Intake</strong> (Total Intake: 320ml)</th>
                                                        <th style={{'text-align':'right'}} colspan="3"><strong>Output</strong> (Total Output: 500ml)</th>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                        <tr>
                                            <th>Time</th>
                                            <th>Input Type</th>
                                            <th>Qty(ml)</th>
                                            <th>Input Type</th>
                                            <th>Qty(ml)</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td className='greentext1'>Water(20.00ml)</td>
                                            <td>20</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>8:00Am</td>
                                            <td className='greentext1'>Tea(100.00ml), Water(100.00ml)</td>
                                            <td>200</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td className='redtext1'>Insuline(2.00ml)</td>
                                            <td>20</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                        <tr>
                                            <td>8:00Am</td>
                                            <td className='greentext1'>Tea(100.00ml), Water(100.00ml)</td>
                                            <td>200</td>
                                            <td>Urine(100.00ml)</td>
                                            <td>20</td>
                                        </tr>
                                     </tbody>
                                   </table>
  
                                </div> 

                                <div className='ProgressReporttxt' style={{'display':'none1'}}>
                                   <div className='head'>Progress Report</div> 
                                   <div className="head2"><span>Date : 20-07-23</span></div>
                                   <div className="head4">Progress Note</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Note</th>
                                            <th style={{'width':'100px'}}>Written By</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td className='preport'>
                                               <p>CCM call was given at 7:45pm<br/>
                                                  CCM call was given at 7:45pm<br/>
                                                  CCM NOTES<br/>
                                                  CCM call was given at 7.45pm <br/>
                                                  C/S/B CCM TEAM at 7.50pm<br/>
                                               </p>
                                               <p>Patient first assessed by medicine team.</p>
                                               <p>Patient 55yr/male mubeen khan was brought to hospital by patient's attenders on 
                                                 19/07/2023 at 6.00pm by ambulance from private hospital on Oxygen support C/O of :</p>
                                               <p>altered sensorium since 1day<br/> -slurred  speech since 3 days </p>
                                               <p>Patient was apparently well 3 day back when
                                                  he developed sudden slurred speech. Patient attendants took him 
                                                  to nearby hospital where he was admitted for 3 days. </p>
                                                  <p>Patient 
                                                  complaint of multiple episodes of seizure activity today Following 
                                                  treatment was given Inj cefixam 200mg rv Inj levitracetam S0mg iv 
                                                  Inj citicolin 500mg+ piracetam(#M0mg) Tab stemetil md TDS Inj 
                                                  pand4img od Inj emset iv tds Inj dynapar 1m ids</p>
                                            </td>
                                            <td>Dr. Nimisha</td>
                                        </tr>
                                        
                                     </tbody>
                                   </table>

                                   <div className="head4">Progress Note</div>
                                   <table className='InvestigationR  table-certificate'>
                                     <thead>
                                        <tr>
                                            <th>Time</th>
                                            <th>Note</th>
                                            <th style={{'width':'100px'}}>Written By</th>
                                        </tr>
                                     </thead>
                                     <tbody>
                                        <tr>
                                            <td>7:00Am</td>
                                            <td className='preport'>
                                               <p>CCM call was given at 7:45pm<br/>
                                                  CCM call was given at 7:45pm<br/>
                                                  CCM NOTES<br/>
                                                  CCM call was given at 7.45pm <br/>
                                                  C/S/B CCM TEAM at 7.50pm<br/>
                                               </p>
                                               <p>Patient first assessed by medicine team.</p>
                                               <p>Patient 55yr/male mubeen khan was brought to hospital by patient's attenders on 
                                                 19/07/2023 at 6.00pm by ambulance from private hospital on Oxygen support C/O of :</p>
                                               <p>altered sensorium since 1day<br/> -slurred  speech since 3 days </p>
                                               <p>Patient was apparently well 3 day back when
                                                  he developed sudden slurred speech. Patient attendants took him 
                                                  to nearby hospital where he was admitted for 3 days. </p>
                                                  <p>Patient 
                                                  complaint of multiple episodes of seizure activity today Following 
                                                  treatment was given Inj cefixam 200mg rv Inj levitracetam S0mg iv 
                                                  Inj citicolin 500mg+ piracetam(#M0mg) Tab stemetil md TDS Inj 
                                                  pand4img od Inj emset iv tds Inj dynapar 1m ids</p>
                                            </td>
                                            <td>Dr. Nimisha</td>
                                        </tr>
                                        
                                     </tbody>
                                   </table>
                                   
                                </div>
                            </div>
                        </div>

                         
                    </div>
                </div>
            </div>
        </>
    )
}
