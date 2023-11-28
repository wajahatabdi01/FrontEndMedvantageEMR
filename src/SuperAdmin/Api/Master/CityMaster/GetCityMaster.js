async function GetCityMaster(data) {
    let url =
    window.AdminbaseUrl+"/api/CityMaster/GetAllCityMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetCityMaster;