let GetAnesthesiologist = async()=>{
    //const url="https://localhost:7235/api/Anesthesiologist/GetAllAnesthesiologist";
    const url=window.UserbaseUrl+"/api/Anesthesiologist/GetAllAnesthesiologist";
    console.log('usrl',url);
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetAnesthesiologist