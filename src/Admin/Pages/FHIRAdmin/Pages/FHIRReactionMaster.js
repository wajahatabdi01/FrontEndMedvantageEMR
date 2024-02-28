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
import GetFHIRReactionMaster from '../Api/FHIRReactionMaster/GetFHIRReactionMaster';
import PostFHIRReactionMaster from '../Api/FHIRReactionMaster/PostFHIRReactionMaster';
import PutFHIRReactionMaster from '../Api/FHIRReactionMaster/PutFHIRReactionMaster';
import DeleteFHIRReactionMaster from '../Api/FHIRReactionMaster/DeleteFHIRReactionMaster';

export default function FHIRReactionMaster() {
    let [reaction,setReaction]=useState("");
    let [dischargeDispositionListMain, setDischargeDispositionListMain] = useState("")
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [updateBool,setUpdateBool] = useState(0);
    let [SearchInput,setSearchInput] = useState('');
    let [rowId,setRowId] = useState(0);
    let [sendForm,setSendForm] = useState({
           title : '',
           code : '',
           userId : window.userId
    })

   let handlechange = (e)=> {
   let name = e.target.name;
   let value = e.target.value;
   setSendForm(sendForm => ({
      ...sendForm,
      [name] : value
   }))
   }

   let getData = async()=> {
     const response = await GetFHIRReactionMaster()
     if(response.status === 1){
        setReaction(response.responseValue);
        setShowLoder(0)
        console.log("dataGet" , response.responseValue)
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

    let handleSave = async()=> {
        
        if (sendForm.title === '' || sendForm.title === null | sendForm.title === undefined) {
            document.getElementById('errtitle').innerHTML = "Title is required";
            document.getElementById('errtitle').style.display = "block";
            return;
          }
        if (sendForm.code === '' || sendForm.code === null | sendForm.code === undefined) {
            document.getElementById('errCode').innerHTML = "Code is required";
            document.getElementById('errCode').style.display = "block";
            return;
          }
           {
            setShowUnderProcess(1);
            const response = await PostFHIRReactionMaster({
              ...sendForm,
              
            });
            if (response.status === 1) {
                // console.log("testrname is",response)
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Data Saved Successfully.");
                setTimeout(() => {
                  setShowToster(0);
                  handleClear();
                  getData();
        
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

     let handleClear = (value)=> {
            clearValidationErrMessage();
            setUpdateBool(0);
            setSendForm({
              "title" : '',
              "code" : '',
              "userId" : window.userId
            })
            document.getElementById("title").value="";
            document.getElementById("code").value="";
          }

          const clearValidationErrMessage = () => {
            document.getElementById('errtitle').style.display = "none";
          }
    
          let handleUpdate = async(id, title,code,userId)=> {
            setRowId(id)
            setUpdateBool(1);
            setSendForm(sendForm =>({
              ...sendForm,
              "id" : id,
              "title" : title,
              "code" : code,
              "userId" : window.userId
            }))
            document.getElementById("title").value=title;
            document.getElementById("code").value=code;
          }


          let handlerUpdate = async()=> {

            let obj ={
                "id": rowId,
                "title": sendForm.title,
                "code": sendForm.code,
                "userId": window.userId
               
            }
            console.log('ppp' , obj)
            const response = await PutFHIRReactionMaster(obj);
            if (response.status === 1) {
              console.log("Updated test result eidit",response);
              setShowUnderProcess(0);
              setTosterValue(0);
              setShowToster(1);
              setTosterMessage("Updated Successfully..");
              getData();
              setTimeout(() => {
                setShowToster(0); 
                handleClear();
             
      
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

    let handleSearch = (e) => {
        let resp = Search(reaction, e.target.value)
        if (e.target !== "") {
          if (resp.length !== 0) {
            setReaction(resp)
          }
          else {
            setReaction([])
          }
        }
        else {
            setReaction(reaction)
        }
      }
 
    let handleDelete = async()=> {
        setShowLoder(1);
        let obj = {
          id : rowId,
        }
        console.log('yyyy' , obj)
        const response = await DeleteFHIRReactionMaster(obj)
        if(response.status === 1){
         setShowLoder(0);
         setisShowToaster(1);
         setShowSuccessMsg("Deleted Successfully")
        //  setShowErrMessage("Delete Successfully");
         setTimeout(()=>{
           setisShowToaster(0);
           getData();
         },1500)
        }
        else{
         setShowLoder(0);
         setShowAlertToster(1);
         setShowErrMessage(response.responseValue);
         setTimeout(()=>{
          setShowAlertToster(0);
         },1500 )
        }
      }

      const handleOnChange=(e)=>{
        const {value , name} = e.target
         if(name=== "search"){
            setSearchInput(value)
        }
      }
  
    useEffect(() => {
        getData();
    
      }, []);

  return (
   <>
   <section className="main-content">
    <div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <Heading text="Reaction Master"/>
                <BoxContainer>
                    <div className="col-2 mb-2 me-2">
                        <label htmlFor="title" className="form-label" >Reaction Type<span className="starMandatory">*</span></label>
                        <input type="text" name="title" id="title" className="form-control form-control-sm" onChange={handlechange} placeholder={t("Enter Reaction")}/>
                        <small id="errtitle" className="invalid-feedback" style={{display:'none'}}></small>
                        
                    </div>
                      <div>
                        <label htmlFor="code" className="form-label">Code<span className="starMandatory">*</span></label>
                        <input type="text" name="code" id="code" className="form-control form-control-sm" onChange={handlechange} placeholder={t("Enter Code")}/>
                        <small id="errCode" className="invalid-feedback" style={{display:'none'}}></small>
                      </div>

                      <div className="mb-2 relative">
                        <label htmlFor="extenderinput" className="form-label"></label>
                        <div>
                            {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                <>
                                {showToster === 1 ?  <Toster value={tosterValue} message={tosterMessage} /> :
                                <div>
                                    {updateBool === 0 ?
                                    <>
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><img src={saveButtonIcon} className='icnn' alt='' />Save</button>
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
                    <Heading text="Reaction List"/>

                    <div style={{position : 'relative'}}>
                        <input type="text" className="form-control form-control-sm" placeholder={t("Search")} name='search' value={SearchInput} onChange={handleOnChange}/>
                        <span className="tblsericon"><i class="fas fa-search"></i></span>
                    </div>
                </div>
                
                <div className="med-table-section" style={{"height" : "75vh"}}>
                    <TableContainer>
                        <thead>
                            <tr>
                                <th className="text-center" style={{"width" : "5%"}}>#</th>
                                <th>Reaction List</th>
                                <th>Code</th>
                                <th className="text-center" style={{"width" : "10%"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reaction && reaction.filter((val) => `${val.title} ${val.code}`.toLowerCase().includes(SearchInput.toLowerCase())).map((val,ind)=>{
                                return(
                                    <tr key={val.id}>
                                        <td className="text-center">{ind + 1}</td>
                                        <td>{val.title}</td>
                                        <td>{val.code}</td>
                                        <td>
                                          <div className="action-button">
                                             <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.title, val.code, val.userId) }} /></div>
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



 
