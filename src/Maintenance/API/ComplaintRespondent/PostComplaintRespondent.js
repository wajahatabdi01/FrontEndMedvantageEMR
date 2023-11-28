
async function PostComplaintRespondent (data) {

    let url = window.MaintenanceUrl  + "/api/ComplaintRespondent/InsertIComplaintRespondent";
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
  export default PostComplaintRespondent;

  
  