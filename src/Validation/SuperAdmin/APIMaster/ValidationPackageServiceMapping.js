function ValidationPackageServiceMapping(serviceId = "", packageId = "") {
    if (serviceId !== ""  && packageId !== "") {
        return true
    }
    else {
        return false
    }
}
export default ValidationPackageServiceMapping; 