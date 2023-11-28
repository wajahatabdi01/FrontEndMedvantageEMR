
async function GetHeadListByUserId(selectedLanguageId) {
    let langId = selectedLanguageId !== undefined?selectedLanguageId:JSON.parse(window.sessionStorage.getItem("languageId")).languageId;
    let url = window.UserbaseUrl + `/api/Users/GetHeadListByUserId?userId=${window.userId}&languageId=${langId}`;
    let head = { "Content-Type": "application/JSON", accept: '*/*' };
    let data = {}
    let response = fetch(url, {
        headers: head,
        method: 'GET'
    })
        .then((res) => res.json())
        .then(data);

    return response;
}
export default GetHeadListByUserId;





