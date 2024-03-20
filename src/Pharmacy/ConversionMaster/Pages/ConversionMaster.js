import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationConversionMaster from '../../../Validation/Pharmacy/ValidationConversionMaster'
import GetUnitMaster from '../../UnitMaster/API/GetUnitMaster';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import GetConversionMaster from '../API/GetConversionMaster'
import PostConversionMaster from '../API/PostConversionMaster'
import DeleteConversionMaster from '../API/DeleteConversionMaster'
import PutConversionMaster from '../API/PutConversionMaster'
import GetKnowmedItems from '../../Purchase/API/GetKnowmedItems'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import clearIcon from '../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';


export default function ConversionMaster() {
  
  const {t} = useTranslation();
  document.body.dir = i18n.dir();

  let [conversionData, setConversionData] = useState()
//   let [conversionMainData, setConversionMainData] = useState()
  let [itemList, setItemList] = useState()
  let [unitList, setUnitList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editItem, setEditItem] = useState("")
  let [editUnit, setEditUnit] = useState("")
  let [editConversionUnit, setEditConversionUnit] = useState("")
  let [editParameterValue, setEditparameterValue] = useState("")

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationConversionMaster(sendForm.productId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostConversionMaster(sendForm);
    
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Save SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

        handleClear();
        getdata()

      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(response.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
      getdata()
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Field can't be blank!")
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
  }

  //Get data
  let getdata = async () => {
    let getResponse = await GetConversionMaster();
    let getItemResponse = await GetKnowmedItems();
    let getUnitResponse = await GetUnitMaster();
  

    if (getResponse.status === 1) {
      setConversionData(getResponse.responseValue)
    //   setConversionMainData(getResponse.responseValue)
    }
    if (getItemResponse.status === 1) {
        setItemList(getItemResponse.responseValue)
      }
      if (getUnitResponse.status === 1) {
        setUnitList(getUnitResponse.responseValue.table)
      }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditItem("")
    setEditUnit("")
    setEditConversionUnit("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }

//   let handleSearch = (e) => {
//     let resp = Search(conversionMainData, e.target.value)
//     if (e.target.value !== "") {
//       if (resp.length !== 0) {
//         setConversionData(resp)
//       }
//       else {
//         setConversionData([])

//       }
//     }
//     else {
//         setConversionData(conversionMainData)
//     }
//   }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let obj = {
      id: rowId
    }
    let response = await DeleteConversionMaster(obj)
    if (response.status === 1) {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Data Deleted SuccessFully!")
      setTosterValue(0)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
      getdata()
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage(response.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
  }

  //Handle Button Change
  let handleUpdate = async (id, productId, unitID,  conversionUnitId, multipliedBy, userId,   unitName, convertedUnit ) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "productId": productId,
      "unitID": unitID,
      
      "conversionUnitId": conversionUnitId,
     
      "multipliedBy": multipliedBy,
      "userId": userId

    }))
    setEditItem(productId)
    setEditUnit(unitName)
    setEditConversionUnit(convertedUnit)
    // document.getElementById("productId").value = productId;
    // document.getElementById("unitID").value = unitID;
    // document.getElementById("conversionUnitId").value = conversionUnitId;
    document.getElementById("multipliedBy").value = multipliedBy;
    

  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationConversionMaster(sendForm.productId)
   
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutConversionMaster(sendForm)
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Updated SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

        setUpdateBool(0)
        getdata()
        handleClear();
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(response.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }

    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Field can't be blank!")
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
  }

  //Handle Clear
  let handleClear = (value) => {
    setSendForm({ "userId": window.userId })
    setClearDropdown(value)
    setEditItem(0)
    setEditUnit(0)
    setEditConversionUnit(0)
    
    document.getElementById("multipliedBy").value = '';
    setUpdateBool(0)
  }
  useEffect(() => {
    getdata()
  }, [])
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Conversion_Unit_Master")} />
              <BoxContainer>



              <div className="mb-2 me-2 drpWithSearch" style={{ maxWidth: '200px' }}>
                  <label htmlFor="productId" className="form-label"> {t("ItemName")} <span className="starMandatory">*</span></label>

                  {itemList && <DropdownWithSearch defaulNname="Select Item" name="productId" list={itemList} valueName="id" displayName="brandName" editdata={editItem} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="unitId" className="form-label"> {t("Unit_Name")} <span className="starMandatory">*</span></label>

                  {unitList && <DropdownWithSearch defaulNname={t("Select Unit")} name="unitId" list={unitList} valueName="id" displayName="unitName" editdata={editUnit} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="conversionUnitId" className="form-label"> {t("Conversion_Unit_Name")} <span className="starMandatory">*</span></label>

                  {unitList && <DropdownWithSearch defaulNname={t("Select Unit")}  name="conversionUnitId" list={unitList} valueName="id" displayName="unitName" editdata={editConversionUnit} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="multipliedBy" className="form-label">{t("MultipliedBy")}<span class="starMandatory">*</span></label>
                  <input type='number' className="form-control form-control-sm" id='multipliedBy' name='multipliedBy' onChange={handleChange} placeholder={t("Enter_multiplied_by")} />
                </div>




                <div className="mb-2 relative">
                  <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div>
                    {showUnderProcess === 1 ? <TosterUnderProcess /> :
                      <>
                        {showToster === 1 ?
                          <Toster value={tosterValue} message={tosterMessage} />

                          : <div>
                            {updateBool === 0 ?
                              <>
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("Update")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
                              </>
                            }
                          </div>}
                      </>
                    }
                  </div>
                </div>
              </BoxContainer>
            </div>
            <div className="col-12 mt-2">
            <Heading text={t("Conversion_Unit_List")} />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th> {t("ItemName")}</th>
                      <th>{t("Unit_Name")}</th>
                      <th>{t("Converted_Unit_Name")}</th>
                      <th>{t("MultipliedBy")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {conversionData && conversionData.map((key, ind) => {
                      return (
                        <tr value={key.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{key.brandName}</td>
                          <td>{key.unitName}</td>
                          <td>{key.convertedUnit}</td>
                          <td>{key.multipliedBy}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(key.id, key.productId, key.unitID,  key.conversionUnitId,  key.multipliedBy,  key.userId,   key.unitName, key.convertedUnit ) }} alt='' /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </TableContainer>
                {/* -----------------------Start Delete Modal Popup-------------------   */}

                {/*  <!-- Modal -->  */}
                <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                  <div class="modal-dialog modalDelete">
                    <div class="modal-content">

                      <div class="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i class="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                        <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                      </div>
                      <div class="modal-footer1 text-center">

                        <button type="button" class="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                        <button type="button" class="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}
