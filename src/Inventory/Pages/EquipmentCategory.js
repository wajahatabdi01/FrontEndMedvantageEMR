import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loader from '../../Component/Loader';
import InsertEquipmentCategory from '../API/EquipmentCategory/InsertEquipmentCategory';
import GetEquipmentCategory from '../API/EquipmentCategory/GetEquipmentCategory';
import UpdateEquipmentCategory from '../API/EquipmentCategory/UpdateEquipmentCategory';
import DeleteEquipmentCategory from '../API/EquipmentCategory/DeleteEquipmentCategory';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';

import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export const EquipmentCategory = () => {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [categoryName, setCategoryName] = useState('');
  const [remark, setRemark] = useState('');
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  

  const handlerChange = (e) => {
    document.getElementById('errCategoryName').style.display = 'none';
    document.getElementById('errRemark').style.display = 'none';
    if (e.target.name === 'categoryName') {
      setCategoryName(e.target.value);
    };

    if (e.target.name === 'remark') {
      setRemark(e.target.value);
    };
  };

  const handleSave = async () => {
    if (categoryName.trim() === '' || categoryName === null || categoryName === undefined) {
      document.getElementById('errCategoryName').innerHTML = 'Please Enter Category Name';
      document.getElementById('errCategoryName').style.display = 'block';
    }
    // else if(remark.trim() === '' || remark === null || remark === undefined){
    //   document.getElementById('errRemark').innerHTML = 'Please Enter Remark';
    //   document.getElementById('errRemark').style.display = 'block';
    //   }
    else{
      let userID=JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
      const obj = {
        categoryName: categoryName,
        remark: remark,
        userId: userID
      };

      let data = await InsertEquipmentCategory(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        getEquipmentCategory();
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

  const getEquipmentCategory = async () => {
    setShowLoder(1);
    let data = await GetEquipmentCategory();
    if (data.status === 1) {
      setShowLoder(0);
      setCategoryNameList(data.responseValue);
    }
    else {
      setShowLoder(0);
    }
  };

  const handleClear = () =>{
    document.getElementById('errCategoryName').style.display = 'none';
    document.getElementById('errRemark').style.display = 'none';
    setCategoryName('');
    setRemark('');
  };

  const edit = async (list,index) => {
    document.getElementById('errCategoryName').style.display = 'none';
    document.getElementById('errRemark').style.display = 'none';
    setIsUpdateBtnShow(true);
    setRowID(list.id);
    setCategoryName(list.categoryName);
    setRemark(list.remark);
    setNewlyAddedRowIndex(index)
  };

  const handleUpdate = async () => {
    if (categoryName.trim() === '' || categoryName === null || categoryName === undefined) {
      document.getElementById('errCategoryName').innerHTML = 'Please Enter Category Name';
      document.getElementById('errCategoryName').style.display = 'block';
    }
    
    else{
      let userID=JSON.parse(window.sessionStorage.getItem("LoginData")).userId;
      const obj = {
        id: rowID,
        categoryName: categoryName,
        remark: remark,
        userId: userID
      };

      let data = await UpdateEquipmentCategory(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Updated Successfully!");
        getEquipmentCategory();
      
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

  let deleteRow = async () => {
    setShowUnderProcess(1);
    let userID = JSON.parse(window.sessionStorage.getItem("LoginData")).userId;

    const obj = {
      id: rowID,
      userId: userID
    };
    let data = await DeleteEquipmentCategory(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      getEquipmentCategory();
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

  const handleCancel = () => {
    setIsUpdateBtnShow(false);
    setCategoryName('');
    setRemark('');
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
  };


  useEffect(() => {
    getEquipmentCategory();
  }, []);

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Equipment_Category")}</div>
                <div className="inner-content">

                  <div className='row'>
                    <div className='col-md-12 col-sm-12 col-xs-12 mb-3'>
                      <div className="d-flex flex-wrap align-content-end">

                        <div className="col-md-3 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("Category_Name")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="categoryName" value={categoryName} placeholder={t("Enter_Category_Name")} onChange={handlerChange} />
                          <small id="errCategoryName" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                        <div className="col-md-4 col-sm-12 col-xs-12 mb-2 me-2">
                          <label htmlFor="Code" className="form-label">{t("Remark")}
                            {isUpdateBtnShow === true ? <span className="starMandatory">*</span> : <span className="starMandatory"></span>}</label>
                          <input type="text" className="form-control form-control-sm" name="remark" value={remark} placeholder={t("Remarks")} onChange={handlerChange} />
                          <small id="errRemark" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                      <th>{t("Category_Name")}</th>
                      <th>{t("Remark")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categoryNameList && categoryNameList.map((list, index) => {
                        const isNewRow = newlyAddedRowIndex === index;
                        const isEditing = index === editRowIndex;
                        
                      return (
                        <tr className={isNewRow ? 'new-row' : '' } key={index}  >
                          <td className="text-center">{index + 1}</td>
                          <td>{list.categoryName}</td>
                          <td>{list.remark}</td>
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
                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
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
          showLoder === 1 ? <Loader val={showLoder} /> : ""
        }
      </section>
    </>
  )
}
