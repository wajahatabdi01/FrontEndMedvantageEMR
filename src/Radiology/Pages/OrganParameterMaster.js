import React from 'react'
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import TableContainer from '../../Component/TableContainer';
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import { useState,useEffect } from 'react';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import Loder from '../../Component/Loader';
import SuccessToster from '../../Component/SuccessToster';
import AlertToster from '../../Component/AlertToster';
// import GetOrganMasterList from '../Api/OrganParameterMaster/GET/GetOrganMasterList';
import PostOrganParameterMaster from '../API/OrganParameterMaster/POST/PostOrganParameterMaster';
import GetOrganParameterMaster from '../API/OrganParameterMaster/GET/GetOrganParameterMaster';
import DeleteOrganParameterMaster from '../API/OrganParameterMaster/DELETE/DeleteOrganParameterMaster';
import PutOrganParameterMaster from '../API/OrganParameterMaster/UPDATE/PutOrganParameterMaster';
import GetUnitList from '../API/RadiologyNormalRange/GET/GetUnitList';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function OrganParameterMaster() {
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  let [isShowToaster, setisShowToaster] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showSuccessMsg, setShowSuccessMsg] = useState('');
  let [clearDropdown, setClearDropdown] = useState(0)
  let [updateBool, setUpdateBool] = useState(0);
  let [organMasterList, setOrganMasterList] = useState([]);
  let [organParameterMasterList, setOrganParameterMasterList] = useState([]);
  let [unitList, setUnitList] = useState([]);
  let [selectedOrgan, setSelectedOrgan] = useState('');
  let [selectedUnit, setSelectedUnit] = useState('');
  let [parameterName, setParameterName] = useState('');
  let [rowID, setRowId] = useState(0);
  let [editOrgan, setEditOrgan] = useState('');
  let [editUnit, setEditUnit] = useState('');
  const { t } = useTranslation();
  


  let handleChange = (e) => {
    // document.getElementById('errOrgan').style.display="none";
    document.getElementById('errUnit').style.display="none";
    document.getElementById('errpParameterName').style.display="none";
      const name = e.target.name;
      const value = e.target.value;
    //   if(name === "ddlOrgan"){
    //       setSelectedOrgan(value)
    //   }
      if(name === "ddlUnit"){
        setSelectedUnit(value)
      }
      if(name === "parameterName"){
        setParameterName(value);
       
      }
  } 
  let getOrganParametersList = async()=>{
    setShowLoder(1);
    const response = await GetOrganParameterMaster();
    if(response.status === 1){
        setOrganParameterMasterList(response.responseValue)
      setShowLoder(0);
    }
    else{
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }
  }

  let getUnitList=async()=>{
    const response = await GetUnitList();
    if(response.status===1){
      setUnitList(response.responseValue);
    }
  }
