import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetAPIDepartmentMaster from '../../Api/Master/DepartmentMasterAPI/GetAPIDepartmentMaster'
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import DropdownWithSearch from '../../../Component/DropdownWithSearch'
import GetLocationMaster from '../../Api/Master/LocationMaster/GetLocationMaster'
import PostLocationDepartmentAssign from '../../Api/Master/LocationDepartmentAssign/PostLocationDepartmentAssign'
import GetLocationDepartmentAssign from '../../Api/Master/LocationDepartmentAssign/GetLocationDepartmentAssign'
import DeleteLocationDepartmentAssign from '../../Api/Master/LocationDepartmentAssign/DeleteLocationDepartmentAssign'
import PutLocationDepartmentAssign from '../../Api/Master/LocationDepartmentAssign/PutLocationDepartmentAssign'
import ValidationLocationDepartmentAssign from '../../../Validation/Admin/Master/ValidationLocationDepartmentAssign'
import RemoveDuplicateData from '../../../Code/RemoveDuplicateData'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function LocationDepartmentAssign() {
    let [locationDepartmentList, setLocationDepartmentList] = useState([])
    let [detpartmentList, setDepartmentList] = useState()
    let [locationList, setLocationList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [rowId, setRowId] = useState('')

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [editDepartment, setEditDepartment] = useState("")
    let [editLocation, setEditLocation] = useState("")
    const [searchTerm, setSearchTerm] = useState('');
    const {t} = useTranslation();

    // Function to handle changes in the search term
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationLocationDepartmentAssign(sendForm.deptId, sendForm.locationId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostLocationDepartmentAssign(sendForm);
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
            handleClear();
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
        let getResponse = await GetLocationDepartmentAssign();
        let getDepartment = await GetAPIDepartmentMaster();
        let getLocation = await GetLocationMaster();
        if (getResponse.status === 1) {
            setLocationDepartmentList(getResponse.responseValue)
            setDepartmentList(getDepartment.responseValue)
            // setLocationList(getLocation.responseValue)
            let temp= RemoveDuplicateData(getLocation.responseValue,"buildingName")
            setLocationList(temp)
        }

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setEditDepartment("")
        setEditLocation("")
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1);
        
        let response = await DeleteLocationDepartmentAssign(rowId)
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
    let handleUpdate = async (id, deptId, locationId, userId, departMentName, buildingName) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "id": id,
            "deptId": deptId,
            "locationId": locationId,
            "userId": userId,
        }))
        setEditDepartment(departMentName)
        setEditLocation(buildingName)
    }


    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationLocationDepartmentAssign(sendForm.deptId, sendForm.locationId)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutLocationDepartmentAssign(sendForm)
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
        setEditDepartment("")
        setEditLocation("")
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
                            <Heading text={t("Location_Department_Assign")}/>
                            <BoxContainer>

                                <div className="mb-2 me-2">
                                    <label htmlFor="deptId" className="form-label">{t("Department")} <span className="starMandatory">*</span></label>
                                    
                                    {detpartmentList && <DropdownWithSearch defaulNname={t("Select_Department")} name="deptId" list={detpartmentList} valueName="id" displayName="departmentName" editdata={editDepartment} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                                </div>
                                <div className="mb-2 me-2">
                                    <label htmlFor="locationId" className="form-label">{t("Location")} <span className="starMandatory">*</span></label>
                                  
                                    {locationList && <DropdownWithSearch defaulNname={t("Select_Building")} name="locationId" list={locationList} valueName="id" displayName="buildingName" editdata={editLocation} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
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
                        <div className="col-12 mt-3">
                            <div className='handlser'>
                                <Heading text={t("Location_Department_Assign_List")} />
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} value={searchTerm} onChange={handleSearch} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Department")}</th>
                                            <th>{t("Building_Name")}</th>
                                            <th>{t("Floor_Name")}</th>
                                            <th>{t("Room_Number")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {locationDepartmentList && locationDepartmentList.filter((val) => `${val.departmentName}${val.roomNumber}`.toLowerCase().includes(searchTerm.toLowerCase())).map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.departMentName}</td>
                                                    <td>{val.buildingName}</td>
                                                    <td>{val.floorName}</td>
                                                    <td>{val.roomNumber}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val.id, val.deptId, val.locationId, val.userId, val.departMentName, val.buildingName) }}><img src={IconEdit} alt='' /></div>
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
