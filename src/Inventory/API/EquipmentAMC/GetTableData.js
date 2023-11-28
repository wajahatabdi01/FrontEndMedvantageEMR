const GetTableData = async() =>{
    
    const url = window.InventoryBaseUrl + "/api/EquipmentAmc/GetAllEquipmentAmc";
    const head = {'content-type': 'application/json', 'accept': '*/*'};
    const data = {};
    const response = await fetch(url,{
        method: 'GET',
        headers: head,
    }).then(res =>res.json()).then(data);
    return response;
};

export default GetTableData;