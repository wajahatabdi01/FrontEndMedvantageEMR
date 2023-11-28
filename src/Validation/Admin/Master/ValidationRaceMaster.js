function ValidationRaceMaster(raceType = "") {
    if (raceType !== "" &&  raceType.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationRaceMaster;