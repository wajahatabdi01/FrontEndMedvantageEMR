function ValidationBedMaster(bedName = "") {
    if (bedName !== "" &&  bedName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationBedMaster;