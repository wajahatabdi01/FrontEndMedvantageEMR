function ValidationDashboardParameterMaster(parameterName = "") {
    if (parameterName !== "" &&  parameterName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationDashboardParameterMaster;