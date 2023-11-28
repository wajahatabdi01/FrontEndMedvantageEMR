function ValidationWidgetMaster(widgetCategoryId = '0', title="", type="" , headingColor="", bgColor="", fontFamily="", apiURL="") {
    if (widgetCategoryId !== "0" && title !== "" && title.trim().length !== 0 && type !== "" && type.trim().length !== 0
    && headingColor !== "" && headingColor.trim().length !== 0 && bgColor !== "" && bgColor.trim().length !== 0 
    && fontFamily !== "" && fontFamily.trim().length !== 0 && apiURL !== "" && apiURL.trim().length !== 0) {
        return [true,''];
    }
    else if(widgetCategoryId === '0'){
        return [false, 'errddlWidgetCategoryId', 'Please select Widget Category']
    }
    else if(title === "" && title.trim().length === 0){
        return [false, 'errddlTitle', 'Please enter Title']
    }
    else if(type === "" && type.trim().length === 0){
        return [false, 'errddlType', 'Please enter Type']
    }
    else if(headingColor === "" && headingColor.trim().length === 0){
        return [false, 'errddlHeadingColor', 'Please enter Heading Color']
    }
    else if(bgColor === "" && bgColor.trim().length === 0 ){
        return [false, 'errddlbgColor', 'Please enter bg Color']
    }
    else if(fontFamily === "" && fontFamily.trim().length === 0){
        return [false, 'errddlFontFamily', 'Please enter Font Family']
    }
    else if(apiURL === "" && apiURL.trim().length === 0){
        return [false, 'errddlApiURL', 'Please enter api URL']
    }
}
export default ValidationWidgetMaster;