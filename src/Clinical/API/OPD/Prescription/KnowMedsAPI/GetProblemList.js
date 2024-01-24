async function GetProblemList() {

    // let url = window.AppbaseUrl + `/api/KnowMedApis/GetProblemList?userId=${window.userId}`;
    let url = window.fhiropenEMR + `/api/KnowMedApis/GetProblemList?userId=${window.userId}`;
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
export default GetProblemList;