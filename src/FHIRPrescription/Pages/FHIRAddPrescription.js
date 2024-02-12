import React, { useEffect, useState } from 'react';

import plus from '../../assets/images/icons/icons8-plus-30.png'
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import GetBrandList from '../../Clinical/API/KnowMedsAPI/GetBrandList';
import GetUserListByRoleId from '../../Registartion/API/GET/GetUserListByRoleId';
import FHIRGetAllForm from '../API/GET/FHIRGetAllForm';
import GetAllRoute from '../API/GET/GetAllRoute';
import GetAllInterval from '../API/GET/GetAllInterval';
import FHIRPostAddPrescreption from '../API/POST/FHIRPostAddPrescreption';
import clear from '../../assets/images/icons/clear.svg'


export default function FHIRAddPrescription(props) {

  const [brandList, setBrandList] = useState([]);
  const [clearDropdown, setClearDropdown] = useState(0)
  const [editName, setEditName] = useState("");
  const [providerList, setProviderList] = useState([]);
  const [getFormList, setFormList] = useState([]);
  const [getIntervalList, setIntervalList] = useState([]);
  const [getRouteList, setRouteList] = useState([]);
  const [sendForm, setSendForm] = useState({ "userId": window.userId, "clientId": window.clientId,
      currentlyActive: 1,
      ePrescription:false,
      checkedDrug:false,
      ControlledSubstance: false,
      startingdate:'',
      providerName:0,
      exampleRadios:0,
      QuantityName:'',
      medicineStrength:'',
      medicineUnit:0,
      RefillsUnit:0,
      oftabletsName:'',
      DirectionsName:'',
      formName:0,
      routeName:0,
      FrequencyName:0,
      Notes:'',
      addToList:0,
      ReasonName:0
    })

  //const [editBrand, setEditBrand] = useState("")

  // const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  // const userId=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const userId=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  //const activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid

  const getAllBrandList = async () => 
  {
    const response = await GetBrandList();
    if (response.status === 1) {
        const slicedProblemList =response.responseValue.slice(0,100);
        setBrandList(slicedProblemList);
    }
  }

  const getProviderList = async () => {
    const dataToProvider = {
      roleId : 2,
      clientID : clientID
    }
    const providerRes = await GetUserListByRoleId(dataToProvider);
    setProviderList(providerRes.responseValue);
  }

  const getAllFromList = async () => 
  {
    const formRes = await FHIRGetAllForm();
    setFormList(formRes.responseValue);
  }

  const getAllRouteList = async () => {
    const routeRes = await GetAllRoute();
    if(routeRes.status === 1){
      setRouteList(routeRes.responseValue);
    }
  }

  const getAllIntervalList = async () => {
    const intervalRes = await GetAllInterval();
    if(intervalRes.status === 1){
      setIntervalList(intervalRes.responseValue);
    }
  }

  const handleChangeText = (e) => {
    const { name, value, type, checked } = e.target;
    console.log('namee : ', name)
    // If the input is a checkbox, handle it differently
    if (type === 'checkbox') {
        // If the checkbox is checked, set the value to 1, otherwise set it to 0
        const currentlyActive = checked ? 1 : 0;

        setSendForm((prevState) => ({
            ...prevState,
            [name]: currentlyActive
        }));
    } else {
        setSendForm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }
    document.getElementById('errDate').style.display = 'none';
    

    
}


  //Handle Change
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditName("")
    //setEditBrand("")
    setSendForm(sendForm => ({
        ...sendForm,
        [name]: value
    }))
    document.getElementById('errDrug').style.display = 'none';
}

////////////// to clear data in medicine search//////////////////
let handleClearMedicineSearch = (value) => {
  setClearDropdown(value)
  setEditName("")
  //setEditBrand("")
  setSendForm({ "userId": window.userId })
  // document.getElementById("wardID").value = 0;
  // document.getElementById("departmentID").value = 0;
  //setUpdateBool(0)
}

//////////////////////////////// Final Save /////////////////////////
const handleSave = async () =>{
  if(sendForm.startingdate=== ""){
    document.getElementById('errDate').innerHTML = "Please select date."
    document.getElementById('errDate').style.display = "block"
  }
  else if(!sendForm.brandList){
    document.getElementById('errDrug').innerHTML = "Please select drug."
    document.getElementById('errDrug').style.display = "block"
  }
  else{

    const finalObj = {
      uhid: 'UHID00143',
      currentlyActive : sendForm.currentlyActive,
      startingDate : sendForm.startingdate,
      providerId : sendForm.providerName,
      drugId : sendForm.exampleRadios,
      quantity: sendForm.QuantityName,
      size : sendForm.medicineStrength,
      unit : sendForm.medicineUnit,
      refills : sendForm.RefillsUnit,
      perRefill : sendForm.oftabletsName,
      dosage : sendForm.DirectionsName,
      form : sendForm.formName.split(':')[0],
      route : sendForm.routeName,
      interval : sendForm.FrequencyName,
      note : sendForm.Notes,
      medication : sendForm.addToList,
      substitute : sendForm.ReasonName,
      drug : sendForm.brandList + ' ' + sendForm.medicineStrength + ' ' + sendForm.medicineUnit + ' ' + sendForm.routeName + ' ' + sendForm.formName.split(':')[1],
      userId : userId,
      rxnormDrugCode : '1432537',
      clientId : clientID
    }
    console.log('final obj : ', finalObj)
    return;
    const finalSave = await FHIRPostAddPrescreption(finalObj);
    if(finalSave.status === 1)
    {
      handleClear();
    }
  }
}

const handleClear = () =>{
  
  //document.getElementById('currentlyActiveID').value = 1;
  setSendForm({"userId": window.userId, "clientId": window.clientId,
  currentlyActive: 1,
  ePrescription:false,
  checkedDrug:false,
  ControlledSubstance: false,
  startingdate:'',
  providerName:0,
  exampleRadios:0,
  QuantityName:'',
  medicineStrength:'',
  medicineUnit:0,
  RefillsUnit:0,
  oftabletsName:'',
  DirectionsName:'',
  formName:0,
  routeName:0,
  FrequencyName:0,
  Notes:'',
  addToList:0,
  ReasonName:0})

  
  
}


useEffect(() =>{
  getAllBrandList();
  getProviderList();
  getAllFromList();
  getAllRouteList();
  getAllIntervalList();
}, [])

  return (
    
      <>
      <div className='container-fluid'>
        <div className="row">
          <div className='col-12'>
             <div className='med-box'>
                <div className='inner-content'>
                  <div className="row">
                    <div className='fieldsett-in col-md-12'>
                      <div className='fieldsett'>
                        <div className='fieldse'>
                        <span className='fieldse'>Prescription</span>
                        <div className="row">
                          <div className=" col-12 row ms-1">
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Currently Active</label>
                              <input className="form-check-input" type="checkbox" id="currentlyActiveID" checked={sendForm.currentlyActive === 1 ? true:false} role='switch' name="currentlyActive" value={sendForm.currentlyActive} onChange={handleChangeText}/> 
                            </div>
                            {/* <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="E-Prescription?" className="form-label">E-Prescription?</label>
                              <input className="form-check-input" type="checkbox" id="ePrescription" name="ePrescription" /> 
                            </div>
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Checked Drug Formulary?</label>
                              <input className="form-check-input" type="checkbox" id="checkedDrug" name="checkedDrug" /> 
                            </div>
                            <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2 form-check'>
                              <label htmlFor="Administration" className="form-label">Controlled Substance?</label>
                              <input className="form-check-input" type="checkbox" id="ControlledSubstance" name="ControlledSubstance" /> 
                            </div> */}
                          </div>
                          <div className=" col-12 row">
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Starting Date<span className="starMandatory">*</span></label>
                           <input  id="startingdateID" type="date" className="form-control form-control-sm" name="startingdate" value={sendForm.startingdate} onChange={handleChangeText} />
                           <small id="errDate" className="form-text text-danger" style={{ display: 'none' }}> 
                            </small>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Provider</label>
                            {/* <input  id="providerID" type="text" className="form-control form-control-sm" name="providerName" placeholder= "Enter Provider" value={sendForm.providerName} onChange={handleChangeText} /> */}
                            <select name="providerName" className='form-select form-select-sm' id="providerID" value={sendForm.providerName} onChange={handleChangeText} >
                              <option value="0">--Select Provider--</option>
                              {providerList && providerList.map((prList, ind) =>{
                                return(
                                  <option value={prList.id}>{prList.name}</option>
                                )
                              })}
                            </select>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>                          
                            <div><label htmlFor="checkedDrug" className="form-label">Drug</label> </div>
                            <div className="d-flex gap-3">
                              <div>
                                <div className="form-check">
                                  <label className="form-label" for="UseDefault">Use Default</label>
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="UseDefault" value={0} onChange={handleChangeText} checked={sendForm.exampleRadios == 0}/> 
                              </div>
                              </div>

                              <div>
                                <div className="form-check">
                                  <label className="form-label" for="UseRxNorm">Use RxNorm</label>
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="UseRxNorm" value={1} onChange={handleChangeText} checked={sendForm.exampleRadios == 1}/> 
                              </div>
                              </div>


                              <div>
                                <div className="form-check">
                                  <label className="form-label" for="UseRxCUI">Use RxCUI</label>
                                  <input className="form-check-input" type="radio" name="exampleRadios" id="UseRxCUI"  value={2} onChange={handleChangeText} checked={sendForm.exampleRadios == 2}/> 
                              </div>
                              </div>

                            </div>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Drug Search<span className="starMandatory">*</span></label>
                            {/* <input  id="DrugSearchID" type="text" className="form-control form-control-sm" name="DrugSearchID" placeholder= "Enter Drug" onClick={''} /> */}
                            {brandList && <DropdownWithSearch defaulNname='Search Medicine' name="brandList" list={brandList} valueName="name" displayName="name" editdata={editName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClearMedicineSearch} />}
                            <small id="errDrug" className="form-text text-danger" style={{ display: 'none' }}> 
                            </small>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Quantity</label>
                            <input  id="QuantityID" type="text" className="form-control form-control-sm" name="QuantityName" placeholder= "Enter Quantity" value={sendForm.QuantityName} onChange={handleChangeText} />
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Medicine Strength</label>
                            <input  id="medicinestrengthID" type="text" className="form-control form-control-sm" name="medicineStrength" placeholder= "Enter Medicine" value={sendForm.medicineStrength} onChange={handleChangeText} />
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Medicine Unit</label>
                            <select name="medicineUnit" className='form-select form-select-sm' id="medicineUnitID" value={sendForm.medicineUnit} onChange={handleChangeText} >
                              <option value="0">mm/gg</option>
                              <option value="1">mm/CC</option>
                              <option value="2">mm</option>
                            </select>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <div className="d-flex gap-2">
                              <div>
                              <label htmlFor="Code" className="form-label">Refills</label>
                            <select name="RefillsUnit" className='form-select form-select-sm' id="RefillsID" value={sendForm.RefillsUnit}  onChange={handleChangeText} >
                              <option value="0">--Select Refills--</option>
                              
                            </select>
                              </div>
                              <div>
                                <label htmlFor="Code" className="form-label"># of tablets:</label>
                                <input  id="ofTabletsID" type="text" className="form-control form-control-sm" name="oftabletsName" placeholder= "Enter Medicine" value={sendForm.oftabletsName} onChange={handleChangeText} />
                              </div>
                            </div>
                          </div>
                          <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-2 mt-2'>
                            <div className="row">
                              <div className="col">
                                <div className="d-flex gap-2">
                                  
                                  <div>
                                    <label htmlFor="Code" className="form-label">Directions</label>
                                    <input  id="DirectionsID" type="text" className="form-control form-control-sm" name="DirectionsName" placeholder= "Enter Directions" value={sendForm.DirectionsName} onChange={handleChangeText} />
                                  </div>
                                  <div>
                                    <label htmlFor="Code" className="form-label">Form</label>
                                    <select name="formName" className='form-select form-select-sm' id="formID" value={sendForm.formName}  onChange={handleChangeText} >
                                      <option value="0">--Select Form--</option>
                                      {getFormList && getFormList.map((list, ind) => {
                                        return(
                                          <option value={list.id +":"+ list.name}>{list.name}</option>
                                        )
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="col">
                                <div className="d-flex gap-2">
                                  <div>
                                  <label htmlFor="Code" className="form-label">Route</label>
                                  <select name="routeName" className='form-select form-select-sm' id="routeID" value={sendForm.routeName}  onChange={handleChangeText} >
                                    <option value="0">--Select Route--</option>
                                    {getRouteList && getRouteList.map((routeList, ind) =>{
                                      return(
                                        <option value={routeList.name +':'+routeList.id}>{routeList.name}</option>)
                                    })}
                                  </select>
                                  </div>
                                  <div>
                                  <label htmlFor="Code" className="form-label">Frequency</label>
                                  <select name="FrequencyName" className='form-select form-select-sm' id="FrequencyID" value={sendForm.FrequencyName}  onChange={handleChangeText} >
                                    <option value="0">--Select Frequency--</option>
                                    {getIntervalList && getIntervalList.map((intList, ind) => {
                                      return(
                                        <option value={intList.id}>{intList.name}</option>
                                    )
                                    })}
                                  </select>
                                  </div>
                                </div>
                              </div>
                            </div>                          
                          </div>
                          
                          <div className='col-xxl-6 col-xl-6 col-lg-6 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Notes" className="form-label">Notes</label>
                            <textarea  id="NotesId" type="text" className="form-control form-control-sm" name="Notes" value={sendForm.Notes} onChange={handleChangeText} /> 
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>                          
                            <div><label htmlFor="checkedDrug" className="form-label">Add to Medication List</label> </div>
                            <div className="d-flex gap-3">
                              <div>
                                <div class="form-check">
                                  <label class="form-label" for="UseDefault">No</label>
                                  <input class="form-check-input" type="radio" name="addToList" id="No" value={0} onChange={handleChangeText} checked={sendForm.addToList == 0}/> 
                              </div>
                              </div>
                              <div>
                                <div class="form-check">
                                  <label class="form-label" for="UseRxNorm">Yes</label>
                                  <input class="form-check-input" type="radio" name="addToList" id="Yes" value={1} onChange={handleChangeText} checked={sendForm.addToList == 1}/> 
                              </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-2 mt-2'>
                            <label htmlFor="Code" className="form-label">Reason</label>
                            <select name="ReasonName" className='form-select form-select-sm' id="ReasonNameID" value={sendForm.ReasonName}  onChange={handleChangeText} >
                              <option value="0">mm/gg</option>
                              <option value="1">mm/CC</option>
                              <option value="2">mm</option>
                            </select>
                          </div>
                          <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 mb-3 mt-2'>
                            <div className="row align-items-center p-2">
                              <label htmlFor="ObservationCriteria" className="form-label"></label>
                              <div className="d-flex">
                              <label htmlFor="ObservationCriteria" className="form-label"></label>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}>
                                <img src={plus} className='icnn' alt='' /> Save
                              </button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" onClick={handleClear}><img src={clear} className='icnn' alt='' />Clear</button>
                              {/* <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={''}>
                                <img src={plus} className='icnn' alt='' /> Add
                              </button> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      </>
    
  )
}
