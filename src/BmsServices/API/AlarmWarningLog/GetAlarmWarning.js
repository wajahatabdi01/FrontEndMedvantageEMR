
async function GetAlarmWarning (data) {
  const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;

    let url = window.BMSservicesUrl + `/api/AlarmWarningLog/GetAllAlarmWarningLog?client=${clientID}`;
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
  export default GetAlarmWarning;
  