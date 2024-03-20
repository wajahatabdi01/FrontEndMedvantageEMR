import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'

import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import ValidationDoctorTimeSlotMapping from '../../../Validation/Admin/TimeSlot/ValidationDoctorTimeSlotMapping';
import PostDoctorTimeSlotMapping from '../../Api/DoctorTimeSlotMapping/PostDoctorTimeSlotMapping';
import GetDoctorTimeSlotMapping from '../../Api/DoctorTimeSlotMapping/GetDoctorTimeSlotMapping';
import GetDoctor from '../../Api/DoctorTimeSlotMapping/GetDoctor';
import GetTimeslotMaster from '../../Api/TimeslotMaster/GetTimeslotMaster';
import DeleteDoctorTimeSlotMapping from '../../Api/DoctorTimeSlotMapping/DeleteDoctorTimeSlotMapping';
import PutDoctorTimeSlotMapping from '../../Api/DoctorTimeSlotMapping/PutDoctorTimeSlotMapping';
import GetAllDays from '../../../Clinical/API/Output/GetAllDays';

export default function DoctorTimeSlotMapping() {
    let [doctorTimeSlotList, setDoctorTimeSlotList] = useState([])
    let [doctorList, setDoctorList] = useState()
    let [timeSlotList, setTimeSlotList] = useState()
    let [dayList, setDayList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('');

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editDoctor, setEditDoctor] = useState("")
    let [editTimeSlot, setEditTimeSlot] = useState("")
    let [editDay, setEditDay] = useState("")
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation();

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationDoctorTimeSlotMapping(sendForm.doctorId, sendForm.timeslotId, sendForm.dayId)
        
        // return ("sendForm")
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostDoctorTimeSlotMapping(sendForm);
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
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

    //Get data
    let getdata = async () => {
        const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
        let getResponse = await GetDoctorTimeSlotMapping();
        let getDoctor = await GetDoctor(clientID);
        let getTimeSlot = await GetTimeslotMaster();
        let getDays = await GetAllDays();


        if (getResponse.status === 1) {
            // setLoder(0)
            setDoctorTimeSlotList(getResponse.responseValue)
            setDoctorList(getDoctor.responseValue)
            setTimeSlotList(getTimeSlot.responseValue);
            setDayList(getDays.responseValue);

        }

    }


    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditDoctor("")
        setEditTimeSlot("")
        setEditDay("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        // let obj = {
        //     id: rowId
        // }
        let response = await DeleteDoctorTimeSlotMapping(rowId)
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

    //Handle Button Change
    let handleUpdate = async (id, doctorId, timeslotId, userId, doctorName, timeRange, dayName) => {

        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "doctorId": doctorId,
            "timeSlotId": timeslotId,
            "userId": userId,

        }))
        setEditDoctor(doctorName);
        // setEditTimeSlot(newTimeVariable);
        setEditTimeSlot(timeRange);
        setEditDay(dayName);
    }



    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationDoctorTimeSlotMapping(sendForm.doctorId, sendForm.timeslotId, sendForm.dayId)
      
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutDoctorTimeSlotMapping(sendForm)
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

    function formatTimeWithAMPM(time) {
        if (time && typeof time === 'string') {
            const options = { hour: '2-digit', minute: '2-digit', hour12: true };
            const timeObj = new Date(`1970-01-01T${time}`);
            return timeObj.toLocaleTimeString(undefined, options);
        }
        return 'N/A';
    }


    //Handle Clear
    let handleClear = (value) => {
        setSendForm({ "userId": window.userId })
        setClearDropdown(value)
        setEditDoctor("");
        setEditTimeSlot("");
        setEditDay("");
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <Heading text={t("Doctor_Time_Slot_Mapping")} />
                            <BoxContainer>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="doctorId" className="form-label">{t("Doctor_Name")}<span className="starMandatory">*</span></label>
                                    {doctorList && <DropdownWithSearch defaulNname="Select doctor" name="doctorId" list={doctorList} valueName="id" displayName="name" editdata={editDoctor} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="dayId" className="form-label">{t("Days")}<span className="starMandatory">*</span></label>
                                    {doctorList && <DropdownWithSearch defaulNname="Select days" name="dayId" list={dayList} valueName="id" displayName="dayName" editdata={editDay} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="timeSlotId" className="form-label">{t("Time_Slot")}<span className="starMandatory">*</span></label>
                                    {/* {timeSlotList && <DropdownWithSearch defaulNname="Select timeslot" name="timeslotId" list={timeSlotList} valueName="id" displayName="fromTime" editdata={editTimeSlot} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />} */}
                                    {timeSlotList && (
                                        <DropdownWithSearch
                                            defaulNname="Select timeslot"
                                            name="timeslotId"
                                            list={timeSlotList.map(val => ({
                                                id: val.id,
                                                displayName: `${val.fromTime} - ${val.toTime}`,
                                            }))}
                                            valueName="id"
                                            displayName="displayName"
                                            editdata={editTimeSlot}
                                            getvalue={handleChange}
                                            clear={clearDropdown}
                                            clearFun={handleClear}
                                        />
                                    )}
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>{t("Cancel")}</button>
                                                            </>
                                                        }
                                                    </div>}
                                            </>
                                        }
                                    </div>
                                </div>
                            </BoxContainer>
                        </div>
                        <div className="col-12 mt-2">
                            <div className='handlser'>
                                <Heading text={t("Doctor_Time_Slot_Mapping_List")} />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Doctor")}</th>
                                            <th>{t("Days")}</th>
                                            <th>{t("Time_Slot")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {doctorTimeSlotList && doctorTimeSlotList.filter((val) => `${val.doctorId}${val.fromTime}${val.toTime}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.doctorName}</td>
                                                    <td>{val.dayName}</td>
                                                    <td>
                                                        {formatTimeWithAMPM(val.fromTime)} - {formatTimeWithAMPM(val.toTime)}
                                                    </td>
                                                    {/* <td>
                                                        {val.fromTime && val.toTime ? (
                                                            `${val.fromTime} - ${val.toTime}`
                                                        ) : (
                                                            "N/A"
                                                        )}
                                                    </td> */}

                                                    {/* <td>
                                                        {new Date(val.fromTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                        {new Date(val.toTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </td> */}
                                                    <td>
                                                        <div className="action-button">
                                                            {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.doctorId, val.timeslotId, val.userId, val.fromTime) }} /></div> */}
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom">
                                                                <img
                                                                    src={editBtnIcon}
                                                                    className=""
                                                                    alt=""
                                                                    onClick={() => {
                                                                        const formatTime = (time) => {
                                                                            const options = { hour: '2-digit', minute: '2-digit' };
                                                                            return new Date(time).toLocaleTimeString(undefined, options);
                                                                        };
                                                                        const timeRange = `${formatTime(val.fromTime)} - ${formatTime(val.toTime)}`;
                                                                        handleUpdate(val.id, val.doctorId, val.timeslotId, val.userId, val.doctorName, timeRange,val.dayName);
                                                                    }}
                                                                />
                                                            </div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                                <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
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
