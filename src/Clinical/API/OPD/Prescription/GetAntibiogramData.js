export default async function  GetAntibiogramData(flag, fromDate, toDate) {
    let url = window.AppbaseUrl + '/api/GetantibioticBacteriaList/GetantibioticBacteriaLists?Flag='+flag+'&FromDate='+fromDate+'&ToDate='+toDate;
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