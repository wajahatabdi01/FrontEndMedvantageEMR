
async function GetMenuAndDeptByHeadId(wardId, langId = "") {
    let url = ""
    // console.log("languageId", )
    if (langId === "") {

        url = window.UserbaseUrl + `/api/Users/GetMenuAndDeptByHeadId?headId=${wardId}&userId=${window.userId}&languageId=${window.languageId}`;
    }
    else {
        url = window.UserbaseUrl + `/api/Users/GetMenuAndDeptByHeadId?headId=${wardId}&userId=${window.userId}&languageId=${langId}`;

    }
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetMenuAndDeptByHeadId;





