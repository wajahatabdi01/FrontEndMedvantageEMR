import React, { useState } from 'react'
import Heading from '../../Component/Heading'
import TableContainer from '../../Component/TableContainer'
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster'
import save from '../../assets/images/icons/save.svg'
import '../../assets/css/multipleSelectDropdown.css'

export default function FHIRFamilyHistoryEdit() {

  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [PopUpId, setPopUpId] = useState('');

  const customStyle={marginLeft:'0px'};

  let SelectedData =(data,modalID)=>{ 
    
    // console.log('modalID : ', modalID);
    let temp = ""
    for(var i =0; i<data.length; i++){
      console.log('data array : ', modalID)
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
  return (
    <section className="main-content mt-5 pt-3">
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
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='code F' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"mdlFatherID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('mdlFatherID')}}/></th>
                    {/* <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"fatherID"} style={{maxWidth:'250px'}} placeholder='Enter Codes' data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#codesModal" /></th> */}
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Mother : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='code M' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"mdlMotherID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('mdlMotherID')}}/></th>
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Siblings : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='code S' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"siblingsID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('siblingsID')}}/></th>
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Spouse : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value='Code Sp' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"spouseID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('spouseID')}}/></th>
                  </tr>
                  <tr>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Offspring : </th>
                    <th style={{borderBottom:'none', paddingTop:'10px'}}><input type='text' value = 'code OS' className='form-control form-control-sm' style={{maxWidth:'250px'}} readOnly/></th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}>Diagnosis Code : </th>
                    <th style={{borderBottom: 'none', paddingTop:'10px'}}><input type='text' className='form-control form-control-sm' id={"offSpringID"} style={{maxWidth:'250px'}} placeholder='Enter Codes'  onClick={()=>{handleOpenModal('offSpringID')}}/></th>
                  </tr>
                </thead>
              </TableContainer>
              <div className="d-flex  gap-2 mt-3 samplebtnnFHIR">
              <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" ><img src={save} className='icnn' alt='' />Save</button>
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
                           <CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/>
                        </div>
                    </div>
                </div>
      :''}
    </section>
  )
}
