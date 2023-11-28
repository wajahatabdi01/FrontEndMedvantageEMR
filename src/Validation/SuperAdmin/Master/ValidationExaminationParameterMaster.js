function ValidationExaminationParameterMaster( parameterName = "", parameterResultType="") {
    if ( parameterName !== "" && parameterName.trim().length !== 0 && parameterResultType!== "" && parameterResultType!== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationExaminationParameterMaster;