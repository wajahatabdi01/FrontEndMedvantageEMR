
import React, { useState, useEffect } from 'react'
import GetAgendaForDdl from '../API/Agenda/GetAgendaForDdl';
import GetMeeting from '../API/Meeting/GetMeeting';
import DeleteMeeting from '../API/Meeting/DeleteMeeting';
import PostMeeting from '../API/Meeting/PostMeeting';
import PutMeeting from '../API/Meeting/PutMeeting';
import SuccessToster from '../../Component/SuccessToster'
import WarningToaster from '../../Component/WarningToaster'
import AlertToster from '../../Component/AlertToster'
import Loder from '../../Component/Loader'
import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
import Heading from '../../Component/Heading'
import DropdownWithSearch from '../../Component/DropdownWithSearch'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

export default function Meeting() {

    let [getAgendaList, setAgendaList] = useState([])
    let [getMeetingList, setMeetingList] = useState([])
    let [getId, setId] = useState('')
    let [getTitle, setTitle] = useState('')
    let [getMeetingDate, setMeetingDate] = useState('')
    let [getLocation, setLocation] = useState('')
    let [getSelectedAgenda, setSelectedAgenda] = useState([''])
    let [getSaveUpdateBool, setSaveUpdateBool] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [loder, setLoder] = useState(1)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState("")
    const [searchInput, setSearchInput] = useState('');
    let [editAgenda, seteditAgenda] = useState("")
    const { t } = useTranslation();

    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log("name", name, "value", value)
        if (name === "AgendaID") {

            setSelectedAgenda(value)
        }
        // else {

        //     setSelectedOptionUser(value)
        // }
    }
    let funGetMeeting = async () => {
        let getResult = await GetMeeting()
        if (getResult.status === 1) {
            setLoder(0)
            setMeetingList(getResult.responseValue);
        }

    }
    let funGetAgenda = async () => {
        let getResult = await GetAgendaForDdl()
        console.log('AgendaList', getResult)
        if (getResult.status === 1) {
            setLoder(0)
            setAgendaList(getResult.responseValue);
        }

    }

    const handleTextboxChange = (event) => {
        if (event.target.name === "title") {
            setTitle(event.target.value);
        }
        if (event.target.name === "meetingDate") {
            setMeetingDate(event.target.value);
        }
        if (event.target.name === "location") {
            setLocation(event.target.value);
        }
    };

    const clearValues = (value) => {
        setSaveUpdateBool(0);
        setTitle('');
        setMeetingDate('');
        setLocation('');
        setClearDropdown(value);
        seteditAgenda("");
    };

    let funSaveMeeting = async () => {
        const numbersRegex = /^[0-9]*$/;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (getTitle === '0' || getTitle === undefined || getTitle === null || getTitle === "") {
            setMessage("Fill project !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getMeetingDate === '0' || getMeetingDate === undefined || getMeetingDate === null || getMeetingDate === "") {
            setMessage("Fill getMeetingDate !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getLocation === '0' || getLocation === undefined || getLocation === null || getLocation === "") {
            setMessage("Fill getMeetingDate !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getLocation.trim().length === 0 || getLocation.trim().length === '') {
        //     setMessage("Fields can't blank or space !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        // else if (specialCharsRegex.test(getModule)) {
        //     setMessage("Module contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (numbersRegex.test(getModule)) {
        //     setMessage("Module contains numbers !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else {
            var obj = {
                title: getTitle,
                MeetingDate: getMeetingDate,
                Location: getLocation,
                agendaId: getSelectedAgenda,
                userID: window.userId,
                clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            setLoder(1)
            let response = await PostMeeting(obj);
            if (response.status === 1) {
                setMessage("Data saved successfully !")
                setShowToster(1)
                setLoder(0)
                setSaveUpdateBool(0)
                funGetMeeting()
                clearValues(1)
            }
            else {
                setLoder(0);
                setMessage(response.responseValue)
                setShowToster(1)
                //funGetModule()
            }
        }
    }
    let editMeeting = (Id, Title, MeetingDate, Location, AgendaID, itemTitle) => {
        console.log('AgendaIDDD', AgendaID)
        setSaveUpdateBool(1)
        setId(Id);
        setTitle(Title);
        setMeetingDate(reformatDateString(MeetingDate));
        setLocation(Location);
        setSelectedAgenda(AgendaID);
        seteditAgenda(itemTitle);
    }

    let funUpdateMeeting = async () => {
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const numbersRegex = /^[0-9]*$/;

        if (getTitle === '0' || getTitle === undefined || getTitle === null || getTitle === "") {
            setMessage("Fill getTitle !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getMeetingDate === '0' || getMeetingDate === undefined || getMeetingDate === null || getMeetingDate === "") {
            setMessage("Fill getMeetingDate !")
            setShowToster(3)
            setLoder(0)
        }
        else if (getLocation === '0' || getLocation === undefined || getLocation === null || getLocation === "") {
            setMessage("Fill getMeetingDate !")
            setShowToster(3)
            setLoder(0)
        }
        // else if (getLocation.trim().length === 0 || getModule.trim().length === '') {
        //     setMessage("Fields can't blank or space !")
        //     setShowToster(3)
        //     setLoder(0)
        // }
        // else if (specialCharsRegex.test(getModule)) {
        //     setMessage("Module contains special characters !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        // else if (numbersRegex.test(getModule)) {
        //     setMessage("Module contains numbers !");
        //     setShowToster(3);
        //     setLoder(0);
        // }
        else {
            var obj = {
                Id: getId,
                Title: getTitle,
                MeetingDate: getMeetingDate,
                Location: getLocation,
                agendaId: getSelectedAgenda,
                userID: window.userId,
                clientId: JSON.parse(window.sessionStorage.getItem('LoginData')).clientId
            }
            console.log('EditModeMeetingObj', obj);
            //return;
            setLoder(1)
            let result = await PutMeeting(obj);
            if (result.status === 1) {
                setLoder(0)
                setMessage("Data update successfully !")
                setShowToster(1)
                setSaveUpdateBool(0)
                funGetMeeting()
                clearValues(1)
            }
            else {
                setMessage(result.responseValue)
                setShowToster(1)
                setLoder(0)
            }
        }
    }


    let funDeletedMeeting = async () => {
        var obj = {
            Id: getId,
        }
        setLoder(1)
        let result = await DeleteMeeting(obj);
        if (result.status === 1) {
            setLoder(0)
            setMessage("Data delete successfully !")
            setShowToster(1)
            clearValues()
            funGetMeeting()
        }
        else {
            setMessage(result.responseValue)
            setShowToster(1)
            setLoder(0)
        }
    }
    let handleOnChange = (e) => {
        const { name, value } = e.target;
        if (name === 'searchBox') {
            setSearchInput(value)
        }
    }

    function reformatDateString(s) {
        if (typeof s === 'string' && s.trim() !== '') {
            var b = s.split(/\D/);
            var day = parseInt(b[2], 10).toString();
            var month = parseInt(b[1], 10).toString();
            var year = b[0];
            return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
        } else {
            return ''; // Return an empty string or handle the error as needed
        }
    }

    useEffect(() => {
        funGetMeeting()
        funGetAgenda()
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
                                            <label htmlFor="title" className="form-label">Meeting Title<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getTitle} onChange={handleTextboxChange} id="txttitle" name="title" placeholder='Enter Title Name' />
                                        </div>
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="meetingDate" className="form-label">Meeting Date<span className="starMandatory">*</span></label>
                                            <input type="date" className="form-control form-control-sm" value={getMeetingDate} onChange={handleTextboxChange} id="txtmeetingDate" name="meetingDate" placeholder='Enter Meeting Date' />
                                            {/* <input type="date" className="form-control form-control-sm" value={getStartDate} onChange={handleTextboxChangeStartDate} id="txtstartDate" name="startDate" placeholder='Enter Start Date' /> */}
                                        </div>
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="location" className="form-label">Location<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" value={getLocation} onChange={handleTextboxChange} id="txtlocation" name="location" placeholder='Enter Location Name' />
                                        </div>
                                        <div className="mb-2 flex-grow-1 me-2">
                                            <label htmlFor="moduleName" className="form-label">Agenda<span className="starMandatory">*</span></label>
                                            {getAgendaList && <DropdownWithSearch defaulNname={t("Select Agenda")} name="AgendaID" list={getAgendaList} valueName="agendaId" displayName="itemTitle" editdata={editAgenda} getvalue={handleChange} clear={clearDropdown} clearFun={clearValues} />}
                                        </div>


                                        <div className="mb-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            <div>
                                                {getSaveUpdateBool === 0 ?
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funSaveMeeting}><img src={save} className='icnn' />Save</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { clearValues(1) }}><img src={reset} className='icnn' /> {t("Clear")}</button>
                                                    </>
                                                    :
                                                    <>
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={funUpdateMeeting}><img src={save} className='icnn' />Update</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { setSaveUpdateBool(0); clearValues(1) }}><img src={reset} className='icnn' /> {t("Clear")}</button>
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
                                <div style={{ position: 'relative' }}>
                                    <input value={searchInput} onChange={handleOnChange} name="searchBox" type="search" class="form-control rounded" placeholder="Search...." aria-label="Search" aria-describedby="search-addon" />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "77vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>Meeting Title</th>
                                            <th>Meeting Date</th>
                                            <th>Location</th>
                                            <th>Agenda Title</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getMeetingList && getMeetingList.filter((val) => `${val.title} ${val.meetingDate}`.toLowerCase().includes(searchInput.toLowerCase())).map((val, ind) => {
                                            console.log('MeetingListdata', getMeetingList)
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.title}</td>
                                                    <td>{reformatDateString(val.meetingDate)}</td>
                                                    <td>{val.location}</td>
                                                    <td>{val.itemTitle}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row"><span className='btnbg' style={{ background: "#FFEDD2" }} onClick={() => { editMeeting(val.id, val.title, val.meetingDate, val.location, val.agendaId, val.itemTitle) }}> <img src={editbtn} className='' /></span></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" title="Delete Row" data-bs-target="#deleteModal"><span onClick={() => { setId(val.id) }} className='btnbg' style={{ background: "#FFEFEF" }}> <img src={delbtn} className='icnn' /></span ></div>
                                                        </div>
                                                    </td>
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
                                                <button type="button" className="btn-delete popBtnDelete" onClick={funDeletedMeeting} data-bs-dismiss="modal">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
                            </div>
                        </div>
                    </div>
                </div>
                {showToster === 1 ? <SuccessToster message={message} handle={setShowToster} /> : ""}
                {showToster === 2 ? <WarningToaster message={message} handle={setShowToster} /> : ""}
                {showToster === 3 ? <AlertToster message={message} handle={setShowToster} /> : ""}
            </section>
            <Loder val={loder} />
        </>
    )

}
