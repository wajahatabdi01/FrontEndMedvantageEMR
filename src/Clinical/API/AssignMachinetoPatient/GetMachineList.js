let GetMachineList = async (key)=>{
    let url = window.AppbaseUrl + '/api/PatientMachineAssign/GetMachineList?machineTypeId='+key;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    }).then((res) => res.json()).then(data);

    return response;
}
export default GetMachineList;