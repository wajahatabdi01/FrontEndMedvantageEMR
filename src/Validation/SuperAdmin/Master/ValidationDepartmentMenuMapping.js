function ValidationDepartmentMenuMapping(moduleID = "",departmentID = "") {
    if (moduleID !== "" &&  departmentID !== "" ) {
        return true
    }
    else{
        return false
    }
}
export default ValidationDepartmentMenuMapping;