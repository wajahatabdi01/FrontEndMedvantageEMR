export default async function  GetHistorySubCategoryMasterById(id) {
    let url = window.AppbaseUrl + `/api/HistorySubCategory/GetHistorySubCategoryMasterById?CategoryId=${id}`;
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
