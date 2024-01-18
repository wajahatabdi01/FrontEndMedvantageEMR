import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading'
import plus from '../../assets/images/icons/icons8-plus-30.png'
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png'
import asterik from '../../assets/images/icons/icons8-asterisk-30.png'
import save from '../../assets/images/icons/save.svg';
import clear from '../../assets/images/icons/clear.svg';
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster'


export default function FHIRCarePlan() {
  let [makeData, setMakeData]  = useState([]);
  let [getData, setgetData]  = useState([]);
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [PopUpId, setPopUpId] = useState('');
  const [carePlanRow, setCarePlanRow] = useState([
    {
      rowID: 1,
      Date : '',
      Code :'',
      Type : 0,
      Description : '',
    }
  ]);

  // const handleTextChange  =(e) =>{
  //   let arr=[...carePlanRow];

  // }

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

  const handleAddCarePlanRow=(param)=>{
    console.log('data',param);
    let tempArr=[...carePlanRow];
    tempArr.push({
       rowID:param+1,
    });
    console.log('temparr',tempArr)
    setCarePlanRow(tempArr);
  }

  const handleDeleteCarePlanRow = (index) =>{
    console.log('index : ', index);
    console.log('carePlanRow : ', carePlanRow);
    let tempArr = []
    const data = carePlanRow;
    console.log('data arrraaayy : ', data);
    return;
    // tempArr.splice(index,1);
    // console.log('tempArr after delete', tempArr);
    for(var i=0; i < data.length; i++){
      const code=document.getElementById('codeInputID'+i).value;
      const date=document.getElementById('careDateID'+i).value;
      const type=document.getElementById('careTypeID'+i).value;
      const description=document.getElementById('careDescriptionID'+i).value;
      tempArr.push({
       rowID:i+1,
       Date : date,
       Code :code,
       Type : type,
       Description : description,
    });
   }
   console.log('save tempArr',tempArr);
   var index1 = tempArr.findIndex((i) => i.rowID == (index+1));
   //var index1 = tempArr.findIndex((i));
   console.log('index found : ', index1)
   if(index1 != -1){
    const newTempArr  = [...tempArr];
    console.log('newTempArr : ', newTempArr);
    newTempArr.splice(index1, 1)
    setCarePlanRow([...newTempArr])
   }




   
    //setCarePlanRow([...tempArr]);
    
  }

  const handleSave=()=>{
    let tempArr=[];
    const data =carePlanRow;
    for(var i=0; i < data.length; i++){
       const code=document.getElementById('codeInputID'+i).value;
       const date=document.getElementById('careDateID'+i).value;
       const type=document.getElementById('careTypeID'+i).value;
       const description=document.getElementById('careDescriptionID'+i).value;
       tempArr.push({
        rowID:i+1,
        Date : date,
        Code :code,
        Type : type,
        Description : description,
     });
    }
    console.log('save tempArr',tempArr)
  }
 
  return (
    <section className="main-content mt-5 pt-3" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-2">
            <Heading text='Care Plan Form' />
          </div>
        </div>
        <div className="med-box">
          {carePlanRow && carePlanRow.map((carePlan, index) => {
            return (
              <div className='mt-2 mb-2' style={{border:'1px solid black'}}>
                <div className="row">
                  <div className="col-2 mt-2">
                    <label className='form-label'>Code :</label>
                    <input type='text' className='form-control form-control-sm mb-2' id={'codeInputID'+index}  onClick={()=>{handleOpenModal('codeInputID'+index)}}/>
                    <span>{carePlan.rowID}</span>
                  </div>
                  <div className="col-2 mt-2">
                    <label className='form-label'>Date :</label>
                    <input type='date' className='form-control form-control-sm mb-2' id={'careDateID'+index} value={carePlan.Date}/>
                  </div>
                  <div className="col-2 mt-2">
                    <label className='form-label'>Type :</label>
                    <select className='form-select form-select-sm' id={'careTypeID'+index} value={carePlan.Type}>
                      <option value='0'>Select Code</option>
                      <option value='1'>Select Code 1</option>
                    </select>
                  </div>
                  <div className="col-6 mt-2">
                    <label className='form-label'>Description :</label>
                    <textarea className='form-control form-control-sm mb-2' id={'careDescriptionID'+index} value={carePlan.Description}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-2 mb-2">
                    <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={()=>{handleAddCarePlanRow(carePlan.rowID)}}><img src={plus} className='icnn' alt='' />Add</button>
                    <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={()=>{handleDeleteCarePlanRow(index)}}><img src={deleteIcon} className='icnn' alt='' />Delete</button>
                    <button type="button" className="btn btn-light btn-sm btn-light-fill mb-1 ms-2" style={{ borderColor: 'black' }}><img src={asterik} className='icnn' alt='' />Add Reason</button>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="mt-3">
            <div className="fhirBorder">
              <label className='form-label' style={{ fontWeight: 'bold' }}>Care Plan Reason Information</label>
              <hr />
              <div className="row">
                <label htmlFor="" className="form-label">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
              </div>

              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="" className="form-label">Reason Code</label>
                    <input type='text' className='form-control form-control-sm mb-2' />
                  </div>
                  <div className="col-6">
                    <label htmlFor="" className="form-label">Reason Status</label>
                    <select className='form-select form-select-sm'>
                      <option value='0'>Select Code</option>
                      <option value='1'>Select Code 1</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="" className="form-label">Reason Recording Date</label>
                    <input type='date' className='form-control form-control-sm mb-2' />
                  </div>
                  <div className="col-6">
                    <label htmlFor="" className="form-label">Reason End Date (Leave empty if there is no end date)</label>
                    <input type='date' className='form-control form-control-sm mb-2' />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="col-12 mt-2">
          <div className="whitebg1">
            <div className="row">
              <div className="col-12">
                <div className="whitebg" style={{ padding: '3px' }}>
                  <div className="d-flex gap-2 mt-2 samplebtnn">
                    <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={handleSave}><img src={save} className='icnn' alt='' />Save</button>
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" ><img src={clear} className='icnn' alt='' />Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
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
      {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
    </section>
  )
}
