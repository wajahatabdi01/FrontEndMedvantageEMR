function ValidationServiceMaster(name = "") {
    if (name !== "" && name.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationServiceMaster;