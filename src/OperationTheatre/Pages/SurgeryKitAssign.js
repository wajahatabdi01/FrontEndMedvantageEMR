import react, { useEffect, useState } from 'react';
import GetSurgeryList from '../API/GET/GetSurgeryList';
import GetKitList from '../API/GET/GetKitList';
import SaveSurgeryKitAssign from '../API/POST/SaveSurgeryKitAssign';
import GetSurgeryKitAssignList from '../API/GET/GetSurgeryKitAssignList';
import UpdateSurgeryKitAssign from '../API/UPDATE/UpdateSurgeryKitAssign';
import DeleteSurgeryKitAssign from '../API/DELETE/DeleteSurgeryKitAssign';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function SurgeryKitAssign() {
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [rowID, setRowID] = useState(0);
    let [surgeryList, setSurgeryList] = useState([]);
    let [kitList, setKitList] = useState([]);
    let [surgeryKitAssignList, setSurgeryKitAssignList] = useState([]);
    let [showLoder, setShowLoder] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    const {t} = useTranslation();

    let getSurgeryList = async () => {
        let data = await GetSurgeryList();
        console.log('datasur', data);
        if (data.status === 1) {
            setSurgeryList(data.responseValue);
        }
    }
    let getKitList = async () => {
        let data = await GetKitList();
        console.log('datakit', data);
        if (data.status === 1) {
            setKitList(data.responseValue);
        }
    }
    let getAssignSurgeryKitList = async () => {
        let response = await GetSurgeryKitAssignList();
        console.log('response', response);
        if (response.status === 1) {
            setSurgeryKitAssignList(response.responseValue)
        }
    }
    let handleSave = async () => {
        const surgeryID = document.getElementById("ddlSurgery").value;
        const kitID = document.getElementById("ddlKit").value;
        document.getElementById("errddlSurgery").style.display = "none";
        document.getElementById("errddlKit").style.display = "none";
        if (surgeryID === '0' || surgeryID === undefined || surgeryID === null) {
            document.getElementById("errddlSurgery").style.display = "block";
            document.getElementById("errddlSurgery").innerHTML = "Please Select Surgery";
        }
        else if (kitID === '0' || kitID === undefined || kitID === null) {
            document.getElementById("errddlKit").style.display = "block";
            document.getElementById("errddlKit").innerHTML = "Please Select Kit";
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                surgeryID: surgeryID,
                kitID: kitID,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId
            }
            let response = await SaveSurgeryKitAssign(obj);
            console.log('response', response);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                setTimeout(() => {
                    getAssignSurgeryKitList();
                    handleClear();
                    setShowToster(0);
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
    let handleUpdate = async () => {
        const surgeryID = document.getElementById("ddlSurgery").value;
        const kitID = document.getElementById("ddlKit").value;
        document.getElementById("errddlSurgery").style.display = "none";
        document.getElementById("errddlKit").style.display = "none";
        if (surgeryID === '0' || surgeryID === undefined || surgeryID === null) {
            document.getElementById("errddlSurgery").style.display = "block";
            document.getElementById("errddlSurgery").innerHTML = "Please Select Surgery";
        }
        else if (kitID === '0' || kitID === undefined || kitID === null) {
            document.getElementById("errddlKit").style.display = "block";
            document.getElementById("errddlKit").innerHTML = "Please Select Kit";
        }
        else {
            setShowUnderProcess(1);
            var obj = {
                id: rowID,
                surgeryID: parseInt(surgeryID),
                kitID: parseInt(kitID),
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId
            }
            console.log('obj',obj);
           
            let response = await UpdateSurgeryKitAssign(obj);
            console.log('response', response);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    getAssignSurgeryKitList();
                    handleClear();
                    setShowToster(0);
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
    let handleClear = async () => {
        document.getElementById('ddlSurgery').value = "0";
        document.getElementById('ddlKit').value = "0";
        document.getElementById('errddlSurgery').style.display = "none";
        document.getElementById('errddlKit').style.display = "none";
        setIsUpdateBtnShow(false);
    }
    let deleteRow = async () => {
        let response= await DeleteSurgeryKitAssign(rowID);
        console.log('response',response);
        if (response.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Data Deleted Successfully!");
            setTimeout(() => {
                getAssignSurgeryKitList();
                handleClear();
                setShowToster(0);
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
    let edit = async (value) => {
        setRowID(value.id);
        document.getElementById("ddlSurgery").value = value.surgeryID;
        document.getElementById("ddlKit").value = value.kitID;
        setIsUpdateBtnShow(true);
        console.log('value', value);
    }
    let clearToasterOrError = async () => {
        document.getElementById('errddlSurgery').style.display = "none";
        document.getElementById('errddlKit').style.display = "none";
    }
    useEffect(() => {
        getAssignSurgeryKitList();
        getSurgeryList();
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
                                <div className="title">{t("Surgery_Kit_Assign")}</div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">

                                        <div className="mb-2 me-2" style={{ width: '200px' }}>
                                            <label htmlFor="ddlSurgery" className="form-label">{t("Surgery")}<span className="starMandatory">*</span></label>
                                            <select className="form-select form-select-sm" id='ddlSurgery' aria-label=".form-select-sm example" onChange={clearToasterOrError}>
                                                <option value="0">{t("Select_Surgery")}</option>
                                                {surgeryList && surgeryList.map((val) => {
                                                    return (
                                                        <option value={val.id}>{val.surgeryTitle}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="errddlSurgery" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="mb-2 me-2" style={{ width: '200px' }}>
                                            <label htmlFor="ddlKit" className="form-label">{t("Kit")}<span className="starMandatory">*</span></label>
                                            <select className="form-select form-select-sm" id='ddlKit' aria-label=".form-select-sm example" onChange={clearToasterOrError}>
                                                <option value="0">{t("Select_Kit")}</option>
                                                {kitList && kitList.map((val) => {
                                                    return (
                                                        <option value={val.id}>{val.kitName}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="errddlKit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>




                                        <div className="mb-2 me-2 relative">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                            {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                    :
                                                    <div>
                                                        {isUpdateBtnShow !== true ? <>
                                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveBtnIcon} className='icnn' alt='' />{t("Save")}</button>
                                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearBtnIcon} className='icnn' alt='' />{t("Clear")}</button>
                                                        </> :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleUpdate}>{t("Update")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}>{t("Cancel")}</button>
                                                            </>
                                                        }
                                                    </div>
                                            }

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
                                            <th>{t("Surgery_Name")}</th>
                                            <th>{t("Kit_Name")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {surgeryKitAssignList && surgeryKitAssignList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.surgeryTitle}</td>
                                                    <td>{list.kitName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }}/></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id) }}/>
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