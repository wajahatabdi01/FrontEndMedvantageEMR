function BloodIssueValidations (updateStatus = '') {
  
    if (updateStatus === '' || updateStatus == 0)
      {
        return['Please Select Update Status','errupdateStatus']
      }
      
      else
      {
        return true;
      }
    }
    export default BloodIssueValidations;