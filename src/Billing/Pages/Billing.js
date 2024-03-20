import React from "react";
import Page from "../../assets/images/icons/Page-1.svg";
import user3 from "../../assets/images/icons/user (3).svg";
import question from "../../assets/images/icons/question.svg";
import category from "../../assets/images/icons/category.svg";
import medicalRoom from "../../assets/images/icons/medical-room.svg";
import imgDepartment from "../../assets/images/icons/imgDepartment.svg";
import imgReset from "../../assets/images/icons/reset.svg";
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
import GetBankNameList from "../API/getBankNameList"
import getCompanyType from "../API/companyType";
import getItems from "../API/getItems";
import Search from "../../Code/Serach";
import { useState} from "react";
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
  let [actualTotalAmount, setActualTotalAmount] = useState(0);
  let [balanceAmount, setBalanceAmount] = useState(0);
  let [payableAmount, setpayableAmount] = useState(0);
  let [totalSum, settotalSum] = useState(0);
  let [totalDiscountSum, setTotalDiscountSum] = useState(0);
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
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showSuccessToster, setShowSuccessToster] = useState(0)
  let [showMessage, setShowMeassage] = useState("");
  const [showdiscountPer, setshowdiscountPer] = useState(true);
  const [showdiscount, setshowdiscount] = useState(true);
  const [showLimit, setshowLimit] = useState(false);
  const [AdvanceDetailsbyUhid, setAdvanceDetailsbyUhid] = useState([]);
  const [CreditLimit, setCreditLimit] = useState([]);
  const [IsItemDisable, setIsItemDisable] = useState(false);
  const [isPaymentDisabled, setisPaymentDisabled] = useState(false);
  const [IsPaidDisable, setIsPaidDisable] = useState(false);
  const [IsShowExceedLimit, setIsShowExceedLimit] = useState(0);
  const [IsDiscountDisable, setIsDiscountDisable] = useState(true);
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  



  let handleItemDetails = async (e, ind) => {
    let temp = [...saveRow];
    let value = e.target.value;
  
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


    } 

    else {
     
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
        
  }
      
  }




let GetPaymentModes = async()=>{
  let PaymentMode = await GetallPaymentMode()
  if(PaymentMode.status === 1){
    setPaymentModeList(PaymentMode.responseValue)
   
  }
}


  let companyTypeList = async (e) => {
      let billtypeId = e.target.value;      
     var response = await getCompanyType(billtypeId);
    setCompanyType(response.responseValue);

  }
  

  let handlePaymentMode = (e) => {
    let mode = e.target.value
    setPaymentMode(mode)
    if (mode == "0") {
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
    } else if (mode === "1") {
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
    } else if (mode === "2") {
 
      document.getElementById("paymentModeCard").style.display = "block";
      document.getElementById("paymentModeRefNo").style.display = "none";
      document.getElementById("bnkdetails").style.display = "none";
    } else if (mode === "3") {
      GetBankList();
      document.getElementById("bnkdetails").style.display = "block";
      document.getElementById("paymentModeCard").style.display = "none";
      document.getElementById("paymentModeRefNo").style.display = "none";
    } else if (mode === "4") {
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
    //setSaveRow([RowData])
    setBalanceAmount(0)
    setpayableAmount(0)
    setTotalAmount(0)
    setTotalDiscountSum(0)

    document.getElementById("totalPaidAmount").value = ""
    let UHID = e.target.value.toUpperCase();
 
    setUHID(UHID);
    setPatientDetails([])

  
    if (UHID.length !== 10) {
      document.getElementById('PName').value = '';
      document.getElementById('Pgender').value = '';
      document.getElementById('PAge').value = '';
      document.getElementById('PWard').value = '';
      document.getElementById('Pdepartment').value = '';
    
    }
    setIsPaidDisable(false)
    setshowLimit(false);
  
    let data = await PatientDetail(UHID, 0);
    if(data.status === 1){
      let dt = data.responseValue[0];
    setPatientDetails(dt);
   
    let investigation =
        dt.investigationId !== "" ? JSON.parse(dt.investigationId) : [];
        if (investigation.length === 0) {
          setSaveRow([RowData]);
        } else {
          let tempinv = [];
          let totalamount = 0;
          let totalDiscount = 0;
          investigation &&
            investigation.map((val, ind) => {
              let t = {
                itemId: 0,
                itemName: "",
                categoryName: "",
                itemCharge: "",
                categoryId: "",
                itemQuantity: 1,
                discountRs: 0,
                discountPer: 0,
                totalAmount: 0,
                actualTotalAmount: 0,
                billMasterID: 0,
                billNo: "",
                billTypeId: 0,
                tpaCompanyID: "",
                tpaReferenceNo: "",
                totalDiscount: 0,
                uhid: 0,
              };
              t.itemId = val.itemId;
              t.itemName = val.itemName;
              t.itemCharge = val.itemCost;
               
              t.totalAmount = val.itemCost * t.itemQuantity;
              t.actualTotalAmount = val.itemCost * t.itemQuantity;
              totalamount = totalamount + val.itemCost * t.itemQuantity;
              // totalDiscount = totalDiscount ;
  
              tempinv.push(t);
            });
            document.getElementById('totalPaidAmount').value = parseFloat(totalamount).toFixed(2)
          settotalSum(parseFloat(totalamount).toFixed(2));
          setpayableAmount(parseFloat(totalamount).toFixed(2))
          setTotalAmount(totalamount - totalDiscount)
  
          setSaveRow(tempinv);
        }
  
    let AdvanceDetails = await GetAllAdvanceDetails(UHID);
    if (AdvanceDetails.status === 1) {
      
      setAdvanceDetailsbyUhid(AdvanceDetails.responseValue);
      setisPaymentDisabled(true);
      setIsDiscountDisable(true)
      setIsItemDisable(false)
    }
  
    let CreditLimit = await GetCreditLimitofPatient(UHID);
  
    if (CreditLimit.status === 1 ) {
      setCreditLimit(CreditLimit.responseValue);
      setisPaymentDisabled(true);
      setIsPaidDisable(true)
      setIsItemDisable(false)
    }



    let CreditLimitvalue = CreditLimit.responseValue[0]?.remaining || 0;
    let CreditLimitTable = CreditLimit.responseValue[0]
    let InsuranceCompanyId = CreditLimit.responseValue[0]?.tpaCompanyID || 0;
    let advanceLimit = AdvanceDetails.responseValue[0]?.totalAdvance || 0;
    let advanceLimitStatus = AdvanceDetails.responseValue[0]?.limitStatus || 0;
    let PateintCashlessData = dt.isCashLess 
    
    if (CreditLimitvalue === 0 && advanceLimit === 0) {
      setisPaymentDisabled(false);
      setIsPaidDisable(true)
      setIsItemDisable(false)
    };
   
     if(CreditLimitTable && InsuranceCompanyId !== 0 ){
      setisPaymentDisabled(true);
      setIsDiscountDisable(true)
      setIsItemDisable(false)
      let companyName = await GerItemRateByCompany(InsuranceCompanyId)
      if(companyName.status === 1){
        setItemDetails(companyName.responseValue)
        setItemDetailsTemp(companyName.responseValue)
        setIsPaidDisable(true)
      }

      return
    }

      
    else if (InsuranceCompanyId === 0){
      let itemDetails = await getItems();
      let itemDt = itemDetails.responseValue;
      setItemDetails(itemDt);
      setItemDetailsTemp(itemDt);
      setisPaymentDisabled(false);
      setIsDiscountDisable(true)
      setIsItemDisable(false)
      setIsPaidDisable(true)
    }

   if(InsuranceCompanyId === 0 && PateintCashlessData === true  ){
    setShowAlertToster(1);
    setShowMeassage("Your cashless request is in under process please contact TPA office..!");
    setIsItemDisable(true)
    return;
   }



    if (advanceLimitStatus === 2){
      setisPaymentDisabled(false)
      setIsDiscountDisable(true)
      setIsItemDisable(false)
      return
      
    }
    if (advanceLimitStatus == 1 && advanceLimit > 0 ){
      itemDetailsOnLoad()
       setisPaymentDisabled(true)
      setIsDiscountDisable(true)
      setIsItemDisable(false)
      return
      
    }
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
      handleCalculations({
        target: {
          value: 1, 
          name: "itemQuantity",
        },
      }, ind);
     
    } 
    
    
    
    else {
      setShowAlertToster(1);
    setShowMeassage('Item is already selected');
    }

  };



  const handleCalculations = (e, index) => {

    let rowDataCopy = [...saveRow];
    const { name, value } = e.target;
    let qtyValue = parseFloat(value);
    let CreditLimitCompany = CreditLimit[0]?.tpaCompanyID;
    let CreditLimitRemaining = CreditLimit[0]?.remaining ;
    let CreditDetails = CreditLimit ;
    let currentStatus = CreditLimit[0]?.currentStatus ;
    let AdvanceAmount = AdvanceDetailsbyUhid[0]?.remaining
    let AdvanceAmountStatus = AdvanceDetailsbyUhid[0]?.limitStatus
    let AdvanceDetails = AdvanceDetailsbyUhid[0]
    let isCashLess = patientDetails.isCashLess
  
    const roundedQtyValue = !isNaN(qtyValue) ? parseFloat(qtyValue.toFixed(2)) : "";

    if (name === "itemQuantity") {

    if ( roundedQtyValue < 0){
      setShowAlertToster(1);
      setShowMeassage("Item Quantity should not be in negative..!!");
      return
    }

      if (CreditLimitCompany) {
        rowDataCopy[index] = {
            ...rowDataCopy[index],
            itemQuantity: roundedQtyValue,
            discountRs: parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge * (rowDataCopy[index].discountPer / 100)).toFixed(2),
             totalAmount: parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge * (1 - rowDataCopy[index].discountPer / 100)).toFixed(2),
             actualTotalAmount : parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge)
  
        }

        const discountSum = rowDataCopy.map((val) => {const discount = parseFloat(val.discountRs);
               return !isNaN(discount) ? discount : 0;
           });


           const totalDiscount = discountSum.reduce((total, discount) => {const discountValue = parseFloat(discount);
             return !isNaN(discountValue) ? total + discountValue : total;
         }, 0);


          const totalAmount = rowDataCopy.reduce((total, item) => total  +  (item.itemQuantity * item.itemCharge), 0);
          const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);

        setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
        setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
        setBalanceAmount(parseFloat(totalPayable).toFixed(2))
        settotalSum(parseFloat(totalAmount).toFixed(2))
        setpayableAmount(parseFloat(0).toFixed(2));  

         if(totalAmount > CreditLimitRemaining &&  currentStatus === 1 &&  !IsShowExceedLimit ){
          let CreditLimitRemaining = CreditLimit[0]?.remaining;
         setIsPaidDisable(true)
         setisPaymentDisabled(false)
         setBalanceAmount(parseFloat(CreditLimitRemaining).toFixed(2))
         document.getElementById("totalPaidAmount").value = parseFloat(totalAmount - CreditLimitRemaining).toFixed(2)

         setpayableAmount(parseFloat(totalAmount - CreditLimitRemaining).toFixed(2))

       
      
         }
         else{
          setIsPaidDisable(true)
         setisPaymentDisabled(true);
          document.getElementById("totalPaidAmount").value = ''
           
         }
     

        }
      
       
    else if (isCashLess === false){
    let paidAmount = document.getElementById("totalPaidAmount").value;
    rowDataCopy[index] = {
    ...rowDataCopy[index],
    itemQuantity: roundedQtyValue,
    discountRs: parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge * (rowDataCopy[index].discountPer / 100)).toFixed(2),
    totalAmount: parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge * (1 - rowDataCopy[index].discountPer / 100)).toFixed(2),
    actualTotalAmount : parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge)
};
const discountSum = rowDataCopy.map((val) => {
  const discount = parseFloat(val.discountRs);
       return !isNaN(discount) ? discount : 0;
   });
   const totalDiscount = discountSum.reduce((total, discount) => {
     const discountValue = parseFloat(discount);

     return !isNaN(discountValue) ? total + discountValue : total;
 }, 0);
const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);

setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
settotalSum(parseFloat(totalAmount).toFixed(2))
setBalanceAmount(parseFloat(0).toFixed(2))
setpayableAmount(parseFloat(totalPayable).toFixed(2));
document.getElementById("totalPaidAmount").value =  parseFloat(totalPayable).toFixed(2)
}



 
        if (AdvanceDetails  && CreditDetails.length === 0 &&  AdvanceAmountStatus !== null ) {
          rowDataCopy[index] = {
              ...rowDataCopy[index],
              itemQuantity: roundedQtyValue,
              discountRs: parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge * (rowDataCopy[index].discountPer / 100)).toFixed(2),
               totalAmount: parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge * (1 - rowDataCopy[index].discountPer / 100)).toFixed(2),
               actualTotalAmount : parseFloat(roundedQtyValue * rowDataCopy[index].itemCharge)
        
          }
        
          const discountSum = rowDataCopy.map((val) => {const discount = parseFloat(val.discountRs);
                 return !isNaN(discount) ? discount : 0;
             });
        
        
             const totalDiscount = discountSum.reduce((total, discount) => {const discountValue = parseFloat(discount);
               return !isNaN(discountValue) ? total + discountValue : total;
           }, 0);
        
        
            const totalAmount = rowDataCopy.reduce((total, item) => total  +  (item.itemQuantity * item.itemCharge), 0);
            const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
        
          setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
          setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
          setBalanceAmount(parseFloat(totalPayable).toFixed(2))
          settotalSum(parseFloat(totalAmount).toFixed(2))
          setpayableAmount(parseFloat(totalPayable).toFixed(2));  

      
        
           if(totalPayable > AdvanceAmount &&  AdvanceAmountStatus === 1  ){
            
           setIsPaidDisable(true)
           setisPaymentDisabled(false)
           setBalanceAmount(parseFloat(0).toFixed(2))
           document.getElementById("totalPaidAmount").value = parseFloat(totalAmount - totalDiscount - AdvanceAmount ).toFixed(2)
           setpayableAmount(parseFloat(totalAmount - totalDiscount).toFixed(2))
          
        
           }


           else{
            setIsPaidDisable(true)
           setisPaymentDisabled(true);
            document.getElementById("totalPaidAmount").value = ''
            setBalanceAmount(parseFloat(0).toFixed(2))
           }
          }



          if(AdvanceDetails  && CreditDetails.length === 0  && AdvanceAmountStatus === 2){

            const discountSum = rowDataCopy.map((val) => {
              const discount = parseFloat(val.discountRs);
                   return !isNaN(discount) ? discount : 0;
               });
               const totalDiscount = discountSum.reduce((total, discount) => {
                 const discountValue = parseFloat(discount);
          
                 return !isNaN(discountValue) ? total + discountValue : total;
             }, 0);
            const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
           
            const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
            setIsPaidDisable(true)
           setisPaymentDisabled(false)
           setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
           setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
           settotalSum(parseFloat(totalAmount).toFixed(2))
           setBalanceAmount(parseFloat(0).toFixed(2))
           setpayableAmount(parseFloat(totalPayable).toFixed(2));
           document.getElementById("totalPaidAmount").value =  parseFloat(totalPayable).toFixed(2)
         
           }

          

    }



    if (name === "Discount%") {
        const discountPercentage = parseFloat(value);
        const roundeddiscountPer = !isNaN(qtyValue) ? parseFloat(discountPercentage.toFixed(2)) : "";
        const itemCharge = parseFloat(rowDataCopy[index].itemCharge);
        const itemQuantity = parseFloat(rowDataCopy[index].itemQuantity);
        

        if (roundeddiscountPer === "" || roundeddiscountPer === 0) {
            rowDataCopy[index] = {
                ...rowDataCopy[index],
                discountPer: roundeddiscountPer,
                discountRs: 0,
                totalAmount: itemQuantity * itemCharge,
                actualTotalAmount : parseFloat(rowDataCopy[index].itemQuantity * rowDataCopy[index].itemCharge).toFixed(2)
            };


            const discountSum = rowDataCopy.map((val) => {
              const discount = parseFloat(val.discountRs);
                   return !isNaN(discount) ? discount : 0;
               });
               const totalDiscount = discountSum.reduce((total, discount) => {
                 const discountValue = parseFloat(discount);
         
                 return !isNaN(discountValue) ? total + discountValue : total;
             }, 0);
            setTotalDiscountSum(totalDiscount)
           
        }


        if(roundeddiscountPer < 0){
          setShowAlertToster(1);
          setShowMeassage("Discount %  should not be in negative..!!");
          return
        }
        
        
            if (parseFloat(roundeddiscountPer) > 100) {
                setShowAlertToster(1);
                setShowMeassage('Discount should not be more than the total amount..!!');
                rowDataCopy[index] = {
                    ...rowDataCopy[index],
                    totalAmount: itemQuantity * itemCharge,
                    actualTotalAmount : parseFloat(rowDataCopy[index].itemQuantity * rowDataCopy[index].itemCharge)
                };
                return;
            } 
            
            const totalAmountBeforeDiscount = parseFloat(itemQuantity * itemCharge);
            const discountAmount = parseFloat( (totalAmountBeforeDiscount * roundeddiscountPer) / 100).toFixed(2)

         
            rowDataCopy[index] = {
                ...rowDataCopy[index],
                discountPer: roundeddiscountPer,
                discountRs: !isNaN(discountAmount) ? parseFloat(discountAmount) : 0,
                totalAmount: !isNaN(totalAmountBeforeDiscount - discountAmount) ? parseFloat((totalAmountBeforeDiscount - discountAmount)).toFixed(2) : 0,
                actualTotalAmount : parseFloat(rowDataCopy[index].itemQuantity * rowDataCopy[index].itemCharge).toFixed(2)
            };
            
              if(CreditLimitCompany){
                const discountSum = rowDataCopy.map((val) => {
                  const discount = parseFloat(val.discountRs);
                       return !isNaN(discount) ? discount : 0;
                   });
                   const totalDiscount = discountSum.reduce((total, discount) => {
                     const discountValue = parseFloat(discount);
             
                     return !isNaN(discountValue) ? total + discountValue : total;
                 }, 0);
                const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
               

                
                const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
                setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
                setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
                setBalanceAmount(parseFloat(totalPayable).toFixed(2))
                settotalSum(parseFloat(totalAmount).toFixed(2))
                setpayableAmount(parseFloat(totalPayable).toFixed(2))
                document.getElementById("totalPaidAmount").value =  parseFloat(totalPayable).toFixed(2)
              }
       

              else {
                const discountSum = rowDataCopy.map((val) => {
                  const discount = parseFloat(val.discountRs);
                       return !isNaN(discount) ? discount : 0;
                   });
                   const totalDiscount = discountSum.reduce((total, discount) => {
                     const discountValue = parseFloat(discount);
             
                     return !isNaN(discountValue) ? total + discountValue : total;
                 }, 0);
                const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
                const totalAmount = saveRow.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
      
                    setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
                    setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
                    settotalSum(parseFloat(totalAmount).toFixed(2))
                    setBalanceAmount(parseFloat(0).toFixed(2))
                    setpayableAmount(parseFloat(totalPayable).toFixed(2))
                    document.getElementById("totalPaidAmount").value =  parseFloat(totalPayable).toFixed(2)
              }
              if (AdvanceDetails  && CreditDetails.length === 0 &&  AdvanceAmountStatus !== null) {
                const discountSum = rowDataCopy.map((val) => {
                  const discount = parseFloat(val.discountRs);
                       return !isNaN(discount) ? discount : 0;
                   });
                   const totalDiscount = discountSum.reduce((total, discount) => {
                     const discountValue = parseFloat(discount);
              
                     return !isNaN(discountValue) ? total + discountValue : total;
                 }, 0);
                const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
               
                const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
                setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
                setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
                setBalanceAmount(parseFloat(totalPayable).toFixed(2))
                 settotalSum(parseFloat(totalAmount).toFixed(2))
                setpayableAmount(parseFloat(totalPayable).toFixed(2))


             
                 if(totalPayable > AdvanceAmount &&  AdvanceAmountStatus === 1    ){
                  
                  setIsPaidDisable(true)
                  setisPaymentDisabled(false)
                  setBalanceAmount(parseFloat(0).toFixed(2))
                  document.getElementById("totalPaidAmount").value = parseFloat(totalAmount - totalDiscount - AdvanceAmount ).toFixed(2)
                  setpayableAmount(parseFloat(totalAmount - totalDiscount).toFixed(2))
            
              
                 }
                 else{
                  setIsPaidDisable(true)
                 setisPaymentDisabled(true);
                  document.getElementById("totalPaidAmount").value = ''
                  setBalanceAmount(parseFloat(0).toFixed(2))
                 }
              
                }


                
          if(AdvanceDetails  && CreditDetails.length === 0 && AdvanceAmountStatus === 2){

            const discountSum = rowDataCopy.map((val) => {
              const discount = parseFloat(val.discountRs);
                   return !isNaN(discount) ? discount : 0;
               });
               const totalDiscount = discountSum.reduce((total, discount) => {
                 const discountValue = parseFloat(discount);
          
                 return !isNaN(discountValue) ? total + discountValue : total;
             }, 0);
            const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
           
            const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
            setIsPaidDisable(true)
           setisPaymentDisabled(false)
           setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
           setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
           settotalSum(parseFloat(totalAmount).toFixed(2))
           setBalanceAmount(parseFloat(0).toFixed(2))
           setpayableAmount(parseFloat(totalPayable).toFixed(2));
           document.getElementById("totalPaidAmount").value =  parseFloat(totalPayable).toFixed(2)
           
           }
               
          
        }
  

    if (name === "DiscountRs") {
      
      let paidAmount = document.getElementById("totalPaidAmount").value;
      const discountRsValid = parseFloat(value);
      const roundeddiscountRs = !isNaN(qtyValue) ? parseFloat(discountRsValid.toFixed(2)) : "";
      const itemCharge = parseFloat(rowDataCopy[index].itemCharge);
      const itemQuantity = parseFloat(rowDataCopy[index].itemQuantity);
      
      if (roundeddiscountRs === "" || roundeddiscountRs === 0) {
        
        rowDataCopy[index] = {
            ...rowDataCopy[index],
            discountPer: 0,
            discountRs: roundeddiscountRs,
            totalAmount: itemQuantity * itemCharge,
            actualTotalAmount : parseFloat(rowDataCopy[index].itemQuantity * rowDataCopy[index].itemCharge)
        };

        const discountSum = rowDataCopy.map((val) => {
     const discount = parseFloat(val.discountRs);
          return !isNaN(discount) ? discount : 0;
      });
      const totalDiscount = discountSum.reduce((total, discount) => {
        const discountValue = parseFloat(discount);

        return !isNaN(discountValue) ? total + discountValue : total;
    }, 0);
  
        setTotalDiscountSum(totalDiscount)
       
    }
      if (roundeddiscountRs > itemQuantity * itemCharge) {
          setShowAlertToster(1);
          setShowMeassage('Discount should not be more than the total amount..!!');
          return;
      }
  
      if (roundeddiscountRs < 0) {
          setShowAlertToster(1);
          setShowMeassage("Discount Rs should not be in negative..!!");
          return;
      }
  
    
      
      else {
        const newDiscountPer = (roundeddiscountRs / (itemCharge * itemQuantity)) * 100;

        rowDataCopy[index] = {
            ...rowDataCopy[index],
            discountRs: roundeddiscountRs,
            discountPer: !isNaN(newDiscountPer) ? parseFloat(newDiscountPer.toFixed(2)) : 0,
            totalAmount: parseFloat(itemQuantity * itemCharge - roundeddiscountRs).toFixed(2),
            actualTotalAmount : parseFloat(rowDataCopy[index].itemQuantity * rowDataCopy[index].itemCharge)
        };
        const discountSum = rowDataCopy.map((val) => {
          const discount = parseFloat(val.discountRs);
          return !isNaN(discount) ? discount : 0;
      });
      const totalDiscount = discountSum.reduce((total, discount) => {
        const discountValue = parseFloat(discount);
        return !isNaN(discountValue) ? total + discountValue : total;
    }, 0);
          setTotalDiscountSum(totalDiscount);
      }

if(CreditLimitCompany){
  const discountSum = rowDataCopy.map((val) => {
    const discount = parseFloat(val.discountRs);
         return !isNaN(discount) ? discount : 0;
     });
     const totalDiscount = discountSum.reduce((total, discount) => {
       const discountValue = parseFloat(discount);

       return !isNaN(discountValue) ? total + discountValue : total;
   }, 0);
  const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
 
  const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
  setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
  setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
  setBalanceAmount(parseFloat(totalPayable).toFixed(2))
   settotalSum(parseFloat(totalAmount).toFixed(2))
  setpayableAmount(parseFloat(totalPayable).toFixed(2))

}





else{
  const discountSum = rowDataCopy.map((val) => {
    const discount = parseFloat(val.discountRs);
         return !isNaN(discount) ? discount : 0;
     });
     const totalDiscount = discountSum.reduce((total, discount) => {
       const discountValue = parseFloat(discount);

       return !isNaN(discountValue) ? total + discountValue : total;
   }, 0);
      const totalAmount = saveRow.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
  
      const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
    
      setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
      setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
      settotalSum(parseFloat(totalAmount).toFixed(2))
      setpayableAmount(parseFloat(totalPayable).toFixed(2))
      document.getElementById("totalPaidAmount").value =  parseFloat(totalPayable).toFixed(2)
      setBalanceAmount(parseFloat(0).toFixed(2))
}



if (AdvanceDetails  && CreditDetails.length === 0 &&  AdvanceAmountStatus !== null) {
  const discountSum = rowDataCopy.map((val) => {
    const discount = parseFloat(val.discountRs);
         return !isNaN(discount) ? discount : 0;
     });
     const totalDiscount = discountSum.reduce((total, discount) => {
       const discountValue = parseFloat(discount);

       return !isNaN(discountValue) ? total + discountValue : total;
   }, 0);
  const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
 
  const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
  setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
  setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
  setBalanceAmount(parseFloat(totalPayable).toFixed(2))
   settotalSum(parseFloat(totalAmount).toFixed(2))
  setpayableAmount(parseFloat(totalPayable).toFixed(2))




   if(totalPayable > AdvanceAmount &&  AdvanceAmountStatus === 1    ){
    
    setIsPaidDisable(true)
    setisPaymentDisabled(false)
    setBalanceAmount(parseFloat(0).toFixed(2))
    document.getElementById("totalPaidAmount").value = parseFloat(totalAmount - totalDiscount - AdvanceAmount ).toFixed(2)
    setpayableAmount(parseFloat(totalAmount - totalDiscount).toFixed(2))
    
   }
   else{
    setIsPaidDisable(true)
   setisPaymentDisabled(true);
    document.getElementById("totalPaidAmount").value = ''
    setBalanceAmount(parseFloat(0).toFixed(2))
   }



  }
 
    
  if(AdvanceDetails  && CreditDetails.length === 0 && AdvanceAmountStatus === 2){

    const discountSum = rowDataCopy.map((val) => {
      const discount = parseFloat(val.discountRs);
           return !isNaN(discount) ? discount : 0;
       });
       const totalDiscount = discountSum.reduce((total, discount) => {
         const discountValue = parseFloat(discount);
  
         return !isNaN(discountValue) ? total + discountValue : total;
     }, 0);
    const totalAmount = rowDataCopy.reduce((total, item) => total + item.itemQuantity * item.itemCharge, 0);
   
    const totalPayable = rowDataCopy.reduce((total, item) => total + (item.itemQuantity * item.itemCharge) - item.discountRs, 0);
    setIsPaidDisable(true)
   setisPaymentDisabled(false)
   setActualTotalAmount(parseFloat(totalAmount).toFixed(2));
   setTotalDiscountSum(parseFloat(totalDiscount).toFixed(2))
   settotalSum(parseFloat(totalAmount).toFixed(2))
   setBalanceAmount(parseFloat(0).toFixed(2))
   setpayableAmount(parseFloat(totalPayable).toFixed(2));
   document.getElementById("totalPaidAmount").value =  parseFloat(totalPayable).toFixed(2)
   
   }



  }
  

    setSaveRow(rowDataCopy);


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


  const handleAddRow = ()=>{
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
         setSaveRow([...saveRow, data, ]);
      }
   
  }

  let removeRow = async (ind) => {
    document.getElementById("totalPaidAmount").value = '';
    setisPaymentDisabled(true);

    let temp = [...saveRow];
    let removedItem = temp[ind];

    let removeRowAmt = totalSum - removedItem.itemQuantity * removedItem.itemCharge;
    let removeDisAmt = removedItem.discountRs;
    let removeRowDiscount = totalDiscountSum - removeDisAmt;
    let TotalAmount = payableAmount - temp[ind].totalAmount;

   

    let isCashLess = patientDetails.isCashLess;
    let CreditLimitvalue = CreditLimit[0]?.remaining;
    let InsuranceCompanyValid = CreditLimit[0]?.tpaCompanyID;
    let AdvanceAmount = AdvanceDetailsbyUhid[0]?.remaining
    let AdvanceAmountStatus = AdvanceDetailsbyUhid[0]?.limitStatus
    let AdvanceDetails = AdvanceDetailsbyUhid[0]
  


    

    if( AdvanceAmountStatus === 1 && InsuranceCompanyValid === undefined && isCashLess === false && CreditLimitvalue === undefined){
      
      if(AdvanceAmount > removeRowAmt){
        settotalSum(parseFloat(removeRowAmt ).toFixed(2));
        setpayableAmount(parseFloat(removeRowAmt - removeRowDiscount).toFixed(2));
        setBalanceAmount(parseFloat(0).toFixed(2));
        setIsPaidDisable(true);
        setisPaymentDisabled(true);
        setTotalDiscountSum(parseFloat(removeRowDiscount).toFixed(2));
        document.getElementById("totalPaidAmount").value = '';
        
    }

    else if(AdvanceAmount < removeRowAmt){
      settotalSum(parseFloat(removeRowAmt).toFixed(2));
      setpayableAmount(parseFloat(removeRowAmt  - removeRowDiscount).toFixed(2));
      setBalanceAmount(parseFloat(0).toFixed(2));
      setIsPaidDisable(true);
      setisPaymentDisabled(false);
      setTotalDiscountSum(parseFloat(removeRowDiscount).toFixed(2));
      document.getElementById("totalPaidAmount").value = parseFloat(removeRowAmt  - removeRowDiscount - AdvanceAmount).toFixed(2);
     
    }
  }
  
        if (InsuranceCompanyValid  && isCashLess === true) {
          if(CreditLimitvalue > removeRowAmt){
             
            settotalSum(parseFloat(removeRowAmt).toFixed(2));
            setpayableAmount(parseFloat(0).toFixed(2));
            setBalanceAmount(parseFloat(removeRowAmt).toFixed(2));
            setIsPaidDisable(true);
            setisPaymentDisabled(true);
            document.getElementById("totalPaidAmount").value = '';
           
          }
          else{
            settotalSum(parseFloat(removeRowAmt).toFixed(2));
            setpayableAmount(parseFloat(removeRowAmt - CreditLimitvalue).toFixed(2));
            setBalanceAmount(parseFloat(CreditLimitvalue).toFixed(2));
            setIsPaidDisable(true);
            setisPaymentDisabled(false);
            document.getElementById("totalPaidAmount").value = parseFloat(removeRowAmt - CreditLimitvalue).toFixed(2);
           
          }
      

            
        }
 
 
        
        
        
  

    
    else if (AdvanceAmountStatus !== 1 && !InsuranceCompanyValid) {
      
       setBalanceAmount(parseFloat(0).toFixed(2)); 
        settotalSum(parseFloat(removeRowAmt).toFixed(2));
        setpayableAmount(parseFloat(removeRowAmt - removeRowDiscount).toFixed(2));
        document.getElementById("totalPaidAmount").value = parseFloat(removeRowAmt - removeRowDiscount).toFixed(2);
        setIsPaidDisable(true);
        setisPaymentDisabled(false);
        setTotalDiscountSum(parseFloat(removeRowDiscount).toFixed(2));
    }

    temp.splice(ind, 1);

    if (temp.length > 0) {
        setSaveRow(temp);
    } 
    else {
        // Reset state or perform any necessary actions when temp is empty
        setActualTotalAmount(0);
        setBalanceAmount(0);
        settotalSum(0);
        setTotalDiscountSum(0);
        setTotalAmount(0);
        setpayableAmount(0);
        setSaveRow([data]);
        document.getElementById("itemName" + ind).value = "";
        document.getElementById("discountByRemark").style.display = "none";
    }
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
    document.getElementById("totalPaidAmount").value = ''
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



  let GetBankList = async () => {
    var response = await GetBankNameList();
    setBankList(response.responseValue);
    
  };


  //*****saveDetails */

  let saveBillingData = async () => {

   let IsCashless = patientDetails.isCashLess;
    let Paid = document.getElementById("totalPaidAmount").value;
    let PName = document.getElementById("PName").value 
    const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
    const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0 );

    let CreditLimitvalue = CreditLimit[0]?.remaining
    let CreditLimitInsuranceID = CreditLimit[0]?.issuanceDetailId
    let CreditLimitCompany = CreditLimit[0]?.tpaCompanyID
    let CreditStatus = CreditLimit[0]?.currentStatus
    let InsuranceCompanyId = CreditLimit[0]?.tpaCompanyID
    let advanceLimit = AdvanceDetailsbyUhid[0]?.remaining
    let advanceStatus = AdvanceDetailsbyUhid[0]?.limitStatus
  
  
 
   
    if(UHID.trim() == ''){
         setShowAlertToster(1);
         setShowMeassage("UHID is required");
         return;
        }
        if(PName == '' || undefined || null){
          setShowAlertToster(1);
          setShowMeassage("UHID is not valid");
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

   

 if(CreditLimitvalue  ===  0 && CreditStatus == null  ){
  setShowAlertToster(1);
   setShowMeassage("Insurance Credit has No Limit Please conatct TPA office..!!");
   return
 }
 if(CreditLimitvalue  > 0 && CreditStatus == 2  ){
  setShowAlertToster(1);
   setShowMeassage("Credit Limit is On Hold Please Contact TPA office..!!");
   return
 }
 else if (CreditLimitCompany && CreditStatus === 3){
  setBalanceAmount(totalSum);
  setShowAlertToster(1);
  setShowMeassage("Insurance is Closed Please Contact TPA Office..!!");
  return
}

// Bill logic if the credit is greater than the billing payable amount and paid amont is zero

 if(CreditLimitvalue  > totalSum && IsCashless === true ){
  let PName = document.getElementById("PName").value 
  const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
 const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);

 if(UHID.trim() == '' || undefined || null ){
      setShowAlertToster(1);
      setShowMeassage("UHID is required");
      return;
     }
     if(PName == '' || undefined || null){
      setShowAlertToster(1);
      setShowMeassage("UHID is not valid");
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
        const TotalAmount = actualTotalAmount;
        const TotalBalanceAmount = balanceAmount;
        const TotalDiscount = totalDiscountSum;
        const TotalPaybleAmount = payableAmount;
        const TotalPaidAmount = 0;
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
  
       
        let responseData = await saveBillingDetails(saveBillingData);
       
        let billNumber = responseData.responseValue[0].billNumber;
        setShowSuccessToster(1)
        setShowMeassage("Data Saved Successfully..!")
        
        clearBillingData();
        
          setPatientDetails([])
     
      } 
  return;
   }
   
else if (CreditLimitCompany && CreditStatus == 2){
  setBalanceAmount(totalSum);
  setShowAlertToster(1);
  setShowMeassage("Please Contact TPA Office..!!");
  return;
}

// Bill logic if the credit is less than the billing payable amount and paid amont is equal to payable amount

if(CreditLimitCompany && CreditLimitvalue < totalSum && IsCashless === true && Paid === payableAmount){
  const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
 const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);
 let Bycard = document.getElementById("byCard").value 
 let PName = document.getElementById("PName").value
let Bycheque = document.getElementById("chequeNo").value 
let Online = document.getElementById("refNo").value 
let Bank = document.getElementById("selectBank").value
let Paid = document.getElementById("totalPaidAmount").value;
let chequeDate = document.getElementById("chequeDate").value 
    let Paymenttype = document.getElementById("Payment").value;

 if(UHID.trim() == '' || undefined || null ){
      setShowAlertToster(1);
      setShowMeassage("UHID is required");
      return;
     }
     if(PName == '' || undefined || null){
      setShowAlertToster(1);
      setShowMeassage("UHID is not valid");
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
      if (isPaymentDisabled === false  && Paymenttype === '0') {
        setShowAlertToster(1);
        setShowMeassage("Select Payment Mode");
       
        return;
      }
 
    
    if (isPaymentDisabled === false && Paymenttype === "2" && Bycard === "") {
        setShowAlertToster(1);
        setShowMeassage("Please Enter Card Number..!!");
        return;
    }
    
    if (isPaymentDisabled === false && Paymenttype === "3" && (Bank === "0" || chequeNo === "")) {
        setShowAlertToster(1);
        setShowMeassage("Please Select Bank and Enter Cheque Number..!!");
        return;
    }
    
    if (isPaymentDisabled === false && Paymenttype === "3" && chequeNo === "") {
        setShowAlertToster(1);
        setShowMeassage("Please Enter Cheque Number..!!");
        return;
    }
    
    if (isPaymentDisabled === false && Paymenttype === "3" && chequeDate === "") {
        setShowAlertToster(1);
        setShowMeassage("Please Enter Cheque Date..!!");
        return;
    }



      if (UHID != 0) {

        const uhid = UHID;
        const billTypeId = 2
        const TotalAmount = totalSum;
        const TotalBalanceAmount = CreditLimitvalue;
        const TotalDiscount = totalDiscountSum;
        const TotalPaybleAmount = payableAmount;
        const TotalPaidAmount = Paid;
        const  tpaCompanyID = CreditLimit[0]?.tpaCompanyID || 0;
        const companyID = CreditLimitInsuranceID
        const  tpaReferenceNo = CreditLimit[0]?.cardNo || 0;


        let DiscountRemark =null;
        if(TotalDiscount.length > 0){
          DiscountRemark = discountBy;
          if(DiscountRemark === null){
            alert("Enter Discount Remark!");
            return;
          }
        }
      
    
        const UserID = userID;
       
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
  
      
        let responseData = await saveBillingDetails(saveBillingData);
       
        let billNumber = responseData.responseValue[0].billNumber;
        setShowSuccessToster(1)
        setShowMeassage("Data Saved Successfully..!")
        clearBillingData();
        
          setPatientDetails([])
     
      } 
  return;
}

// if(InsuranceCompanyId  !== 0 && CreditLimit  == 0){
//   setShowAlertToster(1);
//    setShowMeassage("Credit Limit is Zero");
//    return
//  }



if (advanceLimit >= payableAmount && advanceStatus == 1  ){
  const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
  const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);
  let PName = document.getElementById("PName").value 
  if(UHID == '' || undefined || null){

       setShowAlertToster(1);
       setShowMeassage("UHID is required");
       return;
      }
      if(PName == '' || undefined || null){
        setShowAlertToster(1);
        setShowMeassage("UHID is not valid");
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
        const insauranceCardNo = insCardNo;
        const CreditTypeId = ddlBillType;
        const CompanyId = ddlCompany;
        const TotalAmount = actualTotalAmount;
        const TotalDiscount = totalDiscountSum;
        const TotalPaybleAmount = payableAmount;
        const TotalPaidAmount = 0;
        const tpaReferenceNo = PolicyNo
        const TotalBalanceAmount = 0;
      
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
     
          const UserID = userID;
 
         const PaymentMode = 0;
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
                    tpaReferenceNo,
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
   
       
         let responseData = await saveBillingDetails(saveBillingData);
        
         let billNumber = responseData.responseValue[0].billNumber;
         handlePrintBill(billNumber);
         clearBillingData();
         setPatientDetails([])
         

       } 
 return;
}

if(advanceLimit && advanceStatus == 2){
  
  
    let Bycard = document.getElementById("byCard").value 
    let PName = document.getElementById("PName").value
    let Bycheque = document.getElementById("chequeNo").value 
    let Online = document.getElementById("refNo").value 
    let Bank = document.getElementById("selectBank").value
    let Paid = document.getElementById("totalPaidAmount").value;
    let chequeDate = document.getElementById("chequeDate").value 
        let Paymenttype = document.getElementById("Payment").value;
            const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
            const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);
        
        
           if(UHID == '' || undefined || null){
            setShowAlertToster(1);
            setShowMeassage("UHID is required");
            return;
           }
           if(PName == '' || undefined || null){
            setShowAlertToster(1);
            setShowMeassage("UHID is not valid");
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
  
  
  
  if (isPaymentDisabled === false && (Paymenttype === "0" || Paymenttype == "")) {
    setShowAlertToster(1);
    setShowMeassage("Select Payment Mode");
   
    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "2" && Bycard === "") {
    setShowAlertToster(1);
    setShowMeassage("Please Enter Card Number..!!");
    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "3" && (Bank === "0" || chequeNo === "")) {
    setShowAlertToster(1);
    setShowMeassage("Please Select Bank and Enter Cheque Number..!!");
    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "3" && chequeNo === "") {
    setShowAlertToster(1);
    setShowMeassage("Please Enter Cheque Number..!!");
    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "3" && chequeDate === "") {
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
              const TotalPaidAmount = Paid;
              const tpaReferenceNo = PolicyNo
              const TotalBalanceAmount = 0;
            
             
    
         
              let DiscountRemark =null;
              if(TotalDiscount.length > 0){
                DiscountRemark = discountBy;
                if(DiscountRemark === null){
                  alert("Enter Discount Remark!");
                  return;
                }
              }
          
              const UserID = userID;
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
        
            
              let responseData = await saveBillingDetails(saveBillingData);
             
              let billNumber = responseData.responseValue[0].billNumber;
              handlePrintBill(billNumber);
              clearBillingData();
              setPatientDetails([])
           
            } 
}


if(advanceStatus == 1 && advanceLimit < payableAmount && IsCashless === false){
 
  
    let Bycard = document.getElementById("byCard").value 
    let PName = document.getElementById("PName").value
    let Bycheque = document.getElementById("chequeNo").value 
    let Online = document.getElementById("refNo").value 
    let Bank = document.getElementById("selectBank").value
    let Paid = document.getElementById("totalPaidAmount").value;
    let chequeDate = document.getElementById("chequeDate").value 
        let Paymenttype = document.getElementById("Payment").value;
            const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
            const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);
        
        
           if(UHID == '' || undefined || null){
            setShowAlertToster(1);
            setShowMeassage("UHID is required");
            return;
           }
           if(PName == '' || undefined || null){
            setShowAlertToster(1);
            setShowMeassage("UHID is not valid");
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
  

  
  
  if (isPaymentDisabled === false && (Paymenttype === "0" || Paymenttype == "")) {
    setShowAlertToster(1);
    setShowMeassage("Select Payment Mode");

    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "2" && Bycard === "") {
    setShowAlertToster(1);
    setShowMeassage("Please Enter Card Number..!!");
    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "3" && (Bank === "0" || chequeNo === "")) {
    setShowAlertToster(1);
    setShowMeassage("Please Select Bank and Enter Cheque Number..!!");
    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "3" && chequeNo === "") {
    setShowAlertToster(1);
    setShowMeassage("Please Enter Cheque Number..!!");
    return;
  }
  
  if (isPaymentDisabled === false && Paymenttype === "3" && chequeDate === "") {
    setShowAlertToster(1);
    setShowMeassage("Please Enter Cheque Date..!!");
    return;
  }
 
  
            
            if (UHID != 0) {
              const uhid = UHID;
              const billTypeId = 3
              const insauranceCardNo = insCardNo;
              const CreditTypeId = ddlBillType;
              const CompanyId = ddlCompany;
              const TotalAmount = totalSum;
              const TotalDiscount = totalDiscountSum;
              const TotalPaybleAmount = payableAmount;
              const TotalPaidAmount = Paid;
              const tpaReferenceNo = PolicyNo
              const TotalBalanceAmount = 0;
            
             
    
         
              let DiscountRemark =null;
              if(TotalDiscount.length > 0){
                DiscountRemark = discountBy;
                if(DiscountRemark === null){
                  alert("Enter Discount Remark!");
                  return;
                }
              }
          
              const UserID = userID;
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
        
             
              let responseData = await saveBillingDetails(saveBillingData);
              
              let billNumber = responseData.responseValue[0].billNumber;
              handlePrintBill(billNumber);
              clearBillingData();
              setPatientDetails([])
           
            } 
  
  

}

if ( advanceStatus !== 1 && IsCashless === false ){
  
  let Bycard = document.getElementById("byCard").value 
  let PName = document.getElementById("PName").value
  let Bycheque = document.getElementById("chequeNo").value 
  let Online = document.getElementById("refNo").value 
  let Bank = document.getElementById("selectBank").value
  let Paid = document.getElementById("totalPaidAmount").value;
  let chequeDate = document.getElementById("chequeDate").value 
      let Paymenttype = document.getElementById("Payment").value;
          const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
          const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' ||  !item.itemQuantity ||item.itemQuantity === 0);
      
      
         if(UHID == '' || undefined || null){
          setShowAlertToster(1);
          setShowMeassage("UHID is required");
          return;
         }
         if(PName == '' || undefined || null){
          setShowAlertToster(1);
          setShowMeassage("UHID is not valid");
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

          if (IsPaidDisable === false && Paid === "") {
            setShowAlertToster(1);
            setShowMeassage("Please Enter Paid Amount..!")
            return;
          }
          
          if (IsPaidDisable === false && Paid < payableAmount) {
            setShowAlertToster(1);
            setShowMeassage("Paid Amount should not be less than Payable Amount..!")
            return;
          }
          if (IsPaidDisable === false && Paid > payableAmount) {
            setShowAlertToster(1);
            setShowMeassage("Paid Amount should not be greater than Payable Amount..!")
            
            return;
          }
          if (IsPaidDisable === false && Paid > payableAmount) {
            setShowAlertToster(1);
            setShowMeassage("Paid Amount should not be greater than Payable Amount..!")
           
            return;
          }
          if (IsPaidDisable === false && Paid < 0) {
            setShowAlertToster(1);
            setShowMeassage("Paid Amount should not in Negative..!")
            return;
          }


if (isPaymentDisabled === false && (Paymenttype === "0" || Paymenttype == "")) {
  setShowAlertToster(1);
  setShowMeassage("Select Payment Mode");

  return;
}

if (isPaymentDisabled === false && Paymenttype === "2" && Bycard === "") {
  setShowAlertToster(1);
  setShowMeassage("Please Enter Card Number..!!");
  return;
}

if (isPaymentDisabled === false && Paymenttype === "3" && (Bank === "0" || chequeNo === "")) {
  setShowAlertToster(1);
  setShowMeassage("Please Select Bank and Enter Cheque Number..!!");
  return;
}

if (isPaymentDisabled === false && Paymenttype === "3" && chequeNo === "") {
  setShowAlertToster(1);
  setShowMeassage("Please Enter Cheque Number..!!");
  return;
}

if (isPaymentDisabled === false && Paymenttype === "3" && chequeDate === "") {
  setShowAlertToster(1);
  setShowMeassage("Please Enter Cheque Date..!!");
  return;
}

if(Paid > payableAmount){
  setShowAlertToster(1);
  setShowMeassage("Paid Amount should not be greater than Payable Amount..!!");
  
  return;
};

if (Paid.includes("-") || Paid.includes("+")) {
  setShowAlertToster(1);
  setShowMeassage('Paid Amount should not be in negative..!!');
 
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
            const TotalPaidAmount = Paid;
            const tpaReferenceNo = PolicyNo
            const TotalBalanceAmount = 0;
          
           
  
       
            let DiscountRemark =null;
            if(TotalDiscount.length > 0){
              DiscountRemark = discountBy;
              if(DiscountRemark === null){
                alert("Enter Discount Remark!");
                return;
              }
            }
        
            const UserID = userID;
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
      
           
            let responseData = await saveBillingDetails(saveBillingData);
     
            let billNumber = responseData.responseValue[0].billNumber;
            handlePrintBill(billNumber);
            clearBillingData();
            setPatientDetails([])
         
          } 


}



else if(IsCashless === false && advanceLimit === 0 && !CreditLimitCompany){

let Bycard = document.getElementById("byCard").value 
let Bycheque = document.getElementById("chequeNo").value 
let PName = document.getElementById("PName").value 
let Online = document.getElementById("refNo").value 
let Bank = document.getElementById("selectBank").value
let Paid = document.getElementById("totalPaidAmount").value;
let chequeDate = document.getElementById("chequeDate").value 
    let Paymenttype = document.getElementById("Payment").value;
        const isEmpty = saveRow.some((item) => !item.itemName || item.itemName === "");
        const isitemQuantityValid = saveRow.some((item) => item.itemQuantity === '' || item.itemQuantity === 0);
    
    
       if(UHID == '' || undefined || null){
        setShowAlertToster(1);
        setShowMeassage("UHID is required");
        return;
       }
       if(PName == '' || undefined || null){
        setShowAlertToster(1);
        setShowMeassage("UHID is not valid");
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
 
     
    

        // if( CreditLimitvalue == 0){
        //   setisPaymentDisabled(false)
        //  }
   
    


        if (isPaymentDisabled === false && (Paymenttype === "0" || Paymenttype == "")) {
          setShowAlertToster(1);
          setShowMeassage("Select Payment Mode");
         
          return;
        }
      
      if (isPaymentDisabled === false && Paymenttype === "2" && Bycard === "") {
          setShowAlertToster(1);
          setShowMeassage("Please Enter Card Number..!!");
          return;
      }
      
      if (isPaymentDisabled === false && Paymenttype === "3" && (Bank === "0" || chequeNo === "")) {
          setShowAlertToster(1);
          setShowMeassage("Please Select Bank and Enter Cheque Number..!!");
          return;
      }
      
      if (isPaymentDisabled === false && Paymenttype === "3" && chequeNo === "") {
          setShowAlertToster(1);
          setShowMeassage("Please Enter Cheque Number..!!");
          return;
      }
      
      if (isPaymentDisabled === false && Paymenttype === "3" && chequeDate === "") {
          setShowAlertToster(1);
          setShowMeassage("Please Enter Cheque Date..!!");
          return;
      }
      if(Paid > payableAmount){
        setShowAlertToster(1);
        setShowMeassage("Paid Amount should not be greater than Payable Amount..!!");
        
        return;
      }
      if (Paid.includes("-") || Paid.includes("+")) {
        setShowAlertToster(1);
        setShowMeassage('Paid Amount should not be in negative..!!');
       
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
          const TotalPaidAmount = Paid;
          const tpaReferenceNo = PolicyNo
          const TotalBalanceAmount = payableAmount - TotalPaidAmount;

          let DiscountRemark =null;
          if(TotalDiscount.length > 0){
            DiscountRemark = discountBy;
            if(DiscountRemark === null){
              alert("Enter Discount Remark!");
              return;
            }
          }
      
          const UserID = userID;
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
    
          
          let responseData = await saveBillingDetails(saveBillingData);
          
          let billNumber = responseData.responseValue[0].billNumber;
          handlePrintBill(billNumber);
          clearBillingData();
          setPatientDetails([])
       
        } 
  }


  }

  //*******Print */
  let handlePrintBill = async (billNumber) => {

  
    let data = await PatientDetail(UHID, billNumber);
  
    if (data.status === 1) {
      window.sessionStorage.setItem(
        "PrintBillingDetails",
        JSON.stringify(data.responseValue)
      );
      window.open("/billingcahcounterprint/", "noopener,noreferrer");
      clearBillingData()
     
    } else {
      setShowAlertToster(1);
      setShowMeassage("UHID is not valid");
    }
   
    
  };

 

  let insuranceCompanyName = CreditLimit[0]?.companyname || '';
  let CardNo = CreditLimit[0]?.cardNo || '';

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
              
                  <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 mb-3">
                          <img src={Page} alt=''/>{" "}
                          <label for="UHID" class="form-label">
                            UHID <span class="starMandatory">*</span>
                          </label>
                         
                          <input
                            type="text"
                            class="form-control form-control-sm ms-2"
                            id="UHID"
                            value={UHID}
                            placeholder="UHID"
                            name="UHID"
                            maxLength={11}
                            onChange={handleUhidEvent}
                          />
                   
                         
                          </div>
       
              
                                
                                <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={user3} className='icnn' alt='' /><label htmlFor="FullName*" className="form-label">Patient Name</label>
                                </div>
                                  
                                  <input type="text" className="form-control form-control-sm" id="PName" name="donor" placeholder="Patient Name" value=  {patientDetails.patientName} disabled />
                                </div>
                              </div>
                              <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 mb-3 mt-1">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={category} className='icnn' alt='' /> <label htmlFor="gender" className="form-label">Gender</label>
                                </div>
                                <input type="text" className="form-control form-control-sm" id="Pgender" name="donor" placeholder="Gender" value=  {patientDetails.gender} disabled />
                         
                                  </div>
                                </div>

        
                   
                   
                   
                 
    
                    
                    </div>

                    <div className="row ps-2">
                    <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 mb-3">
                                <div className="mb-2">
                                <div className="d-flex align-items-baseline">
                                <img src={question} className='icnn' alt='' /><label htmlFor="dob" className="form-label">Age</label>
                                </div>
                                  
                                  <input type="text" className="form-control form-control-sm" id='PAge' name='regDate' value={patientDetails.age} placeholder="Age" disabled />
                                </div>
                              </div>
          
                              <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 mb-3">
                                <div className="mb-2">
                                <div className='d-flex align-items-baseline'>
                                <img src={medicalRoom} className='icnn' alt='' /><label htmlFor="bloodGroup" className="form-label">Ward</label>
                                </div>
                                 
                                  <input type="text" className="form-control form-control-sm" id="PWard" value={patientDetails.wardName} name="ddlBloodGroup" placeholder="Ward" disabled />
                                </div>
                              </div>
          
                              <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12 mb-3">
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
  <span class="fieldse">Patient Insurance and Deposit Details</span>


  <div className="mt-2 col-md-12 d-flex justify-content-between flex-wrap">
     <span class="badge rounded-pill text-bg-light">Insurance Company / Card No. :</span>
  <span class="badge rounded-pill text-bg-info" style={{fontWeight: '600' , padding : '5px 10px'}}>{insuranceCompanyName == '' ? 'Not Eligible' : insuranceCompanyName } / {CardNo == '' ? 'Not Eligible' : CardNo}</span>
  </div>
 <div className="med-table-section ">
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
    
              
              
              
                <div className="col-12 p-2">
              <div className="fieldsett">
              <span className='fieldse'>Item/Service Details</span>
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
                        <th>Charges <span style={{color : 'red'}}>*</span></th>
                        <th>Quantity <span style={{color : 'red'}}>*</span></th>
                        <th id="discountperheading">Discount(%)</th>
                        <th id="discountrupees">Discount</th>
                        <th>Total Amount</th>
                        <th className="text-center">Action</th>
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
                                 disabled = {IsItemDisable}
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
                                  placeholder="Item Charge"
                                  disabled="true"
                                  value={val.itemCharge}
                                />
                              </td>
                              <td>
                                <input
                                  type="number"
                                  className=""
                                  placeholder="Quantity"
                                  id={`itemQuantity${ind}`}
                                  name="itemQuantity"
                                  min="0"
                                  value={val.itemQuantity}
                                  onChange={(e) => {
                                    handleCalculations(e, ind);
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
          name="Discount%"
          disabled={IsDiscountDisable}
          min="0"
          onChange={(e) => {
            handleCalculations(e, ind);
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
   name="DiscountRs"
   value={val.discountRs}
   disabled={IsDiscountDisable}
   onKeyDown={handleTabKey}
   min="0"
   onChange={(e) => {
     handleCalculations(e, ind);
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
                                    handleCalculations(e, ind);
                                  }}
                                />
                              </td>
                              <td>
                                <div className="action-button">
                                  {" "}
                                  <button onKeyDown={handleTabKey} style={{background : 'none' , border: 'none' ,outline: 'none',}}><i class="bi bi-plus" onClick={handleAddRow} title="Add Item" ></i></button>
                                 <i class="bi bi-trash3" title="Remove Item" onClick={() => { removeRow(ind)}} id={`removeRowId${ind}`}></i>
                                 
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
              
            <div className="row pe-4 ps-2">
            <div className="col-md-6 mt-3">
              <div className="fieldsett">
                <span className='fieldse'>Transaction Details</span>
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
                    <select id="Payment" disabled={isPaymentDisabled} class="form-control form-control-sm" value={pamentMode} onChange={handlePaymentMode}  >
                      <option value="0" selected>Select Payment Mode</option>
                      {PaymentModeList && PaymentModeList.map((val,index)=>{
                       
                        return (
                          <option key={index} value={val.id}>{val.paymentMethodName}</option>
                        )
                      })}
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
                      placeholder="Transaction No."
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
                          placeholder="Transaction No."
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

            <div className="fieldsett col-md-6 mt-3 pe-2">
              <div className="">
                <span  className='fieldse'>Amount Details</span>
                <div className="med-table-section">
                  <table className="med-table border-bottom border_ striped_ mt-1">
                    <tbody>
                      <tr>
                        <td>
                          <b className="color546788">Total Amount</b>
                        </td>
                        <td>
                          <b className="color546788">{totalSum || 0}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">Total Discount</b>
                        </td>
                        <td>
                          <b className="color546788">{totalDiscountSum}</b>
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
                          <b className="color546788">Balance Amount</b>
                        </td>
                        <td>
                          <b className="color546788">{balanceAmount || 0}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color546788">
                            Total Payable Amount(Rs)
                          </b>
                        </td>
                        <td>
                          <b className="color546788">{ totalSum || 0}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b className="color319731">Paid Amount</b>
                        </td>
                        <td>
                          <input
                            type="number"
                            id="totalPaidAmount"
                            name="totalPaidAmount"
                            disabled = {IsPaidDisable}
                            className="color319731"
                           value={totalSum}
                            
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
              <div className="">
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
