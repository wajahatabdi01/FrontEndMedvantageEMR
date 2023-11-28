let GetRoomList=async(deptID)=>{
    const url= window.AppbaseUrl+"/api/RoomDepartmentAssign/GetAllRoomDepartmentAssign?DepartmentId="+deptID;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetRoomList;