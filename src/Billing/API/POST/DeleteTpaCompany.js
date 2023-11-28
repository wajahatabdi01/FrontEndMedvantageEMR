let DeleteTpaCompany = async (obj) => {
 
    const url = window.BloodbaseUrl + '/api/TpaCompany/DeleteCompany';
  let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
  let data = {};
  let response = await fetch(url, {
    headers: head,
    method: 'Delete',
    body: JSON.stringify(obj),
  }).then(res => res.json()).then(data);
  return response;
  }
  export default DeleteTpaCompany;
