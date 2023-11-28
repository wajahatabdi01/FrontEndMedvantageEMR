function ValidationRoleMaster(roleTitle = "", code = "") {
    if (roleTitle !== "" && roleTitle.trim().length !== 0 && code !== "" && code.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationRoleMaster;