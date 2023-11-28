function ValidationAlertEscalationMaster(alertTypeId = "") {
  if (alertTypeId !== "" && alertTypeId !== "0") {
      return true
  }
  else {
      return false
  }
}
export default ValidationAlertEscalationMaster;