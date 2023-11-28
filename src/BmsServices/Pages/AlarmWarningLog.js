import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Select from 'react-select';
import Loder from '../../Component/Loader';
import PostAlarmWarningLog from "../API/AlarmWarningLog/PostAlarmWarningLog";
import GetEquipmentCategory from "../API/AlarmWarningLog/GetEquipmentCategory"
import GetAlarmWarning from "../API/AlarmWarningLog/GetAlarmWarning";
import DeleteAlarmWarning from "../API/AlarmWarningLog/DeleteAlarmWarning";
import PutAlarmwarning from "../API/AlarmWarningLog/PutAlarmwarning";
import GetAccessName from "../API/DeviceAccessControl/GetAccessName";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GeitemMaster from "../API/AlarmWarningLog/GetitemMaster"
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function AlarmWarningLog() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [AlarmWarningTable, setAlarmWarningTable] = useState([])
  const [alarmIDequipment, setalarmIDequipment] = useState([])
  const [alarmTime, setalarmTime] = useState("")
  const [warningTime, setwarningTime] = useState("")
  const [warningview, setwarningview] = useState(null)
  const [actionremark, setactionremark] = useState('')
  const [WarningViewTable, setWarningViewTable] = useState([])
  const [Equipment, setEquipment] = useState(null)
  const [EquipmentDropdown, setEquipmentDropdown] = useState([])
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);





  // The Code is  written By S Ayaz


  let dropdowns = async () => {
    let EquipmentMaster = await GeitemMaster();
    if (EquipmentMaster.status === 1) {
      // console.log("EquipmentMaster", EquipmentMaster.responseValue)
      setShowLoder(0);
      setEquipmentDropdown(EquipmentMaster.responseValue.map(Equipment => ({
        value: Equipment.id,
        label: Equipment.itemName
      })));
    }

    let IDforAlarm = await GetEquipmentCategory();
    if (IDforAlarm.status === 1) {
      // console.log("AlarmIdEquip", IDforAlarm.responseValue.id)
      setShowLoder(0);
      setalarmIDequipment(IDforAlarm.responseValue.id);
    }

    let Warningviewby = await GetAccessName();
    if (Warningviewby.status === 1) {
      setShowLoder(0);
      setWarningViewTable(Warningviewby.responseValue.map(ViewBy => ({
        value: ViewBy.id,
        label: ViewBy.name
      })));
      // console.log("Warningviewby", Warningviewby.responseValue)
    }
  }






  let GetAllAlarmWarningLog = async () => {
    let data = await GetAlarmWarning();
    if (data.status === 1) {
      setAlarmWarningTable(data.responseValue);
      // console.log("AllAlarmWarning", data.responseValue)
    }
  }

  const handleOnChange = (e) => {
    document.getElementById('errEquipment').style.display = 'none';
    document.getElementById('erraction').style.display = 'none';
    document.getElementById('errwarningviewby').style.display = 'none';
    document.getElementById('errwarmingviewtime').style.display = 'none';
    document.getElementById('erralarmtime').style.display = 'none';


    const { name, value } = e.target;

    if (name === 'alarmtime') {
      setalarmTime(value);
    }
    if (name === 'warmingTime') {
      setwarningTime(value);
    }

    if (name === 'action') {
      setactionremark(value);
    }

  };

  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };

  const handleOnSave = async () => {


    if (Equipment === null) {
      document.getElementById('errEquipment').innerHTML = 'Please choose Alarm Equipment';
      document.getElementById('errEquipment').style.display = 'block';
      return;
    }

    else if (alarmTime.trim() === '' || alarmTime === undefined) {
      document.getElementById('erralarmtime').innerHTML = 'Please choose Alarm Time';
      document.getElementById('erralarmtime').style.display = 'block';
      return;
    }
    else if (warningTime.trim() === '' || warningTime === undefined) {
      document.getElementById('errwarmingviewtime').innerHTML = 'Please choose Warning View Time';
      document.getElementById('errwarmingviewtime').style.display = 'block';
      return;
    }
    else if (warningview === null) {
      document.getElementById('errwarningviewby').innerHTML = 'Please Choose Warning View By';
      document.getElementById('errwarningviewby').style.display = 'block';
      return;
    }

    else if (actionremark.trim() === '' || actionremark === undefined) {
      document.getElementById('erraction').innerHTML = 'Please Enter Action Remark';
      document.getElementById('erraction').style.display = 'block';
      return;
    }

    const obj = {
      alarmItemID: Equipment.value,
      aramTime: alarmTime,
      warningViewTime: warningTime,
      warningViewedBy: warningview.value,

      actionRemark: actionremark,
      userId: userID
    };

    let data = await PostAlarmWarningLog(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      GetAllAlarmWarningLog()
      setNewlyAddedRowIndex(0);
      handleClear();

      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
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
    document.getElementById('errEquipment').style.display = 'none';
    document.getElementById('erraction').style.display = 'none';
    document.getElementById('errwarningviewby').style.display = 'none';
    document.getElementById('errwarmingviewtime').style.display = 'none';
    document.getElementById('erralarmtime').style.display = 'none';
    setalarmTime("")
    setEquipment(null)
    setwarningview(null)
    setwarningTime("")
    setactionremark("")
  };
  const edit = (data, index) => {
    setRowID(data.id)
    setIsUpdateBtnShow(true);
    setEquipment({
      value: data.alarmItemID,
      label: data.itemName
    })
    setalarmTime(data.aramTime)
    setwarningTime(data.warningViewTime)
    setwarningview({
      value: data.warningViewedBy,
      label: data.warningViewedUserName
    })
    setactionremark(data.actionRemark)
    setNewlyAddedRowIndex(index)

  }

  const handleUpdate = async () => {



    if (Equipment === null) {
      document.getElementById('errEquipment').innerHTML = 'Please choose Alarm Equipment';
      document.getElementById('errEquipment').style.display = 'block';
      return;
    }
    else if (alarmTime.trim() === '' || alarmTime === undefined) {
      document.getElementById('erralarmtime').innerHTML = 'Please choose Alarm Time';
      document.getElementById('erralarmtime').style.display = 'block';
      return;
    }
    else if (warningTime.trim() === '' || warningTime === undefined) {
      document.getElementById('errwarmingviewtime').innerHTML = 'Please choose Warning View Time';
      document.getElementById('errwarmingviewtime').style.display = 'block';
      return;
    }
    else if (warningview === null) {
      document.getElementById('errwarningviewby').innerHTML = 'Please Choose Warning View By';
      document.getElementById('errwarningviewby').style.display = 'block';
      return;
    }

    else if (actionremark.trim() === '' || actionremark === undefined) {
      document.getElementById('erraction').innerHTML = 'Please Enter Action Remark';
      document.getElementById('erraction').style.display = 'block';
      return;
    }
    const obj = {
      id: rowID,
      alarmItemID: Equipment.value,
      aramTime: alarmTime,
      warningViewTime: warningTime,
      warningViewedBy: warningview.value,
      actionRemark: actionremark,
      userID: userID,
    };
    const data = await PutAlarmwarning(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      GetAllAlarmWarningLog()
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
    let data = await DeleteAlarmWarning(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(null)
      setEditRowIndex(false)
      GetAllAlarmWarningLog()
      setIsUpdateBtnShow(false)
      setTimeout(() => {
        setShowToster(0);

        handleClear()

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
    setEditRowIndex(null);
    setNewlyAddedRowIndex(null);
  };

  useEffect(() => {
    dropdowns()
    GetAllAlarmWarningLog()
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Alarm_Warning")}</div>
                <div className="inner-content">
                  <div className='row'>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Alarm_Equipment")}<span className="starMandatory">*</span></label>
                      <Select value={Equipment} options={EquipmentDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Alarm_Equipment")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errEquipment", setEquipment)} />
                      <small id="errEquipment" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("AlarmTime")}<span className="starMandatory">*</span></label>
                      <input value={alarmTime} id="ddalarmtime" type="time" className="form-control form-control-sm" name="alarmtime" placeholder="Enter Alarm" onChange={handleOnChange} />
                      <small id="erralarmtime" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Warning_View_Time")}<span className="starMandatory">*</span></label>
                      <input value={warningTime} id="ddwarningviewtime" type="time" className="form-control form-control-sm" name="warmingTime" placeholder={t("Enter_Warning_Time")} onChange={handleOnChange} />
                      <small id="errwarmingviewtime" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Warning_View_By")}<span className="starMandatory">*</span></label>
                      <Select value={warningview} options={WarningViewTable} className=" create-select" id="serviceType" placeholder={t("Choose_Warning_View_By")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errwarningviewby", setwarningview)} />
                      <small id="errwarningviewby" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Action_Remark")}<span className="starMandatory">*</span></label>
                      <input value={actionremark} id="ddaction" type="text" className="form-control form-control-sm" name="action" placeholder={t("Enter_Action_Remark")} onChange={handleOnChange} />
                      <small id="erraction" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                      <th>{t("Alarm_Equipment")}</th>
                      <th>{t("Alarm_Time")}</th>
                      <th>{t("Warning_View_Time")}</th>
                      <th>{t("Warning_View_By")}</th>
                      <th>{t("Action_Remark")}</th>

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AlarmWarningTable && AlarmWarningTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.itemName}</td>
                          <td>{data.aramTime}</td>
                          <td>{data.warningViewTime}</td>
                          <td>{data.warningViewedUserName}</td>
                          <td>{data.actionRemark}</td>


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