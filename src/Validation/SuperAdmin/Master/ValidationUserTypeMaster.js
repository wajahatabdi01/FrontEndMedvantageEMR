function ValidationUserTypeMaster(userType = "") {
    if (userType !== "" && userType.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationUserTypeMaster;