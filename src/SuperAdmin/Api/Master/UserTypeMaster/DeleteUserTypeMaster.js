async function DeleteUserTypeMaster(data) {
    let token = window.SuperAdminToken;
    let url = window.AdminbaseUrl + "/api/UserTypeMaster/DeleteUserTypeMaster";
    let head = {
        "Content-Type": "application/JSON",
        accept: "*/*",
        'Authorization': token,
    };
    let response =
      await fetch(url, {
        method: 'DELETE',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default DeleteUserTypeMaster;


