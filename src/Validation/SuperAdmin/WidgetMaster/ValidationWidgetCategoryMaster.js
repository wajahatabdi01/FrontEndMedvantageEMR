function ValidationWidgetCategoryMaster(categoryName = "") {
    if (categoryName !== "" &&  categoryName.trim().length !== 0 ) {
        return [true,'']
    }
    else if(categoryName === "" &&  categoryName.trim().length === 0){
        return [false,'errddlCategoryName','Please enter category name']
    }
}
export default ValidationWidgetCategoryMaster;