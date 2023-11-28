function ValidationSaltMaster(saltName = "",) {
    if (saltName !== "" &&  saltName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationSaltMaster;