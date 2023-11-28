function ValidationCountryMaster(countryName = "", countryCode="") {
    if (countryName !== "" &&  countryName.trim().length !== 0 && countryCode !== "" &&  countryCode.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationCountryMaster;