import React, { useEffect, useRef, useState } from 'react'
import calender from '../../../assets/images/icons/calender.svg'
import clock from '../../../assets/images/icons/clock.svg'
import BoxContainer from '../../../Component/BoxContainer'
import upDownIcon from '../../../assets/images/icons/upDownIcon.svg'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import notes from '../../../assets/images/icons/PatientHistory1.svg'
import GetTemplateByUserId from '../../API/IPD/PatientsNotes/GetTemplateByUserId'
// import PutPatientNotes from '../../../../API/IPD/PatientsNotes/PutPatientNotes'
// import PostPatientNotes from '../../../../API/IPD/PatientsNotes/PostPatientNotes'
import DeletePatientNotes from '../../API/IPD/PatientsNotes/DeletePatientNotes'
import IconPrint from '../../../assets/images/icons/print.svg'
import AlertToster from '../../../Component/AlertToster';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationPatientNotes from '../../../Validation/IPD/ValidationPatientNotes'
import savewhite from '../../..//assets/images/icons/save.svg'
import clearIcon from '../../../assets/images/icons/clear.svg'
import Search, { FindByQuery, SearchIndex } from '../../../Code/Serach'
import ExistingComplain from "../../../assets/images/OPD/existingComplain.svg"
// import OPDSymptomsPopUp from '../../../OPD/OPDSharePage/OPDPrescription/OPDSymptomsPopUp'
// import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import TextEditor from '../../../Component/TextEditor';
import GetPatientNotes from '../../API/IPD/PatientsNotes/GetPatientNotes'
import GetAllTemplateMaster from '../../../Admin/Pages/TemplateMaster/API/GetAllTemplateMaster'
import GetNotesTittle from '../../../Admin/Pages/TemplateMaster/API/GetNotesTittle'
import PostPatientNotes from '../../API/IPD/PatientsNotes/PostPatientNotes'
import { t } from 'i18next'


export default function PatientNotes() {

    let [patientNotesList, setPatientNotesList] = useState([])
    let [templateByUserIdList, setTemplateByUserIdList] = useState([])
    let [templateMasterList, setTemplateMasterList] = useState([])
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [body, setBody] = useState('')
    let [updateBool, setUpdateBool] = useState(0)
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [DetailName, setDetailName] = useState("Progress Note")
    let [tosterValue, setTosterValue] = useState(0)
    // let [sendForm, setSendForm] = useState('')
    let [id, setId] = useState(1)


    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
    const PID = JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].pid;
    const DOCTORID = JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].doctorId;
    const PMID = JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].pmId;
    console.log("poiijk", PMID)

    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    // Function to get the current date and time
    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const time = now.toTimeString().slice(0, 5); // Format: HH:MM
        setCurrentDate(date);
        setCurrentTime(time);
    };

    const getNotesTitle = async () => {
        setShowLoder(1);
        const response = await GetNotesTittle(clientID);
        if (response.status === 1) {
            setTemplateMasterList(response.responseValue);
            console.log("gfgfdfd", response.responseValue)

            setShowLoder(0)
        }
        else {
            setShowLoder(0);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
            setTimeout(() => {
                setShowAlertToster(0);
            }, 1500)
        }
    }


    // let handleChange = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     setSendForm(sendForm => ({
    //       ...sendForm,
    //       [name]: value
    //     }))
    //   }

    //Get data
    let getdata = async (id, ind) => {
        setId(id)
        const isShared = 0
        let getResponse = await GetTemplateByUserId(id, userID, isShared, clientID);
        let getPatientNotes = await GetPatientNotes(id);

        if (getResponse.status === 1) {
            // setLoder(0)
            setTemplateByUserIdList(getResponse.responseValue)
            const data = getResponse.responseValue
            console.log("data", data)

            const body = data.length == 0 ? '' : data[0].body

            setBody(body)

        }

        if (getPatientNotes.status === 1) {
            // setLoder(0)
            setPatientNotesList(getPatientNotes.responseValue)
            const data = getPatientNotes.responseValue
            console.log("getPatientNotes", getPatientNotes.responseValue)


        }
        setDetailName(templateMasterList[ind] && templateMasterList[ind].detailsName)





    }

    let saveForm = async (id) => {
        // console.log('key-->>>>>>',key);
        // // const pdmid = key
        // sendForm["pdmID"] = key;
        // sendForm["doctorID"]= window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].doctorId : []
        // sendForm["pmID"]= window.sessionStorage.getItem("IPDpatientList") ? JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].pmId : []
        // sendForm["detailsDate"] =currentDate+' '+ currentTime;

        const obj = {
            pid: PID,
            doctorID: DOCTORID,
            pdmID: id,
            pmID: PMID,
            details: body,
            detailsDate: currentDate + ' ' + currentTime,
            userID: userID,
            entryDate: currentDate + ' ' + currentTime,
            clientId: clientID

        }

        console.log('sendForm222', obj);

        // let valresponse = ValidationPatientNotes(sendForm.details)

        let valresponse = true
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostPatientNotes(obj);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000);

                getdata(id)

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
        // setLoder(1)
        setShowUnderProcess(1)
        let obj = {
            id: rowId
        }
        let response = await DeletePatientNotes(obj)
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
        getdata(1)
        getNotesTitle()
        getCurrentDateTime()
    }, [])


    return (
        <>
            <div className="med-box py-1 px-2">
                <nav>
                    <div className="nav nav-tabs customeTab" id="nav-tab" role="tablist">
                        {templateMasterList && templateMasterList.map((val, ind) => {
                            return (
                                <button onClick={() => { getdata(val.id, ind) }} className={`nav-link ${ind === 0 ? 'active' : ''}`} id={`nav-tab-${val.id}`} data-bs-toggle="tab" data-bs-target={`#nav-${val.detailsName}`} type="button" role="tab" aria-controls={`nav-${val.detailsName}`} aria-selected={ind === 0 ? 'true' : 'false'}>{val.detailsName}</button>
                            )
                        })}

                    </div>
                </nav>
            </div>

            {/* ---- Progress Notes Tab Start------ */}

            <div className="tab-content mt-2" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-ProgressNote" role="tabpanel" aria-labelledby="nav-ProgressNote-tab" tabIndex="0">

                    <div className='patientMain_ row'>
                        <div className='patient-lft_ col-md-4 pe-1 mb-2'>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12 p-0">
                                        <div className="fieldsett-in">
                                            <div className="fieldsett">
                                                <span className='fieldse'>Patient Notes</span>
                                                <BoxContainer>
                                                    <div className="col-md-12">
                                                        <div className="d-flex gap-2 align-content-end">
                                                            <div className="mb-2 me-2" style={{flex:'1'}}>
                                                                <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                                                                <input type="date" className="form-control form-control-sm" id="detailsDateProgress" name="detailsDate" placeholder="Enter Date" value={currentDate} />
                                                            </div>
                                                            <div className="mb-2 me-2" style={{flex:'1'}}>
                                                                <img src={clock} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Time</label>
                                                                <input type="time" className="form-control form-control-sm" id="detailsTimeProgress" name="detailsTime" placeholder="Enter Time" value={currentTime} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <img src={notes} className='icnn' />
                                                        <label htmlFor="details" className="form-label">{DetailName}</label>
                                                        <div className='tempEditorpt'>
                                                            <TextEditor setValue={!templateByUserIdList[0] ? '' : templateByUserIdList[0].body} name="body" id="body" />

                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className='btnsecPt'>
                                                            <div>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { saveForm(id) }}><img src={savewhite} className='icnn' />Templates</button>
                                                            </div>
                                                            <div>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { saveForm(id) }}><img src={savewhite} className='icnn' />Save</button>
                                                                <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" >
                                                                    <img src={clearIcon} className='icnn' />Clear</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </BoxContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='patient-rt_ col-md-8 ps-2'>
                            <div className="col-12">

                                <div className="med-box">

                                    <div className='listdetailsct'>
                                        <div className='listdetailsct-in'>
                                            <label className="labelPageIndex" >Showing <span className="pageIndex">1-3 </span> of  <span className="pageIndex">21</span> entries</label>
                                        </div>
                                        <div className='listdetailsct-in'>
                                            <div className='listd-in'>
                                                <form className="d-flex ms-auto ser" role="search">
                                                    <input type="search" className="form-control form-control-sm" placeholder="Search.." />
                                                    <i className="fa fa-search"></i>
                                                </form>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="med-table-section" style={{ "height": "77vh" }}>

                                        <table className='med-table border_ striped'>
                                            <thead>
                                                <tr>
                                                    <th className="text-center" style={{ "width": "5%" }}>#</th>
                                                    <th style={{width:'10%'}}>Date/Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                                                    {/* <th>Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th> */}
                                                    <th>{DetailName} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                                                    <th style={{width:'10%'}}>Written Note<img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                                                    <th style={{ "width": "10%" }} className="text-center">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {patientNotesList && patientNotesList.map((val, ind) => {
                                                    return (
                                                        <tr key={val.id}>
                                                            <td className="text-center">{ind + 1}</td>
                                                            {/* <td>{val.detailsDate}</td>
                        <td>{val.detailsTime}</td> */}
                                                            <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{val.detailsDate}</span><br /><span style={{ color: '#858585', fontSize: '13px' }}>{val.detailsTime}</span></td>
                                                            <td>{val.details}</td>
                                                            <td>{val.consultandid}</td>
                                                            <td>
                                                                <div className="action-button">
                                                                    <div className="actionItem" title="View"><img src={IconPrint} className='imgprint' alt="IconPrint" /></div>
                                                                    {/* <div className="actionItem" title="Edit"><img src={IconEdit} alt="Edit" onClick={() => { handleUpdate(val.id, val.pmID, val.pdmID, val.detailsDate, val.detailsTime, val.details, val.userId, "detailsDateProgress", "detailsTimeProgress", "detailsProgress") }} /></div> */}
                                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" ><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} /></div>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}

                                            </tbody>
                                        </table>
                                        {/* } */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }


                {/*  <!--  Delete Pop-Up Modal -->  */}

                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">
                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                <div className='popDeleteContent'> Are you sure you want to delete?</div>
                            </div>
                            <div className="modal-footer1 text-center">
                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
