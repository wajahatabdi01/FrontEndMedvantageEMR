
async function PutMaintenanceVisit (data) {

    let url = window.MaintenanceUrl + "/api/MaintenanceVisit/UpdateMaintenanceVisit";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(url, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default PutMaintenanceVisit;

  
  