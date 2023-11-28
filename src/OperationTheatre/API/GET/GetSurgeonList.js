let GetSurgeonList = async()=>{
    //const url="https://localhost:7235/api/SurgeonList/GetAllSurgeonList";
    const url=window.UserbaseUrl+"/api/SurgeonList/GetAllSurgeonList";
    console.log('usrl',url);
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetSurgeonList