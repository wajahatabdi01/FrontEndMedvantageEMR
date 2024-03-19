import React, { useEffect, useState } from 'react'
// import editbtn from '../../../../../assets/images/icons/editbtn.svg'
// import delbtn from '../../../../../assets/images/icons/delbtn.svg'
import savewhite from '../../../../../assets/images/icons/save.svg'
import reset from '../../../../../assets/images/icons/reset.svg'
// import transfer from '../../../../../assets/images/icons/transfer.svg'
// import del from '../../../../../assets/images/icons/del.svg'
import calender from '../../../../../assets/images/icons/calender.svg'
import clock from '../../../../../assets/images/icons/clock.svg'
import dish from '../../../../../assets/images/icons/dish.svg'
import quantity1 from '../../../../../assets/images/icons/quantity.svg'
import unitIcon from '../../../../../assets/images/icons/unit.svg'
import BoxContainer from '../../../../../Components/BoxContainer'
import TableContainer from '../../../../../Components/TableContainer'
import GetFoodList from '../../../../Api/IPD/FoodInrakeIPD/GetFoodList'
import GetUnitList from '../../../../Api/IPD/FoodInrakeIPD/GetUnitList'
// import FoodIntakeValidation from '../../../../../Validations/IPD/FoodIntakeValidation'
// import PostFoodIntake from '../../../../Api/IPD/FoodInrakeIPD/PostFoodIntake'
import TosterUnderProcess from '../../../../../Components/TosterUnderProcess';
import Toster from '../../../../../Components/Toster';
// import GetIntakeList from '../../../../Api/IPD/FoodInrakeIPD/GetIntakeList'
import GetFoodIntakeList from '../../../../../Dietetics/API/FoodIntake/GetFoodIntakeList'
import DieteticsFoodIntakeValidation from '../../../../../Dietetics/API/FoodIntake/DieteticsFoodIntakeValidation'
import SaveFoodIntake from '../../../../../Dietetics/API/FoodIntake/SaveFoodIntake'
import DropdownWithSearch from '../../../../../Components/DropdownWithSearch'
import Search from '../../../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function FoodIntakeIPD() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir()
    let [foodList, setFoodList] = useState([]);
    let [unitList, setUnitList] = useState([]);
    let [foodIntakeList, setFoodIntakeList] = useState([]);
    let [foodIntakeListtemp, setFoodIntakeListtemp] = useState([]);
    let [txtDate, settxtDate] = useState();
    let [time, setTime] = useState();
    let [Quantity, setQuantity] = useState();
    let [food, setFood] =useState();
    let [unit, setUnit] =useState();
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    // let [showMessage, setShowMessage] = useState(0);
    // let [showAlertToster, setShowAlertToster] = useState(0);
    let [clearDropdown, setClearDropdown] = useState(0)

    let getDate=()=>{
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
    
      if(dd<10) {
          dd = '0'+dd
      } 
    
      if(mm<10) {
          mm = '0'+mm
      } 
    
      today = yyyy + '-' + mm + '-' + dd;
     
     document.getElementById("txtDate").value = today;
    }
    let handleChangeDropdown = (e)=>{
      clearError();
      let value = e.target.value 
      // let name = e.target.name
      getData(value)
      setFood(value);
  
    }
    let getFoodList = async () => {
        let data = await GetFoodList();
        setFoodList(data.responseValue);
        
      }

      // let handleChange = (e) => {

      //   if (e.target.name === 'textDate') {
      //     setDate(e.target.value);
      //   }
      //   if (e.target.name === 'textTime') {
      //     setTime(e.target.value);
      //   }
      //   if (e.target.name === 'quantity') {
      //     setQuantity(e.target.value);
      //   }

      // }  
      let clearError =async()=>{
        document.getElementById('errDate').style.display='none';
        document.getElementById('errTime').style.display='none';
        document.getElementById('errFood').style.display='none';
        document.getElementById('errQuantity').style.display='none';
        document.getElementById('errUnit').style.display='none';
      }
      let handleChange = (e)=>{
        clearError();
        let value = e.target.value 
        let name = e.target.name
       if(name === "txtDate"){
        settxtDate(value)
        getFoodIntakeList(value);
    
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
        setQuantity('');
        setTime(0);
        setClearDropdown(value)
        // setFood(0);
        document.getElementById('time').value='';
         document.getElementById('unit').value = 0;
        //  document.getElementById('foodList').value = 0;
        //  document.getElementById('foodName').value = 0;
        // document.getElementById('ddlUnitList').value = 0;
     
      }

      let getData = async(value)=>{
        let unitList = await GetUnitList(value);
        
        if(unitList.status === 1)
        {
         
          setUnitList(unitList.responseValue);
        }
      }
  // let getAllIntake = async() => 
  // {
  //   let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
  //   const currentDate = new Date();
  //   const currentFormattedDate = currentDate.toISOString();
  //   let fromDate = currentFormattedDate;
  //   let data = await GetIntakeList(uhid,fromDate);
  //   setAllIntakeList(data.foodIntakeList);
    
  // }

  let getFoodIntakeList = async(txtDate)=>{
    const txtGetDate=document.getElementById("txtDate").value;
    let uhid = JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    let foodIntakeList = await GetFoodIntakeList(uhid,txtGetDate);
    if (foodIntakeList.status === 1){
   
      setFoodIntakeList (foodIntakeList.foodIntakeList);
      setFoodIntakeListtemp (foodIntakeList.foodIntakeList);
    }
  }
    useEffect(() => {
        getFoodList();
        getFoodIntakeList();
        getDate();
    },[])

    let save = async () => {
      clearError();
      const txtGetDate=document.getElementById("txtDate").value;
      
      //for validation
      const isValidateFood= DieteticsFoodIntakeValidation(txtGetDate,time,food,Quantity,unit);
      
      var id = isValidateFood[1];
      if(isValidateFood===true){
        let foodObj ={
          givenFoodDate: txtGetDate+ ' ' +time,
          givenFoodQuantity:Quantity,
          foodId:food,
           givenFoodUnitID:unit,
           uhid:JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,
           recommendedUserID:window.userId,
        }
        
        let data = await SaveFoodIntake(foodObj);
        if (data.status === 1) {
           setShowUnderProcess(0);
          setTosterValue(0);//0 for save and warning 1 for Error
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
          clear();
            setTimeout(() => {
             setShowToster(0)
           }, 2000)
        }
      }
      else {
        document.getElementById(id).style.display='block';
        document.getElementById(id).innerHTML=isValidateFood[0];
      }
      }
      let handleSearch = (e) => {
        let searchValue=e.target.value;
        if (searchValue !== "") {
          let result = Search(foodIntakeList,searchValue);
          if (result.length !== 0) {
            setFoodIntakeListtemp(result);
          }
          // else {
          //     setPatientListTemp(patientList)
          // }
        } else {
          setFoodIntakeListtemp(foodIntakeList);
        }
      };

  return (
    <>
     
        <div className="container-fluid">
          <div className="row">
            
            

            <div className="col-12">
              
              <div className="fieldsett-in">
                 <div className="fieldsett">
                   <span className='fieldse'>{t("Food Intake")}</span>
                    <BoxContainer>
                    <div className="mb-2 me-2">
                      <img src={calender} className='icnn' alt=''/> <label htmlFor="txtDate" className="form-label">{t("DATE")}</label>
                        <input type="date"  value={txtDate} className="form-control form-control-sm" id="txtDate" name="txtDate" placeholder={t("Enter Date")} onChange={handleChange}/>
                        <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div>
                      {/* <div className="mb-2 col-md-2 me-2">
                      <img src={calender} className='icnn'/> <label htmlFor="Date" className="form-label">Date</label>
                        <input type="date" className="form-control form-control-sm"  id="textDate" name="textDate" onChange={handleChange} value={textDate} placeholder="Enter Date" />
                        <small id='errDate' className='form-text text-danger' style={{ display: 'none' }}></small>
                      </div> */}
                      <div className="mb-2 me-2">
                      <img src={clock} className='icnn' alt=''/> <label htmlFor="time" className="form-label">{t("TIME")}</label>
                        <input type="time" className="form-control form-control-sm" id="time" name="time" placeholder={t("Enter Time")} onChange={handleChange}/>
                        <small id='errTime' className='form-text text-danger' style={{display:'none'}}></small>
                      </div>
                      <div className="mb-2 me-2">
                      <img src={dish} className='icnn' alt=''/> <label htmlFor="dish" className="form-label">{t("Food")}</label>
                      
                        {foodList && <DropdownWithSearch defaulNname={t("Select Food")} name="foodName" id="foodName" list={foodList} valueName="id" displayName="foodName"  getvalue={handleChangeDropdown} editdata={""} clear={clearDropdown} clearFun={clear}/>
                        }
                        <small id='errFood' className='form-text text-danger' style={{display:'none'}}></small>
                      </div>             
                      <div className="mb-2 me-2">
                      <img src={quantity1} className='icnn' alt=''/> <label htmlFor="Quantity" className="form-label" >{t("Quantity")}</label>
                        <input type="text" className="form-control form-control-sm" id="quantity" name="quantity" value={Quantity} onChange={handleChange} placeholder={t("Enter Quantity")} />
                        <small id='errQuantity' className='form-text text-danger' style={{display:'none'}}></small>
                      </div>  
                      <div className="mb-2 me-2">
                      <img src={unitIcon} className='icnn' alt=''/> <label htmlFor="Unit" className="form-label">{t("Unit")}</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='unit' name='unit' onChange={handleChange} >
                        <option value="0">{t("Select Unit")}</option> {unitList && unitList.map((val, index) => { return (<option value={val.unitId}>{val.unitName}</option>) })}
                        </select>
                        <small id='errUnit' className='form-text text-danger' style={{display:'none'}}></small>
                      </div>
                      
                    </BoxContainer>
                 </div>
              </div>
              
              <div className="rt-btns">
                <BoxContainer>
                  <div className="mb-2 relative">
                    {/* <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label> */}
                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                      showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                        :
                        <div>
                          <>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={save}><img src={savewhite} className='icnn' alt=''/> {t("Save")}</button>
                            <button type="button" className="btn btn-save btn-sm btnbluehover mb-1 me-1" onClick={()=>{clear(1)}}><img src={reset} className='icnn' alt=''/> {t("Reset")}</button>
                          </> 
                           
                          
                        </div>
                    }

                  </div>
                </BoxContainer>
              </div>            
            </div>

            <div className="col-12 mt-2">
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                   {/* <div className='listd-in showing'>Showing 1-10 of 250 entries</div>  */}
                   <div className='listd-in showing'>{t("Food Intake List")}</div> 
                </div>
                <div className='listdetailsct-in'>
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
                        placeholder={t("Search")}
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
              
              <div className="med-table-section" style={{ "height": "50vh" }}>
                {/* <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>Food Name</th>
                      <th>Quantity</th>
                      <th>Date | Time</th>
                    
                     
                      <th style={{ "width": "10%" }} className="text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allIntakeList && allIntakeList.map((list, index) => {
                      return (
                        <tr>
                        <td className='' style={{paddingLeft:'7px',fontSize: '13px'}}>{index + 1}</td>
                     
                        
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.foodName}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.foodQty} {list.unitName}</span></td>
                          <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.foodEntryDate}</span></td>
                     
                        </tr>
                      )
                    })}



                  </tbody>
                </TableContainer> */}
                <TableContainer>
                <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Food")}</th>
                      <th>{t("Quantity")}</th>
                      <th>{t("Time")}</th>
                      {/* <th>Cooked By</th> */}
                      {/* <th>Sent By Mess</th> */}
                      {/* <th style={{ "width": "10%" }} className="text-center">Action</th> */}
                    </tr>
                  </thead>

                  <tbody>
                    {foodIntakeListtemp && foodIntakeListtemp.map((val, ind) => {
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
                    })}

                  </tbody>
                </TableContainer>
              </div>

            </div>

          </div>
        </div>

    </>
  )
}
