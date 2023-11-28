function ValidationWardMaster(wardName = "") {
    if ( wardName !== "" &&  wardName.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationWardMaster;