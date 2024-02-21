import React from "react";
import Heading from "../../Component/Heading";
import Page from "../../assets/images/icons/Page-1.svg";
import user3 from "../../assets/images/icons/user (3).svg";
import question from "../../assets/images/icons/question.svg";
import category from "../../assets/images/icons/category.svg";
import medicalAssistance from "../../assets/images/icons/medical-assistance.svg";
import medicalRoom from "../../assets/images/icons/medical-room.svg";
import imgDepartment from "../../assets/images/icons/imgDepartment.svg";
import imgBillNo from "../../assets/images/icons/imgBillNo.svg";
import imgReset from "../../assets/images/icons/reset.svg";
import imgPrint from "../../assets/images/icons/imgPrint.svg";
import imgDiscount from "../../assets/images/icons/discount.svg";
import imgPaymentMode from "../../assets/images/icons/imgPaymentMode.svg";
import imgCardNo from "../../assets/images/icons/imgCardNo.svg";
import imgBank from "../../assets/images/icons/imgBank.svg";
import imgCheque from "../../assets/images/icons/imgCheque.svg";
import imgRef from "../../assets/images/icons/imgRef.svg";
import imgBill from "../../assets/images/icons/imgBill.svg";
import imgCompany from "../../assets/images/icons/imgCompany.svg";
import saveButtonIcon from "../../assets/images/icons/saveButton.svg";
import PatientDetail from "../API/getPatientDetailByUhid";
import saveBillingDetails from "../API/saveBillingDetails";
import GetBankNameList from "../API/getBankNameList";
import getBillType from "../API/billType";
import getCompanyType from "../API/companyType";
import getItems from "../API/getItems";
import Search from "../../Code/Serach";
import { useState ,useRef} from "react";
import { useEffect } from "react";
import getAllTpaCompany from "../API/getAllTpaCompany";
import GerItemRateByCompany from "../API/GerItemRateByCompany";
import GetallPaymentMode from "../API/GetallPaymentMode";
import SuccessToster from "../../Component/SuccessToster";
import AlertToster from "../../Component/AlertToster";
import GetAllAdvanceDetails from "../API/GetAllAdvanceDetails";
import GetCreditLimitofPatient from "../API/GetCreditLimitofPatient";

export default function Billing() {
  
  let data = {
    itemId: 0,
    itemName: "",
    categoryName: "",
    itemCharge: 0,
    categoryId: "",
    itemQuantity: 0,
    discountRs: 0,
    discountPer: 0,
    totalAmount: 0,
    actualTotalAmount: 0,
    billMasterID: 0,
    billNo: "",
    billTypeId: 0,
    tpaCompanyID: '',
    tpaReferenceNo: "",
    totalDiscount: 0,
    uhid: 0,
  };


  let [UHID, setUHID] = useState('');
  let [pamentMode, setPaymentMode] = useState(0);
  let [patientDetails, setPatientDetails] = useState(1);
  let [itemDetails, setItemDetails] = useState([data]);
  let [itemDetailsTemp, setItemDetailsTemp] = useState([data]);
  let [saveRow, setSaveRow] = useState([data]);
  let [showSearchBoxItem, setShowSearchBoxItem] = useState(-1);
  let [totalPaidAmount, setTotalPaidAmount] = useState(0);
  let [discountBy, setDiscountBy] = useState();
  let [byCard, setByCard] = useState();
  let [refNo, setRefNo] = useState();
  let [totalAmount, setTotalAmount] = useState(0);
  let [advanceAmount, setAdvanceAmount] = useState(0);
  let [actualTotalAmount, setActualTotalAmount] = useState(0);
  let [balanceAmount, setBalanceAmount] = useState(0);
  let [payableAmount, setpayableAmount] = useState(0);
  
  let [totalSum, settotalSum] = useState(0);
  let [totalDiscountSum, setTotalDiscountSum] = useState(0);
  //let [trustBill, setTrustBill] = useState([]);
  let [bankList, setBankList] = useState([]);
  let [billType, setBillType] = useState([]);
  let [companyType, setCompanyType] = useState([]);
  let [companyBill, setcompanyBill] = useState([]);


  let [ddlTrusBill, setDdlTrustBill] = useState(0);
  let [ddlBank, setDdlBank] = useState(0);
  let [ddlBillType, setDdlBillType] = useState(0);
 

  let [ddlCompany, setDdlCompany] = useState(0);
 
  let [chequeNo, setchequeNo] = useState(0);
  let [chequeDate, setchequeDate] = useState('')  
  let [insCardNo, setinsCardNo] = useState(0)
  let [PaymentModeList, setPaymentModeList] = useState([]);
  let [PolicyNo, setPolicyNo] = useState('');
  let [isDisabled, setisDisabled] = useState(false);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showSuccessToster, setShowSuccessToster] = useState(0)
  let [showMessage, setShowMeassage] = useState("");
  const [showdiscountPer, setshowdiscountPer] = useState(true);
  const [showdiscount, setshowdiscount] = useState(true);
  const [showLimit, setshowLimit] = useState(false);
  const [AdvanceDetailsbyUhid, setAdvanceDetailsbyUhid] = useState([]);
  const [CreditLimit, setCreditLimit] = useState([]);
  const [isPaymentDisabled, setisPaymentDisabled] = useState(false);



  let handleItemDetails = async (e, ind) => {
    let temp = [...saveRow];
    let value = e.target.value;
    let name = e.target.name;
   
    
    if (value !== "") {
      temp[ind]["itemId"] = 0;
      temp[ind]["itemName"] = value;
      temp[ind]["categoryName"] = 0;
      temp[ind]["itemCharge"] = 0;
      temp[ind]["categoryId"] = 0;
      temp[ind]["itemQuantity"] = 0;
      temp[ind]["discountRs"] = 0;
      temp[ind]["discountPer"] = 0;
      temp[ind]["totalAmount"] = 0;
      temp[ind]["billMasterID"] = 0;
      temp[ind]["billNo"] = 0;
      temp[ind]["billTypeId"] = 0;

   
      temp[ind]["totalDiscount"] = 0;
      temp[ind]["uhid"] = 0;
      setItemDetailsTemp([])
      setSaveRow([...temp]);
      let response = Search(itemDetails, value);
      if (response != 0) {
        setItemDetailsTemp(response);
        setShowSearchBoxItem(ind);
  
      }


    } else {
     
      let temp = [...saveRow];
      temp[ind]["itemName"] = "";
      setSaveRow(temp);
      setShowSearchBoxItem(-1);
      
    }
  };

  let getItemRate = async () =>{
  
   
      let companyName = await GerItemRateByCompany()
      if(companyName.status === 1){

        setItemDetails(companyName.responseValue);
        console.log("companyName",companyName.responseValue)
  }
 
    
      
  }


  


  


