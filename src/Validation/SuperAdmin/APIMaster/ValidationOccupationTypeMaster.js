function ValidationOccupationTypeMaster(occupationName = "") {
    if (occupationName !== "" && occupationName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationOccupationTypeMaster;