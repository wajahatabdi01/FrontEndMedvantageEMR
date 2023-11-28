function IntubateExtubateRemoveValidation (date = '', time = '')
{
//   const isNumValidate = /^\d{10}$/;
//   if((contactNo === '' || contactNo.length !== 10) && !contactNo.match(isNumValidate))
//   {
//     return ['Enter Correct Mobile Number',"errMobile"];
//   }
if(date.trim() === "")
{
  return ['Please fill Date', 'errDateIRE']
}

else if(time.trim() === '')
{
  return ['Please select Time','errTimeIRE']
}
else{
  return true;
}
}

export default IntubateExtubateRemoveValidation;