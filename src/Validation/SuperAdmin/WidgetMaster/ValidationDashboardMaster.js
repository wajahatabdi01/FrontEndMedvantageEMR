function ValidationDashboardMaster(title = "", description = "") {
    if (title !== "" &&  title.trim().length !== 0 && description !== "" &&  description.trim().length !== 0) {
        return [true,''];
    }
    else {
        if(title === "" &&  title.trim().length === 0){
            return [false,'errddlTitle', 'Please enter title'];
        }
        else if(description === "" &&  description.trim().length === 0){
            return [false,'errddlDescription', 'Please enter description'];
        }
        
    }
}
export default ValidationDashboardMaster;