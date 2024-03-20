import React, { useEffect, useState } from 'react'
import GetAPIBedMaster from '../../Api/Master/BedMasterAPI/GetAPIBedMaster'
import PostAPIBedMaster from '../../Api/Master/BedMasterAPI/PostAPIBedMaster'
import DeleteAPIBedMaster from '../../Api/Master/BedMasterAPI/DeleteAPIBedMaster'
import PutAPIBedMaster from '../../Api/Master/BedMasterAPI/PutAPIBedMaster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import Toster from '../../../Component/Toster'
import user from "../../../assets/images/Navbar/user.svg"
import ValidationBedMaster from '../../../Validation/Admin/Master/ValidationBedMaster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import Heading from '../../../Component/Heading';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function BedMaster() {

    let [bedData, setBeddata] = useState([])
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();
    let [content, setContent] = useState('');
    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    //Handle Save
    let saveForm = async () => {
        
        let valresponse = ValidationBedMaster(sendForm.bedName)
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostAPIBedMaster(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setSendForm({ "userId": window.userId })
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
            // setSendForm({ "userId": window.userId })
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }

    }

    // get data from api
    let getdata = async () => {
        let response = await GetAPIBedMaster();
       
        if (response.status === 1) {
            setLoder(0)
            setBeddata(response.responseValue)
        }
    }

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }



    // get data for update 
    let handleUpdate = (id, bedname, userId) => {
    
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "bedName": bedname,
            "userId": userId,
        }))
        document.getElementById("bedName").value = bedname;
    }

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationBedMaster(sendForm.bedName)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutAPIBedMaster(sendForm)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                setUpdateBool(0)
                getdata()
                handleClear();
            }
            else {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }

        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        setShowUnderProcess(1);
        let obj = {
            id: rowId
        }
        let response = await DeleteAPIBedMaster(obj)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(response.responseValue)
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }

    //  clear data 
    let handleClear = () => {
        setSendForm({})
        document.getElementById("bedName").value = "";
        setSendForm({ "userId": window.userId })
    }


    // ######################### Chat Box
    let getUserListSection = document.querySelector(".userListSection");
    let getUserLists = document.getElementsByClassName("userList");
    let getUserWriteChatSection = document.querySelector(".userWriteChatSection");

    let btnOpenChatBox = () => {
        document.querySelector(".chatBox").style.display = "block";
    }

    let btnCloseChatBox = () => {
        document.querySelector(".chatBox").style.display = "none";
    }

    for (const getUserList of getUserLists) {
        getUserList.onclick = function () {
            getUserListSection.style.display = 'none'
            getUserWriteChatSection.style.display = 'block'
        }

        let getBtnBackUserWriteChat = document.querySelector(".btnBackUserWriteChat");
        getBtnBackUserWriteChat.onclick = function () {
            getUserListSection.style.display = 'block'
            getUserWriteChatSection.style.display = 'none'
        }

    }


    useEffect(() => {
        getdata();

        ///################### table row ative
        let getTableRows = document.querySelectorAll('.med-table tbody tr');
        for (const getTableRow of getTableRows) {
            getTableRow.addEventListener("click", function () {
                // alert('Hello');                 
                resetTableRows();
                getTableRow.classList.add("active");
            });
        }

        function resetTableRows() {
            for (const getTableRow of getTableRows) {
                getTableRow.classList.remove("active");
            }
        }
        setContent(JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList[0].subMenuList[0].content)
    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Bed_Master")} </div>
                                {/* <div className="title">{content} </div> */}
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            <label htmlFor="bedName" className="form-label">{t("Bed_Name")}<span className="starMandatory">*</span></label>
                                            <input type="email" className="form-control form-control-sm" id="bedName" placeholder={t("Enter_Bed_Name")} name="bedName" onChange={handleChange} />
                                        </div>

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                                    <>
                                                        {showToster === 1 ?
                                                            <Toster value={tosterValue} message={tosterMessage} />

                                                            : <div>
                                                                {updateBool === 0 ?
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />{t("Save")} </button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
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
                                <Heading text={t("Bed_Master_List")} />
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
                                            <th>{t("Bed_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bedData && bedData.filter((val) => `${val.bedName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((key, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.bedName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(key.id, key.bedName) }}><img src   ={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
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
                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}



                {/* ############### Chat box start here ############# */}


                <div className="chatBox">
                    <i className="bi bi-x-octagon-fill iconCloseChatBox" title='Close Window' onClick={btnCloseChatBox}></i>

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
            {/* <Loder val={loder} /> */}




        </>
    )
}
