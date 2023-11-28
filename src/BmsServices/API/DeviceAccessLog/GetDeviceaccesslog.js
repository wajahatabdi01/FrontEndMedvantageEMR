
async function GetDeviceaccesslog (data) {

    let url = window.BMSservicesUrl + "/api/DeviceAccessLog/GetAllDeviceAccessLog";
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
  export default GetDeviceaccesslog;
  