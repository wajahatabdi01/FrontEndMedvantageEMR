async function GetFHIRImmunizationSubstancerefusalReason() {
  let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetFHIRImmunizationSubstancerefusalReason";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetFHIRImmunizationSubstancerefusalReason;