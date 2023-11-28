const GetUnitList = async () =>{
    
    const url = window.AdminbaseUrl + "/api/UnitMaster/GetAllUnitMaster";
    const head = {'content-type' : 'application/json','accept':'*/*'};
    const data = {};
    const response = await fetch(url, {
        method: 'GET',
        header: head,
    }).then(res => res.json()).then(data);
    return response;
};
export default GetUnitList;
