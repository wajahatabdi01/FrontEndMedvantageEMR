let DeletePatientOutput = async (pmID,key,userID)=>{
    let url = window.AppbaseUrl+'/api/output/DeletePatientOutput?pmID='+pmID+'&Key='+key+'&userID='+userID;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'DELETE'
    }).then((res) => res.json()).then(data);

    return response;
}
export default DeletePatientOutput;