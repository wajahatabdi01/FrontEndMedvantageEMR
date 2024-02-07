async function DeleteImmunizationByRowId(rowId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/DeleteImmunizationByRowId";
  let url = window.AppbaseUrl+"/api/FHIRImmunization/DeleteImmunizationByRowId?Id="+rowId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'DELETE'
}).then((res) => res.json()).then(data);
return response;  
}
export default DeleteImmunizationByRowId;