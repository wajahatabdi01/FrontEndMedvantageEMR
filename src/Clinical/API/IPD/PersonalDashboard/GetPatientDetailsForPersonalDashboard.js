let GetPatientDetailsForPersonalDashboard = async(uhID) =>
{
  let url = window.AppbaseUrl +'/api/PatientIPDPrescription/PatientIPDAllHistory?UhId='+uhID;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data  = {};
  let response = await fetch(url, {
    method:'GET',
    headers: head,
    body: JSON.stringify()
  }).then(res => res.json()).then(data);
  return response;
}
export default GetPatientDetailsForPersonalDashboard;