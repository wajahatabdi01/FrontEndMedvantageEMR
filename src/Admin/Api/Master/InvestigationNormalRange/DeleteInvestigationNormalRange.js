async function DeleteInvestigationNormalRange(data) {

    let url = window.AppbaseUrl +'/api/InvestigationNormalRange/DeleteInvestigationNormalRange';
    let head = {
      'Content-Type': 'application/json-patch+json',
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
  export default DeleteInvestigationNormalRange;