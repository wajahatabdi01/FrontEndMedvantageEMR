import React, { useEffect, useState } from 'react'
import GetNotificationCategory from '../../Api/Schedule/GET/GetNotificationCategory';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import Heading from '../../../Component/Heading';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import { useTranslation } from 'react-i18next';
import PostNotificationCategory from '../../Api/Schedule/POST/PostNotificationCategory';
import DeleteNotificationCategory from '../../Api/Schedule/Delete/DeleteNotificationCategory';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import UpdateNotificationCategory from '../../Api/Schedule/UPDATE/UpdateNotificationCategory';
import Loader from '../../../Component/Loader';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';

export default function NotificationCategoryMaster() {
    let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
    let[notificationcategoryList,setNotificationcategoryList]=useState([]);
    let[notificationTitle,setNotificationTitle]=useState();
    let [clearDropdown, setClearDropdown] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [updateBool, setUpdateBool] = useState(0)
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowID, setRowId] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [isShowToaster, setisShowToaster] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    let [userType, setUserType] = useState([]);
    const { t } = useTranslation();
    let [content, setContent] = useState('');
     const [isChecked, setIsChecked] = useState(true);
     let [edittitlename, setEditTitleName] = useState('');
    


    let handleChange=(e)=>{
        document.getElementById("errNotificationTitle").style.display="none"
        const name=e.target.name
        const value=e.target.value
        if(name==="notificationTitle"){
            setNotificationTitle(value);
        }
        if(name==="isEscalation"){
            setIsChecked(value);
        }
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked ? true : false);
    };

    let getData=async()=>{
        const response = await GetNotificationCategory();
        if(response.status===1){
            setNotificationcategoryList(response.responseValue);
        }
    }

    let handleClear = (value) => {
        setRowId(0);
        setNotificationTitle("");
        setUpdateBool(0);
        setClearDropdown(value);
        setRowId('');
        document.getElementById('errNotificationTitle').style.display = "none";
        // document.getElementById('errName').value = "";
     }
  
     let handleDelete = async()=>{
        setShowLoder(0);
        const response = await DeleteNotificationCategory(rowID);
        if(response.status === 1){
          setisShowToaster(1);
          setShowSuccessMsg('Deleted Successfully..!!');
          getData();
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

      let handleEdit = (params) => {
        setNotificationTitle(params.notificationTitle);
        setIsChecked(params.isEscalation)
        setRowId(params.id);
        setUpdateBool(1);
      }

    let handlerSave = async () => {
        if (notificationTitle === '' || notificationTitle === 0 || notificationTitle === undefined || notificationTitle === null) {
           document.getElementById('errNotificationTitle').innerHTML = "Please enter title";
           document.getElementById('errNotificationTitle').style.display = "block";
        }
        else {
      
           const obj = {
            notificationTitle:notificationTitle,
             isEscalation:isChecked
           }
            setShowUnderProcess(1);
           const response = await PostNotificationCategory(obj);
           if (response.status === 1) {
              setShowUnderProcess(0);
              setTosterValue(0);
              setShowToster(1);
              setTosterMessage("Data Saved Successfully");
              getData();
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

     let handlerUpdate = async () => {
        if(notificationTitle === '' || notificationTitle === 0 || notificationTitle === undefined || notificationTitle === null){
          document.getElementById('errNotificationTitle').innerHTML="Please Select Organ";
          document.getElementById('errNotificationTitle').style.display="block";
        }
        else{
           const obj ={
            "id":rowID,
            "isEscalation":isChecked,
            "notificationTitle":notificationTitle,
            "userID":userID
           }
           setShowUnderProcess(1);
          const response = await UpdateNotificationCategory(obj);
         if (response.status === 1) {
             setShowUnderProcess(0);
             setTosterValue(0);
             setShowToster(1);
             setTosterMessage("Updated Successfully");
             setTimeout(() => {
                 setShowToster(0);
                 handleClear(1);
                 getData();
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


    useEffect(()=>{
        getData();
    },[]);

  return (
    <>
      <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Notification Category Master </div>
                                {/* <div className="title">{content} </div> */}
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            <label htmlFor="groupName" className="form-label">Notification Title<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="notificationTitle" placeholder="Enter group name" name="notificationTitle" value={notificationTitle}  onChange={handleChange} />
                                            <small id="errNotificationTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>

                                        <div className="mb-2 me-2 mt-4">
                                            <label htmlFor="projectName" className="form-label" style={{'padding-right':'5px'}}>Is Escalation</label>
                                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}  />
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
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />Clear</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>{t("Update")}</button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1" onClick={()=>{handleClear(1)}}>{t("Cancel")}</button>
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
                                <Heading text="Notification Category List" />
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
                                            <th>Notification Title</th>
                                            <th>isEscalation</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notificationcategoryList && notificationcategoryList.map((key, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.notificationTitle}</td>
                                                    <td>
                                                        {key.isEscalation.toString()}
                                                        
                                                    </td>
                                                    <td>
                                                        <div className="action-button">
                                                        <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => {handleEdit(key)}} /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(key.id) }} />
                                                            </div>
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
