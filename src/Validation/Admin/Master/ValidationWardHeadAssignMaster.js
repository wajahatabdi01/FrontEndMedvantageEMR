function ValidationWardHeadAssignMaster(wardID = "", headId = "") {
    if (wardID !== "" && headId !== "" && wardID !== "0" && headId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationWardHeadAssignMaster;