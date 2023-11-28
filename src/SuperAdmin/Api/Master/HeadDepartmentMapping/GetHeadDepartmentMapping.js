async function GetHeadDepartmentMapping(data) {
    let url =
    window.AdminbaseUrl+"/api/HeadDepartmentMapping/GetAllHeadDepartmentMapping";
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetHeadDepartmentMapping;