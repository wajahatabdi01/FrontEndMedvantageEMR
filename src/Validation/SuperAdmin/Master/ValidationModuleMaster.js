function ValidationModuleMaster(moduleName = "") {
    if (moduleName !== "" &&  moduleName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationModuleMaster;