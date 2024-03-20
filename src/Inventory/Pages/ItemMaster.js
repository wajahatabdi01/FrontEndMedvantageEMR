import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loader from '../../Component/Loader';
import Select from 'react-select';
import GetInventoryitemcategoryMaster from "../API/InventoryItemMaster/GetInventoryitemcategoryMaster";
import InsertinventoryitemMaster from "../API/InventoryItemMaster/InsertinventoryitemMaster";
import GeitemMaster from "../API/InventoryItemMaster/GetitemMaster";
import Getitemsubcategory from "../API/InventoryItemMaster/Getitemsubcategory";
import DeleteitemMaster from "../API/InventoryItemMaster/DeleteitemMaster";
import UpdateItemMaster from "../API/InventoryItemMaster/UpdateItemMaster";
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function ItemMaster() {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [inventoryList, setInventoryList] = useState([]);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [itemname, setitemname] = useState("");
  const [Selectedcategory, setSelectedcategory] = useState(null);
  const [itemsubcategoryname, setitemsubcategoryname] = useState("");
  const [subcategory, setsubcategory] = useState([]);
  const [allitemMster, setallitemMaster] = useState([]);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [SelectedSubcategory, setSelectedSubcategory] = useState(null)
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);




  // The Code is written By S Ayaz



  //Get API for select item category and sub category in the same function  drop down menu

  let dropdownMenu = async () => {
    let dataGet = await GetInventoryitemcategoryMaster();
    let datasubcategory = await Getitemsubcategory();
    if (dataGet.status === 1) {
      setInventoryList(dataGet.responseValue.map(category => ({
        value: category.id,
        label: category.categoryName 
      })));
    }
   

      if (datasubcategory.status === 1) {
        setsubcategory(datasubcategory.responseValue.map(subcategory => ({
          value: subcategory.id,
          label: subcategory.subCategoryName 
        })));
      }
    };
     
  
    const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
      document.getElementById(errorElementId).style.display = 'none';
      setSelectedFunction(selectedOption);
  };

  
  const getAllItemMaster = async () => {
    const allitemMasterData = await GeitemMaster();
    if (allitemMasterData.status === 1) {
      setShowLoder(0);
      setallitemMaster(allitemMasterData.responseValue);
    }
    else {
      setShowLoder(0);
    }
  };

 


  const handleOnChange = (e) => {

    document.getElementById("errItemName").style.display = "none";
    document.getElementById('errItemcategoryName').style.display = 'none';

    
    const { name, value } = e.target;

    if (name === 'itemName') {
      setitemname(value);
    } else if (name === 'itemCategoryID') {
     
    } else if (name === 'itemSubCategoryID') {
      setitemsubcategoryname(value);
    }
  };

  const handleOnSave = async () => {
 
    if (itemname.trim() === "" || itemname === null || itemname === undefined) {
      document.getElementById("errItemName").innerHTML = "Please Enter Item Name";
      document.getElementById("errItemName").style.display = "block";
      return;
    }
    else if ( SelectedSubcategory ===  null) {
      document.getElementById('errItemsubcategoryName').innerHTML = 'Please Choose Item Sub Category Name';
      document.getElementById('errItemsubcategoryName').style.display = 'block';
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
      itemName: itemname,
      itemCategoryID: Selectedcategory.value,
      itemSubCategoryID: SelectedSubcategory.value,
      userID: userID,
    };

    let data = await InsertinventoryitemMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setShowToster(1);
      setTosterValue(0);
      setTosterMessage("Data Saved Successfully!");
      getAllItemMaster();
      setNewlyAddedRowIndex(0);
      handleClear();
      setTimeout(() => {
        setShowToster(0);
        setNewlyAddedRowIndex(null);
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




  const handleClear = () => {
    document.getElementById("errItemName").style.display = "none";
    document.getElementById('errItemcategoryName').style.display = 'none';
    document.getElementById('errItemsubcategoryName').style.display = 'none';
  
    setSelectedcategory(null)
    setitemname('');
    setitemsubcategoryname('');
    setSelectedSubcategory(null)
  };


  const edit = (allitemMasterData,index) => {
    document.getElementById('errItemsubcategoryName').style.display = 'none';
    document.getElementById("errItemName").style.display = "none";
    document.getElementById('errItemcategoryName').style.display = 'none';
    setIsUpdateBtnShow(true);
    setitemname(allitemMasterData.itemName)
    setSelectedcategory({
      value : allitemMasterData.itemCategoryID,
      label : allitemMasterData.categoryName
    })
    setSelectedSubcategory({
      value: allitemMasterData.itemSubCategoryID,
      label: allitemMasterData.subCategoryName 
    });
    setRowID(allitemMasterData.id)
    setNewlyAddedRowIndex(index)

  }


  const handleUpdate = async () => {
 
    if (itemname.trim() === "" || itemname === null || itemname === undefined) {
      document.getElementById("errItemName").innerHTML = "Please Enter Item Name";
      document.getElementById("errItemName").style.display = "block";
      return;
    }

    else if (SelectedSubcategory === null) {
      document.getElementById('errItemsubcategoryName').innerHTML = 'Please Choose Item Sub Category Name';
      document.getElementById('errItemsubcategoryName').style.display = 'block';
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
      itemName: itemname,
      itemCategoryID: Selectedcategory.value,
      itemSubCategoryID: SelectedSubcategory.value,
      userID: userID
    }
    const data = await UpdateItemMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Saved Successfully!");
      getAllItemMaster();
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

  };
  const handleCancel = () => {
    setIsUpdateBtnShow(false);
    setitemname('');
    setSelectedcategory(null);
    setitemsubcategoryname('');
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
    setSelectedSubcategory(null)
  };

  const deleteRow = async () => {
    setShowUnderProcess(1);
    const obj = {
      id: rowID,
    }
    let data = await DeleteitemMaster(obj);
    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false)
      setIsUpdateBtnShow(false)
      getAllItemMaster();
     
      setTimeout(() => {
        setShowToster(0);
        handleClear();
       
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
    dropdownMenu()
    getAllItemMaster();
  }, []);


  return (
    <>

      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Item_Master")}</div>
                <div className="inner-content">
                  <div className='row'>
                   

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3" >
                          <label htmlFor="Code" className="form-label">{t("ItemName")}<span className="starMandatory">*</span></label>
                          <input value={itemname} id="ddlitemname" type="text" className="form-control form-control-sm" name="itemName" placeholder={t("Item_Name")} onChange={handleOnChange} />
                          <small id="errItemName" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>


                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                           <label htmlFor="ddlitemmaster" className="form-label">{t("Item_Sub_Category")}<span className="starMandatory">*</span></label>
                           <Select value={SelectedSubcategory} placeholder= {t("Choose_Item_sub_category")} options={subcategory} className="create-select" id="itemsubcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption , "errItemsubcategoryName" , setSelectedSubcategory)} />
                          <small id="errItemsubcategoryName" className="form-text text-danger" style={{ display: 'none' }}></small> 
                        </div>


                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                           <label htmlFor="ddlitemmaster" className="form-label">{t("Item_Category")}<span className="starMandatory">*</span></label>
                           <Select value={Selectedcategory} options={inventoryList} placeholder={t("Choose_Item_category")} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption => handleSelectChange(selectedOption , "errItemcategoryName" , setSelectedcategory)} />
                          <small id="errItemcategoryName" className="form-text text-danger" style={{ display: 'none' }}></small> 
                        </div>

      
                        

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
                          <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>

                          {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                            showToster === 1 ? <Toster  value={tosterValue} message={tosterMessage} />
                              :
                              <div>
                                {isUpdateBtnShow !== true ? <>
                                  <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"  onClick={handleOnSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                  <button type="button" className="btn btn-clear btn-sm mb-1"  onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                </> :
                                  <>
                                    <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleUpdate}>{t("Update")}</button>
                                    <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleCancel}>{t("Cancel")}</button>
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
                  <thead style={{zIndex: '0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("ItemName")}</th>
                      <th>{t("Sub_Category_Name")}</th>
                      <th>{t("Item_Category")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allitemMster &&
                      allitemMster.map((data, index) => {
                        const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                        return(
                        <tr className={isNewRow ? 'new-row' : '' } key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{data.itemName}</td>
                          <td>{data.subCategoryName}</td>
                          <td>{data.categoryName}</td>

                          <td>
                            <div className="action-button">
                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon}  className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(data,index) }}/></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(data.id,index) }}/>
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
          showLoder === 1 ? <Loader val={showLoder} /> : ""
        }
      </section>

    </>

  )
}


