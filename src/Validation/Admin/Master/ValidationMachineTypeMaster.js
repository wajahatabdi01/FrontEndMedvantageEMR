function ValidationMachineTypeMaster(machineType = "") {
    if (machineType !== "" &&  machineType.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationMachineTypeMaster;