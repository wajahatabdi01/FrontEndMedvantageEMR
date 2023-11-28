import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../../../../Component/TosterUnderProcess';
import Toster from '../../../../../Component/Toster';
import GetListofMachineType from  '../../../../API/AssignMachinetoPatient/GetListofMachineType';
import GetMachineList from '../../../../API/AssignMachinetoPatient/GetMachineList'
import PostAssignMachineToPatient from '../../../../API/AssignMachinetoPatient/PostAssignMachineToPatient'
import GetListofAssignedMachine from '../../../../API/AssignMachinetoPatient/GetListofAssignedMachine'
 import deleteBtnIcon from '../../../../../assets/images/icons/delete.svg';
 import editBtnIcon from '../../../../../assets/images/icons/edit.svg';
import RemoveMachine from  '../../../../API/AssignMachinetoPatient/RemoveMachine'
import DeleteAssignedMachine from '../../../../API/AssignMachinetoPatient/DeleteAssignedMachine'
import AlertToster from '../../../../../Component/AlertToster';
import SuccessToster from '../../../../../Component/SuccessToster';
import Loader from '../../../../../Component/Loader';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import send from '../../../../../assets/images/icons/send.svg'
import save from '../../../../../assets/images/icons/save.svg'
import clear from '../../../../../assets/images/icons/clear.svg'



