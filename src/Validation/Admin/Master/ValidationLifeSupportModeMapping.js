function ValidationLifeSupportModeMapping(lifeSupportMasterID = "", lifeSupportModeID = "") {
    if (lifeSupportMasterID !== "" && lifeSupportModeID !== "" && lifeSupportMasterID !== "0" && lifeSupportModeID !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationLifeSupportModeMapping;