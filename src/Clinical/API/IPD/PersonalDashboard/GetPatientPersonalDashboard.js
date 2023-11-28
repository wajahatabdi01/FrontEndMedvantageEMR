let GetPatientPersonalDashboard = async(uhid) =>
{
  let url = window.AppbaseUrl + `/api/PatientPersonalDashboard/GetPatientPersonalDashboard?UserId=${window.userId}&UHID=${uhid}`;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data  = {};
  let response = await fetch(url, {
    method:'GET',
    headers: head,
    body: JSON.stringify()
  }).then(res => res.json()).then(data);
  return response;
}
export default GetPatientPersonalDashboard;