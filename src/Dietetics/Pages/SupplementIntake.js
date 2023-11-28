import React,{useState,useEffect} from 'react'
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import TableContainer from '../../Component/TableContainer';

import editbtn from '../../assets/images/icons/editbtn.svg'
import delbtn from '../../assets/images/icons/delbtn.svg'
import save from '../../assets/images/icons/save.svg'
import reset from '../../assets/images/icons/reset.svg'
import transfer from '../../assets/images/icons/transfer.svg'
import del from '../../assets/images/icons/del.svg'

import calender from '../../assets/images/icons/calender.svg'
import clock from '../../assets/images/icons/clock.svg'
import dish from '../../assets/images/icons/dish.svg'
import quantity from '../../assets/images/icons/quantity.svg'
import unit from '../../assets/images/icons/unit.svg'
import suppliment from '../../assets/images/icons/suppliment.svg'
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import GetSupplementList from '../API/SupplementIntake/GetSupplementList';
import GetUnitList from '../API/SupplementIntake/GetUnitList';
import validationSupp from '../API/SupplementIntake/ValidationSupp';
import SaveSuppliment from '../API/SupplementIntake/SaveSuppliment';
import GetAllSupplementList from '../API/SupplementIntake/GetAllSupplementList';
import Toster from "../../Component/Toster";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Search from '../../Code/Serach';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import DeleteSupplement from '../API/SupplementIntake/DeleteSupplement';
import Loader from '../../Component/Loader';


