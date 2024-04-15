async function GetAllRefills() {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetAllInterval";
  let url = window.AppbaseUrl+"/api/EMRRefills/GetAllRefills";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetAllRefills;