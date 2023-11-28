function ValidationHeadMaster(headName = "", headRemark = "") {
    if (headName !== "" && headName.trim().length !== 0 && headRemark !== "" && headRemark.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationHeadMaster;