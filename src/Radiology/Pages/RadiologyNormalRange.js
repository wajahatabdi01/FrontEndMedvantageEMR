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
import GetOrganMasterList from '../API/OrganMaster/GET/GetOrganMasterList';
import PostOrganMaster from '../API/OrganMaster/POST/PostOrganMaster';
import UpdateOrganMaster from '../API/OrganMaster/UPDATE/UpdateOrganMaster';
import DeleteOrganMaster from '../API/OrganMaster/Delete/DeleteOrganMaster';
import GetOrganList from '../API/OrganMaster/GET/GetOrganList';
import GetOrganParameterMaster from '../API/OrganParameterMaster/GET/GetOrganParameterMaster';
import GetUnitList from '../API/RadiologyNormalRange/GET/GetUnitList';
import PostRadiologyNormalRange from '../API/RadiologyNormalRange/POST/PostRadiologyNormalRange';
import GetModalityList from '../API/RadiologyNormalRange/GET/GetModalityList';
import GetRadiologyNormalRange from '../API/RadiologyNormalRange/GET/GetRadiologyNormalRange';
import DeleteRadiologyNormalRange from '../API/RadiologyNormalRange/DELETE/DeleteRadiologyNormalRange';
import UpdateRadiologyNormalRange from '../API/RadiologyNormalRange/UPDATE/UpdateRadiologyNormalRange';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function RadiologyNormalRange() {
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
  let [radiologyNormalRangeList,setRadiologyNormalRangeList]=useState([]);
  let [organList, setOrganList] = useState([]);
  let [parameterList, setParameterList] = useState([]);
  let [modularityList, setModularityList] = useState([]);
  let [organMasterList, setOrganMasterList] = useState([]);
  let [unitList, setUnitList] = useState([]);
  let [selectedOrgan, setSelectedOrgan] = useState('');
  let [selectedParameter, setSelectedParameter] = useState('');
  let [selectedModularity, setSelectedModularity] = useState('');
  let [selectedGender, setSelectedGender] = useState('');
  let [selectedAgeUnit, setSelectedAgeUnit] = useState('');
  let [selectedRangeUnit, setSelectedRangeUnit] = useState('');
  let [minimumAge, setMinimumAge] = useState('');
  let [maximumAge, setMaximumAge] = useState('');
  let [minimumRange, setMinimumRange] = useState('');
  let [maximumRange, setMaximumRange] = useState('');
  let [rowID, setRowId] = useState(0);
  let [editOrgan, setEditOrgan] = useState('');
  let [editParameter, setEditParameter] = useState('');
  let [editModularity, setEditModularity] = useState('');
  let [editUnit, setEditUnit] = useState('');
  let [editInstruction, setEditInstruction] = useState('');
  const { t } = useTranslation();
  


  let handleChange = (e) => {
    document.getElementById('errOrgan').style.display="none";
    document.getElementById('errParameter').style.display="none";
    document.getElementById('errModularity').style.display="none";
    document.getElementById('errGender').style.display="none";
    document.getElementById('errAgeUnit').style.display="none";
    document.getElementById('errUnit').style.display="none";
      const name = e.target.name;
      const value = e.target.value;
      if(name === "ddlOrgan"){
          setSelectedOrgan(value)
          setEditOrgan(e.target.selectedName)
      }
      if(name === "ddlParameter"){
        setSelectedParameter(value)
        setEditParameter(e.target.selectedName);
      }
      if(name === "ddlModularity"){
        setSelectedModularity(value)
        setEditModularity(e.target.selectedName);
      }
      if(name === "gender"){
        setSelectedGender(value)
        
      }
      if(name === "minimumAge"){
        setMinimumAge(value);
       
      }
      if(name === "maximumAge"){
        setMaximumAge(value);
       
      }
      if(name === "ageUnit"){
        setSelectedAgeUnit(value);
       
      }
      if(name === "minimumRange"){
        setMinimumRange(value);
       
      }
      if(name === "maximumRange"){
        setMaximumRange(value);
       
      }
      if(name === "ddlUnit"){
        setSelectedRangeUnit(value);
       
      }
      
  } 

  let getRadiologyNormalRangeList=async()=>{
    const response =await GetRadiologyNormalRange();
    if(response.status === 1){
      setRadiologyNormalRangeList(response.responseValue);
    }
  }

  let getOrganList = async()=>{
    const response = await GetOrganList();
    if(response.status === 1){
      setOrganList(response.responseValue)
    }
  }
  let getParameterList=async()=>{
    const response= await GetOrganParameterMaster();
    if(response.status==1){
        setParameterList(response.responseValue);
    }

  }
  let getUnitList=async()=>{
    const response= await GetUnitList();
    if(response.status==1){
        setUnitList(response.responseValue);
    }

  }
  let getOrganMasterList = async()=>{
    const response = await GetOrganMasterList();
    if(response.status === 1){
      setOrganMasterList(response.responseValue)
      setShowLoder(0);
    }
    else{
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }
  }
  let getModularityList = async()=>{
    const response = await GetModalityList();
    if(response.status === 1){
      setModularityList(response.responseValue)
      setShowLoder(0);
    }
    else{
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }
  }
  let handlerSave = async () => {
   
    if(selectedOrgan === '' || selectedOrgan === 0 || selectedOrgan === undefined || selectedOrgan === null){
      document.getElementById('errOrgan').innerHTML="Please Select Organ";
      document.getElementById('errOrgan').style.display="block";
    }
   else if(selectedParameter === '' || selectedParameter === 0 || selectedParameter === undefined || selectedParameter === null){
      document.getElementById('errParameter').innerHTML="Please Select Parameter";
      document.getElementById('errParameter').style.display="block";
    }
   else if(selectedModularity === '' || selectedModularity === 0 || selectedModularity === undefined || selectedModularity === null){
      document.getElementById('errModularity').innerHTML="Please Select Modularity";
      document.getElementById('errModularity').style.display="block";
    }
    else if(selectedGender === '' || selectedGender === 0 || selectedGender === undefined || selectedGender === null){
      document.getElementById('errGender').innerHTML="Please Select Gender";
      document.getElementById('errGender').style.display="block";
    }
    else if(selectedAgeUnit === '' || selectedAgeUnit === 0 || selectedAgeUnit === undefined || selectedAgeUnit === null){
      document.getElementById('errAgeUnit').innerHTML="Please Select Age Unit";
      document.getElementById('errAgeUnit').style.display="block";
    }
    else if(selectedRangeUnit === '' || selectedRangeUnit === 0 || selectedRangeUnit === undefined || selectedRangeUnit === null){
      document.getElementById('errUnit').innerHTML="Please Select Range Unit";
      document.getElementById('errUnit').style.display="block";
    }
    else{
       const obj ={
        organID:selectedOrgan,
        paramID:selectedParameter,
        modularityID:selectedModularity,
        gender:selectedGender,
        minAge:minimumAge,
        maxAge:maximumAge,
        ageUnit:selectedAgeUnit,
        minRange:minimumRange,
        maxRange:maximumRange,
        rangeUnit:selectedRangeUnit,
        userID:userID
       }
       setShowUnderProcess(1);
      const response = await PostRadiologyNormalRange(obj);
     if (response.status === 1) {
         setShowUnderProcess(0);
         setTosterValue(0);
         setShowToster(1);
         setTosterMessage("Saved Successfully");
         setTimeout(() => {
             setShowToster(0);
             handleClear(1);
             getRadiologyNormalRangeList();
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
    if(selectedOrgan === '' || selectedOrgan === 0 || selectedOrgan === undefined || selectedOrgan === null){
      document.getElementById('errOrgan').innerHTML="Please Select Organ";
      document.getElementById('errOrgan').style.display="block";
    }
    else{
       const obj ={
        organID:selectedOrgan,
        regionName:selectedOrgan,
        paramID:selectedParameter,
        parameterName:selectedParameter,
        modularityID:selectedModularity,
        modalityName:selectedModularity,
        gender:selectedGender,
        minAge:minimumAge,
        maxAge:maximumAge,
        ageUnit:selectedAgeUnit,
        minRange:minimumRange,
        maxRange:maximumRange,
        rangeUnit:selectedRangeUnit,
        unitName:selectedRangeUnit,
        userID:userID,
        key:rowID
       }
       setShowUnderProcess(1);
      const response = await UpdateRadiologyNormalRange(obj);
     if (response.status === 1) {
         setShowUnderProcess(0);
         setTosterValue(0);
         setShowToster(1);
         setTosterMessage("Updated Successfully");
         setTimeout(() => {
             setShowToster(0);
             handleClear(1);
             getRadiologyNormalRangeList();
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
    const response = await DeleteRadiologyNormalRange(rowID);
    setShowLoder(0);
    if(response.status === 1){
      setisShowToaster(1);
      setShowSuccessMsg('Normal Range Deleted Successfully..!!');
      getRadiologyNormalRangeList();
      setTimeout(() => {
          setisShowToaster(0);
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
    setRowId('');
    setSelectedOrgan('');
    setMaximumRange('');
    setMinimumRange('');
    setMaximumAge('');
    setMinimumAge('');
    setSelectedRangeUnit('');
    setSelectedAgeUnit('');
    // setSelectedGender('');
    setSelectedModularity('');
    setSelectedParameter('');
    setEditOrgan('');
    setEditParameter('');
    setEditModularity('');
    setEditUnit('');
    document.getElementById('errOrgan').style.display="none";
    document.getElementById('errParameter').style.display="none";
    document.getElementById('errModularity').style.display="none";
    document.getElementById('errGender').style.display="none";
    document.getElementById('errAgeUnit').style.display="none";
    document.getElementById('errUnit').style.display="none";
    // document.getElementById('ddlGender').value="";
    // document.getElementById('ddlAgeUnit').value='';

  }
  let handleEdit = (params) => {
    setEditOrgan(params.organName);
    setSelectedOrgan(params.organID);
    setEditParameter(params.parameterName);
    setSelectedParameter(params.paramID);
    setEditModularity(params.modalityName);
    setSelectedModularity(params.modularityID);
    setMinimumAge(params.ageMin);
    setMaximumAge(params.ageMax);
    setMinimumRange(params.rangeMin);
    setMaximumRange(params.rangeMax);
    setEditUnit(params.unitName);
    setSelectedRangeUnit(params.rangeUnit);
    setRowId(params.id);
    setUpdateBool(1);
    document.getElementById('ddlGender').value=params.gender;
    document.getElementById('ddlAgeUnit').value=params.ageUnitID;
  }
  useEffect(()=>{
    getOrganMasterList();
    getOrganList();
    getParameterList();
    getUnitList();
    getModularityList();
    getRadiologyNormalRangeList();
  },[]);
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Radiology_Normal_Range_Master")} />
              <BoxContainer>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="SampleId" className="form-label">{t("Organ")} <span className="starMandatory">*</span></label>

                  {organList && 
                   <DropdownWithSearch defaulNname={t("Select_Organ")} name="ddlOrgan" list={organList} valueName="id" displayName="regionName" editdata={editOrgan} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                  }
                  <small id="errOrgan" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="SampleId" className="form-label">{t("Parameter")}<span className="starMandatory">*</span></label>

                {parameterList && 
                 <DropdownWithSearch defaulNname={t("Select_Parameter")} name="ddlParameter" list={parameterList} valueName="id" displayName="parameterName" editdata={editParameter} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errParameter" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="modularity" className="form-label">{t("Modularity")} <span className="starMandatory">*</span></label>
                {parameterList && 
                 <DropdownWithSearch defaulNname={t("Select_Modularity")} name="ddlModularity" list={modularityList} valueName="id" displayName="modalityName" editdata={editModularity} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errModularity" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
              <div className="col-1 mb-2 me-2">
                  <label htmlFor="ddlGender" className="form-label">{t("Gender")}<span className="starMandatory">*</span></label>
                  <select className="form-select form-select-sm" name="gender" id="ddlGender" onChange={handleChange}>
                    <option value="0">{t("Select_Gender")}</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                    <option value="C">C</option>
                  </select>
                  <small id="errGender" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="minimumAge" className="form-label">{t("MinAge")}<span className="starMandatory">*</span></label>
                  <input type="number" className="form-control form-control-sm" name="minimumAge" id="minimumAge" value={minimumAge} onChange={handleChange} placeholder={t("Min_Age")} />
                  <small id="errMinimumAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="minimumAge" className="form-label">{t("MaxAge")}<span className="starMandatory">*</span></label>
                  <input type="number" className="form-control form-control-sm" name="maximumAge" id="maximumAge" value={maximumAge} onChange={handleChange} placeholder={t("Max_Age")} />
                  <small id="errMaximumAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-1 mb-2 me-2">
                  <label htmlFor="ddlAgeUnit" className="form-label">{t("Age_Unit")}<span className="starMandatory">*</span></label>
                  <select className="form-select form-select-sm" name="ageUnit" id="ddlAgeUnit" aria-label=".form-select-sm example"  onChange={handleChange}>
                    <option value="0">{t("Select_Age")}</option>
                    <option value="1">{t("Year")}</option>
                    <option value="2">{t("MONTH")}</option>
                    <option value="3">{t("Day")}</option>
                  </select>
                  <small id="errAgeUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="minimumAge" className="form-label">{t("MinRange")}<span className="starMandatory">*</span></label>
                  <input type="number" className="form-control form-control-sm" name="minimumRange" id="minimumRange" value={minimumRange} onChange={handleChange} placeholder={t("Minimum_Range")} />
                  <small id="errMinimumRange" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="minimumAge" className="form-label">{t("MaxRange")}<span className="starMandatory">*</span></label>
                  <input type="number" className="form-control form-control-sm" name="maximumRange" id="maximumRange" value={maximumRange} onChange={handleChange} placeholder={t("Maximum_Range")} />
                  <small id="errMaximumRange" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="modularity" className="form-label">{t("Range_Unit")}<span className="starMandatory">*</span></label>
                {unitList && 
                 <DropdownWithSearch defaulNname={t("Select_Range_Unit")} name="ddlUnit" list={unitList} valueName="id" displayName="unitName" editdata={editUnit} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                      <th>{t("Organ_Name")}</th>
                      <th>{t("Parameter_Name")}</th>
                      <th>{t("Modularity_Name")}</th>
                      <th>{t("Gender")}</th>
                      <th>{t("MinAge")}</th>
                      <th>{t("MaxAge")}</th>
                      <th>{t("Age_Unit")}</th>
                      <th>{t("MinRange")}</th>
                      <th>{t("MaxRange")}</th>
                      <th>{t("Range_Unit")}</th>
                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {radiologyNormalRangeList && radiologyNormalRangeList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.organName}</td>
                          <td>{val.parameterName}</td>
                          <td>{val.modalityName}</td>
                          <td>{val.gender}</td>
                          <td>{val.ageMin}</td>
                          <td>{val.ageMax}</td>
                          <td>{val.ageType}</td>
                          <td>{val.rangeMin}</td>
                          <td>{val.rangeMax}</td>
                          <td>{val.unitName}</td>
                          <td></td>
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
