function BloodDiscardSearchValidation (donorID = '' , bagNo='')
{
  if (donorID === '' && bagNo !== '')
  {
    return ['Please Enter Donor ID',"errDonorID"];
  }
  else if(bagNo === '' && donorID !== '')
  {
    return ['Please Enter Bag Number',"errBagNo"];
  }
  else 
  {
    return true;
  }
}

export default BloodDiscardSearchValidation;