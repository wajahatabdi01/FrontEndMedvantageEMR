
async function GetComplaintChartReply (id,ComplaintID,data) {

    let url = window.MaintenanceUrl + `/api/ComplaintResponse/GetAllComplaintResponse?id=${id}&ComplaintID=${ComplaintID}`;
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
  export default GetComplaintChartReply;

  
  