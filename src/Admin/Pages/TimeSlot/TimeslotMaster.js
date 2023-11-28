import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import Search from '../../../Code/Serach'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import ValidationTimeslotMaster from '../../../Validation/Admin/TimeSlot/ValidationTimeslotMaster'
import PostTimeslotMaster from '../../Api/TimeslotMaster/PostTimeslotMaster'
import GetTimeslotMaster from '../../Api/TimeslotMaster/GetTimeslotMaster'
import DeleteTimeslotMaster from '../../Api/TimeslotMaster/DeleteTimeslotMaster'
import PutTimeslotMaster from '../../Api/TimeslotMaster/PutTimeslotMaster'

export default function TimeslotMaster() {
    let [timeSlotList, setTimeSlotList] = useState()
    let [timeSlotListMain, setTimeSlotListMain] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')

    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const { t } = useTranslation();

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationTimeslotMaster(sendForm.fromTime, sendForm.toTime)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostTimeslotMaster(sendForm);
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
        let getResponse = await GetTimeslotMaster();
        if (getResponse.status === 1) {
            setTimeSlotList(getResponse.responseValue)
            setTimeSlotListMain(getResponse.responseValue)
        }
    }

    // Handle Search
    let handleSearch = (e) => {
        let resp = Search(timeSlotListMain, e.target.value)
        if (e.target.value !== "") {
            if (resp.length !== 0) {
                setTimeSlotList(resp)
            }
            else {
                setTimeSlotList([])
            }
        }
        else {
            setTimeSlotList(timeSlotListMain)
        }
    }



    // Handle Change
    let handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "fromTime") {
            setFromTime(value);
        } else if (name === "toTime") {
            setToTime(value);
        }

        setSendForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    }



    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1);
        // let obj = {
        //     id: rowId
        // }
        let response = await DeleteTimeslotMaster(rowId)
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


    const convertTimeToInputFormat = (timeValue) => {
        const parts = timeValue.split(' ');
        const timeParts = parts[0].split(':');
        let hours = parseInt(timeParts[0], 10);
        const minutes = timeParts[1];
        if (parts[1] === 'PM' && hours < 12) {
            hours += 12;
        }
        hours = hours.toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Handle Button Change
    let handleUpdate = async (id, fromTime, toTime, userId) => {
        setUpdateBool(1);
        setSendForm({
            ...sendForm,
            "id": id,
            "fromTime": convertTimeToInputFormat(fromTime),
            "toTime": convertTimeToInputFormat(toTime),
            "userId": userId,
        });

        setFromTime(convertTimeToInputFormat(fromTime));
        setToTime(convertTimeToInputFormat(toTime));
    };


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationTimeslotMaster(sendForm.fromTime, sendForm.toTime)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutTimeslotMaster(sendForm)
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

    //Handle Clear
    let handleClear = () => {
        setSendForm({ "userId": window.userId })
        setUpdateBool(0)
        setFromTime("");
        setToTime("");
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
                            <Heading text={t("Time_Slot_Master")} />
                            <BoxContainer>
                                <div className="mb-2 me-2">
                                    <label htmlFor="fromTime" className="form-label">{t("From_Time")}<span className="starMandatory">*</span></label>
                                    <input
                                        type="time"
                                        className="form-control form-control-sm"
                                        id="fromTime"
                                        name="fromTime"
                                        value={fromTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="toTime" className="form-label">{t("To_Time")}<span className="starMandatory">*</span></label>
                                    {/* <input type="time" className="form-control form-control-sm" id="toTime" name='toTime' value='toTime' onChange={handleChange} /> */}
                                    <input
                                        type="time"
                                        className="form-control form-control-sm"
                                        id="toTime"
                                        name="toTime"
                                        value={toTime}
                                        onChange={handleChange}
                                    />
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
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
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
                            </BoxContainer>

                        </div>
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text={t("Time_Slot_Master_List")}/>
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("From_Time")}</th>
                                            <th>{t("To_Time")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {timeSlotList && timeSlotList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.fromTime}</td>
                                                    <td>{val.toTime}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.fromTime, val.toTime, val.userId) }}><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </TableContainer>
                                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
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
