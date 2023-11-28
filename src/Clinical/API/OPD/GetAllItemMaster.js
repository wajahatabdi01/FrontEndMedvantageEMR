async function GetAllItemMaster() {
    let url = window.BillingbaseUrl + `/api/ItemMaster/GetAllItemMaster`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetAllItemMaster;