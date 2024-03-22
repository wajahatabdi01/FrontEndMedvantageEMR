async function GetAllProviderRole(data) {
    let url = window.UserbaseUrl + "/api/ProviderRolesMaster/GetAllProviderRolesMaster";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };

    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllProviderRole;



