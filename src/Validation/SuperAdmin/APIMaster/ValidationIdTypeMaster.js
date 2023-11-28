function ValidationIdTypeMaster(idName = "") {
    if (idName !== "" && idName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationIdTypeMaster;