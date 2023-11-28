import React, { useEffect, useState } from 'react'
import DropdownWithSearch from '../../../Component/DropdownWithSearch';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import Loader from '../../../Component/Loader';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';
import { useTranslation } from 'react-i18next';
import TextEditor from '../../../Component/TextEditor';
import editBtnIcon from '../../../assets/images/icons/edit.svg';
import IconDelete from '../../../assets/images/icons/IconDelete.svg'
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import GetNotificationCategory from '../../Api/Schedule/GET/GetNotificationCategory';
import GetAllTemplate from '../../../Notification Scheduler/API/GET/GetAllTemplate';
import GetUserList from '../../Api/Schedule/GET/GetUserList';
import PostTask from '../../Api/Schedule/POST/PostTask';

export default function TaskMaster() {
    let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
    let [categoryList, setCategoryList] = useState([]);
    let [selectedcategory, setSelectedCategory] = useState();
    let [editCategory, setEditCategory] = useState('');
    let [userList, setUserList] = useState([]);
    let [selectedUser,setSelectedUser]=useState();
    let [templateList, setTemplateList] = useState([]);
    let [selectedTemplateData, setSelectedTemplateData] = useState([]);
    let [customBody, setCustomBody] = useState();
    let [clearDropdown, setClearDropdown] = useState(0);
    let [showToster, setShowToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [showLoder, setShowLoder] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let [updateBool, setUpdateBool] = useState(0);
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [rowID, setRowId] = useState(0);
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isChecked, setIsChecked] = useState(true);


    let handleChange = (e) => {
        document.getElementById('errReciever').style.display = "none";
        document.getElementById('errCategory').style.display = "none";
        const name = e.target.name;
        const value = e.target.value;
        if (name === "ddlUser") {
            setSelectedUser(value);
        }
        if (name === "ddlCategory") {
            setSelectedCategory(value);
        }
        if (name === "ddlTemplate") {
            setSelectedTemplateData(value)
        }
        if (name === "responseValue") {
            setCustomBody(e.target.value);
        }
    }

    // SAVE DATA
    let handlerSave = async () => {
        if (selectedUser === '' || selectedUser === 0 || selectedUser === null || selectedUser === undefined) {
            document.getElementById("errReciever").innerHTML = "Please select User";
            document.getElementById("errReciever").style.display = "block";
        }
        else if (selectedcategory === '' || selectedcategory === 0 || selectedcategory === null || selectedcategory === undefined) {
            document.getElementById("errCategory").innerHTML = "Please select category";
            document.getElementById("errCategory").style.display = "block";
        }
        else {
            const obj = {
                "scheduleId": 0,
                "schedulerTypeId": 0,
                "notificationTemplateId":selectedTemplateData.id,
                "notificationTitle":'' ,
                "notificationBody": "",
                "senderId": userID,
                "recieverId": selectedUser,
                "isSent": true,
                "isTask": true,
                "responseValue": customBody,
                "isResponseRequired": isChecked,
                "verificationType": 0,
                "verifiedBy": userID,
                "categoryId": selectedcategory,
                "methodName": ""
            }
            console.log("Saved Data:::::>",obj)
            // return;
            setShowUnderProcess(1);

            const response = await PostTask(obj);
            if(response.status===1){
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowToster(1);
                setTosterMessage("Saved Successfully");
                setTimeout(() => {
                   setShowToster(0);
                   handleClear(1);
                }, 2000)
            }
            else{
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

    // UPDATE DATA
    let handlerUpdate = async () => {

    }

    let getCategoryList = async () => {
        const response = await GetNotificationCategory();
        if (response.status === 1) {
            console.log("responseValue", response.responseValue)
            setCategoryList(response.responseValue);
        }
    }

    let getTemplateList = async () => {
        const response = await GetAllTemplate();
        if (response.status === 1) {
            console.log("responseValue", response.responseValue)
            setTemplateList(response.responseValue);
        }
    }


    let getAllUsers = async () => {
        const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
        const response = await GetUserList(clientID);
        if (response.status === 1) {
            setUserList(response.responseValue);
        }
    }
    const handlerTemplate = async (e) => {
        document.getElementById('errTemplate').style.display = "none";
        const key = e.target.value;
        console.log('e.target.value', e.target.value)
        for (var i = 0; i < templateList.length; i++) {
            if (templateList[i].id === key) {
                console.log('templateList[i].id === key', templateList[i])
                setSelectedTemplateData(templateList[i])
            }
        }
    }

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked ? true : false);
    };

    // CLEAR DATA
    let handleClear = (value) => {
        setRowId(0);
        setUpdateBool(0);
        setClearDropdown(value);
        setSelectedCategory('');
        setSelectedUser('');
        setRowId('');
        setSelectedTemplateData('');
        setCustomBody('');
        document.getElementById('errReciever').style.display = "none";
        document.getElementById('errCategory').style.display = "none";
        setSelectedTemplateData([])

    }

    useEffect(() => {
        getAllUsers();
        getCategoryList();
        getTemplateList();
    }, []);
    return (
        <>
            <section className="main-content pt-3 mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="med-box">
                                <div className="title">Task Master </div>
                                <div className="inner-content">
                                    <div className="d-flex flex-wrap align-content-end">
                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="roleId" className="form-label">Reciever <span className="starMandatory"></span></label>
                                            {userList &&
                                                <DropdownWithSearch defaulNname="Select reciever" name="ddlUser" list={userList} valueName="id" displayName="name" getvalue={handleChange} editdata={editCategory} clear={clearDropdown} clearFun={handleClear} />
                                            }
                                            <small id="errReciever" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="roleId" className="form-label">Category <span className="starMandatory"></span></label>
                                            {categoryList &&
                                                <DropdownWithSearch defaulNname="Select Category" name="ddlCategory" list={categoryList} valueName="id" displayName="notificationTitle" getvalue={handleChange} editdata={editCategory} clear={clearDropdown} clearFun={handleClear} />
                                            }
                                            <small id="errCategory" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>

                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="template" className="form-label">Template</label>
                                            {templateList &&
                                                <DropdownWithSearch defaulNname="Select Template" id="ddlTemplate" name="ddlTemplate" list={templateList} valueName="id" displayName="notificationTitle" getvalue={handlerTemplate} clear={clearDropdown} editdata={""} clearFun={handleClear} />
                                            }
                                            <small id="errTemplate" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>

                                        {selectedTemplateData.length === 0 ?
                                            <div className="col-xl-4 mb-2">
                                                <div className="disch">
                                                    <label htmlFor="customBody" className="form-label">Custom Template</label>
                                                    <TextEditor getTextvalue={handleChange} setValue={customBody} name="responseValue" id="responseValue" />
                                                </div>
                                            </div>
                                            :
                                            <div className="col-xl-4 mb-2">
                                                <div className="disch_">
                                                    <label htmlFor="customBody" className="form-label">{selectedTemplateData.notificationTitle} Template</label>

                                                    <div className='p-2' style={{ border: '1px solid #dee2e6', maxHeight: '200px', overflow: 'auto', fontSize: '13px' }}>
                                                        <div className="mb-2">
                                                            <div className="form-label fw-bold">Sms Template</div>
                                                            <div>{selectedTemplateData.smsTemplate}</div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <div className="form-label fw-bold">Mail Template</div>
                                                            <div>{selectedTemplateData.mailTemplate}</div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <div className="form-label fw-bold">Firebase Template</div>
                                                            <div>{selectedTemplateData.firebaseTemplate}</div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <div className="form-label fw-bold">SignalR Template</div>
                                                            <div>{selectedTemplateData.signalRTemplate}</div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <div className="form-label fw-bold">Whatsapp Template</div>
                                                            <div>{selectedTemplateData.whatsappTemplate}</div>
                                                        </div>
                                                    </div>

                                                    <button type="button" className="btn btn-clear btn-sm mb-1 mt-2" onClick={() => { "handleClearTemplate"() }}><img src={clearIcon} className='icnn' />Clear</button>
                                                </div>
                                            </div>
                                        }


                                        <div className="col-xl-2 col-lg-2 mb-2 me-2">
                                            <label htmlFor="projectName" className="form-label" style={{ 'padding-right': '5px' }}>Is Response Required</label>
                                            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                                        </div>


                                        <div className='col-xl-12'>
                                            <div className='d-flex justify-content-end'>
                                                <div className="mb-2 relative">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
                                                    <div>
                                                        {showUnderProcess === 1 ?
                                                            <TosterUnderProcess />
                                                            :
                                                            <>
                                                                {showToster === 1 ?
                                                                    <Toster value={tosterValue} message={tosterMessage} />
                                                                    :
                                                                    <div>
                                                                        {updateBool === 0 ?
                                                                            <>
                                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlerSave}><img src={saveButtonIcon} className='icnn' />{t("Save")} </button>
                                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={'handlerUpdate'}>Update</button> */}
                                                                                <button type="button" className="btn btn-clear btn-sm mb-1" onClick={() => { handleClear(1) }}>Cancel</button>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}

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
