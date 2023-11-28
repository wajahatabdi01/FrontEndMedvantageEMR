function ValidationWardBedAssignMaster(wardId = "", bedId = "", code = "") {
    if (wardId !== "" && bedId !== "" && wardId !== "0" && bedId !== "0" && code !== "" && code.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationWardBedAssignMaster;