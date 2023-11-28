import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import GetEnvironmentParameter from "../API/LocationEnvironment/GetEnvironmentParameter";
import PostLocationEnvironment from "../API/LocationEnvironment/PostLocationEnvironment";
import GetLocationEnvironment from "../API/LocationEnvironment/GetLocationEnvironment";
import DeleteLocationEnvironment from "../API/LocationEnvironment/DeleteLocationEnvironment";
import Select from 'react-select';
import PutLocationEnvironment from "../API/LocationEnvironment/PutLocationEnvironment";

import GetLocationDropdown from "../API/LocationEnvironment/GetLocationDropdown";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function LocationEnvironment() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [LocationEnvironmentTable, setLocationEnvironmentTable] = useState([])
  const [LocationName, setLocationName] = useState(null)
  const [EnvironmentParameterName, setEnvironmentParameterName] = useState(null)
  const [ParameterValue, setParameterValue] = useState('')
  const [LocationDropdown, setLocationDropdown] = useState([])
  const [ENVIRONMENTPARAMETER, setENVIRONMENTPARAMETER] = useState([])
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null); 
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
 
  // The Code is  written By S Ayaz

  let Dropdowns = async()=>{
    
        let Location = await GetLocationDropdown();
        if (Location.status === 1) {
          setShowLoder(0);
          setLocationDropdown(Location.responseValue.map(location=>({
            value : location.id,
            label: `${location.floorName} Floor ${location.buildingName} Building ${location.roomNumber}`
          
          })));
          // console.log("Location",Location.responseValue)
        }
        let environmentparameter = await GetEnvironmentParameter();
        if (environmentparameter.status === 1) {
          setShowLoder(0);
          setENVIRONMENTPARAMETER(environmentparameter.responseValue.map(Parameter=>({
            value : Parameter.id,
            label : Parameter.parameterName,
          })));
          // console.log("EnvironmentPara",environmentparameter.responseValue)
        }
      
  }

  let GetAllLocationEnvironment = async () => {
    let data = await GetLocationEnvironment();
    if (data.status === 1) {
        setLocationEnvironmentTable(data.responseValue);
      // console.log("GetAllLocationEnvironment", data.responseValue)
    }
  }

  const handleOnChange = (e) => {
    
    setisNewRowAdded(false)
    document.getElementById('errLocationName').style.display = 'none';
    document.getElementById('errEnvironmentParameter').style.display = 'none';
    document.getElementById('errparametervalue').style.display = 'none';
    const { name, value } = e.target;

    if (name === 'parametervalue') {
      setParameterValue(value);
    }
  };


  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };


  const handleOnSave = async () => {
   

    if (LocationName === null) {
      document.getElementById('errLocationName').innerHTML = 'Please Choose Location Name';
      document.getElementById('errLocationName').style.display = 'block';
      return;
    }
    if (EnvironmentParameterName === null) {
      document.getElementById('errEnvironmentParameter').innerHTML = 'Please Choose Environment Name';
      document.getElementById('errEnvironmentParameter').style.display = 'block';
      return;
    }
    if (ParameterValue === undefined || ParameterValue === null || ParameterValue.toString().trim() === '') {
      document.getElementById('errparametervalue').innerHTML = 'Please Enter Parameter Value';
      document.getElementById('errparametervalue').style.display = 'block';
      return;
    } 
     else if (ParameterValue < 0) {
      document.getElementById('errparametervalue').innerHTML = 'Parameter Value should not be negative';
      document.getElementById('errparametervalue').style.display = 'block';
      return;
    }

    
    // Proceed with your update logic here
    
    const obj = {
        locationID: LocationName.value,
        environmentParameterID: EnvironmentParameterName.value,
        parameterValue: ParameterValue,
        userId: userID
    };

    let data = await PostLocationEnvironment(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      GetAllLocationEnvironment()
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
    //  console.log('clear')
    document.getElementById('errLocationName').style.display = 'none';
    document.getElementById('errEnvironmentParameter').style.display = 'none';
    document.getElementById('errparametervalue').style.display = 'none';
  
    setLocationName(null)
    setEnvironmentParameterName(null)
    setParameterValue('')
  };
  const edit = (data,index) => {
    document.getElementById('errLocationName').style.display = 'none';
    document.getElementById('errEnvironmentParameter').style.display = 'none';
    document.getElementById('errparametervalue').style.display = 'none';
    setRowID(data.id)
    setIsUpdateBtnShow(true);
    setLocationName({
      value : data.locationID,
      label : `${data.floorName} Floor ${data.buildingName} Building ${data.roomNumber}`
    })
    setEnvironmentParameterName({
      value : data.environmentParameterID,
      label : data.parameterName
    })
    setParameterValue(data.parameterValue)
    setNewlyAddedRowIndex(index)
   
  }

  const handleUpdate = async () => {
   

    if (LocationName === null) {
      document.getElementById('errLocationName').innerHTML = 'Please Choose Location Name';
      document.getElementById('errLocationName').style.display = 'block';
      return;
    }
    else if (EnvironmentParameterName === null) {
      document.getElementById('errEnvironmentParameter').innerHTML = 'Please Choose Environment Name';
      document.getElementById('errEnvironmentParameter').style.display = 'block';
      return;
    }
    else if (ParameterValue === undefined || ParameterValue === null || ParameterValue.toString().trim().trim() === '') {
      document.getElementById('errparametervalue').innerHTML = 'Please Enter Parameter Value';
      document.getElementById('errparametervalue').style.display = 'block';
      return;
    }
    else if (ParameterValue < 0) {
      document.getElementById('errparametervalue').innerHTML = 'Parameter Value should not be negative';
      document.getElementById('errparametervalue').style.display = 'block';
      return;
    }


    const obj = {
        id: rowID,
        locationID: LocationName.value,
        environmentParameterID: EnvironmentParameterName.value,
        parameterValue: ParameterValue,
        userId: userID
    };
        const data = await PutLocationEnvironment(obj);
        if (data.status === 1) {
          setShowUnderProcess(0);
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Data Updated Successfully!');
          GetAllLocationEnvironment()
          handleClear()
          
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
  }

  const deleteRow = async () => {
    setShowUnderProcess(1);
    let userID = window.userID
     const obj = {
      id: rowID,
      userId: userID
    }
    let data = await DeleteLocationEnvironment(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      GetAllLocationEnvironment()
      handleClear()
      setisNewRowAdded(false);
     
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
    GetAllLocationEnvironment()
  }, []);


  return (
    <>

<section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Location_Environment")}</div>
                <div className="inner-content">
                  <div className='row'>
                
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Location")}<span className="starMandatory">*</span></label>
                      <Select value={LocationName} options={LocationDropdown} className=" create-select" id="serviceType" placeholder={t("Choose_Location")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errLocationName", setLocationName)} />
                      <small id="errLocationName" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    
                  <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Environment_Parameter_Name")}<span className="starMandatory">*</span></label>
                      <Select value={EnvironmentParameterName} options={ENVIRONMENTPARAMETER} className=" create-select" id="serviceType" placeholder={t("Choose_Environment_Parameter_Name")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errEnvironmentParameter", setEnvironmentParameterName)} />
                      <small id="errEnvironmentParameter" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("ParameterValue")}<span className="starMandatory">*</span></label>
                          <input value={ParameterValue} id="ddParameterValue" type="number" className="form-control form-control-sm" name="parametervalue" placeholder={t("Parameter_Value")} onChange={handleOnChange} />
                          <small id="errparametervalue" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                  <thead style={{zIndex: '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Location")}</th>
                      <th>{t("Environment_Parameter_Name")}</th>
                      <th>{t("ParameterValue")}</th>
                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LocationEnvironmentTable && LocationEnvironmentTable.map((data, index) => {
                       const isNewRow = newlyAddedRowIndex === index;
                       const isEditing = index === editRowIndex;
                       return (
                      <tr className={index === LocationEnvironmentTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row': ''}  key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{`${data.floorName} Floor ${data.buildingName} Building ${data.roomNumber}`}</td>
                        <td>{data.parameterName}</td>         
                        <td>{data.parameterValue}</td>
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


