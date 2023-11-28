import React, { useEffect } from 'react'
import { useState } from 'react'
import IconEdit from "../../../../assets/images/icons/IconEdit.svg";
import IconDelete from "../../../../assets/images/icons/IconDelete.svg";
// import GetAddUser from '../../../Api/UserService/GetAddUser';
import DeleteAddUser from '../../../Api/UserService/DeleteAddUser';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import NODataFound from '../../../../Component/NODataFound';
import Loader from '../../../../Component/Loader';
export default function UserTable(props) {
    let [rowId, setRowId] = useState([])
    let [userList, setUserList] = useState([])
    let [showUnderProcess, setShowUnderProcess] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [tosterValue, setTosterValue] = useState(0)
    let [tosterMessage, setTosterMessage] = useState("")

    const { t } = useTranslation();

    //Handle Delete
    let handleDeleteRow = async () => {
        // setLoder(1)
        setShowUnderProcess(1);

        console.log("obj", rowId)
        let response = await DeleteAddUser(rowId)
        if (response.status === 1) {
            setShowUnderProcess(0)
            setShowToster(1)
            setTosterMessage("Data Deleted SuccessFully!")
            setTosterValue(0)
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
    }

    useEffect(() => {
        setUserList(props.userList)
    }, [props.userList])

    document.body.dir = i18n.dir();

    return (
        <div className="row">
            <div className="col-12 mt-2">
                <div className="med-table-section" style={{ height: "655px" }}>
                    {
                        userList !== undefined ?
                            userList.length !== 0 ?
                                <table className="med-table border_ striped">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "3%" }}>#</th>
                                            <th>{t("USER ID")}</th>
                                            <th>{t("USER INFO")}</th>
                                            <th>{t("MOBILE_NUMBER")}</th>
                                            <th>{t("USER TYPE")}</th>
                                            <th>{t("DESIGNATION/ROLE")}</th>
                                            {/* <th>Department</th> */}
                                            <th>{t("EMAIL_ID")}</th>
                                            {/* <th>Login</th>
                                <th>Cur. Status</th> */}
                                            <th> {t("OTP_Mobile_Number")}</th>
                                            <th> {t("OTP LOGIN")}</th>
                                            <th style={{ width: "10%" }} className="text-center">
                                                {t("Action")}
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {userList && userList.map((val, ind) => {
                                            return (
                                                <tr>
                                                    <td className="text-center"> {ind + 1} </td>
                                                    <td><span></span>  <br /> <span style={{ fontSize: "13px", color: "#929292" }}> {val.userDetails.id ?? "-"} </span> </td>
                                                    <td>
                                                        <span style={{ color: "#2D8AF5", fontSize: "14px" }}> {val.userDetails.name ?? "-"}{" "} </span> ({val.userDetails.userName ?? "-"}) <br />
                                                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userDetails.roleName ?? "-"} </span> <br />
                                                        <span style={{ fontSize: "13px", color: "#929292" }}> {val.userDetails.mobileNo ?? "-"} </span>
                                                    </td>
                                                    <td>
                                                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userDetails.mobileNo ?? "-"} </span>
                                                    </td>
                                                    <td>
                                                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userDetails.userTypeName ?? "-"} </span>
                                                    </td>
                                                    <td>
                                                        <span style={{ color: "#7B7B7B", fontSize: "14px" }}> {val.userDetails.designationName ?? "-"} </span> <br />
                                                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userDetails.roleName ?? "-"}</span>
                                                    </td>
                                                    {/* <td>
                <span style={{ color: "#7B7B7B", fontSize: "13px" }}>  </span>
            </td> */}
                                                    <td>
                                                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userDetails.email ?? "-"} </span>
                                                    </td>
                                                    {/* <td>
                <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Yes </span>
            </td>
            <td>
                <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Active </span>
            </td> */}
                                                    <td> <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userDetails.otpMobileNo ?? "-"} </span></td>
                                                    <td>
                                                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userDetails.isOtpAuthentication === true ? "Yes" : "No"} </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <div className="action-button">
                                                            <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" onClick={() => { props.setEditData(ind, 0) }}>
                                                                <img src={IconEdit} alt="" />
                                                            </div>
                                                            <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" onClick={() => { setRowId(val.userDetails.id); console.log("valid", val) }}>
                                                                <img src={IconDelete} alt="" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>



                                </table>
                                :
                                <NODataFound /> : ""

                    }
                </div>
            </div>

            {/*  ---------Start Delete Modal---------------  */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" >
                <div className="modal-dialog modalDelete">
                    <div className="modal-content">
                        <div className="modal-body modelby text-center">
                            <div className="popDeleteIcon">
                                <i className="fa fa-trash"></i>
                            </div>
                            <div className="popDeleteTitle mt-3">{t("Delete?")}</div>
                            <div className="popDeleteContent">{t("Are_you_sure_you_want_to_delete?")}</div>
                        </div>
                        <div className="modal-footer1 text-center">
                            <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" > {t("Cancel")}</button>
                            <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={handleDeleteRow}>{t("Delete")} </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* END MODAL */}
        </div>



    )
}
