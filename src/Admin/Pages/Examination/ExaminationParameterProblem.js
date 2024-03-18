import React, { useState, useEffect } from 'react'
import TableContainer from '../../../Component/TableContainer';
import Heading from '../../../Component/Heading';
import BoxContainer from '../../../Component/BoxContainer';
import ValidationExaminationParameterProblem from '../../../Validation/Admin/Master/ValidationExaminationParameterProblem';
import PostExaminationParameterProblem from '../../Api/Master/ExaminationParameterProblemAPI/PostExaminationParameterProblem'
import GetExaminationParameterProblem from '../../Api/Master/ExaminationParameterProblemAPI/GetExaminationParameterProblem'
import DeleteExaminationParameterProblem from '../../Api/Master/ExaminationParameterProblemAPI/DeleteExaminationParameterProblem';
import PutExaminationParameterProblem from '../../Api/Master/ExaminationParameterProblemAPI/PutExaminationParameterProblem';
import GetStatusMaster from '../../Api/Master/StatusMaster/GetStatusMaster'
import GetExaminationSubCategory from '../../../SuperAdmin/Api/Master/ExaminationSubCategory/GetExaminationSubCategory'
import GetExaminationParameterMaster from '../../../SuperAdmin/Api/Master/ExaminationParameterMaster/GetExaminationParameterMaster'
import GetProblemList from '../../../Clinical/API/OPD/Prescription/KnowMedsAPI/GetProblemList'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import RemoveDuplicateData from '../../../Code/RemoveDuplicateData';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import Search from '../../../Code/Serach';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";



export default function ExaminationParameterProblem() {
  let [examinationParameterProblemList, setExaminationParameterProblemList] = useState()
  let [examinationParameterProblemListMain, setExaminationParameterProblemListMain] = useState()
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
  let [editParameter, setEditParameter] = useState("")
  let [editSubCategory, setEditSubCategory] = useState("")
  let [editParameterValue, setEditparameterValue] = useState("")

  const {t} = useTranslation();

  //Handle Save
  let saveForm = async () => {
    let valresponse = ValidationExaminationParameterProblem(sendForm.parameterId)
    
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PostExaminationParameterProblem(sendForm);
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
    let getResponse = await GetExaminationParameterProblem();
    let getParameter = await GetExaminationParameterMaster();
    let getSubcategory = await GetExaminationSubCategory();
    let getParameterValue = await GetStatusMaster();
    let getProblem = await GetProblemList();


    if (getResponse.status === 1) {
      // setLoder(0)
      setExaminationParameterProblemList(getResponse.responseValue)
      setExaminationParameterProblemListMain(getResponse.responseValue)
      setParameterList(getParameter.responseValue)
      setSubCategoryList(getSubcategory.responseValue)
      // setParameterValueList(getParameterValue.responseValue)
      let temp = RemoveDuplicateData(getParameterValue.responseValue, "module")
      setParameterValueList(temp)
      setProblemList(getProblem.responseValue)

    }
  }
  //Handle Search
  let handleSearch = (e) => {
    let resp = Search(examinationParameterProblemListMain, e.target.value)
    if (e.target.value !== "") {
      if (resp.length !== 0) {
        setExaminationParameterProblemList(resp)
      }
      else {
        setExaminationParameterProblemList([])

      }
    }
    else {
      setExaminationParameterProblemList(examinationParameterProblemListMain)
    }
  }
  //Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditParameter("")
    setEditSubCategory("")
    setEditparameterValue("")
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
    let response = await DeleteExaminationParameterProblem(obj)
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
    setEditParameter(parameterName)
    setEditSubCategory(subCategoryName)
    setEditparameterValue(module)
    setEditProblem(problemName)
    document.getElementById("parameterId").value = parameterId;
    document.getElementById("subCategoryId").value = subCategoryId;
    document.getElementById("parameterValueID").value = parameterValueID;
    document.getElementById("problemID").value = problemID;
  }



  // Handle Update
  let saveUpdate = async () => {
    let valresponse = ValidationExaminationParameterProblem(sendForm.parameterId)
  
    if (valresponse) {
      setShowUnderProcess(1)
      let response = await PutExaminationParameterProblem(sendForm)
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
    setEditParameter("")
    setEditSubCategory("")
    setEditparameterValue("")
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
              <Heading text= {t("Examination_Parameter_Problem_Master")} />
              <BoxContainer>

                <div className="mb-2 me-2" style={{ maxWidth: '200px' }}>
                  <label htmlFor="parameterId" className="form-label">{t("Select_Parameter_Name")}<span className="starMandatory">*</span></label>

                  {parameterList && <DropdownWithSearch defaulNname= {t("Select_Parameter")} name="parameterId" list={parameterList} valueName="id" displayName="parameterName" editdata={editParameter} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="subCategoryId" className="form-label">{t("Sub_Category_Name")}<span className="starMandatory">*</span></label>

                  {subCategoryList && <DropdownWithSearch defaulNname= {t("Select_Sub_Category")}  name="subCategoryId" list={subCategoryList} valueName="id" displayName="subCategoryName" editdata={editSubCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="parameterValueID" className="form-label">{t("Select_Parameter_Value_Name")}<span className="starMandatory">*</span></label>

                  {parameterValueList && <DropdownWithSearch defaulNname= {t("Select_Parameter_Value_Name")}  name="parameterValueID" list={parameterValueList} valueName="id" displayName="module" editdata={editParameterValue} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}

                </div>

                <div className="mb-2 me-2">
                  <label htmlFor="problemID" className="form-label">{t("Problem")}<span className="starMandatory">*</span></label>

                  {problemList && <DropdownWithSearch defaulNname= {t("Select Problem")} name="problemID" list={problemList} valueName="id" displayName="problemName" editdata={editProblem} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />}
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
                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' alt='' /> {t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}> {t("UPDATE")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear(1) }}> {t("Cancel")}</button>
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
              <div className='handlser'>
                <Heading text= {t("Examination_Parameter_Problem_List")} />
                <div style={{ position: 'relative' }}>
                  <input type="text" className='form-control form-control-sm' placeholder= {t("Search")} onChange={handleSearch} />
                  <span className="tblsericon"><i class="fas fa-search"></i></span>
                </div>
              </div>
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Parameter_Name")}</th>
                      <th> {t("Sub_Category_Name")}</th>
                      <th>{t("Parameter_Value_Name")}</th>
                      <th>{t("Problem")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {examinationParameterProblemList && examinationParameterProblemList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.parameterName}</td>
                          <td>{val.subCategoryName}</td>
                          <td>{val.module}</td>
                          <td>{val.problemName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.parameterId, val.subCategoryId, val.parameterValueID, val.problemID, val.userId, val.parameterName, val.subCategoryName, val.module, val.problemName) }} /></div>
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
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                                <div className='popDeleteContent'> {t("Are you sure you want to delete?")} </div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal"> {t("Cancel")} </button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal"> {t("Delete?")} </button>
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
