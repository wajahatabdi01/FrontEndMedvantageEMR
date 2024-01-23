async function GetwhatToEatAndWhatToNotEate(datas) {
  
    // let url = window.AppbaseUrl + `/api/KnowMedApis/whatToEatAndWhatToNotEate?diseaseId=${datas.toString()}`;
    let url = window.fhiropenEMR + `/api/KnowMedApis/whatToEatAndWhatToNotEate?diseaseId=${datas.toString()}`;
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
export default GetwhatToEatAndWhatToNotEate;

