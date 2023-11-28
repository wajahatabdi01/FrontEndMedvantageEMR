let GetIssueList = async (bloodGroupID,productID) => {

    //let url = window.BloodbaseUrl + '/api/GetIssueList/GetIssueList';api/GetIssueList/GetIssueList?bloodGroupID=1&productID=6
    let url = window.BloodbaseUrl + 'api/GetIssueList/GetIssueList?bloodGroupID'+'='+bloodGroupID+'&'+'productID'+'='+productID;
    let head = {'Content-Type':'application/json-patch+json','accept':'*/*',};
    let data = {};
    let response = await fetch(url, {
        method : 'GET',
        headers : head,
    }).then(res => res.json()).then(data);
    return response;
}
export default GetIssueList;