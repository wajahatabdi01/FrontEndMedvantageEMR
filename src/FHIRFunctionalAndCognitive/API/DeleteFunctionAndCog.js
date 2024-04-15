async function DeleteFunctionAndCog(id, userid) {
  // let url = window.fhiropenEMR+"/api/FHIRCarePlanTypeMaster/GetAllCarePlanType";
  let url = window.AppbaseUrl+"/api/EMRFormFunctionalCognitiveStatus/DeleteFHIRFormFunctionalCognitiveStatus?Id="+id+"&UserId="+userid;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'DELETE'
}).then((res) => res.json()).then(data);
return response;  
}
export default DeleteFunctionAndCog;