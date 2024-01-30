import React, { useEffect, useState } from 'react'
import Heading from '../../Component/Heading'
import plus from '../../assets/images/icons/icons8-plus-30.png'
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png'
import asterik from '../../assets/images/icons/icons8-asterisk-30.png'
import save from '../../assets/images/icons/save.svg';
import clear from '../../assets/images/icons/clear.svg';
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster'
import GetIssueSubType from '../API/GetIssueSubType'
import POSTFHIRCarePlan from '../API/POSTFHIRCarePlan'
import GetCarePlanType from '../API/GetCarePlanType'


export default function FHIRCarePlan(props) {
  const [getCarePlanTypeList, setCarePlanTypeList] = useState([])
  let [makeData, setMakeData] = useState([]);
  let [getData, setgetData] = useState([]);
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [reasonSectionOpen, setReasonSectionOpen] = useState({});
  const [PopUpId, setPopUpId] = useState('');
  const [carePlanRow, setCarePlanRow] = useState([
    {
      rowID: 1,
      Date: '',
      Code: '',
      Type: 0,
      Description: '',
      reasonCode: '',
      reasonStatus: '',
      reasonRecordingDate: '',
      reasonEndDate: '',
    },
  ]);


  // const handleTextChange  =(e) =>{
  //   let arr=[...carePlanRow];

  // }
 

  const customStyle = { marginLeft: '0px' };
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;

  //////////////////////////////////////  TO Get Care Plan Type List ///////////////////////////////

  const funGetCarePlanTypeList =  async () => {
    const getCareTypeRes = await GetCarePlanType();
    setCarePlanTypeList(getCareTypeRes.responseValue)
}

  let SelectedData = (data, modalID) => {


    let t = {
      moduleId: modalID,
      data: data
    }
    
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp += " " + data[i].id
    }

    document.getElementById(modalID).value = temp

  }
  const handleOpenModal = (modalID) => {
    setIsShowPopUp(1);
    setPopUpId(modalID);


  }
  const handleOpenReasonModal = (rowID) => {
    // Update the state to mark the reason section as open for the specified rowID
    const tempArr = [...carePlanRow]
   
    setReasonSectionOpen((prevState) => ({
      ...prevState,
      [rowID]: true,
    }));
  };
  const handleCloseModal = () => {
    setIsShowPopUp(0);
    setPopUpId('');
  }

  const handleAddCarePlanRow = (param) => {
    
    let tempArr = [...carePlanRow];
    tempArr.push({
      rowID: param + 1,
    });
    
    setCarePlanRow(tempArr);
  }

  const handleDeleteCarePlanRow = (index, key) => {
    let tempArr = [];
    const data = [...carePlanRow];
    if (data.length === 1) {
      return;
    }
    
    data.splice(index, 1);
   
    for (var i = 0; i < data.length; i++) {
      const code = document.getElementById('codeInputID' + data[i].rowID).value;
      const date = document.getElementById('careDateID' + data[i].rowID).value;
      const type = document.getElementById('careTypeID' + data[i].rowID).value;
      const description = document.getElementById('careDescriptionID' + data[i].rowID).value;
      tempArr.push({
        rowID: data[i].rowID,
        Date: date,
        Code: code,
        Type: type,
        Description: description,
      });

    }
    setCarePlanRow(data);
    setTimeout(() => {
      for (var j = 0; j < tempArr.length; j++) {
        document.getElementById('codeInputID' + tempArr[j].rowID).value = tempArr[j].Code;
        document.getElementById('careDateID' + tempArr[j].rowID).value = tempArr[j].Date;
        document.getElementById('careTypeID' + tempArr[j].rowID).value = tempArr[j].Type;
        document.getElementById('careDescriptionID' + tempArr[j].rowID).value = tempArr[j].Description;
      }
    }, 200)

  }

  const dataMaker = async(param) => {
      const lastIndexMap = {};
      var jsonData = param;
      jsonData.forEach((item, index, array) =>{
        const moduleId = item.moduleId;
        lastIndexMap[moduleId] = array[index];
        

      });
      const dataArray = Object.values(lastIndexMap);
      
      return dataArray;
  }

  const handleSave =async () => {
    const getresponse = await dataMaker(makeData);
   
    let tempArrList = [];
    const data = [...carePlanRow];
    

    for (var i = 0; i < data.length; i++) {
      
     
      const date = document.getElementById('careDateID' + data[i].rowID).value;
      const type = document.getElementById('careTypeID' + data[i].rowID).value;
      const description = document.getElementById('careDescriptionID' + data[i].rowID).value;
      const reasonCodeElement = document.getElementById('reasonCodeInputID' + data[i].rowID);
      const reasonCode = reasonCodeElement ? reasonCodeElement.value : '';
      const reasonStatusElement = document.getElementById('reasonStatusID' + data[i].rowID);
      const reasonStatus = reasonStatusElement ? reasonStatusElement.value : '';
      const reasonRecordingDateElement = document.getElementById('reasonRecordingDateID' + data[i].rowID);
      const reasonRecordingDate = reasonRecordingDateElement ? reasonRecordingDateElement.value : '';
      const reasonEndDateElement = document.getElementById('reasonEndDateID' + data[i].rowID);
      const reasonEndDate = reasonEndDateElement ? reasonEndDateElement.value : '';
       var arr=getresponse[i].data;
       var maker="";
       var codeTextMaker= "";
       for(var j=0; j < arr.length; j++){ maker=maker.length === 0 ? arr[j].dropdownId +':'+arr[j].id  : maker +','+arr[j].dropdownId +':'+arr[j].id;
                                          codeTextMaker =  codeTextMaker.length === 0 ? arr[j].codeText : codeTextMaker +'|'+arr[j].codeText;}
      tempArrList.push({
        date: date,
        codeType: maker,
        codeText: codeTextMaker,
        care_plan_type: type,
        description: description,
        reason_code: reasonCode,
        reason_status: reasonStatus,
        reason_date_low: reasonRecordingDate,
        reason_date_high: reasonEndDate,
      });
    }
   
    
    let finalObj = {
      uhid : props.patientUhid,
      clientId: clientID,
      jsonCarePlanData : JSON.stringify(tempArrList)
    }
   
    
    const saveObj = await POSTFHIRCarePlan(finalObj);
    
      if(saveObj.status === 1){
        alert('Data saved of care plan')
      }
      else{
        alert('Data Not saved')
      }
    
  }

  useEffect(() => {
    funGetCarePlanTypeList()
  },[])

  return (
    <section className="main-content mt-5 pt-3" style={customStyle}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div class="title mb-1" style={{backgroundColor:'#80808036'}}>Care Plan Form </div>
              <div className="inner-content">
                {carePlanRow && carePlanRow.map((carePlan, index) => {
                  return (<div className='container-fluid border border-primary mb-2 rounded'>
                    <>
                      <div className="row mb-2">
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Code :</label>
                          <input type='text' className='form-control form-control-sm' id={'codeInputID' + carePlan.rowID} onClick={() => { handleOpenModal('codeInputID' + carePlan.rowID) }} />
                          {/* <span>{carePlan.rowID}</span> */}
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Date :</label>
                          <input type='date' className='form-control form-control-sm' id={'careDateID' + carePlan.rowID} />
                        </div>
                        <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                          <label className='form-label'>Type :</label>
                          <select className='form-select form-select-sm' id={'careTypeID' + carePlan.rowID} >
                          <option value='0'>Select Code</option>
                          {getCarePlanTypeList && getCarePlanTypeList.map((list, ind) => (
                            <option key={ind} value={list.id}>{list.typeName}</option>
                  ))}
                            
                            
                          </select>
                        </div>
                        <div className="col-xl-3 col-lg-6 col-md-6 mb-2">
                          <label className='form-label'>Description :</label>
                          <textarea className='form-control form-control-sm' id={'careDescriptionID' + carePlan.rowID} />
                        </div>

                        <div className="col-xl-3 col-lg-6 col-md-6 mb-2">
                          <label className='form-label'>&nbsp;</label>
                          <div className="mb-2 d-flex justify-content-end_ flex-wrap">
                            <div>
                              <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={() => { handleAddCarePlanRow(carePlan.rowID) }}><img src={plus} className='icnn' alt='' />Add</button>
                            </div>
                            <div>
                              <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => { handleDeleteCarePlanRow(index, carePlan.rowID) }}><img src={deleteIcon} className='icnn' alt='' />Delete</button>
                            </div>
                            <div>
                              <button type="button" className="btn btn-light btn-sm btn-light-fill mb-1 ms-2" style={{ borderColor: 'black' }} onClick={() => { handleOpenReasonModal(carePlan.rowID) }}><img src={asterik} className='icnn' alt='' />Add Reason</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </>
                    {reasonSectionOpen[carePlan.rowID] &&
                      <div className="row">
                        <div className="col-12 p-0">
                          <div class="heading" style={{fontSize:'14px'}}>Care Plan Reason Information</div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="" className="form-label fw-bold">When recording a reason for the value (or absence of a value) of an observation both the reason code and status of the reason are required</label>
                        </div>

                        <div className="col-12 mt-4">
                          <div className="row">
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Code</label>
                              <input type='text' className='form-control form-control-sm mb-2' id={'reasonCodeInputID' + carePlan.rowID} />
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Status</label>
                              <select className='form-select form-select-sm' id={'reasonStatusID' + carePlan.rowID}>
                                <option value='0'>Select Code</option>
                                <option value='1'>Pending</option>
                                <option value='2'>Completed</option>
                                <option value='3'>Negated</option>
                              </select>
                            </div>

                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason Recording Date</label>
                              <input type='date' className='form-control form-control-sm mb-2' id={'reasonRecordingDateID' + carePlan.rowID} />
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 mb-2">
                              <label htmlFor="" className="form-label">Reason End Date (Leave empty if there is no end date)</label>
                              <input type='date' className='form-control form-control-sm mb-2' id={'reasonEndDateID' + carePlan.rowID} />
                            </div>
                          </div>
                        </div>

                      </div>}
                  </div>
                  )
                })}
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
                    {/* <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" ><img src={clear} className='icnn' alt='' />Clear</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------ Code Master popUp Start------------------------------------ */}
      {isShowPopUp === 1 ?

        <div className={`modal d-${isShowPopUp === 1 ? 'block' : 'none'}`} id="codesModal" data-bs-backdrop="static" >
          <div className="modal-dialog modalDelete" style={{ maxWidth: '550px' }}>
            <div className="modal-content" >
              {/* <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel"</button> */}
              <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title="Close Window"><i className="bi bi-x-octagon" onClick={handleCloseModal}></i></button>


              <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={true} />
              {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
            </div>
          </div>
        </div>
        : ''}
      {/* ------------------------------------------ Code Master popUp End------------------------------------ */}
    </section>
  )
}
