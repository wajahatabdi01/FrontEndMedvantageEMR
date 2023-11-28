function ValidationDoctorTimeSlotMapping(doctorId="", timeslotId = "", dayId="") {
    if (doctorId !== "" && timeslotId !== "" && doctorId !== "0" && timeslotId !== "0" && dayId !== "0" && dayId !== "0") {
        return true
    }
    else {
        return false
    }
}
export default ValidationDoctorTimeSlotMapping;