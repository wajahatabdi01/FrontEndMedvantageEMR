import React, { useEffect, useState } from 'react';
import Loder from '../../../../../Component/Loader';
import TosterUnderProcess from '../../../../../Component/TosterUnderProcess';
import Toster from '../../../../../Component/Toster';
import deleteBtnIcon from '../../../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../../../assets/images/icons/edit.svg';
import SuccessToster from '../../../../../Component/SuccessToster';
import AlertToster from '../../../../../Component/AlertToster';
import GetOutputTypeList from '../../../../API/Output/GetOutputTypeList';
import GetUnitList from '../../../../API/Output/GetUnitList';
import DropdownWithSearch from '../../../../../Component/DropdownWithSearch';
import SavePatientOutput from '../../../../API/Output/SavePatientOutput';
import GetPatientOutputList from '../../../../API/Output/GetPatientOutputList';
import DeletePatientOutput from '../../../../API/Output/DeletePatientOutput';
import UpdatePatientOutput from '../../../../API/Output/UpdatePatientOutput';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function Output() {


    const { t } = useTranslation();
    document.body.dir = i18n.dir()


    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [showLoder, setShowLoder] = useState(0);
    let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [quantity, setQuantity] = useState('');
    let [date, setDate] = useState();
    let [time, setTime] = useState('');
    let [outputType, setOutputType] = useState(0);
    let [unit, setUnit] = useState(0);
    let [patientOutputList, setPatientOutputList] = useState([]);
    let [outputTypeList, setOutputTypeList] = useState([]);
    let [unitList, setUnitList] = useState([]);
    let [rowID, setRowID] = useState(0);
    // let [pmID, setpmID] = useState(0);
    let [clearDropdown, setClearDropdown] = useState(0);
    let [handlerEditUnit, setHandlerEditUnit] = useState('');
    let [handlerEditOutputType, setHandlerEditOutputType] = useState('');
    let handlerChange = (e) => {
        setHandlerEditUnit('');
        setHandlerEditOutputType('');
        clearErrorMsg();
        let name = e.target.name;
        let value = e.target.value;
        if (name === "date") {
            setDate(value);
        }
        else if (name === "time") {
            setTime(value);
        }
        else if (name === "outputType") {
            setOutputType(value);
        }
        else if (name === "quantity") {
            setQuantity(value);
        }
        else if (name === "unit") {
            setUnit(value);
        }
    }
    let getOutputTypeList = async () => {
        let response = await GetOutputTypeList();
       
        if (response.status === 1) {
            setOutputTypeList(response.responseValue)
        }
    }
    let getUnitList = async () => {
        let response = await GetUnitList();
      
        if (response.status === 1) {
            setUnitList(response.responseValue)
        }
    }
    let getPatientOutputList = async () => {
        let getPmID = "";
        const getActiveUhid = JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
        const getpatientList = JSON.parse(sessionStorage.getItem("IPDpatientList"));
        getpatientList.map((val, i) => {
            if (val.uhId === getActiveUhid) {
                getPmID = val.pmId;
                return;
            }
        });
        setShowLoder(1);
        let data = await GetPatientOutputList(getPmID);
        
        if (data.status === 1) {
            setShowLoder(0)
            setPatientOutputList(data.responseValue);
        }
        else {
            setShowLoder(0);
        }

    }
    let handlerSave = async () => {
        clearErrorMsg();
        if (date === '' || date === null || date === undefined) {
            document.getElementById('errDate').innerHTML = "Please Fill Date";
            document.getElementById('errDate').style.display = "block";
            return false;
        }
        else if (time === '' || time === null || time === undefined) {
            document.getElementById('errTime').innerHTML = "Please Fill Time";
            document.getElementById('errTime').style.display = "block";
            return false;
        }
        else if (outputType === 0 || outputType === null || outputType === undefined) {
            document.getElementById('errOutputType').innerHTML = "Please Select Output Type";
            document.getElementById('errOutputType').style.display = "block";
            return false;
        }
        else if (quantity === '' || quantity === 0 || quantity === null || quantity === undefined) {
            document.getElementById('errQuatity').innerHTML = "Please Fill Quantity";
            document.getElementById('errQuatity').style.display = "block";
            return false;
        }
        else if (unit === 0 || unit === null || unit === undefined) {
            document.getElementById('errUnit').innerHTML = "Please Select Unit";
            document.getElementById('errUnit').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);
            let getPmID = "";
            const getActiveUhid = JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
            const getpatientList = JSON.parse(sessionStorage.getItem("IPDpatientList"));
            getpatientList.map((val, i) => {
                if (val.uhId === getActiveUhid) {
                    getPmID = val.pmId;
                    return;
                }
            });
            if (getPmID !== "" || getPmID !== null || getPmID !== undefined) {

                var obj = {
                    id: 0,
                    pmID: getPmID,
                    outputTypeID: outputType,
                    quantity: parseInt(quantity),
                    unitID: unit,
                    outputDate: date + ' ' + time,
                    userID: userID,
                    clientId: window.clientId
                }
                
            }
            let response = await SavePatientOutput(obj);
          
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Patient Output Saved Successfully");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear(1);
                    getPatientOutputList();
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
        let getPmID = "";
        const getActiveUhid = JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
        const getpatientList = JSON.parse(sessionStorage.getItem("IPDpatientList"));
        getpatientList.map((val, i) => {
            if (val.uhId === getActiveUhid) {
                getPmID = val.pmId;
                return;
            }
        });
       

        const response = await DeletePatientOutput(getPmID, rowID, userID);
        if (response.status === 1) {
            setisShowToaster(1);
            setShowSuccessMsg('Patient Output Deleted Successfully..!!');
            getPatientOutputList();
            setTimeout(() => {
                setisShowToaster(0);
            }, 2000)
        }
        else {
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
            setTimeout(() => {
                setShowAlertToster(0);
            }, 2000)
        }

    }
    let handlerClear = async (val) => {
        clearErrorMsg();
        setIsUpdateBtnShow(false);
        setQuantity('');
        setDate(getCurrentDate());
        setTime(getCurrentTime());
        setUnit(0);
        setOutputType(0);
        setClearDropdown(val);
        setHandlerEditUnit('');
        setHandlerEditOutputType('');
    }
    let clearErrorMsg = () => {
        document.getElementById('errDate').style.display = "none";
        document.getElementById('errTime').style.display = "none";
        document.getElementById('errOutputType').style.display = "none";
        document.getElementById('errQuatity').style.display = "none";
        document.getElementById('errUnit').style.display = "none";
    }
    let handlerEdit = (params) => {
        setIsUpdateBtnShow(true);
        
        setQuantity(params.quantity);
        setDate(params.outputDateFormat);
        setTime(params.outputTimeFormat);
        setUnit(params.unitID);
        setOutputType(params.outputID);
        setRowID(params.id);
        setHandlerEditUnit(params.unitName);
        setHandlerEditOutputType(params.outputType);
    }
    let handlerUpdate = async () => {
        if (date === '' || date === null || date === undefined) {
            document.getElementById('errDate').innerHTML = "Please Fill Date";
            document.getElementById('errDate').style.display = "block";
            return false;
        }
        else if (time === '' || time === null || time === undefined) {
            document.getElementById('errTime').innerHTML = "Please Fill Time";
            document.getElementById('errTime').style.display = "block";
            return false;
        }
        else if (outputType === 0 || outputType === null || outputType === undefined) {
            document.getElementById('errOutputType').innerHTML = "Please Select Output Type";
            document.getElementById('errOutputType').style.display = "block";
            return false;
        }
        else if (quantity === '' || quantity === 0 || quantity === null || quantity === undefined) {
            document.getElementById('errQuatity').innerHTML = "Please Fill Quantity";
            document.getElementById('errQuatity').style.display = "block";
            return false;
        }
        else if (unit === 0 || unit === null || unit === undefined) {
            document.getElementById('errUnit').innerHTML = "Please Select Unit";
            document.getElementById('errUnit').style.display = "block";
            return false;
        }
        else {
            setShowUnderProcess(1);
            let getPmID = "";
            const getActiveUhid = JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
            const getpatientList = JSON.parse(sessionStorage.getItem("IPDpatientList"));
            getpatientList.map((val, i) => {
                if (val.uhId === getActiveUhid) {
                    getPmID = val.pmId;
                    return;
                }
            });
            if (getPmID !== "" || getPmID !== null || getPmID !== undefined) {
                var obj = {
                    id: rowID,
                    pmID: getPmID,
                    outputTypeID: outputType,
                    quantity: parseInt(quantity),
                    unitID: unit,
                    outputDate: date + ' ' + time,
                    userID: userID,
                    clientId: window.clientId

                }
                
            }

            let response = await UpdatePatientOutput(obj);
            
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Patient Output Updated Successfully");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear(1);
                    getPatientOutputList();
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
    let handlerCancelUpdate = () => {
        setIsUpdateBtnShow(false);
        handlerClear(1);
    }
    let getCurrentDate = () => {
        var today = new Date();
        const month = (today.getMonth() + 1).toString().length === 1 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
        const day = today.getDate().toString().length === 1 ? '0' + today.getDate() : today.getDate();
        const currentDate = today.getFullYear() + '-' + month + '-' + day;
        return currentDate;
    }
    let getCurrentTime = () => {
        var today = new Date();
        const minutes = today.getMinutes().toString().length === 1 ? '0' + today.getMinutes() : today.getMinutes();
        const currentTime = today.getHours() + ':' + minutes;
        
        return currentTime;
    }
    useEffect(() => {
        getPatientOutputList();
        getOutputTypeList();
        getUnitList();
        getCurrentTime();
        setDate(getCurrentDate());
        setTime(getCurrentTime());


    }, []);

    return (
        <>
            <section className="main-content_ mt-5_ pt-3_">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Patient Output")}</div>
                                <div className="inner-content">

                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">

                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    {/* <label htmlFor="date" className="form-label">{t("Date")}<span className="starMandatory">*</span></label> */}
                                                    <label htmlFor="date" className="form-label">Date<span className="starMandatory">*</span></label>
                                                    <input type='date' className="form-control form-control-sm" id='date' name='date' value={date} onChange={handlerChange} />
                                                    <small id="errDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="time" className="form-label">{t("Time")}<span className="starMandatory">*</span></label>
                                                    <input type='time' className="form-control form-control-sm" id='time' name='time' value={time} onChange={handlerChange} />
                                                    <small id="errTime" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="ddlOutputType" className="form-label">{t("Output Type")}<span className="starMandatory">*</span></label>
                                                    <DropdownWithSearch defaulNname={t("Select Output Type")} name="outputType" list={outputTypeList} valueName="id" displayName="remark" editdata={handlerEditOutputType} getvalue={handlerChange} clear={clearDropdown} clearFun={handlerClear} />
                                                    {/* <select className="form-select form-select-sm" id='ddlOutputType' name='outputType' aria-label=".form-select-sm example" onChange={handlerChange}>
                                                        <option value="0">Select Output Type</option>
                                                        {outputTypeList && outputTypeList.map((list, index) => {

                                                            return (
                                                                <option value={list.id}>{list.module}</option>
                                                            )
                                                        })}
                                                    </select> */}
                                                    <small id="errOutputType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-1 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="time" className="form-label">{t("Quantity")}<span className="starMandatory">*</span></label>
                                                    <input type="number" className="form-control form-control-sm" id="txtQuantity" placeholder={t("Enter Quantity")} name='quantity' value={quantity} onChange={handlerChange} />
                                                    <small id="errQuatity" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="ddlUnit" className="form-label">{t("Unit")}<span className="starMandatory">*</span></label>
                                                    <DropdownWithSearch defaulNname={t("Select Unit")} name="unit" list={unitList} valueName="id" displayName="unitName" editdata={handlerEditUnit} getvalue={handlerChange} clear={clearDropdown} clearFun={handlerClear} />
                                                    {/* <select className="form-select form-select-sm" id='ddlUnit' name='unit' aria-label=".form-select-sm example" onChange={handlerChange}>
                                                        <option value="0">Select Unit</option>
                                                        {unitList && unitList.map((list, index) => {

                                                            return (
                                                                <option value={list.id}>{list.unitName}</option>
                                                            )
                                                        })}
                                                    </select> */}
                                                    <small id="errUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>




                                                <div className="mb-2 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                                                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                            :
                                                            <div>
                                                                {isUpdateBtnShow === true ?
                                                                    <>
                                                                        <button type="button" className="btn btn-save  btn-sm mb-1 me-1" onClick={handlerUpdate}><img src="" className='icnn' alt='' />{t("Update")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerCancelUpdate}><img src="" className='icnn' alt='' />{t("Cancel")}</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src="" className='icnn' alt='' />{t("Save")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handlerClear(1) }}><img src="" className='icnn' alt='' />{t("Clear")}</button>
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
                                            <th className="text-center" style={{ "width": "5%" }}>S.No.</th>
                                            <th>{t("Output DateTime")}</th>
                                            <th>{t("Output Type")}</th>
                                            <th>{t("Output Quantity / Unit")}</th>
                                            {/* <th>Stool Consistency</th>
                                            <th>Stool Color</th>
                                            <th>Urine Densityy</th> */}
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {patientOutputList && patientOutputList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.outputDate}</td>
                                                    <td >{list.outputType}</td>
                                                    <td >{list.quantity}&nbsp;{list.unitName}</td>
                                                    {/* <td>--</td>
                                                    <td>--</td>
                                                    <td>--</td> */}
                                                    <td>
                                                        <div className="action-button">
                                                            <div title='Edit' onClick={() => { handlerEdit(list) }}><img src={editBtnIcon} className='' alt='' /> </div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" title='Delete' onClick={() => { setRowID(list.id) }}><img src={deleteBtnIcon} className='' alt='' /> </div>
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
                                <div className='popDeleteTitle mt-3'>{t("Delete")}</div>
                                <div className='popDeleteContent'> {t("Are you sure you want to delete?")}</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">{t("Delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* -----------------------End Delete Modal Popup---------------------  */}
                {
                    showLoder === 1 ? <Loder val={showLoder} /> : ""
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