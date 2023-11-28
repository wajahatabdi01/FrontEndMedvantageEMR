function ValidationHistoryCategory(categoryName = "") {
    if (categoryName !== "" && categoryName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationHistoryCategory;