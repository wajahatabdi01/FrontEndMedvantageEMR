
let GetAllSupplementList = async(Uhid,fromDate) =>
{
  let url = window.DietservicesUrl+ '/api/MedicationIntake/GetSupplementIntake?Uhid='+Uhid+'&fromDate='+fromDate;
  //let url ='https://localhost:7299/api/FoodIntake/GetFoodIntake?Uhid='+Uhid+'&fromDate='+fromDate;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data  = {};
  let response = await fetch(url, {
    method:'GET',
    headers: head,
    body: JSON.stringify()
  }).then(res => res.json()).then(data);
  return response;
}
export default GetAllSupplementList;