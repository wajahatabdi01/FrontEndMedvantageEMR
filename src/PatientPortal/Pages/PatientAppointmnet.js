import React, { useState, useEffect } from 'react';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import doctorIcon from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 137.png'
import locationIcon from '../../assets/images/dashboard/location-pin.svg'
import clockIcon from '../../assets/images/dashboard/Layer 2 (1).svg'
import medAssicon from '../../assets/images/icons/medical-assistance.svg'
import doctorIcon1 from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 136.png'
import doctorIcon2 from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 134.png'
import closeIcon from '../../assets/images/dashboard/Group 8147.svg'
import doctorIcon4 from '../../assets/images/dashboard/Web 1920 – 13/Mask Group 136@2x.png'
import rupeeIcon from '../../assets/images/dashboard/currency-rupee.svg'
import calenIcon from '../../assets/images/dashboard/Layer 93.svg'
import leftArrIcon from '../../assets/images/dashboard/Group 17477.svg'
import rightArrIcon from '../../assets/images/dashboard/Group 17478.svg'
import locationimg from '../../assets/images/dashboard/patientPortalDashboard/location-pin.png'


function PatientAppointmnet() {
    const currentDate = new Date()
    let [isShowIssueModel, setIsShowIssueModel] = useState(0);
    let [bookingDate, setsetbookingDate] = useState([]);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null); 
    const [MorningTime, setMorningTime] = useState(null); 
    const [AfternoonTime, setAfternoonTime] = useState(null); 
    const [showViewProfile, setshowViewProfile] = useState(0); 
    const [overview, setshowoverview] = useState(true); 
    const [location, setlocation] = useState(false); 
    const [reviews, setreviews] = useState(false); 
    const [buisnesshour, setbuisnesshour] = useState(false); 
    const [appointmentmonth, setappointmentmonth] = useState(currentDate.getMonth()); 
    const [appointmentyear, setappointmentyear] = useState(currentDate.getFullYear()); 
    
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    const bookingdates = [
        {'days' : 'Mon' , 'date' : '30'},
        {'days' : 'Tue', 'date' : '01'},
        {'days' : 'Wed', 'date' : '02'},
        {'days' : 'Thu', 'date' : '03'},
        {'days' : 'Fri', 'date' : '04'},
        {'days' : 'Sat', 'date' : '05'},
        {'days' : 'Sun', 'date' : '06'},
    ]
    const morningbookingTime = [
        {'Time' : '08:00'},
        {'Time' : '08:30'},
        {'Time' : '09:00'},
        {'Time' : '09:30'},
        {'Time' : '10:00'},
        {'Time' : '10:30'},
        {'Time' : '11:00'},
    ]

    const afternoonbookingTime = [

        {'Time' : '12:00'},
        {'Time' : '12:30'},
        {'Time' : '01:00'},
        {'Time' : '01:30'},
        {'Time' : '02:00'},
        {'Time' : '02:30'},
        {'Time' : '03:00'},
        {'Time' : '03:30'},
        {'Time' : '04:00'},
        {'Time' : '04:30'},
        {'Time' : '05:00'},
        {'Time' : '05:30'},
        {'Time' : '06:00'},
        {'Time' : '06:30'},
        {'Time' : '07:00'},
        {'Time' : '07:30'},
    ]
    

   
    const handleOnDayClick=(index)=>{
        setSelectedButtonIndex(index);
    }
    const handleMorningtime=(index)=>{
        setMorningTime(index);
    }

    const handleAfternoontime=(index)=>{
        setAfternoonTime(index)
    }

    const handleoverview=()=>{
        setshowoverview(true)
        setbuisnesshour(false)
        setlocation(false)
        setreviews(false)
    }
    const handlelocation=()=>{
        setshowoverview(false)
        setbuisnesshour(false)
        setlocation(true)
        setreviews(false)
    }
    const handlereview=()=>{
        setshowoverview(false)
        setbuisnesshour(false)
        setlocation(false)
        setreviews(true)
    }
    const handlebuisnesshour=()=>{
        setshowoverview(false)
        setbuisnesshour(true)
        setlocation(false)
        setreviews(false)
    }


    const handleMonthChange = (newMonth) => {

        if (newMonth < 0) {
          setappointmentmonth(11);
          setappointmentyear(appointmentyear - 1);
        }

        else if (newMonth > 11) {
            setappointmentmonth(0);
            setappointmentyear(appointmentyear + 1);
        }
 
        else {
            setappointmentmonth(newMonth);
        }
      };
    return (
        <section className='main-content mt-5 pt-3'>
            <div className='container-fluid'>

                <div className='row'>
                    <div className="col-12">
                        <div className='whitebg' style={{ margin: "0 0 10px 0" }}>

                            <div className="col-md-12 col-sm-12 analuze" >
                                <div className="fieldsett-in">
                                    <div className="fieldsett">
                                        <span className='Appoin'>{"Appointment"}</span>
                                        <BoxContainer>




                                            <div className="col-xxl-2 col-xl-2 col-lg-4 col-md-4 mb-3">
                                                <div>
                                                    <img src={medAssicon} alt="" className="doctor-interface-icn" /> <label htmlFor="doctorSpecty" className="DoctQualtext">{"Doctor/Speciality"}<span class="starMandatory"></span></label>
                                                    <input type='text' className='textBoxAppoint form-control form-control-sm' id='doctorSpecty' name='doctorSpecty' placeholder={"Enter Doctor & Speciality"} />
                                                </div>
                                            </div>

                                            <div className="mb-2 my-4 ms-2">
                                                <div className='searchbtnn'>
                                                    <button ><i className='fa fa-search'></i>{"Search"}</button>
                                                </div>
                                            </div>


                                        </BoxContainer>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid'>

                <div className='row'>
                    {/* <div className="col-12">
                        <div className='tableHead-1'>
                           
                        Recently Searched
                        </div>
                    </div> */}
                    <div className="col-12">
                        <div className='whitebg'>
                            <div className='tableHead-1'>

                                Recently Searched
                            </div>
                            <div className="med-table-section" style={{ "height": "581px", position: 'relative', overflow: 'auto' }}>

                                <TableContainer>


                                    <tbody>



                                        <tr>
                                            <td>
                                                <div className="doctor-details-main">
                                                    <div><img src={doctorIcon} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='doctor-action-main d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="profile mb-1 me-1" data-bs-placement="bottom" onClick={()=>setshowViewProfile(1)}>View profile</button>
                                                    <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1" data-bs-placement="bottom" onClick={() => { setIsShowIssueModel(1) }}>Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center doctor-address-main'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>


                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon1} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='doctor-action-main d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon2} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='doctor-action-main d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>

                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon1} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='doctor-action-main d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon2} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='doctor-action-main d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="d-flex mx-1 mt-1">
                                                    <div><img src={doctorIcon} alt="" /></div>


                                                    <div class=''>
                                                        <div className='DoctNametext mx-2'>Dr. Harshita Mishra</div>
                                                        <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                        <div className='DoctFeed mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                    </div>
                                                </div>

                                            </td>

                                            <td>
                                                <div className='doctor-action-main d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="profile mb-1 me-1">View profile</button>
                                                    <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                </div>
                                                <div className='d-flex justify-content-end align-items-center'>
                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                </div>

                                            </td>



                                        </tr>






                                    </tbody>
                                </TableContainer>




                            </div>
                        </div>
                    </div>
                </div>






            </div>

            {isShowIssueModel === 1 ?
                <div className={`modal d-${isShowIssueModel === 1 ? "block" : ""}`} id="BookAppointModal" data-bs-backdrop="static">

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content p-0">

                            <div className="modalBookAppoint-header">

                                <h1 className="modalPopUpTextHeader" id="exampleModalLabel">Book Appointment</h1>

                                <button type="button" className="btnModalAppointClose" title="Close Window" onClick={() => { setIsShowIssueModel(0) }}>

                                    <img src={closeIcon} alt="" />

                                </button>

                            </div>

                            <div className="modal-body p-0">

                                <div className="row">

                                    <div className="col-12">

                                        <div className="med-box">
                                            <div className="inner-content mb-4 inner-content-responsive">
                                                <div className="row">

                                                    <div className='booking-main-interface d-flex justify-content-between align-items-center'>
                                                        <div className='d-flex'><img className='modalImagePop' src={doctorIcon4} alt="" />

                                                            <div class='mt-4 mx-2'>
                                                                <div className='DoctNametext mx-2'>Dr. Vijay Kumar Goel</div>
                                                                <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                                <div className='locationtext1 mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                                <div className='d-flex mx-2'>
                                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className='align-items-end'>
                                                            <div className='mt-3 doctor-fees'>
                                                            <i class="bi bi-currency-rupee"></i>500 Rs
                                                            </div>
                                                            <div className='mt-5'>
                                                                <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                               

                                                    <div className='horizontal-line custom-line'></div>
                                               

                                                 <div className="row">
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div className='chooseText'>Choose Date & Time</div>
                                                        <div className='align-items-end appointment-date-range'>
                                                            <img src={calenIcon} alt="" className='mb-1 me-1' style={{width: "14px"}} />{monthNames[appointmentmonth]} {appointmentyear}<img src={leftArrIcon} alt="" className="ms-1" style={{cursor: 'pointer'}} onClick={() => handleMonthChange(appointmentmonth - 1)}/> <img src={rightArrIcon} alt=""  onClick={() => handleMonthChange(appointmentmonth + 1)} style={{cursor: 'pointer'}} />
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="row mt-2 mb-3">
                                                    <div className='d-flex'>
                                                    {bookingdates && bookingdates.map((val , index)=>{
                                                        return(
                                                            <>
                                                            <button type='button' key={index} className={`'btn btn ${selectedButtonIndex  === index ? "choosedDay mx-1" : "appnt-day mx-1"} `} onClick={() => handleOnDayClick(index)}>{val.days}<br/> <span className={`${selectedButtonIndex  === index ? 'appnt-day-selected' : 'appint-date'}`} >{val.date}</span></button>
                                                            </>
                                                        )
                                                    })}


                                                    </div>
                                                </div>
                                              <div className='row mt-2'>
                                                    <div className='mortxt'>Morning</div>
                                                </div> 

                                                <div className='row mt-2'>
                                                <div className='d-flex'style={{gap: '10px'}}>
                                                   {morningbookingTime && morningbookingTime.map((val,index)=>{
                                                    return(
                                                        <button type='button' className={`btn btn ${MorningTime === index ? 'ddSpace-selected' : 'ddSpace'}`} onClick={()=>handleMorningtime(index)}>{val.Time}</button>
                                                    )
                                                   })}
                                                            
                                                     
                                                        

                                                </div>
                                            </div>
                                              <div className='row mt-2'>
                                                    <div className='mortxt'>Afternoon</div>
                                                </div> 

                                                <div className='row mt-2'>
                                                <div className='d-flex flex-wrap' style={{gap: '10px'}}>
                                                   {afternoonbookingTime && afternoonbookingTime.map((val,index)=>{
                                                    return(
                                                        <button type='button' className={`btn btn ${AfternoonTime === index ? 'ddSpace-selected' : 'ddSpace'}`} onClick={()=>handleAfternoontime(index)}>{val.Time}</button>
                                                    )
                                                   })}
                                                            
                                                     
                                                        

                                                </div>
                                            </div>
                                            </div>


                                        </div>

                                    </div>

                                </div>

                            </div>



                        </div>

                    </div>

                </div> : ''
            }



            {showViewProfile === 1 ?
                <div className={`modal d-${showViewProfile === 1 ? "block" : ""}`} id="viewProfileModal" data-bs-backdrop="static">

                    <div className="modal-dialog modal-lg">

                        <div className="modal-content p-0">

                            <div className="modalBookAppoint-header">

                                <h1 className="modalPopUpTextHeader" id="exampleModalLabel">View Profile</h1>

                                <button type="button" className="btnModalAppointClose" title="Close Window" onClick={() => { setshowViewProfile(0) }}>

                                    <img src={closeIcon} alt="" />

                                </button>

                            </div>

                            <div className="modal-body p-0">

                                <div className="row">

                                    <div className="col-12">

                                        <div className="med-box">
                                            <div className="inner-content mb-4 inner-content-responsive">
                                                <div className="row">

                                                    <div className='booking-main-interface d-flex justify-content-between align-items-center'>
                                                        <div className='col-xxl-8 col-xl-8 col-lg-8 col-md-8 d-flex'><img className='modalImagePop' src={doctorIcon4} alt="" />

                                                            <div class='mt-4 mx-2'>
                                                                <div className='DoctNametext mx-2'>Dr. Vijay Kumar Goel</div>
                                                                <div className='DoctQualtext mx-2 my-1'>MBBS, Gastrologist-6 Years of Experience</div>
                                                                <div className='locationtext1 mx-2'><i class="ratingStar bi bi-star-fill"> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar bi bi-star-fill" /> <i class="ratingStar1 bi bi-star-fill" /></i> (10 Feedback)</div>
                                                                <div className='d-flex mx-2'>
                                                                    <div className='locationtext1 mt-2'><img src={locationIcon} alt="" /> Sarfarazganj Lucknow</div>
                                                                    <div className='locationtext1 mx-1 mt-2'><img src={clockIcon} alt="" /> Mon-Sat, 2:00PM-8:00PM</div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className='align-items-end'>
                                                            <div className='mt-3 doctor-fees'>
                                                            <i class="bi bi-currency-rupee"></i>500 Rs
                                                            </div>
                                                            <div className='mt-5'>
                                                                <button type="button" className="Appoint btn-Appoint-fill mb-1 me-1">Book Appointment</button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                    <div className='horizontal-line custom-line'></div>

                                                    <div className='profile-buttons-main mb-3'>
                                                        <button type='button'  className={overview === true ? "profile-btn-active" : 'profile-btn-inactive'} onClick={handleoverview}>Overview</button>
                                                        <button type='button' className={location === true ? "profile-btn-active" : 'profile-btn-inactive'} onClick={handlelocation}>Location</button>
                                                        <button type='button' className={reviews === true ? "profile-btn-active" : 'profile-btn-inactive'} onClick={handlereview}>Reviews</button>
                                                        <button type='button' className={buisnesshour === true ? "profile-btn-active" : 'profile-btn-inactive'} onClick={handlebuisnesshour}>Buisness Hour</button>
                                                    </div>
                                                    {overview && (
                                                        <>
                                                        <div className='overviewheading '>About</div>
                                                        <div className='mb-3 overview-text'>Dr. Vijay Kumar Goel is one of the most renowned orthopaedic surgeons who has established a beyond reproach reputation not only in India but overseas as well. Currently serving as the Chief Joint Replacement Surgeon & Director of Orthopaedics at Healthians Research Centre, New Delhiachieved a staggering 20,000 successful joint replacement surgeries, which include complex and revision total joint replacements.</div>
                                                        <div className='overviewheading mb-1'>Experience</div>
                                                        <div className='overview-text'>MD ( Gastrologist)</div>
                                                        <div className='overview-text'>Era Medical Clg(6 Yr)</div>
                                                        </>
                                                        
                                                        
                                                    )}
                                                    {location && (
                                                        <>
                                                        <div className='location-text mb-3'><img src={locationimg} className='me-1' alt=""/>Era Medical College Sarfarazganj Lucknow</div>
                                                        <div>
                                                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.791679137049!2d80.86999837543829!3d26.878358976667638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3999558a0ae6790b%3A0x81b74fcf0a60d2c5!2sERA&#39;s%20Lucknow%20Medical%20College%20%26%20Hospital!5e0!3m2!1sen!2sin!4v1708683172124!5m2!1sen!2sin" width="750" height="229"   allowfullscreen="" loading="lazy" title="Doctor Location" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                                        </div>
                                                        </>
                                                    )}

                                                    {reviews && (
                                                        <>
                                                         <div className='overviewheading fw-500'>Write a Review</div>
                                                         <div>
                                                            <i class="reviewstar bi bi-star-fill"> <i class="reviewstar bi bi-star-fill" /> <i class="reviewstar bi bi-star-fill" /> <i class="reviewstar bi bi-star-fill" /> <i class="reviewstar bi bi-star-fill" /></i>
                                                         </div>
                                                         <div className='review-text-box mb-4'>
                                                            <input type='text' placeholder='Enter Your Review' className='form-control'/>
                                                         </div>

                                                         <div className='d-flex justify-content-end  mb-4'>
                                                         <button type="button" className="btn btn-clear btn-sm mb-1 me-1" ><img src={clearIcon} className='icnn' />Clear</button>
                                                         <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" ><img src={saveButtonIcon} className='icnn' />Submit</button>
                                                         </div>
                                                        </>
                                                        
                                                         
                                                    )}
                                                    
                                                    {buisnesshour && (
                                                        <>
                                                         <div className='buisnesshour-box mb-4'>
                                                           <div className='d-flex gap-5 mb-2'>
                                                            <div className='buinesshour-day'>Monday</div>
                                                            <div className='buisnesshour-time'>2:00PM-8:00PM</div>
                                                           </div>
                                                           <div className='d-flex gap-5 mb-2'>
                                                            <div className='buinesshour-day'>Tuesday</div>
                                                            <div className='buisnesshour-time text-danger fw-bold'>closed</div>
                                                           </div>
                                                           <div className='d-flex gap-5 mb-2'>
                                                            <div className='buinesshour-day'>Wednesday</div>
                                                            <div className='buisnesshour-time'>2:00PM-8:00PM</div>
                                                           </div>
                                                           <div className='d-flex gap-5 mb-2'>
                                                            <div className='buinesshour-day'>Friday</div>
                                                            <div className='buisnesshour-time'>2:00PM-8:00PM</div>
                                                           </div>
                                                           <div className='d-flex gap-5 mb-2'>
                                                            <div className='buinesshour-day'>Saturday</div>
                                                            <div className='buisnesshour-time'>2:00PM-8:00PM</div>
                                                           </div>
                                                           <div className='d-flex gap-5 mb-2'>
                                                            <div className='buinesshour-day'>Sunday</div>
                                                            <div className='buisnesshour-time'>2:00PM-8:00PM</div>
                                                           </div>
                                                        
                                                         </div>
                                                        </>
                                                    )}
  
                                               </div>


                                        </div>

                                    </div>

                                </div>

                            </div>



                        </div>

                    </div>

                </div> : ''
            }

        </section>

    )
}


export default PatientAppointmnet



