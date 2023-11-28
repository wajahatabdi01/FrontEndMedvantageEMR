function ValidationRoleWiseMenuAssign(roleId = "", menuId = "", headId = "") {
    if (roleId !== "" && roleId !== "0" && menuId !== "" && menuId !== "0" && headId !== "" && headId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationRoleWiseMenuAssign;