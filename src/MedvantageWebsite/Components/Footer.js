import React, { useEffect, useState } from 'react'
// import FooterLogo from '../assest/image/footer-logo.png'
import { Link } from 'react-router-dom'
import rmd_logo from "../assest/image/RMD-Logo.png"

export default function Footer() {

    const [currYear, setCurrYear] = useState('')

    function getCurrentYear() {
        // Get the current date
        const currentDate = new Date();
        // Extract the year from the current date
        const currentYear = currentDate.getFullYear();
       console.log('currentYear : ', currentYear)
       setCurrYear(currentYear);
        
      }

    useEffect(() => {
        getCurrentYear()
    },[])

    return (
        <>
            <section className="footrabout">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="contact-us"> <img src={rmd_logo} alt="" width="260px" height="60px"/>
                            Remote Monitoring Dashboard from Criterion Tech is a modern approach for caring for admitted patients remotely and will be able to provide complete care without so much physical intervention and helps in getting the unseen virus to health.
                                <div className="hed-social">
                                    <h3 className='mb-0'>Follow Us</h3>
                                    <ul>
                                        <li><a href="https://www.facebook.com/medvantageofficial" rel="noreferrer" target="_blank"> <i className="fa-brands fa-facebook"></i></a></li>
                                        <li><a href="https://twitter.com/medvantagetech" rel="noreferrer" target="_blank"><i className="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="https://in.pinterest.com/medvantageofficial/" target="_blank"> <i className="fa-brands fa-pinterest"></i></a></li>
                                        <li><a href="https://www.linkedin.com/company/medvantage-official/" target="_blank"><i className="fa-brands fa-linkedin"></i></a></li>
                                        <li><a href="https://youtube.com/@medvantageofficial" target="_blank"><i className="fa-brands fa-youtube" aria-hidden="true"></i></a></li>
                                        {/* <li><a href="https://www.linkedin.com/company/medvantageofficial/" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a></li> */}
                                        <li><a href="https://www.instagram.com/medvantageofficial/" target="_blank"><i className="fa-brands fa-square-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="hed-adrres">
                                <div className="hed-company">
                                    <h3 className='mb-0'>Company</h3>
                                    <ul>
                                        <li><Link to='/'> Home </Link></li>
                                        <li><Link to='/about-us/'> About Us </Link></li>
                                        <li><Link to='/contact-us/'> Contact Us</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="hed-adrres">
                                <div className="hed-link">
                                    <h3 className='mb-0'>Quick Link</h3>
                                    <ul>
                                        {/* <!-- <li><a href="api.html"> API </a></li> -->. */}
                                        <li><Link to='/channel-partner/'> Be a Channel Partner </Link></li>
                                        {/* <!-- <li><a href="plans.html"> Plans  </a></li> --> */}
                                        <li><Link to='/benefits-rmd/'> Benefits of RMD  </Link></li>
                                        <li><Link to='/verifyUHID/' onClick={()=>{window.sessionStorage.setItem("isClickedExportPatientData", "1")}}> Export Patient Data(USCDI-Data)  </Link></li>
                                        <li><Link to='/verifyUHID/' onClick={()=>{window.sessionStorage.setItem("isClickedExportPatientData", "2")}}> Export Patient Data(CCDA-Data)  </Link></li>
                                        <li><Link to='/oncdocumentation/'>Medvantage ONC Documentation</Link></li>
                                        <li><Link to='/apidocumentation/'> Medvantage API Documentation </Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="contact-us">
                                <div className="hed-adrres">
                                    <h3 className='mb-0'>Contact Us</h3>
                                    <p><i className="fa fa-map" aria-hidden="true"></i> K.No-3, Sarfarazganj, Hardoi road, Lucknow, UP-226003</p>
                                    <p> <i className="fa fa-phone" aria-hidden="true"></i> +91 7795688088, +91 7275754085</p>
                                    <p><i className="fa fa-envelope" aria-hidden="true"></i> info@criteriontechnologies.com</p>
                                </div>
                            </div>
                        </div>
                            <div className="fterp">
                                <hr />
                                    <div>Copyright {currYear} Medvantage All Right Reserved.</div>
                                    <div className="version-text">Version 1.0 </div>
                            </div>
                    </div>
                </div>
            </section>
        </>
    )
}
