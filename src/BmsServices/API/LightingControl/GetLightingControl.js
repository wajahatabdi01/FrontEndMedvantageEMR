let GetLightingControl = async() => {
    const url = window.BMSservicesUrl + "/api/LightingControl/GetAllLightingControl";
    const head = {'content-type':'application/json','accept':'*/*',}
    let data = {};
    let response = await fetch(url,{
      method: "GET",
      header: head,
    }).then(res => res.json()).then(data);
    return response;
  }
  export default  GetLightingControl;
