
async function ReadUnreadComplaint (id,complaintNumber,data) {

    let url = window.MaintenanceUrl + `/api/Complaint/ComplaintReadAndIsRead?id=${id}&complaintNumber=${complaintNumber}`;
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
  export default ReadUnreadComplaint;

  
  