async function PutExaminationMaster(data) {
    let url = window.AppbaseUrl + '/api/ExaminationCategory/UpdateExaminationCategoryMaster';
    // let token = window.SuperAdminToken;
    let head = {
        'Content-Type': 'application/JSON',
        accept: '*/*',
        // 'Authorization': token
    }


    let response = 
    await fetch(url, {
        method: 'PUT',
        headers: head,
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .then(data)

    return response;
}
export default PutExaminationMaster