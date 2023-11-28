function ValidationEquipmentTypeMaster(lifeSupport = "") {
    if (lifeSupport !== "" && lifeSupport.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationEquipmentTypeMaster;