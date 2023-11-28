function ValidationExaminationParameterProblem(parameterId = "") {
    if (parameterId !== "" && parameterId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationExaminationParameterProblem;