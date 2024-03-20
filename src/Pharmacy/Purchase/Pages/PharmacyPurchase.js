import React, { useState, useEffect, useRef } from 'react'
import imgReset from '../../../assets/images/icons/reset.svg'
import imgPrint from '../../../assets/images/icons/imgPrint.svg'
import imgDiscount from '../../../assets/images/icons/discount (1).svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import GetVendorMaster from '../../../Inventory/API/VendorMaster/GetVendorMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import GetKnowmedItems from '../../Purchase/API/GetKnowmedItems'
import GetUnitMaster from '../../../Pharmacy/UnitMaster/API/GetUnitMaster'
import GetHSNMaster from '../../../Pharmacy/Purchase/API/GetHSNMaster'
import PostPurchaseItems from '../../../Pharmacy/Purchase/API/PostPurchaseItems'
import Toster from '../../../../src/Component/Toster'
import TosterUnderProcess from '../../../../src/Component/TosterUnderProcess'
import SuccessToster from '../../../../src/Component/SuccessToster'
import AlertToster from '../../../../src/Component/AlertToster'
import imgBill from '../../../assets/images/icons/imgBill.svg'
import imgSuppl from '../../../assets/images/icons/supplier.svg'
import imgInvoice from '../../../assets/images/icons/invoice (2).svg'
import imgGross from '../../../assets/images/icons/gross.svg'
import GetConversionByProductId from '../API/GetConversionByProductId'
import ValidationPharmacyPurchase from '../../../Validation/Pharmacy/ValidationPharmacyPurchase'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import clearIcon from '../../../assets/images/icons/clear.svg';



export default function PharmacyPurchase() {

    let [supplierList, setSupplierList] = useState()
    let [itemList, setItemList] = useState()
    let [unitId, setUnitId] = useState()
    let [productId, setProductId] = useState()
    let [hsnCodeList, setHsnCodeList] = useState()
    let [multipliedBy, setMultipliedBy] = useState()
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMeassage] = useState("")
    let [showSuccessToster, setShowSuccessToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)
    let [isknowmed, setIsKnowmed] = useState('')

    const [inputValues, setInputValues] = useState({ "userId": window.userId });
    const [rows, setRows] = useState([{ id: 1 }]);
    const { t } = useTranslation();
    const [conversionDetailsMap, setConversionDetailsMap] = useState({});

    let getItemList = async () => {
        try {

            let response = await GetKnowmedItems()
            let supresponse = await GetVendorMaster()
            let hsnresponse = await GetHSNMaster()
           

            if (response.status === 1) {
                setItemList(response.responseValue)
            }
            if (supresponse.status === 1) {
                setSupplierList(supresponse.responseValue)
            }
            if (hsnresponse.status === 1) {
                setHsnCodeList(hsnresponse.responseValue)
            }

        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e.message)
        }

    }

    let funcConversionUnit = async (rowId, productId) => {

        let conversresponse = await GetConversionByProductId(productId);
        

        const conversionDetails = conversresponse.responseValue[0];
        // setUnitId(conversionDetails.unitID)
        if (conversresponse.status === 1) {
            setConversionDetailsMap(prevMap => ({
                ...prevMap,
                [productId]: {
                    unitID: conversionDetails.unitID,
                    isknowmed: conversionDetails.isknowmed
                }
            }));
          
            document.getElementById("currentUnit_" + rowId).value = conversionDetails.currentUnit
            document.getElementById("convertedUnit_" + rowId).value = conversionDetails.unitName
            document.getElementById("multipliedBy_" + rowId).value = conversionDetails.multipliedBy



        }
        else {
            setConversionDetailsMap(prevMap => ({
                ...prevMap,
                [productId]: {
                    unitID: '',
                    isknowmed: ''
                }
            }));
            document.getElementById("currentUnit_" + rowId).value = ''
            document.getElementById("convertedUnit_" + rowId).value = ''
            document.getElementById("multipliedBy_" + rowId).value = ''
        }

    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setInputValues(inputValues => ({
            ...inputValues,
            [name]: value,
        }));
        if (name === "discount") {
            handleTotalDiscountChange(event);
        }

    }


    const handleRowInputChange = (event, rowId) => {
        const { name, value } = event.target;
        if (event.target.name === "productId") {
            setProductId(event.target.value);
        }

        const updatedRows = [...rows];
     
        const rowIndex = updatedRows.findIndex(row => row.id === rowId);
        if (name === "productId" || name === "hsnCodeId") {
            // Update the specific field in the row
            updatedRows[rowIndex][name] = value;
        } else {
            // For other fields, update the row as usual
            updatedRows[rowIndex][name] = value;
        }
        updatedRows[rowIndex][name] = value;

        if (name === 'purchasePrice' || name === 'quantity') {
            const { purchasePrice, quantity } = updatedRows[rowIndex];
            const netAmount = parseFloat(purchasePrice) * parseInt(quantity);
            updatedRows[rowIndex].netAmount = netAmount;
        }

        setRows(updatedRows);

        handlePriceQuantityChange();

        if (name === "productId") {
            funcConversionUnit(rowId, event.target.value);

        }

    };

    // Initial default row

    // const addRow = () => {
    //     const newRow = {
    //         id: rows.length + 1,
    //         name: `Row ${rows.length + 1}`,
    //     }
    //     // const newRowId = rows.length + 1; // Generate sequential IDs
   
    //     setRows([...rows, newRow]);

    // };



    const isRowFilled = (row) => {

        const requiredFields = ['productId', 'hsnCodeId', 'batchNo', 'batchMfg', 'batchExpiry', 'mrp', 'purchasePrice', 'price', 'quantity', 'netAmount'];

        return requiredFields.every(field => !!row[field]);
    };

    const addRow = () => {

        const previousRow = rows[rows.length - 1];
        if (isRowFilled(previousRow)) {
            const newRow = {
                id: rows.length + 1,
                name: `Row ${rows.length + 1}`,
            };
            setRows([...rows, newRow]);
        } else {

            setShowAlertToster(1)
            setShowMeassage("Previous row is not filled completely")
        }
    };


    // const removeRow = (id) => {

    //     // Ensure that the first row is never removed

    //     if (id !== 1) {

    //         setRows(rows.filter(row => row.id !== id));

    //     }

    // };


    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayableAmount, setTotalPayableAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);


    const handlePriceQuantityChange = (rowId, purchasePrice, quantity) => {

    
        const price = parseFloat(purchasePrice);
        const qty = parseInt(quantity);


        const updatedRows = rows.map(row => {
            if (row.id === rowId) {
                const netAmount = price * qty;
                return { ...row, purchasePrice, quantity, netAmount };
            }
            return row;
        });
        setRows(updatedRows);
        const newTotalAmount = updatedRows.reduce((sum, row) => sum + (row.netAmount || 0), 0);
   

        setTotalAmount(newTotalAmount);
        setTotalPayableAmount(newTotalAmount)

    };

    const calculateDiscountValue = (totalAmount, discountPercentage) => {
        return (totalAmount * discountPercentage) / 100;
    };

    const handleTotalDiscountChange = (event) => {
        const newTotalDiscountPercentage = parseFloat(event.target.value) || 0;

        // Calculate the discount in Rupees
        const newTotalDiscountValue = calculateDiscountValue(totalAmount, newTotalDiscountPercentage);
        setTotalDiscount(newTotalDiscountValue);

        // Calculate the new total payable amount with comma seprated
        const newTotalPayableAmount = totalAmount - newTotalDiscountValue;
        setTotalPayableAmount(newTotalPayableAmount);
    };

    const recalculateAmounts = (updatedRows) => {
        // Calculate the total amount
        const newTotalAmount = updatedRows.reduce((sum, row) => sum + (row.netAmount || 0), 0);
        setTotalAmount(newTotalAmount);

        // Calculate the total discount (you may need to adjust this based on your discount logic)
        const newTotalDiscount = calculateTotalDiscount(updatedRows);
        setTotalDiscount(newTotalDiscount);

        // Calculate the new total payable amount
        const newTotalPayableAmount = parseFloat(newTotalAmount) - parseFloat(newTotalDiscount);
        setTotalPayableAmount(newTotalPayableAmount.toFixed(2));
    };

    const calculateTotalDiscount = (rows) => {
        return rows.reduce((sum, row) => sum + (row.discount || 0), 0);
    };



    const removeRow = (id) => {

        if (id !== 1) {
            const updatedRows = rows.filter(row => row.id !== id);
            setRows(updatedRows);


            recalculateAmounts(updatedRows);
        }
    };



    const handleAddData = async () => {

        try {

            const collectedData = rows.map((row, index) => {
                const productId = rows[index].productId;
                const conversionDetails = conversionDetailsMap[productId] || {};
                
                return {


                    productId: rows[index].productId,
                    unitId: conversionDetails.unitID,
                    hsnCodeId: rows[index].hsnCodeId,
                    batchNo: document.getElementById(`batchNo_${row.id}`).value,
                    batchMfg: document.getElementById(`batchMfg_${row.id}`).value,
                    batchExpiry: document.getElementById(`batchExpiry_${row.id}`).value,
                    mrp: document.getElementById(`mrp_${row.id}`).value,
                    purchasePrice: document.getElementById(`purchasePrice_${row.id}`).value,
                    unitPrice: document.getElementById(`price_${row.id}`).value,
                    quantity: document.getElementById(`quantity_${row.id}`).value,
                    netAmount: document.getElementById(`netAmount_${row.id}`).value,
                    isknowmed: conversionDetails.isknowmed
                }
            });


            const filteredData = collectedData.filter(item => Object.values(item).some(value => value !== null && value !== ''));
          
            const purchaseData = {

                supplierId: inputValues.supplierId,
                billNo: inputValues.billNo,
                dateOfPurchase: inputValues.dateOfPurchase,
                grossAmount: totalAmount,
                discount: inputValues.discount,
                netAmount: totalPayableAmount,
                userId: window.userId,
                jsonPurchase: JSON.stringify(filteredData),
            };

            let valresponse = ValidationPharmacyPurchase(inputValues.supplierId, JSON.stringify(filteredData))

            if (valresponse) {

                let response = await PostPurchaseItems(purchaseData);
                if (response.status === 1) {
                    setShowMeassage("Data Saved Successfully!!")
                    setShowSuccessToster(1)
                    setTimeout(() => {
                        setShowToster(0)
                    }, 2000)

                    resetForm(1);
                }
                else {
                    setShowMeassage("Field can't be blank!")
                    setShowAlertToster(1)
                    setTimeout(() => {
                        setShowToster(0)
                    }, 2000)
                }

            }
            else {

                setShowToster(1)
                setShowMeassage("Field can't be blank!")
                setShowAlertToster(1)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }

            //     if (ValidationPharmacyPurchase(inputValues.supplierId, JSON.stringify(filteredData))) {
            //         // Display an error message or take appropriate action for validation failure
            //         setShowToster(1);
            //         setTosterMessage("Field can't be blank!");
            //         setTosterValue(1);
            //         setTimeout(() => {
            //             setShowToster(0);
            //         }, 2000);
            //         return; // Exit the function without making the API call
            //     }




            //     let response = await PostPurchaseItems(purchaseData);
            //     if (response.status === 1) {

            //         setShowMeassage("Data Saved Successfully!!")
            //         setShowSuccessToster(1)
            //         // window.sessionStorage.setItem("PrintPurchaseData", JSON.stringify({
            //         //     "supplierId": purchaseData.supplierId, "billNo": purchaseData.billNo,
            //         //     "dateOfPurchase": purchaseData.dateOfPurchase, "grossAmount": purchaseData.grossAmount, "discount": purchaseData.discount,
            //         //     "netAmount": purchaseData.netAmount
            //         // }));
            //         // window.open("/purchasePrint/", 'noopener,noreferrer');
            //         resetForm();


            //     }

            //     else {
            //         setShowMeassage(response.responseValue)
            //         setShowAlertToster(1)
            //     }


        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e)
        }

    }

    const resetForm = (value) => {
        setInputValues({
            supplierId: '',
            billNo: '',
            dateOfPurchase: '',
            grossAmount: '',
            discount: '',
            netAmount: '',
            userId: window.userId,
        });

        setTotalAmount(0);
        setTotalDiscount(0);
        setTotalPayableAmount(0);
        setClearDropdown(value)



        const updateRows = rows.map(row => {
            if (row.id === 1) {
                return {
                    ...row,


                    currentUnit: document.getElementById(`currentUnit_${row.id}`).value = '',
                    convertedUnit: document.getElementById(`convertedUnit_${row.id}`).value = '',
                    multipliedBy: document.getElementById(`multipliedBy_${row.id}`).value = '',
                    batchNo: document.getElementById(`batchNo_${row.id}`).value = '',
                    batchMfg: document.getElementById(`batchMfg_${row.id}`).value = '',
                    batchExpiry: document.getElementById(`batchExpiry_${row.id}`).value = '',
                    purchasePrice: document.getElementById(`purchasePrice_${row.id}`).value = '',
                    quantity: document.getElementById(`quantity_${row.id}`).value = '',
                    netAmount: document.getElementById(`netAmount_${row.id}`).value = '',
                    mrp: document.getElementById(`mrp_${row.id}`).value = '',
                    price: document.getElementById(`price_${row.id}`).value = '',
                };
            }
            return row;
        });
        setRows(updateRows);
        setRows([{ id: 1 }]);


    };

    useEffect(() => {

        getItemList();


    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className='col-12'>

                            <div className="fieldsett-in">
                                <div className="fieldsett">
                                    <span className="fieldse">{t("Purchase_Details")}</span>
                                    <div className="row mt-2 px-2">
                                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={imgSuppl} className="icnn" alt="" />
                                                <label htmlFor="supplierId" className="form-label">{t("Supplier")} <span className="starMandatory">*</span></label>
                                                <select className="form-control form-control-sm" value={inputValues.supplierId} id="supplierId" name="supplierId" onChange={handleInputChange}>
                                                    <option value="0">{t("Select_Supplier")}</option>
                                                    {supplierList && supplierList.map((val, index) => {
                                                        return (
                                                            <option value={val.id}>{val.vendorName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={imgBill} className="icnn" alt="" />
                                                <label htmlFor="BillNo" className="form-label">{t("Bill_No.")} <span className="starMandatory">*</span></label>
                                                <input type="text" className="form-control form-control-sm" value={inputValues.billNo} id="billNo" name="billNo" placeholder={t("Bill_No.")} onChange={handleInputChange} />
                                            </div>
                                        </div>

                                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={imgInvoice} className="icnn" alt="" />
                                                <label htmlFor='InvoiceDate' className="form-label">{t("Invoice_Date")}<span className="starMandatory">*</span></label>
                                                <input type="date" className="form-control form-control-sm" value={inputValues.dateOfPurchase} id="dateOfPurchase" name="dateOfPurchase" placeholder={t("Enter_Donor_Name")} max={new Date().toISOString().split('T')[0]} onChange={handleInputChange} />
                                            </div>
                                        </div>


                                        {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={imgGross} className="icnn" alt="" />
                                                <label for="GrossAmount" className="form-label">Gross Amount <span className="starMandatory">*</span></label>
                                                <input type="number" className="form-control form-control-sm" value={inputValues.grossAmount} id="grossAmount" name="grossAmount" 
                                                placeholder="Gross Amount" onChange={handleInputChange} />
                                            </div>
                                        </div> */}


                                        {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={imgDiscount} className="icnn" alt="" />
                                                <label for="Discount" className="form-label">Discount <span className="starMandatory">*</span></label>
                                                <input type="text" className="form-control form-control-sm" value={inputValues.discount} id="discount" name="discount" placeholder="Discount" onChange={handleInputChange} />
                                            </div>
                                        </div> */}


                                        {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={imgGross} className="icnn" alt="" />
                                                <label htmlFor="NetAmount" className="form-label">Net Amount <span className="starMandatory">*</span></label>
                                                <input type="number" className="form-control form-control-sm" value={inputValues.netAmount} id="netAmount" name="netAmount" placeholder="Net Amount" onChange={handleInputChange} />
                                            </div>
                                        </div> */}


                                    </div>
                                </div>
                            </div>
                            {showToster === 1 ?
                                <Toster value={tosterValue} message={tosterMessage} /> : ""
                            }
                        </div>
                    </div>

                    <div className='row mt-3'>
                        <div className='col-12'>
                            <div className='med-box'>
                                <div className='med-table-section' style={{ minHeight: '35vh', overflow: 'auto' }}>
                                    <table className='med-table border_ striped billingTable'>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>#</th>
                                                <th style={{ width: '20%' }}>{t("Item")}</th>
                                                <th style={{ width: '6%' }}>{t("Current_Unit")}</th>
                                                <th style={{ width: '6%' }}>{t("Converted_Unit")}</th>
                                                <th style={{ width: '6%' }}>{t("MultipliedBy")}</th>
                                                <th style={{ width: '6%' }}>{t("HSNCode")}</th>
                                                <th >{t("Batch_No")}</th>
                                                <th >{t("Batch_Mfg")}</th>
                                                <th >{t("Batch_Expiry")}</th>
                                                <th >{t("M_R_P")}</th>
                                                <th >{t("PurchasePrice")}</th>
                                                <th >{t("Selling_Price")}</th>
                                                <th >{t("Quantity")}</th>
                                                <th >{t("NetAmount")}</th>
                                                <th className='text-center'>{t("Action")}</th>
                                            </tr>
                                        </thead>

                                        <tbody>

                                            {rows.map((row, index) => {
                                                return (
                                                    <tr key={row.id}>
                                                        <td className='text-center'>{index + 1}</td>

                                                        <td>
                                                            {itemList &&
                                                                <div className="drpWithSearch">
                                                                    <DropdownWithSearch defaulNname={t("Search")} id={`productId_${row.id}`} name='productId'
                                                                        getvalue={(event) => handleRowInputChange(event, row.id)} list={itemList} valueName="id" displayName="brandName"
                                                                        editdata={""} clear={clearDropdown} clearFun={resetForm} />
                                                                </div>
                                                            }
                                                        </td>

                                                        <td><input type='text' id={`currentUnit_${row.id}`} name='currentUnit' readOnly placeholder={t("current_unit")} /></td>
                                                        <td><input type='text' id={`convertedUnit_${row.id}`} name='convertedUnit' readOnly placeholder={t("converted_unit")} /></td>
                                                        <td><input type='text' id={`multipliedBy_${row.id}`} name='multipliedBy' readOnly placeholder={t("multiplied_By")} /></td>

                                                        <td>
                                                            {hsnCodeList && <DropdownWithSearch defaulNname="Search" id={`hsnCodeId_${row.id}`} name='hsnCodeId' list={hsnCodeList}
                                                                valueName="id" displayName="hsnCode" getvalue={(event) => handleRowInputChange(event, row.id)} editdata={""} clear={clearDropdown} clearFun={resetForm} />}
                                                        </td>


                                                        <td><input type='text' id={`batchNo_${row.id}`} name='batchNo' onChange={(event) => handleRowInputChange(event, row.id)} placeholder={t("enter_batch_nomber")} /></td>

                                                        <td><input type='date' id={`batchMfg_${row.id}`} name='batchMfg' max={new Date().toISOString().split('T')[0]} onChange={(event) => handleRowInputChange(event, row.id)} placeholder={t("Enter_Batch_Mfg")} /></td>

                                                        <td><input type='date' id={`batchExpiry_${row.id}`} name='batchExpiry' min={new Date().toISOString().split('T')[0]} onChange={(event) => handleRowInputChange(event, row.id)} placeholder={t("Enter_Batch_Expiry")} /></td>

                                                        <td><input type='number' id={`mrp_${row.id}`} name='mrp' onChange={(event) => handleRowInputChange(event, row.id)} placeholder={t("MRP")} /></td>

                                                        <td><input type='number' id={`purchasePrice_${row.id}`} name='purchasePrice' onChange={(event) => handleRowInputChange(event, row.id)} placeholder={t("Price")} /></td>

                                                        <td><input type='number' id={`price_${row.id}`} name='price' onChange={(event) => handleRowInputChange(event, row.id)} placeholder={t("Price")} /></td>
                                                        <td><input type='number' id={`quantity_${row.id}`} name='quantity' onChange={(event) => handleRowInputChange(event, row.id)} placeholder={t("Enter_Quantity")} /></td>
                                                        <td><input type='number' id={`netAmount_${row.id}`} name='netAmount' value={row.netAmount} placeholder={t("Net_Amount")} /></td>
                                                        <td>

                                                            <div className='action-button'>
                                                                <i className="bi bi-plus" onClick={addRow}></i>
                                                                <i className="bi bi-trash3" onClick={() => removeRow(row.id)}></i>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-6 mt-3'>
                            <div className='med-box'>
                                <div className='inner-content'>
                                    <div className="mb-2">
                                        <img src={imgGross} className="icnn" alt="" />
                                        <label for="GrossAmount" className="form-label">{t("GrossAmount")} <span className="starMandatory">*</span></label>
                                        <input type="number" className="form-control form-control-sm" readOnly value={totalAmount.toFixed(2)} id="grossAmount" name="grossAmount"
                                            placeholder={t("Gross_Amount")} />
                                    </div>

                                </div>

                                <div className='inner-content'>
                                    <div className="mb-2">
                                        <img src={imgDiscount} className="icnn" alt="" />
                                        <label for="Discount" className="form-label">{t("Discount")} <span className="starMandatory">*</span></label>
                                        <input type="text" className="form-control form-control-sm" value={inputValues.discount} id="discount" name="discount"
                                            placeholder={t("Discount")} onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className='inner-content'>
                                    <div className="mb-2">
                                        <img src={imgGross} className="icnn" alt="" />
                                        <label htmlFor="NetAmount" className="form-label">{t("NetAmount")} <span className="starMandatory">*</span></label>
                                        <input type="number" className="form-control form-control-sm" readOnly value={totalPayableAmount} id="netAmount" name="netAmount"
                                            placeholder={t("NetAmount")} />
                                    </div>

                                </div>



                                {/* <div className="title">Discount</div>
                                <div className='inner-content'>
                                    <div className="mb-2">
                                        <label htmlFor="DiscountBy" className="form-label"><img src={imgDiscount} /> Total Discount <span className="starMandatory">*</span></label>
                                        <input type="text" className="form-control form-control-sm" id="totalDiscount" placeholder="Enter Discount " name="totalDiscount" onChange={handleTotalDiscountChange} ref={totalDiscountInputRef} />
                                    </div> */}


                            </div>
                        </div>


                        <div className='col-md-6 mt-3'>
                            <div className='med-box'>
                                <div className="title">{t("Amount_Details")}</div>
                                <div className='med-table-section'>
                                    <table className='med-table border-bottom border_ striped_ mt-1'>
                                        <tbody>
                                            <tr>
                                                <td><b className='color546788'>{t("Total_Amount(Rs)")}</b></td>
                                                <td><b className='color546788'>{totalAmount.toFixed(2)}</b></td>
                                            </tr>
                                            <tr>
                                                <td><b className='color546788'>{t("Total_Discount")}(Rs)</b></td>
                                                <td><b className='color546788'>{totalDiscount.toFixed(2)}</b></td>
                                            </tr>
                                            {/* <tr>
                                                <td><b className='color546788'>Advance Amount(Rs)</b></td>
                                                <td><b className='color546788'>500.00</b></td>
                                            </tr>
                                            <tr>
                                                <td><b className='color546788'>Balance Amount(Rs)</b></td>
                                                <td><b className='color546788'>500.00</b></td>
                                            </tr> */}
                                            <tr>
                                                <td><b className='color546788'>{t("Total_Payable_Amount(Rs)")}</b></td>
                                                <td><b className='color546788'>{totalPayableAmount}</b></td>
                                            </tr>
                                            {/* <tr>
                                                <td><b className='color319731'>Paid Amount(Rs)</b></td>
                                                <td><b className='color319731'>500.00</b></td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {
                            showAlertToster === 1 ? <AlertToster message={showMessage} handle={setShowAlertToster} /> : ""
                        }
                        {
                            showSuccessToster === 1 ? <SuccessToster message={showMessage} handle={setShowSuccessToster} /> : ""
                        }



                    </div>
                    <div className='row mt-3'>
                        <div className='col-12'>
                            <div className='med-box'>
                                <div className="inner-content text-right">
                                    <div className="mb-2 mt-2 relative">
                                        <div>
                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleAddData}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { resetForm(1) }}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                            {/* <button type="button" className="btn btn-save btn-sm mb-1_ me-1" onClick={handlePrint}><img src={imgPrint} /> Print</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
        </>

    )

}

