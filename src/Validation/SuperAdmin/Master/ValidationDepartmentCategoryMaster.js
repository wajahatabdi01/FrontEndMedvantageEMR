function ValidationDepartmentCategoryMaster(categoryName = "") {
    if (categoryName !== ""  && categoryName.trim().length !== 0 && categoryName !== undefined) {
        return true
    }
    else{
        return false
    }
}
export default ValidationDepartmentCategoryMaster;