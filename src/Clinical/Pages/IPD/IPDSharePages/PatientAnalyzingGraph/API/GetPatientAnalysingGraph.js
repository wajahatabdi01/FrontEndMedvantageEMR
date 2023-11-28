let GetPatientAnalysingGraph = async(obj)=>{
    const url = window.AppbaseUrl+"/api/PatientAnalysingGraph/GetPatientAnalysingGraph?UHID="+obj.UHID+"&date="+obj.date+"&timeFrom="+obj.timeFrom+"&toHour="+obj.toHour+"&vitalIdSearch="+obj.vitalIdSearch+"&subtestIDSearch="+obj.subtestIDSearch;
    const head ={'content-type':'application/json','accept':'*/*',};
    let data={};
    let response=await fetch(url,{
        method:'GET',
        headers:head,
    }).then(res=>res.json()).then(data);
    return response;
}

export default GetPatientAnalysingGraph;