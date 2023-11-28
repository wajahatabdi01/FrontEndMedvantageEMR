import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import GetTenantMaster from "../API/TenantMaster/GetTenantMaster";
import PostTenantMaster from "../API/TenantMaster/PostTenantMaster";
import DeleteTenantMaster from "../API/TenantMaster/DeleteTenantMaster";
import PutTenantMaster from "../API/TenantMaster/PutTenantMaster";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function TenantMaster() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  let [Name, setName] = useState('');
  const [ContactDetails, setContactDetails] = useState("")
  const [Address, setAddress] = useState("")
  const [EnergyTypeTable, setEnergyTypeTable] = useState([])
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
const [isNewRowAdded, setisNewRowAdded] = useState(false)
let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


  // The Code is  written By S Ayaz


  let GetTenantmaster = async () => {
    let tenantmaster = await GetTenantMaster();
    if (tenantmaster.status === 1) {
      // console.log("tenantMaster", tenantmaster.responseValue)
      setShowLoder(0);
      setEnergyTypeTable(tenantmaster.responseValue);
    }
  }


  // POST API called for data saving


  const handleOnChange = (e) => {
    setNewlyAddedRowIndex(null);
    setisNewRowAdded(false)
    document.getElementById('errcontactdetails').style.display = 'none';
    document.getElementById('erraddress').style.display = 'none';
    document.getElementById('errName').style.display = 'none';


    const { name, value } = e.target;
    if (name === 'NAME') {
      setName(value);
    }
    if (name === 'contactdetails') {
      setContactDetails(value);
    }
    if (name === 'ADDRESS') {
      setAddress(value);
    }

  };

  const handleOnSave = async () => {
    

     if (Name.trim() === '' || Name === undefined) {
      document.getElementById('errName').innerHTML = 'Please Enter Name';
      document.getElementById('errName').style.display = 'block';
      return;
    }
     else if (ContactDetails.toString().trim() === '' || ContactDetails === undefined) {
      document.getElementById('errcontactdetails').innerHTML = 'Please Enter Contact Details';
      document.getElementById('errcontactdetails').style.display = 'block';
      return;
    }
     else if (Address.trim() === '' || Address === undefined) {
      document.getElementById('erraddress').innerHTML = 'Please Enter Address';
      document.getElementById('erraddress').style.display = 'block';
      return;
    }
  
    const obj = {
        name: Name,
        contactDetails: ContactDetails,
        address: Address,
        userID: userID,
    };

    let data = await PostTenantMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      GetTenantmaster()
      setisNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
      
    
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
  //  console.log('clear')
   document.getElementById('errcontactdetails').style.display = 'none';
   document.getElementById('erraddress').style.display = 'none';
   document.getElementById('errName').style.display = 'none';
  setName("")
  setAddress("")
  setContactDetails("")
  };


  const edit = (tenantmaster,index) => {
    document.getElementById('errcontactdetails').style.display = 'none';
    document.getElementById('erraddress').style.display = 'none';
    document.getElementById('errName').style.display = 'none';
    setRowID(tenantmaster.id)
    setIsUpdateBtnShow(true);
    setName(tenantmaster.name)
    setContactDetails(tenantmaster.contactDetails)
    setAddress(tenantmaster.address)
    setNewlyAddedRowIndex(index)
  

  }

  const handleUpdate = async () => {

   

    if (Name.trim() === '' || Name === undefined) {
        document.getElementById('errName').innerHTML = 'Please Enter Name';
        document.getElementById('errName').style.display = 'block';
        return;
      }
       else if (ContactDetails.toString().trim() === '' || ContactDetails === undefined) {
        document.getElementById('errcontactdetails').innerHTML = 'Please Enter Contact Details';
        document.getElementById('errcontactdetails').style.display = 'block';
        return;
      }
       else if (Address.trim() === '' || Address === undefined) {
        document.getElementById('erraddress').innerHTML = 'Please Enter Address';
        document.getElementById('erraddress').style.display = 'block';
        return;
      }
    const obj = {
      id: rowID,
      name: Name,
    contactDetails: ContactDetails,
    address: Address,
    userID: userID,
    };

    const data = await PutTenantMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      GetTenantmaster()
      handleClear()
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
      }, 2000);
      setIsUpdateBtnShow(false);
    } else {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterMessage(data.responseValue);
      setTosterValue(1);
      setTimeout(() => {
        setShowToster(0);
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

    let data = await DeleteTenantMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      setisNewRowAdded(false)
      GetTenantmaster()
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
    GetTenantmaster()
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title"> {t("Tenant_Master")} 
                </div>
                <div className="inner-content">
                  <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                      <div className="d-flex flex-wrap align-content-end">

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2 mx-2">
                          <label htmlFor="Code" className="form-label">{t("NAME")}<span className="starMandatory">*</span></label>
                          <input value={Name} id="ddName" type="text" className="form-control form-control-sm" name="NAME" placeholder={t("Name")} onChange={handleOnChange} />
                          <small id="errName" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2 mx-2">
                          <label htmlFor="Code" className="form-label">{t("Contact_Details")} <span className="starMandatory">*</span></label>
                          <input value={ContactDetails} id="ddcontactdetails TypeMaster" type="text" className="form-control form-control-sm" name="contactdetails" placeholder={t("Enter_Contact_Details_(eg: 1234567890)")} onChange={handleOnChange} />
                          <small id="errcontactdetails" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2 mx-2">
                          <label htmlFor="Code" className="form-label">{t("Address")}<span className="starMandatory">*</span></label>
                          <input value={Address} id="ddaddress" type="text" className="form-control form-control-sm" name="ADDRESS" placeholder={t("Enter_Address_(eg;Lucknow)")} onChange={handleOnChange} />
                          <small id="erraddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                    
                     
                        <div className="mb-2 relative">
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

              </div>
            </div>


            {/* table is made using getAllItemMaster API and mapped the data   */}


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Name")}</th>
                      <th>{t("Contact_Details")}</th>
                      <th>{t("Address")}</th>
                      <th></th>
                    
                       <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {EnergyTypeTable && EnergyTypeTable.map((data, index) => {
                       const isNewRow = newlyAddedRowIndex === index;
                       const isEditing = index === editRowIndex;
                      return(
                      <tr className={index === EnergyTypeTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row': ''}  key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.contactDetails}</td>
                        <td>{data.address}</td>
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


