import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import PostVendorMaster from '../API/VendorMaster/PostVendorMaster';
import GetVendorMaster from '../API/VendorMaster/GetVendorMaster';
import PutVendorMaster from '../API/VendorMaster/PutVendorMaster';
import DeleteVendorMaster from '../API/VendorMaster/DeleteVendorMaster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export const VendorMaster = () => {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [showLoder, setShowLoder] = useState(1);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [officeContactNo, setOfficeContactNo] = useState('');
  const [officeAddress, setOfficeAddress] = useState('');
  const [vendorMasterList, setVendorMasterList] = useState([]);
  const [GSTno, setGSTno] = useState('')
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  

  const handleChange = async (e) => {
    document.getElementById('errVendorName').style.display = 'none';
    document.getElementById('errContactPerson').style.display = 'none';
    document.getElementById('errContactNo').style.display = 'none';
    document.getElementById('errOfficeContactNo').style.display = 'none';
    document.getElementById('errOfficeAddress').style.display = 'none';
    document.getElementById('errGStno').style.display = 'none';
    if (e.target.name === 'VendorName') {
      setVendorName(e.target.value);
    }

    if (e.target.name === 'ContactPerson') {
      setContactPerson(e.target.value);
    }

    if (e.target.name === 'ContactNo') {
      setContactNo(e.target.value);
    }

    if (e.target.name === 'OfficeContactNo') {
      setOfficeContactNo(e.target.value);
    }
    if (e.target.name === 'GstNo') {
      setGSTno(e.target.value);
    }

    if (e.target.name === 'OfficeAddress') {
      setOfficeAddress(e.target.value);
    }
  };

  const handleSave = async () => {
    // const isNumValidate = /^\d{10}$/;

    if (vendorName.trim() === '' || vendorName === null || vendorName === undefined) {
      document.getElementById('errVendorName').innerHTML = 'Please Enter Vendor Name';
      document.getElementById('errVendorName').style.display = 'block';
      return;
    }
    else if (contactPerson.trim() === '' || contactPerson === null || contactPerson === undefined) {
      document.getElementById('errContactPerson').innerHTML = 'Please Enter Contact Person Name';
      document.getElementById('errContactPerson').style.display = 'block';
      return;
    }
    else if (contactNo.trim() === '' || contactNo === null || contactNo === undefined) {
      document.getElementById('errContactNo').innerHTML = 'Please Enter Contact No.';
      document.getElementById('errContactNo').style.display = 'block';
      return;
    }
    else if (contactNo < 0) {
      document.getElementById('errContactNo').innerHTML = 'Contact No.must not be negative';
      document.getElementById('errContactNo').style.display = 'block';
      return;
    }
    else if (contactNo.length !== 10 || isNaN(contactNo)) {
      document.getElementById('errContactNo').innerHTML = 'Please Enter Valid Contact No.';
      document.getElementById('errContactNo').style.display = 'block';
      return;
    }

    // else if(!contactNo.match(isNumValidate)){
    //     document.getElementById('errContactNo').innerHTML = 'Please Enter valid Contact No.';
    //     document.getElementById('errContactNo').style.display = 'block';
    // }

    else if (officeContactNo.trim() === '' || officeContactNo === null || officeContactNo === undefined) {
      document.getElementById('errOfficeContactNo').innerHTML = 'Please Enter Office Contact No.';
      document.getElementById('errOfficeContactNo').style.display = 'block';
      return;
    }
    else if (officeContactNo < 0) {
      document.getElementById('errOfficeContactNo').innerHTML = 'Office Contact No. must not be negative';
      document.getElementById('errOfficeContactNo').style.display = 'block';
      return;
    }

    else if (officeContactNo.length !== 10 || isNaN(officeContactNo)) {
      document.getElementById('errOfficeContactNo').innerHTML = 'Please Enter valid Office Contact No.';
      document.getElementById('errOfficeContactNo').style.display = 'block';
      return;
    }

    else if (GSTno.length !== 15) {
      document.getElementById('errGStno').innerHTML = 'Please Enter Valid Gst No.';
      document.getElementById('errGStno').style.display = 'block';
      return;
    }

    else if (officeAddress.trim() === '' || officeAddress === null || officeAddress === undefined) {
      document.getElementById('errOfficeAddress').innerHTML = 'Please Enter Office Address';
      document.getElementById('errOfficeAddress').style.display = 'block';
      return;
    }
    else {
      const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
      const obj = {
        vendorName: vendorName,
        contactPerson: contactPerson,
        contactNo: contactNo,
        officeContactNo: officeContactNo,
        gstIn: GSTno.toLocaleUpperCase(),
        officeAddress: officeAddress,
        userID: userID
      }

      const data = await PostVendorMaster(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        getVendorMaster();
        setNewlyAddedRowIndex(0);
         handleClear();
        setTimeout(() => {
          setShowToster(0);
          setNewlyAddedRowIndex(null);
         
        }, 2000);
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(data.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
  };

  const getVendorMaster = async () => {
    setShowLoder(1);
    let data = await GetVendorMaster();
    if (data.status === 1) {
      setShowLoder(0);
      setVendorMasterList(data.responseValue);
    }
    else {
      setShowLoder(0);
    }
  };
  const edit = async (list,index) => {
    document.getElementById('errVendorName').style.display = 'none';
    document.getElementById('errContactPerson').style.display = 'none';
    document.getElementById('errContactNo').style.display = 'none';
    document.getElementById('errOfficeContactNo').style.display = 'none';
    document.getElementById('errOfficeAddress').style.display = 'none';
    document.getElementById('errGStno').style.display = 'none';
    setIsUpdateBtnShow(true);
    setRowID(list.id);
    setOfficeContactNo(list.officeContactNo);
    setGSTno(list.gstIn)
    setContactNo(list.contactNo);
    setContactPerson(list.contactPerson);
    setVendorName(list.vendorName);
    setOfficeAddress(list.officeAddress);
    setNewlyAddedRowIndex(index)
  };

  const handleUpdate = async () => {
    // const isNumValidate = /^\d{10}$/;
    if (vendorName.trim() === '' || vendorName === null || vendorName === undefined) {
      document.getElementById('errVendorName').innerHTML = 'Please Enter Vendor Name';
      document.getElementById('errVendorName').style.display = 'block';
      return;
    }
    else if (contactPerson.trim() === '' || contactPerson === null || contactPerson === undefined) {
      document.getElementById('errContactPerson').innerHTML = 'Please Enter Contact Person Name';
      document.getElementById('errContactPerson').style.display = 'block';
      return;
    }
    else if (contactNo.trim() === '' || contactNo === null || contactNo === undefined) {
      document.getElementById('errContactNo').innerHTML = 'Please Enter Contact No.';
      document.getElementById('errContactNo').style.display = 'block';
      return;
    }
    else if (contactNo < 0) {
      document.getElementById('errContactNo').innerHTML = 'Contact No.must not be negative';
      document.getElementById('errContactNo').style.display = 'block';
      return;
    }
    else if (contactNo.length !== 10 || isNaN(contactNo)) {
      document.getElementById('errContactNo').innerHTML = 'Please Enter Valid Contact No.';
      document.getElementById('errContactNo').style.display = 'block';
      return;
    }

    // else if(!contactNo.match(isNumValidate)){
    //     document.getElementById('errContactNo').innerHTML = 'Please Enter valid Contact No.';
    //     document.getElementById('errContactNo').style.display = 'block';
    // }

    else if (officeContactNo.trim() === '' || officeContactNo === null || officeContactNo === undefined) {
      document.getElementById('errOfficeContactNo').innerHTML = 'Please Enter Office Contact No.';
      document.getElementById('errOfficeContactNo').style.display = 'block';
      return;
    }
    else if (officeContactNo < 0) {
      document.getElementById('errOfficeContactNo').innerHTML = 'Office Contact No. must not be negative';
      document.getElementById('errOfficeContactNo').style.display = 'block';
      return;
    }

    else if (officeContactNo.length !== 10 || isNaN(officeContactNo)) {
      document.getElementById('errOfficeContactNo').innerHTML = 'Please Enter valid Office Contact No.';
      document.getElementById('errOfficeContactNo').style.display = 'block';
      return;
    }

    else if (GSTno.length !== 15) {
      document.getElementById('errGStno').innerHTML = 'Please Enter Valid Gst No.';
      document.getElementById('errGStno').style.display = 'block';
      return;
    }

    else if (officeAddress.trim() === '' || officeAddress === null || officeAddress === undefined) {
      document.getElementById('errOfficeAddress').innerHTML = 'Please Enter Office Address';
      document.getElementById('errOfficeAddress').style.display = 'block';
      return;
    }
    else {
      const userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
      const obj = {
        id: rowID,
        vendorName: vendorName,
        contactPerson: contactPerson,
        contactNo: contactNo,
        officeContactNo: officeContactNo,
        gstIn: GSTno.toLocaleUpperCase(),
        officeAddress: officeAddress,
        userID: userID
      }

      const data = await PutVendorMaster(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Updated Successfully!");
        getVendorMaster()
        setTimeout(() => {
          setShowToster(0);
          setNewlyAddedRowIndex(null);
          handleClear();
        }, 2000);
        setIsUpdateBtnShow(false);
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(data.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
  };

  const deleteRow = async () => {
    setShowUnderProcess(1);
    let userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;

    const obj = {
      id: rowID,
      userId: userID
    };
    let data = await DeleteVendorMaster(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setIsUpdateBtnShow(false)
      setNewlyAddedRowIndex(false)
      getVendorMaster();
      setTimeout(() => {
        setShowToster(0);
        handleClear();
        
      }, 1000)
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage(data.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0);
      }, 2000)
    }
  };

  const handleCancel = async () => {
    handleClear();
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
  };

  const handleClear = async () => {
    document.getElementById('errVendorName').style.display = 'none';
    document.getElementById('errContactPerson').style.display = 'none';
    document.getElementById('errContactNo').style.display = 'none';
    document.getElementById('errOfficeContactNo').style.display = 'none';
    document.getElementById('errOfficeAddress').style.display = 'none';
    document.getElementById('errGStno').style.display = 'none';
    setOfficeAddress('');
    setOfficeContactNo('');
    setContactNo('');
    setContactPerson('');
    setVendorName('');
    setGSTno('');
  };

  useEffect(() => {
    getVendorMaster();
  }, [])


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Vendor_Master")}</div>
                <div className="inner-content">

                  <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                      <div className="d-flex flex-wrap align-content-end">

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("VendorName")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="VendorName" value={vendorName} placeholder={t("Enter_Vendor_Name")} onChange={handleChange} />
                          <small id="errVendorName" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("Contact_Person")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="ContactPerson" value={contactPerson} placeholder={t("Enter_Contact_Person")} onChange={handleChange} />
                          <small id="errContactPerson" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("Contact_No")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="ContactNo" value={contactNo} placeholder={t("Enter_Contact_No")} onChange={handleChange} />
                          <small id="errContactNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("Office_Contact_No")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="OfficeContactNo" value={officeContactNo} placeholder={t("enter_office_contact_number")} onChange={handleChange} />
                          <small id="errOfficeContactNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("GST_No")}<span className="starMandatory">*</span></label>
                          <input id='ddlGstno' type="text" className="form-control form-control-sm" name="GstNo" value={GSTno} placeholder={t("Enter_GST_No")} onChange={handleChange} />
                          <small id="errGStno" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("OfficeAddress")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="OfficeAddress" value={officeAddress} placeholder={t("Office_Address")} onChange={handleChange} />
                          <small id="errOfficeAddress" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>



                        <div className="mb-2 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleUpdate}>{t("Update")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleCancel}>{t("Cancel")}</button>
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
            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("VendorName")}</th>
                      <th>{t("Contact_Person")}</th>
                      <th>{t("Contact_No")}</th>
                      <th>{t("Office_Contact_No")}.</th>
                      <th>{t("GST_No")}.</th>
                      <th>{t("OfficeAddress")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {vendorMasterList && vendorMasterList.map((list, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={isNewRow ? 'new-row' : '' } key={index} >
                          <td className="text-center">{index + 1}</td>
                          <td>{list.vendorName}</td>
                          <td>{list.contactPerson}</td>
                          <td>{list.contactNo}</td>
                          <td>{list.officeContactNo}</td>
                          <td>{list.gstIn}</td>
                          <td>{list.officeAddress}</td>
                          <td>
                            <div className="action-button">
                             <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon}  className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(list,index) }}/></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id,index) }}/>
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
                <button type="button" className="btn-delete popBtnDelete" onClick={deleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
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
