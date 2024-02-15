import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import pencil_icon from '../../assets/images/dashboard/pencil-iconn.svg';
import refresh_icon from '../../assets/images/dashboard/refresh-icon.svg';
import time_profile from '../../assets/images/dashboard/time-profile.svg';
import doctor_profile from '../../assets/images/dashboard/doc-profile1.png';
import doctor_profile2 from '../../assets/images/dashboard/doc-profile2.png';
import doctor_profile3 from '../../assets/images/dashboard/doc-profile3.png';


export default function MessageInbox() {
    const [ismsgRead, setismsgRead] = useState(0)

    const handleOnMsgClikc = () => {
        setismsgRead(1)
        console.log("success")
       
    }

    const handleCloseMsg=()=>{
        setismsgRead(0)
    }
useEffect(() => {
   
},[])

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className={`${ismsgRead === 1 ? 'col-6 custom-animation' : 'col-12 custom-animation'}`}>
                            <div className='med-box'>
                                <div className='inner-content'>
                                    <div className='inboxheadingmain mt-2'>
                                        <div className="inbox-headingg">Inbox Messages<span className='fontt'>(8/55)</span></div><div className='rightt'> <span> <img src={refresh_icon} alt="" /></span> <div><img src={pencil_icon} alt="" /> <button type='button'> Compose</button> </div></div>
                                    </div>
                                    <div className='inboxdiv-striped' onClick={handleOnMsgClikc}>
                                        <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                            <div className='profile-details1'>
                                                <div className='mt-2'> <input type="checkbox" name="" value="" /></div>
                                                <div><img src={doctor_profile} alt="" /></div>
                                                <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                    <div><em>Hand Reconstruction Surgery</em></div>
                                                </div>
                                            </div>
                                            <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                        </div>
                                        <div className='profile-txtmtr px-4 ms-5 mt-1 pb-1'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
                                    </div>

                                    <div className='inboxdiv-striped'>
                                        <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                            <div className='profile-details1'>
                                                <div className='mt-2'> <input type="checkbox" name="" value="" /></div>
                                                <div><img src={doctor_profile2} alt="" /></div>
                                                <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                    <div><em>Hand Reconstruction Surgery</em></div>
                                                </div>
                                            </div>
                                            <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                        </div>
                                        <div className='profile-txtmtr px-4 ms-5 mt-1 pb-1'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
                                    </div>

                                    <div className='inboxdiv-striped'>
                                        <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                            <div className='profile-details1'>
                                                <div className='mt-2'> <input type="checkbox" name="" value="" /></div>
                                                <div><img src={doctor_profile3} alt="" /></div>
                                                <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                    <div><em>Hand Reconstruction Surgery</em></div>
                                                </div>
                                            </div>
                                            <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                        </div>
                                        <div className='profile-txtmtr px-4 ms-5 mt-1 pb-1'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
                                    </div>

                                    <div className='inboxdiv-striped'>
                                        <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                            <div className='profile-details1'>
                                                <div className='mt-2'> <input type="checkbox" name="" value="" /></div>
                                                <div><img src={doctor_profile2} alt="" /></div>
                                                <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                    <div><em>Hand Reconstruction Surgery</em></div>
                                                </div>
                                            </div>
                                            <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                        </div>
                                        <div className='profile-txtmtr px-4 ms-5 mt-1 pb-1'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
                                    </div>

                                    <div className='inboxdiv-striped'>
                                        <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                            <div className='profile-details1'>
                                                <div className='mt-2'> <input type="checkbox" name="" value="" /></div>
                                                <div><img src={doctor_profile} alt="" /></div>
                                                <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                    <div><em>Hand Reconstruction Surgery</em></div>
                                                </div>
                                            </div>
                                            <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                        </div>
                                        <div className='profile-txtmtr px-4 ms-5 mt-1 mb-1 pb-1'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>

                                    </div>
                                </div>
                            </div>
                        </div>
                         {ismsgRead === 1 ? (
                            <div className='col-6 p-0' id='messgpartid' >
                            <div className='med-box'>
                                <div className='inner-content'>
                                    <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                        <div className='profile-details1'>
                                        <div className='arowlft mt-2'><i class="bi bi-arrow-left" onClick={handleCloseMsg}></i> </div>
                                            <div><img src={doctor_profile} alt="" /></div>
                                            <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                <div><em>Hand Reconstruction Surgery</em></div>
                                            </div>
                                        </div>
                                        <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                    </div>
                                    <hr></hr>
                                    <div className='px-2 ps-2'>Sub-Hand Reconstruction Surgery</div>
                                    <div className='subjectts px-2 mb-2 mt-2'>Hello Shiva Mishra,</div>
                                    <div className='profile-txtmtr px-2 '> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore mag. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore mag.</div>
                                    <div className='profile-txtmtr px-2 mb-4 mt-2 '> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore mag. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</div>

                                    <div className='signfootr px-2 mb-2 mt-4'>
                                        <div className='signtxt'> Best Regards, </div>
                                        <div className='dr-txt'>Dr. Vijay Kumar Goel</div>
                                        <div className='dr-txt'>+91 9622488955</div>
                                    </div>

                                    <div className='messg-btnn'>
                                        <button type="button"><i class="bi-arrow-90deg-left"></i> Reply</button>
                                        <button type="button"><i class="bi-arrow-90deg-right"></i> Farward</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                         ) : ''}
                        
                    </div>
                </div>


                {/* -----------------------Start Delete Modal Popup-------------------    */}

                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">
                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                <div className='popDeleteContent'> Are you sure you want to delete?</div>
                            </div>
                            <div className="modal-footer1 text-center">
                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>

                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------End Delete Modal Popup---------------------  */}

            </section>

        </>
    )
}
