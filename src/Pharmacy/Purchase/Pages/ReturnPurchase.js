import React, { useState, useEffect } from 'react'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import BoxContainer from '../../../Component/BoxContainer';
import TableContainer from '../../../Component/TableContainer';
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import AlertToster from '../../../Component/AlertToster';
import Heading from '../../../../src/Component/Heading';
import GetAllOtherPurchase from '../API/GetAllOtherPurchase'
import PostReturnPurchase from '../API/PostReturnPurchase'
import imgReset from '../../../assets/images/icons/reset.svg'
import SuccessToster from '../../../../src/Component/SuccessToster'
import ValidationReturnPurchase from '../../../Validation/Pharmacy/ValidationReturnPurchase'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
const ReturnPurchase = () => {

  let [purchaseList, setPurchaseList] = useState([])
  let [showImage, setShowImage] = useState(0);
  let [billNo, setBillNo] = useState();
  let [sendJsonPurchaseReturn, setSendJsonPurchaseReturn] = useState([])
  let [showAlertToster, setShowAlertToster] = useState(0)
  let [showMessage, setShowMeassage] = useState("")
  let [showSuccessToster, setShowSuccessToster] = useState(0)

  const [isChecked, setIsChecked] = useState(true);
  const [inputValues, setInputValues] = useState({ "userId": window.userId });
  const [totalReturnAmount, setTotalReturnAmount] = useState(0);
  const [returnAmounts, setReturnAmounts] = useState([]);


  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  const handleChange = (event, list) => {
    let name = event.target.name;
    let value = event.target.value;
    if (event.target.name === "billNo") {
      setBillNo(value);
    }

    setInputValues(inputValues => ({
      ...inputValues,
      [name]: value,
    }));

  }

  const calculateReturnAmount = (index, returnQty) => {
    const purchaseItem = purchaseList[index];
    if (purchaseItem) {
      const purchasePrice = parseFloat(purchaseItem.purchasePrice);
      const returnQtyValue = parseFloat(returnQty);
      if (!isNaN(purchasePrice) && !isNaN(returnQtyValue)) {
        return (purchasePrice * returnQtyValue);
      }
    }
    return '';
  };



  const handleReturnQtyChange = (index, returnQty) => {
    const returnAmount = calculateReturnAmount(index, returnQty);
    const updatedReturnAmounts = [...returnAmounts];
    updatedReturnAmounts[index] = returnAmount;
    setReturnAmounts(updatedReturnAmounts);

  };



  const funcGetPurchaseItemsByBillNo = async (billNo) => {
    try {


      let response = await GetAllOtherPurchase(billNo);

      if (response.status === 1) {
        setPurchaseList(response.responseValue)

      }

    } catch (e) {

    }
  }

  // let handleCheckBox = async (index) => {

  //   let tempArray = [];
  //   let totalAmount = 0;
  //   for (var i = 0; i < purchaseList.length; i++) {
  //     const findID = purchaseList[i].id;
  //     const isChecked = document.getElementById(findID).checked;
  //     if (isChecked === true) {
  //       const retQ = document.getElementById(`returnQty${i}`).value;
  //       tempArray.push({
  //         productId: purchaseList[i].productId,
  //         unitId: purchaseList[i].unitId,
  //         batchNo: purchaseList[i].batchNo,
  //         quantity: retQ,
  //       });
  //       setSendJsonPurchaseReturn([...tempArray])
  //       console.log("tempArray", tempArray)
  //       console.log("sendJsonPurchaseReturn", [...tempArray])
  //       let amount = document.getElementById("returnAmount" + index).value

  //       let t = parseInt(totalReturnAmount)
  //       setTotalReturnAmount(t + parseInt(amount));
  //         return ;
  //     }
  //     else if (isChecked === false){
  //       console.log("tempArray", tempArray)
  //       setSendJsonPurchaseReturn([...tempArray])
  //       console.log("sendJsonPurchaseReturn", [...tempArray])
  //       let amount = document.getElementById("returnAmount" + index).value
  //       console.log("amount", amount, totalReturnAmount)
  //       let t = parseInt(totalReturnAmount)
  //       setTotalReturnAmount(t - parseInt(amount));
  //     }

  //   }
  //   return tempArray;


  // }

  let handleCheckBox = async (index) => {
    let tempArray = [];
    let totalAmount = 0;

    for (var i = 0; i < purchaseList.length; i++) {
      const findID = purchaseList[i].id;
      const isChecked = document.getElementById(findID).checked;
      console.log("isChecked", isChecked)
      if (isChecked === true) {
        const retQ = document.getElementById(`returnQty${i}`).value;
        tempArray.push({
          productId: purchaseList[i].productId,
          unitId: purchaseList[i].unitId,
          batchNo: purchaseList[i].batchNo,
          quantity: retQ,
        });

        let amount = document.getElementById("returnAmount" + i).value;
        totalAmount += parseInt(amount); // Add the amount to the totalAmount
      }
    }

    // Update the state variables after the loop
    setSendJsonPurchaseReturn([...tempArray]);
    setTotalReturnAmount(totalAmount);

    // Any other operations you need to perform
  }

  let handleAllCheckBox = async (id) => {
    let totalAmount = 0;
    if (id === -1) {
      let a = document.getElementById(-1).checked;

      let arr = [];
      if (a) {
        purchaseList.map((val, ind) => {
          const retQ = document.getElementById(`returnQty${ind}`).value;
          document.getElementById(val.id).checked = true;

          arr.push(
            {
              productId: val.productId,
              unitId: val.unitId,
              batchNo: val.batchNo,
              quantity: retQ,
            });
          let amount = document.getElementById("returnAmount" + ind).value;
          totalAmount += parseInt(amount);
        });
        console.log("arr", arr)

        setSendJsonPurchaseReturn([...arr]);
        setTotalReturnAmount(totalAmount);
      } else {
        purchaseList.map((val, ind) => {
          document.getElementById(val.id).checked = false;

        });
        document.getElementById(-1).checked = false;
        console.log("arr", [...arr])
        setSendJsonPurchaseReturn([]);
        setTotalReturnAmount(0);
        console.log("sendJsonPurchaseReturn", [sendJsonPurchaseReturn])
      }

    }
  }



  let handleSave = async () => {
    console.log("sendJsonPurchaseReturn", sendJsonPurchaseReturn)
    try {

      const returnData = {

        billNo: inputValues.billNo,
        jsonPurchaseReturn: JSON.stringify(sendJsonPurchaseReturn),
        returnRemark: inputValues.returnRemarks,
        returnNetAmount: totalReturnAmount,
        userId: window.userId,

      };
      console.log("returnData", returnData)

      let valresponse = ValidationReturnPurchase(inputValues.returnRemarks)

      if (valresponse) {

        let response = await PostReturnPurchase(returnData);
        if (response.status === 1) {
          setShowMeassage("Data Saved Successfully!!")
          setShowSuccessToster(1)
          setTimeout(() => {

          }, 2000)

          resetForm(1);
        }
        else {
          setShowMeassage()
          setShowAlertToster(1)
          setTimeout(() => {

          }, 2000)
        }

      }


    }
    catch (e) {
      setShowAlertToster(1)
      setShowMeassage()
    }

  }

  const resetForm = () => {
    setInputValues({
      billNo: '',
      returnRemarks: '',
    })
    funcGetPurchaseItemsByBillNo();
    // setIsChecked(0)
    document.getElementById(-1).checked = false;
    setReturnAmounts('')
    setTotalReturnAmount(0)
  }


  useEffect(() => {

    setReturnAmounts(new Array(purchaseList.length).fill(''));
    funcGetPurchaseItemsByBillNo();


  }, [])


  return (
    <>

      <section className='main-content mt-5 pt-3'>
        <div className='container-fluid'>
          {/* {(eyeClick === false && modifyClick === false) && */}
          <div className='row'>
            <div className="col-12">
              <div className='whitebg' style={{ margin: "0 0 10px 0" }}>
                <div className="row">
                  <div className="col-md-12 col-sm-12 analuze">
                    <div className="fieldsett-in">
                      <div className="fieldsett">
                        <span className='fieldse'>{t("Return_Purchase")}</span>
                        <BoxContainer>
                          <div className='sertin me-2 mb-2'>
                            {/* <label htmlFor="productId" className="form-label">Batch No. </label> */}
                            <input type="text" className="form-control form-control-sm" id="billNo" name="billNo" value={inputValues.billNo} placeholder={t("Enter_Bill_No.")} onChange={handleChange} />
                          </div>

                          <div className='searchbtnn d-flex gap-1 mb-2'>
                            <button type="button" className="btn btn-save btn-sm" onClick={() => { funcGetPurchaseItemsByBillNo(billNo) }}><i className='fa fa-search' ></i>{t("Search_Result")}</button>
                          </div>
                          <div>
                            <button type="button" className="btn btn-clear btn-sm" onClick={() => { resetForm(1) }}><i className="bi bi-eraser"></i> {t("Clear")}</button>
                          </div>
                        </BoxContainer>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className='handlser'>
                <Heading text={t("Purchase_List")} />

              </div>
            </div>
            <div className="col-12 mt-2">
              <div className="med-table-section" style={{ "height": "490px", position: 'relative' }}>
                {showImage === 1 ? <div className='imageNoDataFound'><img src={NoDataFound} alt="imageNoDataFound" /></div> :
                  <table className='med-table border striped'>
                    <thead>
                      <tr>
                        <th className="" >S.No.</th>
                        <th>Product Name</th>
                        <th>Batch No.</th>
                        <th>Unit Name</th>
                        <th>Unit Price</th>
                        {/* <th>Net Amount</th> */}
                        <th>Quantity</th>
                        <th>Return Quantity</th>
                        <th>Return Net Amount</th>
                        {/* <th style={{ textAlign: 'center' }}>Select Return</th> */}
                        <th><li className="d-flex flex-row ps-1 gap-2">
                          <input type="checkbox" id={-1} onChange={() => { handleCheckBox(-1); }} />
                          <span>Select All</span>
                        </li></th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchaseList && purchaseList.map((list, index) => {

                        return (

                          <>
                            <tr key={list.id}>
                              <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>

                              <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.brandName}</span></td>

                              <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.unitName}</span></td>

                              <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.purchasePrice}</span></td>

                              <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.batchNo}</span></td>

                              <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.quantity}</span></td>

                              {/* <td><input type='number' id={`returnQty${index}`} name='returnQty'
                                placeholder="enter return Quantity"
                                onChange={(e) => {
                                  const returnQty = e.target.value;
                                  const returnAmount = calculateReturnAmount(index, returnQty);
                                  document.getElementById(`returnAmount${index}`).value = returnAmount;
                                }}/></td> */}

                              <td>
                                <input
                                  type='number'
                                  id={`returnQty${index}`}
                                  name='returnQty'
                                  placeholder="enter return Quantity"
                                  onChange={(e) => {
                                    const returnQty = e.target.value;
                                    handleReturnQtyChange(index, returnQty); // Update returnAmount and totalReturnAmount
                                  }}
                                />
                              </td>


                              <td><input type='number' id={`returnAmount${index}`} name='returnAmount'
                                placeholder="enter return Quantity" value={returnAmounts[index]} /></td>


                              <td style={{ textAlign: 'center' }}><input type="checkbox" id={list.id}
                                onChange={() => { handleCheckBox(index); }} /></td>
                            </tr>
                          </>
                        )
                      })}
                    </tbody>
                  </table>}
              </div>
            </div>
          </div>

          {/* <div className='row' style={{ paddingRight: '0' }}>
              <div className='col-md-12 mt-2'>
                <div className='med-box' style={{ display: 'flex', justifyContent: 'space-between' }}>

                  <div className='inner-content col-md-6'>

                    <div className="mb-2">
                      <img src='' className="icnn" alt="" />
                      <label for="returnNetAmount" className="form-label">Return Net Amount <span className="starMandatory">*</span></label>
                      <input type="text" className="form-control form-control-sm" id="returnNetAmount" name="returnNetAmount"
                        placeholder='enter return remarks' value={totalReturnAmount} />
                    </div>

                    <div className="mb-2">
                      <img src='' className="icnn" alt="" />
                      <label for="returnRemarks" className="form-label">Return Remarks <span className="starMandatory">*</span></label>
                      <input type="text" className="form-control form-control-sm" value={inputValues.returnRemarks} id="returnRemarks" name="returnRemarks"
                        placeholder='enter return remarks' onChange={handleChange} />
                    </div>

                  </div>
                  <div className="mb-2 relative ms-2 me-2" style={{ marginTop: '28px' ,  }}>

                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1_ me-1" onClick={handleSave} ><img src={saveButtonIcon} className='icnn' />Submit Return</button>
                    <button type="button" className="btn btn-save btn-sm mb-1_ me-1" onClick={() => { resetForm() }}><img src={imgReset} /> Reset</button>
                  </div>
                </div>
              </div>
            </div> */}
          <div className='row'>
            <div className='col-md-6 mt-3'>
              <div className='med-box'>
                <div className='inner-content'>
                  <div className="mb-2">
                    <img src='' className="icnn" alt="" />
                    <label for="returnNetAmount" className="form-label">Return Net Amount <span className="starMandatory">*</span></label>
                    <input type="text" className="form-control form-control-sm" id="returnNetAmount" name="returnNetAmount"
                      placeholder='enter return remarks' value={totalReturnAmount} />
                  </div>
                </div>

                <div className='inner-content'>
                  <div className="mb-2">
                    <img src='' className="icnn" alt="" />
                    <label for="returnRemarks" className="form-label">Return Remarks <span className="starMandatory">*</span></label>
                    <input type="text" className="form-control form-control-sm" value={inputValues.returnRemarks} id="returnRemarks" name="returnRemarks"
                      placeholder='enter return remarks' onChange={handleChange} />
                  </div>
                </div>

              </div>
            </div>

            <div className='col-md-6 mt-3'>
              <div className='med-table-section text-right'>
                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1_ me-1" onClick={handleSave} ><img src={saveButtonIcon} className='icnn' />Submit Return</button>
                <button type="button" className="btn btn-clear btn-sm mb-1_ me-1" onClick={() => { resetForm() }}><img src={imgReset} />Reset</button>
              </div>

            </div>

            {
              showAlertToster === 1 ? <AlertToster message={showMessage} handle={setShowAlertToster} /> : ""
            }
            {
              showSuccessToster === 1 ? <SuccessToster message={showMessage} handle={setShowSuccessToster} /> : ""
            }
          </div>
        </div>
      </section>

    </>

  )
}

export default ReturnPurchase
