import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GetComplaintCategoryMaster from "../API/ComplaintCategoryMaster/GetComplaintCategoryMaster";
import GetComplaintRespondent from "../API/ComplaintRespondent/GetComplaintRespondent";
import GetAllComplaint from "../API/Complaint/GetAllComplaint";
import PostComplaint from "../API/Complaint/PostComplaint";
import GetAccessName from "../API/Complaint/GetAccessName";
import * as signalR from '@microsoft/signalr';
import Heading from "../../Component/Heading";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function Complaint() {

  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [SelectedComplaintCategory, setSelectedComplaintCategory] = useState(null)
  const [ComplaintCategoryDropdown, setComplaintCategoryDropdown] = useState([])
  const [RespondentDepartmentDropdown, setRespondentDepartmentDropdown] = useState([])
  const [ComplaitTable, setComplaitTable] = useState([])
  const [SelectedComplaintBy, setSelectedComplaintBy] = useState(null)
  const [ComplaintByTable, setComplaintByTable] = useState([])
  const [ComplaintText, setComplaintText] = useState("")
  const [SelectedRespondentDepartment, setSelectedRespondentDepartment] = useState(null)
  const [isClearable,] = useState(true);
  const [isSearchable,] = useState(true);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex,] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const [ComplaintRaisedTime, setComplaintRaisedTime] = useState([]);
  const {t} = useTranslation();

  let [userID,] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


  const [notifications, setNotifications] = useState([]);

  let [connect, setConnect] = useState([])
  // notification Code start
  // .withUrl("https://localhost:7112/Notification")


  // notification Code end
  let Dropdowns = async () => {
    let complaintCategory = await GetComplaintCategoryMaster()
    if (complaintCategory.status === 1) {
      setComplaintCategoryDropdown(complaintCategory.responseValue.map(complaintCat => ({
        value: complaintCat.id,
        label: complaintCat.complaintTitle
      })))
      console.log("ComplaintCategoryDropdown", complaintCategory.responseValue)
    }
    let respondentDepartment = await GetComplaintRespondent()
    if (respondentDepartment.status === 1) {
      setRespondentDepartmentDropdown(respondentDepartment.responseValue.map(RespondendDepartment => ({
        value: RespondendDepartment.id,
        label: RespondendDepartment.departmentName
      })))
      console.log("RespondentDepartment", respondentDepartment.responseValue)
    }

    let ComplaintBy = await GetAccessName();
    if (ComplaintBy.status === 1) {
      setShowLoder(0);
      setComplaintByTable(ComplaintBy.responseValue.map(complaintBy => ({
        value: complaintBy.id,
        label: complaintBy.name
      })));
      console.log("ComplaintByDropdown", ComplaintBy.responseValue)
    }

  }

  let Complaint = async () => {

    let data = await GetAllComplaint();
    if (data.status === 1) {
      setComplaitTable(data.responseValue);
      console.log("Complaint", data.responseValue)
    }


  }




  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };


  const handleOnChange = (e) => {

    document.getElementById('errComplaintCategory').style.display = 'none';
    document.getElementById('errComplaintText').style.display = 'none';
    document.getElementById('errRespondentDepartmentDropdown').style.display = 'none';
    const { name, value } = e.target;

    if (name === 'ComplaintText') {
      setComplaintText(value);
    }
    else if (name === 'searchBox') {
      setSearchInput(value)
    }

    else if (name === 'ComplaintRaisedTime') {
      setComplaintRaisedTime(value);
    }


  };


  const handleOnSave = async () => {

    if (SelectedComplaintCategory === null) {
      document.getElementById('errComplaintCategory').innerHTML = 'Please Choose Complaint Category';
      document.getElementById('errComplaintCategory').style.display = 'block';
      return;
    }
    else if(SelectedComplaintBy === null){
      document.getElementById('errComplaintBy').innerHTML ='Please choose Complaint By' ;
      document.getElementById('errComplaintBy').style.display = 'block';
    }
    else if (ComplaintText.trim() === '' || ComplaintText === undefined) {
      document.getElementById('errComplaintText').innerHTML = 'Please Enter Complaint Text';
      document.getElementById('errComplaintText').style.display = 'block';
      return;
    }
    else if (SelectedRespondentDepartment === null) {
      document.getElementById('errRespondentDepartmentDropdown').innerHTML = 'Please Select Respondent Department';
      document.getElementById('errRespondentDepartmentDropdown').style.display = 'block';
      return;
    }
    const obj =
    {
      ComplaintNumber: 0,
      complaintCategoryID: SelectedComplaintCategory.value,
      complaintBy: SelectedComplaintBy.value,
      complaintRaisedTime: ComplaintRaisedTime,
      complaintText: ComplaintText,
      respondentDepartmentID: SelectedRespondentDepartment.value,
      complaintStatus: 0,
      userId: userID
    };
    let data = await PostComplaint(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);

      setTosterMessage("Data Saved Successfully!");
      Complaint();
      setNewlyAddedRowIndex(0)
      setTimeout(() => {
        setShowToster(0);
        handleClear();
        setNewlyAddedRowIndex(false);
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
    document.getElementById('errComplaintCategory').style.display = 'none';
    document.getElementById('errComplaintBy').style.display = 'none';
    document.getElementById('errComplaintText').style.display = 'none';
    document.getElementById('errRespondentDepartmentDropdown').style.display = 'none';
    document.getElementById('errRespondentDepartmentDropdown').style.display = 'none';

    setSelectedComplaintBy(null)
    setSelectedComplaintCategory(null)
    // setComplaintClosedTime('')


    setComplaintRaisedTime('')

    setComplaintText('')

    setSelectedRespondentDepartment(null)

  };


  const edit = (data) => {
    setSelectedComplaintBy(null)
    setSelectedComplaintCategory(null)
    // setComplaintClosedTime('')


    setComplaintRaisedTime('')

    setComplaintText('')

    setSelectedRespondentDepartment(null)
  }
  const handleCancel = () => {
    handleClear()
    setIsUpdateBtnShow(false);
  };


  useEffect(() => {
    Dropdowns();
    Complaint();
    const connection = new signalR.HubConnectionBuilder()
    .withUrl(window.NotificationUrl + "/Notification")
      .configureLogging(signalR.LogLevel.Information)  // Replace with your API URL
      .build();
    connection.start().then(() => {
      connection.invoke("NewUserConnected", window.userId, 0).catch(err => console.log(err))
      connection.on("OnNewUserConnected", (message) => {
        console.log("n jnnknj", message)
      });
    })
    setConnect(connection)
  }, []);
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Complaint")}</div>
                <div className="inner-content">
                  <div className='row'>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("Complaint")} {t("Category")}<span className="starMandatory">*</span></label>
                      <Select value={SelectedComplaintCategory} placeholder={t("Complaint_Category")} options={ComplaintCategoryDropdown} className=" create-select" id="serviceType" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errComplaintCategory", setSelectedComplaintCategory)} />
                      <small id="errComplaintCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" >
                      <label htmlFor="ddlitemmaster" className="form-label">{t("Complaint")} {t("by")}<span className="starMandatory">*</span></label>
                      <Select value={SelectedComplaintBy} placeholder={t("Select_Complaint_By")} options={ComplaintByTable} className="create-select" id="serviceType" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errComplaintBy", setSelectedComplaintBy)} />
                      <small id="errComplaintBy" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-2">
                      <label htmlFor="Code" className="form-label">{t("Complaint")} {t("Text")}<span className="starMandatory">*</span></label>
                      <input value={ComplaintText} id="ComplaintText" type="text" className="form-control form-control-sm" name="ComplaintText" placeholder={t("Enter_Complaint_Text")} onChange={handleOnChange} />
                      <small id="errComplaintText" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label ">{t("Respondent")} {t("Department")}<span className="starMandatory">*</span></label>
                      <Select value={SelectedRespondentDepartment} placeholder={t("Respondend_Department")} options={RespondentDepartmentDropdown} className="create-select" id="serviceType" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errRespondentDepartmentDropdown", setSelectedRespondentDepartment)} />
                      <small id="errRespondentDepartmentDropdown" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-2">
                      <label htmlFor="Code" className="form-label">{t("Complaint")} {t("raise")} {t("Time")}<span className="starMandatory">*</span></label>
                      <input value={ComplaintRaisedTime} id="ExpectedClosingDate" type="datetime-local" className="form-control form-control-sm" name="ComplaintRaisedTime" placeholder={t("Select_On_Timing")} onChange={handleOnChange} />
                      <small id="errComplaintRaisedTime" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-2 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                            {isUpdateBtnShow !== true ? <>
                              <button className="btn btn-save btn-sm mb-1 btn-save-fill me-1 mx-3" onClick={handleOnSave} > <img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                            </> :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-1" >{t("Update")}</button>
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
              <div className='handlser'>
              <Heading text={t("Complaint_List")} />
                <div style={{ position: 'relative' }}>
                  <input type="text" name="searchBox" className='form-control form-control-sm' placeholder={t("Search")} value={searchInput} onChange={handleOnChange} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section " style={{ "height": "80vh" }}>

                <table className="med-table border_ striped mt-2">

                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Complaint_Number")}</th>
                      <th>{t("Complaint_by")}</th>
                      <th>{t("Complaint_Category")}</th>
                      <th>{t("Complaint_Text")}</th>
                      <th>{t("Respondent_Department")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>

                    {ComplaitTable && ComplaitTable.filter((val) => `${val.complaintBy} ${val.complaintNumber} ${val.complaintText} ${val.complaintCategory}`.toLowerCase().includes(searchInput.toLowerCase())).map((data, index) => {

                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={isNewRow ? 'new-row' : ''} key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.complaintNumber}</td>
                          <td>{data.complaintBy}</td>
                          <td>{data.complaintCategory}</td>
                          <td>{data.complaintText}</td>
                          <td>{data.respondentDepartMent}</td>
                          <td>
                          <div className="action-button">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-title="Edit Row"
                                data-bs-placement="bottom"

                              >
                                <img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data, index) }} />
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' />
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
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal"  >{t("Delete")}</button>
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


