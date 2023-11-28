import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import GetUserAccessedBy from "../../Maintenance/API/Complaint/GetUserAccessedBy";
import GetRespondentDepartment from "../API/ComplaintRespondent/GetRespondentDepartment";
import GetComplaintRespondent from "../API/ComplaintRespondent/GetComplaintRespondent";
import GetComplaintCategoryMaster from "../API/ComplaintCategoryMaster/GetComplaintCategoryMaster";
import PostComplaintRespondent from "../API/ComplaintRespondent/PostComplaintRespondent";
import PutComplaintRespondent from "../API/ComplaintRespondent/PutComplaintRespondent";
import DeleteComplaintRespondent from "../API/ComplaintRespondent/DeleteComplaintRespondent";
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function ComplaintRespondent() {

  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [selectedComplaintCategory, setSelectedComplaintCategory] = useState(null);
  const [selectedRespondentPerson, setSelectedRespondentPerson] = useState(null)
  const [selectedRespondentPersonDepartment, setSelectedRespondentPersonDepartment] = useState(null)
  const [ComplaintCategoryDropdown, setComplaintCategoryDropdown] = useState([])
  const [RespondentPersonDropdown, setRespondentPersonDropdown] = useState([])
  const [isClearable, ] = useState(true);
  const [isSearchable, ] = useState(true);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [RespondendDepartmentDropdown, setRespondendDepartmentDropdown] = useState([])
  const [ComplaintRespondentTable, setComplaintRespondentTable] = useState([])
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);



  // The Code is  written By S Ayaz


  let Dropdowns = async () => {
    let ComplaintCategoryMaster = await GetComplaintCategoryMaster();
    if (ComplaintCategoryMaster.status === 1) {
      console.log("ComplaintCategoryMaster")
      setShowLoder(0);
      setComplaintCategoryDropdown(ComplaintCategoryMaster.responseValue.map(ComplaintCat => ({
        value: ComplaintCat.id,
        label: ComplaintCat.complaintTitle,
      })));
    }
    let Respondendperson = await GetUserAccessedBy()
    if (Respondendperson.status === 1) {
      console.log("Respondendperson", Respondendperson.responseValue)
      setShowLoder(0)
      setRespondentPersonDropdown(Respondendperson.responseValue.map(ResPerson => ({
        value: ResPerson.id,
        label: ResPerson.name
      })))
    }

    let RespondendDepartment = await GetRespondentDepartment()
    if (RespondendDepartment.status === 1) {
      console.log("RespondendDepartment", RespondendDepartment.responseValue)
      setShowLoder(0)
      setRespondendDepartmentDropdown(RespondendDepartment.responseValue.map(ResDepartment => ({
        value: ResDepartment.id,
        label: ResDepartment.departmentName,
      })))
    }

  }

  let GetComplaintrespondent = async () => {
    let AllComplaintResponpondend = await GetComplaintRespondent()
    if (AllComplaintResponpondend.status === 1) {
      console.log("AllComplaintResponpondend", AllComplaintResponpondend.responseValue)
      setComplaintRespondentTable(AllComplaintResponpondend.responseValue)
    }
  }




  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };

  // POST API called for data saving




  const handleOnSave = async () => {
   
    if (selectedComplaintCategory === null) {
      document.getElementById('errComplaintCategory').innerHTML = 'Please Select Complaint Category';
      document.getElementById('errComplaintCategory').style.display = 'block';
      return;
    }
    else if (selectedRespondentPerson === null) {
      document.getElementById('errRespondentPerson').innerHTML = 'Please Select Respondent Person';
      document.getElementById('errRespondentPerson').style.display = 'block';
      return;
    }
    else if (selectedRespondentPersonDepartment === null) {
      document.getElementById('errRespondentPersonDepartment').innerHTML = 'Please Select Respondent Department';
      document.getElementById('errRespondentPersonDepartment').style.display = 'block';
      return;
    }

    const obj = {
      complaintCategoryID: selectedComplaintCategory.value,
      respondentPersonID: selectedRespondentPerson.value,
      respondentDepartment: selectedRespondentPersonDepartment.value,
      userID: userID,
    };

    let data = await PostComplaintRespondent(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      GetComplaintrespondent()
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


    document.getElementById('errComplaintCategory').style.display = 'none';
    document.getElementById('errRespondentPerson').style.display = 'none';
    document.getElementById('errRespondentPersonDepartment').style.display = 'none';



    setSelectedComplaintCategory(null)
    setSelectedRespondentPerson(null)
    setSelectedRespondentPersonDepartment(null)

  };


  const edit = (RespondendDepartment , index) => {
    setNewlyAddedRowIndex(index)
    setRowID(RespondendDepartment.id)
    setIsUpdateBtnShow(true);


    setSelectedComplaintCategory({
      value: RespondendDepartment.complaintCategoryID,
      label: RespondendDepartment.complaintTitle
    })
    setSelectedRespondentPerson({
      value : RespondendDepartment.respondentPersonID,
      label : RespondendDepartment.respondentPersonName
    })
    setSelectedRespondentPersonDepartment({
      value : RespondendDepartment.respondentDepartment,
      label : RespondendDepartment.departmentName
    })



  }

    const handleUpdate = async () => {

      if (selectedComplaintCategory === null) {
        document.getElementById('errComplaintCategory').innerHTML = 'Please Select Complaint Category';
        document.getElementById('errComplaintCategory').style.display = 'block';
        return;
      }
      else if (selectedRespondentPerson === null) {
        document.getElementById('errRespondentPerson').innerHTML = 'Please Select Respondent Person';
        document.getElementById('errRespondentPerson').style.display = 'block';
        return;
      }
      else if (selectedRespondentPersonDepartment === null) {
        document.getElementById('errRespondentPersonDepartment').innerHTML = 'Please Select Respondent Department';
        document.getElementById('errRespondentPersonDepartment').style.display = 'block';
        return;
      }


        const obj = {
             id: rowID,
             complaintCategoryID: selectedComplaintCategory.value,
             respondentPersonID: selectedRespondentPerson.value,
             respondentDepartment: selectedRespondentPersonDepartment.value,
             userID: userID,
        };

      const data = await PutComplaintRespondent(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage('Data Updated Successfully!');
        GetComplaintrespondent()
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
        }, 2000);
      }
    };
  const handleCancel = () => {
    handleClear()
    setIsUpdateBtnShow(false);
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);

  };

  const deleteRow = async (index) => {
    setShowUnderProcess(1);

    let ID = rowID
    
    let data = await DeleteComplaintRespondent(ID);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      GetComplaintrespondent()
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
    GetComplaintrespondent();
  }, []);


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title"> {t("Complaint_Respondent")}
                </div>
                <div className="inner-content">
                  <div className='row'>



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("Complaint_Category")}<span className="starMandatory">*</span></label>
                      <Select value={selectedComplaintCategory} placeholder={t("Select_Complaint_Category")} options={ComplaintCategoryDropdown} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errComplaintCategory", setSelectedComplaintCategory)} />
                      <small id="errComplaintCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>



                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("Respondent_Person")}<span className="starMandatory">*</span></label>
                      <Select value={selectedRespondentPerson} placeholder={t("Select_Respondent_Person")} options={RespondentPersonDropdown} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errRespondentPerson", setSelectedRespondentPerson)} />
                      <small id="errRespondentPerson" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="ddlitemmaster" className="form-label">{t("Respondent_Department")}<span className="starMandatory">*</span></label>
                      <Select value={selectedRespondentPersonDepartment} placeholder={t("Select_Respondent_Person")} options={RespondendDepartmentDropdown} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errRespondentPersonDepartment", setSelectedRespondentPersonDepartment)} />
                      <small id="errRespondentPersonDepartment" className="form-text text-danger" style={{ display: 'none' }}></small>
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
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{ zIndex: '0' }}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("Complaint_Category")}</th>
                      <th>{t("Respondent_Person")}</th>
                      <th>{t("Respondent_Department")}</th>
                      <th></th>

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ComplaintRespondentTable && ComplaintRespondentTable.map((data, index) => {
                       const isNewRow = newlyAddedRowIndex === index;
                       const isEditing = index === editRowIndex;
                      return(
                        <tr className={isNewRow ? 'new-row' : ''} key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{data.complaintTitle}</td>
                        <td>{data.respondentPersonName}</td>
                        <td>{data.departmentName}</td>

                        <td></td>


                        <td></td>

                        <td>
                          <div className="action-button">
                            <div
                              data-bs-toggle="tooltip"
                              data-bs-title="Edit Row"
                              className={isEditing ? 'edited-row' : ''}
                              data-bs-placement="bottom"
                              onClick={() => edit(data , index)}
                            >
                              <i className="fa fa-edit actionedit"></i>
                            </div>
                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowID(data.id, index); }}></i>
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
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal"  onClick={deleteRow} >{t("Delete")}</button>
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


