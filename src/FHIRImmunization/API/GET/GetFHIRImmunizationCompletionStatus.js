async function GetFHIRImmunizationCompletionStatus() {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetFHIRImmunizationCompletionStatus";
  let url = window.AppbaseUrl+"/api/EMRImmunizationMaster/GetFHIRImmunizationCompletionStatus";
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetFHIRImmunizationCompletionStatus;