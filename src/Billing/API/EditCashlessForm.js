


async function EditCashlessForm (data) {

    let URL = window.BillingbaseUrl + `/api/FillCashLess/UpdateCashLessForm`;  
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
  export default EditCashlessForm;
  