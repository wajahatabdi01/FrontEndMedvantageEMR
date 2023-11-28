import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import GetComplaintCategoryMaster from "../API/ComplaintCategoryMaster/GetComplaintCategoryMaster";
import PostComplaintMaster from "../API/ComplaintCategoryMaster/PostComplaintMaster";
import PutComplaintCategoryMaster from "../API/ComplaintCategoryMaster/PutComplaintCategoryMaster";
import DeleteComplaintCategory from "../API/ComplaintCategoryMaster/DeleteComplaintCategory";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function ComplaintCategoryMaster() {


  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [ComplaintTitle, setComplaintTitle] = useState('');
  const [Remarks, setRemarks] = useState("");
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setisNewRowAdded] = useState(false)
  const [ComplaintCategoryTable, setComplaintCategoryTable] = useState([])
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  const {t} = useTranslation();



  // The Code is  written By S Ayaz


  let GetComplaintCategory = async () => {
    let ComplaintCategoryMaster = await GetComplaintCategoryMaster();
    if (ComplaintCategoryMaster.status === 1) {
      console.log("ComplaintCategoryMaster", ComplaintCategoryMaster.responseValue)
      setShowLoder(0);
      setComplaintCategoryTable(ComplaintCategoryMaster.responseValue);
    }
  }


  // POST API called for data saving


  const handleOnChange = (e) => {
    setisNewRowAdded(false)
    setNewlyAddedRowIndex(null);
    document.getElementById('errcomplaintTitle').style.display = 'none';
    document.getElementById('errRemarks').style.display = 'none';



    const { name, value } = e.target;
    if (name === 'complaintTitle') {
      setComplaintTitle(value);
    }
    if (name === 'Remarks') {
      setRemarks(value);
    }


  };

  const handleOnSave = async () => {


    if (ComplaintTitle.trim() === '' || ComplaintTitle === undefined) {
      document.getElementById('errcomplaintTitle').innerHTML = 'Please Complaint Category Title';
      document.getElementById('errcomplaintTitle').style.display = 'block';
      return;
    }


    const obj = {
      complaintTitle: ComplaintTitle,
      remark: Remarks,
      userID: userID,
    };

    let data = await PostComplaintMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      GetComplaintCategory()
      setisNewRowAdded(true);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setisNewRowAdded(false);
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
    document.getElementById('errcomplaintTitle').style.display = 'none';
    document.getElementById('errRemarks').style.display = 'none';


    setComplaintTitle("")
    setRemarks("")

  };


  const edit = (ComplaintCategoryMaster,index) => {
    document.getElementById('errcomplaintTitle').style.display = 'none';
    document.getElementById('errRemarks').style.display = 'none';
    
    setRowID(ComplaintCategoryMaster.id)
    setIsUpdateBtnShow(true);
    setComplaintTitle(ComplaintCategoryMaster.complaintTitle)
    setRemarks(ComplaintCategoryMaster.remark)
    setNewlyAddedRowIndex(index)


  }

  const handleUpdate = async () => {




    if (ComplaintTitle.trim() === '' || ComplaintTitle === undefined) {
      document.getElementById('errcomplaintTitle').innerHTML = 'Please Complaint Category Title';
      document.getElementById('errcomplaintTitle').style.display = 'block';
      return;
    }



    const obj = {
      id: rowID,
      complaintTitle: ComplaintTitle,
      remark: Remarks,
      userID: userID,
    };

    const data = await PutComplaintCategoryMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      GetComplaintCategory()
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

  const deleteRow = async () => {
    setShowUnderProcess(1);

    const obj = {
      id: rowID,
      userId: userID
    }

    let data = await DeleteComplaintCategory(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setisNewRowAdded(false)
      GetComplaintCategory()
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
    GetComplaintCategory()
  }, []);

  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Complaint_Category_Master")}
                </div>
                <div className="inner-content">
                  <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                      <div className="d-flex flex-wrap align-content-end">

                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2 mx-2">
                          <label htmlFor="Code" className="form-label">{t("Complaint_Category")}<span className="starMandatory">*</span></label>
                          <input value={ComplaintTitle} id="complaintTitle" type="text" className="form-control form-control-sm" name="complaintTitle" placeholder={t("Enter_Complaint_Category")} onChange={handleOnChange} />
                          <small id="errcomplaintTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="col-md-2 col-sm-12 col-xs-12 mb-2 me-2 mx-2">
                          <label htmlFor="Code" className="form-label">{t("Remark")} <span className="starMandatory"></span></label>
                          <input value={Remarks} id="Remarks" type="text" className="form-control form-control-sm" name="Remarks" placeholder={t("Remarks")} onChange={handleOnChange} />
                          <small id="errRemarks" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>
                        <div className="mb-2 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1 mx-1" onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' alt="" />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}  >{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1 mx-1" onClick={handleUpdate} >{t("UPDATE")}</button>
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
                      <th>{t("Complaint_Category")}</th>
                      <th>{t("Remark")}</th>
                      <th></th>

                      <th></th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ComplaintCategoryTable && ComplaintCategoryTable.map((data, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                     return(
                      <tr className={index === ComplaintCategoryTable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td>{data.complaintTitle}</td>
                      <td>{data.remark}</td>

                      <td></td>


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


