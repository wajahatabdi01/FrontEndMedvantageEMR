async function FHIRGetObservation(uhid, encounterId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRGetObservation";
  let url = window.AppbaseUrl+"/api/EMRObservation/GetAllObservation?Uhid="+uhid+"&EncounterId="+encounterId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRGetObservation;