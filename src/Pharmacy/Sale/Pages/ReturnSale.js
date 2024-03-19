import React, { useState, useEffect } from 'react'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import BoxContainer from '../../../Component/BoxContainer';
import NoDataFound from '../../../assets/images/icons/No data-rafiki.svg'
import AlertToster from '../../../Component/AlertToster';
import Heading from '../../../../src/Component/Heading';
import GetAllSaleByBillNo from '../API/GetAllSaleByBillNo'
import PostReturnSale from '../API/PostReturnSale'
import imgReset from '../../../assets/images/icons/reset.svg'
import SuccessToster from '../../../../src/Component/SuccessToster'
import ValidationReturnSale from '../../../Validation/Pharmacy/ValidationReturnSale'
import GetRegisterDetailsByUHID from '../../../../src/Registartion/API/GET/GetRegisterDetailsByUHID'


const ReturnSale = () => {

    let [stockList, setStockList] = useState([])
    let [showImage, setShowImage] = useState(0);
    let [uhid, setUhid] = useState(0);
    let [patientData, setPatientData] = useState([]);
    let [billNo, setBillNo] = useState();
    let [sendJsonSaleReturn, setSendJsonSaleReturn] = useState([])
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMeassage] = useState("")
    let [showSuccessToster, setShowSuccessToster] = useState(0)

    const [isChecked, setIsChecked] = useState(true);
    const [inputValues, setInputValues] = useState({ "userId": window.userId });
    const [totalReturnAmount, setTotalReturnAmount] = useState(0);
    const [returnAmounts, setReturnAmounts] = useState([]);


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
        const stockItem = stockList[index];
        if (stockItem) {
            const unitPrice = parseFloat(stockItem.unitPrice);
            const returnQtyValue = parseFloat(returnQty);
            if (!isNaN(unitPrice) && !isNaN(returnQtyValue)) {
                return (unitPrice * returnQtyValue);
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



    const funcGetSaleItemsByBillNo = async (billNo) => {
        try {

            let response = await GetAllSaleByBillNo(billNo);

            if (response.status === 1) {
                setStockList(response.responseValue)
                const uhid = response.responseValue[0].uhid


                setUhid(uhid)
             

                let detailsresponse = await GetRegisterDetailsByUHID(uhid);
                setPatientData(detailsresponse.responseValue.admittedPatientDetails[0])

            }

        } catch (e) {


        }
    }



    let handleCheckBox = async (index) => {
        let tempArray = [];
        let totalAmount = 0;

        for (var i = 0; i < stockList.length; i++) {
            const findID = stockList[i].subid;
         
            const isChecked = document.getElementById(findID).checked;
         
            if (isChecked === true) {
                const retQ = document.getElementById(`returnQty${i}`).value;
                tempArray.push({
                    productId: stockList[i].productId,
                    unitId: stockList[i].unitId,
                    unitName: stockList[i].unitName,
                    unitPrice: stockList[i].unitPrice,
                    batchNo: stockList[i].batchNo,
                    quantity: retQ,
                });

                let amount = document.getElementById("returnAmount" + i).value;
                totalAmount += parseInt(amount);
            }
        }

        setSendJsonSaleReturn([...tempArray]);
        setTotalReturnAmount(totalAmount);
       

    }

    let handleAllCheckBox = async (id) => {
        let totalAmount = 0;
        if (id === -1) {
            let a = document.getElementById(-1).checked;
            let arr = [];
            if (a) {
                stockList.map((val, ind) => {
                    const retQ = document.getElementById(`returnQty${ind}`).value;

                    document.getElementById(val.subid).checked = true;

                    arr.push(
                        {
                            productId: val.productId,
                            unitId: val.unitId,
                            unitName: val.unitName,
                            unitPrice: val.unitPrice,
                            batchNo: val.batchNo,
                            quantity: retQ,
                        });
                    let amount = document.getElementById("returnAmount" + ind).value;
                    totalAmount += parseInt(amount);
                });
               
                setSendJsonSaleReturn([...arr]);
                setTotalReturnAmount(totalAmount);
            } else {
                stockList.map((val, ind) => {
                    document.getElementById(val.subid).checked = false;

                });
                document.getElementById(-1).checked = false;
              
                setSendJsonSaleReturn([]);
                setTotalReturnAmount(0);
               
            }

        }
    }



    let handleSave = async () => {
     
        try {

            const returnData = {

                billNo: inputValues.billNo,
                jsonSalesReturn: JSON.stringify(sendJsonSaleReturn),
                returnRemark: inputValues.returnRemarks,
                returnNetAmount: totalReturnAmount,
                userId: window.userId,

            };
           

            let valresponse = ValidationReturnSale(inputValues.returnRemarks)

            if (valresponse) {

                let response = await PostReturnSale(returnData);
                if (response.status === 1) {
                    setShowMeassage("Data Saved Successfully!!")

                    window.sessionStorage.setItem("PrintReturnData", JSON.stringify({
                        "jsonSalesReturn": sendJsonSaleReturn, "returnRemark": inputValues.returnRemarks, "returnNetAmount": totalReturnAmount,
                        "billNo": inputValues.billNo, "patientData": patientData, "uhid": uhid
                    }))

                    window.open("/printReturnSale/", 'noopener,noreferrer');

                    setShowSuccessToster(1)
                    setTimeout(() => {

                    }, 2000)
                }

                resetForm(1);
            }
            else {
                setShowMeassage()
                setShowAlertToster(1)
                setTimeout(() => {

                }, 2000)
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
        funcGetSaleItemsByBillNo();
        // setIsChecked(0)
        document.getElementById(-1).checked = false;
        setReturnAmounts('')
        setTotalReturnAmount(0)
    }


    useEffect(() => {

        setReturnAmounts(new Array(stockList.length).fill(''));
        funcGetSaleItemsByBillNo();


    }, [])


    return (
        <>

            <section className='main-content mt-5 pt-3'>
                <div className='container-fluid'>

                    <div className='row'>
                        <div className="col-12">
                            <div className='whitebg' style={{ margin: "0 0 10px 0" }}>
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 analuze">
                                        <div className="fieldsett-in">
                                            <div className="fieldsett">
                                                <span className='fieldse'>Return Sale</span>
                                                <BoxContainer>
                                                    <div className='sertin me-2 mb-2'>
                                                        <input type="text" className="form-control form-control-sm" id="billNo" name="billNo" value={inputValues.billNo} placeholder="Enter Bill No." onChange={handleChange} />
                                                    </div>

                                                    <div className='searchbtnn d-flex gap-1 mb-2'>
                                                        <button type="button" className="btn btn-save btn-sm" onClick={() => { funcGetSaleItemsByBillNo(billNo) }}><i className='fa fa-search' ></i>Search Result</button>
                                                    </div>
                                                    <div>
                                                        <button type="button" className="btn btn-clear btn-sm" onClick={() => { resetForm(1) }}><i className="bi bi-eraser"></i> Clear</button>
                                                    </div>
                                                </BoxContainer>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className='handlser'>
                                <Heading text='Sale List' />

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
                                                <th>Unit Name</th>
                                                <th>Unit Price</th>
                                                <th>Batch No.</th>
                                                <th>Quantity</th>
                                                <th>Return Quantity</th>
                                                <th>Return Amount</th>
                                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <input type="checkbox" id={-1} onChange={() => { handleAllCheckBox(-1); }} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                                                    <span>Select All</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stockList && stockList.map((list, index) => {

                                                return (

                                                    <>
                                                        <tr key={list.subid}>
                                                            <td className='' style={{ paddingLeft: '7px', fontSize: '13px' }}>{index + 1}</td>

                                                            <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.brandName}</span></td>

                                                            <td><span style={{ color: '#7696F1', fontSize: '13px' }}>{list.unitName}</span></td>

                                                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.unitPrice}</span></td>

                                                            <td><span style={{ fontSize: '13px', color: '#929292' }}>{list.batchNo}</span></td>

                                                            <td><span style={{ color: '#858585', fontSize: '13px' }}>{list.quantity}</span></td>

                                                            <td>
                                                                <input
                                                                    type='number'
                                                                    id={`returnQty${index}`}
                                                                    name='returnQty'
                                                                    placeholder="enter return Quantity"
                                                                    onChange={(e) => {
                                                                        const returnQty = e.target.value;
                                                                        handleReturnQtyChange(index, returnQty);
                                                                    }}
                                                                />
                                                            </td>


                                                            <td><input type='number' id={`returnAmount${index}`} name='returnAmount'
                                                                placeholder="enter return Quantity" value={returnAmounts[index]} /></td>


                                                            <td style={{ textAlign: 'center' }}><input type="checkbox" id={list.subid}
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
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1_ me-1" onClick={handleSave} ><img src={saveButtonIcon} className='icnn' />Submit & Print</button>
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

export default ReturnSale
