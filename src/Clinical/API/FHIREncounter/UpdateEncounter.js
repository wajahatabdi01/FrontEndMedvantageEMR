async function UpdateEncounter(data) {
    let url = window.AppbaseUrl + '/api/EMREncounter/UpdateEncounter?EncounterDetailsJsonString='+data;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
    }

    let response =
        await fetch(url, {
            method: 'PUT',
            headers: head,
            // body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(data)

    return response;
}
export default UpdateEncounter