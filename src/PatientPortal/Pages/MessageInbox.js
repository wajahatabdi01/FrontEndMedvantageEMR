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
import send_btnn from '../../assets/images/dashboard/send.svg';
import TextEditor from '../../Component/TextEditor';


export default function MessageInbox() {
    const [ismsgRead, setismsgRead] = useState(0)
    const [isShowCompose, setisShowCompose] = useState(0)

    const [getremarkmsg, setremarkmsg] = useState('');

    const handleTextboxChange = (event) => {
        if (event.target.name === "remarkmsg") {
            setremarkmsg(event.target.value);
            console.log('SetValue in TextBox',getremarkmsg)
        }
    };
    const handleOnMsgClikc = () => {
        setismsgRead(1)
    }
    const handleCloseMsg = () => {
        setismsgRead(0)
    }

    const handleShowCompose = () => {
        setisShowCompose(1)
    }
   

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className={`${ismsgRead === 1 ? 'col-md-6 col-sm-12 ' : 'col-md-12 col-sm-12 custom-animation'}`}>
                            <div className='med-box'>
                                <div className='inner-content'>
                                    <div className='inboxheadingmain mt-1'>
                                        <div className="inbox-headingg">Inbox Messages<span className='fontt'>(8/55)</span></div><div className='rightt'> <span> <img src={refresh_icon} alt="" /></span>
                                            <div><img src={pencil_icon} alt="" /> <button type='button' onClick={handleShowCompose}> Compose</button> </div></div>
                                    </div>

                                    <div className='lft-mesg-part'>
                                        <div className='inboxdiv-striped' onClick={handleOnMsgClikc}>
                                            <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                                <div className='profile-details1'>
                                                    <div className='mt-2'> <input type="checkbox" name="" value="" /></div>
                                                    <div><img src={doctor_profile} alt="" /></div>
                                                    <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
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
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
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
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
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
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
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
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
                                                    </div>
                                                </div>
                                                <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                            </div>
                                            <div className='profile-txtmtr px-4 ms-5 mt-1 mb-1 pb-1'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>

                                        </div>
                                        <div className='inboxdiv-striped'>
                                            <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                                <div className='profile-details1'>
                                                    <div className='mt-2'> <input type="checkbox" name="" value="" /></div>
                                                    <div><img src={doctor_profile2} alt="" /></div>
                                                    <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
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
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
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
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
                                                    </div>
                                                </div>
                                                <div className='profl-dated'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                            </div>
                                            <div className='profile-txtmtr px-4 ms-5 mt-1 pb-1'> Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {ismsgRead === 1 ? (
                            <div className='col-md-6 col-sm-12 custom-animation' >
                                <div className='med-box'>
                                    <div className='inner-content'>
                                        <div className='rht-mesg-part'>
                                            <div className='d-flex justify-content-between mt-3 ps-1 pt-2'>
                                                <div className='profile-details1'>
                                                    <div className='arowlft mt-2'><i class="bi bi-arrow-left" onClick={handleCloseMsg}></i> </div>
                                                    <div><img src={doctor_profile} alt="" /></div>
                                                    <div className='doctr-profl'>Dr. Vijay Kumar Goel
                                                        <div className='handsurgery'><em>Hand Reconstruction Surgery</em></div>
                                                    </div>
                                                </div>
                                                <div className='profl-dated ms-2'><img src={time_profile} /> 02 Nov, 23 05:55:19</div>
                                            </div>
                                            <hr></hr>
                                            <div className='handsurgery1 px-2 ps-2'>Sub- Hand Reconstruction Surgery</div>
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
                            </div>
                        ) : ''}

                    </div>
                </div>

                {/* -----------------------Start Compose Modal Popup-------------------    */}

                {isShowCompose === 1 ?
                    <div className={`modal d-${isShowCompose === 1 ? "block" : ""}`} id="EditModal" data-bs-backdrop="static">

                        <div className="modal-dialog modal-lg">

                            <div className="modal-content p-0">

                                <div className="modal-header pt-2 pb-2">

                                    <h1 className="modal-title fs-5 text-white " id="exampleModalLabel">Compose Message </h1>

                                    <button type="button" className="btn-close_ btnModalClose" title="Close Window" onClick={() => { setisShowCompose(0) }}>
                                        <i className="bi bi-x-octagon"></i>
                                    </button>
                                </div>

                                <div className="modal-body p-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="med-box">
                                                <div className="inner-content">
                                                    <div className="row">
                                                        <div className='col-12'>
                                                            <div className='messg-popup pt-2 pb-2'>
                                                                <div className='messg-popup-details'>
                                                                    <label>To</label>
                                                                    <input type='text' placeholder='sabiha'></input>
                                                                </div>
                                                                <div className='messg-popup-details'>
                                                                    <label>Subject</label>
                                                                    <input type='text' placeholder='Hand Reconstruction Surgery'></input>
                                                                </div>                                                              
                                                            </div>  
                                                       <div className='texteditor'>
                                                       <TextEditor getTextvalue={handleTextboxChange} setValue={getremarkmsg} name="remarkmsg" id="remarkmsg"/>  
                                                       </div>                                                  
                                                            <div className='rightt mt-2 mb-2'>
                                                               <div> <button type='button'> <img src={send_btnn} alt=""/> Send </button></div>
                                                            </div>
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





                {/* -----------------------End Compose Modal Popup---------------------  */}

            </section>

        </>
    )
}
