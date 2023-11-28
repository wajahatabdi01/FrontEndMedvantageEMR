function ValidationBaseUrl(baseUrl = "") {
    if (baseUrl !== "" && baseUrl.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationBaseUrl;