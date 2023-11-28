function ValidationDesignationMaster(designationName = "", code = "") {
    if (designationName !== "" && designationName.trim().length !== 0 && code !== "" && code.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationDesignationMaster;