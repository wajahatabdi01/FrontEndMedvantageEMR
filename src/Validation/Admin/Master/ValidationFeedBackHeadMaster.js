function ValidationFeedBackHeadMaster(dischargeType = "") {
    if (dischargeType !== "" &&  dischargeType.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationFeedBackHeadMaster;