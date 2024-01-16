import React, { useState } from 'react'
import Heading from '../../Component/Heading'
import TableContainer from '../../Component/TableContainer'
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster'
import save from '../../assets/images/icons/save.svg'
import '../../assets/css/multipleSelectDropdown.css'
import PostFHIRFamilyHistoryEdit from '../API/PostFHIRFamilyHistoryEdit'
import TosterUnderProcess from '../../Component/TosterUnderProcess'
import Toster from '../../Component/Toster'

export default function FHIRFamilyHistoryEdit(props) {

  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [PopUpId, setPopUpId] = useState('');

  let [makeData, setMakeData]  = useState([]);
  let [getData, setgetData]  = useState([]);
  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [tosterValue, setTosterValue] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");

  let getUhid = props.patientUhid;
  
  const customStyle={marginLeft:'0px'};

  let SelectedData =(data,modalID)=>{ 
    
   
    let t ={
      moduleId:modalID,
      data:data
    }
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for(var i =0; i<data.length; i++){
      temp += " "+ data[i].id
    }
    
    document.getElementById(modalID).value = temp
    
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
  //let  tempArr = [];
  // const fatherDiagnosisCodes=document.getElementById('mdlFatherID').value;
  // const motherDiagnosisCodes=document.getElementById('mdlMotherID').value;
  // const siblingsDiagnosisCodes=document.getElementById('siblingsID').value;
  // const spouseDiagnosisCodes=document.getElementById('spouseID').value;
  // const offspringDiagnosisCodes=document.getElementById('offSpringID').value;

  

  // const arrFather=fatherDiagnosisCodes.split(' ').slice(1,fatherDiagnosisCodes.length)
  // const arrMother=motherDiagnosisCodes.split(' ').slice(1,motherDiagnosisCodes.length)
  // const arrSiblings=siblingsDiagnosisCodes.split(' ').slice(1,siblingsDiagnosisCodes.length)
  // const arrSpouse=spouseDiagnosisCodes.split(' ').slice(1,spouseDiagnosisCodes.length)
  // const arrSprings=offspringDiagnosisCodes.split(' ').slice(1,offspringDiagnosisCodes.length)
  //let arr=[{code:'F',arr:arrFather},{code:'M',arr:arrMother},{code:'S',arr:arrSiblings},{code:'SP',arr:arrSpouse},{code:'O',arr:arrSprings}];
 
  // for(var i=0; i <arr.length; i++){
  //    if(arr[i].arr.length > 0){
  //      tempArr.push({
  //        uhid: getUhid,
  //         code:arr[i].code,
  //         codeValue:arr[i].arr.join(',')
  //      })
  //    }
  // }
  
  const getresponse = await dataMaker(makeData);
  let objSave = {
    uhid:getUhid,
    jsonData : JSON.stringify(getresponse)
  }

 
  

  if(objSave !== '' && objSave !== undefined){
    let saveResponse = await PostFHIRFamilyHistoryEdit(objSave);
    if(saveResponse.status === 1)
        {
          
          setShowUnderProcess(0);
          setTosterValue(0);
          setShowToster(1);
          setTosterMessage('Data Saved !');
          setTimeout(() => {
            setShowToster(0)
          },1000)
        }
        else{
          setShowUnderProcess(0);
          setShowToster(1);
          setTosterMessage(saveResponse.responseValue);
          setTosterValue(1);
          setTimeout(() => {
            setShowToster(0);
          },1000)
        }
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
for(var j=0; j < modalIDs.length; j++){
  for(var l=0; l < dataArray.length; l++){
        if(dataArray[l].moduleId === modalIDs[j].modalID){
          const dd = dataArray[l].data;
          var tempObj="";
          for(var k=0; k < dd.length; k++){
            tempObj=tempObj.length === 0 ? [dd[k].dropdownId] +':'+dd[k].id  : tempObj +","+ [dd[k].dropdownId] +':'+ dd[k].id
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
  return (
    <section className="main-content mt-5 pt-3" style={{marginLeft:'0px'}}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-2">
          <Heading text='Edit History And Lifestyle' />
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
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"mdlFatherID"}  style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('mdlFatherID')}}/></th>
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
              {showUnderProcess === 1 ? <><TosterUnderProcess /></> :
                            showToster === 1 ? <Toster value={tosterValue} message={tosterMessage} /> : <>
                            <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={handleSave}><img src={save} className='icnn' alt='' />Save</button>

                              </>
                              }
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ------------------------------------------------- Codes Modal ----------------------------------------------- */}
      {isShowPopUp === 1 ?
      
      <div className={`modal d-${isShowPopUp===1 ?'block':'none'}`} id="codesModal"  data-bs-backdrop="static" >
                    <div className="modal-dialog modalDelete" style={{maxWidth:'550px'}}>
                        <div className="modal-content" >
                        {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>
                           

                            <CodeMaster style={customStyle} SelectedData = {SelectedData} defaultData={makeData} modalID={PopUpId}/> 
                           {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
                        </div>
                    </div>
                </div>
      :''}
    </section>
  )
}
