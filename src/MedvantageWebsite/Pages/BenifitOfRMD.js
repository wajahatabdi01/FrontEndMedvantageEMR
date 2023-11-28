import React, { useEffect } from 'react'
import ImgBenifitRMD from '../assest/image/benifitsofrmd.png'
import ImgColorCoding from '../assest/image/coding.png'
import ImgColorCodingjpg from '../assest/image/color-coding.jpg'
import ImgSortingAlgojpg from '../assest/image/Sorting Algorithm.jpg'
import ImgSortingAlgo from '../assest/image/algorithm.png'
import ImgPatient from '../assest/image/patient-name.png'
import ImgPatientt from '../assest/image/patientt-name.png'
import ImgLifeSupjpg from '../assest/image/Life Support.jpg'
import ImgLifeSuppng from '../assest/image/Life Support.png'
import ImgSPO2 from '../assest/image/SPO2.jpg'
import ImgPulseOxi from '../assest/image/pulse-oximeter (2).png'
import ImgBloodPress from '../assest/image/Blood Pressure.jpg'
import ImgBloodpress1 from '../assest/image/blood-pressure1.png'
import ImgWardJpg from '../assest/image/Ward.jpg'
import ImgWardpng from '../assest/image/wardd.png'
import ImgLiveCameraJpg from '../assest/image/Live Camera.jpg'
import LiveStrem from '../assest/image/live-streaming.png'
import ImgAlbumin from '../assest/image/Albumin.jpg'
import ImgRedBloodCell from '../assest/image/red-blood-cells.png'
import ImgRbs from '../assest/image/RBS.jpg'
import ImgSugarBlood from '../assest/image/sugar-blood-level.png'
import ImgTempreture from '../assest/image/Temperature.jpg'
import ImgTempreture1 from '../assest/image/temperature1.png'
import ImgGraphical from '../assest/image/Graphical Data.jpg'
import ImgIncreasing from '../assest/image/increasing.png'
import ImgSmartAlert from '../assest/image/Smart Alerts.jpg'
import SmartAlertPng from '../assest/image/Smart-Alerts-icon.png'
import ImgIo from '../assest/image/io.png'
import ImgIOIcon from '../assest/image/io-icon.png'
import ImgRRPRHR from '../assest/image/RR, HR, PR(Finger), PR(Biceps).jpg'
import ImgRRIcon from '../assest/image/rr-icon.png'
import ImgHRPR from '../assest/image/HR-PR(Finger).jpg'
import ImgHRPRIcon from '../assest/image/hr-pr-icon.png'
import ImgCaJpg from '../assest/image/Ca++,K+,Na+,Mg,PH,PCO2,PO2,LACTATE.jpg'
import ImgCaIcon from '../assest/image/ca-icon.png'
import ImgBloodUrea from '../assest/image/Blood-Urea.jpg'
import ImgBloodUreaIcon from '../assest/image/Blood-Urea-icon.png'


export default function BenifitOfRMD() {
    useEffect(()=>{
        document.title = "Empowering Real Time Smart Patient Care"
        document.getElementsByTagName("META")[2].content="Empowering Real-Time Smart Patient provides needed information on Vitals namely heart rate, pulse rate, oxygen saturation, blood pressure, and temperature of each patient continuously on a real-time basis.";
        document.getElementsByTagName("META")[3].content = "Remote patient monitoring,real time dashboard,remote system monitor dashboards"


    }, [])
    return (
        <>
            <section className="about-us12" style={{ backgroundImage: `url(${ImgBenifitRMD})` }}>
                <div className="container-fluid">
                    <div className="brdd">
                        <div className="abtus-in"><h1>Benefits Of RMD</h1></div>

                        <div className="btn-inn">
                            <span>
                                <a href='/'>Home <i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                                <a href="/benefits-rmd/" style={{ color: '#ff6b57' }}>Benefits Of RMD</a>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- enquiry form open --> */}
            <section className="contct-usinr">
                <div className="container-fluid">
                    <div className="row">
                        <section className="benfts-ftr">
                            <div className="container">
                                <div className="row">

                                    <div className="col-sm-12">
                                        <div className="hdng">
                                            <h2>Benefits Of Medvantage</h2>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="hdng">
                                            <p style={{ textalign: 'justify'}}>In recent years, the global healthcare landscape has witnessed an unprecedented rise in the demand for Intensive Care Unit (ICU) beds and specialized medical expertise. The complex interplay of factors such as population growth, aging demographics, technological advancements, and the emergence of new health threats has led to an increased strain on healthcare systems worldwide. </p>
                                            <p>The healthcare industry is undergoing a transformative shift, transitioning from conventional approaches to embracing cutting-edge technological solutions. This paradigm shift is driven by the potential to enhance patient outcomes, streamline processes, improve accessibility, and revolutionize the way healthcare is delivered. </p>
                                        <p>MEDVANTAGE, the eICU and smart analytics model reimagines the delivery of intensive care through the strategic fusion of technology, data analytics, and expert clinical oversight. By employing real-time remote monitoring, predictive analytics, and virtual collaboration, MEDVANTAGE brings critical care expertise to the forefront while expanding the reach of intensive care to a broader patient population. </p>
                                        <p>Dashboard Consists of Following Information like</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-12">
                                        <div className="row">
                                            <div className="din1">
                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                        <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgColorCodingjpg} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgColorCoding} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Color Coding</h3>
                                                            <p>This will make the dashboard more unique and attractive, which also helps in
                                                                the easy identification of live data’s deranged values.</p>
                                                        </div>

                                                    </div>
                                                </div>


                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgSortingAlgojpg} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgSortingAlgo} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Sorting Algorithm</h3>
                                                            <p>It will give you the most critical patients to the top of the list of all admitted
                                                                patients so it will make it easy for you to take judgment proactively.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgPatient} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgPatientt} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Patient Name</h3>
                                                            <p>This is being displayed from the Registration form. It shows the patient’s name,
                                                                age, gender, and PID. The pie chart shows the severity score of the patient. The scores are
                                                                automatically generated from the integrated applications.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgLifeSupjpg} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgLifeSuppng} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Life Support</h3>
                                                            <p>It shows which life support is being given to the patient- oxygen support,
                                                                ventilator support, or vasopressors support. It also shows the volume of supporting parameters
                                                                like how much o2 is given, which mode of the ventilator is being used, what is the PEEP value, and also the dose of
                                                                vasopressors. There is an excellent feature that notifies to decrease or increase the o2 volume according to
                                                                patient’s current saturation and also notifies to increase or decrease the dose of vasopressors.”
                                                                It retrieves the data from the ventilator itself.
                                                            </p>

                                                        </div>

                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgSPO2} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgPulseOxi} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>SPO2</h3>
                                                            <p>It shows the SPO2 of the patient and it is also automatically coming from the monitors
                                                                and manual entry forms.<br /> <br />The time is always being displayed to show how old the data is. There is a graph icon to show
                                                                the graph of hourly and by minute highest and lowest BP. <br /><br />
                                                                It also shows the support of
                                                                vasopressors if any. In case of abnormal BP, it advises the medicines and supplements.

                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgBloodPress} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgBloodpress1} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Blood Pressure</h3>
                                                            <p>This vital is automatically coming from the monitors and manual entry forms. The time is
                                                                always being displayed to show how old the data is? <br /><br />There is a graph icon to show the graph of
                                                                hourly and by minute highest and lowest BP, it also
                                                                shows the support of vasopressors if any. In case of abnormal BP, it advises the medicines and
                                                                supplements.</p>
                                                        </div>

                                                    </div>
                                                </div>




                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgWardJpg} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgWardpng} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Ward</h3>
                                                            <p>This column indicates the admitted ward, admission date, admitted duration which
                                                                notifies about the standard admission period and shifted the date of the current ward. The data
                                                                is being retrieved automatically from HIS.</p>
                                                        </div>

                                                    </div>
                                                </div>




                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgLiveCameraJpg} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={LiveStrem} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Live Camera</h3>
                                                            <p>This column is used to view the live camera of the patient, alerts, and
                                                                notifications of the patients, and a button to go the patient profile</p>
                                                        </div>

                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgAlbumin} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgRedBloodCell} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Albumin</h3>
                                                            <p>It denotes the albumin level of the patient, the data comes automatically from the HLS
                                                                machine. It also shows an icon of the bottle if albumin correction has been done for the patient.</p>
                                                        </div>

                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgRbs} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgSugarBlood} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>RBS</h3>
                                                            <p>It displays the random blood sugar which is automatically coming from HLS.</p>
                                                        </div>

                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgTempreture} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgTempreture1} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Temperature</h3>
                                                            <p>It denotes the temperature of the patient which comes from the monitor and manual
                                                                form.</p>
                                                        </div>

                                                    </div>
                                                </div>



                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgGraphical} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgIncreasing} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Graphical Data</h3>
                                                            <p>The graph of all vitals from admission date to the discharged date can be seen
                                                                using the graph link</p>
                                                        </div>

                                                    </div>
                                                </div>


                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgSmartAlert} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={SmartAlertPng} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Smart Alerts</h3>
                                                            <p>
                                                                <ul>
                                                                    <li><i className="fa fa-circle"></i> Added new medicines</li>
                                                                    <li><i className="fa fa-circle"></i> Drug Interactions</li>
                                                                    <li><i className="fa fa-circle"></i> Drug Contraindications</li>
                                                                    <li><i className="fa fa-circle"></i> Oxygen Support Optimisation</li>
                                                                    <li><i className="fa fa-circle"></i> Vasopressor Optimisation </li>
                                                                    <li><i className="fa fa-circle"></i> Vasopressor Optimisation</li>
                                                                </ul>
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgIo} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgIOIcon} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>I/O</h3>
                                                            <p>This column is used to show the total intake liquid and output of the patient. In case of
                                                                anuria or oliguria, it notifies. In case of abnormal values, the notifications advise to add
                                                                medicine, change in diet, add supplements, etc.</p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgRRPRHR} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgRRIcon} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>RR, HR, PR(Finger), PR(Biceps)</h3>
                                                            <p>Just like BP and Spo2 these data are coming from the
                                                                monitors. PR(finger) is normal. Pulse Rate and PR(Bicep) means pulse from BP cough.
                                                                Actually, sometimes there are differences between both these pulse rates.</p>
                                                        </div>

                                                    </div>
                                                </div>


                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgHRPR} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgHRPRIcon} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>HR-PR(Finger)</h3>
                                                            <p>HR-PR(Finger), HR-PR(Bicep), PR(Bicep)-PR(Finger) denotes the differences between HRand PRs. </p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgCaJpg} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgCaIcon} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Ca++, K+, Na+, Mg, PH, PCO2, PO2, LACTATE</h3>
                                                            <p>These data are coming automatically from the
                                                                ABG machine which shows the value of ABG parameters.</p>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="item1">
                                                    <div className="ftre-bnfts">
                                                    <div className='overlaybg'></div>
                                                        <div className="img-ftre">
                                                            <img src={ImgBloodUrea} alt="" />
                                                        </div>

                                                        <div className="iccn-ftr">
                                                            <img src={ImgBloodUreaIcon} alt="" />
                                                        </div>


                                                        <div className="hp-bnfts">
                                                            <h3>Creatinine and Blood Urea</h3>
                                                            <p>These data are automatically coming from the HLS.</p>
                                                        </div>

                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}
