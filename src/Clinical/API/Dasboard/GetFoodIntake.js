async function GetFoodIntake(Uhid,fromDate) {
    let url = window.DietservicesUrl+"/api/FoodIntake/GetFoodIntake?Uhid="+Uhid+"&fromDate="+fromDate;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };

let data = {};
  let response = await fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);

  return response;
}
export default GetFoodIntake;