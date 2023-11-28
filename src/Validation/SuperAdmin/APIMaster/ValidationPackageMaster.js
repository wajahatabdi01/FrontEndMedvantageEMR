function ValidationPackageMaster(packageTitle = "", description = "", price = "") {
    if (packageTitle !== "" && packageTitle.trim().length !== 0 && description !== "" && description.trim().length !== 0 && price !== "" && price.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationPackageMaster;