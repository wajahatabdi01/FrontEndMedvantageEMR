import React, { useEffect, useState } from 'react';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Loader from '../../Component/Loader';
import Select from 'react-select';
import PostEquipmentMaster from '../API/EquipmentMaster/PostEquipmentMaster';

import GetEquipmentMaster from '../API/EquipmentMaster/GetEquipmentMaster';
import PutEquipmentMaster from '../API/EquipmentMaster/PutEquipmentMaster';
import GetAccessName from '../API/EquipmentMaster/GetAccessName';
import DeleteEquipmentMaster from '../API/EquipmentMaster/DeleteEquipmentMaster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GeitemMaster from '../API/InventoryItemMaster/GetitemMaster';
import GetItemCatgoryMaster from '../API/ItemCategoryMaster/GetItemCatgoryMaster';
import { json } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export const EquipmentMaster = () => {
  const {t} = useTranslation();
  document.body.dir = i18n.dir();
  const [SerialNumber, setSerialNumber] = useState('');
  const [equipmentDescription, setequipmentDescription] = useState('');
  const [showUnderProcess, setShowUnderProcess] = useState(0);
  const [showToster, setShowToster] = useState(0);
  const [tosterMessage, setTosterMessage] = useState("");
  const [tosterValue, setTosterValue] = useState(0);
  const [rowID, setRowID] = useState(0);
  const [showLoder, setShowLoder] = useState(0);
  const [isUpdateBtnShow, setIsUpdateBtnShow] = useState(false);
  const [Selectedcategory, setSelectedcategory] = useState(null);
  const [EquipmentMasterTable, setEquipmentMasterTable] = useState([]);
  const [newlyAddedRowIndex, setNewlyAddedRowIndex] = useState(null);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [itemMasterDropdown, setitemMasterDropdown] = useState([])
  const [SelectedItemMaster, setSelectedItemMaster] = useState(null)
  const [SelectedResponsiblePerson, setSelectedResponsiblePerson] = useState(null)
  const [ResponsinlePersonTable , setResponsinlePersonTable] = useState([])
  let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
  const [ItemCategoryTable, setItemCategoryTable] = useState([])
  const [isSearchable , setisSearchable] = useState (true)
  const [isClearable , setisClearable] = useState (true)

  let Dropdown = async () => {
    let data = await GetItemCatgoryMaster();
  
    if (data.status === 1) {
      setShowLoder(0);
      setItemCategoryTable(data.responseValue.map(ItemCat =>({
        value : ItemCat.id,
        label : ItemCat.categoryName,
      })));
    }
    else {
      setShowLoder(0);
    }

    let ItemMaster = await GeitemMaster()
    if (ItemMaster.status === 1) {
      setitemMasterDropdown(ItemMaster.responseValue.map(Items => ({
        value : Items.id,
        label : Items.itemName
      })))
    }

    let ResponsePerson = await GetAccessName();
    if (ResponsePerson.status === 1){
      setResponsinlePersonTable(ResponsePerson.responseValue.map(Person=>({
        value : Person.id,
        label: Person.name
      })))
    }
  }

  const handlerChange = (e) => {
    document.getElementById('errSerialNumber').style.display = 'none';
    document.getElementById('errDescription').style.display = 'none';
   

    const { name, value } = e.target
    if (name === 'SerialNumber') {
      setSerialNumber(value);
    };
    if (name === 'equipmentDescription') {
      setequipmentDescription(value);
    };
 
  };

  const handleSelectChange = (selectedOption, errorElementId, setSelectedFunction) => {
    document.getElementById(errorElementId).style.display = 'none';
    setSelectedFunction(selectedOption);
};


  const handleSave = async () => {

    if (SerialNumber.trim() === '' || SerialNumber === null || SerialNumber === undefined) {
      document.getElementById('errSerialNumber').innerHTML = 'Please Enter Serial Number';
      document.getElementById('errSerialNumber').style.display = 'block';
    }
    else if (Selectedcategory === null ) {
      document.getElementById('errItemcategoryName').innerHTML = 'Please Select Item Category';
      document.getElementById('errItemcategoryName').style.display = 'block';
    }
    else if (SelectedItemMaster === null ) {
      document.getElementById('errItemMaster').innerHTML = 'Please Select Item Name';
      document.getElementById('errItemMaster').style.display = 'block';
    }
    else if (SelectedResponsiblePerson === null ) {
      document.getElementById('errResponsible').innerHTML = 'Please Responsible Person';
      document.getElementById('errResponsible').style.display = 'block';
    }
    else if (equipmentDescription.trim() === '' || equipmentDescription === null || equipmentDescription === undefined) {
      document.getElementById('errDescription').innerHTML = 'Please Enter Description';
      document.getElementById('errDescription').style.display = 'block';
    }
    else {
      

      const obj = {
        itemMasterID: SelectedItemMaster.value,
        responsiblepersonID: SelectedResponsiblePerson.value,
        serialNumber: SerialNumber,
        itemCategoryID: Selectedcategory.value,
        equipmentDescription: equipmentDescription,
        userId: userID
      };
     
      let data = await PostEquipmentMaster(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully!");
        getEquipmentMaster();
        setNewlyAddedRowIndex(0);
        setTimeout(() => {
          setShowToster(0);
          setNewlyAddedRowIndex(null);
          handleClear();
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
  let handleClear = () => {
    document.getElementById('errSerialNumber').style.display = 'none';
    document.getElementById('errDescription').style.display = 'none';
    setSerialNumber('');
    setequipmentDescription('');
    setSelectedItemMaster(null)
    setSelectedcategory(null)
   setSelectedResponsiblePerson(null)
  };
  const getEquipmentMaster = async () => {
    setShowLoder(1);
    let data = await GetEquipmentMaster();
    if (data.status === 1) {
      setShowLoder(0);
  
      setEquipmentMasterTable(data.responseValue)
    }
    else {
      document.getElementById('errorResponse').innerHTML = data.responseValue;
      document.getElementById('errorResponse').style.display = "block";
    }
  };


   const edit = async (data, index) => {

    document.getElementById('errSerialNumber').style.display = 'none';
    document.getElementById('errDescription').style.display = 'none';
    setIsUpdateBtnShow(true);
    setRowID(data.id);
    setSerialNumber(data.serialNumber);
    setSelectedcategory({
   value : data.itemCategoryID,
    label : data.categoryName
    })
    setSelectedResponsiblePerson({
      value : data.responsiblepersonID,
      label : data.responsiblepersonName
    })
    setequipmentDescription(data.equipmentDescription);
    setSelectedItemMaster({
      value : data.itemMasterID,
      label : data.itemName,
    })
    setNewlyAddedRowIndex(index)
  };

  const handleUpdate = async () => {
    if (SerialNumber.trim() === '' || SerialNumber === null || SerialNumber === undefined) {
      document.getElementById('errSerialNumber').innerHTML = 'Please Enter Category Name';
      document.getElementById('errSerialNumber').style.display = 'block';
    }
    else if (Selectedcategory === null ) {
      document.getElementById('errItemcategoryName').innerHTML = 'Please Select Item Category'
      document.getElementById('errItemcategoryName').style.display = 'block';
    }
    else if (SelectedItemMaster === null ) {
      document.getElementById('errItemMaster').innerHTML = 'Please Select Item Name';
      document.getElementById('errItemMaster').style.display = 'block';
    }
    else if (SelectedResponsiblePerson === null ) {
      document.getElementById('errResponsible').innerHTML = 'Please Responsible Person';
      document.getElementById('errResponsible').style.display = 'block';
    }
    else if (equipmentDescription.trim() === '' || equipmentDescription === null || equipmentDescription === undefined) {
      document.getElementById('errDescription').innerHTML = 'Please Enter Description';
      document.getElementById('errDescription').style.display = 'block';
    }
    else {
      
      const obj = {
        id: rowID,
        itemMasterID: SelectedItemMaster.value,
        responsiblepersonID: SelectedResponsiblePerson.value,
        serialNumber: SerialNumber,
        itemCategoryID: Selectedcategory.value,
        equipmentDescription: equipmentDescription,
        userId: userID,
      };

      let data = await PutEquipmentMaster(obj);
      if (data.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Updated Successfully!");
        getEquipmentMaster();
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
 

    const obj = {
      id: rowID,
      userId: userID
    };
    let data = await DeleteEquipmentMaster(obj);

    if (data.status === 1) {
      setShowUnderProcess(0);
      setTosterValue(0);
      setShowToster(1);
      setTosterMessage("Data Deleted Successfully!!");
      setNewlyAddedRowIndex(false);
      setIsUpdateBtnShow(false)
      getEquipmentMaster();
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



  let handleCancel = async () => {
    handleClear()
    setIsUpdateBtnShow(0)
    setEditRowIndex(null)
    setNewlyAddedRowIndex(null);
  }
  useEffect(() => {
    Dropdown();
    getEquipmentMaster();
  }, []);


 

  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box">
                <div className="title">{t("Equipment_Master")}</div>
                <div className="inner-content">

                  <div className='row'>
               

                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("SerialNumber")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm " name="SerialNumber" value={SerialNumber} placeholder={t("Enter_Serial_Number")} onChange={handlerChange} />
                          <small id="errSerialNumber" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>

                           <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                           <label htmlFor="ddlitemmaster" className="form-label">{t("Item_Category")}<span className="starMandatory">*</span></label>
                           <Select value={Selectedcategory} placeholder={t("Choose_Item_Category")} options={ItemCategoryTable} className="create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption=> handleSelectChange(selectedOption, "errItemcategoryName", setSelectedcategory)} />
                           <small id="errItemcategoryName" className="form-text text-danger" style={{ display: 'none' }}></small> 
                           </div>


                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                           <label htmlFor="ddlitemmaster" className="form-label">{t("ItemName")}<span className="starMandatory">*</span></label>
                           <Select value={SelectedItemMaster} placeholder={t("Choose_Item_Name")} options={itemMasterDropdown} className=" create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption=> handleSelectChange(selectedOption, "errItemMaster", setSelectedItemMaster)} />
                           <small id="errItemMaster" className="form-text text-danger" style={{ display: 'none' }}></small> 
                           </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                           <label htmlFor="ddlitemmaster" className="form-label">{t("Responsible_Person")}<span className="starMandatory">*</span></label>
                           <Select value={SelectedResponsiblePerson} placeholder={t("Choose_Responsible_Person")} options={ResponsinlePersonTable} className=" create-select" id="itemcategory" isSearchable={isSearchable} isClearable={isClearable} onChange={selectedOption=> handleSelectChange(selectedOption, "errResponsible", setSelectedResponsiblePerson)} />
                           <small id="errResponsible" className="form-text text-danger" style={{ display: 'none' }}></small> 
                           </div>


                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3">
                          <label htmlFor="Code" className="form-label">{t("Description")}<span className="starMandatory">*</span></label>
                          <input type="text" className="form-control form-control-sm" name="equipmentDescription" value={equipmentDescription} placeholder={t("Enter_Description")} onChange={handlerChange} />
                          <small id="errDescription" className="form-text text-danger" style={{ display: 'none' }}></small>
                        </div>



                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 mb-3 relative">
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
            <div className="col-12 mt-3">
              <div className="med-table-section" style={{ "height": "80vh" }}>
                <table className="med-table border_ striped">
                  <thead style={{zIndex:'0'}}>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>{t("#")}</th>
                      <th>{t("SerialNumber")}</th>
                      <th>{t("Item_Category")}</th>
                      <th>{t("ItemName")}</th>
                      <th>{t("Responsible_Person")}</th>
                      <th>{t("Description")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {EquipmentMasterTable && EquipmentMasterTable.map((list, index) => {
                      const isNewRow = newlyAddedRowIndex === index;
                      const isEditing = index === editRowIndex;
                      return (
                        <tr className={isNewRow ? 'new-row' : ''} key={index}  >
                          <td className="text-center">{index + 1}</td>
                          <td>{list.serialNumber}</td>
                          <td>{list.categoryName}</td>
                          <td>{list.itemName}</td>
                          <td>{list.responsiblepersonName}</td>
                          <td>{list.equipmentDescription}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className={isEditing ? 'edited-row' : ''} alt='' onClick={() => { edit(list, index) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowID(list.id, index) }} />
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
