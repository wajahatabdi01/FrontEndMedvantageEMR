async function GetAddUser(clientID) {

    let token = 'bearer ' + window.AppToken;
    // console.log("token", token)
    // let url = window.UserbaseUrl + "/api/Users/GetUserRegistration" ;
    let url = window.UserbaseUrl + "/api/Users/GetUserRegistration?clientId="+clientID;
    let head = { "Content-Type": "application/JSON", accept: '*/*', 'Authorization': token };

    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then();

    return response;
}
export default GetAddUser;

