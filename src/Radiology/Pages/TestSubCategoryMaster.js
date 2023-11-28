
import { useState,useEffect } from 'react';
import GetAllSubCategory from '../API/TestSubCategoryMaster/GET/GetAllSubCategory';
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import TableContainer from '../../Component/TableContainer';
import Loader from '../../Component/Loader';
import SuccessToster from '../../Component/SuccessToster';
import AlertToster from '../../Component/AlertToster';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import PostSubCategoryMaster from '../API/TestSubCategoryMaster/POST/PostSubCategoryMaster';
import GetCategoryMaster from '../API/TestSubCategoryMaster/GET/GetCategoryMaster';
import DeleteSubCategoryMaster from '../API/TestSubCategoryMaster/DELETE/DeleteSubCategoryMaster';
import PutSubCategoryMaster from '../API/TestSubCategoryMaster/UPDATE/PutSubCategoryMaster';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function TestSubCategoryMaster() {
    let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [clearDropdown, setClearDropdown] = useState(0)
    let [updateBool, setUpdateBool] = useState(0);
    let [categoryMasterList, setCategoryMasterList] = useState([]);
    let [testSubCategoryMasterList, setTestSubCategoryMasterList] = useState([]);
    let [selectedCategory, setSelectedCategory] = useState('');
    let [subCategoryName, setSubCategoryName] = useState('');
    let [editCategory, setEditCategory] = useState('');
    let [rowID, setRowId] = useState(0);
    const { t } = useTranslation();

    
    let handleChange = (e) => {
        document.getElementById('errCategory').style.display="none";
        document.getElementById('errSubCategoryName').style.display="none";
        const name = e.target.name;
        const value = e.target.value;
        if(name === "ddlCategory"){
          setEditCategory(e.target.selectedName)
            setSelectedCategory(value)
        }
        if(name === "subCategoryName"){
            setSubCategoryName(value);
        
        }
    } 

    let getAllTestCategoryList=async()=>{
        const response = await GetAllSubCategory();
        if(response.status===1){
            setTestSubCategoryMasterList(response.responseValue);
        }
    }
    let getCategoryList=async()=>{
        const response = await GetCategoryMaster();
        if(response.status===1){
            setCategoryMasterList(response.responseValue);
        }
    }


    let handlerSave = async () => {
        
        if(selectedCategory === '' || selectedCategory === 0 || selectedCategory === undefined || selectedCategory === null){
          document.getElementById('errCategory').innerHTML="Please Select Category";
          document.getElementById('errCategory').style.display="block";
        }
        else if(subCategoryName === '' || subCategoryName.trim() === "" || subCategoryName === undefined || subCategoryName === null){
          document.getElementById('errSubCategoryName').innerHTML="Please Fill SubCategory Name";
          document.getElementById('errSubCategoryName').style.display="block";
        }
        else{
           const obj ={
            categoryId:selectedCategory,
            subCategoryName:subCategoryName,
            userID:userID
           }
           setShowUnderProcess(1);
          const response = await PostSubCategoryMaster(obj);
         if (response.status === 1) {
             setShowUnderProcess(0);
             setTosterValue(0);
             setShowToster(1);
             setTosterMessage("Saved Successfully");
             setTimeout(() => {
                 setShowToster(0);
                 handleClear(1);
                 getAllTestCategoryList();
             }, 2000)
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
      }
      let handlerUpdate = async () => {
        if(selectedCategory === '' || selectedCategory === 0 || selectedCategory === undefined || selectedCategory === null){
            document.getElementById('errCategory').innerHTML="Please Select Category";
            document.getElementById('errCategory').style.display="block";
          }
          else if(subCategoryName === '' || subCategoryName.trim() === "" || subCategoryName === undefined || subCategoryName === null){
            document.getElementById('errSubCategoryName').innerHTML="Please Fill SubCategory Name";
            document.getElementById('errSubCategoryName').style.display="block";
          }
        else{
           const obj ={
            categoryId:selectedCategory,
            categoryName:selectedCategory,
            subCategoryName:subCategoryName,
            userID:userID,
            key:rowID
           }
           setShowUnderProcess(1);
          const response = await PutSubCategoryMaster(obj);
         if (response.status === 1) {
             setShowUnderProcess(0);
             setTosterValue(0);
             setShowToster(1);
             setTosterMessage("Updated Successfully");
             setTimeout(() => {
                 setShowToster(0);
                 handleClear(1);
                 getAllTestCategoryList();
             }, 2000)
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
      }
      let handleDelete = async()=>{
        setShowLoder(0);
        const response = await DeleteSubCategoryMaster(rowID);
        if(response.status === 1){
          setisShowToaster(1);
          setShowSuccessMsg('SubCategory Deleted Successfully..!!');
          
          setTimeout(() => {
              setisShowToaster(0);
              getAllTestCategoryList();
          }, 2000)
        }
        else{
            setShowLoder(0);
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
        }
      }
      let handleClear = (value) => {
        setRowId(0);
        setUpdateBool(0);
        setClearDropdown(value);
        setSubCategoryName('');
        setSelectedCategory('');
        setEditCategory('');
        document.getElementById('errCategory').style.display="none";
        document.getElementById('errSubCategoryName').style.display="none";
      }


      let handleEdit = (params) => {
        setEditCategory(params.categoryName);
        setSelectedCategory(params.categoryId);
        setSubCategoryName(params.subCategoryName);
        setRowId(params.id);
        setUpdateBool(1);
      }


  useEffect(()=>{
    getAllTestCategoryList();
    getCategoryList();
  },[]);
  document.body.dir = i18n.dir();
  return (
    <>
        <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Sub_Category_Master")} />
              <BoxContainer>
                <div className="mb-2 me-2">
                  <label htmlFor="SampleId" className="form-label">{t("Category")} <span className="starMandatory">*</span></label>

                  {categoryMasterList && 
                   <DropdownWithSearch defaulNname={t("Select_Category")} name="ddlCategory" list={categoryMasterList} valueName="id" displayName="categoryName" editdata={editCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                  }
                  <small id="errCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                    <div className="mb-2 me-2">
                  <label htmlFor="TestName" className="form-label">{t("Sub_Category_Name")} <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" name="subCategoryName" id="subCategoryName" value={subCategoryName} onChange={handleChange} placeholder={t("Enter_Sub_Category_Name")} />
                  <small id="errSubCategoryName" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={()=>{handleClear(1)}}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                              </>
                              :
                              <>
                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>{t("Update")}</button>
                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={()=>{handleClear(1)}}>{t("Cancel")}</button>
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
              <Heading text={t("All_Test_List")} />
              <div className="med-table-section" style={{ "height": "75vh" }}>
                <TableContainer>
                  <thead>
                    <tr>
                      <th className="text-center" style={{ "width": "5%" }}>#</th>
                      <th>{t("Category_Name")}</th>
                      <th>{t("Sub_Category_Name")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {testSubCategoryMasterList && testSubCategoryMasterList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.categoryName}</td>
                          <td>{val.subCategoryName}</td>
                          <td>
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => {handleEdit(val)}} /></div>
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
                        <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">{t("Delete")}</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

              </div>
            </div>
          </div>
        </div>
        {
                    showLoder === 1 ? <Loader val={showLoder} /> : ""
                }
                {/* Toaster */}
                {
                    isShowToaster === 1 ?
                        <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
                }
               
                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
                }
      </section>
    </>
  )
}
