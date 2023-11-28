function ValidationServiceHeadMapping(serviceId = "", headId = "") {
    if (serviceId !== "" && serviceId!=="0" &&  headId !== "" && headId!=="0" ) {
        return true
    }
    else {
        return false
    }
}
export default ValidationServiceHeadMapping;