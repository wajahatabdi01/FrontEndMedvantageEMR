async function PostAPIAssignHeadDepartmentMaster(data) {

    let url = window.AppbaseUrl + '/api/AssignHeadSubDepartment/InsertAssignHeadSubDepartment';
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
      
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
  export default PostAPIAssignHeadDepartmentMaster;

  