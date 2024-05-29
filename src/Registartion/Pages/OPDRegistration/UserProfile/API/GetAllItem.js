async function GetAllItem(data) {
    let url = window.BillingbaseUrl + "/api/ItemMaster/GetAllItemMaster?id=" + 4422;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetAllItem;