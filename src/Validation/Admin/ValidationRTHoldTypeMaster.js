function ValidationRTHoldTypeMaster(name = "", module = "") {
    if (name !== "" &&  name.trim().length !== 0 && module !== "" &&  module.trim().length !== 0) {
        return [true,''];
    }
    else {
        if(name === "" &&  name.trim().length === 0){
            return [false,'errddlname', 'Please enter name'];
        }
        else if(module === "" &&  module.trim().length === 0){
            return [false,'errddlmodule', 'Please enter module'];
        }
        
    }
}
export default ValidationRTHoldTypeMaster;