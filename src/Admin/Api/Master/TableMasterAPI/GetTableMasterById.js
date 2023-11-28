
async function GetTableMasterById(id) {
    let url = window.AdminbaseUrl+"/api/TableMaster/GetTableMasterById?Id="+ id;
  let head = { "Content-Type": "application/JSON", accept : '*/*' };
  
  let data ={}
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  })
    .then((res) => res.json())
    .then(data);
  
  return response;
  }
  export default GetTableMasterById;
  