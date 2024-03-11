


async function UpdateCashlessRequest (data) {

    let URL = window.AppbaseUrl + `/api/CashLess/UpdateCashLess`;  
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response =
      await fetch(URL, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
      })
        .then((res) => res.json())
        .then(data)
  
  
    return response;
  }
  export default UpdateCashlessRequest;
  