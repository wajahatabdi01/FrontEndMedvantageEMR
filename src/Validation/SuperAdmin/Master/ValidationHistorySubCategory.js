function ValidationHistorySubCategory(categoryId = "", subCategoryName="") {
    if (categoryId !== "" &&  subCategoryName !== "" && subCategoryName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationHistorySubCategory;