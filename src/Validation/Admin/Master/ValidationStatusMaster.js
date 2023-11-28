function ValidationStatusMaster(module = "", remark="") {
    if ( module !== "" &&  module.trim().length !== 0 &&  remark !== "" &&  remark.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationStatusMaster;