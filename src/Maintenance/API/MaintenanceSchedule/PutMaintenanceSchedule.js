
async function PutMaintenanceSchedule (data) {

    let url = window.MaintenanceUrl + "/api/MaintenanceSchedule/UpdateMaintenanceSchedule";
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
  export default PutMaintenanceSchedule;

  
  