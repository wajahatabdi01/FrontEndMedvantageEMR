async function GetTableMaster(data) {
    let url = window.AdminbaseUrl + "/api/TableMaster/GetAllTableMaster"
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
  
    
    let response = fetch(url, {
      headers: head,
      method: 'GET'
    })
      .then((res) => res.json())
      .then(data);
  
    return response;
  }
  export default GetTableMaster;