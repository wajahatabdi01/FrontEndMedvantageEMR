async function PutInvestigationByRange(data) {
    let url = window.AppbaseUrl + '/api/InvestigationNormalRange/UpdateInvestigationNormalRange';
   
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
    }


    let response = await fetch(url, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then(data)

    return response;
}
export default PutInvestigationByRange;