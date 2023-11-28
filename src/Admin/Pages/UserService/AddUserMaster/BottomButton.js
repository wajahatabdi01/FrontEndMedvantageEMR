import React, { useState } from 'react'
import TosterUnderProcess from '../../../../Component/TosterUnderProcess'
import Toster from '../../../../Component/Toster'
import PostAddUser from '../../../Api/UserService/PostAddUser'
import PutAddUser from '../../../Api/UserService/PutAddUser'
import AlertToster from '../../../../Component/AlertToster'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function BottomButton(props) {

    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterValue, setTosterValue] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")
    let [showError, setShowError] = useState(0)
    let [showErrorMsg, setShowErrorMsg] = useState("")
    const { t } = useTranslation();
    document.body.dir = i18n.dir();


    let handleSave = async () => {
        console.log("menu", props.menuData)
        // if (props.menuData.length !== 0) {
            setShowUnderProcess(1)
            let sendObject = {
                ...props.userData,
                clientID: JSON.parse(window.sessionStorage.getItem("LoginData")).clientId,
                titleID: 0,
                userId: window.userId,
                "userMenuPrivilegeList": [...props.menuData],
                "departmentHeadList": [...props.departmentData]
            }
            console.log("senddata", sendObject)
            let response = await PostAddUser(sendObject)
            if (response.status === 1) {
                setShowUnderProcess(0)
                setShowToster(1)
                setTosterMessage("Data Saved SuccessFully!")
                setTosterValue(0)
                props.setEditCall(0)
                props.setUserData([])
                props.setDepartmentdata([])
                props.setMenuData([])
                props.setEditedUserData([])
                props.setEditedDepartmentData([])
                props.setEditedMenuData([])
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
                props.getdata()
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
        // }
        // else {
        //     setShowError(1)
        //     setShowErrorMsg("Please Select Menu")
        // }

    }

    // let handleUpdate = async () => { 
    //     setShowUnderProcess(1)
    //     console.log("data",...props.menuData )

    //     let sendObject = {
    //         ...props.userData,
    //         clientID: JSON.parse(window.sessionStorage.getItem("LoginData")).clientId,
    //         titleID: 0,
    //         userId: window.userId,
    //         "userMenuPrivilegeList": [...props.menuData],
    //         "departmentHeadList": [...props.departmentData]

    //     }

    //     let response = await PutAddUser(sendObject)
    //     if (response.status === 1) {
    //         setShowUnderProcess(0)
    //         setShowToster(1)
    //         setTosterMessage("Data Saved SuccessFully!")
    //         setTosterValue(0)
    //         setTimeout(() => {
    //             setShowToster(0)
    //         }, 2000)
    //     }
    //     else {
    //         setShowUnderProcess(0)
    //         setShowToster(1)
    //         setTosterMessage(response.responseValue)
    //         setTosterValue(1)
    //         setTimeout(() => {
    //             setShowToster(0)
    //         }, 2000)
    //     }
    // }

    useEffect(()=>{

        console.log("call value", props.editCall)
    }, [props.editCall])

    return (
        <div className="mb-2 relative">
            {showUnderProcess === 1 ? <TosterUnderProcess /> :
                <>
                    {showToster === 1 ?
                        <div className="d-flex justify-content-end">
                            <Toster value={tosterValue} message={tosterMessage} />
                        </div>
                        :
                        <div>
                            <div className="rt-btns">
                                {/* <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><i className="far fa-save me-1"></i>Save </button> */}
                                {props.step > 1 && (
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={props.handlePrevious} > <i className="fas fa-angle-double-left me-1"></i> {t("PREVIOUS")}  </button>
                                )}
                                {props.step < 3 && (
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={props.handleNext} ><i className="fas fa-angle-double-right me-1"></i> {t("NEXT")} </button>
                                )}

                                {props.step >= 3 && (
                                    
                                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><i className="far fa-save me-1" ></i>{props.editCall === 0 ? t('Save') : t('Update')}</button> 
                                   
                                        // <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><i className="far fa-save me-1" ></i>Update</button>
                                )}
                                {
                                    props.editCall === 1 &&
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={props.handleCancleEdit} ><i className="fas fa fa-remove me-1"></i> {t("Clear")} </button>
                                }


                            </div>
                        </div>
                    }
                </>
            }
            {
                showError === 1 ? <AlertToster handle={setShowError} message={showErrorMsg} /> : ""
            }
        </div>
    )
}
