import React, { useEffect, useState } from 'react';
import SaveSurgeryChecklistItem from '../API/POST/SaveSurgeryCheklistItem';
import GetSurgeryChecklistItemList from '../API/GET/GetSurgeryChecklistItem';
import DeleteSurgeryChecklistItem from '../API/DELETE/DeleteSurgeryChecklistItem';
import UpdateSurgeryChecklistItem from '../API/UPDATE/UpdateSurgeryChecklistItem';
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function SurgeryCheckListItemMaster() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [checkListName, setCheckListName] = useState('');
    let [checkListItemList, setCheckListItemList] = useState('');
    let [rowID, setRowID] = useState([]);
    let [showLoder, setShowLoder] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const { t } = useTranslation();
    let handlerChange = async (e) => {
        document.getElementById('errcheckList').style.display = "none";
        if (e.target.name === "checkListName") {
            setCheckListName(e.target.value)
        }
    }
    let getChecklistItemList = async () => {
        setShowLoder(1);
        let data = await GetSurgeryChecklistItemList();
        if (data.status === 1) {
            setShowLoder(0);
            setCheckListItemList(data.responseValue);
            
        }

    }
    let handlerSave = async () => {
        if (checkListName === '' || checkListName === null || checkListName === undefined) {
            document.getElementById('errcheckList').innerHTML = "Please Fill Checklist Item";
            document.getElementById('errcheckList').style.display = "block";
            return false;
        }
        else if (checkListName.trim().length === 0) {
            document.getElementById('errcheckList').innerHTML = "Please remove blank space";
            document.getElementById('errcheckList').style.display = "block";
        }

        else {
            setShowUnderProcess(1);
            var obj = {
                checkListName: checkListName,
                status: true,
                userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
           
            let data = await SaveSurgeryChecklistItem(obj);
           
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    setCheckListName('');
                    getChecklistItemList();

                }, 2000)


            }
            else {
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
        setRowID(list.id);
        setIsUpdateBtnShow(true);
        setCheckListName(list.checkListName);
    }
    let handlerUpdate = async () => {
        document.getElementById('errcheckList').style.display = "none";
        if (checkListName.trim() === '' || checkListName === null || checkListName === undefined) {
            document.getElementById('errcheckList').innerHTML = "Please Fill Checklist Item";
            document.getElementById('errcheckList').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                id: rowID,
                checkListName: checkListName,
                status: 1,
                userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
          
            let data = await UpdateSurgeryChecklistItem(obj);
          
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    setCheckListName('');
                    setIsUpdateBtnShow(false);
                    getChecklistItemList();

                }, 2000)


            }
            else {
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
    let handlerClear = async () => {
        document.getElementById('errcheckList').innerHTML = "";
        document.getElementById('errcheckList').style.display = "none";
        setCheckListName('');
        setIsUpdateBtnShow(false);



    }

    let deleteRow = async () => {
        let data = await DeleteSurgeryChecklistItem(rowID);
        
        setShowUnderProcess(1);
        if (data.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Data Deleted Successfully!");
            setTimeout(() => {
                setShowToster(0);
                setCheckListName('');
                getChecklistItemList();

            }, 2000)

        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage(data.responseValue)
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }

    }
    useEffect(() => {
        getChecklistItemList();
    }, []);
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Surgery_Checklist_Item_Master")}</div>
                                <div className="inner-content">
                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="Code" className="form-label"> {t("Checklist_Item")}</label>
                                                    <input type="text" className="form-control form-control-sm" name="checkListName" value={checkListName} placeholder={t("Enter_Check_List_Item")} onChange={handlerChange} />
                                                    <small id="errcheckList" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="mb-2 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                    <div>
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
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                                            <th>{t("CheckList_Item_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {checkListItemList && checkListItemList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.checkListName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id); }} />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>

                                            )
                                        })}

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