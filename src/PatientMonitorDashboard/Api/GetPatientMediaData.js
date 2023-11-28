let GetPatientMediaData = async(uhid, category="")=>{
    let url =window.AppbaseUrl+"/api/PatientMediaData/GetPatientMediaData?uhId="+uhid+"&category="+category;
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
  export default GetPatientMediaData;