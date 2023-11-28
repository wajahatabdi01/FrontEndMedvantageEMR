function ValidationBuildingMaster(buildingName = "", address = "", noOfFloors = "") {
    if (buildingName !== "" && buildingName.trim().length !== 0 && address !== "" && address.trim().length !== 0 && noOfFloors !== "") {
        return true
    }
    else {
        return false
    }
}
export default ValidationBuildingMaster;