import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GetItemMaintenanceContract from "../API/MaintenanceContract/GetItemMaintenanceContract";
import GetMaintenanceVisit from "../API/MaintenanceVisit/GetMaintenanceVisit";
import PostMaintenanceVisit from "../API/MaintenanceVisit/PostMaintenanceVisit";
import PutMaintenanceVisit from "../API/MaintenanceVisit/PutMaintenanceVisit";
import DeleteMaintenanceVisit from "../API/MaintenanceVisit/DeleteMaintenanceVisit";
import GetStatusMaster from "../API/MaintenanceVisit/GetStatusMaster"
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


export default function MaintenanceVisit() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [Equipment, setEquipment] = useState(null);
  let [selectedMaintenanceStatus, setSelectedMaintenanceStatus] = useState(null)
  const [VisitedWith, setVisitedWith] = useState("")
  const [EquipmentDropdown, setEquipmentDropdown] = useState([])
  let [MaintenanceStatusDropdown, setMaintenanceStatusDropdown] = useState([])
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [MaintenanceVisitTable, setMaintenanceVisitTable] = useState([])
  const [TechnicianName, setTechnicianName] = useState('')
  const [VisitDateTime, setVisitDateTime] = useState('')
  const [TechnicianMobile, setTechnicianMobile] = useState('')
  const [WorkDescription, setWorkDescription] = useState('')
  const [IdentifiedIssues, setIdentifiedIssues] = useState('')
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);




  // The Code is  written By S Ayaz


  let Dropdowns = async () => {
    let ItemMaster = await GetItemMaintenanceContract();
    if (ItemMaster.status === 1) {
      console.log("ItemMaster", ItemMaster.responseValue)
      setShowLoder(0);
      setEquipmentDropdown(ItemMaster.responseValue.map(Items => ({
        value: Items.id,
        label: Items.itemName,
      })));
    }
    let Maintenancestatus = await GetStatusMaster()
    if (Maintenancestatus.status === 1) {
      console.log("Maintenancestatus", Maintenancestatus.responseValue)

      setMaintenanceStatusDropdown(Maintenancestatus.responseValue.map(Status => ({
        value: Status.id,
        label: Status.status

      })))
    }



  }

  let AllMaintenanceVisit = async () => {
    let MaintenanceVisit = await GetMaintenanceVisit()
    if (MaintenanceVisit.status === 1) {
      console.log("MaintenanceVisit", MaintenanceVisit.responseValue)
      setMaintenanceVisitTable(MaintenanceVisit.responseValue)
    
      
    }
  }



  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };


  // POST API called for data saving


  const handleOnChange = (e) => {
    // document.getElementById('errcomplaintCategory').style.display = 'none';
    // document.getElementById('errRespondendPerson').style.display = 'none';
    // document.getElementById('errRespondentDepartment').style.display = 'none';

    document.getElementById('errEquipment').style.display = 'none';
    document.getElementById('errTechnicianMobile').style.display = 'none';
    document.getElementById('errVisitDateTime').style.display = 'none';
    document.getElementById('errVisitedWith').style.display = 'none';
    document.getElementById('errIdentifiedIssues').style.display = 'none';
    document.getElementById('errTechnicianName').style.display = 'none';
    document.getElementById('errWorkDescription').style.display = 'none';




    const { name, value } = e.target;
    if (name === 'Equipment') {
      setEquipment(value);
    }

    else if (name === 'TechnicianName') {
      setTechnicianName(value);
    }
    else if (name === 'VisitDateTime') {
      setVisitDateTime(value);
    }
    else if (name === 'TechnicianMobile') {
      setTechnicianMobile(value);
    }
    else if (name === 'VisitedWith') {
      setVisitedWith(value);
    }
    else if (name === 'WorkDescription') {
      setWorkDescription(value);
    }
    else if (name === 'IdentifiedIssues') {
      setIdentifiedIssues(value);
    }


  };

  const handleOnSave = async () => {


    if (Equipment === null) {
      document.getElementById('errEquipment').innerHTML = 'Please Select Item Name';
      document.getElementById('errEquipment').style.display = 'block';
      return;
    }

    else if (TechnicianName.trim() === '' || TechnicianName === undefined) {
      document.getElementById('errTechnicianName').innerHTML = 'Please Enter Technician Name';
      document.getElementById('errTechnicianName').style.display = 'block';
      return;
    }
    else if (TechnicianMobile.trim() === '' || TechnicianMobile === undefined) {
      document.getElementById('errTechnicianMobile').innerHTML = 'Please Enter Technician Mobile Number';
      document.getElementById('errTechnicianMobile').style.display = 'block';
      return;
    }

    else if (isNaN(TechnicianMobile)) {
      document.getElementById('errTechnicianMobile').innerHTML = 'Please Enter Valid Technician Mobile Number';
      document.getElementById('errTechnicianMobile').style.display = 'block';
      return;
    }
    else if (TechnicianMobile.length !== 10) {
      document.getElementById('errTechnicianMobile').innerHTML = 'Please Enter Valid Technician Mobile Number';
      document.getElementById('errTechnicianMobile').style.display = 'block';
      return;
    }
    else if (VisitDateTime.trim() === '' || VisitDateTime === undefined) {
      document.getElementById('errVisitDateTime').innerHTML = 'Please Choose Visit Date Time';
      document.getElementById('errVisitDateTime').style.display = 'block';
      return;
    }
    // else if (VisitedWith.trim() === '' || VisitedWith === undefined) {
    //   document.getElementById('errVisitedWith').innerHTML = 'Please Enter Visited With';
    //   document.getElementById('errVisitedWith').style.display = 'block';
    //   return;
    // }

    else if (WorkDescription.trim() === '' || WorkDescription === undefined) {
      document.getElementById('errWorkDescription').innerHTML = 'Please Enter Work Description';
      document.getElementById('errWorkDescription').style.display = 'block';
      return;
    }

    else if (IdentifiedIssues.trim() === '' || IdentifiedIssues === undefined) {
      document.getElementById('errIdentifiedIssues').innerHTML = 'Please Enter Identified Issues';
      document.getElementById('errIdentifiedIssues').style.display = 'block';
      return;
    }
    // else if (MaintenanceStatus === null) {
    //   document.getElementById('errMaintenanceStatus').innerHTML = 'Please ';
    //   document.getElementById('errMaintenanceStatus').style.display = 'block';
    //   return;
    // }


    const obj = {

      itemID: Equipment.value,
      identifiedIssues: IdentifiedIssues,
      
      technicianName: TechnicianName,
      visitDateTime: VisitDateTime,
      visitedWith: VisitedWith,
      workDescription: WorkDescription,
      technicianMobile: TechnicianMobile,
      userID: userID,
    };

    let data = await PostMaintenanceVisit(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      AllMaintenanceVisit()
      setNewlyAddedRowIndex(0)
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null)

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
    document.getElementById('errTechnicianMobile').style.display = 'none';
    document.getElementById('errVisitDateTime').style.display = 'none';
    document.getElementById('errVisitedWith').style.display = 'none';
    document.getElementById('errIdentifiedIssues').style.display = 'none';
    document.getElementById('errTechnicianName').style.display = 'none';
    document.getElementById('errWorkDescription').style.display = 'none';



    setEquipment(null)
    
    setTechnicianName('')
    setVisitDateTime('')
    setTechnicianMobile('')
    setIdentifiedIssues('')
    setVisitedWith('')
    setWorkDescription('')

  };


  const edit = (MaintenanceVisit, index) => {
    setNewlyAddedRowIndex(index)
    setRowID(MaintenanceVisit.id)
    setIsUpdateBtnShow(true);
    setEquipment({
      value: MaintenanceVisit.itemID,
      label: MaintenanceVisit.itemName
    })
    setSelectedMaintenanceStatus({
      value: MaintenanceVisit.maintenanceStatusID,
      label: MaintenanceVisit.maintenanceStatusID

    })
    setTechnicianName(MaintenanceVisit.technicianName)
    setVisitDateTime(MaintenanceVisit.visitDateTime)
    setTechnicianMobile(MaintenanceVisit.technicianMobile)
    setIdentifiedIssues(MaintenanceVisit.identifiedIssues)
    setVisitedWith(MaintenanceVisit.visitedWith)
    setWorkDescription(MaintenanceVisit.workDescription)



  }

  const handleUpdate = async () => {




    if (Equipment === "Select Equipment") {
      document.getElementById('errEquipment').innerHTML = 'Please Select Item Name';
      document.getElementById('errEquipment').style.display = 'block';
      return;
    }
    //  else if (MaintenanceStatus.trim() === '' || MaintenanceStatus === undefined) {
    //   document.getElementById('errMaintenanceStatus').innerHTML = 'Please ';
    //   document.getElementById('errMaintenanceStatus').style.display = 'block';
    //   return;
    // }
    else if (TechnicianName.trim() === '' || TechnicianName === undefined) {
      document.getElementById('errTechnicianName').innerHTML = 'Please Enter Technician Name';
      document.getElementById('errTechnicianName').style.display = 'block';
      return;
    }
    else if (TechnicianMobile.trim() === '' || TechnicianMobile === undefined) {
      document.getElementById('errTechnicianMobile').innerHTML = 'Please Enter Technician Mobile Number';
      document.getElementById('errTechnicianMobile').style.display = 'block';
      return;
    }

    else if (isNaN(TechnicianMobile)) {
      document.getElementById('errTechnicianMobile').innerHTML = 'Please Enter Valid Technician Mobile Number';
      document.getElementById('errTechnicianMobile').style.display = 'block';
      return;
    }
    else if (TechnicianMobile.length !== 10) {
      document.getElementById('errTechnicianMobile').innerHTML = 'Please Enter Valid Technician Mobile Number';
      document.getElementById('errTechnicianMobile').style.display = 'block';
      return;
    }
    else if (VisitDateTime.trim() === '' || VisitDateTime === undefined) {
      document.getElementById('errVisitDateTime').innerHTML = 'Please Choose Visit Date Time';
      document.getElementById('errVisitDateTime').style.display = 'block';
      return;
    }
    // else if (VisitedWith.trim() === '' || VisitedWith === undefined) {
    //   document.getElementById('errVisitedWith').innerHTML = 'Please Enter Visited With';
    //   document.getElementById('errVisitedWith').style.display = 'block';
    //   return;
    // }

    else if (WorkDescription.trim() === '' || WorkDescription === undefined) {
      document.getElementById('errWorkDescription').innerHTML = 'Please Enter Work Description';
      document.getElementById('errWorkDescription').style.display = 'block';
      return;
    }

    else if (IdentifiedIssues.trim() === '' || IdentifiedIssues === undefined) {
      document.getElementById('errIdentifiedIssues').innerHTML = 'Please Enter Identified Issues';
      document.getElementById('errIdentifiedIssues').style.display = 'block';
      return;
    }



    const obj = {
      id: rowID,
      itemID: Equipment.value,
      identifiedIssues: IdentifiedIssues,

      technicianName: TechnicianName,
      visitDateTime: VisitDateTime,
      visitedWith: VisitedWith,
      workDescription: WorkDescription,
      technicianMobile: TechnicianMobile,
      userID: userID,
    };

    const data = await PutMaintenanceVisit(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      AllMaintenanceVisit()
      setNewlyAddedRowIndex(0);
      setTimeout(() => {
        setShowToster(0);
        handleClear()
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
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async () => {
    setShowUnderProcess(1);
    let userID = window.userID
    const obj = {
      id: rowID,
      userId: userID
    }

    let data = await DeleteMaintenanceVisit(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      AllMaintenanceVisit()
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
    AllMaintenanceVisit()
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Maintenance_Visit")}
                </div>
                <div className="inner-content">
                  <div className='row'>




                    {/* <div className="col-md-12 col-sm-12 col-xs-12 mb-3 mx-1" style={{ width: '200px' }}>
                          <label htmlFor="ddEnvironmentParameter" className="form-label">Item Name <span className="starMandatory">*</span></label>
                          <select value={Equipment} name="Equipment" className="form-select form-select-sm" id='complaintcategory' aria-label=".form-select-sm example" onChange={handleOnChange}>
                            <option>Select Item Name</option>
                              {EquipmentDropdown && EquipmentDropdown.map((val,index)=>{
                                return(
                                    <option key={index} value={val.id}>{val.itemName}</option>
                                )
                              })}
                          </select>
                          <small id="errEquipment" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div> */}

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("ItemName")}<span className="starMandatory">*</span></label>
                      <Select value={Equipment} placeholder={t("Select_Item_Name")} options={EquipmentDropdown} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errEquipment", setEquipment)} />
                      <small id="errEquipment" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>





                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("TechnicianName")}<span className="starMandatory">*</span></label>
                      <input value={TechnicianName} id="TechnicianName" type="text" className="form-control form-control-sm" name="TechnicianName" placeholder={t("Technician_Name")} onChange={handleOnChange} />
                      <small id="errTechnicianName" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("TechnicianMobile")}<span className="starMandatory">*</span></label>
                      <input value={TechnicianMobile} id="VisitDateTime" type="text" className="form-control form-control-sm" name="TechnicianMobile" placeholder={t("Technician_Mobile")} onChange={handleOnChange} />
                      <small id="errTechnicianMobile" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Visit_Date_Time")}<span className="starMandatory">*</span></label>
                      <input value={VisitDateTime} id="VisitDateTime" type="datetime-local" className="form-control form-control-sm" name="VisitDateTime" onChange={handleOnChange} />
                      <small id="errVisitDateTime" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 ">
                      <label htmlFor="Code" className="form-label">{t("Visited_With")}<span className="starMandatory"></span></label>
                      <input value={VisitedWith} id="VisitedWith" type="text" className="form-control form-control-sm" name="VisitedWith" placeholder={t("Enter_Visited_With")} onChange={handleOnChange} />
                      <small id="errVisitedWith" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("WorkDescription")}<span className="starMandatory">*</span></label>
                      <input value={WorkDescription} id="WorkDescription" type="text" className="form-control form-control-sm" name="WorkDescription" placeholder={t("Work_Description")} onChange={handleOnChange} />
                      <small id="errWorkDescription" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("IdentifiedIssues")}<span className="starMandatory">*</span></label>
                      <input value={IdentifiedIssues} id="IdentifiedIssues" type="text" className="form-control form-control-sm" name="IdentifiedIssues" placeholder={t("Identified_Issues")} onChange={handleOnChange} />
                      <small id="errIdentifiedIssues" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>



                    {/* <div className="col-md-12 col-sm-12 col-xs-12 mb-3 me-3" style={{ width: '200px' }}>
                          <label htmlFor="ddEnvironmentParameter" className="form-label">Maintenance Status<span className="starMandatory">*</span></label>
                          <select value={MaintenanceStatus} name="MaintenanceStatus" className="form-select form-select-sm" id='MaintenanceStatus' aria-label=".form-select-sm example" onChange={handleOnChange}>
                            <option>Select Maintenance Status</option>
                              {MaintenanceStatusDropdown && MaintenanceStatusDropdown.map((val,index)=>{
                                return(
                                    <option key={index} value={val.id}>{val.serviceType}</option>
                                )
                              })}
                          </select>
                          <small id="errMaintenanceStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div> */}

                    {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">Maintenance Status<span className="starMandatory">*</span></label>
                      <Select value={selectedMaintenanceStatus} options={MaintenanceStatusDropdown} placeholder=" Select Maintenance Status" className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errMaintenanceStatus", setSelectedMaintenanceStatus)} />
                      <small id="errMaintenanceStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div> */}



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                            {isUpdateBtnShow !== true ? <>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 mx-1" onClick={handleOnSave}  ><img src={saveButtonIcon} className='icnn' alt="" />{t("Save")}</button>
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


            {/* table is made using getAllItemMaster API and mapped the data   */}


            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: "0" }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Equipment")}</th>
                      <th>{t("TechnicianName")}</th>
                      <th>{t("TechnicianMobile")}</th>
                      <th>{t("Visit_Date_Time")}</th>
                      <th>{t("Visited_With")}</th>
                      <th>{t("WorkDescription")}</th>
                      <th>{t("IdentifiedIssues")}</th>
                     

                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MaintenanceVisitTable && MaintenanceVisitTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.itemName}</td>
                          <td>{data.technicianName}</td>
                          <td>{data.technicianMobile}</td>

                          <td>
                            {(() => {
                              const dateTime = new Date(data.visitDateTime);
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

                          <td>{data.visitedWith}</td>
                          <td>{data.workDescription}</td>
                          <td>{data.identifiedIssues}</td>
                        

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

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCancel} >{t("Cancel")}</button>
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


