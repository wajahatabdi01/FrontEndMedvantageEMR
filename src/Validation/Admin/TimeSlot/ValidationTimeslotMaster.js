function ValidationTimeslotMaster(fromTime = "", toTIme) {
    if (fromTime !== ""  && toTIme !== "") {
        return true
    }
    else {
        return false
    }
}
export default ValidationTimeslotMaster;