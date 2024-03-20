async function GetPidFromUhid(uhid) {
  let url =window.AppbaseUrl + "/api/FHIRDemographicData/GetPIDByUHID?Uhid="+uhid;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetPidFromUhid;