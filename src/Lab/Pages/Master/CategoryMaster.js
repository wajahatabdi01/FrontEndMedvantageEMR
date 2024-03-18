import React, { useState, useEffect } from 'react'
import Heading from '../../../Component/Heading'
import BoxContainer from '../../../Component/BoxContainer'
import TableContainer from '../../../Component/TableContainer'
import ValidationTestCategoryMaster from '../../../Validation/LabService/ValidationTestCategoryMaster'
import PostCategoryMaster from '../../Api/CategoryMaster/PostCategoryMaster'
import GetCategoryMaster from '../../Api/CategoryMaster/GetCategoryMaster'
import DeleteCategoryMaster from '../../Api/CategoryMaster/DeleteCategoryMaster'
import PutCategoryMaster from '../../Api/CategoryMaster/PutCategoryMaster'
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import deleteBtnIcon from '../../../assets/images/icons/delete.svg';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
export default function CategoryMaster() {
    let [categoryList, setCategoryList] = useState()
    let [updateBool, setUpdateBool] = useState(0)
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [loder, setLoder] = useState(1)
    let[rowId,setRowId]=useState('');

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [tosterValue, setTosterValue] = useState(0)
    const { t } = useTranslation();

    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const userID=JSON.parse(sessionStorage.getItem("LoginData")).userId;



    //Handle Save
    let saveForm = async () => {
        let valresponse = ValidationTestCategoryMaster(sendForm.categoryName, sendForm.remark)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PostCategoryMaster(sendForm.categoryName, sendForm.remark,clientID,userID);
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
        let getResponse = await GetCategoryMaster(clientID);


        if (getResponse.status === 1) {
            // setLoder(0)
            setCategoryList(getResponse.responseValue)

        }

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
    
        //Handle Delete
        let handleDeleteRow = async () => {
            // setLoder(1)
            setShowUnderProcess(1)
            let response = await DeleteCategoryMaster(rowId)
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
    let handleUpdate = async (id, categoryName, remark, UserId) => {
        
        setUpdateBool(1)
        setSendForm(sendForm => ({
            ...sendForm,
            "Id": id,
            "categoryName": categoryName,
            "remark": remark,
            "UserId": UserId,
        }))

        document.getElementById("categoryName").value = categoryName;
        document.getElementById("remark").value = remark;
       // document.getElementById("UserId").value = window.UserId;
    }

    

    // Handle Update
    let saveUpdate = async () => {
        let valresponse = ValidationTestCategoryMaster(sendForm.categoryName, sendForm.remark)

        if (valresponse) {
            setShowUnderProcess(1)
            let response = await PutCategoryMaster(sendForm.categoryName,sendForm.remark,sendForm.Id, userID)
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
        document.getElementById("categoryName").value = "";
        document.getElementById("remark").value = "";
        setUpdateBool(0)
    }
    useEffect(() => {
        getdata()
    }, [])
    document.body.dir = i18n.dir();
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row">
                    <div class="col-12"><div class="med-box  mb-1"><div class="title">{t("Category_Master")}</div></div></div>
                        <div className="col-12">
                           
                        <div class="inner-content">
                           <div className='dflex regEqualColums whitebg paddingcustom twocol'>

                                <div className="col-2 mb-2 me-2">
                                    <label htmlFor="categoryName" className="form-label">{t("Category_Name")}<span className="starMandatory">*</span></label>
                                    <input type="text" name="categoryName" id="categoryName" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Sample_Name")} />
                                </div>
                                <div className="col-2 mb-2 me-2">
                                    <label htmlFor="remark" className="form-label">{t("Remark")} <span className="starMandatory">*</span></label>
                                    <input type="text" name="remark" id="remark" onChange={handleChange} className="form-control form-control-sm" placeholder={t("Remarks")} />
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button>
                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
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
                            <Heading text={t("All_Category_List")} />
                            <div className="med-table-section" style={{ "height": "76vh" }}>
                                <TableContainer>
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ "width": "5%" }}>#</th>
                                            <th>{t("Category_Name")}</th>
                                            <th>{t("Remark")}</th>
                                            <th style={{ "width": "10%" }} className="text-center">{t("Action")}</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {categoryList && categoryList.map((val, ind) => {
                                            return (
                                                <tr key={val.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td>{val.categoryName}</td>
                                                    <td>{val.remark}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom"><img src={editBtnIcon} className='' alt='' onClick={() => { handleUpdate(val.id, val.categoryName, val.remark, val.UserId) }}/></div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={deleteBtnIcon} className='' alt='' onClick={()=>{setRowId(val.id)}}/>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}


                                    </tbody>
                                </TableContainer>
                                {/* -----------------------Start Delete Modal Popup-------------------   */}

                                {/*  <!-- Modal -->  */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modalDelete">
                                        <div className="modal-content">

                                            <div className="modal-body modelbdy text-center">
                                                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                                                <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                                                <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                                            </div>
                                            <div className="modal-footer1 text-center">

                                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
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
