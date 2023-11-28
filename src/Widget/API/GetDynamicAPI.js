async function GetDynamicAPI(urls) {
    let url = urls;
    let head = { "Content-Type": "application/JSON", accept : '*/*' };
  let data = {}

  let response = fetch(url, {
    headers: head,
    method : 'GET'
  }).then((res) => res.json()).then(data);

  return response;
}
export default GetDynamicAPI;
