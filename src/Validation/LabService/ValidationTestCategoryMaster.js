function ValidationTestCategoryMaster(categoryName = "", remark = "") {
    if (categoryName !== "" && categoryName.trim().length !== 0 && remark !== "" && remark.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationTestCategoryMaster;