function ValidationOxygenSupportMaster(lifeSupportType = "", vitalID = "", machineTypeID = "", shortName = "", code = "") {
    if (lifeSupportType !== "" && lifeSupportType.trim().length !== 0 && vitalID !== "" && vitalID !== "0" && machineTypeID !== "" && machineTypeID !== "0" && shortName !== "" && shortName.trim().length !== 0 && code !== "" && code.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationOxygenSupportMaster;