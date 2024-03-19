import React, { useEffect, useState } from 'react'
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import GetServiceTypeMaster from '../API/ServiceTypeMaster/GetServiceTypeMaster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GetAllVehicleRenewal from '../API/Vehicle Renewal/GetAllVehicleRenewal';
import PostVehicleRenewal from '../API/Vehicle Renewal/PostVehicleRenewal';
import PutVehicleRenewal from '../API/Vehicle Renewal/PutVehicleRenewal';
import DeleteVehicleRenewal from '../API/Vehicle Renewal/DeleteVehicleRenewal';

import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function VehicleRenewal() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [ServiceTypeList, setServiceTypeList] = useState([]);
  const [VehicleNumber, setVehicleNumber] = useState("");
  const [ServiceType, setServiceType] = useState("");
  const [rowID, setRowID] = useState(0);
  const [VehicleRenewalTable, setVehicleRenewalTable] = useState([]);
  const [UpcomingDate, setUpcomingDate] = useState("")
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setIsNewRowAdded] = useState(false);
  const [SelectedServiceType, setSelectedServiceType] = useState(null)
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);




  // The Code is written By S Ayaz



  const getDropdownData = async () => {
    let dropdownData = await GetServiceTypeMaster();
   
    if (dropdownData.status === 1) {
      setServiceTypeList(dropdownData.responseValue.map(Services => ({
        value: Services.id,
        label: Services.serviceType,
      })));
    }
  };

  const GetVehicleRenewal = async () => {
    const tabledata = await GetAllVehicleRenewal();
    if (tabledata.status === 1) {
      setShowLoder(0);
      setVehicleRenewalTable(tabledata.responseValue);
    } else {
      setShowLoder(0);
    }

  };

  const handleOnChange = (e) => {
    setIsNewRowAdded(false)
    document.getElementById('errVehicleNumber').style.display = 'none';
    document.getElementById('errServiceType').style.display = 'none';
    document.getElementById('errUpcomingDate').style.display = 'none';

    const { name, value } = e.target;
    if (name === 'VehicleNumber') {
      setVehicleNumber(value);
    }
    else if (name === "UpcomingDate")
      setUpcomingDate(value)
  };

  const handleServiceOnChange = (selectedOption) => {
    document.getElementById('errServiceType').style.display = 'none';
    setSelectedServiceType(selectedOption)
  }


  const handleOnSave = async () => {
    if (VehicleNumber.trim() === '') {
      document.getElementById('errVehicleNumber').innerHTML = 'Please Enter Vehicle Number';
      document.getElementById('errVehicleNumber').style.display = 'block';
      return; 
    }
    else if (VehicleNumber < 0){
      document.getElementById('errVehicleNumber').innerHTML = 'Vehicle Number must not be negative';
      document.getElementById('errVehicleNumber').style.display = 'block';
      return;
    }
  
    else if (SelectedServiceType === null) {
      document.getElementById('errServiceType').innerHTML = 'Please Choose Service Type';
      document.getElementById('errServiceType').style.display = 'block';
      return; 
    }

    else if (UpcomingDate.trim() === '' || UpcomingDate === undefined) {
      document.getElementById('errUpcomingDate').innerHTML = 'Please Enter Upcoming Date';
      document.getElementById('errUpcomingDate').style.display = 'block';
      return;
    }

    const obj = {
      vehicleNumber: VehicleNumber,
      serviceType: SelectedServiceType.value,
      upcomingRenewalDate: UpcomingDate,
      userId: userID,
    };

    let data = await PostVehicleRenewal(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage('Data Saved Successfully!');
      GetVehicleRenewal();
      setIsNewRowAdded(true)
      setNewlyAddedRowIndex(null);
      handleClear()
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);

      }, 2000);
    } else {
      setShowUnderProcess(0);
      setShowToster(0);
      setTosterValue(0);
      setTosterMessage(data.responseValue);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };


  const handleClear = async () => {
    document.getElementById('errVehicleNumber').style.display = 'none';
    document.getElementById('errUpcomingDate').style.display = 'none';
    document.getElementById('errServiceType').style.display = 'none';
    setSelectedServiceType(null);
    setVehicleNumber('');
    setUpcomingDate("")
  };


  let deleteRow = async () => {
    setShowUnderProcess(1);

    const obj = {
      id: rowID,
      userId: userID
    };
    

    let data = await DeleteVehicleRenewal(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      GetVehicleRenewal();
      handleClear();
      setIsNewRowAdded(false)
      setTimeout(() => {
        setShowToster(0);


      }, 1000)
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage(data.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0);
      }, 2000)
    }
  };



  const edit = (tabledata, index) => {
    document.getElementById('errVehicleNumber').style.display = 'none';
    document.getElementById('errUpcomingDate').style.display = 'none';
    document.getElementById('errServiceType').style.display = 'none';

    setIsUpdateBtnShow(true);
    setSelectedServiceType({
      value: tabledata.serviceType,
      label: tabledata.serviceType1
    }); // Update the state with the correct value
    setVehicleNumber(tabledata.vehicleNumber); // Update the state with the correct value
    setUpcomingDate(tabledata.upcomingRenewalDate)
    setRowID(tabledata.id);
    setNewlyAddedRowIndex(index)
  };



  const handleUpdate = async () => {


    if (VehicleNumber.trim() === '') {
      document.getElementById('errVehicleNumber').innerHTML = 'Please Enter Vehicle Number';
      document.getElementById('errVehicleNumber').style.display = 'block';
      return; // Return early if the item name is empty
    }
    else if (VehicleNumber < 0){
      document.getElementById('errVehicleNumber').innerHTML = 'Vehicle Number must not be negative';
      document.getElementById('errVehicleNumber').style.display = 'block';
      return;
    }
    else if (SelectedServiceType === null) {
      document.getElementById('errServiceType').innerHTML = 'Please Choose Service Type';
      document.getElementById('errServiceType').style.display = 'block';
      return; // Return early if the item category is not selected
    }

    else if (UpcomingDate.trim() === '' || UpcomingDate === undefined) {
      document.getElementById('errUpcomingDate').innerHTML = 'Please Enter Upcoming Date';
      document.getElementById('errUpcomingDate').style.display = 'block';
      return;
    }

    const obj = {
      id: rowID,
      vehicleNumber: VehicleNumber,
      serviceType: SelectedServiceType.value,
      upcomingRenewalDate: UpcomingDate,
      userId: userID,
    };

    const data = await PutVehicleRenewal(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      GetVehicleRenewal();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
        handleClear();
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
    setIsUpdateBtnShow(false);
    setVehicleNumber('');
    setSelectedServiceType(null);
    setVehicleNumber('');
    setUpcomingDate('');
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
  };



  useEffect(() => {
    getDropdownData();
    GetVehicleRenewal();
  }, []);



  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Vehicle_Renewal")}</div>
                <div className="inner-content">
                  <div className='row'>
                  

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" >
                          <label htmlFor="Code" className="form-label">{t("VehicleNumber")}<span className="starMandatory">*</span></label>
                          <input id='ddlVehicleNumber' value={VehicleNumber} type="text"  className="form-control form-control-sm" name="VehicleNumber" placeholder={t("Vehicle_Number")} onChange={handleOnChange} />
                          <small id="errVehicleNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="ddlitemmaster" className="form-label">{t("ServiceType")}<span className="starMandatory">*</span></label>
                          <Select value={SelectedServiceType} placeholder={t("choose_service_type")} options={ServiceTypeList} className="me-2 create-select" id="serviceType" isSearchable={isSearchable} isClearable={isClearable} onChange={handleServiceOnChange} />
                          <small id="errServiceType" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>



                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="UpcomingDate" className="form-label">{t("Upcoming_Date")}</label>
                          <input id='ddUpcomingDate' value={UpcomingDate} type="datetime-local"  className="form-control form-control-sm" name="UpcomingDate" onChange={handleOnChange} />
                          <small id="errUpcomingDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>




                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 ms-2 me-2" onClick={handleOnSave}><img src={saveButtonIcon} alt='save' className='icnn' />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} alt='clear' className='icnn' />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-2" onClick={handleUpdate} >{t("Update")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1 " onClick={handleCancel}>{t("Cancel")}</button>
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
                  <thead style={{zIndex: '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}.</th>
                      <th>{t("VehicleNumber")}</th>
                      <th>{t("ServiceType")}</th>
                      <th>{t("Upcoming_Date")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VehicleRenewalTable &&
                      VehicleRenewalTable.map((data, index) => {
                        const isNewRow = newlyAddedRowIndex === index;
                        const isEditing = index === editRowIndex;


                        return (
                          <tr className={index === VehicleRenewalTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{data.vehicleNumber}</td>
                            <td>{data.serviceType1}</td>
                            <td>{data.upcomingRenewalDate}</td>
                            <td>
                              <div className="action-button">
                                <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data, index) }} /></div>
                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id, index) }} />
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

