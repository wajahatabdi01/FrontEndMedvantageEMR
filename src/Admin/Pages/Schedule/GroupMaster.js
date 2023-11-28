import React, { useEffect, useState } from 'react'
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import Heading from '../../../Component/Heading';
import { useTranslation } from 'react-i18next';
import IconEdit from '../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import GetUserList from '../../Api/Schedule/GET/GetUserList';
import GetGrouplist from '../../Api/Schedule/GET/GetGrouplist';
import PostGroup from '../../Api/Schedule/POST/PostGroup';


export default function GroupMaster() {
    let[userList,setUserList]=useState([]);
    let[userGroupList,setUserGroupList]=useState([]);
    let[groupList,setGroupList]=useState([]);
    let[name,setName]=useState();
    let [clearDropdown, setClearDropdown] = useState(0);
    let[assignUser,setAssignUser]=useState();
    let [selectedUser, setSelectedUser] = useState();
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('')
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    let [userType, setUserType] = useState([]);
    const { t } = useTranslation();
    let [content, setContent] = useState('');

    // let getAllUsers = async () => {
    //     // const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    //     const response = await GetUserList();
    
    //  }

    let handleChange=(e)=>{
        document.getElementById('errName').style.display = "none";
        const name=e.target.name
        const value=e.target.value
        if(name==="name"){
            setName(value);
        }
        if(name==="ddlUserType"){
            setSelectedUser(value);
        }
    }

     let getdata=async()=>{
        const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
        const responseUser = await GetUserList(clientID);
       const response= await GetGrouplist();
       if(response.status===1){
        setGroupList(response.responseValue);
       } 
       if (responseUser.status === 1) {
        setUserList(responseUser.responseValue);
     }
     }


    let handlerSave = async () => {
        var tempCol = [];
        if (name === '' || name === 0 || name === undefined || name === null) {
           document.getElementById('errName').innerHTML = "Please enter group name";
           document.getElementById('errName').style.display = "block";
        }
        else {
            for (var i = 0; i < userType.length; i++) {
                tempCol.push(userType[i].id);
             }
           const obj = {
            name:name,
            assignUserId:tempCol 
           }
        //    setShowUnderProcess(1);
           const response = await PostGroup(obj);
           if (response.status === 1) {
              setShowUnderProcess(0);
              setTosterValue(0);
              setShowToster(1);
              setTosterMessage("Data Saved Successfully");
              getdata();
              setTimeout(() => {
                 setShowToster(0);
                 handleClear(1);
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


     let handleClear = (value) => {
        setRowId(0);
        setName("");
        setUpdateBool(0);
        setClearDropdown(value);
        setRowId('');
        setSelectedUser('');
        document.getElementById('errName').style.display = "none";
        // document.getElementById('errName').value = "";
     }
  


     let handlerSelectAll = () => {
        const isSelectedAll = document.getElementById("ddlSelectAllUser").checked;
        let tempArr = [];
        for (var i = 0; i < userList.length; i++) {
           let getID = userList[i].id;
           if (isSelectedAll === true) {
              document.getElementById(getID).checked = true;
              tempArr.push({
                 id: getID
              })
           }
           else {
              document.getElementById(getID).checked = false;
           }
        }
        setUserType(tempArr)
  
     }

     let changeUser = (ids) => {
        let data = [...userType]
        if (data.length === 0) {
           data.push(
              {
                 id: ids
              }
           )
        }
        else {
           var index = data.findIndex((arr, i) => arr.id === ids);
           if (index !== -1) {
              document.getElementById('ddlSelectAllUser').checked = false;
              data.splice(index, 1);
           }
           else {
              data.push(
                 {
                    id: ids
                 }
              )
           }
  
        }
        setUserType(data)
     };
     
     useEffect(()=>{
        getdata();
     },[]);
  return (
    <>
         <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Group Master </div>
                                {/* <div className="title">{content} </div> */}
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">
                                            <label htmlFor="groupName" className="form-label">Group Name<span className="starMandatory">*</span></label>
                                            <input type="text" className="form-control form-control-sm" id="name" placeholder="Enter group name" name="name" value={name} onChange={handleChange} />
                                            <small id="errName" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>

                                        <div className="mb-2 me-2">
                           <label htmlFor="assignUser" className="form-label">Assign User<span className="starMandatory">*</span></label>
                           <div className="dropdown">
                              <button className="btn btn-light dropdown-toggle multi-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                 Select User
                              </button>
                              <ul className="dropdown-menu multistyl">
                                 <li className="d-flex flex-row ps-1 gap-2">
                                    <input type="checkbox" id="ddlSelectAllUser" onChange={handlerSelectAll} />
                                    <span>Select all</span>
                                 </li>
                                 {userList && userList.map((val, index) => {
                                    return (
                                       <>

                                          <li className="d-flex flex-row ps-1 gap-2">
                                          <input type="checkbox" name='ddlUserType' id={val.id} onClick={() => { changeUser(val.id); }} />
                                             <span htmlFor="val.id">{val.name}</span>
                                          </li>
                                       </>
                                    );
                                 })}
                              </ul>
                              <small id="errUser" className="form-text text-danger" style={{ display: 'none' }}></small>
                           </div>
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
                                                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' />{t("Save")} </button>
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1 me-1" onClick={handleClear}><img src={clearIcon} className='icnn' />Clear</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("UPDATE")}</button> */}
                                                                        <button type="button" className="btn btn-save btn-sm mb-1 me-1" >{t("UPDATE")}</button>
                                                                        {/* <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button> */}
                                                                        <button type="button" className="btn btn-clear btn-sm mb-1">{t("Cancel")}</button>
                                                                    </>
                                                                }
                                                            </div>}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 mt-1">
                            <div className='handlser'>
                                <Heading text="Group Master List" />
                                {/* <Heading text={content} /> */}
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className='form-control form-control-sm' placeholder={t("Search")} value={searchTerm} onChange={''} />
                                    <span className="tblsericon"><i class="fas fa-search"></i></span>
                                </div>
                            </div>
                            <div className="med-table-section" style={{ "height": "74vh" }}>
                                <table className="med-table border_ border-bottom striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>{t("S.No.")} </th>
                                            <th>Group Name</th>
                                            <th style={{width:'75%'}}>User Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {groupList && groupList.map((key, index) => {
                                            return (
                                                <tr>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{key.name}</td>
                                                    <td>

                                                    <div className='d-flex gap-1 flex-wrap'>
                                                    {key.groupUsers.map((val,i)=>{
                                                        return(
                                                        <span className='badge text-bg-secondary fw-light' style={{fontSize:'13px'}}> {val.name}</span>
                                                        )
                                                    })}

                                                       </div>

                                                        
                                                    </td>
                                                    <td>
                                                        <div className="action-button">
                                                            {/* <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { handleUpdate(key.id, key.bedName) }}><img src={IconEdit} alt='' /></div> */}
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row"><img src={IconEdit} alt='' /></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(key.id) }} alt='' /></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>


                {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">

                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                            </div>
                            <div className="modal-footer1 text-center">

                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                                {/* <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button> */}
                                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal">{t("Delete")}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

            </section>
    </>
  )
}
