function ValidationVentilatorSaveMode (uhid = "", fio2 = '0', peep = '0', modeId = '0',
modeDate = '', modeTime = '')
{
//   const isNumValidate = /^\d{10}$/;
//   if((contactNo === '' || contactNo.length !== 10) && !contactNo.match(isNumValidate))
//   {
//     return ['Enter Correct Mobile Number',"errMobile"];
//   }
if(uhid.trim() === "")
{
  return ['Please fill UHID', 'errUHID']
}

else if(fio2 == '0')
{
  return ['Please fill Fio2','errFio2']
}
else if(peep == '0')
{
  return ['Please fill Peep','errPeep']
}
else if(modeId == '0')
{
  return ['Please select mode','errMode']
}
else if(modeDate.trim() === '')
{
  return ['Please select Date','errModeDate']
}
else if(modeTime.trim() === '')
{
  return ['Please select time','errModeTime']
}

else{
  return true;
}
}

export default ValidationVentilatorSaveMode;