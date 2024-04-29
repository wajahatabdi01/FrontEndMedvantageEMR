import React, { useEffect, useRef, useState } from 'react'
import calender from '../../../assets/images/icons/calender.svg'
import clock from '../../../assets/images/icons/clock.svg'
import BoxContainer from '../../../Component/BoxContainer'
import upDownIcon from '../../../assets/images/icons/upDownIcon.svg'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import reset from '../../../assets/images/icons/RotateIcon.png'
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
import SuccessToster from '../../../Component/SuccessToster';
import Search, { FindByQuery, SearchIndex } from '../../../Code/Serach'
import ExistingComplain from "../../../assets/images/OPD/existingComplain.svg"
// import OPDSymptomsPopUp from '../../../OPD/OPDSharePage/OPDPrescription/OPDSymptomsPopUp'
// import GetProblemList from '../../../../API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import TextEditor from '../../../Component/TextEditor';
import GetPatientNotes from '../../API/IPD/PatientsNotes/GetPatientNotes'
import GetAllTemplateMaster from '../../../Admin/Pages/TemplateMaster/API/GetAllTemplateMaster'
import GetNotesTittle from '../../../Admin/Pages/TemplateMaster/API/GetNotesTittle'
import PostPatientNotes from '../../API/IPD/PatientsNotes/PostPatientNotes'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import { t } from 'i18next'
import GetSharedNotes from '../../API/IPD/PatientsNotes/GetSharedNotes'
import GetSubTitle from '../../API/IPD/PatientsNotes/GetSubTitle'



export default function PatientNotes() {

    let [patientNotesList, setPatientNotesList] = useState([])
    let [templateByUserIdList, setTemplateByUserIdList] = useState([])
    let [subTitle, setSubtitle] = useState([])
    let [templateMasterList, setTemplateMasterList] = useState([])
    let [sharedTemplate, setSharedTemplate] = useState([])
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [body, setBody] = useState('')
    let [updateBool, setUpdateBool] = useState(0)
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('');
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [subbTitle, setSubbtitle] = useState('')
    let [isShared, setIsShared] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [DetailName, setDetailName] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [id, setId] = useState()
    let [isShowTemplateModel, setIsShowTemplateModel] = useState(0)
    let [detailsDate, setDetailsDate] = useState('')
    let [detailsTime, setDetailsTime] = useState('')

    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
    const PID = JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].pid;
    const DOCTORID = JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].doctorId;
    const PMID = JSON.parse(window.sessionStorage.getItem("IPDpatientList"))[0].pmId;
   

    // const [currentDate, setCurrentDate] = useState('');
    // const [currentTime, setCurrentTime] = useState('');

    // Function to get the current date and time
    const getCurrentDateTime = () => {
        const now = new Date();
        const date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const time = now.toTimeString().slice(0, 5); // Format: HH:MM
        setDetailsDate(date);
        setDetailsTime(time);
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

    let handleChange = (e) => {
     const {value , name } = e.target
        // setBody("")
        if (name === "body") {

            setBody(e.target.value);
        }

        if (name === "subTittle") {
            setSubbtitle(value)
            console.log("subbTitle", subbTitle)
            getTemplateNotes(value)
        }

        if (name === "detailsDate") {
            setDetailsDate(value)
           
        }

        if (name === "detailsTime") {
            setDetailsTime(value)
           
        }

    }

    const chnageCheckedType = (id,param)=>{
        setClearDropdown(1)
        setIsShared(param)
       if(param === 0 ){
           document.getElementById('persNote').checked=true;
           document.getElementById('sharNote').checked=false;
           getNotesType(id,param)
       } 
       else{
           document.getElementById('sharNote').checked=true;
           document.getElementById('persNote').checked=false;
           getNotesType(id,param)
       }
     }
    

    let getNotesType = async (id,isShared) => {
      
        const subTitleresponse = await GetSubTitle(id, userID, isShared, clientID);
        if (subTitleresponse.status === 1) {

            setSubtitle(subTitleresponse.responseValue)
        }
       
    }

    //Get data
    let getdata = async (id, ind) => {
       
        setClearDropdown(1)
        setId(id)
        let getPatientNotes = await GetPatientNotes(id, PID, clientID);
       
        if (getPatientNotes.status === 1) {
            // setLoder(0)
            setPatientNotesList(getPatientNotes.responseValue)
            const data = getPatientNotes.responseValue
            console.log("getPatientNotes", getPatientNotes.responseValue)

        }
        setDetailName(templateMasterList[ind] && templateMasterList[ind].detailsName)
      
        chnageCheckedType(id, 0)
      
    
}


    const getTemplateNotes = async (subbTitle) => {

        let getResponse = await GetTemplateByUserId(id, subbTitle, userID, isShared, clientID);
       
        if (getResponse.status === 1) {
            // setLoder(0)
            setTemplateByUserIdList(getResponse.responseValue)
            const data = getResponse.responseValue
            console.log("data", data)

            const body = data.length == 0 ? '' : data[0].body

            setBody(body)

        }

    };

    let saveForm = async (id) => {

        const obj = {
            pid: PID,
            doctorID: userID,
            pdmID: id,
            details: body,
            detailsDate: detailsDate + ' ' + detailsTime,
            userID: userID,
            entryDate: detailsDate + ' ' + detailsTime,
            clientId: clientID

        }

        console.log('sendForm222', obj);

        let valresponse = true
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostPatientNotes(obj);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setisShowToaster(1);
                setShowSuccessMsg("Data saved Successfully")
                setTimeout(() => {
                    setisShowToaster(0);
                }, 1500);

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

    const handlePrint = (data) => {


        const detailsDate = (data.detailsDate)
        const detailsTime = (data.detailsTime)
        const details = (data.details)

        window.sessionStorage.setItem("PrintPatientNotes", JSON.stringify({
            "detailsDate": detailsDate, "detailsTime": detailsTime, "details": details, "noteName": DetailName
        }));
        window.open("/PatientNotesPrint/", 'noopener,noreferrer');
    }



    //Handle Delete
    let handleDeleteRow = async (id) => {
        // setLoder(1)
        setShowUnderProcess(1)
        let obj = {
            id: rowId
        }
        let response = await DeletePatientNotes(obj)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setisShowToaster(1)
            setShowSuccessMsg("Data Deleted Successfully!")
            setTimeout(() => {
                setisShowToaster(0)
            }, 1500)
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

    let handleClear = (value) => {
        setClearDropdown(value)
        setBody('')
        getCurrentDateTime();
        // setCurrentTime('')
        // setCurrentDate('')
    }

    let handleReset = async (id) => {
        getdata(id);
        getCurrentDateTime();
    }


    useEffect(() => {
        getdata(1);
        getNotesTitle(0);
        getCurrentDateTime();
     
        

    }, []);


    return (
        <>
            <div className="med-box py-1 px-2">
                <nav>
                    <div className="nav nav-tabs customeTab" id="nav-tab" role="tablist">
                        {templateMasterList && templateMasterList.map((val, ind) => {
                            return (
                                <button onClick={() => { getdata(val.id, ind)}} className={`nav-link ${ind === 0 ? 'active' : ''}`} id={`nav-tab-${val.id}`} data-bs-toggle="tab" data-bs-target={`#nav-${val.detailsName}`} type="button" role="tab" aria-controls={`nav-${val.detailsName}`} aria-selected={ind === 0 ? 'true' : 'false'}>{val.detailsName}</button>
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
                                                        <div className="row">
                                                            <div className='col-md-3'>
                                                                <div className="mb-2">
                                                                    <input className="form-check-input me-2" type="radio" name="persNote" id="persNote" onClick={() => { chnageCheckedType(id,0) }} defaultChecked />
                                                                    <label className="form-label" for="persNote">
                                                                        {t("Personal")}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-3'>
                                                                <div className="mb-2">
                                                                    <input className="form-check-input me-2" type="radio" name="sharNote" id="sharNote" onClick={() => { chnageCheckedType(id,1) }} />
                                                                    <label className="form-label" for="sharNote">
                                                                        {t("Shared")}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                {/* <label htmlFor="tittle" className="form-label">{t("Tittle")} <span className="starMandatory">*</span></label> */}
                                                                {subTitle && <DropdownWithSearch defaulNname={t("Select Sub-title")} name="subTittle" list={subTitle} valueName="subTittle" displayName="subTittle" editdata={''} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} style={{ width: '200px' }}  />}
                                                                <small id="errSubtittle" className="invalid-feedback" style={{ display: 'none' }}></small>
                                                            </div>

                                                        </div>
                                                        <div className="d-flex gap-2 align-content-end">
                                                            <div className="mb-2 me-2" style={{ flex: '1' }}>
                                                                <img src={calender} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Date</label>
                                                                <input type="date" className="form-control form-control-sm" id="detailsDateProgress" name="detailsDate" placeholder="Enter Date" value={detailsDate} onChange={handleChange}/>
                                                            </div>
                                                            <div className="mb-2 me-2" style={{ flex: '1' }}>
                                                                <img src={clock} className='icnn' /> <label htmlFor="detailsDate" className="form-label">Time</label>
                                                                <input type="time" className="form-control form-control-sm" id="detailsTimeProgress" name="detailsTime" placeholder="Enter Time" value={detailsTime} onChange={handleChange}/>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className='resetMain'>
                                                            <img src={notes} className='icnn' />
                                                            <label htmlFor="details" className="form-label">{DetailName ? DetailName : 'Progress Note'}</label>
                                                            <div className='tempEditorpt'>
                                                                {/* <TextEditor setValue={!templateByUserIdList[0] ? '' : templateByUserIdList[0].body} name="body" id="body" /> */}
                                                                <TextEditor getTextvalue={handleChange} setValue={body} name="body" id="body" />
                                                                <div className='resetimg'>
                                                                    <img src={reset} alt='' onClick={() => { handleReset(id) }} title='Reset' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-12">
                                                        <div className='btnsecPt'>
                                                            {/* <div>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { setIsShowTemplateModel(1); GetTemplateNotes() }}><img src={savewhite} className='icnn' />Templates</button>
                                                            </div> */}
                                                            <div>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={() => { saveForm(id) }}><img src={savewhite} className='icnn' />Save</button>
                                                                <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1"  onClick={() => { handleClear(1) }}>
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
                                                    {/* <input type="search" className="form-control form-control-sm" placeholder="Search.." /> */}
                                                    {/* <i className="fa fa-search"></i> */}
                                                </form>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="med-table-section" style={{ "height": "77vh" }}>

                                        <table className='med-table border_ striped'>
                                            <thead>
                                                <tr>
                                                    <th className="text-center" style={{ "width": "5%" }}>#</th>
                                                    <th style={{ width: '10%' }}>Date/Time <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                                                    <th>{DetailName ? DetailName : 'Progress Note'} <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                                                    <th style={{ width: '10%' }}>Written Note <img className="IconFilter" src={upDownIcon} alt="upDownIcon" /></th>
                                                    <th style={{ "width": "10%" }} className="text-center">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {patientNotesList && patientNotesList.map((val, ind) => {
                                                    return (
                                                        <tr key={val.id}>
                                                            <td className="text-center">{ind + 1}</td>
                                                            <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{val.detailsDate}</span><br /><span style={{ color: '#858585', fontSize: '13px' }}>{val.detailsTime}</span></td>
                                                            <td><div dangerouslySetInnerHTML={{ __html: val.details }} style={{ lineHeight: '2px', margin: '2px', padding: '2px', whiteSpace:'nowrap' }} /></td>
                                                            <td>{val.consultantName}</td>
                                                            <td>
                                                                <div className="action-button">
                                                                    <div className="actionItem" title="Print"><img src={IconPrint} className='imgprint' alt="IconPrint" onClick={() => { handlePrint(val, ind) }} /></div>
                                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" ><img src={IconDelete} alt="Delete" onClick={() => { setRowId(val.id) }} title='Delete' /></div>

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



                {/* --------------------Template Model popup -------------*/}

                {isShowTemplateModel === 1 ?
                    <div className={`modal d-${isShowTemplateModel === 1 ? "block" : ""}`} id="templateModal" data-bs-backdrop="static">

                        <div className="modal-dialog modal-xl">

                            <div className="modal-content p-0">

                                <div className="modal-header tempModal">
                                    <div className='hedinimg'>
                                        <img src={savewhite} className='icnn' />
                                        <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Patient Note Templates</h1>
                                    </div>

                                    <button type="button" className="btn-close_ btnModalClosept" title="Close Window" >

                                        <i className="bi bi-x-octagon"></i>

                                    </button>

                                </div>

                                <div className="modal-body p-0">

                                    <div className='ptnotesHead'>
                                        <div className='row'>
                                            {sharedTemplate && sharedTemplate.map((val, ind) => {
                                                return (
                                                    <div className='col-md-4 pe-1'>
                                                        <div className='ptnotesHead-inn'>
                                                            <div className='patintbt'>
                                                                <div className='row'>
                                                                    <div className="col-12">
                                                                        <div className="mb-2 me-2">
                                                                            {/* <input type="text" className="form-control form-control-sm" id="bedName" placeholder={t("Select Doctor")} name="bedName" /> */}
                                                                            {<DropdownWithSearch defaulNname={t("Select Doctor")} name="tittle" list={''} valueName="id" displayName="detailsName" editdata={''} getvalue={''} clear={''} clearFun={''} />}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='patintbt'>
                                                                <div className='patintbt-i'>
                                                                    <span className='pttime'>07:00 PM</span>
                                                                    <span className='ptDate'>02/04/2024</span>
                                                                </div>

                                                                <div className='patNotetxt'>
                                                                    {/* <div dangerouslySetInnerHTML={{ __html:val.body }} /> */}
                                                                    <span><div dangerouslySetInnerHTML={{ __html: val.body }} style={{ lineHeight: '2px', margin: '4px', padding: '2px' }} /></span>
                                                                </div>



                                                                <div className='usetemplte'>
                                                                    <div>
                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={savewhite} className='icnn' />Use Template</button>
                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {/* <div className='col-md-4 pe-1 ps-1'>
                                                <div className='ptnotesHead-inn'>
                                                    <div className='patintbt'>
                                                        <div className='row'>
                                                            <div className="col-12">
                                                                <div className="mb-2 me-2">
                                                                   
                                                                    {<DropdownWithSearch defaulNname={t("Select Doctor")} name="tittle" list={''} valueName="id" displayName="detailsName" editdata={''} getvalue={''} clear={''} clearFun={''} />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='patintbt'>
                                                        <div className='patintbt-i'>
                                                            <span className='pttime'>07:00 PM</span>
                                                            <span className='ptDate'>02/04/2024</span>
                                                        </div>

                                                        <div className='patNotetxt'>


                                                        
                                                        </div>
                                                        <div className='patNotetxt'>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                        </div>
                                                        <div className='patNotetxt'>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                        </div>
                                                    </div>
                                                    <div className='usetemplte'>
                                                        <div>
                                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={savewhite} className='icnn' />Use Template</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div className='col-md-4 ps-1'>
                                                <div className='ptnotesHead-inn'>
                                                    <div className='patintbt'>
                                                        <div className='row'>
                                                            <div className="col-12">
                                                                <div className="mb-2 me-2">
                                                                 
                                                                    {<DropdownWithSearch defaulNname={t("Select Doctor")} name="tittle" list={''} valueName="id" displayName="detailsName" editdata={''} getvalue={''} clear={''} clearFun={''} />}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='patintbt'>
                                                        <div className='patintbt-i'>
                                                            <span className='pttime'>07:00 PM</span>
                                                            <span className='ptDate'>02/04/2024</span>
                                                        </div>

                                                        <div className='patNotetxt'>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                        </div>
                                                        <div className='patNotetxt'>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                        </div>
                                                        <div className='patNotetxt'>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                            <span>BP-120/80Mmhg</span>
                                                        </div>
                                                    </div>
                                                    <div className='usetemplte'>
                                                        <div>
                                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={savewhite} className='icnn' />Use Template</button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div> */}

                                        </div>


                                    </div>

                                </div>



                            </div>

                        </div>

                    </div> : ''
                }


                {/* -------------------------End Template Model Popup ---------------------*/}

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
                                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={() => { handleDeleteRow(id) }}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
            }

            {
                isShowToaster === 1 ?
                    <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
            }
        </>
    )
}
