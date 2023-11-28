function ValidationAssignHeadDepartmentMaster(departmentId = "", headId = "") {
    if (departmentId !== "" && departmentId !== "0" && headId !== "" && headId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationAssignHeadDepartmentMaster;