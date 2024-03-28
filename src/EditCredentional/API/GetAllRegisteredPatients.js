let GetAllRegisteredPatients = async (pageNumber, pageSize, firstName, lastName, socialSecurityNo, dob, externalId) => {
    let url = window.AppbaseUrl + "/api/PatientRegistration/GetAllRegisteredPatientlistForFHIRByPatientnameANDSsnANDDobANDExternalId?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&patientName=" + firstName + "&lastName=" + lastName + "&socialSecurityNo=" + socialSecurityNo + "&dob=" + dob + "&externalId=" + externalId;
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