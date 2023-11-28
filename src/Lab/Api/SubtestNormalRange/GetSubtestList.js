const GetSubtestList = async (clientId) =>{
    const url = window.LabServicebaseUrl + "/api/AllMasters/SelectSubtestMaster?clientId="+clientId;
    const head = {'content-type' : 'application/json','accept':'*/*'};
    const data = {};
    const response = await fetch(url, {
        method: 'GET',
        header: head,
    }).then(res => res.json()).then(data);
    return response;
};
export default GetSubtestList;
