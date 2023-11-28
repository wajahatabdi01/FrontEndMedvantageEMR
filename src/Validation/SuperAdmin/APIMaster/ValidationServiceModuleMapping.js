function ValidationServiceModuleMapping(serviceId = "", moduleId = "") {
    if (serviceId !== "" &&  moduleId !== "" ) {
        return true
    }
    else {
        return false
    }
}
export default ValidationServiceModuleMapping;