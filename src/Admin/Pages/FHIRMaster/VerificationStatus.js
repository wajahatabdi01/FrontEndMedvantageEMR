import { useEffect, useState } from "react";
import GetVerificationStatusFile from "../../Api/FHIRMasterAPI/ClassificationType/GetVerificationStatusFile";
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import Heading from '../../../Component/Heading';
import { useTranslation } from 'react-i18next';
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import Toster from '../../../Component/Toster'
import i18n from "i18next";



function VerificationStatus() {

   let[verificationStatus,setVerificationStatus] = useState([]);
   let [updateBool, setUpdateBool] = useState(0)
   let [showUnderProcess, setShowUnderProcess] = useState(0)
   let [showToster, setShowToster] = useState(0)
   let [tosterMessage, setTosterMessage] = useState("")
   let [tosterValue, setTosterValue] = useState(0)
   const [searchTerm, setSearchTerm] = useState('');
   const { t } = useTranslation();
   let [content, setContent] = useState('');
   let[sendForm,setSendForm] = useState({
    name : '',
    value : ''
   });

  const getverification = async()=> {
    let response = await GetVerificationStatusFile();
    if(response.status === 1){
        setVerificationStatus(response.responseValue)
    }
  }

  const handlechange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setSendForm((sendForm)=>({
        ...sendForm,
       [name] : value,
    }));
  }

  const handleSearch = (event)=>{
    setSearchTerm(event.target.value)
  }

  const handleSubmit = ()=> {

  }

  const handleUpdate = ()=> {

  }

  const handleDelete = ()=> {

  }

  useEffect(()=>{
    getverification();
  },[])

  return (
   <>
     <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("VerificationStatus")}</div>
                                {/* <div className="title">{content} </div> */}
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            <label htmlFor="name" className="form-label">{t("NAME")}<span className="starMandatory"></span></label>
                                            <input type="name" className="form-control form-control-sm" id="name" value={sendForm.name} placeholder={t("Enter Name")} name="name" onChange={handlechange} />
                                        </div>
                                        <div>
                                          <label htmlFor="code" className="form-label">{t("Code")}<span className="starMandatory"></span></label>
                                          <input type="text"  className="form-control form-control-sm" id="Code" value={sendForm.code} placeholder={t("Enter Code")} name="code" onChange={handlechange}/>
                                        </div>

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                    <>
                                                        {showToster === 1 ?
                                                            <Toster value={tosterValue} message={tosterMessage} />

                                                            : <div className="ms-2">
                                                                {updateBool === 0 ?
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSubmit}><img src={saveButtonIcon} className='icnn' />{t("Save")} </button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={"handleClear"}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleUpdate}>{t("UPDATE")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { "setUpdateBool"(0); "handleClear"() }}>{t("Cancel")}</button>
                                                                    </>
                                                                }
                                                            </div>}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className='handlser'>
                                <Heading text={t("")} />
                                {/* <Heading text={content} /> */}
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>

                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")} </th>
                                            <th>{t("NAME")}</th>
                                            <th>{t("Code")}</th>
                                            <th className="text-center" style={{ "width": "10%" }}>{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {verificationStatus && verificationStatus.filter((val) => `${val.name}`.toLowerCase().includes(searchTerm.toLowerCase())).map((key, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.name}</td>
                                                    <td>{key.code}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { "handleUpdate"(key.id, key.Name) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { "setRowId"(key.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">

                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">{t("Delete")}</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}



                {/* ############### Chat box start here ############# */}


                <div className="chatBox">
                    <i className="bi bi-x-octagon-fill iconCloseChatBox" title='Close Window' onClick={"btnCloseChatBox"}></i>

                    {/* <div className="userListSection">
                        <div className="chatBoxHeader px-3">
                            <div className="title py-2">Messages</div>
                            <div className="searchBox py-2 relative">
                                <input type="search" name="" id="" placeholder='Search' title='Search user...' />
                                <i className="bi bi-search"></i>
                            </div>
                        </div>

                        <div className="userListInnerSection">
                            <div className="userList">
                                <div className="userImg">
                                    <img src={user} alt="" />
                                </div>
                                <div className="userDetails">
                                    <div className="name">Md Ijaharuddin khan</div>
                                    <div className="lastChatText">Last Chat Text</div>
                                </div>
                            </div>

                            <div className="userList">
                                <div className="userImg">
                                    <img src={user} alt="" />
                                </div>
                                <div className="userDetails">
                                    <div className="name">Md Nasir Ali khan</div>
                                    <div className="lastChatText">Last Chat Text</div>
                                </div>
                            </div>


                            <div className="userList">
                                <div className="userImg">
                                    <img src={user} alt="" />
                                </div>
                                <div className="userDetails">
                                    <div className="name">Md Arif Ali</div>
                                    <div className="lastChatText">Last Chat Text</div>
                                </div>
                            </div>
                        </div>

                    </div> */}
                    {/* ############# End of userListSection */}

                    {/* <div className="userWriteChatSection">
                        <div className="chatBoxHeader px-3">
                            <i className="bi-arrow-return-left btnBackUserWriteChat" title='Previous'></i>
                            <div className="chatUserNameImg">
                                <div className="nameDesignation">
                                    <div className="name">Md Ijaharuddin khan</div>
                                    <div className="designation">Frontend Software Developer</div>
                                </div>
                                <div className="img"><img src={user} alt="" /></div>
                            </div>
                        </div>

                        <div className="chattingSection px-3">

                            <div className="chatMe" title='Outgoing From here.'>
                                <div className="time">15:36 PM</div>
                                <div className="chat">
                                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. </span>
                                </div>
                            </div>

                            <div className="chatYou" title='Incoming from there.'>
                                <div className="time">15:37 PM</div>
                                <div className="chat"><span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat cupiditate laboriosam </span></div>
                            </div>

                            <div className="chatMe" title='Outgoing From here.'>
                                <div className="time">15:38 PM</div>
                                <div className="chat">
                                    <span>Lorem ipsum dolor. </span>
                                </div>
                            </div>

                            <div className="chatYou" title='Incoming from there.'>
                                <div className="time">15:40 PM</div>
                                <div className="chat"><span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat cupiditate laboriosam.  </span></div>
                            </div>


                            <div className="chatMe" title='Outgoing From here.'>
                                <div className="time">15:38 PM</div>
                                <div className="chat">
                                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat cupiditate laboriosam. Lorem</span>
                                </div>
                            </div>

                        </div>

                        <div className="inputWriteSection px-3 pt-2">
                            <div className="inputWriteSectionInnerItems">
                                <textarea name="" id="" rows="1" placeholder='Start Chat...' title='Write as you want...'></textarea>
                                <button title='Send'><i className="bi bi-send-fill"></i></button>
                            </div>
                        </div>



                    </div> */}


                    {/* ############# End of userWriteChatSection */}

                </div>


                {/*####### End of chatBox */}

                {/*####### Chat Button */}
                {/* <div className="chat-btn" title='Start Chat' onClick={btnOpenChatBox}> <i className="bi bi-chat-left-dots"></i></div> */}

            </section>
   </>
  )
}

export default VerificationStatus;
