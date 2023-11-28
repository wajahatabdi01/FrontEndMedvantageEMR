function ValidationWardDepartmentAssign(wardID = "",departmentID = "") {
    if (wardID !== "" &&  wardID.trim().length !== 0 && departmentID !== "" &&  departmentID.trim().length !== 0 ) {
        return true
    }
    else{
        return false
    }
}
export default ValidationWardDepartmentAssign;