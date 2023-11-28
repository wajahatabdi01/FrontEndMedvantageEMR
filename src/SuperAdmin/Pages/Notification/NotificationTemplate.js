import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading';
import TableContainer from '../../../Component/TableContainer';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import TextEditor from '../../../Component/TextEditor';
import GetNotificationTemplate from '../../Api/Notification/NotificationTemplate/GetNotificationTemplate';
import PostNotificationTemplate from '../../Api/Notification/NotificationTemplate/PostNotificationTemplate';
import DeleteNotificationTemplate from '../../Api/Notification/NotificationTemplate/DeleteNotificationTemplate';

export default function NotificationTemplate() {

    let [templateList, setTemplateList] = useState([]);
    let [mailTemplate, setMailTemplate] = useState('');
    let [firebasetemplate, setFirebaseTemplate] = useState('');
    let [signalRtemplate, setSignalRTemplate] = useState('');
    let [whatsapptemplate, setWhatsappTemplate] = useState('');
    let [notificationTitle, setNotificationTitle] = useState('');

    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.superAdminUserId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };



    // Handle Save
    let handleSave = async () => {

        document.getElementById('errNotificationTitle').style.display = "none";
        document.getElementById('ErrMessage').style.display = "none";

        if (!notificationTitle || !notificationTitle.trim()) {
            document.getElementById('errNotificationTitle').innerHTML = "Please Enter Notification Title.";
            document.getElementById('errNotificationTitle').style.display = "block";
        } else if (
            !mailTemplate.trim() &&
            !firebasetemplate.trim() &&
            !signalRtemplate.trim() &&
            !whatsapptemplate.trim()
        ) {
            document.getElementById('ErrMessage').innerHTML = "At least one template should be filled.";
            document.getElementById('ErrMessage').style.display = "block";
        }

        else {
            const obj = {
                mailTemplate: mailTemplate,
                firebaseTemplate: firebasetemplate,
                signalRTemplate: signalRtemplate,
                whatsappTemplate: whatsapptemplate,
                userId: window.superAdminUserId,
            }
            setShowUnderProcess(1);
            const response = await PostNotificationTemplate(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Saved Successfully");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear(1);
                }, 2000)
                getdata();
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
    }

    //Get data
    let getdata = async () => {
        let getResponse = await GetNotificationTemplate();
        if (getResponse.status === 1) {
            setTemplateList(getResponse.responseValue)
        }
    }

    //Handle Change
    let handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        document.getElementById('errNotificationTitle').style.display = "none";
        document.getElementById('ErrMessage').style.display = "none";
        if (name === "notificationTitle") {
            setNotificationTitle(value)
        }
        if (name === "mailTemplate") {
            setMailTemplate(value)
        }
        if (name === "firebaseTemplate") {
            setFirebaseTemplate(value)
        }
        if (name === "signalRTemplate") {
            setSignalRTemplate(value)
        }
        if (name === "whatsappTemplate") {
            setWhatsappTemplate(value)
        }

    }

    //Handle Button Change
    let handleUpdate = async (id, notificationTitle, mailTemplate, firebaseTemplate, signalRTemplate, whatsappTemplate, superAdminUserId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "notificationTitle": notificationTitle,
            "mailTemplate": mailTemplate,
            "firebaseTemplate": firebaseTemplate,
            "signalRTemplate": signalRTemplate,
            "whatsappTemplate": whatsappTemplate,
            "userId": superAdminUserId,
        }))
        document.getElementById("notificationTitle").value = notificationTitle;
        document.getElementById("mailTemplate").value = mailTemplate;
        document.getElementById("firebaseTemplate").value = firebaseTemplate;
        document.getElementById("signalRTemplate").value = signalRTemplate;
        document.getElementById("superAdminUserId").value = superAdminUserId;
    }

    //Handle Clear
    let handleClear = () => {
        setSendForm({ "userId": window.superAdminUserId })
        setMailTemplate('')
        setFirebaseTemplate('')
        setSignalRTemplate('')
        setWhatsappTemplate('')
        setNotificationTitle('')
        setUpdateBool(0)
        document.getElementById("notificationTitle").value = "";
        document.getElementById('ErrMessage').style.display = "none";
        document.getElementById('errNotificationTitle').style.display = "none";
    }
    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteNotificationTemplate(rowId)
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

    useEffect(() => {
        getdata();
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text='Notification Template' />

                            <div className="" >
                                <small id="ErrMessage" className="form-text text-danger editErrorclss" style={{ display: 'none', background: '#fff' }}></small>
                            </div>
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="notificationTitle" className="form-label">Notification Title <span className="starMandatory">*</span></label>
                                    <input type="text" className="form-control form-control-sm" id="notificationTitle" name="notificationTitle" onChange={handleChange} placeholder="Enter notification title" />
                                    <small id="errNotificationTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="mailTemplate" className="form-label">Mail Template <span className="starMandatory">*</span></label>
                                    <TextEditor getTextvalue={handleChange} setValue={mailTemplate} name="mailTemplate" id="mailTemplate" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="firebaseTemplate" className="form-label">Firebase Template <span className="starMandatory">*</span></label>
                                    <TextEditor getTextvalue={handleChange} setValue={firebasetemplate} name="firebaseTemplate" id="firebaseTemplate" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="signalRTemplate" className="form-label">SignalR Template <span className="starMandatory">*</span></label>
                                    <TextEditor getTextvalue={handleChange} setValue={signalRtemplate} name="signalRTemplate" id="signalRTemplate" />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="whatsappTemplate" className="form-label">WhatsApp Template <span className="starMandatory">*</span></label>
                                    <TextEditor getTextvalue={handleChange} setValue={whatsapptemplate} name="whatsappTemplate" id="whatsappTemplate" />
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />Clear</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={''}>Update</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>Cancel</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>

                        </div>
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text="All Notification Template List" />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>Notification Title</th>
                                            <th>Mail Template</th>
                                            <th>Firebase Template</th>
                                            <th>SignalR Template</th>
                                            <th>WhatsApp Template</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {templateList && templateList.filter((val) => `${val.designationName} ${val.code}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.notificationTitle}</td>
                                                    <td>{val.mailTemplate}</td>
                                                    <td>{val.firebaseTemplate}</td>
                                                    <td>{val.signalRTemplate}</td>
                                                    <td>{val.whatsappTemplate}</td>
                                                    <td>

                                                        <div className="action-button">
                                                            {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.notificationTitle, val.mailTemplate, val.firebaseTemplate, val.signalRTemplate, val.whatsappTemplate, val.superAdminUserId) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div> */}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={''} data-bs-dismiss="modal" onClick={handleDeleteRow}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
