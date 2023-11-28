let DeleteItem = async (id)=>{
    let url=window.BillingbaseUrl+"/api/ItemMaster/DeleteItemMaster?id="+id;
    const head={'Content-Type': 'application/json-patch+json','acept':'*/*',};
    let data={};
    let response= await fetch(url,{
         method:"DELETE",
         headers:head,
         body:JSON.stringify()
    }).then((res)=>res.json()).then(data);
    return response;
}
export default DeleteItem;