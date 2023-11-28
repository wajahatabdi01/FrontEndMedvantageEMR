async function PostModuleMaster(data) {
    let token ='bearer '+ window.SuperAdminToken;
    let url = window.AdminbaseUrl + '/api/ModuleMaster/SaveModuleMaster';
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
  export default PostModuleMaster;