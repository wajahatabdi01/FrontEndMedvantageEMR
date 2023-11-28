function ValidationAddUserMaster(name = "", userName = "", email = "", mobileNo = "", roleId = "", userTypeId = "", designationId = "", departmentId = "") {
    if (name !== "" || name.trim().length !== "" ||
        userName !== "" || userName.trim().length !== "" ||
        email !== "" || email.trim().length !== "" ||
        mobileNo !== "" || mobileNo.trim().length !== "" ||
        roleId !== "" || userTypeId !== "" || designationId !== "" || departmentId !== ""
    ) {
        return true
    }
    else {
        return false
    }
}
export default ValidationAddUserMaster;