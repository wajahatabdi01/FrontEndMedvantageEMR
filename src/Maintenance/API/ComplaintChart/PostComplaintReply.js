
async function PostComplaintReply (data) {
    let url = window.MaintenanceUrl + "/api/ComplaintResponse/InsertComplaintResponse";
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
  export default PostComplaintReply;

  
  