function ValidationEthinicityMaster(ethiniCityName = "") {
    if (ethiniCityName !== "" &&  ethiniCityName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationEthinicityMaster;