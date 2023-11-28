function ValidationVentilatorSaveMachine (uhid = "", machineID ='0', machineDate='', machineTime = '', fio2 = '', peep = '', modeId = '0',
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

else if(machineID == '0') 
{
  return ['Please select machine','errMachineID']
}
else if(machineDate.trim() === '')
{
  return ['Please select date','errDate']
}

else if(machineTime.trim() === '')
{
  return ['Please select time','errTime']
}


else{
  return true;
}
}

export default ValidationVentilatorSaveMachine;