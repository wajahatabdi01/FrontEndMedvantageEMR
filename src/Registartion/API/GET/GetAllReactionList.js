async function GetAllReactionList(data) {
    let url = window.AppbaseUrl + "/api/EMRReactionMaster/GetAllReactionMaster";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetAllReactionList;