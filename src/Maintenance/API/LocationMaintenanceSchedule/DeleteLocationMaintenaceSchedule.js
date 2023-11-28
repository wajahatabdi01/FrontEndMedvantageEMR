
async function DeleteLocationMaintenaceSchedule (data) {

    let url = window.MaintenanceUrl + "/api/LocationMaintenanceSchedule/DeleteLocationMaintenanceSchedule";
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
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
  export default DeleteLocationMaintenaceSchedule;

  
  