export default function SupplementIntake() {
  let [sendForm, setSendForm]=useState({"userId": window.userId})
  let [txtDate, settxtDate] = useState();
  let [showLoder, setShowLoder] = useState(0);
  let [time, setTime] = useState();
  let [supplementData,setSupplementData]=useState();
  let [supplementDataList, setsupplementDataList] = useState([]);
  let [supplementList, setsupplementList] = useState([]);
  let [supplimentName, setsupplimentName] = useState();
  let [unitList,setUnitList]=useState();
  let [qty, setQty]=useState();
  let [unit, setunit]=useState();
  let [showUnderProcess,setShowUnderProcess]=useState(0);
  let [showToster,setShowToster]=useState(0)
  let [tosterMessage,setTosterMessage] = useState("")
  let [tosterValue,setTosterValue]= useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [rowID, setRowID] = useState([]);

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
 
  let handleChange =(e)=>{
    document.getElementById('errTime').style.display = "none";
    document.getElementById('errDate').style.display = "none";
    document.getElementById('errQuantity').style.display = "none";
    document.getElementById('errSupplement').style.display = "none";
    document.getElementById('errUnit').style.display = "none";
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
    else if(name === "txtDate"){
      settxtDate (value)
      getAllSupplementList(value);
     }
     else if(name === "supplimentName"){
      setsupplimentName (value)
      
     }
    console.log('sendForm',sendForm);
  }
  /////////////Unit List by SupplementName 
  let getUnit = async (val)=>{
    let getUnitData = await GetUnitList(val)
      if(getUnitData.status===1){
        console.log('uul', getUnitData);
        setUnitList(getUnitData.responseValue);
      }
  }
  ////// Dropdown Supplement List
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
    let uhid = JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid;
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

  let handleSearch = (e) => {
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

  let clear = (value) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    document.getElementById('errTime').style.display = "none";
    document.getElementById('errDate').style.display = "none";
    document.getElementById('errQuantity').style.display = "none";
    document.getElementById('errSupplement').style.display = "none";
    document.getElementById('errUnit').style.display = "none";
    settxtDate(yyyy + "-" + mm + "-" + dd);
    getAllSupplementList(yyyy + "-" + mm + "-" + dd);
    setsupplimentName('');
    setClearDropdown(value);
    document.getElementById('time').value='';
    document.getElementById('quantity').value='';
     document.getElementById('unit').value = 0;
 
  }
let saveSupplement = async()=>{

      document.getElementById('errTime').style.display = "none";
      document.getElementById('errDate').style.display = "none";
      document.getElementById('errQuantity').style.display = "none";
      document.getElementById('errSupplement').style.display = "none";
      document.getElementById('errUnit').style.display = "none";
  
      if (sendForm.time === '' || sendForm.time === null || sendForm.time === undefined) {
        document.getElementById('errTime').innerHTML = "Please Select Time";
        document.getElementById('errTime').style.display = "block";
        return false;
    }

    if (sendForm.supplimentName === '' || sendForm.supplimentName === null || sendForm.supplimentName === undefined) {
      document.getElementById('errSupplement').innerHTML = "Please Select Supplement";
      document.getElementById('errSupplement').style.display = "block";
      return false;
  }

  if (sendForm.quantity === '' || sendForm.quantity === null || sendForm.quantity === undefined) {
    document.getElementById('errQuantity').innerHTML = "Please Select Quantity";
    document.getElementById('errQuantity').style.display = "block";
    return false;
}
     

if (sendForm.unit === '' || sendForm.unit === null || sendForm.unit === undefined ||sendForm.unit === 0) {
  document.getElementById('errUnit').innerHTML = "Please Select Quantity";
  document.getElementById('errUnit').style.display = "block";
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
        intakeDateTime: sendForm.txtDate + ' ' + sendForm.time,
        brandID: sendForm.supplimentName,
        doseStrength: parseInt(sendForm.quantity),
        doseUnitID: parseInt(sendForm.unit),
        entryType: "D",
        uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
        //uhid: 'UHID00608',
        userID: window.userId,
    }
    console.log('valResponse',valResponse);
    let data = await SaveSuppliment(valResponse);
    console.log("csd", data.status)
    if (data.status === 1) {
      let date = new Date()
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!
      var yyyy = date.getFullYear();
       setShowUnderProcess(0);
       setTosterValue(0);
       setShowToster(1);
       setTosterMessage("Data Save Successfully!");
       setTimeout(() => {
           setShowToster(0);
           clear(1);
           getAllSupplementList(yyyy + "-" + mm + "-" + dd);

       }, 2000)
   }
   else {
       setShowUnderProcess(0)
       setShowToster(1)
       setTosterMessage(data.responseValue)
       setTosterValue(1)
       setTimeout(() => {
           setShowToster(0)
       }, 2000)
   }
}
let getRowID = (medicationId) => {
  setRowID(medicationId);
}
let deleteRow = async () => {
  console.log(rowID);
  setShowUnderProcess(1);
 //let  uhid = 'UHID00608';
 let uhid = JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid;
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

  useEffect(()=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    getDate();
    getSupplementList();
    getAllSupplementList(yyyy + "-" + mm + "-" + dd);
  },[]);
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            
            {/* <div className="col-12 mt-2">  
              <div className='selection'>
                  <div className='selection-in'>
                    <div className='selection-in-sec'>
                       <div className='nameage'>Riya Mishra<span className='ager'>28/M</span></div>
                       <div className='nameage'>UHID<span className='uhid'>2253275</span></div>
                       <div className='dell'><i className='fa fa-times'></i></div>
                    </div>
                  </div>
              </div>  
            </div> */}
            <div className="col-12">
              
              <div className="fieldsett-in">
                 <div className="fieldsett">
                   <span className='fieldse'>Recommended Supplement</span>
                    <BoxContainer>
                  
                    <div className="mb-2 me-2">
                      <img src={calender} className="icnn" />{" "}
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
                      <img src={clock} className="icnn" />{" "}
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
                      <div className="mb-2 me-2">
                          <label htmlFor="countryId" className="form-label">Supplement <span className="starMandatory">*</span></label>
                          {/* {countryList && <DropdownWithSearch defaulNname="Select Country" name="countryId" list={countryList} displayName="countryName" valueName="id" getvalue={handleChange} />} */}
                          {supplementData && <DropdownWithSearch defaulNname="Select Supplement" id="supplimentName" name="supplimentName" list={supplementData} valueName="supplimentId" displayName="supplimentName" editdata={""} clear={clearDropdown}  getvalue={handleChange} clearFun={clear}   />}
                          <small id="errSupplement" className="form-text text-danger" style={{ display: 'none' }}></small>

                      </div>
                      <div className="mb-2 me-2">
                      <img src={quantity} className='icnn'/> <label htmlFor="Quantity" className="form-label">Quantity</label>
                      <input type="number" className="form-control form-control-sm" id="quantity" name="quantity" value={qty} onChange={handleChange}
                        placeholder="Enter Quantity"/>
                        <small id="errQuantity" className="form-text text-danger" style={{ display: 'none' }}></small>

                      </div>
                      <div className="mb-2 me-2">
                      <img src={unit} className='icnn'/> <label htmlFor="Unit" className="form-label">Unit</label>
                        <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='unit' name='unit' onChange={handleChange}>
                          <option value='0'>Select Unit</option>{" "}
                          {unitList && unitList.map((val,index) => {
                            return (
                              <option value={val.unitID}>{val.unitName}</option>
                            );
                          })}
                        </select>
                        <small id="errUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                  <button type="button" className="btn btn-save btn-save-fill btn-sm" onClick={saveSupplement}><img src={save} className='icnn'/> Save</button>
                    <button type="button" className="btn btn-save btn-sm btnbluehover" onClick={()=>{clear(1)}}><img src={reset} className='icnn'/> Reset</button>
                    {/* <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={transfer} className='icnn'/> Repeat Last Day Food</button>
                    <button type="button" className="btn btn-save btn-sm btnbluehover"><img src={del} className='icnn'/> Delete All Food</button> */}
                      </div>
                    }
                  </div>
                </BoxContainer>
              </div>           
            </div>

            <div className="col-12 mt-2">
              <div className='listdetailsct'>
                <div className='listdetailsct-in'>
                   <div className='listd-in showing'>Recommended Supplement List</div> 
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
                        onChange={handleSearch}
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
    

      </section>

      
    </>
  )
}
