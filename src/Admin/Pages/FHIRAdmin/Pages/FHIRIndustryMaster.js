
import Search from '../../../../Code/Serach';
import { t } from 'i18next';
import React, { useState } from 'react'
import { useEffect } from 'react';
import saveButtonIcon from '../../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../../assets/images/icons/edit.svg';
import Toster from '../../../../Component/Toster';
import TosterUnderProcess from '../../../../Component/TosterUnderProcess';
import Heading from '../../../../Component/Heading';
import BoxContainer from '../../../../Component/BoxContainer';
import TableContainer from '../../../../Component/TableContainer';
import SuccessToster from '../../../../Component/SuccessToster';
import AlertToster from '../../../../Component/AlertToster';
import Loader from '../../../../Component/Loader';
import GetFHIRIndustryMaster from '../Api/FHIRIndustryMaster/GetFHIRIndustryMaster';
import handleSearchs from '../../../../PatientMonitorDashboard/Code/PMDCode';
import PostFHIRIndustryMaster from '../Api/FHIRIndustryMaster/PostFHIRIndustryMaster';
import PutFHIRIndustryMaster from '../Api/FHIRIndustryMaster/PutFHIRIndustryMaster';
import DeleteFHIRIndustryMaster from '../Api/FHIRIndustryMaster/DeleteFHIRIndustryMaster';


export default function FHIRIndustryMaster() {
    
  let [industryList,setIndustryList]= useState("")
  let [industryListMain,setIndustryListMain] = useState("");

  let [showUnderProcess, setShowUnderProcess] = useState(0);
  let [showToster, setShowToster] = useState(0);
  let [tosterMessage, setTosterMessage] = useState("");
  let [tosterValue, setTosterValue] = useState(0);
  let [showLoder, setShowLoder] = useState(0);
  let [isShowToaster, setisShowToaster] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [showSuccessMsg, setShowSuccessMsg] = useState('');
  let [SearchInput,setSearchInput] = useState('');
  let [updateBool,setUpdateBool] = useState(0);
  let [rowId,setRowId] = useState(0);
  let [sendForm,setSendForm] = useState({
          name : '',
          code : '',
          userId : window.userId
       });


    // handle Change
  let handleChange = (e)=> {
    let name = e.target.name;
    let value = e.target.value;
     setSendForm(sendForm=>({
        ...sendForm,
        [name] : value
     }))
  }

  // Maping Process

  let GetIndustryList = async()=>{
   
     const response = await GetFHIRIndustryMaster()
      if(response.status === 1){
        setIndustryList(response.responseValue);
        setIndustryListMain(response.responseValue);
       
      }
      else{
         setShowLoder(0);
         setShowAlertToster(1);
         setShowErrMessage(response.responseValue);
         setTimeout(()=>{
         setShowAlertToster(0);
         },1500)
      }
  }


  //handle search
  let handleSearch = (e) => {
    let resp = Search(industryListMain, e.target.value)
    if (e.target !== "") {
      if (resp.length !== 0) {
        setIndustryList(resp)
      }
      else {
        setIndustryList([])
      }
    }
    else {
        setIndustryList(industryListMain)
    }
  }


  //Handle Save
  const handleSave = async () => {
    if (sendForm.name === '' || sendForm.name === null || sendForm.name === undefined) {
      document.getElementById('errName').innerHTML = "Class name is required";
      document.getElementById('errName').style.display = "block";
    }
    else {
      setShowUnderProcess(1);
      const response = await PostFHIRIndustryMaster({
        ...sendForm,
      });
      if (response.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Data Saved Successfully.");
        setTimeout(() => {
          setShowToster(0);
          handleClear();
          GetIndustryList();

        }, 1500)
      }
      else {
        setShowUnderProcess(0);
        setTosterValue(1);
        setShowToster(1);
        setTosterMessage(response.responseValue);
        setTimeout(() => {
          setShowToster(0);
        }, 1500)
      }
    }
  }

  //Handle Button Change
  let handleUpdate = async (id, name, code, userId) => {
    setUpdateBool(1)
    setSendForm(sendForm => ({
      ...sendForm,
      "Id": id,
      "name": name,
      "code": code,
      "userId": window.userId,
    }))

    document.getElementById("name").value = name;
    document.getElementById("code").value = code;
  }

  //Handle Update
  const handlerUpdate = async () => {
    if (sendForm.name === '' || sendForm.name === null || sendForm.name === undefined) {
      document.getElementById('errName').innerHTML = "Class name is required";
      document.getElementById('errName').style.display = "block";
    }

    else {
      setShowUnderProcess(1);
      const response = await PutFHIRIndustryMaster({
        ...sendForm,
      });
      if (response.status === 1) {
        setShowUnderProcess(0);
        setTosterValue(0);
        setShowToster(1);
        setTosterMessage("Updated Successfully..");
        setTimeout(() => {
          setShowToster(0);
          handleClear();
          GetIndustryList();

        }, 1500)
      }
      else {
        setShowUnderProcess(0);
        setTosterValue(1);
        setShowToster(1);
        setTosterMessage(response.responseValue);
        setTimeout(() => {
          setShowToster(0);
        }, 1500)
      }
    }
  }

  //Handle Delete
  const handleDelete = async () => {
    setShowLoder(1);
    let obj = {
      id: rowId,
    }
    const response = await DeleteFHIRIndustryMaster(obj);
    if (response.status === 1) {
      setShowLoder(0)
      setisShowToaster(1);
      setShowSuccessMsg("Deleted Successfully")
      setTimeout(() => {
        setisShowToaster(0);
        GetIndustryList();
      }, 1500)
      handleClear();
    }
    else {
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
      setTimeout(() => {
        setShowAlertToster(0);
      }, 1500)
    }
  }

  //Clear Error Message
  const clearValidationErrMessage = () => {
    document.getElementById('errName').style.display = "none";
  }

  //Handle Clear
  const handleClear = (value) => {
    clearValidationErrMessage();
    setUpdateBool(0);
    setSendForm({ "userId": window.userId, "name": '', "code": '' })
    document.getElementById("name").value = "";
    document.getElementById("code").value = "";
  }

 

  useEffect(()=>{
    GetIndustryList();
  },[])

  return (
   <>
   <section className="main-content">
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
              <Heading text="Industry Master"/>
                <BoxContainer>
                   <div className="col-2 mb-2 me-2">
                       <label htmlFor="name" className="form-label">Industry Name<span className="starMandatory">*</span></label>
                       <input type="text" name="name" id="name" className="form-control form-control-sm" onChange={handleChange} placeholder={t("Enter Name")}/>
                       <small id="errName" className="invalid-feedback" style={{display:'none'}}></small>
                   </div>
                      <div className="col-2 mb-2 me-2">
                        <label htmlFor="code" className="form-label">Code<span className="starMandatory">*</span></label>
                        <input type="text" name="code" id="code" className="form-control form-control-sm" onChange={handleChange} placeholder={t("Enter Code")}/>
                        <small id="errCode" className="invalid-feedback" style={{display:'none'}}></small>
                      </div>

                      <div className="mb-2 relative">
                        <label htmlFor="extenderinput" className="form-label">&nbsp;</label>
                        <div>
                            {showUnderProcess === 1 ?  <TosterUnderProcess /> : 
                            <>
                            {showToster === 1 ? 
                               <Toster value={tosterValue} message={tosterMessage} />
                               :
                               <div>
                                 {updateBool === 0 ? 
                                 <>
                                 <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt=''/>Save</button>
                                 <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt='' />Clear</button>
                                 </>
                                 :
                                 <>
                                 <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlerUpdate}>Update</button>
                                 <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}>Cancle</button>
                                 </>
                                 }
                               </div>
                            }
                            </>
                            }
                        </div>
                      </div>
                </BoxContainer>
            </div>
            <div className="col-12 mt-2">
                <div className="handlser">
                    <Heading text="Industry Master List"/>
                    <div style={{position:'relative'}}>
                        <input type="text" className="form-control form-control-sm" onChange={handleSearch} placeholder={t("Search")} />
                        <span className="tblsericon"><i class="fas fa-search"></i></span>
                    </div>
                </div>
                <div className="med-table-section" style={{"height" : "75vh"}}>
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{"width" : "5%"}}>#</th>
                                <th>Industry Name</th>
                                <th>Code</th>
                                <th className="text-center" style={{"width": "10%"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {industryList && industryList.map((val,ind)=>{
                                return(
                                    <tr key={val.id}>
                                        <td className="text-center">{ind + 1}</td>
                                        <td>{val.name}</td>
                                        <td>{val.code}</td>
                                        <td>
                                          <div className="action-button">
                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.name, val.code, val.userId) }} /></div>
                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }} /></div>
                                          </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </TableContainer>
                     {/*  <!-- Modal -->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                  <div className="modal-dialog modalDelete">
                    <div className="modal-content">

                      <div className="modal-body modelbdy text-center">
                        <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                        <div className='popDeleteTitle mt-3'>Delete?</div>
                        <div className='popDeleteContent'>Are you sure want to delete?</div>
                      </div>
                      <div className="modal-footer1 text-center">

                        <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn-delete popBtnDelete" onClick={handleDelete} data-bs-dismiss="modal">Delete</button>
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



