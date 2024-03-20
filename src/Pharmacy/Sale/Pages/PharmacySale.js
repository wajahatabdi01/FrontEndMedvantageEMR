import React, { useState, useEffect, useRef } from 'react'
import imgReset from '../../../assets/images/icons/reset.svg'
import imgPrint from '../../../assets/images/icons/imgPrint.svg'
import imgPaymentMode from '../../../assets/images/icons/imgPaymentMode.svg'
import imgCardNo from '../../../assets/images/icons/imgCardNo.svg'
import imgBank from '../../../assets/images/icons/imgBank.svg'
import imgCheque from '../../../assets/images/icons/imgCheque.svg'
import imgRef from '../../../assets/images/icons/imgRef.svg'
import imgBill from '../../../assets/images/icons/imgBill.svg'
import imgCompany from '../../../assets/images/icons/imgCompany.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg'
import uhid from '../../../assets/images/icons/UHID1.svg'
import UserIcon from '../../../assets/images/icons/UserIcon.svg'
import smartphone from '../../../assets/images/icons/smartphone.svg'
import GetKnowmedItems from '../../../../src/Pharmacy/Purchase/API/GetKnowmedItems'
import GetUnitMaster from '../../../Pharmacy/UnitMaster/API/GetUnitMaster'
import DropdownWithSearch from '../../../../src/Component/DropdownWithSearch';
import imgGross from '../../../assets/images/icons/gross.svg'
import imgDiscount from '../../../assets/images/icons/discount (1).svg'
import PostSaleItems from '../../../../src/Pharmacy/Sale/API/PostSaleItems'
import GetPatientDetailsByUHID from '../../../../src/Clinical/API/IPD/personalDashboardIndexSecond/GetPatientDetailsByUHID'
import SuccessToster from '../../../../src/Component/SuccessToster'
import AlertToster from '../../../../src/Component/AlertToster'
import GetAllCurrentStock from '../../CurrentStock/API/GetAllCurrentStock'
import GetAllCurrentStockByProductId from '../../CurrentStock/API/GetAllCurrentStockByProductId'
import GetAllSale from '../../Sale/API/GetAllSale';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
import genderIcon from "../../../assets/images/icons/genders.svg";
import ageIcon from "../../../assets/images/icons/ageIcon.svg";
import clearIcon from '../../../assets/images/icons/clear.svg';


export default function PharmacySale() {

    let [stockList, setStockList] = useState()
    let [unitName, setUnitName] = useState()
    let [productId, setProductId] = useState()

    let [allSale, setAllSale] = useState()
    let [billNo, setBillNo] = useState()
    let [quantity, setQuantity] = useState()
    let [unitId, setUnitId] = useState()
    let [batchNo, setBatchNo] = useState()
    let [unitPrice, setUnitPrice] = useState()
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMeassage] = useState("")
    let [showSuccessToster, setShowSuccessToster] = useState(0)
    let [clearDropdown, setClearDropdown] = useState(0)

    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalPayableAmount, setTotalPayableAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const {t} = useTranslation();

    // const totalDiscountInputRef = useRef(null);

    const [inputValues, setInputValues] = useState({ "userId": window.userId });
    const [rows, setRows] = useState([{ id: 1 }]); // Initial default row




    let getStockList = async () => {

        try {

            let stockresponse = await GetAllCurrentStock()


            if (stockresponse.status === 1) {
                setStockList(stockresponse.responseValue)
                const stockres = stockresponse.responseValue[0];
                // setUnitName(stockres.unitName)
            }

        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e.message)
        }

    }

    let funcStockByProductId = async (rowId, productId) => {

        let stockresponse = await GetAllCurrentStockByProductId(productId);
       
        const stockDetails = stockresponse.responseValue[0];

        if (stockresponse.status === 1) {

            document.getElementById("unitName_" + rowId).value = stockDetails.unitName
            document.getElementById("batchNo_" + rowId).value = stockDetails.batchNo
            document.getElementById("unitPrice_" + rowId).value = stockDetails.unitPrice
            document.getElementById("batchExpiry_" + rowId).value = stockDetails.batchExpiry
            document.getElementById("daysLeftToExpiry_" + rowId).value = stockDetails.daysLeftToExpiry
            document.getElementById("closingStock_" + rowId).value = stockDetails.closingStock
            setUnitId(stockDetails.unitID)
            setBatchNo(stockDetails.batchNo)
            setUnitPrice(stockDetails.unitPrice)
            const updatedRows = rows.map(row => {
                if (row.id === rowId) {
                    const netAmount = stockDetails.unitPrice * row.quantity;
                    return { ...row, netAmount };
                }
                return row;
            });
            setRows(updatedRows);

            // Call handlePriceQuantityChange with rowId, unitPrice, and quantity
            handlePriceQuantityChange(rowId, stockDetails.unitPrice, updatedRows.find(row => row.id === rowId).quantity);

        }
        else {
            document.getElementById("unitName_" + rowId).value = ''
            document.getElementById("batchNo_" + rowId).value = ''
            document.getElementById("unitPrice_" + rowId).value = ''
            document.getElementById("batchExpiry_" + rowId).value = ''
            document.getElementById("daysLeftToExpiry_" + rowId).value = ''
            document.getElementById("closingStock_" + rowId).value = ''

        }

    }


    const getPatientDetails = async (uhId) => {
        try {

            let pmIdresponse = await GetPatientDetailsByUHID(uhId);
           
            if (uhId.trim() !== '' && pmIdresponse.status === 1) {
                setInputValues(inputValues => ({
                    ...inputValues,
                    pmId: pmIdresponse.responseValue[0].pmid,
                    patientName: pmIdresponse.responseValue[0].patientName,
                    mobileNo: pmIdresponse.responseValue[0].mobileNo,
                    gender: pmIdresponse.responseValue[0].gender,
                    age: pmIdresponse.responseValue[0].age,
                    crNo: pmIdresponse.responseValue[0].crNo,
                }));
            } 

        } catch (e) {
            setShowAlertToster(1)
            setShowMeassage('An unexpected error occurred.')
        }
    };


    const handleInputChange = event => {
        const { name, value } = event.target;
        const updatedValue = name === 'uhId' ? value.toUpperCase() : value;
        setInputValues(inputValues => ({
            ...inputValues,
            [name]: updatedValue,
        }));

        if (name === 'uhId') {
            // getPatientDetails(value);
            if (value.trim() === '') {
                // If uhId is empty, clear the details or perform any other action
                resetForm();
            } else {
                getPatientDetails(value);
            }
        }
        
       

        if (name === 'discount') {
            handleTotalDiscountChange(event);
        }
    };

    const handleRowInputChange = (event, rowId) => {
        const { name, value } = event.target;
        if (event.target.name === "productId") {
            setProductId(event.target.value);
        }
        const updatedRows = [...rows];
     
        const rowIndex = updatedRows.findIndex(row => row.id === rowId);
        if (name === "productId") {
            // Update the specific field in the row
            updatedRows[rowIndex][name] = value;
        } else {
            // For other fields, update the row as usual
            updatedRows[rowIndex][name] = value;
        }
        updatedRows[rowIndex][name] = value;
        if (name === 'quantity') {
            const { unitPrice, quantity } = updatedRows[rowIndex];
            const netAmount = unitPrice * quantity;
            updatedRows[rowIndex].netAmount = netAmount;
        }
        setRows(updatedRows);
        // handlePriceQuantityChange();

        if (name === "productId") {
            funcStockByProductId(rowId, event.target.value);

        }
        handlePriceQuantityChange(rowId, updatedRows[rowIndex].unitPrice, updatedRows[rowIndex].quantity);
    };

    const isRowFilled = (row) => {

        const requiredFields = ['productId', 'quantity', 'netAmount'];

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




    // const addRow = () => {
    //     const newRow = {
    //         id: rows.length + 1,
    //         name: `Row ${rows.length + 1}`,
    //     }
    //     // const newRowId = rows.length + 1; // Generate sequential IDs

    //     setRows([...rows, newRow]);
    //     setRows([...rows, newRow]);
    

    // };

    // const removeRow = (id) => {

    //     // Ensure that the first row is never removed

    //     if (id !== 1) {

    //         setRows(rows.filter(row => row.id !== id));

    //     }

    // };



    const handlePriceQuantityChange = (rowId, unitPrice, quantity) => {
        const updatedRows = rows.map(row => {
            if (row.id === rowId) {
                const netAmount = unitPrice * quantity;
                return { ...row, unitPrice, quantity, netAmount };
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

    const handleTotalDiscountChange = event => {
        const newTotalDiscountPercentage = parseFloat(event.target.value) || 0;

        // Calculate the discount in Rupees
        const newTotalDiscountValue = calculateDiscountValue(totalAmount, newTotalDiscountPercentage);
        setTotalDiscount(newTotalDiscountValue);

        // Calculate the new total payable amount
        const newTotalPayableAmount = parseFloat(totalAmount) - newTotalDiscountValue;
        setTotalPayableAmount(newTotalPayableAmount);
    };

    const recalculateAmounts = (updatedRows) => {
        // Calculate the total amount
        const newTotalAmount = updatedRows.reduce((sum, row) => sum + (row.netAmount || 0), 0);
        setTotalAmount(newTotalAmount);

       
        const newTotalDiscount = calculateTotalDiscount(updatedRows);
        setTotalDiscount(newTotalDiscount);

        // Calculate the new total payable amount
        const newTotalPayableAmount = newTotalAmount - newTotalDiscount;
        setTotalPayableAmount(newTotalPayableAmount.toFixed(2));
    };

    const calculateTotalDiscount = (rows) => {
        return rows.reduce((sum, row) => sum + (row.discount || 0), 0);
    };



    const removeRow = (id) => {
        // Ensure that the first row is never removed
        if (id !== 1) {
            const updatedRows = rows.filter(row => row.id !== id);
            setRows(updatedRows);

            // Recalculate amounts after deleting the row
            recalculateAmounts(updatedRows);
        }
    };

    const handleAddData = async () => {

        try {
            const collectedData = rows.map((row, index) => ({


                productId: rows[index].productId,
                unitId: unitId,
                batchNo: batchNo,
                unitPrice: unitPrice,
                quantity: document.getElementById(`quantity_${row.id}`).value,
                netAmount: document.getElementById(`netAmount_${row.id}`).value,


            }));
         

            // Filter out rows with all null/empty values
            const filteredData = collectedData.filter(item => Object.values(item).some(value => value !== null && value !== ''));

            const saleData = {
                uhId: inputValues.uhId,
                pmId: inputValues.pmId,
                grossAmount: totalAmount,
                discount: inputValues.discount,
                netAmount: totalPayableAmount,
                userId: window.userId,
                jsonSale: JSON.stringify(filteredData),
            };


            let response = await PostSaleItems(saleData);

            if (response.status === 1) {
                setShowMeassage("Data Saved Successfully!!")
                setShowSuccessToster(1)


                let allsaleresponse = await GetAllSale();
               
                if (allsaleresponse.status === 1) {
                    const allSales = allsaleresponse.responseValue;

                    if (allSales.length > 0) {
                        const lastSale = allSales[allSales.length - 1]; // Get the last element

                        const billNo = lastSale.billNo;


                        window.sessionStorage.setItem("PrintSaleData", JSON.stringify({
                            "uhId": saleData.uhId, "pmId": saleData.pmId, "billNo": billNo,
                            "grossAmount": saleData.grossAmount, "discount": saleData.discount,
                            "netAmount": saleData.netAmount,
                        }));
                        window.open("/salePrint/", 'noopener,noreferrer');
                        resetForm(1);
                    }
                }
            }

            else {
                setShowMeassage(response.responseValue)
                setShowAlertToster(1)
            }
        }
        catch (e) {
            setShowAlertToster(1)
            setShowMeassage(e)
        }

    }



    const resetForm = (value) => {
        setInputValues({
            uhId: '',
            patientName:'',
            age:'',
            gender:'',
            crNo:'',
            mobileNo:'',
            grossAmount: '',
            discount: '',
            netAmount: '',
            userId: window.userId,
        });

        // setRows([{ id: 1 }]);

        setTotalAmount(0);
        setTotalDiscount(0); // Reset the Total discount value
        setTotalPayableAmount(0); // Reset the Total Payable value
        setClearDropdown(value)


        // totalDiscountInputRef.current.value = '';


        const updatedRows = rows.map(row => {
            if (row.id === 1) {
                return {
                    ...row,

                    unitName: document.getElementById(`unitName_${row.id}`).value = '',
                    unitPrice: document.getElementById(`unitPrice_${row.id}`).value = '',
                    batchNo: document.getElementById(`batchNo_${row.id}`).value = '',
                    batchExpiry: document.getElementById(`batchExpiry_${row.id}`).value = '',
                    daysLeftToExpiry: document.getElementById(`daysLeftToExpiry_${row.id}`).value = '',
                    closingStock: document.getElementById(`closingStock_${row.id}`).value = '',
                    quantity: document.getElementById(`quantity_${row.id}`).value = '',
                    netAmount: document.getElementById(`netAmount_${row.id}`).value = '',

                };
            }
            return row;
        });
        setRows(updatedRows);
        setRows([{ id: 1 }]);
    };

    useEffect(() => {

        getStockList();


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
                                    <span className="fieldse">{t("Customer_Details")}</span>
                                    <div className="row mt-2 px-2">
                                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={uhid} className="icnn" alt="" />
                                                <label htmlFor="uhId" className="form-label">{t("Uhid")} <span className="starMandatory">*</span></label>
                                                <input type="text" className="form-control form-control-sm" id="uhId" name="uhId" value={inputValues.uhId} placeholder={t("UHID")} onChange={handleInputChange} />
                                            </div>
                                        </div>

                                         <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={UserIcon} className="icnn" alt="" />
                                                <label for="patientName" className="form-label">Customer Name <span className="starMandatory"></span></label>
                                                <input type="text" className="form-control form-control-sm" id="patientName" name="patientName" value={inputValues.patientName} placeholder="" />
                                            </div>
                                        </div>

                                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                <img src={smartphone} className="icnn" alt="" />
                                                <label for="mobileNo" className="form-label">Customer Mobile No<span className="starMandatory"></span></label>
                                                <input type="number" className="form-control form-control-sm" id="mobileNo" name="mobileNo" value={inputValues.mobileNo} placeholder="" />
                                            </div>
                                        </div> 

                                          <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                            <img src={genderIcon} className='icnn' alt=''  />
                                                <label htmlFor="gender" className="form-label">Customer Gender<span className="starMandatory"></span></label>
                                                <input type="text" className="form-control form-control-sm" id="gender" name="gender" value={inputValues.gender} placeholder=""  />
                                            </div>
                                        </div> 

                                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                            <img src={ageIcon} className='icnn' alt=''  />
                                                <label htmlFor="age" className="form-label">Customer Age<span className="starMandatory"></span></label>
                                                <input type="text" className="form-control form-control-sm" id="age" name="age" value={inputValues.age} placeholder="" />
                                            </div>
                                        </div>

                                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6">
                                            <div className="mb-2">
                                                
                                                <label htmlFor="crNo" className="form-label">CR. No<span className="starMandatory"></span></label>
                                                <input type="text" className="form-control form-control-sm" id="crNo" name="crNo" value={inputValues.crNo} placeholder=""  />
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>

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
                                                <th>{t("Unit_Name")}</th>
                                                <th>{t("Batch_No")}</th>
                                                <th>{t("Unit_Price")}</th>
                                                <th>{t("Batch_Expiry")}</th>
                                                <th>{t("Days_Left_to_Expiry")}</th>
                                                <th>{t("Available_Quantity")}</th>
                                                <th>{t("Quantity")}</th>
                                                <th>{t("NetAmount")}</th>
                                                <th className='text-center'>{t("Status")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows.map((row, index) => {
                                                return (
                                                    <tr key={row.id}>
                                                        <td className='text-center'>{index + 1}</td>

                                                        <td>
                                                            <div className="drpWithSearch">
                                                                {stockList && <DropdownWithSearch defaulNname={t("Search")} id={`productId_${row.id}`} name='productId'
                                                                    getvalue={(event) => handleRowInputChange(event, row.id)} list={stockList} valueName="productId" displayName="brandName"
                                                                    editdata={""} clear={clearDropdown} clearFun={resetForm} style={{ with: '250px' }} />}
                                                            </div>

                                                        </td>



                                                        {/* <td>{unitList && <DropdownWithSearch defaulNname="Search" id={`unitId_${row.id}`} name='unitId'
                                                            getvalue={(event) => handleRowInputChange(event, row.id)} list={unitList} valueName="id" displayName="unitName"
                                                            editdata={""} clear={clearDropdown} clearFun={resetForm} />}</td> */}

                                                        <td><input type='text' id={`unitName_${row.id}`} name='unitName' readOnly placeholder={t("Unit_Name")} /></td>
                                                        <td><input type='text' id={`batchNo_${row.id}`} name='batchNo' readOnly placeholder={t("batch_No")} /></td>
                                                        <td><input type='text' id={`unitPrice_${row.id}`} name='unitPrice' readOnly placeholder={t("Unit_Price")} /></td>
                                                        <td><input type='text' id={`batchExpiry_${row.id}`} name='batchExpiry' readOnly placeholder={t("Batch_Expiry")} /></td>


                                                        <td><input type='text' id={`daysLeftToExpiry_${row.id}`} name='daysLeftToExpiry' readOnly placeholder={t("days_Left_To_Expiry")} /></td>
                                                        <td><input type='text' id={`closingStock_${row.id}`} name='closingStock' readOnly placeholder={t("Available_Quantity")} /></td>

                                                        {/* <td><input type='text' id={`batchNo_${row.id}`} name='batchNo' value={row.batchNo} onChange={(event) => handleRowInputChange(event, row.id)} 
                                                        placeholder='Enter Batch No.' /></td> */}

                                                        {/* <td><input type='number' id={`price_${row.id}`} name='price' value={row.price} unitPrice
                                                            placeholder='Enter Price' /></td> */}

                                                        <td><input type='number' id={`quantity_${row.id}`} name='quantity' value={row.quantity} onChange={(event) => handleRowInputChange(event, row.id)}
                                                            placeholder={t("Enter_Quantity")} /></td>

                                                        <td><input type='number' id={`netAmount_${row.id}`} name='netAmount' value={row.netAmount} placeholder={t("Enter_Net_Amount")} /></td>
                                                        <td>
                                                            <div className='action-button'><i class="bi bi-plus" onClick={addRow}></i> &nbsp;<i class="bi bi-trash3" onClick={() => removeRow(row.id)}></i></div>
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
                                        <label for="GrossAmount" className="form-label">{t("GrossAmount")}<span className="starMandatory">*</span></label>
                                        <input type="number" className="form-control form-control-sm" readOnly value={totalAmount.toFixed(2)} id="grossAmount" name="grossAmount"
                                            placeholder={t("GrossAmount")} />
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
                                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleAddData}><img src={saveButtonIcon} className='icnn' />{t("Save & Print")}</button>
                                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { resetForm(1) }}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                            {/* <button type="button" className="btn btn-save btn-sm mb-1_ me-1"><img src={imgPrint}/> Print</button>  */}
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






