import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationLanguageConversionMaster from '../../../Validation/Admin/Master/ValidationLanguageConversionMaster'
import GetLanguageMaster from '../../Api/Master/LanguageMaster/GetLanguageMaster';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import GetLanguageConversionMaster from '../../Api/Master/LanguageConversionMasterAPI/GetLanguageConversionMaster'
import PostLanguageConversionMaster from '../../Api/Master/LanguageConversionMasterAPI/PostLanguageConversionMaster'
import DeleteLanguageConversionMaster from '../../Api/Master/LanguageConversionMasterAPI/DeleteLanguageConversionMaster'
import PutLanguageConversionMaster from '../../Api/Master/LanguageConversionMasterAPI/PutLanguageConversionMaster'
import GetTableMaster from '../../Api/Master/TableMasterAPI/GetTableMaster'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import GetTableMasterById from '../../Api/Master/TableMasterAPI/GetTableMasterById'
import Search from '../../../Code/Serach'
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";


export default function LanguageConversionMaster() {

  let [languageConversionList, setLanguageConversionList] = useState([])
  let [tableMasterList, setTableMasterList] = useState([])
  let [languageMasterList, setLanguageMasterList] = useState([])
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');
  let [tableId, setTableId] = useState('');
  let [apiUrl, setApiUrl] = useState('');
  let [apiUrlData, setApiUrlData] = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editTableMasterList, setEditTableMasterList] = useState("")
  let [editLanguageMasterList, setEditLanguageMasterList] = useState("")
  let [editTableRowIdList, setEditTableRowIdList] = useState("")
  const {t} = useTranslation();
  document.body.dir = i18n.dir();


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationLanguageConversionMaster(sendForm.tableId, sendForm.tableRowId, sendForm.languageId, sendForm.languageText)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostLanguageConversionMaster(sendForm);
     
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
    let getResponse = await GetLanguageConversionMaster();
    let getItemResponse = await GetTableMaster();
    let getUnitResponse = await GetLanguageMaster();
  
    if (getResponse.status === 1) {
      setLanguageConversionList(getResponse.responseValue)
    }
    if (getItemResponse.status === 1) {
      setTableMasterList(getItemResponse.responseValue)
    }
    if (getUnitResponse.status === 1) {
      setLanguageMasterList(getUnitResponse.responseValue)
    }

  }
  let funcTableId = async (ids) => {
    setTableId(tableId)
    const id = tableId !== "" ? tableId : ids
   
    let apiUrl = ""
    let tableData = await GetTableMasterById(id);
    
    if (tableData.status === 1) {
      const tableDataById = tableData.responseValue[0];
      
      apiUrl = tableDataById.apiUrl;
      setApiUrl(apiUrl)
     
    }
    else {
      setApiUrl(0)
    
    }

    const apiUrlD = apiUrl;
    const response = await fetch(apiUrlD);

   
    if (response.ok) {
      const data = await response.json(); // Assuming the response is in JSON format
      
      const apiUrlData = data.responseValue;
      if (apiUrlData != 0) {
        setApiUrlData(apiUrlData)
      }
      else {
        
      }

      // console.log("departmentName", departmentName);
      // setApiUrlData(data)
    }

  }




  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setTableId(e.target.value)
    setEditTableMasterList("")
    setEditLanguageMasterList("")
    setEditTableRowIdList("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))

    if (name === "tableId") {
      funcTableId(e.target.value);

    }
   
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
    let response = await DeleteLanguageConversionMaster(obj)
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
  let handleUpdate = async (id, tableId, tableRowId, languageId, languageText, userId, language, tableName) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "tableId": tableId,
      "tableRowId": tableRowId,
      "languageId": languageId,
      "languageText": languageText,
      "userId": userId

    }))
    setEditTableMasterList(tableName)
    setEditLanguageMasterList(language)
    setEditTableRowIdList(tableRowId)

    document.getElementById("languageText").value = languageText;
    // document.getElementById("tableRowId").value = tableRowId;

  }

  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationLanguageConversionMaster(sendForm.languageText, sendForm.tableRowId, sendForm.languageId, sendForm.languageText)
    
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutLanguageConversionMaster(sendForm)
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
    setEditTableMasterList(0)
    setEditLanguageMasterList(0)
    setEditTableRowIdList(0)

    document.getElementById("languageText").value = '';
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
              <Heading text={t("Language_Conversion_Master")} />
              <BoxContainer>



                <div className="mb-2 me-2 drpWithSearch" style={{ maxWidth: '200px' }}>
                  <label htmlFor="tableId" className="form-label"> {t("TableName")} <span className="starMandatory">*</span></label>

                  {tableMasterList && <DropdownWithSearch defaulNname="Select" name="tableId" list={tableMasterList} valueName="id" displayName="tableName" editdata={editTableMasterList} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="tableRowId" className="form-label"> {t("Table_Data")} <span className="starMandatory">*</span></label>

                  {apiUrlData && <DropdownWithSearch defaulNname="Select" name="tableRowId" list={apiUrlData} valueName="id" displayName="textTitle" editdata={editTableRowIdList} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="languageId" className="form-label"> {t("Language_Name")} <span className="starMandatory">*</span></label>

                  {languageMasterList && <DropdownWithSearch defaulNname="Select" name="languageId" list={languageMasterList} valueName="id" displayName="language" editdata={editLanguageMasterList} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>


                <div className="mb-2 me-2">
                  <label htmlFor="languageText" className="form-label">{t("Language_Text")} <span class="starMandatory">*</span></label>
                  <input type='text' className="form-control form-control-sm" id='languageText' name='languageText' onChange={handleChange} placeholder={t("Enter_multiplied_by")} />
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
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveForm}>{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>{t("Clear")}</button>
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
              <Heading text={t("Language_Conversion_List")} />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th> {t("TableName")}</th>
                      {/* <th>Department Name Id</th> */}
                      <th>{t("Language")}</th>
                      <th>{t("Language_Text")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {languageConversionList && languageConversionList.map((key, ind) => {
                      return (
                        <tr value={key.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{key.tableName}</td>
                          {/* <td>{key.tableRowId}</td> */}
                          <td>{key.language}</td>
                          <td>{key.languageText}</td>
                          <td>
                            <div className="action-button">
                              {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={IconEdit} onClick={() => { handleUpdate(key.id, key.tableId, key.tableRowId, key.languageId, key.languageText, key.userId, key.language, key.tableName) }} alt='' /></div> */}
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
