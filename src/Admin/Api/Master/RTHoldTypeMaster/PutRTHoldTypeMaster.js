async function PutRTHoldTypeMaster(data) {
    let url = window.AppbaseUrl + '/api/RTHoldTypeMaster/UpdateRTHoldTypeMaster';
   
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
export default PutRTHoldTypeMaster;