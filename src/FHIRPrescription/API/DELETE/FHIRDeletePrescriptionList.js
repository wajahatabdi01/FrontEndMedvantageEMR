async function FHIRDeletePrescriptionList(rowId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRDeletePrescriptionList";
  let url = window.AppbaseUrlNew+"/api/EMRPrescription/DeletePrescription?Id="+rowId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'DELETE'
}).then((res) => res.json()).then(data);
return response;  
}
export default FHIRDeletePrescriptionList;