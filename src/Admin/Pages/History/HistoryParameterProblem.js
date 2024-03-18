import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import ValidationHistoryParameterProblem from '../../../Validation/Admin/Master/ValidationHistoryParameterProblem';
import PostHistoryParameterProblem from '../../Api/Master/HistoryParameterProblemAPI/PostHistoryParameterProblem'
import GetHistoryParameterProblem from '../../Api/Master/HistoryParameterProblemAPI/GetHistoryParameterProblem'
import DeleteHistoryParameterProblem from '../../Api/Master/HistoryParameterProblemAPI/DeleteHistoryParameterProblem';
import PutHistoryParameterProblem from '../../Api/Master/HistoryParameterProblemAPI/PutHistoryParameterProblem';
import GetStatusMaster from '../../Api/Master/StatusMaster/GetStatusMaster'
import GetHistorySubCategory from '../../../SuperAdmin/Api/Master/HistorySubCategory/GetHistorySubCategory'
import GetHistoryParameterMaster from '../../../SuperAdmin/Api/Master/HistoryParameterMaster/GetHistoryParameterMaster'
import GetProblemList from '../../../Clinical/API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import RemoveDuplicateData from '../../../Code/RemoveDuplicateData';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";



export default function HistoryParameterProblem() {
  let [historyParameterProblemList, setHistoryParameterProblemList] = useState()
  let [parameterList, setParameterList] = useState()
  let [subCategoryList, setSubCategoryList] = useState()
  let [parameterValueList, setParameterValueList] = useState()
  let [problemList, setProblemList] = useState()
  let [updateBool, setUpdateBool] = useState(0)
  let [sendForm, setSendForm] = useState({ "userId": window.userId })
  let [loder, setLoder] = useState(1)
  let [rowId, setRowId] = useState('');

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0)
  let [clearDropdown, setClearDropdown] = useState(0)
  let [editProblem, setEditProblem] = useState("")
  let [editParameterName, setEditParameterName] = useState("")
  let [editSubCategory, setEditSubCategory] = useState("")
  let [editParameterValue, setEditParameterValue] = useState("")
  const {t} = useTranslation();


  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationHistoryParameterProblem(sendForm.parameterId)
   
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostHistoryParameterProblem(sendForm);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Save SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

        handleClear(1);
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
    let getResponse = await GetHistoryParameterProblem();
    let getParameter = await GetHistoryParameterMaster();
    let getSubcategory = await GetHistorySubCategory();
    let getParameterValue = await GetStatusMaster();
    let getProblem = await GetProblemList();


    if (getResponse.status === 1) {
      // setLoder(0)
      setHistoryParameterProblemList(getResponse.responseValue)
      setParameterList(getParameter.responseValue)
      setSubCategoryList(getSubcategory.responseValue)
      // setParameterValueList(getParameterValue.responseValue) 

      let temp = RemoveDuplicateData(getParameterValue.responseValue, "module")
      setParameterValueList(temp)
      setProblemList(getProblem.responseValue)

    }

  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditParameterName("")
    setEditSubCategory("")
    setEditParameterValue("")
    setEditProblem("")
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }


  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1)
    let obj = {
      id: rowId
    }
    let response = await DeleteHistoryParameterProblem(obj)
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
  let handleUpdate = async (id, parameterId, subCategoryId, parameterValueID, problemID, userId, parameterName, subCategoryName, module, problemName) => {

    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "id": id,
      "parameterId": parameterId,
      "subCategoryId": subCategoryId,
      "parameterValueID": parameterValueID,
      "problemID": problemID,
      "userId": userId,

    }))
    setEditParameterName(parameterName)
    setEditSubCategory(subCategoryName)
    setEditParameterValue(module)
    setEditProblem(problemName)
    document.getElementById("parameterId").value = parameterId;
    document.getElementById("subCategoryId").value = subCategoryId;
    document.getElementById("parameterValueID").value = parameterValueID;
    document.getElementById("problemID").value = problemID;
  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationHistoryParameterProblem(sendForm.parameterId)

    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutHistoryParameterProblem(sendForm)
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
        handleClear(1);
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
    setEditParameterName("")
    setEditSubCategory("")
    setEditParameterValue("")
    setEditProblem("")
    // document.getElementById("parameterId").value = 0;
    // document.getElementById("subCategoryId").value = 0;
    // document.getElementById("parameterValueID").value = 0;
    // document.getElementById("problemID").value = 0;
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
            <div className="col-12">
              <Heading text={t("History_Parameter_Problem_Master")} />
              <BoxContainer>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="parameterId" className="form-label">{t("Parameter_Name")}<span className="starMandatory">*</span></label>
                
                  {parameterList && <DropdownWithSearch defaulNname={t("Select_Parameter_Name")}name="parameterId" list={parameterList} valueName="id" displayName="parameterName" editdata={editParameterName} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="subCategoryId" className="form-label">{t("Sub_Category_Name")} <span className="starMandatory">*</span></label>
                 
                  {subCategoryList && <DropdownWithSearch defaulNname={t("Select_Sub_Category")} name="subCategoryId" list={subCategoryList} valueName="id" displayName="subCategoryName" editdata={editSubCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="parameterValueID" className="form-label">{t("Parameter_Value_Name")}<span className="starMandatory">*</span></label>
                 
                  {parameterValueList && <DropdownWithSearch defaulNname={t("Select_Parameter_Value")} name="parameterValueID" list={parameterValueList} valueName="id" displayName="module" editdata={editParameterValue} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="problemID" className="form-label">{t("Problem")}<span className="starMandatory">*</span></label>
                 
                  {problemList && <DropdownWithSearch defaulNname={t("Select_Problem")} name="problemID" list={problemList} valueName="id" displayName="problemName" editdata={editProblem} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
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
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt='' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' />{t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}>{t("Cancel")}</button>
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
              <Heading text={t("History_Parameter_Problem_List")} />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Parameter_Name")}</th>
                      <th>{t("Sub_Category_Name")}</th>
                      <th>{t("Parameter_Value_Name")}</th>
                      <th>{t("Problem")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {historyParameterProblemList && historyParameterProblemList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.parameterName}</td>
                          <td>{val.subCategoryName}</td>
                          <td>{val.module}</td>
                          <td>{val.problemName}</td>
                          <td>
                            {/* <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><i className="fa fa-edit actionedit" onClick={() => { handleUpdate(val.id, val.parameterId, val.subCategoryId, val.parameterValueID, val.problemID, val.userId, val.parameterName, val.subCategoryName, val.module, val.problemName) }}></i></div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><i className="fa fa-trash actiondel" onClick={() => { setRowId(val.id) }}></i>
                              </div>
                            </div> */}
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.parameterId, val.subCategoryId, val.parameterValueID, val.problemID, val.userId, val.parameterName, val.subCategoryName, val.module, val.problemName) }}/></div>
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
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                  <div className="modal-dialog modalDelete">
                    <div className="modal-content">

                      <div className="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                         <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>
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
