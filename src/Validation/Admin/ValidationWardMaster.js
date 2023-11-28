function ValidationWardMaster(wardName = "") {
    if (wardName !== "" &&  wardName !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationWardMaster;