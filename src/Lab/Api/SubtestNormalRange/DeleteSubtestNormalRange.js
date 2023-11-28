async function DeleteSubtestNormalRange(data) {

    let url = window.LabServicebaseUrl + "/api/AllMasters/DeleteSubtestNormalRange?Id="+data.id;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response = await fetch(url, {
        method: 'DELETE',
        headers: head,
        body: JSON.stringify(data)
      }).then((res) => res.json()).then(data);
  
  
    return response;
  }
  export default DeleteSubtestNormalRange;