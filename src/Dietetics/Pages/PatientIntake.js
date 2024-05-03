import React, { useEffect, useState } from "react";
import Heading from "../../Component/Heading";
import BoxContainer from "../../Component/BoxContainer";
import TableContainer from "../../Component/TableContainer";

import save from "../../assets/images/icons/save.svg";
import reset from "../../assets/images/icons/reset.svg";
// import transfer from "../../assets/images/icons/transfer.svg";
// import del from "../../assets/images/icons/del.svg";

import AlertToster from "../../Component/AlertToster";
// import editbtn from "../../assets/images/icons/editbtn.svg";
// import delbtn from "../../assets/images/icons/delbtn.svg";
import SuccessToster from "../../Component/SuccessToster";
// import calender from "../../assets/images/icons/calender.svg";
// import clock from "../../assets/images/icons/clock.svg";
// import dish from "../../assets/images/icons/dish.svg";
// import quantity from "../../assets/images/icons/quantity.svg";
// import unitIcon from "../../assets/images/icons/unit.svg";

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
import deleteBtnIcon from "../../assets/images/icons/delete.svg"
import PatientTabs from "./PatientTabs";
import SaveAssignRTFeedForExternal from "../API/FoodIntake/SaveAssignRTFeedForExternal";
import SaveAssignOralFeedForExternal from "../API/FoodIntake/SaveAssignOralFeedForExternal";
import GetAssignOralFeedForExternal from "../API/FoodIntake/GetAssignOralFeedForExternal";
import GetAllStatus from "../API/FoodIntake/GetAllStatus";
import SaveAssignRTHoldForExternal from "../API/FoodIntake/SaveAssignRTHoldForExternal";
import GetTypesOfFeed from "../API/FoodIntake/GetTypesOfFeed";



export default function FoodIntake() {
  let [foodList, setFoodList] = useState();
  let [unitList, setUnitList] = useState();
  let [Feed, setTypesOfFeed] = useState();
  let [showMessage, setShowMeassage] = useState("");
  let [foodIntakeList, setFoodIntakeList] = useState([]);
  let [foodIntakeListtemp, setFoodIntakeListtemp] = useState([]);
  let [txtDate, settxtDate] = useState();

  let [time, setTime] = useState('');
  let [Quantity, setQuantity] = useState('');
  let [food, setFood] = useState();
  let [unit, setUnit] = useState();
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [clearDropdown, setClearDropdown] = useState(0);
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [txtDateSp, settxtDateSp] = useState();
  let [showLoder, setShowLoder] = useState(0);
  let [timeSp, setTimeSp] = useState('');
  let [supplementData, setSupplementData] = useState();
  let [supplementDataList, setsupplementDataList] = useState([]);
  let [supplementList, setsupplementList] = useState([]);
  let [supplimentName, setsupplimentName] = useState();
  let [unitListSp, setUnitListSp] = useState();
  let [AllStatus, setAllStatus] = useState();
  let [qty, setQty] = useState("");
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  let [unitSp, setunitSp] = useState();
  let [showUnderProcessSp, setShowUnderProcessSp] = useState(0);
  let [showTosterSp, setShowTosterSp] = useState(0)
  let [tosterMessageSp, setTosterMessageSp] = useState("")
  let [tosterValueSp, setTosterValueSp] = useState(0)
  const [AssignOralFeedExternal, setAssignOralFeedExternal] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  let [clearDropdownSp, setClearDropdownSp] = useState(0)
  const [selectedOption, setSelectedOption] = useState('');
  let [Remarkname, serRemarkname] = useState('');
  let [Duration, setDuration] = useState('');
  let [showSuccessToster, setShowSuccessToster] = useState(0)
  let [rowID, setRowID] = useState([]);
  let [getclientId, setClientId] = useState(JSON.parse(sessionStorage.getItem("LoginData")).clientId);

  // State to manage selected radio button
  const [OralFeed, setOralFeed] = useState(true);
  const [OralFeeds, setOralFeeds] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [RTFeed, setRTFeed] = useState(false);
  const [RTHold, setRTHold] = useState(false);


  const handleOnChange = (e) => {
    const { value, name } = e.target
    setSelectedOption(e.target.value);
    setOralFeeds(!OralFeed);
    setSelectedOptions('OralFeed');
    document.getElementById('selectremark').style.display = "none";
    document.getElementById('Duration_in_Hours').style.display = "none";
    document.getElementById('errAspirationType').style.display = 'none';
    document.getElementById('selectremark').style.display = "none";
    document.getElementById('Duration_in_Hours').style.display = "none";


    if (name === "OralFeed") {

      setOralFeed(true);
      setRTFeed(false)
      setRTHold(false)


    }
    if (name === "RTFeed") {
      setOralFeed(false);
      setRTFeed(true)
      setRTHold(false)



    }
    if (name === "RTHold") {




      setOralFeed(false);
      setRTFeed(false)
      setRTHold(true)
      document.getElementById('selectremark').style.display = "block";
      document.getElementById('Duration_in_Hours').style.display = "block";




    }

  };
  let HandleRemark = (e) => {
    const newValu = e.target.value;
    serRemarkname(newValu)

  }
  let HandleDuration = (e) => {
    const newValu = e.target.value;
    setDuration(newValu)

  }
  const handleChang = (event) => {
    const newValue = event.target.value;
    // const name = event.target.name;
    setSelectedValue(newValue);

    document.getElementById('errAspirationType').style.display = 'none';
    document.getElementById('errAspirationType').style.display = 'none';
    // Additional logic if needed based on the selected value
  };

  // const handleOptionChange = (event) => {
  //   setSelectedOption(event.target.value);
  // }; 
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);


  // const handleOnChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
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
    let uhid = window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    //let uhid = 'UHID00608';
    let entryType = "N";
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

  let getData = async (value) => {
    let unitList = await GetUnitList(value);
    console.log("cdcsd", unitList);
    if (unitList.status === 1) {
      console.log("uni", unitList);
      setUnitList(unitList.responseValue);
    }
  }
  let TypesOfFeed = async () => {
    let TypesOfFeed = await GetTypesOfFeed();
    console.log("type Of feed", TypesOfFeed);
    if (TypesOfFeed.status === 1) {
      console.log("uni", TypesOfFeed);
      setTypesOfFeed(TypesOfFeed.responseValue);
    }
  }


  /////////////Unit List by SupplementName 
  let GetStatus = async (val) => {
    let getUnitData = await GetAllStatus()
    if (getUnitData.status === 1) {
      console.log('uul', getUnitData);
      setAllStatus(getUnitData.responseValue);
    }
  }
  ////// Dropdown Supplement List

  // Function to update the current time
  const updateCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    setTime(formattedTime);
    setTimeSp(formattedTime);
  };

  let handleChange = (e) => {
    clearError(1);
    let value = e.target.value
    let name = e.target.name
    if (name === "txtDate") {
      settxtDate(value)
      getFoodIntakeList(value);
      // console.log('txtDateee', value);
    }
    else if (name === "time") {
      setTime(e.target.value)
    }
    else if (name === "quantity") {
      setQuantity(value);
    }
    else if (name === "unit") {
      setUnit(value);
    }
  }
  let clear = (value) => {
    console.log('clear invoked:')

    setSendForm({
      supplimentName: '',
      quantity: '',
      unitSp: '',
    })

    // getDate();
    setQuantity('');
    setQty("");
    // setTime(0);
    setClearDropdown(value);
    setClearDropdownSp(value);

    document.getElementById("time").value = "";
    document.getElementById("unit").value = 0;
    document.getElementById("unitSp").value = 0;
    document.getElementById("errDate").style.display = "none";
    document.getElementById("errTime").style.display = "none";
    document.getElementById("errFood").style.display = "none";
    document.getElementById("errQuantity").style.display = "none";
    document.getElementById("errUnit").style.display = "none";

    //clear supplement error
    document.getElementById('errTimeSp').style.display = "none";
    document.getElementById('errDateSp').style.display = "none";
    document.getElementById('errQuantitySp').style.display = "none";
    document.getElementById('errSupplementSp').style.display = "none";
    document.getElementById('errUnitSp').style.display = "none";
  };
  let clearError = async () => {
    document.getElementById("errDate").style.display = "none";
    document.getElementById("errTime").style.display = "none";
    document.getElementById("errFood").style.display = "none";
    document.getElementById("errQuantity").style.display = "none";
    document.getElementById("errUnit").style.display = "none";
  };


  let handleChangeSp = (e) => {
    document.getElementById('errTimeSp').style.display = "none";
    document.getElementById('errDateSp').style.display = "none";
    document.getElementById('errQuantitySp').style.display = "none";
    document.getElementById('errSupplementSp').style.display = "none";
    document.getElementById('errUnitSp').style.display = "none";
    let name = e.target.name;
    let value = e.target.value;
    console.log("enter", name)

    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
    if (name === "txtDateSp") {
      settxtDateSp(value)
      getAllSupplementList(value);
    }
    if (name === "quantity") {
      setQty(value);
    }
    if (name === "timeSp") {
      setTimeSp(e.target.value)
    }
    if (name === "supplimentName") {
      getUnit(value)
    }

    else if (name === "supplimentName") {
      setsupplimentName(value)

    }
    console.log('sendForm', sendForm);
  }

  let handleChangeDropdown = (e) => {
    clearError();
    let value = e.target.value;
    let name = e.target.name;
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
    document.getElementById("txtDateSp").value = today;
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
        userID: userID,
        uhid: window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid, recommendedUserID: window.userId,
      };
      console.log(foodObj, "faiz");
      // return;
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


  //saveinoral feed
  // SAVE FOOD INTAKE

  const SaveAssignOralFeed = async () => {
    // const OralFeed = e.target.value;
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
      + (currentdate.getMonth() + 1) + "-"
      + currentdate.getDate() + " "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
    if (OralFeed === true) {

      document.getElementById('selectremark').style.display = "none";
      document.getElementById('Duration_in_Hours').style.display = "none";
      console.log("oralfeed", OralFeed);

      let Obj = {
        OralFeed: OralFeed,
        fromDate: datetime,
        remark: Remarkname,
        // duration: Duration,
        rtFeedType: "Oral Feed",
        uhid: window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,
        userID: window.userId,
        clientID: getclientId,
        feedTypeId: 1
      };
      console.log(Obj, "amir");

      let data = await SaveAssignOralFeedForExternal(Obj);
      if (data.status === 1) {
        // setShowUnderProcess(0);
        // setTosterValue(0);
        setShowSuccessToster(1)
        clear(1);
        setShowMeassage("Data Saved Successfully!");
        handleClear();
        AssignOralFeedForExternal();
        getFoodIntakeList();
        setTimeout(() => {
          setShowToster(0);

        }, 2000)

      }
      else {
        setShowUnderProcess(0)
        setShowAlertToster(1);
        setShowMeassage(data.responseValue)
        setTosterValue(1)
        clear(1);
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }

    }



    if (RTFeed === true) {

      document.getElementById('selectremark').style.display = "none";
      document.getElementById('Duration_in_Hours').style.display = "none";
      console.log("RTFeed", RTFeed);

      let Obj = {

        // "uhid": "string",
        // "userId": 0,
        // "feedTypeId": 0,
        // "clientId": 0,
        // "rtFeedType": "string",
        // "fromDate": "2024-01-10T11:01:22.583Z",
        // "aspirationDateTime": "2024-01-10T11:01:22.583Z",
        // "remark": "string",
        // "aspirationName": "string",
        // "rtHoldTypeName": "string"
        uhid: window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,
        userID: window.userId,
        // duration: datetime,
        feedTypeId: 2,
        clientId: getclientId,
        rtFeedType: "RT Feed",
        fromDate: datetime,
        remark: Remarkname




      };
      console.log(Obj, "amir");
      let data = await SaveAssignRTFeedForExternal(Obj);
      if (data.status === 1) {
        // setShowUnderProcess(0);
        // setTosterValue(0);
        setShowSuccessToster(1)
        clear(1);
        setShowMeassage("Data Saved Successfully!");
        handleClear();
        AssignOralFeedForExternal();
        getFoodIntakeList();
        setTimeout(() => {
          setShowToster(0);

        }, 2000)

      }
      else {
        setShowUnderProcess(0)
        setShowAlertToster(1);
        setShowMeassage(data.responseValue)
        setTosterValue(1)
        clear(1);
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }

    }

    if (RTHold === true) {


      document.getElementById('selectremark').style.display = "block";
      document.getElementById('Duration_in_Hours').style.display = "block";
      if (selectedValue === null || selectedValue === "") {
        document.getElementById('errAspirationType').innerHTML = 'Please Choose';
        document.getElementById('errAspirationType').style.display = 'block';
        return;
      }


      console.log("RTFeed", RTHold);

      let Obj = {


        uhid: window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,

        fromDate: datetime,
        aspirationDateTime: datetime,
        remark: Remarkname,
        rtFeedType: "RT Hold",
        duration: Duration,
        userId: window.userId,
        clientId: getclientId,
        feedTypeId: 3,
        aspirationName: selectedValue,
        rtHoldTypeName: "RT Hold"
      };
      console.log(Obj, "RT Hold amir");

      let data = await SaveAssignRTHoldForExternal(Obj);
      if (data.status === 1) {
        // setShowUnderProcess(0);
        // setTosterValue(0);
        setShowSuccessToster(1)

        clear(1);
        setShowMeassage("Data Saved Successfully!");
        document.getElementById('errAspirationType').style.display = 'none';
        handleClear();
        AssignOralFeedForExternal();
        getFoodIntakeList();
        setTimeout(() => {
          setShowToster(0);

        }, 2000)

      }
      else {
        setShowUnderProcess(0)
        setShowAlertToster(1);
        setShowMeassage(data.responseValue)
        setTosterValue(1)
        clear(1);
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }

    }

  };
  //   const saveFeedData = async (feedType, saveFunction) => {
  //     const uhid = window.sessionStorage.getItem("activeUHIDdiet") 
  //                  ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid 
  //                  : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;

  //     const obj = {
  //         fromDate: new Date().toISOString(),
  //         remark: "string",
  //         rtFeedType: feedType,
  //         uhid: uhid,
  //         userID: window.userId,
  //         clientID: getclientId
  //     };

  //     // try {
  //         const data = await saveFunction(obj);
  //         setShowUnderProcess(0);

  //         if (data.status === 1) {
  //             setTosterValue(0);
  //             setTosterMessage("Data Saved Successfully!");
  //             getFoodIntakeList();
  //         } else {
  //             setTosterValue(1);
  //             setTosterMessage(data.responseValue);
  //         }

  //         setShowToster(1);
  //         clear(1);
  //         setTimeout(() => {
  //             setShowToster(0);
  //         }, 2000);

  // };

  // const SaveAssignOralFeed = async () => {


  //     if (OralFeed === true) {
  //         console.log("OralFeed", OralFeed);
  //         await saveFeedData(OralFeed, SaveAssignOralFeedForExternal);
  //     } 

  // };






  // let SaveAssignOralFeedForExternal = async () => {
  //   // clearError();
  //   const txtGetDate = document.getElementById("txtDate").value;
  //   console.log("txtDate", txtGetDate);

  //     let Obj = {

  //       fromDate: Date().toISOString(),
  //       remark: "string",
  //       rtFeedType: "Oral Feed",
  //       uhid: window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,
  //       userID: window.userId,
  //       clientID: getclientId
  //     };
  //     console.log(Obj, "amir");
  //     let data = await SaveAssignOralFeedForExternal(Obj);
  //     if (data.status === 1) {
  //       setShowUnderProcess(0);
  //       setTosterValue(0); 
  //       setShowToster(1);
  //       clear(1);
  //       setTosterMessage("Data Saved Successfully!");
  //       getFoodIntakeList();
  //       setTimeout(() => {
  //         setShowToster(0);

  //       }, 2000)

  //     }
  //     else {
  //       setShowUnderProcess(0)
  //       setShowToster(1)
  //       setTosterMessage(data.responseValue)
  //       setTosterValue(1)
  //       clear(1);
  //       setTimeout(() => {
  //         setShowToster(0)
  //       }, 2000)
  //     }

  // };



  let getUnit = async (val) => {
    let getUnitData = await GetUnitListSP(val)
    if (getUnitData.status === 1) {
      setUnitListSp(getUnitData.responseValue);
    }
  }



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
    let searchValue = e.target.value;
    if (searchValue !== "") {
      let result = Search(supplementList, searchValue);
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

  let getSupplementList = async () => {

    let supplementList = await GetSupplementList()
    if (supplementList.status === 1) {
      setSupplementData(supplementList.responseValue);
    }
    console.log('supplementList', supplementList);
  }

  let getAllSupplementList = async (txtDate) => {
    const txtGetDate = document.getElementById("txtDate").value;
    //const txtGetDate= '2023-10-03';
    console.log('txtDate', txtGetDate);
    let uhid = window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
    //let uhid = 'UHID00608';
    let entryType = "N"
    let allSupplementList = await GetAllSupplementList(uhid, txtDate, entryType);
    if (allSupplementList.status === 1) {
      setsupplementList(allSupplementList.foodIntakeList)
      setsupplementDataList(allSupplementList.foodIntakeList);
    }
    else {
      setsupplementDataList([]); // Set empty array when no data is found
    }
    console.log('supplementList', allSupplementList);
  }

  let saveSupplement = async () => {

    document.getElementById('errTimeSp').style.display = "none";
    document.getElementById('errDateSp').style.display = "none";
    document.getElementById('errQuantitySp').style.display = "none";
    document.getElementById('errSupplementSp').style.display = "none";
    document.getElementById('errUnitSp').style.display = "none";

    // if (sendForm.timeSp === '' || sendForm.timeSp === null || sendForm.timeSp === undefined) {
    //   document.getElementById('errTimeSp').innerHTML = "Please Select Time";
    //   document.getElementById('errTimeSp').style.display = "block";
    //   return false;
    // }

    if (sendForm.supplimentName === '' || sendForm.supplimentName === null || sendForm.supplimentName === undefined) {
      document.getElementById('errSupplementSp').innerHTML = "Select Supplement";
      document.getElementById('errSupplementSp').style.display = "block";
      return false;
    }

    if (sendForm.quantity === '' || sendForm.quantity === null || sendForm.quantity === undefined) {
      document.getElementById('errQuantitySp').innerHTML = "Enter Quantity";
      document.getElementById('errQuantitySp').style.display = "block";
      return false;
    }


    if (sendForm.unitSp === '' || sendForm.unitSp === null || sendForm.unitSp === undefined || sendForm.unitSp === 0) {
      document.getElementById('errUnitSp').innerHTML = "Select Unit";
      document.getElementById('errUnitSp').style.display = "block";
      return false;
    }

    if (sendForm.txtDate === undefined) {
      let date = new Date()
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!
      var yyyy = date.getFullYear();
      sendForm.txtDate = yyyy + "-" + mm + "-" + dd;
    }
    var valResponse = {
      intakeDateTime: sendForm.txtDate + ' ' + timeSp,
      brandID: sendForm.supplimentName,
      doseStrength: parseInt(sendForm.quantity),
      doseUnitID: parseInt(sendForm.unitSp),
      entryType: "N",
      //uhid: JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).uhid,
      uhid: window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid,
      //uhid: 'UHID00608',
      userID: window.userId,
    }
    console.log('valResponse', valResponse);
    let data = await SaveSuppliment(valResponse);
    console.log("csd", data.status)
    if (data.status === 1) {
      let date = new Date()
      var dd = date.getDate();
      var mm = date.getMonth() + 1; //January is 0!
      var yyyy = date.getFullYear();
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
    let uhid = window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;
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

  let uhid = window.sessionStorage.getItem("activeUHIDdiet") ? JSON.parse(window.sessionStorage.getItem("activeUHIDdiet")).Uhid : JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid;




  let AssignOralFeedForExternal = async () => {
    let data = await GetAssignOralFeedForExternal(uhid, getclientId);
    if (data.status === 1) {

      setShowLoder(0);
      setAssignOralFeedExternal(data.responseValue[0]);
      console.log("RangeVitalTable", data.responseValue[0])
    }
  }
  const handleClear = () => {
    serRemarkname('')
    setSelectedValue('')
    setDuration('')


  }
  let PateintInTakenRttype=()=>{
    if (RTHold === true) {


      document.getElementById('selectremark').style.display = "block";
      document.getElementById('Duration_in_Hours').style.display = "block";

    }
    if (RTFeed === true) {


      document.getElementById('selectremark').style.display = "none";
      document.getElementById('Duration_in_Hours').style.display = "none";
    }
    if (OralFeed === true) {


      document.getElementById('selectremark').style.display = "none";
      document.getElementById('Duration_in_Hours').style.display = "none";

    }
  }

  useEffect(() => {


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    getFoodList();
    PateintInTakenRttype();
    GetStatus()

    // getFoodIntakeList();
    // settxtDateSp(yyyy + "-" + mm + "-" + dd)
    getFoodIntakeList(yyyy + "-" + mm + "-" + dd);
    updateCurrentTime();
    getDate();
    AssignOralFeedForExternal()
    getSupplementList();
    getAllSupplementList(yyyy + "-" + mm + "-" + dd);


    // const intervalId = setInterval(() => {
    //   const date = new Date();
    //   const formattedDateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    //   setCurrentDateTime(formattedDateTime);
    // }, 1000); 





    // Update every second

    // return () => clearInterval(intervalId);


  }, []);
  return (
    <>
      <div className="main-content pt-3 mt-5">
        <div className="container-fluid">
          <PatientTabs />
          <div className="row">

            <div className="col-12">
              <div className="fieldse">


                <button type="button" className="btn btn-save btn-save-fill btn-sm" data-bs-toggle="modal" data-bs-target="#myModal">
                  Pateint Intake Type
                </button>

              </div>
              </div>
              <div className="col-6">
              <div className="fieldsett-in">

                <div className="fieldsett">
                  <span className="fieldse"> Food Intake</span>

                  <BoxContainer>
                    <div className="mb-2 me-2">
                      {/* <img src={calender} className="icnn" />{" "} */}
                      <label htmlFor="txtDate" className="form-label">
                        Date
                        <span className="starMandatory">*</span>
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
                      {/* <img src={clock} className="icnn" />{" "} */}
                      <label htmlFor="time" className="form-label">
                        Time
                        <span className="starMandatory">*</span>
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
                      {/* <img src={dish} className="icnn" />{" "} */}
                      <label htmlFor="dish" className="form-label">
                        Food
                        <span className="starMandatory">*</span>
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
                      {/* <img src={quantity} className="icnn" />{" "} */}
                      <label htmlFor="Quantity" className="form-label">
                        Quantity
                        <span className="starMandatory">*</span>
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
                      {/* <img src={unitIcon} className="icnn" />{" "} */}
                      <label htmlFor="Unit" className="form-label">
                        Unit
                        <span className="starMandatory">*</span>
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
                    {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                      showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                        :
                        <div className='diet-btn'>
                          <button type="button" className="btn btn-save btn-save-fill btn-sm" onClick={saveFoodIntake}><img src={save} className='icnn' /> Save</button>
                          <button type="button" className="btn btn-save btn-sm btnbluehover" onClick={() => clear(1)}><img src={reset} className='icnn' /> Reset</button>
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
                    <form className="d-flex ms-auto ser" role="search">
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search.."
                        onChange={handleSearch}
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
                      {/* <img src={calender} className="icnn" />{" "} */}
                      <label htmlFor="txtDateSp" className="form-label">
                        Date
                        <span className="starMandatory">*</span>
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
                      {/* <img src={clock} className="icnn" />{" "} */}
                      <label htmlFor="time" className="form-label">
                        Time
                        <span className="starMandatory">*</span>
                      </label>
                      <input
                        type="time"
                        className="form-control form-control-sm"
                        id="timeSp"
                        name="timeSp"
                        value={timeSp}
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
                      {supplementData && <DropdownWithSearch defaulNname="Select Supplement" id="supplimentName" name="supplimentName" list={supplementData} valueName="supplimentId" displayName="supplimentName" editdata={""} clear={clearDropdownSp} getvalue={handleChangeSp} clearFun={clear} />}
                      <small id="errSupplementSp" className="form-text text-danger" style={{ display: 'none' }}></small>

                    </div>
                    <div className="mb-2 me-2">
                      {/* <img src={quantity} className='icnn' /> */}
                      <label htmlFor="Quantity" className="form-label">Quantity <span className="starMandatory">*</span></label>
                      <input type="number" className="form-control form-control-sm" id="quantity" name="quantity" value={qty} onChange={handleChangeSp}
                        placeholder="Enter Quantity" />
                      <small id="errQuantitySp" className="form-text text-danger" style={{ display: 'none' }}></small>

                    </div>
                    <div className="mb-2 me-2">
                      {/* <img src={unitIcon} className='icnn' />  */}
                      <label htmlFor="Unit" className="form-label">Unit <span className="starMandatory">*</span></label>
                      <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='unitSp' name='unitSp' onChange={handleChangeSp}>
                        <option value='0'>Select Unit</option>{" "}
                        {unitListSp && unitListSp.map((val, index) => {
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
                    {showUnderProcessSp === 1 ? <><TosterUnderProcess />  </> :
                      showTosterSp === 1 ? <Toster value={tosterValueSp} message={tosterMessageSp} />
                        :
                        <div className='diet-btn'>
                          <button type="button" className="btn btn-save btn-save-fill btn-sm" onClick={saveSupplement}><img src={save} className='icnn' /> Save</button>
                          <button type="button" className="btn btn-save btn-sm btnbluehover" onClick={() => { clear(1) }}><img src={reset} className='icnn' /> Reset</button>
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

                    <form className="d-flex ms-auto ser" role="search">
                      <input
                        type="search"
                        className="form-control form-control-sm"
                        placeholder="Search.."
                        onChange={handleSearchSp}
                      />

                      <i className="fa fa-search"></i>
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
                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(val.medicationId); }} />
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

          <div className="modal" id="myModal">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">

                {/* <!-- Modal Header --> */}
                <div className="modal-header">
                  <h4 className="modal-title" style={{ "color": "#FFF" }}>Pateint Intake Type</h4>

                  <button type="button" style={{ "color": "var(--primary-bg-btn-color)", "background": " #fff", "height": "30px", "width": "30px", "border-radius": "18px" }} data-bs-dismiss="modal"><span style={{ "color": "color: var(--primary-bg-btn-color);" }} >X</span></button>
                </div>

                {/* <!-- Modal body --> */}
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4">

                      <div className="form-check-inline" style={{ "marginRight": "-6px" }}>
                        <input
                          id="OralFeed"

                          type="radio"
                          className="form-check-input me-1"
                          name="OralFeed"
                          value="OralFeed"
                          checked={OralFeed}
                          style={{ "opacity": "0" }}

                          onChange={handleOnChange}
                        />
                        <label className={`form-check-label ${selectedOption === 'OralFeed' ? 'btn-save-fill btn-sm' : ''}`} htmlFor="OralFeed" style={{ "border": "1px solid var(--primary-bg-btn-color)", "padding": "6px 9px", "borderRadius": "24px", "cursor": "pointer", "fontSize": "13px", "backgroundColor": OralFeed ? "var(--primary-bg-btn-color)" : "", "color": OralFeed ? "white" : "" }}>
                          Oral Feed
                        </label>
                      </div>
                      <div className="form-check-inline" style={{ "marginRight": "-6px" }}>
                        <input
                          id="RTFeed"
                          type="radio"
                          className="form-check-input me-1"
                          name="RTFeed"
                          value="RTFeed"
                          checked={RTFeed}
                          style={{ "opacity": "0" }}
                          onChange={handleOnChange}
                        />
                        <label className={`form-check-label ${selectedOption === 'RTFeed' ? 'btn-save-fill btn-sm' : ''}`} htmlFor="RTFeed" style={{ "border": "1px solid var(--primary-bg-btn-color)", "padding": "6px 9px", "borderRadius": "24px", "cursor": "pointer", "fontSize": "13px" }}>
                          RT Feed
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          id="RTHold"
                          type="radio"
                          className="form-check-input me-1"
                          name="RTHold"
                          value="RTHold"
                          checked={RTHold}
                          style={{ "opacity": "0" }}
                          onChange={handleOnChange}
                        />
                        <label className={`form-check-label ${selectedOption === 'RTHold' ? 'btn-save-fill btn-sm' : ''}`} htmlFor="RTHold" style={{ "border": "1px solid var(--primary-bg-btn-color)", "padding": "6px 9px", "borderRadius": "24px", "cursor": "pointer", "fontSize": "13px" }}>
                          RT Hold
                        </label>
                      </div>

                    </div>
                    {/* <button type="submit" className="btn btn-primary">
      Save
      </button> */}
                    {/* <div className="col-md-2">
  
                    
                      <input type="number" className="form-control form-control-sm" id="quantity" name="quantity" value={qty} 
                        placeholder="Duration in hours" />
                      <small id="errQuantitySp" className="form-text text-danger" style={{ display: 'none' }}></small>

             
                    </div> */}
                    <div className="col-md-2">

                      {/* <label htmlFor="Quantity" className="form-label">Quantity <span className="starMandatory">*</span></label> */}
                      <input type="text" className="form-control form-control-sm" id="NameRemark" name="Remarkname"
                        value={Remarkname} placeholder="Remark" onChange={HandleRemark} />
                      <small id="errQuantitySp" className="form-text text-danger" style={{ display: 'none' }}></small>


                    </div>


                    <div className="col-md-2" id="Duration_in_Hours">

                      {/* <label htmlFor="Quantity" className="form-label">Quantity <span className="starMandatory">*</span></label> */}
                      <input type="number" className="form-control form-control-sm" id="Duration" name="Duration"
                        value={Duration} placeholder="Duration in Hours" onChange={HandleDuration} />
                      <small id="errQuantitySp" className="form-text text-danger" style={{ display: 'none' }}></small>


                    </div>
                    <div className="col-md-2" style={{ "display": "none" }} id="selectremark" >
                      {/* <img src={unitIcon} className='icnn' /> <label htmlFor="Unit" className="form-label">Unit <span className="starMandatory">*</span></label> */}
                      <select className="form-select form-select-sm" aria-label=".form-select-sm example" id='selectedValue' name='selectedValue' value={selectedValue}
                        onChange={handleChang}>
                        <option value='0'>Select </option>{" "}
                        {AllStatus && AllStatus.map((val, index) => {
                          return (
                            <option value={val.remark}>{val.remark}</option>
                          );
                        })}
                      </select>
                      <small id="errAspirationType" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-md-1">
                      <button type="button" className="btn btn-save btn-save-fill btn-sm" onClick={SaveAssignOralFeed}> Save</button>
                    </div>

                  </div>



                  <div className="col-12 mt-3">
                    <div className="med-table-section" style={{ "height": "33vh", zIndex: 0 }}>
                      <table className="med-table border  striped">


                        <thead style={{ zIndex: '0' }}>
                          <tr>
                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                            <th>RT Type</th>
                            <th>From Date</th>
                            <th>To Date</th>

                            <th>Remark</th>
                            {/* <th>Duration</th> */}
                            <th>

                              <table style={{ width: '100%' }}>
                                <tr>
                                  <th colSpan={5} className="text-center"> Aspiration Details</th>
                                </tr>
                                <tr>
                                  <th style={{ width: '20%' }}>RT Hold Name</th>
                                  <th style={{ width: '20%' }}>DateTime</th>
                                  <th style={{ width: '20%' }}>Name</th>
                                  <th style={{ width: '20%' }}>Remark</th>
                                  <th style={{ width: '20%' }}>Duration</th>
                                </tr>
                              </table>
                            </th>

                          </tr>
                        </thead>





                        <tbody>



                          {AssignOralFeedExternal && AssignOralFeedExternal.map((data, index) => {


                            const aspirations = data.aspirationType ? JSON.parse(data.aspirationType) : [];
                            const aspirationNames = aspirations.map(aspiration => aspiration.aspirationName).join(', ');
                            const aspirationRemark = aspirations.map(aspiration => aspiration.remark).join(', ');
                            const RTHoldTypeName = aspirations.map(aspiration => aspiration.RTHoldTypeName).join(', ');
                            const AspirationDateTime = aspirations.map(aspiration => aspiration.AspirationDateTime).join(', ');
                            const duration = aspirations.map(aspiration => aspiration.duration).join(', ');
                            // const isNumAspiration = aspirations.some(aspiration => aspiration.type === 'num');
                            // const isNumAspiration = aspirations.some(aspiration => aspiration === 'num');



                            return (
                              <tr key={index}>
                                <td className="text-center">{index + 1}</td>
                                <td>{data.rtFeedType}</td>
                                {/* <td>{data.fromDate}</td> */}
                                <td>{data.fromDate !== null?data.fromDate.split("T")[0] +" "+data.fromDate.split("T")[1].split(":")[0]+":"+data.fromDate.split("T")[1].split(":")[1]:"-"}</td>
                                {/* 
                                <td>{data.toDate}</td> */}


                                {/* Format toDate */}
                                <td>{data.toDate !== null?data.toDate.split("T")[0] +" "+data.toDate.split("T")[1].split(":")[0]+":"+data.toDate.split("T")[1].split(":")[1]:"-"}</td>

                                <td>{data.remark}</td>
                                {/* <td>{data.remark}</td> */}
                                <td>
                                  {/* <table style={{width:'100%'}}> 
                                  {(!aspirations || aspirations.length !== 0) && (
                                    
                                     <tr >    
                                     <td style={{width:'20%'}}>{RTHoldTypeName}</td>
                                     <td style={{width:'20%'}}>{AspirationDateTime}</td>
                                     <td style={{width:'20%'}}>{aspirationNames}</td>
                                     <td style={{width:'20%'}}>{aspirationRemark}</td> 
                                     <td style={{width:'20%'}}>{duration}</td> 
                                   </tr> 
                                        
                                      )}      
                                                      
                                  </table> */}



                                  <table style={{ width: '100%' }}>
                                    {(!aspirations || aspirations.length !== 0) && (
                                      aspirations.map((aspiration, index) => (
                                        <tr key={index}>
                                          <td style={{ width: '20%' }}>{aspiration.RTHoldTypeName}</td>
                                          <td style={{ width: '20%' }}>{aspiration.AspirationDateTime}</td>
                                          <td style={{ width: '20%' }}>{aspiration.aspirationName}</td>
                                          <td style={{ width: '20%' }}>{aspiration.remark}</td>
                                          <td style={{ width: '20%' }}>{aspiration.duration}</td>
                                        </tr>
                                      ))
                                    )}
                                  </table>


                                  {/* {aspirationNames} */}
                                </td>


                              </tr>
                            )
                          })}
                        </tbody>
                        {showAlertToster === 1 ? (
                          <AlertToster message={showMessage} handle={setShowAlertToster} />
                        ) : (
                          ""
                        )}
                        {showSuccessToster === 1 ? (
                          <SuccessToster
                            message={showMessage}
                            handle={setShowSuccessToster}
                          />
                        ) : (
                          ""
                        )}
                      </table>
                    </div>
                  </div>




                </div>

                {/* <!-- Modal footer --> */}


              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}