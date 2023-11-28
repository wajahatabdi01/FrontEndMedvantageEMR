import React, { useEffect, useState } from 'react'
import GetUserList from '../../Api/Schedule/GET/GetUserList';
import GetRoleList from '../../../OperationTheatre/API/GET/GetRoleList';
import GetDesignationList from '../../Api/Schedule/GET/GetDesignationList';
import GetNotificationCategory from '../../Api/Schedule/GET/GetNotificationCategory';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import { useTranslation } from 'react-i18next';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import i18n from "i18next";
import Heading from '../../../Component/Heading';
import GetEscalationList from '../../Api/Schedule/GET/GetEscalationList';
import PostEscalation from '../../Api/Schedule/POST/PostEscalation';
import UpdateEscalation from '../../Api/Schedule/UPDATE/UpdateEscalation';
import DeleteEscalation from '../../Api/Schedule/Delete/DeleteEscalation';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';
import Loader from '../../../Component/Loader';

export default function EscalationMaster() {
    let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
    let [escalationList, setEscalationList] = useState([]);
    let [rolelist, setroleList] = useState([]);
    let [selectedRole, setSelectedRole] = useState();
    let [selectedRoleName, setSelectedRoleName] = useState();
    let [userList, setUserList] = useState([]);
    let [selectedUsername, setSelectedUserName] = useState();
    let [selectedUser, setSelectedUser] = useState();
    let [designationList, setDesignationList] = useState([]);
    let [selectedDesignation, setSelectedDesignation] = useState();
    let [selectedDesignationName, setSelectedDesignationName] = useState();
    let [levelNo, setLevelNo] = useState();
    let [notificationCategoryList, setNotificationCategoryList] = useState([]);
    let [selectedNotificationCategory, setSelectedNotificationCategory] = useState();
    let [selectedNotificationCategoryName, setSelectedNotificationCategoryName] = useState();
    let [editrole, setEditRole] = useState('');
    let [editUser, setEditUser] = useState('');
    let [editdesignation, setEditDesignation] = useState('');
    let [editnotificationCategory, setEditNotificationCategory] = useState('');
    let [clearDropdown, setClearDropdown] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [updateBool, setUpdateBool] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [rowID, setRowId] = useState(0);
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    let handleChange = (e) => {
        document.getElementById('errRole').style.display = "none"
        document.getElementById('errUser').style.display = "none"
        document.getElementById('errDesignation').style.display = "none"
        document.getElementById('errNotificationCategory').style.display = "none"
        document.getElementById('errLevel').style.display = "none"
        const name = e.target.name;
        const value = e.target.value;
        if (name === "ddlRole") {
            setSelectedRole(value);
            setEditRole("");
        }
        if (name === "ddlUser") {
            setSelectedUser(value);
            setEditUser("");
        }
        if (name === "ddlDesignation") {
            setSelectedDesignation(value);
            setEditDesignation("");
        }
        if (name === "ddlNotificationCategory") {
            setSelectedNotificationCategory(value);
            setEditNotificationCategory("");
        }
        if (name === "levelNo") {
            setLevelNo(value);
        }
    }

    let getAllEscalation = async () => {
        const response = await GetEscalationList();
        if (response.status === 1) {
            setEscalationList(response.responseValue);
        }
    }

    let getAllUsers = async () => {
        const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
        const response = await GetUserList(clientID);
        if (response.status === 1) {
            setUserList(response.responseValue);
        }
    }

    let getAllRole = async () => {
        const response = await GetRoleList();
        if (response.status === 1) {
            setroleList(response.responseValue);
        }
    }

    let getAllDesignation = async () => {
        const response = await GetDesignationList();
        if (response.status === 1) {
            setDesignationList(response.responseValue);
        }
    }

    let getAllNotificationcatgory = async () => {
        const response = await GetNotificationCategory();
        if (response.status === 1) {
            setNotificationCategoryList(response.responseValue);
        }
    }

    let handlerSave = async () => {
        if (selectedRole === '' || selectedRole === null || selectedRole === undefined || selectedRole === 0) {
            document.getElementById('errRole').innerHTML = "Please select role"
            document.getElementById('errRole').style.display = "block"
        }
        else if (selectedUser === '' || selectedUser === null || selectedUser === undefined || selectedUser === 0) {
            document.getElementById('errUser').innerHTML = "Please select User"
            document.getElementById('errUser').style.display = "block"
        }
        else if (selectedDesignation === '' || selectedDesignation === null || selectedDesignation === undefined || selectedDesignation === 0) {
            document.getElementById('errDesignation').innerHTML = "Please select designation"
            document.getElementById('errDesignation').style.display = "block"
        }
        else if (selectedNotificationCategory === '' || selectedNotificationCategory === null || selectedNotificationCategory === undefined || selectedNotificationCategory === 0) {
            document.getElementById('errNotificationCategory').innerHTML = "Please select notification title"
            document.getElementById('errNotificationCategory').style.display = "block"
        }
        else if (levelNo === '' || levelNo === null || levelNo === undefined || levelNo === 0) {
            document.getElementById('errLevel').innerHTML = "Please enter level"
            document.getElementById('errLevel').style.display = "block"
        }
        else {
            const obj = {
                roleId: selectedRole,
                designationId: selectedDesignation,
                levelNo: levelNo,
                notificationCategoryId: selectedNotificationCategory,
                assignUserId: selectedUser,
                userId: userID
            }
            setShowUnderProcess(1);
            const response = await PostEscalation(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Saved Successfully");
                getAllEscalation();
                setTimeout(() => {
                    setShowToster(0);
                    handleClear(1);
                }, 2000)
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

    let handleEdit = (params) => {
        setRowId(params.id);

        setEditRole(params.roleName);
        setSelectedRoleName(params.roleName);
        setSelectedRole(params.roleId);

        setEditUser(params.userName);
        setSelectedUserName(params.userName);
        setSelectedUser(params.assignUserId);

        setEditDesignation(params.designationName);
        setSelectedDesignationName(params.designationName);
        setSelectedDesignation(params.designationId);

        setEditNotificationCategory(params.notificationTitle);
        setSelectedNotificationCategoryName(params.notificationTitle);
        setSelectedNotificationCategory(params.notificationCategoryId);
        setLevelNo(params.levelNo);
        setUpdateBool(1);
    }

    let handlerUpdate = async () => {
        if (selectedRole === '' || selectedRole === null || selectedRole === undefined || selectedRole === 0) {
            document.getElementById('errRole').innerHTML = "Please select role"
            document.getElementById('errRole').style.display = "block"
        }
        else if (selectedUser === '' || selectedUser === null || selectedUser === undefined || selectedUser === 0) {
            document.getElementById('errUser').innerHTML = "Please select User"
            document.getElementById('errUser').style.display = "block"
        }
        else if (selectedDesignation === '' || selectedDesignation === null || selectedDesignation === undefined || selectedDesignation === 0) {
            document.getElementById('errDesignation').innerHTML = "Please select designation"
            document.getElementById('errDesignation').style.display = "block"
        }
        else if (selectedNotificationCategory === '' || selectedNotificationCategory === null || selectedNotificationCategory === undefined || selectedNotificationCategory === 0) {
            document.getElementById('errNotificationCategory').innerHTML = "Please select notification title"
            document.getElementById('errNotificationCategory').style.display = "block"
        }
        else if (levelNo === '' || levelNo === null || levelNo === undefined || levelNo === 0) {
            document.getElementById('errLevel').innerHTML = "Please enter level"
            document.getElementById('errLevel').style.display = "block"
        }
        else {
            const obj = {
                id: rowID,
                roleId: selectedRole,
                roleName: selectedRoleName,
                designationId: selectedDesignation,
                designationName: selectedDesignationName,
                levelNo: levelNo,
                notificationCategoryId: selectedNotificationCategory,
                notificationTitle: selectedNotificationCategoryName,
                assignUserId: selectedUser,
                userName: selectedUsername,
                userID: userID,
            }
            setShowUnderProcess(1);
            const response = await UpdateEscalation(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Updated Successfully");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear(1);
                    getAllEscalation();
                }, 2000)
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

    let handleDelete = async () => {
        setShowLoder(0);
        const response = await DeleteEscalation(rowID);
        if (response.status === 1) {
            setisShowToaster(1);
            setShowSuccessMsg('Deleted Successfully..!!');
            getAllEscalation();
            setTimeout(() => {
                setisShowToaster(0);
            }, 2000)
        }
        else {
            setShowLoder(1);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
        }
    }

    let handleClear = (value) => {
        setRowId(0);
        setUpdateBool(0);
        setClearDropdown(value);
        setSelectedRole('');
        setSelectedRoleName('')
        setEditRole('');
        setSelectedUser('');
        setSelectedUserName('');
        setEditUser('');
        setSelectedDesignation('');
        setSelectedDesignationName('');
        setEditDesignation('');
        setSelectedNotificationCategory('');
        setSelectedNotificationCategoryName('');
        setEditNotificationCategory('');
        setLevelNo('');
        document.getElementById('errRole').style.display = "none";
        document.getElementById('errUser').style.display = "none";
        document.getElementById('errDesignation').style.display = "none";
        document.getElementById('errNotificationCategory').style.display = "none";

    }

    useEffect(() => {
        getAllEscalation();
        getAllUsers();
        getAllRole();
        getAllDesignation();
        getAllNotificationcatgory();
    }, []);

    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Escalation Master </div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="roleId" className="form-label">Role <span className="starMandatory">*</span></label>
                                            {rolelist &&
                                                <DropdownWithSearch defaulNname="Select Role" name="ddlRole" list={rolelist} valueName="id" displayName="roleTitle" getvalue={handleChange} editdata={editrole} clear={clearDropdown} clearFun={handleClear} />
                                            }
                                            <small id="errRole" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="assignUserId" className="form-label">Assign User <span className="starMandatory">*</span></label>
                                            {userList &&
                                                <DropdownWithSearch defaulNname="Select Role" name="ddlUser" list={userList} valueName="id" displayName="name" getvalue={handleChange} editdata={editUser} clear={clearDropdown} clearFun={handleClear} />
                                            }
                                            <small id="errUser" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="designationId" className="form-label">Designation <span className="starMandatory">*</span></label>
                                            {designationList &&
                                                <DropdownWithSearch defaulNname="Select Role" name="ddlDesignation" list={designationList} valueName="id" displayName="designationName" getvalue={handleChange} editdata={editdesignation} clear={clearDropdown} clearFun={handleClear} />
                                            }
                                            <small id="errDesignation" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="notificationCategoryId" className="form-label">Notification Category <span className="starMandatory">*</span></label>
                                            {notificationCategoryList &&
                                                <DropdownWithSearch defaulNname="Select Role" name="ddlNotificationCategory" list={notificationCategoryList} valueName="id" displayName="notificationTitle" getvalue={handleChange} editdata={editnotificationCategory} clear={clearDropdown} clearFun={handleClear} />
                                            }
                                            <small id="errNotificationCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="mb-2 me-2">
                                            <label htmlFor="levelNo" className="form-label">Level No.<span className="starMandatory">*</span></label>
                                            <input type="number" className="form-control form-control-sm" id="name" placeholder="Enter level " name="levelNo" value={levelNo} onChange={handleChange} />
                                            <small id="errLevel" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' />{t("Save")} </button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button> */}
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>{t("Update")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>{t("Cancel")}</button>

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
                                <Heading text="Escalation List" />
                                {/* <Heading text={content} /> */}
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} value={searchTerm} onChange={''} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")} </th>
                                            <th>Role Name</th>
                                            <th>Assigned User</th>
                                            <th>Designation Name</th>
                                            <th>Notification Category Name</th>
                                            <th>Level No</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {escalationList && escalationList.map((key, index) => {
                                            return (
                                                <tr key={key.id}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.roleName}</td>
                                                    <td>{key.userName}</td>
                                                    <td>{key.designationName}</td>
                                                    <td>{key.notificationTitle}</td>
                                                    <td>{key.levelNo}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleEdit(key) }} /></div>
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
                                {/* <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button> */}
                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">{t("Delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
                {/* Toaster */}
                {
                    isShowToaster === 1 ?
                        <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
                }

                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }

            </section>
        </>
    )
}
