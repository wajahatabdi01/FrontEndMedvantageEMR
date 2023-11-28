const GetTableData = async (clientId) =>{
    const url = window.LabServicebaseUrl + "/api/AllMasters/SelectSubtestNormalRange?clientId="+clientId;
    const head = {'content-type' : 'application/json','accept':'*/*'};
    const data = {};
    const response = await fetch(url, {
        method: 'GET',
        header: head,
    }).then(res => res.json()).then(data);
    return response;
};
export default GetTableData;