import React, { useEffect, useState } from 'react'
import GetGroupkeywordList from '../../Api/Schedule/GET/GetGroupkeywordList';
import Loader from '../../../Component/Loader';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';
import GetGrouplist from '../../Api/Schedule/GET/GetGrouplist';
import Heading from '../../../Component/Heading';
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import clearIcon from '../../../assets/images/icons/clear.svg';
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import { useTranslation } from 'react-i18next';
import PostGroupKeywordAssign from '../../Api/Schedule/POST/PostGroupKeywordAssign';
import UpdateGroupKeywordAssign from '../../Api/Schedule/UPDATE/UpdateGroupKeywordAssign';
import DeleteGroupkeywordassign from '../../Api/Schedule/Delete/DeleteGroupkeywordassign';

export default function GroupKeywordAssign() {
    let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
    let [keyword, setkeyword] = useState();
    let [groupList, setGroupList] = useState([]);
    let [groupkeywordList, setgroupkeywordList] = useState([]);
    let [selectedGroup, setSelectedGroup] = useState();
    let [selectedGroupName, setSelectedGroupName] = useState();
    let [editsetSelectedGroup, seteditsetSelectedGroup] = useState('');
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
        document.getElementById("errkeyword").style.display = "none";
        document.getElementById("errGroup").style.display = "none";
        const name = e.target.name;
        const value = e.target.value;
        if (name === "keyword") {
            setkeyword(value);
        }
        if (name === "ddlGroup")
            setSelectedGroup(value);
            seteditsetSelectedGroup("");
    }


    let groupkeywordLists = async () => {
        const response = await GetGroupkeywordList();
        if (response.status === 1) {
            setgroupkeywordList(response.responseValue);
        }
    }

    let getAllGroup = async () => {
        const response = await GetGrouplist();
        if (response.status === 1) {
            setGroupList(response.responseValue);
        }
    }

    let handlerSave = async () => {
        if (keyword === '' || keyword === 0 || keyword === null || keyword === undefined) {
            document.getElementById("errkeyword").innerHTML = "Please enter keyword";
            document.getElementById("errkeyword").style.display = "block";
        }
        else if (selectedGroup === '' || selectedGroup === 0 || selectedGroup === null || selectedGroup === undefined) {
            document.getElementById("errGroup").innerHTML = "Please select group";
            document.getElementById("errGroup").style.display = "block";
        }
        else {
            const obj = {
                keyword: keyword,
                groupId: selectedGroup,
                userId: userID
            }
            setShowUnderProcess(1);
            const response = await PostGroupKeywordAssign(obj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Saved Successfully");
                groupkeywordLists();
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

    let handleClear = (value) => {
        setRowId(0);
        setUpdateBool(0);
        setClearDropdown(value);
        setkeyword('');
        setSelectedGroup('');
        setSelectedGroupName('');
        seteditsetSelectedGroup('');
        document.getElementById("errkeyword").style.display = "none";
        document.getElementById("errGroup").style.display = "none";
    }

    let handleEdit = (params) => {
        setRowId(params.id);
        seteditsetSelectedGroup(params.groupName);
        setSelectedGroupName(params.groupName);
        setSelectedGroup(params.groupId);
        setkeyword(params.keyword);
        setUpdateBool(1);
    }

    let handlerUpdate=async()=>{
        if (keyword === '' || keyword === 0 || keyword === null || keyword === undefined) {
            document.getElementById("errkeyword").innerHTML = "Please enter keyword";
            document.getElementById("errkeyword").style.display = "block";
        }
        else if (selectedGroup === '' || selectedGroup === 0 || selectedGroup === null || selectedGroup === undefined) {
            document.getElementById("errGroup").innerHTML = "Please select group";
            document.getElementById("errGroup").style.display = "block";
        }
        else{
            const obj={
                id:rowID,
                keyword:keyword,
                groupId:selectedGroup,
                groupName:selectedGroupName,
                userId:userID
            }
            setShowUnderProcess(1);
            const response = await UpdateGroupKeywordAssign(obj);
            if(response.status===1){
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Updated Successfully");
                setTimeout(() => {
                    setShowToster(0);
                    handleClear(1);
                    groupkeywordLists();
                }, 2000)
            }
            else{
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

    let handleDelete = async()=>{
        setShowLoder(0);
        const response = await DeleteGroupkeywordassign(rowID);
        if(response.status===1){
            setisShowToaster(1);
            setShowSuccessMsg('Deleted Successfully..!!');
            groupkeywordLists();
            setTimeout(() => {
                setisShowToaster(0);
            }, 2000)
        }
        else{
            setShowLoder(1);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
        }
    }
    useEffect(() => {
        groupkeywordLists();
        getAllGroup();
    }, []);
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Group Keyword Assign Master </div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            <label htmlFor="keyword" className="form-label">keyword Name<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="name" placeholder="Enter keyword" name="keyword" value={keyword} onChange={handleChange} />
                                            <small id="errkeyword" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="roleId" className="form-label">Group <span className="starMandatory">*</span></label>
                                            {groupList &&
                                                <DropdownWithSearch defaulNname="Select Group" name="ddlGroup" list={groupList} valueName="id" displayName="name" getvalue={handleChange} editdata={editsetSelectedGroup} clear={clearDropdown} clearFun={handleClear} />
                                            }
                                            <small id="errGroup" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                            <th>keyword Name</th>
                                            <th>Group User</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupkeywordList && groupkeywordList.map((key, index) => {
                                            return (
                                                <tr key={key.id}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.keyword}</td>
                                                    <td>{key.groupName}</td>
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
