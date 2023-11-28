async function POSTProvableDiseaseList(object) {
    let url = window.AppbaseUrl + `/api/KnowMedApis/ProvableDiseaseList?Age=${object.age}&AgeUnitId=${object.ageunit}&Gender=${object.gender}&UserId=${window.userId}&SuggestedProblemId=${object.problemID}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let responsonse = "";
    await fetch(url, {
        headers: head,
        method: 'POST',
        // body: JSON.stringify(sendData),
    })
    .then(res => res.json())
    .then(data => { responsonse = data })
    .catch(error => { responsonse = error })

    return responsonse;
}
export default POSTProvableDiseaseList;