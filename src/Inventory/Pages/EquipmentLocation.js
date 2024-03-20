import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loader from '../../Component/Loader';
import Select from 'react-select';
import GetEquipmentLocationDropdown from "../API/EquipmentLocation/GetEquipmentLocationDropdown";
import GetAllEquipmentName from "../API/EquipmentLocation/GetAllEquipmentName";
import InsertEquipmentLocation from "../API/EquipmentLocation/InsertEquipmentLocation";
import GetAllEquimentLocation from "../API/EquipmentLocation/GetAllEquimentLocation";
import DeleteEquipmentLocation from "../API/EquipmentLocation/DeleteEquipmentLocation";
import UpdaqteEquipmentLocation from "../API/EquipmentLocation/UpdaqteEquipmentLocation";
import GetUserAccessedBy from "../API/EquipmentLocation/GetUserAccessedBy"
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function EquipmentLocation() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [SelectedLocation, setSelectedLocation] = useState(null);
  const [serviceEngName, setserviceEngName] = useState("")
  const [serviceEngContact, setserviceEngContact] = useState("")
  let [equipmentloactionlist, setequipmentloactionlist] = useState([]);
  const [SelectedResponsiblePerson, setSelectedResponsiblePerson] = useState(null);
  let [responsiblePersonTable, setresponsiblePersonTable] = useState([]);
  let [EquipmentNameList, setEquipmentNameList] = useState([]);
  let [DataAllEquipment, setDataAllEquipment] = useState([]);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isSearchable , setisSearchable] = useState (true)
  const [isClearable , setisClearable] = useState (true)
  const [SelectedSerialNumber , setSelectedSerialNumber] = useState(null);
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  




  // The Code written is  By S Ayaz


  //Get API for select Equipment Location drop down menu


  useEffect(() => {
    let dropdownmenu = async () => {
      let dataGet = await GetEquipmentLocationDropdown();
      if (dataGet.status === 1) {
       
        setequipmentloactionlist(dataGet.responseValue.map(location=>({
          value : location.id,
          label : `${location.floorName} Floor ${location.buildingName} Building ${location.roomNumber}`
        })));
      }
      let NamedataGet = await GetAllEquipmentName();
      if (NamedataGet.status === 1) {
       
        setEquipmentNameList(NamedataGet.responseValue.map(SerialNumber=>({
          value: SerialNumber.id,
          label : SerialNumber.serialNumber,
        })));
      }
      let ResponsePerson = await GetUserAccessedBy()
      if(ResponsePerson.status === 1){
        setresponsiblePersonTable(ResponsePerson.responseValue.map(responsiblePerson =>({
          value : responsiblePerson.id,
          label : responsiblePerson.name
        })))
      }
    }
    dropdownmenu()
  }, [])

  let AllEquipmentLocation = async () => {
    let locationdata = await GetAllEquimentLocation();
    if (locationdata.status === 1) {
    
      setShowLoder(0);
      setDataAllEquipment(locationdata.responseValue);
    }
  }
  // POST API called for data saving
  const handleOnChange = (e) => {
     setNewlyAddedRowIndex(null);
      document.getElementById("errserviceEggname").style.display = "none";
      document.getElementById('errserviceEngContact').style.display = 'none';
     const { name, value } = e.target;
     if (name === 'ddlserviceEngName') {
      setserviceEngName(value)
    }
    else if (name === 'ddlserviceEngContact') {
      setserviceEngContact(value)
    }
  };
  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
};
  const handleOnSave = async () => {
    let ddlserviceEngName = document.getElementById("ddlserviceEngName").value;
    let ddlserviceEngContact = document.getElementById("ddlserviceEngContact").value;
   


     if (SelectedSerialNumber === null) {
      document.getElementById('errEquipmentName').innerHTML = 'Please Choose Serial Number';
      document.getElementById('errEquipmentName').style.display = 'block';
      return;
    }
    else if (SelectedLocation === null) {
      document.getElementById('errequipmentLocation').innerHTML = 'Please Choose Equipment Location';
      document.getElementById('errequipmentLocation').style.display = 'block';
      return;
    }
    else if (SelectedResponsiblePerson === null) {
      document.getElementById('errresponsiblePerson').innerHTML = 'Please Choose Responsible Person';
      document.getElementById('errresponsiblePerson').style.display = 'block';
      return;
    }
    else if (ddlserviceEngName.trim() === "" || ddlserviceEngName === null || ddlserviceEngName === undefined) {
      document.getElementById("errserviceEggname").innerHTML = "Please Enter Service Engineer Name";
      document.getElementById("errserviceEggname").style.display = "block";
      return;
    }
    else if (ddlserviceEngContact.length !== 10 || isNaN(ddlserviceEngContact)) {
      document.getElementById('errserviceEngContact').innerHTML = 'Please Enter Valid Contact No';
      document.getElementById('errserviceEngContact').style.display = 'block';
      return;
    }
    const obj = {
     
  locationID: SelectedLocation.value,
  equipmentID: SelectedSerialNumber.value,
  serviceEngineerName: serviceEngName,
  serviceEngineerContact: serviceEngContact,
  responsiblePersonID: SelectedResponsiblePerson.value,
  userID: userID
    };

    let data = await InsertEquipmentLocation(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      AllEquipmentLocation()
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
   
      document.getElementById('errEquipmentName').style.display = 'none';
       document.getElementById('errequipmentLocation').style.display = 'none';
       document.getElementById('errresponsiblePerson').style.display = 'none';
       document.getElementById("errserviceEggname").style.display = "none";
      document.getElementById('errserviceEngContact').style.display = 'none';
    document.getElementById("errserviceEggname").style.display = "none";
    document.getElementById('errserviceEngContact').style.display = 'none';
   
   
    setserviceEngContact("")
    setserviceEngName("")
    setSelectedSerialNumber(null)
    setSelectedLocation(null)
    setSelectedResponsiblePerson(null)
  };


  const edit = (locationdata,index) => {
  
    document.getElementById("errserviceEggname").style.display = "none";
    document.getElementById('errserviceEngContact').style.display = 'none';
   
    
    setRowID(locationdata.id)
    setIsUpdateBtnShow(true);
    setserviceEngContact(locationdata.serviceEngineerContact)
    setserviceEngName(locationdata.serviceEngineerName)
    setSelectedSerialNumber({
    value : locationdata.equipmentId,
    label : locationdata.serialNumber
    })
    setSelectedLocation({
      value : locationdata.locationId,
      label : `${locationdata.floorName} Floor ${locationdata.buildingName} Building ${locationdata.roomNumber}`
    });
    setSelectedResponsiblePerson({
      value : locationdata.responsiblePersonId,
      label : locationdata.responsiblePerson
      
    })
    setNewlyAddedRowIndex(index)

  }

  const handleUpdate = async () => {

    document.getElementById("errserviceEggname").style.display = "none";
    document.getElementById('errserviceEngContact').style.display = 'none';

    let ddlserviceEngName = document.getElementById("ddlserviceEngName").value;
    let ddlserviceEngContact = document.getElementById("ddlserviceEngContact").value;


    if (SelectedSerialNumber ===  null) {
      document.getElementById('errEquipmentName').innerHTML = 'Please Choose Serial Number';
      document.getElementById('errEquipmentName').style.display = 'block';
      return;
    }
    else if (SelectedLocation === null) {
      document.getElementById('errequipmentLocation').innerHTML = 'Please Choose Equipment Location';
      document.getElementById('errequipmentLocation').style.display = 'block';
      return;
    }
    else if (SelectedResponsiblePerson === null) {
      document.getElementById('errresponsiblePerson').innerHTML = 'Please Choose Responsible Person';
      document.getElementById('errresponsiblePerson').style.display = 'block';
      return;
    }
    else if (ddlserviceEngName.trim() === "" || ddlserviceEngName === null || ddlserviceEngName === undefined) {
      document.getElementById("errserviceEggname").innerHTML = "Please Enter Service Engineer Name";
      document.getElementById("errserviceEggname").style.display = "block";
      return;
    }
    else if (ddlserviceEngContact.length !== 10 || isNaN(ddlserviceEngContact)) {
      document.getElementById('errserviceEngContact').innerHTML = 'Please Enter Valid Contact No';
      document.getElementById('errserviceEngContact').style.display = 'block';
      return;
    }

   

    const obj = {
      id: rowID,
      locationID: SelectedLocation.value,
      equipmentID: SelectedSerialNumber.value,
      serviceEngineerName: serviceEngName,
      serviceEngineerContact: serviceEngContact,
      responsiblePersonID: SelectedResponsiblePerson.value,
      userID: userID
    };

    const data = await UpdaqteEquipmentLocation(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      AllEquipmentLocation()
      handleClear();
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
    handleClear()
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async () => {
    setShowUnderProcess(1);
    let userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
    const obj = {
      id: rowID,
      userId: userID
    }

    let data = await DeleteEquipmentLocation(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      AllEquipmentLocation();
  
      setTimeout(() => {
        setShowToster(0);
        handleClear();
        
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
    AllEquipmentLocation();
  }, []);
  
  ;
  

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Equipment_Location")}</div>
                <div className="inner-content">
                  <div className='row'>
                 


                           <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" >
                           <label htmlFor="ddlitemmaster" className="form-label ">{t("SerialNumber")}<span className="starMandatory">*</span></label>
                           <Select value={SelectedSerialNumber} options={EquipmentNameList} className="create-select"  placeholder = {t("Select_Serial_Number")} classNamePrefix="mySelect" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption=> handleSelectChange(selectedOption, "errEquipmentName", setSelectedSerialNumber)} />
                           <small id="errEquipmentName" className="form-text text-danger" style={{ display: 'none' }}></small> 
                           </div>


                           <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" >
                           <label htmlFor="ddlitemmaster" className="form-label">{t("Location")}<span className="starMandatory">*</span></label>
                           <Select  value={SelectedLocation} className = " create-select" options={equipmentloactionlist} placeholder ={t("Select_Location")} id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption=> handleSelectChange(selectedOption, "errequipmentLocation", setSelectedLocation)} />
                           <small id="errequipmentLocation" className="form-text text-danger" style={{ display: 'none' }}></small> 
                           </div>

                            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" >
                           <label htmlFor="ddlitemmaster" className="form-label">{t("Responsible_Person")}<span className="starMandatory">*</span></label>
                           <Select value={SelectedResponsiblePerson} options={responsiblePersonTable} className="create-select"  placeholder ={t("Select_Responsible_Person")} id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption=> handleSelectChange(selectedOption, "errresponsiblePerson", setSelectedResponsiblePerson)} />
                           <small id="errresponsiblePerson" className="form-text text-danger" style={{ display: 'none' }}></small> 
                           </div>



                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Service_EngineerName")}<span className="starMandatory">*</span></label>
                          <input value={serviceEngName} id="ddlserviceEngName" type="text" className="form-control form-control-sm" name="ddlserviceEngName" placeholder={t("Enter_Service_Engineer_Name(eg_Rahul)")} onChange={handleOnChange} />
                          <small id="errserviceEggname" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Service_Engineer_Contact_No")}.<span className="starMandatory">*</span></label>
                          <input value={serviceEngContact} id="ddlserviceEngContact" type="text" className="form-control form-control-sm" name="ddlserviceEngContact" placeholder={t("Service_Engineer_Contact")}  onChange={handleOnChange} />
                          <small id="errserviceEngContact" className="form-text text-danger" style={{ display: 'none' }}></small>
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


            {/* table is made using getAllItemMaster API and mapped the data   */}


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{zIndex: '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("SerialNumber")}</th>
                      <th>{t("Equipment_Location")}</th>
                      <th>{t("Responsible_Person")}</th>
                      <th>{t("Service_Engineering_Name")}</th>
                      <th>{t("Service_Engineering_Contact_No")}.</th>
                    
                       <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataAllEquipment && DataAllEquipment.map((data, index) => {
                       const isNewRow = newlyAddedRowIndex === index;
                       const isEditing = index === editRowIndex;
                      return(
                      <tr className={isNewRow ? 'new-row' : '' } key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.serialNumber}</td>
                        <td>{`${data.floorName} Floor ${data.buildingName} Building ${data.roomNumber}`}</td>
                        <td>{data.responsiblePerson}</td>
                        <td>{data.serviceEngineerName}</td>
                        <td>{data.serviceEngineerContact}</td>
                  
                      
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

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCancel}>{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deleteRow}>{t("Delete")}</button>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loader val={showLoder} /> : ""
        }
      </section>

    </>

  )
}


