let GetMedicalHistory = async(key)=>{
    let url = window.AppbaseUrl + "/api/PatientHistoryForFamilyAndMedical/GetPatientMedicalHistory?UHID="+key;
   
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        body: JSON.stringify(),
    }).then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })
  
  
    return responsonse
  }
  export default GetMedicalHistory;