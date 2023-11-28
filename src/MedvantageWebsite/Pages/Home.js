import React, { useEffect} from 'react'
//import homegif from '../assest/image/home-page.gif'
import homebanner from '../assest/image/HIMS.png'
import aboutImg from '../assest/image/about-img.png'
import rmdBg from '../assest/image/RMD-bg.png'
import TimeImg from '../assest/image/time.png'
import imgRealTime from '../assest/image/real-time.png'
import imgSecure from '../assest/image/secure.png'
import imgMobileReady from '../assest/image/mobile-ready.png'
import ImgFeatureRmd from '../assest/image/feature-rmd.gif'
import imgDedicateRmd from '../assest/image/dedicate-rmd.png'
import imgIotMonitor from '../assest/image/iot-monitor.png'
import ImgRMDBg2 from '../assest/image/RMD-bg2.png'
import imgBg2 from '../assest/image/bg2-min.jpg'
import ImgChannel from '../assest/image/channel-img.png'
import ImgDetection from '../assest/image/detection.png'
import ImgReducing from '../assest/image/reducing.png'
import ImgMobileWeb from '../assest/image/mobile-web.png'
import ImgManageBill from '../assest/image/bill-management.png'
import ImgOperation from '../assest/image/operation-management.png'
import ImgHospitalOnline from '../assest/image/hospital-online.png'
import ImgIPDManagement from '../assest/image/ipd-management.png'
import ImgMobileWebInter from '../assest/image/mobile-web-interface.png'
import ImgOPDManagement from '../assest/image/opd-management.png'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import '../assest/js/Slider.js'


