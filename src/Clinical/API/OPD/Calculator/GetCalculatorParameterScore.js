async function GetCalculatorParameterScore(object) {

    // let url = window.AppbaseUrl + `/api/Calculator/GetCalculatorParameterWithResult?id=${object.id}&UHID=${object.uhid}`;
    let url = window.AppbaseUrl + `/api/Calculator/GetCalculatorParameterScore?id=${object.calculatorId}&UHID=${object.uhid}&parameterID=${object.parameterId}&parameterValue=${object.paramaterValue}`;
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
export default GetCalculatorParameterScore;