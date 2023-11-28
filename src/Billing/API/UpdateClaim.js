


async function UpdateClaim (data) {

    let URL = window.BillingbaseUrl + `/api/Claimremburse/UpdateClaimRecivied`;  
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
  export default UpdateClaim;
  