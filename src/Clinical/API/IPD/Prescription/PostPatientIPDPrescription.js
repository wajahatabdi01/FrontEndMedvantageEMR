async function PostPatientIPDPrescription(data) {
  console.log("calllllll")
    let url = window.SendXMLDatabaseUl + "/api/PatientIPDPrescription/InsertPatientIPDPrescription";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default PostPatientIPDPrescription;