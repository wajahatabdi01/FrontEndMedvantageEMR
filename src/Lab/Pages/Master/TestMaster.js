import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import GetCategoryMaster from '../../../Lab/Api/CategoryMaster/GetCategoryMaster'
import ValidationTestMaster from '../../../Validation/LabService/ValidationTestMaster';
import PostTestMaster from '../../Api/TestMaster/PostTestMaster';
import GetTestMaster from '../../Api/TestMaster/GetTestMaster';
import DeleteTestMaster from '../../Api/TestMaster/DeleteTestMaster';
import GetSampleMaster from '../../Api/SampleMaster/GetSampleMaster';
import GetItemMaster from '../../Api/ItemMaster/GetItemMaster';
import GetTestInstruction from '../../Api/TestInstruction/GetTestInstruction';
import PutTestMaster from '../../Api/TestMaster/PutTestMaster';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import GetSubCategoryMaster from '../../Api/SubCategoryMaster/GetSubCategoryMaster';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function TestMaster() {

  let [testList, setTestList] = useState()
  let [categoryList, setCategoryList] = useState()
  let [subCategoryList, setSubCategoryList] = useState()
  let [itemList, setItemList] = useState()
  let [sampleList, setSampleList] = useState()
  let [instructionList, setInstructionList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('')

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  const { t } = useTranslation();

    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;
  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationTestMaster(sendForm.TestName, sendForm.CategoryId, sendForm.subCategoryId, sendForm.SampleId, sendForm.ItemId, sendForm.InstructionId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostTestMaster(sendForm.TestName, sendForm.CategoryId, sendForm.subCategoryId, sendForm.SampleId, sendForm.ItemId, sendForm.InstructionId,clientID,userID);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Save SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

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
    let getResponse = await GetTestMaster(clientID);
    let getCategory = await GetCategoryMaster(clientID);
    let getItem = await GetItemMaster();  // to chec client id in api
    let getSample = await GetSampleMaster(clientID);
    let getInstruction = await GetTestInstruction(clientID);
    let getsubCategory = await GetSubCategoryMaster(clientID);


    if (getResponse.status === 1) {
      // setLoder(0)
      setTestList(getResponse.responseValue)
      setItemList(getItem.responseValue)
      setCategoryList(getCategory.responseValue)

      // console.table(getItem.responseValue)
      setSampleList(getSample.responseValue)

      setInstructionList(getInstruction.responseValue)
      setSubCategoryList(getsubCategory.responseValue)

    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let response = await DeleteTestMaster(rowId)
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
  let handleUpdate = async (id, testname, categoryId, subCategoryId, itemId, sampleId, instructionId, userId) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "Id": id,
      "TestName": testname,
      "CategoryId": categoryId,
      "subCategoryId": subCategoryId,
      "ItemId": itemId,
      "SampleId": sampleId,
      "InstructionId": instructionId,
      "UserId": userId,
    }))
  

    document.getElementById("TestName").value = testname;
    document.getElementById("CategoryId").value = categoryId;
    document.getElementById("subCategoryId").value = subCategoryId;
    document.getElementById("ItemId").value = itemId;
    document.getElementById("SampleId").value = sampleId;
    document.getElementById("InstructionId").value = instructionId;
    //document.getElementById("UserId").value = userId;
  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationTestMaster(sendForm.TestName, sendForm.CategoryId, sendForm.subCategoryId, sendForm.SampleId, sendForm.ItemId, sendForm.InstructionId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutTestMaster(sendForm.TestName, sendForm.CategoryId, sendForm.subCategoryId, sendForm.SampleId, sendForm.ItemId, sendForm.InstructionId, sendForm.Id,userID)
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
  let handleClear = () => {
    setSendForm({ "userId": window.userId })
    document.getElementById("TestName").value = "";
    document.getElementById("CategoryId").value = 0;
    document.getElementById("ItemId").value = 0;
    document.getElementById("InstructionId").value = 0;
    document.getElementById("SampleId").value = 0;
    document.getElementById("subCategoryId").value = 0;
    setUpdateBool(0)
  }
  useEffect(() => {
    getdata()
  }, [])
  document.body.dir = i18n.dir();
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
          <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Test_Master")}</div></div></div>
            <div className="col-12">
            
            <div class="inner-content">
              <div className='dflex regEqualColums whitebg paddingcustom'>

                <div className="col-2 mb-2 me-2">
                  <label htmlFor="TestName" className="form-label">{t("Test_Name")} <span className="starMandatory">*</span></label>
                  <input type="text" name="TestName" id="TestName" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Test_Name")}/>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="ItemId" className="form-label">{t("Item_Name")}<span className="starMandatory">*</span></label>
                  <select name='ItemId' id="ItemId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">{t("--select--")}</option>
                    {itemList && itemList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.itemName}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="CategoryId" className="form-label">{t("Category")} <span className="starMandatory">*</span></label>
                  <select name='CategoryId' id="CategoryId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">{t("--select--")}</option>
                    {categoryList && categoryList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.categoryName}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="subCategoryId" className="form-label">{t("Sub_Category")} <span className="starMandatory">*</span></label>
                  <select name='subCategoryId' id="subCategoryId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">{t("--select--")}</option>
                    {subCategoryList && subCategoryList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.subCategoryName}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="SampleId" className="form-label">{t("Sample")} <span className="starMandatory">*</span></label>
                  <select name='SampleId' id="SampleId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                    <option value="0">{t("--select--")}</option>

                    {sampleList && sampleList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.sampleName}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="InstructionId" className="form-label">{t("Test_Instruction")} <span className="starMandatory">*</span></label>
                  <select name='InstructionId' id="InstructionId" onChange={handleChange} className="form-select form-select-sm"  aria-label=".form-select-sm example">
                    <option value="0">{t("--select--")}</option>
                    {instructionList && instructionList.map((val, index) => {
                      return (
                        <option value={val.id}>{val.instructions}</option>
                      )
                    })}
                  </select>
                </div>

                <div className="col-2 mb-2 relative">
                  <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                  <div>
                    {showUnderProcess === 1 ? <TosterUnderProcess /> :
                      <>
                        {showToster === 1 ?
                          <Toster value={tosterValue} message={tosterMessage} />

                          : <div className='textmbtn'>
                            {updateBool === 0 ?
                              <>
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1" onClick={saveUpdate}>{t("Update")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
                              </>
                            }
                          </div>}
                      </>
                    }
                  </div>
                </div>
              </div>
              </div>
               
            </div>
            <div className="col-12 mt-1">
              <Heading text={t("All_Test_List")} />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("testNamePlaceholder")}</th>
                      <th>{t("ItemName")}</th>
                      <th>{t("Category_Name")}</th>
                      <th>{t("Sub_Category")}</th>
                      <th>{t("Sample")}</th>
                      <th>{t("Test_Instruction")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {testList && testList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.testname}</td>
                          <td>{val.itemName}</td>
                          <td>{val.categoryName}</td>
                          <td>{val.subCategoryName}</td>
                          <td>{val.sampleName}</td>
                          <td>{val.instructions}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.testname, val.categoryId, val.subCategoryId, val.itemId, val.sampleId, val.instructionId, val.userId) }} /></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}


                  </tbody>
                </TableContainer>
                {/* -----------------------Start Delete Modal Popup-------------------   */}

                {/*  <!-- Modal -->  */}
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
                        <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
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