let GetPaymentModes = async()=>{
  let PaymentMode = await GetallPaymentMode()
  if(PaymentMode.status === 1){
    setPaymentModeList(PaymentMode.responseValue)
    console.log("PaymentMode",PaymentMode.responseValue)
  }
}

  let companyTypeList = async (e) => {
      let billtypeId = e.target.value;      
     var response = await getCompanyType(billtypeId);
    setCompanyType(response.responseValue);

  }
  

 

  let handlePaymentMode = (e) => {
    let ddl = e.target.value;
    if (ddl === "0") {
      setPaymentMode(0);
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
    } else if (ddl === "1") {
      setPaymentMode(1);
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
    } else if (ddl === "2") {
      setPaymentMode(2);
      document.getElementById("paymentModeCard").style.display = "block";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
    } else if (ddl === "3") {
      setPaymentMode(3);
      GetBankList();
      document.getElementById("bnkdetails").style.display = "block";
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
    } else if (ddl === "4") {
      setPaymentMode(4);
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "block";
      document.getElementById("bnkdetails").style.display = "none";
    }
  };

  let handleUhidEvent = async (e) => {
    setShowSearchBoxItem(-1)
    let RowData = {
      itemId: 0,
      itemName: "",
      categoryName: "",
      itemCharge: "",
      categoryId: "",
      itemQuantity: "",
      discountRs: "",
      discountPer: "",
      totalAmount: "",
      actualTotalAmount: "",
      billMasterID: 0,
      billNo: "",
      billTypeId: 0,
      tpaCompanyID: '',
      tpaReferenceNo: "",
      totalDiscount: 0,
      uhid: 0,
    }
    settotalSum(0)
    setSaveRow([RowData])
    setBalanceAmount(0)
    setpayableAmount(0)
    setTotalAmount(0)
    setTotalDiscountSum(0)
    setTotalPaidAmount(0)
    let UHID = e.target.value;
    setUHID(UHID);
    setPatientDetails([])
  
    if (UHID.length !== 10) {
      document.getElementById('PName').value = '';
      document.getElementById('Pgender').value = '';
      document.getElementById('PAge').value = '';
      document.getElementById('PWard').value = '';
      document.getElementById('Pdepartment').value = '';
    }
  
    setshowLimit(false);
  
    let data = await PatientDetail(UHID, 0);
    let dt = data.responseValue[0];
    setPatientDetails(dt);
  
    let AdvanceDetails = await GetAllAdvanceDetails(UHID);
    if (AdvanceDetails.status === 1) {
      console.log('AdvanceDetails', AdvanceDetails);
      setAdvanceDetailsbyUhid(AdvanceDetails.responseValue);
      setisPaymentDisabled(true);
    }
  
    let CreditLimit = await GetCreditLimitofPatient(UHID);
  
    if (CreditLimit.status === 1 ) {
      setCreditLimit(CreditLimit.responseValue);
      console.log('CreditLimit', CreditLimit.responseValue);
      setisPaymentDisabled(true);
    }
  
  
    let CreditLimitvalue = CreditLimit.responseValue[0]?.remaining || 0;
    let CreditLimitTable = CreditLimit.responseValue[0]
    let InsuranceCompanyId = CreditLimit.responseValue[0]?.tpaCompanyID || 0;
    let advanceLimit = AdvanceDetails.responseValue[0]?.totalAdvance || 0;
    let advanceLimitStatus = AdvanceDetails.responseValue[0]?.limitStatus || 0;
    console.log('InsuranceCompanyId', InsuranceCompanyId);
  
    if (CreditLimitvalue === 0 && advanceLimit === 0) {
      setisPaymentDisabled(false);
      
     
    };
   
     if(CreditLimitTable && InsuranceCompanyId !== 0 ){
      console.log("Hello")
      setisPaymentDisabled(true);
      let companyName = await GerItemRateByCompany(InsuranceCompanyId)
      if(companyName.status === 1){
        setItemDetails(companyName.responseValue)
        console.log("companyName" , companyName.responseValue)
      }
      
      else if (!CreditLimitTable){
        itemDetailsOnLoad()
      }
      return
    }
    
    if (advanceLimitStatus == 2 && advanceLimit > 0 ){
      setisPaymentDisabled(false)
      return
      
    }
    if (advanceLimitStatus == 1 && advanceLimit > 0 ){
      itemDetailsOnLoad()
      return
      
    }
   
  };
  

  let itemDetailsOnLoad = async () => {
    let itemDetails = await getItems();
    let itemDt = itemDetails.responseValue;
    setItemDetails(itemDt);
     setItemDetailsTemp(itemDt);
   
  };

  useEffect(() => {
    GetPaymentModes()
    itemDetailsOnLoad();
   
    getItemRate()
    document.getElementById("bnkdetails").style.display = "none";
    document.getElementById("crdBillDetails").style.display = "none";
    document.getElementById("refNoDetails").style.display = "none";
    document.getElementById("paymentModeCard").style.display = "none";
    document.getElementById("discountByRemark").style.display = "none";
    document.getElementById("paymentModeRefNo").style.display = "none";


  
  }, []);



  let handlClick = (ind, data) => {
    let temp = [...saveRow];
  
    // Check if the item is already in a row
    const itemAlreadySelected = temp.some(row => row.itemId === data.id);
  
    if (!itemAlreadySelected) {
      temp[ind]["itemId"] = data.id;
      temp[ind]["itemName"] = data.itemName;
      temp[ind]["categoryName"] = data.categoryName;
      temp[ind]["itemCharge"] = data.itemCharge;
      temp[ind]["categoryId"] = data.categoryId;
      temp[ind]["itemQuantity"] = 0;
      temp[ind]["discountRs"] = 0;
      temp[ind]["discountPer"] = 0;
      temp[ind]["totalAmount"] = data.itemCharge; 
      temp[ind]["billMasterID"] = 0;
      temp[ind]["billNo"] = 0;
      temp[ind]["billTypeId"] = 0;
      temp[ind]["totalDiscount"] = 0;
      temp[ind]["uhid"] = 0;
  
      document.getElementById("itemName" + ind).value = data.itemName;
      setShowSearchBoxItem(-1);
      setSaveRow(temp);
      handleOnchangeNumbers({
        target: {
          value: 1, 
          name: "itemQuantity",
        },
      }, ind);
     
    } else {
      setShowAlertToster(1);
    
      setShowMeassage('Item is already selected');
   
    }
  };


  let handleOnchangeNumbers = (e, ind) => {
     
     let value = e.target.value;
     let QuantityValue = parseInt(e.target.value)
     let name = e.target.name;
     let temp = [...saveRow];
 
     // Validation: Prevent user from typing 0 quantity
     // if (name === "itemQuantity" && value === 0 || value == "" || value == undefined || value == null) {
        
     //     setShowAlertToster(1);
     //     setShowMeassage("Quantity cannot be 0");
     //     return;
     // }
 
     if (name === "itemQuantity") {
      temp[ind]["totalAmount"] = 0;
      temp[ind]["itemQuantity"] = QuantityValue;
  
      // Check if QuantityValue is a valid number
      if (!isNaN(QuantityValue)) {
          temp[ind]["discountRs"] = 0;
          temp[ind]["discountPer"] = 0;
  
          let totalcharges = parseFloat(temp[ind]["itemCharge"] ? temp[ind]["itemCharge"] : 0);
          let totalQuantity = parseInt(QuantityValue);
          let totalDiscount = parseFloat(temp[ind]["discountRs"]);
  
          temp[ind]["totalAmount"] = totalcharges * totalQuantity - totalDiscount;
          setTotalAmount(temp[ind]["totalAmount"].toFixed(2));
  
          setActualTotalAmount(totalcharges * totalQuantity);
          temp[ind]["actualTotalAmount"] = totalcharges * totalQuantity;
  
          const tempVal = temp.map((t) => t.actualTotalAmount);
          const sum = tempVal.reduce((a, b) => a + b, 0);
  
          const tempDis = temp.map((d) => parseFloat(d.discountRs));
          const sumDis = tempDis.reduce((x, y) => x + y, 0);
  
          settotalSum(sum);
          setTotalDiscountSum(sumDis);
          totalPayableAmount(sum.toFixed(2), sumDis.toFixed(2), 0, 0);
      } else {
          // Quantity is blank, set totalAmount to 0 or handle it as needed
          setTotalAmount("0.00");  
          // totalPayableAmount(0);
          let removeQuantity = saveRow[ind]["actualTotalAmount"];
          let afterRemoveLeftTotal = totalSum - removeQuantity;
          totalPayableAmount(afterRemoveLeftTotal)
          setpayableAmount(afterRemoveLeftTotal)
          setBalanceAmount(afterRemoveLeftTotal)
      }
  }
  
 
     console.log("Total Amount", balanceAmount);
 
     if (name === "discountPer") {
      if (value.includes("-") || value.includes("+")) {
        setShowAlertToster(1);
        setShowMeassage("Discount Percentage should'nt be in negative..!!");
        return;
    }
      if (value > 100) {
          setShowAlertToster(1);
          setShowMeassage("Cannot Discount more than Total Amount");
      } else {
          temp[ind]["totalAmount"] = 0;
  
          console.log('aaa', temp[ind]["totalAmount"]);
  
          if (temp[ind]["actualTotalAmount"] > 0) {
              if (value > 100) {
                  setShowAlertToster(1);
                  setShowMeassage("Cannot Discount more than Total Amount");
                 
              } else {
                  let dper = (temp[ind]["actualTotalAmount"] * value) / 100;
                  let toamountAfterDis = temp[ind]["actualTotalAmount"] - dper;
  
                  dper = parseFloat(dper.toFixed(2));
                  toamountAfterDis = parseFloat(toamountAfterDis.toFixed(2));
                  console.log("Ayaz", toamountAfterDis);
                  temp[ind]["discountRs"] = dper;
                  temp[ind]["totalAmount"] = toamountAfterDis.toFixed(2);
                  temp[ind]["discountPer"] = value;
  
                  document.getElementById("discountByRemark").style.display = "block";
              }
          }
  
          const tempDis = temp.map((d) => parseFloat(d.discountRs));
          const sumDis = tempDis.reduce((x, y) => x + y, 0);
  
          setTotalDiscountSum(sumDis.toFixed(2));
          totalPayableAmount(totalSum.toFixed(2), sumDis.toFixed(2), 0, 0);
      }
  }
  
 
  if (name === "discountRs") {
    if (value.includes("-") || value.includes("+")) {
      setShowAlertToster(1);
      setShowMeassage("Discount Rupees should'nt be in negative..!!");
      return;
  }

    temp[ind]["totalAmount"] = 0;
    temp[ind]["discountPer"] = 0;
    let tamt = temp[ind]["actualTotalAmount"];

    // Check if the value is blank or not a valid number
    if (value === "" || isNaN(parseFloat(value))) {
        // Erase the discountRs value
        temp[ind]["discountRs"] = "";
        temp[ind]["totalAmount"] = tamt;
        document.getElementById("discountByRemark").style.display = "block";
    } else {
        if (value > tamt && tamt > 0) {
            setShowAlertToster(1);
            setShowMeassage("Cannot Discount more than Total Amount");
            temp[ind]["totalAmount"] = tamt - temp[ind]["discountRs"];
            return;
        } else {
            temp[ind]["discountRs"] = parseFloat(value);

            let tad = tamt - temp[ind]["discountRs"];
            temp[ind]["totalAmount"] = tad;
            document.getElementById("discountByRemark").style.display = "block";
        }
    }

    const tempDis = temp.map((d) => (d.discountRs === "" ? 0 : parseFloat(d.discountRs)));
    const sumDis = tempDis.reduce((x, y) => x + y, 0);

    setTotalDiscountSum(sumDis);
    totalPayableAmount(totalSum, sumDis, 0, 0);
}


     if (name === "totalAmount") {
         temp[ind]["id"] = 0;
         temp[ind]["totalAmount"] = value;
     }
 
     setSaveRow(temp);
 };




 

