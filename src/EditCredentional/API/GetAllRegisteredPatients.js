let GetAllRegisteredPatients = async(pageNumber,pageSize,patientName,dob)=>{
    
    //let url = window.fhiropenEMR + "/api/PatientRegistration/GetAllRegisteredPatientlistForFHIR?pageNumber="+pageNumber+"&pageSize="+pageSize;
    // localhost:5001/api/PatientRegistration/GetAllRegisteredPatientlistForFHIRByPatientnameANDSsnANDDobANDExternalId?pageNumber=1&pageSize=10&patientName=yasir
    let url = "https://localhost:5001/api/PatientRegistration/GetAllRegisteredPatientlistForFHIRByPatientnameANDSsnANDDobANDExternalId?pageNumber="+pageNumber+"&pageSize="+pageSize+"&patientName="+patientName+"&dob="+dob;
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let response = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { response = data })
        .catch(error => { response = error })


    return response
}
export default GetAllRegisteredPatients;