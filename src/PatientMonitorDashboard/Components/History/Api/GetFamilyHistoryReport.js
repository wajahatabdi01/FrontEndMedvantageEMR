let GetFamilyHistoryReport = async(key)=>{
    let url = window.AppbaseUrl + "/api/PatientHistoryForFamilyAndMedical/GetPatientFamilyHistory?UHID="+key;
    //let url ="https://localhost:7225/api/PatientHistoryForFamilyAndMedical/GetPatientFamilyHistory?UHID=UHID00603";
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
  export default GetFamilyHistoryReport;