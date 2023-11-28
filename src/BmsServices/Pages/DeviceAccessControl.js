import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import PostDeviceAccessControl from "../API/DeviceAccessControl/PostDeviceAccessControl";
import GetDeviceAccessControl from "../API/DeviceAccessControl/GetDeviceAccessControl";
import DeleteDeviceAccessControl from "../API/DeviceAccessControl/DeleteDeviceAccessControl";
import PutDeviceAccessControl from "../API/DeviceAccessControl/PutDeviceAccessControl";
import GetAccessName from "../API/DeviceAccessControl/GetAccessName";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GeitemMaster from "../API/AlarmWarningLog/GetitemMaster"
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function DeviceAccessControl() {
  const { t } = useTranslation();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [DeviceAccessControlTable, setDeviceAccessControlTable] = useState([])
  const [ItemName, setItemName] = useState(null)
  const [DeviceUserAccessName, setDeviceUserAccessName] = useState(null)
  const [CanRead, setCanRead] = useState(0)
  const [CanWrite, setCanWrite] = useState(0)
  const [CanDelete, setCanDelete] = useState(0)
  const [StartDate, setStartDate] = useState("")
  const [EndDate, setEndDate] = useState("")
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  const [ItemNameDropdown, setItemNameDropdown] = useState([])
  const [DeviceUserAccessNameDropdown, setDeviceUserAccessNameDropdown] = useState([])
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);



  const toggleCanRead = () => {
    setCanRead(CanRead ? 0 : 1)
  }
  const toggleCanWrite = () => {
    setCanWrite(CanWrite ? 0 : 1)
  }

  const toggleCanDelete = () => {
    setCanDelete(CanDelete ? 0 : 1)
  }
  let Dropdowns = async () => {

    let ItemName = await GeitemMaster();
    if (ItemName.status === 1) {
      setShowLoder(0);
      setItemNameDropdown(ItemName.responseValue.map(items => ({
        value: items.id,
        label: items.itemName
      })));
      console.log("ItemName", ItemName.responseValue)
    }


    let UserAccess = await GetAccessName();
    if (UserAccess.status === 1) {
      setShowLoder(0);
      setDeviceUserAccessNameDropdown(UserAccess.responseValue.map(names => ({
        value: names.id,
        label: names.name
      })));
       console.log("UserAccess",UserAccess.responseValue)
    }
  }

  let DeviceAccessControl = async () => {
    let data = await GetDeviceAccessControl();
    if (data.status === 1) {
      setDeviceAccessControlTable(data.responseValue);
      console.log("GetDeviceAccessControl", data.responseValue)
    }
  }

  const handleOnChange = (e) => {


    setisNewRowAdded(false)

    document.getElementById('errItemName').style.display = 'none';
    document.getElementById('errcanread').style.display = 'none';
    document.getElementById('errcanwrite').style.display = 'none';
    document.getElementById('errcandelete').style.display = 'none';
    document.getElementById('errstartdate').style.display = 'none';
    document.getElementById('errEndDate').style.display = 'none';
    document.getElementById('errUserAccess').style.display = 'none';

    const { name, value } = e.target;


    if (name === 'startdate') {
      setStartDate(value);
    }
    else if (name === 'EndDate') {
      setEndDate(value);
    }
  };

  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };

  const handleOnSave = async () => {
    if (ItemName === null) {
      document.getElementById('errItemName').innerHTML = 'Please Choose Item Name';
      document.getElementById('errItemName').style.display = 'block';
      return;
    }
    else if (DeviceUserAccessName === null) {
      document.getElementById('errUserAccess').innerHTML = 'Please Choose User Access';
      document.getElementById('errUserAccess').style.display = 'block';
      return;
    }

    else if (StartDate.trim() === '' || StartDate === undefined) {
      document.getElementById('errstartdate').innerHTML = 'Please Enter Start Date';
      document.getElementById('errstartdate').style.display = 'block';
      return;
    }
    else if (EndDate.trim() === '' || EndDate === undefined) {
      document.getElementById('errEndDate').innerHTML = 'Please Enter End Date';
      document.getElementById('errEndDate').style.display = 'block';
      return;
    }
    const obj = {
      itemID: ItemName.value,
      accessUserID: DeviceUserAccessName.value,
      canRead: CanRead,
      canWrite: CanWrite,
      canDelete: CanDelete,
      startDate: StartDate,
      endDate: EndDate,
      userId: userID
    };


    // console.log("obj", obj)

    let data = await PostDeviceAccessControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      DeviceAccessControl()
      setisNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
        setisNewRowAdded(false)
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
    //  console.log('clear')
    document.getElementById('errItemName').style.display = 'none';
    document.getElementById('errcanread').style.display = 'none';
    document.getElementById('errcanwrite').style.display = 'none';
    document.getElementById('errcandelete').style.display = 'none';
    document.getElementById('errstartdate').style.display = 'none';
    document.getElementById('errEndDate').style.display = 'none';
    document.getElementById('errUserAccess').style.display = 'none';
    setRowID("")

    setItemName(null)
    setDeviceUserAccessName(null)
    setCanDelete(0)
    setCanRead(0)
    setCanWrite(0)
    setEndDate("")
    setStartDate("")
  };


  const edit = (data, index) => {
    document.getElementById('errItemName').style.display = 'none';
    document.getElementById('errcanread').style.display = 'none';
    document.getElementById('errcanwrite').style.display = 'none';
    document.getElementById('errcandelete').style.display = 'none';
    document.getElementById('errstartdate').style.display = 'none';
    document.getElementById('errEndDate').style.display = 'none';
    document.getElementById('errUserAccess').style.display = 'none';
    setRowID(data.id)
    setIsUpdateBtnShow(true);
    setItemName({
      value: data.itemId,
      label: data.itemName

    })
    setDeviceUserAccessName({
      value: data.accessUserID,
      label: data.accessUserName
    })
    setCanDelete(data.canDelete)
    setCanWrite(data.canWrite)
    setCanRead(data.canRead)
    setStartDate(data.startDate)
    setEndDate(data.endDate)
    setNewlyAddedRowIndex(index)

  }

  const handleUpdate = async () => {
    if (ItemName === null) {
      document.getElementById('errItemName').innerHTML = 'Please Choose Item Name';
      document.getElementById('errItemName').style.display = 'block';
      return;
    }
    else if (DeviceUserAccessName === null) {
      document.getElementById('errUserAccess').innerHTML = 'Please Choose User Access';
      document.getElementById('errUserAccess').style.display = 'block';
      return;
    }
    else if (StartDate.trim() === '' || StartDate === undefined) {
      document.getElementById('errstartdate').innerHTML = 'Please Enter Start Date';
      document.getElementById('errstartdate').style.display = 'block';
      return;
    }
    else if (EndDate.trim() === '' || EndDate === undefined) {
      document.getElementById('errEndDate').innerHTML = 'Please Enter End Date';
      document.getElementById('errEndDate').style.display = 'block';
      return;
    }
    const obj = {
      id: rowID,
      itemID: ItemName.value,
      accessUserID: DeviceUserAccessName.value,
      canRead: CanRead,
      canWrite: CanWrite,
      canDelete: CanDelete,
      startDate: StartDate,
      endDate: EndDate,
      userId: userID
    };
    // console.log("obj",obj);
    // return;
    const data = await PutDeviceAccessControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      DeviceAccessControl()
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
  }

  const deleteRow = async () => {
    setShowUnderProcess(1);

    const obj = {
      id: rowID,
      userId: userID
    }
    let data = await DeleteDeviceAccessControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setisNewRowAdded(null)
      setIsUpdateBtnShow(false)
      setNewlyAddedRowIndex(false)
      DeviceAccessControl()
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


  const handleCancel = () => {
    handleClear()
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
    setisNewRowAdded(false)

  };

  useEffect(() => {
    Dropdowns()
    DeviceAccessControl()
  }, []);


  return (
    <>

      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Device_Access_Control")}</div>
                <div className="inner-content">
                  <div className='row'>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("ItemName")}<span className="starMandatory">*</span></label>
                      <Select value={ItemName} options={ItemNameDropdown} className=" create-select" id="serviceType" placeholder="Choose Item Name" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errItemName", setItemName)} />
                      <small id="errItemName" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("User_Access_Name")}<span className="starMandatory">*</span></label>
                      <Select value={DeviceUserAccessName} options={DeviceUserAccessNameDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_User_Access_Name")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errUserAccess", setDeviceUserAccessName)} />
                      <small id="errUserAccess" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Start_Date")}<span className="starMandatory">*</span></label>
                      <input value={StartDate} id="ddstartdate" type="datetime-local" className="form-control form-control-sm" name="startdate" placeholder="Select Start Date" onChange={handleOnChange} />
                      <small id="errstartdate" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("End_Date")}<span className="starMandatory">*</span></label>
                      <input value={EndDate} id="ddEnddate" type="datetime-local" className="form-control form-control-sm" name="EndDate" placeholder="Select End Date" onChange={handleOnChange} />
                      <small id="errEndDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="d-flex column-gap-1 flex-wrap regularCheck col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mx-4">
                      <div className="d-flex column-gap-3 mt-4 me-3">
                        <label htmlFor="canRead" className="form-label">{t("Can_Read")}<span className="starMandatory"></span></label>
                        <div className="form-check">
                          <input checked={CanRead} id="canRead" name="canread" className="form-check-input" type="checkbox" onClick={toggleCanRead} />
                        </div>
                        <small id="errcanread" className="form-text text-danger" style={{ display: 'none' }}></small>
                      </div>

                      <div className="d-flex column-gap-3 mt-4 me-3">
                        <label htmlFor="canWrite" className="form-label">{t("Can_Write")}<span className="starMandatory"></span></label>
                        <div className="form-check">
                          <input checked={CanWrite} id="canWrite" name="canWrite" className="form-check-input" type="checkbox" onClick={toggleCanWrite} />
                        </div>
                        <small id="errcanwrite" className="form-text text-danger" style={{ display: 'none' }}></small>
                      </div>

                      <div className="d-flex column-gap-3 mt-4">
                        <label htmlFor="canDelete" className="form-label">{t("Can_Delete")}<span className="starMandatory"></span></label>
                        <div className="form-check">
                          <input checked={CanDelete} id="canDelete" name="candelete" className="form-check-input" type="checkbox" onClick={toggleCanDelete} />
                        </div>
                        <small id="errcandelete" className="form-text text-danger" style={{ display: 'none' }}></small>
                      </div>
                    </div >

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                            {isUpdateBtnShow !== true ? <>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleOnSave}><img src={saveButtonIcon} alt="" className='icnn' />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} alt="" className='icnn' />{t("Clear")}</button>
                            </> :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-1" onClick={handleUpdate} >{t("Update")}</button>
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
            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Equipment")}</th>
                      <th>{t("User_Access_Name")}</th>
                      <th>{t("Start_Date")}</th>
                      <th>{t("End_Date")}</th>
                      <th>{t("Can_Read")}</th>
                      <th>{t("Can_Write")}</th>
                      <th>{t("Can_Delete")}</th>
                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DeviceAccessControlTable && DeviceAccessControlTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;

                      return (
                        <tr className={index === DeviceAccessControlTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.itemName}</td>
                          <td>{data.accessUserName}</td>
                          <td>{data.startDate}</td>
                          <td>{data.endDate}</td>
                          <td>{data.canRead === 1 ? 'Yes' : 'No'}</td>
                          <td>{data.canWrite === 1 ? 'Yes' : 'No'}</td>
                          <td>{data.canDelete === 1 ? 'Yes' : 'No'}</td>
                          <td></td>
                          <td>
                            <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={editBtnIcon} alt='' onClick={() => { edit(data, index) }} />
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
                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deleteRow} >{t("Delete")}</button>
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


