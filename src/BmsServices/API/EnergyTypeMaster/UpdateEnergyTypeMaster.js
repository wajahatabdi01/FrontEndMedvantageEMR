
  
async function UpdateEnergyTypeMaster(data) {

    let url =   window.BMSservicesUrl +"/api/EnergytypeMaster/UpdateEnergytypeMaster"
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
  export default UpdateEnergyTypeMaster;



