async function GetClinicalInstructionListListByUhid(uhid, encounterId) {
  // let url = window.fhiropenEMR+"/api/FHIRCarePlanTypeMaster/GetAllCarePlanType";
  let url = window.AppbaseUrl+"/api/FHIRFormClinicalInstructions/GetAllFormClinicalInstructions?Uhid="+uhid+"&EncounterId="+encounterId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetClinicalInstructionListListByUhid;