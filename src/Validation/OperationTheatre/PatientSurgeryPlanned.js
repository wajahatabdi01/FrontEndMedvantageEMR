function ValidationPatientSurgeryPlanned (uhid =" ",surgeryDate=" ",surgeryTime ="",durationHour = "",ddlOperationTheater='0',selectedsurgery='0',selectedAnesthesia=0,selectedSurgeonlen =0,selectedAnesthesiologistlen=0,pmIderr = null)
{
  if(uhid.trim() === "")
  {
    return ['Please Enter UHID ', 'errUhid']
  }
  else if(pmIderr == null)
  {
    return ['Please Enter Correct UHID ', 'errUhid']
  }
  else if(selectedsurgery == '0' )
  {
    return ['Please Select   Surgery','errRqtSurgery']
   
  }
  else if(surgeryDate.trim() === '')
  {
    return ['Please fill Start Surgery Date','errStartDate']
  }

  else if(surgeryTime.trim() === '')
  {
    return ['Please fill Start Surgery Time','errStartTime']
  }

  
  else if(durationHour.trim() === '' )
  {
    return ['Please fill  Duration','errDuration']
  }

  else if(selectedAnesthesia == '0' )
  {
    return ['Please Select  Anesthesia','errRqtAnesthesia']
  }

  else if(selectedAnesthesiologistlen == '0' )
  {
    return ['Please Select  Anesthesiologist','errRqtAnesthesiologist']
  }

  else if(ddlOperationTheater.trim() == '0' )
  {
    return ['Please Select  Operation Theater','errOperationTheatre']
  }
 
 
  else if(selectedSurgeonlen == '0' )
  {
    return ['Please Select   Surgeon','errRqtSurgeon']
  }
  
  // else if(selectedDevicelen == '"[{"batchNo":"","techniques":"","qualityNo":"","standardiseNo":"","manufacturingDate":"","expiryDate":"","madeBy":""}]"' )
  // {
  //   return ['Please Select  Device ','errRqtDevice']
  // }
  else{
    return true;
  }
}

export default ValidationPatientSurgeryPlanned;