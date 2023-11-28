async function PostDashboardMaster(data) {
    let token ="bearer "+ window.SuperAdminToken;
    let url = window.AdminbaseUrl + '/api/DashboardMaster/InsertDashboardMaster';
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
  export default PostDashboardMaster;