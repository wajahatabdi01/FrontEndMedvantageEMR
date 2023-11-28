let GetDeviceDetails = async(SrowId)=>{
    // const url=window.AdminbaseUrl+"/api/Location/GetLocationMaster";
    const url=window.OTBaseURL+"SurgeryPlannedDetailsByID/GetAllDevicesList?surgeryPlannedID="+SrowId;
    //const url="https://localhost:7100/api/SurgeryPlannedDetailsByID/GetAllDevicesList?surgeryPlannedID="+SrowId;
    //const url=window.AppbaseUrl+"/api/DeviceName/GetAllDevices?DeviceName="+deviceName;
    const head={'content-type':'application/json','accept':'*/*',}
    let data={};
    let response= await fetch(url,{
        method:"GET",
        header:head,
    }).then(res=> res.json()).then(data);
    return response;
}
export default GetDeviceDetails