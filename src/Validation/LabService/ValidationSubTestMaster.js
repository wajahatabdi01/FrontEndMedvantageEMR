function ValidationSubTestMaster(subTestName = "", remark = "",chemicalCompoundID="",testtemplate="") {
    if (subTestName !== "" && subTestName.trim().length !== 0 && remark !== "" && remark.trim().length !== 0 && chemicalCompoundID !== "" &&  testtemplate !== "" && testtemplate.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationSubTestMaster;