function ValidationLifeSupportMode(supportMode = "") {
    if (supportMode !== "" &&  supportMode.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationLifeSupportMode;