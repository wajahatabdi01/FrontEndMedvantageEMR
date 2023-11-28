async function PostCountryMaster(data) {
    let token = window.SuperAdminToken;
    let url = window.AdminbaseUrl + '/api/CountryMaster/InsertCountryMaster';
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
      'Authorization': token
    }
    let response =
      await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
      
  
    return response;
  }
  export default PostCountryMaster;