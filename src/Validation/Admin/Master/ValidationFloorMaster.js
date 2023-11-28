function ValidationFloorMaster(floorName = "") {
    if (floorName !== "" && floorName.trim().length !== 0 ) {
        return true
    }
    else {
        return false
    }
}
export default ValidationFloorMaster;