let GetPatientData = async (obj)=>{
  const url=window.AppbaseUrl+'/api/ExportPatientData/GetExportPatientUSCDIData?UHID='+obj.UHID+'&fromDate='+obj.fromDate+'&toDate='+obj.toDate+'&otp=0&mobileNo=';
  const  head={"Content-Type":"application/json",accept:"*/*",}
  let data={}
  let response = fetch(url,{
    method:"GET",
    header:head,
    
  }).then((res)=>res.json()).then(data)
  return response
}

export default GetPatientData;