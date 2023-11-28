function ValidationApiDocumentMenuMaster(apiDocumentMenuName = "") {
    if (apiDocumentMenuName !== "" && apiDocumentMenuName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationApiDocumentMenuMaster;