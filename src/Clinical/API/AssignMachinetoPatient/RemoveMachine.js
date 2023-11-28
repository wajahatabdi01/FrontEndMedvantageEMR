let RemoveMachine = async (param1,param2,param3)=>{
    let url = window.AppbaseUrl + '/api/PatientMachineAssign/RemoveMachine?pmID='+param1+'&key='+param2+'&userID='+param3;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'PUT'
    }).then((res) => res.json()).then(data);

    return response;
}
export default RemoveMachine;