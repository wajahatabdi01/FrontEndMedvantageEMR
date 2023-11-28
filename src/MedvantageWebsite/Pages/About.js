import React, { useEffect } from 'react'
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import AboutUsImg from '../assest/image/about-us-inner.png'
import ImageAgency from '../assest/image/About Us.jpg'
import ImgAub from '../assest/image/aub.png'
import ImgDrk from '../assest/image/drk.png'
import ImgLite from '../assest/image/lite.png'
import ImgEu from '../assest/image/eu.png'
import ImgMdcl from '../assest/image/mdcl.png'
import ImgRamMnhr from '../assest/image/ram-mnhr.png'
import Imgaward1 from '../assest/image/awards/w2.webp';
import Imgaward2 from '../assest/image/awards/w3.webp';
import Imgaward3 from '../assest/image/awards/w4.webp';
import Imgaward4 from '../assest/image/awards/w5.webp';
import Imgaward5 from '../assest/image/awards/w6.webp';
import Imgaward6 from '../assest/image/awards/health-care-solution-provider.webp';

export default function About() {
    let cc = () => {
        let items = document.querySelectorAll('.carousel .carousel-item')

        items.forEach((el) => {
            const minPerSlide = 3
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
    //Owl Carousel Settings
  const options = {
    loop: true,
    center: true,
    items: 1,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 5000,
    smartSpeed: 450,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      }
    }
  };

    useEffect(() => {
        document.title = "About Us | Remote Monitoring Dashboard-Medvantage"
        document.getElementsByTagName("META")[2].content="Doctor and nurse can know the deterioration or improvement in the patient's condition in real-time and appropriate therapeutic intervention can be decided, immediately.";
    document.getElementsByTagName("META")[3].content = "Remote system monitor dashboards,remote monitoring platform,remote care platform"

        setTimeout(() => {
            cc();
        }, 300)
    }, [])

    return (
        <>
            <section className="about-us12" style={{ backgroundImage: `url(${AboutUsImg})` }}>
                <div className="container-fluid">
                    <div className="brdd">
                        <div className="abtus-in">
                            <h1>About Us</h1></div>
                        <div className="btn-inn"> <span>
                            <a href='/'>Home <i className="fa fa-chevron-right" aria-hidden="true"></i></a>
                            <a href='/about-us/' style={{ color: '#ff6b57' }}> About Us  </a>
                        </span> </div>
                    </div>
                </div>
            </section>
            {/* <!-- who-we-are Open --> */}
            <section className="who-we-are">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-12">
                        <div className="hp">
                            <h2>Who we are?</h2>
                            <p>DigiDoctor- Remote Monitoring Dashboard from Criterion Tech is a modern approach for caring for admitted patients remotely and will be able to provide complete care without so much physical intervention and helps in getting the unseen virus to health.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- who-we-are clossed --> */}
            <section className="ct-pvt">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-sm-6">
                        
                            <div className="pvt-ltd">
                                <h2>Criterion tech Pvt Ltd</h2>
                                <p>DigiDoctor- Hospital Information System is designed and developed by Criterion tech Pvt ltd. aims to improve the quality of the healthcare ecosystem with digitalization It is a web-native, integrated, multi-facility, multi-lingual and scalable platform. It can be easily configured to meet all the information and communication needs With our dedication and hard work, we made immense growth in the industry and are now in 2021. Our team of talented, dynamic, and young professionals is capable of providing high-end quality solutions to our clients with the right blend of technology, domain knowledge, and effective methodology.</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="img-desc">
                                <div className="rmd-img"> <img src={ImageAgency} alt="" /> </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* <!-- testimonial Open --> */}
            <section className="testimnls">
                <div className="testimonial wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container-fluid">
                        <div className="section-header text-center">
                            <h2>Testimonial</h2>
                            <p>Our Client Say!</p>
                        </div>
                        {/* -----------------------Start Product Slider------------------- */}
                        <div className="container text-center my-3">
                            <div className="row mx-auto my-auto justify-content-center">
                            <OwlCarousel {...options}>  

                            <div>
                                           
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>American University of Barbados</h3>
                                                        <p> Heart felt & sincere congratulations to the Team Criterion Tech for a well done job. I'm pleased to say that we finally recruited a professional team that worked closely with us during the process, staying on assignment, on target, and on budget. I appreciate their simple and courteous answers as well. I recommend their service quite highly!</p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgAub} alt="" /> </div>
                                                </div>
                                            
                                        </div>
                                        <div>
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Era's Lucknow Medical College & Hospital</h3>
                                                        <p> I am really impressed by the quality of services our company could obtain from Criterion Tech. You were always prompt with regards to the time frame, charged fair rates, were professional and courteous in dealing, and delivered products well before time. Because of your professionalism, our clientele and sales have both improved and I would certainly encourage others to patronise your services. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgDrk} alt="" /> </div>
                                                </div>
                                        </div>

                                        <div>
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Era's Lucknow College of management & Education</h3>
                                                        <p> We thank Criterion Tech for the wonderful job in helping us develop our software programs. Everyone was professional, excellent and hard working. The professionalism showcased by the team was commendable. We look forward to continue working with them in the future. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgLite} alt="" /> </div>
                                                </div>
                                        </div>
                                        <div>
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Era University</h3>
                                                        <p> We thank Criterion Tech team for the great work they have done to help us grow our software programme. A brilliant IT solutions provider. Everyone was talented, exceptional and hard at work. You helped us achieve our goal on time. Thanks to you guys and we look forward to continuing to work with you in the future as well. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgEu} alt="" /> </div>
                                                </div>
                                        </div>
                                        <div>
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Era's medical devices & Services Pvt Ltd.</h3>
                                                        <p> I wanted to take a moment to thank you for the services your team has provided while installing EDUMATION and developing other customized soft wares for us. It was a pleasurable experience working with criterion tech team. Very professional and timely approach. I hope we can continue to grow together. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgMdcl} alt="" /> </div>
                                                </div>
                                        </div>
                                        <div>
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Era's College of Pharmacy</h3>
                                                        <p> We are quite pleased to tell that patronizing criterion tech as our software developers was a great decision that we made some time back. The team is diligent, professional and a dedicated one. Having used the softwares developed for us, we feel confident to recommend Criterion Techas a reliable IT partner who supplied us with skilled technical staff. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgDrk} alt="" /> </div>
                                                </div>
                                        </div>
                                        <div>
                                           
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Era's College of Nursing</h3>
                                                        <p> We hired Criterion Tech services for developing some customized software solutions. The experience was very good and encouraging. The team completed all the work on the decided time and the services did not make a hole in our pocket too. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgDrk} alt="" /> </div>
                                                </div>
                                            
                                        </div>
                                        <div>
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Era's Institute of Allied Health Sciences & Research</h3>
                                                        <p> We want to express our gratitude to this great IT solutions companyfor their productive collaboration with us.When we were looking for a reliable software solutions company for our vast force of employee’s remote health care management application, we chose Criterion Techto provide us the same.Thanks to the team Criterion Tech. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgDrk} alt="" /> </div>
                                                </div>
                                            
                                        </div>
                                        <div>
                                                <div className="testimonial-item">
                                                    <div className="testimonial-text">
                                                        <h2>"</h2>
                                                        <h3>Dr. Ram Manohar Lohia Institute of Medical Sciences</h3>
                                                        <p> We thank you for the Remote Monitoring Dashboard System which has been installed at Ram Manohar Lohia Institute of Medical Sciences, Lucknow. The system consisting of dedicated hardware and software has enabled us to keep track of patients vitals at our control room in real time. </p>
                                                    </div>
                                                    <div className="testimonial-img"> <img src={ImgRamMnhr} alt="" /> </div>
                                                </div>
                                            </div>
      </OwlCarousel>  
                        </div>
                    </div>
                </div>
                </div>
            </section>
            {/* <!-- testimonial clossed --> */}
            {/* <!-- Achivement page open --> */}
            <section className="achivemnt">
                <div className="container-fluid">
                    <div className="row">
                        <div className="head-achive" style={{marginBottom: "50px"}}>
                            <h2>ACHIEVEMENTS</h2></div>
                            <OwlCarousel {...options}>  
        <div className='itemScroll'><a href="https://titc.industrylive.in/award-winners/" target='_blank'><img  className="img" src={Imgaward1}/></a></div>  
           <div className='itemScroll'><img  className="img" src={Imgaward2}/></div>  
           <div className='itemScroll'><img  className="img" src={Imgaward3}/></div>  
           <div className='itemScroll'><img  className="img" src= {Imgaward4}/></div>  
           <div className='itemScroll'><img  className="img" src= {Imgaward5}/></div>  
           <div className='itemScroll'><img  className="img" src= {Imgaward6}/></div>  
      </OwlCarousel> 
                        {/* <div className="col-sm-4">
                            <div className="">
                                <a href="#"> <img src="image/w2.webp" alt="" /> </a>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="">
                                <a href="https://titc.industrylive.in/award-winners/"> <img src={ImgAub} alt="" /> </a>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="">
                                <a href="https://www.jagran.com/technology/tech-news-criterion-tech-s-technology-remote-monitoring-dashboard-helps-doctors-to-monitor-patients-in-epidemics-22004109.html"> <img src="image/w4.webp" alt="" /> </a>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
