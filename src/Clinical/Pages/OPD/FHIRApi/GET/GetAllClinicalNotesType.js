async function GetAllClinicalNotesType(data) {
  let url = window.AppbaseUrlNew+"/api/ClinicalNotesCategoryAndTypeMaster/GetAllClinicalNotesType";
let head = { "Content-Type": "application/JSON", accept : '*/*' };


let response = fetch(url, {
  headers: head,
  method : 'GET'
})
  .then((res) => res.json())
  .then(data);

return response;
}
export default GetAllClinicalNotesType;