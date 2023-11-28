function ValidationEquipmentNameMaster(equipmentName = "", locationId = "", equipmentTypeId = "") {
    if (equipmentName !== "" && equipmentName.trim().length !== 0 && locationId !== "" && equipmentTypeId !== "" && locationId !== "0" && equipmentTypeId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationEquipmentNameMaster;