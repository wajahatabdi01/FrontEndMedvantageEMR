import React,{useEffect, useState} from 'react';
import GetLocationList from '../API/GET/GetLocationList';
import GetFloorList from '../API/GET/GetFloorList';
import GetRoomList from '../API/GET/GetRoomList';
import SaveOTMaster from '../API/POST/SaveOtMaster';
import GetOperationTheaterList from '../API/GET/GetOperationTheaterList';
import Loder from '../../Component/Loader';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import { List } from 'immutable';
import UpdateOtMaster from '../API/UPDATE/UpdateOtMaster';
import DeleteOtMaster from '../API/DELETE/DeleteOtMaster';
import saveBtnIcon from '../../assets/images/icons/saveButton.svg';
import clearBtnIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function OperationTheaterMaster() {
    let [isUpdateBtnShow,setIsUpdateBtnShow]=useState(false);
    let [ottheatername,setottheatername]=useState('');
    let [rowID,setRowID]=useState(0);
    let [otList,setOtList]=useState([]);
    let [locationList,setLocationList]=useState([]);
    let [showLoder, setShowLoder] = useState(0);
    let [otcapacity, setOtcapacity] = useState('');
    let [otDescription, setOtDescription] = useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    const {t} = useTranslation();
    let getLocation=async()=>{
        let data= await GetLocationList();
        console.log('data',data);
        if(data.status === 1){
            setLocationList(data.responseValue);
        }
        else{
               
        }
       
    }
    let getOperationTheaterList=async()=>{
        setShowLoder(1)
        let data= await GetOperationTheaterList();
        console.log('data mOT',data);
        if(data.status === 1){
            setShowLoder(0);
            setOtList(data.responseValue);
        }
        else{
               document.getElementById('errorResponse').innerHTML=data.responseValue;
               document.getElementById('errorResponse').style.display="block";
        }
        
        
    }
    let handlerChange =(e)=>{
        clearToasterOrError();
        if(e.target.name === "ottheatername"){
            setottheatername(e.target.value);
        }
        if(e.target.name === "otcapacity"){
            setOtcapacity(e.target.value);
        }
        if(e.target.name === "otDescription"){
            setOtDescription(e.target.value);
        }
    }
    let handlerSave = async()=>{
        const locationID=document.getElementById("ddlLocation").value;
        document.getElementById('errOTtheatername').style.display="none";
        document.getElementById('errddlLocation').style.display="none";
        document.getElementById('errcapacity').style.display="none";
        if(ottheatername.trim() === '' || ottheatername === null || ottheatername === undefined){
        document.getElementById('errOTtheatername').innerHTML="Please Fill Operation Theater Name";
        document.getElementById('errOTtheatername').style.display="block";
        return false;
        }
        else if(locationID === '0' || locationID === null || locationID === undefined){
        document.getElementById('errddlLocation').innerHTML="Please Select Location";
        document.getElementById('errddlLocation').style.display="block";
        return false;
        }
        else if(otcapacity === '' || otcapacity === null || otcapacity === undefined){
        document.getElementById('errcapacity').innerHTML="Please Fill Capacity";
        document.getElementById('errcapacity').style.display="block";
        return false;
        }
        else {
            setShowUnderProcess(1);
            var obj={
                operationTheterName:ottheatername,
                locationId:locationID,
                capacity:otcapacity,
                operationTheaterDescription:otDescription,
                userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
            console.log('obj',obj);
            let data= await SaveOTMaster(obj);
            console.log('save',data);
            if(data.status === 1){
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getOperationTheaterList();

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
    let edit = async(list)=>{
        console.log('list',list);
        setIsUpdateBtnShow(true);
         setRowID(list.id);
         setottheatername(list.operationTheterName);
         setOtDescription(list.operationTheaterDescription);
         setOtcapacity(list.capacity);
         document.getElementById("ddlLocation").value=list.locationId;
      
    }
    let handlerUpdate = async()=>{
        const locationID=document.getElementById("ddlLocation").value;
        document.getElementById('errOTtheatername').style.display="none";
        document.getElementById('errddlLocation').style.display="none";
        if(ottheatername.trim() === '' || ottheatername === null || ottheatername === undefined){
        document.getElementById('errOTtheatername').innerHTML="Please Fill Operation Theater Name";
        document.getElementById('errOTtheatername').style.display="block";
        return false;
        }
        else if(locationID === '0' || locationID === null || locationID === undefined){
        document.getElementById('errddlLocation').innerHTML="Please Select Location";
        document.getElementById('errddlLocation').style.display="block";
        return false;
        }
        else if(otcapacity === '' || otcapacity === null || otcapacity === undefined){
            document.getElementById('errcapacity').innerHTML="Please Fill Capacity";
            document.getElementById('errcapacity').style.display="block";
            return false;
            }
        else {
            setShowUnderProcess(1);
            var obj={
                operationTheterName:ottheatername,
                locationId:locationID,
                capacity:otcapacity,
                operationTheaterDescription:otDescription,
                id:rowID,
                userID: JSON.parse(window.sessionStorage.getItem("LoginData")).userId
            }
            console.log('obj update',obj);

            let data = await UpdateOtMaster(obj);
            console.log('data',data);
            if(data.status === 1){
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getOperationTheaterList();

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
    let handlerClear = ()=>{
        document.getElementById('errOTtheatername').style.display="none";
        document.getElementById('errddlLocation').style.display="none";
        document.getElementById('errcapacity').style.display="none";
        setIsUpdateBtnShow(false);
        setottheatername('');
        setOtDescription('');
        setOtcapacity('');
        document.getElementById("ddlLocation").value=0;
        

    }
    let clearToasterOrError=()=>{
        document.getElementById('errOTtheatername').style.display="none";
        document.getElementById('errddlLocation').style.display="none";
        document.getElementById('errcapacity').style.display="none";
    }
    let deleteRow= async ()=>{
        setShowUnderProcess(1);
        let userID=JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
        let data = await DeleteOtMaster(rowID,userID);
        console.log('data',data);
        if(data.status === 1){
            setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Deleted Successfully!");
                setTimeout(() => {
                    setShowToster(0);
                    handlerClear();
                    getOperationTheaterList();
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
    useEffect(()=>{
        getLocation();
        getOperationTheaterList();
    },[]);
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">{t("Operation_Theater_Master")}</div>
                                <div className="inner-content">
                                            <div className="d-flex flex-wrap align-content-end">
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="Code" className="form-label">{t("Operation_Theater_Name")}<span className="starMandatory">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" id="Code" name='ottheatername' value={ottheatername} placeholder={t("OT_Name")} onChange={handlerChange} />
                                                    <small id="errOTtheatername" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="mb-2 me-2" style={{width:'200px'}}>
                                                    <label htmlFor="ddlLocation" className="form-label">{t("Location")}<span className="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id='ddlLocation' aria-label=".form-select-sm example" onChange={clearToasterOrError}>
                                                        <option value="0">{t("Select_Location")}</option>
                                                        {locationList && locationList.map((val, index) => {
                                                        return (
                                                            <option value={val.id}>{val.buildingName}&nbsp;{val.floorName}&nbsp;{val.roomNumber}</option>
                                                        )
                                                        })}
                                                    </select>
                                                    <small id="errddlLocation" className="form-text text-danger" style={{display: 'none'}}></small>
                                                </div>
                                                
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="Code" className="form-label">{t("Capacity")}<span className="starMandatory">*</span></label>
                                                    <input type="number" className="form-control form-control-sm" id="Code" name='otcapacity' value={otcapacity} placeholder={t("Enter_OT_Capacity")} onChange={handlerChange} />
                                                    <small id="errcapacity" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="mb-2 me-2">
                                                    <label htmlFor="Code" className="form-label">{t("Operation_Theater_Description")}</label>
                                                    <input type="text" className="form-control form-control-sm" id="Code" name='otDescription' value={otDescription} placeholder={t("OT_Description")} onChange={handlerChange} />
                                                    <small id="errOTDescription" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>


                                                <div className="mb-2 me-2 relative">
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
                        <div className="col-12 mt-3">
                            <div className="med-table-section" style={{ "height": "80vh" }}>
                                <table className="med-table border_ striped_">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")}</th>
                                            <th>{t("Operation_Theater_Name")}</th>
                                            <th>{t("Location")}</th>
                                            <th>{t("Capacity")}</th>
                                            <th>{t("Description")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                    {otList && otList.map((list,index)=>{
                                        return(
                                            <tr>    
                                            <td className="text-center">{index+1}</td>
                                            <td>{list.operationTheterName}</td>
                                            <td>{list.buildingName}&nbsp;{list.floorName}&nbsp;{list.roomNumber}</td>
                                            <td>{list.capacity}</td>
                                            <td>{list.operationTheaterDescription}</td>
                                            <td>
                                                <div className="action-button">
                                                    <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={()=>{edit(list)}}/></div>
                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={()=>{setRowID(list.id)}}/>
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