async function GetPatientBillingDetails(BillNo,clientId) {
  let url = window.LabServicebaseUrl+"/api/LabSampleCollection/GetPatientTestBillingDetails?BillNo="+BillNo+"&clientId="+clientId;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetPatientBillingDetails;
