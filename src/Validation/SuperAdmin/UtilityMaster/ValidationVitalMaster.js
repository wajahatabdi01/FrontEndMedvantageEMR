function ValidationVitalMaster(vitalName = "") {
    if (vitalName !== "" &&  vitalName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationVitalMaster;