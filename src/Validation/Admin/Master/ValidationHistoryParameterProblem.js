function ValidationHistoryParameterProblem(parameterId = "") {
    if (parameterId !== "" && parameterId !== "0" ) {
        return true
    }
    else {
        return false
    }
  }
  export default ValidationHistoryParameterProblem;