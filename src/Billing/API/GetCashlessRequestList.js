
let GetCashlessRequestList = async () => {

    let URL = window.AppbaseUrl + '/api/CashLess/GetAllCashLessList';
    let head = {"Content-Type":"application/JSON", 'accept':'*/*'}
    let response="";
  
    response = await fetch(URL, {
          headers : head,
          method : "GET"
    })
      .then(res => res.json())
      .then(data => response=data)
      .catch(error => error)
      return response;
  }
  
  export default GetCashlessRequestList;