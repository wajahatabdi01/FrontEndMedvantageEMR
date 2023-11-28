function ValidationHeadDepartmentMapping(departmentID = "", headID = "") {
    if (departmentID !== "" && departmentID !== "0" && headID !== "" && headID !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationHeadDepartmentMapping;