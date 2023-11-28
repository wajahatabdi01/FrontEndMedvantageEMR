let GetPatientHistoryByUHID = async (uhid) => {
  let url = window.AppbaseUrl + '/api/PatientHistoryByUHID/GetPatientHistoryByUHID?UHID='+uhid;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url, {
    method:'GET',
    headers:head
  }).then(res => res.json()).then(data);
  return response;
}
export default GetPatientHistoryByUHID