import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import GetPayment from "../API/Payment/GetPayment";
import PostPayment from "../API/Payment/PostPayment";
import DeletePayment from "../API/Payment/DeletePayment";
import GetTenantMaster from "../API/TenantMaster/GetTenantMaster";
import GetAllPaymentType from "../API/Payment/GetAllPaymentType";
import PutPayment from "../API/Payment/PutPayment";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function Payment() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [TenantName, setTenantName] = useState(null);
  const [Amount, setAmount] = useState('');
  const [PaymentType, setPaymentType] = useState(null);
  const [PayementReferenceID, setPayementReferenceID] = useState('');
  const [PaymentDate, setPaymentDate] = useState("");
  const [PaymentTable, setPaymentTable] = useState([]);
  const [tenantID, settenantID] = useState([]);
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  const [PaymentTypeTable, setPaymentTypeTable] = useState([])
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


  // The Code is  written By S Ayaz


  let dropdowns = async()=>{
    let TenantID = await GetTenantMaster()
    if (TenantID.status === 1) {
      settenantID(TenantID.responseValue.map(Tenant=>({
        value : Tenant.id,
        label : Tenant.name
      })))
       console.log("TenantID", TenantID.responseValue)
    }
  let paymenttype = await GetAllPaymentType()
  if(paymenttype.status===1){
    setPaymentTypeTable(paymenttype.responseValue.map(payment=>({
      value:payment.id,
      label:payment.paymentMethodName
    })));
    
    
  }
  }

  let Getpayment = async () => {
    let Payment = await GetPayment();
    if (Payment.status === 1) {
       console.log("Payment", Payment.responseValue)
      setShowLoder(0);
      setPaymentTable(Payment.responseValue);
    }
  }
 
 


  // POST API called for data saving


  const handleOnChange = (e) => {
    setNewlyAddedRowIndex(null);
    setisNewRowAdded(false)
    document.getElementById('errTenantName').style.display = 'none';
    document.getElementById('errAmount').style.display = 'none';
    document.getElementById('errPaymentType').style.display = 'none';
    document.getElementById('errPaymentReferenceID').style.display = 'none';
    document.getElementById('errPaymentDate').style.display = 'none';

    const { name, value } = e.target;
    
    if (name === 'Amount') {
      setAmount(value);
    }
    if (name === 'PaymentReferenceID') {
      setPayementReferenceID(value);
    }
    if (name === 'PaymentDate') {
      setPaymentDate(value);
    }

  };

  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };

  const handleOnSave = async () => {
    

     if (TenantName === null) {
      document.getElementById('errTenantName').innerHTML = 'Please choose Tenant Name';
      document.getElementById('errTenantName').style.display = 'block';
      return;
    }
    else if (Amount.toString().trim() === '') {
      document.getElementById('errAmount').innerHTML = 'Please Enter Amount';
      document.getElementById('errAmount').style.display = 'block';
      return;
    }
    else if (Amount < 0){
      document.getElementById('errAmount').innerHTML = 'Amount must not be negative';
      document.getElementById('errAmount').style.display = 'block';
      return;
    }

    else if (PaymentType === null) {
      document.getElementById('errPaymentType').innerHTML = 'Please choose Payment Type';
      document.getElementById('errPaymentType').style.display = 'block';
      return;
    }

    else if (PayementReferenceID === '') {
      document.getElementById('errPaymentReferenceID').innerHTML = 'Please Enter Payment Reference ID';
      document.getElementById('errPaymentReferenceID').style.display = 'block';
      return;
    }
    else if (isNaN(PayementReferenceID)) {
      document.getElementById('errPaymentReferenceID').innerHTML = 'Please Enter valid Payment Reference ID';
      document.getElementById('errPaymentReferenceID').style.display = 'block';
      return;
    }
    else if (PaymentDate.trim() === '' || PaymentDate === undefined) {
      document.getElementById('errPaymentDate').innerHTML = 'Please choose Payment Date';
      document.getElementById('errPaymentDate').style.display = 'block';
      return;
    }

    const obj = {
      tenantID: TenantName.value,
      amount: Amount,
      paymentType: PaymentType.value,
      paymentReferenceID: PayementReferenceID,
      paymentDate: PaymentDate,
      userID: userID,
    };

    let data = await PostPayment(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      setisNewRowAdded(true)
      Getpayment();
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setisNewRowAdded(false)
        
      }, 2000);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(1);
      setTosterMessage("Already Exist!");
      setTosterMessage(data.responseValue);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };


  const handleClear = () => {
    // console.log('clear')
    document.getElementById('errTenantName').style.display = 'none';
    document.getElementById('errAmount').style.display = 'none';
    document.getElementById('errPaymentType').style.display = 'none';
    document.getElementById('errPaymentReferenceID').style.display = 'none';
    document.getElementById('errPaymentDate').style.display = 'none';

    setTenantName(null)
    setAmount('')
    setPaymentType(null)
    setPayementReferenceID('')
    setPaymentDate('')
  };
  const edit = (Payment,index) => {

    document.getElementById('errTenantName').style.display = 'none';
    document.getElementById('errAmount').style.display = 'none';
    document.getElementById('errPaymentType').style.display = 'none';
    document.getElementById('errPaymentReferenceID').style.display = 'none';
    document.getElementById('errPaymentDate').style.display = 'none';
    setRowID(Payment.id)
    setIsUpdateBtnShow(true);
    setTenantName({
value : Payment.tenantID,
label : Payment.name

    })
    setAmount(Payment.amount)
    setPaymentType({
      value : Payment.paymentType,
      label : Payment.paymentMethodName
    })
    setPayementReferenceID(Payment.paymentReferenceID)
    setPaymentDate(Payment.paymentDate)
    setNewlyAddedRowIndex(index)
  }

  const handleUpdate = async () => {

  



    if (TenantName === null) {
      document.getElementById('errTenantName').innerHTML = 'Please Enter Tenant Name';
      document.getElementById('errTenantName').style.display = 'block';
      return;
    }
    else if (Amount.toString().trim() === '') {
      document.getElementById('errAmount').innerHTML = 'Please Enter Amount';
      document.getElementById('errAmount').style.display = 'block';
      return;
    }
    else if (Amount < 0) {
      document.getElementById('errAmount').innerHTML = 'Amount must not be negative';
      document.getElementById('errAmount').style.display = 'block';
      return;
    }

    else if (PaymentType === null) {
      document.getElementById('errPaymentType').innerHTML = 'Please Enter Payment Type';
      document.getElementById('errPaymentType').style.display = 'block';
      return;
    }

    else if (PayementReferenceID === undefined) {
      document.getElementById('errPaymentReferenceID').innerHTML = 'Please Enter Payment Reference ID';
      document.getElementById('errPaymentReferenceID').style.display = 'block';
      return;
    }
    else if (isNaN(PayementReferenceID)) {
      document.getElementById('errPaymentReferenceID').innerHTML = 'Please Enter valid Payment Reference ID';
      document.getElementById('errPaymentReferenceID').style.display = 'block';
      return;
    }
    else if (PaymentDate.trim() === '' || PaymentDate === undefined) {
      document.getElementById('errPaymentDate').innerHTML = 'Please Enter Payment Date';
      document.getElementById('errPaymentDate').style.display = 'block';
      return;
    }

    const obj = {
      id: rowID,
      tenantID: TenantName.value,
      amount: Amount,
      paymentType: PaymentType.value,
      paymentReferenceID: PayementReferenceID,
      paymentDate: PaymentDate,
      userID: userID,
    };

    const data = await PutPayment(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      Getpayment()
    
      handleClear()
      setTimeout(() => {
        setShowToster(0);
       
       

      }, 2000);
      setIsUpdateBtnShow(false);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(data.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
      }, 2000);
    }
  };
  const handleCancel = () => {
    handleClear()
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async () => {
    setShowUnderProcess(1);
    
    const obj = {
      id: rowID,
      userId: userID
    }

    let data = await DeletePayment(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      setisNewRowAdded(false)
      Getpayment()
      handleClear()
      setTimeout(() => {
        setShowToster(0);
       
      
      }, 1000)
    }
    else {
      setShowUnderProcess(0)
      setShowToster(0)
      setTosterMessage(data.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0);
      }, 2000)
    }
  };

  useEffect(() => {
    Getpayment();
    dropdowns()
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Payment")}</div>
                <div className="inner-content">
                  <div className='row'>

                 <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Tenant_Name")}<span className="starMandatory">*</span></label>
                      <Select value={TenantName} options={tenantID} className=" create-select" id="serviceType" placeholder={t("Choose_Tenant_Name")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errTenantName", setTenantName)} />
                      <small id="errTenantName" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Amount")}<span className="starMandatory">*</span></label>
                          <input value={Amount} id="ddAmount" type="number" className="form-control form-control-sm" name="Amount" placeholder={t("Enter_Amount")} onChange={handleOnChange} />
                          <small id="errAmount" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                   <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Payment_Type")}<span className="starMandatory">*</span></label>
                      <Select value={PaymentType} options={PaymentTypeTable} className=" create-select" id="serviceType" placeholder={t("Choose_Payment_Type")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errPaymentType", setPaymentType)} />
                      <small id="errPaymentType" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("PaymentReferenceID")}<span className="starMandatory">*</span></label>
                          <input value={PayementReferenceID} id="ddpaymentreferenceid" type="text" className="form-control form-control-sm" name="PaymentReferenceID" placeholder={t("Payment_Reference_ID")} onChange={handleOnChange} />
                          <small id="errPaymentReferenceID" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Payment_Date_and_Time")}<span className="starMandatory">*</span></label>
                          <input value={PaymentDate} id="ddpaymentDate" type="datetime-local" className="form-control form-control-sm" name="PaymentDate" placeholder={t("Enter_Payment_Date")} onChange={handleOnChange} />
                          <small id="errPaymentDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-1" onClick={handleUpdate} >{t("Update")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel} >{t("Cancel")}</button>
                                  </>
                                }
                              </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

            </div>


            {/* table is made using getAllItemMaster API and mapped the data   */}


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style= {{zIndex : '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Tenant_Name")}</th>
                      <th>{t("Amount")}( <i className="bi bi-currency-rupee"></i> )</th>
                      <th>{t("Payment_Type")}</th>
                      <th>{t("PaymentReferenceID")}</th>
                      <th>{t("PaymentDate")}</th>

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PaymentTable && PaymentTable.map((data, index) => {
                       const isNewRow = newlyAddedRowIndex === index;
                       const isEditing = index === editRowIndex;
                      return (
                      <tr className={index === PaymentTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row': ''}  key={index}>
                          <td className="text-center">{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{"₹" + " "+  data.amount }</td>
                        <td>{data.paymentType}</td>
                        <td>{data.paymentReferenceID}</td>
                        <td>{data.paymentDate}</td>


                        <td></td>
                        <td>
                           <div className="action-button">
                            <div
                              data-bs-toggle="tooltip"
                              data-bs-title="Edit Row"
                              data-bs-placement="bottom"
                            
                            >
                              <img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data,index) }} />
                            </div>
                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id); }}/>
                            </div>
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
        {/* -----------------------Start Delete Modal Popup-------------------    */}

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalDelete">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deleteRow}>{t("Delete")}</button>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }
      </section>

    </>

  )
}


