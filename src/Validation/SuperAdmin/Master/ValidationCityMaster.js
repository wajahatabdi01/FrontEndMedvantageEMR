function ValidationCityMaster(stateId = "", cityName="") {
    if (stateId !== "" && cityName !== ""  && cityName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationCityMaster;