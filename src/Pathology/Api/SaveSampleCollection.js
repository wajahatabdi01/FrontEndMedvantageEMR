let  SaveSampleCollection = async (textBillNo,billID,UHID,pmID,isCritical,patientType,sampleCollectionJSON,userId,clientId)=> {
  console.log(sampleCollectionJSON);
    let url=window.LabServicebaseUrl+"/api/LabSampleCollection/InsertSampleCollection?billNo="+textBillNo+"&billID="+billID+"&UHID="+UHID+"&pmID="+pmID+"&isCritical="+isCritical+"&patientType="+patientType+"&sampleCollectionJSON="+sampleCollectionJSON+"&userID="+userId+"&clientId="+clientId;
    let head = { "Content-Type": " application/json", 'accept' : '*/*', };
    let data={};
    let response = await fetch(url,{
     method:"POST",
     headers:head,
     body:JSON.stringify()
    }).then((res)=>res.json()).then(data);
    
   

  return response;
 }
 
 export default SaveSampleCollection;