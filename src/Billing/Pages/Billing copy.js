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
import GetTrustBillList from "../API/getTrustBillList";
import GetBankNameList from "../API/getBankNameList";
import getBillType from "../API/billType";
import getCompanyType from "../API/companyType";
// import SuccessToster from '../../../Components/SuccessToster';
// import AlertToster from '../../../Components/AlertToster';
import getItems from "../API/getItems";
import Search from "../../Code/Serach";
import { useState ,useRef} from "react";
import { useEffect } from "react";
import getAllTpaCompany from "../API/getAllTpaCompany";
import GerItemRateByCompany from "../API/GerItemRateByCompany";

export default function Billing() {
  let data = {
    itemId: 0,
    itemID: 0,
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
    itemID: 0,
    totalDiscount: 0,
    uhid: 0,
  };
  let handlerChange = () => {};

  let [UHID, setUHID] = useState(0);
  let [pamentMode, setPaymentMode] = useState(1);
  let [patientDetails, setPatientDetails] = useState();
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
  let [selectedCompanyName, setselectedCompanyName] = useState('')
  let [ratebyCompanyName, setratebyCompanyName] = useState([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Paid');
  const inputRef = useRef(null);




  const totalBalanceAmount = 0;


  let getItemRate = async () =>{
    inputRef.current.disabled = false;
    let Paid = document.getElementById("CashBill").value
    if(Paid === 'Paid'){
      let companyName = await GerItemRateByCompany()
      if(companyName.status === 1){
        setratebyCompanyName(companyName.responseValue)
        console.log("companyName",companyName.responseValue)
  }
    }
      
  }
  let getItemRateByCompany = async (e) =>{

    let ID = document.getElementById("CompanyId").value
    let Companychecked = document.getElementById("Company").value 
    if(Companychecked === "Company"){
      if (ID === "0") {
        inputRef.current.disabled = true;
      } else {
        inputRef.current.disabled = false;
      }
      setselectedCompanyName(ID)
      let companyName = await GerItemRateByCompany(ID)
      if(companyName.status === 1){
        setratebyCompanyName(companyName.responseValue)
        console.log("companyName",companyName.responseValue)
  }
    }
   
  }


  let companyTypeList = async (e) => {
      let billtypeId = e.target.value;      
     var response = await getCompanyType(billtypeId);
    setCompanyType(response.responseValue);

  }

  let handlePaymentChecked = (e) => {
    let evalue = e.target.value;

    if (evalue === "Paid") {
      inputRef.current.disabled = false;
      getItemRate()
      setShowSearchBoxItem(-1)
      
      clearBillingData();
      document.getElementById("bnkdetails").style.display = "none";
      document.getElementById("crdBillDetails").style.display = "none";
      document.getElementById("refNoDetails").style.display = "none";
      document.getElementById("paymentModediv").style.display = "block";
      document.getElementById("CompanyBillId").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
    } else if (evalue === "Company") {
      inputRef.current.disabled = true;
      setShowSearchBoxItem(-1)
      getItemRateByCompany();
      clearBillingData();
    
      handleTrustBill(evalue);
      document.getElementById("bnkdetails").style.display = "none";
      document.getElementById("crdBillDetails").style.display = "none";
      document.getElementById("refNoDetails").style.display = "none";
      document.getElementById("paymentModediv").style.display = "block";
      document.getElementById("CompanyBillId").style.display = "block";
      document.getElementById("paymentModeRefNo").style.display = "none";
    } 
  };

  let getConpanyDetails = async () => {
        let companycheck = document.getElementById("Company").value;
        let Paidcheck = document.getElementById("CashBill").value;
    
        if (Paidcheck === "Paid") {
          setratebyCompanyName([]);
          let companyName = await GerItemRateByCompany();
          if (companyName.status === 1) {
            setratebyCompanyName(companyName.responseValue);
            console.log("companyName", companyName.responseValue);
          }
        } else if (companycheck === "Company") {
          setratebyCompanyName([]);
          const selectedId = selectedCompanyName 
          setselectedCompanyName(selectedId);
          let companyName = await GerItemRateByCompany(selectedId);
          if (companyName.status === 1) {
            setratebyCompanyName(companyName.responseValue);
            console.log("companyName", companyName.responseValue);
          }
        }
  };


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
    
    let UHID = e.target.value;
    setUHID(UHID);
    let data = await PatientDetail(UHID, 0);

    let dt = data.responseValue[0];

    setPatientDetails(dt);    
    // setSaveRow([...itemDetails]);
    //clearBillingData();
  };

  let itemDetailsOnLoad = async () => {
    let itemDetails = await getItems();
    let itemDt = itemDetails.responseValue;
    setItemDetails(itemDt);
    setItemDetailsTemp(itemDt);
  };

  useEffect(() => {
    itemDetailsOnLoad();
    getItemRateByCompany()
    getItemRate()
    document.getElementById("bnkdetails").style.display = "none";
    document.getElementById("crdBillDetails").style.display = "none";
    document.getElementById("refNoDetails").style.display = "none";
    document.getElementById("paymentModeCard").style.display = "none";
    document.getElementById("discountByRemark").style.display = "none";
    document.getElementById("CompanyBillId").style.display = "none";
    document.getElementById("paymentModeRefNo").style.display = "none";
  }, []);

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
      temp[ind]["itemQuantity"] = 1;
      temp[ind]["discountRs"] = 0;
      temp[ind]["discountPer"] = 0;
      temp[ind]["totalAmount"] = 0;
      temp[ind]["billMasterID"] = 0;
      temp[ind]["billNo"] = 0;
      temp[ind]["billTypeId"] = 0;
      temp[ind]["itemID"] = 0;
      temp[ind]["totalDiscount"] = 0;
      temp[ind]["uhid"] = 0;
      setSaveRow([...temp]);
      let response = Search(itemDetails, value);
      if (response != 0) {
        setItemDetailsTemp(response);
        setShowSearchBoxItem(ind);
      } else {
        setShowSearchBoxItem(ind);
      }
    } else {
      let temp = [...saveRow];
      temp[ind]["itemName"] = "";
      setSaveRow(temp);
      setShowSearchBoxItem(-1);
    }
  };

  let handlClick = (ind, data) => {
    let temp = [...saveRow];

    temp[ind]["itemId"] = data.id;
    temp[ind]["itemName"] = data.itemName;
    temp[ind]["categoryName"] = data.categoryName;
    temp[ind]["itemCharge"] = data.itemCharge;
    temp[ind]["categoryId"] = data.categoryId;
    temp[ind]["itemQuantity"] = 0;
    temp[ind]["discountRs"] = 0;
    temp[ind]["discountPer"] = 0;
    temp[ind]["totalAmount"] = 0;
    temp[ind]["billMasterID"] = 0;
    temp[ind]["billNo"] = 0;
    temp[ind]["billTypeId"] = 0;
    temp[ind]["itemID"] = data.id;
    temp[ind]["totalDiscount"] = 0;
    temp[ind]["uhid"] = 0;

    document.getElementById("itemName" + ind).value = data.itemName;
    setShowSearchBoxItem(-1);
    setSaveRow(temp);
  };

  let handleOnchangeNumbers = (e, ind) => {
    let value = e.target.value;
    let name = e.target.name;
    let temp = [...saveRow];

    if (name === "itemQuantity") {
      temp[ind]["itemQuantity"] = value;

      //CalculateTotal
      let totalcharges = parseInt(
        saveRow[ind]["itemCharge"] ? saveRow[ind]["itemCharge"] : 0
      );
      let totalQunatity = parseInt(value);
      let totalDiscount = parseInt(
        saveRow[ind]["discountRs"] ? saveRow[ind]["discountRs"] : 0
      );

      // console.log(
      //   "totalcharges=>",
      //   totalcharges * totalQunatity - totalDiscount
      // );
      //console.log('totalDiscount=>', totalDiscount);

      setTotalAmount(totalcharges * totalQunatity - totalDiscount);
      temp[ind]["totalAmount"] = totalcharges * totalQunatity - totalDiscount;

      // calculateTotalSum
      setActualTotalAmount(totalcharges * totalQunatity);
      temp[ind]["actualTotalAmount"] = totalcharges * totalQunatity;

      const tempVal = temp.map((t) => t.actualTotalAmount);
      const sum = tempVal.reduce(function (a, b) {
        return a + b;
      }, 0);

      // console.log("data",typeof temp[0].discountRs)
      const tempDis = temp.map((d) => parseInt(d.discountRs));
      const sumDis = tempDis.reduce(function (x, y) {
        return x + y;
      });

      settotalSum(sum);
      setTotalDiscountSum(sumDis);
      totalPayableAmount(sum, sumDis, 0, 0);
      setSaveRow(temp);
    }

    if (name === "discountPer") {
      if (totalAmount > 0) {
        if (value > 100) {
          alert("Cannot Discount more than Total Amount");
          return;
        } else {
          let dper = (totalAmount * value) / 100;
          let toamountAfterDis = totalAmount - dper;
          temp[ind]["discountRs"] = dper;
          temp[ind]["totalAmount"] = toamountAfterDis;
          temp[ind]["discountPer"] = value;

          document.getElementById("discountByRemark").style.display = "block";
        }
      }

      const tempDis = temp.map((d) => parseInt(d.discountRs));
      const sumDis = tempDis.reduce(function (x, y) {
        return x + y;
      });
      setTotalDiscountSum(sumDis);
      totalPayableAmount(totalSum, sumDis, 0, 0);
      setSaveRow(temp);
    }
    if (name === "discountRs") {
      temp[ind]["discountPer"] = 0;
      let tamt = totalAmount;

      if (value > tamt && tamt > 0) {
        alert("Cannot Discount more than Total Amount");
        return;
      } else {

       
       temp[ind]["discountRs"] = value;
        
        let tad = tamt - value;
        // console.log(' tad ?', tad);
        temp[ind]["totalAmount"] = tad;
        document.getElementById("discountByRemark").style.display = "block";
      }

      // calculateTotalSum

      const tempDis = temp.map((d) => parseInt(d.discountRs));
      const sumDis = tempDis.reduce(function (x, y) {
        return x + y;
      });
      setTotalDiscountSum(sumDis);
      totalPayableAmount(totalSum, sumDis, 0, 0);
      setSaveRow(temp);
    }
    // if (name === "discountPer") {
    //   temp[ind]["discountPer"] = value;
    //   setSaveRow(temp);
    // }
    if (name === "totalAmount") {
      temp[ind]["id"] = 0;
      temp[ind]["totalAmount"] = value;
      setSaveRow(temp);
    }

    setSaveRow(temp);
  };

  //TabKey
  let handleTabKey = async (e) => {
    if (e.key === "Tab") {
      setSaveRow([...saveRow, data]);
    }
  };

  // Remove Row Start
  let removeRow = (ind) => {
    let temp = [...saveRow];

    let removeActualAmt = saveRow[ind]["actualTotalAmount"];
    let removeDisAmt = saveRow[ind]["discountRs"];

    let afterRemoveLeftTotal = totalSum - removeActualAmt;
    let afterRemoveLeftDiscnt = totalDiscountSum - removeDisAmt;
    let afterRemovePayableAmount = afterRemoveLeftTotal - afterRemoveLeftDiscnt;

    settotalSum(afterRemoveLeftTotal);
    setTotalDiscountSum(afterRemoveLeftDiscnt);

    setpayableAmount(afterRemovePayableAmount);
    setTotalPaidAmount(afterRemovePayableAmount);

    temp.splice(ind, 1);
    if (temp.length > 0) {
      setSaveRow(temp);
      // let showLastRow = temp.length -1;
    } else {
      setSaveRow([data]);
      document.getElementById("itemName" + ind).value = "";
      document.getElementById("discountByRemark").style.display = "none";
    }
  };
  // Remove Row End

  const totalPayableAmount = async (
    totalAmt,
    totalDiscnt,
    advanceRs,
    BalanceAmt
  ) => {
    let amtAfterDiscount = totalAmt - totalDiscnt;
    let amtAfterlessAdvance = amtAfterDiscount - advanceRs;
    let amtAfterAddBlnce = amtAfterlessAdvance + BalanceAmt;

    setpayableAmount(amtAfterAddBlnce);
    setTotalPaidAmount(amtAfterAddBlnce);
  };

  let handlePaidAmount = () => {
    let paidAmount = document.getElementById("totalPaidAmount").value;
    setTotalPaidAmount(paidAmount);
  };

  //****Clear */
  let clearBillingData = () => {
    setUHID(0);
    setPaymentMode(0);
    setPatientDetails();
    setItemDetailsTemp([data]);
    setpayableAmount(0);
    setTotalPaidAmount(0);
    setDiscountBy("");
    setTotalAmount(0);
    settotalSum(0);
    setTotalDiscountSum(0);
    setByCard("");
    setRefNo(0);
    setSaveRow([data]);    
    document.getElementById("discountByRemark").style.display = "none";
    document.getElementById("UHID").value="";
    document.getElementById("CompanyId").value="0";
  };

  // *******PaymentDetails****** //

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
    console.log("Companies List" , responseTrustBill.responseValue)
    
  };

  let GetBankList = async () => {
    var response = await GetBankNameList();
    setBankList(response.responseValue);
    console.log("this is responsesss", response);
  };

  let billTypeList = async () =>{
      var response = await getBillType();
      console.log('thisBillType: ', response);
      setBillType(response.responseValue);
  }



  // let handleDDLTrustBill = async (e) =>{
  //   let ddlValue = e.target.value;
  //   setDdlTrustBill(ddlValue);
  // }
  // let handleDDLBank = (e) =>{
  //   let ddlValue = e.target.value;
  //   setDdlBank(ddlValue);
  // }
  // let handleDDLBillType = (e) => {
  //   let ddlValue = e.target.value;
  //   setDdlBillType(ddlValue);
  // }

  // let handleDDLCompany = (e) => {
    
  //   let ddlValue = e.target.value;
  //   setDdlCompany(ddlValue);
  // }
  // let handleItemByCompany = async (e) =>{
  //   let companycheck = document.getElementById("Company").value
  //   let Paidcheck = document.getElementById("CashBill").value
  //   console.log('Paidcheck',Paidcheck);
  //   if(Paidcheck === 'CashBill'){
  //     let companyName = await GerItemRateByCompany()
  //     if(companyName.status === 1){
        
  //       setratebyCompanyName(companyName.responseValue)
  //       console.log("companyName",companyName.responseValue)
  //   }
  // }
   
  // else  if(companycheck === 'Company'){
  //     const selectedId = e.target.value;
  //     setselectedCompanyName(selectedId)
  //     let companyName = await GerItemRateByCompany(selectedId)
  //     if(companyName.status === 1){
        
  //       setratebyCompanyName(companyName.responseValue)
  //       console.log("companyName",companyName.responseValue)
  //     }
  //   }
  
  // }
  //*****saveDetails */

  let saveBillingData = async () => {
    if (UHID != 0) {
      const uhid = UHID;
      const billTypeId = 1 //check it is discharge or normal Bill (this is normal)
      const insauranceCardNo = insCardNo;
      const CreditTypeId = ddlBillType; //crdeitType - companyType
      const CompanyId = ddlCompany;
      const TotalAmount = totalSum;
      const TotalDiscount = totalDiscountSum;
      const TotalPaybleAmount = payableAmount;
      const TotalPaidAmount = totalPaidAmount;
  
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
     // const DiscountRemark = (discountBy = "undefined" ? null : discountBy);
      const UserID = window.userId == "" || "undefined" ? 0 : window.userId;
      const PaymentMode = pamentMode;
      const PaymentTransactionNumber = refNo;
      const JsonData = JSON.stringify(saveRow);
      
      
      const cardNo = (byCard = "undefined" ? null : byCard);  //not in table  
      
      const bankId = ddlBank;
      const ChequeNo = chequeNo;
      const ChequeDate = chequeDate;
      const trustTypeId = ddlTrusBill
      

      let saveBillingData = {
        uhid,
        billTypeId,
        //insauranceCardNo ,
        //CreditTypeId,
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
        trustTypeId 
              
      };

      console.log("saveBillingData22", saveBillingData);
      let responseData = await saveBillingDetails(saveBillingData);

      console.log('biliii ::' ,responseData);
      let billNumber = responseData.responseValue[0].billNumber;

      handlePrintBill(billNumber);
      clearBillingData();
     
      // console.log('sumTotalAmount',sumTotalAmount);
      // console.log('totalDiscountSum',totalDisSum);
      // console.log('payableAmount',pybleAmount);
      // console.log('paidAmount',pdAmount);
      // console.log('jsonData',jsonData);

      // console.log('discntBy',discntBy);
      // console.log('carddNo',crddNo);
      // console.log('rfNo',rfNo);
    } else {
      alert("UHID is required");
    }
  };




  //*****endSaveDetails */
  //*******Print */
  let handlePrintBill = async (billNumber) => {
    console.log('Bill No ::' ,billNumber );
    let data = await PatientDetail(0, billNumber);

    if (data.status === 1) {
      // setShowToster(1);
      window.sessionStorage.setItem(
        "PringBillingDetails",
        JSON.stringify(data.responseValue)
      );
      window.open("/billingcahcounterprint/", "noopener,noreferrer");
    } else {
      // setShowAlertToster(0);
      alert("Not Saved");
    }
  };
  //*** */

  // useEffect(() => {
  //   async function fetchData(e) {
  //     let companycheck = document.getElementById("Company").value;
  //     let Paidcheck = document.getElementById("CashBill").value;
  
  //     if (Paidcheck === "CashBill") {
  //       let companyName = await GerItemRateByCompany();
  //       if (companyName.status === 1) {
  //         setratebyCompanyName(companyName.responseValue);
  //         console.log("companyName", companyName.responseValue);
  //       }
  //     } else if (companycheck === "Company") {
  //       const selectedId = selectedCompanyName 
  //       setselectedCompanyName(selectedId);
  //       let companyName = await GerItemRateByCompany(selectedId);
  //       if (companyName.status === 1) {
  //         setratebyCompanyName(companyName.responseValue);
  //         console.log("companyName", companyName.responseValue);
  //       }
  //     }
  //   }
  
  //   fetchData(); // Call the async function to execute the code
  // }, []);
  
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div class="title">Patient Details</div>
                <div className="inner-content">
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <div className="d-flex flex-wrap column-gap-4 row-gap-2 regularCheck">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="CashBill"
                            value="Paid"
                            onChange={handlePaymentChecked}
                            defaultChecked
                          />
                          <label class="form-check-label" for="CashBill">
                          Paid
                          </label>
                        </div>

                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="Company"
                            value="Company"
                            onChange={handlePaymentChecked}
                          />
                          <label class="form-check-label" for="Company">
                           Company <span class="starMandatory">*</span>
                          </label>
                        </div>

                     

                        {/* <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkBox"
                            name="exampleRadios"
                            id="DirectBill"
                            value="DirectBill"
                            onChange={handlePaymentChecked}
                          />
                          <label class="form-check-label" for="DirectBill">
                            Direct Bill
                          </label>
                        </div> */}
                      </div>

                      <div className="d-flex flex-wrap align-content-end column-gap-2 row-gap-2 mt-2">
                        <div>
                          <img src={Page} />{" "}
                          <label for="UHID" class="form-label">
                            UHID <span class="starMandatory">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            id="UHID"
                            placeholder="Enter UHID"
                            name="UHID"
                            maxLength={11}
                            onChange={handleUhidEvent}
                          />
                        </div>

                        {/* <div class="mb-2" id="trustBillId">
                          <label HtmlFor="TrustBill" class="form-label">
                           Company
                          </label>
                          <select class="form-control form-control-sm" onChange={handleDDLTrustBill}>
                            <option value="0">Select Company</option>
                            {trustBill &&
                              trustBill.map((val, ind) => {
                                return (
                                  <option value={val.id}>
                                    {val.trustName}
                                  </option>
                                );
                              })}
                          </select>
                        </div> */}

                      <div class="mb-2" id="CompanyBillId">
                          <label HtmlFor="TrustBill" class="form-label">
                           Company
                          </label>
                          <select class="form-control form-control-sm"  id="CompanyId" onChange={getItemRateByCompany} >
                            <option value='0'>Select Company</option>
                            {companyBill &&
                              companyBill.map((val, ind) => {
                                return (
                                  <option value={val.id}>
                                    {val.companyname}
                                  </option>
                                );
                              })}
                          </select>
                        </div>

                        <div className="d-none">
                          <img src={Page} />{" "}
                          <label for="VisitNo" class="form-label">
                            Visit No. <span class="starMandatory">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            id="VisitNo"
                            placeholder="Enter Bed Visit No."
                            name="VisitNo"
                          />
                        </div>

                        <div className="d-none">
                          <img src={Page} />{" "}
                          <label for="IPNo" class="form-label">
                            IP No. <span class="starMandatory">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control form-control-sm"
                            id="IPNo"
                            placeholder="Enter IP No."
                            name="IPNo"
                          />
                        </div>
                      </div>
                    </div>
                    {/* ---col-6-- */}
                    {patientDetails && (
                      <div className="col-md-7 column-leftBorder mb-3">
                        <div className="right-ptDetails column-gap-5 row-gap-3">
                          <div>
                            <img src={user3} />{" "}
                            <label class="form-label">Patient Name</label>
                            <span className="span-ptDetails">
                              {patientDetails.patientName}
                            </span>
                          </div>

                          <div>
                            <img src={category} />{" "}
                            <label class="form-label">Gender</label>
                            <span className="span-ptDetails">
                              {patientDetails.gender}
                            </span>
                          </div>

                          <div>
                            <img src={question} />{" "}
                            <label class="form-label">Age</label>
                            <span className="span-ptDetails">
                              {patientDetails.age}
                            </span>
                          </div>

                          <div className="d-none">
                            <img src={category} />{" "}
                            <label class="form-label">Patient Category</label>
                            <span className="span-ptDetails">General</span>
                          </div>

                          <div className="d-none">
                            <img src={medicalAssistance} />{" "}
                            <label class="form-label">Doctor</label>
                            <span className="span-ptDetails"></span>
                          </div>

                          <div>
                            <img src={medicalRoom} />{" "}
                            <label class="form-label">Ward</label>
                            <span className="span-ptDetails">
                              {patientDetails.wardName}
                            </span>
                          </div>
                          <div>
                            <img src={imgDepartment} />{" "}
                            <label class="form-label">Department</label>
                            <span className="span-ptDetails">
                              {patientDetails.departName}
                            </span>
                          </div>
                          <div className="d-none">
                            <img src={imgBillNo} />{" "}
                            <label class="form-label">Bill No.</label>
                            <span className="span-ptDetails">
                              {patientDetails.billNo}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    {/* --col-6--- */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <div className="med-box">
                <div
                  className="med-table-section"
                  style={{ minHeight: "195px" }}
                >
                  <table className="med-table border_ striped billingTable">
                    <thead>
                      <tr>
                        <th className="text-center">#</th>
                        <th>Item</th>
                        <th>Item Category</th>
                        <th>Charges(Rs)</th>
                        <th>Quantity</th>
                        <th>Discount(%)</th>
                        <th>Discount(Rs)</th>
                        <th>Total Amount(Rs)</th>
                        <th>Status</th>
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
                                  ref={inputRef}
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
                                            <li
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
                              <td>
                                <input
                                  type="text"
                                  id={`categoryName${ind}`}
                                  placeholder="Category Name"
                                  disabled="true"
                                  value={val.categoryName}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="did-floating-input"
                                  id={`itemCharge${ind}`}
                                  name="itemCharge"
                                  placeholder="item Price"
                                  disabled="true"
                                  value={val.itemCharge}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className="did-floating-input"
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
                              <td>
                                <input
                                  type="number"
                                  className="did-floating-input"
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
                              <td>
                                <input
                                  type="number"
                                  className="did-floating-input"
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
                              <td>
                                <input
                                  type="number"
                                  className="did-floating-input"
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
                      <img src={imgDiscount} /> Discount By
                      <span class="starMandatory">*</span>
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
                      <img src={imgPaymentMode} /> Payment Mode{" "}
                      <span class="starMandatory">*</span>
                    </label>
                    <select
                      class="form-control form-control-sm"
                      value={pamentMode}
                      onChange={handlePaymentMode}
                    >
                      <option value="0">Select Payment Mode</option>
                      <option value="1" selected>
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
                      <img src={imgCardNo} /> Card No
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
                      <img src={imgCardNo} /> RefNo
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
                          <img src={imgBank} /> Bank
                          <span class="starMandatory">*</span>
                        </label>
                        <select className="form-control form-control-sm">
                          <option value="">Select Bank</option>
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
                          <img src={imgCheque} /> Cheque No.
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
                          <img src={imgCheque} /> Cheque Date.
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
                          <img src={imgCardNo} /> Card No.
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
                          <img src={imgBill} /> Bill
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
                     
                    </div>
                  </div>

                  <div className="container-fluid mb-2 p-0" id="refNoDetails">
                    <div class="mb-2">
                      <label for="bedName" class="form-label">
                        <img src={imgRef} /> Ref. No.{" "}
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
                          <b className="color546788">{totalSum}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">Total Discount(Rs)</b>
                        </td>
                        <td>
                          <b className="color546788">{totalDiscountSum}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">Advance Amount(Rs)</b>
                        </td>
                        <td>
                          <b className="color546788">{advanceAmount}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">Balance Amount(Rs)</b>
                        </td>
                        <td>
                          <b className="color546788">{balanceAmount}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">
                            Total Payable Amount(Rs)
                          </b>
                        </td>
                        <td>
                          <b className="color546788">{payableAmount}</b>
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
                            value={totalPaidAmount}
                            className="color319731"
                            onChange={handlePaidAmount}
                          ></input>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
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
                        <img src={saveButtonIcon} className="icnn" />
                        Save
                      </button>
                      <button
                        type="button"
                        class="btn btn-save btn-sm mb-1_ me-1"
                        onClick={clearBillingData}
                      >
                        <img src={imgReset} /> Reset
                      </button>
                      <button
                        type="button"
                        class="btn btn-save btn-sm mb-1_ me-1"
                        onClick={handlePrintBill}
                      >
                        <img src={imgPrint} /> Last Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
