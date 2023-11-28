function ValidationCareTakerMaster(caretakerName = "") {
    if (caretakerName !== "" &&  caretakerName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationCareTakerMaster;