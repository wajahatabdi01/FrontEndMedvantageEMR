function BloodRequestValidation (patientUhid = '', patientName='' ,patientAge = '', requestDate = '', requestTime = '',hospitalName = '', hospitalAddress = '',bldGroup = '0',productID = '0',reqstQty = '0') {
  
if (patientUhid === '')
  {
    return['Please enter UHID','errUHID']
  }
  else if (patientName === '')
  {
    return['Please enter name','errName']
  }
  else if (patientAge === '')
  {
    return['Please enter age','errAge']
  }
  else if (requestDate === '')
  {
    return['Please select date','errDate']
  }
  else if (requestTime === '')
  {
    return['Please select time','errTime']
  }
  else if (bldGroup == '0')
  {
    return['Please select bloodgroup','errBlood']
  }
  
  else if(productID == '0')
  {
    return['Please select product','errProduct']
  }
  else if (reqstQty == '0')
  {
    return['Please select unit','errUnit']
  }
  else if (hospitalName === '')
  {
    return['Please enter hospital','errHospital']
  }
  else if (hospitalAddress === '')
  {
    return['Please enter hospital address','errHospitalAddress']
  }
  else
  {
    return true;
  }
}
export default BloodRequestValidation;