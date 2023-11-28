async function GetLabSampleType(BillNo) {
  let url = window.LabServicebaseUrl+"/api/LabSampleCollection/GetSampleType?BillNo="+BillNo;

  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data={};
let response = fetch(url, {
  headers: head,
  method : 'GET'
}).then((res) => res.json()).then(data);

return response;
}
export default GetLabSampleType;
