async function FHIRGetAllUnit(uhid) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRGetAllUnit";
  let url = window.AppbaseUrl+"/api/EMRPrescription/MedUnit";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRGetAllUnit;