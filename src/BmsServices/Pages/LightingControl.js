import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import GetLightingControl from "../API/LightingControl/GetLightingControl";
import PostLightingControl from "../API/LightingControl/PostLightingControl";
import DeleteLightingControl from "../API/LightingControl/DeleteLightingControl";
import PutLightingControl from "../API/LightingControl/PutLightingControl";
import GetLocationDropdown from "../API/LocationEnvironment/GetLocationDropdown";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import Select from 'react-select';
import GetStatusMaster from "../../Admin/Api/Master/StatusMaster/GetStatusMaster";
import GeitemMaster from "../API/AlarmWarningLog/GetitemMaster"
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function LightingControl() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
 
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [LightID, setLightID] = useState(null)
  const [AssociatedCensorID, setAssociatedCensorID] = useState(null)
  const [LightIdDropdown, setLightIdDropdown] = useState([])
  const [DeviceID, setDeviceID] = useState(null)
  const [DeviceIDDropdown, setDeviceIDDropdown] = useState([])
  const [LocationIDDropdown, SetLocationIDDropdown] = useState([])
  const [LocationID, setLocationID] = useState(null)
  const [OnTimingFrom, setOnTimingFrom] = useState("")
  const [dimLevelID, setdimLevelID] = useState(null)
  const [DimLevelIDDropdown, setDimLevelIDDropdown] = useState([])
  const [LightControlTable, setLightControlTable] = useState([])
  const [AssociatedCensorDropdown, setAssociatedCensorDropdown] = useState([])
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  let [userID,] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);

  // The Code is  written By S Ayaz

  let Dropdowns = async () => {

    let Lightid = await GeitemMaster();
    if (Lightid.status === 1) {
      setShowLoder(0);
      setLightIdDropdown(Lightid.responseValue.map(Light => ({
        value: Light.id,
        label: Light.itemName
      })));

      //  console.log("Censor",Lightid.responseValue)
    }
    let Location = await GetLocationDropdown();
    if (Location.status === 1) {
      setShowLoder(0);
      SetLocationIDDropdown(Location.responseValue.map(location => ({
        value: location.id,
        label: `${location.floorName} Floor ${location.buildingName} Building ${location.roomNumber}`

      })));
      //  console.log("Location",Location.responseValue)
    }

    let deviceID = await GeitemMaster();
    if (deviceID.status === 1) {
      //  console.log("deviceID", deviceID.responseValue)
      setShowLoder(0);
      setDeviceIDDropdown(deviceID.responseValue.map(Device => ({
        value: Device.id,
        label: Device.itemName
      })));
    }

    let dimLevelID = await GetStatusMaster()
    if (dimLevelID.status === 1) {
      setDimLevelIDDropdown(dimLevelID.responseValue.map(DimLevel => ({
        value: DimLevel.id,
        label: DimLevel.remark
      })))
      setAssociatedCensorDropdown(dimLevelID.responseValue.map(censor => ({
        value: censor.id,
        label: censor.remark
      })))
      // console.log("dimLevelID" ,dimLevelID.responseValue )
    }

  }

  let LightingControl = async () => {
    let data = await GetLightingControl();
    if (data.status === 1) {
      setLightControlTable(data.responseValue);
      console.log("LightingControl", data.responseValue)
    }
  }

  const handleOnChange = (e) => {
    setisNewRowAdded(false)
    setNewlyAddedRowIndex(null);
    document.getElementById('errLightID').style.display = 'none';
    document.getElementById('errDeviceID').style.display = 'none';
    document.getElementById('errLocationID').style.display = 'none';
    document.getElementById('errOnTimingFrom').style.display = 'none';
    // document.getElementById('errDimLevel').style.display = 'none';
    document.getElementById('errAssociatedCensorID').style.display = 'none';

    const { name, value } = e.target;


    if (name === 'OnTimingFrom') {
      setOnTimingFrom(value);
    }

  };
  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };

  const handleOnSave = async () => {

    if (LightID === null) {
      document.getElementById('errLightID').innerHTML = 'Please Choose Light';
      document.getElementById('errLightID').style.display = 'block';
      return;
    }
    else if (AssociatedCensorID === null) {
      document.getElementById('errAssociatedCensorID').innerHTML = 'Please choose Associated Censor';
      document.getElementById('errAssociatedCensorID').style.display = 'block';
      return;
    }
    else if (DeviceID === null) {
      document.getElementById('errDeviceID').innerHTML = 'Please choose Device';
      document.getElementById('errDeviceID').style.display = 'block';
      return;
    }


    else if (LocationID === null) {
      document.getElementById('errLocationID').innerHTML = 'Please choose Location';
      document.getElementById('errLocationID').style.display = 'block';
      return;
    }



    else if (OnTimingFrom.trim() === '' || OnTimingFrom === undefined) {
      document.getElementById('errOnTimingFrom').innerHTML = 'Please Enter On Timing';
      document.getElementById('errOnTimingFrom').style.display = 'block';
      return;
    }
    else if (dimLevelID === null) {
      document.getElementById('errDimLevel').innerHTML = 'Please choose Dim Level';
      document.getElementById('errDimLevel').style.display = 'block';
      return;
    }

    const obj = {
      id: rowID,
      lightID: LightID.value,
      associatedCensorID: AssociatedCensorID.value,
      deviceID: DeviceID.value,
      locationID: LocationID.value,
      onTimingFrom: OnTimingFrom,
      dimLevelID: dimLevelID.value,
      userId: userID
    };

    let data = await PostLightingControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      LightingControl()
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
    document.getElementById('errLightID').style.display = 'none';
    document.getElementById('errDeviceID').style.display = 'none';
    document.getElementById('errLocationID').style.display = 'none';
    document.getElementById('errOnTimingFrom').style.display = 'none';
    document.getElementById('errDimLevel').style.display = 'none';
    document.getElementById('errAssociatedCensorID').style.display = 'none';

    setLightID(null)
    setAssociatedCensorID(null)
    setDeviceID(null)
    setLocationID(null)
    setOnTimingFrom('')
    setdimLevelID(null)
  };


  const edit = (data, index) => {
    document.getElementById('errLightID').style.display = 'none';
    document.getElementById('errDeviceID').style.display = 'none';
    document.getElementById('errLocationID').style.display = 'none';
    document.getElementById('errOnTimingFrom').style.display = 'none';
    setRowID(data.id)
    setIsUpdateBtnShow(true);
    setDeviceID({
      value: data.deviceID,
      label: data.deviceName
    })
    setAssociatedCensorID({
      value: data.associatedCensorID,
      label: data.associatedCensorName
    })
    setLightID({
      value: data.lightID,
      label: data.lightName
    })
    setOnTimingFrom(data.onTimingFrom)
    setdimLevelID({
      value: data.dimLevelID,
      label: data.dimLevelName
    })
    setLocationID({
      value: data.locationID,
      label: `${data.floorName} Floor ${data.buildingName} Building ${data.roomNumber}`
    })
    setNewlyAddedRowIndex(index)

  }

  const handleUpdate = async () => {
    if (LightID === null) {
      document.getElementById('errLightID').innerHTML = 'Please Choose Light';
      document.getElementById('errLightID').style.display = 'block';
      return;
    }
    else if (AssociatedCensorID === null) {
      document.getElementById('errAssociatedCensorID').innerHTML = 'Please choose Associated Censor';
      document.getElementById('errAssociatedCensorID').style.display = 'block';
      return;
    }
    else if (DeviceID === null) {
      document.getElementById('errDeviceID').innerHTML = 'Please choose Device';
      document.getElementById('errDeviceID').style.display = 'block';
      return;
    }

    else if (LocationID === null) {
      document.getElementById('errLocationID').innerHTML = 'Please choose Location';
      document.getElementById('errLocationID').style.display = 'block';
      return;
    }

    else if (OnTimingFrom.trim() === '' || OnTimingFrom === undefined) {
      document.getElementById('errOnTimingFrom').innerHTML = 'Please Enter On Timing';
      document.getElementById('errOnTimingFrom').style.display = 'block';
      return;
    }
    else if (dimLevelID === null) {
      document.getElementById('errDimLevel').innerHTML = 'Please choose Dim Level';
      document.getElementById('errDimLevel').style.display = 'block';
      return;
    }

    const obj = {
      id: rowID,
      lightID: LightID.value,
      associatedCensorID: AssociatedCensorID.value,
      deviceID: DeviceID.value,
      locationID: LocationID.value,
      onTimingFrom: OnTimingFrom,
      dimLevelID: dimLevelID.value,
      userId: userID
    };
    const data = await PutLightingControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      LightingControl()
      handleClear()
      setTimeout(() => {
        setShowToster(0);


      }, 2000);
      setIsUpdateBtnShow(false);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage("Already Exist");
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
    let data = await DeleteLightingControl(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      setisNewRowAdded(false)
      LightingControl()
      handleClear()

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

  };

  useEffect(() => {
    Dropdowns()
    LightingControl()
  }, []);


  return (
    <>

      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Lighting_Control")}</div>
                <div className="inner-content">
                  <div className='row'>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Light_ID")}<span className="starMandatory">*</span></label>
                      <Select value={LightID} options={LightIdDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Light_ID")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errLightID", setLightID)} />
                      <small id="errLightID" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Associated_CensorID")} <span className="starMandatory">*</span></label>
                      <Select value={AssociatedCensorID} options={AssociatedCensorDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Associated_CensorID")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errAssociatedCensorID", setAssociatedCensorID)} />
                      <small id="errAssociatedCensorID" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Device")}<span className="starMandatory">*</span></label>
                      <Select value={DeviceID} options={DeviceIDDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Device")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errDeviceID", setDeviceID)} />
                      <small id="errDeviceID" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Location")}<span className="starMandatory">*</span></label>
                      <Select value={LocationID} options={LocationIDDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Location")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errLocationID", setLocationID)} />
                      <small id="errLocationID" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("On_Timing")}<span className="starMandatory">*</span></label>
                      <input value={OnTimingFrom} id="ddOnTimingFrom" type="time" className="form-control form-control-sm" name="OnTimingFrom" placeholder={t("Select_On_Timing")} onChange={handleOnChange} />
                      <small id="errOnTimingFrom" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Dim_Level")}<span className="starMandatory">*</span></label>
                      <Select value={dimLevelID} options={DimLevelIDDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Dim_Level")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errDimLevel", setdimLevelID)} />
                      <small id="errDimLevel" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                      <th>{t("Light_ID")}</th>
                      <th>{t("Associated_CensorID")}</th>
                      <th>{t("Device_ID")}</th>
                      <th>{t("Location_ID")}</th>
                      <th>{t("On_Timing")}</th>
                      <th>{t("Dim_Level_ID")}</th>


                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LightControlTable && LightControlTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={index === LightControlTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.lightName}</td>
                          <td>{data.associatedCensorName}</td>
                          <td>{data.deviceName}</td>
                          <td>{data.buildingName + " " + data.floorName + " " + data.roomNumber}</td>
                          <td>{data.onTimingFrom}</td>
                          <td>{data.dimLevelName}</td>

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


