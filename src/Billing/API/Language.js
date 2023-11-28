let Language = async(Langid) => {
   
    let URL =`http://172.16.61.31:7083/api/LanguageConversionMaster/GetLanguageConversionMasterHeadMaster?langId=${Langid}`;   
    const head = {'content-type':'application/json','accept':'*/*',}
    let data = {};
    let response = await fetch(URL,{
      method: "GET",
      header: head,
  
    }).then(res => res.json()).then(data);
    return response;
  }
  export default  Language;