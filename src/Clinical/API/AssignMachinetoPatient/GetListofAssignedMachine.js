let GetListofAssignedMachine = async (param)=>{
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    let url = window.AppbaseUrl + '/api/PatientMachineAssign/GetListofAssignedMachine?pmID='+param+'&clientID='+clientID;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetListofAssignedMachine;