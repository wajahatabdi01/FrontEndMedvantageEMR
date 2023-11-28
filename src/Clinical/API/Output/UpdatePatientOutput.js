let UpdatePatientOutput = async (obj)=>{
    let url = window.AppbaseUrl+'/api/output/UpdatePatientOutput';
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'PUT',
        body:JSON.stringify(obj)
    }).then((res) => res.json()).then(data);

    return response;
}
export default UpdatePatientOutput;