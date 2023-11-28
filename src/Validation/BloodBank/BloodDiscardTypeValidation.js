function BloodDiscardTypeValidation (dicardType = '0')
{
  if(dicardType == '0')
  {
    return ['Please select discard type!', 'errDiscard'];
  }
  else {
    return true;
  }
}
export default BloodDiscardTypeValidation;