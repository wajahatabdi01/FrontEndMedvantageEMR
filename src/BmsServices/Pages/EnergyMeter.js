import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import GetEnergyTypeMaster from "../API/EnergyTypeMaster/GetEnergyTypeMaster";
import GetEnergyMeterLocation from "../API/EneryMeter/GetEnergyMeterLocation";
import GetEnergyMeter from "../API/EneryMeter/GetEnergyMeter";
import PostEnergyMeter from "../API/EneryMeter/PostEnergyMeter";
import DeleteEnergyMeter from "../API/EneryMeter/DeleteEnergyMeter";
import UpdateEnergyMeter from "../API/EneryMeter/UpdateEnergyMeter";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";



 export default function EnergyMeter() {
  const { t } = useTranslation();

  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [EnergyMeterNumber, setEnergyMeterNumber] = useState('');
  const [EnergyMeterTable, setEnergyMeterTable] = useState([])
  const [SelectedEnergyType, setSelectedEnergyType] = useState(null)
  const [EnergyMeterLocation, setEnergyMeterLocation] = useState([])
  const [SelectedLocation, setSelectedLocation] = useState(null)
  const [EnergyTypeTable, setEnergyTypeTable] = useState([])
  const [InstalledDate, setInstalledDate] = useState('')
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setIsNewRowAdded] = useState(false);
  const [isClearable, setisClearable] = useState(true)
  const [isSearchable, setisSearchable] = useState(true)
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);

  

  function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join('-');
  };


  let DropDownds = async () => {
    let EnergyType = await GetEnergyTypeMaster()
    if (EnergyType.status === 1) {
      
      setEnergyTypeTable(EnergyType.responseValue.map(energy =>({
        value : energy.id,
        label : energy.energyType,
      })))
      console.log("EnergyType", EnergyType.responseValue)
    }
    let energyMeterLocation = await GetEnergyMeterLocation()
    if (energyMeterLocation.status === 1) {
      setEnergyMeterLocation(energyMeterLocation.responseValue.map(location => ({
        value: location.id,
        label: `${location.floorName} Floor ${location.buildingName} Building ${location.roomNumber}`
      })))
      console.log("ENERGYMETERLOCATION", energyMeterLocation)
    }
  }


  let EnergyTypeGet = async () => {
    let AllEnergyType = await GetEnergyMeter();
    if (AllEnergyType.status === 1) {
      console.log("AllEnergyType", AllEnergyType.responseValue)
      setShowLoder(0);
      setEnergyMeterTable(AllEnergyType.responseValue);
    }
  }

 


  const handleOnChange = (e) => {
    setIsNewRowAdded(false)
    setNewlyAddedRowIndex(null);
    document.getElementById('errMeterNumber').style.display = 'none';
    document.getElementById('errEnergyType').style.display = 'none';
    document.getElementById('errEnergyMeterLocation').style.display = 'none';
    document.getElementById('errInstalledDate').style.display = 'none';
    const { name, value } = e.target;
    if (name === 'MeterNumber') {
      setEnergyMeterNumber(value);
    }

    else if (name === 'InstalledDate') {
      setInstalledDate(value);
    }
  };

  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };




  const handleOnSave = async () => {
  

    if (EnergyMeterNumber === '') {
      document.getElementById('errMeterNumber').innerHTML = 'Please Enter Meter Number';
      document.getElementById('errMeterNumber').style.display = 'block';
      return;
    }
    else if (EnergyMeterNumber < 0){
      document.getElementById('errMeterNumber').innerHTML = 'Meter Number should not be negative';
      document.getElementById('errMeterNumber').style.display = 'block';
      return;
    }
    else if (SelectedEnergyType === null) {
      document.getElementById('errEnergyType').innerHTML = 'Please Choose  Energy Type';
      document.getElementById('errEnergyType').style.display = 'block';
      return;
    }

    else if (SelectedLocation === null) {
      document.getElementById('errEnergyMeterLocation').innerHTML = 'Please Choose Energy Meter Location';
      document.getElementById('errEnergyMeterLocation').style.display = 'block';
      return;
    }
    else if (InstalledDate.trim() === '' || InstalledDate === undefined) {
      document.getElementById('errInstalledDate').innerHTML = 'Please Choose Installed Date';
      document.getElementById('errInstalledDate').style.display = 'block';
      return;
    }

    const obj = {
      meterNumber: EnergyMeterNumber,

      energyTypeID: SelectedEnergyType.value,
      locationID: SelectedLocation.value,
      installedDate: InstalledDate,
      userID: userID,
    };

    let data = await PostEnergyMeter(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      EnergyTypeGet()
      setIsNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
 setIsNewRowAdded(null)

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
    const elementsToHide = ['errMeterNumber', 'errEnergyType', 'errEnergyMeterLocation','errInstalledDate'];
    elementsToHide.forEach(id => document.getElementById(id).style.display = 'none');
    
    setEnergyMeterNumber('')
    setSelectedEnergyType(null)
    setSelectedLocation(null)
    setInstalledDate('')
  };


  const edit = (AllEnergyType, index) => {

    const elementsToHide = ['errMeterNumber', 'errEnergyType', 'errEnergyMeterLocation','errInstalledDate'];
    elementsToHide.forEach(id => document.getElementById(id).style.display = 'none');

    setRowID(AllEnergyType.id)
    setIsUpdateBtnShow(true);
    setEnergyMeterNumber(AllEnergyType.meterNumber)
    setSelectedEnergyType({
      value: AllEnergyType.energyTypeID,
      label: AllEnergyType.energyType,

    })
    setSelectedLocation({
      value: AllEnergyType.locationId,
      label: `${AllEnergyType.floorName} Floor ${AllEnergyType.buildingName} Building ${AllEnergyType.roomNumber}`
    })
    setInstalledDate(reformatDateString(AllEnergyType.installedDate))
    setNewlyAddedRowIndex(index)
  }

  const handleUpdate = async () => {

   
    if (EnergyMeterNumber === '') {
      document.getElementById('errMeterNumber').innerHTML = 'Please Enter Meter Number';
      document.getElementById('errMeterNumber').style.display = 'block';
      return;
    }
    else if (EnergyMeterNumber < 0){
      document.getElementById('errMeterNumber').innerHTML = 'Meter Number should not be negative';
      document.getElementById('errMeterNumber').style.display = 'block';
      return;
    }
    else if (isNaN(EnergyMeterNumber)) {
      document.getElementById('errMeterNumber').innerHTML = 'Please Enter Valid  Meter Number';
      document.getElementById('errMeterNumber').style.display = 'block';
      return;
    }
    else if (SelectedEnergyType === null) {
      document.getElementById('errEnergyType').innerHTML = 'Please Choose  Energy Type';
      document.getElementById('errEnergyType').style.display = 'block';
      return;
    }

    else if (SelectedLocation === null) {
      document.getElementById('errEnergyMeterLocation').innerHTML = 'Please Choose Energy Meter Location';
      document.getElementById('errEnergyMeterLocation').style.display = 'block';
      return;
    }
    else if (InstalledDate.trim() === '' || InstalledDate === undefined) {
      document.getElementById('errInstalledDate').innerHTML = 'Please Choose Installed Date';
      document.getElementById('errInstalledDate').style.display = 'block';
      return;
    }


    const obj = {
      id: rowID,
      meterNumber: EnergyMeterNumber,
      energyTypeID: SelectedEnergyType.value,
      locationID: SelectedLocation.value,
      installedDate: InstalledDate,
      userID: userID,
    };
    const data = await UpdateEnergyMeter(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      EnergyTypeGet();
      handleClear();
      setIsNewRowAdded(false);
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

    let data = await DeleteEnergyMeter(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setIsUpdateBtnShow(false)
      setNewlyAddedRowIndex(false)
      EnergyTypeGet()
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




  useEffect(() => {
    DropDownds();
    EnergyTypeGet();
   
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Energy_Meter")}</div>
                <div className="inner-content">
                  <div className='row'>
              
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("MeterNumber")}<span className="starMandatory">*</span></label>
                          <input value={EnergyMeterNumber} id="ddMeterNumber" type="number" className="form-control form-control-sm" name="MeterNumber" placeholder={t("Meter_Number")} onChange={handleOnChange} />
                          <small id="errMeterNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="ddlitemmaster" className="form-label">{t("Energy_Type")}<span className="starMandatory">*</span></label>
                          <Select  value={SelectedEnergyType} placeholder={t("Select_Energy_Type")} options = {EnergyTypeTable} className="create-select" id="EnergyType" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errEnergyType", setSelectedEnergyType)} />
                          <small id="errEnergyType" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="ddlitemmaster" className="form-label m">{t("Energy_Meter_Location")}<span className="starMandatory">*</span></label>
                          <Select value={SelectedLocation} placeholder={t("Select_Energy_Meter_Location")} options={EnergyMeterLocation} className=" create-select" id="serviceType" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errEnergyMeterLocation", setSelectedLocation)} />
                          <small id="errEnergyMeterLocation" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Installed_Date")}<span className="starMandatory">*</span></label>
                          <input value={InstalledDate} id="ddstartdate" type="date" className="form-control form-control-sm" name="InstalledDate" placeholder={t("Select_Installed_Date")} onChange={handleOnChange} />
                          <small id="errInstalledDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' alt="" />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt="" />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 " onClick={handleUpdate} >{t("Update")}</button>
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
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("MeterNumber")}</th>
                      <th>{t("Energy_Type")}</th>
                      <th>{t("Energy_Meter_Location")}</th>
                      <th>{t("Installed_Date")}</th>
                      <th></th>

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EnergyMeterTable && EnergyMeterTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={index === EnergyMeterTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.meterNumber}</td>
                          <td>{data.energyType}</td>
                          <td>{data.buildingName + " " + data.floorName + " " + data.roomNumber}</td>
                          <td>{data.installedDate}</td>
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
                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
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


