function ValidationManufacturerMaster(manufacturer = "",) {
    if (manufacturer !== "" &&  manufacturer.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationManufacturerMaster;