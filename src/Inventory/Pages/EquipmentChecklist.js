import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loader from '../../Component/Loader';
import Select from 'react-select';
import GeitemMaster from "../API/InventoryItemMaster/GetitemMaster";
import GetStatusMaster from "../API/EquipmentChecklist/GetStatusMaster"
import PostEquipmentChecklist from "../API/EquipmentChecklist/PostEquipmentChecklist";
import GetAllEquimentChecklist from "../API/EquipmentChecklist/GetAllEquimentChecklist";
import DeleteEquipmentChecklist from "../API/EquipmentChecklist/DeleteEquipmentChecklist";
import PutEquipmentChecklist from "../API/EquipmentChecklist/PutEquipmentChecklist";
import GetUserAccessedBy from "../API/EquipmentChecklist/GetUserAccessedBy"
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function EquipmentChecklist() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [SelectedStatus, setSelectedStatus] = useState(null);
  const [SerialNumber, setSerialNumber] = useState("")
  const [Remark, setRemark] = useState("")
  let [StatusList, setStatusList] = useState([]);
  const [SelectedFeedbackBy, setSelectedFeedbackBy] = useState(null);
  let [FeedbackByTable, setFeedbackByTable] = useState([]);
  let [ItemNameList, setItemNameList] = useState([]);
  let [DataAllEquipment, setDataAllEquipment] = useState([]);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isSearchable,] = useState(true)
  const [isClearable,] = useState(true)
  const [SelectedItemName, setSelectedItemName] = useState(null)
  let [userID, ] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
 


    //  let clientID = ;
    // let pmID = JSON.parse(window.sessionStorage.getItem("IPDpatientList")).pmId;


  // The Code written is  By S Ayaz


  //Get API for select Equipment Location drop down menu


  useEffect(() => {
    let dropdownmenu = async () => {
      let dataGet = await GetStatusMaster();
      if (dataGet.status === 1) {
      
        setStatusList(dataGet.responseValue.map(Status => ({
          value: Status.id,
          label: Status.remark

        })));
      }
      let NamedataGet = await GeitemMaster();
      if (NamedataGet.status === 1) {
       
        
        setItemNameList(NamedataGet.responseValue.map(Itemname => ({
          value: Itemname.id,
          label: Itemname.itemName,
        })));
      }
      let FeedbackBy = await GetUserAccessedBy()
      if (FeedbackBy.status === 1) {
       
        setFeedbackByTable(FeedbackBy.responseValue.map(responsiblePerson => ({
          value: responsiblePerson.id,
          label: responsiblePerson.name
        })))
      }
    }
    dropdownmenu()
  }, [])




  let AllEquipmentChecklist = async () => {
    let Checklist = await GetAllEquimentChecklist();
    if (Checklist.status === 1) {
    
      setShowLoder(0);
      setDataAllEquipment(Checklist.responseValue);
     
      
    }
  }


  // POST API called for data saving


  const handleOnChange = (e) => {
    setNewlyAddedRowIndex(null);

    document.getElementById("errSerialNumber").style.display = "none";
    document.getElementById('errRemark').style.display = 'none';


    const { name, value } = e.target;

    if (name === 'ddlSerialNumber') {
      setSerialNumber(value)
    }
    else if (name === 'ddlRemark') {
      setRemark(value)
    }
  };


  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };


  const handleOnSave = async () => {

    let ddlSerialNumber = document.getElementById("ddlSerialNumber").value;
   
    if(SelectedItemName === null){
      document.getElementById("errItemName").innerHTML = "Please choose Item Name";
      document.getElementById("errItemName").style.display="block" ;
      return;
    }
    else if (SelectedStatus === null){
      document.getElementById("errStatus").innerHTML = "Please choose Status";
      document.getElementById("errStatus").style.display="block" ;
      return;
    }
    else if (SelectedFeedbackBy === null){
      document.getElementById("errFeedBack").innerHTML = "Please choose Feedback by";
      document.getElementById("errFeedBack").style.display="block" ;
      return;
    }
    else if (ddlSerialNumber === "" || ddlSerialNumber === null || ddlSerialNumber === undefined) {
      document.getElementById("errSerialNumber").innerHTML = "Please Enter Serial Number";
      document.getElementById("errSerialNumber").style.display = "block";
      return;
    }
    else if (ddlSerialNumber < 0) {
      document.getElementById("errSerialNumber").innerHTML = "Serial Number must be not negative";
      document.getElementById("errSerialNumber").style.display = "block";
      return;
    }
    else if (isNaN(ddlSerialNumber)) {
      document.getElementById("errSerialNumber").innerHTML = "Please Enter Valid Serial Number";
      document.getElementById("errSerialNumber").style.display = "block";
      return;
    }

    const obj = {
      statusID: SelectedStatus.value,
      itemID: SelectedItemName.value,
      serialNumber: SerialNumber,
      reamrk: Remark,
      feedbackBy: SelectedFeedbackBy.value,
      userID: userID,
    };

    let data = await PostEquipmentChecklist(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      AllEquipmentChecklist()
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

    document.getElementById("errSerialNumber").style.display = "none";
    document.getElementById('errRemark').style.display = 'none';
    document.getElementById("errItemName").style.display="none" ;
    document.getElementById("errStatus").style.display="none"
    document.getElementById("errFeedBack").style.display="none" ;

    
    setRemark("")
    setSerialNumber("")
    setSelectedItemName(null)
    setSelectedStatus(null)
    setSelectedFeedbackBy(null)
  };


  const edit = (Checklist, index) => {
    document.getElementById("errSerialNumber").style.display = "none";
    document.getElementById('errRemark').style.display = 'none';
    document.getElementById("errItemName").style.display="none" ;
    document.getElementById("errStatus").style.display="none"
    document.getElementById("errFeedBack").style.display="none" ;


    setRowID(Checklist.id)
    setIsUpdateBtnShow(true);
    setRemark(Checklist.reamrk)
    setSerialNumber(Checklist.serialNumber)
    setSelectedItemName({
      value: Checklist.itemID,
      label: Checklist.itemName
    })
    setSelectedStatus({
      value: Checklist.statusID,
      label: Checklist.statusID
    });
    setSelectedFeedbackBy({
      value: Checklist.feedbackBy,
      label: Checklist.feedbackByName


    })
    setNewlyAddedRowIndex(index)

  }

  const handleUpdate = async () => {

    document.getElementById("errSerialNumber").style.display = "none";
    document.getElementById('errRemark').style.display = 'none';

    let ddlSerialNumber = document.getElementById("ddlSerialNumber").value;
    




    if(SelectedItemName === null){
      document.getElementById("errItemName").innerHTML = "Please choose Item Name";
      document.getElementById("errItemName").style.display="block" ;
    }
    else if (SelectedStatus === null){
      document.getElementById("errStatus").innerHTML = "Please choose Status";
      document.getElementById("errStatus").style.display="block" ;
    }
    else if (SelectedFeedbackBy === null){
      document.getElementById("errFeedBack").innerHTML = "Please choose Feedback by";
      document.getElementById("errFeedBack").style.display="block" ;
    }
    else if (ddlSerialNumber === "" || ddlSerialNumber === null || ddlSerialNumber === undefined) {
      document.getElementById("errSerialNumber").innerHTML = "Please Enter Serial Number";
      document.getElementById("errSerialNumber").style.display = "block";
      return;
    }
    else if (ddlSerialNumber < 0) {
      document.getElementById("errSerialNumber").innerHTML = "Serial Number must be not negative";
      document.getElementById("errSerialNumber").style.display = "block";
      return;
    }
    else if (isNaN(ddlSerialNumber)) {
      document.getElementById("errSerialNumber").innerHTML = "Please Enter Valid Serial Number";
      document.getElementById("errSerialNumber").style.display = "block";
      return;
    }



    const obj = {
      id: rowID,
      statusID: SelectedStatus.value,
      itemID: SelectedItemName.value,
      serialNumber: SerialNumber,
      reamrk: Remark,
      feedbackBy: SelectedFeedbackBy.value,
      userID: userID,
    };

    const data = await PutEquipmentChecklist(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      AllEquipmentChecklist()
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
        handleClear();


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

    let data = await DeleteEquipmentChecklist(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setIsUpdateBtnShow(false)
      setNewlyAddedRowIndex(false);
      AllEquipmentChecklist();
      handleClear();

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
    AllEquipmentChecklist();
  }, []);




  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Equipment_Checklist")}</div>
                <div className="inner-content">
                  <div className='row'>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("ItemName")}<span className="starMandatory">*</span></label>
                      <Select value={SelectedItemName} placeholder="Select item name" options={ItemNameList} className="create-select" id="ItemName" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errItemName", setSelectedItemName)} />
                      <small id="errItemName" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("Status")}<span className="starMandatory">*</span></label>
                      <Select value={SelectedStatus} options={StatusList} placeholder={t("Select_Status")} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errStatus", setSelectedStatus)} />
                      <small id="errStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Feedback_By")}<span className="starMandatory">*</span></label>
                      <Select value={SelectedFeedbackBy} placeholder={t("Select_feedback_by")} options={FeedbackByTable} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errFeedBack", setSelectedFeedbackBy)} />
                      <small id="errFeedBack" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("SerialNumber")}<span className="starMandatory">*</span></label>
                      <input value={SerialNumber} id="ddlSerialNumber" type="number" className="form-control form-control-sm" name="ddlSerialNumber" placeholder={t("Enter_Serial_Number")} onChange={handleOnChange} />
                      <small id="errSerialNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Remark")}<span className="starMandatory"></span></label>
                      <input value={Remark} id="ddlRemark" type="text" className="form-control form-control-sm" name="ddlRemark" placeholder={t("Remarks")} onChange={handleOnChange} />
                      <small id="errRemark" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 mb-2 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                            {isUpdateBtnShow !== true ? <>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                            </> :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1 " onClick={handleUpdate} >{t("Update")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleCancel} >{t("Cancel")}</button>
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
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("ItemName")}</th>
                      <th>{t("Status")}</th>
                      <th>{t("Feedback_By")}</th>
                      <th>{t("SerialNumber")}</th>
                      <th>{t("Remark")}</th>
                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DataAllEquipment && DataAllEquipment.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.itemName}</td>
                          <td>{data.statusID}</td>
                          <td>{data.feedbackByName}</td>
                          <td>{data.serialNumber}</td>
                          <td>{data.reamrk}</td>


                          <td></td>

                          <td>
                            <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data, index) }} />
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id); }} />
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

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCancel}>{t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={deleteRow}>{t("Delete")}</button>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loader val={showLoder} /> : ""
        }
      </section>

    </>

  )
}


