function ValidationMapFeaturePackage(packageID = "", featureID = "") {
    if (packageID !== "" && packageID.trim().length !== 0 && featureID !== "" && featureID.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationMapFeaturePackage;