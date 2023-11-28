import React, { useEffect } from 'react'
import ImgContactUsInner from '../assest/image/contactus-inner.png'

export default function ContactUs() {
    useEffect(() => {
        document.title = "Contact Us | Lets get in touch at Medvantage"
        document.getElementsByTagName("META")[2].content = "Doctors and Nurses can keep track of every critical patient in real-time. and Investigation reports are displayed with the abnormal parameters highlighted for quick review.";
        document.getElementsByTagName("META")[3].content = "Remote healthcare platform, remote patient monitoring system,monitoring dashboard"


    }, [])
    return (
        <>
            {/* <!-- Start header section --> */}
            <section className="about-us12" style={{ backgroundImage: `url(${ImgContactUsInner})` }}>
                <div className="container-fluid">
                    <div className="brdd">
                        <div className="abtus-in"><h1>Contact Us</h1></div>

                        <div className="btn-inn">
                            <span>
                                <a href="/">Home <i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                                <a href='/contact-us/' style={{ color: '#ff6b57' }}> Contact Us  </a>
                            </span>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- enquiry form open --> */}
            <section className="contct-usinr">
                <div className="container">
                    <div className="row">

                        <div className="col-sm-5">
                            <div className="cntct-hp">

                                <h2>Get in touch</h2>
                                <p>Looking for help? Fill the form and start a new adventure.</p>

                                <div className="hed-adrres">
                                    <h3>Location</h3>
                                    <p><i className="fa fa-map" aria-hidden="true"></i>  K.No-3, Sarfarazganj, Hardoi road,
                                        Lucknow, UP-226003</p>

                                    <h3>Phone</h3>
                                    <p> <i className="fa fa-phone" aria-hidden="true"></i>  +91 7795688088,  +91 7275754085</p>

                                    <h3>Support</h3>
                                    <p><i className="fa fa-envelope" aria-hidden="true"></i> info@criteriontech.in</p>



                                </div>

                            </div>

                        </div>


                        <div className="col-sm-7">
                            <div className="submisn">
                                <h2>Let's Connect</h2>
                                <p>We’re Here to Help</p>

                                <div className="row">
                                    <div className="col-sm-6">
                                        <input type="text" name="" id="" placeholder="First Name" />
                                    </div>

                                    <div className="col-sm-6">
                                        <input type="text" name="" id="" placeholder="Last Name" />

                                    </div>

                                    <div className="col-sm-12">
                                        <input type="text" name="" id="" placeholder="Subject" />

                                    </div>

                                    <div className="col-sm-12">
                                        <textarea name="" id="" cols="30" rows="10" placeholder="Message"></textarea>

                                    </div>

                                    <div className="butt-inr">
                                        <a href="#">Submit  </a>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>


            </section >
            {/* <!-- enquiry form clossed --> */}

            < section className="map" >
                <div className="contact-map">
                    <div id="map" className="full-map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.757092582717!2d80.87015651547073!3d26.879457567990958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39995502f776e337%3A0x1be33aba7957b703!2sCriterion%20Tech%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1612775894908!5m2!1sen!2sin" frameborder="0" allowfullscreen="" aria-hidden="false" tabIndex="0">
                        </iframe>
                    </div>
                </div>
            </section>
        </>
    )
}
