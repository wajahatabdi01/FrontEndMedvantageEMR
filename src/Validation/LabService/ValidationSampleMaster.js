function ValidationSampleMaster(sampleName = "", remark = "") {
    if (sampleName !== "" && sampleName.trim().length !== 0 && remark !== "" && remark.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationSampleMaster;