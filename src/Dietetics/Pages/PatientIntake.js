import React, { useEffect, useState } from "react";

import BoxContainer from "../../Component/BoxContainer";
import TableContainer from "../../Component/TableContainer";

import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";


import calender from "../../assets/images/icons/calender.svg";
import clock from "../../assets/images/icons/clock.svg";
import dish from "../../assets/images/icons/dish.svg";
import quantity from "../../assets/images/icons/quantity.svg";
import unitIcon from "../../assets/images/icons/unit.svg";

import GetFoodList from "../API/FoodIntake/GetFoodList";
import GetUnitList from "../API/FoodIntake/GetUnitList";
import GetUnitListSP from '../API/SupplementIntake/GetUnitList';
import DropdownWithSearch from "../../Component/DropdownWithSearch";
import GetFoodIntakeList from "../API/FoodIntake/GetFoodIntakeList";
import SaveFoodIntake from "../API/FoodIntake/SaveFoodIntake";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import DieteticsFoodIntakeValidation from "../API/FoodIntake/DieteticsFoodIntakeValidation";
import Search from "../../Code/Serach";
import GetSupplementList from '../API/SupplementIntake/GetSupplementList';
import SaveSuppliment from '../API/SupplementIntake/SaveSuppliment';
import GetAllSupplementList from '../API/SupplementIntake/GetAllSupplementList';
import Loader from "../../Component/Loader";
import DeleteSupplement from "../API/SupplementIntake/DeleteSupplement";
import deleteBtnIcon from  "../../assets/images/icons/delete.svg"


export default function FoodIntake() {
  let [foodList, setFoodList] = useState(); 
  let [unitList, setUnitList] = useState();
  let [foodIntakeList, setFoodIntakeList] = useState([]);
  let [foodIntakeListtemp, setFoodIntakeListtemp] = useState([]);
  let [txtDate, settxtDate] = useState();
  let [time, setTime] = useState();
  let [Quantity, setQuantity] = useState();
  let [food, setFood] = useState();
  let [unit, setUnit] = useState();
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [clearDropdown, setClearDropdown] = useState(0);

  let [sendForm, setSendForm]=useState({"userId": window.userId})
  let [txtDateSp, settxtDateSp] = useState();
  let [showLoder, setShowLoder] = useState(0);
  // let [timeSp, setTimeSp] = useState();
  let [supplementData,setSupplementData]=useState();
  let [supplementDataList, setsupplementDataList] = useState([]);
  
  let [supplementList, setsupplementList] = useState([]);
  let [supplimentName, setsupplimentName] = useState();
  let [unitListSp,setUnitListSp]=useState();
  let [qty, setQty]=useState();
  // let [unitSp, setunitSp]=useState();
  let [showUnderProcessSp,setShowUnderProcessSp]=useState(0);
  let [showTosterSp,setShowTosterSp]=useState(0)
  let [tosterMessageSp,setTosterMessageSp] = useState("")
  let [tosterValueSp,setTosterValueSp]= useState(0)
  let [clearDropdownSp, setClearDropdownSp] = useState(0)
  let [rowID, setRowID] = useState([]);



  // let [foodListTemp, setFoodListTemp ]= useState();
  // let [showSearchBoxProblem, setShowSearchBoxProblem] = useState(-1)

  let getFoodList = async () => {
    let foodList = await GetFoodList();
    if (foodList.status === 1) {
      setFoodList(foodList.responseValue);
    }
  };

  let getFoodIntakeList = async (txtDate) => {
    
    const txtGetDate = document.getElementById("txtDate").value;
    console.log("txtGetDate", txtDate);
    let uhid = window.sessionStorage.getItem("activeUHIDdiet")?JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    //let uhid = 'UHID00608';
    let foodIntakeList = await GetFoodIntakeList(uhid, txtGetDate);
    if (foodIntakeList.status === 1) {
      setFoodIntakeList(foodIntakeList.foodIntakeList);
      setFoodIntakeListtemp(foodIntakeList.foodIntakeList);
      console.log("ff", foodIntakeList);
    }
    else {
      setFoodIntakeListtemp([]); // Set empty array when no data is found
    }
  };

  let getData = async (value) => {
    let unitList = await GetUnitList(value);
    console.log("cdcsd", unitList);
    if (unitList.status === 1) {
      console.log("uni", unitList);
      setUnitList(unitList.responseValue);
    }
  }

   /////////////Unit List by SupplementName 
  let getUnit = async (val)=>{
    let getUnitData = await GetUnitListSP(val)
      if(getUnitData.status===1){
        console.log('uul', getUnitData);
        setUnitListSp(getUnitData.responseValue);
      }
  }
  ////// Dropdown Supplement List

  let handleChange = (e)=>{
    clearError(1);
    let value = e.target.value 
    let name = e.target.name
   if(name === "txtDate"){
    settxtDate(value)
    getFoodIntakeList(value);
    console.log('txtDateee',value);
   }
   else if(name === "time"){
    setTime(value)
   }
   else if(name ==="quantity"){
    setQuantity(value);
   }
   else if(name ==="unit"){
    setUnit(value);
   }
  }
  let clear =  (value) => {
    getDate();
    setQuantity("");
    setTime(0);
    setClearDropdown(value);
    // setFood(0);
    document.getElementById("time").value = "";
    document.getElementById("unit").value = 0;
    //  document.getElementById('foodName').value = 0;
    // document.getElementById('ddlUnitList').value = 0;
  };
  let clearError = async () => {
    document.getElementById("errDate").style.display = "none";
    document.getElementById("errTime").style.display = "none";
    document.getElementById("errFood").style.display = "none";
    document.getElementById("errQuantity").style.display ="none";
    document.getElementById("errUnit").style.display = "none";
  };


  let handleChangeSp =(e)=>{
    document.getElementById('errTimeSp').style.display = "none";
    document.getElementById('errDateSp').style.display = "none";
    document.getElementById('errQuantitySp').style.display = "none";
    document.getElementById('errSupplementSp').style.display = "none";
    document.getElementById('errUnitSp').style.display = "none";
    let name = e.target.name;
    let value = e.target.value;
    console.log("enter", name)

    setSendForm(sendForm=>({
      ...sendForm,
      [name]: value
    }))
    if (name==="supplimentName"){
      getUnit(value)
    }
    else if(name === "txtDateSp"){
      settxtDate (value)
      getAllSupplementList(value);
     }
     else if(name === "supplimentName"){
      setsupplimentName (value)
      
     }
    console.log('sendForm',sendForm);
  }

  let handleChangeDropdown = (e) => {
    clearError();
    let value = e.target.value;
    // let name = e.target.name;
    getData(value);
    setFood(value);
  };
  let getDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    console.log(today);
    document.getElementById("txtDate").value = today;
  };

  // SAVE FOOD INTAKE
  let saveFoodIntake = async () => {
    clearError();
    const txtGetDate = document.getElementById("txtDate").value;
    console.log("txtDate", txtGetDate);
    //for validation
    const isValidateFood = DieteticsFoodIntakeValidation(
      txtGetDate,
      time,
      food,
      Quantity,
      unit
    );
    console.log("fa", isValidateFood);
    var id = isValidateFood[1];
    if (isValidateFood === true) {
      let foodObj = {
        givenFoodDate: txtGetDate + " " + time,
        givenFoodQuantity: Quantity,
        foodId: food,
        entryType: "N",
        givenFoodUnitID: unit,
        //uhid: 'UHID00608',
       uhid: window.sessionStorage.getItem("activeUHIDdiet")?JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid, recommendedUserID: window.userId,
      };
      console.log(foodObj, "faiz");
      let data = await SaveFoodIntake(foodObj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0); //0 for save and warning 1 for Error
        setShowToster(1);
        clear(1);
        setTosterMessage("Data Saved Successfully!");
        getFoodIntakeList();
         setTimeout(() => {
           setShowToster(0);
        
          }, 2000)
  
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)//0 for save and warning 1 for Error
        setTosterMessage(data.responseValue)
        setTosterValue(1)
        clear(1);
          setTimeout(() => {
           setShowToster(0)
         }, 2000)
      }
    } else {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).innerHTML = isValidateFood[0];
    }
  };
  let handleSearch = (e) => {
    if (e.target.value !== "") {
      let result = Search(foodIntakeList, e.target.value);
      if (result.length != 0) {
        setFoodIntakeListtemp(result);
      }
      // else {
      //     setPatientListTemp(patientList)
      // }
    } else {
      setFoodIntakeListtemp(foodIntakeList);
    }
  };

  let handleSearchSp = (e) => {
    let searchValue=e.target.value;
    if (searchValue !== "") {
      let result = Search(supplementList,searchValue);
      if (result.length !== 0) {
        setsupplementDataList(result);
      }
      // else {
      //     setPatientListTemp(patientList)
      // }
    } else {
      setsupplementDataList(supplementList);
    }
  };

  let getSupplementList =  async ()=>{
    
    let supplementList = await GetSupplementList()
    if (supplementList.status ===1){
      setSupplementData (supplementList.responseValue);
    }
    console.log('supplementList',supplementList);
  }

  let getAllSupplementList = async(txtDate)=>{
    const txtGetDate=document.getElementById("txtDate").value;
    //const txtGetDate= '2023-10-03';
    console.log('txtDate',txtGetDate);
    let uhid = window.sessionStorage.getItem("activeUHIDdiet")?JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
   //let uhid = 'UHID00608';
    let allSupplementList = await GetAllSupplementList(uhid,txtDate);
    if (allSupplementList.status ===1){
      setsupplementList(allSupplementList.foodIntakeList)
      setsupplementDataList (allSupplementList.foodIntakeList);
       }
       else {
        setsupplementDataList([]); // Set empty array when no data is found
      }
       console.log('supplementList',allSupplementList);
  }

  let saveSupplement = async()=>{

    document.getElementById('errTimeSp').style.display = "none";
    document.getElementById('errDateSp').style.display = "none";
    document.getElementById('errQuantitySp').style.display = "none";
    document.getElementById('errSupplementSp').style.display = "none";
    document.getElementById('errUnitSp').style.display = "none";

    if (sendForm.timeSp === '' || sendForm.timeSp === null || sendForm.timeSp === undefined) {
      document.getElementById('errTimeSp').innerHTML = "Please Select Time";
      document.getElementById('errTimeSp').style.display = "block";
      return false;
  }

  if (sendForm.supplimentName === '' || sendForm.supplimentName === null || sendForm.supplimentName === undefined) {
    document.getElementById('errSupplementSp').innerHTML = "Please Select Supplement";
    document.getElementById('errSupplementSp').style.display = "block";
    return false;
}

if (sendForm.quantity === '' || sendForm.quantity === null || sendForm.quantity === undefined) {
  document.getElementById('errQuantitySp').innerHTML = "Please Select Quantity";
  document.getElementById('errQuantitySp').style.display = "block";
  return false;
}
   

if (sendForm.unitSp === '' || sendForm.unitSp === null || sendForm.unitSp === undefined ||sendForm.unitSp === 0) {
document.getElementById('errUnitSp').innerHTML = "Please Select Quantity";
document.getElementById('errUnitSp').style.display = "block";
return false;
}

    if(sendForm.txtDate === undefined)
    {
      let date = new Date()
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!
      var yyyy = date.getFullYear();
      sendForm.txtDate = yyyy + "-" + mm + "-" + dd; 
    }
    var valResponse = {
      intakeDateTime: sendForm.txtDate + ' ' + sendForm.timeSp,
      brandID: sendForm.supplimentName,
      doseStrength: parseInt(sendForm.quantity),
      doseUnitID: parseInt(sendForm.unitSp),
      entryType: "N",
      //uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
      uhid: window.sessionStorage.getItem("activeUHIDdiet")?JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,
      //uhid: 'UHID00608',
      userID: window.userId,
  }
  console.log('valResponse',valResponse);
  let data = await SaveSuppliment(valResponse);
  console.log("csd", data.status)
  if (data.status === 1) {
    let date = new Date()
    let dd = date.getDate();
    let mm = date.getMonth() + 1; //January is 0!
    let yyyy = date.getFullYear();
     setShowUnderProcessSp(0);
     setTosterValueSp(0);
     setShowTosterSp(1);
     setTosterMessageSp("Data Save Successfully!");
     setTimeout(() => {
         setShowTosterSp(0);
         clear(1);
         getAllSupplementList(yyyy + "-" + mm + "-" + dd);

     }, 2000)
 }
 else {
     setShowUnderProcessSp(0)
     setShowTosterSp(1)
     setTosterMessageSp(data.responseValue)
     setTosterValueSp(1)
     setTimeout(() => {
         setShowTosterSp(0)
     }, 2000)
 }
}
let deleteRow = async () => {
    console.log(rowID);
    setShowUnderProcess(1);
   //let  uhid = 'UHID00608';
   let uhid = window.sessionStorage.getItem("activeUHIDdiet")?JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let data = await DeleteSupplement(rowID, uhid);
    console.log('s'.data);
    if (data.status === 1) {
      let date = new Date()
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!
      var yyyy = date.getFullYear();
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterValue(0);
        setTosterMessage("Data Deleted Successfully!");
        setTimeout(() => {
            setShowToster(0);
            clear(1);
            getAllSupplementList(yyyy + "-" + mm + "-" + dd);
        }, 2000)
    }
    else {
        setShowUnderProcess(0);
            setShowToster(1);
            setTosterValue(1);
            setTosterMessage(data.responseValue);
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
    }
  }

  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    getFoodList();
    // getFoodIntakeList();
    settxtDateSp(yyyy + "-" + mm + "-" + dd)
    getFoodIntakeList(yyyy + "-" + mm + "-" + dd);
 
    getDate();
    getSupplementList();
    getAllSupplementList(yyyy + "-" + mm + "-" + dd);

  }, []);
  return (
    <>
      <div className="main-content pt-3 mt-5">
        <div className="container-fluid">
          <div className="row">

            <div className="col-6">
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse"> Food Intake</span>
                  <BoxContainer>
                    <div className="mb-2 me-2">
                      <img src={calender} className="icnn" alt=""/>{" "}
                      <label htmlFor="txtDate" className="form-label">
                        Date
                      </label>
                      <input
                        type="date"
                        value={txtDate}
                        className="form-control form-control-sm"
                        id="txtDate"
                        name="txtDate"
                        placeholder="Enter Date"
                        onChange={handleChange}
                      />
                      <small
                        id="errDate"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>
                    <div className="mb-2 me-2">
                      <img src={clock} className="icnn" alt=""/>{" "}
                      <label htmlFor="time" className="form-label">
                        Time
                      </label>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        id="time"
                        name="time"
                        placeholder="Enter Time"
                        onChange={handleChange}
                      />
                      <small
                        id="errTime"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>
                    {/* <div className="mb-2 me-2">
                      <img src={dish} className='icnn'/> <label htmlFor="dish" className="form-label">Dish</label>
                        <input type="text" className="form-control form-control-sm" id="dish" name="dish" placeholder="Enter Dish" />
                      </div>    */}
                    <div className="mb-2 me-2">
                      <img src={dish} className="icnn" alt=""/>{" "}
                      <label htmlFor="dish" className="form-label">
                        Food
                      </label>
                      {foodList && (
                        <DropdownWithSearch
                          defaulNname="Select Food"
                          name="foodName"
                          id="foodName"
                          list={foodList}
                          valueName="id"
                          displayName="foodName"
                          getvalue={handleChangeDropdown}
                          editdata={""}
                          clear={clearDropdown}
                          clearFun={clear}
                        />
                      )}
                      <small
                        id="errFood"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>
                    <div className="mb-2 me-2">
                      <img src={quantity} className="icnn" alt=""/>{" "}
                      <label htmlFor="Quantity" className="form-label">
                        Quantity
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="quantity"
                        name="quantity"
                        value={Quantity}
                        onChange={handleChange}
                        placeholder="Enter Quantity"
                      />
                      <small
                        id="errQuantity"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>

                    <div className="mb-2 me-2">
                      <img src={unitIcon} className="icnn" alt=""/>{" "}
                      <label htmlFor="Unit" className="form-label">
                        Unit
                      </label>
                      <select
                        className="form-select form-select-sm"
                        aria-label=".form-select-sm example"
                        id="unit"
                        name="unit"
                        onChange={handleChange}
                      >
                        <option value="0">Select Unit</option>{" "}
                        {unitList &&
                          unitList.map((val, index) => {
                            return (
                              <option value={val.unitId}>{val.unitName}</option>
                            );
                          })}
                      </select>
                      <small
                        id="errUnit"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>
                  </BoxContainer>
                </div>
              </div>

              <div className="rt-btns">
              <BoxContainer>             
                <div className="mb-2">
                 {/* <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label> */}
                 {showUnderProcess === 1 ? <><TosterUnderProcess/>  </> :
                      showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                        :
                  <div className='diet-btn'>
                    <button type="button" className="btn btn-save btn-save-fill btn-sm" onClick={saveFoodIntake}><img src={save} className='icnn' alt=""/> Save</button>
                    <button type="button" className="btn btn-save btn-sm btnbluehover" onClick={()=>clear(1)}><img src={reset} className='icnn' alt=""/> Reset</button>
                    {/* <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={transfer} className='icnn'/> Repeat Last Day Food</button>
                    <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={del} className='icnn'/> Delete All Food</button> */}
                      </div>
                    }
                  </div>
                </BoxContainer>
              </div>


              {/* Recommended Food List */}

              <div className="listdetailsct">
                <div className="listdetailsct-in">
                  <div className="listd-in showing">
                  Intake Food List
                  </div>
                </div>
                <div className="listdetailsct-in">
                  {/* <div className='listd-in'>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>All Day Meal</option>
                    </select>
                  </div> */}
                  <div className="listd-in">
                    <form class="d-flex ms-auto ser" role="search">
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search.."
                        onChange={handleSearch}
                      />

                      <i class="fa fa-search"></i>
                    </form>
                  </div>
                </div>
              </div>
        

              <div className="med-table-section" style={{ height: "50vh" }}>
               

                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "5%" }}>
                        #
                      </th>
                      <th>Food</th>
                      <th>Quantity</th>
                      <th>Time</th>
                    </tr>
                  </thead>

                 
                  <tbody>
                 

                 {foodIntakeListtemp.length > 0 ? (
                   foodIntakeListtemp.map((val, ind) => {
                     return (
                       <tr key={val.id}>
                       <td className="text-center">{ind + 1}</td>
                       <td>{val.foodName}</td>
                       <td>{val.foodQty} {val.unitName}</td>
                       <td>{val.foodEntryTime}</td>
                     
                     </tr>
                       
                     )
                   })
                 ) : (
                   <tr>
                     <td colSpan="4" className="text-center">No Record Found</td>
                   </tr>
                 )}

               </tbody>
                </TableContainer>
              </div>
            </div>
            
            <div className="col-6">
              
              <div className="fieldsett-in">
                 <div className="fieldsett">
                   <span className='fieldse'> Supplement Intake</span>
                    <BoxContainer>
                  
                    <div className="mb-2 me-2">
                      <img src={calender} className="icnn" alt=""/>{" "}
                      <label htmlFor="txtDateSp" className="form-label">
                        Date
                      </label>
                      <input
                        type="date"
                        value={txtDateSp}
                        className="form-control form-control-sm"
                        id="txtDateSp"
                        name="txtDateSp"
                        placeholder="Enter Date"
                        onChange={handleChangeSp}
                      />
                      <small
                        id="errDateSp"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>
                    <div className="mb-2 me-2">
                      <img src={clock} className="icnn" alt=""/>{" "}
                      <label htmlFor="time" className="form-label">
                        Time
                      </label>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        id="timeSp"
                        name="timeSp"
                        placeholder="Enter Time"
                        onChange={handleChangeSp}
                      />
                      <small
                        id="errTimeSp"
                        className="form-text text-danger"
                        style={{ display: "none" }}
                      ></small>
                    </div>
                      <div className="mb-2 me-2">
                          <label htmlFor="countryId" className="form-label">Supplement <span className="starMandatory">*</span></label>
                          {/* {countryList && <DropdownWithSearch defaulNname="Select Country" name="countryId" list={countryList} displayName="countryName" valueName="id" getvalue={handleChange} />} */}
                          {supplementData && <DropdownWithSearch defaulNname="Select Supplement" id="supplimentName" name="supplimentName" list={supplementData} valueName="supplimentId" displayName="supplimentName" editdata={""} clear={clearDropdownSp}  getvalue={handleChangeSp} clearFun={clear}   />}
                          <small id="errSupplementSp" className="form-text text-danger" style={{ display: 'none' }}></small>

                      </div>
                      <div className="mb-2 me-2">
                      <img src={quantity} className='icnn' alt=""/> <label htmlFor="Quantity" className="form-label">Quantity</label>
                      <input type="number" className="form-control form-control-sm" id="quantity" name="quantity" value={qty} onChange={handleChangeSp}
                        placeholder="Enter Quantity"/>
                        <small id="errQuantitySp" className="form-text text-danger" style={{ display: 'none' }}></small>

                      </div>
                      <div className="mb-2 me-2">
                      <img src={unitIcon} className='icnn' alt=""/> <label htmlFor="Unit" className="form-label">Unit</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='unitSp' name='unitSp' onChange={handleChangeSp}>
                          <option value='0'>Select Unit</option>{" "}
                          {unitListSp && unitListSp.map((val,index) => {
                            return (
                              <option value={val.unitID}>{val.unitName}</option>
                            );
                          })}
                        </select>
                        <small id="errUnitSp" className="form-text text-danger" style={{ display: 'none' }}></small>
                      </div>
                     

                    </BoxContainer>
                 </div>
              </div>
        
              <div className="rt-btns">
              <BoxContainer>             
                <div className="mb-2">
                 {/* <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label> */}
                 {showUnderProcessSp === 1 ? <><TosterUnderProcess/>  </> :
                      showTosterSp === 1 ? <Toster value={tosterValueSp} message={tosterMessageSp} />
                        :
                  <div className='diet-btn'>
                  <button type="button" className="btn btn-save btn-save-fill btn-sm" onClick={saveSupplement}><img src={save} className='icnn' alt=""/> Save</button>
                    <button type="button" className="btn btn-save btn-sm btnbluehover" onClick={()=>{clear(1)}}><img src={reset} className='icnn' alt=""/> Reset</button>
                    {/* <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={transfer} className='icnn'/> Repeat Last Day Food</button>
                    <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={del} className='icnn'/> Delete All Food</button> */}
                      </div>
                    }
                  </div>
                </BoxContainer>
              </div>           
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                   <div className='listd-in showing'>Intake Supplement List</div> 
                </div>
                <div className='listdetailsct-in'>
               
                  {/* <div className='listd-in'>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>All Day Meal</option>
                    </select>
                  </div> */}
                  <div className='listd-in'>
                 
                    <form class="d-flex ms-auto ser" role="search">
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search.."
                        onChange={handleSearchSp}
                      />

                      <i class="fa fa-search"></i>
                    </form>
                  </div>
                </div>
             
          
              
             

            </div>


            <div className="med-table-section" style={{ "height": "50vh" }}>
                <TableContainer>
                <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Suppliment Name</th>
                      <th>Quantity</th>
                      <th>Date | Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {supplementDataList.length > 0 ? (
                      supplementDataList.map((val, ind) => {
                        return (
                          <tr key={val.id}>
                            <td className="text-center">{ind + 1}</td>
                            <td>{val.supplimentName}</td>
                            <td>{val.doseStrength} {val.unitName}</td>
                            <td>{val.medicationEntryDate}</td>
                            <td>
                            <div className="action-button">
                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(val.medicationId); }}/>
                                </div>
                            </div>
                          </td>
                          </tr>
                          
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No Record Found</td>
                      </tr>
                    )}
                  </tbody>
                </TableContainer>
              </div>
         
            </div>

            
          </div>
        
           {/* -----------------------Start Delete Modal Popup-------------------    */}

           <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">
                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'> Delete?</div>
                                <div className='popDeleteContent'> Are you sure you want to delete?</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* -----------------------End Delete Modal Popup---------------------  */}
                {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
    

     
        </div>
      </div>
    </>
  );
}
