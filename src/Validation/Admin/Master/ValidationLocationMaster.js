function ValidationLocationMaster(buildingID = "", floorID = "", roomID = "", careTakerID = "") {
    if (buildingID !== "" && floorID !== "" && roomID !== "" && buildingID !== "0" && floorID !== "0" && roomID !== "0" && careTakerID !== "" && careTakerID !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationLocationMaster;