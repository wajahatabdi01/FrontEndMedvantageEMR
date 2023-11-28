async function InsertPatientPhysicalActivity(data,fromDateTime,uhid,clientId) {
    // let token = window.SuperAdminToken;
    let url = window.AppbaseUrl + '/api/PatientPhysicalActivityTracker/InsertPatientPhysicalActivity?userId='+data.userId+'&activityId='+data.activityId+'&remark='+data.remark+'&timeFrom='+fromDateTime+'&totalTimeInMinutes='+data.totalTimeInMinutes+'&uhid='+uhid+'&clientId='+clientId;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
      
  
    return response;
  }
  export default InsertPatientPhysicalActivity;