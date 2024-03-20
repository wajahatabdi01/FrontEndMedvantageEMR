import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationUserTestCategoryAsign from '../../../Validation/LabService/ValidationUserTestCategoryAsign'
import PostUserTestCategoryAssign from '../../Api/UserTestCategoryAssign/PostUserTestCategoryAssign'
import GetUserTestCategoryAssign from '../../Api/UserTestCategoryAssign/GetUserTestCategoryAssign'
import GetCategoryMaster from '../../Api/CategoryMaster/GetCategoryMaster'
import DeleteUserTestCategoryAssign from '../../Api/UserTestCategoryAssign/DeleteUserTestCategoryAssign'
import PutUserTestCategoryAssign from '../../Api/UserTestCategoryAssign/PutUserTestCategoryAssign'
import GetLabUser from '../../Api/LabUser/GetLabUser'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";
export default function UserTestCategoryAssign() {
    let [categoryUserAssignList, setcategoryUserAssignList] = useState([])
    let [testCategoryList, setTestCategoryList] = useState([])
    let [labUserList, setLabUserList] = useState([])
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": JSON.parse(sessionStorage.getItem("LoginData")).userId })
    let [loder, setLoder] = useState(1)
    let [rowId, setRowId] = useState('');
    const {t} = useTranslation();
    document.body.dir = i18n.dir();
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)

    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;
    
    //const userId = 


    //Handle Save
    let saveForm = async () => {
       
        let valresponse = ValidationUserTestCategoryAsign(sendForm.testCategoryID, sendForm.labUserID)
        
        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostUserTestCategoryAssign(sendForm.testCategoryID, sendForm.labUserID,userID, clientID);
           
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Save SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                handleClear();
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
            getdata()
        }
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }

    //Get data
    let getdata = async () => {
        
        let getResponse = await GetUserTestCategoryAssign(clientID);
       
        let getCategory = await GetCategoryMaster();
        
        let getUser = await GetLabUser(clientID);


       
            
            setcategoryUserAssignList(getResponse.responseValue)
            setTestCategoryList(getCategory.responseValue)
            setLabUserList(getUser.responseValue)

        

    }
    //Handle Change
    let handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSendForm(sendForm => ({
            ...sendForm,
            [name]: value
        }))
    }
    // //Handle Delete
    // let handleDeleteRow = async () => {
    //     setLoder(1)
    //     let response = await DeleteUserTestCategoryAssign(rowId)
    //     if (response.status === 1) {
    //         setLoder(0)
    //         getdata()
    //     }
    // }
    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1)
        let response = await DeleteUserTestCategoryAssign(rowId)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
            getdata()
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
    //Handle Button Change
    let handleUpdate = async (id, testCategoryID, labUserID, UserId) => {
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "Id": id,
            "testCategoryID": testCategoryID,
            "labUserID": labUserID,
            "UserId": UserId,
        }))

        document.getElementById("testCategoryID").value = testCategoryID;
        document.getElementById("labUserID").value = labUserID;
        //document.getElementById("UserId").value = UserId
    }

    // // Handle Update
    // let saveUpdate = async () => {
    //     let response = await PutUserTestCategoryAssign(sendForm.testCategoryID, sendForm.labUserID, sendForm.Id)

    //     if (response.status === 1) {
    //         setUpdateBool(0)
    //         getdata()
    //         handleClear();
    //     }
    // }
    // Handle Update
    let saveUpdate = async () => {
        let valResponse = ValidationUserTestCategoryAsign(sendForm.testCategoryID, sendForm.labUserID)
       
        if (valResponse) {
            setShowUnderProcess(1)
            let response = await PutUserTestCategoryAssign(sendForm.testCategoryID, sendForm.labUserID, sendForm.Id)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Updated SuccessFully!")
                setTosterValue(0)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)

                setUpdateBool(0)
                getdata()
                handleClear();
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
        else {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Field can't be blank!")
            setTosterValue(1)
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }


    //Handle Clear
    let handleClear = () => {
        setSendForm({ "userId": userID })
        document.getElementById("testCategoryID").value = 0;
        document.getElementById("labUserID").value = 0;
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                    <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("User_Test_Category_Assign")}</div></div></div>
                        <div className="col-12">
                            
                        <div class="inner-content">
                             <div className='dflex regEqualColums whitebg paddingcustom twocol'>
                                <div className="col-2 mb-2 me-2">
                                    <label htmlFor="testCategoryID" className="form-label">{t("Test_Category")} <span className="starMandatory">*</span></label>

                                    <select name='testCategoryID' id="testCategoryID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {testCategoryList && testCategoryList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{t(val.categoryName)}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-2 mb-2 me-2">
                                    <label htmlFor="labUserID" className="form-label">{t("Lab_User")} <span className="starMandatory">*</span></label>
                                    {/* <input type="number" name="labUserID" id="labUserID" onChange={handleChange} className="form-control form-control-sm" placeholder="Enter compound id" /> */}

                                    <select name='labUserID' id="labUserID" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option value="0">{t("SELECT")}</option>
                                        {labUserList && labUserList.map((val, index) => {
                                            return (
                                                <option value={val.id}>{t(val.userName)}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-2 mb-2 relative">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                    <div>
                                        {showUnderProcess === 1 ? <TosterUnderProcess /> :
                                            <>
                                                {showToster === 1 ?
                                                    <Toster value={tosterValue} message={tosterMessage} />

                                                    : <div className='textmbtn'>
                                                        {updateBool === 0 ?
                                                            <>
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' alt=''/>{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' alt=''/>{t("Clear")}</button>
                                                            </>
                                                            :
                                                            <>
                                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={saveUpdate}>{t("Update")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { setUpdateBool(0); handleClear() }}>{t("Cancel")}</button>
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
                        <div className="col-12 mt-1">
                            <Heading text={t("User_Test_Category_List")} />
                            <div className="med-table-section" style={{ "height": "76vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Category")}</th>
                                            <th>{t("Lab_User")}</th>
                                            <th>Designation</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {(categoryUserAssignList !== 'No record found') ?<>
                                            {categoryUserAssignList && categoryUserAssignList.map((val, ind) => {
                                          
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.categoryName}</td>
                                                    <td>{val.userName}</td>
                                                    <td>{val.designationName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.testCategoryId, val.labUserId, val.UserId) }}/></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={() => { setRowId(val.id) }}/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </>:''}
                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'> {t("Delete?")}</div>
                                                <div className='popDeleteContent'> {t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" >{t("Cancel")}</button>
                                                <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}
