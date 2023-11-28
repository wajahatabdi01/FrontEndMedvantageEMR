function ValidationFeatureMaster(featureName = "") {
    if (featureName !== "" && featureName.trim().length !== 0) {
        return true
    }
    else{
        return false
    }
}
export default ValidationFeatureMaster;