let GetDevicesList = async(deviceName)=>{
    // const url=window.AdminbaseUrl+"/api/Location/GetLocationMaster";
    //const url="https://localhost:7225/api/DeviceName/GetAllDevices?DeviceName="+deviceName;
    const url=window.AppbaseUrl+"/api/DeviceName/GetAllDevices?DeviceName="+deviceName;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetDevicesList