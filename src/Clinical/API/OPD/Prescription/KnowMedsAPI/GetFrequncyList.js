async function GetFrequncyList() {

    let url = window.AppbaseUrl + `/api/KnowMedApis/GetFrequencyList?userId=${window.userId}`;
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
export default GetFrequncyList;