async function GetAllMenusAndDepartmentsByRoleId(roleId) {

    let token = 'bearer ' + window.AppToken;
    let url = window.AdminbaseUrl + "/api/RoleWiseMenuAssign/GetAllMenusAndDepartmentsByRoleId?roleId="+roleId;
    let head = { "Content-Type": "application/JSON", accept: '*/*', 'Authorization': token };

    let response = await fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then();

    return response;
}
export default GetAllMenusAndDepartmentsByRoleId;

