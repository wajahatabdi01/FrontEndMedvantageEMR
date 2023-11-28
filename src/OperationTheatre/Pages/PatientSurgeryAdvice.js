import React, { useState, useEffect } from 'react';
import SavePatientSurgeryAdvice from '../API/POST/SavePatientSurgeryAdvice';
import GetSurgeryList from '../API/GET/GetSurgeryList';
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import DeletePatientSurgeryAdvice from '../API/DELETE/DeletePatientSurgeryAdvice';
import GetItemList from '../API/GET/GetItemList';
import GetSurgeryAdviceList from '../API/GET/GetSurgeryAdviceList';
import UpdatePatientSurgeryAdvice from '../API/UPDATE/UpdatePatientSurgeryAdvice';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function PatientSurgeryAdvice() {
    let [isUpdateBtnShow, setisUpdateBtnShow] = useState(false);
    let [ptUhid, setptUhid] = useState('');
    let [expectedSurgeryDate, setexpectedSurgeryDate] = useState('');
    let [surgeryList, setSurgeryList] = useState([]);
    let [surgeryAdviceList, setSurgeryAdviceList] = useState([]);
    let [remark, setremark] = useState('');
    let [showLoder, setShowLoder] = useState(0);
    let [rowID, setRowID] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    const {t} = useTranslation();
    let handlerChange = (e) => {
        handlerClearToast();
        if (e.target.name === "uhid") {
            setptUhid(e.target.value);
        }
        if (e.target.name === "expectedSurgeryDate") {
            setexpectedSurgeryDate(e.target.value);
        }
        if (e.target.name === "remark") {
            setremark(e.target.value);
        }

    }
    let getSurgeryList = async () => {
        let data = await GetSurgeryList();
        if (data.status === 1) {
            setSurgeryList(data.responseValue);

        }

    }
    let getSurgeryAdviceList = async () => {
        setShowLoder(1);
        let data = await GetSurgeryAdviceList();
        console.log('advice list', data);
        if (data.status === 1) {
            setShowLoder(0);
            setSurgeryAdviceList(data.responseValue);
        }
    }
    let handlerSave = async () => {
        document.getElementById("errUHID").style.display = "none";
        document.getElementById("errSurgeryDate").style.display = "none";
        document.getElementById("errDDLSurgery").style.display = "none";
        const surgeryID = document.getElementById("ddlSurgery").value;
        if (ptUhid === '' || ptUhid === 0 || ptUhid === undefined || ptUhid === NaN) {
            document.getElementById("errUHID").style.display = "block";
            document.getElementById("errUHID").innerHTML = "Please Fill UHID";

        }
        else if (expectedSurgeryDate === '' || expectedSurgeryDate === undefined || expectedSurgeryDate === null) {
            document.getElementById("errSurgeryDate").style.display = "block";
            document.getElementById("errSurgeryDate").innerHTML = "Please Fill Expected Surgery Date";
        }
        else if (surgeryID === '0' || surgeryID === undefined || surgeryID === null) {
            document.getElementById("errDDLSurgery").style.display = "block";
            document.getElementById("errDDLSurgery").innerHTML = "Please Select Surgery";
        }
        else {
            setShowUnderProcess(1);
            let obj = {
                Uhid: ptUhid,
                expectedSurgeryDate: expectedSurgeryDate,
                surgeryID: parseInt(surgeryID),
                remark: remark,
                userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
            console.log('obj', obj);
            let data = await SavePatientSurgeryAdvice(obj);
            console.log('dtaa', data);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getSurgeryAdviceList();
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
        const date = list.expectedSurgeryDate.split('/');
        const expctSurgeryDate = date[2] + '-' + date[1] + '-' + date[0];
        console.log('date part', date);
        setRowID(list.id);
        setisUpdateBtnShow(true);
        setptUhid(list.uhId);
        setexpectedSurgeryDate(expctSurgeryDate);
        setremark(list.remark);
        document.getElementById("ddlSurgery").value = list.surgeryID;
    }
    let handlerUpdate = async () => {
        document.getElementById("errUHID").style.display = "none";
        document.getElementById("errSurgeryDate").style.display = "none";
        document.getElementById("errDDLSurgery").style.display = "none";
        const surgeryID = document.getElementById("ddlSurgery").value;
        if (ptUhid === '' || ptUhid === 0 || ptUhid === undefined || ptUhid === NaN) {
            document.getElementById("errUHID").style.display = "block";
            document.getElementById("errUHID").innerHTML = "Please Fill UHID";

        }
        else if (expectedSurgeryDate === '' || expectedSurgeryDate === undefined || expectedSurgeryDate === null) {
            document.getElementById("errSurgeryDate").style.display = "block";
            document.getElementById("errSurgeryDate").innerHTML = "Please Fill Expected Surgery Date";
        }
        else if (surgeryID === '0' || surgeryID === undefined || surgeryID === null) {
            document.getElementById("errDDLSurgery").style.display = "block";
            document.getElementById("errDDLSurgery").innerHTML = "Please Select Surgery";
        }
        else {
            setShowUnderProcess(1);
            let obj = {
                id: rowID,
                uhid: ptUhid,
                expectedSurgeryDate: expectedSurgeryDate,
                surgeryID: parseInt(surgeryID),
                remark: remark,
                userI: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
            }
            console.log('obj', obj);
            let data = await UpdatePatientSurgeryAdvice(obj);
            if (data.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getSurgeryAdviceList();

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
        document.getElementById("errUHID").style.display = "none";
        document.getElementById("errSurgeryDate").style.display = "none";
        document.getElementById("errDDLSurgery").style.display = "none";
        setisUpdateBtnShow(false);
        setptUhid('');
        setexpectedSurgeryDate('');
        setremark('');
        document.getElementById("ddlSurgery").value = 0;
    }
    let handlerClearToast = () => {
        document.getElementById("errUHID").style.display = "none";
        document.getElementById("errSurgeryDate").style.display = "none";
        document.getElementById("errDDLSurgery").style.display = "none";
    }
    let deleteRow = async () => {
        setShowUnderProcess(1);
        console.log(rowID);
        let userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId
        let data = await DeletePatientSurgeryAdvice(rowID, userID)
        console.log('data', data);
        if (data.status === 1) {
            setShowUnderProcess(0);
            setTosterValue(0);
            setShowToster(1);
            setTosterMessage("Data Deleted Successfully!");
            setTimeout(() => {
                setShowToster(0);
                handlerClear();
                getSurgeryAdviceList();

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
        getSurgeryList();
        getSurgeryAdviceList();

    }, []);
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Patient_Surgery_Advice")}</div>
                                <div className="inner-content">

                                    {/* <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="uhid" className="form-label">UHID<span className="starMandatory">*</span></label>
                                                    <input type="number" className="form-control form-control-sm" name="uhid" value={ptUhid} placeholder="Enter UHID" onChange={handlerChange} />
                                                    <small id="errUHID" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="expectedSurgeryDate" className="form-label">Expected Surgery Date<span className="starMandatory">*</span></label>
                                                    <input type="date" className="form-control form-control-sm" id='expectedSurgeryDate' name="expectedSurgeryDate" value={expectedSurgeryDate} onChange={handlerChange} />
                                                    <small id="errSurgeryDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="ddlSurgery" className="form-label">Surgery<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlSurgery' aria-label=".form-select-sm example" onChange={handlerClearToast}>
                                                        <option value="0">Select Surgery</option>

                                                        {surgeryList && surgeryList.map((list) => {

                                                            return (
                                                                <option value={list.id}>{list.surgeryTitle}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <small id="errDDLSurgery" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="remark" className="form-label">Remark</label>
                                                    <input type="text" className="form-control form-control-sm" id='remark' name="remark" value={remark} onChange={handlerChange} />
                                                    <small id="errRemark" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>


                                                <div className="mb-2 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                            :
                                                            <div>
                                                                {isUpdateBtnShow !== true ? <>
                                                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerSave}>Save</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>Clear</button>
                                                                </> :
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}>Cancel</button>
                                                                    </>
                                                                }
                                                            </div>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                </div>

                            </div>
                        </div>
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No")}.</th>
                                            <th>{t("Uhid")}</th>
                                            <th>{t("Expected_Surgery_Date")}</th>
                                            <th>{t("Surgery")}</th>
                                            <th>{t("Remark")}</th>
                                           
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {surgeryAdviceList && surgeryAdviceList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.uhid}</td>
                                                    <td>{list.expectedSurgeryDate}</td>
                                                    <td>{list.surgeryTitle}</td>
                                                    <td>{list.remark}</td>
                                                    {/* <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { edit(list) }}></i></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowID(list.id) }}></i>
                                                            </div>
                                                        </div>
                                                    </td> */}
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
                    showLoder === 1 ? <Loder value={showLoder} /> : ""
                }
            </section>
        </>
    )
}
