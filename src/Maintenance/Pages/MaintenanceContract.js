import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import GetVendorMaintenanceContract from "../../Maintenance/API/MaintenanceContract/GetVendorMaintenanceContract";
import GetAllMaintenanceContract from "../API/MaintenanceContract/GetAllMaintenanceContract";
import PostMaintenanceContract from "../API/MaintenanceContract/PostMaintenanceContract";
import PutMaintenanceContract from "../API/MaintenanceContract/PutMaintenanceContract";
import DeleteMaintenanceContract from "../API/MaintenanceContract/DeleteMaintenanceContract";
import GetItemMaintenanceContract from "../../Maintenance/API/MaintenanceContract/GetItemMaintenanceContract";
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function MaintenanceContract() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
const [MaintenanceContactTable, setMaintenanceContactTable] = useState([])
const [VendorDropdown, setVendorDropdown] = useState([])
const [Vendor, setVendor] = useState(null)
const [startDate, setstartDate] = useState('')
const [EndDate, setEndDate] = useState('')
const [Equipment, setEquipment] = useState(null)
const [EquipmentDropdown, setEquipmentDropdown] = useState([]);
const [isClearable,] = useState(true);
 const [isSearchable,] = useState(true);
const [contractValue, setcontractValue] = useState('')
const [paymentTerms, setpaymentTerms] = useState('')
const [ContractType, setContractType] = useState('')
const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
const [editRowIndex, setEditRowIndex] = useState(null);
const [isNewRowAdded, setisNewRowAdded] = useState(false)

let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


  // The Code is  written By S Ayaz


  let Dropdowns = async()=>{
let Equipment = await GetItemMaintenanceContract()
if(Equipment.status===1){
  setEquipmentDropdown(Equipment.responseValue.map(Equipment=>({
    value : Equipment.id,
    label : Equipment.itemName
  })))
  console.log("Equipment", Equipment.responseValue)
}

let Vendor = await GetVendorMaintenanceContract()
if(Vendor.status===1){
  setVendorDropdown(Vendor.responseValue.map(vendor=>({
    value : vendor.id,
    label : vendor.vendorName
  })))
  console.log("Vendor", Vendor.responseValue)
}

  }

  let GetMaintenanceContract = async ()=>{
    let getAllMaintenanceContract = await GetAllMaintenanceContract()
    if(getAllMaintenanceContract.status==1){
        console.log("AllMaintenanceContract",getAllMaintenanceContract.responseValue )
        setMaintenanceContactTable(getAllMaintenanceContract.responseValue )
    }
  }



  


  // POST API called for data saving


  const handleOnChange = (e) => {
    setisNewRowAdded(false)
    // document.getElementById('errcomplaintCategory').style.display = 'none';
    // document.getElementById('errRespondendPerson').style.display = 'none';
    // document.getElementById('errRespondentDepartment').style.display = 'none';

    document.getElementById('errEquipment').style.display = 'none';
    document.getElementById('errVendor').style.display = 'none';
    document.getElementById('errstartDate').style.display = 'none';
    document.getElementById('errEndDate').style.display = 'none';
    document.getElementById('errcontractValue').style.display = 'none';
    document.getElementById('errpaymentTerms').style.display = 'none';
    document.getElementById('errContractType').style.display = 'none';
 


    const { name, value } = e.target;

    if (name === 'startDate') {
      setstartDate(value);
      
    }
   else if (name === 'EndDate') {
      setEndDate(value);
    }
  
   else if (name === 'ContractType') {
      setContractType(value);
    }
  
   else if (name === 'contractValue') {
      setcontractValue(value);
    }
   else if (name === 'paymentTerms') {
      setpaymentTerms(value);
    }
  

  };


  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };

  
  const handleOnSave = async () => {
    

     if (Equipment === null) {
      document.getElementById('errEquipment').innerHTML = 'Please Select Item Name';
      document.getElementById('errEquipment').style.display = 'block';
      return;
    }
     else if (Vendor === null) {
      document.getElementById('errVendor').innerHTML = 'Please Select Vendor';
      document.getElementById('errVendor').style.display = 'block';
      return;
    }
     else if (startDate.trim() === '' || startDate === undefined) {
      document.getElementById('errstartDate').innerHTML = 'Please Choose Contract Start Date';
      document.getElementById('errstartDate').style.display = 'block';
      return;
    }
     else if (EndDate.trim() === '' || EndDate === undefined) {
      document.getElementById('errEndDate').innerHTML = 'Please Choose Contract End Date';
      document.getElementById('errEndDate').style.display = 'block';
      return;
    }
     else if (ContractType.trim() === '' || ContractType === undefined) {
      document.getElementById('errContractType').innerHTML = 'Please Enter  Contract Type';
      document.getElementById('errContractType').style.display = 'block';
      return;
    }
     else if (contractValue.trim() === '' || contractValue === undefined) {
      document.getElementById('errcontractValue').innerHTML = 'Please Enter contract Value';
      document.getElementById('errcontractValue').style.display = 'block';
      return;
    }
     else if (isNaN(contractValue)) {
      document.getElementById('errcontractValue').innerHTML = 'Please Enter Valid contract Value';
      document.getElementById('errcontractValue').style.display = 'block';
      return;
    }
     else if (paymentTerms.trim() === '' || paymentTerms === undefined) {
      document.getElementById('errpaymentTerms').innerHTML = 'Please Enter payment Terms';
      document.getElementById('errpaymentTerms').style.display = 'block';
      return;
    }
 
  
    const obj = {
      itemID: Equipment.value,
      vendorID: Vendor.value,
      startDate: startDate,
      endDate: EndDate,
      contractType: ContractType,
      contractValue: contractValue,
      paymentTerms: paymentTerms,
      userID: userID,
    };

    let data = await PostMaintenanceContract(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      GetMaintenanceContract();
      setNewlyAddedRowIndex(0);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
       
        
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
    document.getElementById('errEquipment').style.display = 'none';
    document.getElementById('errVendor').style.display = 'none';
    document.getElementById('errstartDate').style.display = 'none';
    document.getElementById('errEndDate').style.display = 'none';
    document.getElementById('errcontractValue').style.display = 'none';
    document.getElementById('errpaymentTerms').style.display = 'none';
    document.getElementById('errContractType').style.display = 'none';
 
  
   
 setEquipment(null)
 setVendor(null)
 setstartDate('')
 setEndDate('')
 setcontractValue('')
 setContractType('')
 setpaymentTerms('')
  };


  const edit = (getAllMaintenanceContract,index) => {
    setRowID(getAllMaintenanceContract.id)
    setIsUpdateBtnShow(true);
    setEquipment({
      value : getAllMaintenanceContract.itemID,
      label : getAllMaintenanceContract.itemName
    })
    setVendor({
      value : getAllMaintenanceContract.vendorID,
      label : getAllMaintenanceContract.vendorName
    })
    setstartDate(getAllMaintenanceContract.startDate)
    setEndDate(getAllMaintenanceContract.endDate)
    setcontractValue(getAllMaintenanceContract.contractValue)
    setContractType(getAllMaintenanceContract.contractType)
   setpaymentTerms(getAllMaintenanceContract.paymentTerms)
   setNewlyAddedRowIndex(index)
  

  }

  const handleUpdate = async () => {

    

     if ( Equipment === null ) {
      document.getElementById('errEquipment').innerHTML = 'Please Select Item Name';
      document.getElementById('errEquipment').style.display = 'block';
      return;
    }
     else if (Vendor === null) {
      document.getElementById('errVendor').innerHTML = 'Please Select Vendor';
      document.getElementById('errVendor').style.display = 'block';
      return;
    }
     else if (startDate.trim() === '' || startDate === undefined) {
      document.getElementById('errstartDate').innerHTML = 'Please Choose Contract Start Date';
      document.getElementById('errstartDate').style.display = 'block';
      return;
    }
     else if (EndDate.trim() === '' || EndDate === undefined) {
      document.getElementById('errEndDate').innerHTML = 'Please Choose Contract End Date';
      document.getElementById('errEndDate').style.display = 'block';
      return;
    }
     else if (ContractType.trim() === '' || ContractType === undefined) {
      document.getElementById('errContractType').innerHTML = 'Please Enter  Contract Type';
      document.getElementById('errContractType').style.display = 'block';
      return;
    }
     else if (contractValue.trim() === '' || contractValue === undefined) {
      document.getElementById('errcontractValue').innerHTML = 'Please Enter contract Value';
      document.getElementById('errcontractValue').style.display = 'block';
      return;
    }
     else if (isNaN(contractValue)) {
      document.getElementById('errcontractValue').innerHTML = 'Please Enter Valid contract Value';
      document.getElementById('errcontractValue').style.display = 'block';
      return;
    }
     else if (paymentTerms.trim() === '' || paymentTerms === undefined) {
      document.getElementById('errpaymentTerms').innerHTML = 'Please Enter payment Terms';
      document.getElementById('errpaymentTerms').style.display = 'block';
      return;
    }
 
  
    const obj = {
      id: rowID,
      itemID: Equipment.value,
      vendorID: Vendor.value,
      startDate: startDate,
      endDate: EndDate,
      contractType: ContractType,
      contractValue: contractValue,
      paymentTerms: paymentTerms,
      userID: userID,
    };

    const data = await PutMaintenanceContract(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      GetMaintenanceContract()
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
    handleClear();
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async () => {
     setShowUnderProcess(1);
      let userID = window.userID
      const obj = {
      id: rowID,
      userId: userID
    }

    let data = await DeleteMaintenanceContract(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(null);
      setIsUpdateBtnShow(false)
      GetMaintenanceContract()
      handleClear()
      console.log('success')
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
    Dropdowns()
    GetMaintenanceContract()
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title"> {t("Maintenance_Contract")}
                </div>
                <div className="inner-content">
                  <div className='row'>
                 

                     <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("ItemName")}<span className="starMandatory">*</span></label>
                      <Select value={Equipment} placeholder={t("Select_Item_Name")} options={EquipmentDropdown} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errEquipment", setEquipment)} />
                      <small id="errEquipment" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                     <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("Vendor")}<span className="starMandatory">*</span></label>
                      <Select value={Vendor} placeholder={t("Select_Vendor")} options={VendorDropdown} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errVendor", setVendor)} />
                      <small id="errVendor" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Start_Date")}<span className="starMandatory">*</span></label>
                          <input value={startDate} id="ComplaintClosedTime" type="datetime-local" className="form-control form-control-sm" name="startDate"  onChange={handleOnChange} />
                          <small id="errstartDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("End_Date")}<span className="starMandatory">*</span></label>
                          <input value={EndDate} id="ComplaintClosedTime" type="datetime-local" className="form-control form-control-sm" name="EndDate"  onChange={handleOnChange} />
                          <small id="errEndDate" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Contract_Type")}<span className="starMandatory">*</span></label>
                          <input value={ContractType} id="ComplainBy" type="text" className="form-control form-control-sm" name="ContractType" placeholder={t("Enter_Contract_Type_eg_Monthly_Weekly")} onChange={handleOnChange} />
                          <small id="errContractType" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Contract_Value")}<span className="starMandatory">*</span></label>
                          <input value={contractValue} id="ComplainBy" type="text" className="form-control form-control-sm" name="contractValue" placeholder={t("Enter_Contract_Value_eg")} onChange={handleOnChange} />
                          <small id="errcontractValue" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Payment_Terms")}<span className="starMandatory">*</span></label>
                          <input value={paymentTerms} id="ComplainBy" type="text"  className="form-control form-control-sm" name="paymentTerms" placeholder={t("Enter_Payment_Terms_eg_Offline")} onChange={handleOnChange} />
                          <small id="errpaymentTerms" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

             

                     
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-1" onClick={handleOnSave}  >{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear} >{t("Clear")}</button>
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

            


           


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh", }}>
                <table className="med-table border_ striped">
                  <thead style ={{zIndex : '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("ItemName")}</th>
                      <th>{t("Vendor")}</th>
                      <th>{t("Start_Date")}</th>
                      <th>{t("End_Date")}</th>
                      <th>{t("Contract_Type")}</th>
                      <th>{t("Contract_Value")}</th>
                      <th>{t("Payment_Terms")}</th>
                    <th></th>
                       <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MaintenanceContactTable && MaintenanceContactTable.map((data, index) => {
                       const isNewRow = newlyAddedRowIndex === index;
                       const isEditing = index === editRowIndex;
                      return(
                        <tr className={isNewRow ? 'new-row' : '' } key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.itemName}</td>
                        <td>{data.vendorName}</td>
                       
                        
    <td>
      {(() => {
        const dateTime = new Date(data.startDate);
        const formattedDate = dateTime.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const formattedTime = dateTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        return `${formattedDate} at ${formattedTime}`;
      })()}
    </td>
    <td>
      {(() => {
        const dateTime = new Date(data.startDate);
        const formattedDate = dateTime.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const formattedTime = dateTime.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });

        return `${formattedDate} at ${formattedTime}`;
      })()}
    </td>
                        <td>{data.contractType}</td>
                        <td>{data.contractValue}</td>
                        <td>{data.paymentTerms}</td>
                      
                        <td></td>
                  
                      
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
                <div className='popDeleteTitle mt-3' > {t("Delete?")}</div>
                <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal"onClick={handleCancel} >{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deleteRow} >{t("Delete")}</button>
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


