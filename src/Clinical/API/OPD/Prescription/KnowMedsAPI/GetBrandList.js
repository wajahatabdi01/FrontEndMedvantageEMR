async function GetBrandList() {

    // let url = window.AppbaseUrl + `/api/KnowMedApis/GetBrandList?userId=${window.userId}`;
    let url = window.AppbaseUrl + `/api/KnowMedApis/GetBrandList?userId=${window.userId}`;
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
export default GetBrandList;