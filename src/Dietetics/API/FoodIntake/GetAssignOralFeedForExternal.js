

let   GetAssignOralFeedForExternal = async(uhid,getclientId)=>{
    // FeedForExternal/GetPatientFeedDataByUhid
    // let url = window.PatientMonitorDashboardAPI + '/api/FeedForExternal/AssignOralFeedForExternal?Uhid='+uhid + '&clientId'= +clientId;
    let url = window.PatientMonitorDashboardAPI + `/api/FeedForExternal/GetPatientFeedDataByUhid?uhid=${uhid}&clientId=${getclientId}`;
    console.log('foodId',url);
    let head = {"Content-Type": "application/JSON", 'accept' : '*/*' }
    let data={};
    let response =await fetch (url,{
        headers:head,
        method:'GET'
    })
    .then ((res)=>res.json())
    .then (data);
    return response;
}
export default GetAssignOralFeedForExternal;