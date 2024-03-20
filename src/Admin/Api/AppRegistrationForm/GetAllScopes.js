async function GetAllScopes(data) {
    let url = "http://172.16.19.96:5089/Account/GetAllScopes";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllScopes;
