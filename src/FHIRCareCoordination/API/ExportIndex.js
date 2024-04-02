async function ExportIndex(formData) {
    const url = "http://172.16.19.96/open/apis/default/api/exportIndex ";
    let head = { accept: '*/*' };
    let response = fetch(url, {
        headers: head,
        method: 'POST',
        body: formData
    }).then((res) => res.json()).then(formData);

    return response;
}
export default ExportIndex;
