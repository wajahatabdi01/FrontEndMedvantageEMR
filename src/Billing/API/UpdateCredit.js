

 async function UpdateCredit(data) {

    let URL = window.BillingbaseUrl +`/api/CreditLimit/UpdateCreditLimit`;
    let head = {
      'Content-Type': 'application/JSON',
      accept: '*/*',
    }
    let response = await fetch(URL, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
      }).then((res) => res.json()).then(data);
  
  
    return response;
  }
  export default UpdateCredit;