let ExportPatientDataVerifyOtp = async(obj)=>{
const url=window.AppbaseUrl+"/api/ExportPatientData/VerifyOTP?otp="+obj.otp+"&mobileNo="+obj.mobileNo;
const head ={'Content-Type':'application/json','accept':'*/*'};
let data={};
let resposne =  await fetch(url,{method:"GET",headers:head}).then((res)=>res.json()).then(data);
return resposne;
}

export default ExportPatientDataVerifyOtp;