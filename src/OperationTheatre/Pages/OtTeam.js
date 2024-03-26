import React, { useState, useEffect } from "react";
import GetRoleList from "../API/GET/GetRoleList";
import GetOtTeamList from "../API/GET/GetOtTeamList";
import Loder from "../../Component/Loader";
import SaveOtTeam from "../API/POST/SaveOTTeam";
import GetOperationTheaterList from "../API/GET/GetOperationTheaterList";
import UpdateOtTeam from "../API/UPDATE/UpdateOtTeam";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import DeleteOtTeam from "../API/DELETE/DeleteOtTeam";
import GetUserList from "../API/GET/GetUserList";
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function OtTeam() {
    let [isUpdateBtnShow, setisUpdateBtnShow] = useState(false);
    let [rowID, setRowID] = useState(0);
    let [otList, setOTList] = useState([]);
    let [OTTeamList, setOTTeamList] = useState([]);
    let [teamMemberList, setTeamMemberList] = useState([]);
    let [roleList, setRoleList] = useState([]);
    let [showLoder, setShowLoder] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    const {t} = useTranslation();
    let getRoleList = async () => {
        let data = await GetRoleList();
       
        if (data.status === 1) {
            setRoleList(data.responseValue);
        }
        
    }
    let operationTheaterList = async () => {
        setShowLoder(1);
        let data = await GetOperationTheaterList();
        
        if (data.status === 1) {
            setShowLoder(0);
            setOTList(data.responseValue);
        }
       
    }
    let otTeamList = async () => {
        setShowLoder(1);
        let data = await GetOtTeamList();
      
        if (data.status === 1) {
            setShowLoder(0);
            setOTTeamList(data.responseValue);
        }
        
    }
    let getTeamMemberList = async () => {
        setShowLoder(1);
        let data = await GetUserList();
       
        if (data.status === 1) {
            setShowLoder(0);
            setTeamMemberList(data.responseValue);
        }
        
    }
    let handlerSave = async () => {
        document.getElementById('errOT').style.display = "none";
        document.getElementById('errTeamMember').style.display = "none";
        document.getElementById('errRole').style.display = "none";
        const OTID = document.getElementById('ddlOT').value;
        const teamMemberID = document.getElementById('ddlTeamMember').value;
        const roleID = document.getElementById('ddlRole').value;
        if (OTID === '0' || OTID === '' || OTID === null || OTID === undefined) {
            document.getElementById('errOT').innerHTML = "Please Fill Operation Theater Name";
            document.getElementById('errOT').style.display = "block";
            return false;
        }
        else if (teamMemberID === '0' || teamMemberID === null || teamMemberID === undefined) {
            document.getElementById('errTeamMember').innerHTML = "Please Select Team Member";
            document.getElementById('errTeamMember').style.display = "block";
            return false;
        }
        else if (roleID === '0' || roleID === null || roleID === undefined) {
            document.getElementById('errRole').innerHTML = "Please Select Role";
            document.getElementById('errRole').style.display = "block";
            return false;
        }
        else {
            let obj = {
                otID: OTID,
                teamMemberID: teamMemberID,
                roleID: roleID,
                userID: 99

            }
           
            let data = await SaveOtTeam(obj);
           
            if(data.status===1){
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    clearSaveUpdate();
                    otTeamList();

                }, 2000)
            }
            else{
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(data.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }
            

        }

    }
    let edit = (list) => {
        
        setisUpdateBtnShow(true);
        setRowID(list.id);
        document.getElementById('ddlOT').value = list.otID;
        document.getElementById('ddlTeamMember').value = list.teamMemberID;
        document.getElementById('ddlRole').value = list.roleID;
    }
    let handlerUpdate = async () => {
        document.getElementById('errOT').style.display = "none";
        document.getElementById('errTeamMember').style.display = "none";
        document.getElementById('errRole').style.display = "none";
        const OTID = document.getElementById('ddlOT').value;
        const teamMemberID = document.getElementById('ddlTeamMember').value;
        const roleID = document.getElementById('ddlRole').value;
        if (OTID === '0' || OTID === '' || OTID === null || OTID === undefined) {
            document.getElementById('errOT').innerHTML = "Please Fill Operation Theater Name";
            document.getElementById('errOT').style.display = "block";
            return false;
        }
        else if (teamMemberID === '0' || teamMemberID === null || teamMemberID === undefined) {
            document.getElementById('errTeamMember').innerHTML = "Please Select Team Member";
            document.getElementById('errTeamMember').style.display = "block";
            return false;
        }
        else if (roleID === '0' || roleID === null || roleID === undefined) {
            document.getElementById('errRole').innerHTML = "Please Select Role";
            document.getElementById('errRole').style.display = "block";
            return false;
        }
        else {
            let obj = {
                id:rowID,
                otID: OTID,
                teamMemberID: teamMemberID,
                roleID: roleID,
                userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
              

            }
           
            let data= await UpdateOtTeam(obj);
            if(data.status === 1){
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    clearSaveUpdate();
                    otTeamList();

                }, 2000)
            }
            else{
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage(data.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
            }
            

        }
    }
    let handlerClear = () => {
        document.getElementById('errOT').style.display = "none";
        document.getElementById('errTeamMember').style.display = "none";
        document.getElementById('errRole').style.display = "none";
        setisUpdateBtnShow(false);
        document.getElementById('ddlOT').value = 0;
        document.getElementById('ddlTeamMember').value = 0;
        document.getElementById('ddlRole').value = 0;

    }
    let clearToaster = () => {
        document.getElementById('errOT').style.display = "none";
        document.getElementById('errTeamMember').style.display = "none";
        document.getElementById('errRole').style.display = "none";
    }
    let clearSaveUpdate = () => {
        setisUpdateBtnShow(false);
        document.getElementById('ddlOT').value = 0;
        document.getElementById('ddlTeamMember').value = 0;
        document.getElementById('ddlRole').value = 0;
    }
    let deleteRow = async() => {
        let userID=JSON.parse(window.sessionStorage.getItem("LoginData")).userId
      
        let data = await DeleteOtTeam(rowID,userID);
        if(data.status === 1){
            setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Deleted Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    clearSaveUpdate();
                    otTeamList();

                }, 2000)
        }
        else{
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(data.responseValue)
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
        }
    }
    useEffect(() => {
        getRoleList();
        otTeamList();
        getTeamMemberList();
        operationTheaterList();
    }, []);
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Operation_Theater_Team")}</div>
                                <div className="inner-content">
                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">
                                                {/* <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="Code" className="form-label">Surgery Title</label>
                                                    <input type="text" className="form-control form-control-sm" name="surgery" value={surgery}  placeholder="Enter Surgery Title" onChange={handlerChange}/>
                                                </div> */}
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">{t("Operation_Theater")}<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlOT' aria-label=".form-select-sm example" onChange={clearToaster}>
                                                        <option value="0">{t("Select_OT")}</option>
                                                        {otList && otList.map((list, index) => {
                                                       
                                                            return (
                                                                <option value={list.id}>{list.operationTheterName}</option>
                                                            )
                                                            })}
                                                    </select>
                                                    <small id="errOT" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">{t("Team_Member")}<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlTeamMember' aria-label=".form-select-sm example" onChange={clearToaster}>
                                                        <option value="0">{t("Select_Team")}</option>
                                                        {teamMemberList && teamMemberList.map((list, index) => {
                                                       
                                                            return (
                                                                <option value={list.id}>{list.name}</option>
                                                            )
                                                            })}
                                                    </select>
                                                    <small id="errTeamMember" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">{t("Role")}<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlRole' aria-label=".form-select-sm example" onChange={clearToaster}>
                                                        <option value="0">{t("Select_Role")}</option>
                                                        {/* <option value="1">Role 1</option> */}
                                                        {roleList && roleList.map((list, index) => {

                                                            return (
                                                                <option value={list.id}>{list.roleTitle}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <small id="errRole" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>



                                                <div className="mb-2 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                                :
                                                                <div>
                                                                    {isUpdateBtnShow !== true ? <>
                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveBtnIcon} className='icnn' alt='' />{t("Save")}</button> 
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}><img src={clearBtnIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                                    </> :
                                                                        <>
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>{t("Update")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>{t("Cancel")}</button>
                                                                        </>
                                                                    }
                                                                </div>
                                                        }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                                            <th>{t("Operation_Theater")}</th>
                                            <th>{t("Team_Member")}</th>
                                            <th>{t("Role")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            OTTeamList && OTTeamList.map((list, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{list.otName}</td>
                                                        <td>{list.teamMemberID}</td>
                                                        <td>{list.roleName}</td>
                                                        <td>
                                                            <div className="action-button">
                                                                <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }}/></div>
                                                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id) }}/>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------Start Delete Modal Popup-------------------    */}

                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">
                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------End Delete Modal Popup---------------------  */}
                {
                    showLoder === 1 ? <Loder val={showLoder} /> : ""
                }
            </section>
        </>
    )
}