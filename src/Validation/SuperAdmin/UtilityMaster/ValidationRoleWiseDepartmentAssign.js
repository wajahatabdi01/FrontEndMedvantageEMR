function ValidationRoleWiseDepartmentAssign(roleId = "", departmentId = "", headId = "") {
    if (roleId !== "" && roleId !== "0" && departmentId !== "" && departmentId !== "0" && headId !== "" && headId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationRoleWiseDepartmentAssign;