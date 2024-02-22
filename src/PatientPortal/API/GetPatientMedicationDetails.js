async function GetPatientMedicationDetails(uhid, clientId) {
    // let url = window.fhiropenEMR+"/api/FHIRImmunizationMaster/FHIRGetAllPrescriptionListByUHID";
    let url = window.AppbaseUrl+"/api/FHIRPrescription/GetAllPrescription?Uhid=UHID00877&ClientId=176";
    let head = {"Content-Type":"application/JSON", accept : "*/*"}
    let data = {}
    let response = fetch(url, {
      headers: head,
      method : 'GET'
  }).then((res) => res.json()).then(data);
  return response;  
  }
  export default GetPatientMedicationDetails;