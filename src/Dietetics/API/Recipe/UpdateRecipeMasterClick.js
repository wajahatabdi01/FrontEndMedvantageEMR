async function UpdateRecipeMasterClick(data) {
    let url = window.DietservicesUrl + '/api/RecipeMaster/UpdateRecipeMaster';
    // let token = window.SuperAdminToken;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        // 'Authorization': token
    }


    let response = 
    await fetch(url, {
        method: 'POST',
        headers: head,
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then(data)

    return response;
}
export default UpdateRecipeMasterClick