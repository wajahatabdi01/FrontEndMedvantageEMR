async function GetMedicationAllergyStatus(uhid, clientId, medicineId) {
  // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/GetMedicationAllergyStatus";
  let url = window.AppbaseUrl+"/api/FHIRPrescription/CheckMedicineAllergy?Uhid="+uhid+"&ClientId="+clientId+"&MedicineId="+medicineId;
  let head = {"Content-Type":"application/JSON", accept : "*/*"}
  let data = {}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
}).then((res) => res.json()).then(data);
return response;  
}
export default GetMedicationAllergyStatus;