function CreateBagValidation (donorName = "", donorID = '', age = '', gender = '', bloodGroup = '', bagType = '0', product = '')
{
  if(donorName === '' || donorID === '' || age === '' ||  gender === '' || bloodGroup === '' || bagType == '0' || product === '')
  {
    return false;
  }
  else{
    return true;
  }
}
export default CreateBagValidation;