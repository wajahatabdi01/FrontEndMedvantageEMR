export default async function  GetAntibiogramName() {
    let url = window.AppbaseUrl + '/api/GetantibioticBacteriaList/GetAntibiogramNameList';
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