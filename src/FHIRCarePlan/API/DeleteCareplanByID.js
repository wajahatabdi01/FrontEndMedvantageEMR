async function DeleteCareplanByID(rowId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/DeleteCareplanByID";
  let url = window.AppbaseUrl+"/api/EMRPatientCarePlan/DeletePatientCarePlan?Id="+rowId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'DELETE'
}).then((res) => res.json()).then(data);
return response;  
}
export default DeleteCareplanByID;