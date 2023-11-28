function ValidationWardDepartmentAssign(wardID = "", departmentID = "") {
    if (wardID !== "" && departmentID !== "" && wardID !== "0" && departmentID !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationWardDepartmentAssign;