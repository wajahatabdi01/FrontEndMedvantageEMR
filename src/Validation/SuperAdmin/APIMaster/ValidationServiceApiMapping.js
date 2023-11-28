function ValidationServiceApiMapping(serviceId = "", apiId = "") {
    if (serviceId !== "" && serviceId.trim().length !== 0 && apiId !== "" && apiId.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationServiceApiMapping; 