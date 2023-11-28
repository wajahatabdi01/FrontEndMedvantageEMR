import {React}from 'react'
import { Link } from 'react-router-dom'
import "./css/bodysection.css"
import Navbar from '../../../../../../Components/Navbar'
import OffcanvasLogo from "../../../../../../assets/images/Navbar/offcanvas-logo.png";
import fullbody from './images/fullbody.png'
import logo from './images/logo.png'
import avtar from './images/avtar.png'
import icu from './images/icu.png'
import bed from './images/bed.png'
import days from './images/days.png'
import monitor from './images/monitor.png'
import maximize from './images/maximize.png'
import g1 from './images/g1.png'
import bloodPressure from './images/blood-pressure.png'
import g2 from './images/g2.png'
import rr from './images/rr.png'
import g3 from './images/g3.png'
import pulse1 from './images/pulse1.png'
import g4 from './images/g4.png'
import co2 from './images/co2.png'
import g5 from './images/g5.png'
import investigation from './images/investigation.png'
import report from './images/report.png'
import red from './images/red.png'
import notes from './images/notes.png'
import ventilator from './images/ventilator.png'
import mask from './images/mask.png'
import glucose from './images/glucose.png'
import plaster from './images/plaster.png'
import p1 from './images/p1.png'
import bp1 from './images/bp1.png'
import pulse from './images/pulse.png'
import yellow from './images/yellow.png'
import Ammonia from './images/Ammonia.png'
import rtfeed from './images/rtfeed.png'
import graph from './images/graph.png'
import exclamationMark1 from './images/exclamation-mark1.png'
import N from './images/N.png'
import F from './images/F.png'
import temperature from './images/temperature.png'

export default function personalDashboardIndex() {
    return (
        <>
        <div className='layOutSurgeryOTNavbar'>
          <div>
                <div className="offcanvas-logo"><Link to="/dashboard/"><img src={OffcanvasLogo} /></Link>
           </div>
          </div>
           <Navbar />
        </div>

        <div style={{display:'grid', gridTemplateColumns:'270px auto', columnGap:'5px', marginTop:'55px'}}>
            {/* left part */}
            <div className="left-cont">
                {/* <div className="left-contim"><img src={logo}/></div> */}
                <div className="left-contim1"><img  src={avtar}/></div>
                <div className="pdetails">
                    <h3>Makbool Khan</h3>
                    <p>Male 27 Years, 2603214</p>
                    <span className="ph"><i className="fa fa-phone"></i> +91-8795902700</span>
                    <p className="maild">Email :</p>
                    <span>MakboolKhan@gmail.com</span>
                    <p className="maild">Address :</p>
                    <span>GADHI MANIPUR, PRATAPGARH</span>
                </div>

                <div className="pdetails1">
                    <div className="pdetails1in2">
                        <div className="pdetails1in"><img src={icu}/></div>
                        <div className="pdetails1in">ICU CC</div>
                    </div>
                    <div className="pdetails1in2">
                        <div className="pdetails1in"><img src={bed}/></div>
                        <div className="pdetails1in" style={{color:'#FFBA52'}}>Bed No. 8</div>
                    </div>
                </div>
                <div className="pdetails1">
                    <div className="pdetails1in2">
                        <div className="pdetails1in"><img src={days}/></div>
                        <div className="pdetails1in">6 Days</div>
                    </div>
                    <div className="pdetails1in2">
                        <div className="pdetails1in"><img src={icu}/> </div>
                        <div className="pdetails1in" style={{color:'#EF8F00'}}> CC Medicine</div>
                    </div>
                </div>
            </div>
            {/* right part */}
            <div className="right-cont">

                <div className="cnttop">
                    <div className="cnttop-in rtbe">
                        <div className="cnttop-in1 jk">
                            <div className="back1"><i className="fa fa-angle-left"></i></div>
                    </div>
                    <div className="cnttop-in1 jk1">
                        <ul className="dash_menu">
                            <li><a href="#" className="active">Overview</a></li>
                        </ul>
                    </div>
                </div>

                <div className="cnttop-in">
                    <div className="cnttop-in1">
                        <div className="bell" style={{position:'relative'}}><i className="fa fa-bell"></i><span className="noti">10</span></div>
                        <div className="bell" style={{position:'relative'}}><i className="fa fa-envelope"></i><span className="noti">10</span></div>
                        <div className="bell" style={{position:'relative'}}>
                            <input type="search" placeholder="Type message here..."/>
                                <span><i className="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cont">

                <div className="col1 flex1">
                    <div className="left-sec">
                        <div className="left-sec-n">
                            <div className="left-sec-in"><img src={monitor}/><span> ICU Monitor</span></div>
                            <div className="left-sec-in"><img className="resizebtn" src={maximize}/> </div>
                        </div>
                        <div className="left-sec-details">
                            <div className="left-sec-details-in">

                                <div className="left-sec-graph">
                                    <div className="left-sec-graph1">
                                        <img src={g1} className="resizebtn"/>
                                    </div>
                                    <div className="left-sec-graph2 flexror">
                                        <div className="left-sec-gdetail5"><img src={bloodPressure} className="che"/>BP</div>
                                        <div className="left-sec-gdetail5"><span className="co2txt" style={{color:'#4C62C3'}}>80/<span className="co2txt" style={{color:'#FF8289'}}>45</span> </span></div>
                                    </div>
                                </div>

                                <div className="left-sec-graph">
                                    <div className="left-sec-graph1">
                                        <img src={g2} className="resizebtn"/>
                                    </div>
                                    <div className="left-sec-graph2 flexror">
                                        <div className="left-sec-gdetail5"><img src={rr} className="che"/>RR</div>
                                        <div className="left-sec-gdetail5"><span className="co2txt" style={{color:'#4294FF'}}>30 RPM </span></div>
                                    </div>
                                </div>

                                <div className="left-sec-graph">
                                    <div className="left-sec-graph1">
                                        <img src={g3} className="resizebtn"/>
                                    </div>
                                    <div className="left-sec-graph2 flexror">
                                        <div className="left-sec-gdetail5"><img src={pulse1} className="che"/>Spo2</div>
                                        <div className="left-sec-gdetail5"><span className="co2txt" style={{color:'#EA1D98'}}>92 <span className="grmtxt">SPO2</span> </span></div>
                                    </div>
                                </div>

                                <div className="left-sec-graph">
                                    <div className="left-sec-graph1">
                                        <img src={g4} className="resizebtn"/>
                                    </div>
                                    <div className="left-sec-graph2 flexror">
                                        <div className="left-sec-gdetail5"><img src={co2} className="che"/>CO2</div>
                                        <div className="left-sec-gdetail5"><span className="co2txt">38 <span className="grmtxt">mmHg</span> </span></div>
                                    </div>
                                </div>

                                <div className="left-sec-graph">
                                    <div className="left-sec-graph1">
                                        <img src={g5} className="resizebtn"/>
                                    </div>
                                    <div className="left-sec-graph2">
                                        <div className="left-sec-gdetail">NIBP<span className="bluetxt">120/80</span></div>
                                        <div className="left-sec-gdetail">mmHg<span className="bluetxt">(93)</span></div>
                                    </div>
                                </div>

                            </div>
                            <div className="left-sec-details-in2">
                                <div className="left-sec-details-in3">
                                    <div className="d1">Alb</div><div className="d2"><span className="redd">1.4</span> <span className="oran"><i className="fa fa-star"></i></span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">Mg</div><div className="d2"><span className="greenn">2</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">HCO3</div><div className="d2"><span className="greenn">19.3</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">Etco2</div><div className="d2"> <span className="redd">7.355</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">I/O</div><div className="d2"><span className="greenn">6.6</span></div>
                                </div>

                                <div className="left-sec-details-in3">
                                    <div className="d1">K+</div><div className="d2"><span className="redd">3.6 (4.7)</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">PH</div><div className="d2"><span className="greenn">7.355</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">TMP</div><div className="d2"><span className="greenn">98.6</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">LACTATE</div><div className="d2"> <span className="redd">3.5</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">SGPT</div><div className="d2"><span className="greenn">46</span></div>
                                </div>

                                <div className="left-sec-details-in3">
                                    <div className="d1">Ca++</div><div className="d2"><span className="redd">1.04 (4.7)</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">PCO2</div><div className="d2"><span className="greenn">7.355</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">B Urea</div><div className="d2"><span className="greenn">220</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">RBS</div><div className="d2"> <span className="redd">189</span></div>
                                </div>
                                <div className="left-sec-details-in3">
                                    <div className="d1">-</div><div className="d2"></div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="left-sec">
                        <div className="left-sec-n">
                            <div className="left-sec-in"><img src={investigation}/><span> Investigation</span></div>
                            <div className="left-sec-in"><img src={maximize} className="resizebtn"/> </div>
                        </div>
                        <div className="left-sec-Investigation">
                            <div className="Investigation-in">
                                <div className="Investigation-inner1">
                                    <div className="Investigation-inn1">Serum Calcium <span>mg/dl</span></div>
                                    <div className="Investigation-inn2">7.1mg/dl <span>21/06/2023 02:30AM</span></div>
                                </div>
                                <div className="Investigation-inner2">
                                    <div className="progress" style={{maxWidth:'100%', borderRadius:'0', marginBottom:'0px'}}>
                                        <div className="progress-bar" style={{width:'30%', background:'#E24138'}}> 8.6</div>
                                        <div className="progress-bar" style={{width:'30%', background:'#0D9F56'}}>8.6-10.2</div>
                                        <div className="progress-bar" style={{width:'40%', background:'#E24138'}}>10.2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="Investigation-in">
                                <div className="Investigation-inner1">
                                    <div className="Investigation-inn1">Serum Calcium <span>mg/dl</span></div>
                                    <div className="Investigation-inn2">7.1mg/dl <span>21/06/2023 02:30AM</span></div>
                                </div>
                                <div className="Investigation-inner2">
                                    <div className="progress" style={{maxWidth:'100%', borderRadius:'0', marginBottom:'0px'}}>
                                        <div className="progress-bar" style={{width:'30%', background:'#E24138'}}> 8.6</div>
                                        <div className="progress-bar" style={{width:'30%', background:'#0D9F56'}}>8.6-10.2</div>
                                        <div className="progress-bar" style={{width:'40%', background:'#E24138'}}>10.2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="Investigation-in">
                                <div className="Investigation-inner1">
                                    <div className="Investigation-inn1">Serum Calcium <span>mg/dl</span></div>
                                    <div className="Investigation-inn2">7.1mg/dl <span>21/06/2023 02:30AM</span></div>
                                </div>
                                <div className="Investigation-inner2">
                                    <div className="progress" style={{maxWidth:'100%', borderRadius:'0', marginBottom:'0px'}}>
                                        <div className="progress-bar" style={{width:'30%', background:'#E24138'}}> 8.6</div>
                                        <div className="progress-bar" style={{width:'30%', background:'#0D9F56'}}>8.6-10.2</div>
                                        <div className="progress-bar" style={{width:'40%', background:'#E24138'}}>10.2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="Investigation-in">
                                <div className="Investigation-inner1">
                                    <div className="Investigation-inn1">Serum Calcium <span>mg/dl</span></div>
                                    <div className="Investigation-inn2">7.1mg/dl <span>21/06/2023 02:30AM</span></div>
                                </div>
                                <div className="Investigation-inner2">
                                    <div className="progress" style={{maxWidth:'100%', borderRadius:'0', marginBottom:'0px'}}>
                                        <div className="progress-bar" style={{width:'30%', background:'#E24138'}}> 8.6</div>
                                        <div className="progress-bar" style={{width:'30%', background:'#0D9F56'}}>8.6-10.2</div>
                                        <div className="progress-bar" style={{width:'40%', background:'#E24138'}}>10.2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="Investigation-in">
                                <div className="Investigation-inner1">
                                    <div className="Investigation-inn1">Serum Calcium <span>mg/dl</span></div>
                                    <div className="Investigation-inn2">7.1mg/dl <span>21/06/2023 02:30AM</span></div>
                                </div>
                                <div className="Investigation-inner2">
                                    <div className="progress" style={{maxWidth:'100%', borderRadius:'0', marginBottom:'0px'}}>
                                        <div className="progress-bar" style={{width:'30%', background:'#E24138'}}> 8.6</div>
                                        <div className="progress-bar" style={{width:'30%', background:'#0D9F56'}}>8.6-10.2</div>
                                        <div className="progress-bar" style={{width:'40%', background:'#E24138'}}>10.2</div>
                                    </div>
                                </div>
                            </div>
                            <div className="Investigation-in">
                                <div className="Investigation-inner1">
                                    <div className="Investigation-inn1">Serum Calcium <span>mg/dl</span></div>
                                    <div className="Investigation-inn2">7.1mg/dl <span>21/06/2023 02:30AM</span></div>
                                </div>
                                <div className="Investigation-inner2">
                                    <div className="progress" style={{maxWidth:'100%', borderRadius:'0', marginBottom:'0px'}}>
                                        <div className="progress-bar" style={{width:'30%', background:'#E24138'}}> 8.6</div>
                                        <div className="progress-bar" style={{width:'30%', background:'#0D9F56'}}>8.6-10.2</div>
                                        <div className="progress-bar" style={{width:'40%', background:'#E24138'}}>10.2</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="left-sec1">
                        <div className="reprtbt"><img src={report}/> Investigation Report</div>
                        <div className="reprtbt"><img src={report}/> ADR Report <img src={red}/></div>
                    </div>


                        <div className="left-sec">
                            <div className="left-sec-n">
                                <div className="left-sec-in"><img src={notes}/><span> Notes</span></div>
                                <div className="left-sec-in"><img src={maximize}  className="resizebtn"/> </div>
                            </div>
                            <div className="left-sec-notes">
                                <div className="left-sec-notes-in">
                                    <p>Kidney Profile : <span>Everything looks good</span></p>
                                    <p>Mineral Profile : <span>Everything looks good</span></p>
                                    <p>Anemia Profile  : <span>Everything looks good</span></p>
                                    <p>Blood Counts : <span>Everything looks good</span></p>
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className="col2 flex1">
                        <div className="left-sec" style={{position:'relative'}}>
                            <div className="left-sec-n">
                                <div className="left-sec-in"><img src={monitor}/><span>Diagnosis</span></div>
                                <div className="left-sec-in"><img src={maximize} className="resizebtn"/> </div>
                            </div>
                        </div>
                        <div className="sec-diagd">
                            <div className="sec-diagd-in"><span className="bluecircle"></span>Liver Abscess</div>
                            <div className="sec-diagd-in"><span className="bluecircle"></span>Newly Diagnosed T2</div>
                            <div className="sec-diagd-in wtt"><span className="wtcircle"></span>T2DM</div>
                        </div>
                        <div className="bodysec-cnt">
                            <div className="bodypart-cnt-in">
                                <div className="bodypart"><img src={fullbody} className="bdy"/>
                                    <div id="ventilator">
                                        <div className="ventilatorpart"><img src={ventilator}/></div>
                                        <div className="maskpart"><img src={mask}/></div>
                                        <div className="fio2">FiO2 <span>40%</span></div>
                                    </div>
                                    <div id="glucose">
                                        <div className="glucosepart"><img src={glucose}/></div>
                                    </div>

                                    <div id="plaster">
                                        <div className="plasterpart"><img src={plaster}/></div>
                                        <div className="p1part"><img src={p1}/></div>
                                        <div className="dvp">DVT Pump<br />21/06/2023 02:30AM</div>
                                    </div>

                                    <div id="pulserate">
                                        <div className="bppart"><img src={bp1}/></div>
                                    </div>

                                    <div id="bloodpressure">
                                        <div className="pulsepart"><img src={pulse}/></div>
                                    </div>

                                    <div id="ECGpart">
                                        <div className="yellopart"><img src={yellow}/></div>
                                    </div>


                                    <div className="redcircle1"><img src={red}/></div>
                                    <div className="redcircle2"><img src={red}/></div>
                                    <div className="redcircle3"><img src={red}/></div>
                                </div>
                            </div>

                            <div className="organs" style={{marginTop:'60px', display:'none1'}}>
                                <span id="venti">Ventilator</span>
                                <span id="glu">Glucose</span>
                                <span id="plas">Plaster</span>
                                <span id="bp">BP</span>
                                <span id="pulse">Pulse</span>
                                <span id="ECG">ECG</span>
                            </div>

                        </div>
                    </div>

                    <div className="col3 flex1">
                        <div className="right-sec">
                            <div className="left-sec">
                                <div className="left-sec-n">
                                    <div className="left-sec-in"><img src={monitor}/><span> ECG Monitor</span></div>
                                    <div className="left-sec-in"><img src={maximize} className="resizebtn"/> </div>
                                </div>
                                <div className="left-sec-Monitor">
                                    <div className="left-sec-Monitor-in1">
                                        <div className="gr">
                                            <img src={graph} style={{width:'100%'}}/>
                                        </div>
                                        <div className="gr-in">
                                            <div className="gr-in1">HEART RATE(BPM): <span style={{color:'#43A047'}}>67</span></div>
                                            <div className="gr-in1">VARIABILITY(std): <span style={{color:'#43A047'}}>67</span></div>
                                        </div>
                                    </div>
                                    <div className="left-sec-Monitor-in2">
                                        <div className="left-sec-Monitor-in2-1">
                                            <p>T PEAK(MAG%) <span className="redtxt">-322%</span></p>
                                        </div>
                                        <div className="left-sec-Monitor-in2-1">
                                            <p>ST DEVIATE(%) <span className="greentxt">1%</span></p>
                                        </div>
                                        <div className="left-sec-Monitor-in2-1">
                                            <p>STATUS <span className="redtxt">T Inverted</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rt-sec">
                                <div className="rt-Ammonia"><img src={Ammonia} style={{width:'25px'}}/></div>
                                <div className="rt-Ammonia"><span className="a0">Ammonia Result</span><span className="a1">48</span> <span className="a2">performed on 14-06-2023 02:16AM</span></div>
                            </div>

                            <div className="rt-sec" style={{borderLeft:'2px solid #2C50EE'}}>
                                <div className="rt-Ammonia"><img src={rtfeed} style={{width:'30px'}}/>
                                    <span style={{color:'#FC0F0F', fontSize:'11px'}}>RT Feed on hold</span>
                                    <span style={{color:'#041D4A', fontSize:'11px'}}>Hold From : 26/06/2023 10:39 AM</span>
                                    <p className="rema"><strong>Remark :</strong> POST OP, RT HOLD Type : Post opt, before every feed  cinnamon fine
                                        crushed 5gm to be given in 10ml water along with Diadzine (soflavone) and ECG</p>
                                </div>
                            </div>

                            <div className="rt-sec">
                                <div className="rt-Ammonia"><img src={exclamationMark1} style={{width:'15px'}}/></div>
                                <div className="rt-Ammonia"><span>ABG is not performed with in 6 hours</span></div>
                            </div>

                            <div className="rt-sec" style={{borderLeft:'2px solid #FC0F0F;'}}>
                                <div className="rt-Ammonia"><img src={N} style={{width:'8px', marginRight:'5px'}}/></div>
                                <div className="rt-Ammonia"><span>Infusion NORAD running at Flow Rate : 5.40ml/hr</span></div>
                            </div>

                            <div className="rt-sec" style={{borderLeft:'2px solid #FC0F0F'}}>
                                <div className="rt-Ammonia"><img src={F} style={{width:'8px', marginRight:'5px'}}/></div>
                                <div className="rt-Ammonia"><span>Infusion FENTA running at Flow Rate : 2ml/hr</span></div>
                            </div>

                            <div className="rt-sec">
                                <div className="rt-Ammonia"><img src={temperature} style={{width:'15px'}}/></div>
                                <div className="rt-Ammonia"><span>Normal or Low grade fever, Value : <strong style={{color:'#008806', marginRight:'5px'}}>98.8F</strong></span></div>
                        </div>

                        <div className="rt-sec" style={{borderLeft:'2px solid #2C50EE', flexDirection:'column'}}>
                            <div className="rt-Ammonia"><p>IV Fluid “DNS’ is running at flow rate of : 76.00ml/hr</p></div>
                            <div className="rt-Ammonia"><p>From : 21/06/2023 10:08AM, IV Fluid “NS100” is running at flow of : 297.00ml/hr</p></div>
                        </div>

                        <div className="remarkk">
                            <p>Remark : POST OP, RT HOLD Type : Post opt, before every feed
                                cinnamon fine crushed 5gm to be given in 10ml water along
                                with Diadzine (soflavone) and ECG
                            </p>
                        </div>

                    </div>
                </div>




            </div>
        </div >
        </div>


        </>
    )
}
