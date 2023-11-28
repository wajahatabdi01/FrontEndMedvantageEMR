let PostAssignMachineToPatient = async (obj)=>{
    const clientID=JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    let url = window.AppbaseUrl + '/api/PatientMachineAssign/AssignMachinetoPatient?machineID='+obj.machineID+'&pmID='+obj.pmID+'&userID='+obj.userId+"&ClientId="+clientID+"&equipmentTypeId="+obj.equipmentTypeId;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'POST'
    }).then((res) => res.json()).then(data);

    return response;
}
export default PostAssignMachineToPatient;