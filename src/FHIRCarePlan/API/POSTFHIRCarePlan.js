// async function POSTFHIRCarePlan(obj) {
//   let url = window.fhiropenEMR+"/api/FHIRCarePlan/InsertCarePlanData";
//   let head = { "Content-Type": "application/JSON", accept : '*/*' };
//   let data={};
// let response = fetch(url, {
//   headers: head,
//   method : 'POST',
//   body: JSON.stringify(obj),
// }).then((res) => res.json()).then(data);

// return response;
// }
// export default POSTFHIRCarePlan;

const POSTFHIRCarePlan = async(params)=>{
  let url = window.fhiropenEMR+"/api/FHIRCarePlan/InsertCarePlanData";
  let head = { 'Content-Type': 'application/JSON', 'accept': '*/*', };
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
export default POSTFHIRCarePlan;