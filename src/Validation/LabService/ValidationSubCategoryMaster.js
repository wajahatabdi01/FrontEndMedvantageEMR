function ValidationSubCategoryMaster(subCategoryName = "", categoryId = "") {
    if (subCategoryName !== "" && subCategoryName.trim().length !== 0 && categoryId !== "" ) {
        return true
    }
    else {
        return false
    }
}
export default ValidationSubCategoryMaster;