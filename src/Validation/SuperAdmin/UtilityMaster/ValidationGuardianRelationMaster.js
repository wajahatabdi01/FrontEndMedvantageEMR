function ValidationGuardianRelationMaster(guardianRelationName = "") {
    if (guardianRelationName !== "" &&  guardianRelationName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationGuardianRelationMaster;