
let saveBillingDetails = async (data) => {

    let URL = window.BillingbaseUrl + '/api/Billing/InsertBillingDetails';
    let head = { "Content-Type": "application/JSON", 'accept': '*/*' }

    let response = "";
    response = await fetch(URL, {
        headers: head,
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => response = data)
        .catch(error => error);

    return response;
}

export default saveBillingDetails;