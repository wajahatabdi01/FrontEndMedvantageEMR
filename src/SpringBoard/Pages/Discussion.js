
import React, { useState, useEffect } from 'react';
//import SuccessToster from '../../Component/SuccessToster';
//import WarningToaster from '../../Component/WarningToaster';
//import AlertToster from '../../Component/AlertToster';
import Loder from '../../Component/Loader';
//import editbtn from '../../assets/images/icons/editbtn.svg';
//import delbtn from '../../assets/images/icons/delbtn.svg';
//import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import GetMeetingForDdl  from '../API/Meeting/GetMeetingForDdl'
import GetDiscussion from '../API/Discussion/GetDiscussion'
import SaveDiscussion from '../API/Discussion/SaveDiscussion'
 
import GetAgendaForDdl from '../API/Agenda/GetAgendaForDdl';
import GetParticipant from '../API/Participant/GetParticipant';
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import SuccessToster from '../../Component/SuccessToster'
 

export default function Discussion() {
    let [loder, setLoder] = useState(1)
    let [getAgendaList, setAgendaList] = useState([])
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)
    let [editAgenda, seteditAgenda] = useState("")
    let [clearDropdown, setClearDropdown] = useState(0)
    let [getSelectedAgenda, setSelectedAgenda] = useState([''])
    let [getSelectedMeeting, setSelectedMeeting] = useState([''])
    let [getParticipant, setParticipant] = useState([''])
    let [getDiscussionTopic, setDiscussionTopic] = useState('')
    let [getDiscussionDetails, setDiscussionDetails] = useState('')
    let [getDiscussionList, setDiscussionList] = useState('')

    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    let [getId, setId] = useState('')
    const [searchInput, setSearchInput] = useState('');
    const { t } = useTranslation();
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
       
        if (name === "AgendaID") {
            setSelectedAgenda(value)
        }
    }
    let handleChangeMeeting = (e) => {
        let name = e.target.name;
        let value = e.target.value;
       
        if (name === "MeetingId") {
            setSelectedMeeting(value)
        }
    }
    let handleChangeParticipant = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "Id") {
            setParticipant(value)
        }
    }
    let funGetAgenda = async () => {
        let getResult = await GetAgendaForDdl()
        if (getResult.status === 1) {
            setLoder(0)
            setAgendaList(getResult.responseValue);
        }
    }
    let funGetMeeting = async () => {
        let getResult = await GetMeetingForDdl()
        if (getResult.status === 1) {
            setLoder(0)
            setSelectedMeeting(getResult.responseValue); 
        }
    }
    let funGetParticipant = async () => {
        let getResult = await GetParticipant()
        if (getResult.status === 1) {
            setLoder(0)
            setParticipant(getResult.responseValue); 
        }
    }
    const clearValues = (value) => {
        setSaveUpdateBool(0);
        setClearDropdown(value);
        seteditAgenda("");
    };

    const handleTextboxChange = (event) => {
        if (event.target.name === "DiscussionTopic") {
            setDiscussionTopic(event.target.value);
        }
        if (event.target.name === "DiscussionDetails") {
            setDiscussionDetails(event.target.value);
        }
    };
// ---------------------------------------START Save function here-----------------------------------------
let funGetDiscussion = async () => {
    let getResult = await GetDiscussion()
    if (getResult.status === 1) {
        setLoder(0)
        setDiscussionList(getResult.responseValue);
    }

}
// ---------------------------------------END Save function here-----------------------------------------
// ---------------------------------------Save function here-----------------------------------------
let funSaveDiscussion = async () => { 
    // if (getTitle === '0' || getTitle === undefined || getTitle === null || getTitle === "") {
    //     setMessage("Fill project !")
    //     setShowToster(3)
    //     setLoder(0)
    // }
    // else if (getMeetingDate === '0' || getMeetingDate === undefined || getMeetingDate === null || getMeetingDate === "") {
    //     setMessage("Fill getMeetingDate !")
    //     setShowToster(3)
    //     setLoder(0)
    // }
    // else if (getLocation === '0' || getLocation === undefined || getLocation === null || getLocation === "") {
    //     setMessage("Fill getMeetingDate !")
    //     setShowToster(3)
    //     setLoder(0)
    // }
 
   // else {
        var obj = {
            meetingId: getSelectedMeeting,
            agendaId: getSelectedAgenda,
            participantId: getParticipant,
            discussionTopic:getDiscussionTopic,
            discussionDetails:getDiscussionDetails,
            userID: window.userId,
            clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
        }
        setLoder(1)
        let response = await SaveDiscussion(obj);
        if (response.status === 1) {
            setMessage("Data saved successfully !")
            setShowToster(1)
            setLoder(0)
            setSaveUpdateBool(0) 
            clearValues(1)
            funGetDiscussion()
        }
        else {
            setLoder(0);
            setMessage(response.responseValue)
            setShowToster(1)
        }
    }
 
// ---------------------------------------END Save function here-----------------------------------------
    useEffect(() => {
        funGetDiscussion()
        funGetMeeting()
        funGetAgenda()
        funGetParticipant()
       
    }, [])

    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Add Meeting</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        
                                       <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="moduleName" className="form-label">Meeting<span className="starMandatory">*</span></label>
                                            {getSelectedMeeting && <DropdownWithSearch defaulNname={t("Select Meeting")} name="MeetingId" list={getSelectedMeeting} valueName="meetingId" displayName="title" editdata={editAgenda} getvalue={handleChangeMeeting} clear={clearDropdown} clearFun={clearValues} />}
                                        </div>

                                       <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="moduleName" className="form-label">Agenda<span className="starMandatory">*</span></label>
                                            {getAgendaList && <DropdownWithSearch defaulNname={t("Select Agenda")} name="AgendaID" list={getAgendaList} valueName="agendaId" displayName="itemTitle" editdata={editAgenda} getvalue={handleChange} clear={clearDropdown} clearFun={clearValues} />}
                                        </div>

                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="moduleName" className="form-label">Participant<span className="starMandatory">*</span></label>
                                            {getParticipant && <DropdownWithSearch defaulNname={t("Select Participant")} name="Id" list={getParticipant} valueName="id" displayName="name" editdata={editAgenda} getvalue={handleChangeParticipant} clear={clearDropdown} clearFun={clearValues} />}
                                        </div>
                                      
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="title" className="form-label">Discussion Topic<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getDiscussionTopic} onChange={handleTextboxChange}  id="txtDiscussionTopic" name="DiscussionTopic" placeholder='Enter Discussion Topic' />
                                        </div>
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="title" className="form-label">Discussion Details<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getDiscussionDetails} onChange={handleTextboxChange}  id="txtDiscussionDetails" name="DiscussionDetails" placeholder='Enter Discussion Details' />
                                        </div>
                                       

                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"  onClick={funSaveDiscussion}> Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1"> Clear </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"  > Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { setSaveUpdateBool(0);  }}> Clear</button>
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
                                <Heading text="Module List" />
                                {/* <div style={{ position: 'relative' }}>
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div> */}
                            </div>
                            <div className="med-table-section" style={{ "height": "77vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Meeting Title</th>
                                            <th>Meeting Location</th>
                                            <th>Agenda</th>
                                            <th>Participant Name</th>
                                            <th>Discussion Topic</th>
                                            <th>Discussion Details</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {getDiscussionList && getDiscussionList.filter((val) => `${val.discussionTopic} ${val.discussionDetails}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                             
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>

                                                    <td>{val.meetingTitle}</td>
                                                    <td>{val.location}</td>
                                                    <td>{val.agendaDescription}</td>
                                                    <td>{val.participantName}</td>
                                                    <td>{val.discussionTopic}</td>
                                                    <td>{val.discussionDetails}</td>
                                                    
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
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
                                                <button type="button" className="btn-delete popBtnDelete"  data-bs-dismiss="modal">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* {showToster === 1 ? <SuccessToster message={message} handle={setShowToster} /> : ""}
                {showToster === 2 ? <WarningToaster message={message} handle={setShowToster} /> : ""}
                {showToster === 3 ? <AlertToster message={message} handle={setShowToster} /> : ""} */}
            </section>
            <Loder val={loder} />
        </>
    )

}
