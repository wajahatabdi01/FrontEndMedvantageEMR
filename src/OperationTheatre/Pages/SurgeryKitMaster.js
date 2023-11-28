import React, { useEffect, useState } from 'react'
import SaveKitMaster from '../API/POST/SaveKitMaster';
import GetKitList from '../API/GET/GetKitList';
import UpdateKitMaster from '../API/UPDATE/UpdateKitMaster';
import DeleteSurgeryKit from '../API/DELETE/DeleteSurgeryKit';
import Loder from '../../Component/Loader';
import Toster from '../../Component/Toster';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function SurgeryKitMaster() {
    let [isUpdateBtnShow, setisUpdateBtnShow] = useState(false);
    let [kitName, setKitName] = useState();
    let [kitlist, setKitList] = useState([]);
    let [rowID, setRowID] = useState();
    let [showLoder, setShowLoder] = useState(0);

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const {t} = useTranslation();


    let handlerChange = (e) => {
        // document.getElementById('success').style.display = "none";
        // document.getElementById('successUpdate').style.display = "none";
        // document.getElementById('successDelete').style.display = "none";
        document.getElementById('errKit').style.display = "none";
        if (e.target.name === "kitName") {
            setKitName(e.target.value);
        }
    }
    let getKitList = async () => {
        setShowLoder(1)
        let data = await GetKitList();
        console.log('data', data);
        if (data.status === 1) {
            setShowLoder(0)
            setKitList(data.responseValue);
        }

    }

    let handlerSave = async () => {
        document.getElementById('errKit').style.display = "none";
        if (kitName === '' || kitName === null || kitName === undefined) {
            document.getElementById('errKit').innerHTML = "Please fill Kit Name";
            document.getElementById('errKit').style.display = "block";
            return false;
        }
            else if(kitName.trim().length===0){
                document.getElementById('errKit').innerHTML = "Please remove blank space";
                document.getElementById('errKit').style.display = "block";
            return false;
        }

        else {
            setShowUnderProcess(1);
            var obj = {
                kitName: kitName,
                status: 1,
                userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
            console.log('obj', obj);
            let data = await SaveKitMaster(obj);
            console.log(data);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    clearSaveUpdate();
                    getKitList();

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
    let handlerClear = () => {
        setisUpdateBtnShow(false);
        document.getElementById('errKit').style.display = "none";
        setKitName('');
    }
    let edit = (list) => {
        console.log(list);
        setisUpdateBtnShow(true);
        setKitName(list.kitName);
        setRowID(list.id);
    }
    let handlerUpdate = async () => {
        document.getElementById('errKit').style.display = "none";
        if (kitName === '' || kitName === null || kitName === undefined) {
            document.getElementById('errKit').innerHTML = "Please Fill Kit Name";
            document.getElementById('errKit').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                id: rowID,
                kitName: kitName,
                status: 1,
                userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
            console.log('obj', obj);

            let data = await UpdateKitMaster(obj);
            console.log(data);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    clearSaveUpdate();
                    getKitList();
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
    let deleteRow = async () => {
        setShowUnderProcess(1);
        document.getElementById('errKit').style.display = "none";
        let data = await DeleteSurgeryKit(rowID);
        if (data.status === 1) {
            setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Deleted Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    clearSaveUpdate();
                    getKitList();

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
    let clearSaveUpdate = () => {
        setKitName('');
        setisUpdateBtnShow(false);
    }
    useEffect(() => {
        getKitList();
    }, []);
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Surgery_Kit_Master")}</div>
                                <div className="inner-content">
                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="Code" className="form-label"> {t("Kit_Name")} <span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" name="kitName" value={kitName} placeholder={t("Enter_Kit_Name")} onChange={handlerChange} />
                                                    <small id="errKit" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                                    <div>
                                                        
                                                        {/* {isUpdateBtnShow === true ? <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button> :
                                                            <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerSave}>Save</button>}
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>Clear</button> */}
                                                    </div>
                                                    {/* <div id="success" className="alert alert-success alert-dismissible fade show" role="alert"
                                                        style={{ display: 'none' }}>
                                                        <strong><i className="fa fa-check" aria-hidden="true"></i> </strong>Kit Saved Successfully
                                                    </div>
                                                    <div id="successUpdate" className="alert alert-success alert-dismissible fade show" role="alert"
                                                        style={{ display: 'none' }}>
                                                        <strong><i className="fa fa-check" aria-hidden="true"></i> </strong> Kit Updated Successfully
                                                    </div>
                                                    <div id="successDelete" className="alert alert-success alert-dismissible fade show" role="alert"
                                                        style={{ display: 'none' }}>
                                                        <strong><i className="fa fa-check" aria-hidden="true"></i> </strong> Kit Deleted Successfully
                                                    </div> */}
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
                                            <th>{t("Kit_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {kitlist && kitlist.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.kitName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }}/> </div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id); }}/>
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
