import React, { useEffect, useState } from 'react'
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loder from '../../Component/Loader';
import Select from 'react-select';
import GetItemCategoryMaster from "../API/ItemSubCategoryMaster/GetItemCategoryMaster";
import InsertitemSubCategoryMaster from '../API/ItemSubCategoryMaster/InsertitemSubCategoryMaster';
import GetItemSubcategoryMaster from '../API/ItemSubCategoryMaster/GetItemSubcategoryMaster';
import DeleteItemSubCategory from '../API/ItemSubCategoryMaster/DeleteItemSubCategory';
import UpdateItemSubCategory from '../API/ItemSubCategoryMaster/UpdateItemSubCategory';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function ItemSubCategoryMaster() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [categorylist, setcategorylist] = useState([]);
  const [itemsubcategoryname, setitemsubcategoryname] = useState("");
  const [Selectedcategory, setSelectedcategory] = useState(null);
  const [rowID, setRowID] = useState(0);
  const [itemcategorytable, setitemcategorytable] = useState(0);
  const [remark, setremark] = useState("")
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isNewRowAdded, setIsNewRowAdded] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


  const getDropdownData = async () => {
    let dropdownData = await GetItemCategoryMaster();
   
    if (dropdownData.status === 1) {
      setcategorylist(dropdownData.responseValue.map(category => ({
        value: category.id,
        label: category.categoryName
      })));
    };
  }

  const datasubcategory = async () => {
    const tabledata = await GetItemSubcategoryMaster();
    if (tabledata.status === 1) {
      setShowLoder(0);
      setitemcategorytable(tabledata.responseValue);
    } else {
      setShowLoder(0);
    }
   
  };

  const handleOnChange = (e) => {
    setIsNewRowAdded(false)
    document.getElementById('erritemsubcategoryname').style.display = 'none';
    document.getElementById('errremark').style.display = 'none';
    document.getElementById('errItemcategoryName').style.display = 'none';

    const { name, value } = e.target;
    if (name === 'itemSubCategory') {
      setitemsubcategoryname(value);
    }

    else if (name === "itemRemark")
      setremark(value)
  };

  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
  };


  const handleOnSave = async () => {

    let ddlsubcategoryname = document.getElementById('ddlsubcategoryname').value;
    let ddremark = document.getElementById('ddremark').value;
   

    if (ddlsubcategoryname.trim() === '') {
      document.getElementById('erritemsubcategoryname').innerHTML = 'Please Enter Item Name';
      document.getElementById('erritemsubcategoryname').style.display = 'block';
      return;
    }


    else if (Selectedcategory === null) {
      document.getElementById('errItemcategoryName').innerHTML = 'Please Choose Item Category Name';
      document.getElementById('errItemcategoryName').style.display = 'block';
      return;
    }
    else {
      document.getElementById('errItemcategoryName').style.display = 'none';
    }

    const obj = {
      subCategoryName: ddlsubcategoryname,
      categoryID: Selectedcategory.value,
      categoryName: Selectedcategory.value,
      userID: userID,
      remark: ddremark,
    };

    let data = await InsertitemSubCategoryMaster(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage('Data Saved Successfully!');
      datasubcategory();
      setIsNewRowAdded(true)
      setNewlyAddedRowIndex(null);
      handleClear()
      setTimeout(() => {
        setShowToster(0);
        setIsNewRowAdded(false)

      }, 2000);
    } else {
      setShowUnderProcess(0);
      setShowToster(0);
      setTosterValue(0);
      setTosterMessage(data.responseValue);
      setTimeout(() => {
        setShowToster(0);
      }, 2000);
    }
  };


  const handleClear = async () => {
    document.getElementById('erritemsubcategoryname').style.display = 'none';
    document.getElementById('errremark').style.display = 'none';
    document.getElementById('errItemcategoryName').style.display = 'none';
    setSelectedcategory(null);
    setitemsubcategoryname('');
    setremark("")
  };


  let deleteRow = async () => {
    setShowUnderProcess(1);
   
    const obj = {
      id: rowID,
      userId: userID
    };


    let data = await DeleteItemSubCategory(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setIsUpdateBtnShow(false)
      setNewlyAddedRowIndex(false)
      datasubcategory();
      handleClear();
      setIsNewRowAdded(false)
      setTimeout(() => {
        setShowToster(0);


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



  const edit = (tabledata, index) => {
     const elementsToHide = ['erritemsubcategoryname', 'errremark', 'errItemcategoryName'];
    elementsToHide.forEach(id => document.getElementById(id).style.display = 'none');


    setIsUpdateBtnShow(true);
    setSelectedcategory({
      value: tabledata.categoryID,
      label: tabledata.categoryName
    }); // Update the state with the correct value
    setitemsubcategoryname(tabledata.subCategoryName); // Update the state with the correct value
    setremark(tabledata.remark)
    setRowID(tabledata.id);
    setNewlyAddedRowIndex(index)
  };



   const handleUpdate = async () => {

    let ddremark = document.getElementById('ddremark').value;
    let ddlsubcategoryname = document.getElementById('ddlsubcategoryname').value;

    

    if (ddlsubcategoryname.trim() === '') {
      document.getElementById('erritemsubcategoryname').innerHTML = 'Please Enter Item Name';
      document.getElementById('erritemsubcategoryname').style.display = 'block';
      return;
    }

    else if (Selectedcategory === null) {
      document.getElementById('errItemcategoryName').innerHTML = 'Please Choose Item Category Name';
      document.getElementById('errItemcategoryName').style.display = 'block';
      return;
    }
    else {
      document.getElementById('errItemcategoryName').style.display = 'none';
    }
    const obj = {
      id: rowID,
      subCategoryName: ddlsubcategoryname,
      categoryID: Selectedcategory.value,
      categoryName: Selectedcategory.value,
      userID: userID,
      remark: ddremark,
    };
    const data = await UpdateItemSubCategory(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage('Data Updated Successfully!');
      datasubcategory();
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
    setIsUpdateBtnShow(false);
    setitemsubcategoryname('');
    setSelectedcategory(null);
    setitemsubcategoryname('');
    setremark('');
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
  };



  useEffect(() => {
    getDropdownData();
    datasubcategory();
  }, []);



  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Item_Sub_Category_Master")}</div>
                <div className="inner-content">
                  <div className='row'>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="Code" className="form-label">{t("Item_Sub_Category_Name")}<span className="starMandatory">*</span></label>
                      <input id='ddlsubcategoryname' value={itemsubcategoryname} type="text" className="form-control form-control-sm" name="itemSubCategory" placeholder={t("Enter_Sub_Category_Name")} onChange={handleOnChange} />
                      <small id="erritemsubcategoryname" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" >
                      <label htmlFor="ddlitemmaster" className="form-label me-5">{t("Item_Category")}<span className="starMandatory">*</span></label>
                      <Select value={Selectedcategory} options={categorylist} className="create-select" id="itemcategory" placeholder={t("Select_Item_Category")} isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption, "errItemcategoryName", setSelectedcategory)} />
                      <small id="errItemcategoryName" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>
                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                      <label htmlFor="remark" className="form-label">{t("Remark")}</label>
                      <input id='ddremark' value={remark} type="text" className="form-control form-control-sm" name="itemRemark" placeholder={t("Remarks")} onChange={handleOnChange} />
                      <small id="errremark" className="form-text text-danger" style={{ display: 'none' }}></small>
                    </div>


                    <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-2 relative">
                      <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                      {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                        showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                          :
                          <div>
                            {isUpdateBtnShow !== true ? <>
                              <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 ms-2 me-2" onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                              <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                            </> :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleUpdate} >{t("Update")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1  " onClick={handleCancel}>{t("Cancel")}</button>
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
                      <th>{t("Item_SubCategory_Name")}</th>
                      <th>{t("Item_Category")}</th>
                      <th>{t("Item_Remark")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemcategorytable &&
                      itemcategorytable.map((data, index) => {
                        const isNewRow = newlyAddedRowIndex === index;
                        const isEditing = index === editRowIndex;
                        return (


                          <tr className={index === itemcategorytable.length - 1 && isNewRowAdded ? 'new-row' : '' || isNewRow ? 'new-row' : ''} key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>{data.subCategoryName}</td>
                            <td>{data.categoryName}</td>
                            <td>{data.remark}</td>

                            <td>
                              <div className="action-button">
                                <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data, index) }} /></div>
                                <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id, index) }} />
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

