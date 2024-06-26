async function GetAllPhysicalActivityTracker(data) {
    let url = window.AppbaseUrl+"/api/PatientPhysicalActivityTracker/GetAllPhysicalActivity?uhid="+data;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };


  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetAllPhysicalActivityTracker;