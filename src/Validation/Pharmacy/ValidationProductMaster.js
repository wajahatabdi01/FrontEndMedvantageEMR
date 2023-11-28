function ValidationProductMaster(manufacturerId = "", productName = "") {
    if (manufacturerId !== "" && productName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationProductMaster;