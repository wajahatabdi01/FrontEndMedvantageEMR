function ValidationHistoryParameterDepartmentMapping(parameterId = "",departmentId = "") {
    if (parameterId !== "" &&  departmentId !== "" ) {
        return true
    }
    else{
        return false
    }
}
export default ValidationHistoryParameterDepartmentMapping;