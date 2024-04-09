let GetWardList=async(deptID)=>{
    const url= window.AppbaseUrl+"/api/WardDepartmentAssign/GetWardByDepartmentId?id="+deptID;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetWardList;