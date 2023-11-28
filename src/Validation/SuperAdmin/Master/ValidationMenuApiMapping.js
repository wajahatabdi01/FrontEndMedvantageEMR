function ValidationMenuApiMapping(menuID = "", apiID = "") {
    if (menuID !== "" && apiID !== "") {
        return true
    }
    else {
        return false
    }
}
export default ValidationMenuApiMapping;