export default function AssignMachinetoPatient() {
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    let [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
    let [machineTypeList, setMachineTypeList] = useState([]);
    let [machineList, setMachineList] = useState([]);
    let [machineTypeID, setMachineTypeID] = useState('0');
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
    let [assignedMachineList, setAssignedMachineList] = useState([]);
    let [rowID,setRowID]=useState(0);    
    let [pmID,setpmID]=useState(0);    
    let getMachineTypeList = async () => {
        clearErrorMsg();
        let data = await GetListofMachineType();
        if (data.status === 1) {
            setShowLoder(0)
            setMachineTypeList(data.responseValue);
        }
        else {
            setShowLoder(0);
         }
        
    }
    let getMachineList = async () => {
        setShowLoder(1)
        const machineType=document.getElementById('ddlMachineType').value;
        setMachineTypeID(machineType);
        let data = await GetMachineList(machineType);
        if (data.status === 1) {
            setShowLoder(0)
            setMachineList(data.responseValue);
        }
        else {
            setShowLoder(0);
         }
    }
    let getListofAssignedMachine= async()=>{
        setShowLoder(1);
        let getpmID = "";
             const getActiveUhid=JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
             const getpatientList=JSON.parse(sessionStorage.getItem("IPDpatientList"));
             getpatientList.map((val,i)=>{
                if(val.uhId === getActiveUhid){
                    getpmID =  val.pmId ; 
                    return;
                }
             });
        const response= await GetListofAssignedMachine(getpmID);
        if(response.status === 1){
            setAssignedMachineList(response.responseValue)
             setShowLoder(0);
        }
        else{
            setShowLoder(0);
            setShowAlertToster(1)
            setShowErrMessage(response.responseValue)
        }
    }
     let handlerAssign = async () => {
        clearErrorMsg();
         const machineID = document.getElementById("ddlMachine").value;
         const machineType=document.getElementById('ddlMachineType').value;
        if (machineTypeID === '0' || machineTypeID === null || machineTypeID === undefined) {
            document.getElementById('errMachineType').innerHTML = t("Please Select Machine Type");
            document.getElementById('errMachineType').style.display = "block";
            return false;
        }
        else if (machineID === '0' || machineID === null || machineID === undefined) {
            document.getElementById('errMachine').innerHTML = t("Please Select Machine");
            document.getElementById('errMachine').style.display = "block";
            return false;
        }
         else {
             setShowUnderProcess(1);
             let getPmID = "";
             const getActiveUhid=JSON.parse(sessionStorage.getItem("IPDactivePatient")).Uhid;
             const getpatientList=JSON.parse(sessionStorage.getItem("IPDpatientList"));
             getpatientList.map((val,i)=>{
                if(val.uhId === getActiveUhid){
                    getPmID=  val.pmId ; 
                    return;
                }
             });
             if(getPmID !== "" || getPmID !== null || getPmID !== undefined){

                 var obj = {
                     machineID: parseInt(machineID),
                     pmID: getPmID,
                     userId: userID,
                     equipmentTypeId:machineType
                 }
             }
            let response = await PostAssignMachineToPatient(obj);

            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage(t("Machine Assigned Successfully"));
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getListofAssignedMachine();
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
    let handleRemoveMachine = async () => {
        const response = await RemoveMachine(pmID,rowID,userID);
        if(response.status === 1){
            setisShowToaster(1);
            setShowSuccessMsg(t('Machine Removed Successfully'));
            getListofAssignedMachine();
            setTimeout(() => {
                setisShowToaster(0);
            }, 2000)
        }
        else{
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
            setTimeout(() => {
                setShowAlertToster(0);
            }, 2000)
        }

    }
    let handleDelete = async () => {
        const response = await DeleteAssignedMachine(pmID,rowID,userID);
        if(response.status === 1){
            setisShowToaster(1);
            setShowSuccessMsg(t('Machine Deleted Successfully')); 
            getListofAssignedMachine();
            setTimeout(() => {
                setisShowToaster(0);
            }, 2000)
        }
        else{
             setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
            setTimeout(() => {
                setShowAlertToster(0);
            }, 2000)
        }

    }
    let handlerClear = async () => {
        document.getElementById('errMachineType').style.display = "none";
        document.getElementById('errMachine').style.display = "none";
        document.getElementById("ddlMachineType").value = 0;
        document.getElementById("ddlMachine").value = 0;
        setMachineList([]);
        setMachineTypeID('0');
    }
   
   let handleSetValue=(param)=>{
    setRowID(param.id);
    setpmID(param.pmID);

   }
    let clearErrorMsg = () => {
        document.getElementById('errMachineType').style.display = "none";
        document.getElementById('errMachine').style.display = "none";
    }
    useEffect(() => {
        getMachineTypeList();
        getListofAssignedMachine();


    }, []);
    
    return (
        <>
            <section className="assignmachine">
                
                    <div className="row">
                        <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Assign Machine To Patient")}</div></div></div>
                        <div className="col-12">                             
                            <div className="inner-content">
                                <div className="dflex regEqualColums paddingcustom whitebg  twocol">
                                    
                                    <div className="col-2 mb-2 me-2">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">{t("Machine_Type")}<span className="starMandatory">*</span></label>
                                        <select className="form-select form-select-sm" id='ddlMachineType' aria-label=".form-select-sm example" onChange={getMachineList}>
                                            <option value="0">{t("SELECT")} {t("Machine_Type")}</option>
                                            {machineTypeList && machineTypeList.map((list, index) => {

                                                return (
                                                    <option value={list.id}>{list.lifeSupport}</option>
                                                )
                                            })}
                                        </select>
                                        <small id="errMachineType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                    </div>
                                    <div className="col-2 mb-2 me-2">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">{t("Machine_Name")}<span className="starMandatory">*</span></label>
                                        <select className="form-select form-select-sm" id='ddlMachine' aria-label=".form-select-sm example" onChange={clearErrorMsg}>
                                            <option value="0">{t("Select_Machine")}</option>
                                            {machineList && machineList.map((list, index) => {

                                                return (
                                                    <option value={list.id}>{list.name}</option>
                                                )
                                            })}
                                        </select>
                                        <small id="errMachine" className="form-text text-danger" style={{ display: 'none' }}></small>
                                    </div>

                                    <div className="mb-2 relative">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                                        {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                :
                                                <div className='textmbtn'>
                                                    
                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerAssign}><img src={save} className='icnn'  alt='' />{t("Assign")}</button>
                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}><img src={clear} className='icnn'  alt='' />{t("Clear")}</button>
                                                    
                                                </div>
                                        }
                                    </div>
                                </div>                                        
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className="med-table-section" style={{ "height": "75vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Machine_Type")}</th>
                                            <th>{t("Machine_Name")}</th>
                                            <th>{t("Start_Date")}</th>
                                            <th>{t("End_Date")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {assignedMachineList && assignedMachineList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.machineType}</td>
                                                    <td>{list.machineName}</td>
                                                    <td>{list.startDate}</td>
                                                    <td>{list.endDate}</td>
                                                    <td>
                                                        <div className="action-button">
                                                        { list.endDate === "" ?  <div  data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#removeMachineConfirmationModal" onClick={()=>{handleSetValue(list)}}><i className="fa-solid fa-xmark" title='Remove Machine'></i></div>: '' }
                                                           <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" title='Delete' onClick={()=>{handleSetValue(list)}}><img src={deleteBtnIcon} className='' alt='' /> </div> 
                                                            
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
                 
                {/* -----------------------Start Delete Modal Popup-------------------    */}

                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                                <div className='popDeleteContent'> {t("Are you sure you want to delete?")} </div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal"> {t("Cancel")} </button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal"> {t("Delete?")} </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                {/* -----------------------Start Remove Machine Confirmation Modal Popup-------------------    */}

                <div className="modal fade" id="removeMachineConfirmationModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">
                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa-solid fa-xmark"></i></div>
                                <div className='popDeleteTitle mt-3'> Remove Machine?</div>
                                <div className='popDeleteContent'> {t("Are you sure you want to Remove Machine?")}</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={handleRemoveMachine} data-bs-dismiss="modal">{t("Yes")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------End Delete Modal Popup---------------------  */}
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