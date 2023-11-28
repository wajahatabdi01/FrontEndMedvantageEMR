export default async function  GetExaminationSubCategory(id) {
    let url = window.AppbaseUrl + `/api/ExaminationSubCategory/GetExaminationSubCategoryMasterById?categoryId=${id}`;
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
