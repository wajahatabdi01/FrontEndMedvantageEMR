import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import GetDeviceaccesslog from "../API/Device Access Log/GetDeviceaccesslog";
import PostDeviceaccesslog from "../API/Device Access Log/PostDeviceaccesslog";
import DeleteDeviceAccesslog from "../API/Device Access Log/DeleteDeviceAccesslog";
import PutDeviceAccessLog from "../API/Device Access Log/PutDeviceAccessLog";
import GetUserAccessedBy from "../API/Device Access Log/GetUserAccessedBy";
import Select from 'react-select';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function DeviceAccessLog() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  const [AccesseTimeFrom, setAccesseTimeFrom] = useState("")
  const [AccessTimeTo, setAccessTimeTo] = useState("")
  const [AccessAllowed, setAccessAllowed] = useState(0)
  const [DeviceAccessTable, setDeviceAccessTable] = useState([])
  const [UserDropdown, setUserDropdown] = useState([])
  const [User, setUser] = useState(null)
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
const [isNewRowAdded, setisNewRowAdded] = useState(false)
let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);

  


  // The Code is  written By S Ayaz


  let Getdeviceaccesslog = async () => {
    let deviceaccesslog = await GetDeviceaccesslog();
    if (deviceaccesslog.status === 1) {
      console.log("deviceaccesslog", deviceaccesslog.responseValue)
      setShowLoder(0);
      setDeviceAccessTable(deviceaccesslog.responseValue);
    }
  }
  let UserAccess = async () => {
    let usermaster = await GetUserAccessedBy();
    if (usermaster.status === 1) {
      console.log("usermaster", usermaster.responseValue)
      setShowLoder(0);
      setUserDropdown(usermaster.responseValue.map(User=>({
        value: User.id,
        label : User.name
      })));
    
    }
  }


  const toggleCanRead =()=>{
    setAccessAllowed(AccessAllowed ? 0 : 1)
    console.log(AccessAllowed ? 0 : 1)
  }

  // POST API called for data saving


  const handleOnChange = (e) => {
    setisNewRowAdded(false)
    document.getElementById('erraccessedTimeFrom').style.display = 'none';
    document.getElementById('errUserAccessedBy').style.display = 'none';
    document.getElementById('erraccessedTimeTo').style.display = 'none';
    document.getElementById('erraccessallowed').style.display = 'none';

    const { name, value } = e.target;
   
     if (name === 'ACCESSEDTIMEFROM') {
      setAccesseTimeFrom(value);
    }
  else  if (name === 'ACCESSTIMETO') {
      setAccessTimeTo(value);
    }
   else if (name === 'AccessAllowed') {
      setAccessAllowed(value);
    }
  };

  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };

  const handleOnSave = async () => {
    

     if (User === null) {
      document.getElementById('errUserAccessedBy').innerHTML = 'Please Select Accessed By';
      document.getElementById('errUserAccessedBy').style.display = 'block';
      return;
    }
 
     else if (AccesseTimeFrom.trim() === '' || AccesseTimeFrom === undefined) {
      document.getElementById('erraccessedTimeFrom').innerHTML = 'Please Enter Access Time From';
      document.getElementById('erraccessedTimeFrom').style.display = 'block';
      return;
    }
     else if (AccessTimeTo.trim() === '' || AccessTimeTo === undefined) {
      document.getElementById('erraccessedTimeTo').innerHTML = 'Please Enter Access Time To';
      document.getElementById('erraccessedTimeTo').style.display = 'block';
      return;
    }

  
  
    const obj = {
        accessedBy: User.value,
        accessedTimeFrom: AccesseTimeFrom,
        accessedTimeTo: AccessTimeTo,
        wasAccessAllowed: AccessAllowed,
        userId: userID
    };

    let data = await PostDeviceaccesslog(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      Getdeviceaccesslog()
      setisNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
        setisNewRowAdded(false);
        
      }, 2000);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(1);
      setTosterMessage("Already Exist!");
      setTosterMessage(data.responseValue);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };


  const handleClear = () => {
//    console.log('clear')
document.getElementById('erraccessedTimeFrom').style.display = 'none';
document.getElementById('errUserAccessedBy').style.display = 'none';
document.getElementById('erraccessedTimeTo').style.display = 'none';
document.getElementById('erraccessallowed').style.display = 'none';
setUser(null)
setAccessAllowed(0)
setAccessTimeTo('')
setAccesseTimeFrom('')
}
   


  const edit = (deviceaccesslog,index) => {
    document.getElementById('erraccessedTimeFrom').style.display = 'none';
document.getElementById('errUserAccessedBy').style.display = 'none';
document.getElementById('erraccessedTimeTo').style.display = 'none';
document.getElementById('erraccessallowed').style.display = 'none';
    setRowID(deviceaccesslog.id)
    setIsUpdateBtnShow(true);
    setUser({
     value : deviceaccesslog.accessedBy,
     label : deviceaccesslog.accessedName
    })
    setAccessAllowed(deviceaccesslog.wasAccessAllowed)
    setAccessTimeTo(deviceaccesslog.accessedTimeTo)
    setAccesseTimeFrom(deviceaccesslog.accessedTimeFrom)
    setNewlyAddedRowIndex(index)

  }

  const handleUpdate = async () => {

   

    if (User === undefined) {
        document.getElementById('errUserAccessedBy').innerHTML = 'Please Enter Accessed By';
        document.getElementById('errUserAccessedBy').style.display = 'block';
        return;
      }
    
       else if (AccesseTimeFrom.trim() === '' || AccesseTimeFrom === undefined) {
        document.getElementById('erraccessedTimeFrom').innerHTML = 'Please Enter Access Time From';
        document.getElementById('erraccessedTimeFrom').style.display = 'block';
        return;
      }
       else if (AccessTimeTo.trim() === '' || AccessTimeTo === undefined) {
        document.getElementById('erraccessedTimeTo').innerHTML = 'Please Enter Access Time To';
        document.getElementById('erraccessedTimeTo').style.display = 'block';
        return;
      }
 
    
    const obj = {
      id: rowID,
      accessedBy: User.value,
      accessedTimeFrom: AccesseTimeFrom,
      accessedTimeTo: AccessTimeTo,
      wasAccessAllowed: AccessAllowed,
      userID: userID,
    };

    const data = await PutDeviceAccessLog(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
     
      Getdeviceaccesslog()
      handleClear()
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
       

      }, 2000);
      setIsUpdateBtnShow(false);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(data.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };
  const handleCancel = () => {
    handleClear()
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async () => {
     setShowUnderProcess(1);
    
      const obj = {
      id: rowID,
      userId: userID
    }

    let data = await DeleteDeviceAccesslog(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      setisNewRowAdded(false)
      Getdeviceaccesslog()
      handleClear()
      // console.log('success')
      setTimeout(() => {
        setShowToster(0);
       
       
      }, 1000)
    }
    else {
      setShowUnderProcess(0)
      setShowToster(0)
      setTosterMessage(data.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0);
      }, 2000)
    }
  };

  useEffect(() => {
    UserAccess()
    Getdeviceaccesslog()
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Device_Access_Log")} 
                
                </div>
                <div className="inner-content">
                  <div className='row'>
  

                   <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Accessed_By")}<span className="starMandatory">*</span></label>
                      <Select value={User} options={UserDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Accessed_By")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errUserAccessedBy", setUser)} />
                      <small id="errUserAccessedBy" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Accesse_Time_From")} <span className="starMandatory">*</span></label>
                          <input value={AccesseTimeFrom} id="ddaccesedTimeFrom" type="time" className="form-control form-control-sm" name="ACCESSEDTIMEFROM" placeholder={t("Enter_Accesse_Time_From")} onChange={handleOnChange} />
                          <small id="erraccessedTimeFrom" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Access_Time_To")}<span className="starMandatory">*</span></label>
                          <input value={AccessTimeTo} id="ddaccessedTimeTo" type="time" className="form-control form-control-sm" name="ACCESSTIMETO" placeholder={t("Enter_Accsessed_Time_To")} onChange={handleOnChange} />
                          <small id="erraccessedTimeTo" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 regularCheck">
                          <div className="d-flex column-gap-3 mt-4 me-3">                         
                          <label htmlFor="canRead" className="form-label">{t("Was_Access_Allowed")}<span className="starMandatory"></span></label>
                          <div className="form-check">
                            <input checked={AccessAllowed} id="ddaccessallowed" name="AccessAllowed" className="form-check-input" type="checkbox" onClick={toggleCanRead}/>
                            </div>
                          <small id="erraccessallowed" className="form-text text-danger" style={{ display: 'none' }}></small>
                          </div>
                          </div>

                     
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-3" onClick={handleUpdate} >{t("Update")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel} >{t("Cancel")}</button>
                                  </>
                                }
                              </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

            </div>


            {/* table is made using getAllItemMaster API and mapped the data   */}


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style= {{zIndex : '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Accessed_By")}</th>
                      <th>{t("Accesse_Time_From")}</th>
                      <th>{t("Access_Time_To")}</th>
                      <th>{t("Access_Allowed")}</th>
                      <th></th>
                    
                       <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DeviceAccessTable && DeviceAccessTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return(
                      <tr className={index === DeviceAccessTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row': ''}  key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.accessedName}</td>
                        <td>{data.accessedTimeFrom}</td>
                        <td>{data.accessedTimeTo}</td>
                        <td>{data.wasAccessAllowed === 1 ? 'Yes' : 'No'}</td>
                        <td></td>
                  
                      
                        <td></td>

                        <td>
                        <div className="action-button">
                            <div
                              data-bs-toggle="tooltip"
                              data-bs-title="Edit Row"
                              data-bs-placement="bottom"
                            
                            >
                              <img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data,index) }} />
                            </div>
                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id); }}/>
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
                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deleteRow}>{t("Delete")}</button>
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


