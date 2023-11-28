function ValidationExaminationSubCategoryParameterAssign(subCategoryId = "", parameterId = "") {
    if (subCategoryId !== "" && parameterId !== "") {
        return true
    }
    else {
        return false
    }
}
export default ValidationExaminationSubCategoryParameterAssign;