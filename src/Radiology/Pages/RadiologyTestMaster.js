import React from 'react'
import { useState } from 'react';
import GetTestMaster from '../API/TestMaster/GET/GetTestMaster';
import { useEffect } from 'react';
import Heading from '../../Component/Heading';
import BoxContainer from '../../Component/BoxContainer';
import DropdownWithSearch from '../../Component/DropdownWithSearch';
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import TableContainer from '../../Component/TableContainer';
import Loder from '../../Component/Loader';
import SuccessToster from '../../Component/SuccessToster';
import AlertToster from '../../Component/AlertToster';
import GetOrganList from '../API/OrganMaster/GET/GetOrganList';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import clearIcon from '../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../assets/images/icons/delete.svg';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import GetModalityMaster from '../API/ModalityMaster/GET/GetModalityMaster';
import GetCategoryMaster from '../API/TestMaster/GET/GetCategoryMaster';
import GetItemMaster from '../API/TestMaster/GET/GetItemMaster';
import GetSampleMaster from '../API/TestMaster/GET/GetSampleMaster';
import GetInstructionMaster from '../API/TestMaster/GET/GetInstructionMaster';
import DeleteTestMaster from '../API/TestMaster/DELETE/DeleteTestMaster';
import PostTestMaster from '../API/TestMaster/POST/PostTestMaster';
import UpdateTestMaster from '../API/TestMaster/UPDATE/UpdateTestMaster';
import GetAllSubCategory from '../API/TestSubCategoryMaster/GET/GetAllSubCategory';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";


export default function RadiologyTestMaster() {
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
    let [rowID, setRowId] = useState(0);
    let [testName,setTestName] = useState();
    let [testList,setTestList] = useState();
    let [modularityList, setModularityList] = useState([]);
    let [selectedModularity, setSelectedModularity] = useState('');
    let [organList, setOrganList] = useState([]);
    let [selectedOrgan, setSelectedOrgan] = useState('');
    let [categoryList,setCategoryList] = useState([]);
    let [selectedCategory, setSelectedCategory] = useState('');
    let [subcategoryList,setSubCategoryList] = useState([]);
    let [selectedSubCategory, setSubSelectedCategory] = useState('');
    let [itemList,setItemList] = useState([]);
    let [selectedItem, setSelectedItem] = useState('');
    let [sampleList,setSampleList] = useState([]);
    let [selectedSampleList, setSelectedSampleList] = useState('');
    let [instructionList,setInstructionList] = useState([]);
    let [selectedInstruction, setSelectedInstruction] = useState('');
    let [editOrgan, setEditOrgan] = useState('');
    let [editCategory, setEditCategory] = useState('');
    let [editSubCategory, setEditSubCategory] = useState('');
    let [editItem, setEditItem] = useState('');
    let [editSample, setEditSample] = useState('');
    let [editInstruction, setEditInstruction] = useState('');
    let [editModularity, setEditModularity] = useState('');
    const { t } = useTranslation();

    let handleChange = (e) => {
      document.getElementById('errTestName').style.display="none";
      document.getElementById('errOrgan').style.display="none";
      document.getElementById('errModularity').style.display="none";
      document.getElementById('errCategory').style.display="none";
      document.getElementById('errSubCategory').style.display="none";
      document.getElementById('errItem').style.display="none";
      document.getElementById('errSample').style.display="none";
      document.getElementById('errInstruction').style.display="none";
        const name = e.target.name;
        const value = e.target.value;
        if(name === "testName"){
          setTestName(value)
          
        }
        if(name === "ddlModularity"){
          setSelectedModularity(value)
          
        }
        if(name === "ddlOrgan"){
            setSelectedOrgan(value)
          
        }
        if(name === "ddlCategory"){
          setSelectedCategory(value)
          
        }
       
        if(name === "ddlSubCategory"){
          setSubSelectedCategory(value)
          
        }
        if(name === "ddlItem"){
          setSelectedItem(value);
         
        }
        if(name === "ddlSample"){
          setSelectedSampleList(value);
         
        }
        if(name === "ddlInstruction"){
          setSelectedInstruction(value);
         
        }
    } 
    
    let getTestList = async()=>{
      const response = await GetTestMaster();
      if(response.status===1){
        setTestList(response.responseValue);
      }
    }
    let getOrganList = async()=>{
      const response = await GetOrganList();
     
      if(response.status === 1){
        setOrganList(response.responseValue)
      }
    }
    let getAllTestCategoryList=async()=>{
      const response = await GetAllSubCategory();
      if(response.status===1){
        setSubCategoryList(response.responseValue);
      }
  }
    let getmodalityList= async ()=>{
      const response =await GetModalityMaster()
      if(response.status===1){
          setModularityList(response.responseValue)
      }
    }

    let getCategory =async()=>{
      const response= await GetCategoryMaster();
      if(response.status===1){
        setCategoryList(response.responseValue);
      }
    }

    let getItems =async()=>{
      const response = await GetItemMaster();
      if(response.status===1){
        setItemList(response.responseValue);
      }
    }

    let getAllSample =async()=>{
      const response=await GetSampleMaster();
      if(response.status===1){
        setSampleList(response.responseValue);
      }
    }

    let getInstruction = async()=>{
      const response = await GetInstructionMaster();
      if(response.status===1){
        setInstructionList(response.responseValue);
      }
    }
    let handlerSave = async () => {
      
     
      if(selectedItem === '' || selectedItem === 0 || selectedItem === undefined || selectedItem === null){
        document.getElementById('errTestName').innerHTML="Please Enter Test Name";
        document.getElementById('errTestName').style.display="block";
      }
      else if(selectedModularity === '' || selectedModularity === 0 || selectedModularity === undefined || selectedModularity === null){
        document.getElementById('errModularity').innerHTML="Please Select Modularity";
        document.getElementById('errModularity').style.display="block";
      }
      else if(selectedOrgan === '' || selectedOrgan === 0 || selectedOrgan === undefined || selectedOrgan === null){
        document.getElementById('errOrgan').innerHTML="Please Select Organ";
        document.getElementById('errOrgan').style.display="block";
      }
      else if(selectedCategory === '' || selectedCategory === 0 || selectedCategory === undefined || selectedCategory === null){
        document.getElementById('errCategory').innerHTML="Please Select Category";
        document.getElementById('errCategory').style.display="block";
      }
      else if(selectedSubCategory === '' || selectedSubCategory === 0 || selectedSubCategory === undefined || selectedSubCategory === null){
        document.getElementById('errSubCategory').innerHTML="Please Select SubCategory";
        document.getElementById('errSubCategory').style.display="block";
      }
      else if(selectedItem === '' || selectedItem === 0 || selectedItem === undefined || selectedItem === null){
        document.getElementById('errItem').innerHTML="Please Select Item";
        document.getElementById('errItem').style.display="block";
      }
      else if(selectedSampleList === '' || selectedSampleList === 0 || selectedSampleList === undefined || selectedSampleList === null){
        document.getElementById('errSample').innerHTML="Please Select Sample";
        document.getElementById('errSample').style.display="block";
      }
      else if(selectedInstruction === '' || selectedInstruction === 0 || selectedInstruction === undefined || selectedInstruction === null){
        document.getElementById('errInstruction').innerHTML="Please Select Instruction";
        document.getElementById('errInstruction').style.display="block";
      }
      else{
         const obj ={
          testName:testName,
          modularityId:selectedModularity,
          organId:selectedOrgan,
          categoryId:selectedCategory,
          subCategoryId:selectedSubCategory,
          itemId:selectedItem,
          sampleId:selectedSampleList,
          instructionId:selectedInstruction,
          userID:userID
         }
        
         setShowUnderProcess(1);
        const response = await PostTestMaster(obj);
        
       if (response.status === 1) {
           setShowUnderProcess(0);
           setTosterValue(0);
           setShowToster(1);
           setTosterMessage("Saved Successfully");
           setTimeout(() => {
               setShowToster(0);
               handleClear(1);
               getTestList();
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
      if(selectedOrgan === '' || selectedOrgan === 0 || selectedOrgan === undefined || selectedOrgan === null){
        document.getElementById('errOrgan').innerHTML="Please Select Organ";
        document.getElementById('errOrgan').style.display="block";
      }
      else{
         const obj ={
          testName:'',
          modularityId:selectedModularity,
          organId:selectedOrgan,
          categoryId:selectedCategory,
          subCategoryId:selectedSubCategory,
          itemId:selectedItem,
          sampleId:selectedSampleList,
          instructionId:selectedInstruction,
          userID:userID,
          key:rowID
         }
        
         setShowUnderProcess(1);
        const response = await UpdateTestMaster(obj);
        
       if (response.status === 1) {
           setShowUnderProcess(0);
           setTosterValue(0);
           setShowToster(1);
           setTosterMessage("Updated Successfully");
           setTimeout(() => {
               setShowToster(0);
               handleClear(1);
               getTestList();
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
      const response = await DeleteTestMaster(rowID);
      if(response.status === 1){
        setisShowToaster(1);
        setShowSuccessMsg('Test Deleted Successfully..!!');
        getTestList();
        setTimeout(() => {
            setisShowToaster(0);
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
      setRowId('');
      setTestName('');
      setSelectedOrgan('');
      setSelectedModularity('');
      setEditOrgan('');
      setEditCategory('');
      setEditSubCategory('');
      setEditItem('');
      setEditSample('');
      setEditInstruction('');
      setEditModularity('');
      document.getElementById('errOrgan').style.display="none";
    }
    let handleEdit = (params) => {

      setEditOrgan(params.regionName);
      setSelectedOrgan(params.organID);
      setEditCategory(params.categoryName);
      setSelectedCategory(params.categoryId)
      setEditSubCategory(params.subCategoryName);
      setSubSelectedCategory(params.subCategoryId);
      setEditItem(params.itemName);
      setSelectedItem(params.itemId);
      setEditSample(params.sampleName);
      setSelectedSampleList(params.sampleId);
      setEditInstruction(params.instructions);
      setSelectedInstruction(params.instructionId);
      setEditModularity(params.modalityName);
      setSelectedModularity(params.modularityId);
      setRowId(params.id);
      setUpdateBool(1);
    }
    
    useEffect(()=>{
      getTestList();
      getmodalityList();
      getOrganList();
      getCategory();
      getItems();
      getAllSample();
      getInstruction();
      getAllTestCategoryList();
    },[]);
    document.body.dir = i18n.dir();
  return (
    <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Heading text={t("Sub_Test_Master")} />
              <BoxContainer>
              <div className="col-2 mb-2 me-2">
                  <label htmlFor="TestName" className="form-label">{t("Test_Name")} <span className="starMandatory">*</span></label>
                  <input type="text" className="form-control form-control-sm" name="testName" id="testName" value={testName} onChange={handleChange} placeholder={t("Test_Name")} />
                  <small id="errTestName" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="modularity" className="form-label">{t("Modularity")} <span className="starMandatory">*</span></label>
                {modularityList && 
                 <DropdownWithSearch defaulNname={t("Select_Modularity")} name="ddlModularity" list={modularityList} valueName="id" displayName="modalityName" editdata={editModularity} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errModularity" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
                <div className="col-2 mb-2 me-2">
                  <label htmlFor="SampleId" className="form-label">{t("Organ")} <span className="starMandatory">*</span></label>

                  {organList && 
                   <DropdownWithSearch defaulNname={t("Select_Organ")} name="ddlOrgan" list={organList} valueName="id" displayName="regionName" editdata={editOrgan} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                  }
                  <small id="errOrgan" className="form-text text-danger" style={{ display: 'none' }}></small>
                </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="SampleId" className="form-label">{t("Category")} <span className="starMandatory">*</span></label>

                {categoryList && 
                 <DropdownWithSearch defaulNname={t("Select_Category")} name="ddlCategory" list={categoryList} valueName="id" displayName="categoryName" editdata={editCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="SampleId" className="form-label">{t("Sub_Category")}<span className="starMandatory">*</span></label>

                {subcategoryList && 
                 <DropdownWithSearch defaulNname={t("Select_Sub_Category")} name="ddlSubCategory" list={subcategoryList} valueName="id" displayName="subCategoryName" editdata={editSubCategory} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errSubCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="SampleId" className="form-label">{t("Item")} <span className="starMandatory">*</span></label>

                {itemList && 
                 <DropdownWithSearch defaulNname={t("Select_Items")} name="ddlItem" list={itemList} valueName="id" displayName="itemName" editdata={editItem} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errItem" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="SampleId" className="form-label">{t("Sample")}<span className="starMandatory">*</span></label>

                {sampleList && 
                 <DropdownWithSearch defaulNname={t("Select_Sample")} name="ddlSample" list={sampleList} valueName="id" displayName="sampleName" editdata={editSample} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errSample" className="form-text text-danger" style={{ display: 'none' }}></small>
              </div>
                <div className="col-2 mb-2 me-2">
                <label htmlFor="SampleId" className="form-label">{t("Instructions")}<span className="starMandatory">*</span></label>

                {instructionList && 
                 <DropdownWithSearch defaulNname={t("Select_Instruction")} name="ddlInstruction" list={instructionList} valueName="id" displayName="instructions" editdata={editInstruction} getvalue={handleChange} clear={clearDropdown} clearFun={handleClear} />
                }
                <small id="errInstruction" className="form-text text-danger" style={{ display: 'none' }}></small>
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
                      <th>{t("testNamePlaceholder")}</th>
                      <th>{t("Modularity_Name")}</th>
                      <th>{t("Organ_Name")}</th>
                      <th>{t("Category_Name")}</th>
                      <th>{t("Sub_Category_Name")}</th>
                      <th>{t("Item_Name")}</th>
                      <th>{t("SampleName")}</th>
                      <th>{t("Instruction_Name")}</th>
                      <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    {testList && testList.map((val, ind) => {
                      return (
                        <tr key={val.id}>
                          <td className="text-center">{ind + 1}</td>
                          <td>{val.testName}</td>
                          <td>{val.modularityName}</td>
                          <td>{val.organName}</td>
                          <td>{val.categoryName}</td>
                          <td>{val.subCategoryName}</td>
                          <td>{val.itemName}</td>
                          <td>{val.sampleName}</td>
                          <td>{val.instructions}</td>
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
                    showLoder === 1 ? <Loder val={showLoder} /> : ""
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
