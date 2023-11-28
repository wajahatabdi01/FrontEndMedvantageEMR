function ValidationDepartmentMaster(departmentName = "", code="") {
    if (departmentName !== "" &&  departmentName.trim().length !== 0 && code !== "" &&  code.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationDepartmentMaster;