function ValidationApiDocumentRightDetails(apiDocumentRightMenuId = "", apiId = "", details = "") {
    if (apiDocumentRightMenuId !== "" && apiId !== "" && details !== "" && details.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationApiDocumentRightDetails;