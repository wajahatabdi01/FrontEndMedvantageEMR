
async function GetAllCountryCodeList (data) {

    let url = window.AdminbaseUrl + "/api/CountryMaster/GetAllCountryMaster";
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
  export default GetAllCountryCodeList;
  