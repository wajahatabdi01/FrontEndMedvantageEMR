import React, { useEffect } from 'react'
import ImgChannelPartner from '../assest/image/RMD-channel-partner.png'
import ImgChannel from '../assest/image/channel-partner.png'

export default function ChannelPartner() {

    useEffect(() => {
        document.title = "Channel Partner Program | Medvantage"
        document.getElementsByTagName("META")[2].content="Patients remotely and will be able to provide complete care without so much physical intervention and help in getting the unseen virus to health.";
        document.getElementsByTagName("META")[3].content = "Channel Partner strategy plan for medvantage, Channel Partner Remote Monitoring Dashboard"


    }, [])
    return (
        <>
            {/* <!-- Start header section --> */}
            <section className="about-us12" style={{ backgroundImage: `url(${ImgChannelPartner})` }}>
                <div className="container-fluid">
                    <div className="brdd">
                        <div className="abtus-in"><h1>Channel Partner</h1></div>

                        <div className="btn-inn">
                            <span>
                                <a href="/">Home <i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                                <a href='/channel-partner/' style={{ color: '#ff6b57' }}>  Channel Partner  </a>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- End header section -->   */}

            {/* <!-- Strat chanel section -->   */}
            <section className="RMD-channel2">
                <div className="container">
                    <div className="row">

                        <div className="col-md-5">
                            <div className="chann-rmdd" >
                                <h2>CHANNEL PARTNER</h2>
                                <p>Be A Channel Partner! Let’s join hands to make the healthcare system more innovative</p>

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
                                            <input type="text" className="form-control" id="name" placeholder="Organization Name" required="required" />
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <div className="fxt-transformY-50 fxt-transition-delay-1">
                                            <input type="email" className="form-control" id="email" placeholder="Phone Number" required="required" />
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <div className="fxt-transformY-50 fxt-transition-delay-1">
                                            <input type="text" className="form-control" id="subject" placeholder="Email" required="required" />
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="control-group">
                                        <div className="fxt-transformY-50 fxt-transition-delay-1">
                                            <textarea className="form-control" id="message" placeholder="Message" required="required" ></textarea>
                                        </div>
                                        <p className="help-block text-danger"></p>
                                    </div>


                                    <div className="fxt-transformY-50 fxt-transition-delay-4">
                                        <a href="" className="fxt-btn-fill">Submit</a>
                                    </div>
                                </form>

                            </div>

                        </div>

                        <div className="col-sm-7">
                            <div className="chnnel-img">
                                <img src={ImgChannel} alt="" />

                            </div>

                        </div>

                    </div>
                </div>

            </section>
            {/* <!-- end chanel section --> */}
        </>
    )
}
