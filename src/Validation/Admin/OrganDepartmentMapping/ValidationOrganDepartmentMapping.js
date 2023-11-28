function ValidationOrganDepartmentMapping(organId = "", departmentId = "") {
    if (organId !== "" && departmentId !== "" && organId !== "0" && departmentId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationOrganDepartmentMapping;