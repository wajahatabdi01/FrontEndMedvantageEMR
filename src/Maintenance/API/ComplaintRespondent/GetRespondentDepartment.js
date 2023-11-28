
async function GetRespondentDepartment (data) {

    let url = window.AdminbaseUrl + "/api/DepartmentMaster/GetAllDepartmentMaster";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'GET',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default GetRespondentDepartment;

  
  