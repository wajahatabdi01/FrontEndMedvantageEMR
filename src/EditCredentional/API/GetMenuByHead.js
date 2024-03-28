export default async function GetMenuByHead(deptId, headId) {

    // console.log("Fsdfh")
    let url = window.UserbaseUrl + "/api/Users/GetMenuByDepartmentIdUserIdAndMenuId?deptId=" + deptId + "&userId=" + window.userId + "&clientId=" + window.clientId + "&headId=" + headId
    let head = { 'Content-Type': 'application/json', 'accept': '*/*', };
    let data = {};
    let responsonse = "";
    await fetch(url, {
        method: "GET",
        headers: head,
        // body: JSON.stringify(sendData),
    })
        .then(res => res.json())
        .then(data => { responsonse = data })
        .catch(error => { responsonse = error })


    return responsonse
}
