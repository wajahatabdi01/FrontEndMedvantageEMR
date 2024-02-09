async function GetAllRoute(uhid) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetAllRoute";
  let url = window.AppbaseUrl+"/api/FHIRRouteMaster/GetAllRoute";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetAllRoute;