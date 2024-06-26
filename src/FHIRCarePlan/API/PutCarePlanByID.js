const PutCarePlanByID = async(params)=>{
  let url = window.AppbaseUrl+"/api/EMRPatientCarePlan/UpdatePatientCarePlan";
  let head = { 'Content-Type': 'application/JSON', 'accept': '*/*', };
  let responsonse = "";
  await fetch(url, {
      method: "PUT",
      headers: head,
      body: JSON.stringify(params),
  }).then(res => res.json())
      .then(data => { responsonse = data })
      .catch(error => { responsonse = error })


  return responsonse
}
export default PutCarePlanByID;