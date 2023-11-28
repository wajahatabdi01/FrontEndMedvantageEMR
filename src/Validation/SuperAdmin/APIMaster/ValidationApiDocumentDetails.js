function ValidationApiDocumentDetails(apiId = "", apiDocumentMenuId = "", details = "") {
    if (apiId !== "" && apiDocumentMenuId !== "" && details !== "" && details.trim().length!==0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationApiDocumentDetails;