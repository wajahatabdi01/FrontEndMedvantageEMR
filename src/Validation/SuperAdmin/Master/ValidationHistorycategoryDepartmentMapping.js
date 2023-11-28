function ValidationHistorycategoryDepartmentMapping(categoryId = "",departmentId = "") {
    if (categoryId !== "" &&  departmentId !== "" ) {
        return true
    }
    else{
        return false
    }
}
export default ValidationHistorycategoryDepartmentMapping;