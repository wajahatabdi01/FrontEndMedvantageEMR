let ExportPatientDataVerifyUHID = async (uhid)=>{
    const url=window.AppbaseUrl+"/api/ExportPatientData/VerifyUHID?UHID="+uhid;
    const head={'Content-Type':'application/json','accept':'*/*',}
    let data ={};
    
    let resposne = fetch(url,{
        method:"GET",
        headers:head,
    
    }).then((res)=> res.json()).then(data);
     return resposne;
    }
    export default ExportPatientDataVerifyUHID;