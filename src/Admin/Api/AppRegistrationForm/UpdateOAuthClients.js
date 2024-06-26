async function UpdateOAuthClients(data) {
    console.log("data", data)
    let url = window.UserbaseUrl + "/api/Users/UpdateOAuthClientsIsEnabled?AuthClientId=" + data.AuthClientId + "&IsEnableOrDisable=" + data.IsEnableOrDisable;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
    }
    let response =
        await fetch(url, {
            method: 'PUT',
            headers: head,
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(data)
    return response;
}
export default UpdateOAuthClients