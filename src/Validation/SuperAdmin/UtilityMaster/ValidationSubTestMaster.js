function ValidationSubTestMaster(subTestName = "", unitId = "") {
    if (subTestName !== "" &&  subTestName.trim().length !== 0 && unitId !== "" &&  unitId.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationSubTestMaster;