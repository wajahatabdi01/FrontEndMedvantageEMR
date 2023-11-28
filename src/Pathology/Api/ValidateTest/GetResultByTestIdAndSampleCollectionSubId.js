let GetResultByTestIdAndSampleCollectionSubId = async (testId,subId,clientId) => {
  let url = window.LabServicebaseUrl+"/api/ResultPerform/GetResultByTestIdAndSampleCollectionSubId?testId="+testId+"&SampleCollectionSubId="+subId+"&clientId="+clientId;

    let head = { "Content-Type": "application/JSON", accept : '*/*' };
    let data={};
  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetResultByTestIdAndSampleCollectionSubId