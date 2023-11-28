async function GetGenderMaster(data) {
    let url = window.AdminbaseUrl+"/api/GenderMaster/GetAllGenderMaster";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetGenderMaster;