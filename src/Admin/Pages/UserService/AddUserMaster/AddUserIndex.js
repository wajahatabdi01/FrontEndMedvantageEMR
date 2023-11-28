import React, { useEffect } from 'react'
import UserMaster from './UserMaster'
import AssignMenu from './AssignMenu'
import AssignDeaprtment from './AssignDeaprtment'
import BottomButton from './BottomButton'
import { useState } from 'react'
import UserTable from './UserTable'
import GetAddUser from '../../../Api/UserService/GetAddUser'
import ValidationAddUser from '../../../../Validation/Admin/UserService/ValidationAddUser'
import AlertToster from '../../../../Component/AlertToster'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import Loader from '../../../../Component/Loader'

export default function AddUserIndex() {
    const { t } = useTranslation();
    document.body.dir = i18n.dir();
    let [step, setStep] = useState(1)

    let [userData, setUserData] = useState([])
    let [departmentData, setDepartmentdata] = useState([])
    let [menuData, setMenuData] = useState([])
    let [userList, setUserList] = useState()
    let [editCall, setEditCall] = useState(0)
    let [editedUserData, setEditedUserData] = useState([])
    let [editedDepartmentData, setEditedDepartmentData] = useState([])
    let [editedMenutData, setEditedMenuData] = useState([])
    let [callFunForEditOrRoleId, setCallFunForEditOrRoleId] = useState(0)
    let [showError, setShowError] = useState(0)
    let [showErrorMsg, setShowErrorMsg] = useState("")
    let [showLoader, setShowLoader] = useState(1)

    let handlePrevious = () => {
        console.log("stwep", step)
        setStep(step - 1)
    }
    let handleNext = () => {
        console.log("stwep", step)
        if (step === 1) {
            // setStep(step + 1)

            // let respoonse = ValidationAddUser(userData.name, userData.email, userData.mobileNo, userData.userName, userData.roleId, userData.designationId, userData.departmentId)
            // if (respoonse[0] === true) {
            setStep(step + 1)
            // }
            // else {
            //     setShowError(1)
            //     setShowErrorMsg(respoonse[1])
            // }
        }
        if (step === 2) {
            // setStep(step + 1)

            // if (departmentData.length !== 0) {
            setStep(step + 1)
            // }
            // else {
            //     setShowError(1)
            //     setShowErrorMsg("Please Select Department")
            // }
        }

    }
    let getdata = async () => {
        const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
        let response = await GetAddUser(clientID)
        if (response.status === 1) {
            setShowLoader(0)
            setUserList(response.responseValue);
        }
        else {
            setShowLoader(0)
        }
    }

    let setEditData = (index, val) => {
        if (val === 0) {
            console.log("call edit", userList[index].menuList, index)

            setEditCall(1)
            setEditedUserData(userList[index].userDetails)
            setEditedDepartmentData(userList[index].departmentList)
            setEditedMenuData(userList[index].menuList)
            setCallFunForEditOrRoleId(0)
        }

        else if (val === 1) {
            // setEditCall(0)

            setEditedDepartmentData(index.departmentList)
            setEditedMenuData(index.menuList)
            setCallFunForEditOrRoleId(1)
        }

    }

    let handleCancleEdit = () => {
        setEditCall(0)
        setEditedUserData([])
        setEditedDepartmentData([])
        setEditedMenuData([])
        setCallFunForEditOrRoleId(0)

    }

    useEffect(() => {
        getdata();
    }, [])


    return (
        <section className="main-content mt-5 pt-3">
            <div className="container-fluid">
                <div className="App">

                    <div style={{ display: `${step === 1 ? "block" : "none"}` }}>
                        <UserMaster setUserData={setUserData} step={step} setStep={setStep} userList={userList} editedUserData={editedUserData} setEditData={setEditData} />
                    </div>

                    <div style={{ display: `${step === 2 ? "block" : "none"}` }}>
                        <AssignDeaprtment setDepartmentdata={setDepartmentdata} step={step} setStep={setStep} editedDepartmentData={editedDepartmentData} callFunForEditOrRoleId={callFunForEditOrRoleId} />
                    </div>

                    <div style={{ display: `${step === 3 ? "block" : "none"}` }}  >
                        <AssignMenu setMenuData={setMenuData} step={step} setStep={setStep} editedMenutData={editedMenutData} callFunForEditOrRoleId={callFunForEditOrRoleId} />
                    </div>
                    <BottomButton step={step} handlePrevious={handlePrevious} handleNext={handleNext} userData={userData} departmentData={departmentData} menuData={menuData} editCall={editCall} setEditCall={setEditCall} handleCancleEdit={handleCancleEdit} getdata={getdata} setUserData={setUserData} setDepartmentdata={setDepartmentdata} setMenuData={setMenuData} setEditedUserData={setEditedUserData} setEditedDepartmentData={setEditedDepartmentData} setEditedMenuData={setEditedMenuData} />
                    <UserTable userList={userList} setEditData={setEditData} getdata={getdata} />
                </div>
            </div>
            {
                showError === 1 ? <AlertToster handle={setShowError} message={showErrorMsg} /> : ""
            }
            {
                showLoader === 1 ? <Loader val={showLoader} /> : ""
            }
        </section>
    )
}
