function ValidationLocationDepartmentAssign(deptId, locationId = "") {
    if (deptId !== "" && locationId !== "" && deptId !== "0" && locationId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationLocationDepartmentAssign;