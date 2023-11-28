function ValidationDonorRegistration (contactNo = "", donorName = "",gender='', dob='',bgID ='0', idType='0', idNo = '', address = '')
{
  const isNumValidate = /^\d{10}$/;
  if((contactNo === '' || contactNo.length !== 10) && !contactNo.match(isNumValidate))
  {
    return ['Enter Correct Mobile Number',"errMobile"];
  }
  else if(donorName.trim() === "")
  {
    return ['Please fill donor name', 'errDonor']
  }
  else if(dob.trim() === '') 
  {
    return ['Please select date','errDate']
  }
  else if(gender.trim() === '') 
  {
    return ['Please select gender','errGender']
  }
  
  else if(bgID == '0') 
  {
    return ['Please select group','errBloodGroup']
  }
  else if(idType == '0')
  {
    return ['Please select ID', 'errIDType']
  }
  else if(idNo.trim() === '')
  {
    return ['Please fill ID No','errIDNo']
  }
  
  else if(address.trim() === '')
  {
    return ['Please fill address','errAddress']
  }
  else{
    return true;
  }
}

export default ValidationDonorRegistration;