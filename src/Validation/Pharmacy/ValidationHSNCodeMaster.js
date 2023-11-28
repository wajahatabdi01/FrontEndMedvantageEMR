function ValidationHSNCodeMaster(hsnCode = "",) {
    if (hsnCode !== "" &&  hsnCode.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationHSNCodeMaster;