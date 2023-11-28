let GetPhysicalActivityByUHID = async(uhid)=>{
  let url = window.AppbaseUrl + "/api/PatientPhysicalActivityTracker/GetAllPhysicalActivity?uhid="+uhid;
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
export default GetPhysicalActivityByUHID;