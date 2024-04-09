async function FHIRDeleteObservation(rowId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRDeleteObservation";
  let url = window.AppbaseUrl+"/api/EMRObservation/DeleteObservation?Id="+rowId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'DELETE'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRDeleteObservation;