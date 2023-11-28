let POSTAdmitPatientByUHID =async(data)=>{
     const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    let url= window.AppbaseUrl + "/api/AdmitPatientByPid/AdmitPatientByPid?uhId="+data.uhid+"&departmentId="+data.departmentId+"&wardID="+data.wardID+"&bedId="+data.bedId+"&doctorId="+data.doctorId+"&userId="+window.userId+"&ClientId="+clientID;
    const head={'Content-Type': 'application/json-patch+json','accept':'*/*',};
    let response= await fetch(url,{
         method:"POST",
         headers:head,
         body:JSON.stringify(data)
    }).then((res)=>res.json());
    return response;
 }
 
 export default POSTAdmitPatientByUHID;