export default function Home() {
  const { t } = useTranslation();

  let cc = () => {
    let items = document.querySelectorAll('.carousel .carousel-item')

    items.forEach((el) => {
      const minPerSlide = 4
      let next = el.nextElementSibling
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
      }
     
    })
  }
  useEffect(() => {
    document.title = "Remote Patient Monitoring Dashboard"
    document.getElementsByTagName("META")[2].content="Remote Monitoring Dashboard is an end-to-end solution for all your hospital needs. It is a HIPAA-compliant remote-monitoring solution designed for healthcare organizations.";
    document.getElementsByTagName("META")[3].content = "Best Remote Patient Monitoring and Management Software, Remote Monitoring Dashboard, Remote Patient Monitoring Platform"
    setTimeout(() => {
      cc();
    }, 300)
  }, [])

  return (
    <>
      {/* <section className="head">
        <div className="container-fluid">
          <div className="info customeInfo">
            <h5>Continuous care made it easy while maintaining</h5>
            <h3>SOCIAL DISTANCING NORMS!</h3>
            <div className="bnrr-image" style={{ maxWidth: "920px", margin: "auto" }}>
              <img src={homegif} alt="Remote Monitoring Dashboard" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </section> */}
    <section className="head">
        <div className="container-fluid">
          <div className="info customeInfo">
            <div className="row">
              <div className='col-md-12 bannersec'> 
              <div className='bannertext'>
              <h3><span className='textTitle1'>MED</span><span className='textTitle2'>VANTAGE</span></h3>
            <h5>{t("Hospital Information")}<br />Management  System </h5>
            <p style={{textAlign: "left"}}>A comprehensive solution for all your hospital management needs.</p>
            <div className="buttn"><a href="/contact-us" style={{textDecoration: 'none'}}>Schedule a Demo &nbsp;<i className="fa fa-long-arrow-right" aria-hidden="true"></i></a></div>
            </div>
            <div style={{ maxWidth: "100%", margin: "auto" }}>
              <img src={homebanner} alt="Remote Monitoring Dashboard" className='imagestyle'/>
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section className="RMD1">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
               
              <div className="col-md-6">
                  <div className="rmd-img">
                    {/* <img src="image/RMD-bg.png" alt=""/> */}
                    <img src={ImgMobileWebInter} alt="Mobile & Web Interface" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="rmd2-hp">
                    <h2>Mobile & Web Interface</h2>
                    <p>Medvantage can assist you in building a digital presence across various channels. </p>

                    <div className="row">

                      <div className="col-sm-12">
                        <div className="rmd-pr">
                          <h5>Role-Based Access Control </h5>
                          <p> Provide role-based access of web apps to Physicians, Nurses, Front Desk, Support Team etc. </p>
                        </div>
                      </div>


                      <div className="col-sm-12">
                        <div className="rmd-pr">
                          <h5>White-labeled Mobile Apps</h5>
                          <p> Utilize mobile applications to enhance your digital visibility through branded apps for your hospital. </p>
                        </div>
                      </div>

                    </div>




                  </div>

                </div>
                
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="about-us">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <div className="abt-defi">
                <h2>IPD Management </h2>
                <p>IPD module handles the patient admission to discharge journey effortlessly. </p>
                <div className="row">
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Admission Discharge Transfer (ADT) Management </h5>
                  <p> MEDVANTAGE is designed for faster & efficient IP admission, transfer and discharge management. </p>
                </div>
              </div>


              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Patient Day-care </h5>
                  <p> Faster IP admissions, patient transfers, real-time bed management, and quick discharge. </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Operation Theatre (OT) Management </h5>
                  <p> Accelerate OT work-list & transfer list, schedule surgery and efficiently take care of approvals.</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Cath Lab Management </h5>
                  <p> MEDVANTAGE helps you to manage Cath-lab schedule, work-list, transfers, etc. </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Diet Management  </h5>
                  <p> Serve your patients the right diet with dietician schedules, diet plan creators, and pre-build diet templates. </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Emergency Response Care   </h5>
                  <p> MEDVANTAGE lets you improve the productivity of the ER team. </p>
                </div>
              </div>
              </div>
                

              </div>
            </div>
            <div className="col-md-6">
            <div className="rmd-img">
                <img src={ImgIPDManagement} alt="IPD Management" />
              </div>
            </div>
          </div>

        </div>

      </section>
      <section className="RMD1">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
               
              <div className="col-md-6">
                  <div className="rmd-img">
                    {/* <img src="image/RMD-bg.png" alt=""/> */}
                    <img src={ImgOPDManagement} alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="rmd2-hp">
                    <h2>OPD Management </h2>
                    <p>A robust hospital information management software that allows delighting an outpatient every time.  </p>

                    <div className="row">

                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <h5>Patient Portal </h5>
                          <p> Patients can avail all services with a self-service portal  </p>
                        </div>
                      </div>


                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <h5>Alert Manager </h5>
                          <p> Notify patients without any delay </p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <h5>Queue Management  </h5>
                          <p>Empower patients to avoid overcrowding in queues with online & walk-in appointments  </p>
                        </div>
                      </div>


                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <h5>Appointment  </h5>
                          <p> Facilitate faster appointments with physicians </p>
                        </div>
                      </div>

                    </div>




                  </div>

                </div>
               
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="about-us">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <div className="abt-defi">
                <h2>Billing Management  </h2>
                <p>MEDVANTAGE helps manage IP and outpatient billing information efficiently.  </p>
                <div className="row">
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>IP/ER/DC Billing System </h5>
                  <p> Get paid faster and streamline IP billing, planned discharge, and financial operations process </p>
                </div>
              </div>


              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Outpatient Billing  </h5>
                  <p> MEDVANTAGE works to supervise outpatient orders, diagnostic reports and daily transactions </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Account Receivable (TPA) </h5>
                  <p> One place to manage all your account receivables. Manage payment received, settlements, and outstanding. Send due alerts. </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Payment Methods  </h5>
                  <p> Enable patients and HCPs to do online and offline transactions </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Doctor Payout   </h5>
                  <p> Quickly set up doctors’ profiles, configure services, post bills and oversee final payments  </p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Emergency Response Care   </h5>
                  <p> MEDVANTAGE lets you improve the productivity of the ER team. </p>
                </div>
              </div>
              </div>
                

              </div>
            </div>
            <div className="col-md-6">
            <div className="rmd-img">
                <img src={ImgManageBill} alt="IPD Management" />
              </div>
            </div>
          </div>

        </div>

      </section>
      <section className="RMD1">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
               
              <div className="col-md-6">
                  <div className="rmd-img">
                    <img src={ImgOperation} alt="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="rmd2-hp">
                    <h2>Operations Management</h2>
                    <p>Well-designed hospital management software system software has features for the seamless functioning of the hospital operations department. </p>

                    <div className="row">

                      <div className="col-sm-12">
                        <div className="rmd-pr">
                          <h5>Facility Management  </h5>
                          <p> Optimize manpower, improve productivity and set up the billing process of single or multiple hospital facilities in a few clicks </p>
                        </div>
                      </div>


                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <h5>Housekeeping  </h5>
                          <p> Streamline housekeeping activities at the hospital. </p>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <h5>CSSD  </h5>
                          <p>View CSSD inventory and handle indent request/issue/acknowledge smoothly  </p>
                        </div>
                      </div>

                    </div>




                  </div>

                </div>
               
              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="about-us">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <div className="abt-defi">
                <h2>Online Hospital   </h2>
                <p>All-in-One Hospital Information Management System for patients, doctors and enterprise clients and their employees.  </p>
                <div className="row">
              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Patient Portal  </h5>
                  <p> Patients can book a slot for appointments, teleconsultations, and make online payments. </p>
                </div>
              </div>


              <div className="col-sm-6">
                <div className="rmd-pr">
                  <h5>Corporate Admin Portal   </h5>
                  <p>Reduce medical costs for your enterprise clients and their staff. </p>
                </div>
              </div>
              
              <div className="col-sm-12">
                <div className="rmd-pr">
                  <h5>Doctor Portal  </h5>
                  <p> Improve the productivity of your doctors by managing the online profile of your doctors and their appointments. </p>
                </div>
              </div>
             
              </div>
                

              </div>
            </div>
            <div className="col-md-6">
              <div className="rmd-img">
                <img src={ImgHospitalOnline} alt="IPD Management" />
              </div>
            </div>
          </div>

        </div>

      </section>
      {/* <section className="about-us1">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <div className="abt-defi">
                <h2>About Us</h2>
                <p>DigiDoctor- Remote Monitoring Dashboard from Criterion Tech is a
                  modern approach for caring for admitted patients remotely and
                  will be able to provide complete care without so much physical
                  intervention and helps in getting the unseen virus to health.</p>

                <div className="buttn">
                  <a href='/about-us/'>Learn More <i className="fa fa-long-arrow-right"
                    aria-hidden="true"></i></a>
                </div>

              </div>
            </div>
            <div className="col-md-6">
              <div className="abt-imgin">
                <img src={aboutImg} alt="Remote Monitoring Dashboard" />
              </div>
            </div>
          </div>

        </div>

      </section> */}

      <section className="RMD">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="rmd-img">
                    {/* <img src="image/RMD-bg.png" alt=""/> */}
                    <img src={rmdBg} alt="" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="rmd-hp">
                    <h2>REMOTE MONITORING DASHBOARD</h2>
                    <p>DigiDoctor- Remote Monitoring Dashboard is an end-to-end solution for all your
                      hospital needs.
                      It is a HIPAA-compliant remote-monitoring solution designed for healthcare
                      organizations.</p>

                    <div className="row">

                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <p> <i className="fa fa-check-circle" aria-hidden="true"
                            style={{ color: "#9B2CFA" }}></i> Easy to integrate with a wide variety
                            of health equipment for continuous monitoring of vitals.</p>
                        </div>
                      </div>


                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <p> <i className="fa fa-check-circle" aria-hidden="true"
                            style={{ color: "#199B68" }}></i>Enjoy wide compatibility with Windows,
                            Mac, tablet, and smartphone devices.</p>
                        </div>
                      </div>


                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <p> <i className="fa fa-check-circle" aria-hidden="true"
                            style={{ color: "#2B70FA" }}></i>Monitor patients' health in real-time
                            from any location.</p>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="rmd-pr">
                          <p> <i className="fa fa-check-circle" aria-hidden="true"
                            style={{ color: "#F8452D" }}></i>Set custom alerts for notification of a
                            status change.</p>
                        </div>
                      </div>


                      <div className="col-sm-12">
                        <div className="rmd-pr">
                          <p> <i className="fa fa-check-circle" aria-hidden="true"
                            style={{ color: "#FF882C" }}></i>Access all the past trends of vitals and
                            medicine performance.</p>
                        </div>
                      </div>
                    </div>




                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>



      <section className="RMD-1">
        <div className="container">
          <div className="row">

            <div className="col-sm-12">
              <div className="row">

                <div className="col-md-6">
                  <div className="rmd-p1">
                    <h2>What is a remote patient monitoring dashboard?</h2>
                    <p>As its name suggests, remote patient monitoring (RPM) is a counterpart to telehealth.
                      It involves using devices to record and transmit real-time patient data that can be
                      consulted by medical professionals. A remote patient monitoring system, therefore,
                      consists of two parts.</p>

                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="rmd-info">
                        <img src={imgDedicateRmd} alt="" />
                        <h4>Dedicated RMD devices</h4>
                        <p>(i.e., hardware) to capture and relay the patients’ vital data</p>

                      </div>
                    </div>


                    <div className="col-sm-6">
                      <div className="rmd-info">
                        <img src={imgIotMonitor} alt="" />
                        <h4>Dedicated RMD devices</h4>
                        <p>(i.e., software; also called a remote patient monitoring platform) that
                          ingests and processes the data.</p>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="rmd-img2">
                    <img src={ImgRMDBg2} alt="" />

                  </div>

                </div>




              </div>

            </div>

          </div>

        </div>

      </section>

      <section className="rmd-feature">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <div className="rmd-feat-img">
                {/* <img src="image/feature-rmd.gif" alt=""/> */}
                <img src={ImgFeatureRmd} alt="" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="featr-hp kode-main-services">
                <div className="kf_heading_1">
                  <h2>Features</h2>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="main-service-box">
                    <div className="icon-srvc">
                      <img src={imgRealTime} />
                    </div>
                    <div className="srvc-content">
                      <h3>Real-Time Stats</h3>
                      <p>Vitals such as Pulse, Blood Pressure, Heart Rate, Respiration Rate, Oxygen Saturation, CO2
                        Level, Temperature.</p>
                      {/* <strong className="bottom-border"></strong> */}
                    </div>
                  </div>

                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="main-service-box">
                    <div className="icon-srvc">
                      <img src={imgSecure} />
                    </div>
                    <div className="srvc-content">
                      <h3>Secure</h3>
                      <p>Permission-Based Access., Encrypted Reports with Alert and Notifications in Run time.</p>
                      {/* <strong className="bottom-border"></strong> */}
                    </div>
                  </div>

                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="main-service-box">
                    <div className="icon-srvc">
                      {/* <img src="image/mobile-ready.png"/> */}
                      <img src={imgMobileReady} />
                    </div>
                    <div className="srvc-content">
                      <h3>Mobile Ready</h3>
                      <p>Monitor patients on the Go with Mobile App Solutions and Responsive Application</p>
                      {/* <strong className="bottom-border"></strong> */}
                    </div>
                  </div>

                </div>



              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="youtbe-RMD">
        {/* <img src="image/bg2.png" alt=""/> */}
        <a href="https://www.youtube.com/watch?v=XeudPXFbuYQ" target='_blank'><img src={imgBg2} alt="" /></a>
      </section>




      <section className="RMD-benifits">
        <div className="container">
          <div className="row">

            <div className="rmd-bnft">
              <h2>Benefits of Remote Monitoring Dashboard</h2>
              <p> Remote Monitoring Dashboard having multiple Benefits to make why are used?</p>
            </div>

            {/* -----------------------Start Product Slider------------------- */}
            <div className="container text-center my-3">
              <div className="row mx-auto my-auto justify-content-center">
                <div id="recipeCarousel" className="carousel slide customeCarouselInner" data-bs-ride="carousel">
                  <div className="carousel-inner" role="listbox">

                    <div className="carousel-item active">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld"
                            style={{ backgroundColor: "linear-gradient(180deg,#ffffff 0%,#EEF7FE 100%)" }}>
                            {/* <img src="image/time.png" alt="" /> */}
                            <img src={TimeImg} alt="" />
                            <h4>Real-time</h4>
                            <p>Real-time 24x7 monitoring with 360-degree rotating PTZ cameras</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld">
                            <img src={TimeImg} alt="" />
                            <h4>Advanced Electronic</h4>
                            <p>Advanced electronic stethoscopes for digital health record-keeping and monitoring
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld"
                            style={{ backgroundColor: "linear-gradient( 180deg,#ffffff 0%,#F4F2FD 100%)" }}>
                            <img src={ImgDetection} alt="" />
                            <h4>Early detection</h4>
                            <p>Early detection of criticality leads to early cure and better treatment</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld">
                            <img src={ImgReducing} alt="" />
                            <h4>Reducing</h4>
                            <p>Reducing the number of hospital staff to half thus overcoming the shortage of
                              manpower</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld"
                            style={{ backgroundColor: "linear-gradient(180deg,#ffffff 0%,#EEF7FE 100%)" }}>
                          <img src={TimeImg} alt="" />
                            <h4>Real-time</h4>
                            <p>Real-time 24x7 monitoring with 360-degree rotating PTZ cameras</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld">
                          <img src={TimeImg} alt="" />
                            <h4>Advanced Electronic</h4>
                            <p>Advanced electronic stethoscopes for digital health record-keeping and monitoring
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld"
                            style={{ backgroundColor: "linear-gradient( 180deg,#ffffff 0%,#F4F2FD 100%);" }}>
                             <img src={ImgDetection} alt="" />
                            <h4>Early detection</h4>
                            <p>Early detection of criticality leads to early cure and better treatment</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="col-lg-3 col-md-4">
                        <div className="blog-item">
                          <div className="bnft-sld">
                          <img src={ImgReducing} alt="" />
                            <h4>Reducing</h4>
                            <p>Reducing the number of hospital staff to half thus overcoming the shortage of
                              manpower</p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <a className="carousel-control-prev bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  </a>
                  <a className="carousel-control-next bg-transparent w-aut" href="#recipeCarousel" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  </a>
                </div>
              </div>
            </div>
            {/* -----------------------End Product Slider------------------- */}




            {/* <div className="col-sm-12"> 
                    <div className="blog" style={{float: "left"}}>
                        <div className="owl-carousel blog-carousel wow fadeInUp" data-wow-delay="0.1s">
                            <div className="blog-item">
                                <div className="bnft-sld"
                                    style={{backgroundColor: "linear-gradient(180deg,#ffffff 0%,#EEF7FE 100%)"}}>                                      
                                    <img src="image/time.png" alt=""/>
                                    <img src={TimeImg} alt=""/>
                                    <h4>Real-time</h4>
                                    <p>Real-time 24x7 monitoring with 360-degree rotating PTZ cameras</p>
                                </div>
                            </div>

                            <div className="blog-item">2
                                <div className="bnft-sld">
                                    <img src={TimeImg} alt=""/>
                                    <h4>Advanced Electronic</h4>
                                    <p>Advanced electronic stethoscopes for digital health record-keeping and monitoring
                                    </p>
                                </div>
                            </div>

                            <div className="blog-item">3
                                <div className="bnft-sld"
                                    style={{backgroundColor: "linear-gradient( 180deg,#ffffff 0%,#F4F2FD 100%)"}}>
                                    <img src="image/detection.png" alt=""/>
                                    <h4>Early detection</h4>
                                    <p>Early detection of criticality leads to early cure and better treatment</p>
                                </div>
                            </div>

                            <div className="blog-item">4
                                <div className="bnft-sld">
                                    <img src="image/reducing.png" alt=""/>
                                    <h4>Reducing</h4>
                                    <p>Reducing the number of hospital staff to half thus overcoming the shortage of
                                        manpower</p>
                                </div>
                            </div>

                            <div className="blog-item">5
                                <div className="bnft-sld"
                                    style={{backgroundColor: "linear-gradient(180deg,#ffffff 0%,#EEF7FE 100%)"}}>
                                    <img src="image/time.png" alt=""/>
                                    <h4>Real-time</h4>
                                    <p>Real-time 24x7 monitoring with 360-degree rotating PTZ cameras</p>
                                </div>
                            </div>

                            <div className="blog-item">6
                                <div className="bnft-sld">
                                    <img src="image/time.png" alt=""/>
                                    <h4>Advanced Electronic</h4>
                                    <p>Advanced electronic stethoscopes for digital health record-keeping and monitoring
                                    </p>
                                </div>
                            </div>

                            <div className="blog-item">7
                                <div className="bnft-sld"
                                    style={{backgroundColor: "linear-gradient( 180deg,#ffffff 0%,#F4F2FD 100%);"}}>
                                    <img src="image/detection.png" alt=""/>
                                    <h4>Early detection</h4>
                                    <p>Early detection of criticality leads to early cure and better treatment</p>
                                </div>
                            </div>

                            <div className="blog-item">8
                                <div className="bnft-sld">
                                    <img src="image/reducing.png" alt=""/>
                                    <h4>Reducing</h4>
                                    <p>Reducing the number of hospital staff to half thus overcoming the shortage of
                                        manpower</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="butttn">
                        <a href="benifits_RMD.html">Learn More <i className="fa fa-long-arrow-right"
                                aria-hidden="true"></i></a>
                    </div>
                </div> */}

          </div>

        </div>

      </section>





      {/* <section className="RMD-channel">
        <div className="container">
          <div className="row">

            <div className="col-md-6">
              <div className="chann-rmd">
                <h2>CHANNEL PARTNER</h2>
                <p className="text-white" style={{ fontSize: "18px", fontWeight: "400" }}>Be A Channel Partner! Let’s join hands to make the healthcare system more innovative</p>

              </div>

              <div className="contact-form fxt-form">
                <div id="success"></div>
                <form name="sentMessage" id="contactForm" novalidate="novalidate">

                  <div className="control-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <input type="text" className="form-control" id="name" placeholder=" Name" required="required" />
                    </div>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <input type="text" className="form-control" id="name" placeholder="Organization Name"
                        required="required" />
                    </div>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <input type="email" className="form-control" id="email" placeholder="Phone Number"
                        required="required" />
                    </div>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <input type="text" className="form-control" id="subject" placeholder="Email"
                        required="required" />
                    </div>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <textarea className="form-control" id="message" placeholder="Message"
                        required="required"></textarea>
                    </div>
                    <p className="help-block text-danger"></p>
                  </div>


                  <div className="fxt-transformY-50 fxt-transition-delay-4">
                    <a href="##" className="fxt-btn-fill">Submit</a>


                  </div>
                </form>

              </div>

            </div>

            <div className="col-sm-6">
              <div className="chnnel-img">
               
                <img src={ImgChannel} alt="" />

              </div>

            </div>

          </div>
        </div>

      </section> */}
    </>
  )
}
