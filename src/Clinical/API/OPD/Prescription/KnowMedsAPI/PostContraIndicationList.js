async function PostContraIndicationList(sendData) {

    // let url = window.AppbaseUrl + `/api/ADRReport/getContraIndication`;
    let url = window.fhiropenEMR + `/api/ADRReport/getContraIndication`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let responsonse = "";
    await fetch(url, {
        headers: head,
        method: 'POST',
        body: JSON.stringify(sendData),
    })
    .then(res => res.json())
    .then(data => { responsonse = data })
    .catch(error => { responsonse = error })

    return responsonse;
}
export default PostContraIndicationList;