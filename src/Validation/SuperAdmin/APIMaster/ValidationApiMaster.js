function ValidationApiMaster(apiName = "", baseUrlID = "", apiUrl = "", parameters = "", successResponse = "", failureResponse = "", headerDetails = "", method = "") {
    if (apiName !== "" && apiName.trim().length !== 0 && baseUrlID !== "" && apiUrl !== "" && apiUrl.trim().length !== 0 && parameters !== "" && parameters.trim().length !== 0 && successResponse !== "" && successResponse.trim().length !== 0 && failureResponse !== "" && failureResponse.trim().length !== 0 && headerDetails !== "" && headerDetails.trim().length !== 0 && method !== "" && method.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationApiMaster;