import React, { useEffect } from "react";

import BoxContainer from "../../Component/BoxContainer";
import TableContainer from "../../Component/TableContainer";

import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";

import delbtn from "../../assets/images/icons/delbtn.svg";

import unitIcon from "../../assets/images/icons/unit.svg";

import dish from "../../assets/images/icons/dish.svg";

import quantity from "../../assets/images/icons/quantity.svg";
import DropdownWithSearch from "../../Component/DropdownWithSearch";
import { useState } from "react";
import GetFoodList from "../API/FoodIntake/GetFoodList";
import GetUnitList from "../API/FoodIntake/GetUnitList";

import SaveRecipeMaster from "../API/Recipe/SaveRecipeMaster";
import GetRecipeMain from "../API/Recipe/GetRecipeMain";
import TosterUnderProcess from "../../Component/TosterUnderProcess";
import Toster from "../../Component/Toster";
import RecipeMasterValidation from "../API/Recipe/RecipeMasterValidation";
import GetRecipeSub from "../API/Recipe/GetRecipeSub";
import UpdateRecipeMasterClick from "../API/Recipe/UpdateRecipeMasterClick";
import IconDelete from "../../assets/images/icons/IconDelete.svg";
import DeleteRecipe from "../API/Recipe/DeleteRecipe";
import IconEdit from '../../assets/images/icons/IconEdit.svg'

export default function RecipeMaster() {
  let [foodList, setFoodList] = useState();
  let [txtFood, setFood] = useState();
  let [unitList, setUnitList] = useState();
  let [unitIngList, setUnitIngList] = useState();
  let [unit, setUnit] = useState();
  let [foodUnit, setFoodUnit] = useState();
  let [foodQuantity, setFoodQuanttity] = useState();
  let [showIngredientList, setShowIngredientList] = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [recipeMainFoodList, setRecipeMainFoodList] = useState("");
  let [clearDropdown, setClearDropdown] = useState(0);
  let [editFood, setEditFood] = useState("");
  let [updateBool, setUpdateBool] = useState(0);
  let [recipesMainId, setRecipeMainId] = useState("");
  let [mainFoodId, setMainFoodId] = useState("");

  let [row, setRow] = useState({
    ingredientId: "",
    ingredientName: "",
    qty: "",
    unitId: "",
    unitName: "",
  });
  let getFoodList = async () => {
    let foodList = await GetFoodList();
    if (foodList.status === 1) {
      setFoodList(foodList.responseValue);
    }
  };
  let handleChangeDropdown = (e) => {
    clearError();
     setEditFood("");
    let value = e.target.value;
    setFood(value);
    getUnitList(value);
  };
  let handlehandleChangeIng = (e) => {
    clearIngError();
    let value = e.target.value;
    let name = e.target.name;

    if (e.target.name === "qty") {
      setRow((sendForm) => ({
        ...sendForm,
        ["qty"]: value,
      }));
    } else {
      let val = document.getElementById("unit");
      let text = val[val.selectedIndex].text;
      setRow((sendForm) => ({
        ...sendForm,
        ["unitId"]: value,
      }));
      setRow((sendForm) => ({
        ...sendForm,
        ["unitName"]: text,
      }));
    }
  
  };
  let handleChangeIngDropdown = (e) => {
    clearIngError();
    let value = e.target.value;
    let name = e.target.selectedName;
    // setFood(value);
 

    setRow((sendForm) => ({
      ...sendForm,
      ["ingredientId"]: value,
    }));
    setRow((sendForm) => ({
      ...sendForm,
      ["ingredientName"]: name,
    }));
    // row["ingredientId"] = value;
    // row["ingredientName"] = name;
    
    getUnitIngList(value);
  };
  let getUnitList = async (value) => {
    
    let unitList = await GetUnitList(value);
    if (unitList.status === 1) {
      setUnitList(unitList.responseValue);
    }
  };
  let getUnitIngList = async (value) => {
   
    let unitIngList = await GetUnitList(value);
    if (unitIngList.status === 1) {
      setUnitIngList(unitIngList.responseValue);
    }
  };
  let handleChange = (e) => {
    clearError();
    let value = e.target.value;
    let name = e.target.name;
    if (name === "foodQuantity") {
      setFoodQuanttity(value);
    } else if (name === "foodUnit") {
      setFoodUnit(value);
    }
  };
  // let handleIngChange = (e) => {
  //   // clearError();
  //   let value = e.target.value;
  //   let name = e.target.name;
  //   if (name === "unit") {
  //     setUnit(value);
  //   }
  // };
  let clearError = async () => {
    document.getElementById("errFood").style.display = "none";
    document.getElementById("errQuantity").style.display = "none";
    document.getElementById("errUnit").style.display = "none";
  };
  let clearIngError = async () => {
    document.getElementById("errIngFood").style.display = "none";
    document.getElementById("errIngQty").style.display = "none";
    document.getElementById("errIngUnit").style.display = "none";
  };
  // let handleChangeDropdown = (e)=>{
  //   clearError();
  //   let value = e.target.value
  //   let name = e.target.name
  //   getData(value)
  //   setFood(value);

  // }
  ////////////////////save Recipe Master
  let SaveRecipeMasterClick = async () => {
    clearError();
    const isValidateRecipeMain = RecipeMasterValidation(
      txtFood,
      foodQuantity,
      foodUnit
    );
    var id = isValidateRecipeMain[1];
    if (isValidateRecipeMain === true) {
      let recipeObj = {
        uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
        foodId: txtFood,
        foodQuantity: foodQuantity,
        unitId: foodUnit,
        userID: window.userId,
        jsonData: JSON.stringify(showIngredientList),
      };
     
      let data = await SaveRecipeMaster(recipeObj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        setTimeout(() => {
          setShowToster(0);
        }, 2000);
      } else {
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(data.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        }, 2000);
      }
    } else {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).innerHTML = isValidateRecipeMain[0];
    }
  };
  let handleAddingredient = () => {
    clearIngError();
    setShowIngredientList([...showIngredientList, row]);
    // setRow({
    //   ingredientId: "",
    //   ingredientName: "",
    //   qty: "",
    //   unitId: "",
    //   unitName: "",
    // });
  };
  ///// Get Recipe Main list
  let getRecipeMainFood = async () => {
    let recipeUhid = {
      uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
    };
    let recipeMain = await GetRecipeMain(recipeUhid);
    if (recipeMain.status === 1) {
      setRecipeMainFoodList(recipeMain.responseValue);
    }
  };
  // let removeIngredient =(ind)=>{


  //   setShowIngredientList(showIngredientList.splice(ind, 1));

  // }
  let removeIngredient = (index) => {
    const newIngredientList = [...showIngredientList];
    newIngredientList.splice(index, 1);
    setShowIngredientList(newIngredientList);
  };
  // handle button update
  let handleUpdate = async (val) => {
    setUpdateBool(1);
    let recipeMainObj = {
      foodId: val.foodId,
      recipeMainId: val.recipeMainId,
      uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
    };

    let getRecipeMain = await GetRecipeSub(recipeMainObj);
    if (getRecipeMain.status === 1) {
      let mainFoodId = val.recipeMainId;
      setRecipeMainId(mainFoodId);

      let recipeMainUpd = getRecipeMain.recipeMainList[0];
      
      setEditFood(recipeMainUpd.foodName);
      setUnitList(getRecipeMain.unitListByFoodFId);
      setFood(getRecipeMain.recipeMainList[0].foodId);
      setFoodQuanttity(getRecipeMain.recipeMainList[0].foodQuantity);
      setFoodUnit(getRecipeMain.recipeMainList[0].unitId);
      setTimeout(() => {
        document.getElementById("foodUnit").value =
          getRecipeMain.recipeMainList[0].unitId.toString();
      }, 500);
      //  let t = document.getElementById("foodUnit");
      

      // setShowIngredientList([getRecipeMain.ingredientLists, row]);
      let arrIngList = getRecipeMain.ingredientLists;

      let arr = [];
      arrIngList.map((val, ind) => {
        arr.push({
          ingredientId: val.foodId,
          ingredientName: val.foodName,
          qty: val.ingredientQuantity,
          unitId: val.unitId,
          unitName: val.ingredientUnitName,
        });
      });

      setShowIngredientList(arr);

      document.getElementById("qtyMain").value = recipeMainUpd.foodQuantity;
      document.getElementById("foodUnit").value = recipeMainUpd.unitId;
    }
    
  };
  //  let handleChange = (e) => {
  //   clearError();
  //   let value = e.target.value;
  //   let name = e.target.name;
  //   if (name === "foodQuantity") {
  //     setFoodQuanttity(value);
  //   }
  //   else if (name === "foodUnit") {
  //     setFoodUnit(value);
  //   }
  // };
  let clear = (value) => {
    setClearDropdown(value);
    // setFood(0);
    setShowIngredientList("");
    document.getElementById("qtyMain").value = "";
    document.getElementById("foodUnit").value = 0;
    document.getElementById("RDA").value = "";
    document.getElementById("unit").value = 0;
    setShowIngredientList([])
    setFood("")
    setFoodQuanttity("")
    setFoodUnit("")
    setEditFood("")
    //  document.getElementById('foodName').value = 0;
    // document.getElementById('ddlUnitList').value = 0;
  };
  ////////////////////Update Recipe Master
  let saveUpdate = async () => {
    // clearError();
    let isValidateRecipeMain = RecipeMasterValidation(
      txtFood,
      foodQuantity,
      foodUnit
    );
    var id = isValidateRecipeMain[1];
    if (isValidateRecipeMain === true) {
      let recipeObj = {
        uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
        foodId: txtFood,
        foodQuantity: foodQuantity,
        unitId: foodUnit,
        userID: window.userId,
        jsonData: JSON.stringify(showIngredientList),
        recipeMainId: recipesMainId,
      };
      
      let data = await UpdateRecipeMasterClick(recipeObj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Updated Successfully!");
        setTimeout(() => {
          setShowToster(0);
        }, 2000);
        setUpdateBool(0);
        getRecipeMainFood();
        clear(1);
      } else {
        setShowUnderProcess(0);
        setShowToster(1);
        setTosterMessage(data.responseValue);
        setTosterValue(1);
        setTimeout(() => {
          setShowToster(0);
        }, 2000);
      }
    } else {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).innerHTML = isValidateRecipeMain[0];
    }
  };
  let handleDelete = (val) => {
    setMainFoodId(val.foodId);
    setRecipeMainId(val.recipeMainId);
  };
  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    let delObj = {
      uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
      foodId: mainFoodId,
      recipeMainId: recipesMainId,
    };
    
    setShowUnderProcess(1);
    let response = await DeleteRecipe(delObj);
    if (response.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage("Data Deleted SuccessFully!");
      setTosterValue(0);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
      getRecipeMainFood();
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(response.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };
  useEffect(() => {
    getFoodList();
    getRecipeMainFood();
  }, []);

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-12 mt-2">
              <div className="selection">
                <div className="selection-in">
                  <div className="selection-in-sec">
                    <div className="nameage">
                      Riya Mishra<span className="ager">28/M</span>
                    </div>
                    <div className="nameage">
                      UHID<span className="uhid">2253275</span>
                    </div>
                    <div className="dell">
                      <i className="fa fa-times"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="col-12">
              <div className="fieldsett-in">
                <div className="fieldsett">
                  <span className="fieldse">Recipe Master</span>
                  <div className="row">
                    <div className="col-md-4 col-sm-12 plt">
                      <BoxContainer>
                        {/* <div className="mb-2 me-2">
                            <img src={dish} className='icnn'/> <label htmlFor="DishFood" className="form-label">Dish/Food</label>
                            <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option selected>Select Quantity</option>
                            </select>
                          </div>  */}
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
                              editdata={editFood}
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
                        {/* <div className="mb-2 me-2">
                          <label htmlFor="DishFood" className="form-label">
                            &nbsp;
                          </label>
                          <div className="addfood">
                            <i className="fa fa-plus"></i>
                          </div>
                        </div> */}
                      </BoxContainer>
                    </div>
                    <div className="col-md-8 col-sm-12 prt">
                      <BoxContainer>
                        {/* <div className="mb-2 me-2">
                            <img src={Ingredient} className='icnn'/> <label htmlFor="Ingredient" className="form-label">Ingredient</label>
                            <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option selected>Select Date</option>
                            </select>
                          </div>  */}
                        <div className="mb-2 me-2">
                          <img src={dish} className="icnn" alt=""/>{" "}
                          <label htmlFor="dish" className="form-label">
                            Ingredient
                          </label>
                          {foodList && (
                            <DropdownWithSearch
                              defaulNname="Select Food"
                              name="foodName"
                              id="foodName"
                              list={foodList}
                              valueName="id"
                              displayName="foodName"
                              getvalue={handleChangeIngDropdown}
                              editdata={""}
                              clear={clearDropdown}
                              clearFun={clear}
                            />
                          )}
                          <small
                            id="errIngFood"
                            className="form-text text-danger"
                            style={{ display: "none" }}
                          ></small>
                        </div>

                        <div className="mb-2 me-2">
                          <img src={quantity} className="icnn" alt=""/>{" "}
                          <label htmlFor="RDA" className="form-label">
                            Quantity
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="RDA"
                            name="qty"
                            placeholder="Enter Quantity"
                            onChange={handlehandleChangeIng}
                          />
                          <small
                            id="errIngQuantity"
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
                            onChange={handlehandleChangeIng}
                          >
                            <option value="0">Select Unit</option>
                            {unitIngList &&
                              unitIngList.map((val, index) => {
                                return (
                                  <option value={val.unitId}>
                                    {val.unitName}
                                  </option>
                                );
                              })}
                          </select>
                          <small
                            id="errIngUnit"
                            className="form-text text-danger"
                            style={{ display: "none" }}
                          ></small>
                        </div>

                        {/* <div className="mb-2 me-2">
                      <img src={unitIcon} className='icnn'/> <label htmlFor="Unit" className="form-label">Unit</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='unit' name='unit' onChange={handleChange} >
                        <option value="0">Select Unit</option> {unitList && unitList.map((val, index) => { return (<option value={val.unitId}>{val.unitName}</option>) })}
                        </select>
                        <small id='errUnit' className='form-text text-danger' style={{display:'none'}}></small>
                      </div> */}

                        <div className="mb-2 me-2">
                          <label htmlFor="DishFood" className="form-label">
                            &nbsp;
                          </label>
                          <div
                            className="addfood"
                            onClick={handleAddingredient}
                          >
                            <i className="fa fa-plus"></i>
                          </div>
                        </div>
                      </BoxContainer>

                      <div className="tbl-re">
                        <div className="tbl-re1">
                          <div
                            className="med-table-section"
                            style={{ height: "18vh" }}
                          >
                            <TableContainer>
                              <thead>
                                <tr>
                                  <th
                                    className="text-center"
                                    style={{ width: "5%" }}
                                  >
                                    #
                                  </th>
                                  <th>Food</th>
                                  <th>Quantity</th>
                                  <th>Unit</th>
                                  <th>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {showIngredientList &&
                                  showIngredientList.map((val, ind) => {
                                    
                                    return (
                                      <tr>
                                        <td className="text-center">
                                          {ind + 1}
                                        </td>
                                        <td>{val.ingredientName}</td>
                                        <td>{val.qty}</td>
                                        <td>{val.unitName}</td>
                                        <td>
                                          <div
                                            data-bs-toggle="tooltip"
                                            data-bs-title="Delete Row"
                                            data-bs-placement="bottom"
                                          >
                                            <span
                                              className="btnbg"
                                              onClick={() =>
                                                removeIngredient(ind)
                                              }
                                              style={{ background: "#FFEFEF" }}
                                            >
                                              <img
                                                src={delbtn}
                                                className="icnn"
                                               alt=""/>
                                            </span>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </TableContainer>
                          </div>
                        </div>
                      </div>

                      <div className="totalwuickh">Total Cooked Quantity</div>

                      <BoxContainer>
                        <div className="mb-2 me-2">
                          <img src={quantity} className="icnn" alt=""/>{" "}
                          <label htmlFor="qtyMain" className="form-label">
                            Quantity
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            id="qtyMain"
                            name="foodQuantity"
                            placeholder="Enter Quantity"
                            onChange={handleChange}
                          />
                          <small
                            id="errQuantity"
                            className="form-text text-danger"
                            style={{ display: "none" }}
                          ></small>
                        </div>

                        <div className="mb-2 me-2">
                          <img src={unitIcon} className="icnn" alt=""/>{" "}
                          <label htmlFor="foodUnit" className="form-label">
                            Unit
                          </label>
                          <select
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            id="foodUnit"
                            name="foodUnit"
                            onChange={handleChange}
                          >
                            <option value="0">Select Unit</option>
                            {unitList &&
                              unitList.map((val, index) => {
                                return (
                                  <option value={val.unitId}>
                                    {val.unitName}
                                  </option>
                                );
                              })}
                          </select>
                          <small
                            id="errUnit"
                            className="form-text text-danger"
                            style={{ display: "none" }}
                          ></small>
                        </div>

                        {/* <div className="mb-2 me-2">
                      <img src={unitIcon} className='icnn'/> <label htmlFor="Unit" className="form-label">Unit</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='unit' name='unit' onChange={handleChange} >
                        <option value="0">Select Unit</option> {unitList && unitList.map((val, index) => { return (<option value={val.unitId}>{val.unitName}</option>) })}
                        </select>
                        <small id='errUnit' className='form-text text-danger' style={{display:'none'}}></small>
                      </div> */}

                        <div className="mb-2 ">
                          <label htmlFor="Unit" className="form-label">
                            &nbsp;
                          </label>
                          {showUnderProcess === 1 ? (
                            <>
                              <TosterUnderProcess />{" "}
                            </>
                          ) : showToster === 1 ? (
                            <Toster
                              value={tosterValue}
                              message={tosterMessage}
                            />
                          ) : (
                            <div className="diet-btn">
                              {updateBool === 0 ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-save btn-save-fill btn-sm"
                                    onClick={SaveRecipeMasterClick}
                                  >
                                    <img src={save} className="icnn" alt=""/> Save{" "}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-save btn-sm btnbluehover"
                                    onClick={() => clear(1)}
                                  >
                                    <img src={reset} className="icnn" alt=""/> Reset
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-save btn-sm mb-1 me-1"
                                    onClick={saveUpdate}
                                  >
                                    Update
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-clear btn-sm mb-1"
                                    onClick={() => {
                                      clear(1);
                                      setUpdateBool(1);
                                      
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}

                              {/* <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={transfer} className='icnn'/> Transfer Recipe</button> */}
                            </div>
                          )}
                        </div>
                      </BoxContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-2">
              <div className="listdetailsct">
                <div className="listdetailsct-in">
                  <div className="listd-in showing">
                    {/* Showing 1-10 of 250 entries */}
                    Recipe List
                  </div>
                </div>
                <div className="listdetailsct-in">
                  <div className="listd-in">
                    <form className="d-flex ms-auto ser" role="search">
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search.."
                      />
                      <i className="fa fa-search"></i>
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
                      <th>Dish/Food</th>
                      <th style={{ width: "10%" }} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recipeMainFoodList &&
                      recipeMainFoodList.map((val, ind) => {
                        return (
                          <tr key={val.id}>
                            <td className="text-center">{ind + 1}</td>
                            <td>{val.foodName}</td>
                            {/* <td>{val.dischargeType}</td> */}
                            <td>
                              <div className="action-button">
                                {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUptxtDate(val.id, val.headName, val.imageURL, val.userId) }}></i></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                              </div> */}

                                {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"
                                >
                                  <span
                                    className="btnbg"
                                    style={{ background: "#FFEDD2" }}
                                    onClick={() => {
                                      handleUpdate(val);
                                    }}
                                  >
                                    <img src={editbtn} className="icnn" />
                                  </span>
                                </div> */}
                                 <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(val) }}><img src={IconEdit} alt='' /></div>
                                {/* <div data-bs-toggle="tooltip" data-bs-title="Delete Row" data-bs-placement="bottom"><span className='btnbg'  style={{ background: "#FFEFEF" }}><img src={delbtn} className='icnn'/></span></div> */}
                                <div
                                  data-bs-toggle="modal"
                                  data-bs-title="Delete Row"
                                  data-bs-placement="bottom"
                                  data-bs-target="#deleteModal"
                                >
                                  <img
                                    src={IconDelete}
                                    onClick={() => {
                                      handleDelete(val);
                                    }}
                                    alt=""
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </TableContainer>
                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                <div
                  className="modal fade"
                  id="deleteModal"
                  tabIndex="-1"
                  aria-labelledby="deleteModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modalDelete">
                    <div className="modal-content">
                      <div className="modal-body modelbdy text-center">
                        <div className="popDeleteIcon">
                          <i className="fa fa-trash"></i>
                        </div>
                        <div className="popDeleteTitle mt-3"> Delete?</div>
                        <div className="popDeleteContent">
                          {" "}
                          Are you sure you want to delete?
                        </div>
                      </div>
                      <div className="modal-footer1 text-center">
                        <button
                          type="button"
                          className="btncancel popBtnCancel me-2"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn-delete popBtnDelete"
                          onClick={handleDeleteRow}
                          data-bs-dismiss="modal"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
