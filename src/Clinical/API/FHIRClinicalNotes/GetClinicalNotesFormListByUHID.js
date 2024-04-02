async function GetClinicalNotesFormListByUHID(uhid, encounterId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetClinicalNotesFormListByUHID";
  let url = window.AppbaseUrl+"/api/FHIRClinicalNotesForm/GetAllClinicalNotesForm?Uhid="+uhid+"&EncounterId="+encounterId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetClinicalNotesFormListByUHID;