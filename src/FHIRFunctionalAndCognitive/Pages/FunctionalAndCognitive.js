import React, { useEffect, useState } from 'react';

import plus from '../../assets/images/icons/icons8-plus-30.png';
import deleteIcon from '../../assets/images/icons/icons8-delete-30.png';
import save from '../../assets/images/icons/save.svg';
import clear from '../../assets/images/icons/clear.svg'
import editIcon from '../../assets/images/icons/icons8-pencil-30.png'
import { CodeMaster } from '../../Admin/Pages/EMR Master/CodeMaster';
import PostFunctionAndCog from '../API/PostFunctionAndCog';
import GetFunctionAndCog from '../API/GetFunctionAndCod';
import DeleteFunctionAndCog from '../API/DeleteFunctionAndCog';


export default function FunctionalAndCognitive({setFunctionalAndCog, setShowToster}) {
  const customStyle = { marginLeft: '0px' };
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
  const activeUHID = window.sessionStorage.getItem("activePatient")
    ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []

///////////////////////////////// USE STATES ////////////////////////////////////////////////////////
  const [carePlanRow, setCarePlanRow] = useState([{  rowID: 1, },]);
  const [getCarePlanTypeList, setCarePlanTypeList] = useState([]);
  const [isShowPopUp, setIsShowPopUp] = useState(0);
  const [PopUpId, setPopUpId] = useState('');
  let [makeData, setMakeData] = useState([]);
  let [getData, setgetData] = useState([]);
  const [checkedMap, setCheckedMap] = useState({});
  const [getFunAndCogList, setFunAndCogList] = useState([]);
  const [toShowButtons, setToShowButtons] = useState(1);
  const [theRowId, setTheRowId] = useState(0)
  ///////////////////////////////////////////////////////////////////


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

  const handleDeleteObservationRow = (index, key) => {
    let tempArr = [];
    const data = [...carePlanRow];
    
    if (data.length === 1) {
      return;
    }
    
    data.splice(index, 1);
    makeData.splice(index,1)
    console.log('ddd data : ', data);
    console.log('the make data : ', makeData)
    
    for (let i = 0; i < data.length; i++) {
      const code = document.getElementById('funCodeInputID' + data[i].rowID).value;
      const date = document.getElementById('funCareDateID' + data[i].rowID).value;
      const type = document.getElementById('mentalStatusID' + data[i].rowID).value;
      const description = document.getElementById('funCareDescriptionID' + data[i].rowID).value;
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
        document.getElementById('funCodeInputID' + tempArr[j].rowID).value = tempArr[j].Code;
        document.getElementById('funCareDateID' + tempArr[j].rowID).value = tempArr[j].Date;
        document.getElementById('mentalStatusID' + tempArr[j].rowID).value = tempArr[j].Type;
        document.getElementById('funCareDescriptionID' + tempArr[j].rowID).value = tempArr[j].Description;
      }
    }, 200)
  }

  ///////////// to open modal /////////////////////////
  const handleOpenModal = (modalID) => {
    setIsShowPopUp(1);
    setPopUpId(modalID);


  }

  const handleCheckboxChange = (checkBoxId) => {
    setCheckedMap(prevState => ({
        ...prevState,
        [checkBoxId]: !prevState[checkBoxId] // Toggle the value
    }));
};

  const SelectedData = (data, modalID) => {

    console.log('modalID : ', modalID);
    console.log('data : ', data);
    let t = {
      moduleId: modalID,
      data: data
    }
    
    setgetData(t);
    setMakeData([...makeData, t])
    let temp = ""
    for (var i = 0; i < data.length; i++) {
      temp = data[i].code
    }
    console.log('temp : ', temp)
    document.getElementById(modalID).value = temp

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
    console.log('carePlanRow : ', carePlanRow);
    console.log('getresponse : ', getresponse);
   
    if(carePlanRow.length === getresponse.length)
    {
      let tempArrList = [];
    const data = [...carePlanRow];
    console.log('new data ; ', data)
    for (let i = 0; i < data.length; i++) {
      const date = document.getElementById('funCareDateID' + data[i].rowID).value;
      const mentalStatusCheck = document.getElementById('mentalStatusID' + data[i].rowID);
      const description = document.getElementById('funCareDescriptionID' + data[i].rowID).value;
      const mentalStatus = mentalStatusCheck.checked;
      let arr=getresponse[i].data;
       let maker="";
       let codeTextMaker= "";
       for(let j=0; j < arr.length; j++){ maker=maker.length === 0 ? arr[j].dropdownName +':'+arr[j].code  : maker +','+arr[j].dropdownName +':'+arr[j].code;
                                          codeTextMaker =  codeTextMaker.length === 0 ? arr[j].codeText : codeTextMaker +'|'+arr[j].codeText;}
      tempArrList.push({
        date: date,
        activity : mentalStatus? 1: 0,
        code: maker,
        codetext: codeTextMaker? codeTextMaker : '',
        description : description

      })
    }
    if(theRowId === 0)
    {
      let finalObj = {
        id : theRowId,
        uhid: activeUHID,
        jsonCognitiveStatusDetails: JSON.stringify(tempArrList),
        userId: window.userId,
        clientId: clientID
      }
      
      const resSave = await PostFunctionAndCog(finalObj);
        if(resSave.status === 1) {
          getfunAndCog();
          setShowToster(27);
          setTimeout(() => {
            // handleClear();
            setShowToster(27)
          }, 2000)
        }
    }
    else
    {
      let finalObj = {
        id : theRowId,
        uhid: activeUHID,
        jsonCognitiveStatusDetails: JSON.stringify(tempArrList),
        userId: window.userId,
        clientId: clientID
      }
      
      const resSave = await PostFunctionAndCog(finalObj);
        if(resSave.status === 1) {
          getfunAndCog();
          setShowToster(27);
          setTimeout(() => {
            // handleClear();
            setShowToster(27)
          }, 2000)
        }
    }
    }
    else{
      alert('Please select the code.');
    }
  }

  const handleClear = () => {
    for(let i = 0; i<carePlanRow.length; i++){
    
      document.getElementById('funCareDescriptionID' + carePlanRow[i].rowID).value = '';
      document.getElementById('funCareDateID' + carePlanRow[i].rowID).value = '';
      document.getElementById('funCodeInputID' + carePlanRow[i].rowID).value = '';
      setCheckedMap(prevState => ({
        ...prevState,
        ['mentalStatusID' + carePlanRow[i].rowID]: false
    }));
    }
    setMakeData([]);
  }

  const getfunAndCog = async () => {
    const resFun = await GetFunctionAndCog(activeUHID);
    if(resFun.status === 1){
      setFunAndCogList(resFun.responseValue)
    }
  }

  const handleDelete = async (id) => {
    
    if(window.confirm("Do you wish to delete?"))
      {
        console.log('deleted with id : ', id)
        const resDel = await DeleteFunctionAndCog(id, window.userId);
        if(resDel.status === 1){
          getfunAndCog();
          
        setShowToster(28);
            setTimeout(() => {
              setShowToster(28)
            },2000);

        }
      }
    
  }
  
  const handleEdit = async (list) => {
    setToShowButtons(0)
    console.log('list : ', list)
    setTheRowId(list.id)
    const inputDate =list.date;
    const parts = inputDate.split('-');
    const formattedDate = parts[2] + '-' + parts[1].padStart(2, '0') + '-' + parts[0].padStart(2, '0');
    console.log(formattedDate); // Output: "2024-11-16"

    for(let i = 0; i<carePlanRow.length; i++) {
      document.getElementById('funCodeInputID'+carePlanRow[i].rowID).value = list.code;
      document.getElementById('funCareDateID'+carePlanRow[i].rowID).value = formattedDate;
      document.getElementById('funCareDescriptionID'+carePlanRow[i].rowID).value = list.description;
      setCheckedMap(prevState => ({
        ...prevState,
        ['mentalStatusID' + carePlanRow[i].rowID]: list.activity == 1? true : false
    }))
    }
  }

  const handleEditSave = () => {
    handleSave()
  }


  useEffect(() => {
    getfunAndCog();
  },[setFunctionalAndCog])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="med-box">
              <div class="title mb-1" style={{backgroundColor:'#80808036'}}>Enter Details</div>
              <div className="inner-content">
                <div className='container-fluid border border-primary mb-2 rounded'>
                {carePlanRow && carePlanRow.map((carePlan, index) => {
                  const checkBoxId = 'mentalStatusID' + carePlan.rowID;
                    return (
                        <div key={index}>
                            <div className="row mb-2">
                                <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                                    <label className='form-label'>Code :<span className="starMandatory">*</span></label>
                                    {/* <input type='text'  className='form-control form-control-sm'  id={'codeInputID' + carePlan.rowID} placeholder="Enter Code" onClick={() => { handleOpenModal('codeInputID' + carePlan.rowID) }} /> */}
                                    <input type='text' className='form-control form-control-sm' id={'funCodeInputID' + carePlan.rowID} onClick={() => { handleOpenModal('funCodeInputID' + carePlan.rowID) }} placeholder='Select Code'/>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                                    <label className='form-label'>Date :</label>
                                    <input type='date' className='form-control form-control-sm' id={'funCareDateID' + carePlan.rowID} />
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-6 mb-2">
                                    <label className='form-label'>Mental Status</label>
                                    <div className="form-check">
                                        <input type='checkbox' className='form-check-input' id={'mentalStatusID' + carePlan.rowID} role='switch' checked={checkedMap[checkBoxId]} onChange={() => {handleCheckboxChange('mentalStatusID' + carePlan.rowID)}}/>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-6 col-md-6 mb-2">
                                    <label className='form-label'>Description :</label>
                                    <textarea className='form-control form-control-sm' id={'funCareDescriptionID' + carePlan.rowID} />
                                </div>
                                {(toShowButtons === 1) &&
                                  <div className="col-xl-3 col-lg-6 col-md-6 mb-2">
                                    <label className='form-label'>&nbsp;</label>
                                    <div className="mb-2 d-flex justify-content-end_ flex-wrap">
                                        <div>
                                            {index === carePlanRow.length - 1 ? (
                                                <>
                                                    <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 ms-2" onClick={() => { handleAddCarePlanRow(carePlan.rowID) }}><img src={plus} className='icnn' alt='' />Add</button>
                                                    <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" onClick={() => { handleDeleteObservationRow(index, carePlan.rowID) }}><img src={deleteIcon} className='icnn' alt='' />Delete</button>
                                                </>
                                            ) : (
                                                <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 ms-2" ><img src={deleteIcon} className='icnn' alt='' />Delete</button>
                                            )}
                                        </div>
                                    </div>
                                </div>}
                                
                            </div>
                        </div>
                    );
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
                  {(toShowButtons === 1) ?
                    <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={handleSave}><img src={save} className='icnn' alt='' />Save</button> :
                    <button type="button" className="btn btn-save btn-sm btn-save-fill mb-1 me-1" onClick={handleEditSave}><img src={save} className='icnn' alt='' />Update</button>}
                    
                    <button type="button" className="btn btn-clear btn-sm mb-1 me-1 btnbluehover" onClick={handleClear}><img src={clear} className='icnn' alt='' />Clear</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mt-2">
            <div className="med-table-section" style={{ maxHeight: "40vh", minHeight: '20vh' }}>
              <table className="med-table border_ striped mt-3">
                <thead style={{ zIndex: "0" }}>
                  <tr>
                    <th className="text-center" style={{ width: "5%" }}>
                      #
                    </th>
                    <th>Date</th>
                    <th>Code Type</th>
                    <th>Codetext</th>
                    <th>Mental Status</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getFunAndCogList && getFunAndCogList.map((list, ind) => {
                    return(
                      <tr key={list.id}>
                        <td>{ind + 1}</td>
                        <td>{list.date}</td>
                        <td>{list.code}</td>
                        <td>{list.codetext?list.codeText : '---'}</td>
                        <td>{list.activity == 1? 'True' : 'False'}</td>
                        <td>{list.description}</td>
                        <td>
                            
                            <button type="button" className="btn btn-secondary btn-sm btn-save-fill mb-1 me-1" title="Edit" onClick={() => {handleEdit(list)}}>
                              <img src={editIcon} className="icnn" alt="" />
                            </button>
                            <button type="button" className="btn btn-danger btn-sm btn-danger-fill mb-1 me-1" title="Delete" onClick={() => {handleDelete(list.id)}} >
                              <img src={deleteIcon} className="icnn" alt="" />
                            </button>
                          </td>
                        
                      </tr>
                    )
                  })}
                </tbody>
              </table>
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


      <CodeMaster style={customStyle} SelectedData={SelectedData} defaultData={makeData} modalID={PopUpId} isMultiple={false} />
      {/*<CodeMaster style={customStyle} SelectedData = {SelectedData} modalID={PopUpId}/> */}
    </div>
  </div>
</div>
: ''}
{/* ------------------------------------------ Code Master popUp End------------------------------------ */}
    </>
  )
}
