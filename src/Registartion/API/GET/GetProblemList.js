async function GetProblemList(data) {
    let url = window.AppbaseUrl + "/api/KnowMedApis/GetProblemList";
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetProblemList;