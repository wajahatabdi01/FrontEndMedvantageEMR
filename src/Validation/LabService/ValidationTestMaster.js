function ValidationTestMaster(TestName = "", CategoryId = "", SampleId = "", ItemId = "", InstructionId = "", subCategoryId = "") {
    if (TestName !== "" && TestName.trim().length !== 0 && CategoryId !== "" && SampleId !== "" && ItemId !== "" && InstructionId !== "" && subCategoryId !== "") {
        return true
    }
    else {
        return false
    }
}
export default ValidationTestMaster;