import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationLocationMaster from '../../../Validation/Admin/Master/ValidationLocationMaster';
import PostLocationMaster from '../../Api/Master/LocationMaster/PostLocationMaster';
import GetLocationMaster from '../../Api/Master/LocationMaster/GetLocationMaster';
import GetBuildingMaster from '../../Api/Master/BuildingMaster/GetBuildingMaster';
import GetFloorMaster from '../../Api/Master/FloorMaster/GetFloorMaster';
import GetRoomMaster from '../../Api/Master/RoomMaster/GetRoomMaster';
import GetCareTakerMaster from '../../Api/Master/CareTakerMaster/GetCareTakerMaster';
import DeleteLocationMaster from '../../Api/Master/LocationMaster/DeleteLocationMaster';
import PutLocationMaster from '../../Api/Master/LocationMaster/PutLocationMaster';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function LocationMaster() {
    let [locationList, setLocationList] = useState([])
    let [buildingList, setBuildingList] = useState()
    let [floorList, setFloorList] = useState()
    let [roomList, setRoomList] = useState()
    let [caretakerList, setCaretakerList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('');

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editBuildingName, setEditBuildingName] = useState("")
    let [editFloorName, setEditFloorName] = useState("")
    let [editRoom, setEditRoom] = useState("")
    let [editcareTaker, setEditcareTaker] = useState("")
    const [searchTerm, setSearchTerm] = useState('');
    const {t} = useTranslation();
    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationLocationMaster(sendForm.buildingID, sendForm.floorID, sendForm.roomID, sendForm.careTakerID)
       
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostLocationMaster(sendForm);
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
        let getResponse = await GetLocationMaster();
        let getBuilding = await GetBuildingMaster();
        let getFloor = await GetFloorMaster();
        let getRoom = await GetRoomMaster();
        let getCaretaker = await GetCareTakerMaster();


        if (getResponse.status === 1) {
            // setLoder(0)
            setLocationList(getResponse.responseValue)
            setBuildingList(getBuilding.responseValue)
            setFloorList(getFloor.responseValue)
            setRoomList(getRoom.responseValue)
            setCaretakerList(getCaretaker.responseValue)

        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditBuildingName("")
        setEditFloorName("")
        setEditRoom("")
        setEditcareTaker("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }


    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let obj = {
            id: rowId
        }
        let response = await DeleteLocationMaster(obj)
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
    let handleUpdate = async (id, buildingID, floorID, roomID, careTakerID, userId, buildingName, floorName, roomNumber, caretakerName) => {

        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "buildingID": buildingID,
            "floorID": floorID,
            "roomID": roomID,
            "careTakerID": careTakerID,
            "userId": userId,

        }))
        setEditBuildingName(buildingName);
        setEditFloorName(floorName);
        setEditRoom(roomNumber);
        setEditcareTaker(caretakerName);
        // document.getElementById("buildingID").value = buildingID;
        // document.getElementById("floorID").value = floorID;
        // document.getElementById("roomID").value = roomID;
        // document.getElementById("careTakerID").value = careTakerID;
    }



    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationLocationMaster(sendForm.buildingID, sendForm.floorID, sendForm.roomID, sendForm.careTakerID)
       
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutLocationMaster(sendForm)
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
    let handleClear = (value) => {
        setSendForm({ "userId": window.userId })
        setClearDropdown(value)
        setEditBuildingName("")
        setEditFloorName("")
        setEditRoom("")
        setEditcareTaker("")
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
                            <Heading text={t("Location_Master")} />
                            <BoxContainer>

                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="buildingID" className="form-label">{t("Building_Name")}<span className="starMandatory">*</span></label>
                                    {buildingList && <DropdownWithSearch defaulNname={t("Select_Building")} name="buildingID" list={buildingList} valueName="id" displayName="buildingName" editdata={editBuildingName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="floorID" className="form-label">{t("Floor_No")}<span className="starMandatory">*</span></label>
                                    {floorList && <DropdownWithSearch defaulNname={t("Select_Floor")} name="floorID" list={floorList} valueName="id" displayName="floorName" editdata={editFloorName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="roomID" className="form-label">{t("Room_No")}<span className="starMandatory">*</span></label>
                                  
                                    {roomList && <DropdownWithSearch defaulNname={t("Select_Room")} name="roomID" list={roomList} valueName="id" displayName="roomNumber" editdata={editRoom} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                                    <label htmlFor="careTakerID" className="form-label">{t("Caretaker_Name")}</label>
                                  
                                    {caretakerList && <DropdownWithSearch defaulNname={t("Select_Caretaker")} name="careTakerID" list={caretakerList} valueName="id" displayName="caretakerName" editdata={editcareTaker} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
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
                                <Heading text={t("Location_List")}/>
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
                                            <th>{t("Building_Name")}</th>
                                            <th>{t("Floor_No")}</th>
                                            <th>{t("Room_No")}</th>
                                            <th>{t("Caretaker_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {locationList && locationList.filter((val) => `${val.buildingName}${val.floorName}${val.roomNumber}${val.caretakerName}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.buildingName}</td>
                                                    <td>{val.floorName}</td>
                                                    <td>{val.roomNumber}</td>
                                                    <td>{val.caretakerName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.buildingID, val.floorID, val.roomID, val.careTakerID, val.userId, val.buildingName, val.floorName, val.roomNumber, val.caretakerName) }} /></div>
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