let handleTabKey = async (e, ind) => {
  const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
  const isItemQuantityValid = saveRow.some((item) => !item.itemQuantity || item.itemQuantity === 0);
  
  

  if (isEmpty) {
      setShowAlertToster(1);
      setShowMeassage("Item Name is required");
      return;
  }

  if (isItemQuantityValid) {
      setShowAlertToster(1);
      setShowMeassage("Please Enter Item Quantity");
      return;
  }




  if (e.key === "Tab") {

      setSaveRow([...saveRow, data]);
  }
};


  const handleAddRow = (ind)=>{
    const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
    const isitemQuantityValid = saveRow.some((item) => !item.itemQuantity ||  item.itemQuantity === 0);
    

    if (isEmpty) {
      setShowAlertToster(1);
      setShowMeassage("Item Name is required");
      return;
       }
       if (isitemQuantityValid) {
        setShowAlertToster(1);
        setShowMeassage("Please Enter Item Quantity");
        return;
      }
 
  

      else{
         setSaveRow([...saveRow, data]);

      }
   
  }

  let removeRow = (ind) => {
    let temp = [...saveRow];
  
    let removeActualAmt = saveRow[ind]["actualTotalAmount"];
    let removeDisAmt = saveRow[ind]["discountRs"];
  
    let afterRemoveLeftTotal = totalSum - removeActualAmt;
    let afterRemoveLeftDiscnt = totalDiscountSum - removeDisAmt;
    let afterRemovePayableAmount = afterRemoveLeftTotal - afterRemoveLeftDiscnt;
    let CreditLimitvalue = CreditLimit[0]?.remaining;
  
    if (CreditLimitvalue > 0) {
      setBalanceAmount(afterRemovePayableAmount);
      setpayableAmount(afterRemoveLeftTotal);
      settotalSum(afterRemoveLeftTotal);
      setTotalDiscountSum(afterRemoveLeftDiscnt); // Updated this line
      temp.splice(ind, 1);
    } else {
      settotalSum(afterRemoveLeftTotal);
      setTotalDiscountSum(afterRemoveLeftDiscnt);
      setpayableAmount(afterRemovePayableAmount);
      setTotalPaidAmount(afterRemovePayableAmount);
      temp.splice(ind, 1);
    }
  
    if (temp.length > 0) {
      setSaveRow(temp);
    } else {
      setSaveRow([data]);
      document.getElementById("itemName" + ind).value = "";
      document.getElementById("discountByRemark").style.display = "none";
    }
  };
  
  
  const totalPayableAmount = async (
    totalAmt,
    totalDiscnt,
    advanceRs,
    BalanceAmt
  ) => {
    let amtAfterDiscount = totalAmt - totalDiscnt;
    let amtAfterlessAdvance = amtAfterDiscount - advanceRs;
    let amtAfterAddBlnce = amtAfterlessAdvance + BalanceAmt;

    let CreditLimitvalue = CreditLimit[0]?.remaining;
    let CreditLimitCompany = CreditLimit[0]?.tpaCompanyID;
    let CreditStatus = CreditLimit[0]?.currentStatus

    console.log(CreditLimitvalue)

    if(CreditLimitvalue > 0){
       setBalanceAmount(amtAfterAddBlnce);
       setpayableAmount(amtAfterAddBlnce);
   return
    }
    if(CreditLimitCompany && CreditStatus == 2 ){
       setBalanceAmount(amtAfterAddBlnce);
       setpayableAmount(amtAfterAddBlnce);
   return
    }

    else{
       setpayableAmount(amtAfterAddBlnce);
       setTotalPaidAmount(amtAfterAddBlnce);
    return
    }
   
  };

  let handlePaidAmount = () => {
    let paidAmount = document.getElementById("totalPaidAmount").value;
    setTotalPaidAmount(paidAmount);
  };

  let clearBillingData = () => {
    setShowSearchBoxItem(-1)
    itemDetailsOnLoad()
    setUHID('');
    setPaymentMode(0);
    setItemDetailsTemp([data]);
    setpayableAmount(0);
    setTotalPaidAmount(0);
  
    setDiscountBy("");
    setTotalAmount(0);
    settotalSum(0);
    setTotalDiscountSum(0);
    setBalanceAmount(0)
    setByCard("");
    setRefNo(0);
    setPolicyNo("");
    setCreditLimit([])
    setAdvanceDetailsbyUhid([])
    setSaveRow([data]); 
    setPatientDetails([])   
    document.getElementById("Payment").value = "0"
    document.getElementById("paymentModeCard").style.display = "none";
    document.getElementById("paymentModeRefNo").style.display = "none";
    document.getElementById("bnkdetails").style.display = "none";
    document.getElementById("discountByRemark").style.display = "none";
    document.getElementById("UHID").value="";
    document.getElementById('PName').value = ''
    document.getElementById('Pgender').value = ''
    document.getElementById('PAge').value = ''
    document.getElementById('PWard').value = ''
    document.getElementById('Pdepartment').value = ''

  
  };


  let HandlePaymentDetails = (e) => {
    if (e.target.name === "discountBy") {
      setDiscountBy(e.target.value);
    }
    if (e.target.name === "byCard") {
      setByCard(e.target.value);
    }
    if (e.target.name === "refNo") {
      setRefNo(e.target.value);
      document.getElementById("paymentModeRefNo").style.display = "block";
    }
    if(e.target.name === "bnkCardNo"){
      setinsCardNo(e.target.value);
    }
    if(e.target.name === "chequeNo"){
      setchequeNo(e.target.value);
    }
    if(e.target.name === "chequeDate"){
      setchequeDate(e.target.value);
    }   
  };

  let handleTrustBill = async (evalue) => {
    let responseTrustBill = await getAllTpaCompany();
    setcompanyBill(responseTrustBill.responseValue);
 
  };

  let GetBankList = async () => {
    var response = await GetBankNameList();
    setBankList(response.responseValue);
    console.log("this is responsesss", response);
  };


  //*****saveDetails */

  let saveBillingData = async (ind) => {
    const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
    const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0 );

    let CreditLimitvalue = CreditLimit[0]?.remaining
    let CreditLimitInsuranceID = CreditLimit[0]?.issuanceDetailId
    let CreditLimitCompany = CreditLimit[0]?.tpaCompanyID
    let CreditStatus = CreditLimit[0]?.currentStatus
    let InsuranceCompanyId = CreditLimit[0]?.tpaCompanyID
    let advanceLimit = AdvanceDetailsbyUhid[0]?.remaining
    let advanceStatus = AdvanceDetailsbyUhid[0]?.limitStatus
    console.log(CreditLimitvalue)
    console.log(CreditStatus)
    console.log(InsuranceCompanyId)
  
 
   
    if(UHID.trim() == ''){
         setShowAlertToster(1);
         setShowMeassage("UHID is required");
         return;
        }
     
   
        if (isEmpty) {
         setShowAlertToster(1);
         setShowMeassage("Item Name is required");
         return;
          }
          if (isitemQuantityValid) {
           setShowAlertToster(1);
           setShowMeassage("Please Enter Item Quantity");
           return;
         }

   
 if(CreditLimitvalue < balanceAmount){
  setShowAlertToster(1);
   setShowMeassage("Credit Limit Exceeded..!!");
  return;
 }
 if(CreditLimitvalue  > 0 && CreditStatus == 2  ){
  setShowAlertToster(1);
   setShowMeassage("Credit Limit is On Hold Please Contact TPA Department..!!");
   return
 }


 if(CreditLimitvalue  > 0  ){
  const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
 const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);

 if(UHID.trim() == '' || undefined || null || CreditLimitvalue == undefined || advanceLimit == undefined){
      setShowAlertToster(1);
      setShowMeassage("UHID is required");
      return;
     }
  

     if (isEmpty) {
      setShowAlertToster(1);
      setShowMeassage("Item Name is required");
      return;
       }
       if (isitemQuantityValid) {
        setShowAlertToster(1);
        setShowMeassage("Please Enter Item Quantity");
        return;
      }
    

      if (UHID != 0) {

        const uhid = UHID;
        const billTypeId = 2
        const TotalAmount = totalSum;
        const TotalBalanceAmount = totalSum;
        const TotalDiscount = totalDiscountSum;
        const TotalPaybleAmount = totalSum;
        const TotalPaidAmount = totalPaidAmount;
        const  tpaCompanyID = CreditLimit[0]?.tpaCompanyID || 0;
        const companyID = CreditLimitInsuranceID
        const  tpaReferenceNo = CreditLimit[0]?.cardNo || 0;

        //let totalBalanceAmount = TotalPaybleAmount;

        // if(TotalPaidAmount < TotalPaybleAmount)
        // {
        //   totalBalanceAmount = TotalPaybleAmount;
        // }else{
        //   totalBalanceAmount = 0;
        // }
       
        let DiscountRemark =null;
        if(TotalDiscount.length > 0){
          DiscountRemark = discountBy;
          if(DiscountRemark === null){
            alert("Enter Discount Remark!");
            return;
          }
        }
      
    
        const UserID = window.userId == "" || "undefined" ? 0 : window.userId;
       
        const PaymentMode = pamentMode;
        const PaymentTransactionNumber = refNo;
        const JsonData = JSON.stringify(saveRow);
        
        
        const cardNo = (byCard = "undefined" ? null : byCard);
        
        const bankId = ddlBank;
        const ChequeNo = chequeNo;
        const ChequeDate = chequeDate;
        const trustTypeId = ddlTrusBill
        
  
        let saveBillingData = {

                   uhid,
                   billTypeId,
                   TotalAmount,
                   TotalDiscount,
                   TotalPaybleAmount,
                   TotalPaidAmount,
                   TotalBalanceAmount,
                   DiscountRemark,
                   UserID,
                   PaymentMode,
                   PaymentTransactionNumber,
                   JsonData,
                   cardNo,
                   bankId,
                   ChequeNo,
                   ChequeDate,
                   trustTypeId,
                   tpaCompanyID,
                   tpaReferenceNo,
                   companyID
                        
       };
  
        console.log("saveBillingData22", saveBillingData);
        let responseData = await saveBillingDetails(saveBillingData);
        console.log('biliii ::' ,responseData);
        let billNumber = responseData.responseValue[0].billNumber;
        handlePrintBill(billNumber);
        clearBillingData();
        
          setPatientDetails([])
     
      } 
  return;
    }
    if(CreditLimitCompany && InsuranceCompanyId !== 0){
      setShowAlertToster(1);
      setShowMeassage("Credit Limit is Zero");
      return
     }
else if (CreditLimitCompany && CreditStatus == 2){
  setBalanceAmount(totalSum);
  setShowAlertToster(1);
  setShowMeassage("Please Contact TPA Office..!!");
  
  return
}

// if(InsuranceCompanyId  !== 0 && CreditLimit  == 0){
//   setShowAlertToster(1);
//    setShowMeassage("Credit Limit is Zero");
//    return
//  }
  

if (advanceLimit > 0 && advanceStatus == 1  && advanceLimit >= payableAmount){
  const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
  const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);
 
  if(UHID == '' || undefined || null){

       setShowAlertToster(1);
       setShowMeassage("UHID is required");
       return;
      }
   
 
      if (isEmpty) {
       setShowAlertToster(1);
       setShowMeassage("Item Name is required");
       return;
        }
        if (isitemQuantityValid) {
         setShowAlertToster(1);
         setShowMeassage("Please Enter Item Quantity");
         return;
       }
   
    
 
       
       if (UHID != 0) {

         const uhid = UHID;
         const billTypeId = 3
         const TotalAmount = totalSum;
         const TotalBalanceAmount = 0;
         const TotalDiscount = totalDiscountSum;
         const TotalPaybleAmount = totalSum;
         const TotalPaidAmount = totalPaidAmount;
      
          let totalBalanceAmount = 0;
          if(TotalPaidAmount < TotalPaybleAmount)
          {
            totalBalanceAmount = TotalPaybleAmount-TotalPaidAmount;
          }else{
            totalBalanceAmount = 0;
          }
        
          let DiscountRemark =null;
          if(TotalDiscount.length > 0){
            DiscountRemark = discountBy;
            if(DiscountRemark === null){
              alert("Enter Discount Remark!");
              return;
            }
          }
     
         const UserID = window.userId == "" || "undefined" ? 0 : window.userId;
 
         const PaymentMode = pamentMode;
         const PaymentTransactionNumber = refNo;
         const JsonData = JSON.stringify(saveRow);
         
         
         const cardNo = (byCard = "undefined" ? null : byCard);
         
         const bankId = ddlBank;
         const ChequeNo = chequeNo;
         const ChequeDate = chequeDate;
         const trustTypeId = ddlTrusBill
         
   
         let saveBillingData = {
 
                    uhid,
                    billTypeId,
                    TotalAmount,
                    TotalDiscount,
                    TotalPaybleAmount,
                    TotalPaidAmount,
                    TotalBalanceAmount,
                    DiscountRemark,
                    UserID,
                    PaymentMode,
                    PaymentTransactionNumber,
                    JsonData,
                    cardNo,
                    bankId,
                    ChequeNo,
                    ChequeDate,
                    trustTypeId,
                         
        };
   
         console.log("saveBillingData22", saveBillingData);
         let responseData = await saveBillingDetails(saveBillingData);
         console.log('biliii ::' ,responseData);
         let billNumber = responseData.responseValue[0].billNumber;
         handlePrintBill(billNumber);
         clearBillingData();
         setPatientDetails([])
         

       } 
 return;
}

if(advanceLimit < 0 && advanceStatus == 2){
  setShowAlertToster(1);
  setShowMeassage("Insufficient Balance");
  return;
  
}
if(advanceLimit && advanceStatus == 1 && advanceLimit < payableAmount ){
  setShowAlertToster(1);
  setShowMeassage("Insufficient Advance Amount..!!");
  return;
}
if(advanceLimit && advanceLimit < payableAmount){
  setShowAlertToster(1);
  setShowMeassage("Insufficient Advance Amount..!!");
  return;
}
if(advanceStatus == 1 && advanceLimit == 0 ){
  setShowAlertToster(1);
  setShowMeassage("Insufficient Advance Amount..!!");
  return;
}
if ( advanceStatus !== 1){
  
  let Bycard = document.getElementById("byCard").value 
  let Bycheque = document.getElementById("chequeNo").value 
  let Online = document.getElementById("refNo").value 
  let Bank = document.getElementById("selectBank").value
  let chequeDate = document.getElementById("chequeDate").value 
      let Paymenttype = document.getElementById("Payment").value;
          const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
          const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);
      
      
         if(UHID == '' || undefined || null){
          setShowAlertToster(1);
          setShowMeassage("UHID is required");
          return;
         }
      
    
         if (isEmpty) {
          setShowAlertToster(1);
          setShowMeassage("Item Name is required");
          return;
           }
           if (isitemQuantityValid) {
            setShowAlertToster(1);
            setShowMeassage("Please Enter Item Quantity");
            return;
          }
        //  if(Paymenttype =='' || Paymenttype == 0){
        //   setShowAlertToster(1);
        //     setShowMeassage("Select Payment Mode");
        //   return;
        // }
       
      
          if(document.getElementById("Company").checked && isEmpty){
            setShowAlertToster(1);
            setShowMeassage("Item Name is required");
            return;
           }
          if( CreditLimitvalue == 0){
            setisPaymentDisabled(false)
         
           }
           if(Paymenttype =='' || Paymenttype == 0){
            setShowAlertToster(1);
            setShowMeassage("Select Payment Mode");
            return;
          }
           if(Paymenttype == "2" && Bycard == ""){
            setShowAlertToster(1);
            setShowMeassage("Please Enter Card Number..!!");
            return;
         
          }
           if(Paymenttype == "3" && Bank == "0" && chequeNo == "" ){
            setShowAlertToster(1);
            setShowMeassage("Please Select Bank..!!");
            return;
         
          }
           if(Paymenttype == "3"  && chequeNo == ""){
            setShowAlertToster(1);
            setShowMeassage("Please Enter Cheque Number..!!");
            return;
         
          }
           if(Paymenttype == "3"  && chequeDate == ""){
            setShowAlertToster(1);
            setShowMeassage("Please Enter Cheque Date..!!");
            return;
         
          }
          
          if (UHID != 0) {
            const uhid = UHID;
            const billTypeId = 1 
            const insauranceCardNo = insCardNo;
            const CreditTypeId = ddlBillType;
            const CompanyId = ddlCompany;
            const TotalAmount = totalSum;
            const TotalDiscount = totalDiscountSum;
            const TotalPaybleAmount = payableAmount;
            const TotalPaidAmount = totalPaidAmount;
            const tpaReferenceNo = PolicyNo
          
           
        
            let totalBalanceAmount = 0;
            if(TotalPaidAmount < TotalPaybleAmount)
            {
              totalBalanceAmount = TotalPaybleAmount-TotalPaidAmount;
            }else{
              totalBalanceAmount = 0;
            }
            const TotalBalanceAmount = totalBalanceAmount;
            let DiscountRemark =null;
            if(TotalDiscount.length > 0){
              DiscountRemark = discountBy;
              if(DiscountRemark === null){
                alert("Enter Discount Remark!");
                return;
              }
            }
        
            const UserID = window.userId == "" || "undefined" ? 0 : window.userId;
            const PaymentMode = pamentMode;
            const PaymentTransactionNumber = refNo;
            const JsonData = JSON.stringify(saveRow);
            
            
            const cardNo = (byCard = "undefined" ? null : byCard);
            
            const bankId = ddlBank;
            const ChequeNo = chequeNo;
            const ChequeDate = chequeDate;
            const trustTypeId = ddlTrusBill
            
      
            let saveBillingData = {
              uhid,
              billTypeId,
              CompanyId,
              TotalAmount,
              TotalDiscount,
              TotalPaybleAmount,
              TotalPaidAmount,
              TotalBalanceAmount,
              DiscountRemark,
              UserID,
              PaymentMode,
              PaymentTransactionNumber,
              JsonData,
              cardNo,
              bankId,
              ChequeNo,
              ChequeDate,
              trustTypeId,
              tpaReferenceNo,
         
                    
            };
      
            console.log("saveBillingData22", saveBillingData);
            let responseData = await saveBillingDetails(saveBillingData);
            console.log('biliii ::' ,responseData);
            let billNumber = responseData.responseValue[0].billNumber;
            handlePrintBill(billNumber);
            clearBillingData();
            setPatientDetails([])
         
          } 


}





