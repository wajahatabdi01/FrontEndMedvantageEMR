import React, { useEffect, useState } from "react";
import profilepic from "../../../../assets/images/icons/profilepic.png"
import GetUserDetailsById from "../../../API/GET/GetUserDetailsById";
import HandleLanguage from '../../../../Code/LanguageManage';
import EditProfileIcon from "../../../../assets/images/icons/EditIconBlue.png";
import languageIcon from "../../../../assets/images/icons/languageIcon.png";


export default function UserProfile() {

    let [userList, setUserList] = useState([])
    let [sendForm, setSendForm] = useState({ "userId": window.userId })


    //User By ID
    // let getdataByID = async (val) => {
    //     let getResponse = await GetUserDetailsById(val);
    //     if (getResponse.status === 1) {
    //         setUserList(getResponse.responseValue[0])
    //     }
    // }




    let getdataByID = async (val) => {
        let getResponse = await GetUserDetailsById(val);
        if (getResponse.status === 1 && getResponse.responseValue.length > 0) {
            setUserList(getResponse.responseValue[0]);
        } else {
            console.error("Error fetching user data:", getResponse);
        }
    }

    useEffect(() => {
        getdataByID(window.userId);
       
    }, [])
    return (
        <>
            <div>
                <div className="profile_main">
                    <div className="wt-box userp userp1">
                        <div className="editproficon">
                            {/* <img src={EditProfileIcon} className="editprof" alt="" /> */}
                        </div>
                        <div className="ueserdtls">
                            <span className="imgspn"> <img src={profilepic} className="ppic1" alt="" /></span>
                            <h3>{userList.name}</h3>
                            <h4><span className="desigName"> {userList.designationName}</span></h4>
                            <p><span className="userdept">{userList.departmentName}</span></p>
                        </div>
                        <div className="empdetails-main">
                            <div className="empdtls-inn">
                                <span className="empdtlsl">Emp ID.</span>
                                <span className="empdtlsR"> {userList.userName}</span>
                            </div>
                            <div className="empdtls-inn">
                                <span className="empdtlsl">Mobile No.</span>
                                <span className="empdtlsR">{userList.mobileNo}</span>
                            </div>
                            <div className="empdtls-inn">
                                <span className="empdtlsl">Date of Joining</span>
                                <span className="empdtlsR">25/08/21</span>
                            </div>
                            <div className="empdtls-inn">
                                <span className="empdtlsl">Email ID</span>
                                <span className="empdtlsR">{userList.email}</span>
                            </div>
                            <div className="empdtls-inn">
                                <span className="empdtlsl">EDP HOD</span>
                                <span className="empdtlsR">Israr Khan</span>
                            </div>
                            <div className="empdtls-inn">
                                <span className="empdtlsl">Leave HOD</span>
                                <span className="empdtlsR">Israr Khan</span>
                            </div>
                        </div>
                    </div>
                    <div className="wt-box userp">
                        <div className="personldtls">
                            <div className="ddtlsedit">
                                <h3><span className="infoheading">Personal Information</span></h3>
                                {/* <img src={EditProfileIcon} className="editprof" alt="" /> */}
                            </div>
                        </div>

                        <div className="prsnlsect-hd">
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Gender</label>
                                    <label className="prsnlsect-b">Male</label>
                                </div>
                            </div>
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Date of Birth</label>
                                    <label className="prsnlsect-b">10 Jan, 2000</label>
                                </div>
                            </div>

                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Nationality</label>
                                    <label className="prsnlsect-b">Indian</label>
                                </div>
                            </div>

                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Religion</label>
                                    <label className="prsnlsect-b">None</label>
                                </div>
                            </div>

                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Marital Status</label>
                                    <label className="prsnlsect-b">Single</label>
                                </div>
                            </div>

                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Home Town</label>
                                    <label className="prsnlsect-b">Lucknow</label>
                                </div>
                            </div>

                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Language</label>
                                    <label className="prsnlsect-b">Hindi, English and Urdu</label>
                                </div>
                            </div>

                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Permanent Address</label>
                                    <label className="prsnlsect-b">10/100 Dubagga Uttar Pradesh(India)</label>
                                </div>
                            </div>

                            {/* <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Home Town</label>
                                    <label className="prsnlsect-b">10/100 Dubagga Uttar Pradesh(India)</label>
                                </div>
                            </div> */}
                        </div>

                        <div className="personldtls">
                            <div className="ddtlsedit">
                                <h3><span className="infoheading">Education Information</span></h3>
                            </div>
                        </div>


                        <div className="educatidtls-hd">
                            <div className="flex11 brd-btm">
                                <span>
                                    <label className="prsnlsect-t me-2">Bachelor in Management Information System</label>
                                    <label className="prsnlsect-b">(Lucknow University 2014-2018)</label>
                                </span>
                            </div>
                            <div className="flex11 brd-btm">
                                <label className="prsnlsect-t me-2">Certificate in Graphic Design</label>
                                <label className="prsnlsect-b">(Integral University 2014-2018)</label>
                            </div>
                        </div>

                        <div className="personldtls mt-3">
                            <div className="ddtlsedit">
                                <h3><span className="infoheading">Account Information</span></h3>
                            </div>
                        </div>

                        <div className="prsnlsect-hd">
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Bank Account</label>
                                    <label className="prsnlsect-b">1231567895</label>
                                </div>
                            </div>
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Customer Name</label>
                                    <label className="prsnlsect-b">Riya Mishra</label>
                                </div>
                            </div>
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Bank Name</label>
                                    <label className="prsnlsect-b">Indian</label>
                                </div>
                            </div>
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Tax Code</label>
                                    <label className="prsnlsect-b">1231567895</label>
                                </div>
                            </div>
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">Insurance Code</label>
                                    <label className="prsnlsect-b">4354354</label>
                                </div>
                            </div>
                            <div className="flex11">
                                <div className="prsnlsect-inn">
                                    <label className="prsnlsect-t">IFSC Code</label>
                                    <label className="prsnlsect-b">HDFC10101</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
