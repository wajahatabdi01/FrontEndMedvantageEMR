let DeleteAssignedMachine = async (param1,param2,param3)=>{
    let url = window.AppbaseUrl + '/api/PatientMachineAssign/DeleteAssignedMachine?pmID='+param1+'&key='+param2+'&userID='+param3;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'DELETE'
    }).then((res) => res.json()).then(data);

    return response;
}
export default DeleteAssignedMachine;