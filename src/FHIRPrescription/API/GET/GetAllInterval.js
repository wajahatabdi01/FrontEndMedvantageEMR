async function GetAllInterval() {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetAllInterval";
  let url = window.AppbaseUrl+"/api/EMRIntervalMaster/GetAllInterval";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetAllInterval;