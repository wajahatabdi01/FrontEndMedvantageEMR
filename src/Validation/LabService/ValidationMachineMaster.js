function ValidationMachineMaster(machineName = "", remark = "") {
    if (machineName !== "" && machineName.trim().length !== 0 && remark !== "" && remark.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationMachineMaster;