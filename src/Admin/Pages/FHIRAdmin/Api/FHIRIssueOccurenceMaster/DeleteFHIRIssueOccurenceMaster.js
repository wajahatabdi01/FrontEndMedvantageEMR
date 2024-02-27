

async function DeleteFHIRIssueOccurenceMaster(data) {
    let url = window.AppbaseUrl + '/api/FHIRIssueOccurenceMaster/DeleteFHIRIssueOccurence';
    let token = window.SuperAdminToken;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        'Authorization': token
    }


    let response = 
    await fetch(url, {
        method: 'DELETE',
        headers: head,
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then(data)

    return response;
}
export default DeleteFHIRIssueOccurenceMaster;