function ValidationExaminationMaster(examinationCategoryName = "",) {
    if (examinationCategoryName !== "" &&  examinationCategoryName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationExaminationMaster;