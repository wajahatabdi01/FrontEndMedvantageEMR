let GetPatientIntakeFoodList = async(uhID,date) =>
{
  let url = window.DietservicesUrl +'/api/FoodIntake/GetFoodIntake?Uhid='+uhID+'&fromDate='+date;
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',}
  let data  = {};
  let response = await fetch(url, {
    method:'GET',
    headers: head,
    body: JSON.stringify()
  }).then(res => res.json()).then(data);
  return response;
}
export default GetPatientIntakeFoodList;