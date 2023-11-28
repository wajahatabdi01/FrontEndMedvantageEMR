import React, { useEffect, useState } from 'react'
// import Heading from '../../../../../Components/Heading'
import GetPatientIPDHistory from '../../../../API/IPD/PersonalDashboard/GetPatientIPDHistory'
import pulseVitalIcon from '../../../../../../src/assets/images/icons/pulseVitalIcon.svg'
import bpSysDysVitalIcon from '../../../../../../src/assets/images/icons/bpSysDysVitalIcon.svg'
import bloodPressureVitalIcon from '../../../../../../src/assets/images/icons/bloodPressureVitalIcon.svg'
import tempratureVitalIcon from '../../../../../../src/assets/images/icons/tempratureVitalIcon.svg'
import sketchVitalIcon from '../../../../../../src/assets/images/icons/sketchVitalIcon.svg'
import ventilationVmIcon from '../../../../../../src/assets/images/icons/ventilationVmIcon.svg'
import ventilationPeepIcon from '../../../../../../src/assets/images/icons/ventilationPeepIcon.svg'
import ventilationFio2Icon from '../../../../../../src/assets/images/icons/ventilationFio2Icon.svg'
import bloodPressureVantilationPAPIcon from '../../../../../../src/assets/images/icons/bloodPressureVantilationPAPIcon.svg'
import bpSysDys from '../../../../../../src/assets/images/icons/bpSysDys.svg'
import sketchIcon from '../../../../../../src/assets/images/icons/sketch_icon.svg'
import OPDInvestigationRight from '../../../OPD/OPDSharePage/OPDInvestigation/OPDInvestigationRight'
import DepartmentNavbar from '../../../OPD/OPDSharePage/OPDInvestigation/DepartmentNavbar'
import OPDInvestigationLeft from '../../../OPD/OPDSharePage/OPDInvestigation/OPDInvestigationLeft'
export default function IPDPPDRight() {
  let [patientVitals, setPatientVitals] = useState([]);
  let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
  let [activeId, setActiveId] = useState("")
  let [activeUHID, setActiveUHID] = useState("")
  let vitalList = [];
  let getPatientIPDHistory = async () => {
    let response = await GetPatientIPDHistory(uhid);
    if (response.status === 1) {
      setPatientVitals(response.responseValue.patientVitals);
      vitalList = response.responseValue.patientVitals;
    }
  }
  useEffect(() => {
    getPatientIPDHistory();
    let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid
    // setActiveUHID(uhid)
    setActiveUHID(uhid)
  }, [])
  return (
    <>
      <div className="row">
        <div className="col-12 mb-2">
          <div className="med-box1 pdashboard-bg" style={{ minHeight: '192px' }}>
            <div className="title mb-1">Vitals</div>
            <div className="d-flex flex-wrap" style={{'gap':'17px'}}>
              {/* <div className="d-flex gap-1 repeat">
         <div><img src={pulseVitalIcon} alt="pulseVitalIcon" className='vitalIcon'/></div>
         <div className='d-flex flex-column'>
        <b className='vitalName'>Pulse</b>
        <span className='vitalVal'>100/min</span>
        </div>
      </div>
     
      <div className="d-flex gap-1 repeat">
          <div><img src={bpSysDysVitalIcon} alt="pulseVitalIcon" className='vitalIcon'/></div>
          <div className='d-flex flex-column'>
        <b className='vitalName'>BP_Sys</b>
        <span className='vitalVal red'>134 mmHg</span>
        </div>
      </div>
      <div className="d-flex gap-1 repeat">
      <div><img src={tempratureVitalIcon} alt="pulseVitalIcon" className='vitalIcon'/></div>
      <div className='d-flex flex-column'>
        <b className='vitalName'>Temp</b>
        <span className='vitalVal'>98.5F</span>
        </div>
      </div>
      <div className="d-flex gap-1 repeat">
      <div><img src={bloodPressureVitalIcon} alt="pulseVitalIcon" className='vitalIcon'/></div>
      <div className='d-flex flex-column'>
        <b className='vitalName'>BP_Dias</b>
        <span className='vitalVal red'>52 mmHg</span>
        </div>
      </div>
      <div className="d-flex gap-1 repeat">
         <div><img src={sketchVitalIcon} alt="pulseVitalIcon" className='vitalIcon'/></div>
         <div className='d-flex flex-column'>
        <b className='vitalName'>Spo2</b>
        <span className='vitalVal'>95%</span>
        </div>
      </div> */}
              {patientVitals && patientVitals.map((val, ind) => {
                return (

                  val.vmId === 3 ?
                    <div className="d-flex gap-1 repeat">
                      <div><img src={pulseVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                      <div className='d-flex flex-column'>
                        <b className='vitalName'>Pulse</b>
                        <span className='vitalVal'>{val.vmValue}</span>
                      </div>
                    </div>

                    : val.vmId === 4 ?
                      <div className="d-flex gap-1 repeat">
                        <div><img src={bpSysDysVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                        <div className='d-flex flex-column'>
                          <b className='vitalName'>BP_Sys</b>
                          <span className='vitalVal'>{val.vmValue}</span>
                        </div>
                      </div>

                      : val.vmId === 6 ?
                        <div className="d-flex gap-1 repeat">
                          <div><img src={bloodPressureVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                          <div className='d-flex flex-column'>
                            <b className='vitalName'>BP_Dias</b>
                            <span className='vitalVal'>{val.vmValue}</span>
                          </div>
                        </div>

                        : val.vmId === 5 ?
                          <div className="d-flex gap-1 repeat">
                            <div><img src={tempratureVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                            <div className='d-flex flex-column'>
                              <b className='vitalName'>Temp</b>
                              <span className='vitalVal'>{val.vmValue}</span>
                            </div>
                          </div>

                          : val.vmId === 56 ?
                            <div className="d-flex gap-1 repeat">
                              <div><img src={sketchVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                              <div className='d-flex flex-column'>
                                <b className='vitalName'>Spo2</b>
                                <span className='vitalVal'>{val.vmValue}</span>
                              </div>
                            </div>
                            : val.vmId === 7 ?
                              <div className="d-flex gap-1 repeat">
                                <div><img src={pulseVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                                <div className='d-flex flex-column'>
                                  <b className='vitalName'>RR</b>
                                  <span className='vitalVal'>{val.vmValue}</span>
                                </div>
                              </div>
                              : val.vmId === 10 ?
                                <div className="d-flex gap-1 repeat">
                                  <div><img src={pulseVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                                  <div className='d-flex flex-column'>
                                    <b className='vitalName'>RBS</b>
                                    <span className='vitalVal'>{val.vmValue}</span>
                                  </div>
                                </div>
                                : val.vmId === 74 ?
                                  <div className="d-flex gap-1 repeat">
                                    <div><img src={pulseVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                                    <div className='d-flex flex-column'>
                                      <b className='vitalName'>HR</b>
                                      <span className='vitalVal'>{val.vmValue}</span>
                                    </div>
                                  </div>
                                  : ''

                )
              })}
            </div>

            <div className="title mt-2 mb-1">Ventilator Parameters</div>
            <div className="d-flex flex-wrap" style={{'gap':'17px'}}>
              <div className="d-flex gap-1 repeat">
                <div><img src={ventilationVmIcon} alt="ventilationVmIcon" className='vitalIcon' /></div>
                <div className='d-flex flex-column'>
                  <b className='vitalName'>VM</b>
                  <span className='vitalVal'>PC-NIV</span>
                </div>
              </div>

              <div className="d-flex gap-1 repeat">
                <div><img src={ventilationPeepIcon} alt="ventilationPeepIcon" className='vitalIcon' /></div>
                <div className='d-flex flex-column'>
                  <b className='vitalName'>Peep</b>
                  <span className='vitalVal red'>8cm H2o</span>
                </div>
              </div>
              <div className="d-flex gap-1 repeat">
                <div><img src={ventilationFio2Icon} alt="ventilationFio2Icon" className='vitalIcon' /></div>
                <div className='d-flex flex-column'>
                  <b className='vitalName'>Fio2</b>
                  <span className='vitalVal'>32%</span>
                </div>
              </div>
              <div className="d-flex gap-1 repeat">
                <div><img src={bloodPressureVantilationPAPIcon} alt="bloodPressureVantilationPAPIcon" className='vitalIcon' /></div>
                <div className='d-flex flex-column'>
                  <b className='vitalName'>PAP</b>
                  <span className='vitalVal red'>25 mmHg</span>
                </div>
              </div>
              <div className="d-flex gap-1 repeat">
                <div><img src={bloodPressureVantilationPAPIcon} alt="bloodPressureVantilationPAPIcon" className='vitalIcon' /></div>
                <div className='d-flex flex-column'>
                  <b className='vitalName'>BPM</b>
                  <span className='vitalVal'>60</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* <div className='row'> */}
        {/* <div className="col-12 ps-0 mb-2">
      <div className="med-box">
      <div className="title">Lab Result</div>
      <div className="med-table-section" style={{height:'263px'}}>
      <table className='med-table border_ striped'>
          <thead>
            <th>#</th>
            <th>Test Name</th>
            <th>Result / Normal Range</th>
            <th>Test Date / Time</th>

          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Eosinophils</td>
              <td>01 % / 1 - 6 %</td>
              <td>17 May 23 11:43PM</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Haemoglobin (Hb)</td>
              <td><span className='vitalVal red'>6.2 g/dl</span> / 10 - 16.5 g/dl</td>
              <td>17 May 23 11:43PM</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Hct.</td>
              <td><span className='vitalVal red'>18.5 % </span>  / 33-54%</td>
              <td>17 May 23 11:43PM</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Lymphocyte</td>
              <td>55% / 20 - 45 %</td>
              <td>17 May 23 11:43PM</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Monocytes</td>
              <td>03 % / 2 - 8 %</td>
              <td>17 May 23 11:43PM</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Platelet Count</td>
              <td>2.2 Lakh / 1.5 - 4.5 Lakh</td>
              <td>17 May 23 11:43PM</td>
            </tr>
         
          
          </tbody>
        </table>

      </div>


      </div>
    </div>      */}

       


      {/* </div> */}
        <div className='roww pdashboard-bg mb-2' style={{'padding':'0'}}>
            <div className='row p-0 m-0 boxcontainer'>
                <DepartmentNavbar getActiveID={setActiveId} callingpage={0} />
            </div>

            <div className='d-flex flex-column p-2 overflow-auto pb-2' style={{ height: "245px" }}>
                <OPDInvestigationRight activeSubId={activeId} callingpage={1} uhid={activeUHID} />
            </div>
        </div>


      <div className='roww'>
        <div className="col-12 ps-0">
          <div className="med-box1 pdashboard-bg">
            <div className="title">Recommendations</div>
            <div className="med-table-section" style={{ 'max-height': '297px','overflow':'auto' }}>
              <table className='med-table border_ striped'>
                <thead>
                  <th>Alert</th>
                  <th>Current</th>
                  <th>Recommend</th>
                </thead>
                <tbody>
                  <tr>
                    <td className='recom'><img src={bpSysDys} alt="bpSysDys" className='iconClinicalAlert' /> BP[115/52]</td>
                    <td>BP[115/<span style={{'color':'#FF5959'}}>60</span>]</td>
                    <td><span style={{'color':'#2D8AF5'}}>Midodrine</span> Should Not Be Given</td>
                  </tr>
                  <tr>
                  <td className='recom'><img src={sketchIcon} alt="sketchIcon" className='iconClinicalAlert' /> BP[115/52]</td>
                    <td>BP[115/60]</td>
                    <td><span style={{'color':'#2D8AF5'}}>Midodrine</span> Should Not Be Given</td>
                  </tr>
                  <tr>
                  <td className='recom'><img src={bpSysDys} alt="bpSysDys" className='iconClinicalAlert' /> BP[115/52]</td>
                    <td>BP[115/60]</td>
                    <td><span style={{'color':'#2D8AF5'}}>Midodrine</span> Should Not Be Given</td>
                  </tr>
                  <tr>
                  <td className='recom'><img src={bpSysDys} alt="bpSysDys" className='iconClinicalAlert' /> BP[115/52]</td>
                    <td>BP[115/60]</td>
                    <td><span style={{'color':'#2D8AF5'}}>Midodrine</span> Should Not Be Given</td>
                  </tr>
                  <tr>
                  <td className='recom'><img src={sketchIcon} alt="sketchIcon" className='iconClinicalAlert' /> BP[115/52]</td>
                    <td>BP[115/60]</td>
                    <td><span style={{'color':'#2D8AF5'}}>Midodrine</span> Should Not Be Given</td>
                  </tr>
                  <tr>
                  <td className='recom'><img src={bpSysDys} alt="bpSysDys" className='iconClinicalAlert' /> BP[115/52]</td>
                    <td>BP[115/60]</td>
                    <td><span style={{'color':'#2D8AF5'}}>Midodrine</span> Should Not Be Given</td>
                  </tr>
                  <tr>
                  <td className='recom'><img src={bpSysDys} alt="bpSysDys" className='iconClinicalAlert' /> BP[115/52]</td>
                    <td>BP[115/60]</td>
                    <td><span style={{'color':'#2D8AF5'}}>Midodrine</span> Should Not Be Given</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

