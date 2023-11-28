import React, { useEffect, useState } from "react";
import Loder from "../../Component/Loader";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import GetUserList from "../API/GET/GetUserList";
import GetOperationTheaterList from "../API/GET/GetOperationTheaterList";
import SaveOTMaintenance from "../API/POST/SaveOtMaintenance";
import GetOTMaintenanceList from "../API/GET/GetOTMaintenanceList";
import UpdateOTMaintenance from "../API/UPDATE/UpdateOTMaintenance";
import DeleteOTMaintenance from "../API/DELETE/DeleteOTMaintenance";
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
export default function OTMaintenance(){
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let[isUpdateBtnShow,setIsUpdateBtnShow]=useState(false);
    let [showLoder,setShowLoder]=useState(0);
    let [oTMaintenanceList,setOTMaintenanceList]=useState([]);
    let [otList,setOtList]=useState([]);
    let [userList,setUserList]=useState([]);
    let [maintenanceType,SetmaintenanceType]=useState("");
    let [maintenanceStatus,SetMaintenanceStatus]=useState("");
    let [remark,SetRemark]=useState("");
    let [nextScheduledDate,SetNextScheduledDate]=useState("");
    let [rowID,setRowID]=useState("");
    let handlerChange =(e)=>{
        document.getElementById('erOT').style.display="none";
        document.getElementById('errRespondent').style.display="none";
        document.getElementById('errMaintenanceStatus').style.display="none";
        document.getElementById('errMaintenanceType').style.display="none";
        if(e.target.name === "maintenanceType"){
            SetmaintenanceType(e.target.value)
        }
        if(e.target.name === "maintenanceStatus"){
            SetMaintenanceStatus(e.target.value)
        }
        if(e.target.name === "remark"){
            SetRemark(e.target.value)
        }
        if(e.target.name === "nextScheduledDate"){
            SetNextScheduledDate(e.target.value)
        }
    }
    let getOTList=async()=>{
        setShowLoder(1);
        let response= await GetOperationTheaterList();
        console.log('response ot',response);
        if(response.status ===1){
            setShowLoder(0);
            setOtList(response.responseValue);
        }
    }
    let getUserList=async()=>{
        setShowLoder(1);
        let response= await GetUserList();
        console.log('response',response);
        if(response.status ===1){
            setShowLoder(0);
             setUserList(response.responseValue);
        }
    }
    let getOTMaintenanceList=async()=>{
        setShowLoder(1);
        let response= await GetOTMaintenanceList();
        console.log('ot list',response);
        if(response.status ===1){
            setShowLoder(0);
            setOTMaintenanceList(response.responseValue);
        }
    }
    let handlerSave=async()=>{
        const operationTheaterID=document.getElementById('ddlOT').value;
        const repondentID=document.getElementById('ddlRespondent').value;
        console.log('repondentID',repondentID);
        if(operationTheaterID.toString() === "0" || operationTheaterID === undefined || operationTheaterID === null){
            document.getElementById('erOT').style.display="block";
            document.getElementById('erOT').innerHTML="Please Select OT";
        }
        else if(maintenanceType.trim() === "" || maintenanceType == [] || maintenanceType === null){
            document.getElementById('errMaintenanceType').style.display="block";
            document.getElementById('errMaintenanceType').innerHTML="Please Fill Maintenance Type";
        }
       else if(maintenanceStatus.trim() === "" || maintenanceStatus == [] || maintenanceStatus === null){
        document.getElementById('errMaintenanceStatus').style.display="block";
        document.getElementById('errMaintenanceStatus').innerHTML="Please Fill Maintenance Status";

        }
        else if(repondentID.toString() === '0' || repondentID === undefined || repondentID === null){
            document.getElementById('errRespondent').style.display="block";
            document.getElementById('errRespondent').innerHTML="Please Select Respondent";
        }
        else{
            setShowUnderProcess(1);
            var obj={
                otId: parseInt(operationTheaterID),
                maintenanceType:maintenanceType,
                maintenanceStatus:maintenanceStatus,
                remark: remark,
                respondentID: parseInt(repondentID),
                status:true,
                userID: JSON.parse(window.sessionStorage.getItem('LoginData')).userId,
                nextScheduledDate: nextScheduledDate
            }
            console.log('obj',obj)
            let response = await SaveOTMaintenance(obj); 
              console.log('response save',response)
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Save Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getOTMaintenanceList();

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
    let handlerUpdate=async()=>{
        const operationTheaterID=document.getElementById('ddlOT').value;
        const repondentID=document.getElementById('ddlRespondent').value;
        console.log('repondentID',repondentID);
        if(operationTheaterID.toString() === "0" || operationTheaterID === undefined || operationTheaterID === null){
            document.getElementById('erOT').style.display="block";
            document.getElementById('erOT').innerHTML="Please Select OT";
        }
        else if(maintenanceType.trim() === "" || maintenanceType == [] || maintenanceType === null){
            document.getElementById('errMaintenanceType').style.display="block";
            document.getElementById('errMaintenanceType').innerHTML="Please Fill Maintenance Type";
        }
       else if(maintenanceStatus.trim() === "" || maintenanceStatus == [] || maintenanceStatus === null){
        document.getElementById('errMaintenanceStatus').style.display="block";
        document.getElementById('errMaintenanceStatus').innerHTML="Please Fill Maintenance Status";

        }
        else if(repondentID.toString() === '0' || repondentID === undefined || repondentID === null){
            alert('Ddd')
            document.getElementById('errRespondent').style.display="block";
            document.getElementById('errRespondent').innerHTML="Please Select Respondent";
        }
        else{
            setShowUnderProcess(1);
            var obj={
                id: rowID,
                otId: parseInt(operationTheaterID),
                maintenanceType:maintenanceType,
                maintenanceStatus:maintenanceStatus,
                remark: remark,
                respondentID: parseInt(repondentID),
                status:true,
                userID: window.sessionStorage.getItem("userID"),
                nextScheduledDate: nextScheduledDate
            }
            console.log('obj',obj)
            let response = await UpdateOTMaintenance(obj); 
              console.log('response update',response)
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getOTMaintenanceList();

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
    let handlerClear=async()=>{
        clearToaster();
        setIsUpdateBtnShow(false);
        SetRemark('');
        SetmaintenanceType(''); 
        SetMaintenanceStatus('');
        SetNextScheduledDate('');
        document.getElementById('ddlOT').value="0";
        document.getElementById('ddlRespondent').value="0";
    }
    let deleteRow=async()=>{
      setShowUnderProcess(1);
      let response= await DeleteOTMaintenance(rowID);
      if (response.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Deleted Successfully!");
        setTimeout(() => {
            setShowToster(0);
            handlerClear();
            getOTMaintenanceList();

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
    let edit=async(value)=>{
        console.log('EDIT',value);
        let date=value.nextScheduledDate.split('/');
        const formatDate=date[2]+'-'+date[1]+'-'+date[0]
        console.log('formatDate',formatDate);
        setRowID(value.id);
        document.getElementById('ddlOT').value=value.otId;
        document.getElementById('ddlRespondent').value=value.respondentID;
        setIsUpdateBtnShow(true);
        SetRemark(value.remark);
        SetmaintenanceType(value.maintenanceType); 
        SetMaintenanceStatus(value.maintenanceStatus);
        SetNextScheduledDate(formatDate);
    }
    let clearToaster=()=>{
        document.getElementById('erOT').style.display="none";
        document.getElementById('errRespondent').style.display="none";
        document.getElementById('errMaintenanceStatus').style.display="none";
        document.getElementById('errMaintenanceType').style.display="none";
    }
   useEffect(()=>{
    getOTMaintenanceList();
    getOTList();
    getUserList();
   },[]);
    return(
        <>
             <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">OT Maintenance</div>
                                <div className="inner-content">

                                    <div className='row'>
                                        <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                                            <div className="d-flex flex-wrap align-content-end">
                                            <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="ddlRepondent" className="form-label">OT List<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlOT' aria-label=".form-select-sm example" onChange={clearToaster}>
                                                        <option value="0">Select Respondent</option>
                                                        {otList && otList.map((list, index) => {
                                                            return (
                                                                <option value={list.id}>{list.operationTheterName}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {/* <DropdownWithSearch list={diseaseList} name="Select Disease" valueName="id" displayName="problemName" getvalue ={GetId} /> */}
                                                    <small id="erOT" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="maintenanceType" className="form-label">Maintenance Type<span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" id="maintenanceType" name="maintenanceType" value={maintenanceType} placeholder="Enter Maintenance Type..." onChange={handlerChange} />
                                                    <small id="errMaintenanceType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="maintenanceStatus" className="form-label">Maintenance Status<span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" id="maintenanceStatus" name="maintenanceStatus" value={maintenanceStatus} placeholder="Enter Maintenance Status..." onChange={handlerChange} />
                                                    <small id="errMaintenanceStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="txtRemark" className="form-label">Remark</label>
                                                    <input type="text" className="form-control form-control-sm" id="txtRemark" name="remark" value={remark} placeholder="Enter Remark..." onChange={handlerChange} />
                                                    <small id="errRemark" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="nextScheduledDate" className="form-label">Next Scheduled Date</label>
                                                    <input type="date" className="form-control form-control-sm" id="nextScheduledDate" name="nextScheduledDate" value={nextScheduledDate} onChange={handlerChange} />
                                                    <small id="errNextScheduledDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                                                    <label htmlFor="ddlRepondent" className="form-label">Respondent<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlRespondent' aria-label=".form-select-sm example" onChange={clearToaster}>
                                                        <option value="0">Select Respondent</option>
                                                        {userList && userList.map((list, index) => {
                                                            return (
                                                                <option value={list.id}>{list.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    {/* <DropdownWithSearch list={diseaseList} name="Select Disease" valueName="id" displayName="problemName" getvalue ={GetId} /> */}
                                                    <small id="errRespondent" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>


                                                <div className="mb-2 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                                                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                            :
                                                            <div>
                                                                {isUpdateBtnShow !== true ? <>
                                                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveBtnIcon} className='icnn' alt='' />Save</button>
                                                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handlerClear}><img src={clearBtnIcon} className='icnn' alt='' />Clear</button>
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
                                            <th>Operation Thearter</th>
                                            <th>Maintenance Type</th>
                                            <th>Maintenance Status</th>
                                            <th>Repondent</th>
                                            <th>Remark</th>
                                            <th>Next Scheduled Date</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {oTMaintenanceList && oTMaintenanceList.map((list, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{list.operationTheterName}</td>
                                                    <td>{list.maintenanceType}</td>
                                                    <td>{list.maintenanceStatus}</td>
                                                    <td>{list.respondentName}</td>
                                                    <td>{list.remark}</td>
                                                    <td>{list.nextScheduledDate}</td>
                                                    {/* <td>{list.nextScheduledDate.split('T')[0].split('-')[2] +'/'+list.nextScheduledDate.split('T')[0].split('-')[1] +'/'+list.nextScheduledDate.split('T')[0].split('-')[0]}</td> */}
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { edit(list) }}/></div>
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
                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                <div className='popDeleteContent'> Are you sure you want to delete?</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">Delete</button>
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