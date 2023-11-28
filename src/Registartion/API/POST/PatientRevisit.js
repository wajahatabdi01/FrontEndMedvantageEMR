let PatientRevisit =async(departmentId,doctorId,userID,uhid,roomId)=>{
    let url=window.AppbaseUrl+"/api/PatientRegistration/PatientRevisit?departmentId="+departmentId+"&doctorId="+doctorId+"&userId="+userID+"&UhId="+uhid+"&roomId="+roomId;
   const head={'Content-Type': 'application/json-patch+json','accept':'*/*',};
   let response= await fetch(url,{
        method:"POST",
        headers:head,
        body:JSON.stringify()
   }).then((res)=>res.json());
   return response;
}
export default PatientRevisit;