// if(CreditLimitvalue <= 0 &&  InsuranceCompany ){
// alert('Error')
// }

  else{
let Bycard = document.getElementById("byCard").value 
let Bycheque = document.getElementById("chequeNo").value 
let Online = document.getElementById("refNo").value 
let Bank = document.getElementById("selectBank").value
let chequeDate = document.getElementById("chequeDate").value 
    let Paymenttype = document.getElementById("Payment").value;
        const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
        const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' || item.itemQuantity === 0);
    
    
       if(UHID == '' || undefined || null){
        setShowAlertToster(1);
        setShowMeassage("UHID is required");
        return;
       }
    
    //  if(document.getElementById("Company").checked && PolicyNo === ''){
    //   setShowAlertToster(1);
    //   setShowMeassage("Policy No Is Required");
    //   return;
    //  }
    //  if(document.getElementById("Company").checked && PolicyNo.length < 5){
    //   setShowAlertToster(1);
    //   setShowMeassage("Policy number is not valid");
    //   return;
    //  }
       if (isEmpty) {
        setShowAlertToster(1);
        setShowMeassage("Item Name is required");
        return;
         }
         if (isitemQuantityValid) {
          setShowAlertToster(1);
          setShowMeassage("Please Enter Item Quantity");
          return;
        }
      //  if(Paymenttype =='' || Paymenttype == 0){
      //   setShowAlertToster(1);
      //     setShowMeassage("Select Payment Mode");
      //   return;
      // }
     
    
        if(document.getElementById("Company").checked && isEmpty){
          setShowAlertToster(1);
          setShowMeassage("Item Name is required");
          return;
         }
        if( CreditLimitvalue == 0){
          setisPaymentDisabled(false)
       
         }
         if(Paymenttype =='' || Paymenttype == 0){
          setShowAlertToster(1);
          setShowMeassage("Select Payment Mode");
          return;
        }
         if(Paymenttype == "2" && Bycard == ""){
          setShowAlertToster(1);
          setShowMeassage("Please Enter Card Number..!!");
          return;
       
        }
         if(Paymenttype == "3" && Bank == "0" && chequeNo == "" ){
          setShowAlertToster(1);
          setShowMeassage("Please Select Bank..!!");
          return;
       
        }
         if(Paymenttype == "3"  && chequeNo == ""){
          setShowAlertToster(1);
          setShowMeassage("Please Enter Cheque Number..!!");
          return;
       
        }
         if(Paymenttype == "3"  && chequeDate == ""){
          setShowAlertToster(1);
          setShowMeassage("Please Enter Cheque Date..!!");
          return;
       
        }
        
        if (UHID != 0) {
          const uhid = UHID;
          const billTypeId = 1 
          const insauranceCardNo = insCardNo;
          const CreditTypeId = ddlBillType;
          const CompanyId = ddlCompany;
          const TotalAmount = totalSum;
          const TotalDiscount = totalDiscountSum;
          const TotalPaybleAmount = payableAmount;
          const TotalPaidAmount = payableAmount;
          const tpaReferenceNo = PolicyNo
        
         
      
          let totalBalanceAmount = 0;
          if(TotalPaidAmount < TotalPaybleAmount)
          {
            totalBalanceAmount = TotalPaybleAmount-TotalPaidAmount;
          }else{
            totalBalanceAmount = 0;
          }
          const TotalBalanceAmount = totalBalanceAmount;
          let DiscountRemark =null;
          if(TotalDiscount.length > 0){
            DiscountRemark = discountBy;
            if(DiscountRemark === null){
              alert("Enter Discount Remark!");
              return;
            }
          }
      
          const UserID = window.userId == "" || "undefined" ? 0 : window.userId;
          const PaymentMode = pamentMode;
          const PaymentTransactionNumber = refNo;
          const JsonData = JSON.stringify(saveRow);
          
          
          const cardNo = (byCard = "undefined" ? null : byCard);
          
          const bankId = ddlBank;
          const ChequeNo = chequeNo;
          const ChequeDate = chequeDate;
          const trustTypeId = ddlTrusBill
          
    
          let saveBillingData = {
            uhid,
            billTypeId,
            CompanyId,
            TotalAmount,
            TotalDiscount,
            TotalPaybleAmount,
            TotalPaidAmount,
            TotalBalanceAmount,
            DiscountRemark,
            UserID,
            PaymentMode,
            PaymentTransactionNumber,
            JsonData,
            cardNo,
            bankId,
            ChequeNo,
            ChequeDate,
            trustTypeId,
            tpaReferenceNo,
       
                  
          };
    
          console.log("saveBillingData22", saveBillingData);
          let responseData = await saveBillingDetails(saveBillingData);
          console.log('biliii ::' ,responseData);
          let billNumber = responseData.responseValue[0].billNumber;
          handlePrintBill(billNumber);
          clearBillingData();
          setPatientDetails([])
       
        } 
  }


  }

  //*******Print */
  let handlePrintBill = async (billNumber) => {

    console.log('Bill No ::' ,billNumber );
    let data = await PatientDetail(UHID, billNumber);
    console.log('data' , data.responseValue)
    if (data.status === 1) {
      window.sessionStorage.setItem(
        "PringBillingDetails",
        JSON.stringify(data.responseValue)
      );
      window.open("/billingcahcounterprint/", "noopener,noreferrer");
      clearBillingData()
     
    } else {
      setShowAlertToster(1);
      setShowMeassage("UHID is not Valid");
    }
   
    
  };

  let insuranceCompanyName = CreditLimit[0]?.companyname || '';
  let CardNo = CreditLimit[0]?.cardNo || '';
  // console.log("InsuranceCompanyName",insuranceCompanyName)
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div class="col-12"><div class="med-box  mb-1"><div class="title">Billing</div></div></div>
            <div className="col-12">
              <div className="med-box">
                <div className="inner-content" style={{paddingRight: '22px'}}>
                  <div className="row">
                
              
                  {patientDetails && (
                      <div className='fieldsett-in col-md-6'>
                <div className='fieldsett'>
                  <span className='fieldse'>Patient Details</span>
                  <div className="row">
              
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 mb-3">
                          <img src={Page} alt=''/>{" "}
                          <label for="UHID" class="form-label">
                            UHID <span class="starMandatory">*</span>
                          </label>
                         
                          <input
                            type="text"
                            class="form-control form-control-sm ms-2"
                            id="UHID"
                            placeholder="Enter UHID"
                            name="UHID"
                            maxLength={11}
                            onChange={handleUhidEvent}
                          />
                   
                         
                          </div>
       
              
                                
                                <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={user3} className='icnn' alt='' /><label htmlFor="FullName*" className="form-label">Patient Full Name</label>
                                </div>
                                  
                                  <input type="text" className="form-control form-control-sm" id="PName" name="donor" placeholder="Patient Name" value=  {patientDetails.patientName} disabled />
                                </div>
                              </div>
                              <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={category} className='icnn' alt='' /> <label htmlFor="gender" className="form-label">Gender</label>
                                </div>
                                <input type="text" className="form-control form-control-sm" id="Pgender" name="donor" placeholder="Patient Gender" value=  {patientDetails.gender} disabled />
                         
                                  </div>
                                </div>

        
                   
                   
                   
                 
    
                    
                    </div>

                    <div className="row">
                    <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={question} className='icnn' alt='' /><label htmlFor="dob" className="form-label">Age</label>
                                </div>
                                  
                                  <input type="text" className="form-control form-control-sm" id='PAge' name='regDate' value={patientDetails.age} placeholder="Age" disabled />
                                </div>
                              </div>
          
                              <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className='d-flex align-items-baseline'>
                                <img src={medicalRoom} className='icnn' alt='' /><label htmlFor="bloodGroup" className="form-label">Ward</label>
                                </div>
                                 
                                  <input type="text" className="form-control form-control-sm" id="PWard" value={patientDetails.wardName} name="ddlBloodGroup" placeholder="Ward" disabled />
                                </div>
                              </div>
          
                              <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 mb-3">
                                <div className="mb-2">
                                <div className='d-flex align-items-baseline'>
                                <img src={imgDepartment} className='icnn' alt='' /><label htmlFor="identity" className="form-label">Department</label>
                                </div>
                                  <input type="text" value={patientDetails.departName} className="form-control form-control-sm" id="Pdepartment" name="ddlIdentityType" placeholder="Department" disabled />
                                </div>
                              </div>
                    </div>
                        </div>

                  </div>


            
                    )}

               
               
<div className="col-md-6 mb-2 fieldsett mt-3">
  <span class="fieldse">Patient Insurance Details</span>


  <div className="mt-2 col-md-12 d-flex justify-content-between flex-wrap">
     <span class="badge rounded-pill text-bg-light">Insurance Company / Card No. :</span>
  <span class="badge rounded-pill text-bg-info">{insuranceCompanyName == '' ? 'Not Eligible' : insuranceCompanyName } / {CardNo == '' ? 'Not Eligible' : CardNo}</span>
  </div>
 
  <table className="med-table border_ striped mt-3">
  <thead>
    <tr>
      <th>Type</th>
      <th>Active</th>
      <th>Available</th>
      <th>Used</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>TPA Credit</td>
      {CreditLimit && CreditLimit.length > 0 ? (
        CreditLimit.map((val, index) => (
          <>
            <td>{val.totalActiveLimit == '' ? '0' :  val.totalActiveLimit}</td>
            <td>{val.remaining == '' ? '0' :  val.remaining}</td>
            <td>{val.totalUsedLimit == '' ? '0' :val.totalUsedLimit }</td>
            <td className = {`${val.currentStatus == "1" ? "badge badge-success text-success" : val.currentStatus == "2" ? 'badge badge-danger text-danger' : 'badge badge-danger text-danger'}`}>{val.currentStatusName}</td>
          </>
        ))
      ) : (
        <>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>Not Eligible</td>
        </>
       
      )}
    </tr>

    <tr>
      <td>Advance</td>
      {AdvanceDetailsbyUhid && AdvanceDetailsbyUhid.length > 0 ? (
        AdvanceDetailsbyUhid.map((val, index) => (
          <>
            <td>{val.totalAdvance == '' ? '0' : val.totalAdvance}</td>
            <td>{val.remaining == '' ? '0' : val.remaining}</td>
            <td>{val.totalUsedAdvance == '' ? '0' : val.totalUsedAdvance}</td>
            <td  className = {`${val.limitStatus == "1" ? "badge badge-danger text-success" : val.limitStatus == "2" ? 'badge badge-success text-danger' : ''}`}>{val.limitStatus == null ? 'Not Eligible' : val.limitStatus == 1 ? "Active" : val.limitStatus == 2 ? 'Hold' : ''}</td>
          </>
        ))
      ) : (
        <>
         <td >0</td>
         <td >0</td>
         <td >0</td>
         <td >Not Eligible</td>
        </>
       
      )}
    </tr>
  </tbody>
</table>
                          
            


</div>
                  </div>
   
                 
                </div>
    
              </div>
              
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-12">
              <div className="med-box">
                <div
                  className="med-table-section"
                  style={{ minHeight: "120px", overflow:"auto"}}
                >
                  <table className="med-table border_ striped billingTable">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Item <span style={{color : 'red'}}>*</span></th>
                        {/* <th>Item Category <span style={{color : 'red'}}>*</span></th> */}
                        <th>Charges(Rs) <span style={{color : 'red'}}>*</span></th>
                        <th>Quantity <span style={{color : 'red'}}>*</span></th>
                        <th id="discountperheading">Discount(%)</th>
                        <th id="discountrupees">Discount(Rs)</th>
                        <th>Total Amount(Rs)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {saveRow &&
                        saveRow.map((val, ind) => {
                          return (
                            <tr key={ind}>
                              <td className="text-center">{ind + 1}</td>
                              <td>
                                <input
                                  type="text"
                                 disabled = {isDisabled}
                                  placeholder="Item Name"
                                  id={`itemName${ind}`}
                                  value={
                                    val.itemName !== "" ? val.itemName : ""
                                  }
                                  onChange={(e) => {
                                   
                                      handleItemDetails(e, ind);
                                    }}
                                />

                                {showSearchBoxItem === ind ? (
                                  <div className="position-absolute opdmedicationsearchbox" id="listBox">
                                    <ul>
                                      {itemDetailsTemp &&
                                        itemDetailsTemp.map((v, index) => {
                                          return (
                                            <li key={index}
                                              onClick={() => {
                                                handlClick(ind, v);
                                              }}
                                            >
                                              {v.itemName}
                                            </li>
                                          );
                                        })}
                                    </ul>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>
                              {/* <td>
                                <input
                                  type="text"
                                  id={`categoryName${ind}`}
                                  placeholder="Category Name"
                                  disabled="true"
                                  value={val.categoryName}
                                />
                              </td> */}
                              <td>
                                <input
                                  type="text"
                                  className=""
                                  id={`itemCharge${ind}`}
                                  name="itemCharge"
                                  placeholder="Item Price"
                                  disabled="true"
                                  value={val.itemCharge}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className=""
                                  placeholder="Enter Quantity"
                                  id={`itemQuantity${ind}`}
                                  name="itemQuantity"
                                  min="0"
                                  value={val.itemQuantity}
                                  onChange={(e) => {
                                    handleOnchangeNumbers(e, ind);
                                  }}
                                />
                              </td>
                              {showdiscountPer && (
                              <td>
                             
        <input
          type="number"
          className=""
          placeholder="0.0"
          id={`discountPer${ind}`}
          value={val.discountPer}
          name="discountPer"
          min="0"
          onChange={(e) => {
            handleOnchangeNumbers(e, ind);
          }}
        />
            </td>
      )}
                          {showdiscount && (
 <td>
 <input
   type="number"
   className=""
   placeholder="0.0"
   id={`discountRs${ind}`}
   name="discountRs"
   value={val.discountRs}
   onKeyDown={handleTabKey}
   min="0"
   onChange={(e) => {
     handleOnchangeNumbers(e, ind);
   }}
 />
</td>
                          )}
                             
                              <td>
                                <input
                                  type="number"
                                  className=""
                                  placeholder="0.0"
                                  id={`totalAmount${ind}`}
                                  name="totalAmount"
                                  disabled="true"
                                  value={val.totalAmount}
                                  min="0"
                                  onChange={(e) => {
                                    handleOnchangeNumbers(e, ind);
                                  }}
                                />
                              </td>
                              <td>
                                <div className="action-button">
                                  {" "}
                                  <i class="bi bi-plus" onClick={handleAddRow} ></i>{" "}
                                  <i
                                    class="bi bi-trash3"
                                    id={`removeRowId${ind}`}
                                    onClick={() => {
                                      removeRow(ind);
                                    }}
                                  ></i>
                                 
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 
          showToaster */}

          {/* {showToster === 1 ? (
            <SuccessToster
              handle={setShowToster}
              message="Data Save SuccessFully !!"
            />
          ) : (
            ""
          )}

          {showAlertToster === 1 ? (
            <AlertToster handle={setShowAlertToster} message={showMessage} />
          ) : (
            ""
          )} */}

         

          <div className="row">
            <div className="col-md-6 mt-3">
              <div className="med-box">
                <div class="title">Transaction Details</div>
                <div className="inner-content">
                  <div class="mb-2" id="discountByRemark">
                    <label for="DiscountBy" class="form-label">
                      <img src={imgDiscount} alt='' /> Discount By
                      {/* <span class="starMandatory">*</span> */}
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="discountBy"
                      placeholder="Enter Discount By"
                      name="discountBy"
                      onChange={HandlePaymentDetails}
                    />
                  </div>
                  <div class="mb-2" id="paymentModediv">
                    <label for="PaymentMode" class="form-label">
                      <img src={imgPaymentMode} alt=''/> Payment Mode{" "}
                      <span class="starMandatory">*</span>
                    </label>
                    <select id="Payment" disabled={isPaymentDisabled}
                      class="form-control form-control-sm"
                      value={pamentMode}
                      onChange={handlePaymentMode}
                    >
                      <option value="0" selected>Select Payment Mode</option>
                      <option value="1">
                        By Cash
                      </option>
                      <option value="2">By Card</option>
                      <option value="3">By Cheque</option>
                      <option value="4">By Online Payment</option>
                      {/* <option value={0}>By Online Payment</option> */}
                    </select>
                  </div>

                  <div class="mb-2" id="paymentModeCard">
                    <label for="byCard" class="form-label">
                      <img src={imgCardNo}alt='' /> Card No
                      <span class="starMandatory">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="byCard"
                      placeholder="Enter Card Number"
                      name="byCard"
                      onChange={HandlePaymentDetails}
                    />
                  </div>
                  <div class="mb-2" id="paymentModeRefNo">
                    <label for="byOnline" class="form-label">
                      <img src={imgCardNo} alt=''/> RefNo
                      <span class="starMandatory">*</span>
                    </label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="refNo"
                      placeholder="Enter UPI Ref. Number"
                      name="refNo"
                      onChange={HandlePaymentDetails}
                    />
                  </div>
                  <div className="container-fluid mb-2 p-0" id="bnkdetails">
                    <div class="row">
                      <div className="col-md-4">
                        <label for="bank" class="form-label">
                          <img src={imgBank}alt='' /> Bank
                          <span class="starMandatory">*</span>
                        </label>
                        <select className="form-control form-control-sm" id="selectBank">
                          <option value="0">Select Bank</option>
                          {bankList &&
                            bankList.map((val, ind) => {
                              return (
                                <option value={val.id}>{val.bankName}</option>
                              );
                            })}
                        </select>
                        {/* <input
                          type="text"
                          class="form-control form-control-sm"
                          id="bank"
                          placeholder="Enter Bank Name"
                          name="bank"
                          onChange={HandlePaymentDetails}
                        /> */}
                      </div>
                      <div className="col-md-4">
                        <label for="chequeNo" class="form-label">
                          <img src={imgCheque} alt=''/> Cheque No.
                          <span class="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          id="chequeNo"
                          placeholder="Enter Cheque No."
                          name="chequeNo"
                          onChange={HandlePaymentDetails}
                        />
                      </div>
                      <div className="col-md-4">
                        <label for="chequeDate" class="form-label">
                          <img src={imgCheque} alt='' /> Cheque Date.
                          <span class="starMandatory">*</span>
                        </label>
                        <input
                          type="date"
                          class="form-control form-control-sm"
                          id="chequeDate"
                          name="chequeDate"
                          min={new Date().toISOString().split('T')[0]}
                          onChange={HandlePaymentDetails}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="container-fluid mb-2 p-0" id="crdBillDetails">
                    <div class="row">
                      <div className="col-md-4">
                        <label for="cardNo" class="form-label">
                          <img src={imgCardNo} alt=''/> Card No.
                          <span class="starMandatory">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-sm"
                          id="bnkCardNo"
                          placeholder="Enter Card No."
                          name="bnkCardNo"
                          onChange={HandlePaymentDetails}
                        />
                      </div>
                      <div className="col-md-4">
                        <label for="Bill" class="form-label">
                          <img src={imgBill} alt=''/> Bill
                          <span class="starMandatory">*</span>
                        </label>
                        <select class="form-control form-control-sm" id="Bill" onChange={companyTypeList}>
                          <option value="0">Select Bill Type</option>
                          {
                           
                               billType && billType.map((val, ind) => {
                                 return(
                              <option value={val.id}>{val.billType}</option>
                             ) })
                            
                          }
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label for="Company" class="form-label">
                          <img src={imgCompany} alt=''/> Company
                          <span class="starMandatory">*</span>
                        </label>
                        <select
                          class="form-control form-control-sm"
                          id="Company"
                        >
                          <option value="0">Select Company</option>
                         {
                          companyType && companyType.map((val, ind) => {
return(
<option value={val.companyId}>{val.companyName}</option>
)
                          })
                         }</select>
                      </div>
                    </div>
                  </div>

                  <div className="container-fluid mb-2 p-0" id="refNoDetails">
                    <div class="mb-2">
                      <label for="bedName" class="form-label">
                        <img src={imgRef} alt=''/> Ref. No.{" "}
                        <span class="starMandatory">*</span>
                      </label>
                      <input
                        type="email"
                        class="form-control form-control-sm"
                        id="bedName"
                        placeholder="Enter Bed Name"
                        name="bedName"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mt-3">
              <div className="med-box">
                <div class="title">Amount Details</div>
                <div className="med-table-section">
                  <table className="med-table border-bottom border_ striped_ mt-1">
                    <tbody>
                      <tr>
                        <td>
                          <b className="color546788">Total Amount(Rs)</b>
                        </td>
                        <td>
                          <b className="color546788">{totalSum || 0}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">Total Discount(Rs)</b>
                        </td>
                        <td>
                          <b className="color546788">{totalDiscountSum || 0}</b>
                        </td>
                      </tr>
                      <tr>
                        {/* <td>
                          <b className="color546788">Advance Amount(Rs)</b>
                        </td>
                        <td>
                          <b className="color546788">{payableAmount}</b>
                        </td> */}
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">Balance Amount(Rs)</b>
                        </td>
                        <td>
                          <b className="color546788">{!isNaN(balanceAmount) ? balanceAmount.toFixed(2) : 0}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">
                            Total Payable Amount(Rs)
                          </b>
                        </td>
                        <td>
                          <b className="color546788">{!isNaN(payableAmount) ? payableAmount.toFixed(2)  : 0}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color319731">Paid Amount(Rs)</b>
                        </td>
                        <td>
                          <input
                            type="number"
                            id="totalPaidAmount"
                            name="totalPaidAmount"
                            value={totalPaidAmount.toFixed(2) || 0}
                            className="color319731"
                            onChange={handlePaidAmount}
                            disabled
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-1">
            <div className="col-12">
              <div className="med-box">
                <div class="inner-content text-right">
                  <div class="mb-2 mt-2 relative">
                    <div>
                      <button
                        type="button"
                        class="btn btn-save btn-save-fill btn-sm mb-1_ me-1"
                        onClick={saveBillingData}
                      >
                        <img src={saveButtonIcon} className="icnn" alt='' />
                        Save
                      </button>
                      <button
                        type="button"
                        class="btn btn-clear btn-sm mb-1_ me-1"
                        onClick={clearBillingData}
                      >
                        <img src={imgReset} alt='' /> Reset
                      </button>
                      {/* <button
                        type="button"
                        class="btn btn-clear btn-sm mb-1_ me-1"
                        onClick={handlePrintBill}
                      >
                        <img src={imgPrint} alt=''/> Last Print
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      </section>
    </>
  );
}
