function ValidationUnitMaster(unitName = "") {
    if (unitName !== "" &&  unitName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationUnitMaster;