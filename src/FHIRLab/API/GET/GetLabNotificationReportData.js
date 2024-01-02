async function GetLabNotificationReportData(CategoryId) {
    let url = window.fhiropenEMRLab+"/api/FHIRInvestigation/GetMicroAndPathoAndRadioData?CategoryId="+CategoryId;
    let head = {"Content-Type":"application/JSON", accept : "*/*"}
    let data = {}
    let response = await fetch(url, {
      headers: head,
      method : 'GET'
  }).then((res) => res.json()).then(data);
  return response;  
  }
  export default GetLabNotificationReportData;