//   let getOrganMasterList = async()=>{
//     const response = await GetOrganMasterList();
//     console.log('response om',response)
//     if(response.status === 1){
//         setOrganMasterList(response.responseValue)Components
//     }
//   }
  
  let handlerSave = async () => {
    // if(selectedOrgan === '' || selectedOrgan === 0 || selectedOrgan === undefined || selectedOrgan === null){
    //   document.getElementById('errOrgan').innerHTML="Please Select Organ";
    //   document.getElementById('errOrgan').style.display="block";
    // }
    if(selectedUnit === '' || selectedUnit === 0 || selectedUnit === undefined || selectedUnit === null){
      document.getElementById('errUnit').innerHTML="Please Select Unit";
      document.getElementById('errUnit').style.display="block";
    }
    else if(parameterName === '' || parameterName.trim() === "" || parameterName === undefined || parameterName === null){
      document.getElementById('errpParameterName').innerHTML="Please Fill Parameter";
      document.getElementById('errpParameterName').style.display="block";
    }
    else{
       const obj ={
        unitId:selectedUnit,
        paramName:parameterName,
        userID:userID
       }
      
       setShowUnderProcess(1);
      const response = await PostOrganParameterMaster(obj);
     
     if (response.status === 1) {
         setShowUnderProcess(0);
         setTosterValue(0);
         setShowToster(1);
         setTosterMessage("Saved Successfully");
         setTimeout(() => {
             setShowToster(0);
             handleClear(1);
             getOrganParametersList();
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
    if(selectedUnit === '' || selectedUnit.trim() === "" || selectedUnit === undefined || selectedUnit === null){
        document.getElementById('errUnit').innerHTML="Please Fill Unit";
        document.getElementById('errUnit').style.display="block";
      }
    else if(parameterName === '' || parameterName.trim() === "" || parameterName === undefined || parameterName === null){
        document.getElementById('errpParameterName').innerHTML="Please Fill Parameter";
        document.getElementById('errpParameterName').style.display="block";
      }
    else{
       const obj ={
        unitId:selectedUnit,
        // unitname:selectedUnit,
        parameterName:parameterName,
        userID:userID,
        key:rowID
       }
      
       setShowUnderProcess(1);
      const response = await PutOrganParameterMaster(obj);
    
     if (response.status === 1) {
         setShowUnderProcess(0);
         setTosterValue(0);
         setShowToster(1);
         setTosterMessage("Updated Successfully");
         setTimeout(() => {
             setShowToster(0);
             handleClear(1);
             getOrganParametersList();
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
  let handleDelete = async()=>{
    setShowLoder(1);
    const response = await DeleteOrganParameterMaster(rowID);
    if(response.status === 1){
      setisShowToaster(1);
      setShowSuccessMsg('Organ Parameter Deleted Successfully..!!');
      
      setTimeout(() => {
          setisShowToaster(0);
          getOrganParametersList();
      }, 2000)
    }
    else{
        setShowLoder(0);
        setShowAlertToster(1);
        setShowErrMessage(response.responseValue);
    }
  }
  let handleClear = (value) => {
    setRowId(0);
    setUpdateBool(0);
    setClearDropdown(value);
    setParameterName('');
    // setSelectedOrgan('');
    // setEditOrgan('');
    // document.getElementById('errOrgan').style.display="none";
    setSelectedUnit('');
    setEditUnit('');
    document.getElementById('errUnit').style.display="none";
    document.getElementById('errpParameterName').style.display="none";
  }
  let handleEdit = (params) => {
    
    // setEditOrgan(params.organName);
    // setSelectedOrgan(params.unitId);
    setEditUnit(params.organName);
    setSelectedUnit(params.unitId);
    setParameterName(params.parameterName);
    setRowId(params.id);
    setUpdateBool(1);
  }
  useEffect(()=>{
    // getOrganMasterList();
    getUnitList();
    getOrganParametersList();
  },[]);
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Parameter_Master")} />
              <BoxContainer>
                {/* <div className="col-2 mb-2 me-2">
                  <label htmlFor="SampleId" className="form-label">Organ <span className="starMandatory">*</span></label>

                  {organMasterList && 
                   <DropdownWithSearch defaulNname="Select Organ" name="ddlOrgan" list={organMasterList} valueName="id" displayName="organName" editdata={editOrgan} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                  }
                  <small id="errOrgan" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div> */}
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="SampleId" className="form-label">{t("Unit")}<span className="starMandatory">*</span></label>

                  {unitList && 
                   <DropdownWithSearch defaulNname={t("Select_Unit")} name="ddlUnit" list={unitList} valueName="id" displayName="unitName" editdata={editUnit} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                  }
                  <small id="errUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                    <div className="mb-2 me-2">
                  <label htmlFor="TestName" className="form-label">{t("Parameter_Name")} <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" name="parameterName" id="parameterName" value={parameterName} onChange={handleChange} placeholder={t("Enter_ParameterName")} />
                  <small id="errpParameterName" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={()=>{handleClear(1)}}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
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
              </BoxContainer>
            </div>
            <div className="col-12 mt-2">
              <Heading text={t("All_Test_List")} />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Unit_Name")}</th>
                      <th>{t("Parameter_Name")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {organParameterMasterList && organParameterMasterList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.unitName}</td>
                          <td>{val.parameterName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => {handleEdit(val)}} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </TableContainer>
                {/* -----------------------Start Delete Modal Popup-------------------   */}

                {/*  <!-- Modal -->  */}
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
                        <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">{t("Delete")}</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

              </div>
            </div>
          </div>
        </div>
        {
                    showLoder === 1 ? <Loder val={showLoder} /> : ""
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
