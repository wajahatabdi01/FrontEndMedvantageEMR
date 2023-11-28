import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import PostSecurityAccess from "../API/SecurityAccessControl/PostSecurityAccess";
import GetSecurityAccessControl from "../API/SecurityAccessControl/GetSecurityAccessControl";
import GetAccessName from "../API/DeviceAccessControl/GetAccessName";
import DeleteSecurityAccessControl from "../API/SecurityAccessControl/DeleteSecurityAccessControl";
import UpdateSecurityAccessControl from "../API/SecurityAccessControl/UpdateSecurityAccessControl";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GeitemMaster from "../../BmsServices/API/AlarmWarningLog/GetitemMaster";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function SecurityAccessControl() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [AccessPermission, setAccessPermission] = useState(null);
  const [SecurityAccessTable, setSecurityAccessTable] = useState([])
  const [DeviceIDDropdown, setDeviceIDDropdown] = useState([])
  const [DeviceID, setDeviceID] = useState(null)
  const [AccessPermissionTable, setAccessPermissionTable] = useState([])
  const [isClearable, ] = useState(true);
  const [isSearchable, ] = useState(true);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, ] = useState(null);
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  let [userID, ] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);








  let SecurityAccessControl = async () => {
    let Securityaccess = await GetSecurityAccessControl();
    if (Securityaccess.status === 1) {
      console.log("Securityaccess", Securityaccess.responseValue)
      setShowLoder(0);
      setSecurityAccessTable(Securityaccess.responseValue);
    }
  }


  let dropdowns = async () => {
    let deviceID = await GeitemMaster();
    if (deviceID.status === 1) {
      console.log("deviceID", deviceID.responseValue)
      setShowLoder(0);
      setDeviceIDDropdown(deviceID.responseValue.map(Device => ({
        value: Device.id,
        label: Device.itemName
      })));
    }
    let Accesspermission = await GetAccessName();
    if (Accesspermission.status === 1) {
      setShowLoder(0);
      setAccessPermissionTable(Accesspermission.responseValue.map(Permission => ({
        value: Permission.id,
        label: Permission.name
      })));
      console.log("Accesspermission", Accesspermission.responseValue)
    }


  }









  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };


  const handleOnSave = async () => {


    if (DeviceID === null) {
      document.getElementById('errDeviceID').innerHTML = 'Please select Item Name';
      document.getElementById('errDeviceID').style.display = 'block';
      return;
    }
    if (AccessPermission === null) {
      document.getElementById('errAccessPermission').innerHTML = 'Please Enter Access Permission';
      document.getElementById('errAccessPermission').style.display = 'block';
      return;
    }

    const obj = {

      deviceID: DeviceID.value,
      accessPermissionTo: AccessPermission.value,
      userID: userID,
    };
    // console.log("obj",obj)
    // return;
    let data = await PostSecurityAccess(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      SecurityAccessControl()
      setisNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
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
    // console.log('clear')
    document.getElementById('errDeviceID').style.display = 'none';
    document.getElementById('errAccessPermission').style.display = 'none';
    setAccessPermission(null)
    setDeviceID(null)
  };


  const edit = (Securityaccess, index) => {
    document.getElementById('errDeviceID').style.display = 'none';
    document.getElementById('errAccessPermission').style.display = 'none';
    setRowID(Securityaccess.id)
    setIsUpdateBtnShow(true);
    setAccessPermission({
      value: Securityaccess.accessPermissionTo,
      label: Securityaccess.accessPermissionName
    })
    setDeviceID({
      value: Securityaccess.deviceID,
      label: Securityaccess.itemName

    })
    setNewlyAddedRowIndex(index)


  }

  const handleUpdate = async () => {




    if (DeviceID === null) {
      document.getElementById('errDeviceID').innerHTML = 'Please select Item Name';
      document.getElementById('errDeviceID').style.display = 'block';
      return;
    }
    if (AccessPermission === null) {
      document.getElementById('errAccessPermission').innerHTML = 'Please Enter Access Permission';
      document.getElementById('errAccessPermission').style.display = 'block';
      return;
    }

    const obj = {
      id: rowID,
      deviceID: DeviceID.value,
      accessPermissionTo: AccessPermission.value,
      userID: userID,
    };
    const data = await UpdateSecurityAccessControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      SecurityAccessControl()
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
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async () => {
    setShowUnderProcess(1);

    const obj = {
      id: rowID,
      userId: userID
    }

    let data = await DeleteSecurityAccessControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      setisNewRowAdded(false)
      SecurityAccessControl();
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
    SecurityAccessControl();
    dropdowns()
  }, []);





  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Security_Access_Control")}</div>
                <div className="inner-content">
                  <div className='row'>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("ItemName")}<span className="starMandatory">*</span></label>
                      <Select value={DeviceID} options={DeviceIDDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Item_Name")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errDeviceID", setDeviceID)} />
                      <small id="errDeviceID" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Access_Permission")}<span className="starMandatory">*</span></label>
                      <Select value={AccessPermission} options={AccessPermissionTable} className=" create-select" id="serviceType" placeholder={t("Choose_Access_Permission")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errAccessPermission", setAccessPermission)} />
                      <small id="errAccessPermission" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}.</th>
                      <th>{t("Device_ID")}</th>
                      <th>{t("Access_Permission")}</th>
                      <th></th>
                      <th></th>

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SecurityAccessTable && SecurityAccessTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={index === SecurityAccessTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.itemName}</td>
                          <td>{data.accessPermissionName}</td>
                          <td></td>
                          <td></td>


                          <td></td>

                          <td>
                            <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data, index) }} />
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id); }} />
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
                <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>
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


