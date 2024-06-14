async function GetAllScopes(data) {
    let url = "https://onc.medvantage.tech:4001/Account/GetAllScopes";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);
 
    return response;
}
export default GetAllScopes;