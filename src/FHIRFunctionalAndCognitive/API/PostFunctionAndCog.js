
const PostFunctionAndCog = async(params)=>{
  let head = { 'Content-Type': 'application/JSON', 'accept': '*/*', };
  // let url = window.fhiropenEMR+"/api/FHIRCarePlan/InsertCarePlanData";
  let url = window.AppbaseUrl+"/api/FHIRFormFunctionalCognitiveStatus/InsertFHIRFormFunctionalCognitiveStatus";
  let responsonse = "";
  await fetch(url, {
      method: "POST",
      headers: head,
      body: JSON.stringify(params),
  }).then(res => res.json())
      .then(data => { responsonse = data })
      .catch(error => { responsonse = error })


  return responsonse
}
export default PostFunctionAndCog;