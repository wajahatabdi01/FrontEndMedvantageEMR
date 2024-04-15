async function DeleteClinicalNotesFormById(id, userId) {
  // let url = window.fhiropenEMR+"/api/FHIRCarePlanTypeMaster/GetAllCarePlanType";
  let url = window.AppbaseUrl+"/api/EMRClinicalNotesForm/DeleteClinicalNotesForm?Id="+id+"&UserId="+userId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'Delete'
}).then((res) => res.json()).then(data);
return response;  
}
export default DeleteClinicalNotesFormById;