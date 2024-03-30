export default async function InsertPatientVitalForONC(sendData) {
  let url = window.AppbaseUrl + "/api/PatientPrescriptionVital/InsertPatientPrescriptionVital"
  let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
  let data = {};
  let responsonse = "";
  await fetch(url, {
      method: "POST",
      headers: head,
      body: JSON.stringify(sendData),
  })
      .then(res => res.json())
      .then(data => { responsonse = data })
      .catch(error => { responsonse = error })


  return responsonse
}
