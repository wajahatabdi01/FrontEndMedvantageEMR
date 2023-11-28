let GetAnesthesiaList = async()=>{
    //const url="https://localhost:7100/api/AnesthesiaMaster/GetAllAnesthesia";
    const url=window.OTBaseURL+"AnesthesiaMaster/GetAllAnesthesia";
    console.log('usrl',url);
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetAnesthesiaList