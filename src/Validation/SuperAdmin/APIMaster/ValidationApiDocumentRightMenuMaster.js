function ValidationApiDocumentRightMenuMaster(apiDocumentMenuName = "") {
    if (apiDocumentMenuName !== "" && apiDocumentMenuName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationApiDocumentRightMenuMaster;