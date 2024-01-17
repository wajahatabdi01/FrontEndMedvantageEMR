async function GetUserListByRoleId(param) {
    let url = window.fhirUserEMR + "/api/Users/GetUserListByRoleId?roleId="+param.roleId+"&clientId="+param.clientID;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(param);

    return response;
}
export default GetUserListByRoleId;