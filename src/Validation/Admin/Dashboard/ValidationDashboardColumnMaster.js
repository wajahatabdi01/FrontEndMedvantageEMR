function ValidationDashboardColumnMaster(columnName = "") {
    if (columnName !== "" && columnName.trim().length !== 0 ) {
        return true
    }
    else{
        return false
    }
}
export default ValidationDashboardColumnMaster;