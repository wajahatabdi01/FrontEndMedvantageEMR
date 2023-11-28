async function GetMenuAndDeptByHeadId(data) {
    let url =
        window.UserbaseUrl + `/api/Users/GetMenuAndDeptByHeadId?headId=${data}&userId=${window.userId}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetMenuAndDeptByHeadId;