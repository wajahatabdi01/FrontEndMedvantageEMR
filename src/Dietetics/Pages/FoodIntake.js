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
import DropdownWithSearch from "../../Component/DropdownWithSearch";
import GetFoodIntakeList from "../API/FoodIntake/GetFoodIntakeList";
import SaveFoodIntake from "../API/FoodIntake/SaveFoodIntake";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import DieteticsFoodIntakeValidation from "../API/FoodIntake/DieteticsFoodIntakeValidation";
import Search from "../../Code/Serach";
import PatientTabs from "./PatientTabs";

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
    let entryType='D'
    let uhid = window.sessionStorage.getItem("activeUHIDdiet")?JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let foodIntakeList = await GetFoodIntakeList(uhid, txtGetDate, entryType);
    if (foodIntakeList.status === 1) {
      setFoodIntakeList(foodIntakeList.foodIntakeList);
      setFoodIntakeListtemp(foodIntakeList.foodIntakeList);
      console.log("ff", foodIntakeList);
    }
    else {
      setFoodIntakeListtemp([]); // Set empty array when no data is found
    }
  };
  // let getUnitList = async() =>{
  //   let unitList = await GetUnitList();
  //   if (unitList.status===1){
  //     setUnitList(unitList.responseValue);
  //     console.log('un',unitList);
  //   }
  // }
  let getData = async (value) => {
    let unitList = await GetUnitList(value);
    console.log("cdcsd", unitList);
    if (unitList.status === 1) {
      console.log("uni", unitList);
      setUnitList(unitList.responseValue);
    }
  }

  const updateCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    setTime(formattedTime);
  };

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
    setTime(e.target.value)
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
        entryType: "D",
        givenFoodUnitID: unit,
        uhid: window.sessionStorage.getItem("activeUHIDdiet")?JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,
        recommendedUserID: window.userId,
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

  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    getFoodList();
    // getFoodIntakeList();
    getFoodIntakeList(yyyy + "-" + mm + "-" + dd);
    getDate();
    updateCurrentTime();
  }, []);
  return (
    <>
      <div className="main-content pt-3 mt-5">
        <div className="container-fluid">
        <PatientTabs />
          <div className="row">
            <div className="col-12">
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse">Recommended Food</span>
                  <BoxContainer>
                    <div className="mb-2 me-2">
                      <img src={calender} className="icnn" alt="" />{" "}
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
                        value={time}
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
            </div>

            <div className="col-12 mt-2">
              <div className="listdetailsct">
                <div className="listdetailsct-in">
                  <div className="listd-in showing">
                  Recommended Food List
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
              {/* <div className='listdetailsct cir1'>
                <div className='listdetailsct cir2'>
                  <div className='listdetailsct-in'><div className='cir c-orange'></div>Cooked Food</div>
                  <div className='listdetailsct-in'><div className='cir c-blue'></div>Sent By Mess</div>
                  <div className='listdetailsct-in'><div className='cir c-green'></div>Given Food</div>
                  <div className='listdetailsct-in'><div className='cir c-red'></div>Cancelled Food</div>
                </div>
              </div> */}

              <div className="med-table-section" style={{ height: "50vh" }}>
                {/* <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Food</th>
                      <th>Quantity</th>
                      <th>Time</th>
                      <th>Cooked By</th>
                      <th>Sent By Mess</th>
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    <tr>
                      <td className="text-center">1</td>
                      <td><span className="cir c-orange"></span>Ginger</td>
                      <td>1 gm</td>
                      <td>00:00</td>
                      <td>Rinika</td>
                      <td>06/09/2022 06:36 PM</td>
                      <td>
                        <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className=''/></span></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn'/></span></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">1</td>
                      <td><span className="cir c-orange"></span>Ginger</td>
                      <td>1 gm</td>
                      <td>00:00</td>
                      <td>Rinika</td>
                      <td>06/09/2022 06:36 PM</td>
                      <td>
                        <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className=''/></span></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn'/></span></div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">1</td>
                      <td><span className="cir c-orange"></span>Ginger</td>
                      <td>1 gm</td>
                      <td>00:00</td>
                      <td>Rinika</td>
                      <td>06/09/2022 06:36 PM</td>
                      <td>
                        <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className=''/></span></div>
                          <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn'/></span></div>
                        </div>
                      </td>
                    </tr>
                    


                  </tbody>
                </TableContainer> */}

                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ width: "5%" }}>
                        #
                      </th>
                      <th>Food</th>
                      <th>Quantity</th>
                      <th>Time</th>
                      {/* <th>Cooked By</th> */}
                      {/* <th>Sent By Mess</th> */}
                      {/* <th style={{ width: "10%" }} className="text-center">
                        Action
                      </th> */}
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
                       {/* <td></td> */}
                       {/* <td>{val.dischargeType}</td> */}
                       {/* <td>
                         <div className="action-button">
                           <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUptxtDate(val.id, val.headName, val.imageURL, val.userId) }}></i></div>
                           <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                           </div>

                           <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEDD2" }}><img src={editbtn} className='icnn'/></span></div>
                       <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn'/></span></div>
                         </div>
                       </td> */}
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
        </div>
      </div>
    </>
  );
}
