import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading'
import TableContainer from '../../Component/TableContainer'
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster'
import save from '../../assets/images/icons/save.svg'
import '../../assets/css/multipleSelectDropdown.css'
import PostFHIRFamilyHistoryEdit from '../API/PostFHIRFamilyHistoryEdit'
import TosterUnderProcess from '../../Component/TosterUnderProcess'
import Toster from '../../Component/Toster'

import saveButtonIcon from '../../assets/images/icons/saveButton.svg'
import GetFamilyHistoryData from '../../Clinical/API/OPDLifestyle/GetFamilyHistoryData'

export default function FHIRFamilyHistoryEdit({setShowToster,setFamilyHistory, theEncounterId}) {
  let [showFamilyHistoryList, setShowFamilyHistoryList] = useState(1);
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [PopUpId, setPopUpId] = useState('');

  let [makeData, setMakeData]  = useState([]);
  let [getData, setgetData]  = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  // let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [showAlertToster, setShowAlertToster] = useState(0)
  const [getFamilyHistoryList, setFamilyHistoryList] = useState([]);
  const [rowID,setRowID]=useState(0);
  // let getUhid = props.patientUhid;
  
  const customStyle={marginLeft:'0px'};
  // let activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;

  let activeUHID = window.sessionStorage.getItem("activePatient")
  ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
  : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid:[];

  const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
  JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId: window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];
  
  const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
  JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId: window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

  console.log('activeDocID : ', activeDocID , 'activeDeptID : ', activeDeptID)
  let SelectedData =(data,modalID)=>{ 
    
    let t = {
      moduleId: modalID,
      data: data
    }
   
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp += temp.length === 0 ? data[i].dropdownName+':'+data[i].code : ','+ data[i].dropdownName+':'+data[i].code
    }
    
    setTimeout(()=>{
      document.getElementById(modalID).value = temp;
    }, 600)
      
    
}
 const handleOpenModal=(modalID)=>{
  setIsShowPopUp(1);
  setPopUpId(modalID);
  

 }
 const handleCloseModal=()=>{
  setIsShowPopUp(0);
  setPopUpId('');
 }

 const handleSave = async () => {
  let temDataMaker=[];

  const fatherHis=document.getElementById("mdlFatherID").value ;
  const motherHis=document.getElementById("mdlMotherID").value ;
  const siblingHis=document.getElementById("siblingsID").value ;
  const spouseHis=document.getElementById("spouseID").value ;
  const offSpringHis=document.getElementById("offSpringID").value ;
  if(fatherHis){
    temDataMaker.push({code:'F',codeValue:fatherHis})
  }
  if(motherHis){
    temDataMaker.push({code:'M',codeValue:motherHis})
  }
  if(siblingHis){
    temDataMaker.push({code:'S',codeValue:siblingHis})
  }
  if(spouseHis){
    temDataMaker.push({code:'SP',codeValue:spouseHis})
  }
  if(offSpringHis){
    temDataMaker.push({code:'O',codeValue:offSpringHis})
  }
  const getresponse = await dataMaker(makeData);
    
  let objSave = {
    uhid:activeUHID,
    // jsonData : JSON.stringify(getresponse),
    jsonData : JSON.stringify(temDataMaker),
    clientId : clientID,
    userId : window.userId,
    rowId:rowID,
    doctorId : activeDocID,
    departmentId : activeDeptID
  }
  

if(temDataMaker.length > 0){
  if(objSave !== '' && objSave !== undefined){
    let saveResponse = await PostFHIRFamilyHistoryEdit(objSave);
    if(saveResponse.status === 1)
        {
          
          setShowUnderProcess(0);
          // setTosterValue(0);
          setShowToster(6);
          // setTosterMessage('Data Saved !');
          setTimeout(() => {
            funClearData();
            setShowToster(0)
          },1000)
        }
        else{
          setShowUnderProcess(0);
          setShowAlertToster(1)
          setTosterMessage(saveResponse.responseValue);
          //setTosterValue(1);
          setTimeout(() => {
            setShowToster(0);
          },1000)
        }
  
  }
}
  
  else{
    alert('Please fill atleast one of the history!');
  }

  
 }

 const dataMaker= async (param)=>{
  let modalIDs=[{key:1,modalID:'mdlFatherID',code:'F'},{key:2,modalID:'mdlMotherID',code:'M'},{key:3,modalID:'siblingsID',code:'S'},{key:4,modalID:'spouseID',code:'SP'},{key:2,modalID:'offSpringID',code:'O'}];
  var sendDataArr=[];
  const lastIndexMap = {};
  var jsonData=param;
  jsonData.forEach((item, index,arrayy) => {
    const moduleId = item.moduleId;
    lastIndexMap[moduleId] = arrayy[index];
  });
const dataArray = Object.values(lastIndexMap);
  
  for(var j=0; j < modalIDs.length; j++)
      {
        for(var l=0; l < dataArray.length; l++)
        {
              if(dataArray[l].moduleId === modalIDs[j].modalID){
                const dd = dataArray[l].data;
                var tempObj="";
                for(var k=0; k < dd.length; k++)
                {
                 
                  tempObj=tempObj.length === 0 ? [dd[k].dropdownName] +':'+dd[k].code  : tempObj +","+ [dd[k].dropdownName] +':'+ dd[k].code
                }
                sendDataArr.push({
                  code:modalIDs[j].code,
                  codeValue:tempObj
                })                
              }
          } 
        }
  return sendDataArr;
 }

 const handleEdit = async () => {
  setShowFamilyHistoryList(0);
  setRowID(getFamilyHistoryList.length > 0 ? getFamilyHistoryList[0].id : 0);
  setTimeout(() => {
    for(let i = 0; i< getFamilyHistoryList.length; i++){
      document.getElementById('mdlFatherID').value = getFamilyHistoryList[i].history_father
      document.getElementById('mdlMotherID').value = getFamilyHistoryList[i].history_mother
      document.getElementById('siblingsID').value = getFamilyHistoryList[i].history_siblings
      document.getElementById('spouseID').value = getFamilyHistoryList[i].history_spouse
      document.getElementById('offSpringID').value = getFamilyHistoryList[i].history_offspring
    }
  },1000)
 }



 const handleBack = () => {
  setShowFamilyHistoryList(1);
  funFamilyHistoryList();
 }

 const funClearData = async () => {
  document.getElementById('mdlFatherID').value = '';
  document.getElementById('mdlMotherID').value = '';
  document.getElementById('siblingsID').value = '';
  document.getElementById('spouseID').value = '';
  document.getElementById('offSpringID').value = '';
  setMakeData([])
 } 

 const funFamilyHistoryList = async () => {
  const param={
    Uhid:activeUHID,
    HistoryType:1,
    EncounterId : theEncounterId
}
  const getHisListRes = await GetFamilyHistoryData(param);
 if(getHisListRes.status === 1){
  setFamilyHistoryList(getHisListRes.responseValue)
 }
 }

 useEffect(() => {
  
  funFamilyHistoryList();

 },[setFamilyHistory])
  return (
    
    <>
    {showFamilyHistoryList === 1 ? <div className='lifestylelist'>
                    <div className="col-12">
                        <div className='handlser'>
                            <Heading text="Family History List" />
                            {/* <div style={{ position: 'relative' }}>
                                <input type="text" className='form-control form-control-sm' placeholder={t("Search")} onChange={"handleSearch"} />
                                <span className="tblsericon"><i class="fas fa-search"></i></span>
                            </div> */}
                        </div>
                        <div className="med-table-section mt-2" style={{ "height": "35vh" }}>
                            <TableContainer>
                                <thead>
                                    <tr>
                                        <th>Relation</th>
                                        <th>Relation Code</th>
                                        <th>Diagnosis Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                
                                    {getFamilyHistoryList && getFamilyHistoryList.map((item, index) => {
                                        
                                            return (
                                                <>
                                                    <tr>
                                                        <td>Father</td>
                                                        <td>{item.dc_father}</td>
                                                        <td >{item.history_father}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td>Mother</td>
                                                        <td>{item.dc_mother}</td>
                                                        <td >{item.history_mother}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td>Siblings</td>
                                                        <td>{item.dc_siblings}</td>
                                                        <td >{item.history_siblings}</td>
                                                        
                                                    </tr>
                                                    <tr>
                                                        <td>Spouse</td>
                                                        
                                                        <td>{item.dc_spouse}</td>
                                                        <td>{item.history_spouse}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Offspring </td>
                                                        
                                                        <td>{item.dc_offspring}</td>
                                                        <td>{item.history_offspring}</td>
                                                    </tr>
                                                </>
                                            );
                                        }
                                        
                                    )}
                                </tbody>

                            </TableContainer>
                            <div class="modal-footer">
                                <div class="d-inline-flex gap-2 justify-content-md-end d-md-flex justify-content-md-end">
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleEdit}><img src={saveButtonIcon} className='icnn' alt='' /> Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <>
                <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-2">
          <Heading text='Family History' />
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-2">
            <div className="med-table-section" style={{ "height": "50vh" }}>
              <TableContainer>
                <thead >
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Father : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='F' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    {/* <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id='mdlFatherID'  style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('mdlFatherID')}}/></th> */}
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>
                    <input  id="mdlFatherID" type="text" className="form-control form-control-sm" name="mdlFatherID" placeholder= "Enter Code" style={{maxWidth:'250px'}} onClick={()=> {handleOpenModal('mdlFatherID')}}/>
                    </th>
                    {/* <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"fatherID"} style={{maxWidth:'250px'}} placeholder='Enter Codes' data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#codesModal" /></th> */}
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Mother : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='M' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"mdlMotherID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('mdlMotherID')}}/></th>
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Siblings : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='S' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"siblingsID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('siblingsID')}}/></th>
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Spouse : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='SP' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"spouseID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('spouseID')}}/></th>
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Offspring : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value = 'O' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"offSpringID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('offSpringID')}}/></th>
                  </tr>
                </thead>
              </TableContainer>
              <div className="d-flex  gap-2 mt-3 samplebtnnFHIR">
              <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={handleSave}><img src={save} className='icnn' alt='' />Save</button>
              <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleBack}><i class="bi bi-x-lg" ></i> Back</button>
              </div>
            </div>

          </div>
        </div>
      </div>
                </>
      
      }
      

      {/* ------------------------------------------------- Codes Modal ----------------------------------------------- */}
      {isShowPopUp === 1 ?
      
      <div className={`modal d-${isShowPopUp===1 ?'block':'none'}`} id="codesModal"  data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{maxWidth:'550px'}}>
                        <div className="modal-content" >
                        {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>
                           

                            <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true}/> 
                           {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
      :''}
      </>
    
  )
}
