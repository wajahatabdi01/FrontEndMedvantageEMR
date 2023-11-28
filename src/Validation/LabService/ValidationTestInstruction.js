function ValidationTestInstruction(instructions = "",) {
    if (instructions !== "" && instructions.trim().length !== 0) {
        return true
    }
    else {
        return false
    }
}
export default ValidationTestInstruction;