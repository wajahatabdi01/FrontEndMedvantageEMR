async function DeletePatientVenti(data) {

  // let url = 'https://localhost:7225/api/PatientLifeSupportAssign/DeletePatient';
  let url = window.AppbaseUrl + '/api/PatientLifeSupportAssign/DeletePatient'
  let head = {
    'Content-Type': 'application/JSON',
    accept: '*/*',
    
  }
  let response =
    await fetch(url, {
      method: 'Delete',
      headers: head,
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(data)
    

  return response;
}
export default DeletePatientVenti;