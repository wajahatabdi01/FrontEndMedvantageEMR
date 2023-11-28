let GetQuestionnaireSet = async() =>{
    let url = window.CounsellingUrl + "/api/Questionnaire/GetQuestionnaireSet";
    let head = {'Content-Type': 'application/json', 'accept':'*/*'};
    let response = "";
    await fetch(url, {
        method:'GET',
        
    })
}

export default GetQuestionnaireSet;