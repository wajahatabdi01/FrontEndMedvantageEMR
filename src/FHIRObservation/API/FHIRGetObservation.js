async function FHIRGetObservation(uhid, clientId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRGetObservation";
  let url = window.AppbaseUrl+"/api/FHIRObservation/GetAllObservation?Uhid="+uhid;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRGetObservation;