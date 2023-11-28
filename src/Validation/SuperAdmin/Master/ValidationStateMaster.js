function ValidationStateMaster(countryId = "", stateName="") {
    if (countryId !== "" && stateName !== "" && stateName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationStateMaster;